import "./Createbond.html";
import "../../stylesheets/Createbond.css";
import "./footer";
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
Template.bond.onCreated(async function () {
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
Template.bond.events({
    "click #submitbond":function(){
        var sym="UTP";
        var bondname=$("#bondname").val();
        var maturity=parseInt($("#maturity").val());
        var couponrate=parseFloat($("#couponrate").val());
        var couponintervel=parseInt($("#couponintervel").val());
        var facevalue=`${parseFloat($("#facevalue").val()).toFixed(4)} ${sym}`
        var username=localStorage.getItem("username")
        eosinstance.contract("bondborrower").then(bond => {
            bond.addbond(username ,bondname,maturity,couponrate,couponintervel,facevalue, { authorization: username }).then(
                (res) => {
                      console.log("response--",res);
                }
            )
        })
    }
})