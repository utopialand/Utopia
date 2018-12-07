import "./selected-bgt-prop.html";
import "../../stylesheets/selected-bdg-prop.css";
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


  Template.App_selected_bgt_prop.events({

    "click .selectebgtprop":async function(){
        console.log("bgtpropClick");
        console.log("id----",event.target.id);
        var username= localStorage.getItem("username");
        console.log("username-->",username);
        var details = "description of selected proposal"
        var duration =30;
        
        /* var proposalId = event.target.id;
        let contract = await eos.contract("voteproposal");
        console.log("===",contract);
        try{
        var username= localStorage.getItem("username");
          let res = await contract.delprop(username,details,{authorization:"identityreg1"})
        }catch(err)
        {
          console.log("----",err)
        } */
      }
  })