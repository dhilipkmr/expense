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
    var userId = request.session._userId ? _mongoose2.default.Types.ObjectId(request.session._userId) : _mongoose2.default.Types.ObjectId("5c10ba234f8b6296c08e5818");
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
    var userId = request.session._userId ? _mongoose2.default.Types.ObjectId(request.session._userId) : _mongoose2.default.Types.ObjectId("5c10ba234f8b6296c08e5818");
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


var env = "development" || false;

if (env === 'development') {
  process.env.PORT = 4000;
  // process.env.MONGOLAB_URI = 'mongodb://localhost:27017/expense';
  process.env.MONGOLAB_URI = 'mongodb://dhilipk13:dhilipk13@ds247310.mlab.com:47310/expense';
} else {
  process.env.MONGOLAB_URI = 'mongodb://dhilipk13:dhilipk13@ds247310.mlab.com:47310/expense';
}
// export default env;

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
mongoose1.connect(process.env.MONGOLAB_URI, { useMongoClient: true }).then(function () {
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

__webpack_require__(/*! ./config/config */ "./server/config/config.js");

var session = __webpack_require__(/*! express-session */ "express-session");

var MongoStore = __webpack_require__(/*! connect-mongo */ "connect-mongo")(session);

var app = (0, _express2.default)();
var port = process.env.PORT;

// app.use(session({
//     secret: 'dhilipLocal',
//     resave: false,
//     saveUninitialized: true,
//     url: process.env.MONGOLAB_URI
// }))
app.use(session({
    secret: 'foo',
    store: new MongoStore({
        url: process.env.MONGOLAB_URI
    })
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
    console.log('proces.env', port, process.env.MONGOLAB_URI);
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
      // to push values for remaining days
      while (length > lastDivision) {
        var _lastX2 = xCoordinates[xCoordinates.length - 1];
        xCoordinates.push(_lastX2 + xCoordinateDivLength);
        yCoordinates.push(HEIGHT);
        lastDivision = lastDivision + 1;
      }
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
    value: function newExpense(val, saveSuccess) {
      var _this5 = this;

      this.setState({ showNewExpense: val }, function () {
        if (saveSuccess) {
          _this5.getExpense();
          _this5.getExpenseSummary();
        }
      });
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
      var _this6 = this;

      return this.state.expenseList.transactionList.map(function (transaction, index) {
        if (_this6.state.viewMore || _this6.viewedMore[_this6.state.activeTab] || !_this6.state.viewMore && index < 2) {
          if (_this6.state.viewMore) {
            _this6.viewedMore[_this6.state.activeTab] = true; // To not remove element from DOM on clicking view More again
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
      var _this7 = this;

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
              return _this7.clickViewMore();
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
                  return _this7.newExpense(true);
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
      var _this8 = this;

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
              return _this8.newExpense(false);
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
                        _this8.changeExpenseDayFormat(_constants.WEEK);
                      } },
                    'Week'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (activeTab === _constants.MONTH ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this8.changeExpenseDayFormat(_constants.MONTH);
                      } },
                    'Month'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (activeTab === _constants.YEAR ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this8.changeExpenseDayFormat(_constants.YEAR);
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

      var dateReg = /^\d{1,2}$/;
      var dateRegYear = /^\d{4}$/;
      if (!dateReg.test(day) || !dateReg.test(month) || !dateRegYear.test(year)) {
        return false;
      } else {
        this.date = new Date(parseInt(year), parseInt(month), parseInt(day));
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
          _this2.props.newExpense(false, true);
        }, function (err) {
          console.log('Unable to create new Expense', err);
          _this2.props.newExpense(false, false);
        });
      }
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions(type) {
      var options = [];
      if (type === 'day') {
        options.push(_react2.default.createElement(
          'option',
          null,
          'Day'
        ));
        for (var i = 1; i < 32; i++) {
          options.push(_react2.default.createElement(
            'option',
            { value: i },
            i
          ));
        }
      } else if (type === 'month') {
        options.push(_react2.default.createElement(
          'option',
          null,
          'Month'
        ));
        for (var _i = 0; _i < 12; _i++) {
          options.push(_react2.default.createElement(
            'option',
            { value: _i },
            _constants.MONTHSNAMESHORT[_i]
          ));
        }
      } else if (type === 'year') {
        options.push(_react2.default.createElement(
          'option',
          null,
          'Year'
        ));
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
            { ref: 'month', onChange: function onChange(e) {
                return _this3.changeDate({ month: e.target.value }, 'month', 'year');
              } },
            this.renderOptions('month')
          ),
          _react2.default.createElement(
            'select',
            { ref: 'year', onChange: function onChange(e) {
                return _this3.changeDate({ year: e.target.value }, 'year');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2FwaS9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvZGIvbW9uZ29vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9leHBlbnNlTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hcGlDYWxscy9BcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Ib21lLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL0xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05ld0V4cGVuc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvTm90Rm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbnN0YW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3JvdXRlcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29ubmVjdC1tb25nb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLXNlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiJdLCJuYW1lcyI6WyJzaWduVXAiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJib2R5IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImVtYWlsSWQiLCJ1c2VyIiwiVXNlcnMiLCJfaWQiLCJtb25nb29zZSIsIlR5cGVzIiwiT2JqZWN0SWQiLCJmaW5kIiwidGhlbiIsInJlcyIsImxlbmd0aCIsInNlbmQiLCJlcnJvciIsIm1zZyIsInNhdmUiLCJkb2MiLCJzZXNzaW9uIiwiX3VzZXJJZCIsImUiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwic2lnbkluIiwibmV3RXhwZW5zZSIsImFtb3VudCIsImNhdGVnb3J5IiwiZGF0ZSIsInR5cGUiLCJwYXJzZUludCIsIkRhdGUiLCJ3dyIsIk1hdGgiLCJjZWlsIiwiZ2V0RGF0ZSIsImRvdyIsImdldERheSIsIm1tIiwiZ2V0TW9udGgiLCJ5eSIsImdldEZ1bGxZZWFyIiwiZGQiLCJuZXdFeHBlbnNlSW5zdGFuY2UiLCJFeHBlbnNlcyIsInVzZXJfaWQiLCJlcnIiLCJnZXRFeHBlbnNlRGF0YSIsInVzZXJJZCIsImV4cGVuc2VEYXRlUmVzcG9uZGVyIiwiZGF0YSIsInJlc3BvbmQiLCJleHBlbnNlTGlzdCIsImluY29tZUxpc3QiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwic3BlbnQiLCJzdGFuZGluZyIsInRyYW5zYWN0aW9uTGlzdCIsInRyYW5zYWN0aW9uIiwicGVyY2VudCIsInJvdW5kIiwiZ3JvdXAxIiwiJGdyb3VwIiwiJHN1bSIsImdyb3VwMiIsIiRwdXNoIiwidW53aW5kIiwiJHVud2luZCIsInNvcnQiLCIkc29ydCIsInJlR3JvdXAiLCJ0YWIiLCJZRUFSIiwiYWdncmVnYXRlIiwiJG1hdGNoIiwiJHByb2plY3QiLCJhbGxvd0Rpc2tVc2UiLCJleGVjIiwiTU9OVEgiLCJXRUVLIiwiZ2V0RXhwZW5zZVN1bW1hcnkiLCJleGVjU3VtbWFyeVF1ZXJ5IiwicGVyRGl2aXNpb25EYXRhIiwibWF4QW1vdW50IiwiTnVtYmVyIiwiTUlOX1NBRkVfSU5URUdFUiIsImZvckVhY2giLCJlbnRyeSIsIm1vbnRoIiwidG90YWxBbW91bnQiLCJkaXZpc2lvbiIsImVudiIsInByb2Nlc3MiLCJQT1JUIiwiTU9OR09MQUJfVVJJIiwibW9uZ29vc2UxIiwicmVxdWlyZSIsIlByb21pc2UiLCJnbG9iYWwiLCJjb25uZWN0IiwidXNlTW9uZ29DbGllbnQiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9kZWwiLCJTY2hlbWEiLCJyZWYiLCJyZXF1aXJlZCIsInRyaW0iLCJTdHJpbmciLCJkZWZhdWx0Iiwibm93IiwibWlubGVuZ3RoIiwiZXhwZW5zZSIsIk1vbmdvU3RvcmUiLCJhcHAiLCJwb3J0IiwidXNlIiwic2VjcmV0Iiwic3RvcmUiLCJ1cmwiLCJib2R5UGFyc2VyIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwianNvbiIsImV4cHJlc3MiLCJzdGF0aWMiLCJwb3N0IiwibG9hZEh0bWwiLCJjb250ZW50IiwiaGVsbWV0IiwiSGVsbWV0IiwicmVuZGVyU3RhdGljIiwibWV0YSIsInRvU3RyaW5nIiwidGl0bGUiLCJnZXQiLCJyZXEiLCJjb250ZXh0IiwiUmVhY3RET01TZXJ2ZXIiLCJyZW5kZXJUb1N0cmluZyIsInRlbXBsYXRlIiwibGlzdGVuIiwiQXBwIiwiQ29tcG9uZW50Iiwic2lnbnVwIiwicGFyYW1zIiwiYXhpb3MiLCJzaWduaW4iLCJuZXdfZXhwZW5zZSIsImdldF9leHBlbnNlX2RhdGEiLCJnZXRfZXhwZW5zZV9zdW1tYXJ5IiwiV0lEVEgiLCJIRUlHSFQiLCJHcmFwaCIsInByb3BzIiwiZ2VuZXJhdGVTVkciLCJiaW5kIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImFsZXJ0IiwicGxvdERhdGEiLCJ4Q29vcmRpbmF0ZXMiLCJ5Q29vcmRpbmF0ZXMiLCJESVZJU0lPTkxFTkdUSCIsIm1heEFtdCIsInhDb29yZGluYXRlRGl2TGVuZ3RoIiwibGFzdERpdmlzaW9uIiwic3RyIiwicHVzaCIsImxhc3RYIiwiaSIsIm1hcmdpbiIsIkhvbWUiLCJsZWZ0TWVudUNsaWNrIiwibmF2aWdhdGVUb1NpZ25JbiIsInN0YXRlIiwiYWN0aXZlVGFiIiwic2hvd05ld0V4cGVuc2UiLCJ1bmRlZmluZWQiLCJ2aWV3TW9yZSIsInZpZXdlZE1vcmUiLCJnZXRFeHBlbnNlIiwicmVzcCIsInNldFN0YXRlIiwicmVmcyIsImJhY2tEcm9wIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicG9wdXAiLCJmaXJzdEhhbGZMYW5kaW5nVHh0Iiwib3RoZXJIYWxmTGFuZGluZ1R4dCIsImhpc3RvcnkiLCJ2YWwiLCJzYXZlU3VjY2VzcyIsInRyYW5zYWN0ZWRDYXJkIiwic2Nyb2xsVG9wIiwiaW5kZXgiLCJtYXhXaWR0aCIsImhhc0RhdGEiLCJyZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZCIsInNpZ25lZEluIiwiY2xpY2tWaWV3TW9yZSIsImN1cnJNb250aCIsIk1PTlRIU05BTUUiLCJjdXJyRGF0ZSIsInJlbmRlckxlZnRNZW51QmFyIiwiZ2V0Q3VycmVudERhdGUiLCJjaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0IiwiZ2V0VHJhbnNhY3Rpb25DYXJkIiwiTG9naW4iLCJoZWFkIiwid2l0aFRlc3RDcmVkcyIsImNhdGNoIiwidGFyZ2V0IiwidmFsdWUiLCJOZXdFeHBlbnNlIiwic2VsZWN0VHlwZSIsInN1Ym1pdE5ld0V4cGVuc2UiLCJkYXkiLCJ5ZWFyIiwiY3VycmVudCIsIm5leHQiLCJmb2N1cyIsImRhdGVSZWciLCJkYXRlUmVnWWVhciIsInRlc3QiLCJyZWciLCJpc1ZhbGlkRGF0ZSIsImlzVmFsaWRhdGlvblN1Y2Nlc3MiLCJ2YWxpZGF0ZVBhcmFtcyIsIm9wdGlvbnMiLCJNT05USFNOQU1FU0hPUlQiLCJjaGFuZ2VBbW91bnQiLCJjaGFuZ2VEYXRlIiwicmVuZGVyT3B0aW9ucyIsIk5vdEZvdW5kIiwiZ29CYWNrIiwid2VlayJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRU8sSUFBTUEsMEJBQVMsU0FBVEEsTUFBUyxDQUFDQyxPQUFELEVBQVVDLFFBQVYsRUFBdUI7QUFDekM7QUFEeUMsd0JBRWNELFFBQVFFLElBRnRCO0FBQUEsOENBRWpDQyxRQUZpQztBQUFBLFFBRWpDQSxRQUZpQyx5Q0FFdEIsRUFGc0I7QUFBQSw4Q0FFbEJDLFFBRmtCO0FBQUEsUUFFbEJBLFFBRmtCLHlDQUVQLEVBRk87QUFBQSw4Q0FFSEMsT0FGRztBQUFBLFFBRUhBLE9BRkcseUNBRU8sRUFGUDs7QUFHekMsUUFBSUMsT0FBTyxJQUFJQyxtQkFBSixDQUFVO0FBQ2pCQyxhQUFLQyxtQkFBU0MsS0FBVCxDQUFlQyxRQUFmLEVBRFk7QUFFakJSLGtCQUFVQSxRQUZPO0FBR2pCQyxrQkFBVUEsUUFITztBQUlqQkMsaUJBQVNBO0FBSlEsS0FBVixDQUFYO0FBTUFFLHdCQUFNSyxJQUFOLENBQVcsRUFBRVQsVUFBVUEsUUFBWixFQUFYLEVBQW1DVSxJQUFuQyxDQUF3QyxVQUFDQyxHQUFELEVBQVM7QUFDN0MsWUFBSUEsSUFBSUMsTUFBSixHQUFhLENBQWpCLEVBQW9CO0FBQ2hCZCxxQkFBU2UsSUFBVCxDQUFjLEVBQUVDLE9BQU8sSUFBVCxFQUFlQyxLQUFLLHlCQUFwQixFQUFkO0FBQ0gsU0FGRCxNQUVPO0FBQ0haLGlCQUFLYSxJQUFMLEdBQVlOLElBQVosQ0FBaUIsVUFBQ08sR0FBRCxFQUFTO0FBQ3RCcEIsd0JBQVFxQixPQUFSLENBQWdCQyxPQUFoQixHQUEwQkYsSUFBSVosR0FBOUI7QUFDQVAseUJBQVNlLElBQVQsQ0FBYyxFQUFFQyxPQUFPLEtBQVQsRUFBZ0JDLEtBQUssb0JBQXJCLEVBQWQ7QUFDSCxhQUhELEVBR0csVUFBQ0ssQ0FBRCxFQUFPO0FBQ050Qix5QkFBU3VCLE1BQVQsQ0FBZ0IsR0FBaEIsRUFBcUJSLElBQXJCLENBQTBCTyxDQUExQjtBQUNILGFBTEQ7QUFNSDtBQUNKLEtBWEQsRUFXRyxVQUFDQSxDQUFELEVBQU87QUFDTnRCLGlCQUFTZSxJQUFULENBQWNPLENBQWQ7QUFDQUUsZ0JBQVFDLEdBQVIsQ0FBWUgsQ0FBWjtBQUNILEtBZEQ7QUFlSCxDQXhCTTs7QUEwQkEsSUFBTUksMEJBQVMsU0FBVEEsTUFBUyxDQUFDM0IsT0FBRCxFQUFVQyxRQUFWLEVBQXVCO0FBQUEseUJBQ2NELFFBQVFFLElBRHRCO0FBQUEsK0NBQ2pDQyxRQURpQztBQUFBLFFBQ2pDQSxRQURpQyx5Q0FDdEIsRUFEc0I7QUFBQSwrQ0FDbEJDLFFBRGtCO0FBQUEsUUFDbEJBLFFBRGtCLHlDQUNQLEVBRE87QUFBQSwrQ0FDSEMsT0FERztBQUFBLFFBQ0hBLE9BREcseUNBQ08sRUFEUDs7QUFFekNvQixZQUFRQyxHQUFSLENBQVkxQixRQUFRcUIsT0FBUixDQUFnQmYsSUFBNUI7QUFDQUMsd0JBQU1LLElBQU4sQ0FBVyxFQUFFVCxVQUFVQSxRQUFaLEVBQXNCQyxVQUFVQSxRQUFoQyxFQUFYLEVBQXVEUyxJQUF2RCxDQUE0RCxVQUFDQyxHQUFELEVBQVM7QUFDakUsWUFBSUEsSUFBSUMsTUFBSixHQUFhLENBQWpCLEVBQW9CO0FBQ2hCZixvQkFBUXFCLE9BQVIsQ0FBZ0JDLE9BQWhCLEdBQTBCUixJQUFJLENBQUosRUFBT04sR0FBakM7QUFDQVAscUJBQVNlLElBQVQsQ0FBYyxFQUFFQyxPQUFPLEtBQVQsRUFBZ0JDLEtBQUssU0FBckIsRUFBZDtBQUNILFNBSEQsTUFHTztBQUNIakIscUJBQVNlLElBQVQsQ0FBYyxFQUFFQyxPQUFPLElBQVQsRUFBZUMsS0FBSyx1QkFBcEIsRUFBZDtBQUNIO0FBQ0osS0FQRCxFQU9HLFVBQUNLLENBQUQsRUFBTztBQUNOdEIsaUJBQVNlLElBQVQsQ0FBY08sQ0FBZDtBQUNBRSxnQkFBUUMsR0FBUixDQUFZSCxDQUFaO0FBQ0gsS0FWRDtBQVdILENBZE07O0FBZ0JBLElBQU1LLGtDQUFhLG9CQUFDNUIsT0FBRCxFQUFVQyxRQUFWLEVBQXVCO0FBQUEseUJBQ05ELFFBQVFFLElBREY7QUFBQSxRQUN2QzJCLE1BRHVDLGtCQUN2Q0EsTUFEdUM7QUFBQSxRQUMvQkMsUUFEK0Isa0JBQy9CQSxRQUQrQjtBQUFBLFFBQ3JCQyxJQURxQixrQkFDckJBLElBRHFCO0FBQUEsUUFDZkMsSUFEZSxrQkFDZkEsSUFEZTs7QUFFN0NILGFBQVNJLFNBQVNKLE1BQVQsQ0FBVDtBQUNBRSxXQUFPLElBQUlHLElBQUosQ0FBU0gsSUFBVCxDQUFQO0FBQ0EsUUFBTUksS0FBS0MsS0FBS0MsSUFBTCxDQUFVTixLQUFLTyxPQUFMLEtBQWlCLENBQTNCLENBQVg7QUFDQSxRQUFNQyxNQUFNUixLQUFLUyxNQUFMLEtBQWdCLENBQTVCO0FBQ0EsUUFBTUMsS0FBS1YsS0FBS1csUUFBTCxLQUFrQixDQUE3QjtBQUNBLFFBQU1DLEtBQUtaLEtBQUthLFdBQUwsRUFBWDtBQUNBLFFBQU1DLEtBQUtkLEtBQUtPLE9BQUwsRUFBWDtBQUNBLFFBQU1WLGFBQWEsRUFBRUMsY0FBRixFQUFVQyxrQkFBVixFQUFvQkMsVUFBcEIsRUFBMEJDLFVBQTFCLEVBQWdDRyxNQUFoQyxFQUFvQ0ksUUFBcEMsRUFBeUNFLE1BQXpDLEVBQTZDRSxNQUE3QyxFQUFpREUsTUFBakQsRUFBbkI7QUFDQSxRQUFJQyxxQkFBcUIsSUFBSUMsc0JBQUo7QUFDckJDLGlCQUFTdkMsbUJBQVNDLEtBQVQsQ0FBZUMsUUFBZixDQUF3QiwwQkFBeEI7QUFEWSxPQUVsQmlCLFVBRmtCLEVBQXpCO0FBSUFrQix1QkFBbUIzQixJQUFuQixHQUEwQk4sSUFBMUIsQ0FBK0IsVUFBQ08sR0FBRCxFQUFTO0FBQ3BDO0FBQ0FuQixpQkFBU2UsSUFBVCxDQUFjSSxHQUFkO0FBQ0gsS0FIRCxFQUdHLFVBQUM2QixHQUFELEVBQVM7QUFDUnhCLGdCQUFRQyxHQUFSLENBQVksNEJBQVosRUFBMEN1QixHQUExQztBQUNBaEQsaUJBQVN1QixNQUFULENBQWdCLEdBQWhCLEVBQXFCUixJQUFyQixDQUEwQmlDLEdBQTFCO0FBQ0gsS0FORDtBQU9ILENBckJNOztBQXVCQSxJQUFNQywwQ0FBaUIsU0FBakJBLGNBQWlCLENBQUNsRCxPQUFELEVBQVVDLFFBQVYsRUFBdUI7QUFDakQsUUFBTWtELFNBQVNuRCxRQUFRcUIsT0FBUixDQUFnQkMsT0FBaEIsR0FBMEJiLG1CQUFTQyxLQUFULENBQWVDLFFBQWYsQ0FBd0JYLFFBQVFxQixPQUFSLENBQWdCQyxPQUF4QyxDQUExQixHQUE2RWIsbUJBQVNDLEtBQVQsQ0FBZUMsUUFBZixDQUF3QiwwQkFBeEIsQ0FBNUY7QUFDQSxhQUFTeUMsb0JBQVQsQ0FBOEJILEdBQTlCLEVBQW1DSSxJQUFuQyxFQUF5QztBQUNyQyxZQUFJSixHQUFKLEVBQVM7QUFDTEssb0JBQVF0QyxJQUFSLENBQWEsR0FBYixFQUFrQkEsSUFBbEIsQ0FBdUJpQyxHQUF2QjtBQUNILFNBRkQsTUFFTztBQUNILGdCQUFJTSxvQkFBSjtBQUFBLGdCQUFpQkMsbUJBQWpCO0FBQ0FDLG1CQUFPQyxJQUFQLENBQVlMLElBQVosRUFBa0JNLEdBQWxCLENBQXNCLFVBQUNDLEdBQUQsRUFBUztBQUMzQixvQkFBSVAsS0FBS08sR0FBTCxFQUFVNUIsSUFBVixLQUFtQixTQUF2QixFQUFrQztBQUM5QnVCLGtDQUFjRixLQUFLTyxHQUFMLENBQWQ7QUFDSCxpQkFGRCxNQUVPLElBQUlQLEtBQUtPLEdBQUwsRUFBVTVCLElBQVYsS0FBbUIsUUFBdkIsRUFBaUM7QUFDcEN3QixpQ0FBYUgsS0FBS08sR0FBTCxDQUFiO0FBQ0g7QUFDSixhQU5EO0FBT0EsZ0JBQUlDLGNBQUo7QUFBQSxnQkFBV0MsaUJBQVg7QUFDQSxnQkFBSVAsV0FBSixFQUFpQjtBQUNiQSw0QkFBWVEsZUFBWixDQUE0QkosR0FBNUIsQ0FBZ0MsVUFBQ0ssV0FBRCxFQUFpQjtBQUM3Qyx3QkFBSUMsVUFBVUQsWUFBWW5DLE1BQVosSUFBc0IwQixZQUFZMUIsTUFBWixHQUFxQixHQUEzQyxDQUFkO0FBQ0FtQyxnQ0FBWUMsT0FBWixHQUFzQjdCLEtBQUs4QixLQUFMLENBQVdELFVBQVUsR0FBckIsSUFBNEIsR0FBbEQ7QUFDSCxpQkFIRDtBQUlBSix3QkFBUU4sWUFBWTFCLE1BQXBCO0FBQ0gsYUFORCxNQU1RO0FBQ0pnQyx3QkFBUSxDQUFSO0FBQ0g7QUFDRCxnQkFBSUwsVUFBSixFQUFnQjtBQUNaQSwyQkFBV08sZUFBWCxDQUEyQkosR0FBM0IsQ0FBK0IsVUFBQ0ssV0FBRCxFQUFpQjtBQUM1Qyx3QkFBSUMsVUFBVUQsWUFBWW5DLE1BQVosSUFBc0IyQixXQUFXM0IsTUFBWCxHQUFvQixHQUExQyxDQUFkO0FBQ0FtQyxnQ0FBWUMsT0FBWixHQUFzQjdCLEtBQUs4QixLQUFMLENBQVdELFVBQVUsR0FBckIsSUFBNEIsR0FBbEQ7QUFDSCxpQkFIRDtBQUlBSCwyQkFBV04sV0FBVzNCLE1BQVgsR0FBb0JnQyxLQUEvQjtBQUNILGFBTkQsTUFNTztBQUNIQywyQkFBVyxJQUFJRCxLQUFmO0FBQ0g7QUFDRDVELHFCQUFTZSxJQUFULENBQWMsRUFBRXVDLHdCQUFGLEVBQWVDLHNCQUFmLEVBQTJCSyxZQUEzQixFQUFrQ0Msa0JBQWxDLEVBQWQ7QUFDSDtBQUNKOztBQUVEO0FBQ0EsUUFBTUssU0FBUztBQUNYQyxnQkFBUTtBQUNKNUQsaUJBQUssRUFBRXNCLFVBQVUsV0FBWixFQUF5QkUsTUFBTSxPQUEvQixFQUREO0FBRUpBLGtCQUFNLEVBQUUsVUFBVSxPQUFaLEVBRkY7QUFHSkYsc0JBQVUsRUFBRSxVQUFVLFdBQVosRUFITjtBQUlKRCxvQkFBUSxFQUFFd0MsTUFBTSxTQUFSO0FBSko7QUFERyxLQUFmO0FBUUEsUUFBTUMsU0FBUztBQUNYRixnQkFBUTtBQUNKNUQsaUJBQUssRUFBRXdCLE1BQU0sT0FBUixFQUREO0FBRUpILG9CQUFRLEVBQUV3QyxNQUFNLFNBQVIsRUFGSjtBQUdKckMsa0JBQU0sRUFBRSxVQUFVLE9BQVosRUFIRjtBQUlKK0IsNkJBQWlCLEVBQUVRLE9BQU8sRUFBRXpDLFVBQVUsV0FBWixFQUF5QkQsUUFBUSxTQUFqQyxFQUFUO0FBSmI7QUFERyxLQUFmO0FBUUEsUUFBTTJDLFNBQVMsRUFBRUMsU0FBUyxrQkFBWCxFQUFmO0FBQ0EsUUFBTUMsT0FBTyxFQUFFQyxPQUFPLEVBQUUsMEJBQTBCLENBQUMsQ0FBN0IsRUFBVCxFQUFiO0FBQ0EsUUFBTUMsVUFBVTtBQUNaUixnQkFBUTtBQUNKNUQsaUJBQUssRUFBRXdCLE1BQU0sT0FBUixFQUREO0FBRUpILG9CQUFRLEVBQUUsVUFBVSxTQUFaLEVBRko7QUFHSkcsa0JBQU0sRUFBRSxVQUFVLE9BQVosRUFIRjtBQUlKK0IsNkJBQWlCLEVBQUVRLE9BQU8sa0JBQVQ7QUFKYjtBQURJLEtBQWhCO0FBUUE7O0FBaEVpRCx5QkFrRWhCdkUsUUFBUUUsSUFsRVE7QUFBQSxRQWtFekMyRSxHQWxFeUMsa0JBa0V6Q0EsR0FsRXlDO0FBQUEsUUFrRXBDMUMsRUFsRW9DLGtCQWtFcENBLEVBbEVvQztBQUFBLFFBa0VoQ00sRUFsRWdDLGtCQWtFaENBLEVBbEVnQztBQUFBLFFBa0U1QkUsRUFsRTRCLGtCQWtFNUJBLEVBbEU0QjtBQUFBLFFBa0V4QkosR0FsRXdCLGtCQWtFeEJBLEdBbEV3Qjs7QUFtRWpELFFBQUlzQyxRQUFRQyxlQUFaLEVBQWtCO0FBQ2QvQiwrQkFBU2dDLFNBQVQsQ0FBbUIsQ0FDZixFQUFFQyxRQUFRLEVBQUVoQyxTQUFTRyxNQUFYLEVBQVYsRUFEZSxFQUVmLEVBQUU2QixRQUFRLEVBQUVyQyxJQUFJVixTQUFTVSxFQUFULENBQU4sRUFBVixFQUZlLGVBR1Z3QixNQUhVLGdCQUdJRyxNQUhKLGdCQUlWRSxNQUpVLGdCQUlJRSxJQUpKLGdCQUlnQkUsT0FKaEIsR0FLZixFQUFFSyxVQUFVLEVBQUV6RSxLQUFLLENBQVAsRUFBVXFCLFFBQVEsQ0FBbEIsRUFBcUJHLE1BQU0sQ0FBM0IsRUFBOEIrQixpQkFBaUIsQ0FBL0MsRUFBWixFQUxlLENBQW5CLEVBTUdtQixZQU5ILENBTWdCLElBTmhCLEVBTXNCQyxJQU50QixDQU0yQi9CLG9CQU4zQjtBQU9ILEtBUkQsTUFRTyxJQUFJeUIsUUFBUU8sZ0JBQVosRUFBbUI7QUFDdEJyQywrQkFBU2dDLFNBQVQsQ0FBbUIsQ0FDZixFQUFFQyxRQUFRLEVBQUVoQyxTQUFTRyxNQUFYLEVBQVYsRUFEZSxFQUVmLEVBQUU2QixRQUFRLEVBQUVyQyxJQUFJVixTQUFTVSxFQUFULENBQU4sRUFBVixFQUZlLEVBRWtCLEVBQUVxQyxRQUFRLEVBQUV2QyxJQUFJUixTQUFTUSxFQUFULENBQU4sRUFBVixFQUZsQixlQUdWMEIsTUFIVSxnQkFHSUcsTUFISixnQkFJVkUsTUFKVSxnQkFJSUUsSUFKSixnQkFJZ0JFLE9BSmhCLEdBS2YsRUFBRUssVUFBVSxFQUFFekUsS0FBSyxDQUFQLEVBQVVxQixRQUFRLENBQWxCLEVBQXFCRyxNQUFNLENBQTNCLEVBQThCK0IsaUJBQWlCLENBQS9DLEVBQVosRUFMZSxDQUFuQixFQU1HbUIsWUFOSCxDQU1nQixJQU5oQixFQU1zQkMsSUFOdEIsQ0FNMkIvQixvQkFOM0I7QUFPSCxLQVJNLE1BUUEsSUFBSXlCLFFBQVFRLGVBQVosRUFBa0I7QUFDckJ0QywrQkFBU2dDLFNBQVQsQ0FBbUIsQ0FDZixFQUFFQyxRQUFRLEVBQUVoQyxTQUFTRyxNQUFYLEVBQVYsRUFEZSxFQUVmLEVBQUU2QixRQUFRLEVBQUVyQyxJQUFJVixTQUFTVSxFQUFULENBQU4sRUFBVixFQUZlLEVBRWtCLEVBQUVxQyxRQUFRLEVBQUV2QyxJQUFJUixTQUFTUSxFQUFULENBQU4sRUFBVixFQUZsQixFQUVtRCxFQUFFdUMsUUFBUSxFQUFFN0MsSUFBSUYsU0FBU0UsRUFBVCxDQUFOLEVBQVYsRUFGbkQsZUFHVmdDLE1BSFUsZ0JBR0lHLE1BSEosZ0JBSVZFLE1BSlUsZ0JBSUlFLElBSkosZ0JBSWdCRSxPQUpoQixHQUtmLEVBQUVLLFVBQVUsRUFBRXpFLEtBQUssQ0FBUCxFQUFVcUIsUUFBUSxDQUFsQixFQUFxQkcsTUFBTSxDQUEzQixFQUE4QitCLGlCQUFpQixDQUEvQyxFQUFaLEVBTGUsQ0FBbkIsRUFNR21CLFlBTkgsQ0FNZ0IsSUFOaEIsRUFNc0JDLElBTnRCLENBTTJCL0Isb0JBTjNCO0FBT0g7QUFDSixDQTVGTTs7QUE4RkEsSUFBTWtDLGdEQUFvQixTQUFwQkEsaUJBQW9CLENBQUN0RixPQUFELEVBQVVDLFFBQVYsRUFBdUI7QUFDcEQsYUFBU3NGLGdCQUFULENBQTBCdEMsR0FBMUIsRUFBK0JJLElBQS9CLEVBQXFDO0FBQ2pDLFlBQUlKLEdBQUosRUFBUztBQUNMSyxvQkFBUXRDLElBQVIsQ0FBYSxHQUFiLEVBQWtCQSxJQUFsQixDQUF1QmlDLEdBQXZCO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsZ0JBQUlJLFFBQVFBLEtBQUssQ0FBTCxDQUFSLElBQW1CQSxLQUFLLENBQUwsRUFBUW1DLGVBQS9CLEVBQWdEO0FBQzVDLG9CQUFJQyxZQUFZQyxPQUFPQyxnQkFBdkI7QUFDQXRDLHFCQUFLLENBQUwsRUFBUW1DLGVBQVIsQ0FBd0JJLE9BQXhCLENBQWdDLGlCQUFTO0FBQ3JDLHdCQUFJSCxZQUFZSSxNQUFNaEUsTUFBdEIsRUFBOEI7QUFDMUI0RCxvQ0FBWUksTUFBTWhFLE1BQWxCO0FBQ0g7QUFDSixpQkFKRDtBQUtBd0IscUJBQUssQ0FBTCxFQUFRb0MsU0FBUixHQUFvQkEsU0FBcEI7QUFDQXhGLHlCQUFTZSxJQUFULGNBQWtCcUMsS0FBSyxDQUFMLENBQWxCO0FBQ0gsYUFURCxNQVNPO0FBQ0hwRCx5QkFBU2UsSUFBVCxDQUFjLEVBQWQ7QUFDSDtBQUNKO0FBQ0o7QUFDRCxRQUFNbUMsU0FBU25ELFFBQVFxQixPQUFSLENBQWdCQyxPQUFoQixHQUEwQmIsbUJBQVNDLEtBQVQsQ0FBZUMsUUFBZixDQUF3QlgsUUFBUXFCLE9BQVIsQ0FBZ0JDLE9BQXhDLENBQTFCLEdBQTZFYixtQkFBU0MsS0FBVCxDQUFlQyxRQUFmLENBQXdCLDBCQUF4QixDQUE1RjtBQW5Cb0QseUJBb0IxQlgsUUFBUUUsSUFwQmtCO0FBQUEsUUFvQjdDMkUsR0FwQjZDLGtCQW9CN0NBLEdBcEI2QztBQUFBLFFBb0J4Q2xDLEVBcEJ3QyxrQkFvQnhDQSxFQXBCd0M7QUFBQSxRQW9CcENGLEVBcEJvQyxrQkFvQnBDQSxFQXBCb0M7QUFBQSxRQW9CaENOLEVBcEJnQyxrQkFvQmhDQSxFQXBCZ0M7O0FBcUJwRCxRQUFJMEMsUUFBUUMsZUFBWixFQUFrQjtBQUNkL0IsK0JBQVNnQyxTQUFULENBQW1CLENBQ2YsRUFBQ0MsUUFBUSxFQUFFaEMsU0FBU0csTUFBWCxFQUFULEVBRGUsRUFFZixFQUFDNkIsUUFBUSxFQUFFckMsSUFBSUEsRUFBTixFQUFULEVBRmUsRUFHZixFQUFDcUMsUUFBUSxFQUFFaEQsTUFBTSxTQUFSLEVBQVQsRUFIZSxFQUlmLEVBQUNvQyxRQUFRLEVBQUU1RCxLQUFLLEVBQUVpQyxJQUFJLEtBQU4sRUFBUCxFQUFxQlosUUFBUSxFQUFDd0MsTUFBTSxTQUFQLEVBQTdCLEVBQWdEeUIsT0FBTyxFQUFDLFVBQVUsS0FBWCxFQUF2RCxFQUFULEVBSmUsRUFLZixFQUFDbkIsT0FBTyxFQUFFbUIsT0FBTyxDQUFULEVBQVIsRUFMZSxFQU1mLEVBQUMxQixRQUFRLEVBQUM1RCxLQUFLLElBQU4sRUFBWXVGLGFBQWEsRUFBQyxRQUFRLFNBQVQsRUFBekIsRUFBOENQLGlCQUFpQixFQUFDakIsT0FBUSxFQUFFMUMsUUFBUSxTQUFWLEVBQXFCbUUsVUFBVSxRQUEvQixFQUFULEVBQS9ELEVBQVQsRUFOZSxFQU9mLEVBQUNmLFVBQVUsRUFBQ3pFLEtBQUssQ0FBTixFQUFYLEVBUGUsQ0FBbkIsRUFRTzBFLFlBUlAsQ0FRb0IsSUFScEIsRUFRMEJDLElBUjFCLENBUStCSSxnQkFSL0I7QUFTSCxLQVZELE1BVU8sSUFBSVYsUUFBUU8sZ0JBQVosRUFBbUI7QUFDdEJyQywrQkFBU2dDLFNBQVQsQ0FBbUIsQ0FDZixFQUFDQyxRQUFRLEVBQUVoQyxTQUFTRyxNQUFYLEVBQVQsRUFEZSxFQUVmLEVBQUM2QixRQUFRLEVBQUVyQyxJQUFJQSxFQUFOLEVBQVQsRUFGZSxFQUdmLEVBQUNxQyxRQUFRLEVBQUV2QyxJQUFJQSxFQUFOLEVBQVQsRUFIZSxFQUlmLEVBQUN1QyxRQUFRLEVBQUVoRCxNQUFNLFNBQVIsRUFBVCxFQUplLEVBS2YsRUFBQ29DLFFBQVEsRUFBRTVELEtBQUssRUFBQ3FDLElBQUksS0FBTCxFQUFQLEVBQW9CaEIsUUFBUSxFQUFDLFFBQVEsU0FBVCxFQUE1QixFQUFpRGdCLElBQUksRUFBQyxVQUFVLEtBQVgsRUFBckQsRUFBVCxFQUxlLEVBTWYsRUFBQzhCLE9BQU8sRUFBQzlCLElBQUksQ0FBTCxFQUFSLEVBTmUsRUFPZixFQUFDdUIsUUFBUSxFQUFDNUQsS0FBSyxJQUFOLEVBQVl1RixhQUFhLEVBQUMsUUFBUSxTQUFULEVBQXpCLEVBQThDUCxpQkFBaUIsRUFBQ2pCLE9BQU8sRUFBQzFDLFFBQVEsU0FBVCxFQUFvQm1FLFVBQVUsS0FBOUIsRUFBUixFQUEvRCxFQUFULEVBUGUsRUFRZixFQUFDZixVQUFVLEVBQUN6RSxLQUFJLENBQUwsRUFBWCxFQVJlLENBQW5CLEVBU08wRSxZQVRQLENBU29CLElBVHBCLEVBUzBCQyxJQVQxQixDQVMrQkksZ0JBVC9CO0FBVUgsS0FYTSxNQVdBLElBQUlWLFFBQVFRLGVBQVosRUFBa0I7QUFDckJ0QywrQkFBU2dDLFNBQVQsQ0FBbUIsQ0FDZixFQUFDQyxRQUFRLEVBQUVoQyxTQUFTRyxNQUFYLEVBQVQsRUFEZSxFQUVmLEVBQUM2QixRQUFRLEVBQUVyQyxJQUFJQSxFQUFOLEVBQVQsRUFGZSxFQUdmLEVBQUNxQyxRQUFRLEVBQUV2QyxJQUFJQSxFQUFOLEVBQVQsRUFIZSxFQUlmLEVBQUN1QyxRQUFRLEVBQUU3QyxJQUFJQSxFQUFOLEVBQVQsRUFKZSxFQUtmLEVBQUM2QyxRQUFRLEVBQUVoRCxNQUFNLFNBQVIsRUFBVCxFQUxlLEVBTWYsRUFBQ29DLFFBQVEsRUFBRTVELEtBQUssRUFBQytCLEtBQUssTUFBTixFQUFQLEVBQXNCVixRQUFRLEVBQUN3QyxNQUFNLFNBQVAsRUFBOUIsRUFBaUQ5QixLQUFLLEVBQUMsVUFBVSxNQUFYLEVBQXRELEVBQVQsRUFOZSxFQU9mLEVBQUNvQyxPQUFPLEVBQUVwQyxLQUFLLENBQVAsRUFBUixFQVBlLEVBUWYsRUFBQzZCLFFBQVEsRUFBRTVELEtBQUssSUFBUCxFQUFhdUYsYUFBYSxFQUFDMUIsTUFBTSxTQUFQLEVBQTFCLEVBQThDbUIsaUJBQWlCLEVBQUNqQixPQUFPLEVBQUMxQyxRQUFRLFNBQVQsRUFBb0JtRSxVQUFVLE1BQTlCLEVBQVIsRUFBL0QsRUFBVCxFQVJlLEVBU2YsRUFBQ2YsVUFBVSxFQUFDekUsS0FBSyxDQUFOLEVBQVgsRUFUZSxDQUFuQixFQVVPMEUsWUFWUCxDQVVvQixJQVZwQixFQVUwQkMsSUFWMUIsQ0FVK0JJLGdCQVYvQjtBQVdIO0FBQ0osQ0F2RE0sQzs7Ozs7Ozs7Ozs7Ozs7QUNyS1AsSUFBSVUsTUFBTUMsYUFBQSxJQUF3QixLQUFsQzs7QUFFQSxJQUFJRCxRQUFRLGFBQVosRUFBMkI7QUFDekJDLFVBQVFELEdBQVIsQ0FBWUUsSUFBWixHQUFtQixJQUFuQjtBQUNBO0FBQ0FELFVBQVFELEdBQVIsQ0FBWUcsWUFBWixHQUEyQiwrREFBM0I7QUFDRCxDQUpELE1BSU87QUFDTEYsVUFBUUQsR0FBUixDQUFZRyxZQUFaLEdBQTJCLCtEQUEzQjtBQUNEO0FBQ0Qsc0I7Ozs7Ozs7Ozs7Ozs7O0FDVEEsSUFBSUMsWUFBWUMsbUJBQU9BLENBQUMsMEJBQVIsQ0FBaEI7QUFDQUQsVUFBVUUsT0FBVixHQUFvQkMsT0FBT0QsT0FBM0I7QUFDQUYsVUFBVUksT0FBVixDQUFrQlAsUUFBUUQsR0FBUixDQUFZRyxZQUE5QixFQUE0QyxFQUFFTSxnQkFBZ0IsSUFBbEIsRUFBNUMsRUFBc0U3RixJQUF0RSxDQUEyRSxZQUFNO0FBQzdFWSxZQUFRQyxHQUFSLENBQVksaUJBQVo7QUFDSCxDQUZELEVBRUUsVUFBQ0gsQ0FBRCxFQUFNO0FBQ0pFLFlBQVFDLEdBQVIsQ0FBWUgsQ0FBWjtBQUNILENBSkQ7QUFLQW9GLE9BQU9DLE9BQVAsR0FBaUIsRUFBQ1Asb0JBQUQsRUFBakIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTXRELFdBQVd0QyxtQkFBU29HLEtBQVQsQ0FBZSxVQUFmLEVBQTJCO0FBQzFDN0QsV0FBUztBQUNQaEIsVUFBTXZCLG1CQUFTcUcsTUFBVCxDQUFnQnBHLEtBQWhCLENBQXNCQyxRQURyQjtBQUVQb0csU0FBSztBQUZFLEdBRGlDO0FBSzFDbEYsVUFBUTtBQUNKRyxVQUFNMEQsTUFERjtBQUVKc0IsY0FBVSxJQUZOO0FBR0pDLFVBQU07QUFIRixHQUxrQztBQVUxQ25GLFlBQVU7QUFDTkUsVUFBTWtGLE1BREE7QUFFTkYsY0FBVSxJQUZKO0FBR05DLFVBQU0sSUFIQTtBQUlORSxhQUFTO0FBSkgsR0FWZ0M7QUFnQjFDbkYsUUFBTTtBQUNKQSxVQUFNa0YsTUFERjtBQUVKRixjQUFVLEtBRk47QUFHSkMsVUFBTSxJQUhGO0FBSUpFLGFBQVM7QUFKTCxHQWhCb0M7QUFzQjFDcEYsUUFBTTtBQUNKQyxVQUFNRSxJQURGO0FBRUo4RSxjQUFVLEtBRk47QUFHSkMsVUFBTSxJQUhGO0FBSUpFLGFBQVNqRixLQUFLa0YsR0FBTDtBQUpMLEdBdEJvQztBQTRCMUN2RSxNQUFJO0FBQ0ZiLFVBQU0wRCxNQURKO0FBRUZzQixjQUFVLEtBRlI7QUFHRkMsVUFBTTtBQUhKLEdBNUJzQztBQWlDMUM5RSxNQUFJO0FBQ0ZILFVBQU0wRCxNQURKO0FBRUZzQixjQUFVLEtBRlI7QUFHRkMsVUFBTTtBQUhKLEdBakNzQztBQXNDMUMxRSxPQUFLO0FBQ0hQLFVBQU0wRCxNQURIO0FBRUhzQixjQUFVLEtBRlA7QUFHSEMsVUFBTTtBQUhILEdBdENxQztBQTJDMUN4RSxNQUFJO0FBQ0ZULFVBQU0wRCxNQURKO0FBRUZzQixjQUFVLEtBRlI7QUFHRkMsVUFBTTtBQUhKLEdBM0NzQztBQWdEMUN0RSxNQUFJO0FBQ0ZYLFVBQU0wRCxNQURKO0FBRUZzQixjQUFVLEtBRlI7QUFHRkMsVUFBTTtBQUhKO0FBaERzQyxDQUEzQixDQUFqQjtrQkFzRGVsRSxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RGY7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTXhDLFFBQVFFLG1CQUFTb0csS0FBVCxDQUFlLE9BQWYsRUFBd0I7QUFDbENyRyxTQUFLQyxtQkFBU3FHLE1BQVQsQ0FBZ0JwRyxLQUFoQixDQUFzQkMsUUFETztBQUVsQ1IsY0FBVTtBQUNONkIsY0FBTWtGLE1BREE7QUFFTkYsa0JBQVUsSUFGSjtBQUdOSyxtQkFBVyxDQUhMO0FBSU5KLGNBQU07QUFKQSxLQUZ3QjtBQVFsQzVHLGFBQVM7QUFDTDJCLGNBQU1rRixNQUREO0FBRUxGLGtCQUFVLEtBRkw7QUFHTEMsY0FBTTtBQUhELEtBUnlCO0FBYWxDN0csY0FBVTtBQUNONEIsY0FBTWtGLE1BREE7QUFFTkYsa0JBQVUsSUFGSjtBQUdOSyxtQkFBVyxDQUhMO0FBSU5KLGNBQU07QUFKQSxLQWJ3QjtBQW1CbENLLGFBQVMsQ0FDTDtBQUNJdEYsY0FBTXZCLG1CQUFTcUcsTUFBVCxDQUFnQnBHLEtBQWhCLENBQXNCQyxRQURoQztBQUVJb0csYUFBSztBQUZULEtBREs7QUFuQnlCLENBQXhCLENBQWQ7a0JBMEJleEcsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJmOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQWJBK0YsbUJBQU9BLENBQUMsa0RBQVI7O0FBU0EsSUFBSWpGLFVBQVVpRixtQkFBT0EsQ0FBQyx3Q0FBUixDQUFkOztBQUtBLElBQU1pQixhQUFhakIsbUJBQU9BLENBQUMsb0NBQVIsRUFBeUJqRixPQUF6QixDQUFuQjs7QUFFQSxJQUFNbUcsTUFBTSx3QkFBWjtBQUNBLElBQU1DLE9BQU92QixRQUFRRCxHQUFSLENBQVlFLElBQXpCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBcUIsSUFBSUUsR0FBSixDQUFRckcsUUFBUTtBQUNac0csWUFBUSxLQURJO0FBRVpDLFdBQU8sSUFBSUwsVUFBSixDQUFlO0FBQ2xCTSxhQUFLM0IsUUFBUUQsR0FBUixDQUFZRztBQURDLEtBQWY7QUFGSyxDQUFSLENBQVI7QUFNQW9CLElBQUlFLEdBQUosQ0FBUUkscUJBQVdDLFVBQVgsQ0FBc0IsRUFBRUMsVUFBVSxLQUFaLEVBQXRCLENBQVI7QUFDQVIsSUFBSUUsR0FBSixDQUFRSSxxQkFBV0csSUFBWCxFQUFSO0FBQ0FULElBQUlFLEdBQUosQ0FBUVEsa0JBQVFDLE1BQVIsQ0FBZSxjQUFmLENBQVI7QUFDQVgsSUFBSUUsR0FBSixDQUFRLFNBQVIsRUFBbUJRLGtCQUFRQyxNQUFSLENBQWUsa0JBQWYsQ0FBbkI7QUFDQVgsSUFBSUUsR0FBSixDQUFRUSxrQkFBUUMsTUFBUixDQUFlLGtCQUFmLENBQVI7O0FBRUE7QUFDQVgsSUFBSVksSUFBSixDQUFTLFNBQVQsRUFBb0JySSxnQkFBcEI7QUFDQXlILElBQUlZLElBQUosQ0FBUyxTQUFULEVBQW9CekcsZ0JBQXBCO0FBQ0E2RixJQUFJWSxJQUFKLENBQVMsY0FBVCxFQUF5QnhHLG9CQUF6QjtBQUNBNEYsSUFBSVksSUFBSixDQUFTLG1CQUFULEVBQThCbEYsd0JBQTlCO0FBQ0FzRSxJQUFJWSxJQUFKLENBQVMsc0JBQVQsRUFBaUM5QywyQkFBakM7O0FBRUEsSUFBTStDLFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxPQUFELEVBQWE7QUFDMUIsUUFBTUMsU0FBU0Msc0JBQU9DLFlBQVAsRUFBZjtBQUNBLHNFQUdjRixPQUFPRyxJQUFQLENBQVlDLFFBQVosRUFIZCwwQkFJY0osT0FBT0ssS0FBUCxDQUFhRCxRQUFiLEVBSmQseTRCQWU2QkwsT0FmN0I7QUFtQkgsQ0FyQkQ7O0FBdUJBZCxJQUFJcUIsR0FBSixDQUFRLEdBQVIsRUFBYSxVQUFDQyxHQUFELEVBQU1oSSxHQUFOLEVBQWM7QUFDdkIsUUFBTWlJLFVBQVUsRUFBaEI7QUFDQSxRQUFNVCxVQUFVVSxpQkFBZUMsY0FBZixDQUNaO0FBQUMsaUNBQUQ7QUFBQTtBQUNJLHNDQUFDLGFBQUQsSUFBSyxVQUFVSCxJQUFJakIsR0FBbkIsRUFBd0IsU0FBU2tCLE9BQWpDO0FBREosS0FEWSxDQUFoQjtBQUtBLFFBQU1HLFdBQVdiLFNBQVNDLE9BQVQsQ0FBakI7QUFDQXhILFFBQUlFLElBQUosQ0FBU2tJLFFBQVQ7QUFDSCxDQVREOztBQVdBMUIsSUFBSTJCLE1BQUosQ0FBVzFCLElBQVgsRUFBaUIsWUFBTTtBQUNuQmhHLFlBQVFDLEdBQVIsQ0FBWSxZQUFaLEVBQTBCK0YsSUFBMUIsRUFBZ0N2QixRQUFRRCxHQUFSLENBQVlHLFlBQTVDO0FBQ0EzRSxZQUFRQyxHQUFSLENBQVksMEJBQVosRUFBd0MrRixJQUF4QztBQUNILENBSEQ7O2tCQUtlRCxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25GZjs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQjRCLEc7Ozs7Ozs7Ozs7O2lDQUNSO0FBQ0wsbUJBQ0ksOEJBQUMsZ0JBQUQsT0FESjtBQUdIOzs7O0VBTDRCQyxnQjs7a0JBQVpELEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05yQjs7Ozs7O0FBRU8sSUFBTUUsMEJBQVMsU0FBVEEsTUFBUyxDQUFDQyxNQUFELEVBQVk7QUFDaEMsTUFBTTFCLE1BQU0sVUFBWjtBQUNBLFNBQU8yQixnQkFBTXBCLElBQU4sQ0FBV1AsR0FBWCxlQUFvQjBCLE1BQXBCLEVBQVA7QUFDRCxDQUhNOztBQUtBLElBQU1FLDBCQUFTLFNBQVRBLE1BQVMsQ0FBQ0YsTUFBRCxFQUFZO0FBQ2hDLE1BQU0xQixNQUFNLFVBQVo7QUFDQSxTQUFPMkIsZ0JBQU1wQixJQUFOLENBQVdQLEdBQVgsZUFBb0IwQixNQUFwQixFQUFQO0FBQ0QsQ0FITTs7QUFLQSxJQUFNRyxvQ0FBYyxTQUFkQSxXQUFjLENBQUNILE1BQUQsRUFBWTtBQUNyQyxNQUFNMUIsTUFBTSxlQUFaO0FBQ0EsU0FBTzJCLGdCQUFNcEIsSUFBTixDQUFXUCxHQUFYLGVBQW9CMEIsTUFBcEIsRUFBUDtBQUNELENBSE07O0FBS0EsSUFBTUksOENBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBQ0osTUFBRCxFQUFZO0FBQzFDLE1BQU0xQixNQUFNLG9CQUFaO0FBQ0EsU0FBTzJCLGdCQUFNcEIsSUFBTixDQUFXUCxHQUFYLEVBQWdCMEIsTUFBaEIsQ0FBUDtBQUNELENBSE07O0FBS0EsSUFBTUssb0RBQXNCLFNBQXRCQSxtQkFBc0IsQ0FBQ0wsTUFBRCxFQUFZO0FBQzdDLE1BQU0xQixNQUFNLHVCQUFaO0FBQ0EsU0FBTzJCLGdCQUFNcEIsSUFBTixDQUFXUCxHQUFYLEVBQWdCMEIsTUFBaEIsQ0FBUDtBQUNELENBSE0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQlA7Ozs7QUFDQTs7Ozs7Ozs7OztBQUpBLElBQU1NLFFBQVEsR0FBZDtBQUNBLElBQU1DLFNBQVMsR0FBZjs7SUFLcUJDLEs7OztBQUNuQixpQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDhHQUNYQSxLQURXOztBQUVqQixVQUFLQyxXQUFMLEdBQW1CLE1BQUtBLFdBQUwsQ0FBaUJDLElBQWpCLE9BQW5CO0FBRmlCO0FBR2xCOzs7O3dDQUVtQjtBQUNsQixVQUFJQyxVQUFVQSxPQUFPQyxnQkFBckIsRUFBdUM7QUFDckNELGVBQU9DLGdCQUFQLENBQXdCLFVBQXhCLEVBQW9DLFlBQVc7QUFDN0NDLGdCQUFNLHNCQUFOO0FBQ0QsU0FGRDtBQUdEO0FBQ0Y7OztrQ0FFYTtBQUFBLG1CQUNZLEtBQUtMLEtBRGpCO0FBQUEsVUFDTE0sUUFESyxVQUNMQSxRQURLO0FBQUEsVUFDS3pGLEdBREwsVUFDS0EsR0FETDs7QUFFWixVQUFNMEYsZUFBZSxFQUFyQjtBQUNBLFVBQU1DLGVBQWUsRUFBckI7QUFDQSxVQUFNekosU0FBUzBKLDBCQUFlNUYsR0FBZixDQUFmO0FBQ0EsVUFBTTZGLFNBQVNKLFNBQVM3RSxTQUF4QjtBQUNBLFVBQU1rRix1QkFBd0JkLFNBQVM5SSxTQUFTLENBQWxCLENBQTlCO0FBQ0EsVUFBSTZKLGVBQWUsQ0FBbkI7QUFDQSxVQUFJQyxNQUFNLEVBQVY7O0FBRUE7QUFDQU4sbUJBQWFPLElBQWIsQ0FBa0IsQ0FBbEI7QUFDQU4sbUJBQWFNLElBQWIsQ0FBa0JoQixNQUFsQjtBQUNBUSxlQUFTOUUsZUFBVCxDQUF5QkksT0FBekIsQ0FBaUMsVUFBQ0MsS0FBRCxFQUFXO0FBQzFDLGVBQU9BLE1BQU1HLFFBQU4sR0FBaUI0RSxZQUF4QixFQUFzQztBQUNwQyxjQUFNRyxTQUFRUixhQUFhQSxhQUFheEosTUFBYixHQUFzQixDQUFuQyxDQUFkO0FBQ0F3Six1QkFBYU8sSUFBYixDQUFtQkMsU0FBUUosb0JBQTNCO0FBQ0EsY0FBSTlFLE1BQU1HLFFBQU4sS0FBbUI0RSxlQUFlLENBQXRDLEVBQXlDO0FBQ3ZDLGdCQUFNM0csVUFBWTRCLE1BQU1oRSxNQUFOLEdBQWU2SSxNQUFoQixHQUEwQixHQUEzQztBQUNBRix5QkFBYU0sSUFBYixDQUFrQmhCLFNBQVdBLFNBQVMsR0FBVixHQUFpQjdGLE9BQTdDO0FBQ0QsV0FIRCxNQUdPO0FBQ0x1Ryx5QkFBYU0sSUFBYixDQUFrQmhCLE1BQWxCO0FBQ0Q7QUFDRGMseUJBQWVBLGVBQWUsQ0FBOUI7QUFDRDtBQUNGLE9BWkQ7QUFhQTtBQUNBLGFBQU03SixTQUFTNkosWUFBZixFQUE2QjtBQUMzQixZQUFNRyxVQUFRUixhQUFhQSxhQUFheEosTUFBYixHQUFzQixDQUFuQyxDQUFkO0FBQ0F3SixxQkFBYU8sSUFBYixDQUFtQkMsVUFBUUosb0JBQTNCO0FBQ0FILHFCQUFhTSxJQUFiLENBQWtCaEIsTUFBbEI7QUFDQWMsdUJBQWVBLGVBQWUsQ0FBOUI7QUFDRDtBQUNELFVBQU1HLFFBQVFSLGFBQWFBLGFBQWF4SixNQUFiLEdBQXNCLENBQW5DLENBQWQ7QUFDQXdKLG1CQUFhTyxJQUFiLENBQW1CQyxRQUFRSixvQkFBM0I7QUFDQUgsbUJBQWFNLElBQWIsQ0FBa0JoQixNQUFsQjs7QUFFQSxXQUFLLElBQUlrQixJQUFJLENBQWIsRUFBZ0JBLElBQUlULGFBQWF4SixNQUFqQyxFQUF5Q2lLLEdBQXpDLEVBQThDO0FBQzVDSCxlQUFPLE1BQU1OLGFBQWFTLENBQWIsQ0FBTixHQUF3QixHQUF4QixHQUE4QlIsYUFBYVEsQ0FBYixDQUE5QixHQUFnRCxHQUF2RDtBQUNEO0FBQ0QsVUFBSUgsR0FBSixFQUFTO0FBQ1AsZUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsY0FBSyxTQUFTLFNBQVNoQixLQUFULEdBQWlCLEdBQWpCLEdBQXVCQyxNQUFyQyxFQUE2QyxPQUFPLEVBQUNtQixRQUFRLE1BQVQsRUFBcEQ7QUFDRSx3REFBVSxRQUFRSixHQUFsQixFQUF1QixXQUFVLGVBQWpDO0FBREY7QUFERixTQURGO0FBVUQ7QUFDRCxhQUFPLElBQVA7QUFDRDs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRyxhQUFLWixXQUFMO0FBREgsT0FERjtBQUtEOzs7O0VBM0VnQ1osZ0I7O2tCQUFkVSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHJCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJtQixJOzs7QUFDbkIsZ0JBQVlsQixLQUFaLEVBQW1CO0FBQUE7O0FBQUEsNEdBQ1hBLEtBRFc7O0FBRWpCLFVBQUttQixhQUFMLEdBQXFCLE1BQUtBLGFBQUwsQ0FBbUJqQixJQUFuQixPQUFyQjtBQUNBLFVBQUt0SSxVQUFMLEdBQWtCLE1BQUtBLFVBQUwsQ0FBZ0JzSSxJQUFoQixPQUFsQjtBQUNBLFVBQUtrQixnQkFBTCxHQUF3QixNQUFLQSxnQkFBTCxDQUFzQmxCLElBQXRCLE9BQXhCO0FBQ0EsVUFBS21CLEtBQUwsR0FBYTtBQUNYQyxpQkFBV2xHLGdCQURBO0FBRVhtRyxzQkFBZ0IsS0FGTDtBQUdYekgsZ0JBQVUwSCxTQUhDO0FBSVgzSCxhQUFPMkgsU0FKSTtBQUtYakksbUJBQWEsRUFMRjtBQU1YQyxrQkFBWSxFQU5EO0FBT1hpSSxnQkFBVTtBQVBDLEtBQWI7QUFTQSxVQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBZGlCO0FBZWxCOzs7O3dDQUNtQjtBQUNsQixXQUFLQyxVQUFMO0FBQ0EsV0FBS3JHLGlCQUFMO0FBQ0Q7Ozt3Q0FFbUI7QUFBQTs7QUFDbEIsVUFBTVQsTUFBTSxLQUFLd0csS0FBTCxDQUFXQyxTQUF2QjtBQUNBLFVBQU03SSxLQUFLLElBQUlQLElBQUosR0FBV1EsUUFBWCxLQUF3QixDQUFuQztBQUNBLFVBQU1ILE1BQU0sSUFBSUwsSUFBSixHQUFXTSxNQUFYLEVBQVo7QUFDQSxVQUFNTCxLQUFLQyxLQUFLQyxJQUFMLENBQVUsSUFBSUgsSUFBSixHQUFXSSxPQUFYLEtBQXVCLENBQWpDLENBQVg7QUFDQSxVQUFNSyxLQUFLLElBQUlULElBQUosR0FBV1UsV0FBWCxFQUFYO0FBQ0EsVUFBTTJHLFNBQVMsRUFBQzFFLFFBQUQsRUFBTXBDLE1BQU4sRUFBVUYsUUFBVixFQUFlSixNQUFmLEVBQW1CUSxNQUFuQixFQUFmO0FBQ0EseUNBQW9CNEcsTUFBcEIsRUFBNEIxSSxJQUE1QixDQUFpQyxVQUFDK0ssSUFBRCxFQUFVO0FBQ3pDLGVBQUtDLFFBQUwsQ0FBYyxFQUFDdkIsdUJBQWNzQixLQUFLdkksSUFBbkIsQ0FBRCxFQUFkO0FBQ0QsT0FGRCxFQUVHLFVBQUNKLEdBQUQsRUFBUztBQUNWeEIsZ0JBQVFDLEdBQVIsQ0FBWSx1Q0FBWixFQUFxRHVCLEdBQXJEO0FBQ0QsT0FKRDtBQUtEOzs7aUNBRVk7QUFBQTs7QUFDWCxVQUFJTSxjQUFjLEVBQWxCO0FBQUEsVUFBc0JDLGFBQWEsRUFBbkM7QUFBQSxVQUF1Q00sV0FBVSxFQUFqRDtBQUNBLFVBQU1lLE1BQU0sS0FBS3dHLEtBQUwsQ0FBV0MsU0FBdkI7QUFDQSxVQUFNN0ksS0FBSyxJQUFJUCxJQUFKLEdBQVdRLFFBQVgsS0FBd0IsQ0FBbkM7QUFDQSxVQUFNSCxNQUFNLElBQUlMLElBQUosR0FBV00sTUFBWCxFQUFaO0FBQ0EsVUFBTUwsS0FBS0MsS0FBS0MsSUFBTCxDQUFVLElBQUlILElBQUosR0FBV0ksT0FBWCxLQUF1QixDQUFqQyxDQUFYO0FBQ0EsVUFBTUssS0FBSyxJQUFJVCxJQUFKLEdBQVdVLFdBQVgsRUFBWDtBQUNBLFVBQU0yRyxTQUFTLEVBQUMxRSxRQUFELEVBQU1wQyxNQUFOLEVBQVVGLFFBQVYsRUFBZUosTUFBZixFQUFtQlEsTUFBbkIsRUFBZjtBQUNBLHNDQUFpQjRHLE1BQWpCLEVBQXlCMUksSUFBekIsQ0FBOEIsVUFBQytLLElBQUQsRUFBVTtBQUFBLHlCQUNZQSxLQUFLdkksSUFEakI7QUFBQSxZQUNoQ0UsV0FEZ0MsY0FDaENBLFdBRGdDO0FBQUEsWUFDbkJDLFVBRG1CLGNBQ25CQSxVQURtQjtBQUFBLFlBQ1BNLFFBRE8sY0FDUEEsUUFETztBQUFBLFlBQ0dELEtBREgsY0FDR0EsS0FESDs7QUFFdEMsZUFBS2dJLFFBQUwsQ0FBYyxFQUFDdEksd0JBQUQsRUFBY0Msc0JBQWQsRUFBMEJNLGtCQUExQixFQUFvQ0QsWUFBcEMsRUFBZDtBQUNELE9BSEQsRUFHRyxVQUFDWixHQUFELEVBQVM7QUFDVnhCLGdCQUFRQyxHQUFSLENBQVksK0JBQVosRUFBNkN1QixHQUE3QztBQUNELE9BTEQ7QUFNRDs7OzJDQUVzQnFJLFMsRUFBVztBQUFBOztBQUNoQyxXQUFLTyxRQUFMLENBQWMsRUFBQ1AsV0FBV0EsU0FBWixFQUF1QkcsVUFBVSxLQUFqQyxFQUFkLEVBQXVELFlBQU07QUFDM0QsZUFBS0UsVUFBTDtBQUNBLGVBQUtyRyxpQkFBTDtBQUNELE9BSEQ7QUFJRDs7O29DQUVlO0FBQ2QsV0FBS3dHLElBQUwsQ0FBVUMsUUFBVixDQUFtQkMsU0FBbkIsQ0FBNkJDLE1BQTdCLENBQW9DLFVBQXBDO0FBQ0EsV0FBS0gsSUFBTCxDQUFVSSxLQUFWLENBQWdCRixTQUFoQixDQUEwQkMsTUFBMUIsQ0FBaUMsUUFBakM7QUFDQSxXQUFLSCxJQUFMLENBQVVLLG1CQUFWLENBQThCSCxTQUE5QixDQUF3Q0MsTUFBeEMsQ0FBK0MsU0FBL0M7QUFDQSxXQUFLSCxJQUFMLENBQVVNLG1CQUFWLENBQThCSixTQUE5QixDQUF3Q0MsTUFBeEMsQ0FBK0MsU0FBL0M7QUFDRDs7O3VDQUVrQjtBQUNqQnhLLGNBQVFDLEdBQVIsQ0FBWSxLQUFLc0ksS0FBakI7QUFDQSxXQUFLQSxLQUFMLENBQVdxQyxPQUFYLENBQW1CdkIsSUFBbkIsQ0FBd0IsUUFBeEI7QUFDRDs7O3dDQUVtQjtBQUNsQixhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsU0FBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLEtBQUksT0FBVCxFQUFnQixXQUFVLFlBQTFCLEVBQXVDLFNBQVMsS0FBS0ssYUFBckQ7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGtCQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsYUFBZjtBQUFBO0FBQUEsYUFERjtBQUVFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLGFBQWYsRUFBNkIsU0FBUyxLQUFLQyxnQkFBM0M7QUFBQTtBQUFBLGFBRkY7QUFHRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxhQUFmO0FBQUE7QUFBQTtBQUhGO0FBREY7QUFERixPQURGO0FBV0Q7OzsrQkFFVWtCLEcsRUFBS0MsVyxFQUFhO0FBQUE7O0FBQzNCLFdBQUtWLFFBQUwsQ0FBYyxFQUFDTixnQkFBZ0JlLEdBQWpCLEVBQWQsRUFBcUMsWUFBTTtBQUN6QyxZQUFJQyxXQUFKLEVBQWlCO0FBQ2YsaUJBQUtaLFVBQUw7QUFDQSxpQkFBS3JHLGlCQUFMO0FBQ0Q7QUFDRixPQUxEO0FBTUQ7OztvQ0FFZTtBQUNkLFdBQUt1RyxRQUFMLENBQWMsRUFBQ0osVUFBVSxDQUFDLEtBQUtKLEtBQUwsQ0FBV0ksUUFBdkIsRUFBZDtBQUNBLFdBQUtLLElBQUwsQ0FBVVUsY0FBVixDQUF5QkMsU0FBekIsR0FBcUMsQ0FBckM7QUFDRDs7O2lEQUU0QjtBQUFBOztBQUMzQixhQUNFLEtBQUtwQixLQUFMLENBQVc5SCxXQUFYLENBQXVCUSxlQUF2QixDQUF1Q0osR0FBdkMsQ0FBMkMsVUFBQ0ssV0FBRCxFQUFjMEksS0FBZCxFQUF3QjtBQUNqRSxZQUFJLE9BQUtyQixLQUFMLENBQVdJLFFBQVgsSUFBdUIsT0FBS0MsVUFBTCxDQUFnQixPQUFLTCxLQUFMLENBQVdDLFNBQTNCLENBQXZCLElBQWdFLENBQUMsT0FBS0QsS0FBTCxDQUFXSSxRQUFaLElBQXdCaUIsUUFBUSxDQUFwRyxFQUF1RztBQUNyRyxjQUFJLE9BQUtyQixLQUFMLENBQVdJLFFBQWYsRUFBeUI7QUFDdkIsbUJBQUtDLFVBQUwsQ0FBZ0IsT0FBS0wsS0FBTCxDQUFXQyxTQUEzQixJQUF3QyxJQUF4QyxDQUR1QixDQUN1QjtBQUMvQztBQUNELGlCQUNFO0FBQUE7QUFBQSxjQUFLLEtBQUssc0JBQXNCb0IsS0FBaEMsRUFBdUMsV0FBVSxxQkFBakQ7QUFDRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxrQkFBZjtBQUNFO0FBQUE7QUFBQSxrQkFBTSxXQUFVLFVBQWhCO0FBQTRCMUksNEJBQVlsQztBQUF4QyxlQURGO0FBRUU7QUFBQTtBQUFBLGtCQUFNLFdBQVUsY0FBaEI7QUFBZ0NrQyw0QkFBWUMsT0FBWixHQUFzQjtBQUF0RDtBQUZGLGFBREY7QUFPRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxxQ0FBZjtBQUNFLHFEQUFLLFdBQVUsUUFBZixFQUF3QixPQUFRLEVBQUMwSSxVQUFVM0ksWUFBWUMsT0FBWixHQUFzQixHQUFqQyxFQUFoQztBQURGO0FBUEYsV0FERjtBQWVELFNBbkJELE1BbUJPO0FBQ0wsaUJBQU8sSUFBUDtBQUNEO0FBQ0YsT0F2QkQsQ0FERjtBQTBCRDs7O3lDQUVvQjtBQUFBOztBQUFBLG1CQUNtQixLQUFLb0gsS0FEeEI7QUFBQSxVQUNaQyxTQURZLFVBQ1pBLFNBRFk7QUFBQSxtQ0FDREcsUUFEQztBQUFBLFVBQ0RBLFFBREMsbUNBQ1UsS0FEVjs7QUFFbkIsVUFBTW1CLFVBQVUsS0FBS3ZCLEtBQUwsQ0FBVzlILFdBQVgsSUFBMEJFLE9BQU9DLElBQVAsQ0FBWSxLQUFLMkgsS0FBTCxDQUFXOUgsV0FBdkIsRUFBb0N4QyxNQUFwQyxHQUE2QyxDQUF2RjtBQUNFLGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFlBQUssS0FBSSxnQkFBVCxFQUEwQixXQUFXLGtDQUFrQzBLLFdBQVcsb0JBQVgsR0FBa0MsRUFBcEUsQ0FBckM7QUFDR21CLG9CQUNEO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLGtCQUFmO0FBQ0d0Qiw0QkFBY2pHLGVBQWQsR0FBcUIsS0FBS3dILDBCQUFMLEVBQXJCLEdBQXlELElBRDVEO0FBRUd2Qiw0QkFBY2xHLGdCQUFkLEdBQXNCLEtBQUt5SCwwQkFBTCxFQUF0QixHQUEwRCxJQUY3RDtBQUdHdkIsNEJBQWN4RyxlQUFkLEdBQXFCLEtBQUsrSCwwQkFBTCxFQUFyQixHQUF5RDtBQUg1RDtBQURGLFdBREMsR0FRRDtBQUFBO0FBQUEsY0FBSyxXQUFVLHlCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURGO0FBRUcsbUJBQU8xQyxNQUFQLEtBQW1CLFdBQW5CLElBQWtDLENBQUNBLE9BQU8yQyxRQUExQyxJQUFzRDtBQUFBO0FBQUEsZ0JBQUssV0FBVSxlQUFmO0FBQStCO0FBQUE7QUFBQSxrQkFBRyxNQUFLLFFBQVI7QUFBaUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFqQixlQUEvQjtBQUFBO0FBQUE7QUFGekQ7QUFURixTQURGO0FBZ0JFO0FBQUE7QUFBQSxZQUFLLFdBQVUsZUFBZixFQUErQixTQUFTO0FBQUEscUJBQU0sT0FBS0MsYUFBTCxFQUFOO0FBQUEsYUFBeEM7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFXdEIsV0FBVyxnQkFBWCxHQUE4QixFQUE5QyxFQUFrRCxLQUFJLGFBQXRELEVBQW9FLE9BQU0sNEJBQTFFLEVBQXVHLE9BQU0sSUFBN0csRUFBa0gsUUFBTyxJQUF6SCxFQUE4SCxTQUFRLFdBQXRJO0FBQ0Usb0RBQU0sR0FBRSxpREFBUjtBQURGO0FBREYsU0FoQkY7QUFxQkU7QUFBQTtBQUFBLFlBQUssV0FBVyxtQkFBbUIsQ0FBQ21CLE9BQUQsR0FBVyxRQUFYLEdBQXNCLEVBQXpDLENBQWhCO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxLQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFNLFdBQVUsUUFBaEIsRUFBeUIsU0FBUztBQUFBLHlCQUFNLE9BQUtoTCxVQUFMLENBQWdCLElBQWhCLENBQU47QUFBQSxpQkFBbEM7QUFBQTtBQUFBO0FBREY7QUFERjtBQXJCRixPQURGO0FBNkJIOzs7cUNBQ2dCO0FBQ2YsVUFBTUcsT0FBTyxJQUFJRyxJQUFKLEVBQWI7QUFDQSxVQUFNOEssWUFBWUMsc0JBQVdsTCxLQUFLVyxRQUFMLEVBQVgsQ0FBbEI7QUFDQSxVQUFNd0ssV0FBV25MLEtBQUtPLE9BQUwsRUFBakI7QUFDQSxhQUFPNEssV0FBVyxHQUFYLEdBQWlCRixTQUFqQixHQUE2QixHQUE3QixHQUFtQ2pMLEtBQUthLFdBQUwsRUFBMUM7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQUEsb0JBQzhHLEtBQUt5SSxLQURuSDtBQUFBLFVBQ0FDLFNBREEsV0FDQUEsU0FEQTtBQUFBLFVBQ1dDLGNBRFgsV0FDV0EsY0FEWDtBQUFBLHFDQUMyQnpILFFBRDNCO0FBQUEsVUFDMkJBLFFBRDNCLG9DQUNzQzBILFNBRHRDO0FBQUEsa0NBQ2lEM0gsS0FEakQ7QUFBQSxVQUNpREEsS0FEakQsaUNBQ3lEMkgsU0FEekQ7QUFBQSxxQ0FDb0VDLFFBRHBFO0FBQUEsVUFDb0VBLFFBRHBFLG9DQUMrRSxLQUQvRTtBQUFBLFVBQ3NGbkIsUUFEdEYsV0FDc0ZBLFFBRHRGO0FBQUEsVUFDZ0c5RyxVQURoRyxXQUNnR0EsVUFEaEc7O0FBRVAsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLEVBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRSxpREFBSyxLQUFJLFVBQVQsRUFBb0IsV0FBVyx1QkFBdUIrSCxpQkFBaUIsVUFBakIsR0FBOEIsRUFBckQsQ0FBL0IsRUFBeUYsU0FBUztBQUFBLHFCQUFNLE9BQUszSixVQUFMLENBQWdCLEtBQWhCLENBQU47QUFBQSxhQUFsRyxHQURGO0FBR0csZUFBS3VMLGlCQUFMLEVBSEg7QUFJRTtBQUFBO0FBQUEsY0FBSyxLQUFJLGFBQVQsRUFBdUIsV0FBVSxhQUFqQztBQUNFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLEVBQWY7QUFDRSxxREFBSyxTQUFNLG9CQUFYLEdBREY7QUFFRTtBQUFBO0FBQUEsa0JBQUssS0FBSSxxQkFBVCxFQUErQixXQUFVLGdCQUF6QztBQUNFO0FBQUE7QUFBQSxvQkFBSyxXQUFVLFVBQWY7QUFDRTtBQUFBO0FBQUEsc0JBQU0sV0FBVSxxQkFBaEIsRUFBc0MsU0FBUyxLQUFLaEMsYUFBcEQ7QUFBbUUsMkRBQUssV0FBVSxXQUFmLEVBQTJCLEtBQUksZUFBL0I7QUFBbkU7QUFERixpQkFERjtBQUtFO0FBQUE7QUFBQSxvQkFBSyxXQUFVLFNBQWY7QUFDRTtBQUFBO0FBQUEsc0JBQUssV0FBVSxRQUFmO0FBQUE7QUFBQSxtQkFERjtBQUVFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSx3QkFBTSxXQUFVLEtBQWhCO0FBQUE7QUFBQSxxQkFERjtBQUVFO0FBQUE7QUFBQSx3QkFBTSxXQUFVLGFBQWhCO0FBQWdDLDZCQUFPckgsUUFBUCxLQUFxQixXQUFyQixHQUFtQ0EsUUFBbkMsR0FBOEM7QUFBOUU7QUFGRixtQkFGRjtBQU1FO0FBQUE7QUFBQSxzQkFBSyxXQUFVLFlBQWY7QUFDRTtBQUFBO0FBQUE7QUFBSztBQUFBO0FBQUEsMEJBQU0sV0FBVSxLQUFoQjtBQUF1Qiw2QkFBS3NKLGNBQUw7QUFBdkI7QUFBTDtBQURGO0FBTkYsaUJBTEY7QUFnQkU7QUFBQTtBQUFBLG9CQUFLLFdBQVUsZ0JBQWY7QUFDRTtBQUFBO0FBQUEsc0JBQU0sV0FBVyxpQkFBaUI5QixjQUFjakcsZUFBZCxHQUFxQixtQkFBckIsR0FBMkMsRUFBNUQsQ0FBakIsRUFBa0YsU0FBUyxtQkFBTTtBQUFDLCtCQUFLZ0ksc0JBQUwsQ0FBNEJoSSxlQUE1QjtBQUFrQyx1QkFBcEk7QUFBQTtBQUFBLG1CQURGO0FBRUU7QUFBQTtBQUFBLHNCQUFNLFdBQVcsaUJBQWlCaUcsY0FBY2xHLGdCQUFkLEdBQXNCLG1CQUF0QixHQUE0QyxFQUE3RCxDQUFqQixFQUFtRixTQUFTLG1CQUFNO0FBQUMsK0JBQUtpSSxzQkFBTCxDQUE0QmpJLGdCQUE1QjtBQUFtQyx1QkFBdEk7QUFBQTtBQUFBLG1CQUZGO0FBR0U7QUFBQTtBQUFBLHNCQUFNLFdBQVcsaUJBQWlCa0csY0FBY3hHLGVBQWQsR0FBcUIsbUJBQXJCLEdBQTJDLEVBQTVELENBQWpCLEVBQWtGLFNBQVMsbUJBQU07QUFBQywrQkFBS3VJLHNCQUFMLENBQTRCdkksZUFBNUI7QUFBa0MsdUJBQXBJO0FBQUE7QUFBQTtBQUhGLGlCQWhCRjtBQXFCRTtBQUFBO0FBQUEsb0JBQUssV0FBVSxvQkFBZjtBQUNFO0FBQUE7QUFBQSxzQkFBSyxXQUFVLFFBQWY7QUFDRTtBQUFBO0FBQUEsd0JBQUssV0FBVSxvQkFBZjtBQUNFO0FBQUE7QUFBQSwwQkFBTSxPQUFNLElBQVosRUFBaUIsUUFBTyxJQUF4QixFQUE2QixTQUFRLFdBQXJDO0FBQWlELGdFQUFNLEdBQUUseUdBQVI7QUFBakQ7QUFERixxQkFERjtBQUlFO0FBQUE7QUFBQSx3QkFBSyxXQUFVLGtCQUFmO0FBQW1DLHFDQUFlLE9BQU9qQixLQUFQLEtBQWtCLFdBQWxCLEdBQStCQSxLQUEvQixHQUFzQyxHQUFyRDtBQUFuQztBQUpGLG1CQURGO0FBUUU7QUFBQTtBQUFBLHNCQUFLLFdBQVUsU0FBZjtBQUNFO0FBQUE7QUFBQSx3QkFBSyxXQUFVLHNCQUFmO0FBQ0U7QUFBQTtBQUFBLDBCQUFLLFdBQVUsVUFBZixFQUEwQixPQUFNLElBQWhDLEVBQXFDLFFBQU8sSUFBNUMsRUFBaUQsU0FBUSxXQUF6RDtBQUFxRSxnRUFBTSxHQUFFLHdHQUFSO0FBQXJFO0FBREYscUJBREY7QUFJRTtBQUFBO0FBQUEsd0JBQUssV0FBVSxrQkFBZjtBQUFtQyxzQ0FBZ0JMLGNBQWMsT0FBT0EsV0FBVzNCLE1BQWxCLEtBQThCLFdBQTVDLEdBQTBEMkIsV0FBVzNCLE1BQXJFLEdBQThFLEdBQTlGO0FBQW5DO0FBSkY7QUFSRixpQkFyQkY7QUFvQ0cscUJBQUt5TCxrQkFBTDtBQXBDSDtBQUZGLGFBREY7QUEwQ0doRCx3QkFBWUEsU0FBUzlFLGVBQXJCLElBQXlDOEUsU0FBUzlFLGVBQVQsQ0FBeUJ6RSxNQUF6QixHQUFrQyxDQUEzRSxHQUNDO0FBQUE7QUFBQSxnQkFBSyxXQUFVLG9CQUFmO0FBQ0U7QUFBQTtBQUFBLGtCQUFLLEtBQUkscUJBQVQsRUFBK0IsV0FBVSxnQkFBekM7QUFDRTtBQUFBO0FBQUEsb0JBQUssV0FBVSwrQkFBZjtBQUNFO0FBQUE7QUFBQTtBQUFPO0FBQVA7QUFERixpQkFERjtBQUlHdUssOEJBQWNqRyxlQUFkLEdBQXNCLDhCQUFDLGVBQUQsSUFBTyxVQUFVaUYsUUFBakIsRUFBMkIsS0FBS2dCLFNBQWhDLEdBQXRCLEdBQXFFLElBSnhFO0FBS0dBLDhCQUFjbEcsZ0JBQWQsR0FBdUIsOEJBQUMsZUFBRCxJQUFPLFVBQVVrRixRQUFqQixFQUEyQixLQUFLZ0IsU0FBaEMsR0FBdkIsR0FBc0UsSUFMekU7QUFNR0EsOEJBQWN4RyxlQUFkLEdBQXNCLDhCQUFDLGVBQUQsSUFBTyxVQUFVd0YsUUFBakIsRUFBMkIsS0FBS2dCLFNBQWhDLEdBQXRCLEdBQXFFO0FBTnhFO0FBREYsYUFERCxHQVdVO0FBckRiO0FBSkYsU0FERjtBQTZER0MseUJBQ0M7QUFBQTtBQUFBO0FBQ0csd0NBQUMsb0JBQUQsSUFBWSxZQUFZLEtBQUszSixVQUE3QjtBQURILFNBREQsR0FHVTtBQWhFYixPQURGO0FBb0VEOzs7O0VBOU8rQnlILGdCOztrQkFBYjZCLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHJCOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVNcUMsSzs7O0FBQ0osaUJBQVl2RCxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsOEdBQ1hBLEtBRFc7O0FBRWpCLFVBQUt3RCxJQUFMLEdBQVksTUFBS0EsSUFBTCxDQUFVdEQsSUFBVixPQUFaO0FBQ0EsVUFBS25LLE1BQUwsR0FBYyxNQUFLQSxNQUFMLENBQVltSyxJQUFaLE9BQWQ7QUFDQSxVQUFLdkksTUFBTCxHQUFjLE1BQUtBLE1BQUwsQ0FBWXVJLElBQVosT0FBZDtBQUNBLFVBQUttQixLQUFMLEdBQWE7QUFDWGxMLGdCQUFVLEVBREM7QUFFWEMsZ0JBQVU7QUFGQyxLQUFiO0FBTGlCO0FBU2xCOzs7OzJCQUVNO0FBQ0wsYUFDRTtBQUFDLDZCQUFEO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREYsT0FERjtBQUtEOzs7NkJBRVE7QUFDUCw0QkFBTyxFQUFDRCxVQUFVLEtBQUtrTCxLQUFMLENBQVdsTCxRQUF0QixFQUFnQ0MsVUFBVSxLQUFLaUwsS0FBTCxDQUFXakwsUUFBckQsRUFBUDtBQUNEOzs7MkJBRU1xTixhLEVBQWU7QUFBQTs7QUFBQSxtQkFDTyxLQUFLcEMsS0FEWjtBQUFBLFVBQ2ZsTCxRQURlLFVBQ2ZBLFFBRGU7QUFBQSxVQUNMQyxRQURLLFVBQ0xBLFFBREs7O0FBRXBCLFVBQUlxTixhQUFKLEVBQW1CO0FBQ2pCdE4sbUJBQVcsUUFBWDtBQUNBQyxtQkFBVyxjQUFYO0FBQ0Q7QUFDRCw0QkFBTyxFQUFDRCxVQUFVQSxRQUFYLEVBQXFCQyxVQUFVQSxRQUEvQixFQUFQLEVBQWlEUyxJQUFqRCxDQUFzRCxVQUFDK0ssSUFBRCxFQUFVO0FBQzlELFlBQUlBLEtBQUt2SSxJQUFMLElBQWEsQ0FBQ3VJLEtBQUt2SSxJQUFMLENBQVVwQyxLQUE1QixFQUFtQztBQUNqQ1Esa0JBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0EsaUJBQUtzSSxLQUFMLENBQVdxQyxPQUFYLENBQW1CdkIsSUFBbkIsQ0FBd0IsT0FBeEIsRUFBaUMsRUFBakM7QUFDQSxjQUFJLE9BQU9YLE1BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbENBLG1CQUFPMkMsUUFBUCxHQUFrQixJQUFsQjtBQUNEO0FBQ0YsU0FORCxNQU1PO0FBQ0xyTCxrQkFBUUMsR0FBUixDQUFZLGtCQUFaLEVBQWdDa0ssSUFBaEM7QUFDRDtBQUNGLE9BVkQsRUFVRzhCLEtBVkgsQ0FVUyxVQUFDekssR0FBRCxFQUFTO0FBQ2hCeEIsZ0JBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ3VCLEdBQWhDO0FBQ0QsT0FaRDtBQWFEOzs7NkJBRVE7QUFBQTs7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNHLGFBQUt1SyxJQUFMLEVBREg7QUFFRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLHNCQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsV0FBZjtBQUNFO0FBQUE7QUFBQSxrQkFBSyxXQUFVLFVBQWY7QUFDRSx5REFBTyxXQUFVLGNBQWpCLEVBQWdDLGFBQVksVUFBNUMsRUFBdUQsT0FBTyxLQUFLbkMsS0FBTCxDQUFXbEwsUUFBekUsRUFBbUYsVUFBWSxrQkFBQ29CLENBQUQ7QUFBQSwyQkFBTyxPQUFLc0ssUUFBTCxDQUFjLEVBQUMxTCxVQUFVb0IsRUFBRW9NLE1BQUYsQ0FBU0MsS0FBcEIsRUFBZCxDQUFQO0FBQUEsbUJBQS9GLEVBQWlKLE1BQUssTUFBdEo7QUFERixlQURGO0FBSUU7QUFBQTtBQUFBLGtCQUFLLFdBQVUsaUJBQWY7QUFDRSx5REFBTyxXQUFVLGNBQWpCLEVBQWdDLGFBQVksVUFBNUMsRUFBdUQsT0FBTyxLQUFLdkMsS0FBTCxDQUFXakwsUUFBekUsRUFBbUYsVUFBWSxrQkFBQ21CLENBQUQ7QUFBQSwyQkFBTyxPQUFLc0ssUUFBTCxDQUFjLEVBQUN6TCxVQUFVbUIsRUFBRW9NLE1BQUYsQ0FBU0MsS0FBcEIsRUFBZCxDQUFQO0FBQUEsbUJBQS9GLEVBQWlKLE1BQUssVUFBdEo7QUFERjtBQUpGLGFBREY7QUFTRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxrQkFBSyxXQUFVLFFBQWY7QUFDRTtBQUFBO0FBQUEsb0JBQU0sV0FBVSxRQUFoQixFQUF3QixTQUFTLEtBQUtqTSxNQUF0QztBQUFBO0FBQUE7QUFERixlQURGO0FBSUU7QUFBQTtBQUFBLGtCQUFLLFdBQVUsUUFBZjtBQUNFO0FBQUE7QUFBQSxvQkFBTSxXQUFVLFFBQWhCLEVBQXlCLFNBQVMsS0FBSzVCLE1BQXZDO0FBQUE7QUFBQTtBQURGO0FBSkYsYUFURjtBQWlCRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxrQkFBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUEsb0JBQU0sV0FBVSxRQUFoQixFQUF5QixTQUFTO0FBQUEsNkJBQU0sT0FBSzRCLE1BQUwsQ0FBWSxJQUFaLENBQU47QUFBQSxxQkFBbEM7QUFBQTtBQUFBO0FBREY7QUFERjtBQWpCRjtBQURGO0FBRkYsT0FERjtBQThCRDs7OztFQTVFaUIwSCxnQjs7a0JBOEVMa0UsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGZjs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBQ0E7O0lBRXFCTSxVOzs7QUFDbkIsc0JBQVk3RCxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsd0hBQ1hBLEtBRFc7O0FBRWpCLFVBQUs4RCxVQUFMLEdBQWtCLE1BQUtBLFVBQUwsQ0FBZ0I1RCxJQUFoQixPQUFsQjtBQUNBLFVBQUs2RCxnQkFBTCxHQUF3QixNQUFLQSxnQkFBTCxDQUFzQjdELElBQXRCLE9BQXhCOztBQUVBLFVBQUttQixLQUFMLEdBQWE7QUFDWHJKLFlBQU0sU0FESztBQUVYSCxjQUFRLEVBRkc7QUFHWEMsZ0JBQVUsRUFIQztBQUlYa00sV0FBSyxFQUpNO0FBS1hsSSxhQUFPLEVBTEk7QUFNWG1JLFlBQU0sRUFOSztBQU9YaE4sYUFBTztBQVBJLEtBQWI7QUFMaUI7QUFjbEI7Ozs7K0JBRVVlLEksRUFBTTtBQUNmLFdBQUs2SixRQUFMLENBQWMsRUFBQzdKLE1BQU1BLElBQVAsRUFBZDtBQUNEOzs7aUNBRVlzSyxHLEVBQUk7QUFDZixXQUFLVCxRQUFMLENBQWMsRUFBQ2hLLFFBQVF5SyxHQUFULEVBQWQ7QUFDRDs7OytCQUVVQSxHLEVBQUs0QixPLEVBQVNDLEksRUFBTTtBQUM3QixXQUFLdEMsUUFBTCxjQUFrQlMsR0FBbEI7QUFDQSxVQUFJNEIsV0FBVzVCLElBQUk0QixPQUFKLEVBQWFuTixNQUFiLEtBQXdCLENBQW5DLElBQXdDb04sSUFBNUMsRUFBa0Q7QUFDaEQsYUFBS3JDLElBQUwsQ0FBVXFDLElBQVYsRUFBZ0JDLEtBQWhCO0FBQ0Q7QUFDRjs7O2tDQUVhO0FBQUEsbUJBQ2UsS0FBSy9DLEtBRHBCO0FBQUEsVUFDTDJDLEdBREssVUFDTEEsR0FESztBQUFBLFVBQ0FsSSxLQURBLFVBQ0FBLEtBREE7QUFBQSxVQUNPbUksSUFEUCxVQUNPQSxJQURQOztBQUVaLFVBQU1JLFVBQVUsV0FBaEI7QUFDQSxVQUFNQyxjQUFjLFNBQXBCO0FBQ0EsVUFBSSxDQUFDRCxRQUFRRSxJQUFSLENBQWFQLEdBQWIsQ0FBRCxJQUFzQixDQUFDSyxRQUFRRSxJQUFSLENBQWF6SSxLQUFiLENBQXZCLElBQThDLENBQUN3SSxZQUFZQyxJQUFaLENBQWlCTixJQUFqQixDQUFuRCxFQUEyRTtBQUN6RSxlQUFPLEtBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLbE0sSUFBTCxHQUFZLElBQUlHLElBQUosQ0FBU0QsU0FBU2dNLElBQVQsQ0FBVCxFQUF5QmhNLFNBQVM2RCxLQUFULENBQXpCLEVBQTBDN0QsU0FBUytMLEdBQVQsQ0FBMUMsQ0FBWjtBQUNBLGVBQU8sSUFBUDtBQUNEO0FBQ0Y7OztxQ0FDZ0I7QUFDZixVQUFJUSxNQUFNLE9BQVY7QUFEZSxvQkFFWSxLQUFLbkQsS0FGakI7QUFBQSxVQUVSeEosTUFGUSxXQUVSQSxNQUZRO0FBQUEsVUFFQUMsUUFGQSxXQUVBQSxRQUZBOztBQUdmLFVBQUksQ0FBQ0QsTUFBRCxJQUFXLENBQUMyTSxJQUFJRCxJQUFKLENBQVMxTSxNQUFULENBQWhCLEVBQWtDO0FBQ2hDLGFBQUtnSyxRQUFMLENBQWMsRUFBQzVLLE9BQU8sRUFBQ1ksUUFBUSwrQkFBVCxFQUFSLEVBQWQ7QUFDQSxlQUFPLEtBQVA7QUFDRDtBQUNELFVBQUksQ0FBQ0MsUUFBTCxFQUFlO0FBQ2IsYUFBSytKLFFBQUwsQ0FBYyxFQUFDNUssT0FBTyxFQUFDYSxVQUFVLGlDQUFYLEVBQVIsRUFBZDtBQUNBLGVBQU8sS0FBUDtBQUNEO0FBQ0QsVUFBSSxDQUFDLEtBQUsyTSxXQUFMLEVBQUwsRUFBeUI7QUFDdkIsYUFBSzVDLFFBQUwsQ0FBYyxFQUFDNUssT0FBTyxFQUFDYyxNQUFNLDZCQUFQLEVBQVIsRUFBZDtBQUNBLGVBQU8sS0FBUDtBQUNEO0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7Ozt1Q0FDa0I7QUFBQTs7QUFBQSxvQkFDa0MsS0FBS3NKLEtBRHZDO0FBQUEsVUFDVnhKLE1BRFUsV0FDVkEsTUFEVTtBQUFBLFVBQ0ZtTSxHQURFLFdBQ0ZBLEdBREU7QUFBQSxVQUNHbEksS0FESCxXQUNHQSxLQURIO0FBQUEsVUFDVW1JLElBRFYsV0FDVUEsSUFEVjtBQUFBLFVBQ2dCak0sSUFEaEIsV0FDZ0JBLElBRGhCO0FBQUEsVUFDc0JGLFFBRHRCLFdBQ3NCQSxRQUR0Qjs7QUFFakIsVUFBTTRNLHNCQUFzQixLQUFLQyxjQUFMLEVBQTVCO0FBQ0EsVUFBSUQsbUJBQUosRUFBeUI7QUFDdkIsWUFBTW5GLFNBQVMsRUFBRTFILGNBQUYsRUFBVUcsVUFBVixFQUFnQkQsTUFBTSxLQUFLQSxJQUEzQixFQUFpQ0Qsa0JBQWpDLEVBQWY7QUFDQSxtQ0FBWXlILE1BQVosRUFBb0IxSSxJQUFwQixDQUF5QixVQUFDWixRQUFELEVBQWM7QUFDckMsaUJBQUsrSixLQUFMLENBQVdwSSxVQUFYLENBQXNCLEtBQXRCLEVBQTZCLElBQTdCO0FBQ0QsU0FGRCxFQUVHLFVBQUNxQixHQUFELEVBQVM7QUFDVnhCLGtCQUFRQyxHQUFSLENBQVksOEJBQVosRUFBMkN1QixHQUEzQztBQUNBLGlCQUFLK0csS0FBTCxDQUFXcEksVUFBWCxDQUFzQixLQUF0QixFQUE2QixLQUE3QjtBQUNELFNBTEQ7QUFNRDtBQUNGOzs7a0NBRWFJLEksRUFBTTtBQUNsQixVQUFNNE0sVUFBVSxFQUFoQjtBQUNBLFVBQUk1TSxTQUFTLEtBQWIsRUFBb0I7QUFDbEI0TSxnQkFBUTlELElBQVIsQ0FBYTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQWI7QUFDQSxhQUFJLElBQUlFLElBQUksQ0FBWixFQUFlQSxJQUFJLEVBQW5CLEVBQXdCQSxHQUF4QixFQUE2QjtBQUMzQjRELGtCQUFROUQsSUFBUixDQUFhO0FBQUE7QUFBQSxjQUFRLE9BQU9FLENBQWY7QUFBbUJBO0FBQW5CLFdBQWI7QUFDRDtBQUNGLE9BTEQsTUFLTyxJQUFJaEosU0FBUyxPQUFiLEVBQXNCO0FBQzNCNE0sZ0JBQVE5RCxJQUFSLENBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFiO0FBQ0EsYUFBSSxJQUFJRSxLQUFJLENBQVosRUFBZUEsS0FBSSxFQUFuQixFQUF3QkEsSUFBeEIsRUFBNkI7QUFDM0I0RCxrQkFBUTlELElBQVIsQ0FBYTtBQUFBO0FBQUEsY0FBUSxPQUFPRSxFQUFmO0FBQW1CNkQsdUNBQWdCN0QsRUFBaEI7QUFBbkIsV0FBYjtBQUNEO0FBQ0YsT0FMTSxNQUtBLElBQUloSixTQUFTLE1BQWIsRUFBcUI7QUFDMUI0TSxnQkFBUTlELElBQVIsQ0FBYTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQWI7QUFDQSxhQUFJLElBQUlFLE1BQUksSUFBWixFQUFrQkEsTUFBSSxJQUF0QixFQUE2QkEsS0FBN0IsRUFBa0M7QUFDaEM0RCxrQkFBUTlELElBQVIsQ0FBYTtBQUFBO0FBQUEsY0FBUSxPQUFPRSxHQUFmO0FBQW1CQTtBQUFuQixXQUFiO0FBQ0Q7QUFDRjtBQUNELGFBQU80RCxPQUFQO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUFBLG9CQUNtRCxLQUFLdkQsS0FEeEQ7QUFBQSxVQUNBckosSUFEQSxXQUNBQSxJQURBO0FBQUEsVUFDTUgsTUFETixXQUNNQSxNQUROO0FBQUEsVUFDY21NLEdBRGQsV0FDY0EsR0FEZDtBQUFBLFVBQ21CbEksS0FEbkIsV0FDbUJBLEtBRG5CO0FBQUEsVUFDMEJtSSxJQUQxQixXQUMwQkEsSUFEMUI7QUFBQSxVQUNnQ25NLFFBRGhDLFdBQ2dDQSxRQURoQztBQUFBLFVBQzBDYixLQUQxQyxXQUMwQ0EsS0FEMUM7OztBQUdQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSx5QkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsNEJBQWY7QUFDRTtBQUFBO0FBQUEsY0FBTSxXQUFXLGFBQWFlLFNBQVMsU0FBVCxHQUFxQixjQUFyQixHQUFzQyxFQUFuRCxDQUFqQixFQUEwRSxTQUFTO0FBQUEsdUJBQU0sT0FBSzhMLFVBQUwsQ0FBZ0IsU0FBaEIsQ0FBTjtBQUFBLGVBQW5GO0FBQUE7QUFBQSxXQURGO0FBRUU7QUFBQTtBQUFBLGNBQU0sV0FBVyxhQUFhOUwsU0FBUyxRQUFULEdBQW9CLGNBQXBCLEdBQXFDLEVBQWxELENBQWpCLEVBQXdFLFNBQVM7QUFBQSx1QkFBTSxPQUFLOEwsVUFBTCxDQUFnQixRQUFoQixDQUFOO0FBQUEsZUFBakY7QUFBQTtBQUFBO0FBRkYsU0FERjtBQUtFO0FBQUE7QUFBQSxZQUFLLFdBQVUsbUJBQWY7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREE7QUFFRSxtREFBTyxNQUFLLE1BQVosRUFBbUIsYUFBWSxRQUEvQixFQUF3QyxVQUFVLGtCQUFDdk0sQ0FBRDtBQUFBLHFCQUFPLE9BQUt1TixZQUFMLENBQWtCdk4sRUFBRW9NLE1BQUYsQ0FBU0MsS0FBM0IsQ0FBUDtBQUFBLGFBQWxELEVBQTRGLE9BQU8vTCxNQUFuRyxHQUZGO0FBR0daLGdCQUFNWSxNQUFOLEdBQWU7QUFBQTtBQUFBLGNBQUssV0FBVSxVQUFmO0FBQTJCWixrQkFBTVk7QUFBakMsV0FBZixHQUFnRTtBQUhuRSxTQUxGO0FBVUU7QUFBQTtBQUFBLFlBQU0sV0FBVSxxQkFBaEI7QUFDRSxtREFBTyxNQUFLLE1BQVosRUFBbUIsYUFBWSxVQUEvQixFQUEwQyxVQUFVLGtCQUFDTixDQUFEO0FBQUEscUJBQU8sT0FBS3NLLFFBQUwsQ0FBYyxFQUFDL0osVUFBVVAsRUFBRW9NLE1BQUYsQ0FBU0MsS0FBcEIsRUFBZCxDQUFQO0FBQUEsYUFBcEQsRUFBc0csT0FBTzlMLFFBQTdHLEdBREY7QUFFR2IsZ0JBQU1hLFFBQU4sR0FBaUI7QUFBQTtBQUFBLGNBQUssV0FBVSxVQUFmO0FBQTJCYixrQkFBTWE7QUFBakMsV0FBakIsR0FBb0U7QUFGdkUsU0FWRjtBQWNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsZ0JBQWY7QUFJRTtBQUFBO0FBQUEsY0FBUSxLQUFJLEtBQVosRUFBa0IsVUFBVSxrQkFBQ1AsQ0FBRDtBQUFBLHVCQUFPLE9BQUt3TixVQUFMLENBQWdCLEVBQUNmLEtBQUt6TSxFQUFFb00sTUFBRixDQUFTQyxLQUFmLEVBQWhCLEVBQXVDLEtBQXZDLEVBQThDLE9BQTlDLENBQVA7QUFBQSxlQUE1QjtBQUE0RixpQkFBS29CLGFBQUwsQ0FBbUIsS0FBbkI7QUFBNUYsV0FKRjtBQUtFO0FBQUE7QUFBQSxjQUFRLEtBQUksT0FBWixFQUFvQixVQUFVLGtCQUFDek4sQ0FBRDtBQUFBLHVCQUFPLE9BQUt3TixVQUFMLENBQWdCLEVBQUNqSixPQUFPdkUsRUFBRW9NLE1BQUYsQ0FBU0MsS0FBakIsRUFBaEIsRUFBeUMsT0FBekMsRUFBa0QsTUFBbEQsQ0FBUDtBQUFBLGVBQTlCO0FBQWlHLGlCQUFLb0IsYUFBTCxDQUFtQixPQUFuQjtBQUFqRyxXQUxGO0FBTUU7QUFBQTtBQUFBLGNBQVEsS0FBSSxNQUFaLEVBQW1CLFVBQVUsa0JBQUN6TixDQUFEO0FBQUEsdUJBQU8sT0FBS3dOLFVBQUwsQ0FBZ0IsRUFBQ2QsTUFBTTFNLEVBQUVvTSxNQUFGLENBQVNDLEtBQWhCLEVBQWhCLEVBQXdDLE1BQXhDLENBQVA7QUFBQSxlQUE3QjtBQUFzRixpQkFBS29CLGFBQUwsQ0FBbUIsTUFBbkI7QUFBdEYsV0FORjtBQU9HL04sZ0JBQU1jLElBQU4sR0FBYTtBQUFBO0FBQUEsY0FBSyxXQUFVLFVBQWY7QUFBMkJkLGtCQUFNYztBQUFqQyxXQUFiLEdBQTREO0FBUC9ELFNBZEY7QUF1QkU7QUFBQTtBQUFBLFlBQUssV0FBVSxZQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxXQUFmLEVBQTJCLFNBQVMsS0FBS2dNLGdCQUF6QztBQUFBO0FBQUE7QUFERjtBQXZCRixPQURGO0FBNkJEOzs7O0VBL0hxQzFFLGdCOztrQkFBbkJ3RSxVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xyQjs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFTW9CLFE7OztBQUNKLG9CQUFZakYsS0FBWixFQUFtQjtBQUFBOztBQUFBLG9IQUNYQSxLQURXOztBQUVqQixVQUFLd0QsSUFBTCxHQUFZLE1BQUtBLElBQUwsQ0FBVXRELElBQVYsT0FBWjtBQUZpQjtBQUdsQjs7OzsyQkFFTTtBQUNMLGFBQ0U7QUFBQyw2QkFBRDtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLE9BREY7QUFLRDs7OzZCQUVRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRyxhQUFLc0QsSUFBTCxFQURIO0FBRUU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLFNBRkY7QUFLRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsZ0JBQUksU0FBVTtBQUFBLHlCQUFNLE9BQUt4RCxLQUFMLENBQVdxQyxPQUFYLENBQW1CNkMsTUFBbkIsRUFBTjtBQUFBLGlCQUFkO0FBQUE7QUFBQSxhQURGO0FBSUU7QUFBQTtBQUFBO0FBQ0U7QUFBQyx1Q0FBRDtBQUFBLGtCQUFTLElBQUcsR0FBWjtBQUFBO0FBQUE7QUFERixhQUpGO0FBT0U7QUFBQTtBQUFBO0FBQ0U7QUFBQyx1Q0FBRDtBQUFBLGtCQUFTLElBQUcsUUFBWjtBQUFBO0FBQUE7QUFERjtBQVBGO0FBREY7QUFMRixPQURGO0FBcUJEOzs7O0VBcENvQjdGLGdCOztrQkFzQ1I0RixROzs7Ozs7Ozs7Ozs7Ozs7OztBQzFDUixJQUFNN0osd0JBQVEsT0FBZDtBQUNBLElBQU1OLHNCQUFPLE1BQWI7QUFDQSxJQUFNTyxzQkFBTyxNQUFiO0FBQ0EsSUFBTW9GLDBDQUFpQixFQUFFM0UsT0FBTyxFQUFULEVBQWFtSSxNQUFNLEVBQW5CLEVBQXVCa0IsTUFBTSxDQUE3QixFQUF2QjtBQUNBLElBQU1sQyxrQ0FBYSxDQUFDLFNBQUQsRUFBWSxVQUFaLEVBQXdCLE9BQXhCLEVBQWlDLE9BQWpDLEVBQTBDLEtBQTFDLEVBQWlELE1BQWpELEVBQXlELE1BQXpELEVBQWlFLFFBQWpFLEVBQTJFLFdBQTNFLEVBQXdGLFNBQXhGLEVBQW1HLFVBQW5HLEVBQStHLFVBQS9HLENBQW5CO0FBQ0EsSUFBTzRCLDRDQUFrQixDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixFQUE2QixLQUE3QixFQUFvQyxLQUFwQyxFQUEyQyxLQUEzQyxFQUFrRCxLQUFsRCxFQUF5RCxLQUF6RCxFQUFnRSxLQUFoRSxFQUF1RSxLQUF2RSxFQUE4RSxLQUE5RSxDQUF6QixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMUDs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWUsWUFBTTtBQUNqQixXQUNJO0FBQUMsOEJBQUQ7QUFBQTtBQUNJLHNDQUFDLHFCQUFELElBQU8sTUFBSyxRQUFaLEVBQXFCLFdBQXJCLEVBQTJCLFFBQVEsZ0JBQUM3RSxLQUFEO0FBQUEsdUJBQVcsOEJBQUMsZUFBRCxFQUFXQSxLQUFYLENBQVg7QUFBQSxhQUFuQyxHQURKO0FBR0ksc0NBQUMscUJBQUQsSUFBTyxNQUFLLE9BQVosRUFBb0IsV0FBcEIsRUFBMEIsUUFBUSxnQkFBQ0EsS0FBRDtBQUFBLHVCQUFXLDhCQUFDLGNBQUQsRUFBVUEsS0FBVixDQUFYO0FBQUEsYUFBbEM7QUFISixLQURKO0FBU0gsQzs7Ozs7Ozs7Ozs7QUNsQkQsa0M7Ozs7Ozs7Ozs7O0FDQUEsMkM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsMEM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsNEM7Ozs7Ozs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsNkMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2VydmVyL3NlcnZlci5qc1wiKTtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgYXBwIGZyb20gJy4uL3NlcnZlcidcbmltcG9ydCBFeHBlbnNlcyBmcm9tICcuLi9tb2RlbHMvZXhwZW5zZU1vZGVsJztcbmltcG9ydCBVc2VycyBmcm9tICcuLi9tb2RlbHMvdXNlck1vZGVsJztcbmltcG9ydCB7IE1PTlRILCBZRUFSLCBXRUVLIH0gZnJvbSAnLi4vLi4vc3JjL3BhZ2VzL2NvbnN0YW50cy9jb25zdGFudHMnO1xuXG5leHBvcnQgY29uc3Qgc2lnblVwID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgLy8gVXNlcnMuZGVsZXRlTWFueSh7fSk7XG4gICAgY29uc3QgeyB1c2VybmFtZSA9ICcnLCBwYXNzd29yZCA9ICcnLCBlbWFpbElkID0gJycgfSA9IHJlcXVlc3QuYm9keTtcbiAgICB2YXIgdXNlciA9IG5ldyBVc2Vycyh7XG4gICAgICAgIF9pZDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoKSxcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgIGVtYWlsSWQ6IGVtYWlsSWRcbiAgICB9KTtcbiAgICBVc2Vycy5maW5kKHsgdXNlcm5hbWU6IHVzZXJuYW1lIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoeyBlcnJvcjogdHJ1ZSwgbXNnOiAnVXNlcm5hbWUgYWxyZWFkeSBFeGlzdHMnIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbigoZG9jKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXNzaW9uLl91c2VySWQgPSBkb2MuX2lkO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoeyBlcnJvcjogZmFsc2UsIG1zZzogJ1NhdmVkIFN1Y2Nlc3NmdWxseScgfSk7XG4gICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cyg1MDApLnNlbmQoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIChlKSA9PiB7XG4gICAgICAgIHJlc3BvbnNlLnNlbmQoZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNpZ25JbiA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHsgdXNlcm5hbWUgPSAnJywgcGFzc3dvcmQgPSAnJywgZW1haWxJZCA9ICcnIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgY29uc29sZS5sb2cocmVxdWVzdC5zZXNzaW9uLnVzZXIpO1xuICAgIFVzZXJzLmZpbmQoeyB1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZCB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXF1ZXN0LnNlc3Npb24uX3VzZXJJZCA9IHJlc1swXS5faWQ7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IGZhbHNlLCBtc2c6ICdzdWNjZXNzJyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoeyBlcnJvcjogdHJ1ZSwgbXNnOiAnTm8gdXNlciBhY2NvdW50IGZvdW5kJyB9KTtcbiAgICAgICAgfVxuICAgIH0sIChlKSA9PiB7XG4gICAgICAgIHJlc3BvbnNlLnNlbmQoZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IG5ld0V4cGVuc2UgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBsZXQgeyBhbW91bnQsIGNhdGVnb3J5LCBkYXRlLCB0eXBlIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgYW1vdW50ID0gcGFyc2VJbnQoYW1vdW50KTtcbiAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgY29uc3Qgd3cgPSBNYXRoLmNlaWwoZGF0ZS5nZXREYXRlKCkgLyA3KTtcbiAgICBjb25zdCBkb3cgPSBkYXRlLmdldERheSgpICsgMTtcbiAgICBjb25zdCBtbSA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgeXkgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgZGQgPSBkYXRlLmdldERhdGUoKTtcbiAgICBjb25zdCBuZXdFeHBlbnNlID0geyBhbW91bnQsIGNhdGVnb3J5LCBkYXRlLCB0eXBlLCB3dywgZG93LCBtbSwgeXksIGRkfTtcbiAgICB2YXIgbmV3RXhwZW5zZUluc3RhbmNlID0gbmV3IEV4cGVuc2VzKHtcbiAgICAgICAgdXNlcl9pZDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoXCI1YzE2MzBhZDc2NjllYTJjOWJiMDQ2MTZcIiksXG4gICAgICAgIC4uLm5ld0V4cGVuc2VcbiAgICB9KTtcbiAgICBuZXdFeHBlbnNlSW5zdGFuY2Uuc2F2ZSgpLnRoZW4oKGRvYykgPT4ge1xuICAgICAgICAvLyByZXF1ZXN0LnNlc3Npb24udXNlciA9IGRvYy51c2VybmFtZTtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZChkb2MpO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBzYXZlIG5ldyBFeHBlbnNlJywgZXJyKTtcbiAgICAgICAgcmVzcG9uc2Uuc3RhdHVzKDUwMCkuc2VuZChlcnIpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VEYXRhID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gcmVxdWVzdC5zZXNzaW9uLl91c2VySWQgPyBtb25nb29zZS5UeXBlcy5PYmplY3RJZChyZXF1ZXN0LnNlc3Npb24uX3VzZXJJZCkgOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZChcIjVjMTBiYTIzNGY4YjYyOTZjMDhlNTgxOFwiKTtcbiAgICBmdW5jdGlvbiBleHBlbnNlRGF0ZVJlc3BvbmRlcihlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVzcG9uZC5zZW5kKDUwMCkuc2VuZChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGV4cGVuc2VMaXN0LCBpbmNvbWVMaXN0O1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVtrZXldLnR5cGUgPT09ICdleHBlbnNlJykge1xuICAgICAgICAgICAgICAgICAgICBleHBlbnNlTGlzdCA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFba2V5XS50eXBlID09PSAnaW5jb21lJykge1xuICAgICAgICAgICAgICAgICAgICBpbmNvbWVMaXN0ID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IHNwZW50LCBzdGFuZGluZztcbiAgICAgICAgICAgIGlmIChleHBlbnNlTGlzdCkge1xuICAgICAgICAgICAgICAgIGV4cGVuc2VMaXN0LnRyYW5zYWN0aW9uTGlzdC5tYXAoKHRyYW5zYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZXJjZW50ID0gdHJhbnNhY3Rpb24uYW1vdW50IC8gKGV4cGVuc2VMaXN0LmFtb3VudCAvIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLnBlcmNlbnQgPSBNYXRoLnJvdW5kKHBlcmNlbnQgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNwZW50ID0gZXhwZW5zZUxpc3QuYW1vdW50O1xuICAgICAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICAgICAgc3BlbnQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluY29tZUxpc3QpIHtcbiAgICAgICAgICAgICAgICBpbmNvbWVMaXN0LnRyYW5zYWN0aW9uTGlzdC5tYXAoKHRyYW5zYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZXJjZW50ID0gdHJhbnNhY3Rpb24uYW1vdW50IC8gKGluY29tZUxpc3QuYW1vdW50IC8gMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ucGVyY2VudCA9IE1hdGgucm91bmQocGVyY2VudCAqIDEwMCkgLyAxMDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3RhbmRpbmcgPSBpbmNvbWVMaXN0LmFtb3VudCAtIHNwZW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFuZGluZyA9IDAgLSBzcGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoeyBleHBlbnNlTGlzdCwgaW5jb21lTGlzdCwgc3BlbnQsIHN0YW5kaW5nIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUXVlcmllcyBzdGFydFxuICAgIGNvbnN0IGdyb3VwMSA9IHtcbiAgICAgICAgJGdyb3VwOiB7XG4gICAgICAgICAgICBfaWQ6IHsgY2F0ZWdvcnk6ICckY2F0ZWdvcnknLCB0eXBlOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICB0eXBlOiB7ICckZmlyc3QnOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICBjYXRlZ29yeTogeyAnJGZpcnN0JzogJyRjYXRlZ29yeScgfSxcbiAgICAgICAgICAgIGFtb3VudDogeyAkc3VtOiAnJGFtb3VudCcgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBncm91cDIgPSB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7IHR5cGU6ICckdHlwZScgfSxcbiAgICAgICAgICAgIGFtb3VudDogeyAkc3VtOiAnJGFtb3VudCcgfSxcbiAgICAgICAgICAgIHR5cGU6IHsgJyRmaXJzdCc6ICckdHlwZScgfSxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uTGlzdDogeyAkcHVzaDogeyBjYXRlZ29yeTogJyRjYXRlZ29yeScsIGFtb3VudDogJyRhbW91bnQnIH0gfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCB1bndpbmQgPSB7ICR1bndpbmQ6ICckdHJhbnNhY3Rpb25MaXN0JyB9O1xuICAgIGNvbnN0IHNvcnQgPSB7ICRzb3J0OiB7ICd0cmFuc2FjdGlvbkxpc3QuYW1vdW50JzogLTEgfSB9XG4gICAgY29uc3QgcmVHcm91cCA9IHtcbiAgICAgICAgJGdyb3VwOiB7XG4gICAgICAgICAgICBfaWQ6IHsgdHlwZTogJyR0eXBlJyB9LFxuICAgICAgICAgICAgYW1vdW50OiB7ICckZmlyc3QnOiAnJGFtb3VudCcgfSxcbiAgICAgICAgICAgIHR5cGU6IHsgJyRmaXJzdCc6ICckdHlwZScgfSxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uTGlzdDogeyAkcHVzaDogJyR0cmFuc2FjdGlvbkxpc3QnIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8gUXVlcmllcyBlbmRcblxuICAgIGNvbnN0IHsgdGFiLCB3dywgbW0sIHl5LCBkb3cgfSA9IHJlcXVlc3QuYm9keTtcbiAgICBpZiAodGFiID09PSBZRUFSKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWR9IH0sXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB5eTogcGFyc2VJbnQoeXkpIH0gfSxcbiAgICAgICAgICAgIHsgLi4uZ3JvdXAxIH0seyAuLi5ncm91cDIgfSxcbiAgICAgICAgICAgIHsgLi4udW53aW5kIH0seyAuLi5zb3J0IH0seyAuLi5yZUdyb3VwIH0sXG4gICAgICAgICAgICB7ICRwcm9qZWN0OiB7IF9pZDogMCwgYW1vdW50OiAxLCB0eXBlOiAxLCB0cmFuc2FjdGlvbkxpc3Q6IDEgfSB9XG4gICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4cGVuc2VEYXRlUmVzcG9uZGVyKTtcbiAgICB9IGVsc2UgaWYgKHRhYiA9PT0gTU9OVEgpIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9IH0sXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB5eTogcGFyc2VJbnQoeXkpIH0gfSx7ICRtYXRjaDogeyBtbTogcGFyc2VJbnQobW0pIH0gfSxcbiAgICAgICAgICAgIHsgLi4uZ3JvdXAxIH0seyAuLi5ncm91cDIgfSxcbiAgICAgICAgICAgIHsgLi4udW53aW5kIH0seyAuLi5zb3J0IH0seyAuLi5yZUdyb3VwIH0sXG4gICAgICAgICAgICB7ICRwcm9qZWN0OiB7IF9pZDogMCwgYW1vdW50OiAxLCB0eXBlOiAxLCB0cmFuc2FjdGlvbkxpc3Q6IDEgfSB9XG4gICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4cGVuc2VEYXRlUmVzcG9uZGVyKTtcbiAgICB9IGVsc2UgaWYgKHRhYiA9PT0gV0VFSykge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkIH0gfSxcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHl5OiBwYXJzZUludCh5eSkgfSB9LHsgJG1hdGNoOiB7IG1tOiBwYXJzZUludChtbSkgfSB9LHsgJG1hdGNoOiB7IHd3OiBwYXJzZUludCh3dykgfSB9LFxuICAgICAgICAgICAgeyAuLi5ncm91cDEgfSx7IC4uLmdyb3VwMiB9LFxuICAgICAgICAgICAgeyAuLi51bndpbmQgfSx7IC4uLnNvcnQgfSx7IC4uLnJlR3JvdXAgfSxcbiAgICAgICAgICAgIHsgJHByb2plY3Q6IHsgX2lkOiAwLCBhbW91bnQ6IDEsIHR5cGU6IDEsIHRyYW5zYWN0aW9uTGlzdDogMSB9IH1cbiAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhwZW5zZURhdGVSZXNwb25kZXIpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU3VtbWFyeSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIGZ1bmN0aW9uIGV4ZWNTdW1tYXJ5UXVlcnkoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJlc3BvbmQuc2VuZCg1MDApLnNlbmQoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGFbMF0gJiYgZGF0YVswXS5wZXJEaXZpc2lvbkRhdGEpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWF4QW1vdW50ID0gTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVI7XG4gICAgICAgICAgICAgICAgZGF0YVswXS5wZXJEaXZpc2lvbkRhdGEuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXhBbW91bnQgPCBlbnRyeS5hbW91bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEFtb3VudCA9IGVudHJ5LmFtb3VudFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGF0YVswXS5tYXhBbW91bnQgPSBtYXhBbW91bnQ7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7Li4uZGF0YVswXX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgdXNlcklkID0gcmVxdWVzdC5zZXNzaW9uLl91c2VySWQgPyBtb25nb29zZS5UeXBlcy5PYmplY3RJZChyZXF1ZXN0LnNlc3Npb24uX3VzZXJJZCkgOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZChcIjVjMTBiYTIzNGY4YjYyOTZjMDhlNTgxOFwiKTtcbiAgICBjb25zdCB7dGFiLCB5eSwgbW0sIHd3fSA9IHJlcXVlc3QuYm9keTtcbiAgICBpZiAodGFiID09PSBZRUFSKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgeXk6IHl5fX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHR5cGU6ICdleHBlbnNlJ319LFxuICAgICAgICAgICAgeyRncm91cDogeyBfaWQ6IHsgbW06ICckbW0nfSwgYW1vdW50OiB7JHN1bTogJyRhbW91bnQnfSwgbW9udGg6IHsnJGZpcnN0JzogJyRtbSd9fX0sXG4gICAgICAgICAgICB7JHNvcnQ6IHsgbW9udGg6IDEgfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7X2lkOiBudWxsLCB0b3RhbEFtb3VudDogeyckc3VtJzogJyRhbW91bnQnfSwgcGVyRGl2aXNpb25EYXRhOiB7JHB1c2ggOiB7IGFtb3VudDogJyRhbW91bnQnLCBkaXZpc2lvbjogJyRtb250aCd9fX19LFxuICAgICAgICAgICAgeyRwcm9qZWN0OiB7X2lkOiAwfX1cbiAgICAgICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4ZWNTdW1tYXJ5UXVlcnkpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBNT05USCkge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHl5OiB5eX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyBtbTogbW19fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdHlwZTogJ2V4cGVuc2UnfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7IF9pZDoge2RkOiAnJGRkJ30sIGFtb3VudDogeyckc3VtJzogJyRhbW91bnQnfSwgZGQ6IHsnJGZpcnN0JzogJyRkZCd9IH19LFxuICAgICAgICAgICAgeyRzb3J0OiB7ZGQ6IDF9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHtfaWQ6IG51bGwsIHRvdGFsQW1vdW50OiB7JyRzdW0nOiAnJGFtb3VudCd9LCBwZXJEaXZpc2lvbkRhdGE6IHskcHVzaDoge2Ftb3VudDogJyRhbW91bnQnLCBkaXZpc2lvbjogJyRkZCd9fX19LFxuICAgICAgICAgICAgeyRwcm9qZWN0OiB7X2lkOjB9fVxuICAgICAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhlY1N1bW1hcnlRdWVyeSk7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IFdFRUspIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkIH19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB5eTogeXl9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgbW06IG1tfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHd3OiB3d319LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB0eXBlOiAnZXhwZW5zZSd9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiB7ZG93OiAnJGRvdyd9LCBhbW91bnQ6IHskc3VtOiAnJGFtb3VudCd9LCBkb3c6IHsnJGZpcnN0JzogJyRkb3cnfX19LFxuICAgICAgICAgICAgeyRzb3J0OiB7IGRvdzogMX19LFxuICAgICAgICAgICAgeyRncm91cDogeyBfaWQ6IG51bGwsIHRvdGFsQW1vdW50OiB7JHN1bTogJyRhbW91bnQnfSwgIHBlckRpdmlzaW9uRGF0YTogeyRwdXNoOiB7YW1vdW50OiAnJGFtb3VudCcsIGRpdmlzaW9uOiAnJGRvdyd9fX19LFxuICAgICAgICAgICAgeyRwcm9qZWN0OiB7X2lkOiAwfX1cbiAgICAgICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4ZWNTdW1tYXJ5UXVlcnkpO1xuICAgIH1cbn0iLCJ2YXIgZW52ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgJ2RldmVsb3BtZW50JztcblxuaWYgKGVudiA9PT0gJ2RldmVsb3BtZW50Jykge1xuICBwcm9jZXNzLmVudi5QT1JUID0gNDAwMDtcbiAgLy8gcHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJID0gJ21vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvZXhwZW5zZSc7XG4gIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSA9ICdtb25nb2RiOi8vZGhpbGlwazEzOmRoaWxpcGsxM0BkczI0NzMxMC5tbGFiLmNvbTo0NzMxMC9leHBlbnNlJztcbn0gZWxzZSB7XG4gIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSA9ICdtb25nb2RiOi8vZGhpbGlwazEzOmRoaWxpcGsxM0BkczI0NzMxMC5tbGFiLmNvbTo0NzMxMC9leHBlbnNlJztcbn1cbi8vIGV4cG9ydCBkZWZhdWx0IGVudjtcbiIsInZhciBtb25nb29zZTEgPSByZXF1aXJlKCdtb25nb29zZScpO1xubW9uZ29vc2UxLlByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbm1vbmdvb3NlMS5jb25uZWN0KHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSwgeyB1c2VNb25nb0NsaWVudDogdHJ1ZSB9KS50aGVuKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkIHRvIERiJyk7XG59LChlKT0+IHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB7bW9uZ29vc2UxfTtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgVXNlcnMgZnJvbSAnLi91c2VyTW9kZWwnO1xuXG5jb25zdCBFeHBlbnNlcyA9IG1vbmdvb3NlLm1vZGVsKCdFeHBlbnNlcycsIHtcbiAgdXNlcl9pZDoge1xuICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICByZWY6ICdVc2VycydcbiAgfSxcbiAgYW1vdW50OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHRyaW06IHRydWVcbiAgfSxcbiAgY2F0ZWdvcnk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICAgIGRlZmF1bHQ6ICdvdGhlcnMnXG4gIH0sXG4gIHR5cGU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWUsXG4gICAgZGVmYXVsdDogJ2V4cGVuc2UnXG4gIH0sXG4gIGRhdGU6IHtcbiAgICB0eXBlOiBEYXRlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlLFxuICAgIGRlZmF1bHQ6IERhdGUubm93KClcbiAgfSxcbiAgZGQ6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgd3c6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgZG93OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIG1tOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIHl5OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZXM7IiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBFeHBlbnNlcyBmcm9tICcuL2V4cGVuc2VNb2RlbCc7XG5cbmNvbnN0IFVzZXJzID0gbW9uZ29vc2UubW9kZWwoJ1VzZXJzJywge1xuICAgIF9pZDogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuICAgIHVzZXJuYW1lOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbmxlbmd0aDogNSxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgZW1haWxJZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWlubGVuZ3RoOiA4LFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBleHBlbnNlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCwgXG4gICAgICAgICAgICByZWY6ICdFeHBlbnNlcydcbiAgICAgICAgfVxuICAgIF1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgVXNlcnM7IiwicmVxdWlyZSgnLi9jb25maWcvY29uZmlnJyk7XG5pbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCBlbnYgZnJvbSAnLi9jb25maWcvY29uZmlnJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTVNlcnZlciBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG52YXIgc2Vzc2lvbiA9IHJlcXVpcmUoJ2V4cHJlc3Mtc2Vzc2lvbicpO1xuXG5pbXBvcnQgQXBwIGZyb20gJy4uL3NyYy9hcHAnXG5pbXBvcnQgbW9uZ29vc2UxIGZyb20gJy4vZGIvbW9uZ29vc2UnO1xuaW1wb3J0IHtzaWduVXAsIHNpZ25JbiwgbmV3RXhwZW5zZSwgZ2V0RXhwZW5zZURhdGEsIGdldEV4cGVuc2VTdW1tYXJ5fSBmcm9tICcuL2FwaS9hcGlDYWxscyc7XG5jb25zdCBNb25nb1N0b3JlID0gcmVxdWlyZSgnY29ubmVjdC1tb25nbycpKHNlc3Npb24pO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVDtcblxuLy8gYXBwLnVzZShzZXNzaW9uKHtcbi8vICAgICBzZWNyZXQ6ICdkaGlsaXBMb2NhbCcsXG4vLyAgICAgcmVzYXZlOiBmYWxzZSxcbi8vICAgICBzYXZlVW5pbml0aWFsaXplZDogdHJ1ZSxcbi8vICAgICB1cmw6IHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSVxuLy8gfSkpXG5hcHAudXNlKHNlc3Npb24oe1xuICAgIHNlY3JldDogJ2ZvbycsXG4gICAgc3RvcmU6IG5ldyBNb25nb1N0b3JlKHtcbiAgICAgICAgdXJsOiBwcm9jZXNzLmVudi5NT05HT0xBQl9VUklcbiAgICB9KVxufSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKCdidWlsZC9wdWJsaWMnKSk7XG5hcHAudXNlKCcvc3R5bGVzJywgZXhwcmVzcy5zdGF0aWMoJ3NyYy9wYWdlcy9zdHlsZXMnKSk7XG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKCdzcmMvcGFnZXMvc3RhdGljJykpO1xuXG4vLyBBUEkgQ2FsbHNcbmFwcC5wb3N0KCcvc2lnbnVwJywgc2lnblVwKTtcbmFwcC5wb3N0KCcvc2lnbmluJywgc2lnbkluKTtcbmFwcC5wb3N0KCcvbmV3X2V4cGVuc2UnLCBuZXdFeHBlbnNlKTtcbmFwcC5wb3N0KCcvZ2V0X2V4cGVuc2VfZGF0YScsIGdldEV4cGVuc2VEYXRhKTtcbmFwcC5wb3N0KCcvZ2V0X2V4cGVuc2Vfc3VtbWFyeScsIGdldEV4cGVuc2VTdW1tYXJ5KTtcblxuY29uc3QgbG9hZEh0bWwgPSAoY29udGVudCkgPT4ge1xuICAgIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcbiAgICByZXR1cm4gKGBcbiAgICAgICAgPGh0bWw+XG4gICAgICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgICAgICAke2hlbG1ldC5tZXRhLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgJHtoZWxtZXQudGl0bGUudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvdHdpdHRlci1ib290c3RyYXAvNC4xLjMvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy90d2l0dGVyLWJvb3RzdHJhcC80LjEuMy9qcy9ib290c3RyYXAuYnVuZGxlLm1pbi5qc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9jb21tb24uY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL2hvbWUuY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL2xvZ2luLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9uZXdfZXhwZW5zZS5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2Fuc1wiIHJlbD1cInN0eWxlc2hlZXRcIj5cbiAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgIDxib2R5PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyb290XCI+JHtjb250ZW50fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiY2xpZW50X2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICAgICAgPC9ib2R5PlxuICAgICAgICA8L2h0bWw+YCk7XG59O1xuXG5hcHAuZ2V0KCcqJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHt9O1xuICAgIGNvbnN0IGNvbnRlbnQgPSBSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0cmluZyhcbiAgICAgICAgPFN0YXRpY1JvdXRlcj5cbiAgICAgICAgICAgIDxBcHAgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9IC8+XG4gICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICk7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBsb2FkSHRtbChjb250ZW50KTtcbiAgICByZXMuc2VuZCh0ZW1wbGF0ZSk7XG59KTtcblxuYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ3Byb2Nlcy5lbnYnLCBwb3J0LCBwcm9jZXNzLmVudi5NT05HT0xBQl9VUkkpO1xuICAgIGNvbnNvbGUubG9nKCdTZXJ2ZXIgU3RhcnRlZCBvbiBQb3J0OiAnLCBwb3J0KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhcHA7XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN3aXRjaCwgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IEhvbWUgZnJvbSAnLi9wYWdlcy9jb21wb25lbnRzL0xvZ2luJztcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi9wYWdlcy9yb3V0ZXMvcm91dGVzJztcbmltcG9ydCB7U2VydmVyUm91dGVyfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Um91dGVzLz5cbiAgICAgICAgKTtcbiAgICB9XG59IiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGNvbnN0IHNpZ251cCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9zaWdudXAvJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBzaWduaW4gPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvc2lnbmluLyc7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgey4uLnBhcmFtc30pO1xufVxuXG5leHBvcnQgY29uc3QgbmV3X2V4cGVuc2UgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvbmV3X2V4cGVuc2UvJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRfZXhwZW5zZV9kYXRhID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL2dldF9leHBlbnNlX2RhdGEvJyA7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgcGFyYW1zKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldF9leHBlbnNlX3N1bW1hcnkgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvZ2V0X2V4cGVuc2Vfc3VtbWFyeS8nIDtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCBwYXJhbXMpO1xufVxuIiwiXG5jb25zdCBXSURUSCA9IDE1MDtcbmNvbnN0IEhFSUdIVCA9IDEwMDtcblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0RJVklTSU9OTEVOR1RIfSBmcm9tICcuLi9jb25zdGFudHMvY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmdlbmVyYXRlU1ZHID0gdGhpcy5nZW5lcmF0ZVNWRy5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29ucmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFsZXJ0KCdhdHRhY2hFdmVudCAtIHJlc2l6ZScpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVTVkcoKSB7XG4gICAgY29uc3Qge3Bsb3REYXRhLCB0YWJ9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB4Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICBjb25zdCB5Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICBjb25zdCBsZW5ndGggPSBESVZJU0lPTkxFTkdUSFt0YWJdO1xuICAgIGNvbnN0IG1heEFtdCA9IHBsb3REYXRhLm1heEFtb3VudDtcbiAgICBjb25zdCB4Q29vcmRpbmF0ZURpdkxlbmd0aCA9IChXSURUSCAvIChsZW5ndGggKyAyKSk7XG4gICAgbGV0IGxhc3REaXZpc2lvbiA9IDA7XG4gICAgbGV0IHN0ciA9ICcnO1xuXG4gICAgLyogVG8gc3RhcnQgdGhlIGdyYXBoIGF0IHRoZSBMZWFzdCBQb2ludCAqL1xuICAgIHhDb29yZGluYXRlcy5wdXNoKDApO1xuICAgIHlDb29yZGluYXRlcy5wdXNoKEhFSUdIVCk7XG4gICAgcGxvdERhdGEucGVyRGl2aXNpb25EYXRhLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICB3aGlsZSAoZW50cnkuZGl2aXNpb24gPiBsYXN0RGl2aXNpb24pIHtcbiAgICAgICAgY29uc3QgbGFzdFggPSB4Q29vcmRpbmF0ZXNbeENvb3JkaW5hdGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICB4Q29vcmRpbmF0ZXMucHVzaCgobGFzdFggKyB4Q29vcmRpbmF0ZURpdkxlbmd0aCkpO1xuICAgICAgICBpZiAoZW50cnkuZGl2aXNpb24gPT09IGxhc3REaXZpc2lvbiArIDEpIHtcbiAgICAgICAgICBjb25zdCBwZXJjZW50ID0gKChlbnRyeS5hbW91bnQgLyBtYXhBbXQpICogMTAwKTtcbiAgICAgICAgICB5Q29vcmRpbmF0ZXMucHVzaChIRUlHSFQgLSAoKEhFSUdIVCAvIDEwMCkgKiBwZXJjZW50KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0RGl2aXNpb24gPSBsYXN0RGl2aXNpb24gKyAxO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHRvIHB1c2ggdmFsdWVzIGZvciByZW1haW5pbmcgZGF5c1xuICAgIHdoaWxlKGxlbmd0aCA+IGxhc3REaXZpc2lvbikge1xuICAgICAgY29uc3QgbGFzdFggPSB4Q29vcmRpbmF0ZXNbeENvb3JkaW5hdGVzLmxlbmd0aCAtIDFdO1xuICAgICAgeENvb3JkaW5hdGVzLnB1c2goKGxhc3RYICsgeENvb3JkaW5hdGVEaXZMZW5ndGgpKTtcbiAgICAgIHlDb29yZGluYXRlcy5wdXNoKEhFSUdIVCk7XG4gICAgICBsYXN0RGl2aXNpb24gPSBsYXN0RGl2aXNpb24gKyAxO1xuICAgIH1cbiAgICBjb25zdCBsYXN0WCA9IHhDb29yZGluYXRlc1t4Q29vcmRpbmF0ZXMubGVuZ3RoIC0gMV07XG4gICAgeENvb3JkaW5hdGVzLnB1c2goKGxhc3RYICsgeENvb3JkaW5hdGVEaXZMZW5ndGgpKTtcbiAgICB5Q29vcmRpbmF0ZXMucHVzaChIRUlHSFQpO1xuIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeENvb3JkaW5hdGVzW2ldICsgJywnICsgeUNvb3JkaW5hdGVzW2ldICsgJyAnO1xuICAgIH1cbiAgICBpZiAoc3RyKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzdmcgdmlld0JveD17JzAgMCAnICsgV0lEVEggKyAnICcgKyBIRUlHSFR9IHN0eWxlPXt7bWFyZ2luOiAnMjBweCd9fT5cbiAgICAgICAgICAgIDxwb2x5bGluZSBwb2ludHM9e3N0cn0gY2xhc3NOYW1lPVwiZ3JhcGhQbG90TGluZVwiIC8+XG4gICAgICAgICAgICB7LyogPGcgc3R5bGU9e3tzdHJva2U6ICcjY2NjJywgc3Ryb2tlRGFzaGFycmF5OiAwLCBzdHJva2VXaWR0aDogMX19PlxuICAgICAgICAgICAgICA8bGluZSB4MT1cIjBcIiB5MT1cIjIwMFwiIHgyPVwiMFwiIHkyPVwiMFwiPjwvbGluZT5cbiAgICAgICAgICAgIDwvZz4gKi99XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuZ2VuZXJhdGVTVkcoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCBOZXdFeHBlbnNlIGZyb20gJy4vTmV3RXhwZW5zZSc7XG5pbXBvcnQge2dldF9leHBlbnNlX2RhdGEsIGdldF9leHBlbnNlX3N1bW1hcnl9IGZyb20gJy4uL2FwaUNhbGxzL0FwaUNhbGxzJztcbmltcG9ydCB7TU9OVEgsIFlFQVIsIFdFRUssIE1PTlRIU05BTUV9IGZyb20gJy4uL2NvbnN0YW50cy9jb25zdGFudHMnO1xuaW1wb3J0IEdyYXBoIGZyb20gJy4vR3JhcGgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5sZWZ0TWVudUNsaWNrID0gdGhpcy5sZWZ0TWVudUNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5uZXdFeHBlbnNlID0gdGhpcy5uZXdFeHBlbnNlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5uYXZpZ2F0ZVRvU2lnbkluID0gdGhpcy5uYXZpZ2F0ZVRvU2lnbkluLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFjdGl2ZVRhYjogTU9OVEgsXG4gICAgICBzaG93TmV3RXhwZW5zZTogZmFsc2UsXG4gICAgICBzdGFuZGluZzogdW5kZWZpbmVkLFxuICAgICAgc3BlbnQ6IHVuZGVmaW5lZCxcbiAgICAgIGV4cGVuc2VMaXN0OiB7fSxcbiAgICAgIGluY29tZUxpc3Q6IHt9LFxuICAgICAgdmlld01vcmU6IGZhbHNlXG4gICAgfVxuICAgIHRoaXMudmlld2VkTW9yZSA9IHt9O1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuZ2V0RXhwZW5zZSgpO1xuICAgIHRoaXMuZ2V0RXhwZW5zZVN1bW1hcnkoKTtcbiAgfVxuXG4gIGdldEV4cGVuc2VTdW1tYXJ5KCkge1xuICAgIGNvbnN0IHRhYiA9IHRoaXMuc3RhdGUuYWN0aXZlVGFiO1xuICAgIGNvbnN0IG1tID0gbmV3IERhdGUoKS5nZXRNb250aCgpICsgMTtcbiAgICBjb25zdCBkb3cgPSBuZXcgRGF0ZSgpLmdldERheSgpO1xuICAgIGNvbnN0IHd3ID0gTWF0aC5jZWlsKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpIC8gNyk7XG4gICAgY29uc3QgeXkgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgcGFyYW1zID0ge3RhYiwgbW0sIGRvdywgd3csIHl5fTtcbiAgICBnZXRfZXhwZW5zZV9zdW1tYXJ5KHBhcmFtcykudGhlbigocmVzcCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7cGxvdERhdGE6IHsuLi5yZXNwLmRhdGF9fSk7XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBHZXQgRXhwZW5zZSBTdW1tYXJ5IERldGFpbHMnLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0RXhwZW5zZSgpIHtcbiAgICBsZXQgZXhwZW5zZUxpc3QgPSB7fSwgaW5jb21lTGlzdCA9IHt9LCBzdGFuZGluZyA9Jyc7XG4gICAgY29uc3QgdGFiID0gdGhpcy5zdGF0ZS5hY3RpdmVUYWI7XG4gICAgY29uc3QgbW0gPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IGRvdyA9IG5ldyBEYXRlKCkuZ2V0RGF5KCk7XG4gICAgY29uc3Qgd3cgPSBNYXRoLmNlaWwobmV3IERhdGUoKS5nZXREYXRlKCkgLyA3KTtcbiAgICBjb25zdCB5eSA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7dGFiLCBtbSwgZG93LCB3dywgeXl9O1xuICAgIGdldF9leHBlbnNlX2RhdGEocGFyYW1zKS50aGVuKChyZXNwKSA9PiB7XG4gICAgIGNvbnN0IHtleHBlbnNlTGlzdCwgaW5jb21lTGlzdCwgc3RhbmRpbmcsIHNwZW50fSA9IHJlc3AuZGF0YTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGVuc2VMaXN0LCBpbmNvbWVMaXN0LCBzdGFuZGluZywgc3BlbnR9KTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIEdldCBFeHBlbnNlIERldGFpbHMnLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlRXhwZW5zZURheUZvcm1hdChhY3RpdmVUYWIpIHtcbiAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVUYWI6IGFjdGl2ZVRhYiwgdmlld01vcmU6IGZhbHNlfSwgKCkgPT4ge1xuICAgICAgdGhpcy5nZXRFeHBlbnNlKCk7XG4gICAgICB0aGlzLmdldEV4cGVuc2VTdW1tYXJ5KCk7XG4gICAgfSk7XG4gIH1cblxuICBsZWZ0TWVudUNsaWNrKCkge1xuICAgIHRoaXMucmVmcy5iYWNrRHJvcC5jbGFzc0xpc3QudG9nZ2xlKCdiYWNrRHJvcCcpO1xuICAgIHRoaXMucmVmcy5wb3B1cC5jbGFzc0xpc3QudG9nZ2xlKCdyaWdodDAnKTtcbiAgICB0aGlzLnJlZnMuZmlyc3RIYWxmTGFuZGluZ1R4dC5jbGFzc0xpc3QudG9nZ2xlKCdzY2FsZTkwJyk7XG4gICAgdGhpcy5yZWZzLm90aGVySGFsZkxhbmRpbmdUeHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2NhbGU5MCcpO1xuICB9XG5cbiAgbmF2aWdhdGVUb1NpZ25JbigpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzKTtcbiAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCgnL2xvZ2luJyk7XG4gIH1cblxuICByZW5kZXJMZWZ0TWVudUJhcigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnVCYXJcIj5cbiAgICAgICAgPGRpdiByZWY9XCJwb3B1cFwiY2xhc3NOYW1lPVwicG9wdXAgemkyIFwiIG9uQ2xpY2s9e3RoaXMubGVmdE1lbnVDbGlja30+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlQmFyIGluLWJsIGZsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtb3B0aW9uXCI+U2V0dGluZ3M8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIiBvbkNsaWNrPXt0aGlzLm5hdmlnYXRlVG9TaWduSW59PlNpZ24gSW48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIj5BYm91dCBNZTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBuZXdFeHBlbnNlKHZhbCwgc2F2ZVN1Y2Nlc3MpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtzaG93TmV3RXhwZW5zZTogdmFsfSwgKCkgPT4ge1xuICAgICAgaWYgKHNhdmVTdWNjZXNzKSB7XG4gICAgICAgIHRoaXMuZ2V0RXhwZW5zZSgpO1xuICAgICAgICB0aGlzLmdldEV4cGVuc2VTdW1tYXJ5KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjbGlja1ZpZXdNb3JlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3ZpZXdNb3JlOiAhdGhpcy5zdGF0ZS52aWV3TW9yZX0pO1xuICAgIHRoaXMucmVmcy50cmFuc2FjdGVkQ2FyZC5zY3JvbGxUb3AgPSAwO1xuICB9XG5cbiAgcmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuc3RhdGUuZXhwZW5zZUxpc3QudHJhbnNhY3Rpb25MaXN0Lm1hcCgodHJhbnNhY3Rpb24sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnZpZXdNb3JlIHx8IHRoaXMudmlld2VkTW9yZVt0aGlzLnN0YXRlLmFjdGl2ZVRhYl0gfHwgIXRoaXMuc3RhdGUudmlld01vcmUgJiYgaW5kZXggPCAyKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdGUudmlld01vcmUpIHtcbiAgICAgICAgICAgIHRoaXMudmlld2VkTW9yZVt0aGlzLnN0YXRlLmFjdGl2ZVRhYl0gPSB0cnVlOyAvLyBUbyBub3QgcmVtb3ZlIGVsZW1lbnQgZnJvbSBET00gb24gY2xpY2tpbmcgdmlldyBNb3JlIGFnYWluXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17J3RyYW5zYWN0aW9uX3R5cGVfJyArIGluZGV4fSBjbGFzc05hbWU9XCJ0cmFuc2FjdGVkQ2FyZElubmVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZElubmVyaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9uYW1lXCI+e3RyYW5zYWN0aW9uLmNhdGVnb3J5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRfcGVyY2VudCBcIj57dHJhbnNhY3Rpb24ucGVyY2VudCArICcgJSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIHsvKiA8c3BhbiBjbGFzc05hbWU9XCJjYXRfbmFtZSBsb2FkZXJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0X3BlcmNlbnQgbG9hZGVyXCI+PC9zcGFuPiAqL31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZ3Jlc3NCYXIgYmwgdGV4dENlbnRlciBtYXJnaW5UMjVcIiA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWxsZWRcIiBzdHlsZT0ge3ttYXhXaWR0aDogdHJhbnNhY3Rpb24ucGVyY2VudCArICclJ319PlxuICAgICAgICAgICAgICAgICAgey8qIDxkaXYgY2xhc3NOYW1lPVwiZmlsbGVkXCIgPjwvZGl2PiAqL31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9KVxuICApO1xuICB9XG5cbiAgZ2V0VHJhbnNhY3Rpb25DYXJkKCkge1xuICAgIGNvbnN0IHthY3RpdmVUYWIsIHZpZXdNb3JlID0gZmFsc2V9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBoYXNEYXRhID0gdGhpcy5zdGF0ZS5leHBlbnNlTGlzdCAmJiBPYmplY3Qua2V5cyh0aGlzLnN0YXRlLmV4cGVuc2VMaXN0KS5sZW5ndGggPiAwO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IHJlZj1cInRyYW5zYWN0ZWRDYXJkXCIgY2xhc3NOYW1lPXsndHJhbnNhY3RlZENhcmQgdHJhbnNpdGlvbjFhICcgKyAodmlld01vcmUgPyAnc2hvd0FsbFRyYW5zYWN0aW9uJyA6ICcnKX0+XG4gICAgICAgICAgICB7aGFzRGF0YSA/XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYW5zYWN0U2Nyb2xsZXJcIj5cbiAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBXRUVLID8gdGhpcy5yZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZCgpIDogbnVsbH1cbiAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBNT05USCA/IHRoaXMucmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQoKSA6IG51bGx9XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gWUVBUiA/IHRoaXMucmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQoKSA6IG51bGx9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+IDogXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXIgcGFkVDIwIG1oMTBwXCI+XG4gICAgICAgICAgICAgIDxkaXY+Tm8gVHJhbnNhY3Rpb25zIGFkZGVkIDwvZGl2PlxuICAgICAgICAgICAgICB7dHlwZW9mKHdpbmRvdykgIT09ICd1bmRlZmluZWQnICYmICF3aW5kb3cuc2lnbmVkSW4gJiYgPGRpdiBjbGFzc05hbWU9XCJwYWRUMTAgcGFkQjIwXCI+PGEgaHJlZj1cIi9sb2dpblwiPjxzcGFuPlNpZ24gSW48L3NwYW4+PC9hPiBmb3IgUGFzdCBUcmFuc2FjdGlvbnM8L2Rpdj59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpZXdNb3JlQXJyb3dcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLmNsaWNrVmlld01vcmUoKX0+XG4gICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT17dmlld01vcmUgPyAncm90YXRlVmlld01vcmUnIDogJyd9IHJlZj1cInN2Z1ZpZXdNb3JlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgICAgICAgPHBhdGggZD1cIk03LjQxIDcuODRMMTIgMTIuNDJsNC41OS00LjU4TDE4IDkuMjVsLTYgNi02LTZ6XCIvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyduZXdDb250YWluZXIgJyArICghaGFzRGF0YSA/ICdwYWRUMTAnIDogJycpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5ld0J0blwiIG9uQ2xpY2s9eygpID0+IHRoaXMubmV3RXhwZW5zZSh0cnVlKX0+ICsgYWRkIE5ldzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gIH1cbiAgZ2V0Q3VycmVudERhdGUoKSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgY3Vyck1vbnRoID0gTU9OVEhTTkFNRVtkYXRlLmdldE1vbnRoKCldO1xuICAgIGNvbnN0IGN1cnJEYXRlID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgcmV0dXJuIGN1cnJEYXRlICsgJyAnICsgY3Vyck1vbnRoICsgJyAnICsgZGF0ZS5nZXRGdWxsWWVhcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHthY3RpdmVUYWIsIHNob3dOZXdFeHBlbnNlLCBzdGFuZGluZyA9IHVuZGVmaW5lZCwgc3BlbnQgPSB1bmRlZmluZWQsIHZpZXdNb3JlID0gZmFsc2UsIHBsb3REYXRhLCBpbmNvbWVMaXN0fSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiByZWY9XCJiYWNrRHJvcFwiIGNsYXNzTmFtZT17J3RyYW5zaXRpb24yYSB6aTEgJyArIChzaG93TmV3RXhwZW5zZSA/ICdiYWNrRHJvcCcgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHRoaXMubmV3RXhwZW5zZShmYWxzZSl9PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHt0aGlzLnJlbmRlckxlZnRNZW51QmFyKCl9XG4gICAgICAgICAgPGRpdiByZWY9XCJtYWluQ29udGVudFwiIGNsYXNzTmFtZT1cIm1haW5Db250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlyc3QtaGFsZi1sYW5kaW5nXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgcmVmPVwiZmlyc3RIYWxmTGFuZGluZ1R4dFwiIGNsYXNzTmFtZT1cInRyYW5zaXRpb24wXzUgXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGFuZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGVmdC1tZW51LWNvbnRhaW5lclwiIG9uQ2xpY2s9e3RoaXMubGVmdE1lbnVDbGlja30+PGltZyBjbGFzc05hbWU9XCJsZWZ0LW1lbnVcIiBzcmM9XCIvaW1nL21lbnUuc3ZnXCIvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHsvKiA8c3BhbiBjbGFzc05hbWU9XCJyaWdodC1tZW51LWNvbnRhaW5lclwiIG9uQ2xpY2s9eygpID0+IHt0aGlzLnNldFN0YXRlKHt2aXNpYmxlUmlnaHRNZW51OiB0cnVlfSl9fT48aW1nIGNsYXNzTmFtZT1cInJpZ2h0LW1lbnVcIiBzcmM9XCIvaW1nL21lbnUuc3ZnXCIvPjwvc3Bhbj4gKi99XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZiIGYxMVwiPkNVUlJFTlQgQkFMQU5DRTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZjE4XCI+4oK5IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RhbmRpbmdBbXRcIj57KHR5cGVvZihzdGFuZGluZykgIT09ICd1bmRlZmluZWQnID8gc3RhbmRpbmcgOiAnMCcpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PHNwYW4gY2xhc3NOYW1lPVwiZjExXCI+e3RoaXMuZ2V0Q3VycmVudERhdGUoKX08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2VEYXlzQnRuXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBXRUVLID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdChXRUVLKX19PldlZWs8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBNT05USCA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHt0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoTU9OVEgpfX0+TW9udGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBZRUFSID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdChZRUFSKX19PlllYXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGVudEluY29tZVNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW4tYmwgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmwgaW4tYmwgc3BlbnRJY29uXCIgPlxuICAgICAgICAgICAgICAgICAgICAgIDxzdmcgIHdpZHRoPVwiMjFcIiBoZWlnaHQ9XCIxN1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTI0IDEyYzAtNi42MjctNS4zNzMtMTItMTItMTJzLTEyIDUuMzczLTEyIDEyIDUuMzczIDEyIDEyIDEyIDEyLTUuMzczIDEyLTEyem0tMTcgMWg0di04aDJ2OGg0bC01IDYtNS02elwiLz48L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViSGVhZGluZyBpbi1ibFwiPnsnU3BlbnQgOiDigrknICsgKHR5cGVvZihzcGVudCkgIT09ICd1bmRlZmluZWQnPyBzcGVudDogJzAnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluLWJsICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbCBpbi1ibCBpbmNvbWVJY29uIFwiID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImZsIGluLWJsXCIgd2lkdGg9XCIyMVwiIGhlaWdodD1cIjE3XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMCAxMmMwIDYuNjI3IDUuMzczIDEyIDEyIDEyczEyLTUuMzczIDEyLTEyLTUuMzczLTEyLTEyLTEyLTEyIDUuMzczLTEyIDEyem0xNy0xaC00djhoLTJ2LThoLTRsNS02IDUgNnpcIi8+PC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkhlYWRpbmcgaW4tYmxcIj57J0luY29tZSA6IOKCuScgKyAoaW5jb21lTGlzdCAmJiB0eXBlb2YoaW5jb21lTGlzdC5hbW91bnQpICE9PSAndW5kZWZpbmVkJyA/IGluY29tZUxpc3QuYW1vdW50IDogJzAnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFRyYW5zYWN0aW9uQ2FyZCgpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3Bsb3REYXRhICYmIHBsb3REYXRhLnBlckRpdmlzaW9uRGF0YSAmJiAgcGxvdERhdGEucGVyRGl2aXNpb25EYXRhLmxlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm90aGVyLWhhbGYtbGFuZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPVwib3RoZXJIYWxmTGFuZGluZ1R4dFwiIGNsYXNzTmFtZT1cInRyYW5zaXRpb24wXzUgXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXIgdHJTdW1hcnlIZWFkaW5nIGZiXCIgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57J0V4cGVuc2UgVHJlbmRzJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IFdFRUsgPyAgPEdyYXBoIHBsb3REYXRhPXtwbG90RGF0YX0gdGFiPXthY3RpdmVUYWJ9Lz4gOiBudWxsfVxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gTU9OVEggPyAgPEdyYXBoIHBsb3REYXRhPXtwbG90RGF0YX0gdGFiPXthY3RpdmVUYWJ9Lz4gOiBudWxsfVxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gWUVBUiA/ICA8R3JhcGggcGxvdERhdGE9e3Bsb3REYXRhfSB0YWI9e2FjdGl2ZVRhYn0vPiA6IG51bGx9XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj4gOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3Nob3dOZXdFeHBlbnNlID8gXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICA8TmV3RXhwZW5zZSBuZXdFeHBlbnNlPXt0aGlzLm5ld0V4cGVuc2V9Lz5cbiAgICAgICAgICA8L2Rpdj4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQge3NpZ251cCwgc2lnbmlufSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaWduVXAgPSB0aGlzLnNpZ25VcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2lnbkluID0gdGhpcy5zaWduSW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnXG4gICAgfVxuICB9XG5cbiAgaGVhZCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldD5cbiAgICAgICAgPHRpdGxlPkV4cGVuc2UgTG9naW48L3RpdGxlPlxuICAgICAgPC9IZWxtZXQ+XG4gICAgKTtcbiAgfVxuXG4gIHNpZ25VcCgpIHtcbiAgICBzaWdudXAoe3VzZXJuYW1lOiB0aGlzLnN0YXRlLnVzZXJuYW1lLCBwYXNzd29yZDogdGhpcy5zdGF0ZS5wYXNzd29yZH0pO1xuICB9XG5cbiAgc2lnbkluKHdpdGhUZXN0Q3JlZHMpIHtcbiAgICBsZXQge3VzZXJuYW1lLCBwYXNzd29yZH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmICh3aXRoVGVzdENyZWRzKSB7XG4gICAgICB1c2VybmFtZSA9ICdkaGlsaXAnO1xuICAgICAgcGFzc3dvcmQgPSAnZGhpbGlwZGhpbGlwJztcbiAgICB9XG4gICAgc2lnbmluKHt1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZH0pLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgIGlmIChyZXNwLmRhdGEgJiYgIXJlc3AuZGF0YS5lcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goJy9ob21lJywge30pO1xuICAgICAgICBpZiAodHlwZW9mKHdpbmRvdykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgd2luZG93LnNpZ25lZEluID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBTaWduSW4nLCByZXNwKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIFNpZ25JbicsIGVycik7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLmhlYWQoKX1cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ2luQ29udGFpbmVyIHdoaXRlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZWxkc0RpdlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJuYW1lXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cIndoaXRlQnJkckJ0bVwiIHBsYWNlaG9sZGVyPSdVc2VybmFtZScgdmFsdWU9e3RoaXMuc3RhdGUudXNlcm5hbWV9IG9uQ2hhbmdlID0geyhlKSA9PiB0aGlzLnNldFN0YXRlKHt1c2VybmFtZTogZS50YXJnZXQudmFsdWV9KX0gdHlwZT1cInRleHRcIi8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhc3N3b3JkIHBhZFQxMFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ3aGl0ZUJyZHJCdG1cIiBwbGFjZWhvbGRlcj0nUGFzc3dvcmQnIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfSBvbkNoYW5nZSA9IHsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cGFzc3dvcmQ6IGUudGFyZ2V0LnZhbHVlfSl9IHR5cGU9XCJwYXNzd29yZFwiLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlciBwYWRUMjBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXcgZGlcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuZXdCdG5cIm9uQ2xpY2s9e3RoaXMuc2lnbklufT5TaWduIEluPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXcgZGlcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuZXdCdG5cIiBvbkNsaWNrPXt0aGlzLnNpZ25VcH0+U2lnbiBVcDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlciBwYWRUMjBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXdcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuZXdCdG5cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnNpZ25Jbih0cnVlKX0+Q29udGludWUgd2l0aCBUZXN0IExvZ2luPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IExvZ2luOyIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtuZXdfZXhwZW5zZX0gZnJvbSAnLi4vYXBpQ2FsbHMvQXBpQ2FsbHMnO1xuaW1wb3J0IHtNT05USFNOQU1FU0hPUlR9IGZyb20gJy4uL2NvbnN0YW50cy9jb25zdGFudHMnO1xuLy8gaW1wb3J0IHtjb21tYUZvcm1hdHRlZH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdFeHBlbnNlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zZWxlY3RUeXBlID0gdGhpcy5zZWxlY3RUeXBlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdWJtaXROZXdFeHBlbnNlID0gdGhpcy5zdWJtaXROZXdFeHBlbnNlLmJpbmQodGhpcyk7XG4gICAgXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHR5cGU6ICdleHBlbnNlJyxcbiAgICAgIGFtb3VudDogJycsXG4gICAgICBjYXRlZ29yeTogJycsXG4gICAgICBkYXk6ICcnLCBcbiAgICAgIG1vbnRoOiAnJyxcbiAgICAgIHllYXI6ICcnLFxuICAgICAgZXJyb3I6IHt9XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0VHlwZSh0eXBlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dHlwZTogdHlwZX0pO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50KHZhbCl7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YW1vdW50OiB2YWx9KVxuICB9XG5cbiAgY2hhbmdlRGF0ZSh2YWwsIGN1cnJlbnQsIG5leHQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsuLi52YWx9KTtcbiAgICBpZiAoY3VycmVudCAmJiB2YWxbY3VycmVudF0ubGVuZ3RoID09PSAyICYmIG5leHQpIHtcbiAgICAgIHRoaXMucmVmc1tuZXh0XS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGlzVmFsaWREYXRlKCkge1xuICAgIGNvbnN0IHtkYXksIG1vbnRoLCB5ZWFyfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgZGF0ZVJlZyA9IC9eXFxkezEsMn0kLztcbiAgICBjb25zdCBkYXRlUmVnWWVhciA9IC9eXFxkezR9JC87XG4gICAgaWYgKCFkYXRlUmVnLnRlc3QoZGF5KSB8fCAhZGF0ZVJlZy50ZXN0KG1vbnRoKSB8fCAhZGF0ZVJlZ1llYXIudGVzdCh5ZWFyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShwYXJzZUludCh5ZWFyKSwgcGFyc2VJbnQobW9udGgpLCBwYXJzZUludChkYXkpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICB2YWxpZGF0ZVBhcmFtcygpIHtcbiAgICB2YXIgcmVnID0gL15cXGQrJC87XG4gICAgY29uc3Qge2Ftb3VudCwgY2F0ZWdvcnl9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAoIWFtb3VudCB8fCAhcmVnLnRlc3QoYW1vdW50KSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHthbW91bnQ6ICdQbGVhc2UgcHJvdmlkZSBhIFZhbGlkIEFtb3VudCd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghY2F0ZWdvcnkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB7Y2F0ZWdvcnk6ICdQbGVhc2UgcHJvdmlkZSBhIFZhbGlkIENhdGVnb3J5J319KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzVmFsaWREYXRlKCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB7ZGF0ZTogJ1BsZWFzZSBwcm92aWRlIGEgVmFsaWQgRGF0ZSd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHN1Ym1pdE5ld0V4cGVuc2UoKSB7XG4gICAgY29uc3Qge2Ftb3VudCwgZGF5LCBtb250aCwgeWVhciwgdHlwZSwgY2F0ZWdvcnl9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBpc1ZhbGlkYXRpb25TdWNjZXNzID0gdGhpcy52YWxpZGF0ZVBhcmFtcygpO1xuICAgIGlmIChpc1ZhbGlkYXRpb25TdWNjZXNzKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IGFtb3VudCwgdHlwZSwgZGF0ZTogdGhpcy5kYXRlLCBjYXRlZ29yeX07XG4gICAgICBuZXdfZXhwZW5zZShwYXJhbXMpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMubmV3RXhwZW5zZShmYWxzZSwgdHJ1ZSk7XG4gICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gY3JlYXRlIG5ldyBFeHBlbnNlJyxlcnIpO1xuICAgICAgICB0aGlzLnByb3BzLm5ld0V4cGVuc2UoZmFsc2UsIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlck9wdGlvbnModHlwZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBpZiAodHlwZSA9PT0gJ2RheScpIHtcbiAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uPkRheTwvb3B0aW9uPik7XG4gICAgICBmb3IobGV0IGkgPSAxOyBpIDwgMzIgOyBpKyspIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24gdmFsdWU9e2l9PntpfTwvb3B0aW9uPik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnbW9udGgnKSB7XG4gICAgICBvcHRpb25zLnB1c2goPG9wdGlvbj5Nb250aDwvb3B0aW9uPik7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTIgOyBpKyspIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24gdmFsdWU9e2l9PntNT05USFNOQU1FU0hPUlRbaV19PC9vcHRpb24+KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd5ZWFyJykge1xuICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24+WWVhcjwvb3B0aW9uPik7XG4gICAgICBmb3IobGV0IGkgPSAyMDIwOyBpID4gMjAwMCA7IGktLSkge1xuICAgICAgICBvcHRpb25zLnB1c2goPG9wdGlvbiB2YWx1ZT17aX0+e2l9PC9vcHRpb24+KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3R5cGUsIGFtb3VudCwgZGF5LCBtb250aCwgeWVhciwgY2F0ZWdvcnksIGVycm9yfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXdFeHBlbnNlQ29udGFpbmVyIHppMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cEluY0J0bnMgdGV4dENlbnRlciBtVDI1XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnbmV3QnRuICcgKyAodHlwZSA9PT0gJ2V4cGVuc2UnID8gJ3NlbGVjdGVkVHlwZScgOiAnJyl9ICBvbkNsaWNrPXsoKSA9PiB0aGlzLnNlbGVjdFR5cGUoJ2V4cGVuc2UnKX0+RXhwZW5zZTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eyduZXdCdG4gJyArICh0eXBlID09PSAnaW5jb21lJyA/ICdzZWxlY3RlZFR5cGUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNlbGVjdFR5cGUoJ2luY29tZScpfT5JbmNvbWU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFtb3VudElucHV0IG1UMjUgXCI+XG4gICAgICAgIDxzcGFuPuKCuTwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkFtb3VudFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VBbW91bnQoZS50YXJnZXQudmFsdWUpfSB2YWx1ZT17YW1vdW50fS8+XG4gICAgICAgICAge2Vycm9yLmFtb3VudCA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuYW1vdW50fTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICBjbGFzc05hbWU9XCJjYXRlZ29yeUlucHV0IG1UMjUgXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJDYXRlZ29yeVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7Y2F0ZWdvcnk6IGUudGFyZ2V0LnZhbHVlfSl9IHZhbHVlPXtjYXRlZ29yeX0vPlxuICAgICAgICAgIHtlcnJvci5jYXRlZ29yeSA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuY2F0ZWdvcnl9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BlbnREYXkgbVQyNSBcIj5cbiAgICAgICAgICB7LyogPGlucHV0IHJlZj1cImRheVwiIGNsYXNzTmFtZT1cImRheUlwXCIgdHlwZT1cIm51bWJlclwiIG1heExlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIkREXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe2RheTogZS50YXJnZXQudmFsdWV9LCAnZGF5JywgJ21vbnRoJyl9IHZhbHVlPXtkYXl9Lz5cbiAgICAgICAgICA8aW5wdXQgcmVmPVwibW9udGhcIiBjbGFzc05hbWU9XCJkYXlJcFwiIHR5cGU9XCJudW1iZXJcIiBtYXhMZW5ndGg9XCIyXCIgcGxhY2Vob2xkZXI9XCJNTVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHttb250aDogZS50YXJnZXQudmFsdWV9LCAnbW9udGgnLCAneWVhcicpfSB2YWx1ZT17bW9udGh9Lz5cbiAgICAgICAgICA8aW5wdXQgcmVmPVwieWVhclwiIGNsYXNzTmFtZT1cImRheUlwXCIgdHlwZT1cIm51bWJlclwiIG1heExlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIllZXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe3llYXI6IGUudGFyZ2V0LnZhbHVlfSwgJ3llYXInKX0gdmFsdWU9e3llYXJ9Lz4gKi99XG4gICAgICAgICAgPHNlbGVjdCByZWY9XCJkYXlcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7ZGF5OiBlLnRhcmdldC52YWx1ZX0sICdkYXknLCAnbW9udGgnKX0+e3RoaXMucmVuZGVyT3B0aW9ucygnZGF5Jyl9PC9zZWxlY3Q+XG4gICAgICAgICAgPHNlbGVjdCByZWY9XCJtb250aFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHttb250aDogZS50YXJnZXQudmFsdWV9LCAnbW9udGgnLCAneWVhcicpfT57dGhpcy5yZW5kZXJPcHRpb25zKCdtb250aCcpfTwvc2VsZWN0PlxuICAgICAgICAgIDxzZWxlY3QgcmVmPVwieWVhclwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHt5ZWFyOiBlLnRhcmdldC52YWx1ZX0sICd5ZWFyJyl9Pnt0aGlzLnJlbmRlck9wdGlvbnMoJ3llYXInKX08L3NlbGVjdD5cbiAgICAgICAgICB7ZXJyb3IuZGF0ZSA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuZGF0ZX08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJtaXRCdG5cIiBvbkNsaWNrPXt0aGlzLnN1Ym1pdE5ld0V4cGVuc2V9PkRvbmU8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQge05hdkxpbmt9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jbGFzcyBOb3RGb3VuZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGVhZCA9IHRoaXMuaGVhZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGVhZCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldD5cbiAgICAgICAgPHRpdGxlPlBhZ2UgTm90IEZvdW5kPC90aXRsZT5cbiAgICAgIDwvSGVsbWV0PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLmhlYWQoKX1cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDE+U29ycnksIHRoZSBwYWdlIHlvdSBhcmUgZXhwZWN0aW5nIGRvZXMgbm90IGV4aXN0ITwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaSBvbkNsaWNrPSB7KCkgPT4gdGhpcy5wcm9wcy5oaXN0b3J5LmdvQmFjaygpfT4gXG4gICAgICAgICAgICAgIEJhY2tcbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxOYXZMaW5rIHRvPScvJz4gSG9tZSA8L05hdkxpbms+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICA8TmF2TGluayB0bz0nL2xvZ2luJz4gTG9naW4gPC9OYXZMaW5rPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE5vdEZvdW5kOyIsImV4cG9ydCBjb25zdCBNT05USCA9ICdtb250aCc7XG5leHBvcnQgY29uc3QgWUVBUiA9ICd5ZWFyJztcbmV4cG9ydCBjb25zdCBXRUVLID0gJ3dlZWsnO1xuZXhwb3J0IGNvbnN0IERJVklTSU9OTEVOR1RIID0geyBtb250aDogMzEsIHllYXI6IDEyLCB3ZWVrOiA3fTsgXG5leHBvcnQgY29uc3QgTU9OVEhTTkFNRSA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xuZXhwb3J0IGNvbnN0ICBNT05USFNOQU1FU0hPUlQgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtCcm93c2VyUm91dGVyLCBTd2l0Y2gsIFJvdXRlfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuXG5pbXBvcnQgTG9naW4gZnJvbSAnLi4vY29tcG9uZW50cy9Mb2dpbic7XG5pbXBvcnQgTm90Rm91bmQgZnJvbSAnLi4vY29tcG9uZW50cy9Ob3RGb3VuZCdcbmltcG9ydCBIb21lIGZyb20gJy4uL2NvbXBvbmVudHMvSG9tZSc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8U3dpdGNoPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9Jy9sb2dpbicgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxMb2dpbiB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIHsvKiA8Um91dGUgcGF0aD0nL2xvZ2luJyBleGFjdCByZW5kZXI9eyhwcm9wcykgPT4gPExvZ2luIHsuLi5wcm9wc30vPn0vPiAqL31cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvaG9tZScgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxIb21lIHsuLi5wcm9wc30vPn0vPlxuICAgICAgICAgICAgey8qIDxSb3V0ZSBwYXRoPScvJyBleGFjdCByZW5kZXI9eyhwcm9wcykgPT4gPEhvbWUgey4uLnByb3BzfS8+fS8+ICovfVxuICAgICAgICAgICAgey8qIDxSb3V0ZSBwYXRoPScqJyByZW5kZXI9eyhwcm9wcykgPT4gPE5vdEZvdW5kIHsuLi5wcm9wc30vPn0vPiAqL31cbiAgICAgICAgPC9Td2l0Y2g+XG4gICAgKTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25uZWN0LW1vbmdvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1zZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTsiXSwic291cmNlUm9vdCI6IiJ9