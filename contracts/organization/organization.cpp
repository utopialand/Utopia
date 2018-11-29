#include "organization.hpp"


ACTION organization::gettest(){
    
    print("test------");
    settings settings_table(_self,_self.value);
    bool settings_exists = settings_table.exists();
    eosio_assert(settings_exists, "settings not defined");
    auto st = settings_table.get();
    print("manager----",st.manager);
}

ACTION organization::settest(name user){
    settings settings_table(_self,_self.value);
    settingst new_settings;
    new_settings.manager = user;
    settings_table.set(new_settings,_self);
    print("set test------");
}

ACTION organization::addmanager(name user){
    print("add manager");
    require_auth(_self);
    manager_table mt(_self,_self.value);
    mt.emplace(_self,[&](auto &v){
        v.user = user;
    });
    //asset test = asset(10000000000000000000000,symbol(symbol_code("BTC"),18));
} 

 ACTION organization::remmanager(name user){
    print("remove manager");
    require_auth(_self);
    manager_table mt(_self,_self.value);
    auto itr = mt.find(user.value);
    eosio_assert(itr!=mt.end(),"manager not found");
    mt.erase(itr);

}

ACTION organization::addorgnz(name orgnz,name auth){
    eosio_assert(is_manager(auth),"Not Authorized");
    orgnz_table ot(_self,_self.value);
    print("add organization ");
    ot.emplace(_self,[&](auto &v){
        v.orgnzname = orgnz;
    });
}

ACTION organization::remorgnz(name orgnz,name auth){
    print("remove organization");
    eosio_assert(is_manager(auth),"Not Authorized");
    orgnz_table ot(_self,_self.value);
    auto itr = ot.find(orgnz.value);
    eosio_assert(itr!=ot.end(),"organization not found");
    ot.erase(itr);
}



ACTION organization::addattribs(string attrib,name auth){
    print("add atrributes");
    print("1----");
    eosio_assert(is_manager(auth),"Not Authorized");
    attrib_table at(_self,_self.value);
    at.emplace(_self,[&](auto &v){
        v.id = at.available_primary_key();
        v.name = attrib;
    });
}

ACTION organization::remattribs(uint64_t id,name auth){
    print("remove attributds");
    eosio_assert(is_manager(auth),"Not Authorized");
    attrib_table at(_self,_self.value);
    auto itr = at.find(id);
    eosio_assert(itr!=at.end(),"attrib not found");
    at.erase(itr);
}

ACTION organization::addorgzattr(name orgnz,uint64_t attrib_id,name auth){
    print("add orgnz attrib");
    eosio_assert(is_manager(auth),"Not Authorized");
    attrib_table at(_self,_self.value);
    orgnz_table ot(_self,_self.value);
    auto ot_itr = ot.find(orgnz.value);
    eosio_assert(ot_itr !=ot.end(),"organization not found");
    auto at_itr = at.find(attrib_id);
    eosio_assert(at_itr != at.end(),"attribut not found");
    ot.modify(ot_itr,_self,[&](auto &v){
        v.attributes.push_back(at_itr->name);
    });
}

ACTION organization::remorgzattr(name orgnz,uint64_t attrib_id,name auth){
    print("remove orgnz attrib");
    eosio_assert(is_manager(auth),"Not Authorized");
    attrib_table at(_self,_self.value);
    orgnz_table ot(_self,_self.value);
    auto ot_itr = ot.find(orgnz.value);
    eosio_assert(ot_itr !=ot.end(),"organization not found");
    auto at_itr = at.find(attrib_id);
    eosio_assert(at_itr != at.end(),"attribut not found");
    // ot.modify(ot_itr,_self,[&](auto &v){
    //     for(auto &val=ot_itr->attributes.begin(); val != ot_itr->attributes.end(); ++val ){
    //         print("1");
    //     }
    // });
}

ACTION organization::reqattrib(name user,name orgnz,uint64_t attrib_id){
    print("request attrib");
    require_auth(user);
    attribreq_table at(_self,_self.value);
    at.emplace(_self,[&](auto &v){
        v.id = at.available_primary_key();
        v.user = user;
        v.orgnz = orgnz;
        v.attrib_id = attrib_id;
    });
}

ACTION organization::approvattrib(uint64_t id,name orgnz){
    print("approve attrib");
    require_auth(orgnz);
}

ACTION organization:: denyattrib(uint64_t id,name orgnz){
    print("dney attrib");
    require_auth(orgnz);
}

EOSIO_DISPATCH( organization,
                (addorgnz)
                (remorgnz)
                (settest)
                (gettest)
                (addattribs)
                (remattribs)
                (remmanager)
                (addmanager)
                (addorgzattr)
                (remorgzattr)
                (reqattrib)
                (approvattrib)
                (denyattrib)
               ) 