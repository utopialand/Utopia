import './body.html';
Template.App_body.events({
    "click":function (e) {
        if (!$menu.is(e.target) && $menu.has(e.target).length === 0) // ... nor a descendant of the container
        {
            if(e.target.nodeName == "INPUT"){
                if(e.target.id=="toggleinput"){
                    console.log("event---",e.target.id);
                    document.getElementById("menu").style.display = "block";
                  }else{
                    document.getElementById("menu").style.display = "none";
                  }
              }else{
                document.getElementById("menu").style.display = "none";
                document.getElementById("toggleinput").checked=false;
              }
       }
      }
    });
const $menu = $('.starter');