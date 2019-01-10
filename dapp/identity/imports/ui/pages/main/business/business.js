import "./business.html";
import "./business.css";
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

Template.App_business.onRendered(function () {
    Session.set("isLoadingACompany", true);
});

async function getCompany() {
    var connected = await ScatterJS.scatter.connect("utopia")

    if (connected) {
        var id = FlowRouter.current().params.id;
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        var id = FlowRouter.current().params.id;
        const eos = scatter.eos(network, Eos, eosOptions);
        eosinstance = eos;
        var aCompany = await eos.getTableRows({
            code: "utopbusiness",
            scope: "utopbusiness",
            table: "businesstab",
            lower_bound: id,
            limit: "1",
            json: true,
        });
        var account = localStorage.getItem("username");

        var myBalance = await eos.getCurrencyBalance({
            code: "utopbusiness",
            account: account,
            json: true,
        });

        /* var symbol = aCompany.rows[0].token_maximum_supply.split(" ")[1]; */
        /* console.log("symbol ", symbol); */
        console.log("company ", aCompany.rows);
        Session.set("aCompany", aCompany.rows);
        Session.set("isLoadingACompany", false);
    }
    else {
        console.log("cant cannot to scatter");
    }
}

Template.App_business.helpers({
    getACompany: function () {
        getCompany();
        return Session.get("aCompany");
    },
    isLoadingACompany: function () {
        return Session.get("isLoadingACompany");
    },
});