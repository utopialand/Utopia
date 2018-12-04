#include "business.hpp"

ACTION business::addbusiness(name owner, string businessname)
{

    require_auth(owner);

    identity_table idtb("identityreg1"_n, "identityreg1"_n.value);
    businesstb bt(_self, _self.value);
    auto eitr = idtb.find(owner.value);
    eosio_assert(eitr != idtb.end(), "Not a member of Utopia community");

    bt.emplace(_self, [&](auto &c) {
        c.company_id = bt.available_primary_key();
        c.owner = owner;
        c.businessname = businessname;
        c.status = CREATED;
    });
}

ACTION business::approve(uint64_t company_id)
{

    require_auth(_self);
    businesstb bt(_self, _self.value);
    auto itr = bt.find(company_id);
    eosio_assert(itr != bt.end(), "No such company exist");

    bt.modify(itr, _self, [&](auto &c) {
        c.status = APPROVED;
    });
}

ACTION business::makepublic(uint64_t company_id, asset maximum_supply)
{

    businesstb bt(_self, _self.value);
    auto itr = bt.find(company_id);
    require_auth(itr->owner); 
    eosio_assert(itr != bt.end(), "No such company exists");
    name issuer = itr->owner;

    //creating token on utopiatoken smart contract
    action(
        permission_level{"amartesttest"_n, "active"_n},
        "amartesttest"_n, "create"_n,
        std::make_tuple(issuer,maximum_supply)
    ).send();

    bt.modify(itr, _self, [&](auto &c){
        c.token_maximum_supply = maximum_supply;
    });
}

ACTION business::deleteall()
{

    //delets all data/companies
    require_auth(_self);
    businesstb bt(_self, _self.value);
    auto itr = bt.begin();
    while (itr != bt.end())
    {
        itr = bt.erase(itr);
    }
}

ACTION business::delcompany(uint64_t company_id)
{

    //delete one company
    require_auth(_self);
    businesstb bt(_self, _self.value);
    auto itr = bt.find(company_id);
    eosio_assert(itr != bt.end(), "Company does not exist");
    itr = bt.erase(itr);
}

ACTION business::addemployee(uint64_t company_id, name employee)
{
    //searching for employee in utopia
    identity_table idtb("identityreg1"_n, "identityreg1"_n.value);
    businesstb bt(_self, _self.value);
    auto eitr = idtb.find(employee.value);
    eosio_assert(eitr != idtb.end(), "Not a member of Utopia community");
    //searching for company
    auto citr = bt.find(company_id);
    eosio_assert(citr != bt.end(), "Company does not exist");
    require_auth(citr->owner);
    //searching for employee in your company if exists do not add
    auto aditr = find(citr->employees.begin(), citr->employees.end(), employee);
    eosio_assert(aditr == citr->employees.end(), "Employee already exists");
    //add employee to your company
    bt.modify(citr, _self, [&](auto &c) {
        c.employees.push_back(employee);
    });
}

ACTION business::rmemployee(uint64_t company_id, name employee)
{
    //searching for employee in utopia
    identity_table idtb("identityreg1"_n, "identityreg1"_n.value);
    businesstb bt(_self, _self.value);
    auto eitr = idtb.find(employee.value);
    eosio_assert(eitr != idtb.end(), "Not a member of Utopia community");
    //searching for company
    auto citr = bt.find(company_id);
    eosio_assert(citr != bt.end(), "Company does not exist");
    require_auth(citr->owner);
    //searching for employee in your company
    auto rmeitr = find(citr->employees.begin(), citr->employees.end(), employee);
    eosio_assert(rmeitr != citr->employees.end(), "No such employee exists in your company");
    //removing the employee from your company
    bt.modify(citr, _self, [&](auto &c) {
        c.employees.erase(rmeitr);
    });
}

ACTION business::printnames()
{
    require_auth(_self);

    identity_table id("identityreg1"_n, "identityreg1"_n.value);
    auto itr = id.begin();
    while (itr != id.end())
    {
        print(" --identity--> ", name{itr->username});
        itr++;
    }
}

ACTION business::adshareowner(uint64_t company_id, name shareholder)
{

    identity_table idtb("identityreg1"_n, "identityreg1"_n.value);
    businesstb bt(_self, _self.value);
    auto eitr = idtb.find(shareholder.value);
    eosio_assert(eitr != idtb.end(), "Not a member of Utopia community");

    auto citr = bt.find(company_id);
    eosio_assert(citr != bt.end(), "Company does not exist");
    require_auth(citr->owner);

    auto aditr = find(citr->shareholders.begin(), citr->shareholders.end(), shareholder);
    eosio_assert(aditr == citr->shareholders.end(), "Shareholder already exists");

    bt.modify(citr, _self, [&](auto &c) {
        c.shareholders.push_back(shareholder);
    });
}

ACTION business::rmshareowner(uint64_t company_id, name shareholder)
{

    identity_table idtb("identityreg1"_n, "identityreg1"_n.value);
    businesstb bt(_self, _self.value);
    auto eitr = idtb.find(shareholder.value);
    eosio_assert(eitr != idtb.end(), "Not a member of Utopia community");

    auto citr = bt.find(company_id);
    eosio_assert(citr != bt.end(), "Company does not exist");
    require_auth(citr->owner);

    auto rmeitr = find(citr->shareholders.begin(), citr->shareholders.end(), shareholder);
    eosio_assert(rmeitr != citr->shareholders.end(), "No such shareholder exists in your company");
    //removing the employee from your company
    bt.modify(citr, _self, [&](auto &c) {
        c.shareholders.erase(rmeitr);
    });
}

EOSIO_DISPATCH(business, (addbusiness)(approve)(makepublic)(deleteall)(delcompany)(addemployee)(rmemployee)(printnames)(adshareowner)(rmshareowner))