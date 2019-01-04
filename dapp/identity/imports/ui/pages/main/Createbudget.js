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
        var sym="UTP";
        var prop=$("#propname").val();
        var propdesc=$("#propdesc").val();
        var amount=`${parseFloat($("#propbudget").val()).toFixed(4)} ${sym}`
        var username=localStorage.getItem("username");
        var amount1 = $("#propbudget").val();
        var count =amount1.split(".").length - 1;
        console.log("count ====",count);
        console.log("amount1===",amount1)
        console.log("amount==>",amount);

        if((!prop)||(!propdesc)||(!amount))
        {
            alert("please fill all the entries !!");
        }
        else if((count>1) || (amount1.length==count)){
            alert("please fill correct amount !!");
        }
        else{
            try{
                let propbudget11 = await eosinstance.contract("propbudget11");
                if(propbudget11)
                {
                    let result = await propbudget11.createprop(username ,prop,propdesc,30,amount, { authorization: username });
                    if(result)
                    {
                        FlowRouter.go("/budget");
                    }
                    else{
                        alert("something went wrong!!!!");
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