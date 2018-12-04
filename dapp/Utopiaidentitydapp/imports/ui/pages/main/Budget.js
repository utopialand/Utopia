import "./Budget.html";
import "../../stylesheets/Budget.css";
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

var scatter={};
var eosinstance = {};
Template.budget_app.onCreated(function () {

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

Template.budget_app.onRendered(async function () {
    let tabledata = await eos.getTableRows({
        code: "voteproposal",
        scope: "voteproposal",
        table: 'proposal11',
        limit: 50,
        json: true,
       /*  code: "propbudget11",
        scope: "propbudget11",
        table: 'catvote12',
        limit: 50,
        json: true, */
    });
    document.getElementById("largelist").innerHTML = "";
   

    for (var i = 0; i < tabledata.rows.length; i++) {
        var desc = tabledata.rows[i].proposal_description;
        var votebutton = "votebutton";
        var resultbutton = "resultbutton";
        votebutton = votebutton + tabledata.rows[i].id;
        resultbutton = resultbutton + tabledata.rows[i].id;
        document.getElementById("largelist").innerHTML +=
            "<div class = 'redobudget'><p>" + desc + "</p><div class = 'like-button' ></div>"
             + "</div>";

    }
    document.getElementById("mediumlist").innerHTML = "";
   

    for (var i = 0; i < tabledata.rows.length; i++) {
        var desc = tabledata.rows[i].proposal_description;
        var votebutton = "votebutton";
        var resultbutton = "resultbutton";
        votebutton = votebutton + tabledata.rows[i].id;
        resultbutton = resultbutton + tabledata.rows[i].id;
        document.getElementById("mediumlist").innerHTML +=
            "<div class = 'redobudget'><p>" + desc + "</p><div class = 'like-button' ></div>"
            + "</div>";

    }

    document.getElementById("smalllist").innerHTML = "";
   

    for (var i = 0; i < tabledata.rows.length; i++) {
        var desc = tabledata.rows[i].proposal_description;
        var votebutton = "votebutton";
        var resultbutton = "resultbutton";
        votebutton = votebutton + tabledata.rows[i].id;
        resultbutton = resultbutton + tabledata.rows[i].id;
        document.getElementById("smalllist").innerHTML +=
            "<div class = 'redobudget'><p>" + desc + "</p><div class = 'like-button' ></div>"
             + "</div>";

    }
})
Template.budget_app.events({
    'click .like-button':function(){
        console.log("0-0-0-",eosinstance);
        var username = localStorage.getItem("username");
        eosinstance.contract('propbudget11').then(propbudget11 => {
            propbudget11.catgvote(1,username, { authorization: username }).then((response) => {
                if (response) {
                   alert("budget voting successfull");
                } else {
                    alert("something went wrong!!!!");;
                }

            });

        })
    }
});
