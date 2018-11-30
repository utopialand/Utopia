#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;
using namespace std;

CONTRACT business : public contract{

    public:
        using contract::contract;

        ACTION addbusiness(name owner, string businessname);

        ACTION makepublic(uint64_t id, double marketcap, double totalshares);

        ACTION newshareprice(uint64_t id, double newshareprice);

        ACTION newtotalshare(uint64_t id, double newtotalshare);

        ACTION deleteall();

        TABLE businessst{
            uint64_t id;
            name owner;
            string businessname;
            double marketcap;
            double totalshares;
            double shareprice;
            double sharestart;
            double shareend;
            vector <string> officers;
            vector <string> employees;

            uint64_t primary_key() const { return id; }
        };

        typedef multi_index<"businesstb"_n, businessst> businesstb;
};