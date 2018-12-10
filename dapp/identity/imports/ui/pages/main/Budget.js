import "./Budget.html";
import "../../stylesheets/Budget.css";
import Eos from "eosjs";
import ScatterJS from "scatterjs-core";
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
let tabledata ;
let budgetpropstart;
Template.budget_app.onCreated(function () {
    Meteor.subscribe('identity');
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                if (scatter.identity) {
                    eosinstance=eos;
                    eos.getTableRows({
                        /*  code: "voteproposal",
                         scope: "voteproposal",
                         table: 'proposal11',
                         limit: 50,
                         json: true, */
                         code: "propbudget11",
                         scope: "propbudget11",
                         table: 'proposal13',
                         limit: 50,
                         json: true,
                     }).then((response)=>{
                         tabledata=response;
                         document.getElementById("largelist").innerHTML = "";
                         var listlarge=[];
                         var listmedium=[];
                         var listsmall=[];
                      for(var i = 0; i < tabledata.rows.length; i++){
                          if(tabledata.rows[i].category=="l"&&tabledata.rows[i].selected==0){
                              listlarge.push(tabledata.rows[i]);
                          }else if(tabledata.rows[i].category=="m"&&tabledata.rows[i].selected==0){
                              listmedium.push(tabledata.rows[i]);
                          }else if(tabledata.rows[i].category=="s"&&tabledata.rows[i].selected==0){
                              listsmall.push(tabledata.rows[i]);
                          }
                      }
                      
                          for (var i = 0; i < listlarge.length; i++) {
                              var desc = listlarge[i].proposal_description;
                              document.getElementById("largelist").innerHTML +=
                                  "<div class = 'redobudget'><p>" + desc + "</p><div class = 'like-button' id='"+listlarge[i].id+"' ></div>"
                                   + "</div>";
                      
                          }
                          document.getElementById("mediumlist").innerHTML = "";
                         
                      
                          for (var i = 0; i < listmedium.length; i++) {
                              var desc = listmedium[i].proposal_description;
                              document.getElementById("mediumlist").innerHTML +=
                                  "<div class = 'redobudget'><p>" + desc + "</p><div class = 'like-button' id='"+listmedium[i].id+"' ></div>"
                                  + "</div>";
                      
                          }
                      
                          document.getElementById("smalllist").innerHTML = "";
                         
                      
                          for (var i = 0; i < listsmall.length; i++) {
                              var desc = listsmall[i].proposal_description;
                              document.getElementById("smalllist").innerHTML +=
                                  "<div class = 'redobudget'><p>" + desc + "</p><div class = 'like-button' id='"+listsmall[i].id+"' ></div>"
                                   + "</div>";
                      
                          }
                     });


                     eosinstance.getTableRows({
                        code: "propbudget11",
                        scope: "propbudget11",
                        table: "votestat",
                        limit: 50,
                        json: true
                      }).then((resp)=>{
                        budgetpropstart = resp;
                        console.log(budgetpropstart);
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

Template.budget_app.onRendered(async function () {
    
})
Template.budget_app.events({
    'click .like-button':function(){
        if(budgetpropstart.rows[0]==null||budgetpropstart.rows[0].status==false)
        {
          document.getElementsByClassName("like-button")[0].style.disable=true;
          alert("voting duration has ended");
        }
        else{
            document.getElementsByClassName("like-button")[0].style.display="block";
            var propid=event.target.id;
            var username = localStorage.getItem("username");
            eosinstance.contract('propbudget11').then(propbudget11 => {
                propbudget11.catgvote(propid,username, { authorization: username }).then((response) => {
                    if (response) {
                       alert("budget voting successfull");
                    } else {
                        alert("something went wrong!!!!");;
                    }
    
                });
    
            })
        }
       
    },
    'click .budgetpropbutton':function(){
         FlowRouter.go("/createbudget");
    }
});