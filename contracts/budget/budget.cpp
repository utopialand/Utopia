#include "budget.hpp"

ACTION budget::createprop(name identity, name user, string proposal, string detail, uint16_t duration, asset budget, uint16_t numwinners)
{
    eosio_assert(is_manager(user), "not authorized");
    /* require_auth(user); */
    identity_table iden_table("identityreg1"_n, "identityreg1"_n.value);
    auto itr = iden_table.find(identity.value);
    eosio_assert(itr != iden_table.end(), "identity not found !!!");
    proposal_table pt(_self, _self.value);
    pt.emplace(_self, [&](auto &v) {
        v.id = pt.available_primary_key();
        v.identity = identity;
        v.proposal_description = proposal;
        v.proposal_detail = detail;
        v.budget = budget;
        v.createdat = now();
        v.selected = 0;
    });
}

ACTION budget ::selectprop(name user, string details, uint16_t duration, uint16_t noofwinner)
{
    eosio_assert(is_manager(user), "not authorized");
    vector<uint64_t> options;
    int count =0;
    feature_table ft(_self, _self.value);
    proposal_table pt(_self, _self.value);
    auto prop_itr = pt.begin();
    while(prop_itr!=pt.end())
    {
        count++;
        prop_itr++;
    }
    prop_itr = pt.begin();
    for (auto i = 0; i < count/2 && prop_itr != pt.end(); i++)
    {
        auto id = prop_itr->id;
        options.push_back(id);
        pt.modify(prop_itr, _self, [&](auto &v) {
            v.selected = 1;
        });
        prop_itr++;
    }
    ft.emplace(_self, [&](auto &f) {
        f.id = ft.available_primary_key();
        f.desc = details;
        f.proposal_options = options;
        f.duration = duration;
        f.num_of_winners = noofwinner;
        f.status = 0;
    });
}

ACTION budget::addmanager(name user)
{
    print("add manager");
    print("add manager");
    require_auth(_self);
    manager_table mt(_self, _self.value);
    mt.emplace(_self, [&](auto &v) {
        v.user = user;
    });
}

EOSIO_DISPATCH(budget,
               (createprop)(selectprop)(addmanager))