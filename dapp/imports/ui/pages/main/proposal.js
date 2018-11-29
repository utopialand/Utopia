import "./proposal.html"
import "../../stylesheets/proposal.css";
import Eos from "eosjs";
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
var count = 0;

eosConfig = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
    keyProvider: ['5Jur4pK1Rb8xvdfNUUZJq5JE36HQUd9PNouWwjUdbWw7cK8ZuUo'],
    // WIF string or array of keys..
    httpEndpoint: 'https://jungle2.cryptolions.io:443',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
}
const eos = Eos(eosConfig);

Template.App_proposal.onRendered(async function(){
    let tabledata = await eos.getTableRows({
        code: "voteproposal",
        scope: "voteproposal",
        table: 'proposal11',
        limit: 50,
        json: true,
    });
    document.getElementById("proposal-group").innerHTML = "";
    console.log("table data after rendering", tabledata);
    var votebutton = "votebutton";
    var resultbutton = "resultbutton";
    for(var i = 0; i< tabledata.rows.length;i++){
        var desc = tabledata.rows[i].proposal_description;
        votebutton = votebutton+i;
        resultbutton = resultbutton+i;
        document.getElementById("proposal-group").innerHTML += 
        "<div class = 'redo'><p>"+desc+"</p><button class = 'vote-button' id = '"+votebutton+"'>vote</button>"
        +"<button class = 'result-button' id = '"+resultbutton+"'>result</button>"+"</div>";
        
    }
})

Template.App_proposal.events({
    "click .new-proposal-button": function () {
        /* document.getElementById("form-section").style.display = "block";
        document.getElementById("all-proposals").style.display = "none"; */
        FlowRouter.go("/newproposal");
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
    "click .vote-button": function(event){
        event.preventDefault();
        console.log("id of vote button ", event.target.id);
        var id = event.target.id;
        id = id[id.length-1];      
        
        FlowRouter.go("/vote/"+id);        
    },
    "click .result-button": function(event){
        event.preventDefault();
        console.log("id of result button ", event.target.id);
        var id = event.target.id;
        id = id[id.length-1];
        FlowRouter.go("/result/"+id);
    }
})