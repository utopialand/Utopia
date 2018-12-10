#include "bond.hpp"
ACTION bond::addbond(name bondissuer,uint64_t bond,uint64_t maturity,uint64_t couponrate,uint64_t couponintervel,uint64_t putprice,uint64_t callprice,asset facevalue){    
require_auth(_self);   
bond_entry be(_self,bond);
be.emplace(_self,[&] (auto &e){
print("-----");
e.id=be.available_primary_key();
e.bondissuer=bondissuer;
e.bond=bond;
e.issueddate=now();
e.maturity=now()+ (24 * 60 * 60) * maturity;
e.couponrate=couponrate;
e.couponintervel=now()+ (24 * 60 * 60) * 180;
e.putprice=putprice;
e.callprice=callprice;
e.facevalue=facevalue;
});
print("done");
}

ACTION bond::buybond(name bondbuyer,uint64_t bond,asset payamount){

  require_auth(bondbuyer);
  action(
            permission_level{bondbuyer, "active"_n},
            "eosio.token"_n, "transfer"_n,
            std::make_tuple(bondbuyer, _self, payamount, std::string("buying bond")))
            .send();

bondbuyer_entry bbe(_self,bondbuyer.value);
bbe.emplace(_self,[&] (auto &v){
v.id=bbe.available_primary_key();
v.bondbuyer=bondbuyer;
v.bond=bond;
v.buydate=now();
v.payamount=payamount;
}); 

bond_entry be(_self,bond);
auto itr=be.find(bond);
be.modify(itr,_self,[&] (auto &e){
e.bondholders.push_back(bondbuyer);
});
    print("enter");
}
ACTION bond::getcoupon(name bondbuyer,uint64_t bond){

  require_auth(_self);
  bond_entry be(_self,bond);
  auto itr=be.find(bond);
  bondbuyer_entry bbe(_self,bondbuyer.value);
  auto itr2=bbe.find(bond);
  uint64_t payamount = itr2->payamount.amount*itr->couponrate/100;
  print("---",payamount);
  /* if(now()==itr2->buydate+ 24*60*60*180){
    print("---",payamount);
  action(
            permission_level{_self, "active"_n},
            "eosio.token"_n, "transfer"_n,
            std::make_tuple(_self,bondbuyer , payamount, std::string("buying bond")))
            .send();  
  } */

 print("entercoupon--",itr->maturity);
}
EOSIO_DISPATCH(bond,(addbond)(buybond)) 