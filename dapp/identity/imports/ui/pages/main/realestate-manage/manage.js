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

function getBuyPropertyRequest() {
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                eosinstance = eos;
                var username = localStorage.getItem("username");
                if (scatter.identity) {
                    eos.getTableRows({
                        code: "realstateutp",
                        scope: username,
                        table: "reqbuyertab3",
                        limit: "50",
                        json: true,
                    }).then((response) => {
                        Session.set("propertyRequest", response.rows);
                    });
                }
                else {
                    FlowRouter.go("/");
                }
            }
        }
    });
}

function getMyPropertyList() {

    scatter = ScatterJS.scatter;
    const requiredFields = { accounts: [network] };
    const eos = scatter.eos(network, Eos, eosOptions);
    eos.getTableRows({
        code: "realstateutp",
        scope: "realstateutp",
        table: "properties1",
        limit: "50",
        json: true,
    }).then((response) => {
        console.log("response ", response);
        var data = [];
        var username = localStorage.getItem("username");
        for(var i=0;i<response.rows.length;i++){
            if(username == response.rows[i].owner){
                data.push(response.rows[i]);
            }
        }
        console.log("response of my property", data);
        Session.set("myPropertyList", data);
    });
}

Template.App_real_estate_manager.helpers({
    propertyRequest() {
        getBuyPropertyRequest();
        console.log("request to buy my property ", Session.get("propertyRequest"));
        return Session.get("propertyRequest")
    },
    myPropertyList() {
        getMyPropertyList();
        return Session.get("myPropertyList");
    }
});

Template.App_real_estate_manager.events({
    "click .accept-btn": function (e) {
        var id = e.target.id.split("-")[1];
        var username = localStorage.getItem("username");
        eosinstance.contract('realstateutp').then(realstateutp => {
            realstateutp.accbuyerreq(id, username, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of accepting to sell", response);
                } else {
                    alert("Unable to accept");
                }

            });

        });
    },
    "click .reject-btn": function (e) {
        var id = e.target.id.split("-")[1];
        var username = localStorage.getItem("username");
        eosinstance.contract('realstateutp').then(realstateutp => {
            realstateutp.rejbuyerreq(id, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of rejecting to buy", response);
                } else {
                    alert("Unable to reject");
                }

            });

        });
    },
    "click .sellpropertybtn": function(e){
        var id = e.target.id.split("-")[1];
        var fieldid = "#sellpropertyfield-"+ id;
        var utpvalue = $(fieldid).val();
        var username = localStorage.getItem("username");
        
        eosinstance.contract('realstateutp').then(realstateutp => {
            realstateutp.reqsellpropt(id,username,utpvalue, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of selling properties", response);
                } else {
                    alert("Unable to sell");
                }

            });

        });
    }
});