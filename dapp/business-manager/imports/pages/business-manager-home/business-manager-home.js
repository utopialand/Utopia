import "./business-manager-home.html";
import "./business-manager-home.css";
import { FlowRouter } from 'meteor/kadira:flow-router';
import Eos from "eosjs";

eosConfig = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
    keyProvider: ['5Jur4pK1Rb8xvdfNUUZJq5JE36HQUd9PNouWwjUdbWw7cK8ZuUo'],
    // WIF string or array of keys..
    httpEndpoint: 'https://jungle2.cryptolions.io:443',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
}

const eos = Eos(eosConfig);

Template.App_business_manager_home.onRendered(async function(){
    
    let businessdata = await eos.getTableRows({
        code: "utopbusiness",
        scope: "utopbusiness",
        table: "businesstb",
        limit: "50",
        json: true,
    });

    console.log("all the business that i own :", businessdata.rows);
    console.log("array from ", Array.from(businessdata.rows))

    for(var i=0; i<5;i++){
        var companyName = businessdata.rows[i].businessname;
        var stockname = businessdata.rows[i].token_maximum_supply;
        document.getElementsByClassName("company-name")[i].innerHTML = companyName;
        document.getElementsByClassName("stockname")[i].innerHTML = stockname;

    }

});

Template.App_business_manager_home.events({
    "click .new-business": function(){
        FlowRouter.go("/newbusiness");
    }
});