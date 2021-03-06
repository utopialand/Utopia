import "./Buybond.html"
import "./Buybond.css";
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
Template.buybond.onCreated(async function () {
var connected=await ScatterJS.scatter.connect('utopia')
      if (connected) {
          if (ScatterJS.scatter.connect('utopia')) {
              scatter = ScatterJS.scatter;
              const requiredFields = { accounts: [network] };
              const eos = scatter.eos(network, Eos, eosOptions);
              if (scatter.identity) {
                  eosinstance = eos;                  
                tabledata=  await eosinstance.getTableRows({
                    code: "bondborrower",
                    scope: "bondborrower",
                    table: 'bonddetail44',
                    limit: 50,
                    json: true,
                })
                document.getElementsByClassName("waitingbond")[0].style.display = "none";
                document.getElementById("bond-group").innerHTML = "";                     
                for (var i = 0; i < tabledata.rows.length; i++) {
                    var maturity;
                    var bond = tabledata.rows[i].bond;
                    var couponrate = tabledata.rows[i].couponrate;
                    var couponintervel = tabledata.rows[i].couponintervel;
                    if(couponintervel == 6){
                         maturity = tabledata.rows[i].maturitycount/2;
                    }else{
                        maturity = tabledata.rows[i].maturitycount;
                    }
                    var facevalue = tabledata.rows[i].facevalue;
                    var bondbutton = "bondbutton";
                    bondbutton = bondbutton + tabledata.rows[i].id;
                    document.getElementById("bond-group").innerHTML +=
                        "<div class = 'redobond'><div>" + bond + "</div><div>"+maturity+"</div><div>"+couponrate+"</div><div>"+couponintervel+"</div><div>"+facevalue+"</div><button class = 'buybond-button' id = '" + bondbutton + "' value='"+facevalue+"'>Buy</button>"
                         + "</div>";
            
                }               
              } else {
                  FlowRouter.go("/");
              }
          }
      } else {
          console.log("scatter not installed")
      }
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
