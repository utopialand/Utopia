import "./settings.html";
import "./settings.css";
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

Template.App_business_settings.onRendered(function () {
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
// why is git not?

Template.App_business_settings.events({
    "click #addempbtn":function(){
        var id = FlowRouter.current().params.id;
        var username = localStorage.getItem("username");
        var addemp = $("#addemployeefield").val();
        eosinstance.contract('utopbusiness').then(utopbusiness => {
            utopbusiness.addemployee(id, addemp, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of adding employee", response);
                } else {
                    alert("Unable to add employee");
                }
            });

        });
    },
    "click #rmempbtn": function(){
        var id = FlowRouter.current().params.id;
        var username = localStorage.getItem("username");
        var rmemp = $("#rmemployeefield").val();
        eosinstance.contract('utopbusiness').then(utopbusiness => {
            utopbusiness.rmemployee(id, rmemp, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of removing employee", response);
                } else {
                    alert("Unable to remove employee");
                }
            });

        });
    }
});

// testcomment
// test comment
// test 