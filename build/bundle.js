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
  // process.env.PORT = 4000;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2FwaS9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvZGIvbW9uZ29vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9leHBlbnNlTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hcGlDYWxscy9BcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Ib21lLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL0xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05ld0V4cGVuc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvTm90Rm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbnN0YW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3JvdXRlcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29ubmVjdC1tb25nb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLXNlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiJdLCJuYW1lcyI6WyJzaWduVXAiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJib2R5IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImVtYWlsSWQiLCJ1c2VyIiwiVXNlcnMiLCJfaWQiLCJtb25nb29zZSIsIlR5cGVzIiwiT2JqZWN0SWQiLCJmaW5kIiwidGhlbiIsInJlcyIsImxlbmd0aCIsInNlbmQiLCJlcnJvciIsIm1zZyIsInNhdmUiLCJkb2MiLCJzZXNzaW9uIiwiX3VzZXJJZCIsImUiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwic2lnbkluIiwibmV3RXhwZW5zZSIsImFtb3VudCIsImNhdGVnb3J5IiwiZGF0ZSIsInR5cGUiLCJwYXJzZUludCIsIkRhdGUiLCJ3dyIsIk1hdGgiLCJjZWlsIiwiZ2V0RGF0ZSIsImRvdyIsImdldERheSIsIm1tIiwiZ2V0TW9udGgiLCJ5eSIsImdldEZ1bGxZZWFyIiwiZGQiLCJuZXdFeHBlbnNlSW5zdGFuY2UiLCJFeHBlbnNlcyIsInVzZXJfaWQiLCJlcnIiLCJnZXRFeHBlbnNlRGF0YSIsInVzZXJJZCIsImV4cGVuc2VEYXRlUmVzcG9uZGVyIiwiZGF0YSIsInJlc3BvbmQiLCJleHBlbnNlTGlzdCIsImluY29tZUxpc3QiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwic3BlbnQiLCJzdGFuZGluZyIsInRyYW5zYWN0aW9uTGlzdCIsInRyYW5zYWN0aW9uIiwicGVyY2VudCIsInJvdW5kIiwiZ3JvdXAxIiwiJGdyb3VwIiwiJHN1bSIsImdyb3VwMiIsIiRwdXNoIiwidW53aW5kIiwiJHVud2luZCIsInNvcnQiLCIkc29ydCIsInJlR3JvdXAiLCJ0YWIiLCJZRUFSIiwiYWdncmVnYXRlIiwiJG1hdGNoIiwiJHByb2plY3QiLCJhbGxvd0Rpc2tVc2UiLCJleGVjIiwiTU9OVEgiLCJXRUVLIiwiZ2V0RXhwZW5zZVN1bW1hcnkiLCJleGVjU3VtbWFyeVF1ZXJ5IiwicGVyRGl2aXNpb25EYXRhIiwibWF4QW1vdW50IiwiTnVtYmVyIiwiTUlOX1NBRkVfSU5URUdFUiIsImZvckVhY2giLCJlbnRyeSIsIm1vbnRoIiwidG90YWxBbW91bnQiLCJkaXZpc2lvbiIsImVudiIsInByb2Nlc3MiLCJNT05HT0xBQl9VUkkiLCJtb25nb29zZTEiLCJyZXF1aXJlIiwiUHJvbWlzZSIsImdsb2JhbCIsImNvbm5lY3QiLCJ1c2VNb25nb0NsaWVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJtb2RlbCIsIlNjaGVtYSIsInJlZiIsInJlcXVpcmVkIiwidHJpbSIsIlN0cmluZyIsImRlZmF1bHQiLCJub3ciLCJtaW5sZW5ndGgiLCJleHBlbnNlIiwiTW9uZ29TdG9yZSIsImFwcCIsInBvcnQiLCJQT1JUIiwidXNlIiwic2VjcmV0Iiwic3RvcmUiLCJ1cmwiLCJib2R5UGFyc2VyIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwianNvbiIsImV4cHJlc3MiLCJzdGF0aWMiLCJwb3N0IiwibG9hZEh0bWwiLCJjb250ZW50IiwiaGVsbWV0IiwiSGVsbWV0IiwicmVuZGVyU3RhdGljIiwibWV0YSIsInRvU3RyaW5nIiwidGl0bGUiLCJnZXQiLCJyZXEiLCJjb250ZXh0IiwiUmVhY3RET01TZXJ2ZXIiLCJyZW5kZXJUb1N0cmluZyIsInRlbXBsYXRlIiwibGlzdGVuIiwiQXBwIiwiQ29tcG9uZW50Iiwic2lnbnVwIiwicGFyYW1zIiwiYXhpb3MiLCJzaWduaW4iLCJuZXdfZXhwZW5zZSIsImdldF9leHBlbnNlX2RhdGEiLCJnZXRfZXhwZW5zZV9zdW1tYXJ5IiwiV0lEVEgiLCJIRUlHSFQiLCJHcmFwaCIsInByb3BzIiwiZ2VuZXJhdGVTVkciLCJiaW5kIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImFsZXJ0IiwicGxvdERhdGEiLCJ4Q29vcmRpbmF0ZXMiLCJ5Q29vcmRpbmF0ZXMiLCJESVZJU0lPTkxFTkdUSCIsIm1heEFtdCIsInhDb29yZGluYXRlRGl2TGVuZ3RoIiwibGFzdERpdmlzaW9uIiwic3RyIiwicHVzaCIsImxhc3RYIiwiaSIsIm1hcmdpbiIsIkhvbWUiLCJsZWZ0TWVudUNsaWNrIiwibmF2aWdhdGVUb1NpZ25JbiIsInN0YXRlIiwiYWN0aXZlVGFiIiwic2hvd05ld0V4cGVuc2UiLCJ1bmRlZmluZWQiLCJ2aWV3TW9yZSIsInZpZXdlZE1vcmUiLCJnZXRFeHBlbnNlIiwicmVzcCIsInNldFN0YXRlIiwicmVmcyIsImJhY2tEcm9wIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicG9wdXAiLCJmaXJzdEhhbGZMYW5kaW5nVHh0Iiwib3RoZXJIYWxmTGFuZGluZ1R4dCIsImhpc3RvcnkiLCJ2YWwiLCJzYXZlU3VjY2VzcyIsInRyYW5zYWN0ZWRDYXJkIiwic2Nyb2xsVG9wIiwiaW5kZXgiLCJtYXhXaWR0aCIsImhhc0RhdGEiLCJyZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZCIsInNpZ25lZEluIiwiY2xpY2tWaWV3TW9yZSIsImN1cnJNb250aCIsIk1PTlRIU05BTUUiLCJjdXJyRGF0ZSIsInJlbmRlckxlZnRNZW51QmFyIiwiZ2V0Q3VycmVudERhdGUiLCJjaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0IiwiZ2V0VHJhbnNhY3Rpb25DYXJkIiwiTG9naW4iLCJoZWFkIiwid2l0aFRlc3RDcmVkcyIsImNhdGNoIiwidGFyZ2V0IiwidmFsdWUiLCJOZXdFeHBlbnNlIiwic2VsZWN0VHlwZSIsInN1Ym1pdE5ld0V4cGVuc2UiLCJkYXkiLCJ5ZWFyIiwiY3VycmVudCIsIm5leHQiLCJmb2N1cyIsImRhdGVSZWciLCJkYXRlUmVnWWVhciIsInRlc3QiLCJyZWciLCJpc1ZhbGlkRGF0ZSIsImlzVmFsaWRhdGlvblN1Y2Nlc3MiLCJ2YWxpZGF0ZVBhcmFtcyIsIm9wdGlvbnMiLCJNT05USFNOQU1FU0hPUlQiLCJjaGFuZ2VBbW91bnQiLCJjaGFuZ2VEYXRlIiwicmVuZGVyT3B0aW9ucyIsIk5vdEZvdW5kIiwiZ29CYWNrIiwid2VlayJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRU8sSUFBTUEsMEJBQVMsU0FBVEEsTUFBUyxDQUFDQyxPQUFELEVBQVVDLFFBQVYsRUFBdUI7QUFDekM7QUFEeUMsd0JBRWNELFFBQVFFLElBRnRCO0FBQUEsOENBRWpDQyxRQUZpQztBQUFBLFFBRWpDQSxRQUZpQyx5Q0FFdEIsRUFGc0I7QUFBQSw4Q0FFbEJDLFFBRmtCO0FB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QUFDSSxzQ0FBQyxxQkFBRCxJQUFPLE1BQUssUUFBWixFQUFxQixXQUFyQixFQUEyQixRQUFRLGdCQUFDN0UsS0FBRDtBQUFBLHVCQUFXLDhCQUFDLGVBQUQsRUFBV0EsS0FBWCxDQUFYO0FBQUEsYUFBbkMsR0FESjtBQUdJLHNDQUFDLHFCQUFELElBQU8sTUFBSyxPQUFaLEVBQW9CLFdBQXBCLEVBQTBCLFFBQVEsZ0JBQUNBLEtBQUQ7QUFBQSx1QkFBVyw4QkFBQyxjQUFELEVBQVVBLEtBQVYsQ0FBWDtBQUFBLGFBQWxDO0FBSEosS0FESjtBQVNILEM7Ozs7Ozs7Ozs7O0FDbEJELGtDOzs7Ozs7Ozs7OztBQ0FBLDJDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLDBDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLDRDOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLDZDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NlcnZlci9zZXJ2ZXIuanNcIik7XG4iLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IGFwcCBmcm9tICcuLi9zZXJ2ZXInXG5pbXBvcnQgRXhwZW5zZXMgZnJvbSAnLi4vbW9kZWxzL2V4cGVuc2VNb2RlbCc7XG5pbXBvcnQgVXNlcnMgZnJvbSAnLi4vbW9kZWxzL3VzZXJNb2RlbCc7XG5pbXBvcnQgeyBNT05USCwgWUVBUiwgV0VFSyB9IGZyb20gJy4uLy4uL3NyYy9wYWdlcy9jb25zdGFudHMvY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IHNpZ25VcCA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIC8vIFVzZXJzLmRlbGV0ZU1hbnkoe30pO1xuICAgIGNvbnN0IHsgdXNlcm5hbWUgPSAnJywgcGFzc3dvcmQgPSAnJywgZW1haWxJZCA9ICcnIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgdmFyIHVzZXIgPSBuZXcgVXNlcnMoe1xuICAgICAgICBfaWQ6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKCksXG4gICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICBlbWFpbElkOiBlbWFpbElkXG4gICAgfSk7XG4gICAgVXNlcnMuZmluZCh7IHVzZXJuYW1lOiB1c2VybmFtZSB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IHRydWUsIG1zZzogJ1VzZXJuYW1lIGFscmVhZHkgRXhpc3RzJyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oKGRvYykgPT4ge1xuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID0gZG9jLl9pZDtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IGZhbHNlLCBtc2c6ICdTYXZlZCBTdWNjZXNzZnVsbHknIH0pO1xuICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zdGF0dXMoNTAwKS5zZW5kKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCAoZSkgPT4ge1xuICAgICAgICByZXNwb25zZS5zZW5kKGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaWduSW4gPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCB7IHVzZXJuYW1lID0gJycsIHBhc3N3b3JkID0gJycsIGVtYWlsSWQgPSAnJyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGNvbnNvbGUubG9nKHJlcXVlc3Quc2Vzc2lvbi51c2VyKTtcbiAgICBVc2Vycy5maW5kKHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVxdWVzdC5zZXNzaW9uLl91c2VySWQgPSByZXNbMF0uX2lkO1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiBmYWxzZSwgbXNnOiAnc3VjY2VzcycgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IHRydWUsIG1zZzogJ05vIHVzZXIgYWNjb3VudCBmb3VuZCcgfSk7XG4gICAgICAgIH1cbiAgICB9LCAoZSkgPT4ge1xuICAgICAgICByZXNwb25zZS5zZW5kKGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBuZXdFeHBlbnNlID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgbGV0IHsgYW1vdW50LCBjYXRlZ29yeSwgZGF0ZSwgdHlwZSB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGFtb3VudCA9IHBhcnNlSW50KGFtb3VudCk7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIGNvbnN0IHd3ID0gTWF0aC5jZWlsKGRhdGUuZ2V0RGF0ZSgpIC8gNyk7XG4gICAgY29uc3QgZG93ID0gZGF0ZS5nZXREYXkoKSArIDE7XG4gICAgY29uc3QgbW0gPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IHl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IGRkID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgY29uc3QgbmV3RXhwZW5zZSA9IHsgYW1vdW50LCBjYXRlZ29yeSwgZGF0ZSwgdHlwZSwgd3csIGRvdywgbW0sIHl5LCBkZH07XG4gICAgdmFyIG5ld0V4cGVuc2VJbnN0YW5jZSA9IG5ldyBFeHBlbnNlcyh7XG4gICAgICAgIHVzZXJfaWQ6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKFwiNWMxNjMwYWQ3NjY5ZWEyYzliYjA0NjE2XCIpLFxuICAgICAgICAuLi5uZXdFeHBlbnNlXG4gICAgfSk7XG4gICAgbmV3RXhwZW5zZUluc3RhbmNlLnNhdmUoKS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgLy8gcmVxdWVzdC5zZXNzaW9uLnVzZXIgPSBkb2MudXNlcm5hbWU7XG4gICAgICAgIHJlc3BvbnNlLnNlbmQoZG9jKTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gc2F2ZSBuZXcgRXhwZW5zZScsIGVycik7XG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyg1MDApLnNlbmQoZXJyKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRGF0YSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID8gbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQocmVxdWVzdC5zZXNzaW9uLl91c2VySWQpIDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoXCI1YzEwYmEyMzRmOGI2Mjk2YzA4ZTU4MThcIik7XG4gICAgZnVuY3Rpb24gZXhwZW5zZURhdGVSZXNwb25kZXIoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJlc3BvbmQuc2VuZCg1MDApLnNlbmQoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBleHBlbnNlTGlzdCwgaW5jb21lTGlzdDtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFba2V5XS50eXBlID09PSAnZXhwZW5zZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZW5zZUxpc3QgPSBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhW2tleV0udHlwZSA9PT0gJ2luY29tZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jb21lTGlzdCA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBzcGVudCwgc3RhbmRpbmc7XG4gICAgICAgICAgICBpZiAoZXhwZW5zZUxpc3QpIHtcbiAgICAgICAgICAgICAgICBleHBlbnNlTGlzdC50cmFuc2FjdGlvbkxpc3QubWFwKCh0cmFuc2FjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyY2VudCA9IHRyYW5zYWN0aW9uLmFtb3VudCAvIChleHBlbnNlTGlzdC5hbW91bnQgLyAxMDApO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5wZXJjZW50ID0gTWF0aC5yb3VuZChwZXJjZW50ICogMTAwKSAvIDEwMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzcGVudCA9IGV4cGVuc2VMaXN0LmFtb3VudDtcbiAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgIHNwZW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmNvbWVMaXN0KSB7XG4gICAgICAgICAgICAgICAgaW5jb21lTGlzdC50cmFuc2FjdGlvbkxpc3QubWFwKCh0cmFuc2FjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyY2VudCA9IHRyYW5zYWN0aW9uLmFtb3VudCAvIChpbmNvbWVMaXN0LmFtb3VudCAvIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLnBlcmNlbnQgPSBNYXRoLnJvdW5kKHBlcmNlbnQgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YW5kaW5nID0gaW5jb21lTGlzdC5hbW91bnQgLSBzcGVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhbmRpbmcgPSAwIC0gc3BlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHNwZW50LCBzdGFuZGluZyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFF1ZXJpZXMgc3RhcnRcbiAgICBjb25zdCBncm91cDEgPSB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7IGNhdGVnb3J5OiAnJGNhdGVnb3J5JywgdHlwZTogJyR0eXBlJyB9LFxuICAgICAgICAgICAgdHlwZTogeyAnJGZpcnN0JzogJyR0eXBlJyB9LFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHsgJyRmaXJzdCc6ICckY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJHN1bTogJyRhbW91bnQnIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZ3JvdXAyID0ge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDogeyB0eXBlOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJHN1bTogJyRhbW91bnQnIH0sXG4gICAgICAgICAgICB0eXBlOiB7ICckZmlyc3QnOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3Q6IHsgJHB1c2g6IHsgY2F0ZWdvcnk6ICckY2F0ZWdvcnknLCBhbW91bnQ6ICckYW1vdW50JyB9IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgdW53aW5kID0geyAkdW53aW5kOiAnJHRyYW5zYWN0aW9uTGlzdCcgfTtcbiAgICBjb25zdCBzb3J0ID0geyAkc29ydDogeyAndHJhbnNhY3Rpb25MaXN0LmFtb3VudCc6IC0xIH0gfVxuICAgIGNvbnN0IHJlR3JvdXAgPSB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7IHR5cGU6ICckdHlwZScgfSxcbiAgICAgICAgICAgIGFtb3VudDogeyAnJGZpcnN0JzogJyRhbW91bnQnIH0sXG4gICAgICAgICAgICB0eXBlOiB7ICckZmlyc3QnOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3Q6IHsgJHB1c2g6ICckdHJhbnNhY3Rpb25MaXN0JyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIFF1ZXJpZXMgZW5kXG5cbiAgICBjb25zdCB7IHRhYiwgd3csIG1tLCB5eSwgZG93IH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgaWYgKHRhYiA9PT0gWUVBUikge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IE1PTlRIKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0seyAkbWF0Y2g6IHsgbW06IHBhcnNlSW50KG1tKSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IFdFRUspIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9IH0sXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB5eTogcGFyc2VJbnQoeXkpIH0gfSx7ICRtYXRjaDogeyBtbTogcGFyc2VJbnQobW0pIH0gfSx7ICRtYXRjaDogeyB3dzogcGFyc2VJbnQod3cpIH0gfSxcbiAgICAgICAgICAgIHsgLi4uZ3JvdXAxIH0seyAuLi5ncm91cDIgfSxcbiAgICAgICAgICAgIHsgLi4udW53aW5kIH0seyAuLi5zb3J0IH0seyAuLi5yZUdyb3VwIH0sXG4gICAgICAgICAgICB7ICRwcm9qZWN0OiB7IF9pZDogMCwgYW1vdW50OiAxLCB0eXBlOiAxLCB0cmFuc2FjdGlvbkxpc3Q6IDEgfSB9XG4gICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4cGVuc2VEYXRlUmVzcG9uZGVyKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVN1bW1hcnkgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBmdW5jdGlvbiBleGVjU3VtbWFyeVF1ZXJ5KGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZXNwb25kLnNlbmQoNTAwKS5zZW5kKGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhWzBdICYmIGRhdGFbMF0ucGVyRGl2aXNpb25EYXRhKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1heEFtb3VudCA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSO1xuICAgICAgICAgICAgICAgIGRhdGFbMF0ucGVyRGl2aXNpb25EYXRhLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF4QW1vdW50IDwgZW50cnkuYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhBbW91bnQgPSBlbnRyeS5hbW91bnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRhdGFbMF0ubWF4QW1vdW50ID0gbWF4QW1vdW50O1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoey4uLmRhdGFbMF19KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHVzZXJJZCA9IHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID8gbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQocmVxdWVzdC5zZXNzaW9uLl91c2VySWQpIDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoXCI1YzEwYmEyMzRmOGI2Mjk2YzA4ZTU4MThcIik7XG4gICAgY29uc3Qge3RhYiwgeXksIG1tLCB3d30gPSByZXF1ZXN0LmJvZHk7XG4gICAgaWYgKHRhYiA9PT0gWUVBUikge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHl5OiB5eX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB0eXBlOiAnZXhwZW5zZSd9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiB7IG1tOiAnJG1tJ30sIGFtb3VudDogeyRzdW06ICckYW1vdW50J30sIG1vbnRoOiB7JyRmaXJzdCc6ICckbW0nfX19LFxuICAgICAgICAgICAgeyRzb3J0OiB7IG1vbnRoOiAxIH19LFxuICAgICAgICAgICAgeyRncm91cDoge19pZDogbnVsbCwgdG90YWxBbW91bnQ6IHsnJHN1bSc6ICckYW1vdW50J30sIHBlckRpdmlzaW9uRGF0YTogeyRwdXNoIDogeyBhbW91bnQ6ICckYW1vdW50JywgZGl2aXNpb246ICckbW9udGgnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDogMH19XG4gICAgICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleGVjU3VtbWFyeVF1ZXJ5KTtcbiAgICB9IGVsc2UgaWYgKHRhYiA9PT0gTU9OVEgpIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkIH19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB5eTogeXl9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgbW06IG1tfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHR5cGU6ICdleHBlbnNlJ319LFxuICAgICAgICAgICAgeyRncm91cDogeyBfaWQ6IHtkZDogJyRkZCd9LCBhbW91bnQ6IHsnJHN1bSc6ICckYW1vdW50J30sIGRkOiB7JyRmaXJzdCc6ICckZGQnfSB9fSxcbiAgICAgICAgICAgIHskc29ydDoge2RkOiAxfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7X2lkOiBudWxsLCB0b3RhbEFtb3VudDogeyckc3VtJzogJyRhbW91bnQnfSwgcGVyRGl2aXNpb25EYXRhOiB7JHB1c2g6IHthbW91bnQ6ICckYW1vdW50JywgZGl2aXNpb246ICckZGQnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDowfX1cbiAgICAgICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4ZWNTdW1tYXJ5UXVlcnkpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBXRUVLKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgeXk6IHl5fX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IG1tOiBtbX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB3dzogd3d9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdHlwZTogJ2V4cGVuc2UnfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7IF9pZDoge2RvdzogJyRkb3cnfSwgYW1vdW50OiB7JHN1bTogJyRhbW91bnQnfSwgZG93OiB7JyRmaXJzdCc6ICckZG93J319fSxcbiAgICAgICAgICAgIHskc29ydDogeyBkb3c6IDF9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiBudWxsLCB0b3RhbEFtb3VudDogeyRzdW06ICckYW1vdW50J30sICBwZXJEaXZpc2lvbkRhdGE6IHskcHVzaDoge2Ftb3VudDogJyRhbW91bnQnLCBkaXZpc2lvbjogJyRkb3cnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDogMH19XG4gICAgICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleGVjU3VtbWFyeVF1ZXJ5KTtcbiAgICB9XG59IiwidmFyIGVudiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCc7XG5cbmlmIChlbnYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgLy8gcHJvY2Vzcy5lbnYuUE9SVCA9IDQwMDA7XG4gIC8vIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSA9ICdtb25nb2RiOi8vbG9jYWxob3N0OjI3MDE3L2V4cGVuc2UnO1xuICBwcm9jZXNzLmVudi5NT05HT0xBQl9VUkkgPSAnbW9uZ29kYjovL2RoaWxpcGsxMzpkaGlsaXBrMTNAZHMyNDczMTAubWxhYi5jb206NDczMTAvZXhwZW5zZSc7XG59IGVsc2Uge1xuICBwcm9jZXNzLmVudi5NT05HT0xBQl9VUkkgPSAnbW9uZ29kYjovL2RoaWxpcGsxMzpkaGlsaXBrMTNAZHMyNDczMTAubWxhYi5jb206NDczMTAvZXhwZW5zZSc7XG59XG4vLyBleHBvcnQgZGVmYXVsdCBlbnY7XG4iLCJ2YXIgbW9uZ29vc2UxID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcbm1vbmdvb3NlMS5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG5tb25nb29zZTEuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0xBQl9VUkksIHsgdXNlTW9uZ29DbGllbnQ6IHRydWUgfSkudGhlbigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB0byBEYicpO1xufSwoZSk9PiB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0ge21vbmdvb3NlMX07XG4iLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IFVzZXJzIGZyb20gJy4vdXNlck1vZGVsJztcblxuY29uc3QgRXhwZW5zZXMgPSBtb25nb29zZS5tb2RlbCgnRXhwZW5zZXMnLCB7XG4gIHVzZXJfaWQ6IHtcbiAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG4gICAgcmVmOiAnVXNlcnMnXG4gIH0sXG4gIGFtb3VudDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0cmltOiB0cnVlXG4gIH0sXG4gIGNhdGVnb3J5OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHRyaW06IHRydWUsXG4gICAgICBkZWZhdWx0OiAnb3RoZXJzJ1xuICB9LFxuICB0eXBlOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlLFxuICAgIGRlZmF1bHQ6ICdleHBlbnNlJ1xuICB9LFxuICBkYXRlOiB7XG4gICAgdHlwZTogRGF0ZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZSxcbiAgICBkZWZhdWx0OiBEYXRlLm5vdygpXG4gIH0sXG4gIGRkOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIHd3OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIGRvdzoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICBtbToge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICB5eToge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9XG59KTtcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VzOyIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgRXhwZW5zZXMgZnJvbSAnLi9leHBlbnNlTW9kZWwnO1xuXG5jb25zdCBVc2VycyA9IG1vbmdvb3NlLm1vZGVsKCdVc2VycycsIHtcbiAgICBfaWQ6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICB1c2VybmFtZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW5sZW5ndGg6IDUsXG4gICAgICAgIHRyaW06IHRydWVcbiAgICB9LFxuICAgIGVtYWlsSWQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHRyaW06IHRydWVcbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbmxlbmd0aDogOCxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgZXhwZW5zZTogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsIFxuICAgICAgICAgICAgcmVmOiAnRXhwZW5zZXMnXG4gICAgICAgIH1cbiAgICBdXG59KTtcbmV4cG9ydCBkZWZhdWx0IFVzZXJzOyIsInJlcXVpcmUoJy4vY29uZmlnL2NvbmZpZycpO1xuaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCc7XG5pbXBvcnQgZW52IGZyb20gJy4vY29uZmlnL2NvbmZpZyc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET01TZXJ2ZXIgZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xudmFyIHNlc3Npb24gPSByZXF1aXJlKCdleHByZXNzLXNlc3Npb24nKTtcblxuaW1wb3J0IEFwcCBmcm9tICcuLi9zcmMvYXBwJ1xuaW1wb3J0IG1vbmdvb3NlMSBmcm9tICcuL2RiL21vbmdvb3NlJztcbmltcG9ydCB7c2lnblVwLCBzaWduSW4sIG5ld0V4cGVuc2UsIGdldEV4cGVuc2VEYXRhLCBnZXRFeHBlbnNlU3VtbWFyeX0gZnJvbSAnLi9hcGkvYXBpQ2FsbHMnO1xuY29uc3QgTW9uZ29TdG9yZSA9IHJlcXVpcmUoJ2Nvbm5lY3QtbW9uZ28nKShzZXNzaW9uKTtcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQ7XG5cbi8vIGFwcC51c2Uoc2Vzc2lvbih7XG4vLyAgICAgc2VjcmV0OiAnZGhpbGlwTG9jYWwnLFxuLy8gICAgIHJlc2F2ZTogZmFsc2UsXG4vLyAgICAgc2F2ZVVuaW5pdGlhbGl6ZWQ6IHRydWUsXG4vLyAgICAgdXJsOiBwcm9jZXNzLmVudi5NT05HT0xBQl9VUklcbi8vIH0pKVxuYXBwLnVzZShzZXNzaW9uKHtcbiAgICBzZWNyZXQ6ICdmb28nLFxuICAgIHN0b3JlOiBuZXcgTW9uZ29TdG9yZSh7XG4gICAgICAgIHVybDogcHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJXG4gICAgfSlcbn0pKTtcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYygnYnVpbGQvcHVibGljJykpO1xuYXBwLnVzZSgnL3N0eWxlcycsIGV4cHJlc3Muc3RhdGljKCdzcmMvcGFnZXMvc3R5bGVzJykpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYygnc3JjL3BhZ2VzL3N0YXRpYycpKTtcblxuLy8gQVBJIENhbGxzXG5hcHAucG9zdCgnL3NpZ251cCcsIHNpZ25VcCk7XG5hcHAucG9zdCgnL3NpZ25pbicsIHNpZ25Jbik7XG5hcHAucG9zdCgnL25ld19leHBlbnNlJywgbmV3RXhwZW5zZSk7XG5hcHAucG9zdCgnL2dldF9leHBlbnNlX2RhdGEnLCBnZXRFeHBlbnNlRGF0YSk7XG5hcHAucG9zdCgnL2dldF9leHBlbnNlX3N1bW1hcnknLCBnZXRFeHBlbnNlU3VtbWFyeSk7XG5cbmNvbnN0IGxvYWRIdG1sID0gKGNvbnRlbnQpID0+IHtcbiAgICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG4gICAgcmV0dXJuIChgXG4gICAgICAgIDxodG1sPlxuICAgICAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICAgICAgJHtoZWxtZXQubWV0YS50b1N0cmluZygpfVxuICAgICAgICAgICAgICAgICR7aGVsbWV0LnRpdGxlLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3R3aXR0ZXItYm9vdHN0cmFwLzQuMS4zL2Nzcy9ib290c3RyYXAubWluLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvdHdpdHRlci1ib290c3RyYXAvNC4xLjMvanMvYm9vdHN0cmFwLmJ1bmRsZS5taW4uanNcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvY29tbW9uLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9ob21lLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9sb2dpbi5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvbmV3X2V4cGVuc2UuY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnNcIiByZWw9XCJzdHlsZXNoZWV0XCI+XG4gICAgICAgICAgICA8L2hlYWQ+XG4gICAgICAgICAgICA8Ym9keT5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicm9vdFwiPiR7Y29udGVudH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8c2NyaXB0IHNyYz1cImNsaWVudF9idW5kbGUuanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgIDwvYm9keT5cbiAgICAgICAgPC9odG1sPmApO1xufTtcblxuYXBwLmdldCgnKicsIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSB7fTtcbiAgICBjb25zdCBjb250ZW50ID0gUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdHJpbmcoXG4gICAgICAgIDxTdGF0aWNSb3V0ZXI+XG4gICAgICAgICAgICA8QXBwIGxvY2F0aW9uPXtyZXEudXJsfSBjb250ZXh0PXtjb250ZXh0fSAvPlxuICAgICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICApO1xuICAgIGNvbnN0IHRlbXBsYXRlID0gbG9hZEh0bWwoY29udGVudCk7XG4gICAgcmVzLnNlbmQodGVtcGxhdGUpO1xufSk7XG5cbmFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdwcm9jZXMuZW52JywgcG9ydCwgcHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJKTtcbiAgICBjb25zb2xlLmxvZygnU2VydmVyIFN0YXJ0ZWQgb24gUG9ydDogJywgcG9ydCk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYXBwO1xuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTd2l0Y2gsIFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBIb21lIGZyb20gJy4vcGFnZXMvY29tcG9uZW50cy9Mb2dpbic7XG5pbXBvcnQgUm91dGVzIGZyb20gJy4vcGFnZXMvcm91dGVzL3JvdXRlcyc7XG5pbXBvcnQge1NlcnZlclJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJvdXRlcy8+XG4gICAgICAgICk7XG4gICAgfVxufSIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmV4cG9ydCBjb25zdCBzaWdudXAgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvc2lnbnVwLyc7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgey4uLnBhcmFtc30pO1xufVxuXG5leHBvcnQgY29uc3Qgc2lnbmluID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL3NpZ25pbi8nO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHsuLi5wYXJhbXN9KTtcbn1cblxuZXhwb3J0IGNvbnN0IG5ld19leHBlbnNlID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL25ld19leHBlbnNlLyc7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgey4uLnBhcmFtc30pO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0X2V4cGVuc2VfZGF0YSA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9nZXRfZXhwZW5zZV9kYXRhLycgO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHBhcmFtcyk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRfZXhwZW5zZV9zdW1tYXJ5ID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL2dldF9leHBlbnNlX3N1bW1hcnkvJyA7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgcGFyYW1zKTtcbn1cbiIsIlxuY29uc3QgV0lEVEggPSAxNTA7XG5jb25zdCBIRUlHSFQgPSAxMDA7XG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtESVZJU0lPTkxFTkdUSH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5nZW5lcmF0ZVNWRyA9IHRoaXMuZ2VuZXJhdGVTVkcuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICh3aW5kb3cgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvbnJlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhbGVydCgnYXR0YWNoRXZlbnQgLSByZXNpemUnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdlbmVyYXRlU1ZHKCkge1xuICAgIGNvbnN0IHtwbG90RGF0YSwgdGFifSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeENvb3JkaW5hdGVzID0gW107XG4gICAgY29uc3QgeUNvb3JkaW5hdGVzID0gW107XG4gICAgY29uc3QgbGVuZ3RoID0gRElWSVNJT05MRU5HVEhbdGFiXTtcbiAgICBjb25zdCBtYXhBbXQgPSBwbG90RGF0YS5tYXhBbW91bnQ7XG4gICAgY29uc3QgeENvb3JkaW5hdGVEaXZMZW5ndGggPSAoV0lEVEggLyAobGVuZ3RoICsgMikpO1xuICAgIGxldCBsYXN0RGl2aXNpb24gPSAwO1xuICAgIGxldCBzdHIgPSAnJztcblxuICAgIC8qIFRvIHN0YXJ0IHRoZSBncmFwaCBhdCB0aGUgTGVhc3QgUG9pbnQgKi9cbiAgICB4Q29vcmRpbmF0ZXMucHVzaCgwKTtcbiAgICB5Q29vcmRpbmF0ZXMucHVzaChIRUlHSFQpO1xuICAgIHBsb3REYXRhLnBlckRpdmlzaW9uRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgd2hpbGUgKGVudHJ5LmRpdmlzaW9uID4gbGFzdERpdmlzaW9uKSB7XG4gICAgICAgIGNvbnN0IGxhc3RYID0geENvb3JkaW5hdGVzW3hDb29yZGluYXRlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgeENvb3JkaW5hdGVzLnB1c2goKGxhc3RYICsgeENvb3JkaW5hdGVEaXZMZW5ndGgpKTtcbiAgICAgICAgaWYgKGVudHJ5LmRpdmlzaW9uID09PSBsYXN0RGl2aXNpb24gKyAxKSB7XG4gICAgICAgICAgY29uc3QgcGVyY2VudCA9ICgoZW50cnkuYW1vdW50IC8gbWF4QW10KSAqIDEwMCk7XG4gICAgICAgICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUIC0gKChIRUlHSFQgLyAxMDApICogcGVyY2VudCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHlDb29yZGluYXRlcy5wdXNoKEhFSUdIVCk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdERpdmlzaW9uID0gbGFzdERpdmlzaW9uICsgMTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyB0byBwdXNoIHZhbHVlcyBmb3IgcmVtYWluaW5nIGRheXNcbiAgICB3aGlsZShsZW5ndGggPiBsYXN0RGl2aXNpb24pIHtcbiAgICAgIGNvbnN0IGxhc3RYID0geENvb3JkaW5hdGVzW3hDb29yZGluYXRlcy5sZW5ndGggLSAxXTtcbiAgICAgIHhDb29yZGluYXRlcy5wdXNoKChsYXN0WCArIHhDb29yZGluYXRlRGl2TGVuZ3RoKSk7XG4gICAgICB5Q29vcmRpbmF0ZXMucHVzaChIRUlHSFQpO1xuICAgICAgbGFzdERpdmlzaW9uID0gbGFzdERpdmlzaW9uICsgMTtcbiAgICB9XG4gICAgY29uc3QgbGFzdFggPSB4Q29vcmRpbmF0ZXNbeENvb3JkaW5hdGVzLmxlbmd0aCAtIDFdO1xuICAgIHhDb29yZGluYXRlcy5wdXNoKChsYXN0WCArIHhDb29yZGluYXRlRGl2TGVuZ3RoKSk7XG4gICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUKTtcbiBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHhDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgc3RyICs9ICcgJyArIHhDb29yZGluYXRlc1tpXSArICcsJyArIHlDb29yZGluYXRlc1tpXSArICcgJztcbiAgICB9XG4gICAgaWYgKHN0cikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9eycwIDAgJyArIFdJRFRIICsgJyAnICsgSEVJR0hUfSBzdHlsZT17e21hcmdpbjogJzIwcHgnfX0+XG4gICAgICAgICAgICA8cG9seWxpbmUgcG9pbnRzPXtzdHJ9IGNsYXNzTmFtZT1cImdyYXBoUGxvdExpbmVcIiAvPlxuICAgICAgICAgICAgey8qIDxnIHN0eWxlPXt7c3Ryb2tlOiAnI2NjYycsIHN0cm9rZURhc2hhcnJheTogMCwgc3Ryb2tlV2lkdGg6IDF9fT5cbiAgICAgICAgICAgICAgPGxpbmUgeDE9XCIwXCIgeTE9XCIyMDBcIiB4Mj1cIjBcIiB5Mj1cIjBcIj48L2xpbmU+XG4gICAgICAgICAgICA8L2c+ICovfVxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLmdlbmVyYXRlU1ZHKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgTmV3RXhwZW5zZSBmcm9tICcuL05ld0V4cGVuc2UnO1xuaW1wb3J0IHtnZXRfZXhwZW5zZV9kYXRhLCBnZXRfZXhwZW5zZV9zdW1tYXJ5fSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5pbXBvcnQge01PTlRILCBZRUFSLCBXRUVLLCBNT05USFNOQU1FfSBmcm9tICcuLi9jb25zdGFudHMvY29uc3RhbnRzJztcbmltcG9ydCBHcmFwaCBmcm9tICcuL0dyYXBoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMubGVmdE1lbnVDbGljayA9IHRoaXMubGVmdE1lbnVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmV3RXhwZW5zZSA9IHRoaXMubmV3RXhwZW5zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmF2aWdhdGVUb1NpZ25JbiA9IHRoaXMubmF2aWdhdGVUb1NpZ25Jbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhY3RpdmVUYWI6IE1PTlRILFxuICAgICAgc2hvd05ld0V4cGVuc2U6IGZhbHNlLFxuICAgICAgc3RhbmRpbmc6IHVuZGVmaW5lZCxcbiAgICAgIHNwZW50OiB1bmRlZmluZWQsXG4gICAgICBleHBlbnNlTGlzdDoge30sXG4gICAgICBpbmNvbWVMaXN0OiB7fSxcbiAgICAgIHZpZXdNb3JlOiBmYWxzZVxuICAgIH1cbiAgICB0aGlzLnZpZXdlZE1vcmUgPSB7fTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmdldEV4cGVuc2UoKTtcbiAgICB0aGlzLmdldEV4cGVuc2VTdW1tYXJ5KCk7XG4gIH1cblxuICBnZXRFeHBlbnNlU3VtbWFyeSgpIHtcbiAgICBjb25zdCB0YWIgPSB0aGlzLnN0YXRlLmFjdGl2ZVRhYjtcbiAgICBjb25zdCBtbSA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgZG93ID0gbmV3IERhdGUoKS5nZXREYXkoKTtcbiAgICBjb25zdCB3dyA9IE1hdGguY2VpbChuZXcgRGF0ZSgpLmdldERhdGUoKSAvIDcpO1xuICAgIGNvbnN0IHl5ID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHt0YWIsIG1tLCBkb3csIHd3LCB5eX07XG4gICAgZ2V0X2V4cGVuc2Vfc3VtbWFyeShwYXJhbXMpLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3Bsb3REYXRhOiB7Li4ucmVzcC5kYXRhfX0pO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gR2V0IEV4cGVuc2UgU3VtbWFyeSBEZXRhaWxzJywgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEV4cGVuc2UoKSB7XG4gICAgbGV0IGV4cGVuc2VMaXN0ID0ge30sIGluY29tZUxpc3QgPSB7fSwgc3RhbmRpbmcgPScnO1xuICAgIGNvbnN0IHRhYiA9IHRoaXMuc3RhdGUuYWN0aXZlVGFiO1xuICAgIGNvbnN0IG1tID0gbmV3IERhdGUoKS5nZXRNb250aCgpICsgMTtcbiAgICBjb25zdCBkb3cgPSBuZXcgRGF0ZSgpLmdldERheSgpO1xuICAgIGNvbnN0IHd3ID0gTWF0aC5jZWlsKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpIC8gNyk7XG4gICAgY29uc3QgeXkgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgcGFyYW1zID0ge3RhYiwgbW0sIGRvdywgd3csIHl5fTtcbiAgICBnZXRfZXhwZW5zZV9kYXRhKHBhcmFtcykudGhlbigocmVzcCkgPT4ge1xuICAgICBjb25zdCB7ZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHN0YW5kaW5nLCBzcGVudH0gPSByZXNwLmRhdGE7XG4gICAgICB0aGlzLnNldFN0YXRlKHtleHBlbnNlTGlzdCwgaW5jb21lTGlzdCwgc3RhbmRpbmcsIHNwZW50fSk7XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBHZXQgRXhwZW5zZSBEZXRhaWxzJywgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoYWN0aXZlVGFiKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlVGFiOiBhY3RpdmVUYWIsIHZpZXdNb3JlOiBmYWxzZX0sICgpID0+IHtcbiAgICAgIHRoaXMuZ2V0RXhwZW5zZSgpO1xuICAgICAgdGhpcy5nZXRFeHBlbnNlU3VtbWFyeSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbGVmdE1lbnVDbGljaygpIHtcbiAgICB0aGlzLnJlZnMuYmFja0Ryb3AuY2xhc3NMaXN0LnRvZ2dsZSgnYmFja0Ryb3AnKTtcbiAgICB0aGlzLnJlZnMucG9wdXAuY2xhc3NMaXN0LnRvZ2dsZSgncmlnaHQwJyk7XG4gICAgdGhpcy5yZWZzLmZpcnN0SGFsZkxhbmRpbmdUeHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2NhbGU5MCcpO1xuICAgIHRoaXMucmVmcy5vdGhlckhhbGZMYW5kaW5nVHh0LmNsYXNzTGlzdC50b2dnbGUoJ3NjYWxlOTAnKTtcbiAgfVxuXG4gIG5hdmlnYXRlVG9TaWduSW4oKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5wcm9wcyk7XG4gICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goJy9sb2dpbicpO1xuICB9XG5cbiAgcmVuZGVyTGVmdE1lbnVCYXIoKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51QmFyXCI+XG4gICAgICAgIDxkaXYgcmVmPVwicG9wdXBcImNsYXNzTmFtZT1cInBvcHVwIHppMiBcIiBvbkNsaWNrPXt0aGlzLmxlZnRNZW51Q2xpY2t9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZUJhciBpbi1ibCBmbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51LW9wdGlvblwiPlNldHRpbmdzPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtb3B0aW9uXCIgb25DbGljaz17dGhpcy5uYXZpZ2F0ZVRvU2lnbklufT5TaWduIEluPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtb3B0aW9uXCI+QWJvdXQgTWU8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgbmV3RXhwZW5zZSh2YWwsIHNhdmVTdWNjZXNzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2hvd05ld0V4cGVuc2U6IHZhbH0sICgpID0+IHtcbiAgICAgIGlmIChzYXZlU3VjY2Vzcykge1xuICAgICAgICB0aGlzLmdldEV4cGVuc2UoKTtcbiAgICAgICAgdGhpcy5nZXRFeHBlbnNlU3VtbWFyeSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2xpY2tWaWV3TW9yZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt2aWV3TW9yZTogIXRoaXMuc3RhdGUudmlld01vcmV9KTtcbiAgICB0aGlzLnJlZnMudHJhbnNhY3RlZENhcmQuc2Nyb2xsVG9wID0gMDtcbiAgfVxuXG4gIHJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnN0YXRlLmV4cGVuc2VMaXN0LnRyYW5zYWN0aW9uTGlzdC5tYXAoKHRyYW5zYWN0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS52aWV3TW9yZSB8fCB0aGlzLnZpZXdlZE1vcmVbdGhpcy5zdGF0ZS5hY3RpdmVUYWJdIHx8ICF0aGlzLnN0YXRlLnZpZXdNb3JlICYmIGluZGV4IDwgMikge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnZpZXdNb3JlKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdlZE1vcmVbdGhpcy5zdGF0ZS5hY3RpdmVUYWJdID0gdHJ1ZTsgLy8gVG8gbm90IHJlbW92ZSBlbGVtZW50IGZyb20gRE9NIG9uIGNsaWNraW5nIHZpZXcgTW9yZSBhZ2FpblxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBrZXk9eyd0cmFuc2FjdGlvbl90eXBlXycgKyBpbmRleH0gY2xhc3NOYW1lPVwidHJhbnNhY3RlZENhcmRJbm5lclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRJbm5lcmhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRfbmFtZVwiPnt0cmFuc2FjdGlvbi5jYXRlZ29yeX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0X3BlcmNlbnQgXCI+e3RyYW5zYWN0aW9uLnBlcmNlbnQgKyAnICUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7LyogPHNwYW4gY2xhc3NOYW1lPVwiY2F0X25hbWUgbG9hZGVyXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9wZXJjZW50IGxvYWRlclwiPjwvc3Bhbj4gKi99XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzQmFyIGJsIHRleHRDZW50ZXIgbWFyZ2luVDI1XCIgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsbGVkXCIgc3R5bGU9IHt7bWF4V2lkdGg6IHRyYW5zYWN0aW9uLnBlcmNlbnQgKyAnJSd9fT5cbiAgICAgICAgICAgICAgICAgIHsvKiA8ZGl2IGNsYXNzTmFtZT1cImZpbGxlZFwiID48L2Rpdj4gKi99XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgKTtcbiAgfVxuXG4gIGdldFRyYW5zYWN0aW9uQ2FyZCgpIHtcbiAgICBjb25zdCB7YWN0aXZlVGFiLCB2aWV3TW9yZSA9IGZhbHNlfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgaGFzRGF0YSA9IHRoaXMuc3RhdGUuZXhwZW5zZUxpc3QgJiYgT2JqZWN0LmtleXModGhpcy5zdGF0ZS5leHBlbnNlTGlzdCkubGVuZ3RoID4gMDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiByZWY9XCJ0cmFuc2FjdGVkQ2FyZFwiIGNsYXNzTmFtZT17J3RyYW5zYWN0ZWRDYXJkIHRyYW5zaXRpb24xYSAnICsgKHZpZXdNb3JlID8gJ3Nob3dBbGxUcmFuc2FjdGlvbicgOiAnJyl9PlxuICAgICAgICAgICAge2hhc0RhdGEgP1xuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmFuc2FjdFNjcm9sbGVyXCI+XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gV0VFSyA/IHRoaXMucmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQoKSA6IG51bGx9XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gTU9OVEggPyB0aGlzLnJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKCkgOiBudWxsfVxuICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IFlFQVIgPyB0aGlzLnJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKCkgOiBudWxsfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PiA6IFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIHBhZFQyMCBtaDEwcFwiPlxuICAgICAgICAgICAgICA8ZGl2Pk5vIFRyYW5zYWN0aW9ucyBhZGRlZCA8L2Rpdj5cbiAgICAgICAgICAgICAge3R5cGVvZih3aW5kb3cpICE9PSAndW5kZWZpbmVkJyAmJiAhd2luZG93LnNpZ25lZEluICYmIDxkaXYgY2xhc3NOYW1lPVwicGFkVDEwIHBhZEIyMFwiPjxhIGhyZWY9XCIvbG9naW5cIj48c3Bhbj5TaWduIEluPC9zcGFuPjwvYT4gZm9yIFBhc3QgVHJhbnNhY3Rpb25zPC9kaXY+fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aWV3TW9yZUFycm93XCIgb25DbGljaz17KCkgPT4gdGhpcy5jbGlja1ZpZXdNb3JlKCl9PlxuICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9e3ZpZXdNb3JlID8gJ3JvdGF0ZVZpZXdNb3JlJyA6ICcnfSByZWY9XCJzdmdWaWV3TW9yZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNy40MSA3Ljg0TDEyIDEyLjQybDQuNTktNC41OEwxOCA5LjI1bC02IDYtNi02elwiLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnbmV3Q29udGFpbmVyICcgKyAoIWhhc0RhdGEgPyAncGFkVDEwJyA6ICcnKX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ld1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuZXdCdG5cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLm5ld0V4cGVuc2UodHJ1ZSl9PiArIGFkZCBOZXc8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICB9XG4gIGdldEN1cnJlbnREYXRlKCkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGN1cnJNb250aCA9IE1PTlRIU05BTUVbZGF0ZS5nZXRNb250aCgpXTtcbiAgICBjb25zdCBjdXJyRGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIHJldHVybiBjdXJyRGF0ZSArICcgJyArIGN1cnJNb250aCArICcgJyArIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7YWN0aXZlVGFiLCBzaG93TmV3RXhwZW5zZSwgc3RhbmRpbmcgPSB1bmRlZmluZWQsIHNwZW50ID0gdW5kZWZpbmVkLCB2aWV3TW9yZSA9IGZhbHNlLCBwbG90RGF0YSwgaW5jb21lTGlzdH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgcmVmPVwiYmFja0Ryb3BcIiBjbGFzc05hbWU9eyd0cmFuc2l0aW9uMmEgemkxICcgKyAoc2hvd05ld0V4cGVuc2UgPyAnYmFja0Ryb3AnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLm5ld0V4cGVuc2UoZmFsc2UpfT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJMZWZ0TWVudUJhcigpfVxuICAgICAgICAgIDxkaXYgcmVmPVwibWFpbkNvbnRlbnRcIiBjbGFzc05hbWU9XCJtYWluQ29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpcnN0LWhhbGYtbGFuZGluZ1wiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHJlZj1cImZpcnN0SGFsZkxhbmRpbmdUeHRcIiBjbGFzc05hbWU9XCJ0cmFuc2l0aW9uMF81IFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhbmRpbmdcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxlZnQtbWVudS1jb250YWluZXJcIiBvbkNsaWNrPXt0aGlzLmxlZnRNZW51Q2xpY2t9PjxpbWcgY2xhc3NOYW1lPVwibGVmdC1tZW51XCIgc3JjPVwiL2ltZy9tZW51LnN2Z1wiLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7LyogPHNwYW4gY2xhc3NOYW1lPVwicmlnaHQtbWVudS1jb250YWluZXJcIiBvbkNsaWNrPXsoKSA9PiB7dGhpcy5zZXRTdGF0ZSh7dmlzaWJsZVJpZ2h0TWVudTogdHJ1ZX0pfX0+PGltZyBjbGFzc05hbWU9XCJyaWdodC1tZW51XCIgc3JjPVwiL2ltZy9tZW51LnN2Z1wiLz48L3NwYW4+ICovfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmYiBmMTFcIj5DVVJSRU5UIEJBTEFOQ0U8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImYxOFwiPuKCuSA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0YW5kaW5nQW10XCI+eyh0eXBlb2Yoc3RhbmRpbmcpICE9PSAndW5kZWZpbmVkJyA/IHN0YW5kaW5nIDogJzAnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxzcGFuIGNsYXNzTmFtZT1cImYxMVwiPnt0aGlzLmdldEN1cnJlbnREYXRlKCl9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBlbnNlRGF5c0J0blwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnZGF5VHlwZUJ0biAnICsgKGFjdGl2ZVRhYiA9PT0gV0VFSyA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHt0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoV0VFSyl9fT5XZWVrPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnZGF5VHlwZUJ0biAnICsgKGFjdGl2ZVRhYiA9PT0gTU9OVEggPyAnZGF5VHlwZUJ0bi1hY3RpdmUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB7dGhpcy5jaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KE1PTlRIKX19Pk1vbnRoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnZGF5VHlwZUJ0biAnICsgKGFjdGl2ZVRhYiA9PT0gWUVBUiA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHt0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoWUVBUil9fT5ZZWFyPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BlbnRJbmNvbWVTZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluLWJsIFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsIGluLWJsIHNwZW50SWNvblwiID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnICB3aWR0aD1cIjIxXCIgaGVpZ2h0PVwiMTdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0yNCAxMmMwLTYuNjI3LTUuMzczLTEyLTEyLTEycy0xMiA1LjM3My0xMiAxMiA1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMnptLTE3IDFoNHYtOGgydjhoNGwtNSA2LTUtNnpcIi8+PC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkhlYWRpbmcgaW4tYmxcIj57J1NwZW50IDog4oK5JyArICh0eXBlb2Yoc3BlbnQpICE9PSAndW5kZWZpbmVkJz8gc3BlbnQ6ICcwJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbi1ibCAgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmwgaW4tYmwgaW5jb21lSWNvbiBcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJmbCBpbi1ibFwiIHdpZHRoPVwiMjFcIiBoZWlnaHQ9XCIxN1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTAgMTJjMCA2LjYyNyA1LjM3MyAxMiAxMiAxMnMxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMi0xMiA1LjM3My0xMiAxMnptMTctMWgtNHY4aC0ydi04aC00bDUtNiA1IDZ6XCIvPjwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJIZWFkaW5nIGluLWJsXCI+eydJbmNvbWUgOiDigrknICsgKGluY29tZUxpc3QgJiYgdHlwZW9mKGluY29tZUxpc3QuYW1vdW50KSAhPT0gJ3VuZGVmaW5lZCcgPyBpbmNvbWVMaXN0LmFtb3VudCA6ICcwJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRUcmFuc2FjdGlvbkNhcmQoKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtwbG90RGF0YSAmJiBwbG90RGF0YS5wZXJEaXZpc2lvbkRhdGEgJiYgIHBsb3REYXRhLnBlckRpdmlzaW9uRGF0YS5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdGhlci1oYWxmLWxhbmRpbmdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj1cIm90aGVySGFsZkxhbmRpbmdUeHRcIiBjbGFzc05hbWU9XCJ0cmFuc2l0aW9uMF81IFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIHRyU3VtYXJ5SGVhZGluZyBmYlwiID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+eydFeHBlbnNlIFRyZW5kcyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBXRUVLID8gIDxHcmFwaCBwbG90RGF0YT17cGxvdERhdGF9IHRhYj17YWN0aXZlVGFifS8+IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IE1PTlRIID8gIDxHcmFwaCBwbG90RGF0YT17cGxvdERhdGF9IHRhYj17YWN0aXZlVGFifS8+IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IFlFQVIgPyAgPEdyYXBoIHBsb3REYXRhPXtwbG90RGF0YX0gdGFiPXthY3RpdmVUYWJ9Lz4gOiBudWxsfVxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+IDogbnVsbH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtzaG93TmV3RXhwZW5zZSA/IFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgPE5ld0V4cGVuc2UgbmV3RXhwZW5zZT17dGhpcy5uZXdFeHBlbnNlfS8+XG4gICAgICAgICAgPC9kaXY+IDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IHtzaWdudXAsIHNpZ25pbn0gZnJvbSAnLi4vYXBpQ2FsbHMvQXBpQ2FsbHMnO1xuXG5jbGFzcyBMb2dpbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGVhZCA9IHRoaXMuaGVhZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2lnblVwID0gdGhpcy5zaWduVXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNpZ25JbiA9IHRoaXMuc2lnbkluLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHVzZXJuYW1lOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGhlYWQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxIZWxtZXQ+XG4gICAgICAgIDx0aXRsZT5FeHBlbnNlIExvZ2luPC90aXRsZT5cbiAgICAgIDwvSGVsbWV0PlxuICAgICk7XG4gIH1cblxuICBzaWduVXAoKSB7XG4gICAgc2lnbnVwKHt1c2VybmFtZTogdGhpcy5zdGF0ZS51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMuc3RhdGUucGFzc3dvcmR9KTtcbiAgfVxuXG4gIHNpZ25Jbih3aXRoVGVzdENyZWRzKSB7XG4gICAgbGV0IHt1c2VybmFtZSwgcGFzc3dvcmR9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAod2l0aFRlc3RDcmVkcykge1xuICAgICAgdXNlcm5hbWUgPSAnZGhpbGlwJztcbiAgICAgIHBhc3N3b3JkID0gJ2RoaWxpcGRoaWxpcCc7XG4gICAgfVxuICAgIHNpZ25pbih7dXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmR9KS50aGVuKChyZXNwKSA9PiB7XG4gICAgICBpZiAocmVzcC5kYXRhICYmICFyZXNwLmRhdGEuZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvaG9tZScsIHt9KTtcbiAgICAgICAgaWYgKHR5cGVvZih3aW5kb3cpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHdpbmRvdy5zaWduZWRJbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gU2lnbkluJywgcmVzcCk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBTaWduSW4nLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5oZWFkKCl9XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dpbkNvbnRhaW5lciB3aGl0ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZHNEaXZcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VybmFtZVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ3aGl0ZUJyZHJCdG1cIiBwbGFjZWhvbGRlcj0nVXNlcm5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLnVzZXJuYW1lfSBvbkNoYW5nZSA9IHsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7dXNlcm5hbWU6IGUudGFyZ2V0LnZhbHVlfSl9IHR5cGU9XCJ0ZXh0XCIvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXNzd29yZCBwYWRUMTBcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwid2hpdGVCcmRyQnRtXCIgcGxhY2Vob2xkZXI9J1Bhc3N3b3JkJyB2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZH0gb25DaGFuZ2UgPSB7KGUpID0+IHRoaXMuc2V0U3RhdGUoe3Bhc3N3b3JkOiBlLnRhcmdldC52YWx1ZX0pfSB0eXBlPVwicGFzc3dvcmRcIi8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXIgcGFkVDIwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3IGRpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmV3QnRuXCJvbkNsaWNrPXt0aGlzLnNpZ25Jbn0+U2lnbiBJbjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3IGRpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmV3QnRuXCIgb25DbGljaz17dGhpcy5zaWduVXB9PlNpZ24gVXA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXIgcGFkVDIwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmV3QnRuXCIgb25DbGljaz17KCkgPT4gdGhpcy5zaWduSW4odHJ1ZSl9PkNvbnRpbnVlIHdpdGggVGVzdCBMb2dpbjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBMb2dpbjsiLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7bmV3X2V4cGVuc2V9IGZyb20gJy4uL2FwaUNhbGxzL0FwaUNhbGxzJztcbmltcG9ydCB7TU9OVEhTTkFNRVNIT1JUfSBmcm9tICcuLi9jb25zdGFudHMvY29uc3RhbnRzJztcbi8vIGltcG9ydCB7Y29tbWFGb3JtYXR0ZWR9IGZyb20gJy4uL3V0aWxzL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3RXhwZW5zZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc2VsZWN0VHlwZSA9IHRoaXMuc2VsZWN0VHlwZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3VibWl0TmV3RXhwZW5zZSA9IHRoaXMuc3VibWl0TmV3RXhwZW5zZS5iaW5kKHRoaXMpO1xuICAgIFxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0eXBlOiAnZXhwZW5zZScsXG4gICAgICBhbW91bnQ6ICcnLFxuICAgICAgY2F0ZWdvcnk6ICcnLFxuICAgICAgZGF5OiAnJywgXG4gICAgICBtb250aDogJycsXG4gICAgICB5ZWFyOiAnJyxcbiAgICAgIGVycm9yOiB7fVxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFR5cGUodHlwZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3R5cGU6IHR5cGV9KTtcbiAgfVxuXG4gIGNoYW5nZUFtb3VudCh2YWwpe1xuICAgIHRoaXMuc2V0U3RhdGUoe2Ftb3VudDogdmFsfSlcbiAgfVxuXG4gIGNoYW5nZURhdGUodmFsLCBjdXJyZW50LCBuZXh0KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Li4udmFsfSk7XG4gICAgaWYgKGN1cnJlbnQgJiYgdmFsW2N1cnJlbnRdLmxlbmd0aCA9PT0gMiAmJiBuZXh0KSB7XG4gICAgICB0aGlzLnJlZnNbbmV4dF0uZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBpc1ZhbGlkRGF0ZSgpIHtcbiAgICBjb25zdCB7ZGF5LCBtb250aCwgeWVhcn0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGRhdGVSZWcgPSAvXlxcZHsxLDJ9JC87XG4gICAgY29uc3QgZGF0ZVJlZ1llYXIgPSAvXlxcZHs0fSQvO1xuICAgIGlmICghZGF0ZVJlZy50ZXN0KGRheSkgfHwgIWRhdGVSZWcudGVzdChtb250aCkgfHwgIWRhdGVSZWdZZWFyLnRlc3QoeWVhcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUocGFyc2VJbnQoeWVhciksIHBhcnNlSW50KG1vbnRoKSwgcGFyc2VJbnQoZGF5KSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgdmFsaWRhdGVQYXJhbXMoKSB7XG4gICAgdmFyIHJlZyA9IC9eXFxkKyQvO1xuICAgIGNvbnN0IHthbW91bnQsIGNhdGVnb3J5fSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKCFhbW91bnQgfHwgIXJlZy50ZXN0KGFtb3VudCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB7YW1vdW50OiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBBbW91bnQnfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWNhdGVnb3J5KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2NhdGVnb3J5OiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBDYXRlZ29yeSd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc1ZhbGlkRGF0ZSgpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2RhdGU6ICdQbGVhc2UgcHJvdmlkZSBhIFZhbGlkIERhdGUnfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzdWJtaXROZXdFeHBlbnNlKCkge1xuICAgIGNvbnN0IHthbW91bnQsIGRheSwgbW9udGgsIHllYXIsIHR5cGUsIGNhdGVnb3J5fSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgaXNWYWxpZGF0aW9uU3VjY2VzcyA9IHRoaXMudmFsaWRhdGVQYXJhbXMoKTtcbiAgICBpZiAoaXNWYWxpZGF0aW9uU3VjY2Vzcykge1xuICAgICAgY29uc3QgcGFyYW1zID0geyBhbW91bnQsIHR5cGUsIGRhdGU6IHRoaXMuZGF0ZSwgY2F0ZWdvcnl9O1xuICAgICAgbmV3X2V4cGVuc2UocGFyYW1zKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm5ld0V4cGVuc2UoZmFsc2UsIHRydWUpO1xuICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGNyZWF0ZSBuZXcgRXhwZW5zZScsZXJyKTtcbiAgICAgICAgdGhpcy5wcm9wcy5uZXdFeHBlbnNlKGZhbHNlLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJPcHRpb25zKHR5cGUpIHtcbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgaWYgKHR5cGUgPT09ICdkYXknKSB7XG4gICAgICBvcHRpb25zLnB1c2goPG9wdGlvbj5EYXk8L29wdGlvbj4pO1xuICAgICAgZm9yKGxldCBpID0gMTsgaSA8IDMyIDsgaSsrKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uIHZhbHVlPXtpfT57aX08L29wdGlvbj4pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ21vbnRoJykge1xuICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24+TW9udGg8L29wdGlvbj4pO1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEyIDsgaSsrKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uIHZhbHVlPXtpfT57TU9OVEhTTkFNRVNIT1JUW2ldfTwvb3B0aW9uPik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAneWVhcicpIHtcbiAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uPlllYXI8L29wdGlvbj4pO1xuICAgICAgZm9yKGxldCBpID0gMjAyMDsgaSA+IDIwMDAgOyBpLS0pIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24gdmFsdWU9e2l9PntpfTwvb3B0aW9uPik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHt0eXBlLCBhbW91bnQsIGRheSwgbW9udGgsIHllYXIsIGNhdGVnb3J5LCBlcnJvcn0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3RXhwZW5zZUNvbnRhaW5lciB6aTJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBJbmNCdG5zIHRleHRDZW50ZXIgbVQyNVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J25ld0J0biAnICsgKHR5cGUgPT09ICdleHBlbnNlJyA/ICdzZWxlY3RlZFR5cGUnIDogJycpfSAgb25DbGljaz17KCkgPT4gdGhpcy5zZWxlY3RUeXBlKCdleHBlbnNlJyl9PkV4cGVuc2U8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnbmV3QnRuICcgKyAodHlwZSA9PT0gJ2luY29tZScgPyAnc2VsZWN0ZWRUeXBlJyA6ICcnKX0gb25DbGljaz17KCkgPT4gdGhpcy5zZWxlY3RUeXBlKCdpbmNvbWUnKX0+SW5jb21lPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbW91bnRJbnB1dCBtVDI1IFwiPlxuICAgICAgICA8c3Bhbj7igrk8L3NwYW4+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJBbW91bnRcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlQW1vdW50KGUudGFyZ2V0LnZhbHVlKX0gdmFsdWU9e2Ftb3VudH0vPlxuICAgICAgICAgIHtlcnJvci5hbW91bnQgPyA8ZGl2IGNsYXNzTmFtZT1cImVycm9yRGl2XCI+e2Vycm9yLmFtb3VudH08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAgY2xhc3NOYW1lPVwiY2F0ZWdvcnlJbnB1dCBtVDI1IFwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQ2F0ZWdvcnlcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuc2V0U3RhdGUoe2NhdGVnb3J5OiBlLnRhcmdldC52YWx1ZX0pfSB2YWx1ZT17Y2F0ZWdvcnl9Lz5cbiAgICAgICAgICB7ZXJyb3IuY2F0ZWdvcnkgPyA8ZGl2IGNsYXNzTmFtZT1cImVycm9yRGl2XCI+e2Vycm9yLmNhdGVnb3J5fTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwZW50RGF5IG1UMjUgXCI+XG4gICAgICAgICAgey8qIDxpbnB1dCByZWY9XCJkYXlcIiBjbGFzc05hbWU9XCJkYXlJcFwiIHR5cGU9XCJudW1iZXJcIiBtYXhMZW5ndGg9XCIyXCIgcGxhY2Vob2xkZXI9XCJERFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHtkYXk6IGUudGFyZ2V0LnZhbHVlfSwgJ2RheScsICdtb250aCcpfSB2YWx1ZT17ZGF5fS8+XG4gICAgICAgICAgPGlucHV0IHJlZj1cIm1vbnRoXCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiTU1cIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7bW9udGg6IGUudGFyZ2V0LnZhbHVlfSwgJ21vbnRoJywgJ3llYXInKX0gdmFsdWU9e21vbnRofS8+XG4gICAgICAgICAgPGlucHV0IHJlZj1cInllYXJcIiBjbGFzc05hbWU9XCJkYXlJcFwiIHR5cGU9XCJudW1iZXJcIiBtYXhMZW5ndGg9XCIyXCIgcGxhY2Vob2xkZXI9XCJZWVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHt5ZWFyOiBlLnRhcmdldC52YWx1ZX0sICd5ZWFyJyl9IHZhbHVlPXt5ZWFyfS8+ICovfVxuICAgICAgICAgIDxzZWxlY3QgcmVmPVwiZGF5XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe2RheTogZS50YXJnZXQudmFsdWV9LCAnZGF5JywgJ21vbnRoJyl9Pnt0aGlzLnJlbmRlck9wdGlvbnMoJ2RheScpfTwvc2VsZWN0PlxuICAgICAgICAgIDxzZWxlY3QgcmVmPVwibW9udGhcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7bW9udGg6IGUudGFyZ2V0LnZhbHVlfSwgJ21vbnRoJywgJ3llYXInKX0+e3RoaXMucmVuZGVyT3B0aW9ucygnbW9udGgnKX08L3NlbGVjdD5cbiAgICAgICAgICA8c2VsZWN0IHJlZj1cInllYXJcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7eWVhcjogZS50YXJnZXQudmFsdWV9LCAneWVhcicpfT57dGhpcy5yZW5kZXJPcHRpb25zKCd5ZWFyJyl9PC9zZWxlY3Q+XG4gICAgICAgICAge2Vycm9yLmRhdGUgPyA8ZGl2IGNsYXNzTmFtZT1cImVycm9yRGl2XCI+e2Vycm9yLmRhdGV9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VibWl0QnRuXCIgb25DbGljaz17dGhpcy5zdWJtaXROZXdFeHBlbnNlfT5Eb25lPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IHtOYXZMaW5rfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY2xhc3MgTm90Rm91bmQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhlYWQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxIZWxtZXQ+XG4gICAgICAgIDx0aXRsZT5QYWdlIE5vdCBGb3VuZDwvdGl0bGU+XG4gICAgICA8L0hlbG1ldD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5oZWFkKCl9XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgxPlNvcnJ5LCB0aGUgcGFnZSB5b3UgYXJlIGV4cGVjdGluZyBkb2VzIG5vdCBleGlzdCE8L2gxPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGkgb25DbGljaz0geygpID0+IHRoaXMucHJvcHMuaGlzdG9yeS5nb0JhY2soKX0+IFxuICAgICAgICAgICAgICBCYWNrXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICA8TmF2TGluayB0bz0nLyc+IEhvbWUgPC9OYXZMaW5rPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPE5hdkxpbmsgdG89Jy9sb2dpbic+IExvZ2luIDwvTmF2TGluaz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBOb3RGb3VuZDsiLCJleHBvcnQgY29uc3QgTU9OVEggPSAnbW9udGgnO1xuZXhwb3J0IGNvbnN0IFlFQVIgPSAneWVhcic7XG5leHBvcnQgY29uc3QgV0VFSyA9ICd3ZWVrJztcbmV4cG9ydCBjb25zdCBESVZJU0lPTkxFTkdUSCA9IHsgbW9udGg6IDMxLCB5ZWFyOiAxMiwgd2VlazogN307IFxuZXhwb3J0IGNvbnN0IE1PTlRIU05BTUUgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXTtcbmV4cG9ydCBjb25zdCAgTU9OVEhTTkFNRVNIT1JUID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7QnJvd3NlclJvdXRlciwgU3dpdGNoLCBSb3V0ZX0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IExvZ2luIGZyb20gJy4uL2NvbXBvbmVudHMvTG9naW4nO1xuaW1wb3J0IE5vdEZvdW5kIGZyb20gJy4uL2NvbXBvbmVudHMvTm90Rm91bmQnXG5pbXBvcnQgSG9tZSBmcm9tICcuLi9jb21wb25lbnRzL0hvbWUnO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvbG9naW4nIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8TG9naW4gey4uLnByb3BzfS8+fS8+XG4gICAgICAgICAgICB7LyogPFJvdXRlIHBhdGg9Jy9sb2dpbicgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxMb2dpbiB7Li4ucHJvcHN9Lz59Lz4gKi99XG4gICAgICAgICAgICA8Um91dGUgcGF0aD0nL2hvbWUnIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8SG9tZSB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIHsvKiA8Um91dGUgcGF0aD0nLycgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxIb21lIHsuLi5wcm9wc30vPn0vPiAqL31cbiAgICAgICAgICAgIHsvKiA8Um91dGUgcGF0aD0nKicgcmVuZGVyPXsocHJvcHMpID0+IDxOb3RGb3VuZCB7Li4ucHJvcHN9Lz59Lz4gKi99XG4gICAgICAgIDwvU3dpdGNoPlxuICAgICk7XG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29ubmVjdC1tb25nb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1oZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==