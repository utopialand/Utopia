import "./utopia.html"
import "../../stylesheets/utopia.css";

Template.utopia.events({

    "click #part1-slider-button1":function(event){
        event.preventDefault();
        console.log("Slider button1 part1 was clicked");
        document.getElementById("part1-image").style.backgroundImage = "url(/img/ui-1.png)";
    },
    "click #part1-slider-button2": function(event){
        event.preventDefault();
        console.log("Slider button2 part1 was clicked");
        document.getElementById("part1-image").style.backgroundImage = "url(/img/ui-3.png)";
    },
    "click #part1-slider-button3": function(event){
        event.preventDefault();
        console.log("Slider button3 part1 was clicked");
        document.getElementById("part1-image").style.backgroundImage = "url(/img/ui-2.png)";
    },
    "click #part2-slider-button1":function(event){
        event.preventDefault();
        console.log("Slider button1 part2 was clicked");
        document.getElementById("part2-image").style.backgroundImage = "url(/img/ui-3.png)";
    },
    "click #part2-slider-button2": function(event){
        event.preventDefault();
        console.log("Slider button2 part2 was clicked");
        document.getElementById("part2-image").style.backgroundImage = "url(/img/ui-2.png)";
    },
    "click #part2-slider-button3": function(event){
        event.preventDefault();
        console.log("Slider button3 part2 was clicked");
        document.getElementById("part2-image").style.backgroundImage = "url(/img/ui-1.png)";
    },


});