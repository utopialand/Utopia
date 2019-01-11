import "./Createbond.html";
import "./Createbond.css";
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
Template.bond.onCreated(async function () {
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
Template.bond.events({
    "click #submitbond":async function(){
        var sym="UTP";
        var bondname=$("#bondname").val();
        var maturity=parseInt($("#maturity").val());
        var couponrate=parseFloat($("#couponrate").val());
        var couponintervel=parseInt($("#couponintervel").val());
        var facevalue=`${parseFloat($("#facevalue").val()).toFixed(4)} ${sym}`
        var username=localStorage.getItem("username")
        
        if((!bondname)||(!maturity)||(!couponrate)||(!couponintervel)||(!facevalue))
    {
      alert("please fill all the fields");
    }
    else{
      try{
        if(maturity > 30){
            alert("maturity period exited (maximum 30 years)");
        }else{
            if(couponintervel==6 || couponintervel==12){
                let bondborrower = await eosinstance.contract('bondborrower');
                if(bondborrower)
                {
                  let result = await  bondborrower.addbond(username ,bondname,maturity,couponrate,couponintervel,facevalue, { authorization: username });
                     if(result){
                      alert("bond added successfully !!");
                    }else{
                      alert("Something went wrong");
                   }
                }
            }else{
                alert("coupon intervel can be 6 months or 12 months");
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