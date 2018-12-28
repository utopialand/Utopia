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
                
                } else {
                    FlowRouter.go("/");
                }
            }
        } else {
            console.log("scatter not installed")
        }
    });
})

Template.viewdetail.onRendered( function (){
document.getElementById("data").style.display="none"  ;
document.getElementById("list").style.display="none"  ;
document.getElementById("create-section").style.display="none";
document.getElementById("accept-section").style.display="none";
})
//approved113
Template.viewdetail.events({
    'click #manager':function(){
        console.log("manager");
        document.getElementById("data").style.display="none"  ;
        document.getElementById("list").style.display="none"  ;
        document.getElementById("create-section").style.display="block";
        document.getElementById("accept-section").style.display="none";
        document.getElementById("listofuser").style.display="none"  ;
        document.getElementById("listofstatus").style.display="none"  ;
    }, 
    'click #managerview':function(){
        console.log("manager view");
        document.getElementById("create-section").style.display="none";
        document.getElementById("accept-section").style.display="none";
        document.getElementById("data").style.display="none"  ;
        document.getElementById("list").style.display="flex"  ;
        document.getElementById("listofstatus").style.display="none"  ;
        document.getElementById("listofuser").style.display="flex"  ;
        document.getElementById("listofuser").innerHTML=""  ;

        for(var i=0;i<loandata.rows.length;i++){
                var borr = loandata.rows[i].borrower;
                var purpose=loandata.rows[i].purpose;
                var status=loandata.rows[i].status;
                var income=loandata.rows[i].incomepm;
                var loanamt=loandata.rows[i].loanamt;
                var idl=loandata.rows[i].reqloanid;
                console.log("pur---",purpose,"--stat--",status);
                if(status == "requested"){
                    document.getElementById("listofuser").innerHTML += "<div class='datalist'>"+
                    "<div class='headloan'>"+borr+"</div>"+
                    "<div class='headloan'>"+purpose+"</div>"+
                    "<div class='headloan'>"+income+"</div>"+
                    "<div class='headloan'>"+loanamt+"</div>"+
                    "<button class='buttonaction' id='"+idl+"'>approve</button>"+
                    "</div>";
                }else{
                    document.getElementById("listofuser").innerHTML += "<div class='datalist'>"+
                "<div class='headloan'>"+borr+"</div>"+
                "<div class='headloan'>"+purpose+"</div>"+
                "<div class='headloan'>"+income+"</div>"+
                "<div class='headloan'>"+loanamt+"</div>"+
                "<div class='headloan'>"+status+"<div></div>";
                }
                
        }
     },
    'click #acceptpay':function(){
        document.getElementById("create-section").style.display="none";
        document.getElementById("accept-section").style.display="block";
        document.getElementById("data").style.display="none"  ;
        document.getElementById("list").style.display="none"  ;
        document.getElementById("listofuser").style.display="none"  ;
        document.getElementById("listofstatus").style.display="none"  ;
    },
     'click #application':function(){
        document.getElementById("create-section").style.display="none";
        document.getElementById("accept-section").style.display="none";
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
     },
     'click #create':function(event){
        var username = localStorage.getItem("username");
        var rate = $("#rate").val();
        var period =parseInt( $("#period").val());
        var desc = $("#desc").val();
        eosinstance.contract("utplendercon").then(utplendercon => {
            utplendercon.addloancatg(username,desc,rate,period, { authorization: username }).then(response => {
                alert("success");
                console.log("response==>", response);
              });
          });
    },
    'click .buttonaction':function(){
        var username = localStorage.getItem("username");
        event.preventDefault();
        var id = event.target.id;
        id = id[id.length - 1];
        console.log("id---",id);
        eosinstance.contract("utplendercon").then(utplendercon => {
            utplendercon.approveloan(username,id, { authorization: username }).then(response => {
                alert("success");
                console.log("response==>", response);
              });
          });
    },
    'click #accept':function(){
        var username = localStorage.getItem("username");
        var id = $("#acceptid").val();
        eosinstance.contract("utplendercon").then(utplendercon => {
            utplendercon.paymentacpt(username,id, { authorization: username }).then(response => {
                alert("success");
                console.log("response==>", response);
              });
          });
    },
    'click #default':function(){
        var username = localStorage.getItem("username");
        var id = $("#acceptid").val();
        eosinstance.contract("utplendercon").then(utplendercon => {
            utplendercon.checkdefault(username,id, { authorization: username }).then(response => {
                eosinstance.getTableRows({
                    code: "utplendercon",
                    scope: "utplendercon",
                    table: 'approved112',
                    limit: 50,
                    json: true,
                }).then((resp)=>{
                    console.log("loandata====>",resp);  
                    for(var i=0;i<resp.rows.length;i++){
                        if(resp.rows[i].reqloanid == id){
                            if(resp.rows[i].status == "due"){
                                alert("there is a time in payment");
                            }else if(resp.rows[i].status == "complete"){
                                alert("payment complete");
                            }else if(resp.rows[i].status == "complete in auction"){
                                alert("payment complete by auction");
                            }else if(resp.rows[i].status == "complete, defaulter "){
                                alert("payment complete as defaulter");
                            }else{
                                alert("defaulter");
                            }
                        }
                    }
                });
              });
          });
    },
    'click #auction':function(){
        var username = localStorage.getItem("username");
        var id = $("#acceptid").val();
        eosinstance.contract("utplendercon").then(utplendercon => {
            utplendercon.checkauction(username,id, { authorization: username }).then(response => {
                eosinstance.getTableRows({
                    code: "utplendercon",
                    scope: "utplendercon",
                    table: 'approved112',
                    limit: 50,
                    json: true,
                }).then((resp)=>{
                    console.log("loandata====>",resp);  
                    for(var i=0;i<resp.rows.length;i++){
                        if(resp.rows[i].reqloanid == id){
                            if(resp.rows[i].status == "auction called"){
                                alert("your property is handover to manager for bidding");
                            }else{
                                alert("time remain in auction action");
                            }
                        }
                    }
                });
              });
          });
    } 
})