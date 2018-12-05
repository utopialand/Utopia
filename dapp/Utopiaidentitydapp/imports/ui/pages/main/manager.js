import "./manager.html";
import "../../pages/main/footer.js";
import "../../stylesheets/manager.css";
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
Template.App_manager.onCreated(function () {
  let tabledata;
  let userdata;
  Meteor.subscribe('identity');
  ScatterJS.scatter.connect('utopia').then((connected) => {
      if (connected) {
          if (ScatterJS.scatter.connect('utopia')) {
              scatter = ScatterJS.scatter;
              const requiredFields = { accounts: [network] };
              const eos = scatter.eos(network, Eos, eosOptions);
              if (scatter.identity) {
                  eosinstance = eos;
                  eosinstance.getTableRows({
                    code: "voteproposal",
                    scope: "voteproposal",
                    table: "proposal11",
                    limit: 50,
                    json: true
                  }).then((response)=>{
                    tabledata=response;
                    document.getElementById("manager-proposal-group").innerHTML = "";
                  console.log("table data after rendering", tabledata);
                  var id = 0;
                  for (var i = 0; i < tabledata.rows.length; i++) {
                    var desc = tabledata.rows[i].proposal_description;
                    var proposalId = tabledata.rows[i].id;
                    document.getElementById("manager-proposal-group").innerHTML +=
                      "<div class = 'manager-redo'><p>" +
                      desc +
                      "</p><button class = 'delete-button' id = '"+proposalId+"'>delete</button><button class = 'declare-button' id = '"+proposalId+"'>declare winner</button>" +
                      "</div>";
                  }
                  });
                   eosinstance.getTableRows({
                    code: "identityreg1",
                    scope: "identityreg1",
                    table: "citizen3",
                    limit: 50,
                    json: true
                  }).then((resp)=>{
                    userdata=resp;
                    if (document.getElementById("userList")) {
                      for (var i = 0; i < userdata.rows.length; i++) {
                        var users = userdata.rows[i].identity;
                        var ids = userdata.rows[i].id;
                        document.getElementById("manager-user-group").innerHTML +=
                          "<div class = 'manager-user-redo' id = '"+users+"'><p>" +
                          users +
                          "</p><button class = 'approved-button' id = '"+ids+"'>approved</button><button class = 'disapproved-button'id = '"+ids+"'>disapproved</button>" +
                          "</div>";
                      }
                    }
                    document.getElementById("userList").style.display = "none";
                  });
                  
                 
              } else {
                  FlowRouter.go("/");
              }
          }
      } else {
          console.log("scatter not installed")
      }
  });
});


Template.App_manager.onRendered(async function() {

});

Template.App_manager.events({
  "click #userDetails": function() {
    document.getElementById("userList").style.display = "block";
    document.getElementById("proposalList").style.display = "none";
  },
  "click #proposalDetails": function() {
    console.log("proposalDetails");
    document.getElementById("userList").style.display = "none";
    document.getElementById("proposalList").style.display = "block";

/* reqcitizen (username) */
  },
  "click .approved-button":async function(){
    console.log("helllllllloManager");
    var id=event.target.id;
    var userName=event.target.parentElement.id;
    console.log("id----",id);
    console.log("username------",userName);
    let contract = eosinstance.contract("identityreg1");
    console.log("===",contract);
    try{
      let res = contract.addcitizen(id,userName,"identityreg1",{authorization:"identityreg1"})
    }catch(err)
    {
      console.log("----",err)
    }
  },
  "click .disapproved-button":async function(){
    console.log("helllllllloManager - disapproved");
    console.log("id----",event.target.id);
    console.log("username------",event.target.parentElement.id);
  },
  "click .delete-button":async function(){
    console.log("deleteButtonClick");
    console.log("id----",event.target.id);
    var proposalId = event.target.id;
    let contract = eosinstance.contract("voteproposal");
    console.log("===",contract);
    try{
      let res = contract.delprop(proposalId,"identityreg1",{authorization:"identityreg1"})
    }catch(err)
    {
      console.log("----",err)
    }
  },
  "click .declare-button":async function(){
    console.log("declareButtonClick");
    console.log("id----",event.target.id);
  } 
});
