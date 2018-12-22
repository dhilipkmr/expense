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

      if (this.state.expenseList && Object.keys(this.state.expenseList).length > 0) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { ref: 'transactedCard', className: 'transactedCard transition1a ' + (viewMore ? 'showAllTransaction' : '') },
            _react2.default.createElement(
              'div',
              { className: 'transactScroller' },
              activeTab === _constants.WEEK ? this.renderInnerTransactioncard() : null,
              activeTab === _constants.MONTH ? this.renderInnerTransactioncard() : null,
              activeTab === _constants.YEAR ? this.renderInnerTransactioncard() : null
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
      return null;
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
          plotData = _state2.plotData;

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
                  ),
                  _react2.default.createElement('span', null)
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'heading' },
                  'Expense Home'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'subHeading' },
                  'Standing : ₹' + (typeof standing !== 'undefined' ? standing : '0')
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
                    { className: 'subHeading' },
                    'Spent : ₹' + (typeof spent !== 'undefined' ? spent : '0')
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
                activeTab === _constants.YEAR ? _react2.default.createElement(_Graph2.default, { plotData: plotData, tab: activeTab }) : null,
                _react2.default.createElement(
                  'div',
                  { className: 'newContainer' },
                  _react2.default.createElement(
                    'div',
                    { className: 'new' },
                    _react2.default.createElement(
                      'span',
                      { className: 'newBtn', onClick: function onClick() {
                          return _this7.newExpense(true);
                        } },
                      'Add New'
                    )
                  )
                )
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
var DIVISIONLENGTH = exports.DIVISIONLENGTH = { month: 31, year: 12, week: 7 };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2FwaS9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvZGIvbW9uZ29vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9leHBlbnNlTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hcGlDYWxscy9BcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Ib21lLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL0xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05ld0V4cGVuc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvTm90Rm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbnN0YW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3JvdXRlcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbmdvb3NlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb21cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIl0sIm5hbWVzIjpbInNpZ25VcCIsInJlcXVlc3QiLCJyZXNwb25zZSIsImJvZHkiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZW1haWxJZCIsInVzZXIiLCJVc2VycyIsIl9pZCIsIm1vbmdvb3NlIiwiVHlwZXMiLCJPYmplY3RJZCIsImZpbmQiLCJ0aGVuIiwicmVzIiwibGVuZ3RoIiwic2VuZCIsImVycm9yIiwibXNnIiwic2F2ZSIsImRvYyIsInNlc3Npb24iLCJfdXNlcklkIiwiZSIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJzaWduSW4iLCJuZXdFeHBlbnNlIiwiYW1vdW50IiwiY2F0ZWdvcnkiLCJkYXRlIiwidHlwZSIsInBhcnNlSW50IiwiRGF0ZSIsInd3IiwiTWF0aCIsImNlaWwiLCJnZXREYXRlIiwiZG93IiwiZ2V0RGF5IiwibW0iLCJnZXRNb250aCIsInl5IiwiZ2V0RnVsbFllYXIiLCJkZCIsIm5ld0V4cGVuc2VJbnN0YW5jZSIsIkV4cGVuc2VzIiwidXNlcl9pZCIsImVyciIsImdldEV4cGVuc2VEYXRhIiwidXNlcklkIiwiZXhwZW5zZURhdGVSZXNwb25kZXIiLCJkYXRhIiwicmVzcG9uZCIsImV4cGVuc2VMaXN0IiwiaW5jb21lTGlzdCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJzcGVudCIsInN0YW5kaW5nIiwidHJhbnNhY3Rpb25MaXN0IiwidHJhbnNhY3Rpb24iLCJwZXJjZW50Iiwicm91bmQiLCJncm91cDEiLCIkZ3JvdXAiLCIkc3VtIiwiZ3JvdXAyIiwiJHB1c2giLCJ1bndpbmQiLCIkdW53aW5kIiwic29ydCIsIiRzb3J0IiwicmVHcm91cCIsInRhYiIsIllFQVIiLCJhZ2dyZWdhdGUiLCIkbWF0Y2giLCIkcHJvamVjdCIsImFsbG93RGlza1VzZSIsImV4ZWMiLCJNT05USCIsIldFRUsiLCJnZXRFeHBlbnNlU3VtbWFyeSIsImV4ZWNTdW1tYXJ5UXVlcnkiLCJwZXJEaXZpc2lvbkRhdGEiLCJtYXhBbW91bnQiLCJOdW1iZXIiLCJNSU5fU0FGRV9JTlRFR0VSIiwiZm9yRWFjaCIsImVudHJ5IiwibW9udGgiLCJ0b3RhbEFtb3VudCIsImRpdmlzaW9uIiwiZW52IiwicHJvY2VzcyIsIlBPUlQiLCJNT05HT0xBQl9VUkkiLCJtb25nb29zZTEiLCJyZXF1aXJlIiwiUHJvbWlzZSIsImdsb2JhbCIsImNvbm5lY3QiLCJ1c2VOZXdVcmxQYXJzZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9kZWwiLCJTY2hlbWEiLCJyZWYiLCJyZXF1aXJlZCIsInRyaW0iLCJTdHJpbmciLCJkZWZhdWx0Iiwibm93IiwibWlubGVuZ3RoIiwiZXhwZW5zZSIsImFwcCIsInBvcnQiLCJ1c2UiLCJzZWNyZXQiLCJyZXNhdmUiLCJzYXZlVW5pbml0aWFsaXplZCIsImJvZHlQYXJzZXIiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJqc29uIiwiZXhwcmVzcyIsInN0YXRpYyIsInBvc3QiLCJsb2FkSHRtbCIsImNvbnRlbnQiLCJoZWxtZXQiLCJIZWxtZXQiLCJyZW5kZXJTdGF0aWMiLCJtZXRhIiwidG9TdHJpbmciLCJ0aXRsZSIsImdldCIsInJlcSIsImNvbnRleHQiLCJSZWFjdERPTVNlcnZlciIsInJlbmRlclRvU3RyaW5nIiwidXJsIiwidGVtcGxhdGUiLCJsaXN0ZW4iLCJBcHAiLCJDb21wb25lbnQiLCJzaWdudXAiLCJwYXJhbXMiLCJheGlvcyIsInNpZ25pbiIsIm5ld19leHBlbnNlIiwiZ2V0X2V4cGVuc2VfZGF0YSIsImdldF9leHBlbnNlX3N1bW1hcnkiLCJXSURUSCIsIkhFSUdIVCIsIkdyYXBoIiwicHJvcHMiLCJnZW5lcmF0ZVNWRyIsImJpbmQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYWxlcnQiLCJwbG90RGF0YSIsInhDb29yZGluYXRlcyIsInlDb29yZGluYXRlcyIsIkRJVklTSU9OTEVOR1RIIiwibWF4QW10IiwieENvb3JkaW5hdGVEaXZMZW5ndGgiLCJsYXN0RGl2aXNpb24iLCJzdHIiLCJwdXNoIiwibGFzdFgiLCJpIiwibWFyZ2luIiwiSG9tZSIsImxlZnRNZW51Q2xpY2siLCJuYXZpZ2F0ZVRvU2lnbkluIiwic3RhdGUiLCJhY3RpdmVUYWIiLCJzaG93TmV3RXhwZW5zZSIsInVuZGVmaW5lZCIsInZpZXdNb3JlIiwidmlld2VkTW9yZSIsImdldEV4cGVuc2UiLCJyZXNwIiwic2V0U3RhdGUiLCJyZWZzIiwiYmFja0Ryb3AiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJwb3B1cCIsImZpcnN0SGFsZkxhbmRpbmdUeHQiLCJvdGhlckhhbGZMYW5kaW5nVHh0IiwiaGlzdG9yeSIsInZhbCIsInRyYW5zYWN0ZWRDYXJkIiwic2Nyb2xsVG9wIiwiaW5kZXgiLCJtYXhXaWR0aCIsInJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkIiwiY2xpY2tWaWV3TW9yZSIsInJlbmRlckxlZnRNZW51QmFyIiwiY2hhbmdlRXhwZW5zZURheUZvcm1hdCIsImdldFRyYW5zYWN0aW9uQ2FyZCIsIkxvZ2luIiwiaGVhZCIsImNhdGNoIiwidGFyZ2V0IiwidmFsdWUiLCJOZXdFeHBlbnNlIiwic2VsZWN0VHlwZSIsInN1Ym1pdE5ld0V4cGVuc2UiLCJkYXkiLCJ5ZWFyIiwiY3VycmVudCIsIm5leHQiLCJmb2N1cyIsImRhdGVSZWciLCJ0ZXN0IiwicmVnIiwiaXNWYWxpZERhdGUiLCJpc1ZhbGlkYXRpb25TdWNjZXNzIiwidmFsaWRhdGVQYXJhbXMiLCJjaGFuZ2VBbW91bnQiLCJjaGFuZ2VEYXRlIiwiTm90Rm91bmQiLCJnb0JhY2siLCJ3ZWVrIl0sIm1h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QUMsOEJBQUQ7QUFBQTtBQUNJLHNDQUFDLHFCQUFELElBQU8sTUFBSyxHQUFaLEVBQWdCLFdBQWhCLEVBQXNCLFFBQVEsZ0JBQUN2RSxLQUFEO0FBQUEsdUJBQVcsOEJBQUMsY0FBRCxFQUFVQSxLQUFWLENBQVg7QUFBQSxhQUE5QixHQURKO0FBRUksc0NBQUMscUJBQUQsSUFBTyxNQUFLLE9BQVosRUFBb0IsV0FBcEIsRUFBMEIsUUFBUSxnQkFBQ0EsS0FBRDtBQUFBLHVCQUFXLDhCQUFDLGNBQUQsRUFBVUEsS0FBVixDQUFYO0FBQUEsYUFBbEMsR0FGSjtBQUdJLHNDQUFDLHFCQUFELElBQU8sTUFBSyxRQUFaLEVBQXFCLFdBQXJCLEVBQTJCLFFBQVEsZ0JBQUNBLEtBQUQ7QUFBQSx1QkFBVyw4QkFBQyxlQUFELEVBQVdBLEtBQVgsQ0FBWDtBQUFBLGFBQW5DLEdBSEo7QUFJSSxzQ0FBQyxxQkFBRCxJQUFPLFFBQVEsZ0JBQUNBLEtBQUQ7QUFBQSx1QkFBVyw4QkFBQyxrQkFBRCxFQUFjQSxLQUFkLENBQVg7QUFBQSxhQUFmO0FBSkosS0FESjtBQVFILEM7Ozs7Ozs7Ozs7O0FDakJELGtDOzs7Ozs7Ozs7OztBQ0FBLDJDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLDRDOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLDZDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NlcnZlci9zZXJ2ZXIuanNcIik7XG4iLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IGFwcCBmcm9tICcuLi9zZXJ2ZXInXG5pbXBvcnQgRXhwZW5zZXMgZnJvbSAnLi4vbW9kZWxzL2V4cGVuc2VNb2RlbCc7XG5pbXBvcnQgVXNlcnMgZnJvbSAnLi4vbW9kZWxzL3VzZXJNb2RlbCc7XG5pbXBvcnQgeyBNT05USCwgWUVBUiwgV0VFSyB9IGZyb20gJy4uLy4uL3NyYy9wYWdlcy9jb25zdGFudHMvY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IHNpZ25VcCA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIC8vIFVzZXJzLmRlbGV0ZU1hbnkoe30pO1xuICAgIGNvbnN0IHsgdXNlcm5hbWUgPSAnJywgcGFzc3dvcmQgPSAnJywgZW1haWxJZCA9ICcnIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgdmFyIHVzZXIgPSBuZXcgVXNlcnMoe1xuICAgICAgICBfaWQ6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKCksXG4gICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICBlbWFpbElkOiBlbWFpbElkXG4gICAgfSk7XG4gICAgVXNlcnMuZmluZCh7IHVzZXJuYW1lOiB1c2VybmFtZSB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IHRydWUsIG1zZzogJ1VzZXJuYW1lIGFscmVhZHkgRXhpc3RzJyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oKGRvYykgPT4ge1xuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID0gZG9jLl9pZDtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IGZhbHNlLCBtc2c6ICdTYXZlZCBTdWNjZXNzZnVsbHknIH0pO1xuICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zdGF0dXMoNTAwKS5zZW5kKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCAoZSkgPT4ge1xuICAgICAgICByZXNwb25zZS5zZW5kKGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaWduSW4gPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCB7IHVzZXJuYW1lID0gJycsIHBhc3N3b3JkID0gJycsIGVtYWlsSWQgPSAnJyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGNvbnNvbGUubG9nKHJlcXVlc3Quc2Vzc2lvbi51c2VyKTtcbiAgICBVc2Vycy5maW5kKHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVxdWVzdC5zZXNzaW9uLl91c2VySWQgPSByZXNbMF0uX2lkO1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiBmYWxzZSwgbXNnOiAnc3VjY2VzcycgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IHRydWUsIG1zZzogJ05vIHVzZXIgYWNjb3VudCBmb3VuZCcgfSk7XG4gICAgICAgIH1cbiAgICB9LCAoZSkgPT4ge1xuICAgICAgICByZXNwb25zZS5zZW5kKGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBuZXdFeHBlbnNlID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgbGV0IHsgYW1vdW50LCBjYXRlZ29yeSwgZGF0ZSwgdHlwZSB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGFtb3VudCA9IHBhcnNlSW50KGFtb3VudCk7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIGNvbnN0IHd3ID0gTWF0aC5jZWlsKGRhdGUuZ2V0RGF0ZSgpIC8gNyk7XG4gICAgY29uc3QgZG93ID0gZGF0ZS5nZXREYXkoKSArIDE7XG4gICAgY29uc3QgbW0gPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IHl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IGRkID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgY29uc3QgbmV3RXhwZW5zZSA9IHsgYW1vdW50LCBjYXRlZ29yeSwgZGF0ZSwgdHlwZSwgd3csIGRvdywgbW0sIHl5LCBkZH07XG4gICAgdmFyIG5ld0V4cGVuc2VJbnN0YW5jZSA9IG5ldyBFeHBlbnNlcyh7XG4gICAgICAgIHVzZXJfaWQ6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKFwiNWMxNjMwYWQ3NjY5ZWEyYzliYjA0NjE2XCIpLFxuICAgICAgICAuLi5uZXdFeHBlbnNlXG4gICAgfSk7XG4gICAgbmV3RXhwZW5zZUluc3RhbmNlLnNhdmUoKS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgLy8gcmVxdWVzdC5zZXNzaW9uLnVzZXIgPSBkb2MudXNlcm5hbWU7XG4gICAgICAgIHJlc3BvbnNlLnNlbmQoZG9jKTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gc2F2ZSBuZXcgRXhwZW5zZScsIGVycik7XG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyg1MDApLnNlbmQoZXJyKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRGF0YSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IHJlcXVlc3Quc2Vzc2lvbi51c2VyX2lkID8gbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQocmVxdWVzdC5zZXNzaW9uLnVzZXJfaWQpIDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoXCI1YzE2MzBhZDc2NjllYTJjOWJiMDQ2MTZcIik7XG4gICAgZnVuY3Rpb24gZXhwZW5zZURhdGVSZXNwb25kZXIoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJlc3BvbmQuc2VuZCg1MDApLnNlbmQoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBleHBlbnNlTGlzdCwgaW5jb21lTGlzdDtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFba2V5XS50eXBlID09PSAnZXhwZW5zZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZW5zZUxpc3QgPSBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhW2tleV0udHlwZSA9PT0gJ2luY29tZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jb21lTGlzdCA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBzcGVudCwgc3RhbmRpbmc7XG4gICAgICAgICAgICBpZiAoZXhwZW5zZUxpc3QpIHtcbiAgICAgICAgICAgICAgICBleHBlbnNlTGlzdC50cmFuc2FjdGlvbkxpc3QubWFwKCh0cmFuc2FjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyY2VudCA9IHRyYW5zYWN0aW9uLmFtb3VudCAvIChleHBlbnNlTGlzdC5hbW91bnQgLyAxMDApO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5wZXJjZW50ID0gTWF0aC5yb3VuZChwZXJjZW50ICogMTAwKSAvIDEwMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzcGVudCA9IGV4cGVuc2VMaXN0LmFtb3VudDtcbiAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgIHNwZW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmNvbWVMaXN0KSB7XG4gICAgICAgICAgICAgICAgaW5jb21lTGlzdC50cmFuc2FjdGlvbkxpc3QubWFwKCh0cmFuc2FjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyY2VudCA9IHRyYW5zYWN0aW9uLmFtb3VudCAvIChpbmNvbWVMaXN0LmFtb3VudCAvIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLnBlcmNlbnQgPSBNYXRoLnJvdW5kKHBlcmNlbnQgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YW5kaW5nID0gaW5jb21lTGlzdC5hbW91bnQgLSBzcGVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhbmRpbmcgPSAwIC0gc3BlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHNwZW50LCBzdGFuZGluZyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFF1ZXJpZXMgc3RhcnRcbiAgICBjb25zdCBncm91cDEgPSB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7IGNhdGVnb3J5OiAnJGNhdGVnb3J5JywgdHlwZTogJyR0eXBlJyB9LFxuICAgICAgICAgICAgdHlwZTogeyAnJGZpcnN0JzogJyR0eXBlJyB9LFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHsgJyRmaXJzdCc6ICckY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJHN1bTogJyRhbW91bnQnIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZ3JvdXAyID0ge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDogeyB0eXBlOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJHN1bTogJyRhbW91bnQnIH0sXG4gICAgICAgICAgICB0eXBlOiB7ICckZmlyc3QnOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3Q6IHsgJHB1c2g6IHsgY2F0ZWdvcnk6ICckY2F0ZWdvcnknLCBhbW91bnQ6ICckYW1vdW50JyB9IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgdW53aW5kID0geyAkdW53aW5kOiAnJHRyYW5zYWN0aW9uTGlzdCcgfTtcbiAgICBjb25zdCBzb3J0ID0geyAkc29ydDogeyAndHJhbnNhY3Rpb25MaXN0LmFtb3VudCc6IC0xIH0gfVxuICAgIGNvbnN0IHJlR3JvdXAgPSB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7IHR5cGU6ICckdHlwZScgfSxcbiAgICAgICAgICAgIGFtb3VudDogeyAnJGZpcnN0JzogJyRhbW91bnQnIH0sXG4gICAgICAgICAgICB0eXBlOiB7ICckZmlyc3QnOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3Q6IHsgJHB1c2g6ICckdHJhbnNhY3Rpb25MaXN0JyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIFF1ZXJpZXMgZW5kXG5cbiAgICBjb25zdCB7IHRhYiwgd3csIG1tLCB5eSwgZG93IH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgaWYgKHRhYiA9PT0gWUVBUikge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IE1PTlRIKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0seyAkbWF0Y2g6IHsgbW06IHBhcnNlSW50KG1tKSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IFdFRUspIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9IH0sXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB5eTogcGFyc2VJbnQoeXkpIH0gfSx7ICRtYXRjaDogeyBtbTogcGFyc2VJbnQobW0pIH0gfSx7ICRtYXRjaDogeyB3dzogcGFyc2VJbnQod3cpIH0gfSxcbiAgICAgICAgICAgIHsgLi4uZ3JvdXAxIH0seyAuLi5ncm91cDIgfSxcbiAgICAgICAgICAgIHsgLi4udW53aW5kIH0seyAuLi5zb3J0IH0seyAuLi5yZUdyb3VwIH0sXG4gICAgICAgICAgICB7ICRwcm9qZWN0OiB7IF9pZDogMCwgYW1vdW50OiAxLCB0eXBlOiAxLCB0cmFuc2FjdGlvbkxpc3Q6IDEgfSB9XG4gICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4cGVuc2VEYXRlUmVzcG9uZGVyKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVN1bW1hcnkgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBmdW5jdGlvbiBleGVjU3VtbWFyeVF1ZXJ5KGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZXNwb25kLnNlbmQoNTAwKS5zZW5kKGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhWzBdICYmIGRhdGFbMF0ucGVyRGl2aXNpb25EYXRhKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1heEFtb3VudCA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSO1xuICAgICAgICAgICAgICAgIGRhdGFbMF0ucGVyRGl2aXNpb25EYXRhLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF4QW1vdW50IDwgZW50cnkuYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhBbW91bnQgPSBlbnRyeS5hbW91bnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRhdGFbMF0ubWF4QW1vdW50ID0gbWF4QW1vdW50O1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoey4uLmRhdGFbMF19KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHVzZXJJZCA9IHJlcXVlc3Quc2Vzc2lvbi51c2VyX2lkID8gbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQocmVxdWVzdC5zZXNzaW9uLnVzZXJfaWQpIDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoXCI1YzE2MzBhZDc2NjllYTJjOWJiMDQ2MTZcIik7XG4gICAgY29uc3Qge3RhYiwgeXksIG1tLCB3d30gPSByZXF1ZXN0LmJvZHk7XG4gICAgaWYgKHRhYiA9PT0gWUVBUikge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHl5OiB5eX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB0eXBlOiAnZXhwZW5zZSd9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiB7IG1tOiAnJG1tJ30sIGFtb3VudDogeyRzdW06ICckYW1vdW50J30sIG1vbnRoOiB7JyRmaXJzdCc6ICckbW0nfX19LFxuICAgICAgICAgICAgeyRzb3J0OiB7IG1vbnRoOiAxIH19LFxuICAgICAgICAgICAgeyRncm91cDoge19pZDogbnVsbCwgdG90YWxBbW91bnQ6IHsnJHN1bSc6ICckYW1vdW50J30sIHBlckRpdmlzaW9uRGF0YTogeyRwdXNoIDogeyBhbW91bnQ6ICckYW1vdW50JywgZGl2aXNpb246ICckbW9udGgnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDogMH19XG4gICAgICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleGVjU3VtbWFyeVF1ZXJ5KTtcbiAgICB9IGVsc2UgaWYgKHRhYiA9PT0gTU9OVEgpIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkIH19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB5eTogeXl9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgbW06IG1tfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHR5cGU6ICdleHBlbnNlJ319LFxuICAgICAgICAgICAgeyRncm91cDogeyBfaWQ6IHtkZDogJyRkZCd9LCBhbW91bnQ6IHsnJHN1bSc6ICckYW1vdW50J30sIGRkOiB7JyRmaXJzdCc6ICckZGQnfSB9fSxcbiAgICAgICAgICAgIHskc29ydDoge2RkOiAxfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7X2lkOiBudWxsLCB0b3RhbEFtb3VudDogeyckc3VtJzogJyRhbW91bnQnfSwgcGVyRGl2aXNpb25EYXRhOiB7JHB1c2g6IHthbW91bnQ6ICckYW1vdW50JywgZGl2aXNpb246ICckZGQnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDowfX1cbiAgICAgICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4ZWNTdW1tYXJ5UXVlcnkpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBXRUVLKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgeXk6IHl5fX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IG1tOiBtbX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB3dzogd3d9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdHlwZTogJ2V4cGVuc2UnfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7IF9pZDoge2RvdzogJyRkb3cnfSwgYW1vdW50OiB7JHN1bTogJyRhbW91bnQnfSwgZG93OiB7JyRmaXJzdCc6ICckZG93J319fSxcbiAgICAgICAgICAgIHskc29ydDogeyBkb3c6IDF9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiBudWxsLCB0b3RhbEFtb3VudDogeyRzdW06ICckYW1vdW50J30sICBwZXJEaXZpc2lvbkRhdGE6IHskcHVzaDoge2Ftb3VudDogJyRhbW91bnQnLCBkaXZpc2lvbjogJyRkb3cnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDogMH19XG4gICAgICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleGVjU3VtbWFyeVF1ZXJ5KTtcbiAgICB9XG59IiwidmFyIGVudiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCc7XG5cbmlmIChlbnYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgcHJvY2Vzcy5lbnYuUE9SVCA9IDQwMDA7XG4gIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSA9ICdtb25nb2RiOi8vbG9jYWxob3N0OjI3MDE3L2V4cGVuc2UnO1xufSBlbHNlIHtcbiAgcHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJID0gJ21vbmdvZGI6Ly9kaGlsaXBrMTM6ZGhpbGlwazEzQGRzMjQ3MzEwLm1sYWIuY29tOjQ3MzEwL2V4cGVuc2UnO1xufVxuZXhwb3J0IGRlZmF1bHQgZW52OyIsInZhciBtb25nb29zZTEgPSByZXF1aXJlKCdtb25nb29zZScpO1xubW9uZ29vc2UxLlByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbm1vbmdvb3NlMS5jb25uZWN0KHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSwgeyB1c2VOZXdVcmxQYXJzZXI6IHRydWUgfSkudGhlbigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB0byBEYicpO1xufSwoZSk9PiB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0ge21vbmdvb3NlMX07IiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBVc2VycyBmcm9tICcuL3VzZXJNb2RlbCc7XG5cbmNvbnN0IEV4cGVuc2VzID0gbW9uZ29vc2UubW9kZWwoJ0V4cGVuc2VzJywge1xuICB1c2VyX2lkOiB7XG4gICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuICAgIHJlZjogJ1VzZXJzJ1xuICB9LFxuICBhbW91bnQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZVxuICB9LFxuICBjYXRlZ29yeToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0cmltOiB0cnVlLFxuICAgICAgZGVmYXVsdDogJ290aGVycydcbiAgfSxcbiAgdHlwZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZSxcbiAgICBkZWZhdWx0OiAnZXhwZW5zZSdcbiAgfSxcbiAgZGF0ZToge1xuICAgIHR5cGU6IERhdGUsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWUsXG4gICAgZGVmYXVsdDogRGF0ZS5ub3coKVxuICB9LFxuICBkZDoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICB3dzoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICBkb3c6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgbW06IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgeXk6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfVxufSk7XG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlczsiLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IEV4cGVuc2VzIGZyb20gJy4vZXhwZW5zZU1vZGVsJztcblxuY29uc3QgVXNlcnMgPSBtb25nb29zZS5tb2RlbCgnVXNlcnMnLCB7XG4gICAgX2lkOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG4gICAgdXNlcm5hbWU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWlubGVuZ3RoOiA1LFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBlbWFpbElkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW5sZW5ndGg6IDgsXG4gICAgICAgIHRyaW06IHRydWVcbiAgICB9LFxuICAgIGV4cGVuc2U6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLCBcbiAgICAgICAgICAgIHJlZjogJ0V4cGVuc2VzJ1xuICAgICAgICB9XG4gICAgXVxufSk7XG5leHBvcnQgZGVmYXVsdCBVc2VyczsiLCJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCBlbnYgZnJvbSAnLi9jb25maWcvY29uZmlnJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTVNlcnZlciBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG52YXIgc2Vzc2lvbiA9IHJlcXVpcmUoJ2V4cHJlc3Mtc2Vzc2lvbicpO1xuXG5pbXBvcnQgQXBwIGZyb20gJy4uL3NyYy9hcHAnXG5pbXBvcnQgbW9uZ29vc2UxIGZyb20gJy4vZGIvbW9uZ29vc2UnO1xuaW1wb3J0IHtzaWduVXAsIHNpZ25JbiwgbmV3RXhwZW5zZSwgZ2V0RXhwZW5zZURhdGEsIGdldEV4cGVuc2VTdW1tYXJ5fSBmcm9tICcuL2FwaS9hcGlDYWxscyc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUO1xuXG5hcHAudXNlKHNlc3Npb24oe1xuICAgIHNlY3JldDogJ2RoaWxpcExvY2FsJyxcbiAgICByZXNhdmU6IGZhbHNlLFxuICAgIHNhdmVVbmluaXRpYWxpemVkOiB0cnVlXG59KSlcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYygnYnVpbGQvcHVibGljJykpO1xuYXBwLnVzZSgnL3N0eWxlcycsIGV4cHJlc3Muc3RhdGljKCdzcmMvcGFnZXMvc3R5bGVzJykpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYygnc3JjL3BhZ2VzL3N0YXRpYycpKTtcblxuLy8gQVBJIENhbGxzXG5hcHAucG9zdCgnL3NpZ251cCcsIHNpZ25VcCk7XG5hcHAucG9zdCgnL3NpZ25pbicsIHNpZ25Jbik7XG5hcHAucG9zdCgnL25ld19leHBlbnNlJywgbmV3RXhwZW5zZSk7XG5hcHAucG9zdCgnL2dldF9leHBlbnNlX2RhdGEnLCBnZXRFeHBlbnNlRGF0YSk7XG5hcHAucG9zdCgnL2dldF9leHBlbnNlX3N1bW1hcnknLCBnZXRFeHBlbnNlU3VtbWFyeSk7XG5cbmNvbnN0IGxvYWRIdG1sID0gKGNvbnRlbnQpID0+IHtcbiAgICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG4gICAgcmV0dXJuIChgXG4gICAgICAgIDxodG1sPlxuICAgICAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICAgICAgJHtoZWxtZXQubWV0YS50b1N0cmluZygpfVxuICAgICAgICAgICAgICAgICR7aGVsbWV0LnRpdGxlLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3R3aXR0ZXItYm9vdHN0cmFwLzQuMS4zL2Nzcy9ib290c3RyYXAubWluLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvdHdpdHRlci1ib290c3RyYXAvNC4xLjMvanMvYm9vdHN0cmFwLmJ1bmRsZS5taW4uanNcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvY29tbW9uLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9ob21lLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9uZXdfZXhwZW5zZS5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2Fuc1wiIHJlbD1cInN0eWxlc2hlZXRcIj5cbiAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgIDxib2R5PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyb290XCI+JHtjb250ZW50fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiY2xpZW50X2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICAgICAgPC9ib2R5PlxuICAgICAgICA8L2h0bWw+YCk7XG59O1xuXG5hcHAuZ2V0KCcqJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHt9O1xuICAgIGNvbnN0IGNvbnRlbnQgPSBSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0cmluZyhcbiAgICAgICAgPFN0YXRpY1JvdXRlcj5cbiAgICAgICAgICAgIDxBcHAgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9IC8+XG4gICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICk7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBsb2FkSHRtbChjb250ZW50KTtcbiAgICByZXMuc2VuZCh0ZW1wbGF0ZSk7XG59KTtcblxuYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ3Byb2Nlc3MuZW52JywgcG9ydCk7XG4gICAgY29uc29sZS5sb2coJ1NlcnZlciBTdGFydGVkIG9uIFBvcnQ6ICcsIHBvcnQpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwcDsiLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN3aXRjaCwgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IEhvbWUgZnJvbSAnLi9wYWdlcy9jb21wb25lbnRzL0xvZ2luJztcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi9wYWdlcy9yb3V0ZXMvcm91dGVzJztcbmltcG9ydCB7U2VydmVyUm91dGVyfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Um91dGVzLz5cbiAgICAgICAgKTtcbiAgICB9XG59IiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGNvbnN0IHNpZ251cCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9zaWdudXAvJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBzaWduaW4gPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvc2lnbmluLyc7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgey4uLnBhcmFtc30pO1xufVxuXG5leHBvcnQgY29uc3QgbmV3X2V4cGVuc2UgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvbmV3X2V4cGVuc2UvJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRfZXhwZW5zZV9kYXRhID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL2dldF9leHBlbnNlX2RhdGEvJyA7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgcGFyYW1zKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldF9leHBlbnNlX3N1bW1hcnkgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvZ2V0X2V4cGVuc2Vfc3VtbWFyeS8nIDtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCBwYXJhbXMpO1xufVxuIiwiXG5jb25zdCBXSURUSCA9IDE1MDtcbmNvbnN0IEhFSUdIVCA9IDEwMDtcblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0RJVklTSU9OTEVOR1RIfSBmcm9tICcuLi9jb25zdGFudHMvY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmdlbmVyYXRlU1ZHID0gdGhpcy5nZW5lcmF0ZVNWRy5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29ucmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFsZXJ0KCdhdHRhY2hFdmVudCAtIHJlc2l6ZScpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVTVkcoKSB7XG4gICAgY29uc3Qge3Bsb3REYXRhLCB0YWJ9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB4Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICBjb25zdCB5Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICBjb25zdCBsZW5ndGggPSBESVZJU0lPTkxFTkdUSFt0YWJdO1xuICAgIGNvbnN0IG1heEFtdCA9IHBsb3REYXRhLm1heEFtb3VudDtcbiAgICBjb25zdCB4Q29vcmRpbmF0ZURpdkxlbmd0aCA9IChXSURUSCAvIChsZW5ndGggKyAyKSk7XG4gICAgbGV0IGxhc3REaXZpc2lvbiA9IDA7XG4gICAgbGV0IHN0ciA9ICcnO1xuXG4gICAgLyogVG8gc3RhcnQgdGhlIGdyYXBoIGF0IHRoZSBMZWFzdCBQb2ludCAqL1xuICAgIHhDb29yZGluYXRlcy5wdXNoKDApO1xuICAgIHlDb29yZGluYXRlcy5wdXNoKEhFSUdIVCk7XG4gICAgcGxvdERhdGEucGVyRGl2aXNpb25EYXRhLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICB3aGlsZSAoZW50cnkuZGl2aXNpb24gPiBsYXN0RGl2aXNpb24pIHtcbiAgICAgICAgY29uc3QgbGFzdFggPSB4Q29vcmRpbmF0ZXNbeENvb3JkaW5hdGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICB4Q29vcmRpbmF0ZXMucHVzaCgobGFzdFggKyB4Q29vcmRpbmF0ZURpdkxlbmd0aCkpO1xuICAgICAgICBpZiAoZW50cnkuZGl2aXNpb24gPT09IGxhc3REaXZpc2lvbiArIDEpIHtcbiAgICAgICAgICBjb25zdCBwZXJjZW50ID0gKChlbnRyeS5hbW91bnQgLyBtYXhBbXQpICogMTAwKTtcbiAgICAgICAgICB5Q29vcmRpbmF0ZXMucHVzaChIRUlHSFQgLSAoKEhFSUdIVCAvIDEwMCkgKiBwZXJjZW50KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0RGl2aXNpb24gPSBsYXN0RGl2aXNpb24gKyAxO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGxhc3RYID0geENvb3JkaW5hdGVzW3hDb29yZGluYXRlcy5sZW5ndGggLSAxXTtcbiAgICB4Q29vcmRpbmF0ZXMucHVzaCgobGFzdFggKyB4Q29vcmRpbmF0ZURpdkxlbmd0aCkpO1xuICAgIHlDb29yZGluYXRlcy5wdXNoKEhFSUdIVCk7XG4gXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB4Q29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN0ciArPSAnICcgKyB4Q29vcmRpbmF0ZXNbaV0gKyAnLCcgKyB5Q29vcmRpbmF0ZXNbaV0gKyAnICc7XG4gICAgfVxuICAgIGlmIChzdHIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PXsnMCAwICcgKyBXSURUSCArICcgJyArIEhFSUdIVH0gc3R5bGU9e3ttYXJnaW46ICcyMHB4J319PlxuICAgICAgICAgICAgPHBvbHlsaW5lIHBvaW50cz17c3RyfSBjbGFzc05hbWU9XCJncmFwaFBsb3RMaW5lXCIgLz5cbiAgICAgICAgICAgIHsvKiA8ZyBzdHlsZT17e3N0cm9rZTogJyNjY2MnLCBzdHJva2VEYXNoYXJyYXk6IDAsIHN0cm9rZVdpZHRoOiAxfX0+XG4gICAgICAgICAgICAgIDxsaW5lIHgxPVwiMFwiIHkxPVwiMjAwXCIgeDI9XCIwXCIgeTI9XCIwXCI+PC9saW5lPlxuICAgICAgICAgICAgPC9nPiAqL31cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5nZW5lcmF0ZVNWRygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IE5ld0V4cGVuc2UgZnJvbSAnLi9OZXdFeHBlbnNlJztcbmltcG9ydCB7Z2V0X2V4cGVuc2VfZGF0YSwgZ2V0X2V4cGVuc2Vfc3VtbWFyeX0gZnJvbSAnLi4vYXBpQ2FsbHMvQXBpQ2FsbHMnO1xuaW1wb3J0IHtNT05USCwgWUVBUiwgV0VFS30gZnJvbSAnLi4vY29uc3RhbnRzL2NvbnN0YW50cyc7XG5pbXBvcnQgR3JhcGggZnJvbSAnLi9HcmFwaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmxlZnRNZW51Q2xpY2sgPSB0aGlzLmxlZnRNZW51Q2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm5ld0V4cGVuc2UgPSB0aGlzLm5ld0V4cGVuc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm5hdmlnYXRlVG9TaWduSW4gPSB0aGlzLm5hdmlnYXRlVG9TaWduSW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYWN0aXZlVGFiOiBNT05USCxcbiAgICAgIHNob3dOZXdFeHBlbnNlOiBmYWxzZSxcbiAgICAgIHN0YW5kaW5nOiB1bmRlZmluZWQsXG4gICAgICBzcGVudDogdW5kZWZpbmVkLFxuICAgICAgZXhwZW5zZUxpc3Q6IHt9LFxuICAgICAgaW5jb21lTGlzdDoge30sXG4gICAgICB2aWV3TW9yZTogZmFsc2VcbiAgICB9XG4gICAgdGhpcy52aWV3ZWRNb3JlID0ge307XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5nZXRFeHBlbnNlKCk7XG4gICAgdGhpcy5nZXRFeHBlbnNlU3VtbWFyeSgpO1xuICB9XG5cbiAgZ2V0RXhwZW5zZVN1bW1hcnkoKSB7XG4gICAgY29uc3QgdGFiID0gdGhpcy5zdGF0ZS5hY3RpdmVUYWI7XG4gICAgY29uc3QgbW0gPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IGRvdyA9IG5ldyBEYXRlKCkuZ2V0RGF5KCk7XG4gICAgY29uc3Qgd3cgPSBNYXRoLmNlaWwobmV3IERhdGUoKS5nZXREYXRlKCkgLyA3KTtcbiAgICBjb25zdCB5eSA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7dGFiLCBtbSwgZG93LCB3dywgeXl9O1xuICAgIGdldF9leHBlbnNlX3N1bW1hcnkocGFyYW1zKS50aGVuKChyZXNwKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtwbG90RGF0YTogey4uLnJlc3AuZGF0YX19KTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIEdldCBFeHBlbnNlIFN1bW1hcnkgRGV0YWlscycsIGVycik7XG4gICAgfSk7XG4gIH1cblxuICBnZXRFeHBlbnNlKCkge1xuICAgIGxldCBleHBlbnNlTGlzdCA9IHt9LCBpbmNvbWVMaXN0ID0ge30sIHN0YW5kaW5nID0nJztcbiAgICBjb25zdCB0YWIgPSB0aGlzLnN0YXRlLmFjdGl2ZVRhYjtcbiAgICBjb25zdCBtbSA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgZG93ID0gbmV3IERhdGUoKS5nZXREYXkoKTtcbiAgICBjb25zdCB3dyA9IE1hdGguY2VpbChuZXcgRGF0ZSgpLmdldERhdGUoKSAvIDcpO1xuICAgIGNvbnN0IHl5ID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHt0YWIsIG1tLCBkb3csIHd3LCB5eX07XG4gICAgZ2V0X2V4cGVuc2VfZGF0YShwYXJhbXMpLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgY29uc3Qge2V4cGVuc2VMaXN0LCBpbmNvbWVMaXN0LCBzdGFuZGluZywgc3BlbnR9ID0gcmVzcC5kYXRhO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHN0YW5kaW5nLCBzcGVudH0pO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gR2V0IEV4cGVuc2UgRGV0YWlscycsIGVycik7XG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KGFjdGl2ZVRhYikge1xuICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZVRhYjogYWN0aXZlVGFiLCB2aWV3TW9yZTogZmFsc2V9LCAoKSA9PiB7XG4gICAgICB0aGlzLmdldEV4cGVuc2UoKTtcbiAgICAgIHRoaXMuZ2V0RXhwZW5zZVN1bW1hcnkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxlZnRNZW51Q2xpY2soKSB7XG4gICAgdGhpcy5yZWZzLmJhY2tEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2JhY2tEcm9wJyk7XG4gICAgdGhpcy5yZWZzLnBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ3JpZ2h0MCcpO1xuICAgIHRoaXMucmVmcy5maXJzdEhhbGZMYW5kaW5nVHh0LmNsYXNzTGlzdC50b2dnbGUoJ3NjYWxlOTAnKTtcbiAgICB0aGlzLnJlZnMub3RoZXJIYWxmTGFuZGluZ1R4dC5jbGFzc0xpc3QudG9nZ2xlKCdzY2FsZTkwJyk7XG4gIH1cblxuICBuYXZpZ2F0ZVRvU2lnbkluKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMpO1xuICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvbG9naW4nKTtcbiAgfVxuXG4gIHJlbmRlckxlZnRNZW51QmFyKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudUJhclwiPlxuICAgICAgICA8ZGl2IHJlZj1cInBvcHVwXCJjbGFzc05hbWU9XCJwb3B1cCB6aTIgXCIgb25DbGljaz17dGhpcy5sZWZ0TWVudUNsaWNrfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGVCYXIgaW4tYmwgZmxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIj5TZXR0aW5nczwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51LW9wdGlvblwiIG9uQ2xpY2s9e3RoaXMubmF2aWdhdGVUb1NpZ25Jbn0+U2lnbiBJbjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51LW9wdGlvblwiPkFib3V0IE1lPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIG5ld0V4cGVuc2UodmFsKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2hvd05ld0V4cGVuc2U6IHZhbH0pO1xuICB9XG5cbiAgY2xpY2tWaWV3TW9yZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt2aWV3TW9yZTogIXRoaXMuc3RhdGUudmlld01vcmV9KTtcbiAgICB0aGlzLnJlZnMudHJhbnNhY3RlZENhcmQuc2Nyb2xsVG9wID0gMFxuICB9XG5cbiAgcmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuc3RhdGUuZXhwZW5zZUxpc3QudHJhbnNhY3Rpb25MaXN0Lm1hcCgodHJhbnNhY3Rpb24sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnZpZXdNb3JlIHx8IHRoaXMudmlld2VkTW9yZVt0aGlzLnN0YXRlLmFjdGl2ZVRhYl0gfHwgIXRoaXMuc3RhdGUudmlld01vcmUgJiYgaW5kZXggPCAyKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdGUudmlld01vcmUpIHtcbiAgICAgICAgICAgIHRoaXMudmlld2VkTW9yZVt0aGlzLnN0YXRlLmFjdGl2ZVRhYl0gPSB0cnVlOyAvLyBUbyBub3QgcmVtb3ZlIGVsZW1lbnQgZnJvbSBET00gb24gY2xpY2tpbmcgdmlldyBNb3JlIGFnYWluXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17J3RyYW5zYWN0aW9uX3R5cGVfJyArIGluZGV4fSBjbGFzc05hbWU9XCJ0cmFuc2FjdGVkQ2FyZElubmVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZElubmVyaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9uYW1lXCI+e3RyYW5zYWN0aW9uLmNhdGVnb3J5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRfcGVyY2VudCBcIj57dHJhbnNhY3Rpb24ucGVyY2VudCArICcgJSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIHsvKiA8c3BhbiBjbGFzc05hbWU9XCJjYXRfbmFtZSBsb2FkZXJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0X3BlcmNlbnQgbG9hZGVyXCI+PC9zcGFuPiAqL31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZ3Jlc3NCYXIgYmwgdGV4dENlbnRlciBtYXJnaW5UMjVcIiA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWxsZWRcIiBzdHlsZT0ge3ttYXhXaWR0aDogdHJhbnNhY3Rpb24ucGVyY2VudCArICclJ319PlxuICAgICAgICAgICAgICAgICAgey8qIDxkaXYgY2xhc3NOYW1lPVwiZmlsbGVkXCIgPjwvZGl2PiAqL31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9KVxuICApO1xuICB9XG5cbiAgZ2V0VHJhbnNhY3Rpb25DYXJkKCkge1xuICAgIGNvbnN0IHthY3RpdmVUYWIsIHZpZXdNb3JlID0gZmFsc2V9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAodGhpcy5zdGF0ZS5leHBlbnNlTGlzdCAmJiBPYmplY3Qua2V5cyh0aGlzLnN0YXRlLmV4cGVuc2VMaXN0KS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgcmVmPVwidHJhbnNhY3RlZENhcmRcIiBjbGFzc05hbWU9eyd0cmFuc2FjdGVkQ2FyZCB0cmFuc2l0aW9uMWEgJyArICh2aWV3TW9yZSA/ICdzaG93QWxsVHJhbnNhY3Rpb24nIDogJycpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhbnNhY3RTY3JvbGxlclwiPlxuICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBXRUVLID8gdGhpcy5yZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZCgpIDogbnVsbH1cbiAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gTU9OVEggPyB0aGlzLnJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKCkgOiBudWxsfVxuICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBZRUFSID8gdGhpcy5yZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZCgpIDogbnVsbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlld01vcmVBcnJvd1wiIG9uQ2xpY2s9eygpID0+IHRoaXMuY2xpY2tWaWV3TW9yZSgpfT5cbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPXt2aWV3TW9yZSA/ICdyb3RhdGVWaWV3TW9yZScgOiAnJ30gcmVmPVwic3ZnVmlld01vcmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTcuNDEgNy44NEwxMiAxMi40Mmw0LjU5LTQuNThMMTggOS4yNWwtNiA2LTYtNnpcIi8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7YWN0aXZlVGFiLCBzaG93TmV3RXhwZW5zZSwgc3RhbmRpbmcgPSB1bmRlZmluZWQsIHNwZW50ID0gdW5kZWZpbmVkLCB2aWV3TW9yZSA9IGZhbHNlLCBwbG90RGF0YX0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgcmVmPVwiYmFja0Ryb3BcIiBjbGFzc05hbWU9eyd0cmFuc2l0aW9uMmEgemkxICcgKyAoc2hvd05ld0V4cGVuc2UgPyAnYmFja0Ryb3AnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLm5ld0V4cGVuc2UoZmFsc2UpfT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJMZWZ0TWVudUJhcigpfVxuICAgICAgICAgIDxkaXYgcmVmPVwibWFpbkNvbnRlbnRcIiBjbGFzc05hbWU9XCJtYWluQ29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXJzdC1oYWxmLWxhbmRpbmdcIj5cbiAgICAgICAgICAgICAgPGRpdiByZWY9XCJmaXJzdEhhbGZMYW5kaW5nVHh0XCIgY2xhc3NOYW1lPVwidHJhbnNpdGlvbjBfNSBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YW5kaW5nXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsZWZ0LW1lbnUtY29udGFpbmVyXCIgb25DbGljaz17dGhpcy5sZWZ0TWVudUNsaWNrfT48aW1nIGNsYXNzTmFtZT1cImxlZnQtbWVudVwiIHNyYz1cIi9pbWcvbWVudS5zdmdcIi8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgey8qIDxzcGFuIGNsYXNzTmFtZT1cInJpZ2h0LW1lbnUtY29udGFpbmVyXCIgb25DbGljaz17KCkgPT4ge3RoaXMuc2V0U3RhdGUoe3Zpc2libGVSaWdodE1lbnU6IHRydWV9KX19PjxpbWcgY2xhc3NOYW1lPVwicmlnaHQtbWVudVwiIHNyYz1cIi9pbWcvbWVudS5zdmdcIi8+PC9zcGFuPiAqL31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRpbmdcIj5FeHBlbnNlIEhvbWU8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj57J1N0YW5kaW5nIDog4oK5JyArICh0eXBlb2Yoc3RhbmRpbmcpICE9PSAndW5kZWZpbmVkJyA/IHN0YW5kaW5nIDogJzAnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2VEYXlzQnRuXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBXRUVLID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdChXRUVLKX19PldlZWs8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBNT05USCA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHt0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoTU9OVEgpfX0+TW9udGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBZRUFSID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdChZRUFSKX19PlllYXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViSGVhZGluZ1wiPnsnU3BlbnQgOiDigrknICsgKHR5cGVvZihzcGVudCkgIT09ICd1bmRlZmluZWQnPyBzcGVudDogJzAnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRUcmFuc2FjdGlvbkNhcmQoKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtwbG90RGF0YSAmJiBwbG90RGF0YS5wZXJEaXZpc2lvbkRhdGEgJiYgIHBsb3REYXRhLnBlckRpdmlzaW9uRGF0YS5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdGhlci1oYWxmLWxhbmRpbmdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj1cIm90aGVySGFsZkxhbmRpbmdUeHRcIiBjbGFzc05hbWU9XCJ0cmFuc2l0aW9uMF81IFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIHRyU3VtYXJ5SGVhZGluZyBmYlwiID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+eydFeHBlbnNlIFRyZW5kcyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBXRUVLID8gIDxHcmFwaCBwbG90RGF0YT17cGxvdERhdGF9IHRhYj17YWN0aXZlVGFifS8+IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IE1PTlRIID8gIDxHcmFwaCBwbG90RGF0YT17cGxvdERhdGF9IHRhYj17YWN0aXZlVGFifS8+IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IFlFQVIgPyAgPEdyYXBoIHBsb3REYXRhPXtwbG90RGF0YX0gdGFiPXthY3RpdmVUYWJ9Lz4gOiBudWxsfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXdDb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXdcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuZXdCdG5cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLm5ld0V4cGVuc2UodHJ1ZSl9PkFkZCBOZXc8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7c2hvd05ld0V4cGVuc2UgPyBcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgIDxOZXdFeHBlbnNlIG5ld0V4cGVuc2U9e3RoaXMubmV3RXhwZW5zZX0vPlxuICAgICAgICAgIDwvZGl2PiA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCB7c2lnbnVwLCBzaWduaW59IGZyb20gJy4uL2FwaUNhbGxzL0FwaUNhbGxzJztcblxuY2xhc3MgTG9naW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNpZ25VcCA9IHRoaXMuc2lnblVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaWduSW4gPSB0aGlzLnNpZ25Jbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB1c2VybmFtZTogJ2RoaWxpcCcsXG4gICAgICBwYXNzd29yZDogJ2RoaWxpcGRoaWxpcCdcbiAgICB9XG4gIH1cblxuICBoZWFkKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0PlxuICAgICAgICA8dGl0bGU+RXhwZW5zZSBMb2dpbjwvdGl0bGU+XG4gICAgICA8L0hlbG1ldD5cbiAgICApO1xuICB9XG5cbiAgc2lnblVwKCkge1xuICAgIHNpZ251cCh7dXNlcm5hbWU6IHRoaXMuc3RhdGUudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSk7XG4gIH1cblxuICBzaWduSW4oKSB7XG4gICAgc2lnbmluKHt1c2VybmFtZTogdGhpcy5zdGF0ZS51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMuc3RhdGUucGFzc3dvcmR9KS50aGVuKChyZXNwKSA9PiB7XG4gICAgICBpZiAocmVzcC5kYXRhICYmICFyZXNwLmRhdGEuZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvaG9tZScsIHt9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gU2lnbkluJywgcmVzcCk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBTaWduSW4nLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5oZWFkKCl9XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgxPkxvZ2luPC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj0ndXNlcm5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLnVzZXJuYW1lfSBvbkNoYW5nZSA9IHsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7dXNlcm5hbWU6IGUudGFyZ2V0LnZhbHVlfSl9IHR5cGU9XCJ0ZXh0XCIvPlxuICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPSdwYXNzd29yZCcgdmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9IG9uQ2hhbmdlID0geyhlKSA9PiB0aGlzLnNldFN0YXRlKHtwYXNzd29yZDogZS50YXJnZXQudmFsdWV9KX0gdHlwZT1cInBhc3N3b3JkXCIvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zaWduSW59PlNpZ24gSW48L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2lnblVwfT5TaWduIFVwPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTG9naW47IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge25ld19leHBlbnNlfSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG4vLyBpbXBvcnQge2NvbW1hRm9ybWF0dGVkfSBmcm9tICcuLi91dGlscy91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0V4cGVuc2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnNlbGVjdFR5cGUgPSB0aGlzLnNlbGVjdFR5cGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN1Ym1pdE5ld0V4cGVuc2UgPSB0aGlzLnN1Ym1pdE5ld0V4cGVuc2UuYmluZCh0aGlzKTtcbiAgICBcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdHlwZTogJ2V4cGVuc2UnLFxuICAgICAgYW1vdW50OiAnJyxcbiAgICAgIGNhdGVnb3J5OiAnJyxcbiAgICAgIGRheTogJycsIFxuICAgICAgbW9udGg6ICcnLFxuICAgICAgeWVhcjogJycsXG4gICAgICBlcnJvcjoge31cbiAgICB9XG4gIH1cblxuICBzZWxlY3RUeXBlKHR5cGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt0eXBlOiB0eXBlfSk7XG4gIH1cblxuICBjaGFuZ2VBbW91bnQodmFsKXtcbiAgICB0aGlzLnNldFN0YXRlKHthbW91bnQ6IHZhbH0pXG4gIH1cblxuICBjaGFuZ2VEYXRlKHZhbCwgY3VycmVudCwgbmV4dCkge1xuICAgIHRoaXMuc2V0U3RhdGUoey4uLnZhbH0pO1xuICAgIGlmIChjdXJyZW50ICYmIHZhbFtjdXJyZW50XS5sZW5ndGggPT09IDIgJiYgbmV4dCkge1xuICAgICAgdGhpcy5yZWZzW25leHRdLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgaXNWYWxpZERhdGUoKSB7XG4gICAgY29uc3Qge2RheSwgbW9udGgsIHllYXJ9ID0gdGhpcy5zdGF0ZTtcbiAgICB2YXIgZGF0ZVJlZyA9IC9eWzAtOV1bMC05XSQvO1xuICAgIGlmICghZGF0ZVJlZy50ZXN0KGRheSkgfHwgIWRhdGVSZWcudGVzdChtb250aCkgfHwgIWRhdGVSZWcudGVzdCh5ZWFyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgyMDAwICsgcGFyc2VJbnQoeWVhciksIHBhcnNlSW50KG1vbnRoKS0xLCBwYXJzZUludChkYXkpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICB2YWxpZGF0ZVBhcmFtcygpIHtcbiAgICB2YXIgcmVnID0gL15cXGQrJC87XG4gICAgY29uc3Qge2Ftb3VudCwgY2F0ZWdvcnl9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAoIWFtb3VudCB8fCAhcmVnLnRlc3QoYW1vdW50KSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHthbW91bnQ6ICdQbGVhc2UgcHJvdmlkZSBhIFZhbGlkIEFtb3VudCd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghY2F0ZWdvcnkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB7Y2F0ZWdvcnk6ICdQbGVhc2UgcHJvdmlkZSBhIFZhbGlkIENhdGVnb3J5J319KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzVmFsaWREYXRlKCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB7ZGF0ZTogJ1BsZWFzZSBwcm92aWRlIGEgVmFsaWQgRGF0ZSd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHN1Ym1pdE5ld0V4cGVuc2UoKSB7XG4gICAgY29uc3Qge2Ftb3VudCwgZGF5LCBtb250aCwgeWVhciwgdHlwZSwgY2F0ZWdvcnl9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBpc1ZhbGlkYXRpb25TdWNjZXNzID0gdGhpcy52YWxpZGF0ZVBhcmFtcygpO1xuICAgIGlmIChpc1ZhbGlkYXRpb25TdWNjZXNzKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IGFtb3VudCwgdHlwZSwgZGF0ZTogdGhpcy5kYXRlLCBjYXRlZ29yeX07XG4gICAgICBuZXdfZXhwZW5zZShwYXJhbXMpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMubmV3RXhwZW5zZShmYWxzZSk7XG4gICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gY3JlYXRlIG5ldyBFeHBlbnNlJyxlcnIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHt0eXBlLCBhbW91bnQsIGRheSwgbW9udGgsIHllYXIsIGNhdGVnb3J5LCBlcnJvcn0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3RXhwZW5zZUNvbnRhaW5lciB6aTJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBJbmNCdG5zIHRleHRDZW50ZXJcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eyduZXdCdG4gJyArICh0eXBlID09PSAnZXhwZW5zZScgPyAnc2VsZWN0ZWRUeXBlJyA6ICcnKX0gIG9uQ2xpY2s9eygpID0+IHRoaXMuc2VsZWN0VHlwZSgnZXhwZW5zZScpfT5FeHBlbnNlPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J25ld0J0biAnICsgKHR5cGUgPT09ICdpbmNvbWUnID8gJ3NlbGVjdGVkVHlwZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2VsZWN0VHlwZSgnaW5jb21lJyl9PkluY29tZTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW1vdW50SW5wdXRcIj5cbiAgICAgICAgPHNwYW4+4oK5PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQW1vdW50XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZUFtb3VudChlLnRhcmdldC52YWx1ZSl9IHZhbHVlPXthbW91bnR9Lz5cbiAgICAgICAgICB7ZXJyb3IuYW1vdW50ID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5hbW91bnR9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgIGNsYXNzTmFtZT1cImNhdGVnb3J5SW5wdXRcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkNhdGVnb3J5XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHtjYXRlZ29yeTogZS50YXJnZXQudmFsdWV9KX0gdmFsdWU9e2NhdGVnb3J5fS8+XG4gICAgICAgICAge2Vycm9yLmNhdGVnb3J5ID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5jYXRlZ29yeX08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGVudERheVwiPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJkYXlcIiBjbGFzc05hbWU9XCJkYXlJcFwiIHR5cGU9XCJudW1iZXJcIiBtYXhMZW5ndGg9XCIyXCIgcGxhY2Vob2xkZXI9XCJERFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHtkYXk6IGUudGFyZ2V0LnZhbHVlfSwgJ2RheScsICdtb250aCcpfSB2YWx1ZT17ZGF5fS8+XG4gICAgICAgICAgPGlucHV0IHJlZj1cIm1vbnRoXCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiTU1cIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7bW9udGg6IGUudGFyZ2V0LnZhbHVlfSwgJ21vbnRoJywgJ3llYXInKX0gdmFsdWU9e21vbnRofS8+XG4gICAgICAgICAgPGlucHV0IHJlZj1cInllYXJcIiBjbGFzc05hbWU9XCJkYXlJcFwiIHR5cGU9XCJudW1iZXJcIiBtYXhMZW5ndGg9XCIyXCIgcGxhY2Vob2xkZXI9XCJZWVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHt5ZWFyOiBlLnRhcmdldC52YWx1ZX0sICd5ZWFyJyl9IHZhbHVlPXt5ZWFyfS8+XG4gICAgICAgICAge2Vycm9yLmRhdGUgPyA8ZGl2IGNsYXNzTmFtZT1cImVycm9yRGl2XCI+e2Vycm9yLmRhdGV9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VibWl0QnRuXCIgb25DbGljaz17dGhpcy5zdWJtaXROZXdFeHBlbnNlfT5Eb25lPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IHtOYXZMaW5rfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY2xhc3MgTm90Rm91bmQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhlYWQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxIZWxtZXQ+XG4gICAgICAgIDx0aXRsZT5QYWdlIE5vdCBGb3VuZDwvdGl0bGU+XG4gICAgICA8L0hlbG1ldD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5oZWFkKCl9XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgxPlNvcnJ5LCB0aGUgcGFnZSB5b3UgYXJlIGV4cGVjdGluZyBkb2VzIG5vdCBleGlzdCE8L2gxPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGkgb25DbGljaz0geygpID0+IHRoaXMucHJvcHMuaGlzdG9yeS5nb0JhY2soKX0+IFxuICAgICAgICAgICAgICBCYWNrXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICA8TmF2TGluayB0bz0nLyc+IEhvbWUgPC9OYXZMaW5rPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPE5hdkxpbmsgdG89Jy9sb2dpbic+IExvZ2luIDwvTmF2TGluaz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBOb3RGb3VuZDsiLCJleHBvcnQgY29uc3QgTU9OVEggPSAnbW9udGgnO1xuZXhwb3J0IGNvbnN0IFlFQVIgPSAneWVhcic7XG5leHBvcnQgY29uc3QgV0VFSyA9ICd3ZWVrJztcbmV4cG9ydCBjb25zdCBESVZJU0lPTkxFTkdUSCA9IHsgbW9udGg6IDMxLCB5ZWFyOiAxMiwgd2VlazogN307IFxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7QnJvd3NlclJvdXRlciwgU3dpdGNoLCBSb3V0ZX0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IExvZ2luIGZyb20gJy4uL2NvbXBvbmVudHMvTG9naW4nO1xuaW1wb3J0IE5vdEZvdW5kIGZyb20gJy4uL2NvbXBvbmVudHMvTm90Rm91bmQnXG5pbXBvcnQgSG9tZSBmcm9tICcuLi9jb21wb25lbnRzL0hvbWUnO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvJyBleGFjdCByZW5kZXI9eyhwcm9wcykgPT4gPEhvbWUgey4uLnByb3BzfS8+fS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD0nL2hvbWUnIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8SG9tZSB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvbG9naW4nIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8TG9naW4gey4uLnByb3BzfS8+fS8+XG4gICAgICAgICAgICA8Um91dGUgcmVuZGVyPXsocHJvcHMpID0+IDxOb3RGb3VuZCB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgPC9Td2l0Y2g+XG4gICAgKTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1oZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==