#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
using namespace eosio;
using namespace std;

CONTRACT lender : public contract
{
    using contract::contract;

  public:
    ACTION addloancatg(name identity, uint64_t category_id,
                       string desc,
                       uint8_t interestrate,
                       uint8_t period);
    ACTION addupdatecr(name identity, uint16_t crscore);
    ACTION reqloancolat(name identity, uint64_t catgid,
                            asset amt,
                            string purpose,vector<vector<uint64_t>> prop_id,
                            asset income, vector<uint64_t> colatopt);
    ACTION reqloanincm(name identity, uint64_t catgid,
                       asset amt,
                       string purpose,
                       asset income);
    ACTION approveloan(name identity, uint64_t reqloanid,
                       name borrower,
                       uint64_t approvedAt,
                       asset totaldue,
                       uint64_t finalduedt);
    ACTION loanpayment(name borrower, uint64_t reqloanid, asset amt);

    ACTION checkdefault(name identity, uint64_t reqloanid, name borrower);

    TABLE requestloan
    {
        uint64_t reqloanid;
        uint64_t catgid;
        name borrower;
        asset loanamt;
        string purpose;
        vector<uint64_t> colatopt;
        vector<vector<uint64_t>> prop_id;
        asset incomepm;
        string status = "requested";
        bool type;

        uint64_t primary_key() const { return reqloanid; }
    };

    TABLE approvedloan
    {
        uint64_t reqloanid;
        name borrower;
        uint64_t approvedAt;
        asset amtapproved;
        asset totaldue;
        uint64_t finalduedt;
        string status = "due";

        uint64_t primary_key() const { return reqloanid; }
    };

    TABLE creditscore
    {

        name borrower;
        uint16_t credscore;
        uint64_t primary_key() const { return borrower.value; }
    };

    TABLE loancatg
    {
        uint64_t category_id;
        string desc;
        uint8_t interestrate;
        uint8_t period;
        uint64_t primary_key() const { return category_id; }
    };

    TABLE idsupply
    {
        uint64_t id;
        uint64_t primary_key() const { return id; }
    };

    TABLE managertab
    {
        name user;
        uint64_t primary_key() const { return user.value; }
    };

    TABLE collateral
    {
        uint64_t id;
        string type;
        uint64_t primary_key() const { return id; }
    };

    TABLE properties
    {
        uint64_t propt_id;
        name owner;
        asset price;
        uint64_t primary_key() const { return propt_id; }
    };

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
        string identityname;
        string dob;
        string contact;
        string email;
        string dochash;
        bool citizen = false;
        uint64_t primary_key() const { return username.value; }
    };


  private:
    typedef multi_index<"identity3"_n, identityt> identity_table;
    typedef multi_index<"reqloan111"_n, requestloan> reqloan_tab;
    typedef multi_index<"approved111"_n, approvedloan> approveloan_tab;
    typedef multi_index<"credscore111"_n, creditscore> credscore_tab;
    typedef multi_index<"idsupp111"_n, idsupply> idsupp_table;
    typedef multi_index<"loancatg111"_n, loancatg> loancatg_table;
    typedef multi_index<"manager111"_n, managertab> manager_table;
    typedef multi_index<"collat111"_n, collateral> collat_tab;
    typedef multi_index<"properties"_n, properties> properties_table;
    typedef multi_index<"businesstb"_n, businessst> businesstb;
};