#include "utopiatoken.hpp"

namespace eosio
{

ACTION utopiatoken::create(name issuer, asset maximum_supply)
{
    require_auth(_self);

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

ACTION utopiatoken::issue(name to, asset quantity, string memo)
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

ACTION utopiatoken::retire(asset quantity, string memo)
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

ACTION utopiatoken::transfer(name from, name to, asset quantity, string memo)
{
    eosio_assert(from != to, "cannot transfer to self");

    //cheacking identity from identity table
    identity_table iden_table("identityreg1"_n, "identityreg1"_n.value);
    auto itr = iden_table.find(from.value);
    eosio_assert(itr != iden_table.end(), "identity not found !!!");

    require_auth(from);
    eosio_assert(is_account(to), "to account does not exist");
    auto sym = quantity.symbol.code().raw();
    stats statstable(_self, sym);
    const auto &st = statstable.get(sym);

    require_recipient(from);
    require_recipient(to);

    eosio_assert(quantity.is_valid(), "invalid quantity");
    eosio_assert(quantity.amount > 0, "must transfer positive quantity");
    eosio_assert(quantity.symbol == st.supply.symbol, "symbol precision mismatch!");
    eosio_assert(memo.size() <= 256, "memo has more than 256 bytes");

    auto payer = has_auth(to) ? to : from;



    asset commission;
    asset quantity1;
    commission = (quantity* 5) / 100;
    quantity1 = quantity - commission;
    print("quantity--",quantity);

    sub_balance(from, quantity);
    add_balance(to, quantity1, payer);
    add_balance("utopiatoken1"_n, commission,_self);
}

void utopiatoken::sub_balance(name owner, asset value)
{
    accounts from_acnts(_self, owner.value);

    const auto &from = from_acnts.get(value.symbol.code().raw(), "no balance object found");
    eosio_assert(from.balance.amount >= value.amount, "overdrawn balance!!");

    from_acnts.modify(from, owner, [&](auto &a) {
        a.balance -= value;
    });
}

void utopiatoken::add_balance(name owner, asset value, name ram_payer)
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

ACTION utopiatoken::open(name owner, symbol_code symbol, name ram_payer)
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

ACTION utopiatoken::close(name owner, symbol_code symbol)
{
    require_auth(owner);

    accounts acnts(_self, owner.value);
    auto it = acnts.find(symbol.raw());
    eosio_assert(it != acnts.end(), "Balance row already deleted or never existed. Action won't have any effect.");
    eosio_assert(it->balance.amount == 0, "Cannot close because the balance is not zero.");
    acnts.erase(it);
}
ACTION utopiatoken::hello(name username)
{
    require_auth(_self);
    print("hello , ",name{username});
    
}

} // namespace eosio

EOSIO_DISPATCH(eosio::utopiatoken, (create)(issue)(transfer)(open)(close)(retire)(hello))