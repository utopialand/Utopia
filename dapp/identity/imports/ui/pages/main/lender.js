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
let viewdata;
let propdata;
var propid=[];
let appdata;
var dataid;
var amount;
var eosinstance;
Template.lender.onCreated( function (){
    ScatterJS.scatter.connect('utopia').then(async(connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                if (scatter.identity) {
                    eosinstance = eos;                  
                    await eosinstance.getTableRows({
                      code: "utplendercon",
                      scope: "utplendercon",
                      table: 'loancatg113',
                      limit: 50,
                      json: true,
                  }).then((resp)=>{
                      loandata=resp;
                      console.log("loandata====>",loandata);  
                  });   
                  await eosinstance.getTableRows({
                    code: "utplendercon",
                    scope: "utplendercon",
                    table: 'reqloan113',
                    limit: 50,
                    json: true,
                }).then((resp)=>{
                    viewdata=resp;
                    console.log("details====>",viewdata);  
                });     
                  await eosinstance.getTableRows({
                    code: "utplendercon",
                    scope: "utplendercon",
                    table: 'collat111',
                    limit: 50,
                    json: true,
                }).then((resp)=>{
                    colatdata=resp;
                    console.log("loandata====>",colatdata);  
                });   
                 await eosinstance.getTableRows({
                    code: "realstateutp",
                    scope: "realstateutp",
                    table: 'properties1',
                    limit: 50,
                    json: true,
                }).then((resp)=>{
                    propdata=resp;
                    console.log("realstate====>",propdata);  
                }); 
                await eosinstance.getTableRows({
                    code: "utplendercon",
                    scope: "utplendercon",
                    table: 'approved114',
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
Template.lender.onRendered( function (){
    document.getElementById("apply-section").style.display="none";
    document.getElementById("list").style.display="none";
    document.getElementById("data").style.display="none";
    document.getElementById("data2").style.display="none";
})
Template.lender.events({
    'click #user':function(){
        console.log("user");
        document.getElementById("apply-section").style.display="block";
        document.getElementById("list").style.display="none";
        document.getElementById("data").style.display="none";
        document.getElementById("data2").style.display="none";
        document.getElementById("catgid").innerHTML ="";
        document.getElementById("colatoptn").innerHTML ="";
        document.getElementById("colat").style.display="none";
        for(var i=0;i<loandata.rows.length;i++){
            var desc=loandata.rows[i].desc;
            var catid=loandata.rows[i].category_id;
            document.getElementById("catgid").innerHTML += "<div class='inputcatg'><label>"+desc+"</label>"+
            "<input type='radio' class ='catgidoptn' name='radio' value='"+catid+"'></div>"
        }
       
    },
    'click #col':function(){
        document.getElementById("colat").style.display="flex";
        document.getElementById("colatoptn").innerHTML = "";
        for(var i=0;i<colatdata.rows.length;i++){
            var desc=colatdata.rows[i].type;
            var catid=colatdata.rows[i].id;
            document.getElementById("colatoptn").innerHTML += "<div class='inputcatg'><label>"+desc+"</label>"+
            "<input type='checkbox' class ='colatidoptn' name='checkbox' value='"+catid+"'></div>"
        }
        for(var i=0;i<propdata.rows.length;i++){
            var username = localStorage.getItem("username");
            if(propdata.rows[i].owner == username){
                var propt_id=propdata.rows[i].propt_id;
                var catid=propdata.rows[i].price;
                document.getElementById("propid").innerHTML += "<div class='inputcatg'><label>"+catid+"</label>"+
                "<input type='checkbox' class='propidoptn' name='checkbox' value='"+propt_id+"'></div>"
            }
           
        }
    },
    'click #noncol':function(){
        document.getElementById("colat").style.display="none";
    },
    'click #detail':function(){
        var count=0;
        document.getElementById("apply-section").style.display="none";
        var username = localStorage.getItem("username");
        console.log(viewdata,"enter user",appdata,"---");
        for(var i=0;i<viewdata.rows.length;i++){
            console.log("user");
          if(viewdata.rows[i].borrower == username){
             if(viewdata.rows[i].status == "requested"){
                 dataid=i;
                 count++;
                 console.log("count--",count);
             }
            }
            }
            console.log(dataid,"user",count);
            if(count==1){
                for(var i=0;i<viewdata.rows.length;i++){
                    if(i==dataid){
                        var borr = viewdata.rows[i].borrower;
                        var purpose=viewdata.rows[i].purpose;
                        var status=viewdata.rows[i].status;
                        var income=viewdata.rows[i].incomepm;
                        var loanamt=viewdata.rows[i].loanamt;
                        document.getElementById("data").style.display="none"  ;
                        document.getElementById("data2").style.display="none"  ;
                        document.getElementById("list").style.display="flex"  ;
                        document.getElementById("listofuser").innerHTML += "<div class='datalistlen'>"+
                        "<div class='headloan'>"+borr+"</div>"+
                        "<div class='headloan'>"+purpose+"</div>"+
                        "<div class='headloan'>"+income+"</div>"+
                        "<div class='headloan'>"+loanamt+"</div>"+
                        "<div class='headloan'>"+status+"<div>"+
                        "</div>";
                    }               
                }
                
            }else{
                document.getElementById("listofstatus").innerHTML ="";
                for(var i=0;i<appdata.rows.length;i++){
                    console.log("enter user app",appdata.rows[i].borrower );
                    if(appdata.rows[i].borrower == username){
                        if(appdata.rows[i].monthlyduedt==0){
                            console.log("enter user");
                            var name=appdata.rows[i].borrower;
                            var amnt=appdata.rows[i].amtapproved;
                            var finaldue=appdata.rows[i].finalduedt*1000;
                            var date = new Date(parseInt(finaldue));
                            var finaldate = date.toUTCString('MM/dd/yy  HH:mm:ss');
                            var totaldue=appdata.rows[i].totaldue;
                            var id=appdata.rows[i].reqloanid;
                            amount=appdata.rows[i].totaldue;
                            document.getElementById("list").style.display="none"  ;
                            document.getElementById("data2").style.display="none"  ;
                            document.getElementById("data").style.display="flex"  ;
                            document.getElementById("listofstatus").innerHTML += "<div class='datalist2len'>"+
                            "<div class='headloan'>"+name+"</div>"+
                            "<div class='headloan'>"+amnt+"</div>"+
                            "<div class='headloan'>"+totaldue+"</div>"+
                            "<div class='headloan'>"+finaldate+"</div>"+
                            "<button class='headloan buttonproptlen' id='pay' value='"+id+"'>make payement</button>"+
                            "</div>"
                        }else{
                            console.log("enter user");
                            var mnthdue=appdata.rows[i].monthlydue;
                            var name=appdata.rows[i].borrower;
                            var amnt=appdata.rows[i].amtapproved;
                            var finaldue=appdata.rows[i].finalduedt*1000;
                            var date = new Date(parseInt(finaldue));
                            var finaldate = date.toUTCString('MM/dd/yy  HH:mm:ss');
                            var mnthdate=appdata.rows[i].monthlyduedt*1000;
                            var mnthduedt = new Date(parseInt(mnthdate));
                            var mnthlyduedt = mnthduedt.toUTCString('MM/dd/yy  HH:mm:ss'); 
                            var totaldue=appdata.rows[i].totaldue;
                            var id=appdata.rows[i].reqloanid;
                            amount=mnthdue;
                            console.log("---",amount);
                            document.getElementById("list").style.display="none"  ;
                            document.getElementById("data2").style.display="flex"  ;
                            document.getElementById("data").style.display="none"  ;
                            document.getElementById("listofstatus").innerHTML += "<div class='datalist2len'>"+
                            "<div class='headloan'>"+name+"</div>"+
                            "<div class='headloan'>"+amnt+"</div>"+
                            "<div class='headloan'>"+mnthdue+"</div>"+
                            "<div class='headloan'>"+mnthlyduedt+"</div>"+
                            "<div class='headloan'>"+totaldue+"</div>"+
                            "<div class='headloan'>"+finaldate+"</div>"+
                            "<button class='headloan buttonproptlen' id='pay' value='"+id+"'>make payement</button>"+
                            "</div>"
                        }
                        
                    }
                }  
            }             
    },
    'click #apply':async function(event){
        var sym="UTP";
        var username = localStorage.getItem("username");
        var colopn = $( ".coloptn:checked" ).val();
        var typepay = $( ".paytype:checked" ).val();
        var id = parseInt($( ".catgidoptn:checked" ).val());
        var amt =`${parseFloat($("#amt").val()).toFixed(4)} ${sym}`;
        var purpose = $("#purpose").val();       
        var income = `${parseFloat($("#income").val()).toFixed(4)} ${sym}`;
        if((!colopn)||(!typepay)||(!id)||(!amt)||(!purpose)||(!income))
        {
          alert("please fill all the fields");
        }
        else{
          try{
            if(colopn == "col"){
                propid.push(parseInt($(".propidoptn:checked").val()));
                var colatoptn = parseInt($(".colatidoptn:checked").val());
                if((!colatoptn)||(!propid)){
                    alert("please check property or colateral fields");
                }else{
                    let utplendercon = await eosinstance.contract('utplendercon');
                    if(utplendercon)
                    {
                      let result = await  utplendercon.reqloancolat(username,id,amt,purpose,propid,income,colatoptn,typepay, { authorization: username });
                         if(result){
                          alert("loan request sent successfully !!");
                        }else{
                          alert("Something went wrong");
                       }
                    }
                }
            }else{
                let utplendercon = await eosinstance.contract('utplendercon');
                if(utplendercon)
                {
                  let result = await  utplendercon.reqloanincm(username,id,amt,purpose,income,typepay, { authorization: username });
                     if(result){
                        alert("loan request sent successfully !!");
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
    'click #pay':async function(event){
        var sym="UTP";
        var username = localStorage.getItem("username");
        var id = event.target.value;
        var amt =`${parseFloat(amount).toFixed(4)} ${sym}`;
        let utplendercon = await eosinstance.contract('utplendercon');
        if(utplendercon)
        {
          let result = await  utplendercon.loanpayment(username,id,amt, { authorization: username });
             if(result){
              alert(" loan payment successfull !!");
            }else{
              alert("Something went wrong");
           }
        }
    }
});