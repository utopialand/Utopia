import './wmap.html';
import '/imports/ui/stylesheets/components/wmap.scss';

// Use onRendered vs onCreated to Initialize Properly
Template.Map_SVG.onRendered(function() {

    // Enable Bootsraps Popover Functionality
    $(function () {

        // Bind to data-toggle Popover Elements
        $('[data-toggle="popover"]').popover();

    });

});