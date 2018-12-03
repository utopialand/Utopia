#include <eosiolib/eosio.hpp>
using namespace eosio;
using namespace std;
CONTRACT voting : public contract
{
    using contract::contract;

  public:
    ACTION landproposal(string location, uint64_t area, name username, time startDate, time endDate, time progressDate, asset price);

        Table realState
    {
        uint64_t id;
        string location;
        uint64_t area;
        name username;
        time startDate;
        time endDate;
        time progressDate;
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
        asset balance;
        uint64_t primary_key() const { return username.value; }
    }

  private:
    typedef eosio::multi_index<"identity2"_n, identityt> identity_table;
    typedef multi_index<"rstable"_n, realState> rs_table;
    typedef multi_index<"buyertable"_n, realState> buyer_table;
}
}