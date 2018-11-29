import { Meteor } from 'meteor/meteor';
import {Identity} from './collection';

if (Meteor.isServer) {
    // This code only runs on the server
   
    Meteor.publish('identity', function tasksPublication() {
      return Identity.find();
    });
   
  } 

  Meteor.methods({

    'user.insert'(name,dob,city,contact,email) {
        console.log("inside insert",name)
    }


  });