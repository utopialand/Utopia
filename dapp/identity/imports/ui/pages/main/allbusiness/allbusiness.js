import "./allbusiness.html";
import "./allbusiness.css";
import "../../../../templates/footer/footer.js";
import "../../../../templates/header/header.js";
import { Session } from "meteor/session";
import Eos from "eosjs";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs'
ScatterJS.plugins( new ScatterEOS() );

const network = {
    protocol: "https", // Defaults to https
    blockchain: "eos",
    host: "jungle2.cryptolions.io",
    port: 443,
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
};
const eosOptions = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
};

var scatter = {};
var eosinstance = {};

function getAllBusinessListAgain(){
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                if (scatter.identity) {
                    eos.getTableRows({
                        code: "utopbusiness",
                        scope: "utopbusiness",
                        table: "businesstb",
                        limit: "50",
                        json: true,
                    }).then((response)=>{
                        Session.set("allBusinessListAgain", response.rows);
                    });                  
                }
                else{
                    FlowRouter.go("/");
                }
            }
        }
    });
}

Template.App_all_business.helpers({
    allBusinessList(){
        getAllBusinessListAgain();
        return Session.get("allBusinessListAgain");
    }
});
//this is a comment 

Template.App_all_business.events({
    "click .details": function(e){
        var id = e.target.id;
        FlowRouter.go("/business/allbusiness/"+id);
    }
});