import "./identity.html";
import "../../stylesheets/identity.css";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import Eos from "eosjs";
import axios from "axios";
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
var residentity;
var idname;
var email;
let profilepic ;
let imagegeResponse;
Template.App_identity.onCreated(function () {
    ScatterJS.scatter.connect('utopia').then(async(connected) => {
        if (connected) {
            if (ScatterJS.scatter.connect('utopia')) {
                scatter = ScatterJS.scatter;
                const requiredFields = { accounts: [network] };
                const eos = scatter.eos(network, Eos, eosOptions);

                if (scatter.identity) {
                    eosinstance = eos;
                    let username = localStorage.getItem("username");

                   residentity = await eosinstance.getTableRows({
                        code: "identityreg1",
                        scope: "identityreg1",
                        table: "identity3",
                        limit: 50,
                        json: true
                      });
                      
                    console.log("identity--------",residentity);
                      if(residentity)
                      {
                        for (var i=0;i<residentity.rows.length;i++)
                        {
                            if(residentity.rows[i].username == username)
                            {
                                idname = residentity.rows[i].identityname;
                                contact = residentity.rows[i].contact;
                                email = residentity.rows[i].email;
                                profilepic = residentity.rows[i].dochash;
                                console.log("kdjbisb==>",profilepic);
                                break;
                            
                            }
                        }
                      }
                      /* axios({
                        method: 'get',
                        url: 'https://ipfs.io/ipfs/'+profilepic
                        })
                        .then(function (response) {
                        //handle success
                        imagegeResponse =response.data;
                       
                        })
                        .catch(function (response) {
                        //handle error
                        console.log("err--",response);
                        }); */
                        var img = new Image();
                        img.src = "https://ipfs.io/ipfs/"+profilepic;
                        document.getElementById("profileImage1").style.backgroundImage = "url("+img.src+")";
                        console.log("imagegeResponse",imagegeResponse);
                   
                    document.getElementById("profileName").innerHTML +=idname;
                    document.getElementById("profileInfo").innerHTML +="contact : "+contact+"<br><br> " + "email : "+email;
                } else {
                    FlowRouter.go("/");
                }
            }
        } else {
            console.log("scatter not installed")
        }
    });
});
