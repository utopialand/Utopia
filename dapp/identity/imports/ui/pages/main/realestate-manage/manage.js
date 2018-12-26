import "./manage.html";
import "./manage.css";
import "../../../../templates/footer/footer.js";
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

function getBuyPropertyRequest(){
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
                    }).then((response)=>{
                        Session.set("propertyRequest", response.rows);
                    });                  
                }
                else{
                    FlowRouter.go("/");
                }
            }
        }
    });
}

Template.App_real_estate_manager.helpers({
    propertyRequest(){
        getBuyPropertyRequest();
        console.log("request to buy my property ", Session.get("propertyRequest"));
        return Session.get("propertyRequest")
    }
});

Template.App_real_estate_manager.events({
    "click .accept-btn": function(e){
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
    "click .reject-btn": function(e){
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
    }
});