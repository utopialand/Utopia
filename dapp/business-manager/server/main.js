import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  
});

Meteor.methods({
  loadWasm: function () {
    console.log("hello from loadwasm");
    var fs = require('fs');
    var base = process.env.PWD;
    console.log("base :", base);
    return fs.readFileSync(base+"/public/BancorConverter.wasm","utf8");
  },
  loadAbi: function(){
    console.log("hello from loadabi");
    var fs = require('fs');
    var base = process.env.PWD;
    console.log("base :", base);
    return fs.readFileSync(base+"/public/BancorConverter.abi","utf8");
  }
});
