import "./Voting.html"
import "../../stylesheets/Voting.css";
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
  
  var eosinstance;
  var row;
  var propid;
Template.Vote.onCreated(async function () {
    
   ScatterJS.scatter.connect('utopia').then((connected) => {
    if (connected) {
        if (ScatterJS.scatter.connect('utopia')) {
            scatter = ScatterJS.scatter;
            const requiredFields = { accounts: [network] };
            const eos = scatter.eos(network, Eos, eosOptions);
            eosinstance=eos;
             eos.getTableRows({
                code: "voteproposal",
                scope: "voteproposal",
                table: 'proposal11',
                limit: 50,
                json: true,
            }).then((tabledata=>{
                var rowdata=[];
                document.getElementById("upper").innerHTML = "";
                document.getElementById("proposal-group").innerHTML = "";
                var Id = FlowRouter.current().params.id; 
                rowdata=tabledata.rows; 
               for(var j=0;j<rowdata.length;j++){
                    if(rowdata[j].id == Id){
                        row =rowdata[j];
                    }
                }
                console.log(Id,"---",row);
                for(var i = 0; i< row.proposal_options.length;i++){
                    var can=row.proposal_options[i];
                    titledata=row.proposal_description;
                    propid=row.id;
                    document.getElementById("proposal-group").innerHTML += 
                    "<div class = 'redovote hover'><div class= 'candidatevote'>"+can+"</div><div class='rank'><input class='input' type='text' id='rankdata"+i+"'/></div></div>";
                }
                document.getElementById("proposal-group").innerHTML += 
                "<button class='submit hover'>"+"submit"+"</button>"

                document.getElementById("upper").innerHTML += 
                "<h1>"+titledata+"</h1>"
            }));
          
        }
    } else {
        console.log("scatter not installed");
    }
});
Template.Vote.events({
    'click .submit':function(e){
        var data=[];
        for(var i=0;i<row.proposal_options.length;i++){
        var item=$("#rankdata"+i).val();
        data.push(parseInt(item));
        }
        var username=localStorage.getItem("username")
        eosinstance.contract("voteproposal").then(voting => {
            voting.voteprop(propid ,data,username, { authorization: username }).then(
                (res) => {
                      console.log("response--",res);
                }
            )
        })
    }
})
});