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
exports.getExpenseSummary = exports.getExpenseData = exports.newExpense = exports.signIn = exports.signUp = undefined;

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

var getExpenseSummary = exports.getExpenseSummary = function getExpenseSummary(request, response) {
    function execSummaryQuery(err, data) {
        if (err) {
            respond.send(500).send(err);
        } else {
            if (data[0].perDay) {
                var total = data[0].amount;
                data[0].perDay.forEach(function (element) {
                    var percent = element.amount / total;
                    element.percent = Math.round(percent * 1000) / 10;
                });
            }
            response.send(_extends({}, data[0]));
        }
    };
    var userId = request.session.user_id ? _mongoose2.default.Types.ObjectId(request.session.user_id) : _mongoose2.default.Types.ObjectId("5c1630ad7669ea2c9bb04616");
    var _request$body5 = request.body,
        tab = _request$body5.tab,
        yy = _request$body5.yy,
        mm = _request$body5.mm,
        ww = _request$body5.ww;

    if (tab === _constants.YEAR) {
        _expenseModel2.default.aggregate([{ $match: { user_id: userId } }, { $match: { yy: yy } }, { $match: { type: 'expense' } }, { $group: { _id: { mm: '$mm' }, amount: { $sum: '$amount' }, month: { '$first': '$mm' } } }, { $sort: { month: 1 } }, { $group: { _id: null, amount: { '$sum': '$amount' }, perMonth: { $push: { amount: '$amount', month: '$month' } } } }, { $project: { _id: 0 } }]).allowDiskUse(true).exec(execSummaryQuery);
    } else if (tab === _constants.MONTH) {
        _expenseModel2.default.aggregate([{ $match: { user_id: userId } }, { $match: { yy: yy } }, { $match: { mm: mm } }, { $match: { type: 'expense' } }, { $group: { _id: { ww: '$ww' }, amount: { $sum: '$amount' }, ww: { '$first': '$ww' }, perDay: { $push: { amount: '$amount', dow: '$dow' } } } }, { $sort: { ww: 1 } }, { $unwind: '$perDay' }, { $sort: { ww: 1, 'perDay.dow': 1 } }, { $group: { _id: { ww: '$ww' }, amount: { $sum: '$amount' }, ww: { '$first': '$ww' }, perDay: { $push: '$perDay' } } }, { $sort: { ww: 1 } }, { $group: { _id: null, amount: { $sum: '$amount' }, perWeek: { $push: { amount: '$amount', ww: '$ww', perDay: '$perDay' } } } }, { $project: { _id: 0 } }]).allowDiskUse(true).exec(execSummaryQuery);
    } else if (tab === _constants.WEEK) {
        _expenseModel2.default.aggregate([{ $match: { user_id: userId } }, { $match: { yy: yy } }, { $match: { mm: mm } }, { $match: { ww: ww } }, { $match: { type: 'expense' } }, { $group: { _id: { dow: '$dow' }, amount: { $sum: '$amount' }, dow: { '$first': '$dow' } } }, { $sort: { dow: 1 } }, { $group: { _id: null, amount: { $sum: '$amount' }, perDay: { $push: { amount: '$amount', dow: '$dow' } } } }, { $project: { _id: 0 } }]).allowDiskUse(true).exec(execSummaryQuery);
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
app.post('/get_expense_summary', _apiCalls.getExpenseSummary);

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
exports.get_expense_summary = exports.get_expense_data = exports.new_expense = exports.signin = exports.signup = undefined;

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

var get_expense_summary = exports.get_expense_summary = function get_expense_summary(params) {
  var url = '/get_expense_summary/';
  return _axios2.default.post(url, params);
};

/***/ }),

/***/ "./src/pages/components/Graph.js":
/*!***************************************!*\
  !*** ./src/pages/components/Graph.js ***!
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WIDTH = 200;
var HEIGHT = 300;

var Graph = function (_Component) {
  _inherits(Graph, _Component);

  function Graph(props) {
    _classCallCheck(this, Graph);

    var _this = _possibleConstructorReturn(this, (Graph.__proto__ || Object.getPrototypeOf(Graph)).call(this, props));

    _this.generateSVG = _this.generateSVG.bind(_this);
    return _this;
  }

  _createClass(Graph, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (window && window.addEventListener) {
        window.addEventListener('onresize', function () {
          alert('attachEvent - resize');
        });
      }
    }
  }, {
    key: 'generateSVG',
    value: function generateSVG() {
      // const {data} = this.props;
      var data = {};
      data.perDay = [{ amount: 7332, dow: 1, percent: 10 }, { amount: 7332, dow: 2, percent: 90 }, { amount: 7332, dow: 3, percent: 20 }, { amount: 7332, dow: 4, percent: 10 }, { amount: 7332, dow: 5, percent: 10 }, { amount: 7332, dow: 6, percent: 10 }, { amount: 7332, dow: 7, percent: 20 }];
      var xCoordinates = [];
      var yCoordinates = [];
      xCoordinates.push(0);
      yCoordinates.push(200);
      data.perDay.forEach(function (perDayData) {
        var lastX = xCoordinates[xCoordinates.length - 1];
        xCoordinates.push(Math.round(lastX + WIDTH / 8));
        yCoordinates.push(180 - HEIGHT / perDayData.percent);
      });
      xCoordinates.push(WIDTH);
      yCoordinates.push(200);
      var str = '';
      for (var i = 0; i < xCoordinates.length; i++) {
        str += ' ' + xCoordinates[i] + ',' + yCoordinates[i] + ' ';
      }
      if (str) {
        return _react2.default.createElement('polyline', { points: str, style: { fill: '#b4d0fd', stroke: '#4688F1', strokeWidth: "1" } });
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'svg',
        { viewBox: '0 0 200 300', 'class': 'chart' },
        this.generateSVG()
      );
    }
  }]);

  return Graph;
}(_react.Component);

exports.default = Graph;

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _NewExpense = __webpack_require__(/*! ./NewExpense */ "./src/pages/components/NewExpense.js");

var _NewExpense2 = _interopRequireDefault(_NewExpense);

var _ApiCalls = __webpack_require__(/*! ../apiCalls/ApiCalls */ "./src/pages/apiCalls/ApiCalls.js");

var _constants = __webpack_require__(/*! ../constants/constants */ "./src/pages/constants/constants.js");

var _Graph = __webpack_require__(/*! ./Graph */ "./src/pages/components/Graph.js");

var _Graph2 = _interopRequireDefault(_Graph);

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
      this.getExpenseSummary();
    }
  }, {
    key: 'getExpenseSummary',
    value: function getExpenseSummary() {
      var _this2 = this;

      var tab = this.state.activeTab;
      var mm = new Date().getMonth() + 1;
      var dow = new Date().getDay();
      var ww = Math.ceil(new Date().getDate() / 7);
      var yy = new Date().getFullYear();
      var params = { tab: tab, mm: mm, dow: dow, ww: ww, yy: yy };
      (0, _ApiCalls.get_expense_summary)(params).then(function (resp) {
        _this2.setState({ plotData: _extends({}, resp.data) });
      }, function (err) {
        console.log('Unable to Get Expense Summary Details', err);
      });
    }
  }, {
    key: 'getExpense',
    value: function getExpense() {
      var _this3 = this;

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

        _this3.setState({ expenseList: expenseList, incomeList: incomeList, standing: standing, spent: spent });
      }, function (err) {
        console.log('Unable to Get Expense Details', err);
      });
    }
  }, {
    key: 'changeExpenseDayFormat',
    value: function changeExpenseDayFormat(activeTab) {
      var _this4 = this;

      this.setState({ activeTab: activeTab, viewMore: false }, function () {
        _this4.getExpense();
        _this4.getExpenseSummary();
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
      var _this5 = this;

      if (this.state.expenseList && Object.keys(this.state.expenseList).length > 0) {
        return this.state.expenseList.transactionList.map(function (transaction, index) {
          if (_this5.state.viewMore || !_this5.state.viewMore && index < 2) {
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
      var _this6 = this;

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
              return _this6.newExpense(false);
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
                        _this6.changeExpenseDayFormat(_constants.WEEK);
                      } },
                    'Week'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (activeTab === _constants.MONTH ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this6.changeExpenseDayFormat(_constants.MONTH);
                      } },
                    'Month'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (activeTab === _constants.YEAR ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this6.changeExpenseDayFormat(_constants.YEAR);
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
                        return _this6.clickViewMore();
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
                _react2.default.createElement(_Graph2.default, { data: this.state.plotData }),
                _react2.default.createElement(
                  'div',
                  { className: 'newContainer' },
                  _react2.default.createElement(
                    'div',
                    { className: 'new' },
                    _react2.default.createElement(
                      'span',
                      { className: 'newBtn', onClick: function onClick() {
                          return _this6.newExpense(true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2FwaS9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvZGIvbW9uZ29vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9leHBlbnNlTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hcGlDYWxscy9BcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Ib21lLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL0xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05ld0V4cGVuc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvTm90Rm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbnN0YW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3JvdXRlcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbmdvb3NlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb21cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIl0sIm5hbWVzIjpbInNpZ25VcCIsInJlcXVlc3QiLCJyZXNwb25zZSIsImJvZHkiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZW1haWxJZCIsInVzZXIiLCJVc2VycyIsIl9pZCIsIm1vbmdvb3NlIiwiVHlwZXMiLCJPYmplY3RJZCIsImZpbmQiLCJ0aGVuIiwicmVzIiwibGVuZ3RoIiwic2VuZCIsImVycm9yIiwibXNnIiwic2F2ZSIsImRvYyIsInNlc3Npb24iLCJfdXNlcklkIiwiZSIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJzaWduSW4iLCJuZXdFeHBlbnNlIiwiYW1vdW50IiwiY2F0ZWdvcnkiLCJkYXRlIiwidHlwZSIsInBhcnNlSW50IiwiRGF0ZSIsInd3IiwiTWF0aCIsImNlaWwiLCJnZXREYXRlIiwiZG93IiwiZ2V0RGF5IiwibW0iLCJnZXRNb250aCIsInl5IiwiZ2V0RnVsbFllYXIiLCJuZXdFeHBlbnNlSW5zdGFuY2UiLCJFeHBlbnNlcyIsInVzZXJfaWQiLCJlcnIiLCJnZXRFeHBlbnNlRGF0YSIsInVzZXJJZCIsImV4cGVuc2VEYXRlUmVzcG9uZGVyIiwiZGF0YSIsInJlc3BvbmQiLCJleHBlbnNlTGlzdCIsImluY29tZUxpc3QiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwic3BlbnQiLCJzdGFuZGluZyIsInRyYW5zYWN0aW9uTGlzdCIsInRyYW5zYWN0aW9uIiwicGVyY2VudCIsInJvdW5kIiwiZ3JvdXAxIiwiJGdyb3VwIiwiJHN1bSIsImdyb3VwMiIsIiRwdXNoIiwidW53aW5kIiwiJHVud2luZCIsInNvcnQiLCIkc29ydCIsInJlR3JvdXAiLCJ0YWIiLCJZRUFSIiwiYWdncmVnYXRlIiwiJG1hdGNoIiwiJHByb2plY3QiLCJhbGxvd0Rpc2tVc2UiLCJleGVjIiwiTU9OVEgiLCJXRUVLIiwiZ2V0RXhwZW5zZVN1bW1hcnkiLCJleGVjU3VtbWFyeVF1ZXJ5IiwicGVyRGF5IiwidG90YWwiLCJmb3JFYWNoIiwiZWxlbWVudCIsIm1vbnRoIiwicGVyTW9udGgiLCJwZXJXZWVrIiwiZW52IiwicHJvY2VzcyIsIlBPUlQiLCJNT05HT0xBQl9VUkkiLCJtb25nb29zZTEiLCJyZXF1aXJlIiwiUHJvbWlzZSIsImdsb2JhbCIsImNvbm5lY3QiLCJ1c2VOZXdVcmxQYXJzZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9kZWwiLCJTY2hlbWEiLCJyZWYiLCJOdW1iZXIiLCJyZXF1aXJlZCIsInRyaW0iLCJTdHJpbmciLCJkZWZhdWx0Iiwibm93IiwibWlubGVuZ3RoIiwiZXhwZW5zZSIsImFwcCIsInBvcnQiLCJ1c2UiLCJzZWNyZXQiLCJyZXNhdmUiLCJzYXZlVW5pbml0aWFsaXplZCIsImJvZHlQYXJzZXIiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJqc29uIiwiZXhwcmVzcyIsInN0YXRpYyIsInBvc3QiLCJsb2FkSHRtbCIsImNvbnRlbnQiLCJoZWxtZXQiLCJIZWxtZXQiLCJyZW5kZXJTdGF0aWMiLCJtZXRhIiwidG9TdHJpbmciLCJ0aXRsZSIsImdldCIsInJlcSIsImNvbnRleHQiLCJSZWFjdERPTVNlcnZlciIsInJlbmRlclRvU3RyaW5nIiwidXJsIiwidGVtcGxhdGUiLCJsaXN0ZW4iLCJBcHAiLCJDb21wb25lbnQiLCJzaWdudXAiLCJwYXJhbXMiLCJheGlvcyIsInNpZ25pbiIsIm5ld19leHBlbnNlIiwiZ2V0X2V4cGVuc2VfZGF0YSIsImdldF9leHBlbnNlX3N1bW1hcnkiLCJXSURUSCIsIkhFSUdIVCIsIkdyYXBoIiwicHJvcHMiLCJnZW5lcmF0ZVNWRyIsImJpbmQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYWxlcnQiLCJ4Q29vcmRpbmF0ZXMiLCJ5Q29vcmRpbmF0ZXMiLCJwdXNoIiwicGVyRGF5RGF0YSIsImxhc3RYIiwic3RyIiwiaSIsImZpbGwiLCJzdHJva2UiLCJzdHJva2VXaWR0aCIsIkhvbWUiLCJsZWZ0TWVudUNsaWNrIiwibmF2aWdhdGVUb1NpZ25JbiIsInN0YXRlIiwiYWN0aXZlVGFiIiwic2hvd05ld0V4cGVuc2UiLCJ1bmRlZmluZWQiLCJ2aWV3TW9yZSIsImdldEV4cGVuc2UiLCJyZXNwIiwic2V0U3RhdGUiLCJwbG90RGF0YSIsInJlZnMiLCJiYWNrRHJvcCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInBvcHVwIiwiZmlyc3RIYWxmTGFuZGluZ1R4dCIsIm90aGVySGFsZkxhbmRpbmdUeHQiLCJoaXN0b3J5IiwidmFsIiwiaW5kZXgiLCJtYXhXaWR0aCIsInJlbmRlckxlZnRNZW51QmFyIiwiY2hhbmdlRXhwZW5zZURheUZvcm1hdCIsInJlbmRlclRyYW5zYWN0aW9uY2FyZCIsImNsaWNrVmlld01vcmUiLCJMb2dpbiIsImhlYWQiLCJjYXRjaCIsInRhcmdldCIsInZhbHVlIiwiTmV3RXhwZW5zZSIsInNlbGVjdFR5cGUiLCJzdWJtaXROZXdFeHBlbnNlIiwiZGF5IiwieWVhciIsImN1cnJlbnQiLCJuZXh0IiwiZm9jdXMiLCJkYXRlUmVnIiwidGVzdCIsInJlZyIsImlzVmFsaWREYXRlIiwiaXNWYWxpZGF0aW9uU3VjY2VzcyIsInZhbGlkYXRlUGFyYW1zIiwiY2hhbmdlQW1vdW50IiwiY2hhbmdlRGF0ZSIsIk5vdEZvdW5kIiwiZ29CYWNrIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7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SyxPQUFaLEVBQW9CLFdBQXBCLEVBQTBCLFFBQVEsZ0JBQUNBLEtBQUQ7QUFBQSx1QkFBVyw4QkFBQyxjQUFELEVBQVVBLEtBQVYsQ0FBWDtBQUFBLGFBQWxDLEdBRko7QUFHSSxzQ0FBQyxxQkFBRCxJQUFPLE1BQUssUUFBWixFQUFxQixXQUFyQixFQUEyQixRQUFRLGdCQUFDQSxLQUFEO0FBQUEsdUJBQVcsOEJBQUMsZUFBRCxFQUFXQSxLQUFYLENBQVg7QUFBQSxhQUFuQyxHQUhKO0FBSUksc0NBQUMscUJBQUQsSUFBTyxRQUFRLGdCQUFDQSxLQUFEO0FBQUEsdUJBQVcsOEJBQUMsa0JBQUQsRUFBY0EsS0FBZCxDQUFYO0FBQUEsYUFBZjtBQUpKLEtBREo7QUFRSCxDOzs7Ozs7Ozs7OztBQ2pCRCxrQzs7Ozs7Ozs7Ozs7QUNBQSwyQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSw2QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zZXJ2ZXIvc2VydmVyLmpzXCIpO1xuIiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBhcHAgZnJvbSAnLi4vc2VydmVyJ1xuaW1wb3J0IEV4cGVuc2VzIGZyb20gJy4uL21vZGVscy9leHBlbnNlTW9kZWwnO1xuaW1wb3J0IFVzZXJzIGZyb20gJy4uL21vZGVscy91c2VyTW9kZWwnO1xuaW1wb3J0IHsgTU9OVEgsIFlFQVIsIFdFRUsgfSBmcm9tICcuLi8uLi9zcmMvcGFnZXMvY29uc3RhbnRzL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCBzaWduVXAgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAvLyBVc2Vycy5kZWxldGVNYW55KHt9KTtcbiAgICBjb25zdCB7IHVzZXJuYW1lID0gJycsIHBhc3N3b3JkID0gJycsIGVtYWlsSWQgPSAnJyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIHZhciB1c2VyID0gbmV3IFVzZXJzKHtcbiAgICAgICAgX2lkOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZCgpLFxuICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgZW1haWxJZDogZW1haWxJZFxuICAgIH0pO1xuICAgIFVzZXJzLmZpbmQoeyB1c2VybmFtZTogdXNlcm5hbWUgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiB0cnVlLCBtc2c6ICdVc2VybmFtZSBhbHJlYWR5IEV4aXN0cycgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNlc3Npb24uX3VzZXJJZCA9IGRvYy5faWQ7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiBmYWxzZSwgbXNnOiAnU2F2ZWQgU3VjY2Vzc2Z1bGx5JyB9KTtcbiAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzKDUwMCkuc2VuZChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwgKGUpID0+IHtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZChlKTtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2lnbkluID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3QgeyB1c2VybmFtZSA9ICcnLCBwYXNzd29yZCA9ICcnLCBlbWFpbElkID0gJycgfSA9IHJlcXVlc3QuYm9keTtcbiAgICBjb25zb2xlLmxvZyhyZXF1ZXN0LnNlc3Npb24udXNlcik7XG4gICAgVXNlcnMuZmluZCh7IHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID0gcmVzWzBdLl9pZDtcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoeyBlcnJvcjogZmFsc2UsIG1zZzogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiB0cnVlLCBtc2c6ICdObyB1c2VyIGFjY291bnQgZm91bmQnIH0pO1xuICAgICAgICB9XG4gICAgfSwgKGUpID0+IHtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZChlKTtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgbmV3RXhwZW5zZSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIGxldCB7IGFtb3VudCwgY2F0ZWdvcnksIGRhdGUsIHR5cGUgfSA9IHJlcXVlc3QuYm9keTtcbiAgICBhbW91bnQgPSBwYXJzZUludChhbW91bnQpO1xuICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICBjb25zdCB3dyA9IE1hdGguY2VpbChkYXRlLmdldERhdGUoKSAvIDcpO1xuICAgIGNvbnN0IGRvdyA9IGRhdGUuZ2V0RGF5KCkgKyAxO1xuICAgIGNvbnN0IG1tID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICBjb25zdCB5eSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBuZXdFeHBlbnNlID0geyBhbW91bnQsIGNhdGVnb3J5LCBkYXRlLCB0eXBlLCB3dywgZG93LCBtbSwgeXkgfTtcbiAgICB2YXIgbmV3RXhwZW5zZUluc3RhbmNlID0gbmV3IEV4cGVuc2VzKHtcbiAgICAgICAgdXNlcl9pZDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoXCI1YzE2MzBhZDc2NjllYTJjOWJiMDQ2MTZcIiksXG4gICAgICAgIC4uLm5ld0V4cGVuc2VcbiAgICB9KTtcbiAgICBuZXdFeHBlbnNlSW5zdGFuY2Uuc2F2ZSgpLnRoZW4oKGRvYykgPT4ge1xuICAgICAgICAvLyByZXF1ZXN0LnNlc3Npb24udXNlciA9IGRvYy51c2VybmFtZTtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZChkb2MpO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBzYXZlIG5ldyBFeHBlbnNlJywgZXJyKTtcbiAgICAgICAgcmVzcG9uc2Uuc3RhdHVzKDUwMCkuc2VuZChlcnIpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VEYXRhID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gcmVxdWVzdC5zZXNzaW9uLnVzZXJfaWQgPyBtb25nb29zZS5UeXBlcy5PYmplY3RJZChyZXF1ZXN0LnNlc3Npb24udXNlcl9pZCkgOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZChcIjVjMTYzMGFkNzY2OWVhMmM5YmIwNDYxNlwiKTtcbiAgICBmdW5jdGlvbiBleHBlbnNlRGF0ZVJlc3BvbmRlcihlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVzcG9uZC5zZW5kKDUwMCkuc2VuZChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGV4cGVuc2VMaXN0LCBpbmNvbWVMaXN0O1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVtrZXldLnR5cGUgPT09ICdleHBlbnNlJykge1xuICAgICAgICAgICAgICAgICAgICBleHBlbnNlTGlzdCA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFba2V5XS50eXBlID09PSAnaW5jb21lJykge1xuICAgICAgICAgICAgICAgICAgICBpbmNvbWVMaXN0ID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IHNwZW50LCBzdGFuZGluZztcbiAgICAgICAgICAgIGlmIChleHBlbnNlTGlzdCkge1xuICAgICAgICAgICAgICAgIGV4cGVuc2VMaXN0LnRyYW5zYWN0aW9uTGlzdC5tYXAoKHRyYW5zYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZXJjZW50ID0gdHJhbnNhY3Rpb24uYW1vdW50IC8gKGV4cGVuc2VMaXN0LmFtb3VudCAvIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLnBlcmNlbnQgPSBNYXRoLnJvdW5kKHBlcmNlbnQgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNwZW50ID0gZXhwZW5zZUxpc3QuYW1vdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluY29tZUxpc3QpIHtcbiAgICAgICAgICAgICAgICBpbmNvbWVMaXN0LnRyYW5zYWN0aW9uTGlzdC5tYXAoKHRyYW5zYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZXJjZW50ID0gdHJhbnNhY3Rpb24uYW1vdW50IC8gKGluY29tZUxpc3QuYW1vdW50IC8gMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ucGVyY2VudCA9IE1hdGgucm91bmQocGVyY2VudCAqIDEwMCkgLyAxMDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3RhbmRpbmcgPSBpbmNvbWVMaXN0LmFtb3VudCAtIHNwZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGV4cGVuc2VMaXN0LCBpbmNvbWVMaXN0LCBzcGVudCwgc3RhbmRpbmcgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBRdWVyaWVzIHN0YXJ0XG4gICAgY29uc3QgZ3JvdXAxID0ge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDogeyBjYXRlZ29yeTogJyRjYXRlZ29yeScsIHR5cGU6ICckdHlwZScgfSxcbiAgICAgICAgICAgIHR5cGU6IHsgJyRmaXJzdCc6ICckdHlwZScgfSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiB7ICckZmlyc3QnOiAnJGNhdGVnb3J5JyB9LFxuICAgICAgICAgICAgYW1vdW50OiB7ICRzdW06ICckYW1vdW50JyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdyb3VwMiA9IHtcbiAgICAgICAgJGdyb3VwOiB7XG4gICAgICAgICAgICBfaWQ6IHsgdHlwZTogJyR0eXBlJyB9LFxuICAgICAgICAgICAgYW1vdW50OiB7ICRzdW06ICckYW1vdW50JyB9LFxuICAgICAgICAgICAgdHlwZTogeyAnJGZpcnN0JzogJyR0eXBlJyB9LFxuICAgICAgICAgICAgdHJhbnNhY3Rpb25MaXN0OiB7ICRwdXNoOiB7IGNhdGVnb3J5OiAnJGNhdGVnb3J5JywgYW1vdW50OiAnJGFtb3VudCcgfSB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHVud2luZCA9IHsgJHVud2luZDogJyR0cmFuc2FjdGlvbkxpc3QnIH07XG4gICAgY29uc3Qgc29ydCA9IHsgJHNvcnQ6IHsgJ3RyYW5zYWN0aW9uTGlzdC5hbW91bnQnOiAtMSB9IH1cbiAgICBjb25zdCByZUdyb3VwID0ge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDogeyB0eXBlOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJyRmaXJzdCc6ICckYW1vdW50JyB9LFxuICAgICAgICAgICAgdHlwZTogeyAnJGZpcnN0JzogJyR0eXBlJyB9LFxuICAgICAgICAgICAgdHJhbnNhY3Rpb25MaXN0OiB7ICRwdXNoOiAnJHRyYW5zYWN0aW9uTGlzdCcgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBRdWVyaWVzIGVuZFxuXG4gICAgY29uc3QgeyB0YWIsIHd3LCBtbSwgeXksIGRvdyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGlmICh0YWIgPT09IFlFQVIpIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZH0gfSxcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHl5OiBwYXJzZUludCh5eSkgfSB9LFxuICAgICAgICAgICAgeyAuLi5ncm91cDEgfSx7IC4uLmdyb3VwMiB9LFxuICAgICAgICAgICAgeyAuLi51bndpbmQgfSx7IC4uLnNvcnQgfSx7IC4uLnJlR3JvdXAgfSxcbiAgICAgICAgICAgIHsgJHByb2plY3Q6IHsgX2lkOiAwLCBhbW91bnQ6IDEsIHR5cGU6IDEsIHRyYW5zYWN0aW9uTGlzdDogMSB9IH1cbiAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhwZW5zZURhdGVSZXNwb25kZXIpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBNT05USCkge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkIH0gfSxcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHl5OiBwYXJzZUludCh5eSkgfSB9LHsgJG1hdGNoOiB7IG1tOiBwYXJzZUludChtbSkgfSB9LFxuICAgICAgICAgICAgeyAuLi5ncm91cDEgfSx7IC4uLmdyb3VwMiB9LFxuICAgICAgICAgICAgeyAuLi51bndpbmQgfSx7IC4uLnNvcnQgfSx7IC4uLnJlR3JvdXAgfSxcbiAgICAgICAgICAgIHsgJHByb2plY3Q6IHsgX2lkOiAwLCBhbW91bnQ6IDEsIHR5cGU6IDEsIHRyYW5zYWN0aW9uTGlzdDogMSB9IH1cbiAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhwZW5zZURhdGVSZXNwb25kZXIpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBXRUVLKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0seyAkbWF0Y2g6IHsgbW06IHBhcnNlSW50KG1tKSB9IH0seyAkbWF0Y2g6IHsgd3c6IHBhcnNlSW50KHd3KSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTdW1tYXJ5ID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgZnVuY3Rpb24gZXhlY1N1bW1hcnlRdWVyeShlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVzcG9uZC5zZW5kKDUwMCkuc2VuZChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRhdGFbMF0ucGVyRGF5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG90YWwgPSBkYXRhWzBdLmFtb3VudDtcbiAgICAgICAgICAgICAgICBkYXRhWzBdLnBlckRheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyY2VudCAgPSBlbGVtZW50LmFtb3VudCAvIHRvdGFsO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBlcmNlbnQgPSBNYXRoLnJvdW5kKCBwZXJjZW50KiAxMDAwKSAvIDEwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7Li4uZGF0YVswXX0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCB1c2VySWQgPSByZXF1ZXN0LnNlc3Npb24udXNlcl9pZCA/IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKHJlcXVlc3Quc2Vzc2lvbi51c2VyX2lkKSA6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKFwiNWMxNjMwYWQ3NjY5ZWEyYzliYjA0NjE2XCIpO1xuICAgIGNvbnN0IHt0YWIsIHl5LCBtbSwgd3d9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGlmICh0YWIgPT09IFlFQVIpIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHl5OiB5eX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB0eXBlOiAnZXhwZW5zZSd9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiB7IG1tOiAnJG1tJ30sIGFtb3VudDogeyRzdW06ICckYW1vdW50J30sIG1vbnRoOiB7JyRmaXJzdCc6ICckbW0nfX19LFxuICAgICAgICAgICAgeyRzb3J0OiB7IG1vbnRoOiAxIH19LFxuICAgICAgICAgICAgeyRncm91cDoge19pZDogbnVsbCwgYW1vdW50OiB7JyRzdW0nOiAnJGFtb3VudCd9LCBwZXJNb250aDogeyRwdXNoIDogeyBhbW91bnQ6ICckYW1vdW50JywgbW9udGg6ICckbW9udGgnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDogMH19XG4gICAgICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleGVjU3VtbWFyeVF1ZXJ5KTtcbiAgICB9IGVsc2UgaWYgKHRhYiA9PT0gTU9OVEgpIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkIH19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB5eTogeXl9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgbW06IG1tfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHR5cGU6ICdleHBlbnNlJ319LFxuICAgICAgICAgICAgeyRncm91cDogeyBfaWQ6IHsgd3c6ICckd3cnfSwgYW1vdW50OiB7JHN1bTogJyRhbW91bnQnfSwgd3c6IHsnJGZpcnN0JzogJyR3dyd9LCBwZXJEYXk6IHsgJHB1c2g6IHthbW91bnQ6ICckYW1vdW50JywgZG93OiAnJGRvdyd9fX19LFxuICAgICAgICAgICAgeyRzb3J0OiB7d3c6IDF9fSxcbiAgICAgICAgICAgIHskdW53aW5kOiAnJHBlckRheSd9LFxuICAgICAgICAgICAgeyRzb3J0OiB7d3c6IDEsICdwZXJEYXkuZG93JzogMX19LFxuICAgICAgICAgICAgeyRncm91cDoge19pZDogeyB3dzogJyR3dyd9LCBhbW91bnQ6IHskc3VtOiAnJGFtb3VudCd9LCB3dzogeyckZmlyc3QnOiAnJHd3J30sIHBlckRheTogeyAkcHVzaDogJyRwZXJEYXknfX19LFxuICAgICAgICAgICAgeyRzb3J0OiB7d3c6IDF9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHtfaWQ6IG51bGwsIGFtb3VudDogeyRzdW06ICckYW1vdW50J30sIHBlcldlZWs6IHskcHVzaDoge2Ftb3VudDogJyRhbW91bnQnLCB3dzonJHd3JywgcGVyRGF5OiAnJHBlckRheSd9fX19LFxuICAgICAgICAgICAgeyRwcm9qZWN0OiB7X2lkOiAwfX1cbiAgICAgICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4ZWNTdW1tYXJ5UXVlcnkpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBXRUVLKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgeXk6IHl5fX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IG1tOiBtbX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB3dzogd3d9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdHlwZTogJ2V4cGVuc2UnfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7IF9pZDoge2RvdzogJyRkb3cnfSwgYW1vdW50OiB7JHN1bTogJyRhbW91bnQnfSwgZG93OiB7JyRmaXJzdCc6ICckZG93J319fSxcbiAgICAgICAgICAgIHskc29ydDogeyBkb3c6IDF9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiBudWxsLCBhbW91bnQ6IHskc3VtOiAnJGFtb3VudCd9LCAgcGVyRGF5OiB7JHB1c2g6IHthbW91bnQ6ICckYW1vdW50JywgZG93OiAnJGRvdyd9fX19LFxuICAgICAgICAgICAgeyRwcm9qZWN0OiB7X2lkOiAwfX1cbiAgICAgICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4ZWNTdW1tYXJ5UXVlcnkpO1xuICAgIH1cbn0iLCJ2YXIgZW52ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgJ2RldmVsb3BtZW50JztcblxuaWYgKGVudiA9PT0gJ2RldmVsb3BtZW50Jykge1xuICBwcm9jZXNzLmVudi5QT1JUID0gNDAwMDtcbiAgcHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJID0gJ21vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvZXhwZW5zZSc7XG59IGVsc2Uge1xuICBwcm9jZXNzLmVudi5NT05HT0xBQl9VUkkgPSAnbW9uZ29kYjovL2RoaWxpcGsxMzpkaGlsaXBrMTNAZHMyNDczMTAubWxhYi5jb206NDczMTAvZXhwZW5zZSc7XG59XG5leHBvcnQgZGVmYXVsdCBlbnY7IiwidmFyIG1vbmdvb3NlMSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XG5tb25nb29zZTEuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xubW9uZ29vc2UxLmNvbm5lY3QocHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJLCB7IHVzZU5ld1VybFBhcnNlcjogdHJ1ZSB9KS50aGVuKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkIHRvIERiJyk7XG59LChlKT0+IHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB7bW9uZ29vc2UxfTsiLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IFVzZXJzIGZyb20gJy4vdXNlck1vZGVsJztcblxuY29uc3QgRXhwZW5zZXMgPSBtb25nb29zZS5tb2RlbCgnRXhwZW5zZXMnLCB7XG4gIHVzZXJfaWQ6IHtcbiAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG4gICAgcmVmOiAnVXNlcnMnXG4gIH0sXG4gIGFtb3VudDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0cmltOiB0cnVlXG4gIH0sXG4gIGNhdGVnb3J5OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHRyaW06IHRydWUsXG4gICAgICBkZWZhdWx0OiAnb3RoZXJzJ1xuICB9LFxuICB0eXBlOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlLFxuICAgIGRlZmF1bHQ6ICdleHBlbnNlJ1xuICB9LFxuICBkYXRlOiB7XG4gICAgdHlwZTogRGF0ZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZSxcbiAgICBkZWZhdWx0OiBEYXRlLm5vdygpXG4gIH0sXG4gIHd3OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIGRvdzoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICBtbToge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICB5eToge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9XG59KTtcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VzOyIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgRXhwZW5zZXMgZnJvbSAnLi9leHBlbnNlTW9kZWwnO1xuXG5jb25zdCBVc2VycyA9IG1vbmdvb3NlLm1vZGVsKCdVc2VycycsIHtcbiAgICBfaWQ6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICB1c2VybmFtZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW5sZW5ndGg6IDUsXG4gICAgICAgIHRyaW06IHRydWVcbiAgICB9LFxuICAgIGVtYWlsSWQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHRyaW06IHRydWVcbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbmxlbmd0aDogOCxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgZXhwZW5zZTogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsIFxuICAgICAgICAgICAgcmVmOiAnRXhwZW5zZXMnXG4gICAgICAgIH1cbiAgICBdXG59KTtcbmV4cG9ydCBkZWZhdWx0IFVzZXJzOyIsImltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0IGVudiBmcm9tICcuL2NvbmZpZy9jb25maWcnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NU2VydmVyIGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbnZhciBzZXNzaW9uID0gcmVxdWlyZSgnZXhwcmVzcy1zZXNzaW9uJyk7XG5cbmltcG9ydCBBcHAgZnJvbSAnLi4vc3JjL2FwcCdcbmltcG9ydCBtb25nb29zZTEgZnJvbSAnLi9kYi9tb25nb29zZSc7XG5pbXBvcnQge3NpZ25VcCwgc2lnbkluLCBuZXdFeHBlbnNlLCBnZXRFeHBlbnNlRGF0YSwgZ2V0RXhwZW5zZVN1bW1hcnl9IGZyb20gJy4vYXBpL2FwaUNhbGxzJztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQ7XG5cbmFwcC51c2Uoc2Vzc2lvbih7XG4gICAgc2VjcmV0OiAnZGhpbGlwTG9jYWwnLFxuICAgIHJlc2F2ZTogZmFsc2UsXG4gICAgc2F2ZVVuaW5pdGlhbGl6ZWQ6IHRydWVcbn0pKVxuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKCdidWlsZC9wdWJsaWMnKSk7XG5hcHAudXNlKCcvc3R5bGVzJywgZXhwcmVzcy5zdGF0aWMoJ3NyYy9wYWdlcy9zdHlsZXMnKSk7XG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKCdzcmMvcGFnZXMvc3RhdGljJykpO1xuXG4vLyBBUEkgQ2FsbHNcbmFwcC5wb3N0KCcvc2lnbnVwJywgc2lnblVwKTtcbmFwcC5wb3N0KCcvc2lnbmluJywgc2lnbkluKTtcbmFwcC5wb3N0KCcvbmV3X2V4cGVuc2UnLCBuZXdFeHBlbnNlKTtcbmFwcC5wb3N0KCcvZ2V0X2V4cGVuc2VfZGF0YScsIGdldEV4cGVuc2VEYXRhKTtcbmFwcC5wb3N0KCcvZ2V0X2V4cGVuc2Vfc3VtbWFyeScsIGdldEV4cGVuc2VTdW1tYXJ5KTtcblxuY29uc3QgbG9hZEh0bWwgPSAoY29udGVudCkgPT4ge1xuICAgIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcbiAgICByZXR1cm4gKGBcbiAgICAgICAgPGh0bWw+XG4gICAgICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgICAgICAke2hlbG1ldC5tZXRhLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgJHtoZWxtZXQudGl0bGUudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvdHdpdHRlci1ib290c3RyYXAvNC4xLjMvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy90d2l0dGVyLWJvb3RzdHJhcC80LjEuMy9qcy9ib290c3RyYXAuYnVuZGxlLm1pbi5qc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9jb21tb24uY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL2hvbWUuY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL25ld19leHBlbnNlLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9T3BlbitTYW5zXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICAgICAgICAgICAgPC9oZWFkPlxuICAgICAgICAgICAgPGJvZHk+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJvb3RcIj4ke2NvbnRlbnR9PC9kaXY+XG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJjbGllbnRfYnVuZGxlLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICA8L2JvZHk+XG4gICAgICAgIDwvaHRtbD5gKTtcbn07XG5cbmFwcC5nZXQoJyonLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCBjb250ZXh0ID0ge307XG4gICAgY29uc3QgY29udGVudCA9IFJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RyaW5nKFxuICAgICAgICA8U3RhdGljUm91dGVyPlxuICAgICAgICAgICAgPEFwcCBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0gLz5cbiAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgKTtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGxvYWRIdG1sKGNvbnRlbnQpO1xuICAgIHJlcy5zZW5kKHRlbXBsYXRlKTtcbn0pO1xuXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygncHJvY2Vzcy5lbnYnLCBwb3J0KTtcbiAgICBjb25zb2xlLmxvZygnU2VydmVyIFN0YXJ0ZWQgb24gUG9ydDogJywgcG9ydCk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYXBwOyIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3dpdGNoLCBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgSG9tZSBmcm9tICcuL3BhZ2VzL2NvbXBvbmVudHMvTG9naW4nO1xuaW1wb3J0IFJvdXRlcyBmcm9tICcuL3BhZ2VzL3JvdXRlcy9yb3V0ZXMnO1xuaW1wb3J0IHtTZXJ2ZXJSb3V0ZXJ9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSb3V0ZXMvPlxuICAgICAgICApO1xuICAgIH1cbn0iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgY29uc3Qgc2lnbnVwID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL3NpZ251cC8nO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHsuLi5wYXJhbXN9KTtcbn1cblxuZXhwb3J0IGNvbnN0IHNpZ25pbiA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9zaWduaW4vJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBuZXdfZXhwZW5zZSA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9uZXdfZXhwZW5zZS8nO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHsuLi5wYXJhbXN9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldF9leHBlbnNlX2RhdGEgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvZ2V0X2V4cGVuc2VfZGF0YS8nIDtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCBwYXJhbXMpO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0X2V4cGVuc2Vfc3VtbWFyeSA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9nZXRfZXhwZW5zZV9zdW1tYXJ5LycgO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHBhcmFtcyk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcblxuY29uc3QgV0lEVEggPSAyMDA7XG5jb25zdCBIRUlHSFQgPSAzMDA7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZ2VuZXJhdGVTVkcgPSB0aGlzLmdlbmVyYXRlU1ZHLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAod2luZG93ICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb25yZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYWxlcnQoJ2F0dGFjaEV2ZW50IC0gcmVzaXplJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZVNWRygpIHtcbiAgICAvLyBjb25zdCB7ZGF0YX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBkYXRhLnBlckRheSA9IFt7YW1vdW50OiA3MzMyLCBkb3c6IDEsIHBlcmNlbnQ6IDEwfSx7YW1vdW50OiA3MzMyLCBkb3c6IDIsIHBlcmNlbnQ6IDkwfSx7YW1vdW50OiA3MzMyLCBkb3c6IDMsIHBlcmNlbnQ6IDIwfSxcbiAgICAgIHthbW91bnQ6IDczMzIsIGRvdzogNCwgcGVyY2VudDogMTB9LHthbW91bnQ6IDczMzIsIGRvdzogNSwgcGVyY2VudDogMTB9LHthbW91bnQ6IDczMzIsIGRvdzogNiwgcGVyY2VudDogMTB9LHthbW91bnQ6IDczMzIsIGRvdzogNywgcGVyY2VudDogMjB9XTtcbiAgICBjb25zdCB4Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICBjb25zdCB5Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICB4Q29vcmRpbmF0ZXMucHVzaCgwKTtcbiAgICB5Q29vcmRpbmF0ZXMucHVzaCgyMDApO1xuICAgIGRhdGEucGVyRGF5LmZvckVhY2goKHBlckRheURhdGEpID0+IHtcbiAgICAgIGNvbnN0IGxhc3RYID0geENvb3JkaW5hdGVzW3hDb29yZGluYXRlcy5sZW5ndGggLTFdO1xuICAgICAgeENvb3JkaW5hdGVzLnB1c2goTWF0aC5yb3VuZChsYXN0WCArIFdJRFRILzgpKTtcbiAgICAgIHlDb29yZGluYXRlcy5wdXNoKDE4MCAtIEhFSUdIVC9wZXJEYXlEYXRhLnBlcmNlbnQpO1xuICAgIH0pO1xuICAgIHhDb29yZGluYXRlcy5wdXNoKFdJRFRIKTtcbiAgICB5Q29vcmRpbmF0ZXMucHVzaCgyMDApO1xuICAgIGxldCBzdHIgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHhDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgc3RyICs9ICcgJyArIHhDb29yZGluYXRlc1tpXSArICcsJyArIHlDb29yZGluYXRlc1tpXSArICcgJztcbiAgICB9XG4gICAgaWYgKHN0cikge1xuICAgICAgcmV0dXJuIDxwb2x5bGluZSBwb2ludHM9e3N0cn0gc3R5bGU9e3sgZmlsbDogJyNiNGQwZmQnLCBzdHJva2U6ICcjNDY4OEYxJywgc3Ryb2tlV2lkdGg6IFwiMVwifX0gLz5cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDIwMCAzMDBcIiBjbGFzcz1cImNoYXJ0XCI+XG4gICAgICAgIHt0aGlzLmdlbmVyYXRlU1ZHKCl9XG4gICAgICA8L3N2Zz5cbiAgICApO1xuICB9XG59IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgTmV3RXhwZW5zZSBmcm9tICcuL05ld0V4cGVuc2UnO1xuaW1wb3J0IHtnZXRfZXhwZW5zZV9kYXRhLCBnZXRfZXhwZW5zZV9zdW1tYXJ5fSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5pbXBvcnQge01PTlRILCBZRUFSLCBXRUVLfSBmcm9tICcuLi9jb25zdGFudHMvY29uc3RhbnRzJztcbmltcG9ydCBHcmFwaCBmcm9tICcuL0dyYXBoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMubGVmdE1lbnVDbGljayA9IHRoaXMubGVmdE1lbnVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmV3RXhwZW5zZSA9IHRoaXMubmV3RXhwZW5zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmF2aWdhdGVUb1NpZ25JbiA9IHRoaXMubmF2aWdhdGVUb1NpZ25Jbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhY3RpdmVUYWI6IE1PTlRILFxuICAgICAgc2hvd05ld0V4cGVuc2U6IGZhbHNlLFxuICAgICAgc3RhbmRpbmc6IHVuZGVmaW5lZCxcbiAgICAgIHNwZW50OiB1bmRlZmluZWQsXG4gICAgICBleHBlbnNlTGlzdDoge30sXG4gICAgICBpbmNvbWVMaXN0OiB7fSxcbiAgICAgIHZpZXdNb3JlOiBmYWxzZVxuXG4gICAgfVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuZ2V0RXhwZW5zZSgpO1xuICAgIHRoaXMuZ2V0RXhwZW5zZVN1bW1hcnkoKTtcbiAgfVxuXG4gIGdldEV4cGVuc2VTdW1tYXJ5KCkge1xuICAgIGNvbnN0IHRhYiA9IHRoaXMuc3RhdGUuYWN0aXZlVGFiO1xuICAgIGNvbnN0IG1tID0gbmV3IERhdGUoKS5nZXRNb250aCgpICsgMTtcbiAgICBjb25zdCBkb3cgPSBuZXcgRGF0ZSgpLmdldERheSgpO1xuICAgIGNvbnN0IHd3ID0gTWF0aC5jZWlsKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpIC8gNyk7XG4gICAgY29uc3QgeXkgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgcGFyYW1zID0ge3RhYiwgbW0sIGRvdywgd3csIHl5fTtcbiAgICBnZXRfZXhwZW5zZV9zdW1tYXJ5KHBhcmFtcykudGhlbigocmVzcCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7cGxvdERhdGE6IHsuLi5yZXNwLmRhdGF9fSk7XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBHZXQgRXhwZW5zZSBTdW1tYXJ5IERldGFpbHMnLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0RXhwZW5zZSgpIHtcbiAgICBsZXQgZXhwZW5zZUxpc3QgPSB7fSwgaW5jb21lTGlzdCA9IHt9LCBzdGFuZGluZyA9Jyc7XG4gICAgY29uc3QgdGFiID0gdGhpcy5zdGF0ZS5hY3RpdmVUYWI7XG4gICAgY29uc3QgbW0gPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IGRvdyA9IG5ldyBEYXRlKCkuZ2V0RGF5KCk7XG4gICAgY29uc3Qgd3cgPSBNYXRoLmNlaWwobmV3IERhdGUoKS5nZXREYXRlKCkgLyA3KTtcbiAgICBjb25zdCB5eSA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7dGFiLCBtbSwgZG93LCB3dywgeXl9O1xuICAgIGdldF9leHBlbnNlX2RhdGEocGFyYW1zKS50aGVuKChyZXNwKSA9PiB7XG4gICAgIGNvbnN0IHtleHBlbnNlTGlzdCwgaW5jb21lTGlzdCwgc3RhbmRpbmcsIHNwZW50fSA9IHJlc3AuZGF0YTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGVuc2VMaXN0LCBpbmNvbWVMaXN0LCBzdGFuZGluZywgc3BlbnR9KTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIEdldCBFeHBlbnNlIERldGFpbHMnLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlRXhwZW5zZURheUZvcm1hdChhY3RpdmVUYWIpIHtcbiAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVUYWI6IGFjdGl2ZVRhYiwgdmlld01vcmU6IGZhbHNlfSwgKCkgPT4ge1xuICAgICAgdGhpcy5nZXRFeHBlbnNlKCk7XG4gICAgICB0aGlzLmdldEV4cGVuc2VTdW1tYXJ5KCk7XG4gICAgfSk7XG4gIH1cblxuICBsZWZ0TWVudUNsaWNrKCkge1xuICAgIHRoaXMucmVmcy5iYWNrRHJvcC5jbGFzc0xpc3QudG9nZ2xlKCdiYWNrRHJvcCcpO1xuICAgIHRoaXMucmVmcy5wb3B1cC5jbGFzc0xpc3QudG9nZ2xlKCdyaWdodDAnKTtcbiAgICB0aGlzLnJlZnMuZmlyc3RIYWxmTGFuZGluZ1R4dC5jbGFzc0xpc3QudG9nZ2xlKCdzY2FsZTkwJyk7XG4gICAgdGhpcy5yZWZzLm90aGVySGFsZkxhbmRpbmdUeHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2NhbGU5MCcpO1xuICB9XG5cbiAgbmF2aWdhdGVUb1NpZ25JbigpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzKTtcbiAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCgnL2xvZ2luJyk7XG4gIH1cblxuICByZW5kZXJMZWZ0TWVudUJhcigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnVCYXJcIj5cbiAgICAgICAgPGRpdiByZWY9XCJwb3B1cFwiY2xhc3NOYW1lPVwicG9wdXAgemkyIFwiIG9uQ2xpY2s9e3RoaXMubGVmdE1lbnVDbGlja30+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlQmFyIGluLWJsIGZsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtb3B0aW9uXCI+U2V0dGluZ3M8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIiBvbkNsaWNrPXt0aGlzLm5hdmlnYXRlVG9TaWduSW59PlNpZ24gSW48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIj5BYm91dCBNZTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBuZXdFeHBlbnNlKHZhbCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dOZXdFeHBlbnNlOiB2YWx9KTtcbiAgfVxuXG4gIGNsaWNrVmlld01vcmUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dmlld01vcmU6ICF0aGlzLnN0YXRlLnZpZXdNb3JlfSk7XG4gIH1cblxuICByZW5kZXJUcmFuc2FjdGlvbmNhcmQoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuZXhwZW5zZUxpc3QgJiYgT2JqZWN0LmtleXModGhpcy5zdGF0ZS5leHBlbnNlTGlzdCkubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy5zdGF0ZS5leHBlbnNlTGlzdC50cmFuc2FjdGlvbkxpc3QubWFwKCh0cmFuc2FjdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZS52aWV3TW9yZSB8fCAhdGhpcy5zdGF0ZS52aWV3TW9yZSAmJiBpbmRleCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXsndHJhbnNhY3Rpb25fdHlwZV8nICsgaW5kZXh9IGNsYXNzTmFtZT1cInRyYW5zYWN0ZWRDYXJkSW5uZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRJbm5lcmhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9uYW1lXCI+e3RyYW5zYWN0aW9uLmNhdGVnb3J5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9wZXJjZW50XCI+e3RyYW5zYWN0aW9uLnBlcmNlbnQgKyAnICUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzQmFyIGJsIHRleHRDZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsbGVkXCIgc3R5bGU9IHt7bWF4V2lkdGg6IHRyYW5zYWN0aW9uLnBlcmNlbnQgKyAnJSd9fT5cbiAgICAgICAgICAgICAgICAgICAgey8qIDxkaXYgY2xhc3NOYW1lPVwiZmlsbGVkXCIgPjwvZGl2PiAqL31cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7YWN0aXZlVGFiLCBzaG93TmV3RXhwZW5zZSwgc3RhbmRpbmcgPSB1bmRlZmluZWQsIHNwZW50ID0gdW5kZWZpbmVkLCB2aWV3TW9yZSA9IGZhbHNlfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiByZWY9XCJiYWNrRHJvcFwiIGNsYXNzTmFtZT17J3RyYW5zaXRpb24yYSB6aTEgJyArIChzaG93TmV3RXhwZW5zZSA/ICdiYWNrRHJvcCcgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHRoaXMubmV3RXhwZW5zZShmYWxzZSl9PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHt0aGlzLnJlbmRlckxlZnRNZW51QmFyKCl9XG4gICAgICAgICAgPGRpdiByZWY9XCJtYWluQ29udGVudFwiIGNsYXNzTmFtZT1cIm1haW5Db250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpcnN0LWhhbGYtbGFuZGluZ1wiPlxuICAgICAgICAgICAgICA8ZGl2IHJlZj1cImZpcnN0SGFsZkxhbmRpbmdUeHRcIiBjbGFzc05hbWU9XCJmaXJzdEhhbGZUeHRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YW5kaW5nXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsZWZ0LW1lbnUtY29udGFpbmVyXCIgb25DbGljaz17dGhpcy5sZWZ0TWVudUNsaWNrfT48aW1nIGNsYXNzTmFtZT1cImxlZnQtbWVudVwiIHNyYz1cIi9pbWcvbWVudS5zdmdcIi8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgey8qIDxzcGFuIGNsYXNzTmFtZT1cInJpZ2h0LW1lbnUtY29udGFpbmVyXCIgb25DbGljaz17KCkgPT4ge3RoaXMuc2V0U3RhdGUoe3Zpc2libGVSaWdodE1lbnU6IHRydWV9KX19PjxpbWcgY2xhc3NOYW1lPVwicmlnaHQtbWVudVwiIHNyYz1cIi9pbWcvbWVudS5zdmdcIi8+PC9zcGFuPiAqL31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRpbmdcIj5FeHBlbnNlIEhvbWU8L2Rpdj5cbiAgICAgICAgICAgICAgICB7c3RhbmRpbmcgPyA8ZGl2IGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj57J1N0YW5kaW5nIDog4oK5JyArIHN0YW5kaW5nfTwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBlbnNlRGF5c0J0blwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnZGF5VHlwZUJ0biAnICsgKGFjdGl2ZVRhYiA9PT0gV0VFSyA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHt0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoV0VFSyl9fT5XZWVrPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnZGF5VHlwZUJ0biAnICsgKGFjdGl2ZVRhYiA9PT0gTU9OVEggPyAnZGF5VHlwZUJ0bi1hY3RpdmUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB7dGhpcy5jaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KE1PTlRIKX19Pk1vbnRoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnZGF5VHlwZUJ0biAnICsgKGFjdGl2ZVRhYiA9PT0gWUVBUiA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHt0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoWUVBUil9fT5ZZWFyPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICB7c3BlbnQgPyA8ZGl2IGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj57J1NwZW50IDog4oK5JyArIHNwZW50fTwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPVwidHJhbnNhY3RlZENhcmRcIiBjbGFzc05hbWU9eyd0cmFuc2FjdGVkQ2FyZCB0cmFuc2l0aW9uMmEgJyArICh2aWV3TW9yZSA/ICdzaG93QWxsVHJhbnNhY3Rpb24nIDogJycpfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmFuc2FjdFNjcm9sbGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVHJhbnNhY3Rpb25jYXJkKCl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpZXdNb3JlQXJyb3dcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLmNsaWNrVmlld01vcmUoKX0+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPXt2aWV3TW9yZSA/ICdyb3RhdGVWaWV3TW9yZScgOiAnJ30gcmVmPVwic3ZnVmlld01vcmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNy40MSA3Ljg0TDEyIDEyLjQybDQuNTktNC41OEwxOCA5LjI1bC02IDYtNi02elwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3RoZXItaGFsZi1sYW5kaW5nXCI+XG4gICAgICAgICAgICAgIDxkaXYgcmVmPVwib3RoZXJIYWxmTGFuZGluZ1R4dFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlciB0clN1bWFyeUhlYWRpbmcgZmJcIiA+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5UcmFuc2FjdGlvbiBTdW1tYXJ5PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxHcmFwaCBkYXRhPXt0aGlzLnN0YXRlLnBsb3REYXRhfS8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXdDb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5ld0J0blwiIG9uQ2xpY2s9eygpID0+IHRoaXMubmV3RXhwZW5zZSh0cnVlKX0+QWRkIE5ldzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3Nob3dOZXdFeHBlbnNlID8gXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICA8TmV3RXhwZW5zZSBuZXdFeHBlbnNlPXt0aGlzLm5ld0V4cGVuc2V9Lz5cbiAgICAgICAgICA8L2Rpdj4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQge3NpZ251cCwgc2lnbmlufSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaWduVXAgPSB0aGlzLnNpZ25VcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2lnbkluID0gdGhpcy5zaWduSW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdXNlcm5hbWU6ICdkaGlsaXAnLFxuICAgICAgcGFzc3dvcmQ6ICdkaGlsaXBkaGlsaXAnXG4gICAgfVxuICB9XG5cbiAgaGVhZCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldD5cbiAgICAgICAgPHRpdGxlPkV4cGVuc2UgTG9naW48L3RpdGxlPlxuICAgICAgPC9IZWxtZXQ+XG4gICAgKTtcbiAgfVxuXG4gIHNpZ25VcCgpIHtcbiAgICBzaWdudXAoe3VzZXJuYW1lOiB0aGlzLnN0YXRlLnVzZXJuYW1lLCBwYXNzd29yZDogdGhpcy5zdGF0ZS5wYXNzd29yZH0pO1xuICB9XG5cbiAgc2lnbkluKCkge1xuICAgIHNpZ25pbih7dXNlcm5hbWU6IHRoaXMuc3RhdGUudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSkudGhlbigocmVzcCkgPT4ge1xuICAgICAgaWYgKHJlc3AuZGF0YSAmJiAhcmVzcC5kYXRhLmVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCgnL2hvbWUnLCB7fSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIFNpZ25JbicsIHJlc3ApO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gU2lnbkluJywgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuaGVhZCgpfVxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT5Mb2dpbjwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9J3VzZXJuYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS51c2VybmFtZX0gb25DaGFuZ2UgPSB7KGUpID0+IHRoaXMuc2V0U3RhdGUoe3VzZXJuYW1lOiBlLnRhcmdldC52YWx1ZX0pfSB0eXBlPVwidGV4dFwiLz5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj0ncGFzc3dvcmQnIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfSBvbkNoYW5nZSA9IHsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cGFzc3dvcmQ6IGUudGFyZ2V0LnZhbHVlfSl9IHR5cGU9XCJwYXNzd29yZFwiLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2lnbklufT5TaWduIEluPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNpZ25VcH0+U2lnbiBVcDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IExvZ2luOyIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtuZXdfZXhwZW5zZX0gZnJvbSAnLi4vYXBpQ2FsbHMvQXBpQ2FsbHMnO1xuLy8gaW1wb3J0IHtjb21tYUZvcm1hdHRlZH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdFeHBlbnNlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zZWxlY3RUeXBlID0gdGhpcy5zZWxlY3RUeXBlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdWJtaXROZXdFeHBlbnNlID0gdGhpcy5zdWJtaXROZXdFeHBlbnNlLmJpbmQodGhpcyk7XG4gICAgXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHR5cGU6ICdleHBlbnNlJyxcbiAgICAgIGFtb3VudDogJycsXG4gICAgICBjYXRlZ29yeTogJycsXG4gICAgICBkYXk6ICcnLCBcbiAgICAgIG1vbnRoOiAnJyxcbiAgICAgIHllYXI6ICcnLFxuICAgICAgZXJyb3I6IHt9XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0VHlwZSh0eXBlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dHlwZTogdHlwZX0pO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50KHZhbCl7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YW1vdW50OiB2YWx9KVxuICB9XG5cbiAgY2hhbmdlRGF0ZSh2YWwsIGN1cnJlbnQsIG5leHQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsuLi52YWx9KTtcbiAgICBpZiAoY3VycmVudCAmJiB2YWxbY3VycmVudF0ubGVuZ3RoID09PSAyICYmIG5leHQpIHtcbiAgICAgIHRoaXMucmVmc1tuZXh0XS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGlzVmFsaWREYXRlKCkge1xuICAgIGNvbnN0IHtkYXksIG1vbnRoLCB5ZWFyfSA9IHRoaXMuc3RhdGU7XG4gICAgdmFyIGRhdGVSZWcgPSAvXlswLTldWzAtOV0kLztcbiAgICBpZiAoIWRhdGVSZWcudGVzdChkYXkpIHx8ICFkYXRlUmVnLnRlc3QobW9udGgpIHx8ICFkYXRlUmVnLnRlc3QoeWVhcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoMjAwMCArIHBhcnNlSW50KHllYXIpLCBwYXJzZUludChtb250aCktMSwgcGFyc2VJbnQoZGF5KSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgdmFsaWRhdGVQYXJhbXMoKSB7XG4gICAgdmFyIHJlZyA9IC9eXFxkKyQvO1xuICAgIGNvbnN0IHthbW91bnQsIGNhdGVnb3J5fSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKCFhbW91bnQgfHwgIXJlZy50ZXN0KGFtb3VudCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB7YW1vdW50OiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBBbW91bnQnfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWNhdGVnb3J5KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2NhdGVnb3J5OiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBDYXRlZ29yeSd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc1ZhbGlkRGF0ZSgpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2RhdGU6ICdQbGVhc2UgcHJvdmlkZSBhIFZhbGlkIERhdGUnfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzdWJtaXROZXdFeHBlbnNlKCkge1xuICAgIGNvbnN0IHthbW91bnQsIGRheSwgbW9udGgsIHllYXIsIHR5cGUsIGNhdGVnb3J5fSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgaXNWYWxpZGF0aW9uU3VjY2VzcyA9IHRoaXMudmFsaWRhdGVQYXJhbXMoKTtcbiAgICBpZiAoaXNWYWxpZGF0aW9uU3VjY2Vzcykge1xuICAgICAgY29uc3QgcGFyYW1zID0geyBhbW91bnQsIHR5cGUsIGRhdGU6IHRoaXMuZGF0ZSwgY2F0ZWdvcnl9O1xuICAgICAgbmV3X2V4cGVuc2UocGFyYW1zKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm5ld0V4cGVuc2UoZmFsc2UpO1xuICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGNyZWF0ZSBuZXcgRXhwZW5zZScsZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7dHlwZSwgYW1vdW50LCBkYXksIG1vbnRoLCB5ZWFyLCBjYXRlZ29yeSwgZXJyb3J9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ld0V4cGVuc2VDb250YWluZXIgemkyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwSW5jQnRucyB0ZXh0Q2VudGVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnbmV3QnRuICcgKyAodHlwZSA9PT0gJ2V4cGVuc2UnID8gJ3NlbGVjdGVkVHlwZScgOiAnJyl9ICBvbkNsaWNrPXsoKSA9PiB0aGlzLnNlbGVjdFR5cGUoJ2V4cGVuc2UnKX0+RXhwZW5zZTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eyduZXdCdG4gJyArICh0eXBlID09PSAnaW5jb21lJyA/ICdzZWxlY3RlZFR5cGUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNlbGVjdFR5cGUoJ2luY29tZScpfT5JbmNvbWU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFtb3VudElucHV0XCI+XG4gICAgICAgIDxzcGFuPuKCuTwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkFtb3VudFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VBbW91bnQoZS50YXJnZXQudmFsdWUpfSB2YWx1ZT17YW1vdW50fS8+XG4gICAgICAgICAge2Vycm9yLmFtb3VudCA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuYW1vdW50fTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICBjbGFzc05hbWU9XCJjYXRlZ29yeUlucHV0XCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJDYXRlZ29yeVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7Y2F0ZWdvcnk6IGUudGFyZ2V0LnZhbHVlfSl9IHZhbHVlPXtjYXRlZ29yeX0vPlxuICAgICAgICAgIHtlcnJvci5jYXRlZ29yeSA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuY2F0ZWdvcnl9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BlbnREYXlcIj5cbiAgICAgICAgICA8aW5wdXQgcmVmPVwiZGF5XCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiRERcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7ZGF5OiBlLnRhcmdldC52YWx1ZX0sICdkYXknLCAnbW9udGgnKX0gdmFsdWU9e2RheX0vPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJtb250aFwiIGNsYXNzTmFtZT1cImRheUlwXCIgdHlwZT1cIm51bWJlclwiIG1heExlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIk1NXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe21vbnRoOiBlLnRhcmdldC52YWx1ZX0sICdtb250aCcsICd5ZWFyJyl9IHZhbHVlPXttb250aH0vPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJ5ZWFyXCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiWVlcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7eWVhcjogZS50YXJnZXQudmFsdWV9LCAneWVhcicpfSB2YWx1ZT17eWVhcn0vPlxuICAgICAgICAgIHtlcnJvci5kYXRlID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5kYXRlfTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Ym1pdEJ0blwiIG9uQ2xpY2s9e3RoaXMuc3VibWl0TmV3RXhwZW5zZX0+RG9uZTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCB7TmF2TGlua30gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNsYXNzIE5vdEZvdW5kIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLmJpbmQodGhpcyk7XG4gIH1cblxuICBoZWFkKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0PlxuICAgICAgICA8dGl0bGU+UGFnZSBOb3QgRm91bmQ8L3RpdGxlPlxuICAgICAgPC9IZWxtZXQ+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuaGVhZCgpfVxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT5Tb3JyeSwgdGhlIHBhZ2UgeW91IGFyZSBleHBlY3RpbmcgZG9lcyBub3QgZXhpc3QhPC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpIG9uQ2xpY2s9IHsoKSA9PiB0aGlzLnByb3BzLmhpc3RvcnkuZ29CYWNrKCl9PiBcbiAgICAgICAgICAgICAgQmFja1xuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPE5hdkxpbmsgdG89Jy8nPiBIb21lIDwvTmF2TGluaz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxOYXZMaW5rIHRvPScvbG9naW4nPiBMb2dpbiA8L05hdkxpbms+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTm90Rm91bmQ7IiwiZXhwb3J0IGNvbnN0IE1PTlRIID0gJ21vbnRoJztcbmV4cG9ydCBjb25zdCBZRUFSID0gJ3llYXInO1xuZXhwb3J0IGNvbnN0IFdFRUsgPSAnd2Vlayc7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtCcm93c2VyUm91dGVyLCBTd2l0Y2gsIFJvdXRlfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuXG5pbXBvcnQgTG9naW4gZnJvbSAnLi4vY29tcG9uZW50cy9Mb2dpbic7XG5pbXBvcnQgTm90Rm91bmQgZnJvbSAnLi4vY29tcG9uZW50cy9Ob3RGb3VuZCdcbmltcG9ydCBIb21lIGZyb20gJy4uL2NvbXBvbmVudHMvSG9tZSc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8U3dpdGNoPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9Jy8nIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8SG9tZSB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvaG9tZScgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxIb21lIHsuLi5wcm9wc30vPn0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9Jy9sb2dpbicgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxMb2dpbiB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIDxSb3V0ZSByZW5kZXI9eyhwcm9wcykgPT4gPE5vdEZvdW5kIHsuLi5wcm9wc30vPn0vPlxuICAgICAgICA8L1N3aXRjaD5cbiAgICApO1xufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1zZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTsiXSwic291cmNlUm9vdCI6IiJ9