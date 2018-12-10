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
var scatter = {};
var eosinstance = {};
let tabledata;
let userdata;
let budgetprop;
let budgetpropstart;
let propentry;

Template.App_manager.onCreated(function() {
  ScatterJS.scatter.connect("utopia").then(connected => {
    if (connected) {
      if (ScatterJS.scatter.connect("utopia")) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        if (scatter.identity) {
          eosinstance = eos;
          eosinstance
            .getTableRows({
              code: "voteproposal",
              scope: "voteproposal",
              table: "proposal11",
              limit: 50,
              json: true
            })
            .then(resp => {
              tabledata = resp;
              console.log("tabledata--", tabledata);
              document.getElementById("manager-proposal-group").innerHTML = "";
              console.log("table data after rendering", tabledata);
              var id = 0;
              for (var i = 0; i < tabledata.rows.length; i++) {
                var desc = tabledata.rows[i].proposal_description;
                var proposalId = tabledata.rows[i].id;
                document.getElementById("manager-proposal-group").innerHTML +=
                  "<div class = 'manager-redo'><p>" +
                  desc +
                  "</p><button class = 'delete-button' id = '" +
                  proposalId +
                  "'>delete</button><button class = 'declare-button' id = '" +
                  proposalId +
                  "'>declare winner</button>" +
                  "</div>";
              }
            });
          eosinstance
            .getTableRows({
              code: "identityreg1",
              scope: "identityreg1",
              table: "citizen",
              limit: 50,
              json: true
            })
            .then(resp => {
              userdata = resp;
              if (document.getElementById("userList")) {
                for (var i = 0; i < userdata.rows.length; i++) {
                  var users = userdata.rows[i].identity;
                  var ids = userdata.rows[i].id;
                  document.getElementById("manager-user-group").innerHTML +=
                    "<div class = 'manager-user-redo' id = '" +
                    users +
                    "'><p>" +
                    users +
                    "</p><button class = 'approved-button' id = '" +
                    ids +
                    "'>approved</button><button class = 'disapproved-button'id = '" +
                    ids +
                    "'>disapproved</button>" +
                    "</div>";
                }
              }
              document.getElementById("userList").style.display = "none";
            });

          eosinstance
            .getTableRows({
              code: "propbudget11",
              scope: "propbudget11",
              table: "proposal13",
              limit: 50,
              json: true
            })
            .then(resp => {
              budgetprop = resp;
            });
          eosinstance
            .getTableRows({
              code: "propbudget11",
              scope: "propbudget11",
              table: "votestat",
              limit: 50,
              json: true
            })
            .then(resp => {
              budgetpropstart = resp;
            });

            eosinstance.getTableRows({
              code: "propbudget11",
              scope: "propbudget11",
              table: "feature112",
              limit: 50,
              json: true
            })
            .then(resp => {
              propentry = resp;
              console.log("propentry-----", resp);
              console.log(propentry);
            });

        } else {
          FlowRouter.go("/");
        }
      }
    } else {
      console.log("scatter not installed");
    }
  });
});

Template.App_manager.onRendered(async function() {});

Template.App_manager.events({
  "click #userDetails": function() {
    document.getElementById("userList").style.display = "block";
    document.getElementById("proposalList").style.display = "none";
  },
  "click #proposalDetails": function() {
    console.log("proposalDetails");
    document.getElementById("userList").style.display = "none";
    document.getElementById("proposalList").style.display = "block";
    document.getElementsByClassName("budgetProposalsList")[0].style.display ="none";
    document.getElementsByClassName("manager-below-section")[0].style.display =
      "block";

    /* reqcitizen (username) */
  },
  "click .approved-button": async function() {
    console.log("helllllllloManager");
    var id = event.target.id;
    var userName = event.target.parentElement.id;
    console.log("id----", id);
    console.log("username------", userName);
    let contract = eosinstance.contract("identityreg1");
    console.log("===", contract);
    try {
      let res = contract.addcitizen(id, userName, "identityreg1", {
        authorization: "identityreg1"
      });
    } catch (err) {
      console.log("----", err);
    }
  },
  "click .disapproved-button": async function() {
    console.log("helllllllloManager - disapproved");
    console.log("id----", event.target.id);
    console.log("username------", event.target.parentElement.id);
  },
  "click .delete-button": async function() {
    console.log("deleteButtonClick");
    console.log("id----", event.target.id);
    var proposalId = event.target.id;
    let contract = eosinstance.contract("voteproposal");
    console.log("===", contract);
    try {
      let res = contract.delprop(proposalId, "identityreg1", {
        authorization: "identityreg1"
      });
    } catch (err) {
      console.log("----", err);
    }
  },
  "click .declare-button": async function() {
    console.log("declareButtonClick");
    console.log("id----", event.target.id);
  },
  "click #budgetButton": async function() {
    console.log("budgetButton clicked");
    console.log("budgetprop: -->", budgetprop);
    console.log("budgetpropstart", budgetpropstart.rows[0]);

    console.log("dhsdhs", tabledata);
    document.getElementsByClassName("manager-below-section")[0].style.display =
      "none";
    document.getElementById("budgetProposalsList").style.display = "flex";

    document.getElementsByClassName("budgetProposalsList")[0].innerHTML = "";
    for (var i = 0; i < budgetprop.rows.length; i++) {
      var desc = budgetprop.rows[i].proposal_description;
      var count = budgetprop.rows[i].count;
      var budgetpropId = budgetprop.rows[i].id;
      console.log("proposal_description-->", desc);
      console.log("count-->", count);
      console.log("id-->", budgetpropId);
      document.getElementsByClassName("budgetProposalsList")[0].innerHTML +=
      "<div class = 'bpFlex'>" +
      "<div class = 'bpClass'>" +
      "</div>" +
      "<div class = 'bpCount'>" +
      "</div>"+
      "</div>"
      document.getElementsByClassName("bpClass")[i].innerHTML = desc;
      document.getElementsByClassName("bpCount")[i].innerHTML = count;
    }

    if (
      budgetpropstart.rows[0] == null ||
      budgetpropstart.rows[0].status == false
    ) {
      document.getElementsByClassName("budgetProposalsList")[0].innerHTML +=
        "<div class  = 'start-stop'  id = 'starton'><button>START</button></div>";
    } else {
      document.getElementsByClassName("budgetProposalsList")[0].innerHTML +=
        "<div class  = 'start-stop' id = 'stopon'><button>STOP</button></div>";
    }
  },
  "click #condidateButton": async function() {
    console.log("candidateList");
    document.getElementsByClassName("manager-below-section")[0].style.display =
      "flex";
    document.getElementById("budgetProposalsList").style.display = "none";
  },

  "click #starton": async function() {
    console.log("starton");
    var username = localStorage.getItem("username");
    eosinstance.contract("propbudget11").then(propbudget11 => {
      propbudget11
        .votingon(username, { authorization: username })
        .then(response => {
          if (response) {
            console.log("hello--", response);
          } else {
            alert("identity is not registered !!!!");
          }
        });
    });
  },

  "click #stopon": async function() {
    console.log("stopon");
    var username = localStorage.getItem("username");
    eosinstance.contract("propbudget11").then(propbudget11 => {
      propbudget11
        .votingoff(username, { authorization: username })
        .then(response => {
          if (response) {
            console.log("hello--", response);
          } else {
            alert("identity is not registered !!!!");
          }
        });
    });
    document.getElementById("stopon").style.display = "none";
    document.getElementsByClassName("budgetProposalsList")[0].innerHTML +=
      "<div class  = 'selectedStatusButton' id = 'selectedStatus'><button>SelectedProposal</button></div>";
  },
  "click #selectedStatus": async function() {
    console.log("selectedStatus");
    var username = localStorage.getItem("username");
    eosinstance.contract("propbudget11").then(propbudget11 => {
      propbudget11
        .selectprop(username, { authorization: username })
        .then(response => {
          if (response) {
            console.log("hello--", response);
          } else {
            alert("identity is not registered !!!!");
          }
        });
    });

    document.getElementsByClassName("budgetProposalsList")[0].innerHTML = "";
    console.log("===============budgetprop==================", budgetprop);
    console.log("===",propentry.rows[0].proposal_options);
    let arr;
    arr = propentry.rows[0].proposal_options;
    console.log("arr------===>",arr);
    console.log("arr------===>",arr[0]);
    console.log("arr------===>",arr[1]);
    console.log("arr------===>",arr[2]);
    console.log("=====bdg",budgetprop.rows[0].id);
    console.log("length==>",budgetprop.rows.length);

    for (var i = 0; i < budgetprop.rows.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (budgetprop.rows[i].id == arr[j]) {
          var desc = budgetprop.rows[i].proposal_description;
          var count = budgetprop.rows[i].count;
          var budgetpropId = budgetprop.rows[i].id;
          console.log("proposal_description-->", desc);
          console.log("count-->", count);
          console.log("id-->", budgetpropId);
          document.getElementsByClassName("budgetProposalsList")[0].innerHTML +=
            "<div class = 'bpFlex'>" +
            "<div class = 'bpClass'>" +
            "</div>" +
            "<div class = 'bpCount'>" +
            "</div>"+
            "</div>"
            document.getElementsByClassName("bpClass")[i].innerHTML = desc;
            document.getElementsByClassName("bpCount")[i].innerHTML = count;
        }
      }
    }
    document.getElementsByClassName("budgetProposalsList")[0].innerHTML +=
    "<div class = 'managerSelection'>"+
                "<input type='text' placeholder='details' id = 'details'/>"+
                "<input  type='text' placeholder='duration' id = 'duration'/>"+
                "<input  type='text' placeholder='noOfwinner' id = 'noOfwinner'/>"+
           " </div>"
    +"<button class = 'submitButton' id = 'submitButton'>submit</button>"
  },
  "click #submitButton": async function() {
    console.log("manager submit");
    var username = localStorage.getItem("username");
    var details = $('#details').val();
    var duration = $('#duration').val();
    var noOfwinner = $('#noOfwinner').val();
    var id =  propentry.rows[0].id;
    console.log("username",username);
    console.log("details",details);
    console.log("duration",duration);
    console.log("noOfwinner",noOfwinner);
    console.log("id",id);
    eosinstance.contract("propbudget11").then(propbudget11 => {
      propbudget11
        .startstv(id,username,details,duration,noOfwinner,{ authorization: username })
        .then(response => {
          if (response) {
            console.log("hello--", response);
          } else {
            alert("identity is not registered !!!!");
          }
        });
    });
    FlowRouter.go("/budget");
  }
});
