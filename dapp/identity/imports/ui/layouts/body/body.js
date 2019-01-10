import './body.html';
Template.App_body.events({
    "click":function (e) {
        if (!$menu.is(e.target) && $menu.has(e.target).length === 0) // ... nor a descendant of the container
        {
            if(e.target.nodeName == "DIV"){
                document.getElementById("menu").style.display = "none";
              }else if(e.target.nodeName == "INPUT"){
                console.log("event---",e.target.nodeName);
                document.getElementById("menu").style.display = "block";
              }
       }
      }
    });
const $menu = $('.starter');