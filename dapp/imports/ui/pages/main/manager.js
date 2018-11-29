import "./manager.html";
import "../../pages/main/footer.js";
import "../../stylesheets/manager.css";
import Eos from "eosjs";
var count = 0;

eosConfig = {
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
  keyProvider: ["5Jur4pK1Rb8xvdfNUUZJq5JE36HQUd9PNouWwjUdbWw7cK8ZuUo"],
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
    table: "identity2",
    limit: 50,
    json: true
  });
  document.getElementById("manager-proposal-group").innerHTML = "";
  console.log("table data after rendering", tabledata);
  var id = 0;
  for (var i = 0; i < tabledata.rows.length; i++) {
    var desc = tabledata.rows[i].proposal_description;
    document.getElementById("manager-proposal-group").innerHTML +=
      "<div class = 'manager-redo'><p>" +
      desc +
      "</p><button class = 'delete-button'>delete</button><button class = 'declare-button'>declare winner</button>" +
      "</div>";
  }
});

Template.App_manager.events({
  "click #userDetails": function() {
    console.log("userDetails");
    console.log("userdata---", userdata);
    document.getElementById("manager-proposal-group").innerHTML = "";
    for (var i = 0; i < userdata.rows.length; i++) {
      var users = userdata.rows[i].username;
      document.getElementById("manager-proposal-group").innerHTML +=
        "<div class = 'manager-redo'><p>" +
        users +
        "</p><button class = 'delete-button'>approved</button><button class = 'declare-button'>disapproved</button>" +
        "</div>";
    }
  }
});

Template.App_manager.events({
  "click #proposalDetails": function() {
    console.log("abcdef");
    document.getElementById("manager-proposal-group").innerHTML = "";
    console.log("table data after rendering", tabledata);
    var id = 0;
    for (var i = 0; i < tabledata.rows.length; i++) {
      var desc = tabledata.rows[i].proposal_description;
      document.getElementById("manager-proposal-group").innerHTML +=
        "<div class = 'manager-redo'><p>" +
        desc +
        "</p><button class = 'delete-button'>delete</button><button class = 'declare-button'>declare winner</button>" +
        "</div>";
    }
  }
});
