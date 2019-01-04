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
let userinfo;
function getAllBusinessList() {
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                eosinstance = eos;
                if (scatter.identity) {
                    eosinstance = eos;
                    eosinstance.getTableRows({
                        code: "utopbusiness",
                        scope: "utopbusiness",
                        table: "businesstb",
                        limit: "50",
                        json: true,
                    }).then((response) => {

                        for (var i = 0; i < response.rows.length; i++) {
                            response.rows[i].token_maximum_supply =
                                response.rows[i].token_maximum_supply.split(" ")[1];
                        }

                        var allBusinessList = response.rows;
                        Session.set("allBusinessList", allBusinessList);
                    });
                    eosinstance.getTableRows({
                        code: "identityreg1",
                        scope: "identityreg1",
                        table: "identity3",
                        limit: 50,
                        json: true
                    }).then((resp) => {
                        userinfo = resp;
                        console.log("user--", userinfo);
                        var username = localStorage.getItem("username");
                        for (var i = 0; i < userinfo.rows.length; i++) {
                            if (userinfo.rows[i].username == username) {
                                document.getElementsByClassName("exchange")[0].style.display = "flex";
                                break;
                            }
                        }
                    });
                }
                else {
                    FlowRouter.go("/");
                }
            }
        }
    });
}

Template.App_business_manager_home.helpers({
    businessList() {
        getAllBusinessList();
        console.log("all business list function ", Session.get("allBusinessList"));
        return Session.get("allBusinessList");
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
            table: "businesstb",
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
    }

});