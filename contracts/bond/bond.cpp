#include "bond.hpp"

ACTION bond::tab1(name user,string entry,uint64_t id){
print("hello1");
table1_entry tab1entry(_self,_self.value);
tab1entry.emplace(_self, [&] (auto &e1){
    e1.user=user;
    e1.id=id;
    e1.entry=entry;
});
}
ACTION bond::tab2(name user2,uint64_t id2){
print("hello2");
table2_entry tab2entry(_self,_self.value);
tab2entry.emplace(_self, [&] (auto &e2){
    e2.user2=user2;
    e2.id2=id2;
});
}
ACTION bond::migrate(){

///max to less table field

/*  table2_entry tab2entry(_self,_self.value);
    auto itr2 = tab2entry.end();
    table1_entry tab1entry(_self,_self.value);
    auto itr = tab1entry.begin();
    while(itr != tab1entry.end()){
    print("----",itr->user);
    tab2entry.emplace(_self, [&] (auto &e2){
    e2.user2=itr->user;
    e2.id2=itr->id;
});
//itr++;
     itr = tab1entry.erase(itr); */
     
     ///less to max table field

    table2_entry tab2entry(_self,_self.value);
    auto itr2 = tab2entry.begin();
    table1_entry tab1entry(_self,_self.value);
    auto itr = tab1entry.begin();
    while(itr2 != tab2entry.end()){
    print("----",itr2->user2);
    tab1entry.emplace(_self, [&] (auto &e1){
    e1.user=itr2->user2;
    e1.id=itr2->id2;
});
//itr2++;
    itr2 = tab2entry.erase(itr2);
}
}
ACTION bond::addbond(){
    print("enter in bond section");
    
}
EOSIO_DISPATCH(bond,(tab1)(tab2)(migrate))