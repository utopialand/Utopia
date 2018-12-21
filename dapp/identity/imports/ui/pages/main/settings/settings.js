import "./settings.html";
import "./settings.css";
import "../../../../templates/footer/footer.js";
import "../../../../templates/header/header.js";
import Eos from "eosjs";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import fs from "fs";
import { ReactiveVar } from 'meteor/reactive-var'
/* import { Api, JsonRpc, RpcError } from 'eosjs';
import { fetch } from "node-fetch";
import {  TextEncoder, TextDecoder } from "text-encoding";
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';

const defaultPrivateKey = "5Jur4pK1Rb8xvdfNUUZJq5JE36HQUd9PNouWwjUdbWw7cK8ZuUo"; // sidjungleacc
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); */

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

        /* var wasm;
        var abi;
        var a, b;
        Meteor.call('loadWasm', async function (err, result) {
            if (!err) {
                wasm = result;
                a = result;
                Meteor.call('loadAbi', async function (err, result1) {
                    if (!err) {
                        abi = result1;
                        b = result1;
                        console.log("wasm :", a);
                        console.log("abi ", b);
                        var name = "sidesideside";
                        var result2, result3;
                        try {
                            result2 = await eosinstance.setcode(name, 0, 0, Buffer.from(wasm))
                            result3 = await eosinstance.setabi(name, JSON.parse(abi));
                        } catch (err) {
                            console.log("err--", err)
                        }

                        if (result2 != null) {
                            result3 = await eosinstance.setabi(name, JSON.parse(abi))


                        }
                    } else {
                        console.error('Error loadabi', err)
                    }
                });
            } else {
                console.error('Error load wasm', err)
            }
        }); */

       /*  const resp = await rpc.get_table_rows({
            json: true,              // Get the response as json
            code: 'utopbusiness',     // Contract that we target      
            scope: 'utopbusiness',         // Account that owns the data   
            table: 'exchange',        // Table name        
            limit: 10,               // maximum number of rows that we want to get
        });

        console.log(" response ", resp); */
    }
});

//test 