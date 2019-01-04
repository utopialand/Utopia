import "./citizenship.html";
import "../../stylesheets/citizenship.css";
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

var scatter={};
var eosinstance = {};
Template.citizenship.onCreated(function () {

  Meteor.subscribe('identity');
  ScatterJS.scatter.connect('utopia').then(async(connected) => {
      if (connected) {
          if (ScatterJS.scatter.connect('utopia')) {
              scatter = ScatterJS.scatter;
              const requiredFields = { accounts: [network] };
              const eos = scatter.eos(network, Eos, eosOptions);
              if (scatter.identity) {
                  eosinstance = eos;
                  let tabledata =await eosinstance.getTableRows({
                    code: "identityreg1",
                    scope: "identityreg1",
                    table: "citizen3",
                    limit: 50,
                    json: true
                  });
                
                  console.log("tabledata---------", tabledata.rows);
                  var account_name = localStorage.getItem("username");
                  console.log("account_name ---", account_name);
                  for (var i = 0; i < tabledata.rows.length; i++) {
                    var acc = tabledata.rows[i].identity;
                    if (acc == account_name) {
                      status = tabledata.rows[i].approved;
                      console.log("status----", status);
                      if (status == 0) {
                        document.getElementById("heading-status").innerHTML =
                          "You have already applied for citizenship";
                      }
                      if (status == 1) {
                        document.getElementById("insidetext").innerHTML = "approved";
                        document.getElementById("heading-status").innerHTML =
                          "You are now a citizen of utopia!!!";
                      }
                    }
                  }
              } else {
                  FlowRouter.go("/");
              }
          }
      } else {
          console.log("scatter not installed")
      }
  });
});


