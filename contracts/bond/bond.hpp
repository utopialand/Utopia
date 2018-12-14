#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>
#include <string>
using namespace eosio;
using namespace std;

CONTRACT bond : public contract
{
    using contract::contract;

  public:
    ACTION buybond(name bondbuyer,uint64_t id,asset payamount);
    ACTION addbond(name bondissuer,string bond,uint64_t maturity,uint64_t couponrate,uint64_t couponintervel,asset facevalue);
    ACTION getcoupon(uint64_t id);
   
    TABLE bondinfo{
        uint64_t id;
        name bondissuer;
        string bond;
        uint64_t issueddate;
        uint64_t maturity;
        uint64_t maturitycount;
        uint64_t couponrate;
        uint64_t couponintervel;
        uint64_t putprice;
        uint64_t callprice;
        asset facevalue;
        vector <name> bondholders;
        uint64_t primary_key() const {return id;}
    };
     TABLE bondbuyerdetails{
        uint64_t id;
        name bondbuyer;
        string bond;
        uint64_t buydate;
        asset payamount;
        vector <uint64_t> returningdate;
        uint64_t primary_key() const {return id;}
    };
    typedef multi_index<"bonddetail1"_n,bondinfo> bond_entry;
    typedef multi_index<"buyerdata1"_n,bondbuyerdetails> bondbuyer_entry;
};