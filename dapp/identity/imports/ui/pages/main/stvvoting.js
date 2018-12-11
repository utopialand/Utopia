import "./stvvoting.html";
import "../../stylesheets/stvvoting.css";
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
var budgetprop;
let propentry;
let arr = [];
Template.App_stvvote.onCreated(async function() {
  ScatterJS.scatter.connect("utopia").then(async (connected) => {
    if (connected) {
      if (ScatterJS.scatter.connect("utopia")) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        eosinstance = eos;

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

         await eosinstance
          .getTableRows({
            code: "propbudget11",
            scope: "propbudget11",
            table: "feature112",
            limit: 50,
            json: true
          })
          .then(resp => {
            propentry = resp;
            console.log("propentry-----", resp);
          });

        arr = propentry.rows[0].proposal_options;
        for (var i = 0; i < budgetprop.rows.length; i++) {
          for (var j = 0; j < arr.length; j++) {
            if (budgetprop.rows[i].id == arr[j]) {
              var desc = budgetprop.rows[i].proposal_description;
              var count = budgetprop.rows[i].count;
              var budgetpropId = budgetprop.rows[i].id;
              console.log("proposal_description-->", desc);
              console.log("count-->", count);
              console.log("id-->", budgetpropId);

              document.getElementById("proposalstvvote-group").innerHTML += 
              "<div class = 'redostvvote hover'>"+
              "<div class= 'candidatestvvote'>"+desc+"</div>"+
              "<div class='rank'>"+
              "<input class='input' type='text' id='rankdata"+i+"'/>"+
              "</div></div>";
              console.log(i);
            }
          }
        }
        document.getElementById("proposalstvvote-group").innerHTML += 
        "<button class='submit hover'>"+"submit"+"</button>"
      }
    } else {
      console.log("scatter not installed");
    }
  });
});

Template.App_stvvote.events({
    'click .submit':function(e){
        var data = [];
        console.log("arr length",arr.length)
        for(var i=0;i<arr.length;i++){
            var item=$("#rankdata"+i).val();
            console.log("item",item);
            data.push(parseInt(item));
            }
        let id = propentry.rows[0].id;
        console.log("feature id==>",id);
        var username=localStorage.getItem("username");
        console.log("username", username);

        eosinstance.contract("propbudget11").then(stvvoting => {
            stvvoting.voteprop(id ,data,username, { authorization: username }).then(
                (res) => {
                      console.log("response--",res);
                }
            )
        })
       
    }
})