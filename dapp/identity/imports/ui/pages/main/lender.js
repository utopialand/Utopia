import './lender.html'
import '../../stylesheets/lender.css'
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
let loandata ;
let colatdata ;
let propdata;
var propid=[];
var eosinstance;
Template.lender.onCreated( function (){
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
                      table: 'loancatg113',
                      limit: 50,
                      json: true,
                  }).then((resp)=>{
                      loandata=resp;
                      console.log("loandata====>",loandata);  
                  });       
                  eosinstance.getTableRows({
                    code: "utplendercon",
                    scope: "utplendercon",
                    table: 'collat111',
                    limit: 50,
                    json: true,
                }).then((resp)=>{
                    colatdata=resp;
                    console.log("loandata====>",colatdata);  
                });   
                eosinstance.getTableRows({
                    code: "realstateutp",
                    scope: "realstateutp",
                    table: 'properties',
                    limit: 50,
                    json: true,
                }).then((resp)=>{
                    propdata=resp;
                    console.log("realstate====>",propdata);  
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
Template.lender.onRendered( function (){
    document.getElementById("apply-section").style.display="none";
    document.getElementById("create-section").style.display="none";
    document.getElementById("loanpay-section").style.display="none";
    document.getElementById("manager-section").style.display="none";
    document.getElementById("accept-section").style.display="none";
    document.getElementById("acceptpay").style.display="none";
    document.getElementById("mantask").style.display="none";
    document.getElementById("paying").style.display="none";
})
Template.lender.events({
    'click #user':function(){
        console.log("user");
        document.getElementById("apply-section").style.display="block";
        document.getElementById("create-section").style.display="none";
        document.getElementById("loanpay-section").style.display="none";
        document.getElementById("manager-section").style.display="none";
        document.getElementById("accept-section").style.display="none";
        document.getElementById("acceptpay").style.display="none";
        document.getElementById("mantask").style.display="none";
        document.getElementById("paying").style.display="block";
        document.getElementById("manager").style.display="none";
        document.getElementById("catgid").innerHTML ="";
        document.getElementById("colatoptn").innerHTML ="";
        for(var i=0;i<loandata.rows.length;i++){
            var desc=loandata.rows[i].desc;
            var catid=loandata.rows[i].category_id;
            document.getElementById("catgid").innerHTML += "<label>"+desc+"</label>"+
            "<input type='radio' class ='catgidoptn' name='radio' value='"+catid+"'>"
        }
        for(var i=0;i<colatdata.rows.length;i++){
            var desc=colatdata.rows[i].type;
            var catid=colatdata.rows[i].id;
            document.getElementById("colatoptn").innerHTML += "<label>"+desc+"</label>"+
            "<input type='checkbox' class ='colatidoptn' name='checkbox' value='"+catid+"'>"
        }
        for(var i=0;i<propdata.rows.length;i++){
            var username = localStorage.getItem("username");
            if(propdata.rows[i].owner == username){
                var propt_id=propdata.rows[i].propt_id;
                var catid=propdata.rows[i].price;
                document.getElementById("propid").innerHTML += "<label>"+catid+"</label>"+
                "<input type='checkbox' class='propidoptn' name='checkbox' value='"+propt_id+"'>"
            }
           
        }
    },
    'click #manager':function(){
        console.log("manager");
        document.getElementById("apply-section").style.display="none";
        document.getElementById("create-section").style.display="block";
        document.getElementById("loanpay-section").style.display="none";
        document.getElementById("accept-section").style.display="none";
        document.getElementById("mantask").style.display="block";
        document.getElementById("acceptpay").style.display="block";
        document.getElementById("manager-section").style.display="none";
        document.getElementById("user").style.display="none";
        document.getElementById("paying").style.display="none";
    },
    'click #paying':function(){
        document.getElementById("apply-section").style.display="none";
        document.getElementById("acceptpay").style.display="none";
        document.getElementById("create-section").style.display="none";
        document.getElementById("loanpay-section").style.display="block";
        document.getElementById("accept-section").style.display="none";
        document.getElementById("user").style.display="none";
        document.getElementById("manager").style.display="block";
        document.getElementById("manager-section").style.display="none";
        document.getElementById("mantask").style.display="none";
    },
    'click #mantask':function(){

        document.getElementById("apply-section").style.display="none";
        document.getElementById("create-section").style.display="none";
        document.getElementById("loanpay-section").style.display="none";
        document.getElementById("mantask").style.display="block";
        document.getElementById("accept-section").style.display="none";
        document.getElementById("manager-section").style.display="block";
        document.getElementById("user").style.display="none";
        document.getElementById("paying").style.display="none";
    },
    'click #acceptpay':function(){
        document.getElementById("apply-section").style.display="none";
        document.getElementById("create-section").style.display="none";
        document.getElementById("loanpay-section").style.display="none";
        document.getElementById("mantask").style.display="block";
        document.getElementById("accept-section").style.display="block";
        document.getElementById("manager-section").style.display="none";
        document.getElementById("user").style.display="none";
        document.getElementById("paying").style.display="none";
    },
    'click #apply':function(event){
        var sym="UTP";
        var username = localStorage.getItem("username");
        var id = parseInt($( ".catgidoptn:checked" ).val());
        var amt =`${parseFloat($("#amt").val()).toFixed(4)} ${sym}`;
        var purpose = $("#purpose").val();
        propid.push(parseInt($(".propidoptn:checked").val()));
        var income = `${parseFloat($("#income").val()).toFixed(4)} ${sym}`;
        var colatoptn = parseInt($(".colatidoptn:checked").val());
        eosinstance.contract("utplendercon").then(utplendercon => {
            console.log("amt----",amt,"catid---",id,"pur---",purpose,"propid---",propid,"income--",income,"colat--",colatoptn);
            utplendercon.reqloancolat(username,id,amt,purpose,propid,income,colatoptn, { authorization: username }).then(response => {
              alert("success");
              console.log("response==>", response);
            });
        });
    },
    'click #pay':function(){
        var sym="UTP";
        var username = localStorage.getItem("username");
        var id = $("#idloan").val();
        var amt =`${parseFloat($("#loanamt").val()).toFixed(4)} ${sym}`;
        eosinstance.contract("utplendercon").then(utplendercon => {
            utplendercon.loanpayment(username,id,amt, { authorization: username }).then(response => {
                alert("success");
                console.log("response==>", response);
              });
          });
    },
    'click #create':function(){
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
    'click #approve':function(){
        var username = localStorage.getItem("username");
        var id = $("#manloanid").val();
        var borr = $("#borr").val();
        eosinstance.contract("utplendercon").then(utplendercon => {
            utplendercon.approveloan(username,id,borr, { authorization: username }).then(response => {
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
        var id = $("#manloanid").val();
        var borr = $("#borr").val();
        eosinstance.contract("utplendercon").then(utplendercon => {
            utplendercon.checkdefault(username,id,borr, { authorization: username }).then(response => {
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
        var id = $("#manloanid").val();
        var borr = $("#borr").val();
        eosinstance.contract("utplendercon").then(utplendercon => {
            utplendercon.checkauction(username,id,borr, { authorization: username }).then(response => {
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