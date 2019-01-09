#pragma once

#include <eosiolib/asset.hpp>
#include <eosiolib/eosio.hpp>
#include <string>
#include <math.h>
#include <eosiolib/multi_index.hpp>
using namespace eosio;
namespace eosiosystem
{
class system_contract;
}

using std::string;

CONTRACT debt : public eosio::contract
{
  using contract::contract;

public:
  ACTION transfer(name from, name to, asset quantity, string memo);
  ACTION init(name owner);
  ACTION apply(name contract, name act);
  ACTION distamt(name identity);
  ACTION updateusdeos(name identity, asset eosvalue, float usdval);
  ACTION delreqloan(uint64_t id);

  TABLE amtdeposit
  {
    uint64_t id;
    name username;
    uint64_t paymentAt;
    asset amount;
    float eqUSD;
    bool status;
    asset retamt;
    uint64_t primary_key() const { return id; }
  };

  TABLE managertab
  {
    name user;
    uint64_t primary_key() const { return user.value; }
  };

  TABLE account
  {
    asset balance;

    uint64_t primary_key() const { return balance.symbol.code().raw(); }
  };

  TABLE usdtoeos
  {
    asset eosvalue;
    float usdvalue;

    uint64_t primary_key() const { return eosvalue.symbol.code().raw(); }
  };

  asset get_balance(name owner, asset value) const
  {
    accounts accountstable("eosio.token"_n, owner.value);
    auto itr = accountstable.find(value.symbol.code().raw());
    return itr->balance;
  }

private:
  typedef multi_index<"deposit114"_n, amtdeposit> amtdepo_tab;
  typedef multi_index<"manager111"_n, managertab> manager_table;
  typedef multi_index<"accounts"_n, account> accounts;
  typedef multi_index<"usdeos113"_n, usdtoeos> usdtoeos_tab;
};