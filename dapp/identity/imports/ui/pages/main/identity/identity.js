import "./identity.html";
import "./identity.css";
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
    console.log("username ", localStorage.getItem("username"));
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
                                console.log("kdjbisb==>",residentity.rows[i].username);
                                var img = new Image();
                                img.src = "https://ipfs.io/ipfs/"+profilepic;
                                document.getElementById("non-profile").style.display="none";
                                document.getElementById("profile-container").style.display="flex";
                                document.getElementById("profileImage1").style.backgroundImage = "url("+img.src+")";
                                console.log("imagegeResponse",username);                   
                                document.getElementById("profileName").innerHTML +=idname;
                                document.getElementById("profileInfo").innerHTML +="contact : "+contact+"<br><br> " + "email : "+email;
                                
                                break;
                            
                            }else{
                                console.log("non-profile",residentity.rows[i].username);
                                document.getElementById("profile-container").style.display="none";
                                document.getElementById("non-profile").style.display="block";
                                
                            }
                        }
                      }
                } else {
                    FlowRouter.go("/");
                }
            }
        } else {
            console.log("scatter not installed")
        }
    });
});

Template.App_identity.events({
    "click .view-real-estate-btn": function(){
        FlowRouter.go("/realestatemanage");
    },
    "click .view-your-business-btn": function(){
        FlowRouter.go("/business/mybusiness");
    }
});
