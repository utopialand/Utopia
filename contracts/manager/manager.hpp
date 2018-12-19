#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/singleton.hpp>
#include <cstdlib>


using namespace eosio;
using namespace std;

CONTRACT manager : public contract
{
  public:
    using contract::contract;
    ACTION remmanager(name user);
    ACTION addmanager(name user);
  
    TABLE managertab
    {
        name user;
        uint64_t primary_key() const { return user.value; }
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

    
    typedef multi_index<"manager111"_n, managertab> manager_table;
    
    //
};
