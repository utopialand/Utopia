import "./settings.html";
import "./settings.css";
import "../../../../templates/footer/footer.js";
import "../../../../templates/header/header.js";
import Eos from "eosjs";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';

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

Template.App_business_settings.onRendered(function () {
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                if (scatter.identity) {
                    eosinstance = eos;
                } else {
                    FlowRouter.go("/");
                }
            }
        } else {
            console.log("scatter not installed")
        }
    });
});

Template.App_business_settings.events({
    "click #addempbtn": async function () {
        var id = FlowRouter.current().params.id;
        var username = localStorage.getItem("username");
        var addemp = $("#addemployeefield").val();
        if (!addemp || addemp.length != 12) {
            alert("Enter 12 characters long account name");
        }
        else {
            try {

                var utopbusiness = await eosinstance.contract("utopbusiness");
                if (utopbusiness) {
                    var add_result = await utopbusiness.addemployee(id, addemp, { authorization: username });
                    if (add_result) {
                        alert("employee added successfully ");
                    }
                    else {
                        alert("something went wrong");
                    }
                }
            }
            catch (err) {
                var parseResponse = JSON.parse(err);
                var msg = parseResponse.error.details[0].message.split(":")[1]
                alert(msg);
            }
        }
    },
    "click #rmempbtn": async function () {
        var id = FlowRouter.current().params.id;
        var username = localStorage.getItem("username");
        var rmemp = $("#rmemployeefield").val();

        if(!rmemp || rmemp.length !=12){
            alert("Enter 12 characters long account name");
        }
        else{
            try {

                var utopbusiness = await eosinstance.contract("utopbusiness");
                if (utopbusiness) {
                    var rm_result = await utopbusiness.rmemployee(id, rmemp, { authorization: username });
                    if (rm_result) {
                        alert("employee removed successfully ");
                    }
                    else {
                        alert("something went wrong");
                    }
                }
            }
            catch (err) {
                var parseResponse = JSON.parse(err);
                var msg = parseResponse.error.details[0].message.split(":")[1]
                alert(msg);
            }
        }
    },
    "click #issuetokenbtn": async function () {
        var username = localStorage.getItem("username");
        var quantity = $("#issuetokensfield").val();
        var memo = "issue tokens";
        if(!quantity){
            alert("Enter quantity");
        }
        else{
            try {

                var utopbusiness = await eosinstance.contract("utopbusiness");
                if (utopbusiness) {
                    var issue_result = await utopbusiness.issue(username, quantity, memo,{ authorization: username });
                    if (issue_result) {
                        alert("Token issued successfully ");
                    }
                    else {
                        alert("something went wrong");
                    }
                }
            }
            catch (err) {
                var parseResponse = JSON.parse(err);
                var msg = parseResponse.error.details[0].message.split(":")[1]
                alert(msg);
            }
        }
    },
    "click #transfertokenbtn": async function () {
        var to = $("#transfer-token-to").val();
        var value = $("#transfer-token-value").val();

        if (!to || to.length != 12) {
            
            alert("Enter 12 characters long account name");
        }
        else if (!value) {
            alert("Enter token value");
        }
        else {
            try {
                var username = localStorage.getItem("username");
                var memo = "transferring token";

                var utopbusiness = await eosinstance.contract("utopbusiness");
                if (utopbusiness) {
                    var transfer_result = await utopbusiness.transfer(username, to, value, memo, { authorization: username });

                    if (transfer_result) {
                        alert("transfer successful");
                    }
                    else {
                        alert("something went wrong");
                    }
                }
            }
            catch (err) {
                var parseResponse = JSON.parse(err);
                var msg = parseResponse.error.details[0].message.split(":")[1]
                alert(msg);
            }
        }
    }
});

