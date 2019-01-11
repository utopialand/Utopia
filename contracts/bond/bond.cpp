#include "bond.hpp"
ACTION bond::addbond(name bondissuer,string bond,uint64_t maturity,uint64_t couponrate,uint64_t couponintervel,asset facevalue){    
require_auth(bondissuer);   
bond_entry be(_self,_self.value);
be.emplace(_self,[&] (auto &e){
e.id=be.available_primary_key();
e.bondissuer=bondissuer;
e.bond=bond;
e.issueddate=now();
e.maturity=now()+ (24 * 60 * 60 * 365) * maturity;
if(couponintervel == 6){
e.maturitycount=maturity*2;
}else{
e.maturitycount=maturity;
}
e.couponrate=couponrate;
e.couponintervel=couponintervel;
e.facevalue=facevalue;
});
print("done---");
}

ACTION bond::buybond(name bondbuyer,uint64_t id, asset payamount){
print("enter");
bond_entry be(_self,_self.value);
auto itr=be.find(id);
uint64_t count;
for(uint64_t i=0;i<=itr->bondholders.size();i++){
  if(itr->bondholders[i]==bondbuyer){
    count = 1;
  }else{
    count = 0;
  }
}
eosio_assert(count == 0,"buyer is already exist!!!");
//uint64_t timer=itr->issueddate + (24 * 60 * 60 * 30) * itr->couponintervel;
uint64_t timer=now() + 60*2;
  require_auth(bondbuyer);
  action(
            permission_level{bondbuyer, "active"_n},
            "utptokencon1"_n, "transfer"_n,
            std::make_tuple(bondbuyer, _self, payamount, std::string("buying bond")))
            .send();

bondbuyer_entry bbe(_self,bondbuyer.value);
bbe.emplace(_self,[&] (auto &v){
v.id=bbe.available_primary_key();
v.bondbuyer=bondbuyer;
v.bond=itr->bond;
v.buydate=now();
v.payamount=payamount;
v.returningdate.push_back(timer);
}); 
be.modify(itr,_self,[&] (auto &e){
e.bondholders.push_back(bondbuyer);
});
    
}
ACTION bond::getcoupon(uint64_t id){

  require_auth(_self);
  bond_entry be(_self,_self.value);
  auto itr=be.find(id);
  for(uint64_t i=0;i<itr->bondholders.size();i++){
    bondbuyer_entry bbe(_self,itr->bondholders.at(i).value);
    auto itr2=bbe.find(id);
    uint64_t pay = itr2->payamount.amount*itr->couponrate/100;
    uint64_t payamount;
    if(itr->couponintervel == 6){
    payamount = pay/2;
    ////loop continue to double of maturity
    }else{
    payamount = pay;
    ////loop continue to equal to maturity
    }
    print("amount--",payamount);
    if(now()>itr->issueddate && now()>=itr2->returningdate.back() && now()<itr->maturity){
    if(itr2->returningdate.size()<itr->maturitycount){
           asset amount = asset(payamount, symbol(symbol_code("UTP"),4));    
            action(
                      permission_level{_self, "active"_n},
                      "utptokencon1"_n, "transfer"_n,
                      std::make_tuple(_self,itr->bondholders.at(i) ,amount, std::string("buying bond")))
                      .send();  
            bbe.modify(itr2,_self,[&] (auto &e){
            //e.returningdate.push_back(now()+(24 * 60 * 60 * 30) * itr->couponintervel);
            e.returningdate.push_back(now()+60*2);
          });   
    }else if(itr2->returningdate.size()==itr->maturitycount)
         {
             asset amount = asset(payamount+itr2->payamount.amount, symbol(symbol_code("UTP"),4));    
            action(
                      permission_level{_self, "active"_n},
                      "utptokencon1"_n, "transfer"_n,
                      std::make_tuple(_self,itr->bondholders.at(i) ,amount, std::string("buying bond")))
                      .send();  
            bbe.modify(itr2,_self,[&] (auto &e){
            e.returningdate.push_back(404);
          });   
         }else{
            print("payment submission is successfull");
         }  
         
  }else{
    print("--",now(),",time is left,",itr2->returningdate.back());
  }
  }
  
}

EOSIO_DISPATCH(bond,(addbond)(buybond)(getcoupon)) 
