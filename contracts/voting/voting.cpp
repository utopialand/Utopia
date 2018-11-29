#include "voting.hpp"

ACTION voting::test()
{
    helper();
}

ACTION voting::createprop(string proposal, string detail, uint16_t duration, vector<string> options, name user, uint16_t numwinners)
{
    print("create votes");
    require_auth(user);
    identity_table iden_table("identityreg1"_n, "identityreg1"_n.value);
    auto itr = iden_table.find(user.value);
    eosio_assert(itr != iden_table.end(), "identity not found !!!");
    proposal_table pt(_self, _self.value);
    pt.emplace(_self, [&](auto &v) {
        v.id = pt.available_primary_key();
        v.duration = now() + (24 * 60 * 60) * duration;
        v.proposal_description = proposal;
        v.proposal_detail = detail;
        v.proposal_options = options;
        v.num_of_winners = numwinners;
        v.status = 1;
    });
}

ACTION voting::delprop(uint64_t id, name user)
{
    print("delete proposal");
    eosio_assert(is_manager(user), "not authorized");
    proposal_table pt(_self, _self.value);
    votes_table vt(_self, _self.value);
    auto itr = pt.find(id);
    eosio_assert(itr != pt.end(), "proposal not found");
    pt.erase(itr);
    auto vote_itr = vt.begin();
    /*  while (vote_itr != vt.end())
    {
        //print("voter--->", vote_itr->proposal_id);
         if (vote_itr->proposal_id == id)
        {test(); 
            vote_itr = vt.erase(vote_itr);
            
            
       // }
    } */
}

ACTION voting::voteprop(uint64_t propid, vector<uint8_t> choices, name identity)
{
    print("vote on proposal");
    require_auth(identity);
    identity_table iden_table("identityreg1"_n, "identityreg1"_n.value);
    auto itr = iden_table.find(identity.value);
    eosio_assert(itr != iden_table.end(), "identity not found !!!");
    votes_table vt(_self, _self.value);
    proposal_table pt(_self, _self.value);
    auto pt_itr = pt.find(propid);
    print("option proposal----", pt_itr->proposal_options.size());
    print("input array size----", choices.size());
    eosio_assert(pt_itr->proposal_options.size() == choices.size(), "incorrect choices array size");
    eosio_assert(pt_itr != pt.end(), "proposal not found");

    ///////////////////////
    auto max = choices[0];
    for (auto i = 0; i < choices.size(); i++)
    {

        for (auto j = i + 1; j < choices.size(); j++)
        {
            eosio_assert(choices[i] != choices[j], "more than one optin cannot have same rank!!!");
        }
    }
    for (auto k = 1; k < choices.size(); k++)
    {
        if (choices[k] > max)
            max = choices[k];
    }
    eosio_assert(max == choices.size(), "highest rank should be equal to the total number of options provided..");

    //////////////////////

    auto vote_itr = vt.begin();
    while (vote_itr != vt.end())
    {
        print("voter--->", vote_itr->identity);
        eosio_assert(vote_itr->identity != identity || vote_itr->proposal_id != propid, "already voted");
        vote_itr++;
    }
    eosio_assert(pt_itr->status == 1, "proposal is not active");
    vt.emplace(_self, [&](auto &v) {
        v.id = vt.available_primary_key();
        v.identity = identity;
        v.proposal_id = propid;
        v.choices = choices;
    });
}

ACTION voting::decidewinner(uint64_t id, name user)
{
    eosio_assert(is_manager(user), "not authorized");
    proposal_table pt(_self, _self.value);
    votes_table vt(_self, _self.value);
    result_table rt(_self, _self.value);
    auto prop_itr = pt.find(id);
    eosio_assert(prop_itr != pt.end(), "proposal not found");
    //eosio_assert(now() >= prop_itr->duration,"voting is still going one");
    auto number_of_prop = prop_itr->proposal_options.size();
    auto vote_itr = vt.begin();
    vector<vector<uint8_t>> votes;
    while (vote_itr != vt.end())
    {
        if (vote_itr->proposal_id == id)
        {
            votes.push_back(vote_itr->choices);
        }
        vote_itr++;
    }
    auto selection_size = prop_itr->num_of_winners;
    auto number_of_votes = votes.size();
    auto votes_required = (int)number_of_votes / selection_size;
    // vector<int> votes_count = {static_cast<int>(prop_itr->proposal_options.size()), 0};
    vector<int> votes_count(prop_itr->proposal_options.size(), 0);

    for (auto i = votes.begin(); i != votes.end(); i++)
    {
        auto option = *i;
        auto index = 0;
        for (auto j = option.begin(); j != option.end(); j++)
        {
            int value = *j;
            if (value == 1)
            {
                votes_count[index] += 1;
            }
            index++;
        }
    }
    // print("--", votes_count.size());
    for (auto i = 0; i < prop_itr->proposal_options.size(); i++)
    {
        //  print("each--", votes_count[i]);
    }
    //////////// calculation///////////
    vector<int> winner(selection_size, prop_itr->proposal_options.size());
    auto winnercount = 0;
    //print("selection size----",votes_required);
    while (winnercount != selection_size)
    {
        auto max = findmax(votes_count);
        auto min = findmin(votes_count);
        // print("max--", max);
        // print("min--", min);
        /////////////////////loop for surplus or already winner check(r1)/////
        for (auto i = 0; i < votes_count.size(); i++)
        {
            if (votes_count[i] >= votes_required)
            {
                if (votes_count[i] == votes_required)
                {
                    //  print("in equal--",i);
                    winner[winnercount] = i;
                    winnercount++;
                    // print("--winner count--", winnercount);
                    if (winnercount == selection_size)
                        break;
                }
                else if (votes_count[i] > votes_required)
                {
                    print("in >--", i);
                    auto result = surplusdist(votes_required, votes, votes_count, i);
                    winner[winnercount] = i;
                    winnercount++;
                    if (winnercount == selection_size)
                        break;
                }
                else
                {
                    print("elemination code goes here----");
                }
            }
        }
        ////////////////////loop for elimination for round1////////////////////

        ////////////////////////////////////////////

        winnercount++;
    }
    // print("out of while--");
    for (auto p = 0; p < winner.size(); p++)
    {
        print("winner--", winner[p]);
    }

    //////////////////////////////////
}

int voting::surplusdist(int votes_required, vector<vector<uint8_t>> votes, vector<int> votes_count, int idx)
{
    print("in surplus func--");
    auto count = 0;
    for (auto i = 0; i < votes.size(); i++)
    {
        
        if (votes[i][idx] == 1)
        {
            count++;
            for (auto j = 0; j < votes[i].size(); j++)
            {
                int value = votes[i][j];
            }
        }

        int value = votes[i][idx];
        print("value --", value);
        while ((votes_count[idx] - votes_required))
        {
        }
        // print("option--",votes[i][idx]);
        /* auto index = 0;
        for (auto j = option.begin(); j != option.end(); j++)
        {
            int value = *j;
        } */
    }
    return 0;
}

ACTION voting::addmanager(name user)
{
    print("add manager");
    print("add manager");
    require_auth(_self);
    manager_table mt(_self, _self.value);
    mt.emplace(_self, [&](auto &v) {
        v.user = user;
    });
}

ACTION voting::delmanager(name user)
{
    print("remove manager");
    require_auth(_self);
    manager_table mt(_self, _self.value);
    auto itr = mt.find(user.value);
    eosio_assert(itr != mt.end(), "manager not found");
    mt.erase(itr);
}

ACTION voting::bypropid(uint64_t propid)
{
    auto c = 0;
    votes_table vt(_self, _self.value);
    auto idx = vt.get_index<"propid"_n>();
    auto itr = idx.lower_bound(propid);
    for (; itr != idx.end() && itr->proposal_id == propid; ++itr)
    {
        print(itr->identity);
        c++;
    }
    print("res--", c);
}

EOSIO_DISPATCH(voting,
               (test)(createprop)(bypropid)(delprop)(voteprop)(decidewinner)(addmanager)(delmanager))