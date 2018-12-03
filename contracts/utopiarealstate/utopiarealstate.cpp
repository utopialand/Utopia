#include "utopiarealstate.hpp"

namespace
{

ACTION utopiarealstate::landproposal(string location, uint64_t area, name username, time startDate, time endDate, time progressDate, asset price)
{
    print("land proposal");
    require_auth(user);

    rs_table rt(_self, _self.value);
    rt.emplace(_self, [&](auto &rt {
        rt.id = pt.available_primary_key();
        rt.location = location;
        rt.area=area;
        rt.username username;
        rt.startDate = startDate;
        rt.endDate = endDate;
        rt.price = price;
        
    });
}

} // namespace
EOSIO_DISPATCH(eosio::utopiarealstate, (landproposal))