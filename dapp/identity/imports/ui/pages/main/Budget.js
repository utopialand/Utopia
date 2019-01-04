import "./Budget.html";
import "../../stylesheets/Budget.css";
import Eos from "eosjs";
import ScatterJS from "scatterjs-core";

//test commit to m1
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
let tabledata;
let budgetpropstart;
let propentry;
let winnerresult;
Template.budget_app.onCreated(function() {
  Meteor.subscribe("identity");
  ScatterJS.scatter.connect("utopia").then(async connected => {
    if (connected) {
      if (ScatterJS.scatter.connect("utopia")) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        if (scatter.identity) {
          eosinstance = eos;
          budgetpropstart = await eosinstance.getTableRows({
            code: "propbudget11",
            scope: "propbudget11",
            table: "votestat",
            limit: 50,
            json: true
          });
          propentry = await eosinstance.getTableRows({
              code: "propbudget11",
              scope: "propbudget11",
              table: "feature112",
              limit: 50,
              json: true
            });
            winnerresult = await eosinstance.getTableRows({
              code: "propbudget11",
              scope: "propbudget11",
              table: "result12",
              limit: 50,
              json: true
            });
            tabledata = await eosinstance.getTableRows({
              code: "propbudget11",
              scope: "propbudget11",
              table: "proposal13",
              limit: 50,
              json: true
            });
            document.getElementsByClassName("waitingData")[0].style.display = "none";
            document.getElementById("budgetpropbutton").style.display = "flex";
            if(propentry) {
              console.log("propentry-----==", propentry);
              console.log(propentry);
              if (propentry.rows.length == 0) {
                document.getElementById("stvvotingpage").style.display = "none";
              }
              else{
                document.getElementById("stvvotingpage").style.display = "flex";
              }
            };
            if(winnerresult) {
              console.log("winner response!!==>", winnerresult);
              if (winnerresult.rows.length == 0) {
                document.getElementById("stvresultpage").style.display = "none";
              }
              else{
                document.getElementById("stvresultpage").style.display = "flex";
              }
            };
            console.log("tabledata ==",tabledata);
            if(tabledata){
              var listlarge = [];
              var listmedium = [];
              var listsmall = [];
              for (var i = 0; i < tabledata.rows.length; i++) {
                if (
                  tabledata.rows[i].category == "l" &&
                  tabledata.rows[i].selected == 0
                ) {
                  listlarge.push(tabledata.rows[i]);
                } else if (
                  tabledata.rows[i].category == "m" &&
                  tabledata.rows[i].selected == 0
                ) {
                  listmedium.push(tabledata.rows[i]);
                } else if (
                  tabledata.rows[i].category == "s" &&
                  tabledata.rows[i].selected == 0
                ) {
                  listsmall.push(tabledata.rows[i]);
                }
              }

              if(listlarge.length!=0)
              {
                document.getElementsByClassName("large")[0].style.display = "flex";
                document.getElementById("largelist").innerHTML = "";
                for (var i = 0; i < listlarge.length; i++) {
                  var desc = listlarge[i].proposal_description;
                  document.getElementById("largelist").innerHTML +=
                    "<div class = 'redobudget'><p>" +
                    desc +
                    "</p><div class = 'like-button' id='" +
                    listlarge[i].id +
                    "' ></div>" +
                    "</div>";
                }
              }
          
              if(listmedium.length!=0)
              {
                document.getElementsByClassName("medium")[0].style.display = "flex";
                document.getElementById("mediumlist").innerHTML = "";
                for (var i = 0; i < listmedium.length; i++) {
                  var desc = listmedium[i].proposal_description;
                  document.getElementById("mediumlist").innerHTML +=
                    "<div class = 'redobudget'><p>" +
                    desc +
                    "</p><div class = 'like-button' id='" +
                    listmedium[i].id +
                    "' ></div>" +
                    "</div>";
                }
              }

              if(listsmall.length!=0)
              {
                document.getElementsByClassName("small")[0].style.display = "flex";
                document.getElementById("smalllist").innerHTML = "";
                for (var i = 0; i < listsmall.length; i++) {
                  var desc = listsmall[i].proposal_description;
                  document.getElementById("smalllist").innerHTML +=
                    "<div class = 'redobudget'><p>" +
                    desc +
                    "</p><div class = 'like-button' id='" +
                    listsmall[i].id +
                    "' ></div>" +
                    "</div>";
                }
              }
            };
        } else {
          FlowRouter.go("/");
        }
      }
    } else {
      console.log("scatter not installed");
    }
  });
});

Template.budget_app.onRendered(async function() {});
Template.budget_app.events({
  ////click on like button to see response
  "click .like-button": async function() {
    if (
      budgetpropstart.rows[0] == null ||
      budgetpropstart.rows[0].status == false
    ) {
      document.getElementsByClassName("like-button")[0].style.disable = true;
      alert(
        "previous voting duration has ended or upcoming has not started yet !!"
      );
    } else {
      document.getElementsByClassName("like-button")[0].style.display = "block";
      var propid = event.target.id;
      var username = localStorage.getItem("username");
      try{
        let propbudget11 = await eosinstance.contract("propbudget11");
        if(propbudget11)
        {
          let result = await propbudget11.catgvote(propid, username, { authorization: username });
            if(result){
              if (response) {
                alert("budget voting successfull");
              } else {
                alert("something went wrong!!!!");
              }
            };
        };
      }
      catch(err)
      {
        var parseResponse = await JSON.parse(err);
        var msg = await parseResponse.error.details[0].message.split(":")[1]
        alert(msg);
      }
    }
  },
  "click .budgetpropbutton": function() {
    FlowRouter.go("/createbudget");
  },
  "click .stvvotingpage": function() {
    FlowRouter.go("/stvvote");
  },
  "click .stvresultpage": function() {
    FlowRouter.go("/stvresult");
  }
});
