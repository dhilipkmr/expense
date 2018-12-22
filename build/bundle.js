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
            { className: 'transactScroller' },
            activeTab === _constants.WEEK ? this.renderInnerTransactioncard() : null,
            activeTab === _constants.MONTH ? this.renderInnerTransactioncard() : null,
            activeTab === _constants.YEAR ? this.renderInnerTransactioncard() : null
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
          { className: 'newContainer ' + (!hasData ? 'padT10' : '') },
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
              { className: 'first-half-landing' },
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
                  null,
                  _react2.default.createElement(
                    'div',
                    { className: 'subHeading in-bl fl w50 ' },
                    'Spent : ₹' + (typeof spent !== 'undefined' ? spent : '0')
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'subHeading in-bl fl w50 ' },
                    'Income : ₹' + (incomeList && typeof incomeList.amount !== 'undefined' ? incomeList.amount : '0')
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
          { className: 'loginContainer' },
          _react2.default.createElement(
            'h1',
            null,
            'Login'
          ),
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
var DIVISIONLENGTH = exports.DIVISIONLENGTH = { month: 31, year: 12, week: 7 };
var MONTHSNAME = exports.MONTHSNAME = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
        _react2.default.createElement(_reactRouterDom.Route, { path: '/login', exact: true, render: function render(props) {
                return _react2.default.createElement(_Login2.default, props);
            } }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/home', exact: true, render: function render(props) {
                return _react2.default.createElement(_Home2.default, props);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2FwaS9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvZGIvbW9uZ29vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9leHBlbnNlTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hcGlDYWxscy9BcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Ib21lLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL0xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05ld0V4cGVuc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvTm90Rm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbnN0YW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3JvdXRlcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbmdvb3NlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb21cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIl0sIm5hbWVzIjpbInNpZ25VcCIsInJlcXVlc3QiLCJyZXNwb25zZSIsImJvZHkiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZW1haWxJZCIsInVzZXIiLCJVc2VycyIsIl9pZCIsIm1vbmdvb3NlIiwiVHlwZXMiLCJPYmplY3RJZCIsImZpbmQiLCJ0aGVuIiwicmVzIiwibGVuZ3RoIiwic2VuZCIsImVycm9yIiwibXNnIiwic2F2ZSIsImRvYyIsInNlc3Npb24iLCJfdXNlcklkIiwiZSIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJzaWduSW4iLCJuZXdFeHBlbnNlIiwiYW1vdW50IiwiY2F0ZWdvcnkiLCJkYXRlIiwidHlwZSIsInBhcnNlSW50IiwiRGF0ZSIsInd3IiwiTWF0aCIsImNlaWwiLCJnZXREYXRlIiwiZG93IiwiZ2V0RGF5IiwibW0iLCJnZXRNb250aCIsInl5IiwiZ2V0RnVsbFllYXIiLCJkZCIsIm5ld0V4cGVuc2VJbnN0YW5jZSIsIkV4cGVuc2VzIiwidXNlcl9pZCIsImVyciIsImdldEV4cGVuc2VEYXRhIiwidXNlcklkIiwiZXhwZW5zZURhdGVSZXNwb25kZXIiLCJkYXRhIiwicmVzcG9uZCIsImV4cGVuc2VMaXN0IiwiaW5jb21lTGlzdCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJzcGVudCIsInN0YW5kaW5nIiwidHJhbnNhY3Rpb25MaXN0IiwidHJhbnNhY3Rpb24iLCJwZXJjZW50Iiwicm91bmQiLCJncm91cDEiLCIkZ3JvdXAiLCIkc3VtIiwiZ3JvdXAyIiwiJHB1c2giLCJ1bndpbmQiLCIkdW53aW5kIiwic29ydCIsIiRzb3J0IiwicmVHcm91cCIsInRhYiIsIllFQVIiLCJhZ2dyZWdhdGUiLCIkbWF0Y2giLCIkcHJvamVjdCIsImFsbG93RGlza1VzZSIsImV4ZWMiLCJNT05USCIsIldFRUsiLCJnZXRFeHBlbnNlU3VtbWFyeSIsImV4ZWNTdW1tYXJ5UXVlcnkiLCJwZXJEaXZpc2lvbkRhdGEiLCJtYXhBbW91bnQiLCJOdW1iZXIiLCJNSU5fU0FGRV9JTlRFR0VSIiwiZm9yRWFjaCIsImVudHJ5IiwibW9udGgiLCJ0b3RhbEFtb3VudCIsImRpdmlzaW9uIiwiZW52IiwicHJvY2VzcyIsIlBPUlQiLCJNT05HT0xBQl9VUkkiLCJtb25nb29zZTEiLCJyZXF1aXJlIiwiUHJvbWlzZSIsImdsb2JhbCIsImNvbm5lY3QiLCJ1c2VOZXdVcmxQYXJzZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9kZWwiLCJTY2hlbWEiLCJyZWYiLCJyZXF1aXJlZCIsInRyaW0iLCJTdHJpbmciLCJkZWZhdWx0Iiwibm93IiwibWlubGVuZ3RoIiwiZXhwZW5zZSIsImFwcCIsInBvcnQiLCJ1c2UiLCJzZWNyZXQiLCJyZXNhdmUiLCJzYXZlVW5pbml0aWFsaXplZCIsImJvZHlQYXJzZXIiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJqc29uIiwiZXhwcmVzcyIsInN0YXRpYyIsInBvc3QiLCJsb2FkSHRtbCIsImNvbnRlbnQiLCJoZWxtZXQiLCJIZWxtZXQiLCJyZW5kZXJTdGF0aWMiLCJtZXRhIiwidG9TdHJpbmciLCJ0aXRsZSIsImdldCIsInJlcSIsImNvbnRleHQiLCJSZWFjdERPTVNlcnZlciIsInJlbmRlclRvU3RyaW5nIiwidXJsIiwidGVtcGxhdGUiLCJsaXN0ZW4iLCJBcHAiLCJDb21wb25lbnQiLCJzaWdudXAiLCJwYXJhbXMiLCJheGlvcyIsInNpZ25pbiIsIm5ld19leHBlbnNlIiwiZ2V0X2V4cGVuc2VfZGF0YSIsImdldF9leHBlbnNlX3N1bW1hcnkiLCJXSURUSCIsIkhFSUdIVCIsIkdyYXBoIiwicHJvcHMiLCJnZW5lcmF0ZVNWRyIsImJpbmQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYWxlcnQiLCJwbG90RGF0YSIsInhDb29yZGluYXRlcyIsInlDb29yZGluYXRlcyIsIkRJVklTSU9OTEVOR1RIIiwibWF4QW10IiwieENvb3JkaW5hdGVEaXZMZW5ndGgiLCJsYXN0RGl2aXNpb24iLCJzdHIiLCJwdXNoIiwibGFzdFgiLCJpIiwibWFyZ2luIiwiSG9tZSIsImxlZnRNZW51Q2xpY2siLCJuYXZpZ2F0ZVRvU2lnbkluIiwic3RhdGUiLCJhY3RpdmVUYWIiLCJzaG93TmV3RXhwZW5zZSIsInVuZGVmaW5lZCIsInZpZXdNb3JlIiwidmlld2VkTW9yZSIsImdldEV4cGVuc2UiLCJyZXNwIiwic2V0U3RhdGUiLCJyZWZzIiwiYmFja0Ryb3AiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJwb3B1cCIsImZpcnN0SGFsZkxhbmRpbmdUeHQiLCJvdGhlckhhbGZMYW5kaW5nVHh0IiwiaGlzdG9yeSIsInZhbCIsInRyYW5zYWN0ZWRDYXJkIiwic2Nyb2xsVG9wIiwiaW5kZXgiLCJtYXhXaWR0aCIsImhhc0RhdGEiLCJyZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZCIsInNpZ25lZEluIiwiY2xpY2tWaWV3TW9yZSIsImN1cnJNb250aCIsIk1PTlRIU05BTUUiLCJjdXJyRGF0ZSIsInJlbmRlckxlZnRNZW51QmFyIiwiZ2V0Q3VycmVudERhdGUiLCJjaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0IiwiZ2V0VHJhbnNhY3Rpb25DYXJkIiwiTG9naW4iLCJoZWFkIiwiY2F0Y2giLCJ0YXJnZXQiLCJ2YWx1ZSIsIk5ld0V4cGVuc2UiLCJzZWxlY3RUeXBlIiwic3VibWl0TmV3RXhwZW5zZSIsImRheSIsInllYXIiLCJjdXJyZW50IiwibmV4dCIsImZvY3VzIiwiZGF0ZVJlZyIsInRlc3QiLCJyZWciLCJpc1ZhbGlkRGF0ZSIsImlzVmFsaWRhdGlvblN1Y2Nlc3MiLCJ2YWxpZGF0ZVBhcmFtcyIsImNoYW5nZUFtb3VudCIsImNoYW5nZURhdGUiLCJOb3RGb3VuZCIsImdvQmFjayIsIndlZWsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVPLElBQU1BLDBCQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsT0FBRCxFQUFVQyxRQUFWLEVBQXVCO0FBQ3pDO0FBRHlDLHdCQUVjRCxRQUFRRSxJQUZ0QjtBQUFBLDhDQUVqQ0MsUUFGaUM7QUFBQSxRQUVqQ0EsUUFGaUMseUNBRXRCLEVBRnNCO0FBQUEsOENBRWxCQyxRQUZrQjtBQUFBLFFBRWxCQSxRQUZrQix5Q0FFUCxFQUZPO0FBQUEsOENBRUhDLE9BRkc7QUFBQSxRQUVIQSxPQUZHLHlDQUVPLEVBRlA7O0FBR3pDLFFBQUlDLE9BQU8sSUFBSUMsbUJBQUosQ0FBVTtBQUNqQkMsYUFBS0Ms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OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLDZDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NlcnZlci9zZXJ2ZXIuanNcIik7XG4iLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IGFwcCBmcm9tICcuLi9zZXJ2ZXInXG5pbXBvcnQgRXhwZW5zZXMgZnJvbSAnLi4vbW9kZWxzL2V4cGVuc2VNb2RlbCc7XG5pbXBvcnQgVXNlcnMgZnJvbSAnLi4vbW9kZWxzL3VzZXJNb2RlbCc7XG5pbXBvcnQgeyBNT05USCwgWUVBUiwgV0VFSyB9IGZyb20gJy4uLy4uL3NyYy9wYWdlcy9jb25zdGFudHMvY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IHNpZ25VcCA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIC8vIFVzZXJzLmRlbGV0ZU1hbnkoe30pO1xuICAgIGNvbnN0IHsgdXNlcm5hbWUgPSAnJywgcGFzc3dvcmQgPSAnJywgZW1haWxJZCA9ICcnIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgdmFyIHVzZXIgPSBuZXcgVXNlcnMoe1xuICAgICAgICBfaWQ6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKCksXG4gICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICBlbWFpbElkOiBlbWFpbElkXG4gICAgfSk7XG4gICAgVXNlcnMuZmluZCh7IHVzZXJuYW1lOiB1c2VybmFtZSB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IHRydWUsIG1zZzogJ1VzZXJuYW1lIGFscmVhZHkgRXhpc3RzJyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oKGRvYykgPT4ge1xuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID0gZG9jLl9pZDtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IGZhbHNlLCBtc2c6ICdTYXZlZCBTdWNjZXNzZnVsbHknIH0pO1xuICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zdGF0dXMoNTAwKS5zZW5kKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCAoZSkgPT4ge1xuICAgICAgICByZXNwb25zZS5zZW5kKGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaWduSW4gPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCB7IHVzZXJuYW1lID0gJycsIHBhc3N3b3JkID0gJycsIGVtYWlsSWQgPSAnJyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGNvbnNvbGUubG9nKHJlcXVlc3Quc2Vzc2lvbi51c2VyKTtcbiAgICBVc2Vycy5maW5kKHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVxdWVzdC5zZXNzaW9uLl91c2VySWQgPSByZXNbMF0uX2lkO1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiBmYWxzZSwgbXNnOiAnc3VjY2VzcycgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IHRydWUsIG1zZzogJ05vIHVzZXIgYWNjb3VudCBmb3VuZCcgfSk7XG4gICAgICAgIH1cbiAgICB9LCAoZSkgPT4ge1xuICAgICAgICByZXNwb25zZS5zZW5kKGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBuZXdFeHBlbnNlID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgbGV0IHsgYW1vdW50LCBjYXRlZ29yeSwgZGF0ZSwgdHlwZSB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGFtb3VudCA9IHBhcnNlSW50KGFtb3VudCk7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIGNvbnN0IHd3ID0gTWF0aC5jZWlsKGRhdGUuZ2V0RGF0ZSgpIC8gNyk7XG4gICAgY29uc3QgZG93ID0gZGF0ZS5nZXREYXkoKSArIDE7XG4gICAgY29uc3QgbW0gPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IHl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IGRkID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgY29uc3QgbmV3RXhwZW5zZSA9IHsgYW1vdW50LCBjYXRlZ29yeSwgZGF0ZSwgdHlwZSwgd3csIGRvdywgbW0sIHl5LCBkZH07XG4gICAgdmFyIG5ld0V4cGVuc2VJbnN0YW5jZSA9IG5ldyBFeHBlbnNlcyh7XG4gICAgICAgIHVzZXJfaWQ6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKFwiNWMxNjMwYWQ3NjY5ZWEyYzliYjA0NjE2XCIpLFxuICAgICAgICAuLi5uZXdFeHBlbnNlXG4gICAgfSk7XG4gICAgbmV3RXhwZW5zZUluc3RhbmNlLnNhdmUoKS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgLy8gcmVxdWVzdC5zZXNzaW9uLnVzZXIgPSBkb2MudXNlcm5hbWU7XG4gICAgICAgIHJlc3BvbnNlLnNlbmQoZG9jKTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gc2F2ZSBuZXcgRXhwZW5zZScsIGVycik7XG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyg1MDApLnNlbmQoZXJyKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRGF0YSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IHJlcXVlc3Quc2Vzc2lvbi51c2VyX2lkID8gbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQocmVxdWVzdC5zZXNzaW9uLnVzZXJfaWQpIDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoXCI1YzE2MzBhZDc2NjllYTJjOWJiMDQ2MTZcIik7XG4gICAgZnVuY3Rpb24gZXhwZW5zZURhdGVSZXNwb25kZXIoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJlc3BvbmQuc2VuZCg1MDApLnNlbmQoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBleHBlbnNlTGlzdCwgaW5jb21lTGlzdDtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFba2V5XS50eXBlID09PSAnZXhwZW5zZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZW5zZUxpc3QgPSBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhW2tleV0udHlwZSA9PT0gJ2luY29tZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jb21lTGlzdCA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBzcGVudCwgc3RhbmRpbmc7XG4gICAgICAgICAgICBpZiAoZXhwZW5zZUxpc3QpIHtcbiAgICAgICAgICAgICAgICBleHBlbnNlTGlzdC50cmFuc2FjdGlvbkxpc3QubWFwKCh0cmFuc2FjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyY2VudCA9IHRyYW5zYWN0aW9uLmFtb3VudCAvIChleHBlbnNlTGlzdC5hbW91bnQgLyAxMDApO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5wZXJjZW50ID0gTWF0aC5yb3VuZChwZXJjZW50ICogMTAwKSAvIDEwMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzcGVudCA9IGV4cGVuc2VMaXN0LmFtb3VudDtcbiAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgIHNwZW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmNvbWVMaXN0KSB7XG4gICAgICAgICAgICAgICAgaW5jb21lTGlzdC50cmFuc2FjdGlvbkxpc3QubWFwKCh0cmFuc2FjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyY2VudCA9IHRyYW5zYWN0aW9uLmFtb3VudCAvIChpbmNvbWVMaXN0LmFtb3VudCAvIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLnBlcmNlbnQgPSBNYXRoLnJvdW5kKHBlcmNlbnQgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YW5kaW5nID0gaW5jb21lTGlzdC5hbW91bnQgLSBzcGVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhbmRpbmcgPSAwIC0gc3BlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHNwZW50LCBzdGFuZGluZyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFF1ZXJpZXMgc3RhcnRcbiAgICBjb25zdCBncm91cDEgPSB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7IGNhdGVnb3J5OiAnJGNhdGVnb3J5JywgdHlwZTogJyR0eXBlJyB9LFxuICAgICAgICAgICAgdHlwZTogeyAnJGZpcnN0JzogJyR0eXBlJyB9LFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHsgJyRmaXJzdCc6ICckY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJHN1bTogJyRhbW91bnQnIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZ3JvdXAyID0ge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDogeyB0eXBlOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJHN1bTogJyRhbW91bnQnIH0sXG4gICAgICAgICAgICB0eXBlOiB7ICckZmlyc3QnOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3Q6IHsgJHB1c2g6IHsgY2F0ZWdvcnk6ICckY2F0ZWdvcnknLCBhbW91bnQ6ICckYW1vdW50JyB9IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgdW53aW5kID0geyAkdW53aW5kOiAnJHRyYW5zYWN0aW9uTGlzdCcgfTtcbiAgICBjb25zdCBzb3J0ID0geyAkc29ydDogeyAndHJhbnNhY3Rpb25MaXN0LmFtb3VudCc6IC0xIH0gfVxuICAgIGNvbnN0IHJlR3JvdXAgPSB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7IHR5cGU6ICckdHlwZScgfSxcbiAgICAgICAgICAgIGFtb3VudDogeyAnJGZpcnN0JzogJyRhbW91bnQnIH0sXG4gICAgICAgICAgICB0eXBlOiB7ICckZmlyc3QnOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3Q6IHsgJHB1c2g6ICckdHJhbnNhY3Rpb25MaXN0JyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIFF1ZXJpZXMgZW5kXG5cbiAgICBjb25zdCB7IHRhYiwgd3csIG1tLCB5eSwgZG93IH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgaWYgKHRhYiA9PT0gWUVBUikge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IE1PTlRIKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0seyAkbWF0Y2g6IHsgbW06IHBhcnNlSW50KG1tKSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IFdFRUspIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9IH0sXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB5eTogcGFyc2VJbnQoeXkpIH0gfSx7ICRtYXRjaDogeyBtbTogcGFyc2VJbnQobW0pIH0gfSx7ICRtYXRjaDogeyB3dzogcGFyc2VJbnQod3cpIH0gfSxcbiAgICAgICAgICAgIHsgLi4uZ3JvdXAxIH0seyAuLi5ncm91cDIgfSxcbiAgICAgICAgICAgIHsgLi4udW53aW5kIH0seyAuLi5zb3J0IH0seyAuLi5yZUdyb3VwIH0sXG4gICAgICAgICAgICB7ICRwcm9qZWN0OiB7IF9pZDogMCwgYW1vdW50OiAxLCB0eXBlOiAxLCB0cmFuc2FjdGlvbkxpc3Q6IDEgfSB9XG4gICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4cGVuc2VEYXRlUmVzcG9uZGVyKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVN1bW1hcnkgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBmdW5jdGlvbiBleGVjU3VtbWFyeVF1ZXJ5KGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZXNwb25kLnNlbmQoNTAwKS5zZW5kKGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhWzBdICYmIGRhdGFbMF0ucGVyRGl2aXNpb25EYXRhKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1heEFtb3VudCA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSO1xuICAgICAgICAgICAgICAgIGRhdGFbMF0ucGVyRGl2aXNpb25EYXRhLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF4QW1vdW50IDwgZW50cnkuYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhBbW91bnQgPSBlbnRyeS5hbW91bnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRhdGFbMF0ubWF4QW1vdW50ID0gbWF4QW1vdW50O1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoey4uLmRhdGFbMF19KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHVzZXJJZCA9IHJlcXVlc3Quc2Vzc2lvbi51c2VyX2lkID8gbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQocmVxdWVzdC5zZXNzaW9uLnVzZXJfaWQpIDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoXCI1YzE2MzBhZDc2NjllYTJjOWJiMDQ2MTZcIik7XG4gICAgY29uc3Qge3RhYiwgeXksIG1tLCB3d30gPSByZXF1ZXN0LmJvZHk7XG4gICAgaWYgKHRhYiA9PT0gWUVBUikge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHl5OiB5eX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB0eXBlOiAnZXhwZW5zZSd9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiB7IG1tOiAnJG1tJ30sIGFtb3VudDogeyRzdW06ICckYW1vdW50J30sIG1vbnRoOiB7JyRmaXJzdCc6ICckbW0nfX19LFxuICAgICAgICAgICAgeyRzb3J0OiB7IG1vbnRoOiAxIH19LFxuICAgICAgICAgICAgeyRncm91cDoge19pZDogbnVsbCwgdG90YWxBbW91bnQ6IHsnJHN1bSc6ICckYW1vdW50J30sIHBlckRpdmlzaW9uRGF0YTogeyRwdXNoIDogeyBhbW91bnQ6ICckYW1vdW50JywgZGl2aXNpb246ICckbW9udGgnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDogMH19XG4gICAgICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleGVjU3VtbWFyeVF1ZXJ5KTtcbiAgICB9IGVsc2UgaWYgKHRhYiA9PT0gTU9OVEgpIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkIH19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB5eTogeXl9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgbW06IG1tfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHR5cGU6ICdleHBlbnNlJ319LFxuICAgICAgICAgICAgeyRncm91cDogeyBfaWQ6IHtkZDogJyRkZCd9LCBhbW91bnQ6IHsnJHN1bSc6ICckYW1vdW50J30sIGRkOiB7JyRmaXJzdCc6ICckZGQnfSB9fSxcbiAgICAgICAgICAgIHskc29ydDoge2RkOiAxfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7X2lkOiBudWxsLCB0b3RhbEFtb3VudDogeyckc3VtJzogJyRhbW91bnQnfSwgcGVyRGl2aXNpb25EYXRhOiB7JHB1c2g6IHthbW91bnQ6ICckYW1vdW50JywgZGl2aXNpb246ICckZGQnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDowfX1cbiAgICAgICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4ZWNTdW1tYXJ5UXVlcnkpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBXRUVLKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgeXk6IHl5fX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IG1tOiBtbX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB3dzogd3d9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdHlwZTogJ2V4cGVuc2UnfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7IF9pZDoge2RvdzogJyRkb3cnfSwgYW1vdW50OiB7JHN1bTogJyRhbW91bnQnfSwgZG93OiB7JyRmaXJzdCc6ICckZG93J319fSxcbiAgICAgICAgICAgIHskc29ydDogeyBkb3c6IDF9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiBudWxsLCB0b3RhbEFtb3VudDogeyRzdW06ICckYW1vdW50J30sICBwZXJEaXZpc2lvbkRhdGE6IHskcHVzaDoge2Ftb3VudDogJyRhbW91bnQnLCBkaXZpc2lvbjogJyRkb3cnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDogMH19XG4gICAgICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleGVjU3VtbWFyeVF1ZXJ5KTtcbiAgICB9XG59IiwidmFyIGVudiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCc7XG5cbmlmIChlbnYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgcHJvY2Vzcy5lbnYuUE9SVCA9IDQwMDA7XG4gIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSA9ICdtb25nb2RiOi8vbG9jYWxob3N0OjI3MDE3L2V4cGVuc2UnO1xufSBlbHNlIHtcbiAgcHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJID0gJ21vbmdvZGI6Ly9kaGlsaXBrMTM6ZGhpbGlwazEzQGRzMjQ3MzEwLm1sYWIuY29tOjQ3MzEwL2V4cGVuc2UnO1xufVxuZXhwb3J0IGRlZmF1bHQgZW52OyIsInZhciBtb25nb29zZTEgPSByZXF1aXJlKCdtb25nb29zZScpO1xubW9uZ29vc2UxLlByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbm1vbmdvb3NlMS5jb25uZWN0KHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSwgeyB1c2VOZXdVcmxQYXJzZXI6IHRydWUgfSkudGhlbigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB0byBEYicpO1xufSwoZSk9PiB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0ge21vbmdvb3NlMX07IiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBVc2VycyBmcm9tICcuL3VzZXJNb2RlbCc7XG5cbmNvbnN0IEV4cGVuc2VzID0gbW9uZ29vc2UubW9kZWwoJ0V4cGVuc2VzJywge1xuICB1c2VyX2lkOiB7XG4gICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuICAgIHJlZjogJ1VzZXJzJ1xuICB9LFxuICBhbW91bnQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZVxuICB9LFxuICBjYXRlZ29yeToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0cmltOiB0cnVlLFxuICAgICAgZGVmYXVsdDogJ290aGVycydcbiAgfSxcbiAgdHlwZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZSxcbiAgICBkZWZhdWx0OiAnZXhwZW5zZSdcbiAgfSxcbiAgZGF0ZToge1xuICAgIHR5cGU6IERhdGUsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWUsXG4gICAgZGVmYXVsdDogRGF0ZS5ub3coKVxuICB9LFxuICBkZDoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICB3dzoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICBkb3c6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgbW06IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgeXk6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfVxufSk7XG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlczsiLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IEV4cGVuc2VzIGZyb20gJy4vZXhwZW5zZU1vZGVsJztcblxuY29uc3QgVXNlcnMgPSBtb25nb29zZS5tb2RlbCgnVXNlcnMnLCB7XG4gICAgX2lkOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG4gICAgdXNlcm5hbWU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWlubGVuZ3RoOiA1LFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBlbWFpbElkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW5sZW5ndGg6IDgsXG4gICAgICAgIHRyaW06IHRydWVcbiAgICB9LFxuICAgIGV4cGVuc2U6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLCBcbiAgICAgICAgICAgIHJlZjogJ0V4cGVuc2VzJ1xuICAgICAgICB9XG4gICAgXVxufSk7XG5leHBvcnQgZGVmYXVsdCBVc2VyczsiLCJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCBlbnYgZnJvbSAnLi9jb25maWcvY29uZmlnJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTVNlcnZlciBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG52YXIgc2Vzc2lvbiA9IHJlcXVpcmUoJ2V4cHJlc3Mtc2Vzc2lvbicpO1xuXG5pbXBvcnQgQXBwIGZyb20gJy4uL3NyYy9hcHAnXG5pbXBvcnQgbW9uZ29vc2UxIGZyb20gJy4vZGIvbW9uZ29vc2UnO1xuaW1wb3J0IHtzaWduVXAsIHNpZ25JbiwgbmV3RXhwZW5zZSwgZ2V0RXhwZW5zZURhdGEsIGdldEV4cGVuc2VTdW1tYXJ5fSBmcm9tICcuL2FwaS9hcGlDYWxscyc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUO1xuXG5hcHAudXNlKHNlc3Npb24oe1xuICAgIHNlY3JldDogJ2RoaWxpcExvY2FsJyxcbiAgICByZXNhdmU6IGZhbHNlLFxuICAgIHNhdmVVbmluaXRpYWxpemVkOiB0cnVlXG59KSlcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYygnYnVpbGQvcHVibGljJykpO1xuYXBwLnVzZSgnL3N0eWxlcycsIGV4cHJlc3Muc3RhdGljKCdzcmMvcGFnZXMvc3R5bGVzJykpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYygnc3JjL3BhZ2VzL3N0YXRpYycpKTtcblxuLy8gQVBJIENhbGxzXG5hcHAucG9zdCgnL3NpZ251cCcsIHNpZ25VcCk7XG5hcHAucG9zdCgnL3NpZ25pbicsIHNpZ25Jbik7XG5hcHAucG9zdCgnL25ld19leHBlbnNlJywgbmV3RXhwZW5zZSk7XG5hcHAucG9zdCgnL2dldF9leHBlbnNlX2RhdGEnLCBnZXRFeHBlbnNlRGF0YSk7XG5hcHAucG9zdCgnL2dldF9leHBlbnNlX3N1bW1hcnknLCBnZXRFeHBlbnNlU3VtbWFyeSk7XG5cbmNvbnN0IGxvYWRIdG1sID0gKGNvbnRlbnQpID0+IHtcbiAgICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG4gICAgcmV0dXJuIChgXG4gICAgICAgIDxodG1sPlxuICAgICAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICAgICAgJHtoZWxtZXQubWV0YS50b1N0cmluZygpfVxuICAgICAgICAgICAgICAgICR7aGVsbWV0LnRpdGxlLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3R3aXR0ZXItYm9vdHN0cmFwLzQuMS4zL2Nzcy9ib290c3RyYXAubWluLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvdHdpdHRlci1ib290c3RyYXAvNC4xLjMvanMvYm9vdHN0cmFwLmJ1bmRsZS5taW4uanNcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvY29tbW9uLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9ob21lLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9sb2dpbi5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvbmV3X2V4cGVuc2UuY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnNcIiByZWw9XCJzdHlsZXNoZWV0XCI+XG4gICAgICAgICAgICA8L2hlYWQ+XG4gICAgICAgICAgICA8Ym9keT5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicm9vdFwiPiR7Y29udGVudH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8c2NyaXB0IHNyYz1cImNsaWVudF9idW5kbGUuanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgIDwvYm9keT5cbiAgICAgICAgPC9odG1sPmApO1xufTtcblxuYXBwLmdldCgnKicsIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSB7fTtcbiAgICBjb25zdCBjb250ZW50ID0gUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdHJpbmcoXG4gICAgICAgIDxTdGF0aWNSb3V0ZXI+XG4gICAgICAgICAgICA8QXBwIGxvY2F0aW9uPXtyZXEudXJsfSBjb250ZXh0PXtjb250ZXh0fSAvPlxuICAgICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICApO1xuICAgIGNvbnN0IHRlbXBsYXRlID0gbG9hZEh0bWwoY29udGVudCk7XG4gICAgcmVzLnNlbmQodGVtcGxhdGUpO1xufSk7XG5cbmFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdwcm9jZXNzLmVudicsIHBvcnQpO1xuICAgIGNvbnNvbGUubG9nKCdTZXJ2ZXIgU3RhcnRlZCBvbiBQb3J0OiAnLCBwb3J0KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhcHA7IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTd2l0Y2gsIFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBIb21lIGZyb20gJy4vcGFnZXMvY29tcG9uZW50cy9Mb2dpbic7XG5pbXBvcnQgUm91dGVzIGZyb20gJy4vcGFnZXMvcm91dGVzL3JvdXRlcyc7XG5pbXBvcnQge1NlcnZlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJvdXRlcy8+XG4gICAgICAgICk7XG4gICAgfVxufSIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmV4cG9ydCBjb25zdCBzaWdudXAgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvc2lnbnVwLyc7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgey4uLnBhcmFtc30pO1xufVxuXG5leHBvcnQgY29uc3Qgc2lnbmluID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL3NpZ25pbi8nO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHsuLi5wYXJhbXN9KTtcbn1cblxuZXhwb3J0IGNvbnN0IG5ld19leHBlbnNlID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL25ld19leHBlbnNlLyc7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgey4uLnBhcmFtc30pO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0X2V4cGVuc2VfZGF0YSA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9nZXRfZXhwZW5zZV9kYXRhLycgO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHBhcmFtcyk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRfZXhwZW5zZV9zdW1tYXJ5ID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL2dldF9leHBlbnNlX3N1bW1hcnkvJyA7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgcGFyYW1zKTtcbn1cbiIsIlxuY29uc3QgV0lEVEggPSAxNTA7XG5jb25zdCBIRUlHSFQgPSAxMDA7XG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtESVZJU0lPTkxFTkdUSH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5nZW5lcmF0ZVNWRyA9IHRoaXMuZ2VuZXJhdGVTVkcuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICh3aW5kb3cgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvbnJlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhbGVydCgnYXR0YWNoRXZlbnQgLSByZXNpemUnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdlbmVyYXRlU1ZHKCkge1xuICAgIGNvbnN0IHtwbG90RGF0YSwgdGFifSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeENvb3JkaW5hdGVzID0gW107XG4gICAgY29uc3QgeUNvb3JkaW5hdGVzID0gW107XG4gICAgY29uc3QgbGVuZ3RoID0gRElWSVNJT05MRU5HVEhbdGFiXTtcbiAgICBjb25zdCBtYXhBbXQgPSBwbG90RGF0YS5tYXhBbW91bnQ7XG4gICAgY29uc3QgeENvb3JkaW5hdGVEaXZMZW5ndGggPSAoV0lEVEggLyAobGVuZ3RoICsgMikpO1xuICAgIGxldCBsYXN0RGl2aXNpb24gPSAwO1xuICAgIGxldCBzdHIgPSAnJztcblxuICAgIC8qIFRvIHN0YXJ0IHRoZSBncmFwaCBhdCB0aGUgTGVhc3QgUG9pbnQgKi9cbiAgICB4Q29vcmRpbmF0ZXMucHVzaCgwKTtcbiAgICB5Q29vcmRpbmF0ZXMucHVzaChIRUlHSFQpO1xuICAgIHBsb3REYXRhLnBlckRpdmlzaW9uRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgd2hpbGUgKGVudHJ5LmRpdmlzaW9uID4gbGFzdERpdmlzaW9uKSB7XG4gICAgICAgIGNvbnN0IGxhc3RYID0geENvb3JkaW5hdGVzW3hDb29yZGluYXRlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgeENvb3JkaW5hdGVzLnB1c2goKGxhc3RYICsgeENvb3JkaW5hdGVEaXZMZW5ndGgpKTtcbiAgICAgICAgaWYgKGVudHJ5LmRpdmlzaW9uID09PSBsYXN0RGl2aXNpb24gKyAxKSB7XG4gICAgICAgICAgY29uc3QgcGVyY2VudCA9ICgoZW50cnkuYW1vdW50IC8gbWF4QW10KSAqIDEwMCk7XG4gICAgICAgICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUIC0gKChIRUlHSFQgLyAxMDApICogcGVyY2VudCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHlDb29yZGluYXRlcy5wdXNoKEhFSUdIVCk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdERpdmlzaW9uID0gbGFzdERpdmlzaW9uICsgMTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBsYXN0WCA9IHhDb29yZGluYXRlc1t4Q29vcmRpbmF0ZXMubGVuZ3RoIC0gMV07XG4gICAgeENvb3JkaW5hdGVzLnB1c2goKGxhc3RYICsgeENvb3JkaW5hdGVEaXZMZW5ndGgpKTtcbiAgICB5Q29vcmRpbmF0ZXMucHVzaChIRUlHSFQpO1xuIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeENvb3JkaW5hdGVzW2ldICsgJywnICsgeUNvb3JkaW5hdGVzW2ldICsgJyAnO1xuICAgIH1cbiAgICBpZiAoc3RyKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzdmcgdmlld0JveD17JzAgMCAnICsgV0lEVEggKyAnICcgKyBIRUlHSFR9IHN0eWxlPXt7bWFyZ2luOiAnMjBweCd9fT5cbiAgICAgICAgICAgIDxwb2x5bGluZSBwb2ludHM9e3N0cn0gY2xhc3NOYW1lPVwiZ3JhcGhQbG90TGluZVwiIC8+XG4gICAgICAgICAgICB7LyogPGcgc3R5bGU9e3tzdHJva2U6ICcjY2NjJywgc3Ryb2tlRGFzaGFycmF5OiAwLCBzdHJva2VXaWR0aDogMX19PlxuICAgICAgICAgICAgICA8bGluZSB4MT1cIjBcIiB5MT1cIjIwMFwiIHgyPVwiMFwiIHkyPVwiMFwiPjwvbGluZT5cbiAgICAgICAgICAgIDwvZz4gKi99XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuZ2VuZXJhdGVTVkcoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCBOZXdFeHBlbnNlIGZyb20gJy4vTmV3RXhwZW5zZSc7XG5pbXBvcnQge2dldF9leHBlbnNlX2RhdGEsIGdldF9leHBlbnNlX3N1bW1hcnl9IGZyb20gJy4uL2FwaUNhbGxzL0FwaUNhbGxzJztcbmltcG9ydCB7TU9OVEgsIFlFQVIsIFdFRUssIE1PTlRIU05BTUV9IGZyb20gJy4uL2NvbnN0YW50cy9jb25zdGFudHMnO1xuaW1wb3J0IEdyYXBoIGZyb20gJy4vR3JhcGgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5sZWZ0TWVudUNsaWNrID0gdGhpcy5sZWZ0TWVudUNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5uZXdFeHBlbnNlID0gdGhpcy5uZXdFeHBlbnNlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5uYXZpZ2F0ZVRvU2lnbkluID0gdGhpcy5uYXZpZ2F0ZVRvU2lnbkluLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFjdGl2ZVRhYjogTU9OVEgsXG4gICAgICBzaG93TmV3RXhwZW5zZTogZmFsc2UsXG4gICAgICBzdGFuZGluZzogdW5kZWZpbmVkLFxuICAgICAgc3BlbnQ6IHVuZGVmaW5lZCxcbiAgICAgIGV4cGVuc2VMaXN0OiB7fSxcbiAgICAgIGluY29tZUxpc3Q6IHt9LFxuICAgICAgdmlld01vcmU6IGZhbHNlXG4gICAgfVxuICAgIHRoaXMudmlld2VkTW9yZSA9IHt9O1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuZ2V0RXhwZW5zZSgpO1xuICAgIHRoaXMuZ2V0RXhwZW5zZVN1bW1hcnkoKTtcbiAgfVxuXG4gIGdldEV4cGVuc2VTdW1tYXJ5KCkge1xuICAgIGNvbnN0IHRhYiA9IHRoaXMuc3RhdGUuYWN0aXZlVGFiO1xuICAgIGNvbnN0IG1tID0gbmV3IERhdGUoKS5nZXRNb250aCgpICsgMTtcbiAgICBjb25zdCBkb3cgPSBuZXcgRGF0ZSgpLmdldERheSgpO1xuICAgIGNvbnN0IHd3ID0gTWF0aC5jZWlsKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpIC8gNyk7XG4gICAgY29uc3QgeXkgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgcGFyYW1zID0ge3RhYiwgbW0sIGRvdywgd3csIHl5fTtcbiAgICBnZXRfZXhwZW5zZV9zdW1tYXJ5KHBhcmFtcykudGhlbigocmVzcCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7cGxvdERhdGE6IHsuLi5yZXNwLmRhdGF9fSk7XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBHZXQgRXhwZW5zZSBTdW1tYXJ5IERldGFpbHMnLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0RXhwZW5zZSgpIHtcbiAgICBsZXQgZXhwZW5zZUxpc3QgPSB7fSwgaW5jb21lTGlzdCA9IHt9LCBzdGFuZGluZyA9Jyc7XG4gICAgY29uc3QgdGFiID0gdGhpcy5zdGF0ZS5hY3RpdmVUYWI7XG4gICAgY29uc3QgbW0gPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IGRvdyA9IG5ldyBEYXRlKCkuZ2V0RGF5KCk7XG4gICAgY29uc3Qgd3cgPSBNYXRoLmNlaWwobmV3IERhdGUoKS5nZXREYXRlKCkgLyA3KTtcbiAgICBjb25zdCB5eSA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7dGFiLCBtbSwgZG93LCB3dywgeXl9O1xuICAgIGdldF9leHBlbnNlX2RhdGEocGFyYW1zKS50aGVuKChyZXNwKSA9PiB7XG4gICAgIGNvbnN0IHtleHBlbnNlTGlzdCwgaW5jb21lTGlzdCwgc3RhbmRpbmcsIHNwZW50fSA9IHJlc3AuZGF0YTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGVuc2VMaXN0LCBpbmNvbWVMaXN0LCBzdGFuZGluZywgc3BlbnR9KTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIEdldCBFeHBlbnNlIERldGFpbHMnLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlRXhwZW5zZURheUZvcm1hdChhY3RpdmVUYWIpIHtcbiAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVUYWI6IGFjdGl2ZVRhYiwgdmlld01vcmU6IGZhbHNlfSwgKCkgPT4ge1xuICAgICAgdGhpcy5nZXRFeHBlbnNlKCk7XG4gICAgICB0aGlzLmdldEV4cGVuc2VTdW1tYXJ5KCk7XG4gICAgfSk7XG4gIH1cblxuICBsZWZ0TWVudUNsaWNrKCkge1xuICAgIHRoaXMucmVmcy5iYWNrRHJvcC5jbGFzc0xpc3QudG9nZ2xlKCdiYWNrRHJvcCcpO1xuICAgIHRoaXMucmVmcy5wb3B1cC5jbGFzc0xpc3QudG9nZ2xlKCdyaWdodDAnKTtcbiAgICB0aGlzLnJlZnMuZmlyc3RIYWxmTGFuZGluZ1R4dC5jbGFzc0xpc3QudG9nZ2xlKCdzY2FsZTkwJyk7XG4gICAgdGhpcy5yZWZzLm90aGVySGFsZkxhbmRpbmdUeHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2NhbGU5MCcpO1xuICB9XG5cbiAgbmF2aWdhdGVUb1NpZ25JbigpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzKTtcbiAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCgnL2xvZ2luJyk7XG4gIH1cblxuICByZW5kZXJMZWZ0TWVudUJhcigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnVCYXJcIj5cbiAgICAgICAgPGRpdiByZWY9XCJwb3B1cFwiY2xhc3NOYW1lPVwicG9wdXAgemkyIFwiIG9uQ2xpY2s9e3RoaXMubGVmdE1lbnVDbGlja30+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlQmFyIGluLWJsIGZsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtb3B0aW9uXCI+U2V0dGluZ3M8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIiBvbkNsaWNrPXt0aGlzLm5hdmlnYXRlVG9TaWduSW59PlNpZ24gSW48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIj5BYm91dCBNZTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBuZXdFeHBlbnNlKHZhbCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dOZXdFeHBlbnNlOiB2YWx9KTtcbiAgfVxuXG4gIGNsaWNrVmlld01vcmUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dmlld01vcmU6ICF0aGlzLnN0YXRlLnZpZXdNb3JlfSk7XG4gICAgdGhpcy5yZWZzLnRyYW5zYWN0ZWRDYXJkLnNjcm9sbFRvcCA9IDA7XG4gIH1cblxuICByZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5zdGF0ZS5leHBlbnNlTGlzdC50cmFuc2FjdGlvbkxpc3QubWFwKCh0cmFuc2FjdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudmlld01vcmUgfHwgdGhpcy52aWV3ZWRNb3JlW3RoaXMuc3RhdGUuYWN0aXZlVGFiXSB8fCAhdGhpcy5zdGF0ZS52aWV3TW9yZSAmJiBpbmRleCA8IDIpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZS52aWV3TW9yZSkge1xuICAgICAgICAgICAgdGhpcy52aWV3ZWRNb3JlW3RoaXMuc3RhdGUuYWN0aXZlVGFiXSA9IHRydWU7IC8vIFRvIG5vdCByZW1vdmUgZWxlbWVudCBmcm9tIERPTSBvbiBjbGlja2luZyB2aWV3IE1vcmUgYWdhaW5cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXsndHJhbnNhY3Rpb25fdHlwZV8nICsgaW5kZXh9IGNsYXNzTmFtZT1cInRyYW5zYWN0ZWRDYXJkSW5uZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkSW5uZXJoZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0X25hbWVcIj57dHJhbnNhY3Rpb24uY2F0ZWdvcnl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9wZXJjZW50IFwiPnt0cmFuc2FjdGlvbi5wZXJjZW50ICsgJyAlJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgey8qIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9uYW1lIGxvYWRlclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRfcGVyY2VudCBsb2FkZXJcIj48L3NwYW4+ICovfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9ncmVzc0JhciBibCB0ZXh0Q2VudGVyIG1hcmdpblQyNVwiID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbGxlZFwiIHN0eWxlPSB7e21heFdpZHRoOiB0cmFuc2FjdGlvbi5wZXJjZW50ICsgJyUnfX0+XG4gICAgICAgICAgICAgICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJmaWxsZWRcIiA+PC9kaXY+ICovfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICk7XG4gIH1cblxuICBnZXRUcmFuc2FjdGlvbkNhcmQoKSB7XG4gICAgY29uc3Qge2FjdGl2ZVRhYiwgdmlld01vcmUgPSBmYWxzZX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGhhc0RhdGEgPSB0aGlzLnN0YXRlLmV4cGVuc2VMaXN0ICYmIE9iamVjdC5rZXlzKHRoaXMuc3RhdGUuZXhwZW5zZUxpc3QpLmxlbmd0aCA+IDA7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgcmVmPVwidHJhbnNhY3RlZENhcmRcIiBjbGFzc05hbWU9eyd0cmFuc2FjdGVkQ2FyZCB0cmFuc2l0aW9uMWEgJyArICh2aWV3TW9yZSA/ICdzaG93QWxsVHJhbnNhY3Rpb24nIDogJycpfT5cbiAgICAgICAgICAgIHtoYXNEYXRhID9cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmFuc2FjdFNjcm9sbGVyXCI+XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gV0VFSyA/IHRoaXMucmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQoKSA6IG51bGx9XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gTU9OVEggPyB0aGlzLnJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKCkgOiBudWxsfVxuICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IFlFQVIgPyB0aGlzLnJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKCkgOiBudWxsfVxuICAgICAgICAgICAgICA8L2Rpdj4gOiBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIHBhZFQyMCBtaDEwcFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+Tm8gVHJhbnNhY3Rpb25zIGFkZGVkIDwvZGl2PlxuICAgICAgICAgICAgICAgIHt0eXBlb2Yod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcgJiYgIXdpbmRvdy5zaWduZWRJbiAmJiA8ZGl2IGNsYXNzTmFtZT1cInBhZFQxMCBwYWRCMjBcIj48YSBocmVmPVwiL2xvZ2luXCI+PHNwYW4+U2lnbiBJbjwvc3Bhbj48L2E+IGZvciBQYXN0IFRyYW5zYWN0aW9uczwvZGl2Pn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyduZXdDb250YWluZXIgJyArICghaGFzRGF0YSA/ICdwYWRUMTAnIDogJycpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5ld0J0blwiIG9uQ2xpY2s9eygpID0+IHRoaXMubmV3RXhwZW5zZSh0cnVlKX0+QWRkIE5ldzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlld01vcmVBcnJvd1wiIG9uQ2xpY2s9eygpID0+IHRoaXMuY2xpY2tWaWV3TW9yZSgpfT5cbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPXt2aWV3TW9yZSA/ICdyb3RhdGVWaWV3TW9yZScgOiAnJ30gcmVmPVwic3ZnVmlld01vcmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTcuNDEgNy44NEwxMiAxMi40Mmw0LjU5LTQuNThMMTggOS4yNWwtNiA2LTYtNnpcIi8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICB9XG4gIGdldEN1cnJlbnREYXRlKCkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGN1cnJNb250aCA9IE1PTlRIU05BTUVbZGF0ZS5nZXRNb250aCgpXTtcbiAgICBjb25zdCBjdXJyRGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIHJldHVybiBjdXJyRGF0ZSArICcgJyArIGN1cnJNb250aCArICcgJyArIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7YWN0aXZlVGFiLCBzaG93TmV3RXhwZW5zZSwgc3RhbmRpbmcgPSB1bmRlZmluZWQsIHNwZW50ID0gdW5kZWZpbmVkLCB2aWV3TW9yZSA9IGZhbHNlLCBwbG90RGF0YSwgaW5jb21lTGlzdH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgcmVmPVwiYmFja0Ryb3BcIiBjbGFzc05hbWU9eyd0cmFuc2l0aW9uMmEgemkxICcgKyAoc2hvd05ld0V4cGVuc2UgPyAnYmFja0Ryb3AnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLm5ld0V4cGVuc2UoZmFsc2UpfT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJMZWZ0TWVudUJhcigpfVxuICAgICAgICAgIDxkaXYgcmVmPVwibWFpbkNvbnRlbnRcIiBjbGFzc05hbWU9XCJtYWluQ29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXJzdC1oYWxmLWxhbmRpbmdcIj5cbiAgICAgICAgICAgICAgPGRpdiByZWY9XCJmaXJzdEhhbGZMYW5kaW5nVHh0XCIgY2xhc3NOYW1lPVwidHJhbnNpdGlvbjBfNSBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YW5kaW5nXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsZWZ0LW1lbnUtY29udGFpbmVyXCIgb25DbGljaz17dGhpcy5sZWZ0TWVudUNsaWNrfT48aW1nIGNsYXNzTmFtZT1cImxlZnQtbWVudVwiIHNyYz1cIi9pbWcvbWVudS5zdmdcIi8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgey8qIDxzcGFuIGNsYXNzTmFtZT1cInJpZ2h0LW1lbnUtY29udGFpbmVyXCIgb25DbGljaz17KCkgPT4ge3RoaXMuc2V0U3RhdGUoe3Zpc2libGVSaWdodE1lbnU6IHRydWV9KX19PjxpbWcgY2xhc3NOYW1lPVwicmlnaHQtbWVudVwiIHNyYz1cIi9pbWcvbWVudS5zdmdcIi8+PC9zcGFuPiAqL31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmIgZjExXCI+Q1VSUkVOVCBCQUxBTkNFPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmMThcIj7igrkgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdGFuZGluZ0FtdFwiPnsodHlwZW9mKHN0YW5kaW5nKSAhPT0gJ3VuZGVmaW5lZCcgPyBzdGFuZGluZyA6ICcwJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48c3BhbiBjbGFzc05hbWU9XCJmMTFcIj57dGhpcy5nZXRDdXJyZW50RGF0ZSgpfTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwZW5zZURheXNCdG5cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J2RheVR5cGVCdG4gJyArIChhY3RpdmVUYWIgPT09IFdFRUsgPyAnZGF5VHlwZUJ0bi1hY3RpdmUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB7dGhpcy5jaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KFdFRUspfX0+V2Vlazwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J2RheVR5cGVCdG4gJyArIChhY3RpdmVUYWIgPT09IE1PTlRIID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdChNT05USCl9fT5Nb250aDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J2RheVR5cGVCdG4gJyArIChhY3RpdmVUYWIgPT09IFlFQVIgPyAnZGF5VHlwZUJ0bi1hY3RpdmUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB7dGhpcy5jaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KFlFQVIpfX0+WWVhcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkhlYWRpbmcgaW4tYmwgZmwgdzUwIFwiPnsnU3BlbnQgOiDigrknICsgKHR5cGVvZihzcGVudCkgIT09ICd1bmRlZmluZWQnPyBzcGVudDogJzAnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHsvKiA8ZGl2IGNsYXNzTmFtZT1cInN1YkhlYWRpbmcgaW4tYmwgZmwgdzUwIFwiPnsnU3RhbmRpbmcgOiDigrknICsgKHR5cGVvZihzdGFuZGluZykgIT09ICd1bmRlZmluZWQnID8gc3RhbmRpbmcgOiAnMCcpfTwvZGl2PiAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViSGVhZGluZyBpbi1ibCBmbCB3NTAgXCI+eydJbmNvbWUgOiDigrknICsgKGluY29tZUxpc3QgJiYgdHlwZW9mKGluY29tZUxpc3QuYW1vdW50KSAhPT0gJ3VuZGVmaW5lZCcgPyBpbmNvbWVMaXN0LmFtb3VudCA6ICcwJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0VHJhbnNhY3Rpb25DYXJkKCl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7cGxvdERhdGEgJiYgcGxvdERhdGEucGVyRGl2aXNpb25EYXRhICYmICBwbG90RGF0YS5wZXJEaXZpc2lvbkRhdGEubGVuZ3RoID4gMCA/XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3RoZXItaGFsZi1sYW5kaW5nXCI+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9XCJvdGhlckhhbGZMYW5kaW5nVHh0XCIgY2xhc3NOYW1lPVwidHJhbnNpdGlvbjBfNSBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlciB0clN1bWFyeUhlYWRpbmcgZmJcIiA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnsnRXhwZW5zZSBUcmVuZHMnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gV0VFSyA/ICA8R3JhcGggcGxvdERhdGE9e3Bsb3REYXRhfSB0YWI9e2FjdGl2ZVRhYn0vPiA6IG51bGx9XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBNT05USCA/ICA8R3JhcGggcGxvdERhdGE9e3Bsb3REYXRhfSB0YWI9e2FjdGl2ZVRhYn0vPiA6IG51bGx9XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBZRUFSID8gIDxHcmFwaCBwbG90RGF0YT17cGxvdERhdGF9IHRhYj17YWN0aXZlVGFifS8+IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7c2hvd05ld0V4cGVuc2UgPyBcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgIDxOZXdFeHBlbnNlIG5ld0V4cGVuc2U9e3RoaXMubmV3RXhwZW5zZX0vPlxuICAgICAgICAgIDwvZGl2PiA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCB7c2lnbnVwLCBzaWduaW59IGZyb20gJy4uL2FwaUNhbGxzL0FwaUNhbGxzJztcblxuY2xhc3MgTG9naW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNpZ25VcCA9IHRoaXMuc2lnblVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaWduSW4gPSB0aGlzLnNpZ25Jbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB1c2VybmFtZTogJ2RoaWxpcCcsXG4gICAgICBwYXNzd29yZDogJ2RoaWxpcGRoaWxpcCdcbiAgICB9XG4gIH1cblxuICBoZWFkKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0PlxuICAgICAgICA8dGl0bGU+RXhwZW5zZSBMb2dpbjwvdGl0bGU+XG4gICAgICA8L0hlbG1ldD5cbiAgICApO1xuICB9XG5cbiAgc2lnblVwKCkge1xuICAgIHNpZ251cCh7dXNlcm5hbWU6IHRoaXMuc3RhdGUudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSk7XG4gIH1cblxuICBzaWduSW4oKSB7XG4gICAgc2lnbmluKHt1c2VybmFtZTogdGhpcy5zdGF0ZS51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMuc3RhdGUucGFzc3dvcmR9KS50aGVuKChyZXNwKSA9PiB7XG4gICAgICBpZiAocmVzcC5kYXRhICYmICFyZXNwLmRhdGEuZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvaG9tZScsIHt9KTtcbiAgICAgICAgaWYgKHR5cGVvZih3aW5kb3cpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHdpbmRvdy5zaWduZWRJbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gU2lnbkluJywgcmVzcCk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBTaWduSW4nLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5oZWFkKCl9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9naW5Db250YWluZXJcIj5cbiAgICAgICAgICA8aDE+TG9naW48L2gxPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9J3VzZXJuYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS51c2VybmFtZX0gb25DaGFuZ2UgPSB7KGUpID0+IHRoaXMuc2V0U3RhdGUoe3VzZXJuYW1lOiBlLnRhcmdldC52YWx1ZX0pfSB0eXBlPVwidGV4dFwiLz5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj0ncGFzc3dvcmQnIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfSBvbkNoYW5nZSA9IHsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cGFzc3dvcmQ6IGUudGFyZ2V0LnZhbHVlfSl9IHR5cGU9XCJwYXNzd29yZFwiLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2lnbklufT5TaWduIEluPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNpZ25VcH0+U2lnbiBVcDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IExvZ2luOyIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtuZXdfZXhwZW5zZX0gZnJvbSAnLi4vYXBpQ2FsbHMvQXBpQ2FsbHMnO1xuLy8gaW1wb3J0IHtjb21tYUZvcm1hdHRlZH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdFeHBlbnNlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zZWxlY3RUeXBlID0gdGhpcy5zZWxlY3RUeXBlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdWJtaXROZXdFeHBlbnNlID0gdGhpcy5zdWJtaXROZXdFeHBlbnNlLmJpbmQodGhpcyk7XG4gICAgXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHR5cGU6ICdleHBlbnNlJyxcbiAgICAgIGFtb3VudDogJycsXG4gICAgICBjYXRlZ29yeTogJycsXG4gICAgICBkYXk6ICcnLCBcbiAgICAgIG1vbnRoOiAnJyxcbiAgICAgIHllYXI6ICcnLFxuICAgICAgZXJyb3I6IHt9XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0VHlwZSh0eXBlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dHlwZTogdHlwZX0pO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50KHZhbCl7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YW1vdW50OiB2YWx9KVxuICB9XG5cbiAgY2hhbmdlRGF0ZSh2YWwsIGN1cnJlbnQsIG5leHQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsuLi52YWx9KTtcbiAgICBpZiAoY3VycmVudCAmJiB2YWxbY3VycmVudF0ubGVuZ3RoID09PSAyICYmIG5leHQpIHtcbiAgICAgIHRoaXMucmVmc1tuZXh0XS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGlzVmFsaWREYXRlKCkge1xuICAgIGNvbnN0IHtkYXksIG1vbnRoLCB5ZWFyfSA9IHRoaXMuc3RhdGU7XG4gICAgdmFyIGRhdGVSZWcgPSAvXlswLTldWzAtOV0kLztcbiAgICBpZiAoIWRhdGVSZWcudGVzdChkYXkpIHx8ICFkYXRlUmVnLnRlc3QobW9udGgpIHx8ICFkYXRlUmVnLnRlc3QoeWVhcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoMjAwMCArIHBhcnNlSW50KHllYXIpLCBwYXJzZUludChtb250aCktMSwgcGFyc2VJbnQoZGF5KSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgdmFsaWRhdGVQYXJhbXMoKSB7XG4gICAgdmFyIHJlZyA9IC9eXFxkKyQvO1xuICAgIGNvbnN0IHthbW91bnQsIGNhdGVnb3J5fSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKCFhbW91bnQgfHwgIXJlZy50ZXN0KGFtb3VudCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB7YW1vdW50OiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBBbW91bnQnfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWNhdGVnb3J5KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2NhdGVnb3J5OiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBDYXRlZ29yeSd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc1ZhbGlkRGF0ZSgpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2RhdGU6ICdQbGVhc2UgcHJvdmlkZSBhIFZhbGlkIERhdGUnfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzdWJtaXROZXdFeHBlbnNlKCkge1xuICAgIGNvbnN0IHthbW91bnQsIGRheSwgbW9udGgsIHllYXIsIHR5cGUsIGNhdGVnb3J5fSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgaXNWYWxpZGF0aW9uU3VjY2VzcyA9IHRoaXMudmFsaWRhdGVQYXJhbXMoKTtcbiAgICBpZiAoaXNWYWxpZGF0aW9uU3VjY2Vzcykge1xuICAgICAgY29uc3QgcGFyYW1zID0geyBhbW91bnQsIHR5cGUsIGRhdGU6IHRoaXMuZGF0ZSwgY2F0ZWdvcnl9O1xuICAgICAgbmV3X2V4cGVuc2UocGFyYW1zKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm5ld0V4cGVuc2UoZmFsc2UpO1xuICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGNyZWF0ZSBuZXcgRXhwZW5zZScsZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7dHlwZSwgYW1vdW50LCBkYXksIG1vbnRoLCB5ZWFyLCBjYXRlZ29yeSwgZXJyb3J9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ld0V4cGVuc2VDb250YWluZXIgemkyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwSW5jQnRucyB0ZXh0Q2VudGVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnbmV3QnRuICcgKyAodHlwZSA9PT0gJ2V4cGVuc2UnID8gJ3NlbGVjdGVkVHlwZScgOiAnJyl9ICBvbkNsaWNrPXsoKSA9PiB0aGlzLnNlbGVjdFR5cGUoJ2V4cGVuc2UnKX0+RXhwZW5zZTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eyduZXdCdG4gJyArICh0eXBlID09PSAnaW5jb21lJyA/ICdzZWxlY3RlZFR5cGUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNlbGVjdFR5cGUoJ2luY29tZScpfT5JbmNvbWU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFtb3VudElucHV0XCI+XG4gICAgICAgIDxzcGFuPuKCuTwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkFtb3VudFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VBbW91bnQoZS50YXJnZXQudmFsdWUpfSB2YWx1ZT17YW1vdW50fS8+XG4gICAgICAgICAge2Vycm9yLmFtb3VudCA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuYW1vdW50fTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICBjbGFzc05hbWU9XCJjYXRlZ29yeUlucHV0XCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJDYXRlZ29yeVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7Y2F0ZWdvcnk6IGUudGFyZ2V0LnZhbHVlfSl9IHZhbHVlPXtjYXRlZ29yeX0vPlxuICAgICAgICAgIHtlcnJvci5jYXRlZ29yeSA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuY2F0ZWdvcnl9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BlbnREYXlcIj5cbiAgICAgICAgICA8aW5wdXQgcmVmPVwiZGF5XCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiRERcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7ZGF5OiBlLnRhcmdldC52YWx1ZX0sICdkYXknLCAnbW9udGgnKX0gdmFsdWU9e2RheX0vPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJtb250aFwiIGNsYXNzTmFtZT1cImRheUlwXCIgdHlwZT1cIm51bWJlclwiIG1heExlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIk1NXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe21vbnRoOiBlLnRhcmdldC52YWx1ZX0sICdtb250aCcsICd5ZWFyJyl9IHZhbHVlPXttb250aH0vPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJ5ZWFyXCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiWVlcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7eWVhcjogZS50YXJnZXQudmFsdWV9LCAneWVhcicpfSB2YWx1ZT17eWVhcn0vPlxuICAgICAgICAgIHtlcnJvci5kYXRlID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5kYXRlfTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Ym1pdEJ0blwiIG9uQ2xpY2s9e3RoaXMuc3VibWl0TmV3RXhwZW5zZX0+RG9uZTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCB7TmF2TGlua30gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNsYXNzIE5vdEZvdW5kIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLmJpbmQodGhpcyk7XG4gIH1cblxuICBoZWFkKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0PlxuICAgICAgICA8dGl0bGU+UGFnZSBOb3QgRm91bmQ8L3RpdGxlPlxuICAgICAgPC9IZWxtZXQ+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuaGVhZCgpfVxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT5Tb3JyeSwgdGhlIHBhZ2UgeW91IGFyZSBleHBlY3RpbmcgZG9lcyBub3QgZXhpc3QhPC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpIG9uQ2xpY2s9IHsoKSA9PiB0aGlzLnByb3BzLmhpc3RvcnkuZ29CYWNrKCl9PiBcbiAgICAgICAgICAgICAgQmFja1xuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPE5hdkxpbmsgdG89Jy8nPiBIb21lIDwvTmF2TGluaz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxOYXZMaW5rIHRvPScvbG9naW4nPiBMb2dpbiA8L05hdkxpbms+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTm90Rm91bmQ7IiwiZXhwb3J0IGNvbnN0IE1PTlRIID0gJ21vbnRoJztcbmV4cG9ydCBjb25zdCBZRUFSID0gJ3llYXInO1xuZXhwb3J0IGNvbnN0IFdFRUsgPSAnd2Vlayc7XG5leHBvcnQgY29uc3QgRElWSVNJT05MRU5HVEggPSB7IG1vbnRoOiAzMSwgeWVhcjogMTIsIHdlZWs6IDd9OyBcbmV4cG9ydCBjb25zdCBNT05USFNOQU1FID0gWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ107XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtCcm93c2VyUm91dGVyLCBTd2l0Y2gsIFJvdXRlfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuXG5pbXBvcnQgTG9naW4gZnJvbSAnLi4vY29tcG9uZW50cy9Mb2dpbic7XG5pbXBvcnQgTm90Rm91bmQgZnJvbSAnLi4vY29tcG9uZW50cy9Ob3RGb3VuZCdcbmltcG9ydCBIb21lIGZyb20gJy4uL2NvbXBvbmVudHMvSG9tZSc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8U3dpdGNoPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9Jy8nIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8SG9tZSB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvbG9naW4nIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8TG9naW4gey4uLnByb3BzfS8+fS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD0nL2hvbWUnIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8SG9tZSB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIDxSb3V0ZSByZW5kZXI9eyhwcm9wcykgPT4gPE5vdEZvdW5kIHsuLi5wcm9wc30vPn0vPlxuICAgICAgICA8L1N3aXRjaD5cbiAgICApO1xufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1zZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTsiXSwic291cmNlUm9vdCI6IiJ9