import "./exchange.html";
import "./exchange.css";
import "../../templates/header/header.js";
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

Template.App_exchange.onRendered(function () {
    ScatterJS.scatter.connect('businessManager').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('businessManager')) {
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

Template.App_exchange.events({
    "click #selltokenbtn": function(){
        var token = $("#selltokenfield").val();
        var symbol = token.split(" ")[1];
        var username = localStorage.getItem("username");
        var version = 1;
        var contractname = symbol.toLowerCase()+"2utprelay";
        var fee = "0.2";
        var utp = "UTP";
        var networkContract = "utopbnetwork";
        var memo = version+","+contractname+" "+utp+","+fee+","+username;
        
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
    "click #buytokenbtn": function(){
        var symbol = $("#returntokenfield").val();
        var utpvalue = $("#buytokenfield").val(); 
        var username = localStorage.getItem("username");
        var version = 1;
        var contractname = symbol.toLowerCase()+"2utprelay";
        var fee = "0.2";
        var networkContract = "utopbnetwork";
        var memo = version+","+contractname+" "+symbol+","+fee+","+username;

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