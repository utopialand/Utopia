import "./business.html";
import "./business.css";
import "../../../../templates/footer/footer.js";
import "../../../../templates/header/header.js";
import { Session } from "meteor/session";
import Eos from "eosjs";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs'
import { Chart } from "chart.js";

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

Template.App_business.onCreated(function () {
    Session.set("isLoadingACompany", true);
    Session.set("myBalance", "");
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

        if (aCompany.rows.length != 0) {
            var account = localStorage.getItem("username");
            var symbol = aCompany.rows[0].token_maximum_supply.split(" ")[1];
            var myBalance = await eos.getCurrencyBalance({
                code: "utopbusiness",
                account: account,
                symbol: symbol,
                json: true,
            });
            var balance = "0.0000";

            if (myBalance.length == 0) {
                balance = "0.0000 " + symbol;
            }
            else {
                balance = myBalance[0];
            }

            var graphtb = await eos.getTableRows({
                code: "utopbusiness",
                scope: "utopbusiness",
                table: "graphtb",
                lower_bound: id,
                limit: "1",
                json: true,
            });

            Session.set("graphData", graphtb.rows[0].price);
            Session.set("aCompany", aCompany.rows);
            Session.set("myBalance", balance);
            Session.set("isLoadingACompany", false);
        }
        else {
            Session.set("isLoadingACompany", false);
        }
    }
    else {
        console.log("cant cannot to scatter");
    }
}

Template.App_business.helpers({
    getACompany: function () {
        return Session.get("aCompany");
    },
    isLoadingACompany: function () {
        getCompany();
        return Session.get("isLoadingACompany");
    },
    getMyBalance: function () {
        return Session.get("myBalance");
    },
    getData: function () {
        setTimeout(() => {
            if (!Session.get("isLoadingACompany")) {
                var data = Session.get("graphData");
                var ctx = document.getElementById("mychart").getContext("2d");
                var myLineChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ["10 AM", "12 AM", "2 PM", "4 PM", "6 PM", "8 PM", "10 PM"],
                        datasets: [{
                            label: 'Price',
                            data: data,
                            backgroundColor: "rgb(187, 249, 206)",
                            borderColor: "rgb(0, 77, 0)",
                            borderWidth: 4,
                        }],
                    },
                });

            }
        }, 0100);

    }
});

Template.App_business.events({
    "click .trade-token-btn": function () {
        alert("relay not created");
    }
});

