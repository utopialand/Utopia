import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import "../../ui/pages/main/utopiaHome.js";
import "../../ui/pages/main/Utopia_Operating_System.js";
import "../../ui/pages/main/Involved.js";
import "../../ui/pages/main/utopiaMapPage.js";
import "../../ui/pages/main/Shop.js";
import "../../ui/pages/main/Contact.js";
import "../../ui/pages/main/Constitution";
FlowRouter.route('/', {
    name: 'utopiaHome',
    action() {
      BlazeLayout.render('App_body', { main: 'utopiaHome' });
    },
  });
FlowRouter.route('/utopiaos', {
    name: 'operating',
    action() {
      BlazeLayout.render('App_body', { main: 'operating' });
    },
  });
  FlowRouter.route('/Involved', {
    name: 'Involved',
    action() {
      BlazeLayout.render('App_body', { main: 'Involved' });
    },
  });
  FlowRouter.route('/location', {
    name: 'utopiaMapPage',
    action() {
      BlazeLayout.render('App_body', { main: 'utopiaMapPage' });
    },
  });
  FlowRouter.route('/constitution', {
    name: 'Constitution',
    action() {
      BlazeLayout.render('App_body', { main: 'constitution' });
    },
  });
  FlowRouter.route('/shop', {
    name: 'Shop',
    action() {
      BlazeLayout.render('App_body', { main: 'Shop' });
    },
  });
  FlowRouter.route('/contact', {
    name: 'Contact',
    action() {
      BlazeLayout.render('App_body', { main: 'contact' });
    },
  });
  