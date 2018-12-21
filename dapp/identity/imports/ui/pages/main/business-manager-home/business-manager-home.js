import "./business-manager-home.html";
import "./business-manager-home.css";
import "../../../../templates/footer/footer.js";
import "../../../../templates/header/header.js";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from "meteor/session";
import Eos from "eosjs";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs'

ScatterJS.plugins( new ScatterEOS() );

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

function getAllBusinessList(){
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                if (scatter.identity) {
                    eos.getTableRows({
                        code: "utopbusiness",
                        scope: "utopbusiness",
                        table: "businesstb",
                        limit: "50",
                        json: true,
                    }).then((response)=>{
                        var allBusinessList = response.rows;
                        Session.set("allBusinessList", allBusinessList);
                    });
                }
            }
        }
    });
}

Template.App_business_manager_home.helpers({
    businessList(){
        getAllBusinessList();
        console.log("all business list function ",Session.get("allBusinessList"));
        return Session.get("allBusinessList");
    }
});



Template.App_business_manager_home.events({
    "click .new-business": function(){
        FlowRouter.go("/business/newbusiness");
    },
    /* "click .loginbtn": function(){
        if (!JSON.parse(localStorage.getItem("loginstatus"))) {
            ScatterJS.scatter.connect('utopia').then(connected => {
                if (!connected) return false;
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                scatter.getIdentity(requiredFields).then(() => {
                    const acc = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                    const account = acc.name
                    localStorage.setItem("username",account);
                    console.log("inlogin ", account);
                    localStorage.setItem("loginstatus",JSON.stringify(true));
                    localStorage.setItem("username",account);
                    document.getElementById("loginButton").innerHTML = "logout";
                }).catch(error => {
                    console.error(error);
                });
            });
        } else {
            console.log("2-----------------")
            ScatterJS.scatter.forgetIdentity().then(() => {
                localStorage.setItem("loginstatus",JSON.stringify(false));
                console.log("----",localStorage.getItem("loginstatus"));
                document.getElementById("loginButton").innerHTML = "login";
                localStorage.setItem("username","");
                console.log("logout");
            });
        }
    }, */
    "click .new-business": function(){
        FlowRouter.go("/business/newbusiness");
    },
    "click #allbusinessbtn": function(){
        FlowRouter.go("/business/allbusiness");
    },
    "click #mybusinessbtn": function(){
        FlowRouter.go("/business/mybusiness");
    },
    "click #exchangebtn": function(){
        FlowRouter.go("/business/exchange");
    }

});