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
const help=require('./helperadd.js');
const axios = require('axios');
const cors =require('cors');
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
        var username = localStorage.getItem("username");
        var hash="QmZbj5ruYneZb8FuR9wnLqJCpCXMQudhSdWhdhp5U1oPWJ";
        console.log("----", username);
        eosinstance.contract('identityreg1').then(identityreg1 => {            
            identityreg1.addidentity(username, firstname, midname, lastname, dob, phonenumber, email,hash, { authorization: username }).then((response) => {
                if (response) {
                    FlowRouter.go("/reg-success");
                } else {
                    alert("identity is not registered !!!!");;
                }

            });

        })
    },
   'click #upload-picture-button':function(){
       console.log("----",help);       
      /*  var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
       axios.get('http://127.0.0.1:8080/ipfs/QmR6hzQiXekfvccMvNuWst2zShBWmnZUp8LbSqNxvMPsX4', {responseType: 'arraybuffer'})                                                                                                     
       .then(response =>  {
        var data=Buffer.from(response.data, 'binary').toString('base64');
           console.log("res--",data)
        document.getElementById("imagelist").innerHTML +=
        "<div id='hell' class='hell'><img src='"+data+"'/></div>";
       
       }) 
       .catch(error => {
       console.log("error---",error);
       }); */
       const config = { headers: { 
           'Content-Type': 'multipart/form-data',

        } };
       axios.post('http://127.0.0.1:5001/api/v0/add','file=@/home/innotical/trio/add.js',config)                                                                                                     
       .then(response => {
       console.log("response---",response.data);
       })
       .catch(error => {
       console.log("error---",error);
       }); 
           
   }

});

