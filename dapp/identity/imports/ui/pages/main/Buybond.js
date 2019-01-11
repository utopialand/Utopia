import "./Buybond.html"
import "../../stylesheets/Buybond.css";
import { Template } from 'meteor/templating';
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
let tabledata ;
var scatter={};
var eosinstance = {};
Template.buybond.onCreated(function () {
  Meteor.subscribe('identity');
  ScatterJS.scatter.connect('utopia').then(async(connected) => {
      if (connected) {
          if (ScatterJS.scatter.connect('utopia')) {
              scatter = ScatterJS.scatter;
              const requiredFields = { accounts: [network] };
              const eos = scatter.eos(network, Eos, eosOptions);
              if (scatter.identity) {
                  eosinstance = eos;                  
                   await eosinstance.getTableRows({
                    code: "bondborrower",
                    scope: "bondborrower",
                    table: 'bonddetail33',
                    limit: 50,
                    json: true,
                }).then((resp)=>{
                    tabledata=resp;
            document.getElementById("bond-group").innerHTML = "";                     
            for (var i = 0; i < tabledata.rows.length; i++) {
                var bond = tabledata.rows[i].bond;
                var maturity = tabledata.rows[i].maturity;
                var couponrate = tabledata.rows[i].couponrate;
                var couponintervel = tabledata.rows[i].couponintervel;
                var facevalue = tabledata.rows[i].facevalue;
                var bondbutton = "bondbutton";
                bondbutton = bondbutton + tabledata.rows[i].id;
                document.getElementById("bond-group").innerHTML +=
                    "<div class = 'redobond'><div>" + bond + "</div><div>"+maturity+"</div><div>"+couponrate+"</div><div>"+couponintervel+"</div><div>"+facevalue+"</div><button class = 'buybond-button' id = '" + bondbutton + "' value='"+facevalue+"'>Buy</button>"
                     + "</div>";
        
            }
                });               
              } else {
                  FlowRouter.go("/");
              }
          }
      } else {
          console.log("scatter not installed")
      }
  });
});



Template.buybond.events({

    "click .buybond-button":async function (event) {
        event.preventDefault();
        var username=localStorage.getItem("username");
        var facevalue = event.target.value;
        var id=event.target.id;
        var bondid = parseFloat(id[id.length - 1]);       
        
      try{        
                let bondborrower = await eosinstance.contract('bondborrower');
                if(bondborrower)
                {
                  let result = await  bondborrower.buybond(username,bondid,facevalue, { authorization: username });
                     if(result){
                      alert("bond buy successfully !!");
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
   
})