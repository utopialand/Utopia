import "./newproposal.html";
import "../../stylesheets/newproposal.css";
import "./footer.js";
import { Template } from "meteor/templating";
import ScatterJS from "scatterjs-core";
import Eos from "eosjs";

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
  
var eosinstance;
var count = 1;
Template.App_newproposal.onCreated(async function () {
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                eosinstance=eos;
            }
        }
    });
})
Template.App_newproposal.events({
    "click #addprop": function () {
        var boxName = "textbox" + count;
        var options = "";
        document.getElementById("propnum").innerHTML += "<input type = 'text' placeholder = '"+ options +"' id = '"+boxName+"'/>"
        count += 1;        
    },
    "click #finalsubmit":function(){
        var data=[];
        for(var i=0;i<count;i++){
        var item=$("#textbox"+i).val();
        data.push(item);
        }
        var prop=$("#propname").val();
        var propdesc=$("#propdesc").val();
        var numwin=parseInt($("#numwin").val());
        console.log("----",eosinstance,"--",prop,"---",propdesc,"---",numwin,"===",data);
        var username=localStorage.getItem("username")
        eosinstance.contract("voteproposal").then(voting => {
            voting.createprop(prop ,propdesc,30,data,username,numwin, { authorization: username }).then(
                (res) => {
                      console.log("response--",res);
                }
            )
        })
    }
})