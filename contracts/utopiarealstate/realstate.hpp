#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
using namespace eosio;
using namespace std;
CONTRACT realstate : public contract
{
    using contract::contract;

  public:
    ACTION landproposal(string location, uint64_t area, name username, uint64_t startdate, uint64_t enddate, asset price);
    ACTION buyproptbid(uint64_t id, name username,asset amount);
    TABLE realState
    {
        uint64_t id;
        string location;
        uint64_t area;
        name username;
        uint64_t startdate;
        uint64_t enddate;
        uint64_t dayslimit;
        asset price;
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
    TABLE buyers
    {
        name username;
        asset price;
        uint64_t primary_key() const { return username.value; }
    };
    TABLE properties
    {
        uint64_t id;
        name owner;
        asset price;
         uint64_t primary_key() const { return id; }
    };

  private:
    typedef eosio::multi_index<"identity2"_n, identityt> identity_table;
    typedef multi_index<"rstable"_n, realState> rs_table;
    typedef multi_index<"buyertable"_n, realState> buyer_table;
    typedef multi_index<"properties"_n, properties> properties_table;
};