import "./welcomePage.html";
import "../../stylesheets/utopiaIdentity.css";
import "../../pages/main/header.js";
import "../../pages/main/footer.js"
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



eosConfig = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
    keyProvider: ['5KeNdWYxPbUpsLUa8QT64AbjTAQeHcZejcR6shHnNi1sESgxgm7'],
    // WIF string or array of keys..
    httpEndpoint: 'https://jungle2.cryptolions.io:443',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
}
eos = Eos(eosConfig)
Template.welcomePage.onCreated(function bodyOnCreated() {
    
        ScatterJS.scatter.connect('utopia').then((connected) => {
            if (connected) {
                if (ScatterJS.scatter.connect('utopia')) {
                    scatter = ScatterJS.scatter;
                    const requiredFields = { accounts: [network] };
                    const eos = scatter.eos(network, Eos, eosOptions);
                    if (scatter.identity) {
                        const acc = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                        const account = acc.name;
                        localStorage.setItem("loginstatus",JSON.stringify(true)); 
                        localStorage.setItem("username",account);                       
                        console.log("inside created----1",localStorage.getItem("loginstatus"));
                        document.getElementById("loginButton").innerHTML = "logout";
                        document.getElementsByClassName("optionFlex")[0].style.display="flex";

                    } else {
                        localStorage.setItem("loginstatus",JSON.stringify(false));
                        localStorage.setItem("username","");
                        console.log("inside created----2",localStorage.getItem("loginstatus"));
                        document.getElementById("loginButton").innerHTML = "login";
                        document.getElementsByClassName("optionFlex")[0].style.display="none";
                    }
                }
            } else {
                console.log("scatter not installed")
            }
        })
   
  });
 
Template.welcomePage.events({
    "click .optionText1": function() {
        FlowRouter.go("/identity-reg",{data:"scatter"});
      },
    'click .scatterloginlogout': function( event, instance ){
    if (!JSON.parse(localStorage.getItem("loginstatus"))) {
        ScatterJS.scatter.connect('utopia').then(connected => {
            if (!connected) return false;
            scatter = ScatterJS.scatter;
            const requiredFields = { accounts: [network] };
            const eos = scatter.eos(network, Eos, eosOptions);
            scatter.getIdentity(requiredFields).then(() => {
                const acc = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                const account = acc.name
                localStorage.setItem("username",account);
                console.log("inlogin");
                localStorage.setItem("loginstatus",JSON.stringify(true));
                localStorage.setItem("username",account);
                document.getElementById("loginButton").innerHTML = "logout";
                document.getElementsByClassName("optionFlex")[0].style.display="flex";
            }).catch(error => {
                console.error(error);
            });
        });
    } else {
        console.log("2-----------------")
        ScatterJS.scatter.forgetIdentity().then(() => {
            localStorage.setItem("loginstatus",JSON.stringify(false));
            console.log("----",localStorage.getItem("loginstatus"));
            document.getElementById("loginButton").innerHTML = "login";
            localStorage.setItem("username","");
            console.log("logout");
            document.getElementsByClassName("optionFlex")[0].style.display="none";
        });
    }
    },
})

Template.welcomePage.events({
      "click .optionText2":function(){
        var username= localStorage.getItem("username");
        eos.contract('identityreg1').then(identityreg1 => {
          identityreg1.reqcitizen(username,{authorization:username}).then((response)=>{
              if(response){
                  console.log("hello--",response);
              }else{
                  alert("identity is not registered !!!!");;
              }
          });
        
        })
        FlowRouter.go("/citizenship",{eosinstance :scatter});
      }
    })
