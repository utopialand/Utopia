#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;
using namespace std;

CONTRACT bond : public contract
{
    using contract::contract;

  public:
    ACTION tab1(name user,string entry,uint64_t id);
    ACTION tab2(name user2,uint64_t id2);
    ACTION migrate();
    TABLE table1{
        name user;
        string entry;
        uint64_t id;
        uint64_t primary_key() const {return id;}
    };
    TABLE table2{
        name user2;
        uint64_t id2;
        uint64_t primary_key() const {return id2;}
    };
    TABLE bondinfo{
        uint64_t id;
        string bond;
        date issueddate;
        uint64_t timeperiod;
        uint64_t interest;
        uint64_t primary_key() const {return id;}
    };
    typedef multi_index<"bondinfo"_n,bondinfo> bond_entry;
    typedef multi_index<"table111"_n,table1> table1_entry;
    typedef multi_index<"table4"_n,table2> table2_entry;
};