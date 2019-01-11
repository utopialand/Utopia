import "./newproposal.html";
import "./newproposal.css";
import { Template } from "meteor/templating";
import ScatterJS from "scatterjs-core";
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
  
var eosinstance;
var count = 1;
Template.App_newproposal.onCreated(async function () {
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
Template.App_newproposal.events({
    "click #addprop": function () {
        var options = "";
        var parent = document.getElementById("propnum")
        var field = document.createElement("input")
        field.type = "text"
        field.placeholder=options;
        field.id = "textbox" + count;
        parent.appendChild(field);
        count += 1;     
    },
    "click #finalsubmit":async function(){
        var data=[];
        for(var i=0;i<count;i++){
        var item=$("#textbox"+i).val();
        data.push(item);
        }
        var prop=$("#propname").val();
        var propdesc=$("#propdesc").val();
        var numwin=parseInt($("#numwin").val());
        var username=localStorage.getItem("username");
        if((!prop)||(!propdesc)||(!numwin)||(!data))
        {
          alert("please fill all the fields");
        }
        else{
          try{        
                    let voteproposal = await eosinstance.contract('voteproposal');
                    if(voteproposal)
                    {
                      let result = await  voteproposal.createprop(prop ,propdesc,30,data,username,numwin, { authorization: username });
                         if(result){
                          alert("proposal creation successfully !!");
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