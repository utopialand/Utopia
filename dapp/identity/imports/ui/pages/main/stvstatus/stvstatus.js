import "./stvstatus.html";
import "./stvstatus.css";
import "../App-manager/manager.css";
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
let propentry;
let resultdata;
let budgetprop;
Template.App_stvstatus.onCreated(function () {
    ScatterJS.scatter.connect('utopia').then(async (connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                if (scatter.identity) {
                    eosinstance = eos;

                      await eosinstance
                      .getTableRows({
                        code: "propbudget11",
                        scope: "propbudget11",
                        table: "votes111",
                        limit: "50",
                        json: true
                      })
                      .then(response => {
                        resultdata = response;
                        console.log("resultdata=>",resultdata);
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
                        console.log(propentry);
                      });

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
                      });
                      ////////////////////////////////////////////

                      if (propentry.rows.length != 0) {
                        console.log("propentry.value===>", propentry);
                        console.log("abcdef");
                        console.log("resultdata==>", resultdata);
                        if(resultdata.rows.length!=0)
                        {
                          var result = [];
                          var id = propentry.rows[0].id;
                          console.log("ids===>>>", id);
                          //getting the length of list of all choices for a  particular proposal
                          var length = 0;
                          for (var i = 0; i < resultdata.rows.length; i++) {
                            if (id == resultdata.rows[i].feature_id) {
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
                            if (id == resultdata.rows[i].feature_id) {
                              input.push(resultdata.rows[i].choices);
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
                            document.getElementById("proposal-result-votes").innerHTML +=
                              "<div class = 'ep2manager'></div><br>";
                    
                            for (var j = 0; j < result[i].length; j++) {
                              var val = result[i][j];
                              console.log("val--<<<<<<", val);
                              document.getElementsByClassName("ep2manager")[i].innerHTML +=
                                "<div class = 'vote-stat'>" + val + "</div>";
                            }
                          }
                        }
                        let arr;
                        arr = propentry.rows[0].proposal_options;
                        for (var i = 0; i < arr.length; i++) {
                          for (var j = 0; j < budgetprop.rows.length; j++) {
                            if (budgetprop.rows[j].id == arr[i]) {
                              var desc = budgetprop.rows[j].proposal_description;
                              var count = budgetprop.rows[j].count;
                              var budgetpropId = budgetprop.rows[j].id;
                              console.log("proposal_description-->", desc);
                              console.log("count-->", count);
                              console.log("id-->", budgetpropId);
                              console.log("arr.length-->", arr.length);
                  
                              document.getElementById("proposal-result-name").innerHTML +=
                                "<div class = 'epmanager'>" + desc + "</div><br>";
                            }
                          }
                        }
                      }
                      ////////////////////////////////////////////
                } else {
                    FlowRouter.go("/");
                }
            }
        } else {
            console.log("scatter not installed")
        }
    });
});