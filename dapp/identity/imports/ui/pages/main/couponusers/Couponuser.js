import "./Couponuser.html";
import "./Couponuser.css";
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
let manager;
var couponid;
Template.couponlist.onCreated(async function() {
    var bondid = FlowRouter.current().params.id; 
    var username=localStorage.getItem("username");
    var connected= await ScatterJS.scatter.connect("utopia")
        if (!connected) {
          return false;
        } else {
          if (ScatterJS.scatter.connect("utopia")) {
            scatter = ScatterJS.scatter;
            const requiredFields = { accounts: [network] };
            var username = localStorage.getItem("username"); 
            eos = scatter.eos(network, Eos, eosOptions);
            if (scatter.identity) {
            var bonddata = await eos.getTableRows({
                    code: "bondborrower",
                    scope: "bondborrower",
                    table: 'bonddetail44',
                    limit: 50,
                    json: true,
                });
                  document.getElementsByClassName("waitingcoup")[0].style.display = "none";
                  for (var i = 0; i < bonddata.rows.length; i++) {
                    if(bonddata.rows[i].id == bondid){
                      couponid=bondid;
                      for(var j=0; j<bonddata.rows[i].bondholders.length; j++){
                        var bondholder = bonddata.rows[i].bondholders[j];  
                        var buyerdata =  await eos.getTableRows({
                            code: "bondborrower",
                            scope: bondholder,
                            table: "buyerdata44",
                            limit: 50,
                            json: true
                          });
                        console.log(bondholder,"90",bonddata)
                        for(var k=0;k<buyerdata.rows.length;k++){
                          if(buyerdata.rows[k].id==couponid){
                              
                            var datearr = buyerdata.rows[k].returningdate.length-1;
                            document.getElementsByClassName("coupondata")[0].innerHTML +="<div class='mainheadcoup'>"+buyerdata.rows[k].bond+"</div><div class='mainheadcoup'>"+buyerdata.rows[k].bondbuyer+"</div><div class='mainheadcoup'>"+buyerdata.rows[k].payamount+"</div><div class='mainheadcoup'>status -> "+datearr+" coupon are submitted</div>";   
                          }
                        }    
                      }
                    }      
                }
            }
           
          }
        }
    
  
});


