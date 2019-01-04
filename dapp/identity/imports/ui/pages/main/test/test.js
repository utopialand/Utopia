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

Template.App_test.onCreated(async function bodyOnCreated() {
    /* ScatterJS.scatter.connect('utopia').then((connected) => {
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
                        table: "proptlist1",
                        limit: "50",
                        json: true,
                    }).then((response) => {
                        console.log("response of all properties ", response.rows);
                        Session.set("allPropertyList", response.rows);
                    });
                }
                else {
                    FlowRouter.go("/");
                }
            }
        }
    }); */
    console.log("on Created");
});

Template.App_test.onRendered(async function bodyOnRendered() {
    console.log("on rendered");
});

function allProperties() {
    ScatterJS.scatter.connect('utopia').then(async connected => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                eosinstance = eos;
                if (scatter.identity) {
                    await eos.getTableRows({
                        code: "realstateutp",
                        scope: "realstateutp",
                        table: "proptlist1",
                        limit: "50",
                        json: true,
                    }).then((response) => {
                        console.log("response of all properties ", response.rows);
                        Session.set("all", response.rows);
                        return response.rows;
                    });
                }
                else {
                    FlowRouter.go("/");
                }
            }
        }
    });
}

Template.App_test.helpers({
    getAll: async function () {
        var connected = await ScatterJS.scatter.connect("utopia");
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);

        var allPropertiesTb = await eos.getTableRows({
            code: "realstateutp",
            scope: "realstateutp",
            table: "proptlist1",
            limit: "50",
            json: true,
        });

        console.log("All properties ", allPropertiesTb.rows);
        return allPropertiesTb.rows;
    },
    getAllAgain: function(){
        allProperties();
        return Session.get("all");
    }
});