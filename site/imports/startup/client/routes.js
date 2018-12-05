import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Setup Home Route
FlowRouter.route('/', {

    name: 'home',

    action() { 

        // Set the document title for SEO
        document.title = 'Home - Utopia';

        // Render the Home Page in App Body
        BlazeLayout.render('App_Body', { main: 'Page_Home' }); 

    },

});

// Setup Utopia OS Route
FlowRouter.route('/uos', {

    name: 'uos',

    action() { 

        // Set the document title for SEO
        document.title = 'Utopia OS - Utopia';

        // Render the Utopia OS Page in App Body
        BlazeLayout.render('App_Body', { main: 'Page_UOS' }); 

    },

});

// Setup Location Route
FlowRouter.route('/location', {

    name: 'location',

    action() { 

        // Set the document title for SEO
        document.title = 'Location - Utopia';

        // Render the Location Page in App Body
        BlazeLayout.render('App_Body', { main: 'Page_Location' }); 

    },

});

// Setup Constitution Route
FlowRouter.route('/constitution', {

    name: 'constitution',

    action() { 

        // Set the document title for SEO
        document.title = 'Constitution - Utopia';

        // Render the Constitution Page in App Body
        BlazeLayout.render('App_Body', { main: 'Page_Constitution' }); 

    },

});

// Setup Get Invloved Route
FlowRouter.route('/join', {

    name: 'join',

    action() { 

        // Set the document title for SEO
        document.title = 'Get Involved - Utopia';

        // Render the Get Involved Page in App Body
        BlazeLayout.render('App_Body', { main: 'Page_Join' }); 

    },

});

// Setup Shop Route
FlowRouter.route('/shop', {

    name: 'shop',

    action() { 

        // Set the document title for SEO
        document.title = 'Shop - Utopia';

        // Render the Shop Page in App Body
        BlazeLayout.render('App_Body', { main: 'Page_Shop' }); 

    },

});

// Setup Contact Route
FlowRouter.route('/contact', {

    name: 'contact',

    action() { 

        // Set the document title for SEO
        document.title = 'Contact - Utopia';

        // Render the Contact Page in App Body
        BlazeLayout.render('App_Body', { main: 'Page_Contact' }); 

    },

});