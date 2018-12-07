import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import "../../ui/layout/body/body.js";
import "../../pages/business/business.js"
import "../../pages/business-manager-home/business-manager-home.js"
import "../../pages/newbusiness/newbusiness.js"
import "../../pages/allbusiness/allbusiness.js";
import "../../pages/mybusiness/mybusiness.js";
import "../../pages/settings/settings.js";

FlowRouter.route('/', {
    name: 'App_business_manager_home',
    action() {
        BlazeLayout.render('App_body', { main: 'App_business_manager_home' });
    },
});

FlowRouter.route('/business', {
    name: 'App_business',
    action() {
        BlazeLayout.render('App_body', { main: 'App_business' });
    },
});

FlowRouter.route('/newbusiness', {
    name: 'App_new_business',
    action() {
        BlazeLayout.render('App_body', { main: 'App_new_business' });
    },
});

FlowRouter.route('/mybusiness', {
    name: 'App_my_business',
    action() {
        BlazeLayout.render('App_body', { main: 'App_my_business' });
    },
});

FlowRouter.route('/allbusiness', {
    name: 'App_all_business',
    action() {
        BlazeLayout.render('App_body', { main: 'App_all_business' });
    },
});

FlowRouter.route('/allbusiness/business/:id', {
    name: 'App_business',
    action(params) {
        var id = params.id;
        BlazeLayout.render('App_body', { main: 'App_business', id: id });
    }
});

FlowRouter.route('/mybusiness/settings/:id', {
    name: 'App_business_settings',
    action(params) {
        var id = params.id;
        BlazeLayout.render('App_body', { main: 'App_business_settings', id: id });
    }
});