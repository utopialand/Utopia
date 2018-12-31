#include "visitorcon.hpp"
ACTION visitorcon::apply(name visitor,uint64_t stduration){    
require_auth(_self);   
visitor_entry ve(_self,_self.value);
ve.emplace(_self,[&] (auto &e){
e.id=ve.available_primary_key();
e.visitor=visitor;
e.duration=now()+(24 * 60 * 60 * stduration);
e.visitorstatus = false;
});
print("done---");
}

ACTION visitorcon::approve(name manager,name visitor){  
eosio_assert(is_manager(manager), "Not Authorized");
identity_table iden_table("identityreg1"_n, "identityreg1"_n.value);
auto itr = iden_table.find(visitor.value);
if(itr != iden_table.end()){
visitor_entry ve(_self,_self.value);
auto itr2 = ve.find(visitor.value);
ve.modify(itr2,_self,[&] (auto &e){
e.visitorstatus = true;
});
}
}
ACTION visitorcon::move(name manager,name visitor){  
eosio_assert(is_manager(manager), "Not Authorized manager");
visitor_entry ve(_self,_self.value);
auto itr2 = ve.find(visitor.value);
if(itr2->duration>=now() ){
ve.erase(itr2);
}
    
}


EOSIO_DISPATCH(visitorcon,(apply)(approve)(move)) 
