import "./Allutopians.html";
import "../../stylesheets/Allutopians.css";
import ScatterJS from "scatterjs-core";
import Eos from "eosjs";
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
Template.allutopians.onCreated(function () {
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
                                idname = residentity.rows[i].identityname;
                                dob = residentity.rows[i].dob;
                                profilepic = residentity.rows[i].dochash;                         
                                var img = new Image();
                                img.src = "https://ipfs.io/ipfs/"+profilepic;
                                document.getElementById("profile-container").innerHTML +="<div class='adddata' id='adddata'>"
                                +"<div class='allimageBox' > <div class='allprofileImage' id = 'profileImage1' style='background-image:url("+img.src+")'></div></div> "
                                +"<div class='allprofileName' id = 'profileName'>"+idname+"</div>" +
                                "<div class='allprofileInfo' id='profileInfo'>"+dob+"</div></div>"                              
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
Template.allutopians.events({
    "submit .search": function (event) {
    event.preventDefault();
    document.getElementById("profile-container").innerHTML ="";
    var text = event.target.identity.value;
    for (var i=0;i<residentity.rows.length;i++)
                        {
                            console.log(text);
                            if(residentity.rows[i].username == text)
                            {
                                idname = residentity.rows[i].identityname;
                                dob = residentity.rows[i].dob;
                                profilepic = residentity.rows[i].dochash;                         
                                var img = new Image();
                                img.src = "https://ipfs.io/ipfs/"+profilepic;
                                document.getElementById("profile-container").innerHTML +="<div class='adddata' id='adddata'>"
                                +"<div class='allimageBox' > <div class='allprofileImage' id = 'profileImage1' style='background-image:url("+img.src+")'></div></div> "
                                +"<div class='allprofileName' id = 'profileName'>"+idname+"</div>" +
                                "<div class='allprofileInfo' id='profileInfo'>"+dob+"</div></div>"                              
                            }
                        }
                        event.target.identity.value="";
    }

});