#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/print.hpp>
#include <string>

using namespace eosio;
using namespace std;

CONTRACT business : public contract
{

  public:
    using contract::contract;

    ACTION addbusiness(name owner, string businessname);

    ACTION deleteall();

    ACTION delcompany(uint64_t company_id);

    ACTION addemployee(uint64_t company_id, name employee);

    ACTION rmemployee(uint64_t company_id, name employee);

    ACTION adshareowner(uint64_t company_id, name shareholder);

    ACTION rmshareowner(uint64_t company_id, name shareholder);

    ACTION makepublic(uint64_t company_id, asset maximum_supply);

    ACTION printnames();

    ACTION create(uint64_t company_id);

    ACTION issue(name to, asset quantity, string memo);

    ACTION retire(asset quantity, string memo);

    ACTION transfer(name from, name to, asset quantity, string memo);

    ACTION open(name owner, symbol_code symbol, name ram_payer);

    ACTION close(name owner, symbol_code symbol);

    static asset get_supply(name token_contract_account, symbol_code sym)
    {
        stats statstable(token_contract_account, sym.raw());
        const auto &st = statstable.get(sym.raw());
        return st.supply;
    }

    static asset get_balance(name token_contract_account, name owner, symbol_code sym)
    {
        accounts accountstable(token_contract_account, owner.value);
        const auto &ac = accountstable.get(sym.raw());
        return ac.balance;
    }

    uint8_t CREATED = 0;
    uint8_t PUBLIC = 1;

    TABLE businessst
    {
        uint64_t company_id;
        uint8_t status;
        name owner;
        string businessname;
        asset token_maximum_supply;
        vector<name> shareholders;
        vector<name> employees;

        uint64_t primary_key() const { return company_id; }
    };

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

    typedef multi_index<"businesstb"_n, businessst> businesstb;
    typedef multi_index<"identity2"_n, identityt> identity_table;
    
    struct transfer_args
    {
        name from;
        name to;
        asset quantity;
        string memo;
    };

  private:
    TABLE account
    {
        asset balance;
        uint64_t primary_key() const { return balance.symbol.code().raw(); }
    };

    TABLE currency_stats
    {
        asset supply;
        asset max_supply;
        name issuer;
        uint64_t primary_key() const { return supply.symbol.code().raw(); }
    };

    typedef eosio::multi_index<"accounts"_n, account> accounts;
    typedef eosio::multi_index<"stat"_n, currency_stats> stats;

    void sub_balance(name owner, asset value);
    void add_balance(name owner, asset value, name ram_payer);
};