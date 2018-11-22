import "./utopiaMapPage.html"
import "../../stylesheets/utopia.css";
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.utopiaMapPage.events(
    {
        "click .wikiButton":function(){
            window.open("https://github.com/utopialand/Utopia/wiki","_blank")
        }
    }
)