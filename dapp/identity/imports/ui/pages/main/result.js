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

var scatter={};
var eosinstance = {};
Template.App_result.onCreated(function () {
    let resultdata;
    let candidatedata;
  Meteor.subscribe('identity');
  ScatterJS.scatter.connect('utopia').then((connected) => {
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
                   eosinstance.getTableRows({
                      code: "voteproposal",
                      scope: "voteproposal",
                      table: "votes13",
                      limit: "50",
                      json: true,
                      /* key_type: "i64",
                      index_position: 2 */
                  }).then((response)=>{
                      resultdata=response;
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
                  for(var i=0;i<result.length;i++){
                    document.getElementById("proposal-result-votes").innerHTML +="<br><div class = 'ep2'></div>";
            
                    for(var j=0;j<result[i].length;j++){
                        var val = result[i][j]
                        document.getElementsByClassName("ep2")[i].innerHTML += "<div class = 'vote-stat'>"+val+"</div>"
                    }
                    
                }
                  });
              
                   eosinstance.getTableRows({
                      code: "voteproposal",
                      scope: "voteproposal",
                      table: "proposal11",
                      limit: "50",
                      json: true,
                  }).then((response)=>{
                    candidatedata=response;
                    var candidatelist = []
                  for(var i=0;i<candidatedata.rows.length;i++){
                      if(id == candidatedata.rows[i].id){
                          for(var j=0;j<candidatedata.rows[i].proposal_options.length;j++){
                              var val = candidatedata.rows[i].proposal_options[j]
                              document.getElementById("proposal-result-name").innerHTML += "<br><div class = 'ep'>"+val+"</div>"
                  
                          }
                                      
                      }
                  }
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

Template.App_result.events({
   'click .winnerbutton':function(){
        console.log("--");
        document.getElementById("winnername").innerHTML += "<h1 class='namewinner'>kaira is winner</h1>"
   }
})

<<<<<<< HEAD:dapp/Utopiaidentitydapp/imports/ui/pages/main/result.js
=======
Template.App_result.onRendered(async function () {
    var result = [];
    var length = 0;
    var id = FlowRouter.current().params.id;
    console.log("id: ", id);
    let resultdata = await eos.getTableRows({
        code: "voteproposal",
        scope: "voteproposal",
        table: "votes13",
        limit: "50",
        json: true,
        /* key_type: "i64",
        index_position: 2 */
    });

    let candidatedata = await eos.getTableRows({
        code: "voteproposal",
        scope: "voteproposal",
        table: "proposal11",
        limit: "50",
        json: true,
    });

    console.log("resultdata ", resultdata);

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

    var desc;
    var proposaldetail;

    for(var i=0;i<candidatedata.rows.length;i++){
        if(id == candidatedata.rows[i].id){
            desc = candidatedata.rows[i].proposal_description;
            proposaldetail = candidatedata.rows[i].proposal_detail;
            break;
        }
    }

    console.log("proposal description : ", desc);

    document.getElementById("proposal-desc").innerHTML = desc;
    document.getElementById("proposal-detail").innerHTML = proposaldetail;

    for(var i=0;i<candidatedata.rows.length;i++){
        if(id == candidatedata.rows[i].id){
            for(var j=0;j<candidatedata.rows[i].proposal_options.length;j++){
                var val = candidatedata.rows[i].proposal_options[j]
                document.getElementById("proposal-result-name").innerHTML += "<br><div class = 'ep'>"+val+"</div>"
    
            }
                        
        }
    }


    console.log("candidatedata", candidatedata);
    console.log("result after calculating ", result);
    
    /* for(var i=0;i<result.length;i++){
        document.getElementById("proposal-result-votes").innerHTML +="<br><div class = 'ep'>"+ result[i].toString().replace(/,/g, '/')+"</div>";
        
    } */


    for(var i=0;i<result.length;i++){
        document.getElementById("proposal-result-votes").innerHTML +="<br><div class = 'ep2'></div>";

        for(var j=0;j<result[i].length;j++){
            var val = result[i][j]
            document.getElementsByClassName("ep2")[i].innerHTML += "<div class = 'vote-stat'>"+val+"</div>"
        }
        
    }
});
>>>>>>> 5bf16c2fd0819c59a0c16e74dc4917732db8d6ec:dapp/identity/imports/ui/pages/main/result.js
