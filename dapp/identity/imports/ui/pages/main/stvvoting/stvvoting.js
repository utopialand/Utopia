import "./stvvoting.html";
import "./stvvoting.css";
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
        var lnePropOpt = arr.length;
        var k=0;
        for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < budgetprop.rows.length; j++) {
            if (budgetprop.rows[j].id == arr[i]) {
              var desc = budgetprop.rows[j].proposal_description;
              var count = budgetprop.rows[j].count;
              var budgetpropId = budgetprop.rows[j].id;
              console.log("proposal_description-->", desc);
              console.log("count-->", count);
              console.log("id-->", budgetpropId);

              document.getElementById("proposalstvvote-group").innerHTML += 
              "<div class = 'redostvvote hover'>"+
              "<div class= 'candidatestvvote'>"+desc+"</div>"+
              "<div class='rank'>"+
              "<input class='input' type='number' id='rankdata"+k+"' min='1' max='"+lnePropOpt+"'/>"+
              "</div></div>";
              console.log(i);
              console.log(j);
              console.log(k);
              k=k+1;
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
    'click .submit':async function(e){

      /////////////////////////////////////////////
      let submitresult = await eosinstance
          .getTableRows({
            code: "propbudget11",
            scope: "propbudget11",
            table: "feature112",
            limit: 50,
            json: true
          })
      /////////////////////////////////////////////
      if(submitresult)
      {
        if(submitresult.rows[0].votingstat==0)
        {
          alert("stv voting has stopped or not started yet!!");
        }
        else{
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
  
          try {
            let propbudget11 = await eosinstance.contract("propbudget11");
            if(propbudget11)
            {
              let result = await propbudget11.voteprop(id ,data,username, { authorization: username });
              if(result)
              {
                console.log("response--",res);
                FlowRouter.go("/stvstatus");
              }
              else{
                alert("Something went wrong !!!!");
              }
            }
          } catch (err) {
              var parseResponse = await JSON.parse(err);
              var msg = await parseResponse.error.details[0].message.split(":")[1];
              alert(msg);
          }
        }
      }
       
    }
})