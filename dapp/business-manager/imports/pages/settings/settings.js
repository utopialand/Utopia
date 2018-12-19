import "./settings.html";
import "./settings.css";
import "../../templates/header/header.js";
import "../../templates/footer/footer.js";
import Eos from "eosjs";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import fs from "fs";
import { ReactiveVar } from 'meteor/reactive-var'

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

var scatter = {};
var eosinstance = {};
const initaPublic = 'EOS8XEBtw6eh9BUKANzxTZqTRwu3isPsJwuz6yhHEH6cfAsekHBPP';
/* var wasmPath = "../../../eos_contracts/BancorConverter/BancorConverter.wasm"
var abiPath = "../../../eos_contracts/BancorConverter/BancorConverter.abi"
const wasm = fs.readFile(wasmPath)
const abi = fs.readFile(abiPath) */

Template.App_business_settings.onRendered(function () {
    ScatterJS.scatter.connect('businessManager').then((connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('businessManager')) {
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
// why is git not?

Template.App_business_settings.events({
    "click #addempbtn": function () {
        var id = FlowRouter.current().params.id;
        var username = localStorage.getItem("username");
        var addemp = $("#addemployeefield").val();
        eosinstance.contract('utopbusiness').then(utopbusiness => {
            utopbusiness.addemployee(id, addemp, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of adding employee", response);
                    alert("employee added");
                } else {
                    alert("Unable to add employee");
                }
            });

        });
    },
    "click #rmempbtn": function () {
        var id = FlowRouter.current().params.id;
        var username = localStorage.getItem("username");
        var rmemp = $("#rmemployeefield").val();
        eosinstance.contract('utopbusiness').then(utopbusiness => {
            utopbusiness.rmemployee(id, rmemp, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of removing employee", response);
                    alert("employee removed");
                } else {
                    alert("Unable to remove employee");
                }
            });

        });
    },
    "click #dilutebtn": function () {
        var username = localStorage.getItem("username");
        var quantity = $("#dilutetokenfield").val();
        var memo = "diluting token";
        eosinstance.contract('utopbusiness').then(utopbusiness => {
            utopbusiness.dilute(quantity, memo, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of diluting token", response);
                    alert("token diluted");
                } else {
                    alert("Unable to dilute token ");
                }
            });

        });
    },
    "click #concentratebtn": function () {
        var username = localStorage.getItem("username");
        var quantity = $("#concentratetokenfield").val();
        var memo = "removing tokens"
        eosinstance.contract('utopbusiness').then(utopbusiness => {
            utopbusiness.concentrate(quantity, memo, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of concentrating tokens", response);
                    alert("tokens concentrated");
                } else {
                    alert("Unable to remove tokens");
                }
            });

        });
    },
    "click #issuetokenbtn": function () {
        var username = localStorage.getItem("username");
        var quantity = $("#issuetokensfield").val();
        var memo = "issue tokens";
        eosinstance.contract('utopbusiness').then(utopbusiness => {
            utopbusiness.issue(username, quantity, memo, { authorization: username }).then((response) => {
                if (response) {
                    console.log("response of issuing tokens", response);
                    alert("token issued");
                } else {
                    alert("Unable to issue tokens");
                }
            });

        });
    },
    "click #createrelaybtn": async function () {
        /* console.log("eosinstance : ", eosinstance);
        var username = localStorage.getItem("username");
        var accountName = "sidesideside";

        const createAccResult = await eosinstance.transaction(tr => {
            tr.newaccount({
                creator: username,
                name: accountName,
                owner: initaPublic,  // <------ ????? Is this  the public key the of the new user account that was generate by a wallet tool or the eosjs-keygen
                active: initaPublic
            });

            tr.buyrambytes({
                payer: username,
                receiver: accountName,
                bytes: 500000 // <------ ????? how much should i give
            });

            tr.delegatebw({
                from: username,
                receiver: accountName,
                stake_net_quantity: '1.0000 EOS', // <------ ????? how much should i give
                stake_cpu_quantity: '1.0000 EOS', // <------ ????? how much should i give
                transfer: 0
            });
        });

        console.log("result :", createAccResult); */
        /*  var name = "sidesideside";
         var result2, result3;
         result2 = await eosinstance.setcode(name, 0, 0, wasm, abi)
         if (result2 != null) {
             result3 = await eosinstance.setabi(name, JSON.parse(abi)) */
        /* if(result3!=null)
        {
            let perm = await setPermission(name1)
            res.status(200).send(name1)
            
        } */

        /* }
        console.log("resultwasm: ", result2);
        console.log("resultabi: ", result3); */
        console.log("hello");
        var wasm = new ReactiveVar(0);
        var abi = new ReactiveVar(0);
        Meteor.call('loadWasm',function (err, result) {
            if (!err) {
                wasm.set(result);
            } else {
                console.error('Error load wasm', err)
            }
        });
        Meteor.call('loadAbi',function (err, result) {
            if (!err) {
                abi.set(result);
            } else {
                console.error('Error loadabi', err)
            }
        });
        console.log("wasm : ",wasm);
        console.log("abi : ",abi);
    }
});

//test 