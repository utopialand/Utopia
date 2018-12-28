import "./buy.html";
import "./buy.css";
import "../../../../templates/footer/footer.js";
import { Session } from "meteor/session";
import Eos from "eosjs";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';

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

function getAllPropertyToBuy(){
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                eosinstance = eos;
                if (scatter.identity) {
                    eos.getTableRows({
                        code: "realstateutp",
                        scope: "realstateutp",
                        table: "properties1",
                        limit: "50",
                        json: true,
                    }).then((response)=>{
                        Session.set("allPropertyToBuy", response.rows);
                    });                  
                }
                else{
                    FlowRouter.go("/");
                }
            }
        }
    });
}

Template.App_real_estate_buy.helpers({
    allPropertyToBuy(){
        getAllPropertyToBuy();
        console.log("All propt to buy", Session.get("allPropertyToBuy"));
        return Session.get("allPropertyToBuy");
    }
});

Template.App_real_estate_buy.events({
    "click .buy-btn": async function(e){

        console.log(" id ", e.target.id);
        var id = e.target.id.split("-")[1];
        var username = localStorage.getItem("username");
        var tokenfield = "#buypropertyfield-"+id;
        var utpvalue = $(tokenfield).val();
        var to = "rsdeposite11";

        try{
            let realstateutp = await eosinstance.contract('realstateutp');
            let utopbusiness = await eosinstance.contract("utopbusiness")
            if(realstateutp)
            {
                let result = await realstateutp.reqbuypropt(id, username, utpvalue, { authorization: username });
                if(result){
                    let transfer_result = await utopbusiness.transfer(username, to, utpvalue, "i want to buy this", { authorization: username });
                }
            }
        } catch(err)
        {
            console.log(err);
        }
        


    /*     eosinstance.contract('realstateutp').then(realstateutp => {
            realstateutp.reqbuypropt(id, username, utpvalue, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of buy", response);
                } else {
                    alert("Unable to buy");
                }

            });

        }); */
        
        
        
    }
});