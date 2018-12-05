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
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var ValidationError;

var require = meteorInstall({"node_modules":{"meteor":{"mdg:validation-error":{"validation-error.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/mdg_validation-error/validation-error.js                                                       //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/* global ValidationError:true */

/* global SimpleSchema */
// This is exactly what comes out of SS.
var errorSchema = new SimpleSchema({
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
var errorsSchema = new SimpleSchema({
  errors: {
    type: Array
  },
  'errors.$': {
    type: errorSchema
  }
});

ValidationError =
/*#__PURE__*/
function (_Meteor$Error) {
  (0, _inheritsLoose2.default)(_class, _Meteor$Error);

  function _class(errors) {
    var _this;

    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Validation Failed';
    errorsSchema.validate({
      errors: errors
    });
    _this = _Meteor$Error.call(this, ValidationError.ERROR_CODE, message, errors) || this;
    _this.errors = errors;
    return _this;
  }

  return _class;
}(Meteor.Error); // If people use this to check for the error code, we can change it
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
