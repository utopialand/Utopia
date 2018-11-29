#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/singleton.hpp>

using namespace eosio;
using namespace std;

CONTRACT organization : public contract
{
  public:
    using contract::contract;
    ACTION addorgnz(name orgnz, name auth);
    ACTION remorgnz(name orgnz, name auth);
    ACTION addattribs(string attrib, name auth);
    ACTION remattribs(uint64_t id, name auth);
    ACTION remmanager(name user);
    ACTION addmanager(name user);
    ACTION addorgzattr(name orgnz, uint64_t attrib_id, name auth);
    ACTION remorgzattr(name orgnz, uint64_t attrib_id, name auth);
    ACTION reqattrib(name user, name orgnz, uint64_t attrib_id);
    ACTION approvattrib(uint64_t id, name orgnz);
    ACTION denyattrib(uint64_t id, name orgnz);
    ACTION settest(name user);
    ACTION gettest();
    
    TABLE attributes
    {
        uint64_t id;
        string name;
        uint64_t primary_key() const { return id; }
    };
    /*  TABLE endorsement {
            uint64_t id;
            name organization;
            uint64_t primary_key() const { return id;}
        }; */
    TABLE manager
    {
        name user;
        uint64_t primary_key() const { return user.value; }
    };

    TABLE orgnztable
    {
        name orgnzname;
        vector<string> attributes;
        uint64_t primary_key() const { return orgnzname.value; }
    };
    TABLE settingst
    {
        name manager;
    };

    TABLE attrib_request
    {
        uint64_t id;
        name user;
        name orgnz;
        uint64_t attrib_id;
        uint64_t primary_key() const { return id; }
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

    typedef singleton<"settings"_n, settingst> settings;
    typedef multi_index<"settings"_n, settingst> settings1;
    typedef multi_index<"orgnztable11"_n, orgnztable> orgnz_table;
    typedef multi_index<"attrib11"_n, attributes> attrib_table;
    typedef multi_index<"manager11"_n, manager> manager_table;
    typedef multi_index<"attribreq11"_n, attrib_request> attribreq_table;
};