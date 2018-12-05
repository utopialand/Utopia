#include "realstate.hpp"

ACTION realstate::landproposal(string location, uint64_t area, name username, uint64_t startdate, uint64_t enddate, asset price)
{
    print("land proposal");
    require_auth(username);
    uint64_t dayslimit;
    uint64_t d = enddate - startdate;
    if (d < 86400 && d > 0)
    {
        dayslimit = 1;
    }
    else
    {
        dayslimit = d / 86400;
    }

    rs_table rt(_self, _self.value);
    rt.emplace(_self, [&](auto &r) {
        r.id = rt.available_primary_key();
        r.location = location;
        r.area = area;
        r.username = username;
        r.startdate = startdate;
        r.enddate = enddate;
        r.dayslimit = dayslimit;
        r.price = price;
    });
};

ACTION realstate::buyproptbid(uint64_t id, name username, asset amount)
{
    rs_table rt(_self, _self.value);
    auto itr = rt.find(id);
    require_auth(username);
    eosio_assert(itr != rt.end(), "no available properties for this id");
    uint64_t t = now();
    eosio_assert(t < itr->enddate, "time limit over to buy this properties");
    eosio_assert(amount.symbol == itr->price.symbol, "invalid amount symbol");
    eosio_assert(amount > itr->price, "insufficient amount to buy property");

    rt.modify(itr, _self, [&](auto &s) {
        s.username = username;
        s.price = amount;
    });

    properties_table pt(_self, _self.value);
    auto itr1 = pt.find(id);
    if (itr1 == pt.end())
    {
        pt.emplace(_self, [&](auto &p) {
            p.id = id;
            p.owner = username;
            p.price = amount;
        });
    }
    else
    {
        /* eosio_assert(itr1->owner!=username , ""); */
        pt.modify(itr1, _self, [&](auto &p) {
            p.id = id;
            p.owner = username;
            p.price = amount;
        });
    }
}

EOSIO_DISPATCH(realstate, (landproposal)(buyproptbid))