import "./stvresult.html";
import "./stvresult.css";
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
var budgetprop;
let winnerresult;
let arr = [];

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
          await eosinstance
            .getTableRows({
              code: "propbudget11",
              scope: "propbudget11",
              table: "result12",
              limit: 50,
              json: true
            })
            .then(resp => {
              winnerresult =  resp; 
              console.log("winner response!!==>", resp);
            });

          await eosinstance
            .getTableRows({
              code: "propbudget11",
              scope: "propbudget11",
              table: "proposal13",
              limit: 50,
              json: true
            })
            .then(resp => {
              budgetprop = resp;
              console.log("budgetprop-----", budgetprop);
            });
            for(var k = 0; k< winnerresult.rows.length;k++)
            {
              arr = winnerresult.rows[k].selected;
              console.log("arrrrrrrrrrrr-----",arr);
              for (var i = 0; i < budgetprop.rows.length; i++) {
                for (var j = 0; j < arr.length; j++) {
                  if (budgetprop.rows[i].id == arr[j]) {
                    var desc = budgetprop.rows[i].proposal_description;
                    var count = budgetprop.rows[i].count;
                    var budgetpropId = budgetprop.rows[i].id;
                    console.log("proposal_description-->", desc);
                    console.log("count-->", count);
                    console.log("id-->", budgetpropId);
                    document.getElementById("winner-result-name").innerHTML += "<div>"+desc+"</div>";
                    document.getElementById("winner-result-count").innerHTML +="<div>"+count+"</div>";
                    /* document.getElementById("winner-result-info").innerHTML +="<div class = 'total-votes' id = '"+budgetpropId+"'>"+'result-table-info'+"</div>"; */
                 
                  }
                }
              }
            }
        } else {
          FlowRouter.go("/");
        }
      }
    } else {
      console.log("scatter not installed");
    }
  });
});
Template.App_stvresult.events({
  "click .total-votes": function() {
    var id = event.target.id;
    console.log("id==>",id);
  }});
  Template.App_stvresult.events({
    "submit .new-task": function (event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        var text = event.target.text.value;
        console.log(text)
        
    }
    });
    
  
