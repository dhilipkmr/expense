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
exports.getExpenseData = exports.newExpense = exports.signIn = exports.signUp = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _server = __webpack_require__(/*! ../server */ "./server/server.js");

var _server2 = _interopRequireDefault(_server);

var _expenseModel = __webpack_require__(/*! ../models/expenseModel */ "./server/models/expenseModel.js");

var _expenseModel2 = _interopRequireDefault(_expenseModel);

var _userModel = __webpack_require__(/*! ../models/userModel */ "./server/models/userModel.js");

var _userModel2 = _interopRequireDefault(_userModel);

var _constants = __webpack_require__(/*! ../../src/pages/constants/constants */ "./src/pages/constants/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signUp = exports.signUp = function signUp(request, response) {
    // Users.deleteMany({});
    var _request$body = request.body,
        _request$body$usernam = _request$body.username,
        username = _request$body$usernam === undefined ? '' : _request$body$usernam,
        _request$body$passwor = _request$body.password,
        password = _request$body$passwor === undefined ? '' : _request$body$passwor,
        _request$body$emailId = _request$body.emailId,
        emailId = _request$body$emailId === undefined ? '' : _request$body$emailId;

    var user = new _userModel2.default({
        _id: _mongoose2.default.Types.ObjectId(),
        username: username,
        password: password,
        emailId: emailId
    });
    _userModel2.default.find({ username: username }).then(function (res) {
        if (res.length > 0) {
            response.send({ error: true, msg: 'Username already Exists' });
        } else {
            user.save().then(function (doc) {
                request.session._userId = doc._id;
                response.send({ error: false, msg: 'Saved Successfully' });
            }, function (e) {
                response.status(500).send(e);
            });
        }
    }, function (e) {
        response.send(e);
        console.log(e);
    });
};

var signIn = exports.signIn = function signIn(request, response) {
    var _request$body2 = request.body,
        _request$body2$userna = _request$body2.username,
        username = _request$body2$userna === undefined ? '' : _request$body2$userna,
        _request$body2$passwo = _request$body2.password,
        password = _request$body2$passwo === undefined ? '' : _request$body2$passwo,
        _request$body2$emailI = _request$body2.emailId,
        emailId = _request$body2$emailI === undefined ? '' : _request$body2$emailI;

    console.log(request.session.user);
    _userModel2.default.find({ username: username, password: password }).then(function (res) {
        if (res.length > 0) {
            request.session._userId = res[0]._id;
            response.send({ error: false, msg: 'success' });
        } else {
            response.send({ error: true, msg: 'No user account found' });
        }
    }, function (e) {
        response.send(e);
        console.log(e);
    });
};

var newExpense = exports.newExpense = function newExpense(request, response) {
    var _request$body3 = request.body,
        amount = _request$body3.amount,
        category = _request$body3.category,
        date = _request$body3.date,
        type = _request$body3.type;

    amount = parseInt(amount);
    date = new Date(date);
    var ww = Math.ceil(date.getDate() / 7);
    var dow = date.getDay() + 1;
    var mm = date.getMonth() + 1;
    var yy = date.getFullYear();
    var newExpense = { amount: amount, category: category, date: date, type: type, ww: ww, dow: dow, mm: mm, yy: yy };
    var newExpenseInstance = new _expenseModel2.default(_extends({
        user_id: _mongoose2.default.Types.ObjectId("5c1630ad7669ea2c9bb04616")
    }, newExpense));
    newExpenseInstance.save().then(function (doc) {
        // request.session.user = doc.username;
        response.send(doc);
    }, function (err) {
        console.log('Failed to save new Expense', err);
        response.status(500).send(err);
    });
};

var getExpenseData = exports.getExpenseData = function getExpenseData(request, response) {
    var userId = request.session.user_id ? _mongoose2.default.Types.ObjectId(request.session.user_id) : _mongoose2.default.Types.ObjectId("5c1630ad7669ea2c9bb04616");
    function expenseDateResponder(err, data) {
        if (err) {
            respond.send(500).send(err);
        } else {
            var expenseList = void 0,
                incomeList = void 0;
            Object.keys(data).map(function (key) {
                if (data[key].type === 'expense') {
                    expenseList = data[key];
                } else if (data[key].type === 'income') {
                    incomeList = data[key];
                }
            });
            var spent = void 0,
                standing = void 0;
            if (expenseList) {
                expenseList.transactionList.map(function (transaction) {
                    var percent = transaction.amount / (expenseList.amount / 100);
                    transaction.percent = Math.round(percent * 100) / 100;
                });
                spent = expenseList.amount;
            }
            if (incomeList) {
                incomeList.transactionList.map(function (transaction) {
                    var percent = transaction.amount / (incomeList.amount / 100);
                    transaction.percent = Math.round(percent * 100) / 100;
                });
                standing = incomeList.amount - spent;
            }
            response.send({ expenseList: expenseList, incomeList: incomeList, spent: spent, standing: standing });
        }
    }

    // Queries start
    var group1 = {
        $group: {
            _id: { category: '$category', type: '$type' },
            type: { '$first': '$type' },
            category: { '$first': '$category' },
            amount: { $sum: '$amount' }
        }
    };
    var group2 = {
        $group: {
            _id: { type: '$type' },
            amount: { $sum: '$amount' },
            type: { '$first': '$type' },
            transactionList: { $push: { category: '$category', amount: '$amount' } }
        }
    };
    var unwind = { $unwind: '$transactionList' };
    var sort = { $sort: { 'transactionList.amount': -1 } };
    var reGroup = {
        $group: {
            _id: { type: '$type' },
            amount: { '$first': '$amount' },
            type: { '$first': '$type' },
            transactionList: { $push: '$transactionList' }
        }
    };
    // Queries end

    var _request$body4 = request.body,
        tab = _request$body4.tab,
        ww = _request$body4.ww,
        mm = _request$body4.mm,
        yy = _request$body4.yy,
        dow = _request$body4.dow;

    if (tab === _constants.YEAR) {
        _expenseModel2.default.aggregate([{ $match: { user_id: userId } }, { $match: { yy: parseInt(yy) } }, _extends({}, group1), _extends({}, group2), _extends({}, unwind), _extends({}, sort), _extends({}, reGroup), { $project: { _id: 0, amount: 1, type: 1, transactionList: 1 } }]).allowDiskUse(true).exec(expenseDateResponder);
    } else if (tab === _constants.MONTH) {
        _expenseModel2.default.aggregate([{ $match: { user_id: userId } }, { $match: { yy: parseInt(yy) } }, { $match: { mm: parseInt(mm) } }, _extends({}, group1), _extends({}, group2), _extends({}, unwind), _extends({}, sort), _extends({}, reGroup), { $project: { _id: 0, amount: 1, type: 1, transactionList: 1 } }]).allowDiskUse(true).exec(expenseDateResponder);
    } else if (tab === _constants.WEEK) {
        _expenseModel2.default.aggregate([{ $match: { user_id: userId } }, { $match: { yy: parseInt(yy) } }, { $match: { mm: parseInt(mm) } }, { $match: { ww: parseInt(ww) } }, _extends({}, group1), _extends({}, group2), _extends({}, unwind), _extends({}, sort), _extends({}, reGroup), { $project: { _id: 0, amount: 1, type: 1, transactionList: 1 } }]).allowDiskUse(true).exec(expenseDateResponder);
    }
};

/***/ }),

/***/ "./server/config/config.js":
/*!*********************************!*\
  !*** ./server/config/config.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var env = "development" || false;

if (env === 'development') {
  process.env.PORT = 4000;
  process.env.MONGOLAB_URI = 'mongodb://localhost:27017/expense';
} else {
  process.env.MONGOLAB_URI = 'mongodb://dhilipk13:dhilipk13@ds247310.mlab.com:47310/expense';
}
exports.default = env;

/***/ }),

/***/ "./server/db/mongoose.js":
/*!*******************************!*\
  !*** ./server/db/mongoose.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose1 = __webpack_require__(/*! mongoose */ "mongoose");
mongoose1.Promise = global.Promise;
mongoose1.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true }).then(function () {
    console.log('Connected to Db');
}, function (e) {
    console.log(e);
});
module.exports = { mongoose1: mongoose1 };

/***/ }),

/***/ "./server/models/expenseModel.js":
/*!***************************************!*\
  !*** ./server/models/expenseModel.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = __webpack_require__(/*! ./userModel */ "./server/models/userModel.js");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Expenses = _mongoose2.default.model('Expenses', {
  user_id: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'Users'
  },
  amount: {
    type: Number,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    default: 'others'
  },
  type: {
    type: String,
    required: false,
    trim: true,
    default: 'expense'
  },
  date: {
    type: Date,
    required: false,
    trim: true,
    default: Date.now()
  },
  ww: {
    type: Number,
    required: false,
    trim: true
  },
  dow: {
    type: Number,
    required: false,
    trim: true
  },
  mm: {
    type: Number,
    required: false,
    trim: true
  },
  yy: {
    type: Number,
    required: false,
    trim: true
  }
});
exports.default = Expenses;

/***/ }),

/***/ "./server/models/userModel.js":
/*!************************************!*\
  !*** ./server/models/userModel.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expenseModel = __webpack_require__(/*! ./expenseModel */ "./server/models/expenseModel.js");

var _expenseModel2 = _interopRequireDefault(_expenseModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = _mongoose2.default.model('Users', {
    _id: _mongoose2.default.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    emailId: {
        type: String,
        required: false,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    expense: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Expenses'
    }]
});
exports.default = Users;

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

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(/*! react-dom/server */ "react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _reactRouter = __webpack_require__(/*! react-router */ "react-router");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _app = __webpack_require__(/*! ../src/app */ "./src/app.js");

var _app2 = _interopRequireDefault(_app);

var _mongoose = __webpack_require__(/*! ./db/mongoose */ "./server/db/mongoose.js");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _apiCalls = __webpack_require__(/*! ./api/apiCalls */ "./server/api/apiCalls.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var session = __webpack_require__(/*! express-session */ "express-session");

var app = (0, _express2.default)();
var port = process.env.PORT;

app.use(session({
    secret: 'dhilipLocal',
    resave: false,
    saveUninitialized: true
}));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use(_express2.default.static('build/public'));
app.use('/styles', _express2.default.static('src/pages/styles'));
app.use(_express2.default.static('src/pages/static'));

// API Calls
app.post('/signup', _apiCalls.signUp);
app.post('/signin', _apiCalls.signIn);
app.post('/new_expense', _apiCalls.newExpense);
app.post('/get_expense_data', _apiCalls.getExpenseData);

var loadHtml = function loadHtml(content) {
    var helmet = _reactHelmet2.default.renderStatic();
    return '\n        <html>\n            <head>\n                ' + helmet.meta.toString() + '\n                ' + helmet.title.toString() + '\n                <meta name="viewport" content="width=device-width, initial-scale=1.0">\n                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">\n                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js">\n                <link rel="stylesheet" type="text/css" href="/styles/common.css">\n                <link rel="stylesheet" type="text/css" href="/styles/home.css">\n                <link rel="stylesheet" type="text/css" href="/styles/new_expense.css">\n                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">\n            </head>\n            <body>\n                <div id="root">' + content + '</div>\n                <script src="client_bundle.js"></script>\n            </body>\n        </html>';
};

app.get('*', function (req, res) {
    var context = {};
    var content = _server2.default.renderToString(_react2.default.createElement(
        _reactRouter.StaticRouter,
        null,
        _react2.default.createElement(_app2.default, { location: req.url, context: context })
    ));
    var template = loadHtml(content);
    res.send(template);
});

app.listen(port, function () {
    console.log('process.env', port);
    console.log('Server Started on Port: ', port);
});

exports.default = app;

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(/*! react-router */ "react-router");

var _Login = __webpack_require__(/*! ./pages/components/Login */ "./src/pages/components/Login.js");

var _Login2 = _interopRequireDefault(_Login);

var _routes = __webpack_require__(/*! ./pages/routes/routes */ "./src/pages/routes/routes.js");

var _routes2 = _interopRequireDefault(_routes);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_routes2.default, null);
        }
    }]);

    return App;
}(_react.Component);

exports.default = App;

/***/ }),

/***/ "./src/pages/apiCalls/ApiCalls.js":
/*!****************************************!*\
  !*** ./src/pages/apiCalls/ApiCalls.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_expense_data = exports.new_expense = exports.signin = exports.signup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = __webpack_require__(/*! axios */ "axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signup = exports.signup = function signup(params) {
  var url = '/signup/';
  return _axios2.default.post(url, _extends({}, params));
};

var signin = exports.signin = function signin(params) {
  var url = '/signin/';
  return _axios2.default.post(url, _extends({}, params));
};

var new_expense = exports.new_expense = function new_expense(params) {
  var url = '/new_expense/';
  return _axios2.default.post(url, _extends({}, params));
};

var get_expense_data = exports.get_expense_data = function get_expense_data(params) {
  var url = '/get_expense_data/';
  return _axios2.default.post(url, params);
};

/***/ }),

/***/ "./src/pages/components/Home.js":
/*!**************************************!*\
  !*** ./src/pages/components/Home.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _NewExpense = __webpack_require__(/*! ./NewExpense */ "./src/pages/components/NewExpense.js");

var _NewExpense2 = _interopRequireDefault(_NewExpense);

var _ApiCalls = __webpack_require__(/*! ../apiCalls/ApiCalls */ "./src/pages/apiCalls/ApiCalls.js");

var _constants = __webpack_require__(/*! ../constants/constants */ "./src/pages/constants/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.leftMenuClick = _this.leftMenuClick.bind(_this);
    _this.newExpense = _this.newExpense.bind(_this);
    _this.navigateToSignIn = _this.navigateToSignIn.bind(_this);
    _this.state = {
      activeTab: _constants.MONTH,
      showNewExpense: false,
      standing: undefined,
      spent: undefined,
      expenseList: {},
      incomeList: {},
      viewMore: false

    };
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getExpense();
    }
  }, {
    key: 'getExpense',
    value: function getExpense() {
      var _this2 = this;

      var expenseList = {},
          incomeList = {},
          standing = '';
      var tab = this.state.activeTab;
      var mm = new Date().getMonth() + 1;
      var dow = new Date().getDay();
      var ww = Math.ceil(new Date().getDate() / 7);
      var yy = new Date().getFullYear();
      var params = { tab: tab, mm: mm, dow: dow, ww: ww, yy: yy };
      (0, _ApiCalls.get_expense_data)(params).then(function (resp) {
        var _resp$data = resp.data,
            expenseList = _resp$data.expenseList,
            incomeList = _resp$data.incomeList,
            standing = _resp$data.standing,
            spent = _resp$data.spent;

        _this2.setState({ expenseList: expenseList, incomeList: incomeList, standing: standing, spent: spent });
      }, function (err) {
        console.log('Unable to Get Expense Details', err);
      });
    }
  }, {
    key: 'changeExpenseDayFormat',
    value: function changeExpenseDayFormat(activeTab) {
      var _this3 = this;

      this.setState({ activeTab: activeTab, viewMore: false }, function () {
        _this3.getExpense();
      });
    }
  }, {
    key: 'leftMenuClick',
    value: function leftMenuClick() {
      this.refs.backDrop.classList.toggle('backDrop');
      this.refs.popup.classList.toggle('right0');
      this.refs.firstHalfLandingTxt.classList.toggle('scale90');
      this.refs.otherHalfLandingTxt.classList.toggle('scale90');
    }
  }, {
    key: 'navigateToSignIn',
    value: function navigateToSignIn() {
      console.log(this.props);
      this.props.history.push('/login');
    }
  }, {
    key: 'renderLeftMenuBar',
    value: function renderLeftMenuBar() {
      return _react2.default.createElement(
        'div',
        { className: 'menuBar' },
        _react2.default.createElement(
          'div',
          { ref: 'popup', className: 'popup zi2 ', onClick: this.leftMenuClick },
          _react2.default.createElement(
            'div',
            { className: 'sideBar in-bl fl' },
            _react2.default.createElement(
              'div',
              { className: 'menu-option' },
              'Settings'
            ),
            _react2.default.createElement(
              'div',
              { className: 'menu-option', onClick: this.navigateToSignIn },
              'Sign In'
            ),
            _react2.default.createElement(
              'div',
              { className: 'menu-option' },
              'About Me'
            )
          )
        )
      );
    }
  }, {
    key: 'newExpense',
    value: function newExpense(val) {
      this.setState({ showNewExpense: val });
    }
  }, {
    key: 'clickViewMore',
    value: function clickViewMore() {
      this.setState({ viewMore: !this.state.viewMore });
    }
  }, {
    key: 'renderTransactioncard',
    value: function renderTransactioncard() {
      var _this4 = this;

      if (this.state.expenseList && Object.keys(this.state.expenseList).length > 0) {
        return this.state.expenseList.transactionList.map(function (transaction, index) {
          if (_this4.state.viewMore || !_this4.state.viewMore && index < 2) {
            return _react2.default.createElement(
              'div',
              { key: 'transaction_type_' + index, className: 'transactedCardInner' },
              _react2.default.createElement(
                'div',
                { className: 'cardInnerheading' },
                _react2.default.createElement(
                  'span',
                  { className: 'cat_name' },
                  transaction.category
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'cat_percent' },
                  transaction.percent + ' %'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'progressBar bl textCenter' },
                _react2.default.createElement('div', { className: 'filled', style: { maxWidth: transaction.percent + '%' } })
              )
            );
          } else {
            return null;
          }
        });
      } else {

        return null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state = this.state,
          activeTab = _state.activeTab,
          showNewExpense = _state.showNewExpense,
          _state$standing = _state.standing,
          standing = _state$standing === undefined ? undefined : _state$standing,
          _state$spent = _state.spent,
          spent = _state$spent === undefined ? undefined : _state$spent,
          _state$viewMore = _state.viewMore,
          viewMore = _state$viewMore === undefined ? false : _state$viewMore;

      return _react2.default.createElement(
        'div',
        { className: '' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', { ref: 'backDrop', className: 'transition2a zi1 ' + (showNewExpense ? 'backDrop' : ''), onClick: function onClick() {
              return _this5.newExpense(false);
            } }),
          this.renderLeftMenuBar(),
          _react2.default.createElement(
            'div',
            { ref: 'mainContent', className: 'mainContent' },
            _react2.default.createElement(
              'div',
              { className: 'first-half-landing' },
              _react2.default.createElement(
                'div',
                { ref: 'firstHalfLandingTxt', className: 'firstHalfTxt' },
                _react2.default.createElement(
                  'div',
                  { className: 'standing' },
                  _react2.default.createElement(
                    'span',
                    { className: 'left-menu-container', onClick: this.leftMenuClick },
                    _react2.default.createElement('img', { className: 'left-menu', src: '/img/menu.svg' })
                  ),
                  _react2.default.createElement('span', null)
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'heading' },
                  'Expense Home'
                ),
                standing ? _react2.default.createElement(
                  'div',
                  { className: 'subHeading' },
                  'Standing : ₹' + standing
                ) : null,
                _react2.default.createElement(
                  'div',
                  { className: 'expenseDaysBtn' },
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (activeTab === _constants.WEEK ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this5.changeExpenseDayFormat(_constants.WEEK);
                      } },
                    'Week'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (activeTab === _constants.MONTH ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this5.changeExpenseDayFormat(_constants.MONTH);
                      } },
                    'Month'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (activeTab === _constants.YEAR ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this5.changeExpenseDayFormat(_constants.YEAR);
                      } },
                    'Year'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  spent ? _react2.default.createElement(
                    'div',
                    { className: 'subHeading' },
                    'Spent : ₹' + spent
                  ) : null
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'div',
                    { ref: 'transactedCard', className: 'transactedCard transition2a ' + (viewMore ? 'showAllTransaction' : '') },
                    _react2.default.createElement(
                      'div',
                      { className: 'transactScroller' },
                      this.renderTransactioncard()
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'viewMoreArrow', onClick: function onClick() {
                        return _this5.clickViewMore();
                      } },
                    _react2.default.createElement(
                      'svg',
                      { className: viewMore ? 'rotateViewMore' : '', ref: 'svgViewMore', xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24' },
                      _react2.default.createElement('path', { d: 'M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z' })
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'other-half-landing' },
              _react2.default.createElement(
                'div',
                { ref: 'otherHalfLandingTxt' },
                _react2.default.createElement(
                  'div',
                  { className: 'textCenter trSumaryHeading fb' },
                  _react2.default.createElement(
                    'span',
                    null,
                    'Transaction Summary'
                  )
                ),
                _react2.default.createElement(
                  'svg',
                  { height: '200', width: '300', 'class': 'chart' },
                  _react2.default.createElement('polyline', { points: '0,180 500,180', style: { fill: 'white', stroke: 'red', strokeWidth: "4" } })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'newContainer' },
                  _react2.default.createElement(
                    'div',
                    { className: 'new' },
                    _react2.default.createElement(
                      'span',
                      { className: 'newBtn', onClick: function onClick() {
                          return _this5.newExpense(true);
                        } },
                      'Add New'
                    )
                  )
                )
              )
            )
          )
        ),
        showNewExpense ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_NewExpense2.default, { newExpense: this.newExpense })
        ) : null
      );
    }
  }]);

  return Home;
}(_react.Component);

exports.default = Home;

/***/ }),

/***/ "./src/pages/components/Login.js":
/*!***************************************!*\
  !*** ./src/pages/components/Login.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _ApiCalls = __webpack_require__(/*! ../apiCalls/ApiCalls */ "./src/pages/apiCalls/ApiCalls.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
  _inherits(Login, _Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.head = _this.head.bind(_this);
    _this.signUp = _this.signUp.bind(_this);
    _this.signIn = _this.signIn.bind(_this);
    _this.state = {
      username: 'dhilip',
      password: 'dhilipdhilip'
    };
    return _this;
  }

  _createClass(Login, [{
    key: 'head',
    value: function head() {
      return _react2.default.createElement(
        _reactHelmet2.default,
        null,
        _react2.default.createElement(
          'title',
          null,
          'Expense Login'
        )
      );
    }
  }, {
    key: 'signUp',
    value: function signUp() {
      (0, _ApiCalls.signup)({ username: this.state.username, password: this.state.password });
    }
  }, {
    key: 'signIn',
    value: function signIn() {
      var _this2 = this;

      (0, _ApiCalls.signin)({ username: this.state.username, password: this.state.password }).then(function (resp) {
        if (resp.data && !resp.data.error) {
          console.log(_this2);
          _this2.props.history.push('/home', {});
        } else {
          console.log('Failed to SignIn', resp);
        }
      }).catch(function (err) {
        console.log('Failed to SignIn', err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        this.head(),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Login'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('input', { placeholder: 'username', value: this.state.username, onChange: function onChange(e) {
                return _this3.setState({ username: e.target.value });
              }, type: 'text' }),
            _react2.default.createElement('input', { placeholder: 'password', value: this.state.password, onChange: function onChange(e) {
                return _this3.setState({ password: e.target.value });
              }, type: 'password' })
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.signIn },
            'Sign In'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.signUp },
            'Sign Up'
          )
        )
      );
    }
  }]);

  return Login;
}(_react.Component);

exports.default = Login;

/***/ }),

/***/ "./src/pages/components/NewExpense.js":
/*!********************************************!*\
  !*** ./src/pages/components/NewExpense.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _ApiCalls = __webpack_require__(/*! ../apiCalls/ApiCalls */ "./src/pages/apiCalls/ApiCalls.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import {commaFormatted} from '../utils/utils';

var NewExpense = function (_Component) {
  _inherits(NewExpense, _Component);

  function NewExpense(props) {
    _classCallCheck(this, NewExpense);

    var _this = _possibleConstructorReturn(this, (NewExpense.__proto__ || Object.getPrototypeOf(NewExpense)).call(this, props));

    _this.selectType = _this.selectType.bind(_this);
    _this.submitNewExpense = _this.submitNewExpense.bind(_this);

    _this.state = {
      type: 'expense',
      amount: '',
      category: '',
      day: '',
      month: '',
      year: '',
      error: {}
    };
    return _this;
  }

  _createClass(NewExpense, [{
    key: 'selectType',
    value: function selectType(type) {
      this.setState({ type: type });
    }
  }, {
    key: 'changeAmount',
    value: function changeAmount(val) {
      this.setState({ amount: val });
    }
  }, {
    key: 'changeDate',
    value: function changeDate(val, current, next) {
      this.setState(_extends({}, val));
      if (current && val[current].length === 2 && next) {
        this.refs[next].focus();
      }
    }
  }, {
    key: 'isValidDate',
    value: function isValidDate() {
      var _state = this.state,
          day = _state.day,
          month = _state.month,
          year = _state.year;

      var dateReg = /^[0-9][0-9]$/;
      if (!dateReg.test(day) || !dateReg.test(month) || !dateReg.test(year)) {
        return false;
      } else {
        this.date = new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day));
        return true;
      }
    }
  }, {
    key: 'validateParams',
    value: function validateParams() {
      var reg = /^\d+$/;
      var _state2 = this.state,
          amount = _state2.amount,
          category = _state2.category;

      if (!amount || !reg.test(amount)) {
        this.setState({ error: { amount: 'Please provide a Valid Amount' } });
        return false;
      }
      if (!category) {
        this.setState({ error: { category: 'Please provide a Valid Category' } });
        return false;
      }
      if (!this.isValidDate()) {
        this.setState({ error: { date: 'Please provide a Valid Date' } });
        return false;
      }
      return true;
    }
  }, {
    key: 'submitNewExpense',
    value: function submitNewExpense() {
      var _this2 = this;

      var _state3 = this.state,
          amount = _state3.amount,
          day = _state3.day,
          month = _state3.month,
          year = _state3.year,
          type = _state3.type,
          category = _state3.category;

      var isValidationSuccess = this.validateParams();
      if (isValidationSuccess) {
        var params = { amount: amount, type: type, date: this.date, category: category };
        (0, _ApiCalls.new_expense)(params).then(function (response) {
          _this2.props.newExpense(false);
        }, function (err) {
          console.log('Unable to create new Expense', err);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state4 = this.state,
          type = _state4.type,
          amount = _state4.amount,
          day = _state4.day,
          month = _state4.month,
          year = _state4.year,
          category = _state4.category,
          error = _state4.error;


      return _react2.default.createElement(
        'div',
        { className: 'newExpenseContainer zi2' },
        _react2.default.createElement(
          'div',
          { className: 'expIncBtns textCenter' },
          _react2.default.createElement(
            'span',
            { className: 'newBtn ' + (type === 'expense' ? 'selectedType' : ''), onClick: function onClick() {
                return _this3.selectType('expense');
              } },
            'Expense'
          ),
          _react2.default.createElement(
            'span',
            { className: 'newBtn ' + (type === 'income' ? 'selectedType' : ''), onClick: function onClick() {
                return _this3.selectType('income');
              } },
            'Income'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'amountInput' },
          _react2.default.createElement(
            'span',
            null,
            '\u20B9'
          ),
          _react2.default.createElement('input', { type: 'text', placeholder: 'Amount', onChange: function onChange(e) {
              return _this3.changeAmount(e.target.value);
            }, value: amount }),
          error.amount ? _react2.default.createElement(
            'div',
            { className: 'errorDiv' },
            error.amount
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'categoryInput' },
          _react2.default.createElement('input', { type: 'text', placeholder: 'Category', onChange: function onChange(e) {
              return _this3.setState({ category: e.target.value });
            }, value: category }),
          error.category ? _react2.default.createElement(
            'div',
            { className: 'errorDiv' },
            error.category
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'spentDay' },
          _react2.default.createElement('input', { ref: 'day', className: 'dayIp', type: 'number', maxLength: '2', placeholder: 'DD', onChange: function onChange(e) {
              return _this3.changeDate({ day: e.target.value }, 'day', 'month');
            }, value: day }),
          _react2.default.createElement('input', { ref: 'month', className: 'dayIp', type: 'number', maxLength: '2', placeholder: 'MM', onChange: function onChange(e) {
              return _this3.changeDate({ month: e.target.value }, 'month', 'year');
            }, value: month }),
          _react2.default.createElement('input', { ref: 'year', className: 'dayIp', type: 'number', maxLength: '2', placeholder: 'YY', onChange: function onChange(e) {
              return _this3.changeDate({ year: e.target.value }, 'year');
            }, value: year }),
          error.date ? _react2.default.createElement(
            'div',
            { className: 'errorDiv' },
            error.date
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'textCenter' },
          _react2.default.createElement(
            'div',
            { className: 'submitBtn', onClick: this.submitNewExpense },
            'Done'
          )
        )
      );
    }
  }]);

  return NewExpense;
}(_react.Component);

exports.default = NewExpense;

/***/ }),

/***/ "./src/pages/components/NotFound.js":
/*!******************************************!*\
  !*** ./src/pages/components/NotFound.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFound = function (_Component) {
  _inherits(NotFound, _Component);

  function NotFound(props) {
    _classCallCheck(this, NotFound);

    var _this = _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).call(this, props));

    _this.head = _this.head.bind(_this);
    return _this;
  }

  _createClass(NotFound, [{
    key: 'head',
    value: function head() {
      return _react2.default.createElement(
        _reactHelmet2.default,
        null,
        _react2.default.createElement(
          'title',
          null,
          'Page Not Found'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        this.head(),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Sorry, the page you are expecting does not exist!'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              { onClick: function onClick() {
                  return _this2.props.history.goBack();
                } },
              'Back'
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouterDom.NavLink,
                { to: '/' },
                ' Home '
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouterDom.NavLink,
                { to: '/login' },
                ' Login '
              )
            )
          )
        )
      );
    }
  }]);

  return NotFound;
}(_react.Component);

exports.default = NotFound;

/***/ }),

/***/ "./src/pages/constants/constants.js":
/*!******************************************!*\
  !*** ./src/pages/constants/constants.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var MONTH = exports.MONTH = 'month';
var YEAR = exports.YEAR = 'year';
var WEEK = exports.WEEK = 'week';

/***/ }),

/***/ "./src/pages/routes/routes.js":
/*!************************************!*\
  !*** ./src/pages/routes/routes.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactDom = __webpack_require__(/*! react-dom */ "react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Login = __webpack_require__(/*! ../components/Login */ "./src/pages/components/Login.js");

var _Login2 = _interopRequireDefault(_Login);

var _NotFound = __webpack_require__(/*! ../components/NotFound */ "./src/pages/components/NotFound.js");

var _NotFound2 = _interopRequireDefault(_NotFound);

var _Home = __webpack_require__(/*! ../components/Home */ "./src/pages/components/Home.js");

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { path: '/', exact: true, render: function render(props) {
                return _react2.default.createElement(_Home2.default, props);
            } }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/home', exact: true, render: function render(props) {
                return _react2.default.createElement(_Home2.default, props);
            } }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/login', exact: true, render: function render(props) {
                return _react2.default.createElement(_Login2.default, props);
            } }),
        _react2.default.createElement(_reactRouterDom.Route, { render: function render(props) {
                return _react2.default.createElement(_NotFound2.default, props);
            } })
    );
};

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

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

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2FwaS9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvZGIvbW9uZ29vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9leHBlbnNlTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hcGlDYWxscy9BcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Ib21lLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL0xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05ld0V4cGVuc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvTm90Rm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbnN0YW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3JvdXRlcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbmdvb3NlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb21cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIl0sIm5hbWVzIjpbInNpZ25VcCIsInJlcXVlc3QiLCJyZXNwb25zZSIsImJvZHkiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZW1haWxJZCIsInVzZXIiLCJVc2VycyIsIl9pZCIsIm1vbmdvb3NlIiwiVHlwZXMiLCJPYmplY3RJZCIsImZpbmQiLCJ0aGVuIiwicmVzIiwibGVuZ3RoIiwic2VuZCIsImVycm9yIiwibXNnIiwic2F2ZSIsImRvYyIsInNlc3Npb24iLCJfdXNlcklkIiwiZSIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJzaWduSW4iLCJuZXdFeHBlbnNlIiwiYW1vdW50IiwiY2F0ZWdvcnkiLCJkYXRlIiwidHlwZSIsInBhcnNlSW50IiwiRGF0ZSIsInd3IiwiTWF0aCIsImNlaWwiLCJnZXREYXRlIiwiZG93IiwiZ2V0RGF5IiwibW0iLCJnZXRNb250aCIsInl5IiwiZ2V0RnVsbFllYXIiLCJuZXdFeHBlbnNlSW5zdGFuY2UiLCJFeHBlbnNlcyIsInVzZXJfaWQiLCJlcnIiLCJnZXRFeHBlbnNlRGF0YSIsInVzZXJJZCIsImV4cGVuc2VEYXRlUmVzcG9uZGVyIiwiZGF0YSIsInJlc3BvbmQiLCJleHBlbnNlTGlzdCIsImluY29tZUxpc3QiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwic3BlbnQiLCJzdGFuZGluZyIsInRyYW5zYWN0aW9uTGlzdCIsInRyYW5zYWN0aW9uIiwicGVyY2VudCIsInJvdW5kIiwiZ3JvdXAxIiwiJGdyb3VwIiwiJHN1bSIsImdyb3VwMiIsIiRwdXNoIiwidW53aW5kIiwiJHVud2luZCIsInNvcnQiLCIkc29ydCIsInJlR3JvdXAiLCJ0YWIiLCJZRUFSIiwiYWdncmVnYXRlIiwiJG1hdGNoIiwiJHByb2plY3QiLCJhbGxvd0Rpc2tVc2UiLCJleGVjIiwiTU9OVEgiLCJXRUVLIiwiZW52IiwicHJvY2VzcyIsIlBPUlQiLCJNT05HT0xBQl9VUkkiLCJtb25nb29zZTEiLCJyZXF1aXJlIiwiUHJvbWlzZSIsImdsb2JhbCIsImNvbm5lY3QiLCJ1c2VOZXdVcmxQYXJzZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9kZWwiLCJTY2hlbWEiLCJyZWYiLCJOdW1iZXIiLCJyZXF1aXJlZCIsInRyaW0iLCJTdHJpbmciLCJkZWZhdWx0Iiwibm93IiwibWlubGVuZ3RoIiwiZXhwZW5zZSIsImFwcCIsInBvcnQiLCJ1c2UiLCJzZWNyZXQiLCJyZXNhdmUiLCJzYXZlVW5pbml0aWFsaXplZCIsImJvZHlQYXJzZXIiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJqc29uIiwiZXhwcmVzcyIsInN0YXRpYyIsInBvc3QiLCJsb2FkSHRtbCIsImNvbnRlbnQiLCJoZWxtZXQiLCJIZWxtZXQiLCJyZW5kZXJTdGF0aWMiLCJtZXRhIiwidG9TdHJpbmciLCJ0aXRsZSIsImdldCIsInJlcSIsImNvbnRleHQiLCJSZWFjdERPTVNlcnZlciIsInJlbmRlclRvU3RyaW5nIiwidXJsIiwidGVtcGxhdGUiLCJsaXN0ZW4iLCJBcHAiLCJDb21wb25lbnQiLCJzaWdudXAiLCJwYXJhbXMiLCJheGlvcyIsInNpZ25pbiIsIm5ld19leHBlbnNlIiwiZ2V0X2V4cGVuc2VfZGF0YSIsIkhvbWUiLCJwcm9wcyIsImxlZnRNZW51Q2xpY2siLCJiaW5kIiwibmF2aWdhdGVUb1NpZ25JbiIsInN0YXRlIiwiYWN0aXZlVGFiIiwic2hvd05ld0V4cGVuc2UiLCJ1bmRlZmluZWQiLCJ2aWV3TW9yZSIsImdldEV4cGVuc2UiLCJyZXNwIiwic2V0U3RhdGUiLCJyZWZzIiwiYmFja0Ryb3AiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJwb3B1cCIsImZpcnN0SGFsZkxhbmRpbmdUeHQiLCJvdGhlckhhbGZMYW5kaW5nVHh0IiwiaGlzdG9yeSIsInB1c2giLCJ2YWwiLCJpbmRleCIsIm1heFdpZHRoIiwicmVuZGVyTGVmdE1lbnVCYXIiLCJjaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0IiwicmVuZGVyVHJhbnNhY3Rpb25jYXJkIiwiY2xpY2tWaWV3TW9yZSIsImZpbGwiLCJzdHJva2UiLCJzdHJva2VXaWR0aCIsIkxvZ2luIiwiaGVhZCIsImNhdGNoIiwidGFyZ2V0IiwidmFsdWUiLCJOZXdFeHBlbnNlIiwic2VsZWN0VHlwZSIsInN1Ym1pdE5ld0V4cGVuc2UiLCJkYXkiLCJtb250aCIsInllYXIiLCJjdXJyZW50IiwibmV4dCIsImZvY3VzIiwiZGF0ZVJlZyIsInRlc3QiLCJyZWciLCJpc1ZhbGlkRGF0ZSIsImlzVmFsaWRhdGlvblN1Y2Nlc3MiLCJ2YWxpZGF0ZVBhcmFtcyIsImNoYW5nZUFtb3VudCIsImNoYW5nZURhdGUiLCJOb3RGb3VuZCIsImdvQmFjayJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNE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ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NlcnZlci9zZXJ2ZXIuanNcIik7XG4iLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IGFwcCBmcm9tICcuLi9zZXJ2ZXInXG5pbXBvcnQgRXhwZW5zZXMgZnJvbSAnLi4vbW9kZWxzL2V4cGVuc2VNb2RlbCc7XG5pbXBvcnQgVXNlcnMgZnJvbSAnLi4vbW9kZWxzL3VzZXJNb2RlbCc7XG5pbXBvcnQgeyBNT05USCwgWUVBUiwgV0VFSyB9IGZyb20gJy4uLy4uL3NyYy9wYWdlcy9jb25zdGFudHMvY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IHNpZ25VcCA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIC8vIFVzZXJzLmRlbGV0ZU1hbnkoe30pO1xuICAgIGNvbnN0IHsgdXNlcm5hbWUgPSAnJywgcGFzc3dvcmQgPSAnJywgZW1haWxJZCA9ICcnIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgdmFyIHVzZXIgPSBuZXcgVXNlcnMoe1xuICAgICAgICBfaWQ6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKCksXG4gICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICBlbWFpbElkOiBlbWFpbElkXG4gICAgfSk7XG4gICAgVXNlcnMuZmluZCh7IHVzZXJuYW1lOiB1c2VybmFtZSB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IHRydWUsIG1zZzogJ1VzZXJuYW1lIGFscmVhZHkgRXhpc3RzJyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oKGRvYykgPT4ge1xuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID0gZG9jLl9pZDtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IGZhbHNlLCBtc2c6ICdTYXZlZCBTdWNjZXNzZnVsbHknIH0pO1xuICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zdGF0dXMoNTAwKS5zZW5kKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCAoZSkgPT4ge1xuICAgICAgICByZXNwb25zZS5zZW5kKGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaWduSW4gPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCB7IHVzZXJuYW1lID0gJycsIHBhc3N3b3JkID0gJycsIGVtYWlsSWQgPSAnJyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGNvbnNvbGUubG9nKHJlcXVlc3Quc2Vzc2lvbi51c2VyKTtcbiAgICBVc2Vycy5maW5kKHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVxdWVzdC5zZXNzaW9uLl91c2VySWQgPSByZXNbMF0uX2lkO1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiBmYWxzZSwgbXNnOiAnc3VjY2VzcycgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IHRydWUsIG1zZzogJ05vIHVzZXIgYWNjb3VudCBmb3VuZCcgfSk7XG4gICAgICAgIH1cbiAgICB9LCAoZSkgPT4ge1xuICAgICAgICByZXNwb25zZS5zZW5kKGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBuZXdFeHBlbnNlID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgbGV0IHsgYW1vdW50LCBjYXRlZ29yeSwgZGF0ZSwgdHlwZSB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGFtb3VudCA9IHBhcnNlSW50KGFtb3VudCk7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIGNvbnN0IHd3ID0gTWF0aC5jZWlsKGRhdGUuZ2V0RGF0ZSgpIC8gNyk7XG4gICAgY29uc3QgZG93ID0gZGF0ZS5nZXREYXkoKSArIDE7XG4gICAgY29uc3QgbW0gPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IHl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IG5ld0V4cGVuc2UgPSB7IGFtb3VudCwgY2F0ZWdvcnksIGRhdGUsIHR5cGUsIHd3LCBkb3csIG1tLCB5eSB9O1xuICAgIHZhciBuZXdFeHBlbnNlSW5zdGFuY2UgPSBuZXcgRXhwZW5zZXMoe1xuICAgICAgICB1c2VyX2lkOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZChcIjVjMTYzMGFkNzY2OWVhMmM5YmIwNDYxNlwiKSxcbiAgICAgICAgLi4ubmV3RXhwZW5zZVxuICAgIH0pO1xuICAgIG5ld0V4cGVuc2VJbnN0YW5jZS5zYXZlKCkudGhlbigoZG9jKSA9PiB7XG4gICAgICAgIC8vIHJlcXVlc3Quc2Vzc2lvbi51c2VyID0gZG9jLnVzZXJuYW1lO1xuICAgICAgICByZXNwb25zZS5zZW5kKGRvYyk7XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIHNhdmUgbmV3IEV4cGVuc2UnLCBlcnIpO1xuICAgICAgICByZXNwb25zZS5zdGF0dXMoNTAwKS5zZW5kKGVycik7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZURhdGEgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSByZXF1ZXN0LnNlc3Npb24udXNlcl9pZCA/IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKHJlcXVlc3Quc2Vzc2lvbi51c2VyX2lkKSA6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKFwiNWMxNjMwYWQ3NjY5ZWEyYzliYjA0NjE2XCIpO1xuICAgIGZ1bmN0aW9uIGV4cGVuc2VEYXRlUmVzcG9uZGVyKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZXNwb25kLnNlbmQoNTAwKS5zZW5kKGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZXhwZW5zZUxpc3QsIGluY29tZUxpc3Q7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhW2tleV0udHlwZSA9PT0gJ2V4cGVuc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVuc2VMaXN0ID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YVtrZXldLnR5cGUgPT09ICdpbmNvbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGluY29tZUxpc3QgPSBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgc3BlbnQsIHN0YW5kaW5nO1xuICAgICAgICAgICAgaWYgKGV4cGVuc2VMaXN0KSB7XG4gICAgICAgICAgICAgICAgZXhwZW5zZUxpc3QudHJhbnNhY3Rpb25MaXN0Lm1hcCgodHJhbnNhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSB0cmFuc2FjdGlvbi5hbW91bnQgLyAoZXhwZW5zZUxpc3QuYW1vdW50IC8gMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ucGVyY2VudCA9IE1hdGgucm91bmQocGVyY2VudCAqIDEwMCkgLyAxMDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3BlbnQgPSBleHBlbnNlTGlzdC5hbW91bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5jb21lTGlzdCkge1xuICAgICAgICAgICAgICAgIGluY29tZUxpc3QudHJhbnNhY3Rpb25MaXN0Lm1hcCgodHJhbnNhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSB0cmFuc2FjdGlvbi5hbW91bnQgLyAoaW5jb21lTGlzdC5hbW91bnQgLyAxMDApO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5wZXJjZW50ID0gTWF0aC5yb3VuZChwZXJjZW50ICogMTAwKSAvIDEwMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzdGFuZGluZyA9IGluY29tZUxpc3QuYW1vdW50IC0gc3BlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHNwZW50LCBzdGFuZGluZyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFF1ZXJpZXMgc3RhcnRcbiAgICBjb25zdCBncm91cDEgPSB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7IGNhdGVnb3J5OiAnJGNhdGVnb3J5JywgdHlwZTogJyR0eXBlJyB9LFxuICAgICAgICAgICAgdHlwZTogeyAnJGZpcnN0JzogJyR0eXBlJyB9LFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHsgJyRmaXJzdCc6ICckY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJHN1bTogJyRhbW91bnQnIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZ3JvdXAyID0ge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDogeyB0eXBlOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJHN1bTogJyRhbW91bnQnIH0sXG4gICAgICAgICAgICB0eXBlOiB7ICckZmlyc3QnOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3Q6IHsgJHB1c2g6IHsgY2F0ZWdvcnk6ICckY2F0ZWdvcnknLCBhbW91bnQ6ICckYW1vdW50JyB9IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgdW53aW5kID0geyAkdW53aW5kOiAnJHRyYW5zYWN0aW9uTGlzdCcgfTtcbiAgICBjb25zdCBzb3J0ID0geyAkc29ydDogeyAndHJhbnNhY3Rpb25MaXN0LmFtb3VudCc6IC0xIH0gfVxuICAgIGNvbnN0IHJlR3JvdXAgPSB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7IHR5cGU6ICckdHlwZScgfSxcbiAgICAgICAgICAgIGFtb3VudDogeyAnJGZpcnN0JzogJyRhbW91bnQnIH0sXG4gICAgICAgICAgICB0eXBlOiB7ICckZmlyc3QnOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3Q6IHsgJHB1c2g6ICckdHJhbnNhY3Rpb25MaXN0JyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIFF1ZXJpZXMgZW5kXG5cbiAgICBjb25zdCB7IHRhYiwgd3csIG1tLCB5eSwgZG93IH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgaWYgKHRhYiA9PT0gWUVBUikge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IE1PTlRIKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0seyAkbWF0Y2g6IHsgbW06IHBhcnNlSW50KG1tKSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IFdFRUspIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9IH0sXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB5eTogcGFyc2VJbnQoeXkpIH0gfSx7ICRtYXRjaDogeyBtbTogcGFyc2VJbnQobW0pIH0gfSx7ICRtYXRjaDogeyB3dzogcGFyc2VJbnQod3cpIH0gfSxcbiAgICAgICAgICAgIHsgLi4uZ3JvdXAxIH0seyAuLi5ncm91cDIgfSxcbiAgICAgICAgICAgIHsgLi4udW53aW5kIH0seyAuLi5zb3J0IH0seyAuLi5yZUdyb3VwIH0sXG4gICAgICAgICAgICB7ICRwcm9qZWN0OiB7IF9pZDogMCwgYW1vdW50OiAxLCB0eXBlOiAxLCB0cmFuc2FjdGlvbkxpc3Q6IDEgfSB9XG4gICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4cGVuc2VEYXRlUmVzcG9uZGVyKTtcbiAgICB9XG59O1xuXG5cbiIsInZhciBlbnYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnO1xuXG5pZiAoZW52ID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gIHByb2Nlc3MuZW52LlBPUlQgPSA0MDAwO1xuICBwcm9jZXNzLmVudi5NT05HT0xBQl9VUkkgPSAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9leHBlbnNlJztcbn0gZWxzZSB7XG4gIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSA9ICdtb25nb2RiOi8vZGhpbGlwazEzOmRoaWxpcGsxM0BkczI0NzMxMC5tbGFiLmNvbTo0NzMxMC9leHBlbnNlJztcbn1cbmV4cG9ydCBkZWZhdWx0IGVudjsiLCJ2YXIgbW9uZ29vc2UxID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcbm1vbmdvb3NlMS5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG5tb25nb29zZTEuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0xBQl9VUkksIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlIH0pLnRoZW4oKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gRGInKTtcbn0sKGUpPT4ge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHttb25nb29zZTF9OyIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgVXNlcnMgZnJvbSAnLi91c2VyTW9kZWwnO1xuXG5jb25zdCBFeHBlbnNlcyA9IG1vbmdvb3NlLm1vZGVsKCdFeHBlbnNlcycsIHtcbiAgdXNlcl9pZDoge1xuICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICByZWY6ICdVc2VycydcbiAgfSxcbiAgYW1vdW50OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHRyaW06IHRydWVcbiAgfSxcbiAgY2F0ZWdvcnk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICAgIGRlZmF1bHQ6ICdvdGhlcnMnXG4gIH0sXG4gIHR5cGU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWUsXG4gICAgZGVmYXVsdDogJ2V4cGVuc2UnXG4gIH0sXG4gIGRhdGU6IHtcbiAgICB0eXBlOiBEYXRlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlLFxuICAgIGRlZmF1bHQ6IERhdGUubm93KClcbiAgfSxcbiAgd3c6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgZG93OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIG1tOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIHl5OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZXM7IiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBFeHBlbnNlcyBmcm9tICcuL2V4cGVuc2VNb2RlbCc7XG5cbmNvbnN0IFVzZXJzID0gbW9uZ29vc2UubW9kZWwoJ1VzZXJzJywge1xuICAgIF9pZDogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuICAgIHVzZXJuYW1lOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbmxlbmd0aDogNSxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgZW1haWxJZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWlubGVuZ3RoOiA4LFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBleHBlbnNlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCwgXG4gICAgICAgICAgICByZWY6ICdFeHBlbnNlcydcbiAgICAgICAgfVxuICAgIF1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgVXNlcnM7IiwiaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCc7XG5pbXBvcnQgZW52IGZyb20gJy4vY29uZmlnL2NvbmZpZyc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET01TZXJ2ZXIgZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xudmFyIHNlc3Npb24gPSByZXF1aXJlKCdleHByZXNzLXNlc3Npb24nKTtcblxuaW1wb3J0IEFwcCBmcm9tICcuLi9zcmMvYXBwJ1xuaW1wb3J0IG1vbmdvb3NlMSBmcm9tICcuL2RiL21vbmdvb3NlJztcbmltcG9ydCB7c2lnblVwLCBzaWduSW4sIG5ld0V4cGVuc2UsIGdldEV4cGVuc2VEYXRhfSBmcm9tICcuL2FwaS9hcGlDYWxscyc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUO1xuXG5hcHAudXNlKHNlc3Npb24oe1xuICAgIHNlY3JldDogJ2RoaWxpcExvY2FsJyxcbiAgICByZXNhdmU6IGZhbHNlLFxuICAgIHNhdmVVbmluaXRpYWxpemVkOiB0cnVlXG59KSlcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYygnYnVpbGQvcHVibGljJykpO1xuYXBwLnVzZSgnL3N0eWxlcycsIGV4cHJlc3Muc3RhdGljKCdzcmMvcGFnZXMvc3R5bGVzJykpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYygnc3JjL3BhZ2VzL3N0YXRpYycpKTtcblxuLy8gQVBJIENhbGxzXG5hcHAucG9zdCgnL3NpZ251cCcsIHNpZ25VcCk7XG5hcHAucG9zdCgnL3NpZ25pbicsIHNpZ25Jbik7XG5hcHAucG9zdCgnL25ld19leHBlbnNlJywgbmV3RXhwZW5zZSk7XG5hcHAucG9zdCgnL2dldF9leHBlbnNlX2RhdGEnLCBnZXRFeHBlbnNlRGF0YSk7XG5cbmNvbnN0IGxvYWRIdG1sID0gKGNvbnRlbnQpID0+IHtcbiAgICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG4gICAgcmV0dXJuIChgXG4gICAgICAgIDxodG1sPlxuICAgICAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICAgICAgJHtoZWxtZXQubWV0YS50b1N0cmluZygpfVxuICAgICAgICAgICAgICAgICR7aGVsbWV0LnRpdGxlLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3R3aXR0ZXItYm9vdHN0cmFwLzQuMS4zL2Nzcy9ib290c3RyYXAubWluLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvdHdpdHRlci1ib290c3RyYXAvNC4xLjMvanMvYm9vdHN0cmFwLmJ1bmRsZS5taW4uanNcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvY29tbW9uLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9ob21lLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9uZXdfZXhwZW5zZS5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2Fuc1wiIHJlbD1cInN0eWxlc2hlZXRcIj5cbiAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgIDxib2R5PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyb290XCI+JHtjb250ZW50fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiY2xpZW50X2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICAgICAgPC9ib2R5PlxuICAgICAgICA8L2h0bWw+YCk7XG59O1xuXG5hcHAuZ2V0KCcqJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHt9O1xuICAgIGNvbnN0IGNvbnRlbnQgPSBSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0cmluZyhcbiAgICAgICAgPFN0YXRpY1JvdXRlcj5cbiAgICAgICAgICAgIDxBcHAgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9IC8+XG4gICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICk7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBsb2FkSHRtbChjb250ZW50KTtcbiAgICByZXMuc2VuZCh0ZW1wbGF0ZSk7XG59KTtcblxuYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ3Byb2Nlc3MuZW52JywgcG9ydCk7XG4gICAgY29uc29sZS5sb2coJ1NlcnZlciBTdGFydGVkIG9uIFBvcnQ6ICcsIHBvcnQpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwcDsiLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN3aXRjaCwgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IEhvbWUgZnJvbSAnLi9wYWdlcy9jb21wb25lbnRzL0xvZ2luJztcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi9wYWdlcy9yb3V0ZXMvcm91dGVzJztcbmltcG9ydCB7U2VydmVyUm91dGVyfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Um91dGVzLz5cbiAgICAgICAgKTtcbiAgICB9XG59IiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGNvbnN0IHNpZ251cCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9zaWdudXAvJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBzaWduaW4gPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvc2lnbmluLyc7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgey4uLnBhcmFtc30pO1xufVxuXG5leHBvcnQgY29uc3QgbmV3X2V4cGVuc2UgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvbmV3X2V4cGVuc2UvJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRfZXhwZW5zZV9kYXRhID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL2dldF9leHBlbnNlX2RhdGEvJyA7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgcGFyYW1zKTtcbn0iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCBOZXdFeHBlbnNlIGZyb20gJy4vTmV3RXhwZW5zZSc7XG5pbXBvcnQge2dldF9leHBlbnNlX2RhdGF9IGZyb20gJy4uL2FwaUNhbGxzL0FwaUNhbGxzJztcbmltcG9ydCB7TU9OVEgsIFlFQVIsIFdFRUt9IGZyb20gJy4uL2NvbnN0YW50cy9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5sZWZ0TWVudUNsaWNrID0gdGhpcy5sZWZ0TWVudUNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5uZXdFeHBlbnNlID0gdGhpcy5uZXdFeHBlbnNlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5uYXZpZ2F0ZVRvU2lnbkluID0gdGhpcy5uYXZpZ2F0ZVRvU2lnbkluLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFjdGl2ZVRhYjogTU9OVEgsXG4gICAgICBzaG93TmV3RXhwZW5zZTogZmFsc2UsXG4gICAgICBzdGFuZGluZzogdW5kZWZpbmVkLFxuICAgICAgc3BlbnQ6IHVuZGVmaW5lZCxcbiAgICAgIGV4cGVuc2VMaXN0OiB7fSxcbiAgICAgIGluY29tZUxpc3Q6IHt9LFxuICAgICAgdmlld01vcmU6IGZhbHNlXG5cbiAgICB9XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5nZXRFeHBlbnNlKCk7XG4gIH1cblxuICBnZXRFeHBlbnNlKCkge1xuICAgIGxldCBleHBlbnNlTGlzdCA9IHt9LCBpbmNvbWVMaXN0ID0ge30sIHN0YW5kaW5nID0nJztcbiAgICBjb25zdCB0YWIgPSB0aGlzLnN0YXRlLmFjdGl2ZVRhYjtcbiAgICBjb25zdCBtbSA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgZG93ID0gbmV3IERhdGUoKS5nZXREYXkoKTtcbiAgICBjb25zdCB3dyA9IE1hdGguY2VpbChuZXcgRGF0ZSgpLmdldERhdGUoKSAvIDcpO1xuICAgIGNvbnN0IHl5ID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHt0YWIsIG1tLCBkb3csIHd3LCB5eX07XG4gICAgZ2V0X2V4cGVuc2VfZGF0YShwYXJhbXMpLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgY29uc3Qge2V4cGVuc2VMaXN0LCBpbmNvbWVMaXN0LCBzdGFuZGluZywgc3BlbnR9ID0gcmVzcC5kYXRhO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHN0YW5kaW5nLCBzcGVudH0pO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gR2V0IEV4cGVuc2UgRGV0YWlscycsIGVycik7XG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KGFjdGl2ZVRhYikge1xuICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZVRhYjogYWN0aXZlVGFiLCB2aWV3TW9yZTogZmFsc2V9LCAoKSA9PiB7XG4gICAgICB0aGlzLmdldEV4cGVuc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxlZnRNZW51Q2xpY2soKSB7XG4gICAgdGhpcy5yZWZzLmJhY2tEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2JhY2tEcm9wJyk7XG4gICAgdGhpcy5yZWZzLnBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ3JpZ2h0MCcpO1xuICAgIHRoaXMucmVmcy5maXJzdEhhbGZMYW5kaW5nVHh0LmNsYXNzTGlzdC50b2dnbGUoJ3NjYWxlOTAnKTtcbiAgICB0aGlzLnJlZnMub3RoZXJIYWxmTGFuZGluZ1R4dC5jbGFzc0xpc3QudG9nZ2xlKCdzY2FsZTkwJyk7XG4gIH1cblxuICBuYXZpZ2F0ZVRvU2lnbkluKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMpO1xuICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvbG9naW4nKTtcbiAgfVxuXG4gIHJlbmRlckxlZnRNZW51QmFyKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudUJhclwiPlxuICAgICAgICA8ZGl2IHJlZj1cInBvcHVwXCJjbGFzc05hbWU9XCJwb3B1cCB6aTIgXCIgb25DbGljaz17dGhpcy5sZWZ0TWVudUNsaWNrfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGVCYXIgaW4tYmwgZmxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIj5TZXR0aW5nczwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51LW9wdGlvblwiIG9uQ2xpY2s9e3RoaXMubmF2aWdhdGVUb1NpZ25Jbn0+U2lnbiBJbjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51LW9wdGlvblwiPkFib3V0IE1lPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIG5ld0V4cGVuc2UodmFsKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2hvd05ld0V4cGVuc2U6IHZhbH0pO1xuICB9XG5cbiAgY2xpY2tWaWV3TW9yZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt2aWV3TW9yZTogIXRoaXMuc3RhdGUudmlld01vcmV9KTtcbiAgfVxuXG4gIHJlbmRlclRyYW5zYWN0aW9uY2FyZCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5leHBlbnNlTGlzdCAmJiBPYmplY3Qua2V5cyh0aGlzLnN0YXRlLmV4cGVuc2VMaXN0KS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLnN0YXRlLmV4cGVuc2VMaXN0LnRyYW5zYWN0aW9uTGlzdC5tYXAoKHRyYW5zYWN0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnZpZXdNb3JlIHx8ICF0aGlzLnN0YXRlLnZpZXdNb3JlICYmIGluZGV4IDwgMikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9eyd0cmFuc2FjdGlvbl90eXBlXycgKyBpbmRleH0gY2xhc3NOYW1lPVwidHJhbnNhY3RlZENhcmRJbm5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZElubmVyaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0X25hbWVcIj57dHJhbnNhY3Rpb24uY2F0ZWdvcnl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0X3BlcmNlbnRcIj57dHJhbnNhY3Rpb24ucGVyY2VudCArICcgJSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZ3Jlc3NCYXIgYmwgdGV4dENlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWxsZWRcIiBzdHlsZT0ge3ttYXhXaWR0aDogdHJhbnNhY3Rpb24ucGVyY2VudCArICclJ319PlxuICAgICAgICAgICAgICAgICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJmaWxsZWRcIiA+PC9kaXY+ICovfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHthY3RpdmVUYWIsIHNob3dOZXdFeHBlbnNlLCBzdGFuZGluZyA9IHVuZGVmaW5lZCwgc3BlbnQgPSB1bmRlZmluZWQsIHZpZXdNb3JlID0gZmFsc2V9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IHJlZj1cImJhY2tEcm9wXCIgY2xhc3NOYW1lPXsndHJhbnNpdGlvbjJhIHppMSAnICsgKHNob3dOZXdFeHBlbnNlID8gJ2JhY2tEcm9wJyA6ICcnKX0gb25DbGljaz17KCkgPT4gdGhpcy5uZXdFeHBlbnNlKGZhbHNlKX0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge3RoaXMucmVuZGVyTGVmdE1lbnVCYXIoKX1cbiAgICAgICAgICA8ZGl2IHJlZj1cIm1haW5Db250ZW50XCIgY2xhc3NOYW1lPVwibWFpbkNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlyc3QtaGFsZi1sYW5kaW5nXCI+XG4gICAgICAgICAgICAgIDxkaXYgcmVmPVwiZmlyc3RIYWxmTGFuZGluZ1R4dFwiIGNsYXNzTmFtZT1cImZpcnN0SGFsZlR4dFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhbmRpbmdcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxlZnQtbWVudS1jb250YWluZXJcIiBvbkNsaWNrPXt0aGlzLmxlZnRNZW51Q2xpY2t9PjxpbWcgY2xhc3NOYW1lPVwibGVmdC1tZW51XCIgc3JjPVwiL2ltZy9tZW51LnN2Z1wiLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7LyogPHNwYW4gY2xhc3NOYW1lPVwicmlnaHQtbWVudS1jb250YWluZXJcIiBvbkNsaWNrPXsoKSA9PiB7dGhpcy5zZXRTdGF0ZSh7dmlzaWJsZVJpZ2h0TWVudTogdHJ1ZX0pfX0+PGltZyBjbGFzc05hbWU9XCJyaWdodC1tZW51XCIgc3JjPVwiL2ltZy9tZW51LnN2Z1wiLz48L3NwYW4+ICovfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGluZ1wiPkV4cGVuc2UgSG9tZTwvZGl2PlxuICAgICAgICAgICAgICAgIHtzdGFuZGluZyA/IDxkaXYgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPnsnU3RhbmRpbmcgOiDigrknICsgc3RhbmRpbmd9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2VEYXlzQnRuXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBXRUVLID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdChXRUVLKX19PldlZWs8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBNT05USCA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHt0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoTU9OVEgpfX0+TW9udGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBZRUFSID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdChZRUFSKX19PlllYXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIHtzcGVudCA/IDxkaXYgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPnsnU3BlbnQgOiDigrknICsgc3BlbnR9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiByZWY9XCJ0cmFuc2FjdGVkQ2FyZFwiIGNsYXNzTmFtZT17J3RyYW5zYWN0ZWRDYXJkIHRyYW5zaXRpb24yYSAnICsgKHZpZXdNb3JlID8gJ3Nob3dBbGxUcmFuc2FjdGlvbicgOiAnJyl9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYW5zYWN0U2Nyb2xsZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUcmFuc2FjdGlvbmNhcmQoKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlld01vcmVBcnJvd1wiIG9uQ2xpY2s9eygpID0+IHRoaXMuY2xpY2tWaWV3TW9yZSgpfT5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9e3ZpZXdNb3JlID8gJ3JvdGF0ZVZpZXdNb3JlJyA6ICcnfSByZWY9XCJzdmdWaWV3TW9yZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk03LjQxIDcuODRMMTIgMTIuNDJsNC41OS00LjU4TDE4IDkuMjVsLTYgNi02LTZ6XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdGhlci1oYWxmLWxhbmRpbmdcIj5cbiAgICAgICAgICAgICAgPGRpdiByZWY9XCJvdGhlckhhbGZMYW5kaW5nVHh0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIHRyU3VtYXJ5SGVhZGluZyBmYlwiID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlRyYW5zYWN0aW9uIFN1bW1hcnk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHN2ZyBoZWlnaHQ9XCIyMDBcIiB3aWR0aD1cIjMwMFwiIGNsYXNzPVwiY2hhcnRcIj5cbiAgICAgICAgICAgICAgICAgIDxwb2x5bGluZSBwb2ludHM9XCIwLDE4MCA1MDAsMTgwXCIgc3R5bGU9e3sgZmlsbDogJ3doaXRlJywgc3Ryb2tlOiAncmVkJywgc3Ryb2tlV2lkdGg6IFwiNFwifX0gLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ld0NvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXdcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmV3QnRuXCIgb25DbGljaz17KCkgPT4gdGhpcy5uZXdFeHBlbnNlKHRydWUpfT5BZGQgTmV3PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7c2hvd05ld0V4cGVuc2UgPyBcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgIDxOZXdFeHBlbnNlIG5ld0V4cGVuc2U9e3RoaXMubmV3RXhwZW5zZX0vPlxuICAgICAgICAgIDwvZGl2PiA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCB7c2lnbnVwLCBzaWduaW59IGZyb20gJy4uL2FwaUNhbGxzL0FwaUNhbGxzJztcblxuY2xhc3MgTG9naW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNpZ25VcCA9IHRoaXMuc2lnblVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaWduSW4gPSB0aGlzLnNpZ25Jbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB1c2VybmFtZTogJ2RoaWxpcCcsXG4gICAgICBwYXNzd29yZDogJ2RoaWxpcGRoaWxpcCdcbiAgICB9XG4gIH1cblxuICBoZWFkKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0PlxuICAgICAgICA8dGl0bGU+RXhwZW5zZSBMb2dpbjwvdGl0bGU+XG4gICAgICA8L0hlbG1ldD5cbiAgICApO1xuICB9XG5cbiAgc2lnblVwKCkge1xuICAgIHNpZ251cCh7dXNlcm5hbWU6IHRoaXMuc3RhdGUudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSk7XG4gIH1cblxuICBzaWduSW4oKSB7XG4gICAgc2lnbmluKHt1c2VybmFtZTogdGhpcy5zdGF0ZS51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMuc3RhdGUucGFzc3dvcmR9KS50aGVuKChyZXNwKSA9PiB7XG4gICAgICBpZiAocmVzcC5kYXRhICYmICFyZXNwLmRhdGEuZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvaG9tZScsIHt9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gU2lnbkluJywgcmVzcCk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBTaWduSW4nLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5oZWFkKCl9XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgxPkxvZ2luPC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj0ndXNlcm5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLnVzZXJuYW1lfSBvbkNoYW5nZSA9IHsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7dXNlcm5hbWU6IGUudGFyZ2V0LnZhbHVlfSl9IHR5cGU9XCJ0ZXh0XCIvPlxuICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPSdwYXNzd29yZCcgdmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9IG9uQ2hhbmdlID0geyhlKSA9PiB0aGlzLnNldFN0YXRlKHtwYXNzd29yZDogZS50YXJnZXQudmFsdWV9KX0gdHlwZT1cInBhc3N3b3JkXCIvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zaWduSW59PlNpZ24gSW48L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2lnblVwfT5TaWduIFVwPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTG9naW47IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge25ld19leHBlbnNlfSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG4vLyBpbXBvcnQge2NvbW1hRm9ybWF0dGVkfSBmcm9tICcuLi91dGlscy91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0V4cGVuc2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnNlbGVjdFR5cGUgPSB0aGlzLnNlbGVjdFR5cGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN1Ym1pdE5ld0V4cGVuc2UgPSB0aGlzLnN1Ym1pdE5ld0V4cGVuc2UuYmluZCh0aGlzKTtcbiAgICBcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdHlwZTogJ2V4cGVuc2UnLFxuICAgICAgYW1vdW50OiAnJyxcbiAgICAgIGNhdGVnb3J5OiAnJyxcbiAgICAgIGRheTogJycsIFxuICAgICAgbW9udGg6ICcnLFxuICAgICAgeWVhcjogJycsXG4gICAgICBlcnJvcjoge31cbiAgICB9XG4gIH1cblxuICBzZWxlY3RUeXBlKHR5cGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt0eXBlOiB0eXBlfSk7XG4gIH1cblxuICBjaGFuZ2VBbW91bnQodmFsKXtcbiAgICB0aGlzLnNldFN0YXRlKHthbW91bnQ6IHZhbH0pXG4gIH1cblxuICBjaGFuZ2VEYXRlKHZhbCwgY3VycmVudCwgbmV4dCkge1xuICAgIHRoaXMuc2V0U3RhdGUoey4uLnZhbH0pO1xuICAgIGlmIChjdXJyZW50ICYmIHZhbFtjdXJyZW50XS5sZW5ndGggPT09IDIgJiYgbmV4dCkge1xuICAgICAgdGhpcy5yZWZzW25leHRdLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgaXNWYWxpZERhdGUoKSB7XG4gICAgY29uc3Qge2RheSwgbW9udGgsIHllYXJ9ID0gdGhpcy5zdGF0ZTtcbiAgICB2YXIgZGF0ZVJlZyA9IC9eWzAtOV1bMC05XSQvO1xuICAgIGlmICghZGF0ZVJlZy50ZXN0KGRheSkgfHwgIWRhdGVSZWcudGVzdChtb250aCkgfHwgIWRhdGVSZWcudGVzdCh5ZWFyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgyMDAwICsgcGFyc2VJbnQoeWVhciksIHBhcnNlSW50KG1vbnRoKS0xLCBwYXJzZUludChkYXkpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICB2YWxpZGF0ZVBhcmFtcygpIHtcbiAgICB2YXIgcmVnID0gL15cXGQrJC87XG4gICAgY29uc3Qge2Ftb3VudCwgY2F0ZWdvcnl9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAoIWFtb3VudCB8fCAhcmVnLnRlc3QoYW1vdW50KSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHthbW91bnQ6ICdQbGVhc2UgcHJvdmlkZSBhIFZhbGlkIEFtb3VudCd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghY2F0ZWdvcnkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB7Y2F0ZWdvcnk6ICdQbGVhc2UgcHJvdmlkZSBhIFZhbGlkIENhdGVnb3J5J319KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzVmFsaWREYXRlKCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB7ZGF0ZTogJ1BsZWFzZSBwcm92aWRlIGEgVmFsaWQgRGF0ZSd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHN1Ym1pdE5ld0V4cGVuc2UoKSB7XG4gICAgY29uc3Qge2Ftb3VudCwgZGF5LCBtb250aCwgeWVhciwgdHlwZSwgY2F0ZWdvcnl9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBpc1ZhbGlkYXRpb25TdWNjZXNzID0gdGhpcy52YWxpZGF0ZVBhcmFtcygpO1xuICAgIGlmIChpc1ZhbGlkYXRpb25TdWNjZXNzKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IGFtb3VudCwgdHlwZSwgZGF0ZTogdGhpcy5kYXRlLCBjYXRlZ29yeX07XG4gICAgICBuZXdfZXhwZW5zZShwYXJhbXMpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMubmV3RXhwZW5zZShmYWxzZSk7XG4gICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gY3JlYXRlIG5ldyBFeHBlbnNlJyxlcnIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHt0eXBlLCBhbW91bnQsIGRheSwgbW9udGgsIHllYXIsIGNhdGVnb3J5LCBlcnJvcn0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3RXhwZW5zZUNvbnRhaW5lciB6aTJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBJbmNCdG5zIHRleHRDZW50ZXJcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eyduZXdCdG4gJyArICh0eXBlID09PSAnZXhwZW5zZScgPyAnc2VsZWN0ZWRUeXBlJyA6ICcnKX0gIG9uQ2xpY2s9eygpID0+IHRoaXMuc2VsZWN0VHlwZSgnZXhwZW5zZScpfT5FeHBlbnNlPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J25ld0J0biAnICsgKHR5cGUgPT09ICdpbmNvbWUnID8gJ3NlbGVjdGVkVHlwZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2VsZWN0VHlwZSgnaW5jb21lJyl9PkluY29tZTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW1vdW50SW5wdXRcIj5cbiAgICAgICAgPHNwYW4+4oK5PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQW1vdW50XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZUFtb3VudChlLnRhcmdldC52YWx1ZSl9IHZhbHVlPXthbW91bnR9Lz5cbiAgICAgICAgICB7ZXJyb3IuYW1vdW50ID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5hbW91bnR9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgIGNsYXNzTmFtZT1cImNhdGVnb3J5SW5wdXRcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkNhdGVnb3J5XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHtjYXRlZ29yeTogZS50YXJnZXQudmFsdWV9KX0gdmFsdWU9e2NhdGVnb3J5fS8+XG4gICAgICAgICAge2Vycm9yLmNhdGVnb3J5ID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5jYXRlZ29yeX08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGVudERheVwiPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJkYXlcIiBjbGFzc05hbWU9XCJkYXlJcFwiIHR5cGU9XCJudW1iZXJcIiBtYXhMZW5ndGg9XCIyXCIgcGxhY2Vob2xkZXI9XCJERFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHtkYXk6IGUudGFyZ2V0LnZhbHVlfSwgJ2RheScsICdtb250aCcpfSB2YWx1ZT17ZGF5fS8+XG4gICAgICAgICAgPGlucHV0IHJlZj1cIm1vbnRoXCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiTU1cIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7bW9udGg6IGUudGFyZ2V0LnZhbHVlfSwgJ21vbnRoJywgJ3llYXInKX0gdmFsdWU9e21vbnRofS8+XG4gICAgICAgICAgPGlucHV0IHJlZj1cInllYXJcIiBjbGFzc05hbWU9XCJkYXlJcFwiIHR5cGU9XCJudW1iZXJcIiBtYXhMZW5ndGg9XCIyXCIgcGxhY2Vob2xkZXI9XCJZWVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHt5ZWFyOiBlLnRhcmdldC52YWx1ZX0sICd5ZWFyJyl9IHZhbHVlPXt5ZWFyfS8+XG4gICAgICAgICAge2Vycm9yLmRhdGUgPyA8ZGl2IGNsYXNzTmFtZT1cImVycm9yRGl2XCI+e2Vycm9yLmRhdGV9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VibWl0QnRuXCIgb25DbGljaz17dGhpcy5zdWJtaXROZXdFeHBlbnNlfT5Eb25lPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IHtOYXZMaW5rfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY2xhc3MgTm90Rm91bmQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhlYWQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxIZWxtZXQ+XG4gICAgICAgIDx0aXRsZT5QYWdlIE5vdCBGb3VuZDwvdGl0bGU+XG4gICAgICA8L0hlbG1ldD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5oZWFkKCl9XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgxPlNvcnJ5LCB0aGUgcGFnZSB5b3UgYXJlIGV4cGVjdGluZyBkb2VzIG5vdCBleGlzdCE8L2gxPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGkgb25DbGljaz0geygpID0+IHRoaXMucHJvcHMuaGlzdG9yeS5nb0JhY2soKX0+IFxuICAgICAgICAgICAgICBCYWNrXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICA8TmF2TGluayB0bz0nLyc+IEhvbWUgPC9OYXZMaW5rPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPE5hdkxpbmsgdG89Jy9sb2dpbic+IExvZ2luIDwvTmF2TGluaz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBOb3RGb3VuZDsiLCJleHBvcnQgY29uc3QgTU9OVEggPSAnbW9udGgnO1xuZXhwb3J0IGNvbnN0IFlFQVIgPSAneWVhcic7XG5leHBvcnQgY29uc3QgV0VFSyA9ICd3ZWVrJztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0Jyb3dzZXJSb3V0ZXIsIFN3aXRjaCwgUm91dGV9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCBMb2dpbiBmcm9tICcuLi9jb21wb25lbnRzL0xvZ2luJztcbmltcG9ydCBOb3RGb3VuZCBmcm9tICcuLi9jb21wb25lbnRzL05vdEZvdW5kJ1xuaW1wb3J0IEhvbWUgZnJvbSAnLi4vY29tcG9uZW50cy9Ib21lJztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxTd2l0Y2g+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD0nLycgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxIb21lIHsuLi5wcm9wc30vPn0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9Jy9ob21lJyBleGFjdCByZW5kZXI9eyhwcm9wcykgPT4gPEhvbWUgey4uLnByb3BzfS8+fS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD0nL2xvZ2luJyBleGFjdCByZW5kZXI9eyhwcm9wcykgPT4gPExvZ2luIHsuLi5wcm9wc30vPn0vPlxuICAgICAgICAgICAgPFJvdXRlIHJlbmRlcj17KHByb3BzKSA9PiA8Tm90Rm91bmQgey4uLnByb3BzfS8+fS8+XG4gICAgICAgIDwvU3dpdGNoPlxuICAgICk7XG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLXNlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaGVsbWV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=