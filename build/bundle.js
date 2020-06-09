/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/api/apiCalls.js":
/*!********************************!*\
  !*** ./server/api/apiCalls.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSchedule = exports.saveSchedule = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schedulesModel = __webpack_require__(/*! ../models/schedulesModel */ "./server/models/schedulesModel.js");

var _schedulesModel2 = _interopRequireDefault(_schedulesModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveSchedule = exports.saveSchedule = function saveSchedule(request, response) {
  var _request$body = request.body,
      block = _request$body.block,
      floor = _request$body.floor,
      meetingRoom = _request$body.meetingRoom,
      startTime = _request$body.startTime,
      endTime = _request$body.endTime;

  var newSchedule = new _schedulesModel2.default({
    _id: _mongoose2.default.Types.ObjectId(),
    block: block, floor: floor, meetingRoom: meetingRoom, startTime: startTime, endTime: endTime
  });
  newSchedule.save().then(function (doc) {
    response.send({ error: false, msg: 'Saved Successfully' });
  }, function (e) {
    response.status(500).send(e);
  });
};

var getSchedule = exports.getSchedule = function getSchedule(request, response) {
  _schedulesModel2.default.find({}).then(function (doc) {
    response.send({ error: false, meetings: doc });
  }, function (e) {
    response.status(500).send({ error: true, msg: e });
  });
};

/***/ }),

/***/ "./server/config/config.js":
/*!*********************************!*\
  !*** ./server/config/config.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var env = "development" || false;

if (env === 'development') {
  process.env.PORT = 4000;
  process.env.MONGO_LAB_URI = "mongodb://dhilipk13:dhilipk13@ds229418.mlab.com:29418/meeting";
}

/***/ }),

/***/ "./server/db/mongoose.js":
/*!*******************************!*\
  !*** ./server/db/mongoose.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(/*! mongoose */ "mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_LAB_URI).then(function () {
    console.log('Connected to Db');
}, function (e) {
    console.log(e);
});
module.exports = { mongoose: mongoose };

/***/ }),

/***/ "./server/models/schedulesModel.js":
/*!*****************************************!*\
  !*** ./server/models/schedulesModel.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schedules = _mongoose2.default.model('Schedules', {
  _id: _mongoose2.default.Schema.Types.ObjectId,
  block: {
    type: String,
    required: true,
    trim: true
  },
  floor: {
    type: String,
    required: true,
    trim: true
  },
  meetingRoom: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: Number,
    required: true,
    trim: true
  },
  endTime: {
    type: Number,
    required: true,
    trim: true
  }
});

exports.default = Schedules;

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! babel-polyfill */ "babel-polyfill");

var _config = __webpack_require__(/*! ./config/config */ "./server/config/config.js");

var _config2 = _interopRequireDefault(_config);

var _express = __webpack_require__(/*! express */ "express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(/*! body-parser */ "body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = __webpack_require__(/*! express-session */ "express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _compression = __webpack_require__(/*! compression */ "compression");

var _compression2 = _interopRequireDefault(_compression);

__webpack_require__(/*! ./db/mongoose */ "./server/db/mongoose.js");

var _apiCalls = __webpack_require__(/*! ./api/apiCalls */ "./server/api/apiCalls.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(/*! ./config/config */ "./server/config/config.js");


var MongoStore = __webpack_require__(/*! connect-mongo */ "connect-mongo")(_expressSession2.default);
var app = (0, _express2.default)();
var port = process.env.PORT;

app.use((0, _compression2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use(_express2.default.static('build/public'));

var loadHtml = function loadHtml() {
  return '\n    <html>\n      <head>\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n        <link rel="stylesheet" type="text/css" href="index.css"/>\n      </head>\n      <body>\n        <div id="root"></div>\n        <script src="client_bundle.js"></script>\n      </body>\n    </html>';
};

app.post('/save_schedule', _apiCalls.saveSchedule);
app.get('/get_schedules', _apiCalls.getSchedule);

app.get('*', function (req, res) {
  var template = loadHtml();
  res.send(template);
});

app.listen(port, function () {
  console.log('Server Started on Port: http://localhost:' + port + '/');
});

exports.default = app;

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "connect-mongo":
/*!********************************!*\
  !*** external "connect-mongo" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2FwaS9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvZGIvbW9uZ29vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9zY2hlZHVsZXNNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc2VydmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbW9uZ29cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29vc2VcIiJdLCJuYW1lcyI6WyJzYXZlU2NoZWR1bGUiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJib2R5IiwiYmxvY2siLCJmbG9vciIsIm1lZXRpbmdSb29tIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsIm5ld1NjaGVkdWxlIiwiU2NoZWR1bGVzIiwiX2lkIiwibW9uZ29vc2UiLCJUeXBlcyIsIk9iamVjdElkIiwic2F2ZSIsInRoZW4iLCJkb2MiLCJzZW5kIiwiZXJyb3IiLCJtc2ciLCJlIiwic3RhdHVzIiwiZ2V0U2NoZWR1bGUiLCJmaW5kIiwibWVldGluZ3MiLCJlbnYiLCJwcm9jZXNzIiwiUE9SVCIsIk1PTkdPX0xBQl9VUkkiLCJyZXF1aXJlIiwiUHJvbWlzZSIsImdsb2JhbCIsImNvbm5lY3QiLCJjb25zb2xlIiwibG9nIiwibW9kdWxlIiwiZXhwb3J0cyIsIm1vZGVsIiwiU2NoZW1hIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidHJpbSIsIk51bWJlciIsIk1vbmdvU3RvcmUiLCJzZXNzaW9uIiwiYXBwIiwicG9ydCIsInVzZSIsImJvZHlQYXJzZXIiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJqc29uIiwiZXhwcmVzcyIsInN0YXRpYyIsImxvYWRIdG1sIiwicG9zdCIsImdldCIsInJlcSIsInJlcyIsInRlbXBsYXRlIiwibGlzdGVuIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7OztBQUNBOzs7Ozs7QUFFTyxJQUFNQSxzQ0FBZSxTQUFmQSxZQUFlLENBQUNDLE9BQUQsRUFBVUMsUUFBVixFQUF1QjtBQUFBLHNCQUNTRCxRQUFRRSxJQURqQjtBQUFBLE1BQ3pDQyxLQUR5QyxpQkFDekNBLEtBRHlDO0FBQUEsTUFDbENDLEtBRGtDLGlCQUNsQ0EsS0FEa0M7QUFBQSxNQUMzQkMsV0FEMkIsaUJBQzNC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dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2VydmVyL3NlcnZlci5qc1wiKTtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgU2NoZWR1bGVzIGZyb20gJy4uL21vZGVscy9zY2hlZHVsZXNNb2RlbCc7XG5cbmV4cG9ydCBjb25zdCBzYXZlU2NoZWR1bGUgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgY29uc3QgeyBibG9jaywgZmxvb3IsIG1lZXRpbmdSb29tLCBzdGFydFRpbWUsIGVuZFRpbWUgfSA9IHJlcXVlc3QuYm9keTtcbiAgdmFyIG5ld1NjaGVkdWxlID0gbmV3IFNjaGVkdWxlcyh7XG4gICAgX2lkOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZCgpLFxuICAgIGJsb2NrLCBmbG9vciwgbWVldGluZ1Jvb20sIHN0YXJ0VGltZSwgZW5kVGltZVxuICB9KTtcbiAgbmV3U2NoZWR1bGUuc2F2ZSgpLnRoZW4oKGRvYykgPT4ge1xuICAgIHJlc3BvbnNlLnNlbmQoeyBlcnJvcjogZmFsc2UsIG1zZzogJ1NhdmVkIFN1Y2Nlc3NmdWxseScgfSk7XG4gIH0sIChlKSA9PiB7XG4gICAgcmVzcG9uc2Uuc3RhdHVzKDUwMCkuc2VuZChlKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0U2NoZWR1bGUgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgU2NoZWR1bGVzLmZpbmQoe30pLnRoZW4oKGRvYykgPT4ge1xuICAgIHJlc3BvbnNlLnNlbmQoe2Vycm9yOiBmYWxzZSwgbWVldGluZ3M6IGRvYyB9KTtcbiAgfSwgKGUpID0+IHtcbiAgICByZXNwb25zZS5zdGF0dXMoNTAwKS5zZW5kKHsgZXJyb3I6IHRydWUsIG1zZzogZSB9KTtcbiAgfSk7XG59O1xuIiwidmFyIGVudiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCc7XG5cbmlmIChlbnYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgcHJvY2Vzcy5lbnYuUE9SVCA9IDQwMDA7XG4gIHByb2Nlc3MuZW52Lk1PTkdPX0xBQl9VUkkgPSBcIm1vbmdvZGI6Ly9kaGlsaXBrMTM6ZGhpbGlwazEzQGRzMjI5NDE4Lm1sYWIuY29tOjI5NDE4L21lZXRpbmdcIjtcbn0iLCJ2YXIgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xubW9uZ29vc2UuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xubW9uZ29vc2UuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT19MQUJfVVJJKS50aGVuKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkIHRvIERiJyk7XG59LChlKT0+IHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB7bW9uZ29vc2V9O1xuIiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcblxuY29uc3QgU2NoZWR1bGVzID0gbW9uZ29vc2UubW9kZWwoJ1NjaGVkdWxlcycsIHtcbiAgX2lkOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG4gIGJsb2NrOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgZmxvb3I6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICBtZWV0aW5nUm9vbToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIHN0YXJ0VGltZToge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIGVuZFRpbWU6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHJpbTogdHJ1ZVxuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgU2NoZWR1bGVzOyIsInJlcXVpcmUoJy4vY29uZmlnL2NvbmZpZycpO1xuaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCc7XG5pbXBvcnQgZW52IGZyb20gJy4vY29uZmlnL2NvbmZpZyc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCBzZXNzaW9uIGZyb20gJ2V4cHJlc3Mtc2Vzc2lvbic7XG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSAnY29tcHJlc3Npb24nO1xuaW1wb3J0ICcuL2RiL21vbmdvb3NlJztcbmltcG9ydCB7IHNhdmVTY2hlZHVsZSwgZ2V0U2NoZWR1bGUgfSBmcm9tICcuL2FwaS9hcGlDYWxscyc7XG5cbmNvbnN0IE1vbmdvU3RvcmUgPSByZXF1aXJlKCdjb25uZWN0LW1vbmdvJykoc2Vzc2lvbik7XG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVDtcblxuYXBwLnVzZShjb21wcmVzc2lvbigpKTtcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYygnYnVpbGQvcHVibGljJykpO1xuXG5jb25zdCBsb2FkSHRtbCA9ICgpID0+IHtcbiAgcmV0dXJuIChgXG4gICAgPGh0bWw+XG4gICAgICA8aGVhZD5cbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIj5cbiAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJpbmRleC5jc3NcIi8+XG4gICAgICA8L2hlYWQ+XG4gICAgICA8Ym9keT5cbiAgICAgICAgPGRpdiBpZD1cInJvb3RcIj48L2Rpdj5cbiAgICAgICAgPHNjcmlwdCBzcmM9XCJjbGllbnRfYnVuZGxlLmpzXCI+PC9zY3JpcHQ+XG4gICAgICA8L2JvZHk+XG4gICAgPC9odG1sPmBcbiAgKTtcbn07XG5cbmFwcC5wb3N0KCcvc2F2ZV9zY2hlZHVsZScsIHNhdmVTY2hlZHVsZSk7XG5hcHAuZ2V0KCcvZ2V0X3NjaGVkdWxlcycsIGdldFNjaGVkdWxlKTtcblxuYXBwLmdldCgnKicsIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB0ZW1wbGF0ZSA9IGxvYWRIdG1sKCk7XG4gIHJlcy5zZW5kKHRlbXBsYXRlKTtcbn0pO1xuXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgY29uc29sZS5sb2coYFNlcnZlciBTdGFydGVkIG9uIFBvcnQ6IGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fS9gKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhcHA7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb21wcmVzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25uZWN0LW1vbmdvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1zZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=