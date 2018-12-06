import "./proposal.html"
import "../../stylesheets/proposal.css";
import { Template } from 'meteor/templating';
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
let tabledata ;;
var scatter={};
var eosinstance = {};
Template.App_proposal.onCreated(function () {
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
                    table: 'proposal11',
                    limit: 50,
                    json: true,
                }).then((resp)=>{
                    tabledata=resp;
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



Template.App_proposal.events({
    "click #0":function(e){
        if($(e.target).text() == "User proposal"){
            $(e.target).text("Create new user proposal");
            document.getElementById("proposal-group").innerHTML = "";     
            document.getElementById("listhead").innerHTML = "";      
            document.getElementById("listhead").innerHTML += "<h1>Here is the list of proposals</h1>";        
            
            for (var i = 0; i < tabledata.rows.length; i++) {
                var desc = tabledata.rows[i].proposal_description;
                var votebutton = "votebutton";
                var resultbutton = "resultbutton";
                votebutton = votebutton + tabledata.rows[i].id;
                resultbutton = resultbutton + tabledata.rows[i].id;
                document.getElementById("proposal-group").innerHTML +=
                    "<div class = 'redo'><p>" + desc + "</p><button class = 'vote-button' id = '" + votebutton + "'>vote</button>"
                    + "<button class = 'result-button' id = '" + resultbutton + "'>result</button>" + "</div>";
        
            }
        }else{
            FlowRouter.go('/newproposal');
        }
        
       
    },
    "click #1": function () {
        /* document.getElementById("form-section").style.display = "block";
        document.getElementById("all-proposals").style.display = "none"; */
        FlowRouter.go("/budget");
    },
    "click .all-proposal-button": async function () {
        /* document.getElementById("form-section").style.display = "none";
        document.getElementById("all-proposals").style.display = "block"; */
        /* let tabledata = await eos.getTableRows({
            code: "voteproposal",
            scope: "voteproposal",
            table: 'proposal13',
            limit: 50,
            json: true,
        });
        document.getElementById("proposal-group").innerHTML = "";
        console.log("table data ", tabledata);
        var id = 0;
        for(var i = 0; i< tabledata.rows.length;i++){
            var desc = tabledata.rows[i].proposal_description;
            document.getElementById("proposal-group").innerHTML += 
            "<div class = 'redo'><p>"+desc+"</p><button class = 'vote-button' id = '"+id+"'>vote</button>"+"</div>";
            id = id+1;
        } */

    },
    "click #options": function () {
        /* var boxName = "textbox" + count;
        var options = "Option";
        document.getElementById("form-group").innerHTML += "<input type = 'text' placeholder = '"+ options +"' id = '"+boxName+"'/>"
        count += 1;
         */
        /* '<input type="text" id="' + boxName + '" "  />'; */
    },
    "click #create-proposal": function () {

        /* var proposal = $("#proposal").val();
        var duration = parseInt($("#duration").val());
        var noofwinners = parseInt($("#noofwinners").val());
        var options = [];
        for (var i = 0; i < count; i++) {
            var textbox = "#textbox" + i;
            var option = $(textbox).val();
            options.push(option);
        }
        var username = localStorage.getItem("username")
        eos.contract("voting").then(voting => {
            voting.createprop(proposal, duration, options, username, noofwinners, { authorization: username }, (err, res) => {
                if (err) {
                    console.log("error ", err);
                }
                else {
                    console.log("Result ", res);
                }
            })
        }) */
    },
    "click .vote-button": function (event) {
        event.preventDefault();
        var id = event.target.id;
        id = id[id.length - 1];

        FlowRouter.go("/vote/" + id);
    },
    "click .result-button": function (event) {
        event.preventDefault();
        var id = event.target.id;
        id = id[id.length - 1];
        FlowRouter.go("/result/" + id);
    }
})