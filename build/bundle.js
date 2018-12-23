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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2FwaS9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvZGIvbW9uZ29vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9leHBlbnNlTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hcGlDYWxscy9BcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Ib21lLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL0xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05ld0V4cGVuc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvTm90Rm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbnN0YW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3JvdXRlcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29ubmVjdC1tb25nb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLXNlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiJdLCJuYW1lcyI6WyJzaWduVXAiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJib2R5IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImVtYWlsSWQiLCJ1c2VyIiwiVXNlcnMiLCJfaWQiLCJtb25nb29zZSIsIlR5cGVzIiwiT2JqZWN0SWQiLCJmaW5kIiwidGhlbiIsInJlcyIsImxlbmd0aCIsInNlbmQiLCJlcnJvciIsIm1zZyIsInNhdmUiLCJkb2MiLCJzZXNzaW9uIiwiX3VzZXJJZCIsImUiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwic2lnbkluIiwibmV3RXhwZW5zZSIsImFtb3VudCIsImNhdGVnb3J5IiwiZGF0ZSIsInR5cGUiLCJwYXJzZUludCIsIkRhdGUiLCJ3dyIsIk1hdGgiLCJjZWlsIiwiZ2V0RGF0ZSIsImRvdyIsImdldERheSIsIm1tIiwiZ2V0TW9udGgiLCJ5eSIsImdldEZ1bGxZZWFyIiwiZGQiLCJuZXdFeHBlbnNlSW5zdGFuY2UiLCJFeHBlbnNlcyIsInVzZXJfaWQiLCJlcnIiLCJnZXRFeHBlbnNlRGF0YSIsInVzZXJJZCIsImV4cGVuc2VEYXRlUmVzcG9uZGVyIiwiZGF0YSIsInJlc3BvbmQiLCJleHBlbnNlTGlzdCIsImluY29tZUxpc3QiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwic3BlbnQiLCJzdGFuZGluZyIsInRyYW5zYWN0aW9uTGlzdCIsInRyYW5zYWN0aW9uIiwicGVyY2VudCIsInJvdW5kIiwiZ3JvdXAxIiwiJGdyb3VwIiwiJHN1bSIsImdyb3VwMiIsIiRwdXNoIiwidW53aW5kIiwiJHVud2luZCIsInNvcnQiLCIkc29ydCIsInJlR3JvdXAiLCJ0YWIiLCJZRUFSIiwiYWdncmVnYXRlIiwiJG1hdGNoIiwiJHByb2plY3QiLCJhbGxvd0Rpc2tVc2UiLCJleGVjIiwiTU9OVEgiLCJXRUVLIiwiZ2V0RXhwZW5zZVN1bW1hcnkiLCJleGVjU3VtbWFyeVF1ZXJ5IiwicGVyRGl2aXNpb25EYXRhIiwibWF4QW1vdW50IiwiTnVtYmVyIiwiTUlOX1NBRkVfSU5URUdFUiIsImZvckVhY2giLCJlbnRyeSIsIm1vbnRoIiwidG90YWxBbW91bnQiLCJkaXZpc2lvbiIsImVudiIsInByb2Nlc3MiLCJQT1JUIiwiTU9OR09MQUJfVVJJIiwibW9uZ29vc2UxIiwicmVxdWlyZSIsIlByb21pc2UiLCJnbG9iYWwiLCJjb25uZWN0IiwidXNlTW9uZ29DbGllbnQiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9kZWwiLCJTY2hlbWEiLCJyZWYiLCJyZXF1aXJlZCIsInRyaW0iLCJTdHJpbmciLCJkZWZhdWx0Iiwibm93IiwibWlubGVuZ3RoIiwiZXhwZW5zZSIsIk1vbmdvU3RvcmUiLCJhcHAiLCJwb3J0IiwidXNlIiwic2VjcmV0Iiwic3RvcmUiLCJ1cmwiLCJib2R5UGFyc2VyIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwianNvbiIsImV4cHJlc3MiLCJzdGF0aWMiLCJwb3N0IiwibG9hZEh0bWwiLCJjb250ZW50IiwiaGVsbWV0IiwiSGVsbWV0IiwicmVuZGVyU3RhdGljIiwibWV0YSIsInRvU3RyaW5nIiwidGl0bGUiLCJnZXQiLCJyZXEiLCJjb250ZXh0IiwiUmVhY3RET01TZXJ2ZXIiLCJyZW5kZXJUb1N0cmluZyIsInRlbXBsYXRlIiwibGlzdGVuIiwiQXBwIiwiQ29tcG9uZW50Iiwic2lnbnVwIiwicGFyYW1zIiwiYXhpb3MiLCJzaWduaW4iLCJuZXdfZXhwZW5zZSIsImdldF9leHBlbnNlX2RhdGEiLCJnZXRfZXhwZW5zZV9zdW1tYXJ5IiwiV0lEVEgiLCJIRUlHSFQiLCJHcmFwaCIsInByb3BzIiwiZ2VuZXJhdGVTVkciLCJiaW5kIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImFsZXJ0IiwicGxvdERhdGEiLCJ4Q29vcmRpbmF0ZXMiLCJ5Q29vcmRpbmF0ZXMiLCJESVZJU0lPTkxFTkdUSCIsIm1heEFtdCIsInhDb29yZGluYXRlRGl2TGVuZ3RoIiwibGFzdERpdmlzaW9uIiwic3RyIiwicHVzaCIsImxhc3RYIiwiaSIsIm1hcmdpbiIsIkhvbWUiLCJsZWZ0TWVudUNsaWNrIiwibmF2aWdhdGVUb1NpZ25JbiIsInN0YXRlIiwiYWN0aXZlVGFiIiwic2hvd05ld0V4cGVuc2UiLCJ1bmRlZmluZWQiLCJ2aWV3TW9yZSIsInZpZXdlZE1vcmUiLCJnZXRFeHBlbnNlIiwicmVzcCIsInNldFN0YXRlIiwicmVmcyIsImJhY2tEcm9wIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicG9wdXAiLCJmaXJzdEhhbGZMYW5kaW5nVHh0Iiwib3RoZXJIYWxmTGFuZGluZ1R4dCIsImhpc3RvcnkiLCJ2YWwiLCJzYXZlU3VjY2VzcyIsInRyYW5zYWN0ZWRDYXJkIiwic2Nyb2xsVG9wIiwiaW5kZXgiLCJtYXhXaWR0aCIsImhhc0RhdGEiLCJyZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZCIsInNpZ25lZEluIiwiY2xpY2tWaWV3TW9yZSIsImN1cnJNb250aCIsIk1PTlRIU05BTUUiLCJjdXJyRGF0ZSIsInJlbmRlckxlZnRNZW51QmFyIiwiZ2V0Q3VycmVudERhdGUiLCJjaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0IiwiZ2V0VHJhbnNhY3Rpb25DYXJkIiwiTG9naW4iLCJoZWFkIiwid2l0aFRlc3RDcmVkcyIsImNhdGNoIiwidGFyZ2V0IiwidmFsdWUiLCJOZXdFeHBlbnNlIiwic2VsZWN0VHlwZSIsInN1Ym1pdE5ld0V4cGVuc2UiLCJkYXkiLCJ5ZWFyIiwiY3VycmVudCIsIm5leHQiLCJmb2N1cyIsImRhdGVSZWciLCJkYXRlUmVnWWVhciIsInRlc3QiLCJyZWciLCJpc1ZhbGlkRGF0ZSIsImlzVmFsaWRhdGlvblN1Y2Nlc3MiLCJ2YWxpZGF0ZVBhcmFtcyIsIm9wdGlvbnMiLCJNT05USFNOQU1FU0hPUlQiLCJjaGFuZ2VBbW91bnQiLCJjaGFuZ2VEYXRlIiwicmVuZGVyT3B0aW9ucyIsIk5vdEZvdW5kIiwiZ29CYWNrIiwid2VlayJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRU8sSUFBTUEsMEJBQVMsU0FBVEEsTUFBUyxDQUFDQyxPQUFELEVBQVVDLFFBQVYsRUFBdUI7QUFDekM7QUFEeUMsd0JBRWNELFFBQVFFLElBRnRCO0FBQUEsOENBRWpDQyxRQUZpQztBQUFBLFFBRWpDQSxRQUZpQyx5Q0FFdEIsRUFGc0I7QUFBQSw4Q0FFbEJDLFFBRmtCO0FB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Ozs7OztrQkFFZSxZQUFNO0FBQ2pCLFdBQ0k7QUFBQyw4QkFBRDtBQUFBO0FBQ0ksc0NBQUMscUJBQUQsSUFBTyxNQUFLLFFBQVosRUFBcUIsV0FBckIsRUFBMkIsUUFBUSxnQkFBQzdFLEtBQUQ7QUFBQSx1QkFBVyw4QkFBQyxlQUFELEVBQVdBLEtBQVgsQ0FBWDtBQUFBLGFBQW5DLEdBREo7QUFHSSxzQ0FBQyxxQkFBRCxJQUFPLE1BQUssT0FBWixFQUFvQixXQUFwQixFQUEwQixRQUFRLGdCQUFDQSxLQUFEO0FBQUEsdUJBQVcsOEJBQUMsY0FBRCxFQUFVQSxLQUFWLENBQVg7QUFBQSxhQUFsQztBQUhKLEtBREo7QUFTSCxDOzs7Ozs7Ozs7OztBQ2xCRCxrQzs7Ozs7Ozs7Ozs7QUNBQSwyQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSw2QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zZXJ2ZXIvc2VydmVyLmpzXCIpO1xuIiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBhcHAgZnJvbSAnLi4vc2VydmVyJ1xuaW1wb3J0IEV4cGVuc2VzIGZyb20gJy4uL21vZGVscy9leHBlbnNlTW9kZWwnO1xuaW1wb3J0IFVzZXJzIGZyb20gJy4uL21vZGVscy91c2VyTW9kZWwnO1xuaW1wb3J0IHsgTU9OVEgsIFlFQVIsIFdFRUsgfSBmcm9tICcuLi8uLi9zcmMvcGFnZXMvY29uc3RhbnRzL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCBzaWduVXAgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAvLyBVc2Vycy5kZWxldGVNYW55KHt9KTtcbiAgICBjb25zdCB7IHVzZXJuYW1lID0gJycsIHBhc3N3b3JkID0gJycsIGVtYWlsSWQgPSAnJyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIHZhciB1c2VyID0gbmV3IFVzZXJzKHtcbiAgICAgICAgX2lkOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZCgpLFxuICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgZW1haWxJZDogZW1haWxJZFxuICAgIH0pO1xuICAgIFVzZXJzLmZpbmQoeyB1c2VybmFtZTogdXNlcm5hbWUgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiB0cnVlLCBtc2c6ICdVc2VybmFtZSBhbHJlYWR5IEV4aXN0cycgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNlc3Npb24uX3VzZXJJZCA9IGRvYy5faWQ7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiBmYWxzZSwgbXNnOiAnU2F2ZWQgU3VjY2Vzc2Z1bGx5JyB9KTtcbiAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzKDUwMCkuc2VuZChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwgKGUpID0+IHtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZChlKTtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2lnbkluID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3QgeyB1c2VybmFtZSA9ICcnLCBwYXNzd29yZCA9ICcnLCBlbWFpbElkID0gJycgfSA9IHJlcXVlc3QuYm9keTtcbiAgICBjb25zb2xlLmxvZyhyZXF1ZXN0LnNlc3Npb24udXNlcik7XG4gICAgVXNlcnMuZmluZCh7IHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID0gcmVzWzBdLl9pZDtcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoeyBlcnJvcjogZmFsc2UsIG1zZzogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiB0cnVlLCBtc2c6ICdObyB1c2VyIGFjY291bnQgZm91bmQnIH0pO1xuICAgICAgICB9XG4gICAgfSwgKGUpID0+IHtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZChlKTtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgbmV3RXhwZW5zZSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIGxldCB7IGFtb3VudCwgY2F0ZWdvcnksIGRhdGUsIHR5cGUgfSA9IHJlcXVlc3QuYm9keTtcbiAgICBhbW91bnQgPSBwYXJzZUludChhbW91bnQpO1xuICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICBjb25zdCB3dyA9IE1hdGguY2VpbChkYXRlLmdldERhdGUoKSAvIDcpO1xuICAgIGNvbnN0IGRvdyA9IGRhdGUuZ2V0RGF5KCkgKyAxO1xuICAgIGNvbnN0IG1tID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICBjb25zdCB5eSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBkZCA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IG5ld0V4cGVuc2UgPSB7IGFtb3VudCwgY2F0ZWdvcnksIGRhdGUsIHR5cGUsIHd3LCBkb3csIG1tLCB5eSwgZGR9O1xuICAgIHZhciBuZXdFeHBlbnNlSW5zdGFuY2UgPSBuZXcgRXhwZW5zZXMoe1xuICAgICAgICB1c2VyX2lkOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZChcIjVjMTYzMGFkNzY2OWVhMmM5YmIwNDYxNlwiKSxcbiAgICAgICAgLi4ubmV3RXhwZW5zZVxuICAgIH0pO1xuICAgIG5ld0V4cGVuc2VJbnN0YW5jZS5zYXZlKCkudGhlbigoZG9jKSA9PiB7XG4gICAgICAgIC8vIHJlcXVlc3Quc2Vzc2lvbi51c2VyID0gZG9jLnVzZXJuYW1lO1xuICAgICAgICByZXNwb25zZS5zZW5kKGRvYyk7XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIHNhdmUgbmV3IEV4cGVuc2UnLCBlcnIpO1xuICAgICAgICByZXNwb25zZS5zdGF0dXMoNTAwKS5zZW5kKGVycik7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZURhdGEgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSByZXF1ZXN0LnNlc3Npb24udXNlcl9pZCA/IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKHJlcXVlc3Quc2Vzc2lvbi51c2VyX2lkKSA6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKFwiNWMxNjMwYWQ3NjY5ZWEyYzliYjA0NjE2XCIpO1xuICAgIGZ1bmN0aW9uIGV4cGVuc2VEYXRlUmVzcG9uZGVyKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZXNwb25kLnNlbmQoNTAwKS5zZW5kKGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZXhwZW5zZUxpc3QsIGluY29tZUxpc3Q7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhW2tleV0udHlwZSA9PT0gJ2V4cGVuc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVuc2VMaXN0ID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YVtrZXldLnR5cGUgPT09ICdpbmNvbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGluY29tZUxpc3QgPSBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgc3BlbnQsIHN0YW5kaW5nO1xuICAgICAgICAgICAgaWYgKGV4cGVuc2VMaXN0KSB7XG4gICAgICAgICAgICAgICAgZXhwZW5zZUxpc3QudHJhbnNhY3Rpb25MaXN0Lm1hcCgodHJhbnNhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSB0cmFuc2FjdGlvbi5hbW91bnQgLyAoZXhwZW5zZUxpc3QuYW1vdW50IC8gMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ucGVyY2VudCA9IE1hdGgucm91bmQocGVyY2VudCAqIDEwMCkgLyAxMDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3BlbnQgPSBleHBlbnNlTGlzdC5hbW91bnQ7XG4gICAgICAgICAgICB9IGVsc2UgIHtcbiAgICAgICAgICAgICAgICBzcGVudCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5jb21lTGlzdCkge1xuICAgICAgICAgICAgICAgIGluY29tZUxpc3QudHJhbnNhY3Rpb25MaXN0Lm1hcCgodHJhbnNhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSB0cmFuc2FjdGlvbi5hbW91bnQgLyAoaW5jb21lTGlzdC5hbW91bnQgLyAxMDApO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5wZXJjZW50ID0gTWF0aC5yb3VuZChwZXJjZW50ICogMTAwKSAvIDEwMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzdGFuZGluZyA9IGluY29tZUxpc3QuYW1vdW50IC0gc3BlbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YW5kaW5nID0gMCAtIHNwZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGV4cGVuc2VMaXN0LCBpbmNvbWVMaXN0LCBzcGVudCwgc3RhbmRpbmcgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBRdWVyaWVzIHN0YXJ0XG4gICAgY29uc3QgZ3JvdXAxID0ge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDogeyBjYXRlZ29yeTogJyRjYXRlZ29yeScsIHR5cGU6ICckdHlwZScgfSxcbiAgICAgICAgICAgIHR5cGU6IHsgJyRmaXJzdCc6ICckdHlwZScgfSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiB7ICckZmlyc3QnOiAnJGNhdGVnb3J5JyB9LFxuICAgICAgICAgICAgYW1vdW50OiB7ICRzdW06ICckYW1vdW50JyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdyb3VwMiA9IHtcbiAgICAgICAgJGdyb3VwOiB7XG4gICAgICAgICAgICBfaWQ6IHsgdHlwZTogJyR0eXBlJyB9LFxuICAgICAgICAgICAgYW1vdW50OiB7ICRzdW06ICckYW1vdW50JyB9LFxuICAgICAgICAgICAgdHlwZTogeyAnJGZpcnN0JzogJyR0eXBlJyB9LFxuICAgICAgICAgICAgdHJhbnNhY3Rpb25MaXN0OiB7ICRwdXNoOiB7IGNhdGVnb3J5OiAnJGNhdGVnb3J5JywgYW1vdW50OiAnJGFtb3VudCcgfSB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHVud2luZCA9IHsgJHVud2luZDogJyR0cmFuc2FjdGlvbkxpc3QnIH07XG4gICAgY29uc3Qgc29ydCA9IHsgJHNvcnQ6IHsgJ3RyYW5zYWN0aW9uTGlzdC5hbW91bnQnOiAtMSB9IH1cbiAgICBjb25zdCByZUdyb3VwID0ge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDogeyB0eXBlOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJyRmaXJzdCc6ICckYW1vdW50JyB9LFxuICAgICAgICAgICAgdHlwZTogeyAnJGZpcnN0JzogJyR0eXBlJyB9LFxuICAgICAgICAgICAgdHJhbnNhY3Rpb25MaXN0OiB7ICRwdXNoOiAnJHRyYW5zYWN0aW9uTGlzdCcgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBRdWVyaWVzIGVuZFxuXG4gICAgY29uc3QgeyB0YWIsIHd3LCBtbSwgeXksIGRvdyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGlmICh0YWIgPT09IFlFQVIpIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZH0gfSxcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHl5OiBwYXJzZUludCh5eSkgfSB9LFxuICAgICAgICAgICAgeyAuLi5ncm91cDEgfSx7IC4uLmdyb3VwMiB9LFxuICAgICAgICAgICAgeyAuLi51bndpbmQgfSx7IC4uLnNvcnQgfSx7IC4uLnJlR3JvdXAgfSxcbiAgICAgICAgICAgIHsgJHByb2plY3Q6IHsgX2lkOiAwLCBhbW91bnQ6IDEsIHR5cGU6IDEsIHRyYW5zYWN0aW9uTGlzdDogMSB9IH1cbiAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhwZW5zZURhdGVSZXNwb25kZXIpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBNT05USCkge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkIH0gfSxcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHl5OiBwYXJzZUludCh5eSkgfSB9LHsgJG1hdGNoOiB7IG1tOiBwYXJzZUludChtbSkgfSB9LFxuICAgICAgICAgICAgeyAuLi5ncm91cDEgfSx7IC4uLmdyb3VwMiB9LFxuICAgICAgICAgICAgeyAuLi51bndpbmQgfSx7IC4uLnNvcnQgfSx7IC4uLnJlR3JvdXAgfSxcbiAgICAgICAgICAgIHsgJHByb2plY3Q6IHsgX2lkOiAwLCBhbW91bnQ6IDEsIHR5cGU6IDEsIHRyYW5zYWN0aW9uTGlzdDogMSB9IH1cbiAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhwZW5zZURhdGVSZXNwb25kZXIpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBXRUVLKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0seyAkbWF0Y2g6IHsgbW06IHBhcnNlSW50KG1tKSB9IH0seyAkbWF0Y2g6IHsgd3c6IHBhcnNlSW50KHd3KSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTdW1tYXJ5ID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgZnVuY3Rpb24gZXhlY1N1bW1hcnlRdWVyeShlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVzcG9uZC5zZW5kKDUwMCkuc2VuZChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YVswXSAmJiBkYXRhWzBdLnBlckRpdmlzaW9uRGF0YSkge1xuICAgICAgICAgICAgICAgIGxldCBtYXhBbW91bnQgPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUjtcbiAgICAgICAgICAgICAgICBkYXRhWzBdLnBlckRpdmlzaW9uRGF0YS5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heEFtb3VudCA8IGVudHJ5LmFtb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4QW1vdW50ID0gZW50cnkuYW1vdW50XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkYXRhWzBdLm1heEFtb3VudCA9IG1heEFtb3VudDtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHsuLi5kYXRhWzBdfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoe30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCB1c2VySWQgPSByZXF1ZXN0LnNlc3Npb24udXNlcl9pZCA/IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKHJlcXVlc3Quc2Vzc2lvbi51c2VyX2lkKSA6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKFwiNWMxNjMwYWQ3NjY5ZWEyYzliYjA0NjE2XCIpO1xuICAgIGNvbnN0IHt0YWIsIHl5LCBtbSwgd3d9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGlmICh0YWIgPT09IFlFQVIpIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkIH19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB5eTogeXl9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdHlwZTogJ2V4cGVuc2UnfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7IF9pZDogeyBtbTogJyRtbSd9LCBhbW91bnQ6IHskc3VtOiAnJGFtb3VudCd9LCBtb250aDogeyckZmlyc3QnOiAnJG1tJ319fSxcbiAgICAgICAgICAgIHskc29ydDogeyBtb250aDogMSB9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHtfaWQ6IG51bGwsIHRvdGFsQW1vdW50OiB7JyRzdW0nOiAnJGFtb3VudCd9LCBwZXJEaXZpc2lvbkRhdGE6IHskcHVzaCA6IHsgYW1vdW50OiAnJGFtb3VudCcsIGRpdmlzaW9uOiAnJG1vbnRoJ319fX0sXG4gICAgICAgICAgICB7JHByb2plY3Q6IHtfaWQ6IDB9fVxuICAgICAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhlY1N1bW1hcnlRdWVyeSk7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IE1PTlRIKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgeXk6IHl5fX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IG1tOiBtbX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB0eXBlOiAnZXhwZW5zZSd9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiB7ZGQ6ICckZGQnfSwgYW1vdW50OiB7JyRzdW0nOiAnJGFtb3VudCd9LCBkZDogeyckZmlyc3QnOiAnJGRkJ30gfX0sXG4gICAgICAgICAgICB7JHNvcnQ6IHtkZDogMX19LFxuICAgICAgICAgICAgeyRncm91cDoge19pZDogbnVsbCwgdG90YWxBbW91bnQ6IHsnJHN1bSc6ICckYW1vdW50J30sIHBlckRpdmlzaW9uRGF0YTogeyRwdXNoOiB7YW1vdW50OiAnJGFtb3VudCcsIGRpdmlzaW9uOiAnJGRkJ319fX0sXG4gICAgICAgICAgICB7JHByb2plY3Q6IHtfaWQ6MH19XG4gICAgICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleGVjU3VtbWFyeVF1ZXJ5KTtcbiAgICB9IGVsc2UgaWYgKHRhYiA9PT0gV0VFSykge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHl5OiB5eX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyBtbTogbW19fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgd3c6IHd3fX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHR5cGU6ICdleHBlbnNlJ319LFxuICAgICAgICAgICAgeyRncm91cDogeyBfaWQ6IHtkb3c6ICckZG93J30sIGFtb3VudDogeyRzdW06ICckYW1vdW50J30sIGRvdzogeyckZmlyc3QnOiAnJGRvdyd9fX0sXG4gICAgICAgICAgICB7JHNvcnQ6IHsgZG93OiAxfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7IF9pZDogbnVsbCwgdG90YWxBbW91bnQ6IHskc3VtOiAnJGFtb3VudCd9LCAgcGVyRGl2aXNpb25EYXRhOiB7JHB1c2g6IHthbW91bnQ6ICckYW1vdW50JywgZGl2aXNpb246ICckZG93J319fX0sXG4gICAgICAgICAgICB7JHByb2plY3Q6IHtfaWQ6IDB9fVxuICAgICAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhlY1N1bW1hcnlRdWVyeSk7XG4gICAgfVxufSIsInZhciBlbnYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnO1xuXG5pZiAoZW52ID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gIHByb2Nlc3MuZW52LlBPUlQgPSA0MDAwO1xuICAvLyBwcm9jZXNzLmVudi5NT05HT0xBQl9VUkkgPSAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9leHBlbnNlJztcbiAgcHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJID0gJ21vbmdvZGI6Ly9kaGlsaXBrMTM6ZGhpbGlwazEzQGRzMjQ3MzEwLm1sYWIuY29tOjQ3MzEwL2V4cGVuc2UnO1xufSBlbHNlIHtcbiAgcHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJID0gJ21vbmdvZGI6Ly9kaGlsaXBrMTM6ZGhpbGlwazEzQGRzMjQ3MzEwLm1sYWIuY29tOjQ3MzEwL2V4cGVuc2UnO1xufVxuLy8gZXhwb3J0IGRlZmF1bHQgZW52O1xuIiwidmFyIG1vbmdvb3NlMSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XG5tb25nb29zZTEuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xubW9uZ29vc2UxLmNvbm5lY3QocHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJLCB7IHVzZU1vbmdvQ2xpZW50OiB0cnVlIH0pLnRoZW4oKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gRGInKTtcbn0sKGUpPT4ge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHttb25nb29zZTF9O1xuIiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBVc2VycyBmcm9tICcuL3VzZXJNb2RlbCc7XG5cbmNvbnN0IEV4cGVuc2VzID0gbW9uZ29vc2UubW9kZWwoJ0V4cGVuc2VzJywge1xuICB1c2VyX2lkOiB7XG4gICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuICAgIHJlZjogJ1VzZXJzJ1xuICB9LFxuICBhbW91bnQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZVxuICB9LFxuICBjYXRlZ29yeToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0cmltOiB0cnVlLFxuICAgICAgZGVmYXVsdDogJ290aGVycydcbiAgfSxcbiAgdHlwZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZSxcbiAgICBkZWZhdWx0OiAnZXhwZW5zZSdcbiAgfSxcbiAgZGF0ZToge1xuICAgIHR5cGU6IERhdGUsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWUsXG4gICAgZGVmYXVsdDogRGF0ZS5ub3coKVxuICB9LFxuICBkZDoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICB3dzoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICBkb3c6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgbW06IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgeXk6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfVxufSk7XG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlczsiLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IEV4cGVuc2VzIGZyb20gJy4vZXhwZW5zZU1vZGVsJztcblxuY29uc3QgVXNlcnMgPSBtb25nb29zZS5tb2RlbCgnVXNlcnMnLCB7XG4gICAgX2lkOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG4gICAgdXNlcm5hbWU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWlubGVuZ3RoOiA1LFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBlbWFpbElkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW5sZW5ndGg6IDgsXG4gICAgICAgIHRyaW06IHRydWVcbiAgICB9LFxuICAgIGV4cGVuc2U6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLCBcbiAgICAgICAgICAgIHJlZjogJ0V4cGVuc2VzJ1xuICAgICAgICB9XG4gICAgXVxufSk7XG5leHBvcnQgZGVmYXVsdCBVc2VyczsiLCJyZXF1aXJlKCcuL2NvbmZpZy9jb25maWcnKTtcbmltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0IGVudiBmcm9tICcuL2NvbmZpZy9jb25maWcnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NU2VydmVyIGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbnZhciBzZXNzaW9uID0gcmVxdWlyZSgnZXhwcmVzcy1zZXNzaW9uJyk7XG5cbmltcG9ydCBBcHAgZnJvbSAnLi4vc3JjL2FwcCdcbmltcG9ydCBtb25nb29zZTEgZnJvbSAnLi9kYi9tb25nb29zZSc7XG5pbXBvcnQge3NpZ25VcCwgc2lnbkluLCBuZXdFeHBlbnNlLCBnZXRFeHBlbnNlRGF0YSwgZ2V0RXhwZW5zZVN1bW1hcnl9IGZyb20gJy4vYXBpL2FwaUNhbGxzJztcbmNvbnN0IE1vbmdvU3RvcmUgPSByZXF1aXJlKCdjb25uZWN0LW1vbmdvJykoc2Vzc2lvbik7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUO1xuXG4vLyBhcHAudXNlKHNlc3Npb24oe1xuLy8gICAgIHNlY3JldDogJ2RoaWxpcExvY2FsJyxcbi8vICAgICByZXNhdmU6IGZhbHNlLFxuLy8gICAgIHNhdmVVbmluaXRpYWxpemVkOiB0cnVlLFxuLy8gICAgIHVybDogcHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJXG4vLyB9KSlcbmFwcC51c2Uoc2Vzc2lvbih7XG4gICAgc2VjcmV0OiAnZm9vJyxcbiAgICBzdG9yZTogbmV3IE1vbmdvU3RvcmUoe1xuICAgICAgICB1cmw6IHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSVxuICAgIH0pXG59KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJ2J1aWxkL3B1YmxpYycpKTtcbmFwcC51c2UoJy9zdHlsZXMnLCBleHByZXNzLnN0YXRpYygnc3JjL3BhZ2VzL3N0eWxlcycpKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJ3NyYy9wYWdlcy9zdGF0aWMnKSk7XG5cbi8vIEFQSSBDYWxsc1xuYXBwLnBvc3QoJy9zaWdudXAnLCBzaWduVXApO1xuYXBwLnBvc3QoJy9zaWduaW4nLCBzaWduSW4pO1xuYXBwLnBvc3QoJy9uZXdfZXhwZW5zZScsIG5ld0V4cGVuc2UpO1xuYXBwLnBvc3QoJy9nZXRfZXhwZW5zZV9kYXRhJywgZ2V0RXhwZW5zZURhdGEpO1xuYXBwLnBvc3QoJy9nZXRfZXhwZW5zZV9zdW1tYXJ5JywgZ2V0RXhwZW5zZVN1bW1hcnkpO1xuXG5jb25zdCBsb2FkSHRtbCA9IChjb250ZW50KSA9PiB7XG4gICAgY29uc3QgaGVsbWV0ID0gSGVsbWV0LnJlbmRlclN0YXRpYygpO1xuICAgIHJldHVybiAoYFxuICAgICAgICA8aHRtbD5cbiAgICAgICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgICAgICR7aGVsbWV0Lm1ldGEudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICAgICAke2hlbG1ldC50aXRsZS50b1N0cmluZygpfVxuICAgICAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy90d2l0dGVyLWJvb3RzdHJhcC80LjEuMy9jc3MvYm9vdHN0cmFwLm1pbi5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3R3aXR0ZXItYm9vdHN0cmFwLzQuMS4zL2pzL2Jvb3RzdHJhcC5idW5kbGUubWluLmpzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL2NvbW1vbi5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvaG9tZS5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvbG9naW4uY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL25ld19leHBlbnNlLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9T3BlbitTYW5zXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICAgICAgICAgICAgPC9oZWFkPlxuICAgICAgICAgICAgPGJvZHk+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJvb3RcIj4ke2NvbnRlbnR9PC9kaXY+XG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJjbGllbnRfYnVuZGxlLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICA8L2JvZHk+XG4gICAgICAgIDwvaHRtbD5gKTtcbn07XG5cbmFwcC5nZXQoJyonLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCBjb250ZXh0ID0ge307XG4gICAgY29uc3QgY29udGVudCA9IFJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RyaW5nKFxuICAgICAgICA8U3RhdGljUm91dGVyPlxuICAgICAgICAgICAgPEFwcCBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0gLz5cbiAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgKTtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGxvYWRIdG1sKGNvbnRlbnQpO1xuICAgIHJlcy5zZW5kKHRlbXBsYXRlKTtcbn0pO1xuXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygncHJvY2VzLmVudicsIHBvcnQsIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSk7XG4gICAgY29uc29sZS5sb2coJ1NlcnZlciBTdGFydGVkIG9uIFBvcnQ6ICcsIHBvcnQpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwcDtcbiIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3dpdGNoLCBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgSG9tZSBmcm9tICcuL3BhZ2VzL2NvbXBvbmVudHMvTG9naW4nO1xuaW1wb3J0IFJvdXRlcyBmcm9tICcuL3BhZ2VzL3JvdXRlcy9yb3V0ZXMnO1xuaW1wb3J0IHtTZXJ2ZXJSb3V0ZXJ9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSb3V0ZXMvPlxuICAgICAgICApO1xuICAgIH1cbn0iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgY29uc3Qgc2lnbnVwID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL3NpZ251cC8nO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHsuLi5wYXJhbXN9KTtcbn1cblxuZXhwb3J0IGNvbnN0IHNpZ25pbiA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9zaWduaW4vJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBuZXdfZXhwZW5zZSA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9uZXdfZXhwZW5zZS8nO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHsuLi5wYXJhbXN9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldF9leHBlbnNlX2RhdGEgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvZ2V0X2V4cGVuc2VfZGF0YS8nIDtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCBwYXJhbXMpO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0X2V4cGVuc2Vfc3VtbWFyeSA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9nZXRfZXhwZW5zZV9zdW1tYXJ5LycgO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHBhcmFtcyk7XG59XG4iLCJcbmNvbnN0IFdJRFRIID0gMTUwO1xuY29uc3QgSEVJR0hUID0gMTAwO1xuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7RElWSVNJT05MRU5HVEh9IGZyb20gJy4uL2NvbnN0YW50cy9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuZ2VuZXJhdGVTVkcgPSB0aGlzLmdlbmVyYXRlU1ZHLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAod2luZG93ICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb25yZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYWxlcnQoJ2F0dGFjaEV2ZW50IC0gcmVzaXplJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZVNWRygpIHtcbiAgICBjb25zdCB7cGxvdERhdGEsIHRhYn0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHhDb29yZGluYXRlcyA9IFtdO1xuICAgIGNvbnN0IHlDb29yZGluYXRlcyA9IFtdO1xuICAgIGNvbnN0IGxlbmd0aCA9IERJVklTSU9OTEVOR1RIW3RhYl07XG4gICAgY29uc3QgbWF4QW10ID0gcGxvdERhdGEubWF4QW1vdW50O1xuICAgIGNvbnN0IHhDb29yZGluYXRlRGl2TGVuZ3RoID0gKFdJRFRIIC8gKGxlbmd0aCArIDIpKTtcbiAgICBsZXQgbGFzdERpdmlzaW9uID0gMDtcbiAgICBsZXQgc3RyID0gJyc7XG5cbiAgICAvKiBUbyBzdGFydCB0aGUgZ3JhcGggYXQgdGhlIExlYXN0IFBvaW50ICovXG4gICAgeENvb3JkaW5hdGVzLnB1c2goMCk7XG4gICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUKTtcbiAgICBwbG90RGF0YS5wZXJEaXZpc2lvbkRhdGEuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIHdoaWxlIChlbnRyeS5kaXZpc2lvbiA+IGxhc3REaXZpc2lvbikge1xuICAgICAgICBjb25zdCBsYXN0WCA9IHhDb29yZGluYXRlc1t4Q29vcmRpbmF0ZXMubGVuZ3RoIC0gMV07XG4gICAgICAgIHhDb29yZGluYXRlcy5wdXNoKChsYXN0WCArIHhDb29yZGluYXRlRGl2TGVuZ3RoKSk7XG4gICAgICAgIGlmIChlbnRyeS5kaXZpc2lvbiA9PT0gbGFzdERpdmlzaW9uICsgMSkge1xuICAgICAgICAgIGNvbnN0IHBlcmNlbnQgPSAoKGVudHJ5LmFtb3VudCAvIG1heEFtdCkgKiAxMDApO1xuICAgICAgICAgIHlDb29yZGluYXRlcy5wdXNoKEhFSUdIVCAtICgoSEVJR0hUIC8gMTAwKSAqIHBlcmNlbnQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB5Q29vcmRpbmF0ZXMucHVzaChIRUlHSFQpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3REaXZpc2lvbiA9IGxhc3REaXZpc2lvbiArIDE7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gdG8gcHVzaCB2YWx1ZXMgZm9yIHJlbWFpbmluZyBkYXlzXG4gICAgd2hpbGUobGVuZ3RoID4gbGFzdERpdmlzaW9uKSB7XG4gICAgICBjb25zdCBsYXN0WCA9IHhDb29yZGluYXRlc1t4Q29vcmRpbmF0ZXMubGVuZ3RoIC0gMV07XG4gICAgICB4Q29vcmRpbmF0ZXMucHVzaCgobGFzdFggKyB4Q29vcmRpbmF0ZURpdkxlbmd0aCkpO1xuICAgICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUKTtcbiAgICAgIGxhc3REaXZpc2lvbiA9IGxhc3REaXZpc2lvbiArIDE7XG4gICAgfVxuICAgIGNvbnN0IGxhc3RYID0geENvb3JkaW5hdGVzW3hDb29yZGluYXRlcy5sZW5ndGggLSAxXTtcbiAgICB4Q29vcmRpbmF0ZXMucHVzaCgobGFzdFggKyB4Q29vcmRpbmF0ZURpdkxlbmd0aCkpO1xuICAgIHlDb29yZGluYXRlcy5wdXNoKEhFSUdIVCk7XG4gXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB4Q29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN0ciArPSAnICcgKyB4Q29vcmRpbmF0ZXNbaV0gKyAnLCcgKyB5Q29vcmRpbmF0ZXNbaV0gKyAnICc7XG4gICAgfVxuICAgIGlmIChzdHIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PXsnMCAwICcgKyBXSURUSCArICcgJyArIEhFSUdIVH0gc3R5bGU9e3ttYXJnaW46ICcyMHB4J319PlxuICAgICAgICAgICAgPHBvbHlsaW5lIHBvaW50cz17c3RyfSBjbGFzc05hbWU9XCJncmFwaFBsb3RMaW5lXCIgLz5cbiAgICAgICAgICAgIHsvKiA8ZyBzdHlsZT17e3N0cm9rZTogJyNjY2MnLCBzdHJva2VEYXNoYXJyYXk6IDAsIHN0cm9rZVdpZHRoOiAxfX0+XG4gICAgICAgICAgICAgIDxsaW5lIHgxPVwiMFwiIHkxPVwiMjAwXCIgeDI9XCIwXCIgeTI9XCIwXCI+PC9saW5lPlxuICAgICAgICAgICAgPC9nPiAqL31cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5nZW5lcmF0ZVNWRygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IE5ld0V4cGVuc2UgZnJvbSAnLi9OZXdFeHBlbnNlJztcbmltcG9ydCB7Z2V0X2V4cGVuc2VfZGF0YSwgZ2V0X2V4cGVuc2Vfc3VtbWFyeX0gZnJvbSAnLi4vYXBpQ2FsbHMvQXBpQ2FsbHMnO1xuaW1wb3J0IHtNT05USCwgWUVBUiwgV0VFSywgTU9OVEhTTkFNRX0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbnN0YW50cyc7XG5pbXBvcnQgR3JhcGggZnJvbSAnLi9HcmFwaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmxlZnRNZW51Q2xpY2sgPSB0aGlzLmxlZnRNZW51Q2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm5ld0V4cGVuc2UgPSB0aGlzLm5ld0V4cGVuc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm5hdmlnYXRlVG9TaWduSW4gPSB0aGlzLm5hdmlnYXRlVG9TaWduSW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYWN0aXZlVGFiOiBNT05USCxcbiAgICAgIHNob3dOZXdFeHBlbnNlOiBmYWxzZSxcbiAgICAgIHN0YW5kaW5nOiB1bmRlZmluZWQsXG4gICAgICBzcGVudDogdW5kZWZpbmVkLFxuICAgICAgZXhwZW5zZUxpc3Q6IHt9LFxuICAgICAgaW5jb21lTGlzdDoge30sXG4gICAgICB2aWV3TW9yZTogZmFsc2VcbiAgICB9XG4gICAgdGhpcy52aWV3ZWRNb3JlID0ge307XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5nZXRFeHBlbnNlKCk7XG4gICAgdGhpcy5nZXRFeHBlbnNlU3VtbWFyeSgpO1xuICB9XG5cbiAgZ2V0RXhwZW5zZVN1bW1hcnkoKSB7XG4gICAgY29uc3QgdGFiID0gdGhpcy5zdGF0ZS5hY3RpdmVUYWI7XG4gICAgY29uc3QgbW0gPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IGRvdyA9IG5ldyBEYXRlKCkuZ2V0RGF5KCk7XG4gICAgY29uc3Qgd3cgPSBNYXRoLmNlaWwobmV3IERhdGUoKS5nZXREYXRlKCkgLyA3KTtcbiAgICBjb25zdCB5eSA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7dGFiLCBtbSwgZG93LCB3dywgeXl9O1xuICAgIGdldF9leHBlbnNlX3N1bW1hcnkocGFyYW1zKS50aGVuKChyZXNwKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtwbG90RGF0YTogey4uLnJlc3AuZGF0YX19KTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIEdldCBFeHBlbnNlIFN1bW1hcnkgRGV0YWlscycsIGVycik7XG4gICAgfSk7XG4gIH1cblxuICBnZXRFeHBlbnNlKCkge1xuICAgIGxldCBleHBlbnNlTGlzdCA9IHt9LCBpbmNvbWVMaXN0ID0ge30sIHN0YW5kaW5nID0nJztcbiAgICBjb25zdCB0YWIgPSB0aGlzLnN0YXRlLmFjdGl2ZVRhYjtcbiAgICBjb25zdCBtbSA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgZG93ID0gbmV3IERhdGUoKS5nZXREYXkoKTtcbiAgICBjb25zdCB3dyA9IE1hdGguY2VpbChuZXcgRGF0ZSgpLmdldERhdGUoKSAvIDcpO1xuICAgIGNvbnN0IHl5ID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHt0YWIsIG1tLCBkb3csIHd3LCB5eX07XG4gICAgZ2V0X2V4cGVuc2VfZGF0YShwYXJhbXMpLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgY29uc3Qge2V4cGVuc2VMaXN0LCBpbmNvbWVMaXN0LCBzdGFuZGluZywgc3BlbnR9ID0gcmVzcC5kYXRhO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHN0YW5kaW5nLCBzcGVudH0pO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gR2V0IEV4cGVuc2UgRGV0YWlscycsIGVycik7XG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KGFjdGl2ZVRhYikge1xuICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZVRhYjogYWN0aXZlVGFiLCB2aWV3TW9yZTogZmFsc2V9LCAoKSA9PiB7XG4gICAgICB0aGlzLmdldEV4cGVuc2UoKTtcbiAgICAgIHRoaXMuZ2V0RXhwZW5zZVN1bW1hcnkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxlZnRNZW51Q2xpY2soKSB7XG4gICAgdGhpcy5yZWZzLmJhY2tEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2JhY2tEcm9wJyk7XG4gICAgdGhpcy5yZWZzLnBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ3JpZ2h0MCcpO1xuICAgIHRoaXMucmVmcy5maXJzdEhhbGZMYW5kaW5nVHh0LmNsYXNzTGlzdC50b2dnbGUoJ3NjYWxlOTAnKTtcbiAgICB0aGlzLnJlZnMub3RoZXJIYWxmTGFuZGluZ1R4dC5jbGFzc0xpc3QudG9nZ2xlKCdzY2FsZTkwJyk7XG4gIH1cblxuICBuYXZpZ2F0ZVRvU2lnbkluKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMpO1xuICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvbG9naW4nKTtcbiAgfVxuXG4gIHJlbmRlckxlZnRNZW51QmFyKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudUJhclwiPlxuICAgICAgICA8ZGl2IHJlZj1cInBvcHVwXCJjbGFzc05hbWU9XCJwb3B1cCB6aTIgXCIgb25DbGljaz17dGhpcy5sZWZ0TWVudUNsaWNrfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGVCYXIgaW4tYmwgZmxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIj5TZXR0aW5nczwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51LW9wdGlvblwiIG9uQ2xpY2s9e3RoaXMubmF2aWdhdGVUb1NpZ25Jbn0+U2lnbiBJbjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51LW9wdGlvblwiPkFib3V0IE1lPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIG5ld0V4cGVuc2UodmFsLCBzYXZlU3VjY2Vzcykge1xuICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dOZXdFeHBlbnNlOiB2YWx9LCAoKSA9PiB7XG4gICAgICBpZiAoc2F2ZVN1Y2Nlc3MpIHtcbiAgICAgICAgdGhpcy5nZXRFeHBlbnNlKCk7XG4gICAgICAgIHRoaXMuZ2V0RXhwZW5zZVN1bW1hcnkoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNsaWNrVmlld01vcmUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dmlld01vcmU6ICF0aGlzLnN0YXRlLnZpZXdNb3JlfSk7XG4gICAgdGhpcy5yZWZzLnRyYW5zYWN0ZWRDYXJkLnNjcm9sbFRvcCA9IDA7XG4gIH1cblxuICByZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5zdGF0ZS5leHBlbnNlTGlzdC50cmFuc2FjdGlvbkxpc3QubWFwKCh0cmFuc2FjdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudmlld01vcmUgfHwgdGhpcy52aWV3ZWRNb3JlW3RoaXMuc3RhdGUuYWN0aXZlVGFiXSB8fCAhdGhpcy5zdGF0ZS52aWV3TW9yZSAmJiBpbmRleCA8IDIpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZS52aWV3TW9yZSkge1xuICAgICAgICAgICAgdGhpcy52aWV3ZWRNb3JlW3RoaXMuc3RhdGUuYWN0aXZlVGFiXSA9IHRydWU7IC8vIFRvIG5vdCByZW1vdmUgZWxlbWVudCBmcm9tIERPTSBvbiBjbGlja2luZyB2aWV3IE1vcmUgYWdhaW5cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXsndHJhbnNhY3Rpb25fdHlwZV8nICsgaW5kZXh9IGNsYXNzTmFtZT1cInRyYW5zYWN0ZWRDYXJkSW5uZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkSW5uZXJoZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0X25hbWVcIj57dHJhbnNhY3Rpb24uY2F0ZWdvcnl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9wZXJjZW50IFwiPnt0cmFuc2FjdGlvbi5wZXJjZW50ICsgJyAlJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgey8qIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9uYW1lIGxvYWRlclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRfcGVyY2VudCBsb2FkZXJcIj48L3NwYW4+ICovfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9ncmVzc0JhciBibCB0ZXh0Q2VudGVyIG1hcmdpblQyNVwiID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbGxlZFwiIHN0eWxlPSB7e21heFdpZHRoOiB0cmFuc2FjdGlvbi5wZXJjZW50ICsgJyUnfX0+XG4gICAgICAgICAgICAgICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJmaWxsZWRcIiA+PC9kaXY+ICovfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICk7XG4gIH1cblxuICBnZXRUcmFuc2FjdGlvbkNhcmQoKSB7XG4gICAgY29uc3Qge2FjdGl2ZVRhYiwgdmlld01vcmUgPSBmYWxzZX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGhhc0RhdGEgPSB0aGlzLnN0YXRlLmV4cGVuc2VMaXN0ICYmIE9iamVjdC5rZXlzKHRoaXMuc3RhdGUuZXhwZW5zZUxpc3QpLmxlbmd0aCA+IDA7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgcmVmPVwidHJhbnNhY3RlZENhcmRcIiBjbGFzc05hbWU9eyd0cmFuc2FjdGVkQ2FyZCB0cmFuc2l0aW9uMWEgJyArICh2aWV3TW9yZSA/ICdzaG93QWxsVHJhbnNhY3Rpb24nIDogJycpfT5cbiAgICAgICAgICAgIHtoYXNEYXRhID9cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhbnNhY3RTY3JvbGxlclwiPlxuICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IFdFRUsgPyB0aGlzLnJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKCkgOiBudWxsfVxuICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IE1PTlRIID8gdGhpcy5yZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZCgpIDogbnVsbH1cbiAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBZRUFSID8gdGhpcy5yZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZCgpIDogbnVsbH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj4gOiBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlciBwYWRUMjAgbWgxMHBcIj5cbiAgICAgICAgICAgICAgPGRpdj5ObyBUcmFuc2FjdGlvbnMgYWRkZWQgPC9kaXY+XG4gICAgICAgICAgICAgIHt0eXBlb2Yod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcgJiYgIXdpbmRvdy5zaWduZWRJbiAmJiA8ZGl2IGNsYXNzTmFtZT1cInBhZFQxMCBwYWRCMjBcIj48YSBocmVmPVwiL2xvZ2luXCI+PHNwYW4+U2lnbiBJbjwvc3Bhbj48L2E+IGZvciBQYXN0IFRyYW5zYWN0aW9uczwvZGl2Pn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlld01vcmVBcnJvd1wiIG9uQ2xpY2s9eygpID0+IHRoaXMuY2xpY2tWaWV3TW9yZSgpfT5cbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPXt2aWV3TW9yZSA/ICdyb3RhdGVWaWV3TW9yZScgOiAnJ30gcmVmPVwic3ZnVmlld01vcmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTcuNDEgNy44NEwxMiAxMi40Mmw0LjU5LTQuNThMMTggOS4yNWwtNiA2LTYtNnpcIi8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J25ld0NvbnRhaW5lciAnICsgKCFoYXNEYXRhID8gJ3BhZFQxMCcgOiAnJyl9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXdcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmV3QnRuXCIgb25DbGljaz17KCkgPT4gdGhpcy5uZXdFeHBlbnNlKHRydWUpfT4gKyBhZGQgTmV3PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgfVxuICBnZXRDdXJyZW50RGF0ZSgpIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBjdXJyTW9udGggPSBNT05USFNOQU1FW2RhdGUuZ2V0TW9udGgoKV07XG4gICAgY29uc3QgY3VyckRhdGUgPSBkYXRlLmdldERhdGUoKTtcbiAgICByZXR1cm4gY3VyckRhdGUgKyAnICcgKyBjdXJyTW9udGggKyAnICcgKyBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2FjdGl2ZVRhYiwgc2hvd05ld0V4cGVuc2UsIHN0YW5kaW5nID0gdW5kZWZpbmVkLCBzcGVudCA9IHVuZGVmaW5lZCwgdmlld01vcmUgPSBmYWxzZSwgcGxvdERhdGEsIGluY29tZUxpc3R9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IHJlZj1cImJhY2tEcm9wXCIgY2xhc3NOYW1lPXsndHJhbnNpdGlvbjJhIHppMSAnICsgKHNob3dOZXdFeHBlbnNlID8gJ2JhY2tEcm9wJyA6ICcnKX0gb25DbGljaz17KCkgPT4gdGhpcy5uZXdFeHBlbnNlKGZhbHNlKX0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge3RoaXMucmVuZGVyTGVmdE1lbnVCYXIoKX1cbiAgICAgICAgICA8ZGl2IHJlZj1cIm1haW5Db250ZW50XCIgY2xhc3NOYW1lPVwibWFpbkNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaXJzdC1oYWxmLWxhbmRpbmdcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiByZWY9XCJmaXJzdEhhbGZMYW5kaW5nVHh0XCIgY2xhc3NOYW1lPVwidHJhbnNpdGlvbjBfNSBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YW5kaW5nXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsZWZ0LW1lbnUtY29udGFpbmVyXCIgb25DbGljaz17dGhpcy5sZWZ0TWVudUNsaWNrfT48aW1nIGNsYXNzTmFtZT1cImxlZnQtbWVudVwiIHNyYz1cIi9pbWcvbWVudS5zdmdcIi8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgey8qIDxzcGFuIGNsYXNzTmFtZT1cInJpZ2h0LW1lbnUtY29udGFpbmVyXCIgb25DbGljaz17KCkgPT4ge3RoaXMuc2V0U3RhdGUoe3Zpc2libGVSaWdodE1lbnU6IHRydWV9KX19PjxpbWcgY2xhc3NOYW1lPVwicmlnaHQtbWVudVwiIHNyYz1cIi9pbWcvbWVudS5zdmdcIi8+PC9zcGFuPiAqL31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmIgZjExXCI+Q1VSUkVOVCBCQUxBTkNFPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmMThcIj7igrkgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdGFuZGluZ0FtdFwiPnsodHlwZW9mKHN0YW5kaW5nKSAhPT0gJ3VuZGVmaW5lZCcgPyBzdGFuZGluZyA6ICcwJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48c3BhbiBjbGFzc05hbWU9XCJmMTFcIj57dGhpcy5nZXRDdXJyZW50RGF0ZSgpfTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwZW5zZURheXNCdG5cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J2RheVR5cGVCdG4gJyArIChhY3RpdmVUYWIgPT09IFdFRUsgPyAnZGF5VHlwZUJ0bi1hY3RpdmUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB7dGhpcy5jaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KFdFRUspfX0+V2Vlazwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J2RheVR5cGVCdG4gJyArIChhY3RpdmVUYWIgPT09IE1PTlRIID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdChNT05USCl9fT5Nb250aDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J2RheVR5cGVCdG4gJyArIChhY3RpdmVUYWIgPT09IFlFQVIgPyAnZGF5VHlwZUJ0bi1hY3RpdmUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB7dGhpcy5jaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KFlFQVIpfX0+WWVhcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwZW50SW5jb21lU2VjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbi1ibCBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbCBpbi1ibCBzcGVudEljb25cIiA+XG4gICAgICAgICAgICAgICAgICAgICAgPHN2ZyAgd2lkdGg9XCIyMVwiIGhlaWdodD1cIjE3XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMjQgMTJjMC02LjYyNy01LjM3My0xMi0xMi0xMnMtMTIgNS4zNzMtMTIgMTIgNS4zNzMgMTIgMTIgMTIgMTItNS4zNzMgMTItMTJ6bS0xNyAxaDR2LThoMnY4aDRsLTUgNi01LTZ6XCIvPjwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJIZWFkaW5nIGluLWJsXCI+eydTcGVudCA6IOKCuScgKyAodHlwZW9mKHNwZW50KSAhPT0gJ3VuZGVmaW5lZCc/IHNwZW50OiAnMCcpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW4tYmwgIFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsIGluLWJsIGluY29tZUljb24gXCIgPlxuICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiZmwgaW4tYmxcIiB3aWR0aD1cIjIxXCIgaGVpZ2h0PVwiMTdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0wIDEyYzAgNi42MjcgNS4zNzMgMTIgMTIgMTJzMTItNS4zNzMgMTItMTItNS4zNzMtMTItMTItMTItMTIgNS4zNzMtMTIgMTJ6bTE3LTFoLTR2OGgtMnYtOGgtNGw1LTYgNSA2elwiLz48L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViSGVhZGluZyBpbi1ibFwiPnsnSW5jb21lIDog4oK5JyArIChpbmNvbWVMaXN0ICYmIHR5cGVvZihpbmNvbWVMaXN0LmFtb3VudCkgIT09ICd1bmRlZmluZWQnID8gaW5jb21lTGlzdC5hbW91bnQgOiAnMCcpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0VHJhbnNhY3Rpb25DYXJkKCl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7cGxvdERhdGEgJiYgcGxvdERhdGEucGVyRGl2aXNpb25EYXRhICYmICBwbG90RGF0YS5wZXJEaXZpc2lvbkRhdGEubGVuZ3RoID4gMCA/XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3RoZXItaGFsZi1sYW5kaW5nXCI+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9XCJvdGhlckhhbGZMYW5kaW5nVHh0XCIgY2xhc3NOYW1lPVwidHJhbnNpdGlvbjBfNSBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlciB0clN1bWFyeUhlYWRpbmcgZmJcIiA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnsnRXhwZW5zZSBUcmVuZHMnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gV0VFSyA/ICA8R3JhcGggcGxvdERhdGE9e3Bsb3REYXRhfSB0YWI9e2FjdGl2ZVRhYn0vPiA6IG51bGx9XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBNT05USCA/ICA8R3JhcGggcGxvdERhdGE9e3Bsb3REYXRhfSB0YWI9e2FjdGl2ZVRhYn0vPiA6IG51bGx9XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBZRUFSID8gIDxHcmFwaCBwbG90RGF0YT17cGxvdERhdGF9IHRhYj17YWN0aXZlVGFifS8+IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7c2hvd05ld0V4cGVuc2UgPyBcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgIDxOZXdFeHBlbnNlIG5ld0V4cGVuc2U9e3RoaXMubmV3RXhwZW5zZX0vPlxuICAgICAgICAgIDwvZGl2PiA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCB7c2lnbnVwLCBzaWduaW59IGZyb20gJy4uL2FwaUNhbGxzL0FwaUNhbGxzJztcblxuY2xhc3MgTG9naW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNpZ25VcCA9IHRoaXMuc2lnblVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaWduSW4gPSB0aGlzLnNpZ25Jbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB1c2VybmFtZTogJycsXG4gICAgICBwYXNzd29yZDogJydcbiAgICB9XG4gIH1cblxuICBoZWFkKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0PlxuICAgICAgICA8dGl0bGU+RXhwZW5zZSBMb2dpbjwvdGl0bGU+XG4gICAgICA8L0hlbG1ldD5cbiAgICApO1xuICB9XG5cbiAgc2lnblVwKCkge1xuICAgIHNpZ251cCh7dXNlcm5hbWU6IHRoaXMuc3RhdGUudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSk7XG4gIH1cblxuICBzaWduSW4od2l0aFRlc3RDcmVkcykge1xuICAgIGxldCB7dXNlcm5hbWUsIHBhc3N3b3JkfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKHdpdGhUZXN0Q3JlZHMpIHtcbiAgICAgIHVzZXJuYW1lID0gJ2RoaWxpcCc7XG4gICAgICBwYXNzd29yZCA9ICdkaGlsaXBkaGlsaXAnO1xuICAgIH1cbiAgICBzaWduaW4oe3VzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkfSkudGhlbigocmVzcCkgPT4ge1xuICAgICAgaWYgKHJlc3AuZGF0YSAmJiAhcmVzcC5kYXRhLmVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCgnL2hvbWUnLCB7fSk7XG4gICAgICAgIGlmICh0eXBlb2Yod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB3aW5kb3cuc2lnbmVkSW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIFNpZ25JbicsIHJlc3ApO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gU2lnbkluJywgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuaGVhZCgpfVxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9naW5Db250YWluZXIgd2hpdGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmllbGRzRGl2XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlcm5hbWVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwid2hpdGVCcmRyQnRtXCIgcGxhY2Vob2xkZXI9J1VzZXJuYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS51c2VybmFtZX0gb25DaGFuZ2UgPSB7KGUpID0+IHRoaXMuc2V0U3RhdGUoe3VzZXJuYW1lOiBlLnRhcmdldC52YWx1ZX0pfSB0eXBlPVwidGV4dFwiLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFzc3dvcmQgcGFkVDEwXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cIndoaXRlQnJkckJ0bVwiIHBsYWNlaG9sZGVyPSdQYXNzd29yZCcgdmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9IG9uQ2hhbmdlID0geyhlKSA9PiB0aGlzLnNldFN0YXRlKHtwYXNzd29yZDogZS50YXJnZXQudmFsdWV9KX0gdHlwZT1cInBhc3N3b3JkXCIvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIHBhZFQyMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ldyBkaVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5ld0J0blwib25DbGljaz17dGhpcy5zaWduSW59PlNpZ24gSW48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ldyBkaVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5ld0J0blwiIG9uQ2xpY2s9e3RoaXMuc2lnblVwfT5TaWduIFVwPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIHBhZFQyMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ld1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5ld0J0blwiIG9uQ2xpY2s9eygpID0+IHRoaXMuc2lnbkluKHRydWUpfT5Db250aW51ZSB3aXRoIFRlc3QgTG9naW48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTG9naW47IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge25ld19leHBlbnNlfSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5pbXBvcnQge01PTlRIU05BTUVTSE9SVH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbnN0YW50cyc7XG4vLyBpbXBvcnQge2NvbW1hRm9ybWF0dGVkfSBmcm9tICcuLi91dGlscy91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0V4cGVuc2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnNlbGVjdFR5cGUgPSB0aGlzLnNlbGVjdFR5cGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN1Ym1pdE5ld0V4cGVuc2UgPSB0aGlzLnN1Ym1pdE5ld0V4cGVuc2UuYmluZCh0aGlzKTtcbiAgICBcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdHlwZTogJ2V4cGVuc2UnLFxuICAgICAgYW1vdW50OiAnJyxcbiAgICAgIGNhdGVnb3J5OiAnJyxcbiAgICAgIGRheTogJycsIFxuICAgICAgbW9udGg6ICcnLFxuICAgICAgeWVhcjogJycsXG4gICAgICBlcnJvcjoge31cbiAgICB9XG4gIH1cblxuICBzZWxlY3RUeXBlKHR5cGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt0eXBlOiB0eXBlfSk7XG4gIH1cblxuICBjaGFuZ2VBbW91bnQodmFsKXtcbiAgICB0aGlzLnNldFN0YXRlKHthbW91bnQ6IHZhbH0pXG4gIH1cblxuICBjaGFuZ2VEYXRlKHZhbCwgY3VycmVudCwgbmV4dCkge1xuICAgIHRoaXMuc2V0U3RhdGUoey4uLnZhbH0pO1xuICAgIGlmIChjdXJyZW50ICYmIHZhbFtjdXJyZW50XS5sZW5ndGggPT09IDIgJiYgbmV4dCkge1xuICAgICAgdGhpcy5yZWZzW25leHRdLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgaXNWYWxpZERhdGUoKSB7XG4gICAgY29uc3Qge2RheSwgbW9udGgsIHllYXJ9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBkYXRlUmVnID0gL15cXGR7MSwyfSQvO1xuICAgIGNvbnN0IGRhdGVSZWdZZWFyID0gL15cXGR7NH0kLztcbiAgICBpZiAoIWRhdGVSZWcudGVzdChkYXkpIHx8ICFkYXRlUmVnLnRlc3QobW9udGgpIHx8ICFkYXRlUmVnWWVhci50ZXN0KHllYXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KHllYXIpLCBwYXJzZUludChtb250aCksIHBhcnNlSW50KGRheSkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHZhbGlkYXRlUGFyYW1zKCkge1xuICAgIHZhciByZWcgPSAvXlxcZCskLztcbiAgICBjb25zdCB7YW1vdW50LCBjYXRlZ29yeX0gPSB0aGlzLnN0YXRlO1xuICAgIGlmICghYW1vdW50IHx8ICFyZWcudGVzdChhbW91bnQpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2Ftb3VudDogJ1BsZWFzZSBwcm92aWRlIGEgVmFsaWQgQW1vdW50J319KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFjYXRlZ29yeSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHtjYXRlZ29yeTogJ1BsZWFzZSBwcm92aWRlIGEgVmFsaWQgQ2F0ZWdvcnknfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNWYWxpZERhdGUoKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHtkYXRlOiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBEYXRlJ319KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgc3VibWl0TmV3RXhwZW5zZSgpIHtcbiAgICBjb25zdCB7YW1vdW50LCBkYXksIG1vbnRoLCB5ZWFyLCB0eXBlLCBjYXRlZ29yeX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGlzVmFsaWRhdGlvblN1Y2Nlc3MgPSB0aGlzLnZhbGlkYXRlUGFyYW1zKCk7XG4gICAgaWYgKGlzVmFsaWRhdGlvblN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgYW1vdW50LCB0eXBlLCBkYXRlOiB0aGlzLmRhdGUsIGNhdGVnb3J5fTtcbiAgICAgIG5ld19leHBlbnNlKHBhcmFtcykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5uZXdFeHBlbnNlKGZhbHNlLCB0cnVlKTtcbiAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBjcmVhdGUgbmV3IEV4cGVuc2UnLGVycik7XG4gICAgICAgIHRoaXMucHJvcHMubmV3RXhwZW5zZShmYWxzZSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyT3B0aW9ucyh0eXBlKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGlmICh0eXBlID09PSAnZGF5Jykge1xuICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24+RGF5PC9vcHRpb24+KTtcbiAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCAzMiA7IGkrKykge1xuICAgICAgICBvcHRpb25zLnB1c2goPG9wdGlvbiB2YWx1ZT17aX0+e2l9PC9vcHRpb24+KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdtb250aCcpIHtcbiAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uPk1vbnRoPC9vcHRpb24+KTtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMiA7IGkrKykge1xuICAgICAgICBvcHRpb25zLnB1c2goPG9wdGlvbiB2YWx1ZT17aX0+e01PTlRIU05BTUVTSE9SVFtpXX08L29wdGlvbj4pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3llYXInKSB7XG4gICAgICBvcHRpb25zLnB1c2goPG9wdGlvbj5ZZWFyPC9vcHRpb24+KTtcbiAgICAgIGZvcihsZXQgaSA9IDIwMjA7IGkgPiAyMDAwIDsgaS0tKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uIHZhbHVlPXtpfT57aX08L29wdGlvbj4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7dHlwZSwgYW1vdW50LCBkYXksIG1vbnRoLCB5ZWFyLCBjYXRlZ29yeSwgZXJyb3J9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ld0V4cGVuc2VDb250YWluZXIgemkyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwSW5jQnRucyB0ZXh0Q2VudGVyIG1UMjVcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eyduZXdCdG4gJyArICh0eXBlID09PSAnZXhwZW5zZScgPyAnc2VsZWN0ZWRUeXBlJyA6ICcnKX0gIG9uQ2xpY2s9eygpID0+IHRoaXMuc2VsZWN0VHlwZSgnZXhwZW5zZScpfT5FeHBlbnNlPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J25ld0J0biAnICsgKHR5cGUgPT09ICdpbmNvbWUnID8gJ3NlbGVjdGVkVHlwZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2VsZWN0VHlwZSgnaW5jb21lJyl9PkluY29tZTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW1vdW50SW5wdXQgbVQyNSBcIj5cbiAgICAgICAgPHNwYW4+4oK5PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQW1vdW50XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZUFtb3VudChlLnRhcmdldC52YWx1ZSl9IHZhbHVlPXthbW91bnR9Lz5cbiAgICAgICAgICB7ZXJyb3IuYW1vdW50ID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5hbW91bnR9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgIGNsYXNzTmFtZT1cImNhdGVnb3J5SW5wdXQgbVQyNSBcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkNhdGVnb3J5XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHtjYXRlZ29yeTogZS50YXJnZXQudmFsdWV9KX0gdmFsdWU9e2NhdGVnb3J5fS8+XG4gICAgICAgICAge2Vycm9yLmNhdGVnb3J5ID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5jYXRlZ29yeX08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGVudERheSBtVDI1IFwiPlxuICAgICAgICAgIHsvKiA8aW5wdXQgcmVmPVwiZGF5XCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiRERcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7ZGF5OiBlLnRhcmdldC52YWx1ZX0sICdkYXknLCAnbW9udGgnKX0gdmFsdWU9e2RheX0vPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJtb250aFwiIGNsYXNzTmFtZT1cImRheUlwXCIgdHlwZT1cIm51bWJlclwiIG1heExlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIk1NXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe21vbnRoOiBlLnRhcmdldC52YWx1ZX0sICdtb250aCcsICd5ZWFyJyl9IHZhbHVlPXttb250aH0vPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJ5ZWFyXCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiWVlcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7eWVhcjogZS50YXJnZXQudmFsdWV9LCAneWVhcicpfSB2YWx1ZT17eWVhcn0vPiAqL31cbiAgICAgICAgICA8c2VsZWN0IHJlZj1cImRheVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHtkYXk6IGUudGFyZ2V0LnZhbHVlfSwgJ2RheScsICdtb250aCcpfT57dGhpcy5yZW5kZXJPcHRpb25zKCdkYXknKX08L3NlbGVjdD5cbiAgICAgICAgICA8c2VsZWN0IHJlZj1cIm1vbnRoXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe21vbnRoOiBlLnRhcmdldC52YWx1ZX0sICdtb250aCcsICd5ZWFyJyl9Pnt0aGlzLnJlbmRlck9wdGlvbnMoJ21vbnRoJyl9PC9zZWxlY3Q+XG4gICAgICAgICAgPHNlbGVjdCByZWY9XCJ5ZWFyXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe3llYXI6IGUudGFyZ2V0LnZhbHVlfSwgJ3llYXInKX0+e3RoaXMucmVuZGVyT3B0aW9ucygneWVhcicpfTwvc2VsZWN0PlxuICAgICAgICAgIHtlcnJvci5kYXRlID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5kYXRlfTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Ym1pdEJ0blwiIG9uQ2xpY2s9e3RoaXMuc3VibWl0TmV3RXhwZW5zZX0+RG9uZTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCB7TmF2TGlua30gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNsYXNzIE5vdEZvdW5kIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLmJpbmQodGhpcyk7XG4gIH1cblxuICBoZWFkKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0PlxuICAgICAgICA8dGl0bGU+UGFnZSBOb3QgRm91bmQ8L3RpdGxlPlxuICAgICAgPC9IZWxtZXQ+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuaGVhZCgpfVxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT5Tb3JyeSwgdGhlIHBhZ2UgeW91IGFyZSBleHBlY3RpbmcgZG9lcyBub3QgZXhpc3QhPC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpIG9uQ2xpY2s9IHsoKSA9PiB0aGlzLnByb3BzLmhpc3RvcnkuZ29CYWNrKCl9PiBcbiAgICAgICAgICAgICAgQmFja1xuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPE5hdkxpbmsgdG89Jy8nPiBIb21lIDwvTmF2TGluaz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxOYXZMaW5rIHRvPScvbG9naW4nPiBMb2dpbiA8L05hdkxpbms+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTm90Rm91bmQ7IiwiZXhwb3J0IGNvbnN0IE1PTlRIID0gJ21vbnRoJztcbmV4cG9ydCBjb25zdCBZRUFSID0gJ3llYXInO1xuZXhwb3J0IGNvbnN0IFdFRUsgPSAnd2Vlayc7XG5leHBvcnQgY29uc3QgRElWSVNJT05MRU5HVEggPSB7IG1vbnRoOiAzMSwgeWVhcjogMTIsIHdlZWs6IDd9OyBcbmV4cG9ydCBjb25zdCBNT05USFNOQU1FID0gWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ107XG5leHBvcnQgY29uc3QgIE1PTlRIU05BTUVTSE9SVCA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0Jyb3dzZXJSb3V0ZXIsIFN3aXRjaCwgUm91dGV9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCBMb2dpbiBmcm9tICcuLi9jb21wb25lbnRzL0xvZ2luJztcbmltcG9ydCBOb3RGb3VuZCBmcm9tICcuLi9jb21wb25lbnRzL05vdEZvdW5kJ1xuaW1wb3J0IEhvbWUgZnJvbSAnLi4vY29tcG9uZW50cy9Ib21lJztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxTd2l0Y2g+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD0nL2xvZ2luJyBleGFjdCByZW5kZXI9eyhwcm9wcykgPT4gPExvZ2luIHsuLi5wcm9wc30vPn0vPlxuICAgICAgICAgICAgey8qIDxSb3V0ZSBwYXRoPScvbG9naW4nIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8TG9naW4gey4uLnByb3BzfS8+fS8+ICovfVxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9Jy9ob21lJyBleGFjdCByZW5kZXI9eyhwcm9wcykgPT4gPEhvbWUgey4uLnByb3BzfS8+fS8+XG4gICAgICAgICAgICB7LyogPFJvdXRlIHBhdGg9Jy8nIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8SG9tZSB7Li4ucHJvcHN9Lz59Lz4gKi99XG4gICAgICAgICAgICB7LyogPFJvdXRlIHBhdGg9JyonIHJlbmRlcj17KHByb3BzKSA9PiA8Tm90Rm91bmQgey4uLnByb3BzfS8+fS8+ICovfVxuICAgICAgICA8L1N3aXRjaD5cbiAgICApO1xufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbm5lY3QtbW9uZ29cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLXNlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaGVsbWV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=