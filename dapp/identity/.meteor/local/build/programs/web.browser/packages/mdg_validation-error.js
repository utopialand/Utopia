//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var ValidationError;

var require = meteorInstall({"node_modules":{"meteor":{"mdg:validation-error":{"validation-error.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/mdg_validation-error/validation-error.js                                                       //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/* global ValidationError:true */

/* global SimpleSchema */
// This is exactly what comes out of SS.
const errorSchema = new SimpleSchema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  details: {
    type: Object,
    blackbox: true,
    optional: true
  }
});
const errorsSchema = new SimpleSchema({
  errors: {
    type: Array
  },
  'errors.$': {
    type: errorSchema
  }
});
ValidationError = class extends Meteor.Error {
  constructor(errors) {
    let message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Validation Failed';
    errorsSchema.validate({
      errors
    });
    super(ValidationError.ERROR_CODE, message, errors);
    this.errors = errors;
  }

}; // If people use this to check for the error code, we can change it
// in future versions

ValidationError.ERROR_CODE = 'validation-error';
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/mdg:validation-error/validation-error.js");

/* Exports */
Package._define("mdg:validation-error", {
  ValidationError: ValidationError
});

})();
