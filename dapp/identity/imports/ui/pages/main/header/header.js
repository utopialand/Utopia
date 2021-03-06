import "./header.html";
import "./header.css";
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
var userdetail;
var scatter={};
let manager;
Template.header.onCreated(async function() {
      
    var username=localStorage.getItem("username");
    var connected= await ScatterJS.scatter.connect("utopia")
        if (!connected) {
          document.getElementById("scatter-not-installed").style.display = "block";
          return false;
        } else {
          if (ScatterJS.scatter.connect("utopia")) {
            scatter = ScatterJS.scatter;
            const requiredFields = { accounts: [network] };
            eos = scatter.eos(network, Eos, eosOptions);
            if (scatter.identity) {
            manager= await eos.getTableRows({
                code: "utpmanager11",
                scope: "utpmanager11",
                table: "manager111",
                limit: 50,
                json: true
              })
              await eos.getTableRows({
                code: "identityreg1",
                scope: "identityreg1",
                table: "identity3",
                limit: 50,
                json: true
              }).then((resp) => {
                userdetail = resp;
                
                var countman=0;
              for(var i=0;i<manager.length;i++){
                if(manager[i].user==username){
                  countman++;
                }
              }
              if(countman == 1){
                document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
                document.getElementById("managerText").style.display = "block";
                document.getElementById("len").style.display = "block";
                document.getElementById("coupon").style.display = "block";
                var s = document.getElementById("len").setAttribute("value", "manager");
                document.getElementById("proposal").style.display = "block";
              }else{
                var countuserid=0;
                for(var i=0;i<userdetail.rows.length;i++){
                  if(userdetail.rows[i].username==username){
                    countuserid++;
                  }
                }
                if(countuserid == 1){
                  
                  document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
                  document.getElementById("managerText").style.display = "none";
                  document.getElementById("len").style.display = "block";
                  document.getElementById("coupon").style.display = "block";
                  var s = document.getElementById("len").setAttribute("value", "userid");
                  document.getElementById("proposal").style.display = "block";
                }else{
                
                  document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
                  document.getElementById("managerText").style.display = "none";
                  var s = document.getElementById("len").setAttribute("value", "user");
                  document.getElementById("len").style.display = "none";
                  document.getElementById("coupon").style.display = "none";
                  document.getElementById("proposal").style.display = "none";
                }
              }
              });
            
            }
            else {
            
              FlowRouter.go("/");
              document.getElementsByClassName("identitySectionman")[0].style.display = "none";
            }
          }
        }
    
  
});


Template.header.events({
    "click .proposal": function(){
        FlowRouter.go("/proposal");
    },
    "click .logo": function(){
        FlowRouter.go("/");
    },
    "click .identityText": function(){
        FlowRouter.go("/identity");
    },
    "click .managerText": function(){
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
  "click":function (e) {
    if (!$menu.is(e.target) && $menu.has(e.target).length === 0) // ... nor a descendant of the container
    {
      if(e.target.nodeName == "INPUT"){
        if(e.target.id == "toggleinput"){
            document.getElementById("menu").style.display = "block";
          }else{
            document.getElementById("menu").style.display = "none";
          }
      }else{
        document.getElementById("menu").style.display = "none";
        document.getElementById("toggleinput").checked=false;
      }        
   }
  }
});
const $menu = $('.starter');