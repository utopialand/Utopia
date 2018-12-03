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
        FlowRouter.go("/identity");
    },
    "click .managerText": function(){
        console.log("manager");
        FlowRouter.go("/manager");
    }
});