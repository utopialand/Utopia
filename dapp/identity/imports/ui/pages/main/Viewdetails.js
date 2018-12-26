import './Viewdetails.html'
import '../../stylesheets/Viewdetails.css'
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
var loandata ;
var appdata;
var eosinstance;
Template.viewdetail.onCreated( function (){
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                if (scatter.identity) {
                    eosinstance = eos;                  
                     eosinstance.getTableRows({
                      code: "utplendercon",
                      scope: "utplendercon",
                      table: 'reqloan113',
                      limit: 50,
                      json: true,
                  }).then((resp)=>{
                      loandata=resp;
                      console.log("details====>",loandata);  
                  });     
                  eosinstance.getTableRows({
                    code: "utplendercon",
                    scope: "utplendercon",
                    table: 'approved113',
                    limit: 50,
                    json: true,
                }).then((resp)=>{
                    appdata=resp;
                    console.log("details====>",appdata);  
                });  
                document.getElementById("data").style.display="none"  ;
                document.getElementById("list").style.display="none"  ;
                document.getElementById("application").style.display="none"  ;
                } else {
                    FlowRouter.go("/");
                }
            }
        } else {
            console.log("scatter not installed")
        }
    });
})
//approved113
Template.viewdetail.events({
    'click #userview':function(){
       console.log("user view",loandata);
       var username = localStorage.getItem("username");
       for(var i=0;i<loandata.rows.length;i++){
        if(loandata.rows[i].borrower == username){
            console.log("enter user");
            if(loandata.rows[i].status == "requested"){
                var borr = loandata.rows[i].borrower;
                var purpose=loandata.rows[i].purpose;
                var status=loandata.rows[i].status;
                var income=loandata.rows[i].incomepm;
                var loanamt=loandata.rows[i].loanamt;
                document.getElementById("data").style.display="none"  ;
                document.getElementById("list").style.display="flex"  ;
                document.getElementById("listofuser").innerHTML += "<div class='datalist'>"+
                "<div class='headloan'>"+borr+"</div>"+
                "<div class='headloan'>"+purpose+"</div>"+
                "<div class='headloan'>"+income+"</div>"+
                "<div class='headloan'>"+loanamt+"</div>"+
                "<div class='headloan'>"+status+"<div></div>";
            }else{
                for(var i=0;i<appdata.rows.length;i++){
                    console.log("enter user",appdata.rows[i].borrower );
                    if(appdata.rows[i].borrower == username){
                        console.log("enter user");
                            
                            var amnt=appdata.rows[i].amtapproved;
                            var finaldue=appdata.rows[i].finalduedt*1000;
                            var date = new Date(parseInt(finaldue));
                            var finaldate = date.toUTCString('MM/dd/yy  HH:mm:ss');
                            var totaldue=appdata.rows[i].totaldue;
                            document.getElementById("list").style.display="none"  ;
                            document.getElementById("data").style.display="flex"  ;
                            document.getElementById("listof status").innerHTML += "<div class='datalist2'><div class='headloan'>"+amnt+"</div>"+
                    "<div class='headloan'>"+totaldue+"</div>"+
                    "<div class='headloan'>"+finaldate+"</div></div>"
                    }
                }
            }
           
        }
    }
    },
    'click #managerview':function(){
        console.log("manager view");
        document.getElementById("data").style.display="none"  ;
        document.getElementById("list").style.display="flex"  ;
        document.getElementById("userview").style.display="none"  ;
        document.getElementById("listofstatus").style.display="none"  ;
        document.getElementById("listofuser").style.display="flex"  ;
        document.getElementById("listofuser").innerHTML=""  ;
        document.getElementById("application").style.display="block"  ;
        for(var i=0;i<loandata.rows.length;i++){
                var borr = loandata.rows[i].borrower;
                var purpose=loandata.rows[i].purpose;
                var status=loandata.rows[i].status;
                var income=loandata.rows[i].incomepm;
                var loanamt=loandata.rows[i].loanamt;
                console.log("pur---",purpose,"--stat--",status);
                document.getElementById("listofuser").innerHTML += "<div class='datalist'>"+
                "<div class='headloan'>"+borr+"</div>"+
                "<div class='headloan'>"+purpose+"</div>"+
                "<div class='headloan'>"+income+"</div>"+
                "<div class='headloan'>"+loanamt+"</div>"+
                "<div class='headloan'>"+status+"<div></div>";
        }
     },
     'click #application':function(){
        for(var i=0;i<appdata.rows.length;i++){
                           
                    var amnt=appdata.rows[i].amtapproved;
                    console.log("enter user",amnt);     
                    var finaldue=appdata.rows[i].finalduedt*1000;
                    var date = new Date(parseInt(finaldue));
                    var finaldate = date.toUTCString('MM/dd/yy  HH:mm:ss');
                    var totaldue=appdata.rows[i].totaldue;
                    document.getElementById("list").style.display="none"  ;
                    document.getElementById("data").style.display="flex"  ;
                    document.getElementById("listofstatus").innerHTML=""  ;
                    document.getElementById("listofstatus").style.display="flex"  ;
                    document.getElementById("listofuser").style.display="none"  ;
                    document.getElementById("listofstatus").innerHTML += 
                    "<div class='datalist2'><div class='headloan'>"+amnt+"</div>"+
                    "<div class='headloan'>"+totaldue+"</div>"+
                    "<div class='headloan'>"+finaldate+"</div></div>";
        }
     }
})