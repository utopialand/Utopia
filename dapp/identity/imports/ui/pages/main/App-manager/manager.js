import "./manager.html";
import "../../main/footer.js";
import "./manager.css";
import ScatterJS from "scatterjs-core";
import { Session } from "meteor/session";
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
var scatter = {};
var eosinstance = {};
let tabledata;
let userdata;
let budgetprop;
let budgetpropstart;
let propentry;
let bonddata;
let buyerdata;
let resultdata;
let resfeature;
let winnerresults;
let govdebtdata;
let govdebtdataarr = [];
let govbalance;
let flag = 0;
let couponid;
var bondid;
var count=0;
let amount = 0;
let total = 0;
Template.App_manager.onCreated(function() {
  ScatterJS.scatter.connect("utopia").then(async connected => {
    if (connected) {
      if (ScatterJS.scatter.connect("utopia")) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        const eos = scatter.eos(network, Eos, eosOptions);
        if (scatter.identity) {
          eosinstance = eos;     
          winnerresults = await eosinstance.getTableRows({
            code: "voteproposal",
            scope: "voteproposal",
            table: "result13",
            limit: 50,
            json: true
          });
          tabledata = await eosinstance.getTableRows({
              code: "voteproposal",
              scope: "voteproposal",
              table: "proposal11",
              limit: 50,
              json: true
            });
            document.getElementsByClassName("waitingData")[0].style.display = "none";
            document.getElementById("govdebtdatalist").style.display = "none";

            if(tabledata){
              document.getElementById("result-container").style.display ="none";
              console.log("tabledata--", tabledata);
              document.getElementById("manager-proposal-group").innerHTML = "";
              console.log("table data after rendering", tabledata);
              var id = 0;
              for (var i = 0; i < tabledata.rows.length; i++) {
                flag = 0;
                var desc = tabledata.rows[i].proposal_description;
                var proposalId = tabledata.rows[i].id;
                for(var j=0 ; j<winnerresults.rows.length; j++)
                {
                    if(tabledata.rows[i].id==winnerresults.rows[j].proposal_id)
                    {
                      document.getElementById("manager-proposal-group").innerHTML +=
                      "<div class = 'manager-redo'><p>" +
                      desc +
                      "</p><button class = 'delete-button' id = '" +
                      proposalId +
                      "'>delete</button><button class = 'declare-result-button' id = '" +
                      proposalId +
                      "'>result</button>" +
                      "</div>";
                        flag =1;
                        break;
                    }
                }
                if(flag == 0)
                {
                document.getElementById("manager-proposal-group").innerHTML +=
                  "<div class = 'manager-redo'><p>" +
                  desc +
                  "</p><button class = 'delete-button' id = '" +
                  proposalId +
                  "'>delete</button><button class = 'declare-button' id = '" +
                  proposalId +
                  "'>declare winner</button>" +
                  "</div>";
                }
              }
            };
            userdata = await eosinstance.getTableRows({
              code: "identityreg1",
              scope: "identityreg1",
              table: "citizen3",
              limit: 50,
              json: true
            });
            if(userdata){
              console.log("users==><",userdata);
              if (document.getElementById("userList")) {
                if(userdata.rows.length==0)
                {
                  document.getElementById("manager-user-group").innerHTML="";
                  document.getElementById("manager-user-group").innerHTML="<h1>No Citizenship Request Found</h1>";
                }
                else{
                  for (var i = 0; i < userdata.rows.length; i++) {
                    var users = userdata.rows[i].identity;
                    var ids = i;
                    console.log("users==><",users);
                    console.log("users==><",ids);
                    document.getElementById("manager-user-group").innerHTML +=
                      "<div class = 'manager-user-redo' id = '" +
                      users +
                      "'><p>"+
                      users +
                      "</p><button class = 'approved-button' id = '" +
                      ids +
                      "'>approve</button><button class = 'disapproved-button'id = '" +
                      ids +
                      "'>disapprove</button>" +
                      "</div>";
                  }
                }
              }
              document.getElementById("userList").style.display = "none";
            };

            budgetprop = await eosinstance.getTableRows({
              code: "propbudget11",
              scope: "propbudget11",
              table: "proposal13",
              limit: 50,
              json: true
            });
            budgetpropstart = await eosinstance.getTableRows({
              code: "propbudget11",
              scope: "propbudget11",
              table: "votestat",
              limit: 50,
              json: true
            });
            propentry = await eosinstance
            .getTableRows({
              code: "propbudget11",
              scope: "propbudget11",
              table: "feature112",
              limit: 50,
              json: true
            });
            bonddata = await eosinstance.getTableRows({
              code: "bondborrower",
              scope: "bondborrower",
              table: 'bonddetail33',
              limit: 50,
              json: true,
          });
          resultdata = await eosinstance.getTableRows({
              code: "propbudget11",
              scope: "propbudget11",
              table: "votes111",
              limit: "50",
              json: true
            });
            govdebtdata = await eosinstance.getTableRows({
              code: "utpdebtcon11",
              scope: "utpdebtcon11",
              table: "deposit114",
              limit: "50",
              json: true
            });
            if(govdebtdata)
            {
              for(var i=0;i<govdebtdata.rows.length;i++)
              {
                govdebtdata.rows[i].eqUSD = parseFloat(govdebtdata.rows[i].eqUSD).toFixed(2)
              }
            }
            for(var i=0;i<govdebtdata.rows.length;i++)
            {
              console.log("----",govdebtdata.rows[i].status);
              if(!govdebtdata.rows[i].status)
              {
                govdebtdataarr.push(govdebtdata.rows[i]);
              }
            }
            console.log("govdebtdata------------------>",govdebtdata);
            console.log("govdebtdataarr>>><<",govdebtdataarr);
            Session.set("allgovdeblist", govdebtdataarr);

            govbalance = await eos.getCurrencyBalance({
              code: "eosio.token",
              symbol: "EOS",
              account: "utpdebtcon11",
              json: true
          });
          if(govbalance)
          {
            amount = parseFloat(govbalance[0].split(' ')[0]);
            amount = (amount*30)/100;
            //`${parseFloat($("#facevalue").val()).toFixed(4)} ${sym}`
            total = amount.toFixed(4) + " EOS";
            console.log("govbalance===<><",total);
            console.log("govbalance===<><",govbalance);
          }
        } else {
          FlowRouter.go("/");
        }
      }
    } else {
      console.log("scatter not installed");
    }
  });
});
Template.App_manager.helpers({
  allgovdebtuserlist(){
  console.log("allgovdeblist========<>=====>",Session.get("allgovdeblist"));
  return Session.get("allgovdeblist");
  }
});
Template.App_manager.events({
  "click #userDetails": function() {
    document.getElementById("userList").style.display = "block";
    document.getElementById("proposalList").style.display = "none";
    document.getElementById("result-container").style.display = "none";
    document.getElementById("rsmanagerpage").style.display = "none";  
    document.getElementById("govdebtdatalist").style.display = "none";
    document.getElementsByClassName("bondprop")[0].innerHTML ="";
    
  },
  "click #govdebt":function(){
    console.log("govdebt");
    console.log("govbalance=====><><>",govbalance[0]);
    document.getElementById("govteosbal").innerHTML = "<div>"+"Total EOS : "+govbalance[0]+","+"<br>Distributable EOS Balance : "+total+"</div>"
    document.getElementById("proposalList").style.display = "none"; 
    document.getElementsByClassName("bondprop")[0].innerHTML ="none";
    document.getElementById("rsmanagerpage").style.display = "none"; 
    document.getElementById("govdebtdatalist").style.display = "flex";
    console.log("govdebtdata===>",govdebtdata);
  },
  
  "click #proposalDetails": function() {
    console.log("proposalDetails");
    document.getElementById("userList").style.display = "none";
    document.getElementById("proposalList").style.display = "block";
    document.getElementsByClassName("budgetProposalsList")[0].style.display ="none"; 
    document.getElementById("rsmanagerpage").style.display = "none"; 
    document.getElementById("govdebtdatalist").style.display = "none";
    document.getElementsByClassName("manager-below-section")[0].style.display ="block";
    document.getElementsByClassName("bondprop")[0].innerHTML ="";
  },
  "click .approved-button": async function() {
    console.log("helllllllloManager");
    var id = event.target.id;
    var userName = event.target.parentElement.id;
    try {
      let identityreg1 = await eosinstance.contract("identityreg1");
      if(identityreg1)
      {
        let result = await identityreg1.addcitizen(userName,"identityreg1", {authorization: "identityreg1" });
        if(result)
        {
          alert("citizenship approved !!!!");
          let utpcreditsc1 = await eosinstance.contract("utpcreditsc1");
          if(utpcreditsc1)
          {
            let creditscore = await utpcreditsc1.addcredscore("identityreg1",userName ,7.5000,{authorization: "identityreg1" });
            if(creditscore)
            {
              alert("credit score is successfully added");
            }
            else{
              alert("credit score is not added");
            }
          }
    
        }
        else{
          alert("citizenship not approved !!!!");
        }
      }
    } catch (err) {
        var parseResponse = await JSON.parse(err);
        var msg = await parseResponse.error.details[0].message.split(":")[1];
        alert(msg);
    }
  },
  "click .disapproved-button": async function() {
    console.log("helllllllloManager - disapproved");
    console.log("id----", event.target.id);
    console.log("username------", event.target.parentElement.id);
    var requestername = event.target.parentElement.id;
    var id =event.target.id;
    try {
      let identityreg1 = await eosinstance.contract("identityreg1");
      if(identityreg1)
      {
        let result = await identityreg1.remcitreq(requestername ,"identityreg1",{authorization: "identityreg1" });
        if(result)
        {
          alert("disapproved successfuffly");
        }
        else{
          alert("not disapproved");
        }
      }
    }
    catch(err)
    {
      var parseResponse = await JSON.parse(err);
      var msg = await parseResponse.error.details[0].message.split(":")[1];
      alert(msg);
    }
  },
  "click .delete-button": async function() {
    console.log("deleteButtonClick");
    console.log("id----", event.target.id);
    var proposalId = event.target.id;
    try {
      let voteproposal = await eosinstance.contract("voteproposal");
      if(voteproposal)
      {
        let result = await voteproposal.delprop(proposalId, "identityreg1", {authorization: "identityreg1"});
        if(result)
        {
          alert("proposal is successfully removed!!!");
        }
        else{
          alert("proposal is not removed!!!");
        }
      }
    } catch (err) {
      var parseResponse = await JSON.parse(err);
      var msg = await parseResponse.error.details[0].message.split(":")[1];
      alert(msg);
    }
  },
  "click .declare-result-button":async function(){
    console.log("click result");
    console.log("idresult == >  ",event.target.id);
    event.preventDefault();
        var id = event.target.id;
        id = id[id.length - 1];
        FlowRouter.go("/result/" + id);
  },
  "click .declare-button": async function() {
    console.log("declareButtonClick");
    console.log("id----", event.target.id);
    var proposalId = event.target.id;
    try {
      let voteproposal = await eosinstance.contract("voteproposal");
      if(voteproposal)
      {
        let result = await voteproposal.decidewinner(proposalId, "identityreg1", {authorization: "identityreg1"});
        if(result)
        {
          alert("winner is declared successfully!!!");
        }
        else {
          alert("winner is not declared!!!");
        }
      } 
    } catch (err) {
      var parseResponse = await JSON.parse(err);
      var msg = await parseResponse.error.details[0].message.split(":")[1];
      alert(msg);
    }

  },
  "click #budgetButton": async function() {
    console.log("propentry.rows.length==>",propentry);
    console.log("propentry.rows.length==>",propentry.rows.length);
    if (propentry.rows.length != 0) {
      console.log("propentry.value===>", propentry);
      document.getElementById("result-container").style.display = "block";
      document.getElementById("proposal-result-name").innerHTML = "";
      document.getElementById("proposal-result-votes").innerHTML = "";

      document.getElementsByClassName("manager-below-section")[0].style.display = "none";
      console.log("abcdef");
      console.log("resultdata==>", resultdata);
      if(resultdata.rows.length!=0)
      {
        var result = [];
        var id = propentry.rows[0].id;
        console.log("ids===>>>", id);
        //getting the length of list of all choices for a  particular proposal
        var length = 0;
        for (var i = 0; i < resultdata.rows.length; i++) {
          if (id == resultdata.rows[i].feature_id) {
            length = resultdata.rows[i].choices.length;
            break;
          }
        }
  
        //creating a 2d array to store who got how many votes based on rank
        for (var i = 0; i < length; i++) {
          result[i] = [];
        }
  
        for (var i = 0; i < length; i++) {
          for (var j = 0; j < length; j++) {
            result[i][j] = 0;
          }
        }
  
        var input = [];
        //creating a 2d array of total votes received
        for (var i = 0; i < resultdata.rows.length; i++) {
          if (id == resultdata.rows[i].feature_id) {
            input.push(resultdata.rows[i].choices);
          }
        }
  
        // calculaing votes based on ranks
        //j is the candidate and val-1 is the total votes received for the rank
        for (var i = 0; i < input.length; i++) {
          for (j = 0; j < input[i].length; j++) {
            var val = input[i][j];
            result[j][val - 1] += 1;
          }
        }
        for (var i = 0; i < result.length; i++) {
          document.getElementById("proposal-result-votes").innerHTML +=
            "<div class = 'ep2manager'></div><br>";
  
          for (var j = 0; j < result[i].length; j++) {
            var val = result[i][j];
            console.log("val--<<<<<<", val);
            document.getElementsByClassName("ep2manager")[i].innerHTML +=
              "<div class = 'vote-stat'>" + val + "</div>";
          }
        }
      }
      let arr;
      arr = propentry.rows[0].proposal_options;
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < budgetprop.rows.length; j++) {
          if (budgetprop.rows[j].id == arr[i]) {
            var desc = budgetprop.rows[j].proposal_description;
            var count = budgetprop.rows[j].count;
            var budgetpropId = budgetprop.rows[j].id;
            document.getElementById("proposal-result-name").innerHTML +=
              "<div class = 'epmanager'>" + desc + "</div><br>";
          }
        }
      }
      document.getElementById("stv-stop-button").innerHTML = "";
      document.getElementById("stv-stop-button").innerHTML +=
        "<div class = 'stv-stop' id = 'stv-stop'>" +
        "<button>stop</button>" +
        "</div>";
    } 

      document.getElementsByClassName(
        "manager-below-section"
      )[0].style.display = "none";
      document.getElementById("budgetProposalsList").style.display = "flex";

      document.getElementById("budgetProposalsList").innerHTML = "";
      for (var i = 0; i < budgetprop.rows.length; i++) {
        var desc = budgetprop.rows[i].proposal_description;
        var count = budgetprop.rows[i].count;
        var budgetpropId = budgetprop.rows[i].id;
        if (budgetprop.rows[i].selected == 0) {
          document.getElementById("budgetProposalsList").innerHTML +=
            "<div class = 'bpFlex'>" +
            "<div class = 'bpClass'>" +
            desc +
            "</div>" +
            "<div class = 'bpCount'>" +
            count +
            "</div>" +
            "</div>";
        }
      }
      let flag = 0
      let set = 0;
      for(var i=0;i<budgetprop.rows.length;i++)
      {
        if(budgetprop.rows[i].selected==0)
        {
          flag=1;
          if(budgetprop.rows[i].count!=0)
          {
            set = 1;
          }
          break;
        }
      }
      if(flag==1)
      {
        if (
          budgetpropstart.rows[0] == null || budgetpropstart.rows[0].status == false ) {
          document.getElementsByClassName("budgetProposalsList")[0].innerHTML +=
            "<div class  = 'start-stop'  id = 'starton'><button>START</button></div>";
            if(set ==1)
            {
              document.getElementsByClassName("budgetProposalsList")[0].innerHTML +=
              "<div class  = 'start-stop' id = 'SelectedProposal'><button>SelectedProposal</button></div>";
            }
        } else {
          document.getElementsByClassName("budgetProposalsList")[0].innerHTML +=
            "<div class  = 'start-stop' id = 'stopon'><button>STOP</button></div>";
        }
      }
     
    
  },
  "click #condidateButton": async function() {
    console.log("candidateList");
    document.getElementsByClassName("manager-below-section")[0].style.display = "flex";
    document.getElementById("result-container").style.display = "none";
    document.getElementById("govdebtdatalist").style.display = "none";
    document.getElementById("budgetProposalsList").style.display = "none";
  },

  "click #stv-stop": async function() {
    console.log("stv-stop");
    let idstop = propentry.rows[0].id;
    var username = localStorage.getItem("username");
    try
    {
      let propbudget11 = await eosinstance.contract("propbudget11");
      if(propbudget11)
      {
        let result = await propbudget11.stvoff(idstop, username, { authorization: username });
        if(result)
        {
          alert("stv successfully stoped");
        }
        else{
          alert("stv not stoped");
        }
      }
    }
    catch(err){
      var parseResponse = await JSON.parse(err);
      var msg = await parseResponse.error.details[0].message.split(":")[1];
      alert(msg);
    }
    document.getElementById("stv-stop").style.display = "none";
    document.getElementById("result-container").innerHTML +=
      "<div class = 'decideWinner' id = 'decideWinner'>" +
      "<button>decide Winner</button>" +
      "</div>";
  },
  "click #decideWinner": async function() {
    console.log("decideWinner");
    let idwinner = propentry.rows[0].id;
    var username = localStorage.getItem("username");
    try{
        let propbudget11 = await eosinstance.contract("propbudget11");
        if(propbudget11)
        {
            result = await propbudget11.decidewinner(idwinner, username, { authorization: username });
            if(result)
            {
              alert("winners are decided!!");
            }
            else{
              alert("winners are not decided!!");
            }
        } 
    }
    catch(err){
      var parseResponse = await JSON.parse(err);
      var msg = await parseResponse.error.details[0].message.split(":")[1];
      alert(msg);
    }
  },

  "click #starton": async function() {
    console.log("starton");
    var username = localStorage.getItem("username");
    try{
      let propbudget11 = await eosinstance.contract("propbudget11");
      if(propbudget11)
      {
        let result = await propbudget11.votingon(username, { authorization: username });
        if(result)
        {
          console.log("hello--", result);
          document.getElementById("starton").style.display="none";
          document.getElementById("SelectedProposal").style.display="none";
          document.getElementsByClassName("budgetProposalsList")[0].innerHTML +=
          "<div class  = 'start-stop' id = 'stopon'><button>STOP</button></div>";
        }
        else{
          alert("identity is not registered !!!!");
        }
      }
    }
    catch(err){
      var parseResponse = await JSON.parse(err);
      var msg = await parseResponse.error.details[0].message.split(":")[1];
      alert(msg);
    }
  },
  "click #stopon": async function() {
    console.log("stopon");
    var username = localStorage.getItem("username");
    try{
      let propbudget11 = await eosinstance.contract("propbudget11");
      if(propbudget11)
      {
        let result =  await propbudget11.votingoff(username, { authorization: username });
        if(result)
        {
          console.log("hello--", result);
            document.getElementById("stopon").style.display = "none";
            document.getElementsByClassName("budgetProposalsList")[0].innerHTML +=
            "<div class  = 'start-stop' id = 'SelectedProposal'><button>SelectedProposal</button></div>";
        }
        else{
          alert("identity is not registered !!!!");
        }
      }
    }
    catch(err){
      var parseResponse = await JSON.parse(err);
      var msg = await parseResponse.error.details[0].message.split(":")[1];
      alert(msg);
    }
  },
  "click #SelectedProposal": async function() {
    console.log("SelectedProposal");
    var username = localStorage.getItem("username");
    let rescontract = await eosinstance.contract("propbudget11");
    console.log("response---",rescontract);
            resfeature = await eosinstance.getTableRows({
              code: "propbudget11",
              scope: "propbudget11",
              table: "feature112",
              limit: 50,
              json: true
            });
            console.log("len------",resfeature.rows.length!=0);
            if(resfeature.rows.length!=0)
            {
              alert("other stv is on-- ");
            }
            else {

              console.log("in else------------");
              let response = await rescontract.selectprop(username, { authorization: username }); 
              if(response)
              {
                console.log("===", resfeature.rows[0].proposal_options);
                document.getElementById("budgetProposalsList").innerHTML = "";
                let arr;
                arr = resfeature.rows[0].proposal_options;
    
                for (var i = 0; i < budgetprop.rows.length; i++) {
                  for (var j = 0; j < arr.length; j++) {
                    if (budgetprop.rows[i].id == arr[j]) {
                      var desc = budgetprop.rows[i].proposal_description;
                      var count = budgetprop.rows[i].count;
                      var budgetpropId = budgetprop.rows[i].id;
                      document.getElementById("budgetProposalsList").innerHTML +=
                        "<div class = 'bpFlex'>" +
                        "<div class = 'bpClass'>" +
                        desc +
                        "</div>" +
                        "<div class = 'bpCount'>" +
                        count +
                        "</div>" +
                        "</div>";
                    }
                  }
                }
                document.getElementById("budgetProposalsList").innerHTML +=
                  "<div class = 'managerSelection'>" +
                  "<input type='text' placeholder='details' id = 'details'/>" +
                  "<input  type='text' placeholder='duration' id = 'duration'/>" +
                  "<input  type='text' placeholder='noOfwinner' id = 'noOfwinner'/>" +
                  " </div>" +
                  "<button class = 'submitButton' id = 'submitButton'>submit</button>";
              }
            }      
    
  },
  "click #submitButton": async function() {

    resfeature = await eosinstance.getTableRows({
      code: "propbudget11",
      scope: "propbudget11",
      table: "feature112",
      limit: 50,
      json: true
    });
    console.log("manager submit");
    var username = localStorage.getItem("username");
    var details = $("#details").val();
    var duration = $("#duration").val();
    var noOfwinner = $("#noOfwinner").val();
    var id = resfeature .rows[0].id;
   
    try{
      let propbudget11 =  eosinstance.contract("propbudget11");
      if(propbudget11)
      {
        let result = propbudget11.startstv(id, username, details, duration, noOfwinner, {authorization: username});
        if(result)
        {
          console.log("hello--", result);
          FlowRouter.go("/budget")
        }
        else{
          alert("identity is not registered !!!!");
        }
      }
    }
    catch(err)
    {
      var parseResponse = await JSON.parse(err);
      var msg = await parseResponse.error.details[0].message.split(":")[1];
      alert(msg);
    }
    FlowRouter.go("/budget");
  },
  "click #coupondetails": function() {
    document.getElementById("userList").style.display = "none";
    document.getElementById("proposalList").style.display = "none";
    document.getElementById("rsmanagerpage").style.display = "none";
    document.getElementById("govdebtdatalist").style.display = "none";
    document.getElementsByClassName("bondprop")[0].innerHTML ="";
    document.getElementsByClassName("bondprop")[0].innerHTML +=
    "<div class='bond-form'><label>bond id</label><input type='text' id='bondid'/>"
    + "</div>"+" <div class='createbutton'><button class='buttonbond' id ='submitid'>Submission</button></div>";
  },
  "click #submitid":async function() {    
              document.getElementById("userList").style.display = "none";
              document.getElementById("proposalList").style.display = "none";
              bondid=$("#bondid").val();
              if((!bondid)){
                alert("please enter bondid");
              }else{
                document.getElementsByClassName("bondprop")[0].innerHTML = "";
                for (var i = 0; i < bonddata.rows.length; i++) {
                  if(bonddata.rows[i].id == bondid){
                    couponid=bondid;
                    var iip=i;
                    for(var j=0; j<bonddata.rows[iip].bondholders.length; j++){
                      var bondholder = bonddata.rows[iip].bondholders[j]; 
                      var username = localStorage.getItem("username");

                     buyerdata =  await eosinstance.getTableRows({
                            code: "bondborrower",
                            scope: bondholder,
                            table: "buyerdata33",
                            limit: 50,
                            json: true
                          });
                    if(buyerdata){
                      for(var k=0;k<buyerdata.rows.length;k++){
                        if(buyerdata.rows[k].id==couponid){
                          var datearr = buyerdata.rows[k].returningdate.length-1;
                          document.getElementsByClassName("bondprop")[0].innerHTML +="<div class='status'><div class='holders'>"+buyerdata.rows[k].bondbuyer+"</div><div class='holders'>status -> "+datearr+" coupon are submitted</div></div>";   
                        }
                      }    
                    };
                    }
                    document.getElementsByClassName("bondprop")[0].innerHTML +="<div class='coupondiv'><button class='couponbond' id='getcoupon'>coupondistirbution</button></div>";
                  }      
              }
      
              }
             
   
  },
  "click #getcoupon": async function() {
    var num;
    var username = localStorage.getItem("username");
    try
    {
      let bondborrower = await eosinstance.contract("bondborrower");
      if(bondborrower)
      {
        let result = await bondborrow.getcoupon(couponid,{authorization: username});
        if(result)
        {
            for (var i = 0; i < bonddata.rows.length; i++) {
              if(bonddata.rows[i].id == bondid){
                couponid=bonddata.rows[i].id;
                num=i;
                for(var j=0; j<bonddata.rows[i].bondholders.length; j++){
                  var bondholder = bonddata.rows[i].bondholders[j]; 
                  buyerdata = await eosinstance.getTableRows({
                        code: "bondborrower",
                        scope: bondholder,
                        table: "buyerdata33",
                        limit: 50,
                        json: true
                      });
                if(buyerdata) {
                  for(var k=0;k<buyerdata.rows.length;k++){
                    if(buyerdata.rows[k].id==couponid){
                      var datearr = buyerdata.rows[k].returningdate[buyerdata.rows[k].returningdate.length-1];
                      console.log(buyerdata.rows[k].returningdate.length,"dataarr--",k)
                      if (buyerdata.rows[k].returningdate.length-1 == bonddata.rows[k].maturitycount){
                      
                       count++;
                       if(count==bonddata.rows[k].bondholders.length){
                         alert("-payement----successfull---");       
                       }              
                      }else if (buyerdata.rows[k].returningdate.length-1 < bonddata.rows[k].maturitycount){
                      
                          alert("--time remain--");                    
                      }  
                    }
                  }                                    
                };
                }
              }      
          } 
          } else {
            alert("some problems!!!!");
          }
        }
        else{
          alert("getting coupon process is not completed");
        }
      }
    catch(err)
    {
      console.log("err---=>  ",err);
      var parseResponse = await JSON.parse(err);
      console.log("parseResponse => ",parseResponse);
      var msg = await parseResponse.error.details[0].message.split(":")[1];
      alert(msg);
    }
  },
  "click #realestatemanager":function()
  {
    console.log("realestate");
    
    document.getElementById("proposalList").style.display = "none"; 
    document.getElementById("govdebtdatalist").style.display = "none";
    document.getElementsByClassName("bondprop")[0].innerHTML ="none";
    document.getElementById("rsmanagerpage").style.display = "block"; 
  },
  "click #addprop":function()
  {
    console.log("add property");
    document.getElementsByClassName("adding-land-proposal")[0].style.display = "none";
    document.getElementsByClassName("approved-property")[0].style.display = "none";
    document.getElementsByClassName("adding-property")[0].style.display = "flex";
  },
  "click #createplandroposal":function()
  {
    console.log("createplandroposal");
    document.getElementsByClassName("adding-property")[0].style.display = "none";
    document.getElementsByClassName("approved-property")[0].style.display = "none";
    document.getElementsByClassName("adding-land-proposal")[0].style.display = "flex";
  },
  "click #approvedproperty":function()
  {
    console.log("approvedproperty");
    document.getElementsByClassName("adding-property")[0].style.display = "none";
    document.getElementsByClassName("adding-land-proposal")[0].style.display = "none";
    document.getElementsByClassName("approved-property")[0].style.display = "flex";
  },
  
  "click #add-property-btn":async function()
  {
    console.log("add-property");
    var username = localStorage.getItem("username");
    var proptname = $("#proptname").val();
    var address = $("#address").val();
    var description = $("#description").val();
    var propttype = $("#propttype").val();
    var area = $("#area").val();
    if((!proptname)||(!address)||(!description)||(!propttype)||(!area))
    {
      alert("please fill all the fields");
    }
    else{
      try{
        let realstateutp = await eosinstance.contract('realstateutp');
        if(realstateutp)
        {
          let result = await  realstateutp.addproperty(proptname, address, description, propttype, area, { authorization: username });
             if(result){
              alert("property added successfully !!");
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
  "click #add-land-proposal-btn":async function()
  {
    console.log("create auction");
    var sym = "UTP";
    var username = localStorage.getItem("username");
    var propid = $("#propid").val();
    var x = document.getElementById("startdate").value;
    var startdate = Math.round((new Date(x)).getTime() / 1000);
    var y = document.getElementById("enddate").value;
    var enddate = Math.round((new Date(y)).getTime() / 1000);
    var currenttime = Math.round((new Date()).getTime() / 1000);
    /* var ts = Math.round((new Date()).getTime() / 1000); */
    /* console.log("ts",ts); */

    var currentprice=`${parseFloat($("#currentprice").val()).toFixed(4)} ${sym}`
    var currentprice1 = $("#currentprice").val();
    var count =currentprice1.split(".").length - 1;
    console.log("x-->",x);
    console.log("current time ->",currenttime);
    console.log("startdate",startdate);
    console.log("enddate",enddate);
   if((!propid)||(!currentprice1)||(!startdate)||(!enddate))
   {
      alert("please fill all the entries !!")
   }
   else if((count>1) || (currentprice1.length==count))
   {
    alert("please fill correct amount !!");
   }
   else{
      try{
          let realstateutp = await eosinstance.contract('realstateutp');
          if(realstateutp)
          {
            let result = await realstateutp.landproposal(propid, username, currentprice, startdate, enddate, { authorization: username });
            if(result)
            {
              alert("auction created successfully for bidding")
            }
            else{
              alert("Something went wrong");
            }
          }
      }
      catch(err)
      {
        var parseResponse = await JSON.parse(err);
        var msg = await parseResponse.error.details[0].message.split(":")[1]
        alert(msg);
      }
   }
  },
  "click #approved-property-btn":async function()
  {
    console.log("approved click");
    
    var username = localStorage.getItem("username");
    var approvedid = $("#approvedid").val();
    if(!approvedid)
    {
      alert("please provide property ID");
    }
    else{
      try{
          let realstateutp = await eosinstance.contract('realstateutp');
          if(realstateutp)
          {
           let result = await realstateutp.approvedprop(approvedid , { authorization: username })
           if(result){
              alert("property approved successfully to highest bidder");
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
  }

});