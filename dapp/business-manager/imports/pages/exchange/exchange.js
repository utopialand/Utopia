import "./exchange.html";
import "./exchange.css";
import "../../templates/header/header.js";
import "../../templates/footer/footer.js";
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

Template.App_exchange.onRendered(function () {
    ScatterJS.scatter.connect('businessManager').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('businessManager')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                if (scatter.identity) {
                    eosinstance = eos;
                    eos.getTableRows({
                        code: "utopbusiness",
                        scope: "utopbusiness",
                        table: "exchange",
                        limit: "50",
                        json: true,
                    }).then((response)=>{
                        var tokenlist = [];
                        for(var i=0;i<response.rows.length;i++){
                            var currency = response.rows[i].currency;
                            currency = currency.split(" ")[1];
                            tokenlist.push(currency);
                        }
                        Session.set("tokenlist", tokenlist);
                    });
                } else {
                    FlowRouter.go("/");
                }
            }
        } else {
            console.log("scatter not installed")
        }
    });
});

Template.App_exchange.helpers({
    getTokenList: function(){
        console.log("tokenlist", Session.get("tokenlist"));
        return Session.get("tokenlist");
    }
});

Template.App_exchange.events({
    "click .selltokenbtn": function(e){
        var id = e.target.id;
        var symbol = id.split("-")[1];
        var selltokenfield = "selltokenfield-"+symbol;
        var token = $("#"+selltokenfield).val();
        console.log("token ", token);
        var username = localStorage.getItem("username");
        var version = 1;
        var contractname = symbol.toLowerCase()+"2utprelay";
        var fee = "0.2";
        var utp = "UTP";
        var networkContract = "utopbnetwork";
        var memo = version+","+contractname+" "+utp+","+fee+","+username;
        console.log("memo ",memo);
        
        eosinstance.contract('utopbusiness').then(utopbusiness => {
            utopbusiness.transfer(username, networkContract, token, memo, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of buying utp", response);
                } else {
                    alert("Unable to buy utp");
                }

            });

        });
    },
    "click .buytokenbtn": function(e){
        
        var id = e.target.id;
        var symbol = id.split("-")[1];
        var buytokenfield = "buytokenfield-"+symbol;
        var utpvalue = $("#"+buytokenfield).val();
        console.log("utpvalue",utpvalue);
        var username = localStorage.getItem("username");
        var version = 1;
        var contractname = symbol.toLowerCase()+"2utprelay";
        var fee = "0.2";
        var networkContract = "utopbnetwork";
        var memo = version+","+contractname+" "+symbol+","+fee+","+username;
        console.log("memo ", memo); 

        eosinstance.contract('utopbusiness').then(utopbusiness => {
            utopbusiness.transfer(username, networkContract, utpvalue, memo, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of buying token", response);
                } else {
                    alert("Unable to buy token");
                }

            });

        });
    }
});

// memo example
// 1,bbb2utprelay BBB,0.2,sidjungleacc(send utp receive BBB)
// 1,bbb2utprelay UTP,0.2,sidjungleacc(send BBB receive UTP)
// added a comment