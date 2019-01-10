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
    ScatterJS.scatter.connect('utopia').then(async connected => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                if (scatter.identity) {
                    eosinstance = eos;                  
                    loandata = await eosinstance.getTableRows({
                      code: "utplendercon",
                      scope: "utplendercon",
                      table: 'reqloan113',
                      limit: 50,
                      json: true,
                  });  
                  console.log("loandata",loandata);   
                  appdata = await eosinstance.getTableRows({
                    code: "utplendercon",
                    scope: "utplendercon",
                    table: 'approved114',
                    limit: 50,
                    json: true,
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
document.getElementById("create-section").style.display="block";
document.getElementById("manager").style.background="gray";
document.getElementById("managerview").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
document.getElementById("acceptpay").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
document.getElementById("application").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
document.getElementById("accept-section").style.display="none";
})
//approved113
Template.viewdetail.events({
    'click #manager':function(){
        console.log("manager");
        document.getElementById("data").style.display="none"  ;
        document.getElementById("list").style.display="none"  ;
        document.getElementById("create-section").style.display="block";
        document.getElementById("manager").style.background="gray";
        document.getElementById("managerview").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
        document.getElementById("acceptpay").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
        document.getElementById("application").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
        document.getElementById("accept-section").style.display="none";
        document.getElementById("listofuser").style.display="none"  ;
        document.getElementById("listofstatus").style.display="none"  ;
    }, 
    'click #managerview':function(){
        console.log("manager view");
        document.getElementById("managerview").style.background="gray";
        document.getElementById("manager").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
        document.getElementById("acceptpay").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
        document.getElementById("application").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
        document.getElementById("create-section").style.display="none";
        document.getElementById("accept-section").style.display="none";
        document.getElementById("data").style.display="none"  ;
        document.getElementById("list").style.display="flex"  ;
        document.getElementById("listofstatus").style.display="none"  ;
        document.getElementById("listofuser").style.display="flex"  ;
        document.getElementById("listofuser").innerHTML=""  ;
        console.log("pur---",loandata);
        for(var i=0;i<loandata.rows.length;i++){
                var borr = loandata.rows[i].borrower;
                var type = loandata.rows[i].loantype;
                var purpose=loandata.rows[i].purpose;
                var status=loandata.rows[i].status;
                var income=loandata.rows[i].incomepm;
                var loanamt=loandata.rows[i].loanamt;
                var idl=loandata.rows[i].reqloanid;
                console.log("pur---",purpose,"--stat--",loandata.rows[i].reqloanid);
                if(status == "requested"){
                    document.getElementById("listofuser").innerHTML += "<div class='datalist'>"+
                    "<div class='headloan'>"+borr+"</div>"+
                    "<div class='headloan'>"+purpose+"</div>"+
                    "<div class='headloan'>"+income+"</div>"+
                    "<div class='headloan'>"+loanamt+"</div>"+
                    "<button class='buttonaction' id='"+idl+"' value='"+type+"'>approve</button>"+
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
        document.getElementById("acceptpay").style.background="gray";
        document.getElementById("managerview").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
        document.getElementById("manager").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
        document.getElementById("application").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
        document.getElementById("create-section").style.display="none";
        document.getElementById("accept-section").style.display="block";
        document.getElementById("data").style.display="none"  ;
        document.getElementById("list").style.display="none"  ;
        document.getElementById("listofuser").style.display="none"  ;
        document.getElementById("listofstatus").style.display="none"  ;
    },
     'click #application':function(){
        document.getElementById("application").style.background="gray";
        document.getElementById("acceptpay").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
        document.getElementById("managerview").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
        document.getElementById("manager").style.backgroundImage= "linear-gradient(to bottom, #3023AE, #C86DD7)";
        document.getElementById("create-section").style.display="none";
        document.getElementById("accept-section").style.display="none";
        document.getElementById("listofstatus").innerHTML=""  ;
        for(var i=0;i<appdata.rows.length;i++){ 
            if(appdata.rows[i].totaldue !="0.0000 UTP") 
            {
                var flag=0;
                var index = 0;
                var amnt=appdata.rows[i].amtapproved;
                console.log("enter user",appdata);     
                var finaldue=appdata.rows[i].finalduedt*1000;
                var date = new Date(parseInt(finaldue));
                var finaldate = date.toUTCString('MM/dd/yy  HH:mm:ss');
                var totaldue=appdata.rows[i].totaldue;
                var name=appdata.rows[i].borrower;
                document.getElementById("list").style.display="none"  ;
                document.getElementById("data").style.display="flex"  ;
                document.getElementById("listofstatus").style.display="flex"  ;
                document.getElementById("listofuser").style.display="none";
                for(var j=0;j<loandata.rows.length;j++)
                {
                    if(appdata.rows[i].reqloanid == loandata.rows[j].reqloanid )
                    {
                        flag = 1;
                        index = j;
                        break;
                    }

                }
                if(flag==1)
                {
                    if(appdata.rows[i].status !="defaulter")
                    {
                        id = appdata.rows[i].reqloanid;
                        document.getElementById("listofstatus").innerHTML += 
                        "<div class='datalist2'>"+
                        "<div class='headloan'>"+name+"</div>"+
                        "<div class='headloan'>"+amnt+"</div>"+
                        "<div class='headloan'>"+totaldue+"</div>"+
                        "<div class='headloan'>"+finaldate+"</div>"+
                        "<button class='check-loan-status-button-defaulter' id ="+id+">check for defaulter</button>"
                        "</div>";
                    } 
                    else if((appdata.rows[i].status =="defaulter")&&(loandata.rows[index].type==true))
                    {
                        id = appdata.rows[i].reqloanid;
                        document.getElementById("listofstatus").innerHTML += 
                        "<div class='datalist2'>"+
                        "<div class='headloan'>"+name+"</div>"+
                        "<div class='headloan'>"+amnt+"</div>"+
                        "<div class='headloan'>"+totaldue+"</div>"+
                        "<div class='headloan'>"+finaldate+"</div>"+
                        "<button class='check-loan-status-button-auction' id = "+id+">check for auction</button>"
                        "</div>";
                    }
                }
              
                
            }
        }
     },
     'click #create':async function(event){
        var username = localStorage.getItem("username");
        var rate = $("#rate").val();
        var period =parseInt( $("#period").val());
        var desc = $("#desc").val();
        if((!rate)||(!period)||(!desc))
        {
          alert("please fill all the fields");
        }
        else{
          try{
            if(period > 30){
                alert("loan period exited (maximum 30 years)");
            }else{
                    let utplendercon = await eosinstance.contract('utplendercon');
                    if(utplendercon)
                    {
                      let result = await  utplendercon.addloancatg(username,desc,rate,period, { authorization: username });
                         if(result){
                          alert("loan added successfully !!");
                        }else{
                          alert("Something went wrong");
                       }
                    }               
            }    
          }
          catch(err){
            var parseResponse = await JSON.parse(err);
            var msg = await parseResponse.error.details[0].message.split(":")[1]
            alert(msg);
          }
        }  
    },
    'click .buttonaction':async function(){
        var username = localStorage.getItem("username");
        event.preventDefault();
        var id = event.target.id;
        var val=event.target.value;
        if((!id))
        {
          alert("please fill loanid");
        }
        else{
          try{
                    let utplendercon = await eosinstance.contract('utplendercon');
                    if(utplendercon)
                    {
                      let result = await  utplendercon.approveloan(username,id, { authorization: username });
                         if(result){
                          alert("loan approvel successfull !!");
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
    },
    'click .check-loan-status-button-defaulter':async function(){
        var username = localStorage.getItem("username");
        var id = event.target.id;
        console.log("username=",username);
        console.log("id->",id);
          try{
                    let utplendercon = await eosinstance.contract('utplendercon');
                    if(utplendercon)
                    {
                      let result = await  utplendercon.checkdefault(username,id, { authorization: username });
                         if(result){
                        let tabrow = await eosinstance.getTableRows({
                                code: "utplendercon",
                                scope: "utplendercon",
                                table: 'approved114',
                                limit: 50,
                                json: true,
                            })
                        if(tabrow){
                            for(var i=0;i<tabrow.rows.length;i++){
                                if(tabrow.rows[i].reqloanid == id){
                                    if(tabrow.rows[i].status == "due"){
                                        alert("there is a time in payment");
                                    }else if(tabrow.rows[i].status == "complete"){
                                        alert("payment complete");
                                    }else if(tabrow.rows[i].status == "complete in auction"){
                                        alert("payment complete by auction");
                                    }else if(tabrow.rows[i].status == "complete, defaulter "){
                                        alert("payment complete as defaulter");
                                    }else{
                                        alert("defaulter");
                                    }
                                }
                            }                        
                        }
                        }else{
                          alert("Something went wrong");
                       }
                    }                
          }
          catch(err){
              console.log("err",err);
            var parseResponse = await JSON.parse(err);
            var msg = await parseResponse.error.details[0].message.split(":")[1]
            alert(msg);
          }
    },
    'click .check-loan-status-button-auction':async function(){
        var username = localStorage.getItem("username");
        var id = event.target.id;
        console.log("username=",username);
        console.log("id->",id);
        try{
            let utplendercon = await eosinstance.contract('utplendercon');
            if(utplendercon)
            {
              let result = await  utplendercon.checkauction(username,id, { authorization: username });
                 if(result){
                let tabrow = await eosinstance.getTableRows({
                        code: "utplendercon",
                        scope: "utplendercon",
                        table: 'approved114',
                        limit: 50,
                        json: true,
                    })
                if(tabrow){
                    for(var i=0;i<tabrow.rows.length;i++){
                        if(tabrow.rows[i].reqloanid == id){
                            if(tabrow.rows[i].status == "auction called"){
                                alert("your property is handover to manager for bidding");
                            }else{
                                alert("time remain in auction action");
                            }
                        }
                    }                   
                }
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