import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
   process.env.ROOT_URL = 'http://utopia.zero2pi.com:3005';
  // code to run on server at startup
});
