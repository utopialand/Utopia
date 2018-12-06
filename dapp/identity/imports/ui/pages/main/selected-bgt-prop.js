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
  eosConfig = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
    /* keyProvider: ["5Jur4pK1Rb8xvdfNUUZJq5JE36HQUd9PNouWwjUdbWw7cK8ZuUo"], */
    keyProvider:["5KKodHxhrpZQhWeVTAzBJgfwGwPjkYAZdtWiWX9jaZTDL7utgKo"],
    // WIF string or array of keys..
    httpEndpoint: "https://jungle2.cryptolions.io:443",
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
  };
  const eos = Eos(eosConfig);

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