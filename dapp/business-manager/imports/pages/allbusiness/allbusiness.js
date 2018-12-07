import "./allbusiness.html";
import "./allbusiness.css";
import "../../templates/header/header.js";
import "../../templates/footer/footer.js";
import { Session } from "meteor/session";

Template.App_all_business.helpers({
    allBusinessList(){
        console.log("my business helper  ",Session.get("allBusinessList"));
        return Session.get("allBusinessList");
    }
});

Template.App_all_business.events({
    "click .details": function(e){
        var id = e.target.id;
        FlowRouter.go("/allbusiness/business/"+id);
    }
});