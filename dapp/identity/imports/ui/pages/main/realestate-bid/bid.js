import "./bid.html";
import "./bid.css";
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
Session.set("isLoadingPropertyForAuction", true);

async function getAllPropertyForAuction() {

    var connected = await ScatterJS.scatter.connect("utopia");
    if (connected) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        eosinstance = eos;

        var auctionTb = await eos.getTableRows({
            code: "realstateutp",
            scope: "realstateutp",
            table: "bidtable1",
            limit: "50",
            json: true,
        });

        var data = [];
        for (var i = 0; i < auctionTb.rows.length; i++) {
            if (auctionTb.rows[i].rsproposal != "finished") {
                data.push(auctionTb.rows[i]);
            }
        }
        Session.set("allPropertyForAuction", data);
        Session.set("isLoadingPropertyForAuction", false);
    }
    else {
        console.log("Scatter not installed");
    }
}

Template.App_real_estate_bid.helpers({
    allPropertyForAuction() {
        return Session.get("allPropertyForAuction");
    },
    isLoadingPropertyForAuction() {
        getAllPropertyForAuction();
        return Session.get("isLoadingPropertyForAuction");
    }
});

Template.App_real_estate_bid.events({
    "click .bid-btn": async function (e) {
        var sym = "UTP";
        var proptid = e.target.id.split("-")[1];
        var fieldid = "#bidpropertyfield-" + e.target.id.split("-")[1];
        var utpvalue = `${parseFloat($(fieldid).val()).toFixed(4)} ${sym}`;
        var utpvalue1 = $(fieldid).val();
        var count =utpvalue1.split(".").length - 1;
        console.log("amount == ",utpvalue1);
        console.log("value ", utpvalue);
        var username = localStorage.getItem("username");
        var to = "rsdeposite11";
        console.log("utpvalue",utpvalue);
        if (!utpvalue1) {
            alert("Please Enter UTP Value");
        }
        else if((count>1) || (utpvalue1.length==count)){
            alert("please fill correct amount !!");
        }
        else {
            try {
                let realstateutp = await eosinstance.contract('realstateutp');
                let utopbusiness = await eosinstance.contract("utopbusiness");

                if (realstateutp) {
                    let bid_request = await realstateutp.bid(proptid, username, utpvalue, { authorization: username });
                    if (bid_request) {
                        let transfer_result = await utopbusiness.transfer(username, to, utpvalue, "bidding on this", { authorization: username });
                        if (transfer_result) {
                            alert("Successful Bid");
                        } else {
                            alert("transfer failed");
                        }
                    }
                }
            } catch (err) {
                var parseResponse = JSON.parse(err);
                var msg = parseResponse.error.details[0].message.split(":")[1]
                alert(msg);
            }
        }


    },
    "click .property-details-btn": function (e) {
        var id = e.target.id.split("-")[2];
        FlowRouter.go("/realestate/" + id);
    }
});