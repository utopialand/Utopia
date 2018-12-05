#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/singleton.hpp>
#include<cstdlib>
#include<ctime>

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
        string email,
        string hash);

    ACTION addidcitzn(
        name manager,
        name username,
        string fname,
        string mname,
        string lname,
        string dob,
        string contact,
        string email,
        string hash);
    ACTION remidentity(name username);

    ACTION addcitizen(name identity, name manager);
    ACTION reqcitizen(name identity);
    ACTION remcitizen(name identity, name manager);
    ACTION remmanager(name user);
    ACTION addmanager(name user);
    ACTION remcitreq(uint64_t id,name manager);    
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
        string dochash;
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
        
        name identity;
        
        uint64_t primary_key () const {return identity.value ;}
        
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

    typedef multi_index<"identity3"_n, identityt> identity_table;
    typedef multi_index<"manager11"_n, manager> manager_table;
    typedef multi_index<"citizen3"_n, citizenship> citizen_table;

    //  
};
