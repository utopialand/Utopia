import "./Registered.html"
import "../../stylesheets/Registered.css";
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
Template.Reg_success.onCreated(function () {

  Meteor.subscribe('identity');
  ScatterJS.scatter.connect('utopia').then((connected) => {
      if (connected) {
          if (ScatterJS.scatter.connect('utopia')) {
              scatter = ScatterJS.scatter;
              const requiredFields = { accounts: [network] };
              const eos = scatter.eos(network, Eos, eosOptions);
              if (scatter.identity) {
                  eosinstance = eos;
              } else {
                  FlowRouter.go("/");
              }
          }
      } else {
          console.log("scatter not installed")
      }
  });
});


Template.Reg_success.events({
      "click .button":function(){
        var username= localStorage.getItem("username");
        eosinstance.contract('identityreg1').then(identityreg1 => {
          identityreg1.reqcitizen(username,{authorization:username}).then((response)=>{
              if(response){
                  console.log("hello--",response);
              }else{
                  alert("identity is not registered !!!!");;
              }
          });
        
        })
        FlowRouter.go("/citizenship");
      }
    })
