#include "realestate.hpp"

ACTION realestate::landproposal(string location, uint64_t area, name currentOwner, asset currentprice, uint64_t startdate, uint64_t enddate)
{
    print("land proposal!!!!!!!");
    require_auth(currentOwner);

    bid_table bt(_self, _self.value);
    bt.emplace(_self, [&](auto &b) {
        b.id = bt.available_primary_key();
        b.location = location;
        b.area = area;
        b.currentOwner = currentOwner;
        b.startdate = startdate;
        b.enddate = enddate;
        b.currentprice = currentprice;
    });
};

ACTION realestate::bid(uint64_t id, name buyername, asset amount)
{
    bid_table bt(_self, _self.value);
    auto itr = bt.find(id);
    eosio_assert(itr->currentOwner != buyername, "you have already top bidder");
    require_auth(buyername);
    eosio_assert(itr->bidstatus == true, "no available bid for this properties");
    eosio_assert(itr != bt.end(), "no available properties for this id");
    uint64_t t = now();
    eosio_assert(t >= itr->startdate, "bid is not start yet please wait !!");
    eosio_assert(t < itr->enddate, "time limit over to buy this properties");
    eosio_assert(amount.symbol == itr->currentprice.symbol, "invalid amount symbol");
    eosio_assert(amount > itr->currentprice, "insufficient amount to buy property !!");
    name rsdeposite = "rsdeposite11"_n;
    string memo = "fund transfer";
    if (itr->rsproposal == "created")
    {
        action(
            permission_level{buyername, "active"_n},
            "amartesttest"_n, "transfer"_n,
            make_tuple(buyername, rsdeposite, amount, memo))
            .send();
    }
    else
    {
        action(
            permission_level{buyername, "active"_n},
            "amartesttest"_n, "transfer"_n,
            make_tuple(buyername, rsdeposite, amount, memo))
            .send();

        action(
            permission_level{rsdeposite, "active"_n},
            "amartesttest"_n, "transfer"_n,
            make_tuple(rsdeposite, itr->currentOwner, itr->currentprice, memo))
            .send();
    }

    bt.modify(itr, _self, [&](auto &b) {
        b.currentOwner = buyername;
        b.currentprice = amount;
        b.rsproposal = "progress";
    });
}

ACTION realestate::approvedprop(uint64_t id)
{
    bid_table bt(_self, _self.value);
    auto itr = bt.find(id);
    require_auth(_self);
    eosio_assert(itr->bidstatus != false, "already aprroved");
    uint64_t t = now();
    eosio_assert(t >= itr->enddate, "available for bidding");
    bt.modify(itr, _self, [&](auto &b) {
        b.bidstatus = false;
        b.rsproposal = "finished";
    });

    properties_table pt(_self, _self.value);
    auto itr1 = pt.find(id);
    if (itr1 != pt.end())
    {
         pt.modify(itr1, _self, [&](auto &pt) {
            pt.owner = itr->currentOwner;
            pt.price = itr->currentprice;
        });
    }
    else
    {
        pt.emplace(_self, [&](auto &p) {
            p.propt_id = id;
            p.owner = itr->currentOwner;
            p.price = itr->currentprice;
        });
    }
   
}

ACTION realestate::reqbuypropt(uint64_t id, name buyer, asset amount)
{
    properties_table pt(_self, _self.value);
    auto itr = pt.find(id);
    require_auth(buyer);
    eosio_assert(itr != pt.end(), "no available properties for this id");
    eosio_assert(itr->owner != buyer, "you are already owner !!");

    name rsdeposite = "rsdeposite11"_n;
    string memo = "fund transfer";
    buyer_table bt(_self, _self.value);
    auto itr1 = bt.find(id);

    if (itr1 == bt.end())
    {
        action(
            permission_level{buyer, "active"_n},
            "amartesttest"_n, "transfer"_n,
            make_tuple(buyer, rsdeposite, amount, memo))
            .send();
        bt.emplace(_self, [&](auto &b) {
            b.id = itr->propt_id;
            b.buyername = buyer;
            b.price = amount;
        });
    }
    else
    {
        print("else part running !!!!!!!");
        action(
            permission_level{buyer, "active"_n},
            "amartesttest"_n, "transfer"_n,
            make_tuple(buyer, rsdeposite, amount, memo))
            .send();
        action(
            permission_level{rsdeposite, "active"_n},
            "amartesttest"_n, "transfer"_n,
            make_tuple(rsdeposite, itr1->buyername, itr1->price, memo))
            .send();

        bt.modify(itr1, _self, [&](auto &b) {
            b.buyername = buyer;
            b.price = amount;
        });
    }
}

ACTION realestate::accbuyerreq(uint64_t id, name seller)
{
    properties_table pt(_self, _self.value);
    auto itr = pt.find(id);
    require_auth(seller);
    eosio_assert(itr != pt.end(), "no available properties for this id");
    eosio_assert(itr->owner == seller, "you are not valid owner of this property");

    buyer_table bt(_self, _self.value);
    auto itr1 = bt.find(id);
    eosio_assert(itr1 != bt.end(), "no available buyer for this id");

    name rsdeposite = "rsdeposite11"_n;
    string memo = "fund transfer";

    action(
        permission_level{rsdeposite, "active"_n},
        "amartesttest"_n, "transfer"_n,
        make_tuple(rsdeposite, seller, itr1->price, memo))
        .send();

    pt.modify(itr, _self, [&](auto &b) {
        b.owner = itr1->buyername;
        b.price = itr1->price;
    });
    itr1 = bt.erase(itr1);
}

ACTION realestate::reqsellpropt(uint64_t id, name seller, asset amount)
{
    properties_table pt(_self, _self.value);
    auto itr = pt.find(id);
    require_auth(seller);
    eosio_assert(itr != pt.end(), "no available properties for this id !!");
    eosio_assert(itr->owner == seller, "you are not valid owner of this property!!!!");
    seller_table st(_self, _self.value);
    st.emplace(_self, [&](auto &s) {
        s.id = itr->propt_id;
        s.sellername = seller;
        s.sellingprice = amount;
    });
}
ACTION realestate::accsellreq(uint64_t id, name buyer, asset amount)
{
    properties_table pt(_self, _self.value);
    auto itr = pt.find(id);
    require_auth(buyer);
    eosio_assert(itr != pt.end(), "no available properties for this id !!");
    eosio_assert(itr->owner != buyer, "you are alredy owner of this propertity!!!!");
    seller_table st(_self, _self.value);
    auto itr1 = st.find(id);
    eosio_assert(itr1 != st.end(), "no available seller for this id");
    eosio_assert(amount == itr1->sellingprice, "not valid amount to buy this property");
    eosio_assert(itr1->sellername != buyer, "you are alredy owner of this propertity!!!!");
    name rsdeposite = "rsdeposite11"_n;
    string memo = "fund transfer";

    action(
        permission_level{buyer, "active"_n},
        "amartesttest"_n, "transfer"_n,
        make_tuple(buyer, rsdeposite, amount, memo))
        .send();

    action(
        permission_level{rsdeposite, "active"_n},
        "amartesttest"_n, "transfer"_n,
        make_tuple(rsdeposite, itr1->sellername, amount, memo))
        .send();
    pt.modify(itr, _self, [&](auto &b) {
        b.owner = buyer;
        b.price = amount;
    });
    itr1 = st.erase(itr1);
}

ACTION realestate::auction(uint64_t id, name managername, uint64_t startdate, uint64_t enddate)
{
    manager_table manager("utpmanager11"_n, "utpmanager11"_n.value);
    auto mitr = manager.find(managername.value);
    eosio_assert(mitr != manager.end(), "manager not found !!!");

    properties_table pt(_self, _self.value);
    auto itr = pt.find(id);
    eosio_assert(itr != pt.end(), "no available properties for this id!!!!");
    require_auth(managername);
    pt.modify(itr, _self, [&](auto &b) {
        b.owner = managername;
    });

    asset amount = itr->price;
    bid_table bt(_self, _self.value);
    auto itr1 = bt.find(id);
    bt.modify(itr1, _self, [&](auto &b) {
        b.currentOwner = managername;
        b.currentprice = amount;
        b.startdate = startdate;
        b.enddate = enddate;
        b.bidstatus = true;
        b.rsproposal = "created";
    });
};

EOSIO_DISPATCH(realestate, (landproposal)(bid)(approvedprop)(reqbuypropt)(accbuyerreq)(reqsellpropt)(accsellreq)(auction))