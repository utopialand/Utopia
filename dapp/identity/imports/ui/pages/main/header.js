import "./header.html";
import "../../stylesheets/header.css";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
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

var eosinstance = {};
Template.header.onCreated(function() {
    console.log("onCreated");
  ScatterJS.scatter.connect("utopia").then(async connected => {
    if (connected) {
      /* var ts = Math.round((new Date()).getTime() / 1000);
      console.log("time===>",ts); */
      if (ScatterJS.scatter.connect("utopia")) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        if (scatter.identity) {
          eosinstance = eos;
          document.getElementsByClassName("identitySection")[0].style.display = "flex";
        } else {
          FlowRouter.go("/");
          document.getElementsByClassName("identitySection")[0].style.display = "none";
        }
      }
    } else {
      console.log("scatter not installed");
    }
  });
});

Template.header.events({
    "click .proposal": function(){
        console.log("proposal link was clicked");
        FlowRouter.go("/proposal");
    },
    "click .logo": function(){
        console.log("logo was clikced");
        FlowRouter.go("/");
    },
    "click .identityText": function(){
        console.log("identity text was clicked");
        FlowRouter.go("/identity");
    },
    "click .managerText": function(){
        console.log("manager");
        FlowRouter.go("/manager");
    },
    "click .business-link": function(){
        FlowRouter.go("/business");
    },
    "click .real-estate-link": function(){
      FlowRouter.go("/realestate");
    }
});