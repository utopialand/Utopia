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

ACTION voting::delvote(uint64_t id, name manager)
{
    print("in del vote---");
    votes_table vt(_self, _self.value);
    auto itr = vt.find(id);
    eosio_assert(itr != vt.end(), "votes not found");
    vt.erase(itr);
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
    auto votes_required = (int)((number_of_votes / (selection_size + 1)) + 1);
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
        //print("each--", votes_count[i]);
    }
    //////////// calculation///////////
    vector<int> winner(selection_size, prop_itr->proposal_options.size());
    auto winnercount = 0;
    int flag = 0;
    print("selection size----", selection_size);
    while (winnercount != selection_size)
    {
        //votes_required = (int)number_of_votes / selection_size;
        auto max = findmax(votes_count);
        auto min = findmin(votes_count);
        // print("max--", max);
        //print("--min--", min);
        /////////////////////loop for surplus or already winner check(r1)/////
        for (auto i = 0; i < votes_count.size(); i++)
        {
            if (votes_count[i] >= votes_required)
            {
                if (votes_count[i] == votes_required)
                {
                      print("in equal-", i);
                    winner[winnercount] = i;
                    winnercount++;
                    // print("--winner count--", winnercount);
                    if (winnercount == selection_size)
                    {
                        flag = 1;
                        break;
                    }
                }
                if (votes_count[i] > votes_required)
                {

                    votes_count = surplusdist(votes_required, votes, votes_count, i);
                    votes_count[i] = (0 - 1);
                    winner[winnercount] = i;
                    winnercount++;
                    if (winnercount == selection_size)
                    {
                        flag = 1;
                        break;
                    }
                }
            }
            else
            {
                //   print("in else of surplus");
            }
        }

        ////////////////////////////////////////////////////////
        auto count = 0;
        auto remaining = selection_size - winnercount;
        print("remaining-",remaining);
        for (auto i = 0; i < votes_count.size(); i++)
        {
            if (votes_count[i] != -1 || votes_count[i] != -2)
                count++;
        }
        if (remaining == count)
        {
            print("in remaining-",count);
            for (auto i = 0; i < votes_count.size(); i++)
            {
                if (votes_count[i] != -1 || votes_count[i] != -2)
                {
                    winner[winnercount] = i;
                    winnercount++;
                    // print("--winner count--", winnercount);
                    if (winnercount == selection_size)
                    {
                        flag = 1;
                        break;
                    }
                }
            }
        }

/////////////////////////////////////////////////////
        if (flag == 1)
            break;

        ////////////////////loop for elimination for round1////////////////////
        for (auto i = 0; i < votes_count.size(); i++)
        {
            if (min == 0)
            {
                if (votes_count[i] == min)
                {
                    votes_count[i] = (0 - 2);
                    break;
                }
            }

            else
            {
                if (votes_count[i] == min)
                {
                    votes_count = elimination(votes_required, votes, votes_count, i);
                    for (auto i = 0; i < votes_count.size(); i++)
                    {
                        //  print("new vc--", votes_count[i]);
                    }
                    //winnercount++;
                    break;
                }
            }
        }
        /* for (auto i = 0; i < prop_itr->proposal_options.size(); i++)
        {
           // print("afetr elmnt vc--", votes_count[i]);
        } */
        //////////////////////////////////////////////////////////////

        //   winnercount++;
    }
    for (auto i = 0; i < prop_itr->proposal_options.size(); i++)
    {
        // print("vc--", votes_count[i]);
    }
    for (auto p = 0; p < winner.size(); p++)
    {
        print("winner--", winner[p]);
    }

    //////////////////////////////////
}

vector<int> voting::surplusdist(int votes_required, vector<vector<uint8_t>> votes, vector<int> votes_count, int idx)
{
    // print("in surplus func--");
    auto count = 0;
    vector<int> vc_secpref(votes_count.size(), 0);
    for (auto i = 0; i < votes.size(); i++)
    {

        if (votes[i][idx] == 1)
        {

            for (auto j = 0; j < votes[i].size(); j++)
            {
                if (votes[i][j] == 2)
                {
                    int value = votes[i][j];
                    vc_secpref[j] += 1;
                    // print("2nd pref idx--", j);
                }
            }
        }
    }
    for (auto i = 0; i < vc_secpref.size(); i++)
    {
        // print("2nd pref arr--", vc_secpref[i]);
    }
    for (auto i = 0; i < vc_secpref.size(); i++)
    {
        if (vc_secpref[i] != 0)
        {
            auto dist = ((vc_secpref[i] * (votes_count[idx] - votes_required)) / votes_count[idx]);
            votes_count[i] += dist;
            // print("dist--",dist);
            // print("-for-",i);
        }
    }
    for (auto i = 0; i < votes_count.size(); i++)
    {
        // print("after dist,vc--", votes_count[i]);
    }
    return votes_count;
}

vector<int> voting::elimination(int votes_required, vector<vector<uint8_t>> votes, vector<int> votes_count, int idx)
{
    print("elimination--", idx);
    auto pref = 2;
    vector<int> repeatidx;
    vector<int> vc_sec(votes_count.size(), 0);
    repeatidx = findrept(votes_count, idx);
    if (repeatidx.size() != 0)
    {
        print("all complications start from here---");
        auto toeliminate = repeatcheck(repeatidx, votes, votes_count);
        print("to be eliminated--", toeliminate);
        idx = toeliminate;
    }

    for (auto i = 0; i < votes.size(); i++)
    {

        if (votes[i][idx] == 1)
        {
            for (auto j = 0; j < votes[i].size(); j++)
            {
                if (votes[i][j] == pref)
                {
                    if (votes_count[j] == -1 || votes_count[j] == -2)
                    {
                        pref++;
                        j = 0;
                        continue;
                    }

                    int value = votes[i][j];
                    votes_count[j] += 1;
                    votes_count[idx] = -2;
                    print("2nd pref idx--", j);
                }
            }
        }
    }

    for (auto i = 0; i < votes_count.size(); i++)
    {
        print("new vc--", votes_count[i]);
    }
    return votes_count;
}
int voting::repeatcheck(vector<int> repeatidx, vector<vector<uint8_t>> votes, vector<int> votes_count)
{
    int pref = 2;
    int n = 2;
    int idx = 0;
    vector<int> vc_sec(votes_count.size(), -1);
    while (repeatidx.size() != 0)
    {

        fill(vc_sec.begin(), vc_sec.end(), -1);
        for (auto rptidx = 0; rptidx < repeatidx.size(); rptidx++)
        {
            vc_sec[repeatidx[rptidx]] = 0;
        }
        for (auto rptidx = 0; rptidx < repeatidx.size(); rptidx++)
        {
            for (auto i = 0; i < votes.size(); i++)
            {
                if (votes[i][repeatidx[rptidx]] == pref)
                    vc_sec[repeatidx[rptidx]] += 1;
            }
        }
        auto min = findmin(vc_sec);
        for (auto rptidx = 0; rptidx < vc_sec.size(); rptidx++)
        {
            // print("-vc arr--", vc_sec[rptidx]);
        }
        for (auto i = 0; i < vc_sec.size(); i++)
        {
            if (vc_sec[i] == min)
            {
                repeatidx = findrept(vc_sec, i);
                idx = i;
                break;
            }
        }
        for (auto rptidx = 0; rptidx < repeatidx.size(); rptidx++)
        {
            // print("-rpt arr--", repeatidx[rptidx]);
        }

        pref++;
    }
    //print("index to be eliminated--",idx);
    return idx;
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
               (test)(createprop)(delvote)(bypropid)(delprop)(voteprop)(decidewinner)(addmanager)(delmanager))