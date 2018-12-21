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
                    console.log("loandata====>",propdata);  
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
    document.getElementById("loanpay-section").style.display="none";
    document.getElementById("paying").style.display="none";
    document.getElementById("managertask-section").style.display="none";
})
Template.lender.events({
    'click #user':function(){
        console.log("user");
        document.getElementById("apply-section").style.display="block";
        document.getElementById("loanpay-section").style.display="none";
        document.getElementById("paying").style.display="block";
        document.getElementById("manager").style.display="none";
        document.getElementById("managertask-section").style.display="none";
        document.getElementById("catgid").innerHTML ="";
        document.getElementById("colatoptn").innerHTML ="";
        for(var i=0;i<loandata.rows.length;i++){
            var desc=loandata.rows[i].desc;
            var catid=loandata.rows[i].category_id;
            document.getElementById("catgid").innerHTML += "<label>"+desc+"</label>"+
            "<input type='radio' checked='checked' name='radio' id='"+catid+"'>"
        }
        for(var i=0;i<colatdata.rows.length;i++){
            var desc=colatdata.rows[i].type;
            var catid=colatdata.rows[i].id;
            document.getElementById("colatoptn").innerHTML += "<label>"+desc+"</label>"+
            "<input type='checkbox' name='checkbox' id='"+catid+"'>"
        }
        for(var i=0;i<colatdata.rows.length;i++){
            var username = localStorage.getItem("username");
            if(colatdata.rows[i].owner == username){
                var propt_id=colatdata.rows[i].propt_id;
                var catid=colatdata.rows[i].price;
                document.getElementById("propid").innerHTML += "<label>"+catid+"</label>"+
                "<input type='checkbox' name='checkbox' id='"+propt_id+"'>"
            }
           
        }
    },
    'click #manager':function(){
        console.log("manager");
        document.getElementById("managertask-section").style.display="block";
        document.getElementById("apply-section").style.display="none";
        document.getElementById("loanpay-section").style.display="none";
    },
    'click #paying':function(){
        document.getElementById("apply-section").style.display="none";
        document.getElementById("managertask-section").style.display="none";
        document.getElementById("loanpay-section").style.display="block";
        document.getElementById("manager").style.display="block";
        document.getElementById("user").style.display="none";
    }
})