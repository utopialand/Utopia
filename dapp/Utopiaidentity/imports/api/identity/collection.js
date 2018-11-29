import {Mongo} from 'meteor/mongo';

export const Identity = new Mongo.Collection('identity');
Identity.schema = new SimpleSchema({
    identity_name: {type: String},
    name: {type: String},
    dob : {type: String},
    citizenship : {type: String},
    contact : {type: String},
    email : {type: String},
  });