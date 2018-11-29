#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/singleton.hpp>

using namespace eosio;
using namespace std;

CONTRACT identity : public contract
{
  public:
    using contract::contract;
    ACTION addidentity(
        name username,
        string fname,
        string mname,
        string lname,
        string dob,
        string contact,
        string email);
    ACTION remidentity(name username);

    ACTION addcitizen(uint64_t id,name identity, name manager);
    ACTION reqcitizen(name identity);
    ACTION remcitizen(name identity, name manager);
    ACTION remmanager(name user);
    ACTION addmanager(name user);
    /* ACTION settest(name user);
    ACTION gettest(); */
    ACTION hi();
    ACTION delall();

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

    TABLE manager
    {
        name user;
        uint64_t primary_key() const { return user.value; }
    };

    TABLE citizenship
    {
        uint64_t id;
        name identity;
        bool approved;
        uint64_t primary_key () const {return id ;}
        
    };

  private:
    bool is_manager(name user)
    {
        if (has_auth(user))
        {
            manager_table mt(_self, _self.value);
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

    typedef multi_index<"identity2"_n, identityt> identity_table;
    typedef multi_index<"manager11"_n, manager> manager_table;
    typedef multi_index<"citizen"_n, citizenship> citizen_table;

    //  
};
