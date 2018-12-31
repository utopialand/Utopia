import "./mybusiness.html";
import "./mybusiness.css";
import "../../../../templates/footer/footer.js";
import "../../../../templates/header/header.js";
import { Session } from "meteor/session";
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

function getMyBusinessList(){
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                if (scatter.identity) {
                    eos.getTableRows({
                        code: "utopbusiness",
                        scope: "utopbusiness",
                        table: "businesstb",
                        limit: "50",
                        json: true,
                    }).then((response)=>{
                        var myBusinessList = [];
                        var username = localStorage.getItem("username");
                        for(var i=0;i<response.rows.length;i++){
                            if(username == response.rows[i].owner){
                                myBusinessList.push(response.rows[i]);
                            }
                        }
                        console.log("my business list", myBusinessList);
                        Session.set("myBusinessList", myBusinessList);
                    });                  
                }
                else{
                    FlowRouter.go("/");
                }
            }
        }
    });
}

Template.App_my_business.helpers({
    myBusinessList(){
        getMyBusinessList();
        return Session.get("myBusinessList");
    }
});

Template.App_my_business.events({
    "click .settingsbtn": function(e){
        var id = e.target.id;
        FlowRouter.go("/business/mybusiness/settings/"+id);
    }
});