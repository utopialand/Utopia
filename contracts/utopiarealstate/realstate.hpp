#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
using namespace eosio;
using namespace std;
CONTRACT realstate : public contract
{
    using contract::contract;

  public:
    ACTION landproposal(string location, uint64_t area, name currentOwner, asset currentprice, uint64_t startdate, uint64_t enddate);
    ACTION bid(uint64_t id, name buyername,asset amount);
    ACTION approvedprop(uint64_t id);
    ACTION reqbuypropt(uint64_t id, name buyer, asset amount);
    ACTION reqsellpropt(uint64_t id,name seller,asset amount);
    TABLE bidtable
    {
        uint64_t id;
        string location;
        uint64_t area;
        name currentOwner;
        asset currentprice;
        uint64_t startdate;
        uint64_t enddate;
        bool bidstatus = true;
        string rsproposal = "created";
        uint64_t primary_key() const { return id; }
    };

    TABLE identityt
    {
        name username;
        string fname;
        string mname;
        string lname;
        string dob;
        string contact;
        string email;
        bool citizen = false;
        uint64_t primary_key() const { return username.value; }
    };
    TABLE reqbuyers
    {
        uint64_t id;
        name buyername;
        asset price;
        uint64_t primary_key() const { return id; }
    };
    TABLE reqsellers
    {
        uint64_t id;
        name sellername;
        asset sellingprice;
        uint64_t primary_key() const { return id; }
    };
    TABLE properties
    {
        uint64_t propt_id;
        name owner;
        asset price;
        uint64_t primary_key() const { return propt_id; }
    };

  private:
    typedef eosio::multi_index<"identity3"_n, identityt> identity_table;
    typedef multi_index<"bidtable"_n, bidtable> bid_table;
    typedef multi_index<"properties"_n, properties> properties_table;
    typedef multi_index<"reqbuyertab"_n, reqbuyers> buyer_table;
    typedef multi_index<"reqsellertab"_n, reqsellers> seller_table;
};