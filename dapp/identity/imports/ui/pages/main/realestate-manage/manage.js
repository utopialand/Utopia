import "./manage.html";
import "./manage.css";
import "../../../../templates/footer/footer.js";
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
Session.set("isLoadingMyProperty", true);
Session.set("isLoadingRequests", true);

async function getBuyPropertyRequest() {

    var connected = await ScatterJS.scatter.connect("utopia");
    if (connected) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        eosinstance = eos;
        var username = localStorage.getItem("username");

        var requestTb = await eos.getTableRows({
            code: "realstateutp",
            scope: "realstateutp",
            table: "reqbuyertb11",
            limit: "50",
            json: true,
        });

        var requestsToMe = [];
        var requestsByMe = [];
        
        for (var i = 0; i < requestTb.rows.length; i++) {
            if (username == requestTb.rows[i].buyername) {
                requestsByMe.push(requestTb.rows[i]);
            }
            if (username == requestTb.rows[i].reqowner) {
                requestsToMe.push(requestTb.rows[i]);
            }
        }

        Session.set("requestsToMe", requestsToMe);
        Session.set("requestsByMe", requestsByMe);
        Session.set("isLoadingRequests", false);
    }
    else {
        console.log("scatter not installed");
    }                    
}

async function getMyPropertyList() {

    scatter = ScatterJS.scatter;
    const requiredFields = { accounts: [network] };
    const eos = scatter.eos(network, Eos, eosOptions);

    var propertyTb = await eos.getTableRows({
        code: "realstateutp",
        scope: "realstateutp",
        table: "properties1",
        limit: "50",
        json: true,
    });

    var data = [];
    var username = localStorage.getItem("username");
    for (var i = 0; i < propertyTb.rows.length; i++) {
        if (username == propertyTb.rows[i].owner) {
            data.push(propertyTb.rows[i]);
        }
    }
    Session.set("myPropertyList", data);
    Session.set("isLoadingMyProperty", false);
}

Template.App_real_estate_manager.helpers({
    propertyRequestToYou() {
        getBuyPropertyRequest();
        return Session.get("requestsToMe");
    },
    myPropertyList() {
        getMyPropertyList();
        return Session.get("myPropertyList");
    },
    propertyRequestByMe() {
        return Session.get("requestsByMe");
    },
    isLoadingMyProperty(){
        console.log("isLoadingMyProperty",Session.get("isLoadingMyProperty"));
        return Session.get("isLoadingMyProperty");
    },
    isLoadingRequests(){
        console.log("isLoadingRequests",Session.get("isLoadingRequests"));
        return Session.get("isLoadingRequests");
    }
});

Template.App_real_estate_manager.events({
    "click .accept-btn": async function (e) {
        var id = e.target.id.split("-")[1];
        var username = localStorage.getItem("username");
        try {
            let realstateutp = await eosinstance.contract('realstateutp');
            if (realstateutp) {
                let accept_req = await realstateutp.accbuyerreq(id, username, { authorization: username });
                if (accept_req) {
                    alert("You accepted the request");
                }
            }
        } catch (err) {
            var parseResponse = JSON.parse(err);
            var msg = parseResponse.error.details[0].message.split(":")[1];
            alert(msg);
        }
    },
    "click .reject-btn": async function (e) {

        var id = e.target.id.split("-")[1];
        var username = localStorage.getItem("username");

        try {
            let realstateutp = await eosinstance.contract('realstateutp');
            if (realstateutp) {
                let reject_req = await realstateutp.rejbuyerreq(id, { authorization: username });
                if (reject_req) {
                    alert("request rejected");
                }
            }
        } catch (err) {
            var parseResponse = JSON.parse(err);
            var msg = parseResponse.error.details[0].message.split(":")[1];
            alert(msg);
        }
    },
    "click .modifypricebtn": async function (e) {
        console.log("id ", e.target.id);
        var id = e.target.id.split("-")[1];
        var fieldid = "#modifypricefield-" + id;
        var utpvalue = $(fieldid).val();
        if (!utpvalue) {
            alert("Enter UTP in format 0.0000 UTP");
        } else {
            console.log("utpvalue ", utpvalue);
            var username = localStorage.getItem("username");

            try {
                let realstateutp = await eosinstance.contract('realstateutp');
                if (realstateutp) {
                    let modify_price = await realstateutp.modifyprice(id, utpvalue, { authorization: username });
                    if (modify_price) {
                        alert("price modified");
                    }
                }
            } catch (err) {
                var parseResponse = JSON.parse(err);
                var msg = parseResponse.error.details[0].message.split(":")[1];
                alert(msg);
            }
        }

    },
    "click .property-details-btn": function (e) {
        var id = e.target.id.split("-")[2];
        FlowRouter.go("/realestate/" + id);
    },
    "click .cancel-req-btn": async function (e) {
        var username = localStorage.getItem("username");
        var id = e.target.id.split("-")[2];

        try {
            let realstateutp = await eosinstance.contract('realstateutp');
            if (realstateutp) {
                var cancel_req = await realstateutp.cancelbuyreq(id, { authorization: username });

                if (cancel_req) {
                    alert("You cancelled the request");
                }
            }
        } catch (err) {
            var parseResponse = JSON.parse(err);
            var msg = parseResponse.error.details[0].message.split(":")[1];
            alert(msg);
        }
    }
});


/* var ts = Math.round((new Date()).getTime() / 1000); */