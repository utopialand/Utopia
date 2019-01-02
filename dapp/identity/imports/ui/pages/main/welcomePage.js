import "./welcomePage.html";
import "../../stylesheets/utopiaIdentity.css";
import "./header";
import "./footer";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import Eos from "eosjs";
ScatterJS.plugins(new ScatterEOS());
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
let eos = {};
var userdetail;
var manager=["propbudget11","identityreg1","realstateutp"];
Template.welcomePage.onCreated(function bodyOnCreated() {
  ScatterJS.scatter.connect("utopia").then(connected => {
    if (connected) {
      if (ScatterJS.scatter.connect("utopia")) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
         eos = scatter.eos(network, Eos, eosOptions);
        if (scatter.identity) {
          eos.getTableRows({
            code: "identityreg1",
            scope: "identityreg1",
            table: "identity3",
            limit: 50,
            json: true
          }).then((resp)=>{
           userdetail=resp;
           console.log("user---",userdetail);
          });
          var username=localStorage.getItem("username");
          console.log("wlcm---",username);
          if(username ==manager[0] || username ==manager[1] || username== manager[2]){
            console.log("1");
            document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
            document.getElementById("managerText").style.display = "block";
            var s = document.getElementById("len").setAttribute("value","manager");
          }else{
            console.log("2");
            document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
            document.getElementById("managerText").style.display = "none";
            var s = document.getElementById("len").setAttribute("value","userid");
               }  
          document.getElementById("loginButton").innerHTML = "logout";
          document.getElementsByClassName("optionFlex")[0].style.display =
            "flex";
        } else {
          document.getElementsByClassName("identitySectionman")[0].style.display = "none";
          document.getElementById("loginButton").innerHTML = "login";
          document.getElementsByClassName("optionFlex")[0].style.display ="none";
          
        }
      }
    } else {
      console.log("scatter not installed");
    }
  });
});

Template.welcomePage.events({
  "click .optionText1": function() {
    FlowRouter.go("/identity-reg");
  },
  "click .scatterloginlogout": function(event, instance) {
    if (!JSON.parse(localStorage.getItem("loginstatus"))) {
      ScatterJS.scatter.connect("utopia").then(connected => {
        if (!connected) return false;
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        scatter
          .getIdentity(requiredFields)
          .then(() => {
            const acc = scatter.identity.accounts.find(
              x => x.blockchain === "eos"
            );
            const account = acc.name;
            localStorage.setItem("username", account);
            console.log("inlogin");
            localStorage.setItem("loginstatus", JSON.stringify(true));
            document.getElementById("loginButton").innerHTML = "logout";
            document.getElementsByClassName("optionFlex")[0].style.display =
              "flex";
              if(account ==manager[0] || account ==manager[1] || account == manager[2]){
                console.log("1");
                document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
                document.getElementById("managerText").style.display = "block";
                document.getElementById("len").setAttribute("value","manager");
              }else{
                console.log("2");
                document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
                document.getElementById("managerText").style.display = "none";
                document.getElementById("len").setAttribute("value","userid");
                   }  
          })
          .catch(error => {
            console.error(error);
          });
      });
    } else {
      console.log("2-----------------");
      ScatterJS.scatter.forgetIdentity().then(() => {
        localStorage.setItem("loginstatus", JSON.stringify(false));
        console.log("----", localStorage.getItem("loginstatus"));
        document.getElementById("loginButton").innerHTML = "login";
        localStorage.setItem("username", "");
        console.log("logout");
        document.getElementsByClassName("optionFlex")[0].style.display = "none";
        document.getElementsByClassName("identitySectionman")[0].style.display = "none";
      });
    }
  }
});

Template.welcomePage.events({
  "click .optionText2": function() {
    var username = localStorage.getItem("username");
    eos.contract("identityreg1").then(identityregres => {
      identityregres
        .reqcitizen(username, { authorization: username })
        .then(response => {
          if (response) {
            console.log("hello--", response);
            FlowRouter.go("/citizenship");
          } else {
            alert("identity is not registered !!!!");
          }
        });
    });
  }
});
