import "./mybusiness.html";
import "./mybusiness.css";
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

Template.App_my_business.onCreated(function(){
    Session.set("isLoadingMyBusinessList", true);
});


async function getMyBusinessList() {

    var connected = await ScatterJS.scatter.connect("utopia");
    if (connected) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);

        var businessTb = await eos.getTableRows({
            code: "utopbusiness",
            scope: "utopbusiness",
            table: "businesstab",
            limit: "50",
            json: true,
        });

        var myBusinessList = [];
        var username = localStorage.getItem("username");
        for(var i=0;i<businessTb.rows.length;i++){
            if(username == businessTb.rows[i].owner){
                myBusinessList.push(businessTb.rows[i]);
            }
        }

        Session.set("myBusinessList", myBusinessList);
        Session.set("isLoadingMyBusinessList", false);

    }
    else {
        console.log("Scatter not installed");
    }
}

Template.App_my_business.helpers({
    myBusinessList() {
        return Session.get("myBusinessList");
    },
    isLoadingMyBusinessList() {
        getMyBusinessList();
        return Session.get("isLoadingMyBusinessList");
    }
});

Template.App_my_business.events({
    "click .settingsbtn": function (e) {
        var id = e.target.id;
        FlowRouter.go("/business/mybusiness/settings/" + id);
    }
});