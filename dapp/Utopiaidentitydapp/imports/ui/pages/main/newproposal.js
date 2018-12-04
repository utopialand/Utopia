import "./newproposal.html";
import "../../stylesheets/newproposal.css";
import "./footer.js";
import { Template } from "meteor/templating";
var count = 0;
Template.App_newproposal.events({
    "click #candioptions": function () {
        var boxName = "textbox" + count;
        var options = "Option";
        document.getElementById("form-group").innerHTML += "<input type = 'text' placeholder = '"+ options +"' id = '"+boxName+"'/>"
        count += 1;
        
        '<input type="text" id="' + boxName + '" "  />';
    },
})