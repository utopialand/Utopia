import "./buy.html";
import "./buy.css";
import "../../../../templates/footer/footer.js";
import { Session } from "meteor/session";
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
Session.set("isLoadingAllPropertyToBuy", true);

async function getAllPropertyToBuy() {

    var connected = await ScatterJS.scatter.connect("utopia");

    if (connected) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        eosinstance = eos;

        var propertyTb = await eos.getTableRows({
            code: "realstateutp",
            scope: "realstateutp",
            table: "properties1",
            limit: "50",
            json: true,
        });
        Session.set("allPropertyToBuy", propertyTb.rows);
        Session.set("isLoadingAllPropertyToBuy", false);
    }
    else {
        console.log("Scatter not installed");
    }
    
}

Template.App_real_estate_buy.helpers({
    allPropertyToBuy() {
        getAllPropertyToBuy();
        return Session.get("allPropertyToBuy");
    },
    isLoadingAllPropertyToBuy() {
        console.log("isLoadingAllPropertyToBuy", Session.get("isLoadingAllPropertyToBuy"));
        return Session.get("isLoadingAllPropertyToBuy");
    }
});

Template.App_real_estate_buy.events({
    "click .buy-btn": async function (e) {
        var id = e.target.id.split("-")[1];
        var sym = "UTP";
        var username = localStorage.getItem("username");
        var tokenfield = "#buypropertyfield-" + id;
        var utpvalue1 = $(tokenfield).val();
        var utpvalue = `${parseFloat($(tokenfield).val()).toFixed(4)} ${sym}`;
        console.log("utpvalue", utpvalue);
        var to = "rsdeposite11";
        var count = utpvalue1.split(".").length - 1;
        if (!utpvalue) {
            alert("Enter UTP in format 0.0000 UTP");
        } 
        else if((count>1) || (utpvalue1.length==count)){
            alert("please fill correct amount !!");
        }
        else {
            try {
                let realstateutp = await eosinstance.contract('realstateutp');
                let utopbusiness = await eosinstance.contract("utopbusiness");

                if (realstateutp) {
                    let result = await realstateutp.reqbuypropt(id, username, utpvalue, { authorization: username });
                    if (result) {
                        let transfer_result = await utopbusiness.transfer(username, to, utpvalue, "i want to buy this", { authorization: username });
                        if (transfer_result) {
                            alert("buy request sent to owner");
                        } else {
                            alert("Something went wrong");
                        }
                    }
                }
            } catch (err) {
                var parseResponse = await JSON.parse(err);
                var msg = await parseResponse.error.details[0].message.split(":")[1]
                alert(msg);
            }
        }


    },
    "click .property-details-btn": function (e) {
        var id = e.target.id.split("-")[2];
        FlowRouter.go("/realestate/" + id);
    }
});