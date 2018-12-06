import "./header.html";
import "../../stylesheets/header.css";

Template.header.events({
    "click .proposal": function(){
        console.log("proposal link was clicked");
        FlowRouter.go("/proposal");
    },
    "click .logo": function(){
        console.log("logo was clikced");
        FlowRouter.go("/");
    },
    "click .identityText": function(){
        console.log("identity text was clicked");
<<<<<<< HEAD:dapp/Utopiaidentitydapp/imports/ui/pages/main/header.js
        FlowRouter.go("/budget");
=======
        FlowRouter.go("/identity");
>>>>>>> 5bf16c2fd0819c59a0c16e74dc4917732db8d6ec:dapp/identity/imports/ui/pages/main/header.js
    },
    "click .managerText": function(){
        console.log("manager");
        /* FlowRouter.go("/manager"); */
        FlowRouter.go("/createbudget");
    }
});