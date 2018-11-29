import "./citizenship.html";
import "../../stylesheets/citizenship.css";
import Eos from "eosjs";
eosConfig = {
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
  keyProvider: ["5KeNdWYxPbUpsLUa8QT64AbjTAQeHcZejcR6shHnNi1sESgxgm7"],
  // WIF string or array of keys..
  httpEndpoint: "https://jungle2.cryptolions.io:443",
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
};
eos = Eos(eosConfig);

Template.citizenship.onRendered(async function() {
  let tabledata = await eos.getTableRows({
    code: "identityreg1",
    scope: "identityreg1",
    table: "citizen",
    limit: 50,
    json: true
  });

  console.log("tabledata---------", tabledata.rows);
  var account_name = localStorage.getItem("username");
  console.log("account_name ---", account_name);
  for (var i = 0; i < tabledata.rows.length; i++) {
    var acc = tabledata.rows[i].identity;
    if (acc == account_name) {
      status = tabledata.rows[i].approved;
      console.log("status----", status);
      if (status == 0) {
        document.getElementById("heading-status").innerHTML =
          "You have already applied for citizenship";
      }
      if (status == 1) {
        document.getElementById("insidetext").innerHTML = "approved";
        document.getElementById("heading-status").innerHTML =
          "You are now a citizen of utopia!!!";
      }
    }
  }
});
