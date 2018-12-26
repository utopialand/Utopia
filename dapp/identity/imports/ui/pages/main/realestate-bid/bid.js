import "./bid.html";
import "./bid.css";
import "../../../../templates/footer/footer.js";
import { Session } from "meteor/session";
import Eos from "eosjs";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';

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

function getAllPropertyForAuction(){
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                eosinstance = eos;
                if (scatter.identity) {
                    eos.getTableRows({
                        code: "realstateutp",
                        scope: "realstateutp",
                        table: "bidtable1",
                        limit: "50",
                        json: true,
                    }).then((response)=>{
                        Session.set("allPropertyForAuction", response.rows);
                    });                  
                }
                else{
                    FlowRouter.go("/");
                }
            }
        }
    });
}

Template.App_real_estate_bid.helpers({
    allPropertyForAuction(){
        getAllPropertyForAuction();
        console.log("All propt for auction", Session.get("allPropertyForAuction"));
        return Session.get("allPropertyForAuction");
    }
});

Template.App_real_estate_bid.events({
    "click .bid-btn": function(e){
        var proptid = e.target.id.split("-")[1];
        var fieldid = "#bidpropertyfield-"+e.target.id.split("-")[1];
        var utpvalue = $(fieldid).val();
        console.log("value ", utpvalue);
        var username = localStorage.getItem("username");

        eosinstance.contract('realstateutp').then(realstateutp => {
            realstateutp.bid(proptid, username, utpvalue, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of bidding", response);
                } else {
                    alert("Unable to bid");
                }

            });

        });
    }
});