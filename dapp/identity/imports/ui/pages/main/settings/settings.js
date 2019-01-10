import "./settings.html";
import "./settings.css";
import "../../../../templates/footer/footer.js";
import "../../../../templates/header/header.js";
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
var symbol;

Template.App_business_settings.onCreated(function () {
    Session.set("isLoadingSettings", true);
    Session.set("doesCompanyExist", false);
});

async function getSymbol() {

    var connected = await ScatterJS.scatter.connect("utopia");

    if(connected){
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        if (scatter.identity) {
            eosinstance = eos;
            var id = FlowRouter.current().params.id;

            var aCompany = await eosinstance.getTableRows({
                code: "utopbusiness",
                scope: "utopbusiness",
                table: "businesstab",
                lower_bound: id,
                limit: "1",
                json: true,
            });
            if (aCompany.rows.length != 0) {
                symbol = aCompany.rows[0].token_maximum_supply.split(" ")[1];
                console.log("symbol", symbol);
                Session.set("isLoadingSettings", false);
                Session.set("doesCompanyExist", true);
                document.getElementById("issuetokenbtn").innerHTML += " "+symbol;
                document.getElementById("transfertokenbtn").innerHTML += " "+symbol;
            }
            else {
                Session.set("isLoadingSettings", false);
            }
        } 
        else {
            FlowRouter.go("/");
        }
    }
    else{
        console.log("scatter not installed");
    }

}

Template.App_business_settings.helpers({
    isLoadingSettings: function () {
        getSymbol();
        return Session.get("isLoadingSettings");
    },
    doesCompanyExist: function () {
        return Session.get("doesCompanyExist");
    },
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

        if (!rmemp || rmemp.length != 12) {
            alert("Enter 12 characters long account name");
        }
        else {
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
        if (!quantity) {
            alert("Enter quantity");
        }
        else {
            try {

                var utopbusiness = await eosinstance.contract("utopbusiness");
                if (utopbusiness) {
                    var issue_result = await utopbusiness.issue(username, quantity, memo, { authorization: username });
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
    },
    "click #addofcbtn": async function(){
        var officer = $("#addofcfield").val();
        var designation = $("#off-designation").val();

        if(!officer || officer.length != 12){
            alert("please enter 12 characters long name");
        }
        else if(!designation){
            alert("please enter designation");
        }
        else{
            try {
                var username = localStorage.getItem("username");

                var utopbusiness = await eosinstance.contract("utopbusiness");
                if (utopbusiness) {
                    var id = FlowRouter.current().params.id;
                    var add_result = await utopbusiness.addofficer(id, officer, designation, { authorization: username });

                    if (add_result) {
                        alert("officer added");
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
    "click #rmofcbtn": async function(){
        var officer = $("#rmofffield").val();

        if(!officer || officer.length != 12){
            alert("please enter 12 characters long name");
        }
        else{
            try {
                var username = localStorage.getItem("username");

                var utopbusiness = await eosinstance.contract("utopbusiness");
                if (utopbusiness) {
                    var id = FlowRouter.current().params.id;
                    var add_result = await utopbusiness.rmofficer(id, officer, { authorization: username });

                    if (add_result) {
                        alert("officer removed");
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

