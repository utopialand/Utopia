#include "creditscore.hpp"

ACTION creditscore::addcredscore(name identity,name username,float cscore)

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

EOSIO_DISPATCH(creditscore, (addcredscore))