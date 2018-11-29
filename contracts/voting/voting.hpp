#include <eosiolib/eosio.hpp>

using namespace eosio;
using namespace std;

CONTRACT voting: public contract {
    using contract::contract;
    public:
    ACTION test(vector<string> names);
    ACTION createprop(string proposal,string detail,uint16_t duration,vector<string> options,name user,uint16_t numwinners);
    ACTION delprop(uint64_t id,name user);
    ACTION voteprop(uint64_t propid,vector<uint8_t> choices,name identity);
    ACTION decidewinner(uint64_t id,name user);
    ACTION addmanager(name user);
    ACTION delmanager(name user);
    ACTION bypropid(uint64_t prop_id);

    TABLE manager{
        name user;
        uint64_t primary_key() const { return user.value; }
    };

    TABLE proposal{
        uint64_t id;
        string proposal_description;
        string proposal_detail;
        vector<string> proposal_options;
        uint64_t duration;
        uint64_t num_of_winners;
        uint16_t status=0;
        uint64_t primary_key() const { return id; }
    };

    TABLE votes {
        uint64_t id;
        name identity;
        uint64_t proposal_id;
        vector<uint8_t> choices;
        uint64_t date_of_vote= now();
        uint64_t primary_key() const {return id;}
        uint64_t by_secondary()const { return proposal_id; }
    };

    TABLE result {
        uint64_t id;
        uint64_t proposal_id;
        vector<string> selected;
        uint64_t primary_key() const { return id;}
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
    typedef multi_index<"proposal11"_n,proposal> proposal_table;
    typedef multi_index<"votes13"_n, votes,
     indexed_by<"propid"_n,
		const_mem_fun<votes, uint64_t , &votes::by_secondary>>> votes_table;
   
    typedef multi_index<"result11"_n,result> result_table;
    void helper(){
        print("call test");
    }

    bool is_manager(name user){
        
        if(has_auth(user)){
            manager_table mt(_self,_self.value);
            auto itr = mt.find(user.value);
            if(itr==mt.end()){
                return false;
            }else {
                return true;
            }
        }else{
            return false;
        }
    }
};