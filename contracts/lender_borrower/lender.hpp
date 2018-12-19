#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
using namespace eosio;
using namespace std;

CONTRACT lender : public contract
{
    using contract::contract;

  public:

  ACTION reqloan(name identity,uint64_t catgid,asset amt,
                string purpose,vector<uint64_t> prop_id,asset income); 


                 
  TABLE requestloan
  {
      uint64_t reqloanid;
      uint64_t catgid;
      name borrower;
      asset loanamt;
      string purpose;
      vector<int> prop_id;
      asset incomepm;
      string status ="requested";

  }

  TABLE approvedloan
  {
      uint64_t reqloanid;
      name borrower;
      uint64_t approvedAt;
      asset totaldue;
      uint64_t finalduedt;
     

  }

  TABLE creditscore
  {
     
      name borrower; 
      uint16_t credscore;
  }

  TABLE loancatg
  {
      uint64_t category_id;
      string desc;
      uint8_t interestrate;
      uint8_t period;
      
  }

  private:
    typedef multi_index<"reqloan111"_n, requestloan> reqloan_tab;
    typedef multi_index<"approved111"_n, approvedloan> approveloan_tab;
    typedef multi_index<"credscore111"_n, creditscore> credscore_tab;


};