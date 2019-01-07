#include "creditscore.hpp"

ACTION creditscore::addcredscore(name identity, name username,float cscore)

{
    print("add credit score--");
    require_auth(identity);
    manager_table manager("utpmanager11"_n, "utpmanager11"_n.value);
    auto mitr = manager.find(identity.value);
    eosio_assert(mitr != manager.end(), "manager not found !!!");

    identity_table iden_table("identityreg1"_n, "identityreg1"_n.value);
    auto itr = iden_table.find(username.value);
    eosio_assert(itr != iden_table.end(), "identity not found !!!");
    eosio_assert(itr->citizen, "Not a citizen of Utopia !!!");

    cscore_table credit(_self, _self.value);
    credit.emplace(_self, [&](auto &c) {
        c.username = username;
        c.creditscore = cscore;
        c.isdefaulter = false;
    });
}

ACTION creditscore::modcreditsc(name identity, name username, float cscore, bool isdefaulter)

{
    print("modify credit score--");
    require_auth(identity);
    manager_table manager("utpmanager11"_n, "utpmanager11"_n.value);
    auto mitr = manager.find(identity.value);
    eosio_assert(mitr != manager.end(), "manager not found !!!");

    identity_table iden_table("identityreg1"_n, "identityreg1"_n.value);
    auto itr = iden_table.find(username.value);
    eosio_assert(itr != iden_table.end(), "identity not found !!!");
    eosio_assert(itr->citizen, "Not a citizen of Utopia !!!");

    cscore_table credit(_self, _self.value);
    auto csitr = credit.find(username.value);
    eosio_assert(csitr != credit.end(), "Identity doesn't have credit score attached!!");
    credit.modify(csitr, _self, [&](auto &c) {
        c.creditscore += cscore;
        c.isdefaulter = isdefaulter;
    });
}

ACTION creditscore::byrealest(name identity, name username, asset liqasset)

{
    print("modify credit score--");
    require_auth(identity);
    manager_table manager("utpmanager11"_n, "utpmanager11"_n.value);
    auto mitr = manager.find(identity.value);
    eosio_assert(mitr != manager.end(), "manager not found !!!");

    identity_table iden_table("identityreg1"_n, "identityreg1"_n.value);
    auto itr = iden_table.find(username.value);
    eosio_assert(itr != iden_table.end(), "identity not found !!!");
    eosio_assert(itr->citizen, "Not a citizen of Utopia !!!");

    cscore_table credit(_self, _self.value);
    auto csitr = credit.find(username.value);
    eosio_assert(csitr != credit.end(), "Identity doesn't have credit score attached!!");

    properties_table prop("realstateutp"_n, "realstateutp"_n.value);
    auto propitr = prop.begin();
    asset total = asset(0, symbol(symbol_code("UTP"), 4));
    while (propitr != prop.end())
    {
        if (propitr->owner == username)
        {
            auto price = propitr->price;
            total += price;
        }
        propitr++;
    }

    asset totalprop = total + liqasset;
    float cscore;
    if (totalprop.amount > 1000000)
        cscore = 7.5;
    else if (totalprop.amount > 500000)
        cscore = 6.5;
    else
        cscore = 5.5;
}
ACTION creditscore::hi()

{
    print("hi");
}

EOSIO_DISPATCH(creditscore, (addcredscore)(modcreditsc)(hi))