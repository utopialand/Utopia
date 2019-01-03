import "./realestate.html";
import "./realestate.css";
import "../../../../templates/footer/footer.js";
import Eos from "eosjs";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import { Session } from "meteor/session";
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
let userinfo;
function allProperties(){
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                eosinstance = eos;
                if (scatter.identity) {
                    eosinstance.getTableRows({
                        code: "realstateutp",
                        scope: "realstateutp",
                        table: "proptlist1",
                        limit: "50",
                        json: true,
                    }).then((response) => {
                        console.log("response of all properties ", response.rows);
                        Session.set("allPropertyList", response.rows);
                    });
                    eosinstance.getTableRows({
                        code: "identityreg1",
                        scope: "identityreg1",
                        table: "identity3",
                        limit: 50,
                        json: true
                      }).then((resp)=>{
                        userinfo=resp;
                        console.log("user--",userinfo);
                        var username=localStorage.getItem("username");
                        for(var i=0;i<userinfo.rows.length;i++){
                        if(userinfo.rows[i].username == username)
                        {
                        document.getElementsByClassName("manageproperty")[0].style.display = "flex";
                        document.getElementsByClassName("buypropertypagebtn")[0].style.display = "flex";
                        document.getElementsByClassName("bidpropertypagebtn")[0].style.display = "flex";         
                        break;
                        }else{
                        document.getElementsByClassName("manageproperty")[0].style.display = "none";
                        document.getElementsByClassName("buypropertypagebtn")[0].style.display = "none";
                        document.getElementsByClassName("bidpropertypagebtn")[0].style.display = "none";   
                        }
                    }
                      });
                      
                }
                else {
                    FlowRouter.go("/");
                }
            }
        }
    });
}

Template.App_real_estate.helpers({
    getAllProperties: function () {
        allProperties();
        return Session.get("allPropertyList");
    }
});

Template.App_real_estate.events({
    "click .enquire-btn": function (e) {
        var id = e.target.id.split("-")[1]
        console.log("id ", id);
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

        for(var i=0;i<propertyTb.rows.length;i++){
            if(searchTerm == propertyTb.rows[i].proptname){
                id = propertyTb.rows[i].id;
                searchResult = true;
                break;
            }
        }

        if(searchResult){
            FlowRouter.go("/realestate/"+id);
        }else{
            alert("No such property");
        }
    }
});