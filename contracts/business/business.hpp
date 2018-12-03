#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;
using namespace std;

CONTRACT business : public contract
{

  public:
    using contract::contract;

    ACTION addbusiness(name owner, string businessname);

    ACTION approve(uint64_t company_id);

    ACTION makepublic(uint64_t company_id, asset maximum_supply);

    ACTION deleteall();

    ACTION delcompany(uint64_t company_id);

    ACTION addemployee(uint64_t company_id, name employee);

    ACTION rmemployee(uint64_t company_id, name employee);

    ACTION adshareowner(uint64_t company_id, name shareholder);

    ACTION rmshareowner(uint64_t company_id, name shareholder);

    ACTION printnames();

    uint8_t CREATED = 0;
    uint8_t APPROVED = 1;

    TABLE businessst
    {
        uint64_t company_id;
        uint8_t status;
        name owner;
        string businessname;
        asset token_maximum_supply;
        vector<name> shareholders;
        vector<name> employees;

        uint64_t primary_key() const { return company_id; }
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

    typedef multi_index<"businesstb"_n, businessst> businesstb;
    typedef multi_index<"identity2"_n, identityt> identity_table;
};