import "./realestate.html";
import "./realestate.css";
import "../../../../templates/footer/footer.js";
import Eos from "eosjs";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import { Session } from "meteor/session";

ScatterJS.plugins(new ScatterEOS());

Meteor.Spinner.options = {
    lines: 13, // The number of lines to draw
    length: 10, // The length of each line
    width: 5, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 0.7, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
};

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
Session.set("isLoadingRealEstate", true);

async function allProperties() {

    var connected = await ScatterJS.scatter.connect("utopia");

    if (connected) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        eosinstance = eos;

        var propertyTb = await eos.getTableRows({
            code: "realstateutp",
            scope: "realstateutp",
            table: "proptlist1",
            limit: "50",
            json: true,
        });

        Session.set("allPropertyList", propertyTb.rows);
        Session.set("isLoadingRealEstate", false);

        var allUsers = await eos.getTableRows({
            code: "identityreg1",
            scope: "identityreg1",
            table: "identity3",
            limit: 50,
            json: true,
        });

        var username = localStorage.getItem("username");

        for (var i = 0; i < allUsers.rows.length; i++) {
            if (allUsers.rows[i].username == username) {
                document.getElementsByClassName("manageproperty")[0].style.display = "block";
                document.getElementsByClassName("buypropertypagebtn")[0].style.display = "block";
                document.getElementsByClassName("bidpropertypagebtn")[0].style.display = "block";
                break;
            }
        }
    }
    else {
        console.log("Scatter not installed");
    }
}

Template.App_real_estate.helpers({
    getAllProperties: function () {
        allProperties();
        return Session.get("allPropertyList");
    },
    isLoadingRealEstate: function(){
        console.log(Session.get("isLoadingRealEstate"));
        return Session.get("isLoadingRealEstate");
    }
});

Template.App_real_estate.events({
    "click .enquire-btn": function (e) {
        var id = e.target.id.split("-")[1]
        FlowRouter.go("/realestate/" + id);
    },
    "click .manageproperty": function () {
        FlowRouter.go("/realestatemanage");
    },
    "click .bidpropertypagebtn": function () {
        FlowRouter.go("/realestatebid");
    },
    "click .buypropertypagebtn": function () {
        FlowRouter.go("/realestatebuy");
    },
    "submit #search-realestate": async function (e) {
        e.preventDefault();

        var propertyTb = await eosinstance.getTableRows({
            code: "realstateutp",
            scope: "realstateutp",
            table: "proptlist1",
            limit: "50",
            json: true,
        });

        var searchTerm = $("#search-box-realestate").val();
        var id;
        var searchResult = false;

        for (var i = 0; i < propertyTb.rows.length; i++) {
            if (searchTerm == propertyTb.rows[i].proptname) {
                id = propertyTb.rows[i].id;
                searchResult = true;
                break;
            }
        }

        if (searchResult) {
            FlowRouter.go("/realestate/" + id);
        } else {
            alert("No such property");
        }
    }
});