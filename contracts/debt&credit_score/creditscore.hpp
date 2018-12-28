#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
using namespace eosio;
using namespace std;

CONTRACT creditscore : public contract
{
    using contract::contract;

  public:
    ACTION addcredscore(name identity, name username,asset liqasset);
    ACTION modcreditsc(name identity, name username, float cscore, bool isdefaulter);
    ACTION byrealest(name identity, name username, asset liqasset);

    TABLE credscore
    {
        name username;
        float creditscore;
        bool isdefaulter = false;
        uint64_t primary_key() const { return username.value; }
    };

    TABLE managertab
    {
        name user;
        uint64_t primary_key() const { return user.value; }
    };

     TABLE identityt
    {
        name username;
        string identityname;
        string dob;
        string contact;
        string email;
        string dochash;
        bool citizen = false;
        uint64_t primary_key() const { return username.value; }
    };


    TABLE properties
    {
        uint64_t propt_id;
        name owner;
        asset price;
        uint64_t primary_key() const { return propt_id; }
    };

  private:
    typedef multi_index<"cscore112"_n, credscore> cscore_table;
    typedef multi_index<"manager111"_n, managertab> manager_table;
    typedef multi_index<"identity3"_n, identityt> identity_table;
     typedef multi_index<"properties1"_n, properties> properties_table;
};