import "./manager.html";
import "../../pages/main/footer.js";
import "../../stylesheets/manager.css";
import Eos from "eosjs";
var count = 0;

eosConfig = {
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
  /* keyProvider: ["5Jur4pK1Rb8xvdfNUUZJq5JE36HQUd9PNouWwjUdbWw7cK8ZuUo"], */
  keyProvider:["5KKodHxhrpZQhWeVTAzBJgfwGwPjkYAZdtWiWX9jaZTDL7utgKo"],
  // WIF string or array of keys..
  httpEndpoint: "https://jungle2.cryptolions.io:443",
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
};
const eos = Eos(eosConfig);
let tabledata;
let userdata;
Template.App_manager.onRendered(async function() {
  tabledata = await eos.getTableRows({
    code: "voteproposal",
    scope: "voteproposal",
    table: "proposal11",
    limit: 50,
    json: true
  });
  userdata = await eos.getTableRows({
    code: "identityreg1",
    scope: "identityreg1",
    table: "citizen",
    limit: 50,
    json: true
  });
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

Template.App_manager.events({
  "click #userDetails": function() {
    console.log("userDetails");
    console.log("table data after rendering", userdata);
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
    let contract = await eos.contract("identityreg1");
    console.log("===",contract);
    try{
      let res = await contract.addcitizen(id,userName,"identityreg1",{authorization:"identityreg1"})
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
    let contract = await eos.contract("voteproposal");
    console.log("===",contract);
    try{
      let res = await contract.delprop(proposalId,"identityreg1",{authorization:"identityreg1"})
    }catch(err)
    {
      console.log("----",err)
    }
  },
  "click .declare-button":async function(){
    console.log("declareButtonClick");
    console.log("id----",event.target.id);
  }, 
  "click #budgetButton": function(){
    console.log("budgetButton clicked");
    document.getElementById("budgetButton").innerHTML =
    "<div class = 'startButton'>"+
    "<button>start</button>"
    "</div>"
  }
});


