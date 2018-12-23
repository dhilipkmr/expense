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
  //process.env.PORT = 4000;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2FwaS9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvZGIvbW9uZ29vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9leHBlbnNlTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hcGlDYWxscy9BcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Ib21lLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL0xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05ld0V4cGVuc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvTm90Rm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbnN0YW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3JvdXRlcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29ubmVjdC1tb25nb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLXNlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiJdLCJuYW1lcyI6WyJzaWduVXAiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJib2R5IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImVtYWlsSWQiLCJ1c2VyIiwiVXNlcnMiLCJfaWQiLCJtb25nb29zZSIsIlR5cGVzIiwiT2JqZWN0SWQiLCJmaW5kIiwidGhlbiIsInJlcyIsImxlbmd0aCIsInNlbmQiLCJlcnJvciIsIm1zZyIsInNhdmUiLCJkb2MiLCJzZXNzaW9uIiwiX3VzZXJJZCIsImUiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwic2lnbkluIiwibmV3RXhwZW5zZSIsImFtb3VudCIsImNhdGVnb3J5IiwiZGF0ZSIsInR5cGUiLCJwYXJzZUludCIsIkRhdGUiLCJ3dyIsIk1hdGgiLCJjZWlsIiwiZ2V0RGF0ZSIsImRvdyIsImdldERheSIsIm1tIiwiZ2V0TW9udGgiLCJ5eSIsImdldEZ1bGxZZWFyIiwiZGQiLCJuZXdFeHBlbnNlSW5zdGFuY2UiLCJFeHBlbnNlcyIsInVzZXJfaWQiLCJlcnIiLCJnZXRFeHBlbnNlRGF0YSIsInVzZXJJZCIsImV4cGVuc2VEYXRlUmVzcG9uZGVyIiwiZGF0YSIsInJlc3BvbmQiLCJleHBlbnNlTGlzdCIsImluY29tZUxpc3QiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwic3BlbnQiLCJzdGFuZGluZyIsInRyYW5zYWN0aW9uTGlzdCIsInRyYW5zYWN0aW9uIiwicGVyY2VudCIsInJvdW5kIiwiZ3JvdXAxIiwiJGdyb3VwIiwiJHN1bSIsImdyb3VwMiIsIiRwdXNoIiwidW53aW5kIiwiJHVud2luZCIsInNvcnQiLCIkc29ydCIsInJlR3JvdXAiLCJ0YWIiLCJZRUFSIiwiYWdncmVnYXRlIiwiJG1hdGNoIiwiJHByb2plY3QiLCJhbGxvd0Rpc2tVc2UiLCJleGVjIiwiTU9OVEgiLCJXRUVLIiwiZ2V0RXhwZW5zZVN1bW1hcnkiLCJleGVjU3VtbWFyeVF1ZXJ5IiwicGVyRGl2aXNpb25EYXRhIiwibWF4QW1vdW50IiwiTnVtYmVyIiwiTUlOX1NBRkVfSU5URUdFUiIsImZvckVhY2giLCJlbnRyeSIsIm1vbnRoIiwidG90YWxBbW91bnQiLCJkaXZpc2lvbiIsImVudiIsInByb2Nlc3MiLCJNT05HT0xBQl9VUkkiLCJtb25nb29zZTEiLCJyZXF1aXJlIiwiUHJvbWlzZSIsImdsb2JhbCIsImNvbm5lY3QiLCJ1c2VNb25nb0NsaWVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJtb2RlbCIsIlNjaGVtYSIsInJlZiIsInJlcXVpcmVkIiwidHJpbSIsIlN0cmluZyIsImRlZmF1bHQiLCJub3ciLCJtaW5sZW5ndGgiLCJleHBlbnNlIiwiTW9uZ29TdG9yZSIsImFwcCIsInBvcnQiLCJQT1JUIiwidXNlIiwic2VjcmV0Iiwic3RvcmUiLCJ1cmwiLCJib2R5UGFyc2VyIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwianNvbiIsImV4cHJlc3MiLCJzdGF0aWMiLCJwb3N0IiwibG9hZEh0bWwiLCJjb250ZW50IiwiaGVsbWV0IiwiSGVsbWV0IiwicmVuZGVyU3RhdGljIiwibWV0YSIsInRvU3RyaW5nIiwidGl0bGUiLCJnZXQiLCJyZXEiLCJjb250ZXh0IiwiUmVhY3RET01TZXJ2ZXIiLCJyZW5kZXJUb1N0cmluZyIsInRlbXBsYXRlIiwibGlzdGVuIiwiQXBwIiwiQ29tcG9uZW50Iiwic2lnbnVwIiwicGFyYW1zIiwiYXhpb3MiLCJzaWduaW4iLCJuZXdfZXhwZW5zZSIsImdldF9leHBlbnNlX2RhdGEiLCJnZXRfZXhwZW5zZV9zdW1tYXJ5IiwiV0lEVEgiLCJIRUlHSFQiLCJHcmFwaCIsInByb3BzIiwiZ2VuZXJhdGVTVkciLCJiaW5kIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImFsZXJ0IiwicGxvdERhdGEiLCJ4Q29vcmRpbmF0ZXMiLCJ5Q29vcmRpbmF0ZXMiLCJESVZJU0lPTkxFTkdUSCIsIm1heEFtdCIsInhDb29yZGluYXRlRGl2TGVuZ3RoIiwibGFzdERpdmlzaW9uIiwic3RyIiwicHVzaCIsImxhc3RYIiwiaSIsIm1hcmdpbiIsIkhvbWUiLCJsZWZ0TWVudUNsaWNrIiwibmF2aWdhdGVUb1NpZ25JbiIsInN0YXRlIiwiYWN0aXZlVGFiIiwic2hvd05ld0V4cGVuc2UiLCJ1bmRlZmluZWQiLCJ2aWV3TW9yZSIsInZpZXdlZE1vcmUiLCJnZXRFeHBlbnNlIiwicmVzcCIsInNldFN0YXRlIiwicmVmcyIsImJhY2tEcm9wIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicG9wdXAiLCJmaXJzdEhhbGZMYW5kaW5nVHh0Iiwib3RoZXJIYWxmTGFuZGluZ1R4dCIsImhpc3RvcnkiLCJ2YWwiLCJ0cmFuc2FjdGVkQ2FyZCIsInNjcm9sbFRvcCIsImluZGV4IiwibWF4V2lkdGgiLCJoYXNEYXRhIiwicmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQiLCJzaWduZWRJbiIsImNsaWNrVmlld01vcmUiLCJjdXJyTW9udGgiLCJNT05USFNOQU1FIiwiY3VyckRhdGUiLCJyZW5kZXJMZWZ0TWVudUJhciIsImdldEN1cnJlbnREYXRlIiwiY2hhbmdlRXhwZW5zZURheUZvcm1hdCIsImdldFRyYW5zYWN0aW9uQ2FyZCIsIkxvZ2luIiwiaGVhZCIsIndpdGhUZXN0Q3JlZHMiLCJjYXRjaCIsInRhcmdldCIsInZhbHVlIiwiTmV3RXhwZW5zZSIsInNlbGVjdFR5cGUiLCJzdWJtaXROZXdFeHBlbnNlIiwiZGF5IiwieWVhciIsImN1cnJlbnQiLCJuZXh0IiwiZm9jdXMiLCJkYXRlUmVnIiwidGVzdCIsInJlZyIsImlzVmFsaWREYXRlIiwiaXNWYWxpZGF0aW9uU3VjY2VzcyIsInZhbGlkYXRlUGFyYW1zIiwib3B0aW9ucyIsIk1PTlRIU05BTUVTSE9SVCIsImNoYW5nZUFtb3VudCIsImNoYW5nZURhdGUiLCJyZW5kZXJPcHRpb25zIiwiTm90Rm91bmQiLCJnb0JhY2siLCJ3ZWVrIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFTyxJQUFNQSwwQkFBUyxTQUFUQSxNQUFTLENBQUNDLE9BQUQsRUFBVUMsUUFBVixFQUF1QjtBQUN6QztBQUR5Qyx3QkFFY0QsUUFBUUUsSUFGdEI7QUFBQSw4Q0FFakNDLFFBRmlDO0FBQUEsUUFFakNBLFFBRmlDLHlDQUV0QixFQUZzQjtBQUFBLDhDQUVsQkMsUUFGa0I7QUFBQSxRQUVsQkEsUUFGa0IseUNBRVAsRUFGTztB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ZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NlcnZlci9zZXJ2ZXIuanNcIik7XG4iLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IGFwcCBmcm9tICcuLi9zZXJ2ZXInXG5pbXBvcnQgRXhwZW5zZXMgZnJvbSAnLi4vbW9kZWxzL2V4cGVuc2VNb2RlbCc7XG5pbXBvcnQgVXNlcnMgZnJvbSAnLi4vbW9kZWxzL3VzZXJNb2RlbCc7XG5pbXBvcnQgeyBNT05USCwgWUVBUiwgV0VFSyB9IGZyb20gJy4uLy4uL3NyYy9wYWdlcy9jb25zdGFudHMvY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IHNpZ25VcCA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIC8vIFVzZXJzLmRlbGV0ZU1hbnkoe30pO1xuICAgIGNvbnN0IHsgdXNlcm5hbWUgPSAnJywgcGFzc3dvcmQgPSAnJywgZW1haWxJZCA9ICcnIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgdmFyIHVzZXIgPSBuZXcgVXNlcnMoe1xuICAgICAgICBfaWQ6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKCksXG4gICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICBlbWFpbElkOiBlbWFpbElkXG4gICAgfSk7XG4gICAgVXNlcnMuZmluZCh7IHVzZXJuYW1lOiB1c2VybmFtZSB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IHRydWUsIG1zZzogJ1VzZXJuYW1lIGFscmVhZHkgRXhpc3RzJyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oKGRvYykgPT4ge1xuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID0gZG9jLl9pZDtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IGZhbHNlLCBtc2c6ICdTYXZlZCBTdWNjZXNzZnVsbHknIH0pO1xuICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zdGF0dXMoNTAwKS5zZW5kKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCAoZSkgPT4ge1xuICAgICAgICByZXNwb25zZS5zZW5kKGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaWduSW4gPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCB7IHVzZXJuYW1lID0gJycsIHBhc3N3b3JkID0gJycsIGVtYWlsSWQgPSAnJyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGNvbnNvbGUubG9nKHJlcXVlc3Quc2Vzc2lvbi51c2VyKTtcbiAgICBVc2Vycy5maW5kKHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVxdWVzdC5zZXNzaW9uLl91c2VySWQgPSByZXNbMF0uX2lkO1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiBmYWxzZSwgbXNnOiAnc3VjY2VzcycgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IHRydWUsIG1zZzogJ05vIHVzZXIgYWNjb3VudCBmb3VuZCcgfSk7XG4gICAgICAgIH1cbiAgICB9LCAoZSkgPT4ge1xuICAgICAgICByZXNwb25zZS5zZW5kKGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBuZXdFeHBlbnNlID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgbGV0IHsgYW1vdW50LCBjYXRlZ29yeSwgZGF0ZSwgdHlwZSB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGFtb3VudCA9IHBhcnNlSW50KGFtb3VudCk7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIGNvbnN0IHd3ID0gTWF0aC5jZWlsKGRhdGUuZ2V0RGF0ZSgpIC8gNyk7XG4gICAgY29uc3QgZG93ID0gZGF0ZS5nZXREYXkoKSArIDE7XG4gICAgY29uc3QgbW0gPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IHl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IGRkID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgY29uc3QgbmV3RXhwZW5zZSA9IHsgYW1vdW50LCBjYXRlZ29yeSwgZGF0ZSwgdHlwZSwgd3csIGRvdywgbW0sIHl5LCBkZH07XG4gICAgdmFyIG5ld0V4cGVuc2VJbnN0YW5jZSA9IG5ldyBFeHBlbnNlcyh7XG4gICAgICAgIHVzZXJfaWQ6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKFwiNWMxNjMwYWQ3NjY5ZWEyYzliYjA0NjE2XCIpLFxuICAgICAgICAuLi5uZXdFeHBlbnNlXG4gICAgfSk7XG4gICAgbmV3RXhwZW5zZUluc3RhbmNlLnNhdmUoKS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgLy8gcmVxdWVzdC5zZXNzaW9uLnVzZXIgPSBkb2MudXNlcm5hbWU7XG4gICAgICAgIHJlc3BvbnNlLnNlbmQoZG9jKTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gc2F2ZSBuZXcgRXhwZW5zZScsIGVycik7XG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyg1MDApLnNlbmQoZXJyKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRGF0YSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IHJlcXVlc3Quc2Vzc2lvbi51c2VyX2lkID8gbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQocmVxdWVzdC5zZXNzaW9uLnVzZXJfaWQpIDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoXCI1YzE2MzBhZDc2NjllYTJjOWJiMDQ2MTZcIik7XG4gICAgZnVuY3Rpb24gZXhwZW5zZURhdGVSZXNwb25kZXIoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJlc3BvbmQuc2VuZCg1MDApLnNlbmQoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBleHBlbnNlTGlzdCwgaW5jb21lTGlzdDtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFba2V5XS50eXBlID09PSAnZXhwZW5zZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZW5zZUxpc3QgPSBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhW2tleV0udHlwZSA9PT0gJ2luY29tZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jb21lTGlzdCA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBzcGVudCwgc3RhbmRpbmc7XG4gICAgICAgICAgICBpZiAoZXhwZW5zZUxpc3QpIHtcbiAgICAgICAgICAgICAgICBleHBlbnNlTGlzdC50cmFuc2FjdGlvbkxpc3QubWFwKCh0cmFuc2FjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyY2VudCA9IHRyYW5zYWN0aW9uLmFtb3VudCAvIChleHBlbnNlTGlzdC5hbW91bnQgLyAxMDApO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5wZXJjZW50ID0gTWF0aC5yb3VuZChwZXJjZW50ICogMTAwKSAvIDEwMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzcGVudCA9IGV4cGVuc2VMaXN0LmFtb3VudDtcbiAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgIHNwZW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmNvbWVMaXN0KSB7XG4gICAgICAgICAgICAgICAgaW5jb21lTGlzdC50cmFuc2FjdGlvbkxpc3QubWFwKCh0cmFuc2FjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyY2VudCA9IHRyYW5zYWN0aW9uLmFtb3VudCAvIChpbmNvbWVMaXN0LmFtb3VudCAvIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLnBlcmNlbnQgPSBNYXRoLnJvdW5kKHBlcmNlbnQgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YW5kaW5nID0gaW5jb21lTGlzdC5hbW91bnQgLSBzcGVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhbmRpbmcgPSAwIC0gc3BlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHNwZW50LCBzdGFuZGluZyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFF1ZXJpZXMgc3RhcnRcbiAgICBjb25zdCBncm91cDEgPSB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7IGNhdGVnb3J5OiAnJGNhdGVnb3J5JywgdHlwZTogJyR0eXBlJyB9LFxuICAgICAgICAgICAgdHlwZTogeyAnJGZpcnN0JzogJyR0eXBlJyB9LFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHsgJyRmaXJzdCc6ICckY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJHN1bTogJyRhbW91bnQnIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZ3JvdXAyID0ge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDogeyB0eXBlOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJHN1bTogJyRhbW91bnQnIH0sXG4gICAgICAgICAgICB0eXBlOiB7ICckZmlyc3QnOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3Q6IHsgJHB1c2g6IHsgY2F0ZWdvcnk6ICckY2F0ZWdvcnknLCBhbW91bnQ6ICckYW1vdW50JyB9IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgdW53aW5kID0geyAkdW53aW5kOiAnJHRyYW5zYWN0aW9uTGlzdCcgfTtcbiAgICBjb25zdCBzb3J0ID0geyAkc29ydDogeyAndHJhbnNhY3Rpb25MaXN0LmFtb3VudCc6IC0xIH0gfVxuICAgIGNvbnN0IHJlR3JvdXAgPSB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7IHR5cGU6ICckdHlwZScgfSxcbiAgICAgICAgICAgIGFtb3VudDogeyAnJGZpcnN0JzogJyRhbW91bnQnIH0sXG4gICAgICAgICAgICB0eXBlOiB7ICckZmlyc3QnOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3Q6IHsgJHB1c2g6ICckdHJhbnNhY3Rpb25MaXN0JyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIFF1ZXJpZXMgZW5kXG5cbiAgICBjb25zdCB7IHRhYiwgd3csIG1tLCB5eSwgZG93IH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgaWYgKHRhYiA9PT0gWUVBUikge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IE1PTlRIKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0seyAkbWF0Y2g6IHsgbW06IHBhcnNlSW50KG1tKSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IFdFRUspIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9IH0sXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB5eTogcGFyc2VJbnQoeXkpIH0gfSx7ICRtYXRjaDogeyBtbTogcGFyc2VJbnQobW0pIH0gfSx7ICRtYXRjaDogeyB3dzogcGFyc2VJbnQod3cpIH0gfSxcbiAgICAgICAgICAgIHsgLi4uZ3JvdXAxIH0seyAuLi5ncm91cDIgfSxcbiAgICAgICAgICAgIHsgLi4udW53aW5kIH0seyAuLi5zb3J0IH0seyAuLi5yZUdyb3VwIH0sXG4gICAgICAgICAgICB7ICRwcm9qZWN0OiB7IF9pZDogMCwgYW1vdW50OiAxLCB0eXBlOiAxLCB0cmFuc2FjdGlvbkxpc3Q6IDEgfSB9XG4gICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4cGVuc2VEYXRlUmVzcG9uZGVyKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVN1bW1hcnkgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBmdW5jdGlvbiBleGVjU3VtbWFyeVF1ZXJ5KGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZXNwb25kLnNlbmQoNTAwKS5zZW5kKGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhWzBdICYmIGRhdGFbMF0ucGVyRGl2aXNpb25EYXRhKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1heEFtb3VudCA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSO1xuICAgICAgICAgICAgICAgIGRhdGFbMF0ucGVyRGl2aXNpb25EYXRhLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF4QW1vdW50IDwgZW50cnkuYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhBbW91bnQgPSBlbnRyeS5hbW91bnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRhdGFbMF0ubWF4QW1vdW50ID0gbWF4QW1vdW50O1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoey4uLmRhdGFbMF19KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHVzZXJJZCA9IHJlcXVlc3Quc2Vzc2lvbi51c2VyX2lkID8gbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQocmVxdWVzdC5zZXNzaW9uLnVzZXJfaWQpIDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoXCI1YzE2MzBhZDc2NjllYTJjOWJiMDQ2MTZcIik7XG4gICAgY29uc3Qge3RhYiwgeXksIG1tLCB3d30gPSByZXF1ZXN0LmJvZHk7XG4gICAgaWYgKHRhYiA9PT0gWUVBUikge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHl5OiB5eX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB0eXBlOiAnZXhwZW5zZSd9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiB7IG1tOiAnJG1tJ30sIGFtb3VudDogeyRzdW06ICckYW1vdW50J30sIG1vbnRoOiB7JyRmaXJzdCc6ICckbW0nfX19LFxuICAgICAgICAgICAgeyRzb3J0OiB7IG1vbnRoOiAxIH19LFxuICAgICAgICAgICAgeyRncm91cDoge19pZDogbnVsbCwgdG90YWxBbW91bnQ6IHsnJHN1bSc6ICckYW1vdW50J30sIHBlckRpdmlzaW9uRGF0YTogeyRwdXNoIDogeyBhbW91bnQ6ICckYW1vdW50JywgZGl2aXNpb246ICckbW9udGgnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDogMH19XG4gICAgICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleGVjU3VtbWFyeVF1ZXJ5KTtcbiAgICB9IGVsc2UgaWYgKHRhYiA9PT0gTU9OVEgpIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkIH19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB5eTogeXl9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgbW06IG1tfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHR5cGU6ICdleHBlbnNlJ319LFxuICAgICAgICAgICAgeyRncm91cDogeyBfaWQ6IHtkZDogJyRkZCd9LCBhbW91bnQ6IHsnJHN1bSc6ICckYW1vdW50J30sIGRkOiB7JyRmaXJzdCc6ICckZGQnfSB9fSxcbiAgICAgICAgICAgIHskc29ydDoge2RkOiAxfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7X2lkOiBudWxsLCB0b3RhbEFtb3VudDogeyckc3VtJzogJyRhbW91bnQnfSwgcGVyRGl2aXNpb25EYXRhOiB7JHB1c2g6IHthbW91bnQ6ICckYW1vdW50JywgZGl2aXNpb246ICckZGQnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDowfX1cbiAgICAgICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4ZWNTdW1tYXJ5UXVlcnkpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBXRUVLKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgeXk6IHl5fX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IG1tOiBtbX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB3dzogd3d9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdHlwZTogJ2V4cGVuc2UnfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7IF9pZDoge2RvdzogJyRkb3cnfSwgYW1vdW50OiB7JHN1bTogJyRhbW91bnQnfSwgZG93OiB7JyRmaXJzdCc6ICckZG93J319fSxcbiAgICAgICAgICAgIHskc29ydDogeyBkb3c6IDF9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiBudWxsLCB0b3RhbEFtb3VudDogeyRzdW06ICckYW1vdW50J30sICBwZXJEaXZpc2lvbkRhdGE6IHskcHVzaDoge2Ftb3VudDogJyRhbW91bnQnLCBkaXZpc2lvbjogJyRkb3cnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDogMH19XG4gICAgICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleGVjU3VtbWFyeVF1ZXJ5KTtcbiAgICB9XG59IiwidmFyIGVudiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCc7XG5cbmlmIChlbnYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgLy9wcm9jZXNzLmVudi5QT1JUID0gNDAwMDtcbiAgLy8gcHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJID0gJ21vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvZXhwZW5zZSc7XG4gIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSA9ICdtb25nb2RiOi8vZGhpbGlwazEzOmRoaWxpcGsxM0BkczI0NzMxMC5tbGFiLmNvbTo0NzMxMC9leHBlbnNlJztcbn0gZWxzZSB7XG4gIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSA9ICdtb25nb2RiOi8vZGhpbGlwazEzOmRoaWxpcGsxM0BkczI0NzMxMC5tbGFiLmNvbTo0NzMxMC9leHBlbnNlJztcbn1cbi8vIGV4cG9ydCBkZWZhdWx0IGVudjtcbiIsInZhciBtb25nb29zZTEgPSByZXF1aXJlKCdtb25nb29zZScpO1xubW9uZ29vc2UxLlByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbm1vbmdvb3NlMS5jb25uZWN0KHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSwgeyB1c2VNb25nb0NsaWVudDogdHJ1ZSB9KS50aGVuKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkIHRvIERiJyk7XG59LChlKT0+IHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB7bW9uZ29vc2UxfTtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgVXNlcnMgZnJvbSAnLi91c2VyTW9kZWwnO1xuXG5jb25zdCBFeHBlbnNlcyA9IG1vbmdvb3NlLm1vZGVsKCdFeHBlbnNlcycsIHtcbiAgdXNlcl9pZDoge1xuICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICByZWY6ICdVc2VycydcbiAgfSxcbiAgYW1vdW50OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHRyaW06IHRydWVcbiAgfSxcbiAgY2F0ZWdvcnk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICAgIGRlZmF1bHQ6ICdvdGhlcnMnXG4gIH0sXG4gIHR5cGU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWUsXG4gICAgZGVmYXVsdDogJ2V4cGVuc2UnXG4gIH0sXG4gIGRhdGU6IHtcbiAgICB0eXBlOiBEYXRlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlLFxuICAgIGRlZmF1bHQ6IERhdGUubm93KClcbiAgfSxcbiAgZGQ6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgd3c6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgZG93OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIG1tOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIHl5OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZXM7IiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBFeHBlbnNlcyBmcm9tICcuL2V4cGVuc2VNb2RlbCc7XG5cbmNvbnN0IFVzZXJzID0gbW9uZ29vc2UubW9kZWwoJ1VzZXJzJywge1xuICAgIF9pZDogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuICAgIHVzZXJuYW1lOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbmxlbmd0aDogNSxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgZW1haWxJZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWlubGVuZ3RoOiA4LFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBleHBlbnNlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCwgXG4gICAgICAgICAgICByZWY6ICdFeHBlbnNlcydcbiAgICAgICAgfVxuICAgIF1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgVXNlcnM7IiwicmVxdWlyZSgnLi9jb25maWcvY29uZmlnJyk7XG5pbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCBlbnYgZnJvbSAnLi9jb25maWcvY29uZmlnJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTVNlcnZlciBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG52YXIgc2Vzc2lvbiA9IHJlcXVpcmUoJ2V4cHJlc3Mtc2Vzc2lvbicpO1xuXG5pbXBvcnQgQXBwIGZyb20gJy4uL3NyYy9hcHAnXG5pbXBvcnQgbW9uZ29vc2UxIGZyb20gJy4vZGIvbW9uZ29vc2UnO1xuaW1wb3J0IHtzaWduVXAsIHNpZ25JbiwgbmV3RXhwZW5zZSwgZ2V0RXhwZW5zZURhdGEsIGdldEV4cGVuc2VTdW1tYXJ5fSBmcm9tICcuL2FwaS9hcGlDYWxscyc7XG5jb25zdCBNb25nb1N0b3JlID0gcmVxdWlyZSgnY29ubmVjdC1tb25nbycpKHNlc3Npb24pO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVDtcblxuLy8gYXBwLnVzZShzZXNzaW9uKHtcbi8vICAgICBzZWNyZXQ6ICdkaGlsaXBMb2NhbCcsXG4vLyAgICAgcmVzYXZlOiBmYWxzZSxcbi8vICAgICBzYXZlVW5pbml0aWFsaXplZDogdHJ1ZSxcbi8vICAgICB1cmw6IHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSVxuLy8gfSkpXG5hcHAudXNlKHNlc3Npb24oe1xuICAgIHNlY3JldDogJ2ZvbycsXG4gICAgc3RvcmU6IG5ldyBNb25nb1N0b3JlKHtcbiAgICAgICAgdXJsOiBwcm9jZXNzLmVudi5NT05HT0xBQl9VUklcbiAgICB9KVxufSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKCdidWlsZC9wdWJsaWMnKSk7XG5hcHAudXNlKCcvc3R5bGVzJywgZXhwcmVzcy5zdGF0aWMoJ3NyYy9wYWdlcy9zdHlsZXMnKSk7XG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKCdzcmMvcGFnZXMvc3RhdGljJykpO1xuXG4vLyBBUEkgQ2FsbHNcbmFwcC5wb3N0KCcvc2lnbnVwJywgc2lnblVwKTtcbmFwcC5wb3N0KCcvc2lnbmluJywgc2lnbkluKTtcbmFwcC5wb3N0KCcvbmV3X2V4cGVuc2UnLCBuZXdFeHBlbnNlKTtcbmFwcC5wb3N0KCcvZ2V0X2V4cGVuc2VfZGF0YScsIGdldEV4cGVuc2VEYXRhKTtcbmFwcC5wb3N0KCcvZ2V0X2V4cGVuc2Vfc3VtbWFyeScsIGdldEV4cGVuc2VTdW1tYXJ5KTtcblxuY29uc3QgbG9hZEh0bWwgPSAoY29udGVudCkgPT4ge1xuICAgIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcbiAgICByZXR1cm4gKGBcbiAgICAgICAgPGh0bWw+XG4gICAgICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgICAgICAke2hlbG1ldC5tZXRhLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgJHtoZWxtZXQudGl0bGUudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvdHdpdHRlci1ib290c3RyYXAvNC4xLjMvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy90d2l0dGVyLWJvb3RzdHJhcC80LjEuMy9qcy9ib290c3RyYXAuYnVuZGxlLm1pbi5qc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9jb21tb24uY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL2hvbWUuY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL2xvZ2luLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9uZXdfZXhwZW5zZS5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2Fuc1wiIHJlbD1cInN0eWxlc2hlZXRcIj5cbiAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgIDxib2R5PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyb290XCI+JHtjb250ZW50fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiY2xpZW50X2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICAgICAgPC9ib2R5PlxuICAgICAgICA8L2h0bWw+YCk7XG59O1xuXG5hcHAuZ2V0KCcqJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHt9O1xuICAgIGNvbnN0IGNvbnRlbnQgPSBSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0cmluZyhcbiAgICAgICAgPFN0YXRpY1JvdXRlcj5cbiAgICAgICAgICAgIDxBcHAgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9IC8+XG4gICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICk7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBsb2FkSHRtbChjb250ZW50KTtcbiAgICByZXMuc2VuZCh0ZW1wbGF0ZSk7XG59KTtcblxuYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ3Byb2Nlcy5lbnYnLCBwb3J0LCBwcm9jZXNzLmVudi5NT05HT0xBQl9VUkkpO1xuICAgIGNvbnNvbGUubG9nKCdTZXJ2ZXIgU3RhcnRlZCBvbiBQb3J0OiAnLCBwb3J0KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhcHA7XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN3aXRjaCwgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IEhvbWUgZnJvbSAnLi9wYWdlcy9jb21wb25lbnRzL0xvZ2luJztcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi9wYWdlcy9yb3V0ZXMvcm91dGVzJztcbmltcG9ydCB7U2VydmVyUm91dGVyfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Um91dGVzLz5cbiAgICAgICAgKTtcbiAgICB9XG59IiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGNvbnN0IHNpZ251cCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9zaWdudXAvJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBzaWduaW4gPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvc2lnbmluLyc7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgey4uLnBhcmFtc30pO1xufVxuXG5leHBvcnQgY29uc3QgbmV3X2V4cGVuc2UgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvbmV3X2V4cGVuc2UvJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRfZXhwZW5zZV9kYXRhID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL2dldF9leHBlbnNlX2RhdGEvJyA7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgcGFyYW1zKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldF9leHBlbnNlX3N1bW1hcnkgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvZ2V0X2V4cGVuc2Vfc3VtbWFyeS8nIDtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCBwYXJhbXMpO1xufVxuIiwiXG5jb25zdCBXSURUSCA9IDE1MDtcbmNvbnN0IEhFSUdIVCA9IDEwMDtcblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0RJVklTSU9OTEVOR1RIfSBmcm9tICcuLi9jb25zdGFudHMvY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmdlbmVyYXRlU1ZHID0gdGhpcy5nZW5lcmF0ZVNWRy5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29ucmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFsZXJ0KCdhdHRhY2hFdmVudCAtIHJlc2l6ZScpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVTVkcoKSB7XG4gICAgY29uc3Qge3Bsb3REYXRhLCB0YWJ9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB4Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICBjb25zdCB5Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICBjb25zdCBsZW5ndGggPSBESVZJU0lPTkxFTkdUSFt0YWJdO1xuICAgIGNvbnN0IG1heEFtdCA9IHBsb3REYXRhLm1heEFtb3VudDtcbiAgICBjb25zdCB4Q29vcmRpbmF0ZURpdkxlbmd0aCA9IChXSURUSCAvIChsZW5ndGggKyAyKSk7XG4gICAgbGV0IGxhc3REaXZpc2lvbiA9IDA7XG4gICAgbGV0IHN0ciA9ICcnO1xuXG4gICAgLyogVG8gc3RhcnQgdGhlIGdyYXBoIGF0IHRoZSBMZWFzdCBQb2ludCAqL1xuICAgIHhDb29yZGluYXRlcy5wdXNoKDApO1xuICAgIHlDb29yZGluYXRlcy5wdXNoKEhFSUdIVCk7XG4gICAgcGxvdERhdGEucGVyRGl2aXNpb25EYXRhLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICB3aGlsZSAoZW50cnkuZGl2aXNpb24gPiBsYXN0RGl2aXNpb24pIHtcbiAgICAgICAgY29uc3QgbGFzdFggPSB4Q29vcmRpbmF0ZXNbeENvb3JkaW5hdGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICB4Q29vcmRpbmF0ZXMucHVzaCgobGFzdFggKyB4Q29vcmRpbmF0ZURpdkxlbmd0aCkpO1xuICAgICAgICBpZiAoZW50cnkuZGl2aXNpb24gPT09IGxhc3REaXZpc2lvbiArIDEpIHtcbiAgICAgICAgICBjb25zdCBwZXJjZW50ID0gKChlbnRyeS5hbW91bnQgLyBtYXhBbXQpICogMTAwKTtcbiAgICAgICAgICB5Q29vcmRpbmF0ZXMucHVzaChIRUlHSFQgLSAoKEhFSUdIVCAvIDEwMCkgKiBwZXJjZW50KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0RGl2aXNpb24gPSBsYXN0RGl2aXNpb24gKyAxO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGxhc3RYID0geENvb3JkaW5hdGVzW3hDb29yZGluYXRlcy5sZW5ndGggLSAxXTtcbiAgICB4Q29vcmRpbmF0ZXMucHVzaCgobGFzdFggKyB4Q29vcmRpbmF0ZURpdkxlbmd0aCkpO1xuICAgIHlDb29yZGluYXRlcy5wdXNoKEhFSUdIVCk7XG4gXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB4Q29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN0ciArPSAnICcgKyB4Q29vcmRpbmF0ZXNbaV0gKyAnLCcgKyB5Q29vcmRpbmF0ZXNbaV0gKyAnICc7XG4gICAgfVxuICAgIGlmIChzdHIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PXsnMCAwICcgKyBXSURUSCArICcgJyArIEhFSUdIVH0gc3R5bGU9e3ttYXJnaW46ICcyMHB4J319PlxuICAgICAgICAgICAgPHBvbHlsaW5lIHBvaW50cz17c3RyfSBjbGFzc05hbWU9XCJncmFwaFBsb3RMaW5lXCIgLz5cbiAgICAgICAgICAgIHsvKiA8ZyBzdHlsZT17e3N0cm9rZTogJyNjY2MnLCBzdHJva2VEYXNoYXJyYXk6IDAsIHN0cm9rZVdpZHRoOiAxfX0+XG4gICAgICAgICAgICAgIDxsaW5lIHgxPVwiMFwiIHkxPVwiMjAwXCIgeDI9XCIwXCIgeTI9XCIwXCI+PC9saW5lPlxuICAgICAgICAgICAgPC9nPiAqL31cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5nZW5lcmF0ZVNWRygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IE5ld0V4cGVuc2UgZnJvbSAnLi9OZXdFeHBlbnNlJztcbmltcG9ydCB7Z2V0X2V4cGVuc2VfZGF0YSwgZ2V0X2V4cGVuc2Vfc3VtbWFyeX0gZnJvbSAnLi4vYXBpQ2FsbHMvQXBpQ2FsbHMnO1xuaW1wb3J0IHtNT05USCwgWUVBUiwgV0VFSywgTU9OVEhTTkFNRX0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbnN0YW50cyc7XG5pbXBvcnQgR3JhcGggZnJvbSAnLi9HcmFwaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmxlZnRNZW51Q2xpY2sgPSB0aGlzLmxlZnRNZW51Q2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm5ld0V4cGVuc2UgPSB0aGlzLm5ld0V4cGVuc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm5hdmlnYXRlVG9TaWduSW4gPSB0aGlzLm5hdmlnYXRlVG9TaWduSW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYWN0aXZlVGFiOiBNT05USCxcbiAgICAgIHNob3dOZXdFeHBlbnNlOiBmYWxzZSxcbiAgICAgIHN0YW5kaW5nOiB1bmRlZmluZWQsXG4gICAgICBzcGVudDogdW5kZWZpbmVkLFxuICAgICAgZXhwZW5zZUxpc3Q6IHt9LFxuICAgICAgaW5jb21lTGlzdDoge30sXG4gICAgICB2aWV3TW9yZTogZmFsc2VcbiAgICB9XG4gICAgdGhpcy52aWV3ZWRNb3JlID0ge307XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5nZXRFeHBlbnNlKCk7XG4gICAgdGhpcy5nZXRFeHBlbnNlU3VtbWFyeSgpO1xuICB9XG5cbiAgZ2V0RXhwZW5zZVN1bW1hcnkoKSB7XG4gICAgY29uc3QgdGFiID0gdGhpcy5zdGF0ZS5hY3RpdmVUYWI7XG4gICAgY29uc3QgbW0gPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IGRvdyA9IG5ldyBEYXRlKCkuZ2V0RGF5KCk7XG4gICAgY29uc3Qgd3cgPSBNYXRoLmNlaWwobmV3IERhdGUoKS5nZXREYXRlKCkgLyA3KTtcbiAgICBjb25zdCB5eSA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7dGFiLCBtbSwgZG93LCB3dywgeXl9O1xuICAgIGdldF9leHBlbnNlX3N1bW1hcnkocGFyYW1zKS50aGVuKChyZXNwKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtwbG90RGF0YTogey4uLnJlc3AuZGF0YX19KTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIEdldCBFeHBlbnNlIFN1bW1hcnkgRGV0YWlscycsIGVycik7XG4gICAgfSk7XG4gIH1cblxuICBnZXRFeHBlbnNlKCkge1xuICAgIGxldCBleHBlbnNlTGlzdCA9IHt9LCBpbmNvbWVMaXN0ID0ge30sIHN0YW5kaW5nID0nJztcbiAgICBjb25zdCB0YWIgPSB0aGlzLnN0YXRlLmFjdGl2ZVRhYjtcbiAgICBjb25zdCBtbSA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgZG93ID0gbmV3IERhdGUoKS5nZXREYXkoKTtcbiAgICBjb25zdCB3dyA9IE1hdGguY2VpbChuZXcgRGF0ZSgpLmdldERhdGUoKSAvIDcpO1xuICAgIGNvbnN0IHl5ID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHt0YWIsIG1tLCBkb3csIHd3LCB5eX07XG4gICAgZ2V0X2V4cGVuc2VfZGF0YShwYXJhbXMpLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgY29uc3Qge2V4cGVuc2VMaXN0LCBpbmNvbWVMaXN0LCBzdGFuZGluZywgc3BlbnR9ID0gcmVzcC5kYXRhO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHN0YW5kaW5nLCBzcGVudH0pO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gR2V0IEV4cGVuc2UgRGV0YWlscycsIGVycik7XG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KGFjdGl2ZVRhYikge1xuICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZVRhYjogYWN0aXZlVGFiLCB2aWV3TW9yZTogZmFsc2V9LCAoKSA9PiB7XG4gICAgICB0aGlzLmdldEV4cGVuc2UoKTtcbiAgICAgIHRoaXMuZ2V0RXhwZW5zZVN1bW1hcnkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxlZnRNZW51Q2xpY2soKSB7XG4gICAgdGhpcy5yZWZzLmJhY2tEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2JhY2tEcm9wJyk7XG4gICAgdGhpcy5yZWZzLnBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ3JpZ2h0MCcpO1xuICAgIHRoaXMucmVmcy5maXJzdEhhbGZMYW5kaW5nVHh0LmNsYXNzTGlzdC50b2dnbGUoJ3NjYWxlOTAnKTtcbiAgICB0aGlzLnJlZnMub3RoZXJIYWxmTGFuZGluZ1R4dC5jbGFzc0xpc3QudG9nZ2xlKCdzY2FsZTkwJyk7XG4gIH1cblxuICBuYXZpZ2F0ZVRvU2lnbkluKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMpO1xuICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvbG9naW4nKTtcbiAgfVxuXG4gIHJlbmRlckxlZnRNZW51QmFyKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudUJhclwiPlxuICAgICAgICA8ZGl2IHJlZj1cInBvcHVwXCJjbGFzc05hbWU9XCJwb3B1cCB6aTIgXCIgb25DbGljaz17dGhpcy5sZWZ0TWVudUNsaWNrfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGVCYXIgaW4tYmwgZmxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIj5TZXR0aW5nczwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51LW9wdGlvblwiIG9uQ2xpY2s9e3RoaXMubmF2aWdhdGVUb1NpZ25Jbn0+U2lnbiBJbjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51LW9wdGlvblwiPkFib3V0IE1lPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIG5ld0V4cGVuc2UodmFsKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2hvd05ld0V4cGVuc2U6IHZhbH0pO1xuICB9XG5cbiAgY2xpY2tWaWV3TW9yZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt2aWV3TW9yZTogIXRoaXMuc3RhdGUudmlld01vcmV9KTtcbiAgICB0aGlzLnJlZnMudHJhbnNhY3RlZENhcmQuc2Nyb2xsVG9wID0gMDtcbiAgfVxuXG4gIHJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnN0YXRlLmV4cGVuc2VMaXN0LnRyYW5zYWN0aW9uTGlzdC5tYXAoKHRyYW5zYWN0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS52aWV3TW9yZSB8fCB0aGlzLnZpZXdlZE1vcmVbdGhpcy5zdGF0ZS5hY3RpdmVUYWJdIHx8ICF0aGlzLnN0YXRlLnZpZXdNb3JlICYmIGluZGV4IDwgMikge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnZpZXdNb3JlKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdlZE1vcmVbdGhpcy5zdGF0ZS5hY3RpdmVUYWJdID0gdHJ1ZTsgLy8gVG8gbm90IHJlbW92ZSBlbGVtZW50IGZyb20gRE9NIG9uIGNsaWNraW5nIHZpZXcgTW9yZSBhZ2FpblxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBrZXk9eyd0cmFuc2FjdGlvbl90eXBlXycgKyBpbmRleH0gY2xhc3NOYW1lPVwidHJhbnNhY3RlZENhcmRJbm5lclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRJbm5lcmhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRfbmFtZVwiPnt0cmFuc2FjdGlvbi5jYXRlZ29yeX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0X3BlcmNlbnQgXCI+e3RyYW5zYWN0aW9uLnBlcmNlbnQgKyAnICUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7LyogPHNwYW4gY2xhc3NOYW1lPVwiY2F0X25hbWUgbG9hZGVyXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9wZXJjZW50IGxvYWRlclwiPjwvc3Bhbj4gKi99XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzQmFyIGJsIHRleHRDZW50ZXIgbWFyZ2luVDI1XCIgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsbGVkXCIgc3R5bGU9IHt7bWF4V2lkdGg6IHRyYW5zYWN0aW9uLnBlcmNlbnQgKyAnJSd9fT5cbiAgICAgICAgICAgICAgICAgIHsvKiA8ZGl2IGNsYXNzTmFtZT1cImZpbGxlZFwiID48L2Rpdj4gKi99XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgKTtcbiAgfVxuXG4gIGdldFRyYW5zYWN0aW9uQ2FyZCgpIHtcbiAgICBjb25zdCB7YWN0aXZlVGFiLCB2aWV3TW9yZSA9IGZhbHNlfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgaGFzRGF0YSA9IHRoaXMuc3RhdGUuZXhwZW5zZUxpc3QgJiYgT2JqZWN0LmtleXModGhpcy5zdGF0ZS5leHBlbnNlTGlzdCkubGVuZ3RoID4gMDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiByZWY9XCJ0cmFuc2FjdGVkQ2FyZFwiIGNsYXNzTmFtZT17J3RyYW5zYWN0ZWRDYXJkIHRyYW5zaXRpb24xYSAnICsgKHZpZXdNb3JlID8gJ3Nob3dBbGxUcmFuc2FjdGlvbicgOiAnJyl9PlxuICAgICAgICAgICAge2hhc0RhdGEgP1xuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmFuc2FjdFNjcm9sbGVyXCI+XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gV0VFSyA/IHRoaXMucmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQoKSA6IG51bGx9XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gTU9OVEggPyB0aGlzLnJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKCkgOiBudWxsfVxuICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IFlFQVIgPyB0aGlzLnJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKCkgOiBudWxsfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PiA6IFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIHBhZFQyMCBtaDEwcFwiPlxuICAgICAgICAgICAgICA8ZGl2Pk5vIFRyYW5zYWN0aW9ucyBhZGRlZCA8L2Rpdj5cbiAgICAgICAgICAgICAge3R5cGVvZih3aW5kb3cpICE9PSAndW5kZWZpbmVkJyAmJiAhd2luZG93LnNpZ25lZEluICYmIDxkaXYgY2xhc3NOYW1lPVwicGFkVDEwIHBhZEIyMFwiPjxhIGhyZWY9XCIvbG9naW5cIj48c3Bhbj5TaWduIEluPC9zcGFuPjwvYT4gZm9yIFBhc3QgVHJhbnNhY3Rpb25zPC9kaXY+fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aWV3TW9yZUFycm93XCIgb25DbGljaz17KCkgPT4gdGhpcy5jbGlja1ZpZXdNb3JlKCl9PlxuICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9e3ZpZXdNb3JlID8gJ3JvdGF0ZVZpZXdNb3JlJyA6ICcnfSByZWY9XCJzdmdWaWV3TW9yZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNy40MSA3Ljg0TDEyIDEyLjQybDQuNTktNC41OEwxOCA5LjI1bC02IDYtNi02elwiLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnbmV3Q29udGFpbmVyICcgKyAoIWhhc0RhdGEgPyAncGFkVDEwJyA6ICcnKX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ld1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuZXdCdG5cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLm5ld0V4cGVuc2UodHJ1ZSl9PiArIGFkZCBOZXc8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICB9XG4gIGdldEN1cnJlbnREYXRlKCkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGN1cnJNb250aCA9IE1PTlRIU05BTUVbZGF0ZS5nZXRNb250aCgpXTtcbiAgICBjb25zdCBjdXJyRGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIHJldHVybiBjdXJyRGF0ZSArICcgJyArIGN1cnJNb250aCArICcgJyArIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7YWN0aXZlVGFiLCBzaG93TmV3RXhwZW5zZSwgc3RhbmRpbmcgPSB1bmRlZmluZWQsIHNwZW50ID0gdW5kZWZpbmVkLCB2aWV3TW9yZSA9IGZhbHNlLCBwbG90RGF0YSwgaW5jb21lTGlzdH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgcmVmPVwiYmFja0Ryb3BcIiBjbGFzc05hbWU9eyd0cmFuc2l0aW9uMmEgemkxICcgKyAoc2hvd05ld0V4cGVuc2UgPyAnYmFja0Ryb3AnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLm5ld0V4cGVuc2UoZmFsc2UpfT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJMZWZ0TWVudUJhcigpfVxuICAgICAgICAgIDxkaXYgcmVmPVwibWFpbkNvbnRlbnRcIiBjbGFzc05hbWU9XCJtYWluQ29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpcnN0LWhhbGYtbGFuZGluZ1wiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHJlZj1cImZpcnN0SGFsZkxhbmRpbmdUeHRcIiBjbGFzc05hbWU9XCJ0cmFuc2l0aW9uMF81IFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhbmRpbmdcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxlZnQtbWVudS1jb250YWluZXJcIiBvbkNsaWNrPXt0aGlzLmxlZnRNZW51Q2xpY2t9PjxpbWcgY2xhc3NOYW1lPVwibGVmdC1tZW51XCIgc3JjPVwiL2ltZy9tZW51LnN2Z1wiLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7LyogPHNwYW4gY2xhc3NOYW1lPVwicmlnaHQtbWVudS1jb250YWluZXJcIiBvbkNsaWNrPXsoKSA9PiB7dGhpcy5zZXRTdGF0ZSh7dmlzaWJsZVJpZ2h0TWVudTogdHJ1ZX0pfX0+PGltZyBjbGFzc05hbWU9XCJyaWdodC1tZW51XCIgc3JjPVwiL2ltZy9tZW51LnN2Z1wiLz48L3NwYW4+ICovfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmYiBmMTFcIj5DVVJSRU5UIEJBTEFOQ0U8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImYxOFwiPuKCuSA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0YW5kaW5nQW10XCI+eyh0eXBlb2Yoc3RhbmRpbmcpICE9PSAndW5kZWZpbmVkJyA/IHN0YW5kaW5nIDogJzAnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxzcGFuIGNsYXNzTmFtZT1cImYxMVwiPnt0aGlzLmdldEN1cnJlbnREYXRlKCl9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBlbnNlRGF5c0J0blwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnZGF5VHlwZUJ0biAnICsgKGFjdGl2ZVRhYiA9PT0gV0VFSyA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHt0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoV0VFSyl9fT5XZWVrPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnZGF5VHlwZUJ0biAnICsgKGFjdGl2ZVRhYiA9PT0gTU9OVEggPyAnZGF5VHlwZUJ0bi1hY3RpdmUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB7dGhpcy5jaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KE1PTlRIKX19Pk1vbnRoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnZGF5VHlwZUJ0biAnICsgKGFjdGl2ZVRhYiA9PT0gWUVBUiA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHt0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoWUVBUil9fT5ZZWFyPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BlbnRJbmNvbWVTZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluLWJsIFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsIGluLWJsIHNwZW50SWNvblwiID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnICB3aWR0aD1cIjIxXCIgaGVpZ2h0PVwiMTdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0yNCAxMmMwLTYuNjI3LTUuMzczLTEyLTEyLTEycy0xMiA1LjM3My0xMiAxMiA1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMnptLTE3IDFoNHYtOGgydjhoNGwtNSA2LTUtNnpcIi8+PC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkhlYWRpbmcgaW4tYmxcIj57J1NwZW50IDog4oK5JyArICh0eXBlb2Yoc3BlbnQpICE9PSAndW5kZWZpbmVkJz8gc3BlbnQ6ICcwJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbi1ibCAgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmwgaW4tYmwgaW5jb21lSWNvbiBcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJmbCBpbi1ibFwiIHdpZHRoPVwiMjFcIiBoZWlnaHQ9XCIxN1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTAgMTJjMCA2LjYyNyA1LjM3MyAxMiAxMiAxMnMxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMi0xMiA1LjM3My0xMiAxMnptMTctMWgtNHY4aC0ydi04aC00bDUtNiA1IDZ6XCIvPjwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJIZWFkaW5nIGluLWJsXCI+eydJbmNvbWUgOiDigrknICsgKGluY29tZUxpc3QgJiYgdHlwZW9mKGluY29tZUxpc3QuYW1vdW50KSAhPT0gJ3VuZGVmaW5lZCcgPyBpbmNvbWVMaXN0LmFtb3VudCA6ICcwJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRUcmFuc2FjdGlvbkNhcmQoKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtwbG90RGF0YSAmJiBwbG90RGF0YS5wZXJEaXZpc2lvbkRhdGEgJiYgIHBsb3REYXRhLnBlckRpdmlzaW9uRGF0YS5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdGhlci1oYWxmLWxhbmRpbmdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj1cIm90aGVySGFsZkxhbmRpbmdUeHRcIiBjbGFzc05hbWU9XCJ0cmFuc2l0aW9uMF81IFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIHRyU3VtYXJ5SGVhZGluZyBmYlwiID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+eydFeHBlbnNlIFRyZW5kcyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBXRUVLID8gIDxHcmFwaCBwbG90RGF0YT17cGxvdERhdGF9IHRhYj17YWN0aXZlVGFifS8+IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IE1PTlRIID8gIDxHcmFwaCBwbG90RGF0YT17cGxvdERhdGF9IHRhYj17YWN0aXZlVGFifS8+IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IFlFQVIgPyAgPEdyYXBoIHBsb3REYXRhPXtwbG90RGF0YX0gdGFiPXthY3RpdmVUYWJ9Lz4gOiBudWxsfVxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+IDogbnVsbH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtzaG93TmV3RXhwZW5zZSA/IFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgPE5ld0V4cGVuc2UgbmV3RXhwZW5zZT17dGhpcy5uZXdFeHBlbnNlfS8+XG4gICAgICAgICAgPC9kaXY+IDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IHtzaWdudXAsIHNpZ25pbn0gZnJvbSAnLi4vYXBpQ2FsbHMvQXBpQ2FsbHMnO1xuXG5jbGFzcyBMb2dpbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGVhZCA9IHRoaXMuaGVhZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2lnblVwID0gdGhpcy5zaWduVXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNpZ25JbiA9IHRoaXMuc2lnbkluLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHVzZXJuYW1lOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGhlYWQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxIZWxtZXQ+XG4gICAgICAgIDx0aXRsZT5FeHBlbnNlIExvZ2luPC90aXRsZT5cbiAgICAgIDwvSGVsbWV0PlxuICAgICk7XG4gIH1cblxuICBzaWduVXAoKSB7XG4gICAgc2lnbnVwKHt1c2VybmFtZTogdGhpcy5zdGF0ZS51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMuc3RhdGUucGFzc3dvcmR9KTtcbiAgfVxuXG4gIHNpZ25Jbih3aXRoVGVzdENyZWRzKSB7XG4gICAgbGV0IHt1c2VybmFtZSwgcGFzc3dvcmR9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAod2l0aFRlc3RDcmVkcykge1xuICAgICAgdXNlcm5hbWUgPSAnZGhpbGlwJztcbiAgICAgIHBhc3N3b3JkID0gJ2RoaWxpcGRoaWxpcCc7XG4gICAgfVxuICAgIHNpZ25pbih7dXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmR9KS50aGVuKChyZXNwKSA9PiB7XG4gICAgICBpZiAocmVzcC5kYXRhICYmICFyZXNwLmRhdGEuZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvaG9tZScsIHt9KTtcbiAgICAgICAgaWYgKHR5cGVvZih3aW5kb3cpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHdpbmRvdy5zaWduZWRJbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gU2lnbkluJywgcmVzcCk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBTaWduSW4nLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5oZWFkKCl9XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dpbkNvbnRhaW5lciB3aGl0ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZHNEaXZcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VybmFtZVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ3aGl0ZUJyZHJCdG1cIiBwbGFjZWhvbGRlcj0nVXNlcm5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLnVzZXJuYW1lfSBvbkNoYW5nZSA9IHsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7dXNlcm5hbWU6IGUudGFyZ2V0LnZhbHVlfSl9IHR5cGU9XCJ0ZXh0XCIvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXNzd29yZCBwYWRUMTBcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwid2hpdGVCcmRyQnRtXCIgcGxhY2Vob2xkZXI9J1Bhc3N3b3JkJyB2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZH0gb25DaGFuZ2UgPSB7KGUpID0+IHRoaXMuc2V0U3RhdGUoe3Bhc3N3b3JkOiBlLnRhcmdldC52YWx1ZX0pfSB0eXBlPVwicGFzc3dvcmRcIi8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXIgcGFkVDIwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3IGRpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmV3QnRuXCJvbkNsaWNrPXt0aGlzLnNpZ25Jbn0+U2lnbiBJbjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3IGRpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmV3QnRuXCIgb25DbGljaz17dGhpcy5zaWduVXB9PlNpZ24gVXA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXIgcGFkVDIwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmV3QnRuXCIgb25DbGljaz17KCkgPT4gdGhpcy5zaWduSW4odHJ1ZSl9PkNvbnRpbnVlIHdpdGggVGVzdCBMb2dpbjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBMb2dpbjsiLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7bmV3X2V4cGVuc2V9IGZyb20gJy4uL2FwaUNhbGxzL0FwaUNhbGxzJztcbmltcG9ydCB7TU9OVEhTTkFNRVNIT1JUfSBmcm9tICcuLi9jb25zdGFudHMvY29uc3RhbnRzJztcbi8vIGltcG9ydCB7Y29tbWFGb3JtYXR0ZWR9IGZyb20gJy4uL3V0aWxzL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3RXhwZW5zZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc2VsZWN0VHlwZSA9IHRoaXMuc2VsZWN0VHlwZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3VibWl0TmV3RXhwZW5zZSA9IHRoaXMuc3VibWl0TmV3RXhwZW5zZS5iaW5kKHRoaXMpO1xuICAgIFxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0eXBlOiAnZXhwZW5zZScsXG4gICAgICBhbW91bnQ6ICcnLFxuICAgICAgY2F0ZWdvcnk6ICcnLFxuICAgICAgZGF5OiAnJywgXG4gICAgICBtb250aDogJycsXG4gICAgICB5ZWFyOiAnJyxcbiAgICAgIGVycm9yOiB7fVxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFR5cGUodHlwZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3R5cGU6IHR5cGV9KTtcbiAgfVxuXG4gIGNoYW5nZUFtb3VudCh2YWwpe1xuICAgIHRoaXMuc2V0U3RhdGUoe2Ftb3VudDogdmFsfSlcbiAgfVxuXG4gIGNoYW5nZURhdGUodmFsLCBjdXJyZW50LCBuZXh0KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Li4udmFsfSk7XG4gICAgaWYgKGN1cnJlbnQgJiYgdmFsW2N1cnJlbnRdLmxlbmd0aCA9PT0gMiAmJiBuZXh0KSB7XG4gICAgICB0aGlzLnJlZnNbbmV4dF0uZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBpc1ZhbGlkRGF0ZSgpIHtcbiAgICBjb25zdCB7ZGF5LCBtb250aCwgeWVhcn0gPSB0aGlzLnN0YXRlO1xuICAgIHZhciBkYXRlUmVnID0gL15bMC05XVswLTldJC87XG4gICAgaWYgKCFkYXRlUmVnLnRlc3QoZGF5KSB8fCAhZGF0ZVJlZy50ZXN0KG1vbnRoKSB8fCAhZGF0ZVJlZy50ZXN0KHllYXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKDIwMDAgKyBwYXJzZUludCh5ZWFyKSwgcGFyc2VJbnQobW9udGgpLTEsIHBhcnNlSW50KGRheSkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHZhbGlkYXRlUGFyYW1zKCkge1xuICAgIHZhciByZWcgPSAvXlxcZCskLztcbiAgICBjb25zdCB7YW1vdW50LCBjYXRlZ29yeX0gPSB0aGlzLnN0YXRlO1xuICAgIGlmICghYW1vdW50IHx8ICFyZWcudGVzdChhbW91bnQpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2Ftb3VudDogJ1BsZWFzZSBwcm92aWRlIGEgVmFsaWQgQW1vdW50J319KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFjYXRlZ29yeSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHtjYXRlZ29yeTogJ1BsZWFzZSBwcm92aWRlIGEgVmFsaWQgQ2F0ZWdvcnknfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNWYWxpZERhdGUoKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHtkYXRlOiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBEYXRlJ319KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgc3VibWl0TmV3RXhwZW5zZSgpIHtcbiAgICBjb25zdCB7YW1vdW50LCBkYXksIG1vbnRoLCB5ZWFyLCB0eXBlLCBjYXRlZ29yeX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGlzVmFsaWRhdGlvblN1Y2Nlc3MgPSB0aGlzLnZhbGlkYXRlUGFyYW1zKCk7XG4gICAgaWYgKGlzVmFsaWRhdGlvblN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgYW1vdW50LCB0eXBlLCBkYXRlOiB0aGlzLmRhdGUsIGNhdGVnb3J5fTtcbiAgICAgIG5ld19leHBlbnNlKHBhcmFtcykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5uZXdFeHBlbnNlKGZhbHNlKTtcbiAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBjcmVhdGUgbmV3IEV4cGVuc2UnLGVycik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJPcHRpb25zKHR5cGUpIHtcbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgaWYgKHR5cGUgPT09ICdkYXknKSB7XG4gICAgICBmb3IobGV0IGkgPSAxOyBpIDwgMzIgOyBpKyspIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24gdmFsdWU9e2l9PntpfTwvb3B0aW9uPik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnbW9udGgnKSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTIgOyBpKyspIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24gdmFsdWU9e2l9PntNT05USFNOQU1FU0hPUlRbaV19PC9vcHRpb24+KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd5ZWFyJykge1xuICAgICAgZm9yKGxldCBpID0gMjAyMDsgaSA+IDIwMDAgOyBpLS0pIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24gdmFsdWU9e2l9PntpfTwvb3B0aW9uPik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHt0eXBlLCBhbW91bnQsIGRheSwgbW9udGgsIHllYXIsIGNhdGVnb3J5LCBlcnJvcn0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3RXhwZW5zZUNvbnRhaW5lciB6aTJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBJbmNCdG5zIHRleHRDZW50ZXIgbVQyNVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J25ld0J0biAnICsgKHR5cGUgPT09ICdleHBlbnNlJyA/ICdzZWxlY3RlZFR5cGUnIDogJycpfSAgb25DbGljaz17KCkgPT4gdGhpcy5zZWxlY3RUeXBlKCdleHBlbnNlJyl9PkV4cGVuc2U8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnbmV3QnRuICcgKyAodHlwZSA9PT0gJ2luY29tZScgPyAnc2VsZWN0ZWRUeXBlJyA6ICcnKX0gb25DbGljaz17KCkgPT4gdGhpcy5zZWxlY3RUeXBlKCdpbmNvbWUnKX0+SW5jb21lPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbW91bnRJbnB1dCBtVDI1IFwiPlxuICAgICAgICA8c3Bhbj7igrk8L3NwYW4+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJBbW91bnRcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlQW1vdW50KGUudGFyZ2V0LnZhbHVlKX0gdmFsdWU9e2Ftb3VudH0vPlxuICAgICAgICAgIHtlcnJvci5hbW91bnQgPyA8ZGl2IGNsYXNzTmFtZT1cImVycm9yRGl2XCI+e2Vycm9yLmFtb3VudH08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAgY2xhc3NOYW1lPVwiY2F0ZWdvcnlJbnB1dCBtVDI1IFwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQ2F0ZWdvcnlcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuc2V0U3RhdGUoe2NhdGVnb3J5OiBlLnRhcmdldC52YWx1ZX0pfSB2YWx1ZT17Y2F0ZWdvcnl9Lz5cbiAgICAgICAgICB7ZXJyb3IuY2F0ZWdvcnkgPyA8ZGl2IGNsYXNzTmFtZT1cImVycm9yRGl2XCI+e2Vycm9yLmNhdGVnb3J5fTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwZW50RGF5IG1UMjUgXCI+XG4gICAgICAgICAgey8qIDxpbnB1dCByZWY9XCJkYXlcIiBjbGFzc05hbWU9XCJkYXlJcFwiIHR5cGU9XCJudW1iZXJcIiBtYXhMZW5ndGg9XCIyXCIgcGxhY2Vob2xkZXI9XCJERFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHtkYXk6IGUudGFyZ2V0LnZhbHVlfSwgJ2RheScsICdtb250aCcpfSB2YWx1ZT17ZGF5fS8+XG4gICAgICAgICAgPGlucHV0IHJlZj1cIm1vbnRoXCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiTU1cIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7bW9udGg6IGUudGFyZ2V0LnZhbHVlfSwgJ21vbnRoJywgJ3llYXInKX0gdmFsdWU9e21vbnRofS8+XG4gICAgICAgICAgPGlucHV0IHJlZj1cInllYXJcIiBjbGFzc05hbWU9XCJkYXlJcFwiIHR5cGU9XCJudW1iZXJcIiBtYXhMZW5ndGg9XCIyXCIgcGxhY2Vob2xkZXI9XCJZWVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHt5ZWFyOiBlLnRhcmdldC52YWx1ZX0sICd5ZWFyJyl9IHZhbHVlPXt5ZWFyfS8+ICovfVxuICAgICAgICAgIDxzZWxlY3QgcmVmPVwiZGF5XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe2RheTogZS50YXJnZXQudmFsdWV9LCAnZGF5JywgJ21vbnRoJyl9Pnt0aGlzLnJlbmRlck9wdGlvbnMoJ2RheScpfTwvc2VsZWN0PlxuICAgICAgICAgIDxzZWxlY3QgcmVmPVwiZGF5XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe2RheTogZS50YXJnZXQudmFsdWV9LCAnbW9udGgnLCAneWVhcicpfT57dGhpcy5yZW5kZXJPcHRpb25zKCdtb250aCcpfTwvc2VsZWN0PlxuICAgICAgICAgIDxzZWxlY3QgcmVmPVwiZGF5XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe2RheTogZS50YXJnZXQudmFsdWV9LCAneWVhcicpfT57dGhpcy5yZW5kZXJPcHRpb25zKCd5ZWFyJyl9PC9zZWxlY3Q+XG4gICAgICAgICAge2Vycm9yLmRhdGUgPyA8ZGl2IGNsYXNzTmFtZT1cImVycm9yRGl2XCI+e2Vycm9yLmRhdGV9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VibWl0QnRuXCIgb25DbGljaz17dGhpcy5zdWJtaXROZXdFeHBlbnNlfT5Eb25lPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IHtOYXZMaW5rfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY2xhc3MgTm90Rm91bmQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhlYWQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxIZWxtZXQ+XG4gICAgICAgIDx0aXRsZT5QYWdlIE5vdCBGb3VuZDwvdGl0bGU+XG4gICAgICA8L0hlbG1ldD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5oZWFkKCl9XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgxPlNvcnJ5LCB0aGUgcGFnZSB5b3UgYXJlIGV4cGVjdGluZyBkb2VzIG5vdCBleGlzdCE8L2gxPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGkgb25DbGljaz0geygpID0+IHRoaXMucHJvcHMuaGlzdG9yeS5nb0JhY2soKX0+IFxuICAgICAgICAgICAgICBCYWNrXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICA8TmF2TGluayB0bz0nLyc+IEhvbWUgPC9OYXZMaW5rPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPE5hdkxpbmsgdG89Jy9sb2dpbic+IExvZ2luIDwvTmF2TGluaz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBOb3RGb3VuZDsiLCJleHBvcnQgY29uc3QgTU9OVEggPSAnbW9udGgnO1xuZXhwb3J0IGNvbnN0IFlFQVIgPSAneWVhcic7XG5leHBvcnQgY29uc3QgV0VFSyA9ICd3ZWVrJztcbmV4cG9ydCBjb25zdCBESVZJU0lPTkxFTkdUSCA9IHsgbW9udGg6IDMxLCB5ZWFyOiAxMiwgd2VlazogN307IFxuZXhwb3J0IGNvbnN0IE1PTlRIU05BTUUgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXTtcbmV4cG9ydCBjb25zdCAgTU9OVEhTTkFNRVNIT1JUID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7QnJvd3NlclJvdXRlciwgU3dpdGNoLCBSb3V0ZX0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IExvZ2luIGZyb20gJy4uL2NvbXBvbmVudHMvTG9naW4nO1xuaW1wb3J0IE5vdEZvdW5kIGZyb20gJy4uL2NvbXBvbmVudHMvTm90Rm91bmQnXG5pbXBvcnQgSG9tZSBmcm9tICcuLi9jb21wb25lbnRzL0hvbWUnO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvbG9naW4nIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8TG9naW4gey4uLnByb3BzfS8+fS8+XG4gICAgICAgICAgICB7LyogPFJvdXRlIHBhdGg9Jy9sb2dpbicgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxMb2dpbiB7Li4ucHJvcHN9Lz59Lz4gKi99XG4gICAgICAgICAgICA8Um91dGUgcGF0aD0nL2hvbWUnIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8SG9tZSB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIHsvKiA8Um91dGUgcGF0aD0nLycgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxIb21lIHsuLi5wcm9wc30vPn0vPiAqL31cbiAgICAgICAgICAgIHsvKiA8Um91dGUgcGF0aD0nKicgcmVuZGVyPXsocHJvcHMpID0+IDxOb3RGb3VuZCB7Li4ucHJvcHN9Lz59Lz4gKi99XG4gICAgICAgIDwvU3dpdGNoPlxuICAgICk7XG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29ubmVjdC1tb25nb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1oZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==