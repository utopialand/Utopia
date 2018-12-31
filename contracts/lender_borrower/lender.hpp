#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
using namespace eosio;
using namespace std;

CONTRACT lender : public contract
{
    using contract::contract;

  public:
    ACTION addloancatg(name identity,
                       string desc,
                       float interestrate,
                       int period);

    ACTION reqloancolat(name identity, uint64_t catgid,
                            asset amt,
                            string purpose, vector<uint64_t> prop_id,
                            asset income, uint64_t colatopt, string type);

    ACTION reqloanincm(name identity, uint64_t catgid,
                           asset amt,
                           string purpose,
                           asset income, string type);

    ACTION addcollat(name identity,
                     string desc);

    ACTION approveloan(name identity, uint64_t reqloanid);
    ACTION approveinst(name identity, uint64_t reqloanid);
    ACTION checkdefault(name identity, uint64_t reqloanid);
    ACTION checkauction(name identity, uint64_t reqloanid);
    ACTION checkbid(name identity, uint64_t reqloanid);
    ACTION loanpayment(name payer, uint64_t reqloanid, asset amt);
    ACTION paymentacpt(name identity, uint64_t reqloanid);
    ACTION paymentinst(name identity, uint64_t reqloanid);
    ACTION delreqloan(uint64_t id);

    TABLE loancatg
    {
        uint64_t category_id;
        string desc;
        float interestrate;
        int period;
        uint64_t primary_key() const { return category_id; }
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

    TABLE idsupply
    {
        uint64_t id;
        uint64_t primary_key() const { return id; }
    };
    TABLE requestloan
    {
        uint64_t reqloanid;
        uint64_t catgid;
        name borrower;
        asset loanamt;
        string purpose;
        uint64_t colatopt;
        vector<uint64_t> prop_id;
        asset incomepm;
        string status;
        bool type;
        string loantype;

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
        asset fineamt;
        uint64_t primary_key() const { return reqloanid; }
    };

    TABLE instalment
    {
        uint64_t reqloanid;
        name borrower;
        uint64_t approvedAt;
        asset amtapproved;
        asset totaldue;
        asset monthlydue;
        uint64_t finalduedt;
        uint64_t monthlyduedt;
        int noofinst;
        string status = "due";
        asset fineamt;
        uint64_t primary_key() const { return reqloanid; }
    };

    TABLE properties
    {
        uint64_t propt_id;
        name owner;
        asset price;
        uint64_t primary_key() const { return propt_id; }
    };

    TABLE paymentdet
    {
        uint64_t reqloanid;
        name payer;
        asset amount;
        uint64_t paymentAt;
        uint64_t primary_key() const { return reqloanid; }
    };
    TABLE credscore
    {
        name username;
        float creditscore;
        bool isdefaulter = false;
        uint64_t primary_key() const { return username.value; }
    };

    TABLE bidtable
    {
        uint64_t id;
        name currentOwner;
        asset currentprice;
        uint64_t startdate;
        uint64_t enddate;
        bool bidstatus = true;
        string rsproposal = "created";
        uint64_t primary_key() const { return id; }
    };
    /*   
    


    TABLE creditscore
    {

        name borrower;
        uint16_t credscore;
        uint64_t primary_key() const { return borrower.value; }
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

     
 */

    /* private:
    
   
    typedef multi_index<"credscore111"_n, creditscore> credscore_tab;    
    
    typedef multi_index<"businesstb"_n, businessst> businesstb;
     */
    typedef multi_index<"loancatg113"_n, loancatg> loancatg_table;
    typedef multi_index<"manager111"_n, managertab> manager_table;
    typedef multi_index<"collat111"_n, collateral> collat_tab;
    typedef multi_index<"identity3"_n, identityt> identity_table;
    typedef multi_index<"reqloan113"_n, requestloan> reqloan_tab;
    typedef multi_index<"idsupp111"_n, idsupply> idsupp_table;
    typedef multi_index<"approved113"_n, approvedloan> approveloan_tab;
    typedef multi_index<"instalment11"_n, instalment> instalment_tab;
    typedef multi_index<"properties1"_n, properties> properties_table;
    typedef multi_index<"payment111"_n, paymentdet> paymentdet_tab;
    typedef multi_index<"cscore112"_n, credscore> cscore_table;
    typedef multi_index<"bidtable1"_n, bidtable> bid_table;
};