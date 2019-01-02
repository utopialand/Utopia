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

    ACTION deleteall();

    ACTION delcompany(uint64_t company_id);

    ACTION addemployee(uint64_t company_id, name employee);

    ACTION rmemployee(uint64_t company_id, name employee);

    ACTION printnames();

    ACTION createtandb(asset maximum_supply, name owner, string businessname);

    ACTION create(asset maximum_supply, name issuer);

    ACTION issue(name to, asset quantity, string memo);

    ACTION retire(asset quantity, string memo);

    ACTION dilute(asset quantity, string memo);

    ACTION concentrate(asset quantity, string memo);

    ACTION transfer(name from, name to, asset quantity, string memo);

    ACTION open(name owner, symbol_code symbol, name ram_payer);

    ACTION close(name owner, symbol_code symbol);

    ACTION listtoken(asset currency);

    ACTION transferm(name from, name to,asset amount);

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

    TABLE exchange_t
    {
        asset currency;
        uint64_t primary_key() const { return currency.symbol.code().raw(); }
    };
    typedef multi_index<"businesstb"_n, businessst> businesstb;
    typedef multi_index<"identity2"_n, identityt> identity_table;
    typedef eosio::multi_index<"exchange"_n, exchange_t> exchanges;

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