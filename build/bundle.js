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
    var dd = date.getDate();
    var newExpense = { amount: amount, category: category, date: date, type: type, ww: ww, dow: dow, mm: mm, yy: yy, dd: dd };
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
            } else {
                spent = 0;
            }
            if (incomeList) {
                incomeList.transactionList.map(function (transaction) {
                    var percent = transaction.amount / (incomeList.amount / 100);
                    transaction.percent = Math.round(percent * 100) / 100;
                });
                standing = incomeList.amount - spent;
            } else {
                standing = 0 - spent;
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
            if (data && data[0] && data[0].perDivisionData) {
                var maxAmount = Number.MIN_SAFE_INTEGER;
                data[0].perDivisionData.forEach(function (entry) {
                    if (maxAmount < entry.amount) {
                        maxAmount = entry.amount;
                    }
                });
                data[0].maxAmount = maxAmount;
                response.send(_extends({}, data[0]));
            } else {
                response.send({});
            }
        }
    };
    var userId = request.session.user_id ? _mongoose2.default.Types.ObjectId(request.session.user_id) : _mongoose2.default.Types.ObjectId("5c1630ad7669ea2c9bb04616");
    var _request$body5 = request.body,
        tab = _request$body5.tab,
        yy = _request$body5.yy,
        mm = _request$body5.mm,
        ww = _request$body5.ww;

    if (tab === _constants.YEAR) {
        _expenseModel2.default.aggregate([{ $match: { user_id: userId } }, { $match: { yy: yy } }, { $match: { type: 'expense' } }, { $group: { _id: { mm: '$mm' }, amount: { $sum: '$amount' }, month: { '$first': '$mm' } } }, { $sort: { month: 1 } }, { $group: { _id: null, totalAmount: { '$sum': '$amount' }, perDivisionData: { $push: { amount: '$amount', division: '$month' } } } }, { $project: { _id: 0 } }]).allowDiskUse(true).exec(execSummaryQuery);
    } else if (tab === _constants.MONTH) {
        _expenseModel2.default.aggregate([{ $match: { user_id: userId } }, { $match: { yy: yy } }, { $match: { mm: mm } }, { $match: { type: 'expense' } }, { $group: { _id: { dd: '$dd' }, amount: { '$sum': '$amount' }, dd: { '$first': '$dd' } } }, { $sort: { dd: 1 } }, { $group: { _id: null, totalAmount: { '$sum': '$amount' }, perDivisionData: { $push: { amount: '$amount', division: '$dd' } } } }, { $project: { _id: 0 } }]).allowDiskUse(true).exec(execSummaryQuery);
    } else if (tab === _constants.WEEK) {
        _expenseModel2.default.aggregate([{ $match: { user_id: userId } }, { $match: { yy: yy } }, { $match: { mm: mm } }, { $match: { ww: ww } }, { $match: { type: 'expense' } }, { $group: { _id: { dow: '$dow' }, amount: { $sum: '$amount' }, dow: { '$first': '$dow' } } }, { $sort: { dow: 1 } }, { $group: { _id: null, totalAmount: { $sum: '$amount' }, perDivisionData: { $push: { amount: '$amount', division: '$dow' } } } }, { $project: { _id: 0 } }]).allowDiskUse(true).exec(execSummaryQuery);
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
  dd: {
    type: Number,
    required: false,
    trim: true
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
    return '\n        <html>\n            <head>\n                ' + helmet.meta.toString() + '\n                ' + helmet.title.toString() + '\n                <meta name="viewport" content="width=device-width, initial-scale=1.0">\n                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">\n                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js">\n                <link rel="stylesheet" type="text/css" href="/styles/common.css">\n                <link rel="stylesheet" type="text/css" href="/styles/home.css">\n                <link rel="stylesheet" type="text/css" href="/styles/login.css">\n                <link rel="stylesheet" type="text/css" href="/styles/new_expense.css">\n                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">\n            </head>\n            <body>\n                <div id="root">' + content + '</div>\n                <script src="client_bundle.js"></script>\n            </body>\n        </html>';
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

var _constants = __webpack_require__(/*! ../constants/constants */ "./src/pages/constants/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WIDTH = 150;
var HEIGHT = 100;

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
      var _props = this.props,
          plotData = _props.plotData,
          tab = _props.tab;

      var xCoordinates = [];
      var yCoordinates = [];
      var length = _constants.DIVISIONLENGTH[tab];
      var maxAmt = plotData.maxAmount;
      var xCoordinateDivLength = WIDTH / (length + 2);
      var lastDivision = 0;
      var str = '';

      /* To start the graph at the Least Point */
      xCoordinates.push(0);
      yCoordinates.push(HEIGHT);
      plotData.perDivisionData.forEach(function (entry) {
        while (entry.division > lastDivision) {
          var _lastX = xCoordinates[xCoordinates.length - 1];
          xCoordinates.push(_lastX + xCoordinateDivLength);
          if (entry.division === lastDivision + 1) {
            var percent = entry.amount / maxAmt * 100;
            yCoordinates.push(HEIGHT - HEIGHT / 100 * percent);
          } else {
            yCoordinates.push(HEIGHT);
          }
          lastDivision = lastDivision + 1;
        }
      });
      var lastX = xCoordinates[xCoordinates.length - 1];
      xCoordinates.push(lastX + xCoordinateDivLength);
      yCoordinates.push(HEIGHT);

      for (var i = 0; i < xCoordinates.length; i++) {
        str += ' ' + xCoordinates[i] + ',' + yCoordinates[i] + ' ';
      }
      if (str) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'svg',
            { viewBox: '0 0 ' + WIDTH + ' ' + HEIGHT, style: { margin: '20px' } },
            _react2.default.createElement('polyline', { points: str, className: 'graphPlotLine' })
          )
        );
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
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
    _this.viewedMore = {};
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
      this.refs.transactedCard.scrollTop = 0;
    }
  }, {
    key: 'renderInnerTransactioncard',
    value: function renderInnerTransactioncard() {
      var _this5 = this;

      return this.state.expenseList.transactionList.map(function (transaction, index) {
        if (_this5.state.viewMore || _this5.viewedMore[_this5.state.activeTab] || !_this5.state.viewMore && index < 2) {
          if (_this5.state.viewMore) {
            _this5.viewedMore[_this5.state.activeTab] = true; // To not remove element from DOM on clicking view More again
          }
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
                { className: 'cat_percent ' },
                transaction.percent + ' %'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'progressBar bl textCenter marginT25' },
              _react2.default.createElement('div', { className: 'filled', style: { maxWidth: transaction.percent + '%' } })
            )
          );
        } else {
          return null;
        }
      });
    }
  }, {
    key: 'getTransactionCard',
    value: function getTransactionCard() {
      var _this6 = this;

      var _state = this.state,
          activeTab = _state.activeTab,
          _state$viewMore = _state.viewMore,
          viewMore = _state$viewMore === undefined ? false : _state$viewMore;

      var hasData = this.state.expenseList && Object.keys(this.state.expenseList).length > 0;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { ref: 'transactedCard', className: 'transactedCard transition1a ' + (viewMore ? 'showAllTransaction' : '') },
          hasData ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'transactScroller' },
              activeTab === _constants.WEEK ? this.renderInnerTransactioncard() : null,
              activeTab === _constants.MONTH ? this.renderInnerTransactioncard() : null,
              activeTab === _constants.YEAR ? this.renderInnerTransactioncard() : null
            )
          ) : _react2.default.createElement(
            'div',
            { className: 'textCenter padT20 mh10p' },
            _react2.default.createElement(
              'div',
              null,
              'No Transactions added '
            ),
            typeof window !== 'undefined' && !window.signedIn && _react2.default.createElement(
              'div',
              { className: 'padT10 padB20' },
              _react2.default.createElement(
                'a',
                { href: '/login' },
                _react2.default.createElement(
                  'span',
                  null,
                  'Sign In'
                )
              ),
              ' for Past Transactions'
            )
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
        ),
        _react2.default.createElement(
          'div',
          { className: 'newContainer ' + (!hasData ? 'padT10' : '') },
          _react2.default.createElement(
            'div',
            { className: 'new' },
            _react2.default.createElement(
              'span',
              { className: 'newBtn', onClick: function onClick() {
                  return _this6.newExpense(true);
                } },
              ' + add New'
            )
          )
        )
      );
    }
  }, {
    key: 'getCurrentDate',
    value: function getCurrentDate() {
      var date = new Date();
      var currMonth = _constants.MONTHSNAME[date.getMonth()];
      var currDate = date.getDate();
      return currDate + ' ' + currMonth + ' ' + date.getFullYear();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var _state2 = this.state,
          activeTab = _state2.activeTab,
          showNewExpense = _state2.showNewExpense,
          _state2$standing = _state2.standing,
          standing = _state2$standing === undefined ? undefined : _state2$standing,
          _state2$spent = _state2.spent,
          spent = _state2$spent === undefined ? undefined : _state2$spent,
          _state2$viewMore = _state2.viewMore,
          viewMore = _state2$viewMore === undefined ? false : _state2$viewMore,
          plotData = _state2.plotData,
          incomeList = _state2.incomeList;

      return _react2.default.createElement(
        'div',
        { className: '' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', { ref: 'backDrop', className: 'transition2a zi1 ' + (showNewExpense ? 'backDrop' : ''), onClick: function onClick() {
              return _this7.newExpense(false);
            } }),
          this.renderLeftMenuBar(),
          _react2.default.createElement(
            'div',
            { ref: 'mainContent', className: 'mainContent' },
            _react2.default.createElement(
              'div',
              { className: '' },
              _react2.default.createElement('div', { 'class': 'first-half-landing' }),
              _react2.default.createElement(
                'div',
                { ref: 'firstHalfLandingTxt', className: 'transition0_5 ' },
                _react2.default.createElement(
                  'div',
                  { className: 'standing' },
                  _react2.default.createElement(
                    'span',
                    { className: 'left-menu-container', onClick: this.leftMenuClick },
                    _react2.default.createElement('img', { className: 'left-menu', src: '/img/menu.svg' })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'heading' },
                  _react2.default.createElement(
                    'div',
                    { className: 'fb f11' },
                    'CURRENT BALANCE'
                  ),
                  _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                      'span',
                      { className: 'f18' },
                      '\u20B9 '
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'standingAmt' },
                      typeof standing !== 'undefined' ? standing : '0'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'textCenter' },
                    _react2.default.createElement(
                      'div',
                      null,
                      _react2.default.createElement(
                        'span',
                        { className: 'f11' },
                        this.getCurrentDate()
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'expenseDaysBtn' },
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (activeTab === _constants.WEEK ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this7.changeExpenseDayFormat(_constants.WEEK);
                      } },
                    'Week'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (activeTab === _constants.MONTH ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this7.changeExpenseDayFormat(_constants.MONTH);
                      } },
                    'Month'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (activeTab === _constants.YEAR ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this7.changeExpenseDayFormat(_constants.YEAR);
                      } },
                    'Year'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'spentIncomeSection' },
                  _react2.default.createElement(
                    'div',
                    { className: 'in-bl ' },
                    _react2.default.createElement(
                      'div',
                      { className: 'fl in-bl spentIcon' },
                      _react2.default.createElement(
                        'svg',
                        { width: '21', height: '17', viewBox: '0 0 24 24' },
                        _react2.default.createElement('path', { d: 'M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-17 1h4v-8h2v8h4l-5 6-5-6z' })
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'subHeading in-bl' },
                      'Spent : ₹' + (typeof spent !== 'undefined' ? spent : '0')
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'in-bl  ' },
                    _react2.default.createElement(
                      'div',
                      { className: 'fl in-bl incomeIcon ' },
                      _react2.default.createElement(
                        'svg',
                        { className: 'fl in-bl', width: '21', height: '17', viewBox: '0 0 24 24' },
                        _react2.default.createElement('path', { d: 'M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm17-1h-4v8h-2v-8h-4l5-6 5 6z' })
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'subHeading in-bl' },
                      'Income : ₹' + (incomeList && typeof incomeList.amount !== 'undefined' ? incomeList.amount : '0')
                    )
                  )
                ),
                this.getTransactionCard()
              )
            ),
            plotData && plotData.perDivisionData && plotData.perDivisionData.length > 0 ? _react2.default.createElement(
              'div',
              { className: 'other-half-landing' },
              _react2.default.createElement(
                'div',
                { ref: 'otherHalfLandingTxt', className: 'transition0_5 ' },
                _react2.default.createElement(
                  'div',
                  { className: 'textCenter trSumaryHeading fb' },
                  _react2.default.createElement(
                    'span',
                    null,
                    'Expense Trends'
                  )
                ),
                activeTab === _constants.WEEK ? _react2.default.createElement(_Graph2.default, { plotData: plotData, tab: activeTab }) : null,
                activeTab === _constants.MONTH ? _react2.default.createElement(_Graph2.default, { plotData: plotData, tab: activeTab }) : null,
                activeTab === _constants.YEAR ? _react2.default.createElement(_Graph2.default, { plotData: plotData, tab: activeTab }) : null
              )
            ) : null
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
      username: '',
      password: ''
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
    value: function signIn(withTestCreds) {
      var _this2 = this;

      var _state = this.state,
          username = _state.username,
          password = _state.password;

      if (withTestCreds) {
        username = 'dhilip';
        password = 'dhilipdhilip';
      }
      (0, _ApiCalls.signin)({ username: username, password: password }).then(function (resp) {
        if (resp.data && !resp.data.error) {
          console.log(_this2);
          _this2.props.history.push('/home', {});
          if (typeof window !== 'undefined') {
            window.signedIn = true;
          }
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
            'div',
            { className: 'loginContainer white' },
            _react2.default.createElement(
              'div',
              { className: 'fieldsDiv' },
              _react2.default.createElement(
                'div',
                { className: 'username' },
                _react2.default.createElement('input', { className: 'whiteBrdrBtm', placeholder: 'Username', value: this.state.username, onChange: function onChange(e) {
                    return _this3.setState({ username: e.target.value });
                  }, type: 'text' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'password padT10' },
                _react2.default.createElement('input', { className: 'whiteBrdrBtm', placeholder: 'Password', value: this.state.password, onChange: function onChange(e) {
                    return _this3.setState({ password: e.target.value });
                  }, type: 'password' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'textCenter padT20' },
              _react2.default.createElement(
                'div',
                { className: 'new di' },
                _react2.default.createElement(
                  'span',
                  { className: 'newBtn', onClick: this.signIn },
                  'Sign In'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'new di' },
                _react2.default.createElement(
                  'span',
                  { className: 'newBtn', onClick: this.signUp },
                  'Sign Up'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'textCenter padT20' },
              _react2.default.createElement(
                'div',
                { className: 'new' },
                _react2.default.createElement(
                  'span',
                  { className: 'newBtn', onClick: function onClick() {
                      return _this3.signIn(true);
                    } },
                  'Continue with Test Login'
                )
              )
            )
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

var _constants = __webpack_require__(/*! ../constants/constants */ "./src/pages/constants/constants.js");

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
    key: 'renderOptions',
    value: function renderOptions(type) {
      var options = [];
      if (type === 'day') {
        for (var i = 1; i < 32; i++) {
          options.push(_react2.default.createElement(
            'option',
            { value: i },
            i
          ));
        }
      } else if (type === 'month') {
        for (var _i = 0; _i < 12; _i++) {
          options.push(_react2.default.createElement(
            'option',
            { value: _i },
            _constants.MONTHSNAMESHORT[_i]
          ));
        }
      } else if (type === 'year') {
        for (var _i2 = 2020; _i2 > 2000; _i2--) {
          options.push(_react2.default.createElement(
            'option',
            { value: _i2 },
            _i2
          ));
        }
      }
      return options;
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
          { className: 'expIncBtns textCenter mT25' },
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
          { className: 'amountInput mT25 ' },
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
          { className: 'categoryInput mT25 ' },
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
          { className: 'spentDay mT25 ' },
          _react2.default.createElement(
            'select',
            { ref: 'day', onChange: function onChange(e) {
                return _this3.changeDate({ day: e.target.value }, 'day', 'month');
              } },
            this.renderOptions('day')
          ),
          _react2.default.createElement(
            'select',
            { ref: 'day', onChange: function onChange(e) {
                return _this3.changeDate({ day: e.target.value }, 'month', 'year');
              } },
            this.renderOptions('month')
          ),
          _react2.default.createElement(
            'select',
            { ref: 'day', onChange: function onChange(e) {
                return _this3.changeDate({ day: e.target.value }, 'year');
              } },
            this.renderOptions('year')
          ),
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
var DIVISIONLENGTH = exports.DIVISIONLENGTH = { month: 31, year: 12, week: 7 };
var MONTHSNAME = exports.MONTHSNAME = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var MONTHSNAMESHORT = exports.MONTHSNAMESHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
        _react2.default.createElement(_reactRouterDom.Route, { path: '/login', exact: true, render: function render(props) {
                return _react2.default.createElement(_Login2.default, props);
            } }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/home', exact: true, render: function render(props) {
                return _react2.default.createElement(_Home2.default, props);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2FwaS9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvZGIvbW9uZ29vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9leHBlbnNlTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hcGlDYWxscy9BcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Ib21lLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL0xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05ld0V4cGVuc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvTm90Rm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbnN0YW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3JvdXRlcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbmdvb3NlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb21cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIl0sIm5hbWVzIjpbInNpZ25VcCIsInJlcXVlc3QiLCJyZXNwb25zZSIsImJvZHkiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZW1haWxJZCIsInVzZXIiLCJVc2VycyIsIl9pZCIsIm1vbmdvb3NlIiwiVHlwZXMiLCJPYmplY3RJZCIsImZpbmQiLCJ0aGVuIiwicmVzIiwibGVuZ3RoIiwic2VuZCIsImVycm9yIiwibXNnIiwic2F2ZSIsImRvYyIsInNlc3Npb24iLCJfdXNlcklkIiwiZSIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJzaWduSW4iLCJuZXdFeHBlbnNlIiwiYW1vdW50IiwiY2F0ZWdvcnkiLCJkYXRlIiwidHlwZSIsInBhcnNlSW50IiwiRGF0ZSIsInd3IiwiTWF0aCIsImNlaWwiLCJnZXREYXRlIiwiZG93IiwiZ2V0RGF5IiwibW0iLCJnZXRNb250aCIsInl5IiwiZ2V0RnVsbFllYXIiLCJkZCIsIm5ld0V4cGVuc2VJbnN0YW5jZSIsIkV4cGVuc2VzIiwidXNlcl9pZCIsImVyciIsImdldEV4cGVuc2VEYXRhIiwidXNlcklkIiwiZXhwZW5zZURhdGVSZXNwb25kZXIiLCJkYXRhIiwicmVzcG9uZCIsImV4cGVuc2VMaXN0IiwiaW5jb21lTGlzdCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJzcGVudCIsInN0YW5kaW5nIiwidHJhbnNhY3Rpb25MaXN0IiwidHJhbnNhY3Rpb24iLCJwZXJjZW50Iiwicm91bmQiLCJncm91cDEiLCIkZ3JvdXAiLCIkc3VtIiwiZ3JvdXAyIiwiJHB1c2giLCJ1bndpbmQiLCIkdW53aW5kIiwic29ydCIsIiRzb3J0IiwicmVHcm91cCIsInRhYiIsIllFQVIiLCJhZ2dyZWdhdGUiLCIkbWF0Y2giLCIkcHJvamVjdCIsImFsbG93RGlza1VzZSIsImV4ZWMiLCJNT05USCIsIldFRUsiLCJnZXRFeHBlbnNlU3VtbWFyeSIsImV4ZWNTdW1tYXJ5UXVlcnkiLCJwZXJEaXZpc2lvbkRhdGEiLCJtYXhBbW91bnQiLCJOdW1iZXIiLCJNSU5fU0FGRV9JTlRFR0VSIiwiZm9yRWFjaCIsImVudHJ5IiwibW9udGgiLCJ0b3RhbEFtb3VudCIsImRpdmlzaW9uIiwiZW52IiwicHJvY2VzcyIsIlBPUlQiLCJNT05HT0xBQl9VUkkiLCJtb25nb29zZTEiLCJyZXF1aXJlIiwiUHJvbWlzZSIsImdsb2JhbCIsImNvbm5lY3QiLCJ1c2VOZXdVcmxQYXJzZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9kZWwiLCJTY2hlbWEiLCJyZWYiLCJyZXF1aXJlZCIsInRyaW0iLCJTdHJpbmciLCJkZWZhdWx0Iiwibm93IiwibWlubGVuZ3RoIiwiZXhwZW5zZSIsImFwcCIsInBvcnQiLCJ1c2UiLCJzZWNyZXQiLCJyZXNhdmUiLCJzYXZlVW5pbml0aWFsaXplZCIsImJvZHlQYXJzZXIiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJqc29uIiwiZXhwcmVzcyIsInN0YXRpYyIsInBvc3QiLCJsb2FkSHRtbCIsImNvbnRlbnQiLCJoZWxtZXQiLCJIZWxtZXQiLCJyZW5kZXJTdGF0aWMiLCJtZXRhIiwidG9TdHJpbmciLCJ0aXRsZSIsImdldCIsInJlcSIsImNvbnRleHQiLCJSZWFjdERPTVNlcnZlciIsInJlbmRlclRvU3RyaW5nIiwidXJsIiwidGVtcGxhdGUiLCJsaXN0ZW4iLCJBcHAiLCJDb21wb25lbnQiLCJzaWdudXAiLCJwYXJhbXMiLCJheGlvcyIsInNpZ25pbiIsIm5ld19leHBlbnNlIiwiZ2V0X2V4cGVuc2VfZGF0YSIsImdldF9leHBlbnNlX3N1bW1hcnkiLCJXSURUSCIsIkhFSUdIVCIsIkdyYXBoIiwicHJvcHMiLCJnZW5lcmF0ZVNWRyIsImJpbmQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYWxlcnQiLCJwbG90RGF0YSIsInhDb29yZGluYXRlcyIsInlDb29yZGluYXRlcyIsIkRJVklTSU9OTEVOR1RIIiwibWF4QW10IiwieENvb3JkaW5hdGVEaXZMZW5ndGgiLCJsYXN0RGl2aXNpb24iLCJzdHIiLCJwdXNoIiwibGFzdFgiLCJpIiwibWFyZ2luIiwiSG9tZSIsImxlZnRNZW51Q2xpY2siLCJuYXZpZ2F0ZVRvU2lnbkluIiwic3RhdGUiLCJhY3RpdmVUYWIiLCJzaG93TmV3RXhwZW5zZSIsInVuZGVmaW5lZCIsInZpZXdNb3JlIiwidmlld2VkTW9yZSIsImdldEV4cGVuc2UiLCJyZXNwIiwic2V0U3RhdGUiLCJyZWZzIiwiYmFja0Ryb3AiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJwb3B1cCIsImZpcnN0SGFsZkxhbmRpbmdUeHQiLCJvdGhlckhhbGZMYW5kaW5nVHh0IiwiaGlzdG9yeSIsInZhbCIsInRyYW5zYWN0ZWRDYXJkIiwic2Nyb2xsVG9wIiwiaW5kZXgiLCJtYXhXaWR0aCIsImhhc0RhdGEiLCJyZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZCIsInNpZ25lZEluIiwiY2xpY2tWaWV3TW9yZSIsImN1cnJNb250aCIsIk1PTlRIU05BTUUiLCJjdXJyRGF0ZSIsInJlbmRlckxlZnRNZW51QmFyIiwiZ2V0Q3VycmVudERhdGUiLCJjaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0IiwiZ2V0VHJhbnNhY3Rpb25DYXJkIiwiTG9naW4iLCJoZWFkIiwid2l0aFRlc3RDcmVkcyIsImNhdGNoIiwidGFyZ2V0IiwidmFsdWUiLCJOZXdFeHBlbnNlIiwic2VsZWN0VHlwZSIsInN1Ym1pdE5ld0V4cGVuc2UiLCJkYXkiLCJ5ZWFyIiwiY3VycmVudCIsIm5leHQiLCJmb2N1cyIsImRhdGVSZWciLCJ0ZXN0IiwicmVnIiwiaXNWYWxpZERhdGUiLCJpc1ZhbGlkYXRpb25TdWNjZXNzIiwidmFsaWRhdGVQYXJhbXMiLCJvcHRpb25zIiwiTU9OVEhTTkFNRVNIT1JUIiwiY2hhbmdlQW1vdW50IiwiY2hhbmdlRGF0ZSIsInJlbmRlck9wdGlvbnMiLCJOb3RGb3VuZCIsImdvQmFjayIsIndlZWsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVPLElBQU1BLDBCQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsT0FBRCxFQUFVQyxRQUFWLEVBQXVCO0FBQ3pDO0FBRHlDLHdCQUVjRCxRQUFRRSxJQUZ0QjtBQUFBLDhDQUVqQ0MsUUFGaUM7QUFBQSxRQUVqQ0EsUUFGaUMseUNBRXRCLEVBRnNCO0FBQUEsOENBRWxCQyxRQUZrQjtBQUFBLFFBRWxCQSxRQUZrQix5Q0FFUCxFQUZPO0FBQUEsOENBRUhDLE9BRkc7QUFBQSxRQUVIQSxPQUZH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QWxELEVBQXlELEtBQXpELEVBQWdFLEtBQWhFLEVBQXVFLEtBQXZFLEVBQThFLEtBQTlFLENBQXpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xQOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZSxZQUFNO0FBQ2pCLFdBQ0k7QUFBQyw4QkFBRDtBQUFBO0FBQ0ksc0NBQUMscUJBQUQsSUFBTyxNQUFLLFFBQVosRUFBcUIsV0FBckIsRUFBMkIsUUFBUSxnQkFBQzNFLEtBQUQ7QUFBQSx1QkFBVyw4QkFBQyxlQUFELEVBQVdBLEtBQVgsQ0FBWDtBQUFBLGFBQW5DLEdBREo7QUFHSSxzQ0FBQyxxQkFBRCxJQUFPLE1BQUssT0FBWixFQUFvQixXQUFwQixFQUEwQixRQUFRLGdCQUFDQSxLQUFEO0FBQUEsdUJBQVcsOEJBQUMsY0FBRCxFQUFVQSxLQUFWLENBQVg7QUFBQSxhQUFsQztBQUhKLEtBREo7QUFTSCxDOzs7Ozs7Ozs7OztBQ2xCRCxrQzs7Ozs7Ozs7Ozs7QUNBQSwyQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSw2QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zZXJ2ZXIvc2VydmVyLmpzXCIpO1xuIiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBhcHAgZnJvbSAnLi4vc2VydmVyJ1xuaW1wb3J0IEV4cGVuc2VzIGZyb20gJy4uL21vZGVscy9leHBlbnNlTW9kZWwnO1xuaW1wb3J0IFVzZXJzIGZyb20gJy4uL21vZGVscy91c2VyTW9kZWwnO1xuaW1wb3J0IHsgTU9OVEgsIFlFQVIsIFdFRUsgfSBmcm9tICcuLi8uLi9zcmMvcGFnZXMvY29uc3RhbnRzL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCBzaWduVXAgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAvLyBVc2Vycy5kZWxldGVNYW55KHt9KTtcbiAgICBjb25zdCB7IHVzZXJuYW1lID0gJycsIHBhc3N3b3JkID0gJycsIGVtYWlsSWQgPSAnJyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIHZhciB1c2VyID0gbmV3IFVzZXJzKHtcbiAgICAgICAgX2lkOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZCgpLFxuICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgZW1haWxJZDogZW1haWxJZFxuICAgIH0pO1xuICAgIFVzZXJzLmZpbmQoeyB1c2VybmFtZTogdXNlcm5hbWUgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiB0cnVlLCBtc2c6ICdVc2VybmFtZSBhbHJlYWR5IEV4aXN0cycgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNlc3Npb24uX3VzZXJJZCA9IGRvYy5faWQ7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiBmYWxzZSwgbXNnOiAnU2F2ZWQgU3VjY2Vzc2Z1bGx5JyB9KTtcbiAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzKDUwMCkuc2VuZChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwgKGUpID0+IHtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZChlKTtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2lnbkluID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3QgeyB1c2VybmFtZSA9ICcnLCBwYXNzd29yZCA9ICcnLCBlbWFpbElkID0gJycgfSA9IHJlcXVlc3QuYm9keTtcbiAgICBjb25zb2xlLmxvZyhyZXF1ZXN0LnNlc3Npb24udXNlcik7XG4gICAgVXNlcnMuZmluZCh7IHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID0gcmVzWzBdLl9pZDtcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoeyBlcnJvcjogZmFsc2UsIG1zZzogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiB0cnVlLCBtc2c6ICdObyB1c2VyIGFjY291bnQgZm91bmQnIH0pO1xuICAgICAgICB9XG4gICAgfSwgKGUpID0+IHtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZChlKTtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgbmV3RXhwZW5zZSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIGxldCB7IGFtb3VudCwgY2F0ZWdvcnksIGRhdGUsIHR5cGUgfSA9IHJlcXVlc3QuYm9keTtcbiAgICBhbW91bnQgPSBwYXJzZUludChhbW91bnQpO1xuICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICBjb25zdCB3dyA9IE1hdGguY2VpbChkYXRlLmdldERhdGUoKSAvIDcpO1xuICAgIGNvbnN0IGRvdyA9IGRhdGUuZ2V0RGF5KCkgKyAxO1xuICAgIGNvbnN0IG1tID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICBjb25zdCB5eSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBkZCA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IG5ld0V4cGVuc2UgPSB7IGFtb3VudCwgY2F0ZWdvcnksIGRhdGUsIHR5cGUsIHd3LCBkb3csIG1tLCB5eSwgZGR9O1xuICAgIHZhciBuZXdFeHBlbnNlSW5zdGFuY2UgPSBuZXcgRXhwZW5zZXMoe1xuICAgICAgICB1c2VyX2lkOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZChcIjVjMTYzMGFkNzY2OWVhMmM5YmIwNDYxNlwiKSxcbiAgICAgICAgLi4ubmV3RXhwZW5zZVxuICAgIH0pO1xuICAgIG5ld0V4cGVuc2VJbnN0YW5jZS5zYXZlKCkudGhlbigoZG9jKSA9PiB7XG4gICAgICAgIC8vIHJlcXVlc3Quc2Vzc2lvbi51c2VyID0gZG9jLnVzZXJuYW1lO1xuICAgICAgICByZXNwb25zZS5zZW5kKGRvYyk7XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIHNhdmUgbmV3IEV4cGVuc2UnLCBlcnIpO1xuICAgICAgICByZXNwb25zZS5zdGF0dXMoNTAwKS5zZW5kKGVycik7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZURhdGEgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSByZXF1ZXN0LnNlc3Npb24udXNlcl9pZCA/IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKHJlcXVlc3Quc2Vzc2lvbi51c2VyX2lkKSA6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKFwiNWMxNjMwYWQ3NjY5ZWEyYzliYjA0NjE2XCIpO1xuICAgIGZ1bmN0aW9uIGV4cGVuc2VEYXRlUmVzcG9uZGVyKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZXNwb25kLnNlbmQoNTAwKS5zZW5kKGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZXhwZW5zZUxpc3QsIGluY29tZUxpc3Q7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhW2tleV0udHlwZSA9PT0gJ2V4cGVuc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVuc2VMaXN0ID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YVtrZXldLnR5cGUgPT09ICdpbmNvbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGluY29tZUxpc3QgPSBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgc3BlbnQsIHN0YW5kaW5nO1xuICAgICAgICAgICAgaWYgKGV4cGVuc2VMaXN0KSB7XG4gICAgICAgICAgICAgICAgZXhwZW5zZUxpc3QudHJhbnNhY3Rpb25MaXN0Lm1hcCgodHJhbnNhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSB0cmFuc2FjdGlvbi5hbW91bnQgLyAoZXhwZW5zZUxpc3QuYW1vdW50IC8gMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ucGVyY2VudCA9IE1hdGgucm91bmQocGVyY2VudCAqIDEwMCkgLyAxMDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3BlbnQgPSBleHBlbnNlTGlzdC5hbW91bnQ7XG4gICAgICAgICAgICB9IGVsc2UgIHtcbiAgICAgICAgICAgICAgICBzcGVudCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5jb21lTGlzdCkge1xuICAgICAgICAgICAgICAgIGluY29tZUxpc3QudHJhbnNhY3Rpb25MaXN0Lm1hcCgodHJhbnNhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSB0cmFuc2FjdGlvbi5hbW91bnQgLyAoaW5jb21lTGlzdC5hbW91bnQgLyAxMDApO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5wZXJjZW50ID0gTWF0aC5yb3VuZChwZXJjZW50ICogMTAwKSAvIDEwMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzdGFuZGluZyA9IGluY29tZUxpc3QuYW1vdW50IC0gc3BlbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YW5kaW5nID0gMCAtIHNwZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGV4cGVuc2VMaXN0LCBpbmNvbWVMaXN0LCBzcGVudCwgc3RhbmRpbmcgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBRdWVyaWVzIHN0YXJ0XG4gICAgY29uc3QgZ3JvdXAxID0ge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDogeyBjYXRlZ29yeTogJyRjYXRlZ29yeScsIHR5cGU6ICckdHlwZScgfSxcbiAgICAgICAgICAgIHR5cGU6IHsgJyRmaXJzdCc6ICckdHlwZScgfSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiB7ICckZmlyc3QnOiAnJGNhdGVnb3J5JyB9LFxuICAgICAgICAgICAgYW1vdW50OiB7ICRzdW06ICckYW1vdW50JyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdyb3VwMiA9IHtcbiAgICAgICAgJGdyb3VwOiB7XG4gICAgICAgICAgICBfaWQ6IHsgdHlwZTogJyR0eXBlJyB9LFxuICAgICAgICAgICAgYW1vdW50OiB7ICRzdW06ICckYW1vdW50JyB9LFxuICAgICAgICAgICAgdHlwZTogeyAnJGZpcnN0JzogJyR0eXBlJyB9LFxuICAgICAgICAgICAgdHJhbnNhY3Rpb25MaXN0OiB7ICRwdXNoOiB7IGNhdGVnb3J5OiAnJGNhdGVnb3J5JywgYW1vdW50OiAnJGFtb3VudCcgfSB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHVud2luZCA9IHsgJHVud2luZDogJyR0cmFuc2FjdGlvbkxpc3QnIH07XG4gICAgY29uc3Qgc29ydCA9IHsgJHNvcnQ6IHsgJ3RyYW5zYWN0aW9uTGlzdC5hbW91bnQnOiAtMSB9IH1cbiAgICBjb25zdCByZUdyb3VwID0ge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDogeyB0eXBlOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJyRmaXJzdCc6ICckYW1vdW50JyB9LFxuICAgICAgICAgICAgdHlwZTogeyAnJGZpcnN0JzogJyR0eXBlJyB9LFxuICAgICAgICAgICAgdHJhbnNhY3Rpb25MaXN0OiB7ICRwdXNoOiAnJHRyYW5zYWN0aW9uTGlzdCcgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBRdWVyaWVzIGVuZFxuXG4gICAgY29uc3QgeyB0YWIsIHd3LCBtbSwgeXksIGRvdyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGlmICh0YWIgPT09IFlFQVIpIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZH0gfSxcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHl5OiBwYXJzZUludCh5eSkgfSB9LFxuICAgICAgICAgICAgeyAuLi5ncm91cDEgfSx7IC4uLmdyb3VwMiB9LFxuICAgICAgICAgICAgeyAuLi51bndpbmQgfSx7IC4uLnNvcnQgfSx7IC4uLnJlR3JvdXAgfSxcbiAgICAgICAgICAgIHsgJHByb2plY3Q6IHsgX2lkOiAwLCBhbW91bnQ6IDEsIHR5cGU6IDEsIHRyYW5zYWN0aW9uTGlzdDogMSB9IH1cbiAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhwZW5zZURhdGVSZXNwb25kZXIpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBNT05USCkge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkIH0gfSxcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHl5OiBwYXJzZUludCh5eSkgfSB9LHsgJG1hdGNoOiB7IG1tOiBwYXJzZUludChtbSkgfSB9LFxuICAgICAgICAgICAgeyAuLi5ncm91cDEgfSx7IC4uLmdyb3VwMiB9LFxuICAgICAgICAgICAgeyAuLi51bndpbmQgfSx7IC4uLnNvcnQgfSx7IC4uLnJlR3JvdXAgfSxcbiAgICAgICAgICAgIHsgJHByb2plY3Q6IHsgX2lkOiAwLCBhbW91bnQ6IDEsIHR5cGU6IDEsIHRyYW5zYWN0aW9uTGlzdDogMSB9IH1cbiAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhwZW5zZURhdGVSZXNwb25kZXIpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBXRUVLKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0seyAkbWF0Y2g6IHsgbW06IHBhcnNlSW50KG1tKSB9IH0seyAkbWF0Y2g6IHsgd3c6IHBhcnNlSW50KHd3KSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTdW1tYXJ5ID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgZnVuY3Rpb24gZXhlY1N1bW1hcnlRdWVyeShlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVzcG9uZC5zZW5kKDUwMCkuc2VuZChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YVswXSAmJiBkYXRhWzBdLnBlckRpdmlzaW9uRGF0YSkge1xuICAgICAgICAgICAgICAgIGxldCBtYXhBbW91bnQgPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUjtcbiAgICAgICAgICAgICAgICBkYXRhWzBdLnBlckRpdmlzaW9uRGF0YS5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heEFtb3VudCA8IGVudHJ5LmFtb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4QW1vdW50ID0gZW50cnkuYW1vdW50XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkYXRhWzBdLm1heEFtb3VudCA9IG1heEFtb3VudDtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHsuLi5kYXRhWzBdfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoe30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCB1c2VySWQgPSByZXF1ZXN0LnNlc3Npb24udXNlcl9pZCA/IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKHJlcXVlc3Quc2Vzc2lvbi51c2VyX2lkKSA6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKFwiNWMxNjMwYWQ3NjY5ZWEyYzliYjA0NjE2XCIpO1xuICAgIGNvbnN0IHt0YWIsIHl5LCBtbSwgd3d9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGlmICh0YWIgPT09IFlFQVIpIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkIH19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB5eTogeXl9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdHlwZTogJ2V4cGVuc2UnfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7IF9pZDogeyBtbTogJyRtbSd9LCBhbW91bnQ6IHskc3VtOiAnJGFtb3VudCd9LCBtb250aDogeyckZmlyc3QnOiAnJG1tJ319fSxcbiAgICAgICAgICAgIHskc29ydDogeyBtb250aDogMSB9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHtfaWQ6IG51bGwsIHRvdGFsQW1vdW50OiB7JyRzdW0nOiAnJGFtb3VudCd9LCBwZXJEaXZpc2lvbkRhdGE6IHskcHVzaCA6IHsgYW1vdW50OiAnJGFtb3VudCcsIGRpdmlzaW9uOiAnJG1vbnRoJ319fX0sXG4gICAgICAgICAgICB7JHByb2plY3Q6IHtfaWQ6IDB9fVxuICAgICAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhlY1N1bW1hcnlRdWVyeSk7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IE1PTlRIKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgeXk6IHl5fX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IG1tOiBtbX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB0eXBlOiAnZXhwZW5zZSd9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiB7ZGQ6ICckZGQnfSwgYW1vdW50OiB7JyRzdW0nOiAnJGFtb3VudCd9LCBkZDogeyckZmlyc3QnOiAnJGRkJ30gfX0sXG4gICAgICAgICAgICB7JHNvcnQ6IHtkZDogMX19LFxuICAgICAgICAgICAgeyRncm91cDoge19pZDogbnVsbCwgdG90YWxBbW91bnQ6IHsnJHN1bSc6ICckYW1vdW50J30sIHBlckRpdmlzaW9uRGF0YTogeyRwdXNoOiB7YW1vdW50OiAnJGFtb3VudCcsIGRpdmlzaW9uOiAnJGRkJ319fX0sXG4gICAgICAgICAgICB7JHByb2plY3Q6IHtfaWQ6MH19XG4gICAgICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleGVjU3VtbWFyeVF1ZXJ5KTtcbiAgICB9IGVsc2UgaWYgKHRhYiA9PT0gV0VFSykge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHl5OiB5eX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyBtbTogbW19fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgd3c6IHd3fX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHR5cGU6ICdleHBlbnNlJ319LFxuICAgICAgICAgICAgeyRncm91cDogeyBfaWQ6IHtkb3c6ICckZG93J30sIGFtb3VudDogeyRzdW06ICckYW1vdW50J30sIGRvdzogeyckZmlyc3QnOiAnJGRvdyd9fX0sXG4gICAgICAgICAgICB7JHNvcnQ6IHsgZG93OiAxfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7IF9pZDogbnVsbCwgdG90YWxBbW91bnQ6IHskc3VtOiAnJGFtb3VudCd9LCAgcGVyRGl2aXNpb25EYXRhOiB7JHB1c2g6IHthbW91bnQ6ICckYW1vdW50JywgZGl2aXNpb246ICckZG93J319fX0sXG4gICAgICAgICAgICB7JHByb2plY3Q6IHtfaWQ6IDB9fVxuICAgICAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhlY1N1bW1hcnlRdWVyeSk7XG4gICAgfVxufSIsInZhciBlbnYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnO1xuXG5pZiAoZW52ID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gIHByb2Nlc3MuZW52LlBPUlQgPSA0MDAwO1xuICBwcm9jZXNzLmVudi5NT05HT0xBQl9VUkkgPSAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9leHBlbnNlJztcbn0gZWxzZSB7XG4gIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSA9ICdtb25nb2RiOi8vZGhpbGlwazEzOmRoaWxpcGsxM0BkczI0NzMxMC5tbGFiLmNvbTo0NzMxMC9leHBlbnNlJztcbn1cbmV4cG9ydCBkZWZhdWx0IGVudjsiLCJ2YXIgbW9uZ29vc2UxID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcbm1vbmdvb3NlMS5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG5tb25nb29zZTEuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0xBQl9VUkksIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlIH0pLnRoZW4oKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gRGInKTtcbn0sKGUpPT4ge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHttb25nb29zZTF9OyIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgVXNlcnMgZnJvbSAnLi91c2VyTW9kZWwnO1xuXG5jb25zdCBFeHBlbnNlcyA9IG1vbmdvb3NlLm1vZGVsKCdFeHBlbnNlcycsIHtcbiAgdXNlcl9pZDoge1xuICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICByZWY6ICdVc2VycydcbiAgfSxcbiAgYW1vdW50OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHRyaW06IHRydWVcbiAgfSxcbiAgY2F0ZWdvcnk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICAgIGRlZmF1bHQ6ICdvdGhlcnMnXG4gIH0sXG4gIHR5cGU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWUsXG4gICAgZGVmYXVsdDogJ2V4cGVuc2UnXG4gIH0sXG4gIGRhdGU6IHtcbiAgICB0eXBlOiBEYXRlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlLFxuICAgIGRlZmF1bHQ6IERhdGUubm93KClcbiAgfSxcbiAgZGQ6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgd3c6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgZG93OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIG1tOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIHl5OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZXM7IiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBFeHBlbnNlcyBmcm9tICcuL2V4cGVuc2VNb2RlbCc7XG5cbmNvbnN0IFVzZXJzID0gbW9uZ29vc2UubW9kZWwoJ1VzZXJzJywge1xuICAgIF9pZDogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuICAgIHVzZXJuYW1lOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbmxlbmd0aDogNSxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgZW1haWxJZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWlubGVuZ3RoOiA4LFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBleHBlbnNlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCwgXG4gICAgICAgICAgICByZWY6ICdFeHBlbnNlcydcbiAgICAgICAgfVxuICAgIF1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgVXNlcnM7IiwiaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCc7XG5pbXBvcnQgZW52IGZyb20gJy4vY29uZmlnL2NvbmZpZyc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET01TZXJ2ZXIgZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xudmFyIHNlc3Npb24gPSByZXF1aXJlKCdleHByZXNzLXNlc3Npb24nKTtcblxuaW1wb3J0IEFwcCBmcm9tICcuLi9zcmMvYXBwJ1xuaW1wb3J0IG1vbmdvb3NlMSBmcm9tICcuL2RiL21vbmdvb3NlJztcbmltcG9ydCB7c2lnblVwLCBzaWduSW4sIG5ld0V4cGVuc2UsIGdldEV4cGVuc2VEYXRhLCBnZXRFeHBlbnNlU3VtbWFyeX0gZnJvbSAnLi9hcGkvYXBpQ2FsbHMnO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVDtcblxuYXBwLnVzZShzZXNzaW9uKHtcbiAgICBzZWNyZXQ6ICdkaGlsaXBMb2NhbCcsXG4gICAgcmVzYXZlOiBmYWxzZSxcbiAgICBzYXZlVW5pbml0aWFsaXplZDogdHJ1ZVxufSkpXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJ2J1aWxkL3B1YmxpYycpKTtcbmFwcC51c2UoJy9zdHlsZXMnLCBleHByZXNzLnN0YXRpYygnc3JjL3BhZ2VzL3N0eWxlcycpKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJ3NyYy9wYWdlcy9zdGF0aWMnKSk7XG5cbi8vIEFQSSBDYWxsc1xuYXBwLnBvc3QoJy9zaWdudXAnLCBzaWduVXApO1xuYXBwLnBvc3QoJy9zaWduaW4nLCBzaWduSW4pO1xuYXBwLnBvc3QoJy9uZXdfZXhwZW5zZScsIG5ld0V4cGVuc2UpO1xuYXBwLnBvc3QoJy9nZXRfZXhwZW5zZV9kYXRhJywgZ2V0RXhwZW5zZURhdGEpO1xuYXBwLnBvc3QoJy9nZXRfZXhwZW5zZV9zdW1tYXJ5JywgZ2V0RXhwZW5zZVN1bW1hcnkpO1xuXG5jb25zdCBsb2FkSHRtbCA9IChjb250ZW50KSA9PiB7XG4gICAgY29uc3QgaGVsbWV0ID0gSGVsbWV0LnJlbmRlclN0YXRpYygpO1xuICAgIHJldHVybiAoYFxuICAgICAgICA8aHRtbD5cbiAgICAgICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgICAgICR7aGVsbWV0Lm1ldGEudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICAgICAke2hlbG1ldC50aXRsZS50b1N0cmluZygpfVxuICAgICAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy90d2l0dGVyLWJvb3RzdHJhcC80LjEuMy9jc3MvYm9vdHN0cmFwLm1pbi5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3R3aXR0ZXItYm9vdHN0cmFwLzQuMS4zL2pzL2Jvb3RzdHJhcC5idW5kbGUubWluLmpzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL2NvbW1vbi5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvaG9tZS5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvbG9naW4uY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL25ld19leHBlbnNlLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9T3BlbitTYW5zXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICAgICAgICAgICAgPC9oZWFkPlxuICAgICAgICAgICAgPGJvZHk+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJvb3RcIj4ke2NvbnRlbnR9PC9kaXY+XG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJjbGllbnRfYnVuZGxlLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICA8L2JvZHk+XG4gICAgICAgIDwvaHRtbD5gKTtcbn07XG5cbmFwcC5nZXQoJyonLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCBjb250ZXh0ID0ge307XG4gICAgY29uc3QgY29udGVudCA9IFJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RyaW5nKFxuICAgICAgICA8U3RhdGljUm91dGVyPlxuICAgICAgICAgICAgPEFwcCBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0gLz5cbiAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgKTtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGxvYWRIdG1sKGNvbnRlbnQpO1xuICAgIHJlcy5zZW5kKHRlbXBsYXRlKTtcbn0pO1xuXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygncHJvY2Vzcy5lbnYnLCBwb3J0KTtcbiAgICBjb25zb2xlLmxvZygnU2VydmVyIFN0YXJ0ZWQgb24gUG9ydDogJywgcG9ydCk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYXBwOyIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3dpdGNoLCBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgSG9tZSBmcm9tICcuL3BhZ2VzL2NvbXBvbmVudHMvTG9naW4nO1xuaW1wb3J0IFJvdXRlcyBmcm9tICcuL3BhZ2VzL3JvdXRlcy9yb3V0ZXMnO1xuaW1wb3J0IHtTZXJ2ZXJSb3V0ZXJ9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSb3V0ZXMvPlxuICAgICAgICApO1xuICAgIH1cbn0iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgY29uc3Qgc2lnbnVwID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL3NpZ251cC8nO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHsuLi5wYXJhbXN9KTtcbn1cblxuZXhwb3J0IGNvbnN0IHNpZ25pbiA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9zaWduaW4vJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBuZXdfZXhwZW5zZSA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9uZXdfZXhwZW5zZS8nO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHsuLi5wYXJhbXN9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldF9leHBlbnNlX2RhdGEgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvZ2V0X2V4cGVuc2VfZGF0YS8nIDtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCBwYXJhbXMpO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0X2V4cGVuc2Vfc3VtbWFyeSA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9nZXRfZXhwZW5zZV9zdW1tYXJ5LycgO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHBhcmFtcyk7XG59XG4iLCJcbmNvbnN0IFdJRFRIID0gMTUwO1xuY29uc3QgSEVJR0hUID0gMTAwO1xuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7RElWSVNJT05MRU5HVEh9IGZyb20gJy4uL2NvbnN0YW50cy9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZ2VuZXJhdGVTVkcgPSB0aGlzLmdlbmVyYXRlU1ZHLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAod2luZG93ICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb25yZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYWxlcnQoJ2F0dGFjaEV2ZW50IC0gcmVzaXplJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZVNWRygpIHtcbiAgICBjb25zdCB7cGxvdERhdGEsIHRhYn0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHhDb29yZGluYXRlcyA9IFtdO1xuICAgIGNvbnN0IHlDb29yZGluYXRlcyA9IFtdO1xuICAgIGNvbnN0IGxlbmd0aCA9IERJVklTSU9OTEVOR1RIW3RhYl07XG4gICAgY29uc3QgbWF4QW10ID0gcGxvdERhdGEubWF4QW1vdW50O1xuICAgIGNvbnN0IHhDb29yZGluYXRlRGl2TGVuZ3RoID0gKFdJRFRIIC8gKGxlbmd0aCArIDIpKTtcbiAgICBsZXQgbGFzdERpdmlzaW9uID0gMDtcbiAgICBsZXQgc3RyID0gJyc7XG5cbiAgICAvKiBUbyBzdGFydCB0aGUgZ3JhcGggYXQgdGhlIExlYXN0IFBvaW50ICovXG4gICAgeENvb3JkaW5hdGVzLnB1c2goMCk7XG4gICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUKTtcbiAgICBwbG90RGF0YS5wZXJEaXZpc2lvbkRhdGEuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIHdoaWxlIChlbnRyeS5kaXZpc2lvbiA+IGxhc3REaXZpc2lvbikge1xuICAgICAgICBjb25zdCBsYXN0WCA9IHhDb29yZGluYXRlc1t4Q29vcmRpbmF0ZXMubGVuZ3RoIC0gMV07XG4gICAgICAgIHhDb29yZGluYXRlcy5wdXNoKChsYXN0WCArIHhDb29yZGluYXRlRGl2TGVuZ3RoKSk7XG4gICAgICAgIGlmIChlbnRyeS5kaXZpc2lvbiA9PT0gbGFzdERpdmlzaW9uICsgMSkge1xuICAgICAgICAgIGNvbnN0IHBlcmNlbnQgPSAoKGVudHJ5LmFtb3VudCAvIG1heEFtdCkgKiAxMDApO1xuICAgICAgICAgIHlDb29yZGluYXRlcy5wdXNoKEhFSUdIVCAtICgoSEVJR0hUIC8gMTAwKSAqIHBlcmNlbnQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB5Q29vcmRpbmF0ZXMucHVzaChIRUlHSFQpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3REaXZpc2lvbiA9IGxhc3REaXZpc2lvbiArIDE7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgbGFzdFggPSB4Q29vcmRpbmF0ZXNbeENvb3JkaW5hdGVzLmxlbmd0aCAtIDFdO1xuICAgIHhDb29yZGluYXRlcy5wdXNoKChsYXN0WCArIHhDb29yZGluYXRlRGl2TGVuZ3RoKSk7XG4gICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUKTtcbiBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHhDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgc3RyICs9ICcgJyArIHhDb29yZGluYXRlc1tpXSArICcsJyArIHlDb29yZGluYXRlc1tpXSArICcgJztcbiAgICB9XG4gICAgaWYgKHN0cikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9eycwIDAgJyArIFdJRFRIICsgJyAnICsgSEVJR0hUfSBzdHlsZT17e21hcmdpbjogJzIwcHgnfX0+XG4gICAgICAgICAgICA8cG9seWxpbmUgcG9pbnRzPXtzdHJ9IGNsYXNzTmFtZT1cImdyYXBoUGxvdExpbmVcIiAvPlxuICAgICAgICAgICAgey8qIDxnIHN0eWxlPXt7c3Ryb2tlOiAnI2NjYycsIHN0cm9rZURhc2hhcnJheTogMCwgc3Ryb2tlV2lkdGg6IDF9fT5cbiAgICAgICAgICAgICAgPGxpbmUgeDE9XCIwXCIgeTE9XCIyMDBcIiB4Mj1cIjBcIiB5Mj1cIjBcIj48L2xpbmU+XG4gICAgICAgICAgICA8L2c+ICovfVxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLmdlbmVyYXRlU1ZHKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgTmV3RXhwZW5zZSBmcm9tICcuL05ld0V4cGVuc2UnO1xuaW1wb3J0IHtnZXRfZXhwZW5zZV9kYXRhLCBnZXRfZXhwZW5zZV9zdW1tYXJ5fSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5pbXBvcnQge01PTlRILCBZRUFSLCBXRUVLLCBNT05USFNOQU1FfSBmcm9tICcuLi9jb25zdGFudHMvY29uc3RhbnRzJztcbmltcG9ydCBHcmFwaCBmcm9tICcuL0dyYXBoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMubGVmdE1lbnVDbGljayA9IHRoaXMubGVmdE1lbnVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmV3RXhwZW5zZSA9IHRoaXMubmV3RXhwZW5zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmF2aWdhdGVUb1NpZ25JbiA9IHRoaXMubmF2aWdhdGVUb1NpZ25Jbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhY3RpdmVUYWI6IE1PTlRILFxuICAgICAgc2hvd05ld0V4cGVuc2U6IGZhbHNlLFxuICAgICAgc3RhbmRpbmc6IHVuZGVmaW5lZCxcbiAgICAgIHNwZW50OiB1bmRlZmluZWQsXG4gICAgICBleHBlbnNlTGlzdDoge30sXG4gICAgICBpbmNvbWVMaXN0OiB7fSxcbiAgICAgIHZpZXdNb3JlOiBmYWxzZVxuICAgIH1cbiAgICB0aGlzLnZpZXdlZE1vcmUgPSB7fTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmdldEV4cGVuc2UoKTtcbiAgICB0aGlzLmdldEV4cGVuc2VTdW1tYXJ5KCk7XG4gIH1cblxuICBnZXRFeHBlbnNlU3VtbWFyeSgpIHtcbiAgICBjb25zdCB0YWIgPSB0aGlzLnN0YXRlLmFjdGl2ZVRhYjtcbiAgICBjb25zdCBtbSA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgZG93ID0gbmV3IERhdGUoKS5nZXREYXkoKTtcbiAgICBjb25zdCB3dyA9IE1hdGguY2VpbChuZXcgRGF0ZSgpLmdldERhdGUoKSAvIDcpO1xuICAgIGNvbnN0IHl5ID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHt0YWIsIG1tLCBkb3csIHd3LCB5eX07XG4gICAgZ2V0X2V4cGVuc2Vfc3VtbWFyeShwYXJhbXMpLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3Bsb3REYXRhOiB7Li4ucmVzcC5kYXRhfX0pO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gR2V0IEV4cGVuc2UgU3VtbWFyeSBEZXRhaWxzJywgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEV4cGVuc2UoKSB7XG4gICAgbGV0IGV4cGVuc2VMaXN0ID0ge30sIGluY29tZUxpc3QgPSB7fSwgc3RhbmRpbmcgPScnO1xuICAgIGNvbnN0IHRhYiA9IHRoaXMuc3RhdGUuYWN0aXZlVGFiO1xuICAgIGNvbnN0IG1tID0gbmV3IERhdGUoKS5nZXRNb250aCgpICsgMTtcbiAgICBjb25zdCBkb3cgPSBuZXcgRGF0ZSgpLmdldERheSgpO1xuICAgIGNvbnN0IHd3ID0gTWF0aC5jZWlsKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpIC8gNyk7XG4gICAgY29uc3QgeXkgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgcGFyYW1zID0ge3RhYiwgbW0sIGRvdywgd3csIHl5fTtcbiAgICBnZXRfZXhwZW5zZV9kYXRhKHBhcmFtcykudGhlbigocmVzcCkgPT4ge1xuICAgICBjb25zdCB7ZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHN0YW5kaW5nLCBzcGVudH0gPSByZXNwLmRhdGE7XG4gICAgICB0aGlzLnNldFN0YXRlKHtleHBlbnNlTGlzdCwgaW5jb21lTGlzdCwgc3RhbmRpbmcsIHNwZW50fSk7XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBHZXQgRXhwZW5zZSBEZXRhaWxzJywgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoYWN0aXZlVGFiKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlVGFiOiBhY3RpdmVUYWIsIHZpZXdNb3JlOiBmYWxzZX0sICgpID0+IHtcbiAgICAgIHRoaXMuZ2V0RXhwZW5zZSgpO1xuICAgICAgdGhpcy5nZXRFeHBlbnNlU3VtbWFyeSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbGVmdE1lbnVDbGljaygpIHtcbiAgICB0aGlzLnJlZnMuYmFja0Ryb3AuY2xhc3NMaXN0LnRvZ2dsZSgnYmFja0Ryb3AnKTtcbiAgICB0aGlzLnJlZnMucG9wdXAuY2xhc3NMaXN0LnRvZ2dsZSgncmlnaHQwJyk7XG4gICAgdGhpcy5yZWZzLmZpcnN0SGFsZkxhbmRpbmdUeHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2NhbGU5MCcpO1xuICAgIHRoaXMucmVmcy5vdGhlckhhbGZMYW5kaW5nVHh0LmNsYXNzTGlzdC50b2dnbGUoJ3NjYWxlOTAnKTtcbiAgfVxuXG4gIG5hdmlnYXRlVG9TaWduSW4oKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5wcm9wcyk7XG4gICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goJy9sb2dpbicpO1xuICB9XG5cbiAgcmVuZGVyTGVmdE1lbnVCYXIoKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51QmFyXCI+XG4gICAgICAgIDxkaXYgcmVmPVwicG9wdXBcImNsYXNzTmFtZT1cInBvcHVwIHppMiBcIiBvbkNsaWNrPXt0aGlzLmxlZnRNZW51Q2xpY2t9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZUJhciBpbi1ibCBmbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51LW9wdGlvblwiPlNldHRpbmdzPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtb3B0aW9uXCIgb25DbGljaz17dGhpcy5uYXZpZ2F0ZVRvU2lnbklufT5TaWduIEluPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtb3B0aW9uXCI+QWJvdXQgTWU8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgbmV3RXhwZW5zZSh2YWwpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtzaG93TmV3RXhwZW5zZTogdmFsfSk7XG4gIH1cblxuICBjbGlja1ZpZXdNb3JlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3ZpZXdNb3JlOiAhdGhpcy5zdGF0ZS52aWV3TW9yZX0pO1xuICAgIHRoaXMucmVmcy50cmFuc2FjdGVkQ2FyZC5zY3JvbGxUb3AgPSAwO1xuICB9XG5cbiAgcmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuc3RhdGUuZXhwZW5zZUxpc3QudHJhbnNhY3Rpb25MaXN0Lm1hcCgodHJhbnNhY3Rpb24sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnZpZXdNb3JlIHx8IHRoaXMudmlld2VkTW9yZVt0aGlzLnN0YXRlLmFjdGl2ZVRhYl0gfHwgIXRoaXMuc3RhdGUudmlld01vcmUgJiYgaW5kZXggPCAyKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdGUudmlld01vcmUpIHtcbiAgICAgICAgICAgIHRoaXMudmlld2VkTW9yZVt0aGlzLnN0YXRlLmFjdGl2ZVRhYl0gPSB0cnVlOyAvLyBUbyBub3QgcmVtb3ZlIGVsZW1lbnQgZnJvbSBET00gb24gY2xpY2tpbmcgdmlldyBNb3JlIGFnYWluXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17J3RyYW5zYWN0aW9uX3R5cGVfJyArIGluZGV4fSBjbGFzc05hbWU9XCJ0cmFuc2FjdGVkQ2FyZElubmVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZElubmVyaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9uYW1lXCI+e3RyYW5zYWN0aW9uLmNhdGVnb3J5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRfcGVyY2VudCBcIj57dHJhbnNhY3Rpb24ucGVyY2VudCArICcgJSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIHsvKiA8c3BhbiBjbGFzc05hbWU9XCJjYXRfbmFtZSBsb2FkZXJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0X3BlcmNlbnQgbG9hZGVyXCI+PC9zcGFuPiAqL31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZ3Jlc3NCYXIgYmwgdGV4dENlbnRlciBtYXJnaW5UMjVcIiA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWxsZWRcIiBzdHlsZT0ge3ttYXhXaWR0aDogdHJhbnNhY3Rpb24ucGVyY2VudCArICclJ319PlxuICAgICAgICAgICAgICAgICAgey8qIDxkaXYgY2xhc3NOYW1lPVwiZmlsbGVkXCIgPjwvZGl2PiAqL31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9KVxuICApO1xuICB9XG5cbiAgZ2V0VHJhbnNhY3Rpb25DYXJkKCkge1xuICAgIGNvbnN0IHthY3RpdmVUYWIsIHZpZXdNb3JlID0gZmFsc2V9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBoYXNEYXRhID0gdGhpcy5zdGF0ZS5leHBlbnNlTGlzdCAmJiBPYmplY3Qua2V5cyh0aGlzLnN0YXRlLmV4cGVuc2VMaXN0KS5sZW5ndGggPiAwO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IHJlZj1cInRyYW5zYWN0ZWRDYXJkXCIgY2xhc3NOYW1lPXsndHJhbnNhY3RlZENhcmQgdHJhbnNpdGlvbjFhICcgKyAodmlld01vcmUgPyAnc2hvd0FsbFRyYW5zYWN0aW9uJyA6ICcnKX0+XG4gICAgICAgICAgICB7aGFzRGF0YSA/XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYW5zYWN0U2Nyb2xsZXJcIj5cbiAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBXRUVLID8gdGhpcy5yZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZCgpIDogbnVsbH1cbiAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBNT05USCA/IHRoaXMucmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQoKSA6IG51bGx9XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gWUVBUiA/IHRoaXMucmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQoKSA6IG51bGx9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+IDogXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXIgcGFkVDIwIG1oMTBwXCI+XG4gICAgICAgICAgICAgIDxkaXY+Tm8gVHJhbnNhY3Rpb25zIGFkZGVkIDwvZGl2PlxuICAgICAgICAgICAgICB7dHlwZW9mKHdpbmRvdykgIT09ICd1bmRlZmluZWQnICYmICF3aW5kb3cuc2lnbmVkSW4gJiYgPGRpdiBjbGFzc05hbWU9XCJwYWRUMTAgcGFkQjIwXCI+PGEgaHJlZj1cIi9sb2dpblwiPjxzcGFuPlNpZ24gSW48L3NwYW4+PC9hPiBmb3IgUGFzdCBUcmFuc2FjdGlvbnM8L2Rpdj59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpZXdNb3JlQXJyb3dcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLmNsaWNrVmlld01vcmUoKX0+XG4gICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT17dmlld01vcmUgPyAncm90YXRlVmlld01vcmUnIDogJyd9IHJlZj1cInN2Z1ZpZXdNb3JlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgICAgICAgPHBhdGggZD1cIk03LjQxIDcuODRMMTIgMTIuNDJsNC41OS00LjU4TDE4IDkuMjVsLTYgNi02LTZ6XCIvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyduZXdDb250YWluZXIgJyArICghaGFzRGF0YSA/ICdwYWRUMTAnIDogJycpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5ld0J0blwiIG9uQ2xpY2s9eygpID0+IHRoaXMubmV3RXhwZW5zZSh0cnVlKX0+ICsgYWRkIE5ldzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gIH1cbiAgZ2V0Q3VycmVudERhdGUoKSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgY3Vyck1vbnRoID0gTU9OVEhTTkFNRVtkYXRlLmdldE1vbnRoKCldO1xuICAgIGNvbnN0IGN1cnJEYXRlID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgcmV0dXJuIGN1cnJEYXRlICsgJyAnICsgY3Vyck1vbnRoICsgJyAnICsgZGF0ZS5nZXRGdWxsWWVhcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHthY3RpdmVUYWIsIHNob3dOZXdFeHBlbnNlLCBzdGFuZGluZyA9IHVuZGVmaW5lZCwgc3BlbnQgPSB1bmRlZmluZWQsIHZpZXdNb3JlID0gZmFsc2UsIHBsb3REYXRhLCBpbmNvbWVMaXN0fSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiByZWY9XCJiYWNrRHJvcFwiIGNsYXNzTmFtZT17J3RyYW5zaXRpb24yYSB6aTEgJyArIChzaG93TmV3RXhwZW5zZSA/ICdiYWNrRHJvcCcgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHRoaXMubmV3RXhwZW5zZShmYWxzZSl9PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHt0aGlzLnJlbmRlckxlZnRNZW51QmFyKCl9XG4gICAgICAgICAgPGRpdiByZWY9XCJtYWluQ29udGVudFwiIGNsYXNzTmFtZT1cIm1haW5Db250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlyc3QtaGFsZi1sYW5kaW5nXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgcmVmPVwiZmlyc3RIYWxmTGFuZGluZ1R4dFwiIGNsYXNzTmFtZT1cInRyYW5zaXRpb24wXzUgXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGFuZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGVmdC1tZW51LWNvbnRhaW5lclwiIG9uQ2xpY2s9e3RoaXMubGVmdE1lbnVDbGlja30+PGltZyBjbGFzc05hbWU9XCJsZWZ0LW1lbnVcIiBzcmM9XCIvaW1nL21lbnUuc3ZnXCIvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHsvKiA8c3BhbiBjbGFzc05hbWU9XCJyaWdodC1tZW51LWNvbnRhaW5lclwiIG9uQ2xpY2s9eygpID0+IHt0aGlzLnNldFN0YXRlKHt2aXNpYmxlUmlnaHRNZW51OiB0cnVlfSl9fT48aW1nIGNsYXNzTmFtZT1cInJpZ2h0LW1lbnVcIiBzcmM9XCIvaW1nL21lbnUuc3ZnXCIvPjwvc3Bhbj4gKi99XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZiIGYxMVwiPkNVUlJFTlQgQkFMQU5DRTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZjE4XCI+4oK5IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RhbmRpbmdBbXRcIj57KHR5cGVvZihzdGFuZGluZykgIT09ICd1bmRlZmluZWQnID8gc3RhbmRpbmcgOiAnMCcpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PHNwYW4gY2xhc3NOYW1lPVwiZjExXCI+e3RoaXMuZ2V0Q3VycmVudERhdGUoKX08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2VEYXlzQnRuXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBXRUVLID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdChXRUVLKX19PldlZWs8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBNT05USCA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHt0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoTU9OVEgpfX0+TW9udGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBZRUFSID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdChZRUFSKX19PlllYXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGVudEluY29tZVNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW4tYmwgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmwgaW4tYmwgc3BlbnRJY29uXCIgPlxuICAgICAgICAgICAgICAgICAgICAgIDxzdmcgIHdpZHRoPVwiMjFcIiBoZWlnaHQ9XCIxN1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTI0IDEyYzAtNi42MjctNS4zNzMtMTItMTItMTJzLTEyIDUuMzczLTEyIDEyIDUuMzczIDEyIDEyIDEyIDEyLTUuMzczIDEyLTEyem0tMTcgMWg0di04aDJ2OGg0bC01IDYtNS02elwiLz48L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViSGVhZGluZyBpbi1ibFwiPnsnU3BlbnQgOiDigrknICsgKHR5cGVvZihzcGVudCkgIT09ICd1bmRlZmluZWQnPyBzcGVudDogJzAnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluLWJsICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbCBpbi1ibCBpbmNvbWVJY29uIFwiID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImZsIGluLWJsXCIgd2lkdGg9XCIyMVwiIGhlaWdodD1cIjE3XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMCAxMmMwIDYuNjI3IDUuMzczIDEyIDEyIDEyczEyLTUuMzczIDEyLTEyLTUuMzczLTEyLTEyLTEyLTEyIDUuMzczLTEyIDEyem0xNy0xaC00djhoLTJ2LThoLTRsNS02IDUgNnpcIi8+PC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkhlYWRpbmcgaW4tYmxcIj57J0luY29tZSA6IOKCuScgKyAoaW5jb21lTGlzdCAmJiB0eXBlb2YoaW5jb21lTGlzdC5hbW91bnQpICE9PSAndW5kZWZpbmVkJyA/IGluY29tZUxpc3QuYW1vdW50IDogJzAnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFRyYW5zYWN0aW9uQ2FyZCgpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3Bsb3REYXRhICYmIHBsb3REYXRhLnBlckRpdmlzaW9uRGF0YSAmJiAgcGxvdERhdGEucGVyRGl2aXNpb25EYXRhLmxlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm90aGVyLWhhbGYtbGFuZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPVwib3RoZXJIYWxmTGFuZGluZ1R4dFwiIGNsYXNzTmFtZT1cInRyYW5zaXRpb24wXzUgXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXIgdHJTdW1hcnlIZWFkaW5nIGZiXCIgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57J0V4cGVuc2UgVHJlbmRzJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IFdFRUsgPyAgPEdyYXBoIHBsb3REYXRhPXtwbG90RGF0YX0gdGFiPXthY3RpdmVUYWJ9Lz4gOiBudWxsfVxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gTU9OVEggPyAgPEdyYXBoIHBsb3REYXRhPXtwbG90RGF0YX0gdGFiPXthY3RpdmVUYWJ9Lz4gOiBudWxsfVxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gWUVBUiA/ICA8R3JhcGggcGxvdERhdGE9e3Bsb3REYXRhfSB0YWI9e2FjdGl2ZVRhYn0vPiA6IG51bGx9XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj4gOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3Nob3dOZXdFeHBlbnNlID8gXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICA8TmV3RXhwZW5zZSBuZXdFeHBlbnNlPXt0aGlzLm5ld0V4cGVuc2V9Lz5cbiAgICAgICAgICA8L2Rpdj4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQge3NpZ251cCwgc2lnbmlufSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaWduVXAgPSB0aGlzLnNpZ25VcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2lnbkluID0gdGhpcy5zaWduSW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnXG4gICAgfVxuICB9XG5cbiAgaGVhZCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldD5cbiAgICAgICAgPHRpdGxlPkV4cGVuc2UgTG9naW48L3RpdGxlPlxuICAgICAgPC9IZWxtZXQ+XG4gICAgKTtcbiAgfVxuXG4gIHNpZ25VcCgpIHtcbiAgICBzaWdudXAoe3VzZXJuYW1lOiB0aGlzLnN0YXRlLnVzZXJuYW1lLCBwYXNzd29yZDogdGhpcy5zdGF0ZS5wYXNzd29yZH0pO1xuICB9XG5cbiAgc2lnbkluKHdpdGhUZXN0Q3JlZHMpIHtcbiAgICBsZXQge3VzZXJuYW1lLCBwYXNzd29yZH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmICh3aXRoVGVzdENyZWRzKSB7XG4gICAgICB1c2VybmFtZSA9ICdkaGlsaXAnO1xuICAgICAgcGFzc3dvcmQgPSAnZGhpbGlwZGhpbGlwJztcbiAgICB9XG4gICAgc2lnbmluKHt1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZH0pLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgIGlmIChyZXNwLmRhdGEgJiYgIXJlc3AuZGF0YS5lcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goJy9ob21lJywge30pO1xuICAgICAgICBpZiAodHlwZW9mKHdpbmRvdykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgd2luZG93LnNpZ25lZEluID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBTaWduSW4nLCByZXNwKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIFNpZ25JbicsIGVycik7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLmhlYWQoKX1cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ2luQ29udGFpbmVyIHdoaXRlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZWxkc0RpdlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJuYW1lXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cIndoaXRlQnJkckJ0bVwiIHBsYWNlaG9sZGVyPSdVc2VybmFtZScgdmFsdWU9e3RoaXMuc3RhdGUudXNlcm5hbWV9IG9uQ2hhbmdlID0geyhlKSA9PiB0aGlzLnNldFN0YXRlKHt1c2VybmFtZTogZS50YXJnZXQudmFsdWV9KX0gdHlwZT1cInRleHRcIi8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhc3N3b3JkIHBhZFQxMFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ3aGl0ZUJyZHJCdG1cIiBwbGFjZWhvbGRlcj0nUGFzc3dvcmQnIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfSBvbkNoYW5nZSA9IHsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cGFzc3dvcmQ6IGUudGFyZ2V0LnZhbHVlfSl9IHR5cGU9XCJwYXNzd29yZFwiLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlciBwYWRUMjBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXcgZGlcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuZXdCdG5cIm9uQ2xpY2s9e3RoaXMuc2lnbklufT5TaWduIEluPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXcgZGlcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuZXdCdG5cIiBvbkNsaWNrPXt0aGlzLnNpZ25VcH0+U2lnbiBVcDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlciBwYWRUMjBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXdcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuZXdCdG5cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnNpZ25Jbih0cnVlKX0+Q29udGludWUgd2l0aCBUZXN0IExvZ2luPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IExvZ2luOyIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtuZXdfZXhwZW5zZX0gZnJvbSAnLi4vYXBpQ2FsbHMvQXBpQ2FsbHMnO1xuaW1wb3J0IHtNT05USFNOQU1FU0hPUlR9IGZyb20gJy4uL2NvbnN0YW50cy9jb25zdGFudHMnO1xuLy8gaW1wb3J0IHtjb21tYUZvcm1hdHRlZH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdFeHBlbnNlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zZWxlY3RUeXBlID0gdGhpcy5zZWxlY3RUeXBlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdWJtaXROZXdFeHBlbnNlID0gdGhpcy5zdWJtaXROZXdFeHBlbnNlLmJpbmQodGhpcyk7XG4gICAgXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHR5cGU6ICdleHBlbnNlJyxcbiAgICAgIGFtb3VudDogJycsXG4gICAgICBjYXRlZ29yeTogJycsXG4gICAgICBkYXk6ICcnLCBcbiAgICAgIG1vbnRoOiAnJyxcbiAgICAgIHllYXI6ICcnLFxuICAgICAgZXJyb3I6IHt9XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0VHlwZSh0eXBlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dHlwZTogdHlwZX0pO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50KHZhbCl7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YW1vdW50OiB2YWx9KVxuICB9XG5cbiAgY2hhbmdlRGF0ZSh2YWwsIGN1cnJlbnQsIG5leHQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsuLi52YWx9KTtcbiAgICBpZiAoY3VycmVudCAmJiB2YWxbY3VycmVudF0ubGVuZ3RoID09PSAyICYmIG5leHQpIHtcbiAgICAgIHRoaXMucmVmc1tuZXh0XS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGlzVmFsaWREYXRlKCkge1xuICAgIGNvbnN0IHtkYXksIG1vbnRoLCB5ZWFyfSA9IHRoaXMuc3RhdGU7XG4gICAgdmFyIGRhdGVSZWcgPSAvXlswLTldWzAtOV0kLztcbiAgICBpZiAoIWRhdGVSZWcudGVzdChkYXkpIHx8ICFkYXRlUmVnLnRlc3QobW9udGgpIHx8ICFkYXRlUmVnLnRlc3QoeWVhcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoMjAwMCArIHBhcnNlSW50KHllYXIpLCBwYXJzZUludChtb250aCktMSwgcGFyc2VJbnQoZGF5KSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgdmFsaWRhdGVQYXJhbXMoKSB7XG4gICAgdmFyIHJlZyA9IC9eXFxkKyQvO1xuICAgIGNvbnN0IHthbW91bnQsIGNhdGVnb3J5fSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKCFhbW91bnQgfHwgIXJlZy50ZXN0KGFtb3VudCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB7YW1vdW50OiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBBbW91bnQnfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWNhdGVnb3J5KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2NhdGVnb3J5OiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBDYXRlZ29yeSd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc1ZhbGlkRGF0ZSgpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2RhdGU6ICdQbGVhc2UgcHJvdmlkZSBhIFZhbGlkIERhdGUnfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzdWJtaXROZXdFeHBlbnNlKCkge1xuICAgIGNvbnN0IHthbW91bnQsIGRheSwgbW9udGgsIHllYXIsIHR5cGUsIGNhdGVnb3J5fSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgaXNWYWxpZGF0aW9uU3VjY2VzcyA9IHRoaXMudmFsaWRhdGVQYXJhbXMoKTtcbiAgICBpZiAoaXNWYWxpZGF0aW9uU3VjY2Vzcykge1xuICAgICAgY29uc3QgcGFyYW1zID0geyBhbW91bnQsIHR5cGUsIGRhdGU6IHRoaXMuZGF0ZSwgY2F0ZWdvcnl9O1xuICAgICAgbmV3X2V4cGVuc2UocGFyYW1zKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm5ld0V4cGVuc2UoZmFsc2UpO1xuICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGNyZWF0ZSBuZXcgRXhwZW5zZScsZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlck9wdGlvbnModHlwZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBpZiAodHlwZSA9PT0gJ2RheScpIHtcbiAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCAzMiA7IGkrKykge1xuICAgICAgICBvcHRpb25zLnB1c2goPG9wdGlvbiB2YWx1ZT17aX0+e2l9PC9vcHRpb24+KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdtb250aCcpIHtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMiA7IGkrKykge1xuICAgICAgICBvcHRpb25zLnB1c2goPG9wdGlvbiB2YWx1ZT17aX0+e01PTlRIU05BTUVTSE9SVFtpXX08L29wdGlvbj4pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3llYXInKSB7XG4gICAgICBmb3IobGV0IGkgPSAyMDIwOyBpID4gMjAwMCA7IGktLSkge1xuICAgICAgICBvcHRpb25zLnB1c2goPG9wdGlvbiB2YWx1ZT17aX0+e2l9PC9vcHRpb24+KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3R5cGUsIGFtb3VudCwgZGF5LCBtb250aCwgeWVhciwgY2F0ZWdvcnksIGVycm9yfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXdFeHBlbnNlQ29udGFpbmVyIHppMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cEluY0J0bnMgdGV4dENlbnRlciBtVDI1XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnbmV3QnRuICcgKyAodHlwZSA9PT0gJ2V4cGVuc2UnID8gJ3NlbGVjdGVkVHlwZScgOiAnJyl9ICBvbkNsaWNrPXsoKSA9PiB0aGlzLnNlbGVjdFR5cGUoJ2V4cGVuc2UnKX0+RXhwZW5zZTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eyduZXdCdG4gJyArICh0eXBlID09PSAnaW5jb21lJyA/ICdzZWxlY3RlZFR5cGUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNlbGVjdFR5cGUoJ2luY29tZScpfT5JbmNvbWU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFtb3VudElucHV0IG1UMjUgXCI+XG4gICAgICAgIDxzcGFuPuKCuTwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkFtb3VudFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VBbW91bnQoZS50YXJnZXQudmFsdWUpfSB2YWx1ZT17YW1vdW50fS8+XG4gICAgICAgICAge2Vycm9yLmFtb3VudCA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuYW1vdW50fTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICBjbGFzc05hbWU9XCJjYXRlZ29yeUlucHV0IG1UMjUgXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJDYXRlZ29yeVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7Y2F0ZWdvcnk6IGUudGFyZ2V0LnZhbHVlfSl9IHZhbHVlPXtjYXRlZ29yeX0vPlxuICAgICAgICAgIHtlcnJvci5jYXRlZ29yeSA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuY2F0ZWdvcnl9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BlbnREYXkgbVQyNSBcIj5cbiAgICAgICAgICB7LyogPGlucHV0IHJlZj1cImRheVwiIGNsYXNzTmFtZT1cImRheUlwXCIgdHlwZT1cIm51bWJlclwiIG1heExlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIkREXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe2RheTogZS50YXJnZXQudmFsdWV9LCAnZGF5JywgJ21vbnRoJyl9IHZhbHVlPXtkYXl9Lz5cbiAgICAgICAgICA8aW5wdXQgcmVmPVwibW9udGhcIiBjbGFzc05hbWU9XCJkYXlJcFwiIHR5cGU9XCJudW1iZXJcIiBtYXhMZW5ndGg9XCIyXCIgcGxhY2Vob2xkZXI9XCJNTVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHttb250aDogZS50YXJnZXQudmFsdWV9LCAnbW9udGgnLCAneWVhcicpfSB2YWx1ZT17bW9udGh9Lz5cbiAgICAgICAgICA8aW5wdXQgcmVmPVwieWVhclwiIGNsYXNzTmFtZT1cImRheUlwXCIgdHlwZT1cIm51bWJlclwiIG1heExlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIllZXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe3llYXI6IGUudGFyZ2V0LnZhbHVlfSwgJ3llYXInKX0gdmFsdWU9e3llYXJ9Lz4gKi99XG4gICAgICAgICAgPHNlbGVjdCByZWY9XCJkYXlcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7ZGF5OiBlLnRhcmdldC52YWx1ZX0sICdkYXknLCAnbW9udGgnKX0+e3RoaXMucmVuZGVyT3B0aW9ucygnZGF5Jyl9PC9zZWxlY3Q+XG4gICAgICAgICAgPHNlbGVjdCByZWY9XCJkYXlcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7ZGF5OiBlLnRhcmdldC52YWx1ZX0sICdtb250aCcsICd5ZWFyJyl9Pnt0aGlzLnJlbmRlck9wdGlvbnMoJ21vbnRoJyl9PC9zZWxlY3Q+XG4gICAgICAgICAgPHNlbGVjdCByZWY9XCJkYXlcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7ZGF5OiBlLnRhcmdldC52YWx1ZX0sICd5ZWFyJyl9Pnt0aGlzLnJlbmRlck9wdGlvbnMoJ3llYXInKX08L3NlbGVjdD5cbiAgICAgICAgICB7ZXJyb3IuZGF0ZSA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuZGF0ZX08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJtaXRCdG5cIiBvbkNsaWNrPXt0aGlzLnN1Ym1pdE5ld0V4cGVuc2V9PkRvbmU8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQge05hdkxpbmt9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jbGFzcyBOb3RGb3VuZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGVhZCA9IHRoaXMuaGVhZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGVhZCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldD5cbiAgICAgICAgPHRpdGxlPlBhZ2UgTm90IEZvdW5kPC90aXRsZT5cbiAgICAgIDwvSGVsbWV0PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLmhlYWQoKX1cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDE+U29ycnksIHRoZSBwYWdlIHlvdSBhcmUgZXhwZWN0aW5nIGRvZXMgbm90IGV4aXN0ITwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaSBvbkNsaWNrPSB7KCkgPT4gdGhpcy5wcm9wcy5oaXN0b3J5LmdvQmFjaygpfT4gXG4gICAgICAgICAgICAgIEJhY2tcbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxOYXZMaW5rIHRvPScvJz4gSG9tZSA8L05hdkxpbms+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICA8TmF2TGluayB0bz0nL2xvZ2luJz4gTG9naW4gPC9OYXZMaW5rPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE5vdEZvdW5kOyIsImV4cG9ydCBjb25zdCBNT05USCA9ICdtb250aCc7XG5leHBvcnQgY29uc3QgWUVBUiA9ICd5ZWFyJztcbmV4cG9ydCBjb25zdCBXRUVLID0gJ3dlZWsnO1xuZXhwb3J0IGNvbnN0IERJVklTSU9OTEVOR1RIID0geyBtb250aDogMzEsIHllYXI6IDEyLCB3ZWVrOiA3fTsgXG5leHBvcnQgY29uc3QgTU9OVEhTTkFNRSA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xuZXhwb3J0IGNvbnN0ICBNT05USFNOQU1FU0hPUlQgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtCcm93c2VyUm91dGVyLCBTd2l0Y2gsIFJvdXRlfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuXG5pbXBvcnQgTG9naW4gZnJvbSAnLi4vY29tcG9uZW50cy9Mb2dpbic7XG5pbXBvcnQgTm90Rm91bmQgZnJvbSAnLi4vY29tcG9uZW50cy9Ob3RGb3VuZCdcbmltcG9ydCBIb21lIGZyb20gJy4uL2NvbXBvbmVudHMvSG9tZSc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8U3dpdGNoPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9Jy9sb2dpbicgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxMb2dpbiB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIHsvKiA8Um91dGUgcGF0aD0nL2xvZ2luJyBleGFjdCByZW5kZXI9eyhwcm9wcykgPT4gPExvZ2luIHsuLi5wcm9wc30vPn0vPiAqL31cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvaG9tZScgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxIb21lIHsuLi5wcm9wc30vPn0vPlxuICAgICAgICAgICAgey8qIDxSb3V0ZSBwYXRoPScvJyBleGFjdCByZW5kZXI9eyhwcm9wcykgPT4gPEhvbWUgey4uLnByb3BzfS8+fS8+ICovfVxuICAgICAgICAgICAgey8qIDxSb3V0ZSBwYXRoPScqJyByZW5kZXI9eyhwcm9wcykgPT4gPE5vdEZvdW5kIHsuLi5wcm9wc30vPn0vPiAqL31cbiAgICAgICAgPC9Td2l0Y2g+XG4gICAgKTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1oZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==