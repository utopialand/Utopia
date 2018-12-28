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
                        scope: "realstateutp",
                        table: "reqbuyertab5",
                        limit: "50",
                        json: true,
                    }).then((response) => {
                        console.log("response of requests", response);
                        var requestsToMe = [];
                        var requestsByMe = [];

                        for(var i = 0;i<response.rows.length;i++){
                            if(username == response.rows[i].buyername){
                                requestsByMe.push(response.rows[i]);
                            }
                            if(username == response.rows[i].reqowner){
                                requestsToMe.push(response.rows[i]);
                            }
                        }

                        console.log("requests to me", requestsToMe);
                        console.log("requests by me", requestsByMe);
                        Session.set("requestsToMe", requestsToMe);
                        Session.set("requestsByMe", requestsByMe);
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
    propertyRequestToYou() {
        getBuyPropertyRequest();
        return Session.get("requestsToMe");
    },
    myPropertyList() {
        getMyPropertyList();
        return Session.get("myPropertyList");
    },
    propertyRequestByMe(){
        return Session.get("requestsByMe");
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
    "click .modifypricebtn": function(e){
        console.log("id ", e.target.id);
        var id = e.target.id.split("-")[1];
        var fieldid = "#modifypricefield-"+ id;
        var utpvalue = $(fieldid).val();
        console.log("utpvalue ", utpvalue);
        var username = localStorage.getItem("username");
        
        eosinstance.contract('realstateutp').then(realstateutp => {
            realstateutp.modifyprice(id,utpvalue, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of selling properties", response);
                } else {
                    alert("Unable to sell");
                }

            });

        });
    },
    "click .property-details-btn": function(e){
        var id = e.target.id.split("-")[2];
        FlowRouter.go("/realestate/"+id);
    },
    "click .cancel-req-btn": async function(e){
        var username = localStorage.getItem("username");
        var id = e.target.id.split("-")[2];

        try{
            let realstateutp = await eosinstance.contract('realstateutp');
            if(realstateutp){
                var cancel_req = await realstateutp.cancelbuyreq(id, { authorization: username });

                if(cancel_req){
                    alert("You cancelled the request");
                }
                else{
                    alert("something went wrong");
                }
            }
        }catch(err){
            console.log(err);
            alert("something went wrong");
        }
    }
});


/* var ts = Math.round((new Date()).getTime() / 1000); */