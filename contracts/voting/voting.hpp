#include <eosiolib/eosio.hpp>

using namespace eosio;
using namespace std;

CONTRACT voting : public contract
{
    using contract::contract;

  public:
    ACTION test();
    ACTION createprop(string proposal, string detail, uint16_t duration, vector<string> options, name user, uint16_t numwinners);
    ACTION delprop(uint64_t id, name user);
    ACTION voteprop(uint64_t propid, vector<uint8_t> choices, name identity);
    ACTION decidewinner(uint64_t id, name user);
    ACTION addmanager(name user);
    ACTION delmanager(name user);
    ACTION bypropid(uint64_t prop_id);
    ACTION delvote(uint64_t id, name manager);
    ACTION delresult(uint64_t id, name manager);
    vector<int> surplusdist(int votes_required, vector<vector<uint8_t>> votes, vector<int> votes_count, int i);
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
        string proposal_description;
        string proposal_detail;
        vector<string> proposal_options;
        uint64_t duration;
        uint64_t num_of_winners;
        uint16_t status = 0;
        uint64_t primary_key() const { return id; }
    };

    TABLE votes
    {
        uint64_t id;
        name identity;
        uint64_t proposal_id;
        vector<uint8_t> choices;
        uint64_t date_of_vote = now();
        uint64_t primary_key() const { return id; }
        uint64_t by_secondary() const { return proposal_id; }
    };

    TABLE result
    {
        uint64_t id;
        uint64_t proposal_id;
        string desc;
        vector<string> selected;
        uint64_t primary_key() const { return id; }
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
    typedef multi_index<"proposal11"_n, proposal> proposal_table;
    typedef multi_index<"votes13"_n, votes,
                        indexed_by<"propid"_n,
                                   const_mem_fun<votes, uint64_t, &votes::by_secondary>>>
        votes_table;

    typedef multi_index<"result13"_n, result> result_table;
    void helper()
    {
        print("call test");
    }

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