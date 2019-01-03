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
var manager=["propbudget11","identityreg1","realstateutp"];
var userdetail;
var scatter={};
Template.header.onCreated(function() {
    console.log("onCreated");
    var username=localStorage.getItem("username");
    console.log("wlcm---",username);
  ScatterJS.scatter.connect("utopia").then(async connected => {
    if (connected) {
      console.log("connect")
      if (ScatterJS.scatter.connect("utopia")) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
          if (scatter.identity) {
            console.log("iden");
            eos.getTableRows({
              code: "identityreg1",
              scope: "identityreg1",
              table: "identity3",
              limit: 50,
              json: true
            }).then((resp) => {
              userdetail = resp;
              console.log("user---", userdetail);
              if(username ==manager[0] || username ==manager[1] || username== manager[2]){
                document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
                  document.getElementById("managerText").style.display = "block";
                  document.getElementById("len").style.display = "block";
                  document.getElementById("len").setAttribute("value", "manager");
              }else{
                console.log("else");
                var count=0;
                for(var i=0;i<userdetail.rows.length;i++){
                  if(userdetail.rows[i].username==username){
                    count++;
                    break;
                  }
                }
                if(count==1){
                  console.log("else1");
                  document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
                  document.getElementById("managerText").style.display = "none";
                  document.getElementById("len").style.display = "block";
                  var s = document.getElementById("len").setAttribute("value", "userid");
                }else{
                  console.log("else2");
                  document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
                  document.getElementById("managerText").style.display = "none";
                  var s = document.getElementById("len").setAttribute("value", "user");
                  document.getElementById("len").style.display = "none";
                }
                  }  
            });
          
          } else {
            console.log("idennot")
            FlowRouter.go("/");
            document.getElementsByClassName("identitySectionman")[0].style.display = "none";
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
      var val=document.getElementById("len").getAttribute("value");
        console.log( document.getElementById("len").getAttribute("value"),"loan",localStorage.getItem("username"));
            if(val=="userid")
            {
              console.log("enter");
              FlowRouter.go("/lender");
            }else if(val =="manager"){
              console.log("enter man");
              FlowRouter.go("/viewdetail");
            }       

    },
    "click .coupon": function(){
      var val=document.getElementById("len").getAttribute("value");
    console.log( document.getElementById("len").getAttribute("value"),"loan",localStorage.getItem("username"));
        if(val=="userid")
        {
          console.log("enter");
          FlowRouter.go("/buybond");
        }else if(val =="manager"){
          console.log("enter man");
          FlowRouter.go("/createbond");
        }      


    },
});