import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import "../../ui/pages/main/welcomePage.js";
import "../../ui/pages/main/identity-reg.js";
import "../../ui/layouts/body/body.js"
import "../../ui/pages/main/proposal.js";
import "../../ui/pages/main/Registered.js";
import "../../ui/pages/main/Voting.js";
import "../../ui/pages/main/citizenship.js"
import "../../ui/pages/main/newproposal.js";
import "../../ui/pages/main/manager.js";
import "../../ui/pages/main/result.js";
import "../../ui/pages/main/Budget.js";
import "../../ui/pages/main/Createbudget.js";
FlowRouter.route('/', {
  name: 'welcomePage',
  action() {
    BlazeLayout.render('App_body', { main: 'welcomePage' });
  }
});
FlowRouter.route('/vote/:id', {
  name: 'Vote',
  action() {
    BlazeLayout.render('App_body', { main: 'Vote' });
  }
});

FlowRouter.route('/identity-reg', {
  name: 'identity-reg',
  action() {
    BlazeLayout.render('App_body', { main: 'identity_reg'});
  }
});

FlowRouter.route('/reg-success', {
  name: 'Reg-success',
  action() {
    BlazeLayout.render('App_body', { main: 'Reg_success' });
  }
});
FlowRouter.route('/proposal', {
  name: "proposal-page",
  action(){
    BlazeLayout.render('App_body', { main: 'App_proposal'});
  }
});
FlowRouter.route('/citizenship', {
  name: "citizenship",
  action(){
    BlazeLayout.render('App_body', { main: 'citizenship'});
  }
});

FlowRouter.route('/newproposal', {
  name: "newproposal",
  action(){
    BlazeLayout.render('App_body', { main: 'App_newproposal'});
  }
});

FlowRouter.route('/manager', {
  name: "manager",
  action(){
    BlazeLayout.render('App_body', { main: 'App_manager'});
  }
});

FlowRouter.route('/result/:id', {
  name: "result",
  action(params){
    var cont = params.id
    BlazeLayout.render('App_body', { main: 'App_result', id:cont});
  }
});
FlowRouter.route('/budget', {
  name: 'Budget',
  action() {
    BlazeLayout.render('App_body', { main: 'budget_app' });
  }
});
FlowRouter.route('/createbudget', {
  name: 'createion',
  action() {
    BlazeLayout.render('App_body', { main: 'Budget_newproposal' });
  }
});