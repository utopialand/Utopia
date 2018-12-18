'use strict'
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
const axios = require('axios');
const cors =require('cors');
const fs = require('fs');
// create a stream from a file, which enables uploads of big files without allocating memory twice


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

var scatter={};
var eosinstance = {};
var hash;
var picname;
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
        var identityname = firstname+" "+midname+" "+lastname;
        var dob = $('#dob').val();
        var phonenumber = $('#phonenumber').val();
        var email = $('#email').val();  
        var username = localStorage.getItem("username");
        console.log("----", identityname);
        eosinstance.contract('identityreg1').then(identityreg1 => {
            console.log("----", eosinstance);
            identityreg1.addidentity(username, identityname, dob, phonenumber, email,hash, { authorization: username }).then((response) => {
                if (response) {
                    FlowRouter.go("/reg-success");
                } else {
                    alert("identity is not registered !!!!");;
                }
            });

        })
    },
    'change #picture':function(e){
         picname = e.target.files[0];
         var bodyFormData = new FormData();
         bodyFormData.append('userPhoto',picname);
         axios({
             method: 'post',
             url: 'https://ipfs.zero2pi.com/api/uploadipfsimage',
             data: bodyFormData,
             config: { headers: {'Content-Type': 'multipart/form-data' }}
             })
             .then(function (response) {
                 //handle success
                 hash=response.data.hash;
                 console.log(hash,"resp--",response.data.hash);
             })
             .catch(function (response) {
                 //handle error
                 console.log("err--",response);
             });
         console.log("---",picname);
    }
});

