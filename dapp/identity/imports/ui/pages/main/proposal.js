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
let tabledata;
let winnerresult;
var scatter = {};
var eosinstance = {};
var flag = 0;
Template.App_proposal.onCreated(async function () {
    var connected=await ScatterJS.scatter.connect('utopia');
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                if (scatter.identity) {
                   var tabledata= await eos.getTableRows({
                        code: "voteproposal",
                        scope: "voteproposal",
                        table: 'proposal11',
                        limit: 50,
                        json: true,
                    });
                    document.getElementsByClassName("waitingprop")[0].style.display="none";
                    if(tabledata){
                        console.log("tabdata--",tabledata)
                        var winnerresult=await eos.getTableRows({
                            code: "voteproposal",
                            scope: "voteproposal",
                            table: "result13",
                            limit: 50,
                            json: true
                        })
                    }
                    if(winnerresult){
                        console.log("winnerdata--",winnerresult);
                        document.getElementById("proposal-group").innerHTML = "";          
            
                        for (var i = 0; i < tabledata.rows.length; i++) {
                            var desc = tabledata.rows[i].proposal_description;
                            flag = 0;
                            var votebutton = "votebutton";
                            var resultbutton = "resultbutton";
                            votebutton = votebutton + tabledata.rows[i].id;
                            resultbutton = resultbutton + tabledata.rows[i].id;
                            for (let j = 0; j < winnerresult.rows.length; j++) {
                                if (tabledata.rows[i].id == winnerresult.rows[j].proposal_id) {
                                    document.getElementById("proposal-group").innerHTML +=
                                        "<div class = 'redo'><p>" + desc + "</p>"
                                        + "<button class = 'result-button' id = '" + resultbutton + "'>result</button>" + "</div>";
                                    flag = 1;
                                    break;
                                }
                            }
                            if (flag == 0) {
                                document.getElementById("proposal-group").innerHTML +=
                                    "<div class = 'redo'><p>" + desc + "</p><button class = 'vote-button' id = '" + votebutton + "'>vote</button>"
                                    + "<button class = 'result-button' id = '" + resultbutton + "'>vote_status</button>" + "</div>";
                            }
            
            
                        }
                    }
                     
                } else {
                    FlowRouter.go("/");
                }
            }
        } else {
            console.log("scatter not installed")
        }
    
});

Template.App_proposal.events({
    "click #0": function (e) {        
            FlowRouter.go('/newproposal');       
    },
    "click #1": function () {
        FlowRouter.go("/budget");
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