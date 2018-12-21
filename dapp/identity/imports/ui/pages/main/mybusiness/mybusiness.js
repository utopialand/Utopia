import "./mybusiness.html";
import "./mybusiness.css";
import "../../../../templates/footer/footer.js";
import "../../../../templates/header/header.js";
import { Session } from "meteor/session";

function getMyBusinessList(){
    var allBusinessList = Session.get("allBusinessList");
    var myBusinessList = [];
    var username = localStorage.getItem("username");
    console.log("all business list ", allBusinessList);
    for(var i=0;i<allBusinessList.length;i++){
        if(username == allBusinessList[i].owner){
            myBusinessList.push(allBusinessList[i]);
        }
    }
    console.log("my business func", myBusinessList);
    Session.set("myBusinessList", myBusinessList);
}

Template.App_my_business.helpers({
    myBusinessList(){
        getMyBusinessList();
        console.log("my business helper  ",Session.get("myBusinessList"));
        return Session.get("myBusinessList");
    }
});

Template.App_my_business.events({
    "click .settingsbtn": function(e){
        var id = e.target.id;
        FlowRouter.go("/business/mybusiness/settings/"+id);
    }
});