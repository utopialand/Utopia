#include "budget.hpp"

ACTION budget::createprop(name identity, string proposal, string detail, uint16_t duration, asset budget)
{
    // eosio_assert(is_manager(user), "not authorized");
    /* require_auth(user); */
    string catg;
    identity_table iden_table("identityreg1"_n, "identityreg1"_n.value);
    auto itr = iden_table.find(identity.value);
    eosio_assert(itr != iden_table.end(), "identity not found !!!");
    eosio_assert(itr->citizen, "Not a citizen of Utopia !!!");
    proposal_table pt(_self, _self.value);
    print("amt--", budget.amount);
    if (budget.amount >= 100000)
        catg = "l";
    else if (budget.amount >= 70000)
        catg = "m";
    else
        catg = "s";

    uint64_t rid;
    idsupp_table idsupp(_self, _self.value);
    idsupp.emplace(_self, [&](auto &c) {
        c.id = idsupp.available_primary_key();
        rid = c.id;
    });
    pt.emplace(_self, [&](auto &v) {
        v.id = rid;
        v.identity = identity;
        v.proposal_description = proposal;
        v.proposal_detail = detail;
        v.budget = budget;
        v.category = catg;
        v.count = 0;
        v.createdat = now();
        v.selected = 0;
    });
}
ACTION budget::catgvote(uint64_t id, name identity)
{
    catvote_table ct(_self, identity.value);
    proposal_table pt(_self, _self.value);
    auto itr = ct.find(id);
    auto p_itr = pt.find(id);
    auto catg = p_itr->category;
    eosio_assert(itr == ct.end(), "Already voted for this proposal id");
    ct.emplace(_self, [&](auto &c) {
        c.proposal_id = id;
        c.category = catg;
    });

    eosio_assert(p_itr != pt.end(), "proposal doesn't exist..");
    pt.modify(p_itr, _self, [&](auto &a) {
        a.count += 1;
    });
}

ACTION budget::votingon(name manager)
{
    eosio_assert(is_manager(manager), "not authorized");
    votestat_table vt(_self, _self.value);
    auto vitr = vt.begin();
    //  eosio_assert(vitr != vt.end(), "voting is not active!!");
    if (vitr == vt.end())
    {
        vt.emplace(_self, [&](auto &a) {
            a.id = vt.available_primary_key();
            a.status = true;
        });
    }
    else if (vitr->status == false)
    {
        vt.modify(vitr, _self, [&](auto &a) {
            a.status = true;
        });
    }
    else
    {
        eosio_assert(vitr->status != true, "voting is already going on!!");
    }
}

ACTION budget::votingoff(name manager)
{
    eosio_assert(is_manager(manager), "not authorized");
    votestat_table vt(_self, _self.value);

    auto itr = vt.begin();
    eosio_assert(itr != vt.end(), "voting is not active!!");
    vt.modify(itr, _self, [&](auto &a) {
        a.status = false;
    });
}

ACTION budget::stvoff(uint64_t fid, name manager)
{
    eosio_assert(is_manager(manager), "not authorized");
    feature_table ft(_self, _self.value);
    auto itr = ft.find(fid);
    eosio_assert(itr != ft.end(), "stv is not started yet ..");
    eosio_assert(itr->votingstat != false, "stv is not started yet ..");
    print("in stv off---");
    print("size--");
    ft.modify(itr, _self, [&](auto &a) {
        a.votingstat = false;
    });
}
ACTION budget::stvon(uint64_t id, name identity)
{
    eosio_assert(is_manager(identity), "not authorized");
    feature_table pt(_self, _self.value);
    auto pitr = pt.find(id);

    pt.modify(pitr, _self, [&](auto &f) {
        f.votingstat = true;
    });
}

ACTION budget ::selectprop(name user)
{
    eosio_assert(is_manager(user), "not authorized");
    feature_table ft(_self, _self.value);
    auto fitr = ft.begin();
    //  eosio_assert(fitr == ft.end(), "proposal selection cannot be done untill a stv process completes!!");

    votestat_table vt(_self, _self.value);
    auto vitr = vt.begin();
    eosio_assert(vitr != vt.end(), "voting is not active!!");
    eosio_assert(vitr->status != true, "voting is still on. please stop it before calcultion..");
    vector<uint64_t> options;
    int count = 0;
    lprop l1;
    mprop m1;
    sprop s1;

    proposal_table pt(_self, _self.value);
    auto prop_itr = pt.begin();
    vector<lprop> countlprop;
    vector<mprop> countmprop;
    vector<sprop> countsprop;
    while (prop_itr != pt.end())
    {

        if (prop_itr->category == "l" && prop_itr->selected != 1 && prop_itr->count != 0)
        {
            l1.id = prop_itr->id;
            l1.count = prop_itr->count;
            countlprop.push_back(l1);
        }
        if (prop_itr->category == "m" && prop_itr->selected != 1 && prop_itr->count != 0)
        {
            m1.id = prop_itr->id;
            m1.count = prop_itr->count;
            countmprop.push_back(m1);
        }
        if (prop_itr->category == "s" && prop_itr->selected != 1 && prop_itr->count != 0)
        {
            s1.id = prop_itr->id;
            s1.count = prop_itr->count;
            countsprop.push_back(s1);
        }
        prop_itr++;
    }

    for (auto i = 0; i < countlprop.size(); i++)
    {
        for (auto j = i + 1; j < countlprop.size(); j++)
        {
            //If there is a smaller element found on right of the array then swap it.
            if (countlprop[j].count > countlprop[i].count)
            {
                auto temp = countlprop[i];
                countlprop[i] = countlprop[j];
                countlprop[j] = temp;
            }
        }
    }
    for (auto i = 0; i < countmprop.size(); i++)
    {
        for (auto j = i + 1; j < countmprop.size(); j++)
        {
            //If there is a smaller element found on right of the array then swap it.
            if (countmprop[j].count > countmprop[i].count)
            {
                auto temp = countmprop[i];
                countmprop[i] = countmprop[j];
                countmprop[j] = temp;
            }
        }
    }
    for (auto i = 0; i < countsprop.size(); i++)
    {
        for (auto j = i + 1; j < countsprop.size(); j++)
        {
            //If there is a smaller element found on right of the array then swap it.
            if (countsprop[j].count > countsprop[i].count)
            {
                auto temp = countsprop[i];
                countsprop[i] = countsprop[j];
                countsprop[j] = temp;
            }
        }
    }
    if (countlprop.size() >= 1)
    {
        print("size--", countlprop.size());
        print("data--", countlprop[0].id);
        options.push_back(countlprop[0].id);
        auto pitr = pt.find(countlprop[0].id);
    }

    for (auto i = 0; i < countmprop.size() && i < 2; i++)
    {
        options.push_back(countmprop[i].id);
        auto pitr = pt.find(countmprop[i].id);
        /* pt.modify(pitr, _self, [&](auto &v) {
            v.selected = 1;
        }); */
    }
    for (auto i = 0; i < countsprop.size() && i < 3; i++)
    {
        options.push_back(countsprop[i].id);
        auto pitr = pt.find(countsprop[i].id);
    }
    // eosio_assert(options.size() >= noofwinner, "Number of winner entered is less than the number of final proposal list for ranking. please modify the criteria!!");
    for (auto i = 0; i < options.size(); i++)
    {
        print("--", options[i]);
    }
    uint64_t rid;
    idsupp_table idsupp(_self, _self.value);
    idsupp.emplace(_self, [&](auto &c) {
        c.id = idsupp.available_primary_key();
        rid = c.id;
    });
    ft.emplace(_self, [&](auto &f) {
        f.id = rid;
        f.proposal_options = options;
        f.status = 0;
    });

    auto propitr = pt.begin();
    while (propitr != pt.end())
    {
        auto flag = 0;
        for (auto i = 0; i < options.size(); i++)
        {
            if (propitr->id == options[i])
            {
                flag = 1;
                break;
            }
        }
        if (propitr->selected == 0 && flag != 1)
        {
            propitr = pt.erase(propitr);
        }

        else
            propitr++;
    }
}

ACTION budget::startstv(uint64_t id, name identity, string details, uint64_t duration, uint64_t noofwinner)
{
    eosio_assert(is_manager(identity), "not authorized");
    feature_table pt(_self, _self.value);
    auto pitr = pt.find(id);
    proposal_table pro(_self, _self.value);

    for (auto i = 0; i < pitr->proposal_options.size(); i++)
    {
        auto propitr = pro.find(pitr->proposal_options[i]);
        pro.modify(propitr, _self, [&](auto &v) {
            v.selected = 1;
        });
    }

    pt.modify(pitr, _self, [&](auto &f) {
        f.desc = details;
        f.duration = duration;
        f.num_of_winners = noofwinner;
        f.votingstat = true;
    });
}

ACTION budget::modprop(uint64_t id)
{
    idsupp_table ct(_self, _self.value);
    proposal_table pt(_self, _self.value);
    feature_table ft(_self, _self.value);
    auto pitr = pt.find(id);
    /*  auto ftr = ft.find(id);
    ft.erase(ftr); */
    pt.modify(pitr, _self, [&](auto &v) {
        v.selected = 0;
    });
    /*  ct.emplace(_self, [&](auto &v) {
        v.id = id;
    }); */
}
ACTION budget::delall(uint64_t id)
{
    print("test------");
    proposal_table pt(_self, _self.value);
    result_table rt(_self, _self.value);
    feature_table ft(_self, _self.value);
    result_table vt(_self, _self.value);
    auto vtr = vt.begin();
    print("---", vtr->feature_id);
    /* while (vtr != vt.end())
    {
        if (vtr->feature_id == id)
        {
            vtr = vt.erase(vtr);
        }

        else
            vtr++;
    } */

    /* auto itr = pt.find(id);
    pt.erase(itr); */
    /* auto it = rt.begin();

    while (it != rt.end())
    {
        it = rt.erase(it);
    } */
    /*  
    auto fit = ft.find(id);
     ft.modify(fit, _self, [&](auto &v) {
        v.status = 0;
    }); */
    /*  auto fit = ft.begin();

    while (fit != ft.end())
    {
        fit = ft.erase(fit);
    } */
}

ACTION budget::addmanager(name user)
{

    require_auth(_self);
    manager_table mt(_self, _self.value);
    mt.emplace(_self, [&](auto &v) {
        v.user = user;
    });
}

ACTION budget::voteprop(uint64_t feature_id, vector<uint8_t> choices, name identity)
{
    print("vote on proposal");
    require_auth(identity);
    identity_table iden_table("identityreg1"_n, "identityreg1"_n.value);
    auto itr = iden_table.find(identity.value);
    eosio_assert(itr != iden_table.end(), "identity not found !!!");
    votes_table vt(_self, _self.value);
    feature_table ft(_self, _self.value);
    auto ft_itr = ft.find(feature_id);
    print("option proposal----", ft_itr->proposal_options.size());
    print("input array size----", choices.size());
    eosio_assert(ft_itr->proposal_options.size() == choices.size(), "incorrect choices array size");
    eosio_assert(ft_itr != ft.end(), "list id not found");
    eosio_assert(ft_itr->status != 1, "stv voting for this list of proposals and calculation are lready performed..");

    ///////////////////////checking of constraints//////////////////
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
        eosio_assert(vote_itr->identity != identity || vote_itr->feature_id != feature_id, "already voted");
        vote_itr++;
    }

    vt.emplace(_self, [&](auto &v) {
        v.id = vt.available_primary_key();
        v.identity = identity;
        v.feature_id = feature_id;
        v.choices = choices;
    });
}

//////////////////////decide winner////////////////////
ACTION budget::decidewinner(uint64_t id, name user)
{
    eosio_assert(is_manager(user), "not authorized");
    feature_table pt(_self, _self.value);
    proposal_table pro(_self, _self.value);
    votes_table vt(_self, _self.value);
    result_table rt(_self, _self.value);
    auto prop_itr = pt.find(id);
    eosio_assert(prop_itr != pt.end(), "list not found");
    eosio_assert(prop_itr->status != 1, "stv voting for this list of proposals and calculation are lready performed..");
    eosio_assert(prop_itr->votingstat != true, "stv is still on. please stop it before calcultion..");
    //eosio_assert(now() >= prop_itr->duration,"voting is still going one");
    auto number_of_prop = prop_itr->proposal_options.size();
    auto vote_itr = vt.begin();
    vector<vector<uint8_t>> votes;
    while (vote_itr != vt.end())
    {
        if (vote_itr->feature_id == id)
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

        auto max = findmax(votes_count);
        auto min = findmin(votes_count);

        /////////////////////loop for surplus or already winner check/////

        for (auto i = 0; i < votes_count.size(); i++)
        {
            if (votes_count[i] >= votes_required)
            {
                if (votes_count[i] == votes_required)
                {
                    print("in equal-", i);
                    votes_count[i] = (0 - 1);
                    winner[winnercount] = i;
                    winnercount++;
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
        }

        ////////////////////checking if remaining seats equal the no of candidates left////////////////////////////////////

        auto count = 0;
        auto remaining = selection_size - winnercount;
        print("remaining-", remaining);
        for (auto i = 0; i < votes_count.size(); i++)
        {
            if (votes_count[i] != -1 || votes_count[i] != -2)
                count++;
        }
        if (remaining == count)
        {
            print("in remaining-", count);
            for (auto i = 0; i < votes_count.size(); i++)
            {
                if (votes_count[i] != -1 || votes_count[i] != -2)
                {
                    winner[winnercount] = i;
                    winnercount++;
                    if (winnercount == selection_size)
                    {
                        flag = 1;
                        break;
                    }
                }
            }
        }

        ///////////if winner seats = selection size, break//////////////////////////////////////////
        if (flag == 1)
            break;

        ////////////////////loop for elimination (when no surplus/quota is met)////////////////////
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
                    break;
                }
            }
        }
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

    ///////////////finding the winner proposal///////////////////
    prop_itr = pt.find(id);

    vector<uint64_t> selectedpid;
    for (auto i = 0; i < winner.size(); i++)
    {
        auto pid = prop_itr->proposal_options[winner[i]];
        auto prop = pro.find(pid);
        eosio_assert(prop != pro.end(), "prop not found");
        selectedpid.push_back(pid);
        print("proposal is--", prop->proposal_description);
        print("budget is--", prop->budget);
        /*  action(
            permission_level{_self, "active"_n},
            "utptokencon1"_n, "transfer"_n,
            std::make_tuple(_self, prop->identity, prop->budget, prop->proposal_description))
            .send(); */
    }

    //////////////populating data in result table//////////////////////////////////////////

    auto res_itr = rt.begin();
    while (res_itr != rt.end())
    {
        eosio_assert(res_itr->feature_id != id, "already declared!!");
        res_itr++;
    }
    rt.emplace(_self, [&](auto &v) {
        v.id = rt.available_primary_key();
        v.feature_id = id;
        v.selected = selectedpid;
    });
    /* auto vitr = vt.begin();
    while (vitr != vt.end())
    {
        if (vitr->feature_id == id)
            vitr = vt.erase(vitr);
        else
            vitr++;
    } */

    pt.erase(prop_itr);
    /////////////////////////////////////////////////////////////
}

vector<int> budget::surplusdist(int votes_required, vector<vector<uint8_t>> votes, vector<int> votes_count, int idx)
{
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
        }
    }
    for (auto i = 0; i < votes_count.size(); i++)
    {
        // print("after dist,vc--", votes_count[i]);
    }
    return votes_count;
}

vector<int> budget::elimination(int votes_required, vector<vector<uint8_t>> votes, vector<int> votes_count, int idx)
{
    print("elimination--", idx);
    int flag = 0;
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
                        j = -1;
                        flag = 1;
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
int budget::repeatcheck(vector<int> repeatidx, vector<vector<uint8_t>> votes, vector<int> votes_count)
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
    return idx;
}
///////////////////////////////////////////////////////

EOSIO_DISPATCH(budget,
               (createprop)(stvoff)(stvon)(modprop)(delall)(votingon)(votingoff)(selectprop)(startstv)(voteprop)(decidewinner)(addmanager)(catgvote))