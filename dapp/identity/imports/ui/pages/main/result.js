import "./result.html";
import "../../stylesheets/result.css";
import "./footer.js";
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
let resultdata;
let candidatedata;
let proposalResultList;
var scatter = {};
var eosinstance = {};
Template.App_result.onCreated(function () {
    Meteor.subscribe('identity');
    ScatterJS.scatter.connect('utopia').then(async connected => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                if (scatter.identity) {
                    eosinstance = eos;
                    var result = [];
                    var length = 0;
                    var id = FlowRouter.current().params.id;
                    console.log("id: ", id);
                    resultdata = await eosinstance.getTableRows({
                        code: "voteproposal",
                        scope: "voteproposal",
                        table: "votes13",
                        limit: "50",
                        json: true,
                    });
                    document.getElementsByClassName("waitingData")[0].style.display = "none";
                    if(resultdata){
                        console.log("resultdata===>><<=",resultdata);
                        //getting the length of list of all choices for a  particular proposal
                        var length = 0;
                        for (var i = 0; i < resultdata.rows.length; i++) {
                            if (id == resultdata.rows[i].proposal_id) {
                                length = resultdata.rows[i].choices.length;
                                break;
                            }
                        }

                        //creating a 2d array to store who got how many votes based on rank 
                        for (var i = 0; i < length; i++) {
                            result[i] = [];
                        }

                        for (var i = 0; i < length; i++) {
                            for (var j = 0; j < length; j++) {
                                result[i][j] = 0;
                            }
                        }

                        var input = [];
                        //creating a 2d array of total votes received 
                        for (var i = 0; i < resultdata.rows.length; i++) {
                            if (id == resultdata.rows[i].proposal_id) {
                                input.push(resultdata.rows[i].choices)
                            }
                        }

                        // calculaing votes based on ranks
                        //j is the candidate and val-1 is the total votes received for the rank
                        for (var i = 0; i < input.length; i++) {
                            for (j = 0; j < input[i].length; j++) {
                                var val = input[i][j];
                                result[j][val - 1] += 1;
                            }
                        }
                        for (var i = 0; i < result.length; i++) {
                            document.getElementById("proposal-result-votes").innerHTML += "<br><div class = 'ep2'></div>";

                            for (var j = 0; j < result[i].length; j++) {
                                var val = result[i][j]
                                document.getElementsByClassName("ep2")[i].innerHTML += "<div class = 'vote-stat'>" + val + "</div>"
                            }

                        }
                    };

                    candidatedata = await eosinstance.getTableRows({
                        code: "voteproposal",
                        scope: "voteproposal",
                        table: "proposal11",
                        limit: "50",
                        json: true,
                    });
                    if(candidatedata) {
                        var candidatelist = []
                        for (var i = 0; i < candidatedata.rows.length; i++) {
                            if (id == candidatedata.rows[i].id) {
                                for (var j = 0; j < candidatedata.rows[i].proposal_options.length; j++) {
                                    var val = candidatedata.rows[i].proposal_options[j];
                                    console.log("val==>",val);
                                    document.getElementById("proposal-result-name").innerHTML += "<br><div class = 'ep'>" + val + "</div>"

                                }

                            }
                        }
                    };

                    proposalResultList = await eosinstance.getTableRows({
                        code: "voteproposal",
                        scope: "voteproposal",
                        table: "result13",
                        limit: "50",
                        json: true,
                    });
                    if(proposalResultList){
                        var obj;
                        for(var i=0;i<proposalResultList.rows.length;i++){
                            if(id == proposalResultList.rows[i].proposal_id){
                                obj = proposalResultList.rows[i];
                                console.log("obj ",obj);
                                document.getElementsByClassName("resultbox")[0].style.display = "block";
                                document.getElementsByClassName("title")[0].innerHTML = "Winners!"
                                for(var j=0;j<obj.selected.length;j++){
                                    var val = obj.selected[j];
                                    document.getElementsByClassName("selected")[0].innerHTML += "<div class = 'options'></div>";
                                    document.getElementsByClassName("options")[j].innerHTML = "<div class = 'text'>"+val+"</div>"
                                }
                                
                            }
                        }
                    };
                    

                } else {
                    FlowRouter.go("/");
                }
            }
        } else {
            console.log("scatter not installed")
        }
    });
});


