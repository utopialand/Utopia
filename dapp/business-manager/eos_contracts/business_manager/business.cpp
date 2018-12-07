#include "business.hpp"

ACTION business::deleteall()
{

    //delets all data/companies
    require_auth(_self);
    businesstb bt(_self, _self.value);
    auto itr = bt.begin();
    while (itr != bt.end())
    {
        itr = bt.erase(itr);
    }
}

ACTION business::delcompany(uint64_t company_id)
{

    //delete one company
    require_auth(_self);
    businesstb bt(_self, _self.value);
    auto itr = bt.find(company_id);
    eosio_assert(itr != bt.end(), "Company does not exist");
    itr = bt.erase(itr);
}

ACTION business::addemployee(uint64_t company_id, name employee)
{
    //searching for employee in utopia
    identity_table idtb("identityreg1"_n, "identityreg1"_n.value);
    businesstb bt(_self, _self.value);
    auto eitr = idtb.find(employee.value);
    eosio_assert(eitr != idtb.end(), "Not a member of Utopia community");
    //searching for company
    auto citr = bt.find(company_id);
    eosio_assert(citr != bt.end(), "Company does not exist");
    require_auth(citr->owner);
    //searching for employee in your company if exists do not add
    auto aditr = find(citr->employees.begin(), citr->employees.end(), employee);
    eosio_assert(aditr == citr->employees.end(), "Employee already exists");
    //add employee to your company
    bt.modify(citr, _self, [&](auto &c) {
        c.employees.push_back(employee);
    });
}

ACTION business::rmemployee(uint64_t company_id, name employee)
{
    //searching for employee in utopia
    identity_table idtb("identityreg1"_n, "identityreg1"_n.value);
    businesstb bt(_self, _self.value);
    auto eitr = idtb.find(employee.value);
    eosio_assert(eitr != idtb.end(), "Not a member of Utopia community");
    //searching for company
    auto citr = bt.find(company_id);
    eosio_assert(citr != bt.end(), "Company does not exist");
    require_auth(citr->owner);
    //searching for employee in your company
    auto rmeitr = find(citr->employees.begin(), citr->employees.end(), employee);
    eosio_assert(rmeitr != citr->employees.end(), "No such employee exists in your company");
    //removing the employee from your company
    bt.modify(citr, _self, [&](auto &c) {
        c.employees.erase(rmeitr);
    });
}

ACTION business::printnames()
{
    require_auth(_self);

    identity_table id("identityreg1"_n, "identityreg1"_n.value);
    auto itr = id.begin();
    while (itr != id.end())
    {
        print(" --identity--> ", name{itr->username});
        itr++;
    }
}

ACTION business::create(asset maximum_supply, name owner, string businessname)
{
    require_auth(owner);

    identity_table idtb("identityreg1"_n, "identityreg1"_n.value);
    auto eitr = idtb.find(owner.value);
    eosio_assert(eitr != idtb.end(), "Not a member of Utopia community");

    auto sym = maximum_supply.symbol;
    eosio_assert(sym.is_valid(), "invalid symbol name");
    eosio_assert(maximum_supply.is_valid(), "invalid supply");
    eosio_assert(maximum_supply.amount > 0, "max-supply must be positive");

    stats statstable(_self, sym.code().raw());
    auto existing = statstable.find(sym.code().raw());
    eosio_assert(existing == statstable.end(), "token with symbol already exists");

    statstable.emplace(_self, [&](auto &s) {
        s.supply.symbol = maximum_supply.symbol;
        s.max_supply = maximum_supply;
        s.issuer = owner;
    });

    businesstb bt(_self, _self.value);
    
    bt.emplace(_self,[&](auto &c){
        c.token_maximum_supply = maximum_supply;      
        c.company_id = bt.available_primary_key();
        c.owner = owner;
        c.businessname = businessname;
    });
}

ACTION business::issue(name to, asset quantity, string memo)
{
    auto sym = quantity.symbol;
    eosio_assert(sym.is_valid(), "invalid symbol name !!!");
    eosio_assert(memo.size() <= 256, "memo has more than 256 bytes");

    //cheacking identity from identity table
    identity_table iden_table("identityreg1"_n, "identityreg1"_n.value);
    //print("to account", to.value);
    auto itr = iden_table.find(to.value);
    //print("itr account", itr->username);
    eosio_assert(itr != iden_table.end(), "identity not found !!");

    auto sym_name = sym.code().raw();
    stats statstable(_self, sym_name);
    auto existing = statstable.find(sym_name);
    eosio_assert(existing != statstable.end(), "token with symbol does not exist, create token before issue");
    const auto &st = *existing;
    require_auth(st.issuer);
    eosio_assert(quantity.is_valid(), "invalid quantity");
    eosio_assert(quantity.amount > 0, "must issue positive quantity");

    eosio_assert(quantity.symbol == st.supply.symbol, "symbol precision mismatch");
    eosio_assert(quantity.amount <= st.max_supply.amount - st.supply.amount, "quantity exceeds available supply");

    statstable.modify(st, eosio::same_payer, [&](auto &s) {
        s.supply += quantity;
    });

    add_balance(st.issuer, quantity, st.issuer);

    if (to != st.issuer)
    {
        SEND_INLINE_ACTION(*this, transfer, {st.issuer, "active"_n}, {st.issuer, to, quantity, memo});
    }
}

ACTION business::retire(asset quantity, string memo)
{
    auto sym = quantity.symbol;
    eosio_assert(sym.is_valid(), "invalid symbol name");
    eosio_assert(memo.size() <= 256, "memo has more than 256 bytes");

    auto sym_name = sym.code().raw();
    stats statstable(_self, sym_name);
    auto existing = statstable.find(sym_name);
    eosio_assert(existing != statstable.end(), "token with symbol does not exist");
    const auto &st = *existing;
    require_auth(st.issuer);
    eosio_assert(quantity.is_valid(), "invalid quantity");
    eosio_assert(quantity.amount > 0, "must retire positive quantity");

    eosio_assert(quantity.symbol == st.supply.symbol, "symbol precision mismatch");

    statstable.modify(st, eosio::same_payer, [&](auto &s) {
        s.supply -= quantity;
    });

    sub_balance(st.issuer, quantity);
}

ACTION business::transfer(name from, name to, asset quantity, string memo)
{

    identity_table idtb("identityreg1"_n, "identityreg1"_n.value);
    auto fromitr = idtb.find(from.value);
    auto toitr = idtb.find(to.value);
    eosio_assert(fromitr != idtb.end(), "Not a member of Utopia community");
    eosio_assert(toitr != idtb.end(), "Not a member of Utopia community");

    eosio_assert(from != to, "cannot transfer to self");
    require_auth(from);
    eosio_assert(is_account(to), "to account does not exist");
    auto sym = quantity.symbol.code().raw();
    stats statstable(_self, sym);
    const auto& st = statstable.get(sym);

    require_recipient(from);
    require_recipient(to);

    eosio_assert(quantity.is_valid(), "invalid quantity");
    eosio_assert(quantity.amount > 0, "must transfer positive quantity");
    eosio_assert(quantity.symbol == st.supply.symbol, "symbol precision mismatch");
    eosio_assert(memo.size() <= 256, "memo has more than 256 bytes");

    auto payer = has_auth(to) ? to : from;

    sub_balance(from, quantity);
    add_balance(to, quantity, payer);
}

void business::sub_balance(name owner, asset value)
{
    accounts from_acnts(_self, owner.value);

    const auto &from = from_acnts.get(value.symbol.code().raw(), "no balance object found");
    eosio_assert(from.balance.amount >= value.amount, "overdrawn balance!!");

    from_acnts.modify(from, owner, [&](auto &a) {
        a.balance -= value;
    });
}

void business::add_balance(name owner, asset value, name ram_payer)
{
    accounts to_acnts(_self, owner.value);
    auto to = to_acnts.find(value.symbol.code().raw());
    if (to == to_acnts.end())
    {
        to_acnts.emplace(ram_payer, [&](auto &a) {
            a.balance = value;
        });
    }
    else
    {
        to_acnts.modify(to, eosio::same_payer, [&](auto &a) {
            a.balance += value;
        });
    }
}

ACTION business::open(name owner, symbol_code symbol, name ram_payer)
{
    require_auth(ram_payer);

    auto sym = symbol.raw();

    stats statstable(_self, sym);
    const auto &st = statstable.get(sym, "symbol does not exist");
    eosio_assert(st.supply.symbol.code().raw() == sym, "symbol precision mismatch");

    accounts acnts(_self, owner.value);
    auto it = acnts.find(sym);
    if (it == acnts.end())
    {
        acnts.emplace(ram_payer, [&](auto &a) {
            a.balance = asset{0, st.supply.symbol};
        });
    }
}

ACTION business::close(name owner, symbol_code symbol)
{
    require_auth(owner);

    accounts acnts(_self, owner.value);
    auto it = acnts.find(symbol.raw());
    eosio_assert(it != acnts.end(), "Balance row already deleted or never existed. Action won't have any effect.");
    eosio_assert(it->balance.amount == 0, "Cannot close because the balance is not zero.");
    acnts.erase(it);
}

EOSIO_DISPATCH(business,(deleteall)(delcompany)(addemployee)
(rmemployee)(printnames)(create)(issue)(transfer)(open)
(close)(retire))


