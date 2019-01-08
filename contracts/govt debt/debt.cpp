#include "debt.hpp"

ACTION debt::transfer(name from, name to, asset quantity, string memo)
{
    if (to != _self)
        return;
    usdtoeos_tab usdeos(_self, _self.value);
    float equsd;
    asset compare = asset(0, symbol(symbol_code("EOS"), 4));
    auto usditr = usdeos.find(compare.symbol.code().raw());
    eosio_assert(usditr != usdeos.end(), "value not found!!");
    if (quantity.symbol == compare.symbol)
    {
        float usd = ceilf(usditr->usdvalue * 10000) / 10000;
        equsd = quantity.amount * usd;

        print("transfer qty--", quantity);
        print("current usd--", usd);
        print("equivalent usd--", equsd / 10000);
        amtdepo_tab deposit(_self, _self.value);
        deposit.emplace(_self, [&](auto &c) {
            c.id = deposit.available_primary_key();
            c.username = from;
            c.paymentAt = now();
            c.amount = quantity;
            c.eqUSD = ceilf(equsd / 10000 * 10000) / 10000;
            c.status = false;
            c.retamt = asset(0, symbol(symbol_code("EOS"), 4));
        });
    }
}

ACTION debt::distamt(name identity)
{
    require_auth(identity);
    manager_table manager("utpmanager11"_n, "utpmanager11"_n.value);
    auto mitr = manager.find(identity.value);
    eosio_assert(mitr != manager.end(), "manager not found !!!");
    asset value = asset(0, symbol(symbol_code("EOS"), 4));
    asset a = get_balance(_self, value);
    asset distamt;
    distamt.amount = (a.amount * 30) / 100;
    distamt.symbol = a.symbol;
    print("dist amt--", distamt);
    /////////////////////////////////////////////
    usdtoeos_tab usdeos(_self, _self.value);
    auto usditr = usdeos.find(value.symbol.code().raw());
    eosio_assert(usditr != usdeos.end(), "value not found!!");
    auto usdval = usditr->usdvalue;
    ////////////////////////////////////////////

    amtdepo_tab deposit(_self, _self.value);
    auto itr = deposit.begin();
    int flag = 0;
    while (itr != deposit.end())
    {
        auto amt = itr->amount;
        auto lender = itr->username;
        auto equsd = itr->eqUSD;
        auto curreosval = equsd / usdval;
        print("current eos value--", curreosval);
        amt = asset(curreosval * 10000, symbol(symbol_code("EOS"), 4));
        if (distamt.amount > amt.amount)
        {
            print("transferring amt --", amt);
            print(" to -", lender);
              action(
            permission_level{_self, "active"_n},
            "eosio.token"_n, "transfer"_n,
            std::make_tuple(_self, lender, amt, "test"))
            .send();
            distamt -= amt;
            deposit.modify(itr, _self, [&](auto &a) {
                a.status = true;
                a.retamt = amt;
            });
        }
        else
        {
            flag = 1;
            break;
        }
        itr++;
    }

    eosio_assert(flag != 1, "No distributable amount left!!Wait for next turn!!");
}

ACTION debt::init(name owner)
{
    require_auth(_self);
    asset value = asset(0, symbol(symbol_code("EOS"), 4));
    asset a = get_balance(owner, value);
    print("asset--", a);
}

ACTION debt::updateusdeos(name identity, asset eosvalue, float usdval)
{
    require_auth(identity);
    manager_table manager("utpmanager11"_n, "utpmanager11"_n.value);
    auto mitr = manager.find(identity.value);
    eosio_assert(mitr != manager.end(), "manager not found !!!");
    float usd = ceilf(usdval * 10000) / 10000;
    usdtoeos_tab usdeos(_self, _self.value);
    auto usditr = usdeos.find(eosvalue.symbol.code().raw());
    if (usditr == usdeos.end())
    {
        usdeos.emplace(_self, [&](auto &c) {
            c.eosvalue = eosvalue;
            c.usdvalue = usd;
        });
    }
    else
    {
        usdeos.modify(usditr, _self, [&](auto &c) {
            c.eosvalue = eosvalue;
            c.usdvalue = usd;
        });
    }
}

ACTION debt::delreqloan(uint64_t id)
{
    //  reqloan_tab req(_self, _self.value);
    amtdepo_tab approve(_self, _self.value);
    auto itr = approve.find(id);
    approve.erase(itr);
}

extern "C"
{
    [[noreturn]] void apply(uint64_t receiver, uint64_t code, uint64_t action) {
        print("receiver", name(receiver));
        if (action == "transfer"_n.value && code != receiver)
        {
            eosio::execute_action(eosio::name(receiver), eosio::name(code), &debt::transfer);
        }
        if (code == receiver)
        {
            switch (action)
            {
                EOSIO_DISPATCH_HELPER(debt, (init)(distamt)(updateusdeos)(delreqloan))
            }
        }
        eosio_exit(0);
    }
}