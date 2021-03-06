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

void business::addofficer(uint64_t company_id, name person, string position)
{
    //searching for officer in utopia
    identity_table idtb("identityreg1"_n, "identityreg1"_n.value);
    businesstb bt(_self, _self.value);
    auto eitr = idtb.find(person.value);
    eosio_assert(eitr != idtb.end(), "Not a member of Utopia community");

    //searching for company
    auto citr = bt.find(company_id);
    eosio_assert(citr != bt.end(), "Company does not exist");
    require_auth(citr->owner);

    auto aditr = find_if(citr->officers.begin(), citr->officers.end(), [person](const officer &d) {
        return d.person == person;
    });

    eosio_assert(aditr == citr->officers.end(), "Officer already exists");

    bt.modify(citr, _self, [&](auto &c) {
        c.officers.push_back({person, position});
    });
}

void business::rmofficer(uint64_t company_id, name person)
{
    identity_table idtb("identityreg1"_n, "identityreg1"_n.value);
    businesstb bt(_self, _self.value);
    auto eitr = idtb.find(person.value);
    eosio_assert(eitr != idtb.end(), "Not a member of Utopia community");

    //searching for company
    auto citr = bt.find(company_id);
    eosio_assert(citr != bt.end(), "Company does not exist");
    require_auth(citr->owner);
    //searching for employee in your company

    auto rmeitr = find_if(citr->officers.begin(), citr->officers.end(), [person](const officer &d) {
        return d.person == person;
    });

    eosio_assert(rmeitr != citr->officers.end(), "No such officer exists in your company");

    bt.modify(citr, _self, [&](auto &c) {
        c.officers.erase(rmeitr);
    });
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

ACTION business::createtandb(asset maximum_supply, name owner, string businessname)
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

    bt.emplace(_self, [&](auto &c) {
        c.token_maximum_supply = maximum_supply;
        c.company_id = bt.available_primary_key();
        c.owner = owner;
        c.businessname = businessname;
    });
}

ACTION business::create(asset maximum_supply, name issuer)
{
    require_auth(issuer);

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
        s.issuer = issuer;
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

ACTION business::dilute(asset quantity, string memo)
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
        s.max_supply += quantity;
    });
}

ACTION business::concentrate(asset quantity, string memo)
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
    eosio_assert(st.max_supply - quantity >= st.supply, "Cannot delete tokens");

    statstable.modify(st, eosio::same_payer, [&](auto &s) {
        s.max_supply -= quantity;
    });
}

ACTION business::transfer(name from, name to, asset quantity, string memo)
{

    /*   identity_table idtb("identityreg1"_n, "identityreg1"_n.value);
    auto fromitr = idtb.find(from.value);
    auto toitr = idtb.find(to.value);
    eosio_assert(fromitr != idtb.end(), "Not a member of Utopia community");
    eosio_assert(toitr != idtb.end(), "Not a member of Utopia community"); */

    eosio_assert(from != to, "cannot transfer to self");
    require_auth(from);
    eosio_assert(is_account(to), "to account does not exist");
    auto sym = quantity.symbol.code().raw();
    stats statstable(_self, sym);
    const auto &st = statstable.get(sym);

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

void business::listtoken(asset currency)
{
    stats statstable("utopbusiness"_n, currency.symbol.code().raw());
    auto itr = statstable.find(currency.symbol.code().raw());
    eosio_assert(itr != statstable.end(), "token doesnt exist");
    require_auth(itr->issuer);
    exchanges et(_self, _self.value);
    auto itr2 = et.find(currency.symbol.code().raw());
    eosio_assert(itr2 == et.end(), "token already listed");
    et.emplace(_self, [&](auto &s) {
        s.currency = currency;
    });
}

void business::adddetail(
    uint64_t id,
    uint64_t open,
    uint64_t close,
    uint64_t range,
    uint64_t week52_range,
    uint64_t market_cap,
    uint64_t share_out,
    uint64_t pub_fl,
    uint64_t revperemp)
{
    businesstb bt(_self, _self.value);

    //searching for company
    auto citr = bt.find(id);
    eosio_assert(citr != bt.end(), "Company does not exist");
    require_auth(citr->owner);

    bt.modify(citr, _self, [&](auto &s){
        s.open = open;
        s.close = close;
        s.range = range;
        s.week52_range = week52_range;
        s.market_cap = market_cap;
        s.share_out = share_out;
        s.pub_fl = pub_fl;
        s.revperemp = revperemp;
    });
}

void business::addprice(uint64_t company_id, uint32_t price){
    businesstb bt(_self, _self.value);

    //searching for company
    auto citr = bt.find(company_id);
    eosio_assert(citr != bt.end(), "Company does not exist");
    require_auth(citr->owner);

    graphtb gt(_self, _self.value);

    auto itr = gt.find(company_id);

    if(itr == gt.end()){
        gt.emplace(_self, [&](auto &c){
            c.company_id = citr->company_id;
            c.price.push_back(price);
        });
    }
    else{
        gt.modify(itr, _self, [&](auto &c){
            c.price.push_back(price);
        });
    }
}

EOSIO_DISPATCH(business, (deleteall)(delcompany)(addemployee)(rmemployee)(printnames)(createtandb)(create)(issue)(transfer)(open)(close)(retire)(dilute)(concentrate)(listtoken)(addofficer)(rmofficer)(adddetail)(addprice))
