#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>
#include <string>
using namespace eosio;
using namespace std;

CONTRACT visitorcon : public contract
{
    using contract::contract;

  public:
    ACTION apply(name visitor,uint64_t stduration);
    ACTION approve(name manager,name visitor);
    ACTION move(name manager,name visitor);
     TABLE visitor{
        uint64_t id;
        name visitor;
        uint64_t duration;
        bool visitorstatus;
        uint64_t primary_key() const {return visitor.value;}
    };
       TABLE manager
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
private:
    bool is_manager(name user)
    {
        if (has_auth(user))
        {
            manager_table mt("identityreg1"_n, "identityreg1"_n.value);
            auto itr = mt.find(user.value);
            if (itr == mt.end())
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        else
        {
            return false;
        }
    }
    typedef multi_index<"manager11"_n, manager> manager_table;
    typedef multi_index<"identity3"_n, identityt> identity_table;
    typedef multi_index<"visitordata"_n,visitor> visitor_entry;
};