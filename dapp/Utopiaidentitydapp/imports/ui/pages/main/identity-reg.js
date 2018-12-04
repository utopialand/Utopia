import "./identity-reg.html";
import "../../stylesheets/identity-reg.css";
import "../../pages/main/footer.js"
import "../main/header.js"
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../../../api/identity/methods';
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import Eos from "eosjs";
eosConfig = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
    keyProvider: ['5KeNdWYxPbUpsLUa8QT64AbjTAQeHcZejcR6shHnNi1sESgxgm7'],
    // WIF string or array of keys..
    httpEndpoint: 'https://jungle2.cryptolions.io:443',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
}
eos = Eos(eosConfig)


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


var eosinstance = {};
Template.identity_reg.onCreated(function () {

    Meteor.subscribe('identity');
    ScatterJS.scatter.connect('utopia').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);
                if (scatter.identity) {
                    eosinstance = eos;
                } else {
                    FlowRouter.go("/");
                }
            }
        } else {
            console.log("scatter not installed")
        }
    });
});

// Setup event handling.
Template.identity_reg.events({
    'click .register': function (event) {
        event.preventDefault();
        var firstname = $('#firstname').val();
        var midname = $('#midname').val();
        var lastname = $('#lastname').val();
        var dob = $('#dob').val();
        var phonenumber = $('#phonenumber').val();
        var email = $('#email').val();
        var username = localStorage.getItem("username")
        console.log("----", username);
        eosinstance.contract('identityreg1').then(identityreg1 => {
            console.log("----", eosinstance);
            identityreg1.addidentity(username, firstname, midname, lastname, dob, phonenumber, email, { authorization: username }).then((response) => {
                if (response) {
                    FlowRouter.go("/reg-success");
                } else {
                    alert("identity is not registered !!!!");;
                }

            });

        })
    },
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

