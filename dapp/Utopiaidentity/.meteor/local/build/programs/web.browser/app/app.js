var require = meteorInstall({"imports":{"ui":{"layouts":{"body":{"body.html":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/layouts/body/body.html                                                                             //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./template.body.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.body.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/layouts/body/template.body.js                                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.__checkName("App_body");
Template["App_body"] = new Template("Template.App_body", (function() {
  var view = this;
  return HTML.DIV("\n                ", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("main"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n            ");
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"body.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/layouts/body/body.js                                                                               //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./body.html");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"pages":{"main":{"Registered.html":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/Registered.html                                                                         //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./template.Registered.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.Registered.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/template.Registered.js                                                                  //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.__checkName("Reg_success");
Template["Reg_success"] = new Template("Template.Reg_success", (function() {
  var view = this;
  return [ HTML.Raw('<div class="container-i">\n        <div class="heading-i">\n            <div class="heading-reg">\n                <span>Your identity has been registered</span>                \n            </div>\n            <div class="idfield">\n                <div class="id">ID NUMBER</div>\n                <div class="text"> <input type="text" placeholder="ABCD" class="insidetext"></div>\n               \n            </div>\n            <div class="buttonfield">\n                    <div class="back"><button class="button" id="statusButton">Apply for citizenship</button></div>\n                </div>\n            <div class="buttonfield">\n                <div class="back"><button class="button">Go to the Dashboard</button></div>\n            </div>\n        </div>\n    </div>\n    '), Spacebars.include(view.lookupTemplate("footer")) ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Voting.html":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/Voting.html                                                                             //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./template.Voting.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.Voting.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/template.Voting.js                                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.__checkName("Vote");
Template["Vote"] = new Template("Template.Vote", (function() {
  var view = this;
  return HTML.Raw('<div class="proposal-container">\n            <div>\n                    <div class="upper" id="upper">\n\n                    </div>\n            </div>\n\n            <div class="tabhead">\n                    <div class="candidatevote">\n                            Candidate\n                    </div>\n                    <div class="rank">\n                               Rank\n                    </div>\n            </div>\n            <div class="belowvote-section">\n                    <div class="allvote-proposals" id="all-proposals">\n                        <div class="proposalvote-group" id="proposal-group">\n        \n                        </div>\n                    </div>\n                </div>\n            \n        </div>');
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"citizenship.html":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/citizenship.html                                                                        //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./template.citizenship.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.citizenship.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/template.citizenship.js                                                                 //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.__checkName("citizenship");
Template["citizenship"] = new Template("Template.citizenship", (function() {
  var view = this;
  return [ HTML.Raw('<div class="container-i">\n        <div class="heading-i">\n            <div class="heading-reg" id="heading-status">\n                You have successfully applied for citizenship               \n            </div>\n            <div class="idfield">\n                <div class="id">Your status</div>\n                <div class="text" id="insidetext"> Pending</div>\n               \n            </div>\n            <div class="buttonfield">\n                <div class="back"><button class="button">Go to the Dashboard</button></div>\n            </div>\n        </div>\n    </div>\n    '), Spacebars.include(view.lookupTemplate("footer")) ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"footer.html":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/footer.html                                                                             //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./template.footer.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.footer.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/template.footer.js                                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.__checkName("footer");
Template["footer"] = new Template("Template.footer", (function() {
  var view = this;
  return HTML.Raw('<div class="footerText">\n            2018 &#9400; UTOPIA\n    </div>');
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"header.html":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/header.html                                                                             //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./template.header.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.header.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/template.header.js                                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.__checkName("header");
Template["header"] = new Template("Template.header", (function() {
  var view = this;
  return HTML.Raw('<div class="container">\n    <div class="header">\n      <div class="logoSection">\n        <div class="logo"></div>\n      </div>\n      <div class="identitySection">\n        <div class="proposal">proposal</div>\n        <div class="identityText">Identity</div>\n        <div class="managerText">manager</div>\n      </div>\n    </div>\n    <div class="headLineBoundary"></div>\n  </div>');
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"identity-reg.html":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/identity-reg.html                                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./template.identity-reg.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.identity-reg.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/template.identity-reg.js                                                                //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.__checkName("identity_reg");
Template["identity_reg"] = new Template("Template.identity_reg", (function() {
  var view = this;
  return [ HTML.Raw('<div class="identity-container">\n        <h1> register for utopia</h1>\n        <div class="registration-form">\n            <div class="row1">\n                <input type="text" placeholder="first name" id="firstname">\n                <input type="text" placeholder="middle name" id="midname">\n                <input type="text" placeholder="last name" id="lastname">\n            </div>\n            <div class="row2">\n                <input type="text" placeholder="date of birth" id="dob">\n                <input type="text" placeholder="phone number" id="phonenumber">\n                <input type="text" placeholder="email address" id="email">\n            </div>\n            <div class="row3">\n                <button class="upload-picture" id="upload-picture-button">upload picture</button>\n                <button class="register" id="register-button">register</button>\n            </div>\n        </div>\n    </div>\n    '), Spacebars.include(view.lookupTemplate("footer")) ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"manager.html":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/manager.html                                                                            //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./template.manager.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.manager.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/template.manager.js                                                                     //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.__checkName("App_manager");
Template["App_manager"] = new Template("Template.App_manager", (function() {
  var view = this;
  return [ HTML.Raw('<div class="manager-container">\n      <h1>manager</h1>\n      <div class="flexOption">\n        <button id="proposalDetails">proposal</button>\n        <button id="userDetails">user</button>\n      </div>\n      <div id="proposalList">\n        <div class="manager-below-section"> \n          <div class="manager-all-proposals" id="manager-all-proposals">\n              <div class="manager-proposal-group" id="manager-proposal-group">\n              </div>\n          </div>\n      </div>\n      </div>\n      <div id="userList">\n        <div class="manager-below-section"> \n          <div class="manager-all-proposals" id="manager-all-proposals">\n              <div class="manager-user-group" id="manager-user-group">\n              </div>\n          </div>\n      </div>\n      </div>\n     \n  </div>\n  '), Spacebars.include(view.lookupTemplate("footer")) ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"newproposal.html":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/newproposal.html                                                                        //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./template.newproposal.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.newproposal.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/template.newproposal.js                                                                 //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.__checkName("App_newproposal");
Template["App_newproposal"] = new Template("Template.App_newproposal", (function() {
  var view = this;
  return [ HTML.Raw('<div class="new-proposal-container">\n        <h1>create a proposal</h1>\n        <div class="proposal-form">\n            <label>proposal name</label>\n            <input type="text">\n            <label>proposal description</label>\n            <input type="text">\n        </div>\n    </div>\n    '), Spacebars.include(view.lookupTemplate("footer")) ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"proposal.html":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/proposal.html                                                                           //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./template.proposal.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.proposal.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/template.proposal.js                                                                    //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.__checkName("App_proposal");
Template["App_proposal"] = new Template("Template.App_proposal", (function() {
  var view = this;
  return HTML.Raw('<div class="proposal-container">\n        <h1>Here is the list of proposals</h1>\n        <div class="button-group">\n            <button class="new-proposal-button">Create a new proposal</button>\n        </div>\n        <div class="below-section">\n            <div class="all-proposals" id="all-proposals">\n                <div class="proposal-group" id="proposal-group">\n                </div>\n            </div>\n        </div>\n\n    </div>');
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"result.html":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/result.html                                                                             //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./template.result.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.result.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/template.result.js                                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.__checkName("App_result");
Template["App_result"] = new Template("Template.App_result", (function() {
  var view = this;
  return [ HTML.Raw('<div class="result-container">\n        <h1>current status</h1>\n        <p id="proposal-desc"></p>\n        <p id="proposal-detail"></p>\n        <div class="results" id="proposal-result">\n            <div id="proposal-result-name"></div>\n            <div id="proposal-result-votes"></div>\n        </div>\n    </div>\n    '), Spacebars.include(view.lookupTemplate("footer")) ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"welcomePage.html":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/welcomePage.html                                                                        //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./template.welcomePage.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.welcomePage.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/template.welcomePage.js                                                                 //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.__checkName("welcomePage");
Template["welcomePage"] = new Template("Template.welcomePage", (function() {
  var view = this;
  return [ HTML.Raw('<div class="container">\n        <div>\n            <h1 class="welcomeHead">WELCOME TO UTOPIA</h1>\n            <p class="welcomeSubhead">\n                Utopia is a new sovereign state and country that is being developed using a fully open-source governance operating<br> system. We are in the process of buying territories from an existing country to establish the new nation of Utopia.\n            </p>\n        </div>\n        <div class="optionFlex">\n            <div class="optionBox1">\n                <div class="optionText1"><p>Register New Identity</p></div>>\n            </div>\n            <div class="optionBox2">\n                <div class="optionText2" id="statusButton"><p>Apply for citizenship</p></div>\n            </div>\n            \n        </div> \n        <div class="scatterlogin-button">\n            <button class="scatterloginlogout" id="loginButton">login</button>\n        </div>\n    </div>\n    '), Spacebars.include(view.lookupTemplate("footer")) ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Registered.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/Registered.js                                                                           //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./Registered.html");
module.link("../../stylesheets/Registered.css");
let Eos;
module.link("eosjs", {
  default(v) {
    Eos = v;
  }

}, 0);
eosConfig = {
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
  // 32 byte (64 char) hex string
  keyProvider: ['5KeNdWYxPbUpsLUa8QT64AbjTAQeHcZejcR6shHnNi1sESgxgm7'],
  // WIF string or array of keys..
  httpEndpoint: 'https://jungle2.cryptolions.io:443',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false,
  // API activity
  sign: true
};
eos = Eos(eosConfig);
Template.Reg_success.events({
  "click .button": function () {
    var username = localStorage.getItem("username");
    eos.contract('identityreg1').then(identityreg1 => {
      identityreg1.reqcitizen(username, {
        authorization: username
      }).then(response => {
        if (response) {
          console.log("hello--", response);
        } else {
          alert("identity is not registered !!!!");
          ;
        }
      });
    });
    FlowRouter.go("/citizenship", {
      eosinstance: scatter
    });
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Voting.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/Voting.js                                                                               //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./Voting.html");
module.link("../../stylesheets/Voting.css");
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let ScatterJS;
module.link("scatterjs-core", {
  default(v) {
    ScatterJS = v;
  }

}, 1);
let Eos;
module.link("eosjs", {
  default(v) {
    Eos = v;
  }

}, 2);
const network = {
  protocol: "https",
  // Defaults to https
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
  ScatterJS.scatter.connect('utopia').then(connected => {
    if (connected) {
      if (ScatterJS.scatter.connect('utopia')) {
        scatter = ScatterJS.scatter;
        const requiredFields = {
          accounts: [network]
        };
        const eos = scatter.eos(network, Eos, eosOptions);
        eosinstance = eos;
        eos.getTableRows({
          code: "voteproposal",
          scope: "voteproposal",
          table: 'proposal11',
          limit: 50,
          json: true
        }).then(tabledata => {
          document.getElementById("upper").innerHTML = "";
          document.getElementById("proposal-group").innerHTML = "";
          var Id = FlowRouter.current().params.id;
          row = tabledata.rows[Id];

          for (var i = 0; i < row.proposal_options.length; i++) {
            var can = row.proposal_options[i];
            titledata = row.proposal_description;
            propid = row.id;
            document.getElementById("proposal-group").innerHTML += "<div class = 'redovote hover'><div class= 'candidatevote'>" + can + "</div><div class='rank'><input class='input' type='text' id='rankdata" + i + "'/></div></div>";
          }

          document.getElementById("proposal-group").innerHTML += "<button class='submit hover'>" + "submit" + "</button>";
          document.getElementById("upper").innerHTML += "<h1>" + titledata + "</h1>";
        });
      }
    } else {
      console.log("scatter not installed");
    }
  });
  Template.Vote.events({
    'click .submit': function (e) {
      var data = [];

      for (var i = 0; i < row.proposal_options.length; i++) {
        var item = $("#rankdata" + i).val();
        data.push(parseInt(item));
      }

      var username = localStorage.getItem("username");
      eosinstance.contract("voteproposal").then(voting => {
        voting.voteprop(propid, data, username, {
          authorization: username
        }).then(res => {
          console.log("response--", res);
        });
      });
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"citizenship.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/citizenship.js                                                                          //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./citizenship.html");
module.link("../../stylesheets/citizenship.css");
let Eos;
module.link("eosjs", {
  default(v) {
    Eos = v;
  }

}, 0);
eosConfig = {
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
  // 32 byte (64 char) hex string
  keyProvider: ["5KeNdWYxPbUpsLUa8QT64AbjTAQeHcZejcR6shHnNi1sESgxgm7"],
  // WIF string or array of keys..
  httpEndpoint: "https://jungle2.cryptolions.io:443",
  expireInSeconds: 60,
  broadcast: true,
  verbose: false,
  // API activity
  sign: true
};
eos = Eos(eosConfig);
Template.citizenship.onRendered(async function () {
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
        document.getElementById("heading-status").innerHTML = "You have already applied for citizenship";
      }

      if (status == 1) {
        document.getElementById("insidetext").innerHTML = "approved";
        document.getElementById("heading-status").innerHTML = "You are now a citizen of utopia!!!";
      }
    }
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"footer.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/footer.js                                                                               //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./footer.html");
module.link("../../stylesheets/footer.css");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"header.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/header.js                                                                               //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./header.html");
module.link("../../stylesheets/header.css");
Template.header.events({
  "click .proposal": function () {
    console.log("proposal link was clicked");
    FlowRouter.go("/proposal");
  },
  "click .logo": function () {
    console.log("logo was clikced");
    FlowRouter.go("/");
  },
  "click .identityText": function () {
    console.log("identity text was clicked");
  },
  "click .managerText": function () {
    console.log("manager");
    FlowRouter.go("/manager");
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"identity-reg.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/identity-reg.js                                                                         //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./identity-reg.html");
module.link("../../stylesheets/identity-reg.css");
module.link("../../pages/main/footer.js");
module.link("../main/header.js");
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 1);
module.link("../../../api/identity/methods");
let ScatterJS;
module.link("scatterjs-core", {
  default(v) {
    ScatterJS = v;
  }

}, 2);
let ScatterEOS;
module.link("scatterjs-plugin-eosjs", {
  default(v) {
    ScatterEOS = v;
  }

}, 3);
let Eos;
module.link("eosjs", {
  default(v) {
    Eos = v;
  }

}, 4);
eosConfig = {
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
  // 32 byte (64 char) hex string
  keyProvider: ['5KeNdWYxPbUpsLUa8QT64AbjTAQeHcZejcR6shHnNi1sESgxgm7'],
  // WIF string or array of keys..
  httpEndpoint: 'https://jungle2.cryptolions.io:443',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false,
  // API activity
  sign: true
};
eos = Eos(eosConfig);
const network = {
  protocol: "https",
  // Defaults to https
  blockchain: "eos",
  host: "jungle2.cryptolions.io",
  port: 443,
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
};
const eosOptions = {
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
};
var eosinstance = {};
Template.identity_reg.onCreated(function () {
  Meteor.subscribe('identity');
  ScatterJS.scatter.connect('utopia').then(connected => {
    if (connected) {
      if (ScatterJS.scatter.connect('utopia')) {
        scatter = ScatterJS.scatter;
        const requiredFields = {
          accounts: [network]
        };
        const eos = scatter.eos(network, Eos, eosOptions);

        if (scatter.identity) {
          eosinstance = eos;
        } else {
          FlowRouter.go("/");
        }
      }
    } else {
      console.log("scatter not installed");
    }
  });
}); // Setup event handling.

Template.identity_reg.events({
  'click .register': function (event) {
    event.preventDefault();
    var firstname = $('#firstname').val();
    var midname = $('#midname').val();
    var lastname = $('#lastname').val();
    var dob = $('#dob').val();
    var phonenumber = $('#phonenumber').val();
    var email = $('#email').val();
    var username = localStorage.getItem("username");
    console.log("----", username);
    eosinstance.contract('identityreg1').then(identityreg1 => {
      console.log("----", eosinstance);
      identityreg1.addidentity(username, firstname, midname, lastname, dob, phonenumber, email, {
        authorization: username
      }).then(response => {
        if (response) {
          FlowRouter.go("/reg-success");
        } else {
          alert("identity is not registered !!!!");
          ;
        }
      });
    });
  }
  /* "click #firstname":function(){
      document.getElementById("progressBar").style.width="16%";
  },
  "click #midname":function(){
      document.getElementById("progressBar").style.width="33%";
  },
  "click #lastname":function(){
      document.getElementById("progressBar").style.width="50%";
  },
  "click #dob":function(){
      document.getElementById("progressBar").style.width="66%";
  },
  "click #phonenumber":function(){
      document.getElementById("progressBar").style.width="83%";
  },
  "click #email":function(){
      document.getElementById("progressBar").style.width="100%";
  } */

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"manager.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/manager.js                                                                              //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./manager.html");
module.link("../../pages/main/footer.js");
module.link("../../stylesheets/manager.css");
let Eos;
module.link("eosjs", {
  default(v) {
    Eos = v;
  }

}, 0);
var count = 0;
eosConfig = {
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
  // 32 byte (64 char) hex string

  /* keyProvider: ["5Jur4pK1Rb8xvdfNUUZJq5JE36HQUd9PNouWwjUdbWw7cK8ZuUo"], */
  keyProvider: ["5KKodHxhrpZQhWeVTAzBJgfwGwPjkYAZdtWiWX9jaZTDL7utgKo"],
  // WIF string or array of keys..
  httpEndpoint: "https://jungle2.cryptolions.io:443",
  expireInSeconds: 60,
  broadcast: true,
  verbose: false,
  // API activity
  sign: true
};
const eos = Eos(eosConfig);
let tabledata;
let userdata;
Template.App_manager.onRendered(async function () {
  tabledata = await eos.getTableRows({
    code: "voteproposal",
    scope: "voteproposal",
    table: "proposal11",
    limit: 50,
    json: true
  });
  userdata = await eos.getTableRows({
    code: "identityreg1",
    scope: "identityreg1",
    table: "citizen",
    limit: 50,
    json: true
  });
  document.getElementById("manager-proposal-group").innerHTML = "";
  console.log("table data after rendering", tabledata);
  var id = 0;

  for (var i = 0; i < tabledata.rows.length; i++) {
    var desc = tabledata.rows[i].proposal_description;
    var proposalId = tabledata.rows[i].id;
    document.getElementById("manager-proposal-group").innerHTML += "<div class = 'manager-redo'><p>" + desc + "</p><button class = 'delete-button' id = '" + proposalId + "'>delete</button><button class = 'declare-button' id = '" + proposalId + "'>declare winner</button>" + "</div>";
  }

  if (document.getElementById("userList")) {
    for (var i = 0; i < userdata.rows.length; i++) {
      var users = userdata.rows[i].identity;
      var ids = userdata.rows[i].id;
      document.getElementById("manager-user-group").innerHTML += "<div class = 'manager-user-redo' id = '" + users + "'><p>" + users + "</p><button class = 'approved-button' id = '" + ids + "'>approved</button><button class = 'disapproved-button'id = '" + ids + "'>disapproved</button>" + "</div>";
    }
  }

  document.getElementById("userList").style.display = "none";
});
Template.App_manager.events({
  "click #userDetails": function () {
    console.log("userDetails");
    console.log("table data after rendering", userdata);
    document.getElementById("userList").style.display = "block";
    document.getElementById("proposalList").style.display = "none";
  },
  "click #proposalDetails": function () {
    console.log("proposalDetails");
    document.getElementById("userList").style.display = "none";
    document.getElementById("proposalList").style.display = "block";
    /* reqcitizen (username) */
  },
  "click .approved-button": async function () {
    console.log("helllllllloManager");
    var id = event.target.id;
    var userName = event.target.parentElement.id;
    console.log("id----", id);
    console.log("username------", userName);
    let contract = await eos.contract("identityreg1");
    console.log("===", contract);

    try {
      let res = await contract.addcitizen(id, userName, "identityreg1", {
        authorization: "identityreg1"
      });
    } catch (err) {
      console.log("----", err);
    }
  },
  "click .disapproved-button": async function () {
    console.log("helllllllloManager - disapproved");
    console.log("id----", event.target.id);
    console.log("username------", event.target.parentElement.id);
  },
  "click .delete-button": async function () {
    console.log("deleteButtonClick");
    console.log("id----", event.target.id);
    var proposalId = event.target.id;
    let contract = await eos.contract("voteproposal");
    console.log("===", contract);

    try {
      let res = await contract.delprop(proposalId, "identityreg1", {
        authorization: "identityreg1"
      });
    } catch (err) {
      console.log("----", err);
    }
  },
  "click .declare-button": async function () {
    console.log("declareButtonClick");
    console.log("id----", event.target.id);
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"newproposal.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/newproposal.js                                                                          //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./newproposal.html");
module.link("../../stylesheets/newproposal.css");
module.link("./footer.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"proposal.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/proposal.js                                                                             //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./proposal.html");
module.link("../../stylesheets/proposal.css");
let Eos;
module.link("eosjs", {
  default(v) {
    Eos = v;
  }

}, 0);
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 1);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 2);
var count = 0;
eosConfig = {
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
  // 32 byte (64 char) hex string
  keyProvider: ['5Jur4pK1Rb8xvdfNUUZJq5JE36HQUd9PNouWwjUdbWw7cK8ZuUo'],
  // WIF string or array of keys..
  httpEndpoint: 'https://jungle2.cryptolions.io:443',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false,
  // API activity
  sign: true
};
const eos = Eos(eosConfig);
Template.App_proposal.onRendered(async function () {
  let tabledata = await eos.getTableRows({
    code: "voteproposal",
    scope: "voteproposal",
    table: 'proposal11',
    limit: 50,
    json: true
  });
  document.getElementById("proposal-group").innerHTML = "";

  for (var i = 0; i < tabledata.rows.length; i++) {
    var desc = tabledata.rows[i].proposal_description;
    var votebutton = "votebutton";
    var resultbutton = "resultbutton";
    votebutton = votebutton + tabledata.rows[i].id;
    resultbutton = resultbutton + tabledata.rows[i].id;
    document.getElementById("proposal-group").innerHTML += "<div class = 'redo'><p>" + desc + "</p><button class = 'vote-button' id = '" + votebutton + "'>vote</button>" + "<button class = 'result-button' id = '" + resultbutton + "'>result</button>" + "</div>";
  }
});
Template.App_proposal.events({
  "click .new-proposal-button": function () {
    /* document.getElementById("form-section").style.display = "block";
    document.getElementById("all-proposals").style.display = "none"; */
    FlowRouter.go("/newproposal");
  },
  "click .all-proposal-button": async function () {
    /* document.getElementById("form-section").style.display = "none";
    document.getElementById("all-proposals").style.display = "block"; */

    /* let tabledata = await eos.getTableRows({
        code: "voteproposal",
        scope: "voteproposal",
        table: 'proposal13',
        limit: 50,
        json: true,
    });
    document.getElementById("proposal-group").innerHTML = "";
    console.log("table data ", tabledata);
    var id = 0;
    for(var i = 0; i< tabledata.rows.length;i++){
        var desc = tabledata.rows[i].proposal_description;
        document.getElementById("proposal-group").innerHTML += 
        "<div class = 'redo'><p>"+desc+"</p><button class = 'vote-button' id = '"+id+"'>vote</button>"+"</div>";
        id = id+1;
    } */
  },
  "click #options": function () {
    /* var boxName = "textbox" + count;
    var options = "Option";
    document.getElementById("form-group").innerHTML += "<input type = 'text' placeholder = '"+ options +"' id = '"+boxName+"'/>"
    count += 1;
     */

    /* '<input type="text" id="' + boxName + '" "  />'; */
  },
  "click #create-proposal": function () {
    /* var proposal = $("#proposal").val();
    var duration = parseInt($("#duration").val());
    var noofwinners = parseInt($("#noofwinners").val());
    var options = [];
    for (var i = 0; i < count; i++) {
        var textbox = "#textbox" + i;
        var option = $(textbox).val();
        options.push(option);
    }
    var username = localStorage.getItem("username")
    eos.contract("voting").then(voting => {
        voting.createprop(proposal, duration, options, username, noofwinners, { authorization: username }, (err, res) => {
            if (err) {
                console.log("error ", err);
            }
            else {
                console.log("Result ", res);
            }
        })
    }) */
  },
  "click .vote-button": function (event) {
    event.preventDefault();
    var id = event.target.id;
    id = id[id.length - 1];
    FlowRouter.go("/vote/" + id);
  },
  "click .result-button": function (event) {
    event.preventDefault();
    var id = event.target.id;
    id = id[id.length - 1];
    FlowRouter.go("/result/" + id);
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"result.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/result.js                                                                               //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./result.html");
module.link("../../stylesheets/result.css");
module.link("./footer.js");
let Eos;
module.link("eosjs", {
  default(v) {
    Eos = v;
  }

}, 0);
eosConfig = {
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
  // 32 byte (64 char) hex string
  keyProvider: ['5Jur4pK1Rb8xvdfNUUZJq5JE36HQUd9PNouWwjUdbWw7cK8ZuUo'],
  // WIF string or array of keys..
  httpEndpoint: 'https://jungle2.cryptolions.io:443',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false,
  // API activity
  sign: true
};
const eos = Eos(eosConfig);
Template.App_result.helpers({
  /* calcvote: async function () {
      var result = [];
      var length = 0;
      var id = FlowRouter.current().params.id;
      console.log("id: ", id);
      let resultdata = await eos.getTableRows({
          code: "voteproposal",
          scope: "voteproposal",
          table: "votes13",
          limit: "50",
          json: true,
          key_type: "i64",
          index_position: 2
      });
       let candidatedata = await eos.getTableRows({
          code: "voteproposal",
          scope: "voteproposal",
          table: "proposal11",
          limit: "50",
          json: true,
      });
      console.log("resultdata ", resultdata);
      console.log("candidate data: ", candidatedata);
       //getting the length of list of all choices for a  particular proposal
      var length = 0;
      for (var i = 0; i < resultdata.rows.length; i++) {
          if (id == resultdata.rows[i].proposal_id) {
              length = resultdata.rows[i].choices.length;
              break;
          }
      }
       //creating a 2d array and setting initial votes to 0
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
          if (id == resultdata.rows[i].proposal_id) {
              input.push(resultdata.rows[i].choices)
          }
      }
      for(var i=0;i<input.length;i++){
          for(j=0;j<input[i].length;j++){
              var val = input[i][j];
              result[j][val-1] += 1;
          }
      }
  
      console.log("result after calculating ", result);
      return result[0];
   }, */
});
Template.App_result.onRendered(async function () {
  var result = [];
  var length = 0;
  var id = FlowRouter.current().params.id;
  console.log("id: ", id);
  let resultdata = await eos.getTableRows({
    code: "voteproposal",
    scope: "voteproposal",
    table: "votes13",
    limit: "50",
    json: true
    /* key_type: "i64",
    index_position: 2 */

  });
  let candidatedata = await eos.getTableRows({
    code: "voteproposal",
    scope: "voteproposal",
    table: "proposal11",
    limit: "50",
    json: true
  });
  console.log("resultdata ", resultdata); //getting the length of list of all choices for a  particular proposal

  var length = 0;

  for (var i = 0; i < resultdata.rows.length; i++) {
    if (id == resultdata.rows[i].proposal_id) {
      length = resultdata.rows[i].choices.length;
      break;
    }
  } //creating a 2d array to store who got how many votes based on rank 


  for (var i = 0; i < length; i++) {
    result[i] = [];
  }

  for (var i = 0; i < length; i++) {
    for (var j = 0; j < length; j++) {
      result[i][j] = 0;
    }
  }

  var input = []; //creating a 2d array of total votes received 

  for (var i = 0; i < resultdata.rows.length; i++) {
    if (id == resultdata.rows[i].proposal_id) {
      input.push(resultdata.rows[i].choices);
    }
  } // calculaing votes based on ranks
  //j is the candidate and val-1 is the total votes received for the rank


  for (var i = 0; i < input.length; i++) {
    for (j = 0; j < input[i].length; j++) {
      var val = input[i][j];
      result[j][val - 1] += 1;
    }
  }

  var desc;
  var proposaldetail;

  for (var i = 0; i < candidatedata.rows.length; i++) {
    if (id == candidatedata.rows[i].id) {
      desc = candidatedata.rows[i].proposal_description;
      proposaldetail = candidatedata.rows[i].proposal_detail;
      break;
    }
  }

  console.log("proposal description : ", desc);
  document.getElementById("proposal-desc").innerHTML = desc;
  document.getElementById("proposal-detail").innerHTML = proposaldetail;

  for (var i = 0; i < candidatedata.rows.length; i++) {
    if (id == candidatedata.rows[i].id) {
      for (var j = 0; j < candidatedata.rows[i].proposal_options.length; j++) {
        var val = candidatedata.rows[i].proposal_options[j];
        document.getElementById("proposal-result-name").innerHTML += "<br><div class = 'ep'>" + val + "</div>";
      }
    }
  }

  console.log("candidatedata", candidatedata);
  console.log("result after calculating ", result);
  /* for(var i=0;i<result.length;i++){
      document.getElementById("proposal-result-votes").innerHTML +="<br><div class = 'ep'>"+ result[i].toString().replace(/,/g, '/')+"</div>";
      
  } */

  for (var i = 0; i < result.length; i++) {
    document.getElementById("proposal-result-votes").innerHTML += "<br><div class = 'ep2'></div>";

    for (var j = 0; j < result[i].length; j++) {
      var val = result[i][j];
      document.getElementsByClassName("ep2")[i].innerHTML += "<div class = 'vote-stat'>" + val + "</div>";
    }
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"welocomePage.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/pages/main/welocomePage.js                                                                         //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./welcomePage.html");
module.link("../../stylesheets/utopiaIdentity.css");
module.link("../../pages/main/header.js");
module.link("../../pages/main/footer.js");
let ScatterJS;
module.link("scatterjs-core", {
  default(v) {
    ScatterJS = v;
  }

}, 0);
let ScatterEOS;
module.link("scatterjs-plugin-eosjs", {
  default(v) {
    ScatterEOS = v;
  }

}, 1);
let Eos;
module.link("eosjs", {
  default(v) {
    Eos = v;
  }

}, 2);
ScatterJS.plugins(new ScatterEOS());
const network = {
  protocol: "https",
  // Defaults to https
  blockchain: "eos",
  host: "jungle2.cryptolions.io",
  port: 443,
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
};
const eosOptions = {
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
};
eosConfig = {
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
  // 32 byte (64 char) hex string
  keyProvider: ['5KeNdWYxPbUpsLUa8QT64AbjTAQeHcZejcR6shHnNi1sESgxgm7'],
  // WIF string or array of keys..
  httpEndpoint: 'https://jungle2.cryptolions.io:443',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false,
  // API activity
  sign: true
};
eos = Eos(eosConfig);
Template.welcomePage.onCreated(function bodyOnCreated() {
  ScatterJS.scatter.connect('utopia').then(connected => {
    if (connected) {
      if (ScatterJS.scatter.connect('utopia')) {
        scatter = ScatterJS.scatter;
        const requiredFields = {
          accounts: [network]
        };
        const eos = scatter.eos(network, Eos, eosOptions);

        if (scatter.identity) {
          const acc = scatter.identity.accounts.find(x => x.blockchain === 'eos');
          const account = acc.name;
          localStorage.setItem("loginstatus", JSON.stringify(true));
          localStorage.setItem("username", account);
          console.log("inside created----1", localStorage.getItem("loginstatus"));
          document.getElementById("loginButton").innerHTML = "logout";
          document.getElementsByClassName("optionFlex")[0].style.display = "flex";
        } else {
          localStorage.setItem("loginstatus", JSON.stringify(false));
          localStorage.setItem("username", "");
          console.log("inside created----2", localStorage.getItem("loginstatus"));
          document.getElementById("loginButton").innerHTML = "login";
          document.getElementsByClassName("optionFlex")[0].style.display = "none";
        }
      }
    } else {
      console.log("scatter not installed");
    }
  });
});
Template.welcomePage.events({
  "click .optionText1": function () {
    FlowRouter.go("/identity-reg", {
      data: "scatter"
    });
  },
  'click .scatterloginlogout': function (event, instance) {
    if (!JSON.parse(localStorage.getItem("loginstatus"))) {
      ScatterJS.scatter.connect('utopia').then(connected => {
        if (!connected) return false;
        scatter = ScatterJS.scatter;
        const requiredFields = {
          accounts: [network]
        };
        const eos = scatter.eos(network, Eos, eosOptions);
        scatter.getIdentity(requiredFields).then(() => {
          const acc = scatter.identity.accounts.find(x => x.blockchain === 'eos');
          const account = acc.name;
          localStorage.setItem("username", account);
          console.log("inlogin");
          localStorage.setItem("loginstatus", JSON.stringify(true));
          localStorage.setItem("username", account);
          document.getElementById("loginButton").innerHTML = "logout";
          document.getElementsByClassName("optionFlex")[0].style.display = "flex";
        }).catch(error => {
          console.error(error);
        });
      });
    } else {
      console.log("2-----------------");
      ScatterJS.scatter.forgetIdentity().then(() => {
        localStorage.setItem("loginstatus", JSON.stringify(false));
        console.log("----", localStorage.getItem("loginstatus"));
        document.getElementById("loginButton").innerHTML = "login";
        localStorage.setItem("username", "");
        console.log("logout");
        document.getElementsByClassName("optionFlex")[0].style.display = "none";
      });
    }
  }
});
Template.welcomePage.events({
  "click .optionText2": function () {
    var username = localStorage.getItem("username");
    eos.contract('identityreg1').then(identityreg1 => {
      identityreg1.reqcitizen(username, {
        authorization: username
      }).then(response => {
        if (response) {
          console.log("hello--", response);
        } else {
          alert("identity is not registered !!!!");
          ;
        }
      });
    });
    FlowRouter.go("/citizenship", {
      eosinstance: scatter
    });
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"stylesheets":{"Registered.css":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/stylesheets/Registered.css                                                                         //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.exports = require("meteor/modules").addStyles(
  "body {\n    padding: 0px;\n    margin: 0px;\n  }\n  \n  .container-i {\n    width: 90%;\n    margin-left: auto;\n    margin-right: auto;\n  \n    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.2);\n  }\n  \n  .heading-i {\n    flex: 1;  \n    display: flex;\n    margin: 120px;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n  .heading-i .heading-reg {\n  flex:1;\n  font-family: Colfax Medium;\n  line-height: 24px;\n  font-size: 32px;\n  text-align: center;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  background: #04030F;\n  color: #FFFFFF;\n  }\n  .id{\n  flex: 1;\n  margin-top: 20px;\n  font-family: Colfax Medium;\n  line-height: 14px;\n  font-size: 18px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: #FFFFFF;\n  opacity: 0.25;\n  }\n  .idfield{\n    margin-top: 50px;\n    height: 134px;\n    width: 370px;\n    flex:1;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n  .button{\n    height: 70px;\n    width: 370px;\n    font-family: Colfax;\n    line-height: 14px;\n    font-size: 18px;\n    letter-spacing: 1.5px;\n    text-transform: uppercase;\n    color: #FFFFFF;\n    background: #04030F;\n    border-image: linear-gradient(169.59deg, #3023AE -36.97%, #C86DD7 148.62%);    \n    border-image-slice: 1;\n    cursor: pointer;\n  }\n  .buttonfield{\n    flex:1;\n    margin-top: 50px;\n  }\n  .back\n  {\n    width: 370px;\n    height: 63px;\n    background-image: url(\"/img/optionBox2.png\");\n  }\n  .text{\n    flex: 1;\n  }\n  .insidetext{\n    width: 370px;\n    background: #04030F;\n    border: 0px;\n    border-bottom : 2px solid #FFFFFF;\n  }"
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Voting.css":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/stylesheets/Voting.css                                                                             //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.exports = require("meteor/modules").addStyles(
  ".proposal-container{\n    width: 90%;\n    max-width: 1140px;\n    margin: 0 auto;\n}\n\nh1{\n    color: white;\n    text-align: center;\n}\n.tabhead{\n    margin-top: 80px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    \n}\n.candidatevote{\nflex: 1;\ncolor: white;\ntext-align: center;\nfont-size: 20px;\n}\n.rank{\nflex: 1;\ncolor: white;\ntext-align: center;\n}\n.submit{\n    flex: 1;\n    margin-top: 80px;\n    height: 51px;\n    width: 255px; \n    background: white;\n    box-shadow: 5px 2px 40px rgba(0, 0, 0, 0.2);\n    border-radius: 6px;\n    border: 0px;\n   font-family: Colfax Medium;\n   line-height: 12px;\n   font-size: 14px;\n   letter-spacing: 0.6px;\n   text-transform: uppercase;\n   color: #04030F;\n   cursor: pointer;\n\n}\n.submit:hover{\n    background: linear-gradient(169.59deg, #3023AE -36.97%, #C86DD7 148.62%);\n}\n\n.redovote:hover{\n    background: linear-gradient(169.59deg, #3023AE -36.97%, #C86DD7 148.62%);\n}\n\n\n.input{\n    text-align: left;\n    font-size: 20px;\n    border: 0px;\n    background: #04030F;\n    border-bottom: 2px solid white;\n    color: white;\n}\n.belowvote-section{\n    width: 100%;\n    margin-top: 5%;\n}\n.allvote-proposals{\n  /*   display: none; */\n  display: block;\n    width: 100%;\n}\n\n.proposalvote-group{\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n}\n.redovote{\n    margin-top: 10px;\n    height: 70px;\n    width: 100%;\n    background: #04030F;\n    display: flex;\n}\n\n.vote-button{\n    height: 50%;\n    width: 100px;\n    margin-right: 3%;\n}\n"
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"citizenship.css":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/stylesheets/citizenship.css                                                                        //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.exports = require("meteor/modules").addStyles(
  "body {\n    padding: 0px;\n    margin: 0px;\n  }\n  \n  .container-i {\n    width: 90%;\n    margin-left: auto;\n    margin-right: auto;\n  \n    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.2);\n  }\n  \n  .heading-i {\n    flex: 1;  \n    display: flex;\n    margin: 120px;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n  .heading-i .heading-reg {\n  flex:1;\n  font-family: Colfax Medium;\n  line-height: 24px;\n  font-size: 32px;\n  text-align: center;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  background: #04030F;\n  color: #FFFFFF;\n  }\n  .id{\n  flex: 1;\n  margin-top: 20px;\n  font-family: Colfax Medium;\n  line-height: 14px;\n  font-size: 18px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: #FFFFFF;\n  opacity: 0.25;\n  }\n  .idfield{\n    margin-top: 50px;\n    height: 134px;\n    width: 370px;\n    flex:1;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n  .button{\n    height: 70px;\n    width: 370px;\n    font-family: Colfax;\n    line-height: 14px;\n    font-size: 18px;\n    letter-spacing: 1.5px;\n    text-transform: uppercase;\n    color: #FFFFFF;\n    background: #04030F;\n    border-image: linear-gradient(169.59deg, #3023AE -36.97%, #C86DD7 148.62%);    \n    border-image-slice: 1;\n  }\n  .buttonfield{\n    flex:1;\n    margin-top: 50px;\n  }\n  .back\n  {\n    width: 370px;\n    height: 63px;\n    background-image: url(\"/img/optionBox2.png\");\n  }\n  .text{\n    flex: 1;\n\n  }\n  #insidetext{\n    width: 370px;\n    background: #04030F;\n    border: 0px;\n    font-size: 18px;\n    font-weight: bold;\n    text-transform: uppercase;\n    line-height: 54px;\n    border-bottom : 2px solid #FFFFFF;\n    text-align: center;\n    color:white;\n  }\n"
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"footer.css":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/stylesheets/footer.css                                                                             //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.exports = require("meteor/modules").addStyles(
  ".container {\n  max-width: 1440px;\n  width: 90%;\n  margin-left: auto;\n  margin-right: auto;\n}\n.footerText {\n  font-family: Colfaxn Regular;\n  line-height: 19px;\n  font-size: 18px;\n  letter-spacing: 1px;\n  display:flex;\n  justify-content: center;\n  text-transform: uppercase;\n  color: #ffffff;\n  margin-top:5%;\n  padding-bottom:5%;\n}\n"
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"header.css":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/stylesheets/header.css                                                                             //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.exports = require("meteor/modules").addStyles(
  ".container {\n  width: 90%;\n  max-width: 1140px;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 3%;\n}\n\n.header {\n  display: flex;\n}\n.logoSection {\n  flex: 6;\n}\n.logoSection .logo {\n  width: 140px;\n  height: 48px;\n  background-image: url(\"/img/utopiaLogo.png\");\n  background-size: 100% 100%;\n  cursor: pointer;\n}\n.identitySection {\n  flex: 4;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n.identitySection .identityText {\n  font-family: Colfax Black;\n  line-height: 19px;\n  font-size: 18px;\n  text-align: center;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #ffffff;\n  margin-right: 5%;\n  cursor: pointer;\n}\n.identitySection .managerText {\n  font-family: Colfax Black;\n  line-height: 19px;\n  font-size: 18px;\n  text-align: center;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #ffffff;\n  margin-right: 5%;\n  cursor: pointer;\n}\n\n\n.headLineBoundary{\n  max-width: 100%;\n  margin-top:3%;\n  height: 1px;\n  left: 0px;\n  top: 160px;\n  background: #FFFFFF;\n  opacity: 0.25;\n} \n\n.proposal{\n  font-family: Colfax Black;\n  line-height: 19px;\n  font-size: 18px;\n  text-align: center;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #ffffff;\n  margin-right: 5%;\n  cursor: pointer;\n}\n\n"
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"identity-reg.css":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/stylesheets/identity-reg.css                                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.exports = require("meteor/modules").addStyles(
  ".identity-container{\n  width: 90%;\n  max-width: 1140px;\n  margin: 0 auto;\n  margin-top: 5%;\n}\n\nh1{\n  text-transform: uppercase;\n  text-align: center;\n}\n\n.registration-form{\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  margin-top: 5%;\n}\n\n.registration-form .row1{\n  flex: 1;\n  display: flex;\n  justify-content: space-between;\n}\n\n.registration-form .row1 input{\n  width: 29%;\n  height: 50px;\n  background: transparent;\n  border :0;\n  border-bottom : 2px solid #aaa;\n  color: white;\n  font-weight: bold;\n  font-size: 18px;\n  line-height: 14px;\n  font-family: Colfax Medium;\n  letter-spacing: 1.6px;\n  text-transform: uppercase;\n}\n\n.registration-form .row2{\n  flex: 1;\n  display: flex;\n  justify-content: space-between;\n  margin-top: 5%;\n}\n\n.registration-form .row2 input{\n  width: 29%;\n  height: 50px;\n  background: transparent;\n  border :0;\n  border-bottom : 2px solid #aaa;\n  color: white;\n  font-weight: bold;\n  font-size: 18px;\n  line-height: 14px;\n  font-family: Colfax Medium;\n  letter-spacing: 1.6px;\n  text-transform: uppercase;\n}\n\ninput:focus{\n  outline: none;\n}\n\n::placeholder{\n  font-size: 18px;\n  text-transform: uppercase;\n  font-family: Colfax Medium;\n  letter-spacing: 1.6px;\n}\n\n\n.registration-form input:hover{\n  border-bottom : 2px solid #fff;\n  transition: 0.5s;\n}\n\n.registration-form .row3{\n  margin-top: 5%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.row3 .upload-picture{\n  width: 300px;\n  height: 70px;\n  font-size: 18px;\n  font-family: Colfax Medium;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  line-height: 14px;\n  color :#aaa;\n  background: transparent;\n  border: 2px dashed #aaa;\n}\n\n.row3 .register{\n  width: 300px;\n  height: 70px;\n  margin-top: 5%;\n  font-size: 18px;\n  font-family: Colfax Medium;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  line-height: 14px;\n  color :#aaa;\n  background: transparent;\n  border: 2px dashed #aaa;\n  \n}\n\n.row3 button:hover{\n  border: 2px solid #C86DD7;\n  color: white;\n  transition: 0.5s;\n}\n\ninput:hover::-webkit-input-placeholder {\n  color: white;\n  transition: 0.5s\n}"
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"manager.css":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/stylesheets/manager.css                                                                            //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.exports = require("meteor/modules").addStyles(
  ".manager-container{\n    max-width:1440px;\n    width:90%;\n    margin: 5% auto 0 auto;\n    margin-bottom:10%;\n    color:black;\n\n}\n.manager-container h1{\n    font-family: Colfax Medium;\n    letter-spacing: 1px;\n    margin-bottom:5%;\n}\n.flexOption{\n    display:flex;\n}\n.flexOption button{\n    flex:1;\n    display:flex;\n    justify-content: center;\n    align-content: center;\n    height: 48px;\n    text-transform: uppercase;\n    font-weight: bold;\n    cursor:pointer;\n}\n.flexOption button:hover{\n    background:gray;\n    transition: 0.5s;\n}\n.manager-below-section{\n    width: 100%;\n    margin-top: 3%;  \n}\n.manager-all-proposals{\n    width: 100%;\n}\n \n\n/* -------------------------Proposal------------------------------- */\n.manager-proposal-group{\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n.delete-button{\n    height: 50%;\n    width: 100px;\n    margin-right: 3%;\n    border:0px;\n    font-weight: bold;\n    cursor: pointer;\n    \n}\n.delete-button:hover{\n    background:red;\n    color:white;\n    transition: 0.25s;\n    opacity:0.75;\n}\n.declare-button{\n    height: 50%;\n    width: 200px;\n    margin-right: 3%;\n    border:0px;\n    font-weight: bold;\n    cursor: pointer;\n}\n.declare-button:hover{\n    background:green;\n    color:white;\n    transition: 0.25s;\n    opacity:0.75;\n}\n\n.manager-redo{\n    margin-top: 10px;\n    width: 100%;\n    height: 70px;\n    background: white;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n.manager-redo p{\n    flex: 8;\n}\n\n.manager-redo button{\n    flex: 1;\n    margin-right: 2%;\n}\n\n.manager-delete-button{\n    height: 50%;\n    width: 100px;\n}\n\n.manager-declare-button{\n    height: 50%;\n    width: 100px;\n}\n\n.manager-redo p{\n    margin-left: 3%;\n}\n\n\n/* -------------------------------USER-------------------------------------- */\n\n\n.manager-user-group{\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n.approved-button{\n    height: 50%;\n    width: 100px;\n    margin-right: 3%;\n    border:0px;\n    font-weight: bold;\n    cursor: pointer;\n}\n.approved-button:hover{\n    background:green;\n    color:white;\n    transition: 0.25s;\n    opacity:0.75;\n}\n.disapproved-button{\n    height: 50%;\n    width: 200px;\n    margin-right: 3%;\n    border:0px;\n    font-weight: bold;\n    cursor: pointer;\n}\n.disapproved-button:hover{\n    background:red;\n    color:white;\n    transition: 0.25s;\n    opacity:0.75;\n}\n\n.manager-user-redo{\n    margin-top: 10px;\n    width: 100%;\n    height: 70px;\n    background: white;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n.manager-user-redo p{\n    flex: 8;\n}\n\n.manager-user-redo button{\n    flex: 1;\n    margin-right: 2%;\n}\n\n.manager-aproved-button{\n    height: 50%;\n    width: 100px;\n}\n\n.manager-disapproved-button{\n    height: 50%;\n    width: 100px;\n}\n\n.manager-user-redo p{\n    margin-left: 3%;\n}"
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"newproposal.css":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/stylesheets/newproposal.css                                                                        //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.exports = require("meteor/modules").addStyles(
  ".new-proposal-container{\n    max-width: 1140px;\n    width: 90%;\n    margin: 5% auto 0 auto;\n    color: white;\n}\n\n.new-proposal-container h1{\n    text-align: left;\n    font-family: Colfax Medium;\n    letter-spacing: 1px;\n}\n\n.proposal-form{\n    display: flex;\n    flex-direction: column;\n}\n\n.proposal-form label{\n    margin-top: 5%;\n    color: gray;\n    font-size: 18px;\n    line-height: 14px;\n    letter-spacing: 1.5px;\n    text-transform: uppercase;\n}\n\n.proposal-form input{\n    background: transparent;\n    width: 100%;\n    border: 0;\n    border-bottom: 2px solid gray;\n    font-family: Colfax Medium;\n    color: white;\n    font-size: 18px;\n    letter-spacing: 1.5px;\n    text-transform: uppercase;\n    line-height: 14px;\n}\n\n.proposal-form input:hover{\n    border-bottom: 2px solid white;\n    transition: 0.5s;\n}"
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"proposal.css":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/stylesheets/proposal.css                                                                           //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.exports = require("meteor/modules").addStyles(
  ".proposal-container{\n    width: 90%;\n    max-width: 1140px;\n    margin: 0 auto;\n}\n\nh1{\n    color: white;\n    text-align: center;\n}\n\n.button-group{\n    display: flex;\n    justify-content: space-around;\n}\n\n.new-proposal-button{\n    width: 255px;\n    height: 50px;\n    border: 0;\n    background-image: linear-gradient(to bottom, #3023AE, #C86DD7);\n    color: white;\n    text-transform: uppercase;\n    font-weight: bold;\n}\n\n.all-proposal-button{\n    width: 255px;\n    height: 50px;\n    border: 0;\n    background-image: linear-gradient(to bottom, #3023AE, #C86DD7);\n    color: white;\n    text-transform: uppercase;\n    \n}\n\n.below-section{\n    width: 100%;\n    margin-top: 5%;\n}\n\n.form-section{\n    width: 100%;\n    display: none;\n}\n\n.form-group{\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\ninput{\n    width: 30%;\n    height: 40px;\n    margin-top: 10px;\n    background: #aaa;\n}\n\n.all-proposals{\n    width: 100%;\n}\n\n.proposal-group{\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    color: white;\n}\n\n.redo{\n    margin-top: 10px;\n    width: 60%;\n    height: 70px;\n    background: white;\n    display: flex;\n    align-items: center;\n    color: black;\n}\n\n.redo p{\n    flex: 8;\n}\n\n.redo button{\n    flex: 1;\n    margin-right: 2%;\n}\n\n.vote-button{\n    height: 50%;\n    width: 100px;\n}\n\n.result-button{\n    height: 50%;\n    width: 100px;\n}\n\n.redo p{\n    margin-left: 3%;\n}\n\n.button-group-form{\n    display: flex;\n    justify-content: center;\n    margin-top: 10px;\n}\n\n#options{\n    margin-right: 15px;\n    height: 48px;\n    width: 100px;\n    border: 0px;\n    font-weight: bold;\n    text-transform: uppercase;\n    background: white;\n}\n\n#create-proposal{\n    margin-left: 15px;\n    height: 48px;\n    width: 200px;\n    border: 0px;\n    font-weight: bold;\n    text-transform: uppercase;\n    background: white;\n}"
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"result.css":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/stylesheets/result.css                                                                             //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.exports = require("meteor/modules").addStyles(
  ".result-container{\n    width: 90%;\n    max-width: 1140px;\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 5%;\n    color: white;\n}\n\n.candidate{\n    margin-top: 10px;\n    margin-bottom: 20px;\n    width: 0px;\n    height: 10px;\n    color: white;\n    font-family: Colfax Medium;\n}\n\n#proposal-result{\n    display: flex;\n    justify-content: center;\n    border: 1px solid white;\n    padding: 3% 0;\n}\n\n#proposal-result-name{\n    flex: 1;\n    display: flex;\n    align-items: flex-end;\n    flex-direction: column;\n    margin-right: 5%;\n}\n\n#proposal-result-votes{\n    flex: 1;\n    display: flex;\n    align-items: flex-start;\n    flex-direction: column;\n    margin-left: 5%;\n}\n\n.ep{\n    text-align: center;\n    border: 1px solid white;\n    width: 30%;\n    height: 25px;\n    line-height: 25px;\n    font-weight: bold;\n    text-transform: capitalize;\n}\n\n.ep:hover{\n    background: white;\n    color: black;\n    transition: 0.35s;\n}\n\n.ep2{\n    text-align: center;\n    border: 1px solid white;\n    width: 30%;\n    line-height: 25px;\n    height: 25px;\n    display: flex;\n    justify-content: space-between;\n}\n\n.vote-stat{\n    width: 18%;\n    text-align: center;\n    border: 1px solid white;\n}\n\n#proposal-desc{\n    text-align: center;\n    font-weight: bolder;\n    font-size: 18px;\n    text-transform: uppercase;\n    font-family: Colfax Medium;\n    letter-spacing: 2px;\n}\n\n#proposal-detail{\n    text-align: center;\n    font-weight: bolder;\n    font-size: 18px;\n    text-transform: uppercase;\n    font-family: Colfax Medium;\n    letter-spacing: 2px;\n}\n\n"
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"utopiaIdentity.css":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/ui/stylesheets/utopiaIdentity.css                                                                     //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.exports = require("meteor/modules").addStyles(
  "/* ===================================== Welcome_Page-CSS ================================= */\n.container {\n  max-width: 90%;\n  margin-left: auto;\n  margin-right: auto;\n  background: #04030f;\n  margin-top:7%;\n}\n.welcomeHead {\n  font-family: Colfax Light;\n  line-height: 23px;\n  font-size: 36px;\n  text-align: center;\n  letter-spacing: 0.942857px;\n  text-transform: uppercase;\n  color: white;\n}\n.welcomeSubhead {\n  font-family: Colfax Regular;\n  line-height: 36px;\n  font-size: 16px;\n  text-align: center;\n  letter-spacing: 1px;\n  margin-top:5%;\n  color: #ffffff;\n}\n\n.optionFlex {\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 5%;\n}\n.optionFlex p {\n  text-align: center;\n}\n.optionBox1 {\n  flex: 1;\n  display: flex;\n  justify-content: flex-end;\n}\n.optionBox1 div {\n  width: 318px;\n  height: 63px;\n  margin-right: 36px;\n  background-image: url(\"/img/optionBox.png\");\n}\n.optionBox2 {\n  flex: 1;\n  display: flex;\n  justify-content: flex-start;\n}\n.optionBox2 div {\n  width: 370px;\n  height: 63px;\n  margin-left: 36px;\n  background-image: url(\"/img/optionBox2.png\");\n}\n.optionText1 {\n  font-family: Colfax Regular;\n  font-size: 22px;\n  line-height: 23px;\n  text-transform: uppercase;\n  color: #ffffff;\n  cursor: pointer;\n}\n.optionText2 {\n  font-family: Colfax Regular;\n  font-size: 22px;\n  line-height: 23px;\n  text-transform: uppercase;\n  color: #ffffff;\n  cursor: pointer;\n}\n\n.scatterlogin-button {\n  margin-top: 5%;\n  display: flex;\n  justify-content: center;\n}\n\n.scatterlogin-button button {\n  background: white;\n  border: 0px;\n  color: black;\n  text-transform: capitalize;\n  width: 250px;\n  height: 50px;\n  font-weight: bold;\n}\n\n@media only screen and (max-width: 600px) {\n  .optionFlex {\n    flex-direction: column;\n  }\n  .optionBox1 .optionText {\n    margin: 0 auto;\n  }\n  .optionBox2 .optionText {\n    margin: 0 auto;\n  }\n}\n"
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"api":{"identity":{"collection.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/api/identity/collection.js                                                                            //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.export({
  Identity: () => Identity
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Identity = new Mongo.Collection('identity');
Identity.schema = new SimpleSchema({
  identity_name: {
    type: String
  },
  name: {
    type: String
  },
  dob: {
    type: String
  },
  citizenship: {
    type: String
  },
  contact: {
    type: String
  },
  email: {
    type: String
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/api/identity/methods.js                                                                               //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Identity;
module.link("./collection", {
  Identity(v) {
    Identity = v;
  }

}, 1);

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('identity', function tasksPublication() {
    return Identity.find();
  });
}

Meteor.methods({
  'user.insert'(name, dob, city, contact, email) {
    console.log("inside insert", name);
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"startup":{"client":{"route.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// imports/startup/client/route.js                                                                               //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
let FlowRouter;
module.link("meteor/kadira:flow-router", {
  FlowRouter(v) {
    FlowRouter = v;
  }

}, 0);
let BlazeLayout;
module.link("meteor/kadira:blaze-layout", {
  BlazeLayout(v) {
    BlazeLayout = v;
  }

}, 1);
module.link("../../ui/pages/main/welocomePage.js");
module.link("../../ui/pages/main/identity-reg.js");
module.link("../../ui/layouts/body/body.js");
module.link("../../ui/pages/main/proposal.js");
module.link("../../ui/pages/main/Registered.js");
module.link("../../ui/pages/main/Voting.js");
module.link("../../ui/pages/main/citizenship.js");
module.link("../../ui/pages/main/newproposal.js");
module.link("../../ui/pages/main/manager.js");
module.link("../../ui/pages/main/result.js");
FlowRouter.route('/', {
  name: 'welocomePage',

  action() {
    BlazeLayout.render('App_body', {
      main: 'welcomePage'
    });
  }

});
FlowRouter.route('/vote/:id', {
  name: 'Vote',

  action() {
    BlazeLayout.render('App_body', {
      main: 'Vote'
    });
  }

});
FlowRouter.route('/identity-reg', {
  name: 'identity-reg',

  action() {
    BlazeLayout.render('App_body', {
      main: 'identity_reg'
    });
  }

});
FlowRouter.route('/reg-success', {
  name: 'Reg-success',

  action() {
    BlazeLayout.render('App_body', {
      main: 'Reg_success'
    });
  }

});
FlowRouter.route('/proposal', {
  name: "proposal-page",

  action() {
    BlazeLayout.render('App_body', {
      main: 'App_proposal'
    });
  }

});
FlowRouter.route('/citizenship', {
  name: "citizenship",

  action() {
    BlazeLayout.render('App_body', {
      main: 'citizenship'
    });
  }

});
FlowRouter.route('/newproposal', {
  name: "newproposal",

  action() {
    BlazeLayout.render('App_body', {
      main: 'App_newproposal'
    });
  }

});
FlowRouter.route('/manager', {
  name: "manager",

  action() {
    BlazeLayout.render('App_body', {
      main: 'App_manager'
    });
  }

});
FlowRouter.route('/result/:id', {
  name: "result",

  action(params) {
    var cont = params.id;
    BlazeLayout.render('App_body', {
      main: 'App_result',
      id: cont
    });
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"client":{"main.html":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// client/main.html                                                                                              //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./template.main.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.main.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// client/template.main.js                                                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //

Template.body.addContent((function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("header")), "\n  ", Spacebars.include(view.lookupTemplate("App_body")) ];
}));
Meteor.startup(Template.body.renderToDocument);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// client/main.js                                                                                                //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
module.link("./main.html");
module.link("../imports/ui/pages/main/welocomePage.js");
module.link("../imports/ui/pages/main/header.js");
module.link("../imports/ui/pages/main/identity-reg.js");
module.link("../imports/ui/layouts/body/body.js");
module.link("../imports/startup/client/route.js");
module.link("../imports/ui/pages/main/footer.js");
module.link("../imports/ui/pages/main/citizenship.js");
module.link("../imports/ui/pages/main/manager.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});

var exports = require("/client/main.js");