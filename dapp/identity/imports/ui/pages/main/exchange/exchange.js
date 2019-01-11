import "./exchange.html";
import "./exchange.css";
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

Template.App_exchange.onCreated(function(){
    Session.set("isLoadingExchange", true);
});


async function getAllTokens() {
    var connected = await ScatterJS.scatter.connect('utopia');

    if (connected) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        eosinstance = eos;

        var tokens = await eos.getTableRows({
            code: "utopbusiness",
            scope: "utopbusiness",
            table: "exchange",
            limit: "50",
            json: true,
        });

        var tokenlist = [];
        for (var i = 0; i < tokens.rows.length; i++) {
            var currency = tokens.rows[i].currency;
            currency = currency.split(" ")[1];
            tokenlist.push(currency);
        }
        Session.set("tokenlist", tokenlist);
        Session.set("isLoadingExchange", false);
    }
    else {
        console.log("scatter not installed");
    }
}



Template.App_exchange.helpers({
    getTokenList: function () {
        return Session.get("tokenlist");
    },
    isLoadingExchange: function(){
        getAllTokens();
        return Session.get("isLoadingExchange");
    }
});

Template.App_exchange.events({
    "click .selltokenbtn": async function (e) {
        var id = e.target.id;
        var symbol = id.split("-")[1];
        var selltokenfield = "#selltokenfield-" + symbol;
        var token = `${parseFloat($(selltokenfield).val()).toFixed(4)} ${symbol}`;
        var token1 = $(selltokenfield).val();
        var username = localStorage.getItem("username");
        var version = 1;
        var contractname = symbol.toLowerCase() + "2utprelay";
        var fee = "0.2";
        var utp = "UTP";
        var networkContract = "utopbnetwork";
        var memo = version + "," + contractname + " " + utp + "," + fee + "," + username;
        console.log("memo ", memo);
        var count = token1.split(".").length - 1;
        if (!token1) {
            alert("Please enter "+symbol+" token value");
        }
        else if((count>1) || (token1.length==count)){
            alert("please fill correct amount !!");
        } 
        else {
            try {
                var utopbusiness = await eosinstance.contract("utopbusiness");

                if (utopbusiness) {
                    var transfer_result = await utopbusiness.transfer(username, networkContract, token, memo, { authorization: username });
                    if (transfer_result) {
                        alert("Token transferred ");
                    }
                    else {
                        alert("Something went wrong while creating business");
                    }
                }
            }
            catch (err) {
                console.log("err", err);
                var parseResponse = JSON.parse(err);
                var msg = parseResponse.error.details[0].message.split(":")[1]
                alert(msg);
            }
        }
    },
    "click .buytokenbtn": async function (e) {

        var id = e.target.id;
        var symbol = id.split("-")[1];
        var buytokenfield = "#buytokenfield-" + symbol;
        var utpSymbol = "UTP";
        var utpvalue = `${parseFloat($(buytokenfield).val()).toFixed(4)} ${utpSymbol}`;
        var utpvalue1 = $(buytokenfield).val()
        var username = localStorage.getItem("username");
        var version = 1;
        var contractname = symbol.toLowerCase() + "2utprelay";
        var fee = "0.2";
        var networkContract = "utopbnetwork";
        var memo = version + "," + contractname + " " + symbol + "," + fee + "," + username;
        console.log("memo ", memo);
        var count = utpvalue1.split(".").length - 1;
        if (!utpvalue1) {
            alert("Please enter UTP token value");
        }
        else if((count>1) || (utpvalue1.length==count)){
            alert("please fill correct amount !!");
        } 
        else {
            try {
                var utopbusiness = await eosinstance.contract("utopbusiness");

                if (utopbusiness) {
                    var transfer_result = await utopbusiness.transfer(username, networkContract, utpvalue, memo, { authorization: username });
                    if (transfer_result) {
                        alert("Token transferred ");
                    }
                    else {
                        alert("Something went wrong while creating business");
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

// memo example
// 1,bbb2utprelay BBB,0.2,sidjungleacc(send utp receive BBB)
// 1,bbb2utprelay UTP,0.2,sidjungleacc(send BBB receive UTP)
