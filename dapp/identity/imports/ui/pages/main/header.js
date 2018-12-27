import "./header.html";
import "../../stylesheets/header.css";
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

var eosinstance = {};
var userdetail;
var manager=["propbudget11","identityreg1"];
Template.header.onCreated(function() {
    console.log("onCreated");
  ScatterJS.scatter.connect("utopia").then(async connected => {
    if (connected) {
      if (ScatterJS.scatter.connect("utopia")) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        if (scatter.identity) {
          eosinstance = eos;
          eosinstance.getTableRows({
            code: "identityreg1",
            scope: "identityreg1",
            table: "identity3",
            limit: 50,
            json: true
          }).then((resp)=>{
           userdetail=resp;
           console.log("user---",userdetail);
          });
          localStorage.setItem("manager", manager);
        } else {
          FlowRouter.go("/");
        }
      }
    } else {
      console.log("scatter not installed");
    }
  });
});

Template.header.events({
    "click .proposal": function(){
        console.log("proposal link was clicked");
        FlowRouter.go("/proposal");
    },
    "click .logo": function(){
        console.log("logo was clikced");
        FlowRouter.go("/");
    },
    "click .identityText": function(){
        console.log("identity text was clicked");
        FlowRouter.go("/identity");
    },
    "click .managerText": function(){
        console.log("manager");
        FlowRouter.go("/manager");
    },
    "click .business-link": function(){
        FlowRouter.go("/business");
    },
    "click .real-estate-link": function(){
      FlowRouter.go("/realestate");

    },
    "click .loanText": function(){
        console.log("loan",localStorage.getItem("username"));
        var nameuser=localStorage.getItem("username");
        for (var i=0;i<userdetail.rows.length;i++)
        {
          console.log(userdetail.rows[i].username ,"----",nameuser);
            if(userdetail.rows[i].username == nameuser)
            {
              console.log("enter");
              FlowRouter.go("/lender");
              break;
            }else if(nameuser == manager[0] || nameuser == manager[1]){
              console.log("enter man");
              FlowRouter.go("/viewdetail");
              break;
            } else{
              console.log("enter else");
              FlowRouter.go("/");
            } 
        }
       

    }
});