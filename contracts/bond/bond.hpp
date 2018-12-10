#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>
using namespace eosio;
using namespace std;

CONTRACT bond : public contract
{
    using contract::contract;

  public:
    ACTION tab1(name user,string entry,uint64_t id);
    ACTION tab2(name user2,uint64_t id2);
    ACTION buybond(name bondbuyer,uint64_t bond,asset payamount);
    ACTION addbond(name bondissuer,uint64_t bond,uint64_t maturity,uint64_t couponrate,uint64_t couponintervel,uint64_t putprice,uint64_t callprice,asset facevalue);
    ACTION migrate();
    ACTION getcoupon(name bondbuyer,uint64_t bond);
   
    TABLE bondinfo{
        uint64_t id;
        name bondissuer;
        uint64_t bond;
        uint64_t issueddate;
        uint64_t maturity;
        uint64_t couponrate;
        uint64_t couponintervel;
        uint64_t putprice;
        uint64_t callprice;
        asset facevalue;
        vector <name> bondholders;
        uint64_t primary_key() const {return bond;}
    };
     TABLE bondbuyerdetails{
        uint64_t id;
        name bondbuyer;
        uint64_t bond;
        uint64_t buydate;
        asset payamount;
        uint64_t primary_key() const {return bond;}
    };
    typedef multi_index<"bondinfos1"_n,bondinfo> bond_entry;
    typedef multi_index<"buyer1"_n,bondbuyerdetails> bondbuyer_entry;
};