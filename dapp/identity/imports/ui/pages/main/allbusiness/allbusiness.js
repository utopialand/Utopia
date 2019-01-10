import "./allbusiness.html";
import "./allbusiness.css";
import "../../../../templates/footer/footer.js";
import "../../../../templates/header/header.js";
import { Session } from "meteor/session";
import Eos from "eosjs";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs'
ScatterJS.plugins(new ScatterEOS());

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
Session.set("isLoadingAllBusinessList", true);

async function getAllBusinessListAgain() {

    var connected = await ScatterJS.scatter.connect("utopia");

    if (connected) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);

        var allBusinessTb = await eos.getTableRows({
            code: "utopbusiness",
            scope: "utopbusiness",
            table: "businesstab",
            limit: "50",
            json: true,
        });

        for(var i=0;i<allBusinessTb.rows.length;i++){
            allBusinessTb.rows[i].token_maximum_supply = allBusinessTb.rows[i].token_maximum_supply.split(" ")[1];
            
        }

        Session.set("allBusinessListAgain", allBusinessTb.rows);
        Session.set("isLoadingAllBusinessList", false);
    }
    else {
        console.log("Scatter not installed");
    }
}

Template.App_all_business.helpers({
    allBusinessList() {
        return Session.get("allBusinessListAgain");
    },
    isLoadingAllBusinessList() {
        getAllBusinessListAgain();
        return Session.get("isLoadingAllBusinessList");
    }
});


Template.App_all_business.events({
    "click .details": function (e) {
        var id = e.target.id;
        FlowRouter.go("/business/allbusiness/" + id);
    }
});