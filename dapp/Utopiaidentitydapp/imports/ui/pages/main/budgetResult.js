import "./budgetResult.html";
import "../../stylesheets/budgetResult.css";
import "./footer.js";
import Eos from "eosjs";

eosConfig = {
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
  /* keyProvider: ["5Jur4pK1Rb8xvdfNUUZJq5JE36HQUd9PNouWwjUdbWw7cK8ZuUo"], */
  keyProvider: ["5KKodHxhrpZQhWeVTAzBJgfwGwPjkYAZdtWiWX9jaZTDL7utgKo"],
  httpEndpoint: "https://jungle2.cryptolions.io:443",
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
};
const eos = Eos(eosConfig);
let tabledata;
Template.App_budget_result.onRendered(async function() {
  tabledata = await eos.getTableRows({
    code: "voteproposal",
    scope: "voteproposal",
    table: "proposal11",
    limit: 50,
    json: true
  });
  console.log("table-data -->", tabledata);
  document.getElementById("small-proposal").innerHTML = "";
  console.log("table data after rendering", tabledata);
  var id = 0;
  for (var i = 0; i < tabledata.rows.length; i++) {
    var desc = tabledata.rows[i].proposal_description;
    var proposalId = tabledata.rows[i].id;
    document.getElementById("small-proposal").innerHTML +=
      "<div class = 'small-proposal-read'>" +desc
  }
});
