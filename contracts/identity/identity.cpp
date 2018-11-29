#include "identity.hpp"
#include <math.h>

ACTION identity::addidentity(name username,
                             string fname,
                             string mname,
                             string lname,
                             string dob,
                             string contact,
                             string email)
{
    identity_table iden_table(_self, _self.value);
    iden_table.emplace(_self, [&](auto &v) {
        v.username = username;
        v.fname = fname;
        v.mname = mname;
        v.lname = lname;
        v.dob = dob;
        v.contact = contact;
        v.email = email;
    });

    print("add identity");
}

ACTION identity::remidentity(name username)
{
    print("removeidentity");
    identity_table iden_table(_self, _self.value);
    auto itr = iden_table.find(username.value);
    iden_table.erase(itr);
}

ACTION identity::addmanager(name user)
{
    print("add manager");
    require_auth(_self);
    manager_table mt(_self, _self.value);
    mt.emplace(_self, [&](auto &v) {
        v.user = user;
    });
    //asset test = asset(10000000000000000000000,symbol(symbol_code("BTC"),18));
}

ACTION identity::remmanager(name user)
{
    print("remove manager");
    require_auth(_self);
    manager_table mt(_self, _self.value);
    auto itr = mt.find(user.value);
    eosio_assert(itr != mt.end(), "manager not found");
    mt.erase(itr);
}

ACTION identity::addcitizen(uint64_t id, name user, name manager)
{
    print("add citizen");
    eosio_assert(is_manager(manager), "Not Authorized");
    identity_table iden_tab(_self, _self.value);

    citizen_table citizen(_self, _self.value);

    auto cit = citizen.find(id);
    eosio_assert(cit != citizen.end(), "citizenship is not applied yet!!!");
    eosio_assert(cit -> approved !=true, "Already approved!!");
    auto itr = iden_tab.find(user.value);
    iden_tab.modify(itr, _self, [&](auto &v) {
        v.citizen = true;
    });

    citizen.modify(cit, _self, [&](auto &ct) {
        ct.approved = true;
    });
}

ACTION identity::remcitizen(name user, name manager)
{
    print("remove citizen");
    eosio_assert(is_manager(manager), "Not Authorized");
    identity_table iden_tab(_self, _self.value);
    auto itr = iden_tab.find(user.value);
    iden_tab.modify(itr, _self, [&](auto &v) {
        v.citizen = false;
    });
}

ACTION identity::delall()
{
    print("test------");
    identity_table iden_table(_self, _self.value);
    auto it = iden_table.begin();
    while (it != iden_table.end())
    {
        it = iden_table.erase(it);
    }
}

ACTION identity::reqcitizen(name identity)
{
    citizen_table citizen(_self, _self.value);
    identity_table iden_tab(_self, _self.value);
    auto itr = iden_tab.find(identity.value);
    eosio_assert(itr != iden_tab.end(), "Your identity id not registered yet !!!");
    require_auth(identity);
    auto cit_itr = citizen.begin();
    while (cit_itr != citizen.end())
    {

        eosio_assert(cit_itr->identity != identity, "already applied for citizenship!!");
        cit_itr++;
    }

    citizen.emplace(_self, [&](auto &v) {
        v.id = citizen.available_primary_key();
        v.identity = identity;
        v.approved = false;
    });
}

ACTION identity::remcitreq(uint64_t id, name manager)
{
    print("remove citizen");
    eosio_assert(is_manager(manager), "Not Authorized");
    citizen_table citizen(_self, _self.value);
    auto itr = citizen.find(id);
    eosio_assert(itr != citizen.end(), "citizen not found");
    //if(itr->approved!=true)
    citizen.erase(itr);
}

EOSIO_DISPATCH(identity,
               (addidentity)(remidentity)(reqcitizen)(delall)(addmanager)(remmanager)(remcitreq)

                   (addcitizen)(remcitizen))