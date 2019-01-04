import "./enquire.html";
import "./enquire.css";
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
Session.set("isLoadingDetails", true);

async function aProperty() {

    var connected = await ScatterJS.scatter.connect("utopia");
    if (connected) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        var id = FlowRouter.current().params.id;
        const eos = scatter.eos(network, Eos, eosOptions);

        var details = await eos.getTableRows({
            code: "realstateutp",
            scope: "realstateutp",
            table: "proptlist1",
            lower_bound: id,
            limit: "1",
            json: true,
        });

        Session.set("aProperty", details.rows);
        Session.set("isLoadingDetails", false);
        document.getElementsByClassName("real-estate-enquire")[0].style.color = "white";
    }
    else {
        console.log("scatter not installed");
    }    
}

Template.App_realestate_enquire.onCreated(function(){
    Session.set("isLoadingDetails", true);
});

Template.App_realestate_enquire.helpers({
    getAProperty: function () {
        aProperty();
        return Session.get("aProperty");
    },
    isLoadingDetails: function () {
        console.log("isLoadingDetails", Session.get("isLoadingDetails"));
        return Session.get("isLoadingDetails");
    }
});