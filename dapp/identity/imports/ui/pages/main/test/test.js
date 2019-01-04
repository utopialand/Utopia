import "./test.html";
import "./test.css";
import Eos from "eosjs";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import { Session } from "meteor/session";
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
Session.set("isLoading", true);

async function allProperties() {

    var connected = await ScatterJS.scatter.connect("utopia");

    if (connected) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        eosinstance = eos;

        var propertyTb = await eos.getTableRows({
            code: "realstateutp",
            scope: "realstateutp",
            table: "proptlist1",
            limit: "50",
            json: true,
        });

        console.log("propertyTb", propertyTb);
        Session.set("isLoading", false);
        Session.set("all",propertyTb.rows);
    }else{
        console.log("Cannot connect");
    }
}

Template.App_test.helpers({
    getAllAgain: function () {
        allProperties();
        return Session.get("all");
    },
    isLoading: function(){
        console.log(Session.get("isLoading"));
        return Session.get("isLoading");
    }
});