#include "debt.hpp"

ACTION debt::transfer(name from, name to, asset quantity, string memo)
{
    if (to != _self)
        return;
    asset compare = asset(0, symbol(symbol_code("EOS"), 4));
    if (quantity.symbol == compare.symbol)
    {
        amtdepo_tab deposit(_self, _self.value);
        deposit.emplace(_self, [&](auto &c) {
            c.id = deposit.available_primary_key();
            c.username = from;
            c.paymentAt = now();
            c.amount = quantity;
            c.status = false;
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
    print("dist amt--",distamt);
    amtdepo_tab deposit(_self, _self.value);
    auto itr = deposit.begin();
    int flag = 0;
    while (itr != deposit.end())
    {
        auto amt = itr->amount;
        auto lender = itr->username;
        if (distamt.amount > amt.amount)
        {
            print("transferring amt --", amt);
            print(" to -",lender);
          /*   action(
            permission_level{_self, "active"_n},
            "eosio.token"_n, "transfer"_n,
            std::make_tuple(_self, lender, amt, "test"))
            .send();
            distamt -= amt;
            deposit.modify(itr, _self, [&](auto &a) {
                a.status = true;
            }); */
        }
        else {
            flag = 1;
            break;
        }
        itr++;
    }
    if(flag==1)
    {
        print("no dist amt left");
    }
}

ACTION debt::init(name owner)
{
    require_auth(_self);
    asset value = asset(0, symbol(symbol_code("EOS"), 4));
    asset a = get_balance(owner, value);
    print("asset--", a);
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
                EOSIO_DISPATCH_HELPER(debt, (init)(distamt))
            }
        }
        eosio_exit(0);
    }
}