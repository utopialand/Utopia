var require = meteorInstall({"imports":{"api":{"identity":{"collection.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/api/identity/collection.js                                //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.export({
  Identity: () => Identity
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Identity = new Mongo.Collection('identity');
Identity.schema = new SimpleSchema({
  identity_name: {
    type: String
  },
  name: {
    type: String
  },
  dob: {
    type: String
  },
  citizenship: {
    type: String
  },
  contact: {
    type: String
  },
  email: {
    type: String
  }
});
///////////////////////////////////////////////////////////////////////

},"methods.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/api/identity/methods.js                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Identity;
module.link("./collection", {
  Identity(v) {
    Identity = v;
  }

}, 1);

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('identity', function tasksPublication() {
    return Identity.find();
  });
}

Meteor.methods({
  'user.insert'(name, dob, city, contact, email) {
    console.log("inside insert", name);
  }

});
///////////////////////////////////////////////////////////////////////

}}},"startup":{"server":{"register.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/startup/server/register.js                                //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.link("../../api/identity/methods");
///////////////////////////////////////////////////////////////////////

}}}},"server":{"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// server/main.js                                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
module.link("../imports/startup/server/register");
Meteor.startup(() => {// code to run on server at startup
});
///////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvaWRlbnRpdHkvY29sbGVjdGlvbi5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvaWRlbnRpdHkvbWV0aG9kcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL3NlcnZlci9yZWdpc3Rlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21haW4uanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0IiwiSWRlbnRpdHkiLCJNb25nbyIsImxpbmsiLCJ2IiwiQ29sbGVjdGlvbiIsInNjaGVtYSIsIlNpbXBsZVNjaGVtYSIsImlkZW50aXR5X25hbWUiLCJ0eXBlIiwiU3RyaW5nIiwibmFtZSIsImRvYiIsImNpdGl6ZW5zaGlwIiwiY29udGFjdCIsImVtYWlsIiwiTWV0ZW9yIiwiaXNTZXJ2ZXIiLCJwdWJsaXNoIiwidGFza3NQdWJsaWNhdGlvbiIsImZpbmQiLCJtZXRob2RzIiwiY2l0eSIsImNvbnNvbGUiLCJsb2ciLCJzdGFydHVwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUFDQyxVQUFRLEVBQUMsTUFBSUE7QUFBZCxDQUFkO0FBQXVDLElBQUlDLEtBQUo7QUFBVUgsTUFBTSxDQUFDSSxJQUFQLENBQVksY0FBWixFQUEyQjtBQUFDRCxPQUFLLENBQUNFLENBQUQsRUFBRztBQUFDRixTQUFLLEdBQUNFLENBQU47QUFBUTs7QUFBbEIsQ0FBM0IsRUFBK0MsQ0FBL0M7QUFFMUMsTUFBTUgsUUFBUSxHQUFHLElBQUlDLEtBQUssQ0FBQ0csVUFBVixDQUFxQixVQUFyQixDQUFqQjtBQUNQSixRQUFRLENBQUNLLE1BQVQsR0FBa0IsSUFBSUMsWUFBSixDQUFpQjtBQUMvQkMsZUFBYSxFQUFFO0FBQUNDLFFBQUksRUFBRUM7QUFBUCxHQURnQjtBQUUvQkMsTUFBSSxFQUFFO0FBQUNGLFFBQUksRUFBRUM7QUFBUCxHQUZ5QjtBQUcvQkUsS0FBRyxFQUFHO0FBQUNILFFBQUksRUFBRUM7QUFBUCxHQUh5QjtBQUkvQkcsYUFBVyxFQUFHO0FBQUNKLFFBQUksRUFBRUM7QUFBUCxHQUppQjtBQUsvQkksU0FBTyxFQUFHO0FBQUNMLFFBQUksRUFBRUM7QUFBUCxHQUxxQjtBQU0vQkssT0FBSyxFQUFHO0FBQUNOLFFBQUksRUFBRUM7QUFBUDtBQU51QixDQUFqQixDQUFsQixDOzs7Ozs7Ozs7OztBQ0hBLElBQUlNLE1BQUo7QUFBV2pCLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLGVBQVosRUFBNEI7QUFBQ2EsUUFBTSxDQUFDWixDQUFELEVBQUc7QUFBQ1ksVUFBTSxHQUFDWixDQUFQO0FBQVM7O0FBQXBCLENBQTVCLEVBQWtELENBQWxEO0FBQXFELElBQUlILFFBQUo7QUFBYUYsTUFBTSxDQUFDSSxJQUFQLENBQVksY0FBWixFQUEyQjtBQUFDRixVQUFRLENBQUNHLENBQUQsRUFBRztBQUFDSCxZQUFRLEdBQUNHLENBQVQ7QUFBVzs7QUFBeEIsQ0FBM0IsRUFBcUQsQ0FBckQ7O0FBRzdFLElBQUlZLE1BQU0sQ0FBQ0MsUUFBWCxFQUFxQjtBQUNqQjtBQUVBRCxRQUFNLENBQUNFLE9BQVAsQ0FBZSxVQUFmLEVBQTJCLFNBQVNDLGdCQUFULEdBQTRCO0FBQ3JELFdBQU9sQixRQUFRLENBQUNtQixJQUFULEVBQVA7QUFDRCxHQUZEO0FBSUQ7O0FBRURKLE1BQU0sQ0FBQ0ssT0FBUCxDQUFlO0FBRWIsZ0JBQWNWLElBQWQsRUFBbUJDLEdBQW5CLEVBQXVCVSxJQUF2QixFQUE0QlIsT0FBNUIsRUFBb0NDLEtBQXBDLEVBQTJDO0FBQ3ZDUSxXQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaLEVBQTRCYixJQUE1QjtBQUNIOztBQUpZLENBQWYsRTs7Ozs7Ozs7Ozs7QUNaRlosTUFBTSxDQUFDSSxJQUFQLENBQVksNEJBQVosRTs7Ozs7Ozs7Ozs7QUNBQSxJQUFJYSxNQUFKO0FBQVdqQixNQUFNLENBQUNJLElBQVAsQ0FBWSxlQUFaLEVBQTRCO0FBQUNhLFFBQU0sQ0FBQ1osQ0FBRCxFQUFHO0FBQUNZLFVBQU0sR0FBQ1osQ0FBUDtBQUFTOztBQUFwQixDQUE1QixFQUFrRCxDQUFsRDtBQUFxREwsTUFBTSxDQUFDSSxJQUFQLENBQVksb0NBQVo7QUFFaEVhLE1BQU0sQ0FBQ1MsT0FBUCxDQUFlLE1BQU0sQ0FDbkI7QUFDRCxDQUZELEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9uZ299IGZyb20gJ21ldGVvci9tb25nbyc7XG5cbmV4cG9ydCBjb25zdCBJZGVudGl0eSA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdpZGVudGl0eScpO1xuSWRlbnRpdHkuc2NoZW1hID0gbmV3IFNpbXBsZVNjaGVtYSh7XG4gICAgaWRlbnRpdHlfbmFtZToge3R5cGU6IFN0cmluZ30sXG4gICAgbmFtZToge3R5cGU6IFN0cmluZ30sXG4gICAgZG9iIDoge3R5cGU6IFN0cmluZ30sXG4gICAgY2l0aXplbnNoaXAgOiB7dHlwZTogU3RyaW5nfSxcbiAgICBjb250YWN0IDoge3R5cGU6IFN0cmluZ30sXG4gICAgZW1haWwgOiB7dHlwZTogU3RyaW5nfSxcbiAgfSk7IiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQge0lkZW50aXR5fSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG4gICAgLy8gVGhpcyBjb2RlIG9ubHkgcnVucyBvbiB0aGUgc2VydmVyXG4gICBcbiAgICBNZXRlb3IucHVibGlzaCgnaWRlbnRpdHknLCBmdW5jdGlvbiB0YXNrc1B1YmxpY2F0aW9uKCkge1xuICAgICAgcmV0dXJuIElkZW50aXR5LmZpbmQoKTtcbiAgICB9KTtcbiAgIFxuICB9IFxuXG4gIE1ldGVvci5tZXRob2RzKHtcblxuICAgICd1c2VyLmluc2VydCcobmFtZSxkb2IsY2l0eSxjb250YWN0LGVtYWlsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW5zaWRlIGluc2VydFwiLG5hbWUpXG4gICAgfVxuXG5cbiAgfSk7IiwiaW1wb3J0IFwiLi4vLi4vYXBpL2lkZW50aXR5L21ldGhvZHNcIiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IFwiLi4vaW1wb3J0cy9zdGFydHVwL3NlcnZlci9yZWdpc3RlclwiXG5NZXRlb3Iuc3RhcnR1cCgoKSA9PiB7XG4gIC8vIGNvZGUgdG8gcnVuIG9uIHNlcnZlciBhdCBzdGFydHVwXG59KTtcbiJdfQ==
