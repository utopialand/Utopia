import "./Header.html"
import "../../stylesheets/Header.css";
Template.Head.events({
    "click .hometag": function(){
        FlowRouter.go('/');
    },
    "click .ostag": function(){
        FlowRouter.go('/utopiaos');
    },
    "click .location": function(){
        FlowRouter.go('/location');
    },
    "click .consti": function(){
        FlowRouter.go('/constitution');
    },
    "click .involved": function(){
        FlowRouter.go('/Involved');
    },
    "click .shop": function(){
        FlowRouter.go('/shop');
    },
    "click .contact": function(){
        FlowRouter.go('/contact');
    }
});