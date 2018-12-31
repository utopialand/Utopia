import "./header.html";
import "./header.css";

Template.App_header.events({
    "click .logo": function(){
        FlowRouter.go("/");
    }
})