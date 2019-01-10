import "./business-manager-home.html";
import "./business-manager-home.css";
import "../../../../templates/footer/footer.js";
import "../../../../templates/header/header.js";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from "meteor/session";
import Eos from "eosjs";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs'

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

Template.App_business_manager_home.onCreated(function(){
    Session.set("isLoadingBusinessList", true);
});


async function getAllBusinessList() {

    var connected = await ScatterJS.scatter.connect("utopia")

    if (connected) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        eosinstance = eos;

        var businessList = await eos.getTableRows({
            code: "utopbusiness",
            scope: "utopbusiness",
            table: "businesstab",
            limit: "50",
            json: true,
        });

        for (var i = 0; i < businessList.rows.length; i++) {
            businessList.rows[i].token_maximum_supply =
                businessList.rows[i].token_maximum_supply.split(" ")[1];
        }

        Session.set("allBusinessList", businessList.rows);
        Session.set("isLoadingBusinessList", false);
    }
    else {
        console.log("scatter not installed");
    }
}

Template.App_business_manager_home.onRendered(function(){
    if(localStorage.getItem("hasIdentity") == "true"){
        document.getElementsByClassName("exchange")[0].style.display = "flex";
        document.getElementById("mybusinessbtn").style.display = "block";
        document.getElementsByClassName("new-business")[0].style.display = "flex";
    }
});

Template.App_business_manager_home.helpers({
    businessList() {
        return Session.get("allBusinessList");
    },
    isLoadingBusinessList() {
        getAllBusinessList();
        return Session.get("isLoadingBusinessList");
    }
});



Template.App_business_manager_home.events({
    "click .new-business": function () {
        FlowRouter.go("/business/newbusiness");
    },
    "click .new-business": function () {
        FlowRouter.go("/business/newbusiness");
    },
    "click #allbusinessbtn": function () {
        FlowRouter.go("/business/allbusiness");
    },
    "click #mybusinessbtn": function () {
        FlowRouter.go("/business/mybusiness");
    },
    "click #exchangebtn": function () {
        FlowRouter.go("/business/exchange");
    },
    "submit #search-form-business": async function (e) {
        e.preventDefault();

        var businessTable = await eosinstance.getTableRows({
            code: "utopbusiness",
            scope: "utopbusiness",
            table: "businesstab",
            limit: "50",
            json: true
        });

        var id;
        var serachResult = false;
        var searchTerm = $("#search-box-business").val();

        for (var i = 0; i < businessTable.rows.length; i++) {
            if (searchTerm == businessTable.rows[i].businessname) {
                id = businessTable.rows[i].company_id;
                serachResult = true;
                break;
            }
        }

        if (serachResult) {
            FlowRouter.go("/business/allbusiness/" + id);
        }
        else {
            alert("No such business");
        }
    },
    "click .cmp-details": function(e){
        FlowRouter.go("/business/allbusiness/"+e.target.id);
    }

});