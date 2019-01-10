import "./newbusiness.html";
import "./newbusiness.css";
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

Template.App_new_business.onRendered(function () {
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

Template.App_new_business.events({
    "click .createBusiness": async function () {
        var username = localStorage.getItem("username");
        var companyName = $("#businessname").val();
        var tokenSupply = $("#tokenname").val();
        var tokenSymbol = $("#token-symbol").val().toUpperCase();
        var token = `${parseFloat(tokenSupply).toFixed(4)} ${tokenSymbol}`;
        var count = tokenSupply.split(".").length-1;
        if (!companyName) {
            alert("Please Enter company name");
        }
        else if (!tokenSupply) {
            alert("Please Enter maximum supply of token");
        }
        else if(count> 1){
            alert("Please enter maximum supply in correct format");
        }
        else if (!tokenSymbol) {
            alert("Please enter symbol");
        }
        else {
            console.log("token", token);
            try {
                var utopbusiness = await eosinstance.contract("utopbusiness");

                if (utopbusiness) {
                    var new_business = await utopbusiness.createtandb(token, username, companyName, { authorization: username });
                    if (new_business) {
                        alert("Business and token created ");
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