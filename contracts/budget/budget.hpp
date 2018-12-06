#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
using namespace eosio;
using namespace std;

CONTRACT budget : public contract
{
    using contract::contract;

  public:
    ACTION createprop(name identity, string proposal, string detail, uint16_t duration, asset budget);
    ACTION delprop(uint64_t id, name user);
    ACTION selectprop(name user, string details, uint16_t duration, uint16_t noofwinner);
    ACTION voteprop(uint64_t feature_id, vector<uint8_t> choices, name identity);
    ACTION decidewinner(uint64_t id, name user);
    ACTION addmanager(name user);
    ACTION catgvote(uint64_t id, name identity);
    ACTION delmanager(name user);
    ACTION modprop(uint64_t id);
    ACTION delall(uint64_t id);
    ACTION bypropid(uint64_t prop_id);
    ACTION delvote(uint64_t id, name manager);
    ACTION delresult(uint64_t id, name manager);
    ACTION votingon(name manager);
    ACTION votingoff(name manager);
    ACTION stvoff(uint64_t fid, name manager);
    ACTION startstv(uint64_t id, name identity, string details,uint64_t duration,uint64_t noofwinner);
    vector<int> surplusdist(int votes_required, vector<vector<uint8_t>> votes, vector<int> votes_count, int idx);
    vector<int> elimination(int votes_required, vector<vector<uint8_t>> votes, vector<int> votes_count, int idx);
    int repeatcheck(vector<int> repeatidx, vector<vector<uint8_t>> votes, vector<int> votes_count);

    TABLE manager
    {
        name user;
        uint64_t primary_key() const { return user.value; }
    };

    TABLE proposal
    {
        uint64_t id;
        name identity;
        string proposal_description;
        string proposal_detail;
        asset budget;
        uint16_t count = 0;
        string category;
        uint64_t createdat;
        uint16_t selected = 0;
        uint64_t primary_key() const { return id; }
    };
    TABLE featurelist
    {
        uint64_t id;
        string desc;
        vector<uint64_t> proposal_options;
        uint64_t duration;
        uint64_t num_of_winners;
        uint16_t status = 0;
        uint64_t primary_key() const { return id; }
    };

    TABLE votes
    {
        uint64_t id;
        name identity;
        uint64_t feature_id;
        vector<uint8_t> choices;
        uint64_t date_of_vote = now();
        uint64_t primary_key() const { return id; }
        uint64_t by_secondary() const { return feature_id; }
    };

    TABLE votestatus
    {
        uint64_t id;
        bool status = false;

        uint64_t primary_key() const { return id; }
    };

    TABLE stvstatus
    {
        uint64_t fid;
        uint8_t status = 0;

        uint64_t primary_key() const { return fid; }
    };

    TABLE catvote
    {

        uint64_t proposal_id;
        string category;
        uint64_t primary_key() const { return proposal_id; }
    };

    TABLE result
    {
        uint64_t id;
        uint64_t feature_id;
        vector<uint64_t> selected;
        uint64_t primary_key() const { return id; }
    };

    struct lprop
    {
        uint64_t id;
        uint16_t count;
    };
    struct mprop
    {
        uint64_t id;
        uint16_t count;
    };
    struct sprop
    {
        uint64_t id;
        uint16_t count;
    };

    TABLE identityt
    {
        name username;
        string fname;
        string mname;
        string lname;
        string dob;
        string contact;
        string email;
        bool citizen = false;
        uint64_t primary_key() const { return username.value; }
    };

  private:
    typedef multi_index<"identity2"_n, identityt> identity_table;
    typedef multi_index<"manager11"_n, manager> manager_table;
    typedef multi_index<"proposal13"_n, proposal> proposal_table;
    typedef multi_index<"feature13"_n, featurelist> feature_table;
    typedef multi_index<"catvote12"_n, catvote> catvote_table;
    typedef multi_index<"votes12"_n, votes,
                        indexed_by<"propid"_n,
                                   const_mem_fun<votes, uint64_t, &votes::by_secondary>>>
        votes_table;

    typedef multi_index<"result12"_n, result> result_table;
    typedef multi_index<"votestat"_n, votestatus> votestat_table;
    typedef multi_index<"stvstat"_n, stvstatus> stvstat_table;

    vector<int> findrept(vector<int> votes_count, int idx)
    {
        vector<int> repeat;
        auto flag = 0;
        for (auto j = idx + 1; j < votes_count.size(); j++)
        {
            if (votes_count[idx] == votes_count[j])
            {
                repeat.push_back(j);
                flag = 1;
            }
        }
        if (flag == 1)
        {

            repeat.insert(repeat.begin(), idx);
        }

        return repeat;
    }

    int findmax(vector<int> v)
    {
        //print("call find max--");
        auto max = v[0];
        auto index = 0;
        for (auto k = 1; k < v.size(); k++)
        {
            if (v[k] > max)
            {
                max = v[k];
                index = k;
            }
        }
        // print("max--",max);
        return max;
    }
    int findmin(vector<int> v)
    {
        //print("call find min--");
        auto n = 0;
        auto min = 0;
        while (n != v.size())
        {
            if (v[n] != -1 && v[n] != -2)
            {
                min = v[n];
                break;
            }
            n++;
        }
        //  print("initial min--",min);
        auto index = 0;
        for (auto k = 0; k < v.size(); k++)
        {
            if (v[k] == -1 || v[k] == -2)
                continue;
            else if (v[k] <= min)
            {
                //print("return=",v[k]);
                min = v[k];
            }
        }

        return min;
    }

    bool is_manager(name user)
    {

        if (has_auth(user))
        {
            manager_table mt(_self, _self.value);
            auto itr = mt.find(user.value);
            if (itr == mt.end())
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        else
        {
            return false;
        }
    }
};