import "./Createbudget.html";
import "../../stylesheets/Createbudget.css";
import "./footer.js";
import { Template } from "meteor/templating";
import ScatterJS from "scatterjs-core";
import Eos from "eosjs";
import "../../pages/main/Budget.js"

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
  
var eosinstance;
var count = 1;
Template.Budget_newproposal.onCreated(async function () {
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                eosinstance=eos;
            }
        }
    });
})
Template.Budget_newproposal.events({
    "click #finalsubmit":async function(){
        var sym="EOS";
        var prop=$("#propname").val();
        var propdesc=$("#propdesc").val();
        var amount=`${parseFloat($("#propbudget").val()).toFixed(4)} ${sym}`
        var username=localStorage.getItem("username")
        if((!prop)||(!propdesc)||(!amount))
        {
          alert("please fill all the fields");
        }
        else{
          try{           
                    let propbudget = await eosinstance.contract('propbudget11');
                    if(propbudget)
                    {
                      let result = await  propbudget.createprop(username ,prop,propdesc,30,amount, { authorization: username });
                         if(result){
                          alert("proposal creation successfully !!");
                          FlowRouter.go("/budget");
                        }else{
                          alert("Something went wrong");
                       }
                    }   
          }
          catch(err){
            var parseResponse = await JSON.parse(err);
            var msg = await parseResponse.error.details[0].message.split(":")[1]
            alert(msg);
          }
        }  
    }
})