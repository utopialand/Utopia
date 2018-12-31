#include "creditscore.hpp"

ACTION creditscore::addcredscore(name identity, name username, float cscore)

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

EOSIO_DISPATCH(creditscore, (addcredscore)(modcreditsc))