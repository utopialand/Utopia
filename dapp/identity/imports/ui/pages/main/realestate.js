import "./realestate.html";
import "../../stylesheets/realestate.css";
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
Template.App_stvresult.onCreated(function() {
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
        } else {
          FlowRouter.go("/");
        }
      }
    } else {
      console.log("scatter not installed");
    }
  });
});
