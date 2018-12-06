#include "business.hpp"

ACTION business::addbusiness(name owner, string businessname){
    require_auth(owner);
    businesstb bt(_self, _self.value);
    bt.emplace(_self, [&](auto &c){
        c.id = bt.available_primary_key();
        c.owner = owner;
        c.businessname = businessname;
    });
}

ACTION business::makepublic(uint64_t id, double marketcap, double totalshares, string stockname){
    businesstb bt(_self, _self.value);
    auto itr = bt.find(id);
    require_auth(itr->owner);
    eosio_assert(itr != bt.end(), "No such company exists");
    eosio_assert(marketcap>0, "marketcap should be greater than 0");
    eosio_assert(totalshares>0, "totalshares should be greater than 0");
    eosio_assert(itr->marketcap == 0, "Company already public");

    bt.modify(itr, _self, [&](auto &c){
        c.marketcap = marketcap;
        c.totalshares = totalshares;
        c.shareprice = marketcap/totalshares;
        c.stockname = stockname;
    });

}

ACTION business::newshareprice(uint64_t id, double newshareprice){
    businesstb bt(_self, _self.value);
    auto itr = bt.find(id);
    eosio_assert(itr != bt.end(), "No such business exist");
    eosio_assert(itr->marketcap > 0 ,"business not public yet");
    eosio_assert(newshareprice >0 , "new share price should not be less than or equal to 0");

    require_auth(itr->owner);

    bt.modify(itr, _self, [&](auto& c){
        c.shareprice = newshareprice;
        c.marketcap = newshareprice * itr->totalshares;
    });
}

ACTION business::newtotalshare(uint64_t id, double newtotalshare){
    businesstb bt(_self, _self.value);
    auto itr = bt.find(id);
    eosio_assert(itr != bt.end(), "No such business exist");
    eosio_assert(itr->marketcap > 0 ,"business not public yet");
    eosio_assert(newtotalshare >0 ,"total shares cannot be 0 or less");

    require_auth(itr->owner);

    bt.modify(itr, _self, [&](auto& c){
        c.totalshares = newtotalshare;
        c.shareprice = itr->marketcap/newtotalshare;
    });
}

ACTION business::deleteall(){
    require_auth(_self);
    businesstb bt(_self, _self.value);
    auto itr = bt.begin();
    while(itr != bt.end()){
        itr = bt.erase(itr);
    }
}

EOSIO_DISPATCH(business, (addbusiness)(makepublic)(newshareprice)(newtotalshare)(deleteall))