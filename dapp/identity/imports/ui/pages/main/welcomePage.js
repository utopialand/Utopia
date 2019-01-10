import "./welcomePage.html";
import "../../stylesheets/utopiaIdentity.css";
import "./header";
import "./footer";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import Eos from "eosjs";
ScatterJS.plugins(new ScatterEOS());

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

let eos = {};
var userdetail;
var scatter = {};
let manager;
let show;

Template.welcomePage.onCreated(function bodyOnCreated() {
  const connectionOptions = { initTimeout: 2000 }
  ScatterJS.scatter.connect("utopia", connectionOptions).then(async connected => {
    if (!connected) {
      document.getElementById("scatter-not-installed").style.display = "block";
      return false;
    } else {
      if (ScatterJS.scatter.connect("utopia")) {
        scatter = ScatterJS.scatter;
        const requiredFields = { accounts: [network] };
        eos = scatter.eos(network, Eos, eosOptions);
        if (scatter.identity) {
          document.getElementById("scatter-not-installed").style.display = "none";
          document.getElementById("loginButton").innerHTML = "logout";
          await eos.getTableRows({
            code: "utpmanager11",
            scope: "utpmanager11",
            table: "manager111",
            limit: 50,
            json: true
          }).then((resp) => {
            manager = resp.rows;

          })
          await eos.getTableRows({
            code: "identityreg1",
            scope: "identityreg1",
            table: "identity3",
            limit: 50,
            json: true
          }).then((resp) => {
            userdetail = resp;

            var username = localStorage.getItem("username");
            var countman = 0;
            for (var i = 0; i < manager.length; i++) {
              if (manager[i].user == username) {
                countman++;
              }
            }
            if (countman == 1) {
              document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
              document.getElementById("managerText").style.display = "block";
              document.getElementById("len").style.display = "block";
              document.getElementById("coupon").style.display = "block";
              var s = document.getElementById("len").setAttribute("value", "manager");
              document.getElementsByClassName("optionFlex")[0].style.display = "none";
              document.getElementById("proposal").style.display = "block";
            } else {
              var countuserid = 0;
              for (var i = 0; i < userdetail.rows.length; i++) {
                if (userdetail.rows[i].username == username) {
                  countuserid++;
                  show = userdetail.rows[i].citizen;
                }
              }
              if (countuserid == 1) {
                document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
                document.getElementById("managerText").style.display = "none";
                document.getElementById("len").style.display = "block";
                document.getElementById("coupon").style.display = "block";
                var s = document.getElementById("len").setAttribute("value", "userid");
                document.getElementById("proposal").style.display = "block";
                if (show == 1) {

                  document.getElementsByClassName("optionFlex")[0].style.display = "none";
                } else {

                  document.getElementsByClassName("optionFlex")[0].style.display = "flex";
                  document.getElementsByClassName("optionBox1")[0].style.display = "none";
                  document.getElementsByClassName("optionBox2")[0].style.display = "flex";
                }

              } else {

                document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
                document.getElementById("managerText").style.display = "none";
                var s = document.getElementById("len").setAttribute("value", "user");
                document.getElementById("len").style.display = "none";
                document.getElementsByClassName("optionFlex")[0].style.display = "flex";
                document.getElementsByClassName("optionBox1")[0].style.display = "flex";
                document.getElementsByClassName("optionBox2")[0].style.display = "none";
                document.getElementById("coupon").style.display = "none";
                document.getElementById("proposal").style.display = "none";
              }
            }
          });


        } else {
          document.getElementsByClassName("identitySectionman")[0].style.display = "none";
          document.getElementById("loginButton").innerHTML = "login";
          document.getElementsByClassName("optionFlex")[0].style.display = "none";
          

        }
      }

    }
  });
});

Template.welcomePage.onRendered(async function () {

  var scatter = ScatterJS.scatter;
  const requiredFields = { accounts: [network] };
  var eos = scatter.eos(network, Eos, eosOptions);
  var identityTb = await eos.getTableRows({
    code: "identityreg1",
    scope: "identityreg1",
    table: "identity3",
    limit: 50,
    json: true
  });
  userdetail = identityTb;
  var username = localStorage.getItem("username");
  localStorage.setItem("hasIdentity", false);
  for (var i = 0; i < identityTb.rows.length; i++) {
    if (username == identityTb.rows[i].username) {
      localStorage.setItem("hasIdentity", true);
      break;
    }
  }

  var managerTb = await eos.getTableRows({
    code: "utpmanager11",
    scope: "utpmanager11",
    table: "manager111",
    limit: 50,
    json: true
  });

  manager = managerTb.rows;
});

Template.welcomePage.events({
  "click .optionBox1": function () {
    FlowRouter.go("/identity-reg");
  },
  "click .scatterloginlogout": async function (event, instance) {
    if (!JSON.parse(localStorage.getItem("loginstatus"))) {
      var connected = await ScatterJS.scatter.connect("utopia")
      if (!connected) return false;
      scatter = ScatterJS.scatter;
      const requiredFields = { accounts: [network] };
      const eos = scatter.eos(network, Eos, eosOptions);
      var iden = await scatter.getIdentity(requiredFields);

      console.log("userdetail", userdetail.rows);
      console.log("hasIdentity", localStorage.getItem("hasIdentity"));
      const acc = iden.accounts.find(
        x => x.blockchain === "eos"
      );
      const account = acc.name;
      localStorage.setItem("username", account);
      var username = localStorage.getItem("username");
      localStorage.setItem("hasIdentity", false);
      var isCitizen = 0;
      for (var i = 0; i < userdetail.rows.length; i++) {
        if (username == userdetail.rows[i].username) {
          localStorage.setItem("hasIdentity", true);
          break;
        }
      }
      localStorage.setItem("loginstatus", JSON.stringify(true));
      document.getElementById("loginButton").innerHTML = "logout";
      var countman = 0;
      for (var i = 0; i < manager.length; i++) {
        console.log("man-is--", manager[i].user);
        if (manager[i].user == account) {
          countman++;
        }
      }
      if (countman == 1) {
        document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
        document.getElementById("managerText").style.display = "block";
        document.getElementById("len").style.display = "block";
        document.getElementById("coupon").style.display = "block";
        document.getElementsByClassName("optionFlex")[0].style.display =
          "none";
        var s = document.getElementById("len").setAttribute("value", "manager");
        document.getElementById("proposal").style.display = "block";
      } else {
        var countuserid = 0;
        for (var i = 0; i < userdetail.rows.length; i++) {
          if (userdetail.rows[i].username == account) {
            countuserid++;
            show = userdetail.rows[i].citizen;
          }
        }
        if (countuserid == 1) {
          console.log("count1");
          document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
          document.getElementById("managerText").style.display = "none";
          document.getElementById("len").style.display = "block";
          document.getElementById("coupon").style.display = "block";
          var s = document.getElementById("len").setAttribute("value", "userid");
          document.getElementById("proposal").style.display = "block";
          if (show == 1) {
            console.log("count1");
            document.getElementsByClassName("optionFlex")[0].style.display = "none";
          } else {
            console.log("count11");
            document.getElementsByClassName("optionFlex")[0].style.display = "flex";
            document.getElementsByClassName("optionBox1")[0].style.display = "none";
            document.getElementsByClassName("optionBox2")[0].style.display = "flex";
          }
        } else {
          console.log("count2");
          document.getElementsByClassName("identitySectionman")[0].style.display = "flex";
          document.getElementById("managerText").style.display = "none";
          var s = document.getElementById("len").setAttribute("value", "user");
          document.getElementById("len").style.display = "none";
          document.getElementsByClassName("optionFlex")[0].style.display = "flex";
          document.getElementsByClassName("optionBox1")[0].style.display = "flex";
          document.getElementsByClassName("optionBox2")[0].style.display = "none";
          document.getElementById("coupon").style.display = "none";
          document.getElementById("proposal").style.display = "none";
        }
      }

    } else {
      console.log("2-----------------");
      ScatterJS.scatter.forgetIdentity().then(() => {
        localStorage.setItem("loginstatus", JSON.stringify(false));

        document.getElementById("loginButton").innerHTML = "login";
        localStorage.setItem("username", "");
        localStorage.setItem("hasIdentity", false);
        document.getElementsByClassName("optionFlex")[0].style.display = "none";
        document.getElementsByClassName("identitySectionman")[0].style.display = "none";
      });
    }
  },
  "click .optionBox2": async function () {
    var username = localStorage.getItem("username");
    try {
      let identityreg1 = await eos.contract('identityreg1');
      if (identityreg1) {
        let result = await identityreg1.reqcitizen(username, { authorization: username })
        if (result) {
          alert("request for citizenship is sent successfully");
        } else {
          alert("Something went wrong");
        }
      }
    }
    catch (err) {
      var parseResponse = await JSON.parse(err);
      var msg = await parseResponse.error.details[0].message.split(":")[1]
      alert(msg);
    }
  }
});

