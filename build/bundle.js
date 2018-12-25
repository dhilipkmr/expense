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
exports.getExpenseSummary = exports.getExpenseData = exports.newExpense = exports.getUserInfo = exports.logout = exports.signIn = exports.signUp = undefined;

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
                request.session._userId = doc.id;
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
    _userModel2.default.findOne({ username: username, password: password }).then(function (res) {
        if (res) {
            request.session._userId = res.id;
            response.send({ error: false, msg: 'success' });
        } else {
            response.send({ error: true, msg: 'No user account found' });
        }
    }, function (e) {
        response.send(e);
        console.log(e);
    });
};

var logout = exports.logout = function logout(request, response) {
    request.session._userId = null;
    response.send({ error: false, msg: 'success' });
};

var getUserInfo = exports.getUserInfo = function getUserInfo(request, response) {
    if (request.session._userId) {
        var id = _mongoose2.default.Types.ObjectId(request.session._userId);
        _userModel2.default.findOne({ _id: id }).then(function (res) {
            if (res) {
                var username = res.username;
                response.send({ userInfo: { username: username } });
            } else {
                response.send({ error: true, msg: 'No user account found' });
            }
        }, function (e) {
            response.send(e);
            console.log(e);
        });
    } else {
        response.send(200).send({ error: true });
    }
};

var newExpense = exports.newExpense = function newExpense(request, response) {
    var _request$body3 = request.body,
        amount = _request$body3.amount,
        category = _request$body3.category,
        date = _request$body3.date,
        type = _request$body3.type;

    amount = parseInt(amount);
    date = new Date(date);
    var mm = date.getMonth();
    var yy = date.getFullYear();
    var firstDayofMonth = new Date(yy, mm, 1).getDay();
    var ww = Math.ceil((firstDayofMonth + date.getDate()) / 7);
    var dow = date.getDay();
    var dd = date.getDate();
    var newExpense = { amount: amount, category: category, date: date, type: type, ww: ww, dow: dow, mm: mm, yy: yy, dd: dd };
    var newExpenseInstance = new _expenseModel2.default(_extends({
        user_id: _mongoose2.default.Types.ObjectId(request.session._userId)
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
            var expenseList = {},
                incomeList = {};
            Object.keys(data).map(function (key) {
                if (data[key].type === 'expense') {
                    expenseList = data[key];
                } else if (data[key].type === 'income') {
                    incomeList = data[key];
                }
            });
            var spent = void 0,
                standing = void 0;
            if (expenseList && expenseList.transactionList) {
                expenseList.transactionList.map(function (transaction) {
                    var percent = transaction.amount / (expenseList.amount / 100);
                    transaction.percent = Math.round(percent * 100) / 100;
                });
                spent = expenseList.amount;
            } else {
                spent = 0;
            }
            if (incomeList && incomeList.transactionList) {
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
mongoose.connect(process.env.MONGOLAB_URI, { useMongoClient: true }).then(function () {
    console.log('Connected to Db');
}, function (e) {
    console.log(e);
});
module.exports = { mongoose: mongoose };

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

var _app = __webpack_require__(/*! ../src/app */ "./src/app.js");

var _app2 = _interopRequireDefault(_app);

__webpack_require__(/*! ./db/mongoose */ "./server/db/mongoose.js");

var _apiCalls = __webpack_require__(/*! ./api/apiCalls */ "./server/api/apiCalls.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(/*! ./config/config */ "./server/config/config.js");

var session = __webpack_require__(/*! express-session */ "express-session");

var MongoStore = __webpack_require__(/*! connect-mongo */ "connect-mongo")(session);
var app = (0, _express2.default)();
var port = process.env.PORT;

app.use(session({
    secret: 'foo',
    resave: true,
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
app.post('/logout', _apiCalls.logout);
app.post('/userinfo', _apiCalls.getUserInfo);
app.post('/new_expense', _apiCalls.newExpense);
app.post('/get_expense_data', _apiCalls.getExpenseData);
app.post('/get_expense_summary', _apiCalls.getExpenseSummary);

var loadHtml = function loadHtml(content) {
    return '\n        <html>\n            <head>\n                <meta name="viewport" content="width=device-width, initial-scale=1.0">\n                <link rel="manifest" href="/manifest.json">\n                <link rel="icon" href="/img/budget64.png">\n                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">\n                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js">\n                <link rel="stylesheet" type="text/css" href="/styles/common.css">\n                <link rel="stylesheet" type="text/css" href="/styles/home.css">\n                <link rel="stylesheet" type="text/css" href="/styles/login.css">\n                <link rel="stylesheet" type="text/css" href="/styles/new_expense.css">\n                <link rel="stylesheet" type="text/css" href="/styles/notfound.css">\n                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">\n            </head>\n            <body>\n                <div id="root"></div>\n                <script src = "/swRegisterer.js">\n                </script>\n                <script src="client_bundle.js"></script>\n            </body>\n        </html>';
};

app.get('*', function (req, res) {
    var template = loadHtml();
    res.send(template);
});

app.listen(port, function () {
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
exports.get_expense_summary = exports.get_expense_data = exports.new_expense = exports.logoutUser = exports.getUserInfo = exports.signin = exports.signup = undefined;

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

var getUserInfo = exports.getUserInfo = function getUserInfo() {
  var url = '/userinfo/';
  return _axios2.default.post(url, {});
};

var logoutUser = exports.logoutUser = function logoutUser() {
  var url = '/logout/';
  return _axios2.default.post(url, {});
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

var WIDTH = 180;
var HEIGHT = 115;

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
    key: 'renderPoints',
    value: function renderPoints(xCoordinates, yCoordinates) {
      var pointsElement = [];
      var tab = this.props.tab;
      var textIndex = 0;
      for (var index = 1; index < xCoordinates.length - 1; index++) {
        var pointText = '';
        if (tab === _constants.WEEK) {
          pointText = _constants.WEEKNAMESHORT[textIndex++].toUpperCase();
        } else if (tab === _constants.YEAR) {
          pointText = _constants.MONTHSNAMESHORT[textIndex++].toUpperCase();
        } else if (tab === _constants.MONTH) {
          if (index % 2 !== 0) {
            continue;
          }
          pointText = index;
        }
        pointsElement.push(_react2.default.createElement(
          'g',
          { key: 'group_' + index },
          _react2.default.createElement(
            'a',
            null,
            _react2.default.createElement(
              'text',
              { className: 'fb', x: xCoordinates[index], fill: '#757575', y: yCoordinates[index] - 5, fontSize: '5', textAnchor: 'middle' },
              pointText
            ),
            _react2.default.createElement('circle', { cx: xCoordinates[index], cy: yCoordinates[index], stroke: '#4688F1', fill: '#4688F1', r: '1', strokeWidth: '1' })
          )
        ));
      }
      return pointsElement;
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
      var maxLeng = _constants.MAXLENGTHPERTAB[tab];
      var maxAmt = plotData.maxAmount;
      var xCoordinateDivLength = WIDTH / length;
      var lastDivision = tab === _constants.MONTH ? 0 : -1; // Because we show only dates in month division begins with 1 so last shud be 0 

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
          lastDivision++;
        }
      });
      // to push values for remaining days
      while (maxLeng > lastDivision) {
        var _lastX2 = xCoordinates[xCoordinates.length - 1];
        xCoordinates.push(_lastX2 + xCoordinateDivLength);
        yCoordinates.push(HEIGHT);
        lastDivision++;
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
            { viewBox: '-5 -10 ' + (WIDTH + 35) + ' ' + (HEIGHT + 15), style: { margin: '10px' } },
            _react2.default.createElement('polyline', { points: str, className: 'graphPlotLine' }),
            this.renderPoints(xCoordinates, yCoordinates)
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      viewMore: false,
      weekData: {},
      monthData: {},
      yearData: {}
    };
    _this.viewedMore = {};
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getExpense();
      this.getExpenseSummary();
      this.userInfo();
    }
    // To give the prop in the state to check availability of data

  }, {
    key: 'currentTabData',
    value: function currentTabData() {
      var activeTab = this.state.activeTab;

      if (activeTab === _constants.WEEK) {
        return this.state.weekData;
      } else if (activeTab === _constants.MONTH) {
        return this.state.monthData;
      } else if (activeTab === _constants.YEAR) {
        return this.state.yearData;
      }
    }
  }, {
    key: 'findCurrentDataProp',
    value: function findCurrentDataProp() {
      var activeTab = this.state.activeTab;

      if (activeTab === _constants.WEEK) {
        return 'weekData';
      } else if (activeTab === _constants.MONTH) {
        return 'monthData';
      } else if (activeTab === _constants.YEAR) {
        return 'yearData';
      }
    }
  }, {
    key: 'getParams',
    value: function getParams() {
      var tab = this.state.activeTab;
      var currDate = new Date();
      var mm = currDate.getMonth();
      var dow = currDate.getDay();
      var yy = currDate.getFullYear();

      var firstDayofMonth = new Date(yy, mm, 1).getDay();
      var ww = Math.ceil((firstDayofMonth + currDate.getDate()) / 7);

      var params = { tab: tab, mm: mm, dow: dow, ww: ww, yy: yy };
      return params;
    }
  }, {
    key: 'userInfo',
    value: function userInfo() {
      var _this2 = this;

      (0, _ApiCalls.getUserInfo)().then(function (res) {
        if (res.data && res.data.userInfo) {
          _this2.setState({ userInfo: res.data.userInfo });
        } else {
          _this2.navigateToSignIn();
        }
      }).catch(function () {
        _this2.navigateToSignIn();
      });
    }
  }, {
    key: 'getExpenseSummary',
    value: function getExpenseSummary(loadNewSummaryData) {
      var _this3 = this;

      var params = this.getParams();
      var activeTabData = this.findCurrentDataProp();

      if (Object.keys(this.state[activeTabData]).length === 0 || loadNewSummaryData) {
        (0, _ApiCalls.get_expense_summary)(params).then(function (resp) {
          _this3.setState(_defineProperty({}, activeTabData, _extends({}, _this3.state[activeTabData], { plotData: _extends({}, resp.data) })));
        }, function (err) {
          console.log('Unable to Get Expense Summary Details', err);
        });
      }
    }
  }, {
    key: 'getExpense',
    value: function getExpense(loadNewExpenseData) {
      var _this4 = this;

      var params = this.getParams();
      var activeTabData = this.findCurrentDataProp();

      if (Object.keys(this.state[activeTabData]).length === 0 || loadNewExpenseData) {
        (0, _ApiCalls.get_expense_data)(params).then(function (resp) {
          var _resp$data = resp.data,
              expenseList = _resp$data.expenseList,
              incomeList = _resp$data.incomeList,
              standing = _resp$data.standing,
              spent = _resp$data.spent;

          _this4.setState(_defineProperty({}, activeTabData, _extends({}, _this4.state[activeTabData], { expenseList: expenseList, incomeList: incomeList, standing: standing, spent: spent })));
        }, function (err) {
          console.log('Unable to Get Expense Details', err);
        });
      }
    }
  }, {
    key: 'changeExpenseDayFormat',
    value: function changeExpenseDayFormat(activeTab) {
      var _this5 = this;

      this.setState({ activeTab: activeTab, viewMore: false }, function () {
        _this5.getExpense();
        _this5.getExpenseSummary();
      });
    }
  }, {
    key: 'leftMenuClick',
    value: function leftMenuClick() {
      this.refs.backDrop.classList.toggle('backDrop');
      this.refs.popup.classList.toggle('right0');
      if (this.refs.otherHalfLandingTxt) {
        this.refs.firstHalfLandingTxt.classList.toggle('scale90');
        this.refs.otherHalfLandingTxt.classList.toggle('scale90');
      }
      this.refs.addBtnContainer.classList.toggle('dn');
    }
  }, {
    key: 'navigateToSignIn',
    value: function navigateToSignIn() {
      if (this.state.userInfo) {
        (0, _ApiCalls.logoutUser)().then(function () {
          window.location.href = '/login';
        });
      } else {
        window.location.href = '/login';
      }
    }
  }, {
    key: 'renderLeftMenuBar',
    value: function renderLeftMenuBar() {
      var userInfo = this.state.userInfo;

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
              !userInfo ? 'Sign In' : 'Logout'
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
      var _this6 = this;

      if (saveSuccess) {
        this.setState({ showNewExpense: val, weekData: {}, monthData: {}, yearData: {} }, function () {
          _this6.getExpense(saveSuccess);
          _this6.getExpenseSummary(saveSuccess);
        });
      } else {
        this.setState({ showNewExpense: val });
      }
    }
  }, {
    key: 'clickViewMore',
    value: function clickViewMore() {
      this.setState({ viewMore: !this.state.viewMore });
      this.refs.transactedCard.scrollTop = 0;
    }
  }, {
    key: 'renderInnerTransactioncard',
    value: function renderInnerTransactioncard(hasListDefined) {
      var _this7 = this;

      if (!hasListDefined) {
        var loader = [];
        for (var i = 0; i < 2; i++) {
          loader.push(_react2.default.createElement(
            'div',
            { key: 'transaction_type_' + i, className: 'transactedCardInner' },
            _react2.default.createElement(
              'div',
              { className: 'cardInnerheading' },
              _react2.default.createElement('span', { className: 'cat_percent progressBar fl m0 mt10' })
            ),
            _react2.default.createElement('div', { className: 'progressBar bl textCenter mt30' })
          ));
        }
        return loader;
      }

      var _currentTabData = this.currentTabData(),
          expenseList = _currentTabData.expenseList;

      return expenseList.transactionList.map(function (transaction, index) {
        if (_this7.state.viewMore || _this7.viewedMore[_this7.state.activeTab] || !_this7.state.viewMore && index < 2) {
          if (_this7.state.viewMore) {
            _this7.viewedMore[_this7.state.activeTab] = true; // To not remove element from DOM on clicking view More again
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
      var _this8 = this;

      var currentTabData = this.currentTabData();
      var _state = this.state,
          activeTab = _state.activeTab,
          _state$viewMore = _state.viewMore,
          viewMore = _state$viewMore === undefined ? false : _state$viewMore,
          userInfo = _state.userInfo;
      // const hasNoData = currentTabData.expenseList && Object.keys(currentTabData.expenseList).length === 0;

      var hasListDefined = currentTabData.expenseList; // To determine if the call is completed
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { ref: 'transactedCard', className: 'transactedCard transition1a ' + (viewMore ? 'showAllTransaction' : '') },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'transactScroller' },
              typeof hasListDefined !== 'undefined' && Object.keys(hasListDefined).length === 0 ? _react2.default.createElement(
                'div',
                { className: 'textCenter padT20 mh10p' },
                _react2.default.createElement(
                  'div',
                  null,
                  'No Transactions added '
                ),
                !userInfo && _react2.default.createElement(
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
              ) : _react2.default.createElement(
                'div',
                null,
                activeTab === _constants.WEEK ? this.renderInnerTransactioncard(hasListDefined) : null,
                activeTab === _constants.MONTH ? this.renderInnerTransactioncard(hasListDefined) : null,
                activeTab === _constants.YEAR ? this.renderInnerTransactioncard(hasListDefined) : null
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'viewMoreArrow', onClick: function onClick() {
              return _this8.clickViewMore();
            } },
          _react2.default.createElement(
            'svg',
            { className: viewMore ? 'rotateViewMore' : '', ref: 'svgViewMore', xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24' },
            _react2.default.createElement('path', { d: 'M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'posRel' },
          _react2.default.createElement(
            'div',
            { ref: 'addBtnContainer', className: 'addBtnContainer ' },
            _react2.default.createElement(
              'div',
              { className: '' },
              _react2.default.createElement(
                'span',
                { className: 'addBtn', onClick: function onClick() {
                    return _this8.newExpense(true);
                  } },
                ' + '
              )
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
      var _this9 = this;

      var _state2 = this.state,
          activeTab = _state2.activeTab,
          showNewExpense = _state2.showNewExpense,
          _state2$viewMore = _state2.viewMore,
          viewMore = _state2$viewMore === undefined ? false : _state2$viewMore;

      var _currentTabData2 = this.currentTabData(),
          _currentTabData2$stan = _currentTabData2.standing,
          standing = _currentTabData2$stan === undefined ? undefined : _currentTabData2$stan,
          _currentTabData2$spen = _currentTabData2.spent,
          spent = _currentTabData2$spen === undefined ? undefined : _currentTabData2$spen,
          _currentTabData2$plot = _currentTabData2.plotData,
          plotData = _currentTabData2$plot === undefined ? undefined : _currentTabData2$plot,
          _currentTabData2$inco = _currentTabData2.incomeList,
          incomeList = _currentTabData2$inco === undefined ? undefined : _currentTabData2$inco;

      return _react2.default.createElement(
        'div',
        { className: '' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', { ref: 'backDrop', className: 'transition2a zi1 ' + (showNewExpense ? 'backDrop' : ''), onClick: function onClick() {
              return _this9.newExpense(false);
            } }),
          this.renderLeftMenuBar(),
          _react2.default.createElement(
            'div',
            { ref: 'mainContent', className: 'mainContent' },
            _react2.default.createElement(
              'div',
              { className: '' },
              _react2.default.createElement('div', { className: 'first-half-landing' }),
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
                        _this9.changeExpenseDayFormat(_constants.WEEK);
                      } },
                    'Week'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (activeTab === _constants.MONTH ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this9.changeExpenseDayFormat(_constants.MONTH);
                      } },
                    'Month'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (activeTab === _constants.YEAR ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this9.changeExpenseDayFormat(_constants.YEAR);
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
    key: 'successful',
    value: function successful(resp) {
      if (resp.data && !resp.data.error) {
        console.log(this);
        this.props.history.push('/home', {});
        if (typeof window !== 'undefined') {
          window.signedIn = true;
        }
      } else {
        console.log('Failed to SignIn', resp);
      }
    }
  }, {
    key: 'signUp',
    value: function signUp() {
      var _this2 = this;

      (0, _ApiCalls.signup)({ username: this.state.username, password: this.state.password }).then(function (resp) {
        _this2.successful(resp);
      }).catch(function (err) {
        return console.log('Failed to Signup');
      });
    }
  }, {
    key: 'signIn',
    value: function signIn(withTestCreds) {
      var _this3 = this;

      var _state = this.state,
          username = _state.username,
          password = _state.password;

      if (withTestCreds) {
        username = 'dhilip';
        password = 'dhilipdhilip';
      }
      (0, _ApiCalls.signin)({ username: username, password: password }).then(function (resp) {
        _this3.successful(resp);
      }).catch(function (err) {
        console.log('Failed to SignIn', err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

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
                _react2.default.createElement('input', { className: 'whiteBrdrBtm white', placeholder: 'Username', value: this.state.username, onChange: function onChange(e) {
                    return _this4.setState({ username: e.target.value });
                  }, type: 'text' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'password padT10' },
                _react2.default.createElement('input', { className: 'whiteBrdrBtm white', placeholder: 'Password', value: this.state.password, onChange: function onChange(e) {
                    return _this4.setState({ password: e.target.value });
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
                  { className: 'newBtn', onClick: function onClick() {
                      return _this4.signIn(false);
                    } },
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
                      return _this4.signIn(true);
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
    value: function changeDate(val) {
      if (val === _constants.TODAY) {
        var date = new Date();
        this.setState({ todayTap: true, yesterdayTap: false, day: date.getDate(), month: date.getMonth(), year: date.getFullYear() });
      } else if (val == _constants.YESTERDAY) {
        var currDate = new Date();
        var _date = new Date(currDate.setDate(currDate.getDate() - 1));
        this.setState({ todayTap: false, yesterdayTap: true, day: _date.getDate(), month: _date.getMonth(), year: _date.getFullYear() });
      } else {
        this.setState(_extends({}, val));
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
          'DD'
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
          'MM'
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
          'YY'
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
          _react2.default.createElement('input', { className: 'padL10', type: 'text', placeholder: 'Amount', onChange: function onChange(e) {
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
          _react2.default.createElement('input', { className: 'padL10', type: 'text', placeholder: 'Category', onChange: function onChange(e) {
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
                return _this3.changeDate({ day: e.target.value });
              }, value: this.state.day },
            this.renderOptions('day')
          ),
          _react2.default.createElement(
            'select',
            { ref: 'month', onChange: function onChange(e) {
                return _this3.changeDate({ month: e.target.value });
              }, value: this.state.month },
            this.renderOptions('month')
          ),
          _react2.default.createElement(
            'select',
            { ref: 'year', onChange: function onChange(e) {
                return _this3.changeDate({ year: e.target.value });
              }, value: this.state.year },
            this.renderOptions('year')
          ),
          _react2.default.createElement(
            'div',
            { className: 'mt20' },
            _react2.default.createElement(
              'span',
              { className: 'm10 ' + (this.state.todayTap ? 'activeTapOption' : 'tapOption'), onClick: function onClick() {
                  return _this3.changeDate(_constants.TODAY);
                } },
              'Today'
            ),
            _react2.default.createElement(
              'span',
              { className: 'm10 ' + (this.state.yesterdayTap ? 'activeTapOption' : 'tapOption'), onClick: function onClick() {
                  return _this3.changeDate(_constants.YESTERDAY);
                } },
              'Yesterday'
            )
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
      return _react2.default.createElement(
        'div',
        null,
        this.head(),
        _react2.default.createElement(
          'div',
          { className: 'notfoundContainer' },
          _react2.default.createElement(
            'h5',
            { className: 'notFoundText fb textCenter' },
            'Sorry, this page does not exist!'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'ul',
            { className: 'notfoundUL textCenter' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'div',
                { className: 'blueBtn' },
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { to: '/login', className: 'white' },
                  ' Login '
                )
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
var MAXLENGTHPERTAB = exports.MAXLENGTHPERTAB = { month: 31, year: 11, week: 6 };
var MONTHSNAME = exports.MONTHSNAME = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var MONTHSNAMESHORT = exports.MONTHSNAMESHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var WEEKNAMESHORT = exports.WEEKNAMESHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var TODAY = exports.TODAY = 'today';
var YESTERDAY = exports.YESTERDAY = 'yesterday';

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
                return _react2.default.createElement(_Login2.default, props);
            } }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/login', exact: true, render: function render(props) {
                return _react2.default.createElement(_Login2.default, props);
            } }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/home', exact: true, render: function render(props) {
                return _react2.default.createElement(_Home2.default, props);
            } }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '*', render: function render(props) {
                return _react2.default.createElement(_NotFound2.default, props);
            } })
    );
};
// import ReactDOM from 'react-dom';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2FwaS9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvZGIvbW9uZ29vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9leHBlbnNlTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hcGlDYWxscy9BcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Ib21lLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL0xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05ld0V4cGVuc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvTm90Rm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbnN0YW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3JvdXRlcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29ubmVjdC1tb25nb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLXNlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIl0sIm5hbWVzIjpbInNpZ25VcCIsInJlcXVlc3QiLCJyZXNwb25zZSIsImJvZHkiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZW1haWxJZCIsInVzZXIiLCJVc2VycyIsIl9pZCIsIm1vbmdvb3NlIiwiVHlwZXMiLCJPYmplY3RJZCIsImZpbmQiLCJ0aGVuIiwicmVzIiwibGVuZ3RoIiwic2VuZCIsImVycm9yIiwibXNnIiwic2F2ZSIsImRvYyIsInNlc3Npb24iLCJfdXNlcklkIiwiaWQiLCJlIiwic3RhdHVzIiwiY29uc29sZSIsImxvZyIsInNpZ25JbiIsImZpbmRPbmUiLCJsb2dvdXQiLCJnZXRVc2VySW5mbyIsInVzZXJJbmZvIiwibmV3RXhwZW5zZSIsImFtb3VudCIsImNhdGVnb3J5IiwiZGF0ZSIsInR5cGUiLCJwYXJzZUludCIsIkRhdGUiLCJtbSIsImdldE1vbnRoIiwieXkiLCJnZXRGdWxsWWVhciIsImZpcnN0RGF5b2ZNb250aCIsImdldERheSIsInd3IiwiTWF0aCIsImNlaWwiLCJnZXREYXRlIiwiZG93IiwiZGQiLCJuZXdFeHBlbnNlSW5zdGFuY2UiLCJFeHBlbnNlcyIsInVzZXJfaWQiLCJlcnIiLCJnZXRFeHBlbnNlRGF0YSIsInVzZXJJZCIsImV4cGVuc2VEYXRlUmVzcG9uZGVyIiwiZGF0YSIsInJlc3BvbmQiLCJleHBlbnNlTGlzdCIsImluY29tZUxpc3QiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwic3BlbnQiLCJzdGFuZGluZyIsInRyYW5zYWN0aW9uTGlzdCIsInRyYW5zYWN0aW9uIiwicGVyY2VudCIsInJvdW5kIiwiZ3JvdXAxIiwiJGdyb3VwIiwiJHN1bSIsImdyb3VwMiIsIiRwdXNoIiwidW53aW5kIiwiJHVud2luZCIsInNvcnQiLCIkc29ydCIsInJlR3JvdXAiLCJ0YWIiLCJZRUFSIiwiYWdncmVnYXRlIiwiJG1hdGNoIiwiJHByb2plY3QiLCJhbGxvd0Rpc2tVc2UiLCJleGVjIiwiTU9OVEgiLCJXRUVLIiwiZ2V0RXhwZW5zZVN1bW1hcnkiLCJleGVjU3VtbWFyeVF1ZXJ5IiwicGVyRGl2aXNpb25EYXRhIiwibWF4QW1vdW50IiwiTnVtYmVyIiwiTUlOX1NBRkVfSU5URUdFUiIsImZvckVhY2giLCJlbnRyeSIsIm1vbnRoIiwidG90YWxBbW91bnQiLCJkaXZpc2lvbiIsImVudiIsInByb2Nlc3MiLCJQT1JUIiwiTU9OR09MQUJfVVJJIiwicmVxdWlyZSIsIlByb21pc2UiLCJnbG9iYWwiLCJjb25uZWN0IiwidXNlTW9uZ29DbGllbnQiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9kZWwiLCJTY2hlbWEiLCJyZWYiLCJyZXF1aXJlZCIsInRyaW0iLCJTdHJpbmciLCJkZWZhdWx0Iiwibm93IiwibWlubGVuZ3RoIiwiZXhwZW5zZSIsIk1vbmdvU3RvcmUiLCJhcHAiLCJwb3J0IiwidXNlIiwic2VjcmV0IiwicmVzYXZlIiwic3RvcmUiLCJ1cmwiLCJib2R5UGFyc2VyIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwianNvbiIsImV4cHJlc3MiLCJzdGF0aWMiLCJwb3N0IiwibG9hZEh0bWwiLCJjb250ZW50IiwiZ2V0IiwicmVxIiwidGVtcGxhdGUiLCJsaXN0ZW4iLCJBcHAiLCJDb21wb25lbnQiLCJzaWdudXAiLCJwYXJhbXMiLCJheGlvcyIsInNpZ25pbiIsImxvZ291dFVzZXIiLCJuZXdfZXhwZW5zZSIsImdldF9leHBlbnNlX2RhdGEiLCJnZXRfZXhwZW5zZV9zdW1tYXJ5IiwiV0lEVEgiLCJIRUlHSFQiLCJHcmFwaCIsInByb3BzIiwiZ2VuZXJhdGVTVkciLCJiaW5kIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImFsZXJ0IiwieENvb3JkaW5hdGVzIiwieUNvb3JkaW5hdGVzIiwicG9pbnRzRWxlbWVudCIsInRleHRJbmRleCIsImluZGV4IiwicG9pbnRUZXh0IiwiV0VFS05BTUVTSE9SVCIsInRvVXBwZXJDYXNlIiwiTU9OVEhTTkFNRVNIT1JUIiwicHVzaCIsInBsb3REYXRhIiwiRElWSVNJT05MRU5HVEgiLCJtYXhMZW5nIiwiTUFYTEVOR1RIUEVSVEFCIiwibWF4QW10IiwieENvb3JkaW5hdGVEaXZMZW5ndGgiLCJsYXN0RGl2aXNpb24iLCJzdHIiLCJsYXN0WCIsImkiLCJtYXJnaW4iLCJyZW5kZXJQb2ludHMiLCJIb21lIiwibGVmdE1lbnVDbGljayIsIm5hdmlnYXRlVG9TaWduSW4iLCJzdGF0ZSIsImFjdGl2ZVRhYiIsInNob3dOZXdFeHBlbnNlIiwidmlld01vcmUiLCJ3ZWVrRGF0YSIsIm1vbnRoRGF0YSIsInllYXJEYXRhIiwidmlld2VkTW9yZSIsImdldEV4cGVuc2UiLCJjdXJyRGF0ZSIsInNldFN0YXRlIiwiY2F0Y2giLCJsb2FkTmV3U3VtbWFyeURhdGEiLCJnZXRQYXJhbXMiLCJhY3RpdmVUYWJEYXRhIiwiZmluZEN1cnJlbnREYXRhUHJvcCIsInJlc3AiLCJsb2FkTmV3RXhwZW5zZURhdGEiLCJyZWZzIiwiYmFja0Ryb3AiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJwb3B1cCIsIm90aGVySGFsZkxhbmRpbmdUeHQiLCJmaXJzdEhhbGZMYW5kaW5nVHh0IiwiYWRkQnRuQ29udGFpbmVyIiwibG9jYXRpb24iLCJocmVmIiwidmFsIiwic2F2ZVN1Y2Nlc3MiLCJ0cmFuc2FjdGVkQ2FyZCIsInNjcm9sbFRvcCIsImhhc0xpc3REZWZpbmVkIiwibG9hZGVyIiwiY3VycmVudFRhYkRhdGEiLCJtYXhXaWR0aCIsInJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkIiwiY2xpY2tWaWV3TW9yZSIsImN1cnJNb250aCIsIk1PTlRIU05BTUUiLCJ1bmRlZmluZWQiLCJyZW5kZXJMZWZ0TWVudUJhciIsImdldEN1cnJlbnREYXRlIiwiY2hhbmdlRXhwZW5zZURheUZvcm1hdCIsImdldFRyYW5zYWN0aW9uQ2FyZCIsIkxvZ2luIiwiaGVhZCIsImhpc3RvcnkiLCJzaWduZWRJbiIsInN1Y2Nlc3NmdWwiLCJ3aXRoVGVzdENyZWRzIiwidGFyZ2V0IiwidmFsdWUiLCJOZXdFeHBlbnNlIiwic2VsZWN0VHlwZSIsInN1Ym1pdE5ld0V4cGVuc2UiLCJkYXkiLCJ5ZWFyIiwiVE9EQVkiLCJ0b2RheVRhcCIsInllc3RlcmRheVRhcCIsIllFU1RFUkRBWSIsInNldERhdGUiLCJkYXRlUmVnIiwiZGF0ZVJlZ1llYXIiLCJ0ZXN0IiwicmVnIiwiaXNWYWxpZERhdGUiLCJpc1ZhbGlkYXRpb25TdWNjZXNzIiwidmFsaWRhdGVQYXJhbXMiLCJvcHRpb25zIiwiY2hhbmdlQW1vdW50IiwiY2hhbmdlRGF0ZSIsInJlbmRlck9wdGlvbnMiLCJOb3RGb3VuZCIsIndlZWsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJI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QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWUsWUFBTTtBQUNqQixXQUNJO0FBQUMsOEJBQUQ7QUFBQTtBQUNJLHNDQUFDLHFCQUFELElBQU8sTUFBSyxHQUFaLEVBQWdCLFdBQWhCLEVBQXNCLFFBQVEsZ0JBQUM1RixLQUFEO0FBQUEsdUJBQVcsOEJBQUMsZUFBRCxFQUFXQSxLQUFYLENBQVg7QUFBQSxhQUE5QixHQURKO0FBRUksc0NBQUMscUJBQUQsSUFBTyxNQUFLLFFBQVosRUFBcUIsV0FBckIsRUFBMkIsUUFBUSxnQkFBQ0EsS0FBRDtBQUFBLHVCQUFXLDhCQUFDLGVBQUQsRUFBV0EsS0FBWCxDQUFYO0FBQUEsYUFBbkMsR0FGSjtBQUdJLHNDQUFDLHFCQUFELElBQU8sTUFBSyxPQUFaLEVBQW9CLFdBQXBCLEVBQTBCLFFBQVEsZ0JBQUNBLEtBQUQ7QUFBQSx1QkFBVyw4QkFBQyxjQUFELEVBQVVBLEtBQVYsQ0FBWDtBQUFBLGFBQWxDLEdBSEo7QUFLSSxzQ0FBQyxxQkFBRCxJQUFPLE1BQUssR0FBWixFQUFnQixRQUFRLGdCQUFDQSxLQUFEO0FBQUEsdUJBQVcsOEJBQUMsa0JBQUQsRUFBY0EsS0FBZCxDQUFYO0FBQUEsYUFBeEI7QUFMSixLQURKO0FBU0gsQztBQWhCRCxvQzs7Ozs7Ozs7Ozs7QUNGQSxrQzs7Ozs7Ozs7Ozs7QUNBQSwyQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSw2QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zZXJ2ZXIvc2VydmVyLmpzXCIpO1xuIiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBhcHAgZnJvbSAnLi4vc2VydmVyJ1xuaW1wb3J0IEV4cGVuc2VzIGZyb20gJy4uL21vZGVscy9leHBlbnNlTW9kZWwnO1xuaW1wb3J0IFVzZXJzIGZyb20gJy4uL21vZGVscy91c2VyTW9kZWwnO1xuaW1wb3J0IHsgTU9OVEgsIFlFQVIsIFdFRUsgfSBmcm9tICcuLi8uLi9zcmMvcGFnZXMvY29uc3RhbnRzL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCBzaWduVXAgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAvLyBVc2Vycy5kZWxldGVNYW55KHt9KTtcbiAgICBjb25zdCB7IHVzZXJuYW1lID0gJycsIHBhc3N3b3JkID0gJycsIGVtYWlsSWQgPSAnJyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIHZhciB1c2VyID0gbmV3IFVzZXJzKHtcbiAgICAgICAgX2lkOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZCgpLFxuICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgZW1haWxJZDogZW1haWxJZFxuICAgIH0pO1xuICAgIFVzZXJzLmZpbmQoeyB1c2VybmFtZTogdXNlcm5hbWUgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiB0cnVlLCBtc2c6ICdVc2VybmFtZSBhbHJlYWR5IEV4aXN0cycgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNlc3Npb24uX3VzZXJJZCA9IGRvYy5pZDtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IGZhbHNlLCBtc2c6ICdTYXZlZCBTdWNjZXNzZnVsbHknIH0pO1xuICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zdGF0dXMoNTAwKS5zZW5kKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCAoZSkgPT4ge1xuICAgICAgICByZXNwb25zZS5zZW5kKGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaWduSW4gPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCB7IHVzZXJuYW1lID0gJycsIHBhc3N3b3JkID0gJycsIGVtYWlsSWQgPSAnJyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGNvbnNvbGUubG9nKHJlcXVlc3Quc2Vzc2lvbi51c2VyKTtcbiAgICBVc2Vycy5maW5kT25lKHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgIHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID0gcmVzLmlkO1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiBmYWxzZSwgbXNnOiAnc3VjY2VzcycgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXJyb3I6IHRydWUsIG1zZzogJ05vIHVzZXIgYWNjb3VudCBmb3VuZCcgfSk7XG4gICAgICAgIH1cbiAgICB9LCAoZSkgPT4ge1xuICAgICAgICByZXNwb25zZS5zZW5kKGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBsb2dvdXQgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICByZXF1ZXN0LnNlc3Npb24uX3VzZXJJZCA9IG51bGw7XG4gICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiBmYWxzZSwgbXNnOiAnc3VjY2VzcycgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VXNlckluZm8gPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBpZiAocmVxdWVzdC5zZXNzaW9uLl91c2VySWQpIHtcbiAgICAgICAgY29uc3QgaWQgPSBtb25nb29zZS5UeXBlcy5PYmplY3RJZChyZXF1ZXN0LnNlc3Npb24uX3VzZXJJZCk7XG4gICAgICAgIFVzZXJzLmZpbmRPbmUoeyBfaWQgOmlkfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXNlcm5hbWUgPSByZXMudXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IHVzZXJJbmZvOiB7dXNlcm5hbWU6IHVzZXJuYW1lfSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiB0cnVlLCBtc2c6ICdObyB1c2VyIGFjY291bnQgZm91bmQnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZChlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgIHtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZCgyMDApLnNlbmQoe2Vycm9yOiB0cnVlfSk7XG4gICAgfVxuICAgXG59O1xuXG5cbmV4cG9ydCBjb25zdCBuZXdFeHBlbnNlID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgbGV0IHsgYW1vdW50LCBjYXRlZ29yeSwgZGF0ZSwgdHlwZSB9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGFtb3VudCA9IHBhcnNlSW50KGFtb3VudCk7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIGNvbnN0IG1tID0gZGF0ZS5nZXRNb250aCgpO1xuICAgIGNvbnN0IHl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IGZpcnN0RGF5b2ZNb250aCA9IG5ldyBEYXRlKHl5LCBtbSwgMSkuZ2V0RGF5KCk7XG4gICAgY29uc3Qgd3cgPSBNYXRoLmNlaWwoKGZpcnN0RGF5b2ZNb250aCArIGRhdGUuZ2V0RGF0ZSgpKSAvIDcpO1xuICAgIGNvbnN0IGRvdyA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgY29uc3QgZGQgPSBkYXRlLmdldERhdGUoKTtcbiAgICBjb25zdCBuZXdFeHBlbnNlID0geyBhbW91bnQsIGNhdGVnb3J5LCBkYXRlLCB0eXBlLCB3dywgZG93LCBtbSwgeXksIGRkfTtcbiAgICB2YXIgbmV3RXhwZW5zZUluc3RhbmNlID0gbmV3IEV4cGVuc2VzKHtcbiAgICAgICAgdXNlcl9pZDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQocmVxdWVzdC5zZXNzaW9uLl91c2VySWQpLFxuICAgICAgICAuLi5uZXdFeHBlbnNlXG4gICAgfSk7XG4gICAgbmV3RXhwZW5zZUluc3RhbmNlLnNhdmUoKS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgLy8gcmVxdWVzdC5zZXNzaW9uLnVzZXIgPSBkb2MudXNlcm5hbWU7XG4gICAgICAgIHJlc3BvbnNlLnNlbmQoZG9jKTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gc2F2ZSBuZXcgRXhwZW5zZScsIGVycik7XG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyg1MDApLnNlbmQoZXJyKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRGF0YSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID8gbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQocmVxdWVzdC5zZXNzaW9uLl91c2VySWQpIDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoXCI1YzEwYmEyMzRmOGI2Mjk2YzA4ZTU4MThcIik7XG4gICAgZnVuY3Rpb24gZXhwZW5zZURhdGVSZXNwb25kZXIoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJlc3BvbmQuc2VuZCg1MDApLnNlbmQoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBleHBlbnNlTGlzdCA9IHt9LCBpbmNvbWVMaXN0PXt9O1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkubWFwKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVtrZXldLnR5cGUgPT09ICdleHBlbnNlJykge1xuICAgICAgICAgICAgICAgICAgICBleHBlbnNlTGlzdCA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFba2V5XS50eXBlID09PSAnaW5jb21lJykge1xuICAgICAgICAgICAgICAgICAgICBpbmNvbWVMaXN0ID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IHNwZW50LCBzdGFuZGluZztcbiAgICAgICAgICAgIGlmIChleHBlbnNlTGlzdCAmJiBleHBlbnNlTGlzdC50cmFuc2FjdGlvbkxpc3QpIHtcbiAgICAgICAgICAgICAgICBleHBlbnNlTGlzdC50cmFuc2FjdGlvbkxpc3QubWFwKCh0cmFuc2FjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyY2VudCA9IHRyYW5zYWN0aW9uLmFtb3VudCAvIChleHBlbnNlTGlzdC5hbW91bnQgLyAxMDApO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5wZXJjZW50ID0gTWF0aC5yb3VuZChwZXJjZW50ICogMTAwKSAvIDEwMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzcGVudCA9IGV4cGVuc2VMaXN0LmFtb3VudDtcbiAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgIHNwZW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmNvbWVMaXN0ICYmIGluY29tZUxpc3QudHJhbnNhY3Rpb25MaXN0KSB7XG4gICAgICAgICAgICAgICAgaW5jb21lTGlzdC50cmFuc2FjdGlvbkxpc3QubWFwKCh0cmFuc2FjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyY2VudCA9IHRyYW5zYWN0aW9uLmFtb3VudCAvIChpbmNvbWVMaXN0LmFtb3VudCAvIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLnBlcmNlbnQgPSBNYXRoLnJvdW5kKHBlcmNlbnQgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YW5kaW5nID0gaW5jb21lTGlzdC5hbW91bnQgLSBzcGVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhbmRpbmcgPSAwIC0gc3BlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZXhwZW5zZUxpc3Q6IGV4cGVuc2VMaXN0LCBpbmNvbWVMaXN0OiBpbmNvbWVMaXN0LCBzcGVudDogc3BlbnQsIHN0YW5kaW5nOiBzdGFuZGluZyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFF1ZXJpZXMgc3RhcnRcbiAgICBjb25zdCBncm91cDEgPSB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7IGNhdGVnb3J5OiAnJGNhdGVnb3J5JywgdHlwZTogJyR0eXBlJyB9LFxuICAgICAgICAgICAgdHlwZTogeyAnJGZpcnN0JzogJyR0eXBlJyB9LFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHsgJyRmaXJzdCc6ICckY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJHN1bTogJyRhbW91bnQnIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZ3JvdXAyID0ge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDogeyB0eXBlOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICBhbW91bnQ6IHsgJHN1bTogJyRhbW91bnQnIH0sXG4gICAgICAgICAgICB0eXBlOiB7ICckZmlyc3QnOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3Q6IHsgJHB1c2g6IHsgY2F0ZWdvcnk6ICckY2F0ZWdvcnknLCBhbW91bnQ6ICckYW1vdW50JyB9IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgdW53aW5kID0geyAkdW53aW5kOiAnJHRyYW5zYWN0aW9uTGlzdCcgfTtcbiAgICBjb25zdCBzb3J0ID0geyAkc29ydDogeyAndHJhbnNhY3Rpb25MaXN0LmFtb3VudCc6IC0xIH0gfVxuICAgIGNvbnN0IHJlR3JvdXAgPSB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgICAgX2lkOiB7IHR5cGU6ICckdHlwZScgfSxcbiAgICAgICAgICAgIGFtb3VudDogeyAnJGZpcnN0JzogJyRhbW91bnQnIH0sXG4gICAgICAgICAgICB0eXBlOiB7ICckZmlyc3QnOiAnJHR5cGUnIH0sXG4gICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3Q6IHsgJHB1c2g6ICckdHJhbnNhY3Rpb25MaXN0JyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIFF1ZXJpZXMgZW5kXG5cbiAgICBjb25zdCB7IHRhYiwgd3csIG1tLCB5eSwgZG93IH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgaWYgKHRhYiA9PT0gWUVBUikge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IE1PTlRIKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0seyAkbWF0Y2g6IHsgbW06IHBhcnNlSW50KG1tKSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMSB9LHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IFdFRUspIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHsgJG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9IH0sXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB5eTogcGFyc2VJbnQoeXkpIH0gfSx7ICRtYXRjaDogeyBtbTogcGFyc2VJbnQobW0pIH0gfSx7ICRtYXRjaDogeyB3dzogcGFyc2VJbnQod3cpIH0gfSxcbiAgICAgICAgICAgIHsgLi4uZ3JvdXAxIH0seyAuLi5ncm91cDIgfSxcbiAgICAgICAgICAgIHsgLi4udW53aW5kIH0seyAuLi5zb3J0IH0seyAuLi5yZUdyb3VwIH0sXG4gICAgICAgICAgICB7ICRwcm9qZWN0OiB7IF9pZDogMCwgYW1vdW50OiAxLCB0eXBlOiAxLCB0cmFuc2FjdGlvbkxpc3Q6IDEgfSB9XG4gICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4cGVuc2VEYXRlUmVzcG9uZGVyKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVN1bW1hcnkgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBmdW5jdGlvbiBleGVjU3VtbWFyeVF1ZXJ5KGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZXNwb25kLnNlbmQoNTAwKS5zZW5kKGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhWzBdICYmIGRhdGFbMF0ucGVyRGl2aXNpb25EYXRhKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1heEFtb3VudCA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSO1xuICAgICAgICAgICAgICAgIGRhdGFbMF0ucGVyRGl2aXNpb25EYXRhLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF4QW1vdW50IDwgZW50cnkuYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhBbW91bnQgPSBlbnRyeS5hbW91bnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRhdGFbMF0ubWF4QW1vdW50ID0gbWF4QW1vdW50O1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoey4uLmRhdGFbMF19KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHVzZXJJZCA9IHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID8gbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQocmVxdWVzdC5zZXNzaW9uLl91c2VySWQpIDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoXCI1YzEwYmEyMzRmOGI2Mjk2YzA4ZTU4MThcIik7XG4gICAgY29uc3Qge3RhYiwgeXksIG1tLCB3d30gPSByZXF1ZXN0LmJvZHk7XG4gICAgaWYgKHRhYiA9PT0gWUVBUikge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyRtYXRjaDogeyB1c2VyX2lkOiB1c2VySWQgfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHl5OiB5eX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB0eXBlOiAnZXhwZW5zZSd9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiB7IG1tOiAnJG1tJ30sIGFtb3VudDogeyRzdW06ICckYW1vdW50J30sIG1vbnRoOiB7JyRmaXJzdCc6ICckbW0nfX19LFxuICAgICAgICAgICAgeyRzb3J0OiB7IG1vbnRoOiAxIH19LFxuICAgICAgICAgICAgeyRncm91cDoge19pZDogbnVsbCwgdG90YWxBbW91bnQ6IHsnJHN1bSc6ICckYW1vdW50J30sIHBlckRpdmlzaW9uRGF0YTogeyRwdXNoIDogeyBhbW91bnQ6ICckYW1vdW50JywgZGl2aXNpb246ICckbW9udGgnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDogMH19XG4gICAgICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleGVjU3VtbWFyeVF1ZXJ5KTtcbiAgICB9IGVsc2UgaWYgKHRhYiA9PT0gTU9OVEgpIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdXNlcl9pZDogdXNlcklkIH19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB5eTogeXl9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgbW06IG1tfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHR5cGU6ICdleHBlbnNlJ319LFxuICAgICAgICAgICAgeyRncm91cDogeyBfaWQ6IHtkZDogJyRkZCd9LCBhbW91bnQ6IHsnJHN1bSc6ICckYW1vdW50J30sIGRkOiB7JyRmaXJzdCc6ICckZGQnfSB9fSxcbiAgICAgICAgICAgIHskc29ydDoge2RkOiAxfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7X2lkOiBudWxsLCB0b3RhbEFtb3VudDogeyckc3VtJzogJyRhbW91bnQnfSwgcGVyRGl2aXNpb25EYXRhOiB7JHB1c2g6IHthbW91bnQ6ICckYW1vdW50JywgZGl2aXNpb246ICckZGQnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDowfX1cbiAgICAgICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4ZWNTdW1tYXJ5UXVlcnkpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBXRUVLKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHVzZXJfaWQ6IHVzZXJJZCB9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgeXk6IHl5fX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IG1tOiBtbX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB3dzogd3d9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdHlwZTogJ2V4cGVuc2UnfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7IF9pZDoge2RvdzogJyRkb3cnfSwgYW1vdW50OiB7JHN1bTogJyRhbW91bnQnfSwgZG93OiB7JyRmaXJzdCc6ICckZG93J319fSxcbiAgICAgICAgICAgIHskc29ydDogeyBkb3c6IDF9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiBudWxsLCB0b3RhbEFtb3VudDogeyRzdW06ICckYW1vdW50J30sICBwZXJEaXZpc2lvbkRhdGE6IHskcHVzaDoge2Ftb3VudDogJyRhbW91bnQnLCBkaXZpc2lvbjogJyRkb3cnfX19fSxcbiAgICAgICAgICAgIHskcHJvamVjdDoge19pZDogMH19XG4gICAgICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleGVjU3VtbWFyeVF1ZXJ5KTtcbiAgICB9XG59IiwidmFyIGVudiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCc7XG5cbmlmIChlbnYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgcHJvY2Vzcy5lbnYuUE9SVCA9IDQwMDA7XG4gIC8vIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSA9ICdtb25nb2RiOi8vbG9jYWxob3N0OjI3MDE3L2V4cGVuc2UnO1xuICBwcm9jZXNzLmVudi5NT05HT0xBQl9VUkkgPSAnbW9uZ29kYjovL2RoaWxpcGsxMzpkaGlsaXBrMTNAZHMyNDczMTAubWxhYi5jb206NDczMTAvZXhwZW5zZSc7XG59IGVsc2Uge1xuICBwcm9jZXNzLmVudi5NT05HT0xBQl9VUkkgPSAnbW9uZ29kYjovL2RoaWxpcGsxMzpkaGlsaXBrMTNAZHMyNDczMTAubWxhYi5jb206NDczMTAvZXhwZW5zZSc7XG59XG4iLCJ2YXIgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xubW9uZ29vc2UuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xubW9uZ29vc2UuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0xBQl9VUkksIHsgdXNlTW9uZ29DbGllbnQ6IHRydWUgfSkudGhlbigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB0byBEYicpO1xufSwoZSk9PiB7XG4gICAgY29uc29sZS5sb2coZSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0ge21vbmdvb3NlfTtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgVXNlcnMgZnJvbSAnLi91c2VyTW9kZWwnO1xuXG5jb25zdCBFeHBlbnNlcyA9IG1vbmdvb3NlLm1vZGVsKCdFeHBlbnNlcycsIHtcbiAgdXNlcl9pZDoge1xuICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICByZWY6ICdVc2VycydcbiAgfSxcbiAgYW1vdW50OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHRyaW06IHRydWVcbiAgfSxcbiAgY2F0ZWdvcnk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICAgIGRlZmF1bHQ6ICdvdGhlcnMnXG4gIH0sXG4gIHR5cGU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWUsXG4gICAgZGVmYXVsdDogJ2V4cGVuc2UnXG4gIH0sXG4gIGRhdGU6IHtcbiAgICB0eXBlOiBEYXRlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlLFxuICAgIGRlZmF1bHQ6IERhdGUubm93KClcbiAgfSxcbiAgZGQ6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgd3c6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgZG93OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIG1tOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH0sXG4gIHl5OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0cmltOiB0cnVlXG4gIH1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZXM7IiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBFeHBlbnNlcyBmcm9tICcuL2V4cGVuc2VNb2RlbCc7XG5cbmNvbnN0IFVzZXJzID0gbW9uZ29vc2UubW9kZWwoJ1VzZXJzJywge1xuICAgIF9pZDogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuICAgIHVzZXJuYW1lOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbmxlbmd0aDogNSxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgZW1haWxJZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWlubGVuZ3RoOiA4LFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBleHBlbnNlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCwgXG4gICAgICAgICAgICByZWY6ICdFeHBlbnNlcydcbiAgICAgICAgfVxuICAgIF1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgVXNlcnM7IiwicmVxdWlyZSgnLi9jb25maWcvY29uZmlnJyk7XG5pbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCBlbnYgZnJvbSAnLi9jb25maWcvY29uZmlnJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xudmFyIHNlc3Npb24gPSByZXF1aXJlKCdleHByZXNzLXNlc3Npb24nKTtcblxuaW1wb3J0IEFwcCBmcm9tICcuLi9zcmMvYXBwJ1xuaW1wb3J0ICcuL2RiL21vbmdvb3NlJztcbmltcG9ydCB7c2lnblVwLCBzaWduSW4sIG5ld0V4cGVuc2UsIGdldEV4cGVuc2VEYXRhLCBnZXRFeHBlbnNlU3VtbWFyeSwgbG9nb3V0LCBnZXRVc2VySW5mb30gZnJvbSAnLi9hcGkvYXBpQ2FsbHMnO1xuXG5jb25zdCBNb25nb1N0b3JlID0gcmVxdWlyZSgnY29ubmVjdC1tb25nbycpKHNlc3Npb24pO1xuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQ7XG5cbmFwcC51c2Uoc2Vzc2lvbih7XG4gICAgc2VjcmV0OiAnZm9vJyxcbiAgICByZXNhdmU6IHRydWUsXG4gICAgc3RvcmU6IG5ldyBNb25nb1N0b3JlKHtcbiAgICAgICAgdXJsOiBwcm9jZXNzLmVudi5NT05HT0xBQl9VUklcbiAgICB9KVxufSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKCdidWlsZC9wdWJsaWMnKSk7XG5hcHAudXNlKCcvc3R5bGVzJywgZXhwcmVzcy5zdGF0aWMoJ3NyYy9wYWdlcy9zdHlsZXMnKSk7XG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKCdzcmMvcGFnZXMvc3RhdGljJykpO1xuXG4vLyBBUEkgQ2FsbHNcbmFwcC5wb3N0KCcvc2lnbnVwJywgc2lnblVwKTtcbmFwcC5wb3N0KCcvc2lnbmluJywgc2lnbkluKTtcbmFwcC5wb3N0KCcvbG9nb3V0JywgbG9nb3V0KTtcbmFwcC5wb3N0KCcvdXNlcmluZm8nLCBnZXRVc2VySW5mbyk7XG5hcHAucG9zdCgnL25ld19leHBlbnNlJywgbmV3RXhwZW5zZSk7XG5hcHAucG9zdCgnL2dldF9leHBlbnNlX2RhdGEnLCBnZXRFeHBlbnNlRGF0YSk7XG5hcHAucG9zdCgnL2dldF9leHBlbnNlX3N1bW1hcnknLCBnZXRFeHBlbnNlU3VtbWFyeSk7XG5cbmNvbnN0IGxvYWRIdG1sID0gKGNvbnRlbnQpID0+IHtcbiAgICByZXR1cm4gKGBcbiAgICAgICAgPGh0bWw+XG4gICAgICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cIm1hbmlmZXN0XCIgaHJlZj1cIi9tYW5pZmVzdC5qc29uXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvaW1nL2J1ZGdldDY0LnBuZ1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvdHdpdHRlci1ib290c3RyYXAvNC4xLjMvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy90d2l0dGVyLWJvb3RzdHJhcC80LjEuMy9qcy9ib290c3RyYXAuYnVuZGxlLm1pbi5qc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9jb21tb24uY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL2hvbWUuY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL2xvZ2luLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9uZXdfZXhwZW5zZS5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvbm90Zm91bmQuY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnNcIiByZWw9XCJzdHlsZXNoZWV0XCI+XG4gICAgICAgICAgICA8L2hlYWQ+XG4gICAgICAgICAgICA8Ym9keT5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicm9vdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxzY3JpcHQgc3JjID0gXCIvc3dSZWdpc3RlcmVyLmpzXCI+XG4gICAgICAgICAgICAgICAgPC9zY3JpcHQ+XG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJjbGllbnRfYnVuZGxlLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICA8L2JvZHk+XG4gICAgICAgIDwvaHRtbD5gKTtcbn07XG5cbmFwcC5nZXQoJyonLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGxvYWRIdG1sKCk7XG4gICAgcmVzLnNlbmQodGVtcGxhdGUpO1xufSk7XG5cbmFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdTZXJ2ZXIgU3RhcnRlZCBvbiBQb3J0OiAnLCBwb3J0KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhcHA7XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN3aXRjaCwgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IEhvbWUgZnJvbSAnLi9wYWdlcy9jb21wb25lbnRzL0xvZ2luJztcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi9wYWdlcy9yb3V0ZXMvcm91dGVzJztcbmltcG9ydCB7U2VydmVyUm91dGVyfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Um91dGVzLz5cbiAgICAgICAgKTtcbiAgICB9XG59IiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGNvbnN0IHNpZ251cCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9zaWdudXAvJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBzaWduaW4gPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvc2lnbmluLyc7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgey4uLnBhcmFtc30pO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0VXNlckluZm8gPSAoKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvdXNlcmluZm8vJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7fSk7XG59XG5cbmV4cG9ydCBjb25zdCBsb2dvdXRVc2VyID0gKCkgPT4ge1xuICBjb25zdCB1cmwgPSAnL2xvZ291dC8nO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHt9KTtcbn1cblxuZXhwb3J0IGNvbnN0IG5ld19leHBlbnNlID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL25ld19leHBlbnNlLyc7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgey4uLnBhcmFtc30pO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0X2V4cGVuc2VfZGF0YSA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9nZXRfZXhwZW5zZV9kYXRhLycgO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHBhcmFtcyk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRfZXhwZW5zZV9zdW1tYXJ5ID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL2dldF9leHBlbnNlX3N1bW1hcnkvJyA7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgcGFyYW1zKTtcbn1cbiIsIlxuY29uc3QgV0lEVEggPSAxODA7XG5jb25zdCBIRUlHSFQgPSAxMTU7XG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtESVZJU0lPTkxFTkdUSCwgTUFYTEVOR1RIUEVSVEFCLCBNT05USFNOQU1FU0hPUlQsIE1PTlRILCBXRUVLLCBZRUFSLCBXRUVLTkFNRVNIT1JUfSBmcm9tICcuLi9jb25zdGFudHMvY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmdlbmVyYXRlU1ZHID0gdGhpcy5nZW5lcmF0ZVNWRy5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29ucmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFsZXJ0KCdhdHRhY2hFdmVudCAtIHJlc2l6ZScpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyUG9pbnRzKHhDb29yZGluYXRlcywgeUNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgcG9pbnRzRWxlbWVudCA9IFtdO1xuICAgIGNvbnN0IHRhYiA9IHRoaXMucHJvcHMudGFiO1xuICAgIGxldCB0ZXh0SW5kZXggPSAwO1xuICAgIGZvcihsZXQgaW5kZXggPSAxOyBpbmRleCA8IHhDb29yZGluYXRlcy5sZW5ndGggLSAxOyBpbmRleCsrKSB7XG4gICAgICBsZXQgcG9pbnRUZXh0ID0gJyc7XG4gICAgICBpZiAodGFiID09PSBXRUVLKSB7XG4gICAgICAgIHBvaW50VGV4dCA9IFdFRUtOQU1FU0hPUlRbdGV4dEluZGV4KytdLnRvVXBwZXJDYXNlKCk7XG4gICAgICB9IGVsc2UgaWYgKHRhYiA9PT0gWUVBUikge1xuICAgICAgICBwb2ludFRleHQgPSBNT05USFNOQU1FU0hPUlRbdGV4dEluZGV4KytdLnRvVXBwZXJDYXNlKCk7XG4gICAgICB9IGVsc2UgaWYgKHRhYiA9PT0gTU9OVEggKSB7XG4gICAgICAgIGlmIChpbmRleCAlIDIgIT09IDApIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBwb2ludFRleHQgPSBpbmRleDtcbiAgICAgIH1cbiAgICAgIHBvaW50c0VsZW1lbnQucHVzaChcbiAgICAgICAgPGcga2V5PXsnZ3JvdXBfJyArIGluZGV4fT5cbiAgICAgICAgICA8YT5cbiAgICAgICAgICA8dGV4dCBjbGFzc05hbWU9XCJmYlwiIHg9e3hDb29yZGluYXRlc1tpbmRleF19IGZpbGw9XCIjNzU3NTc1XCIgeT17eUNvb3JkaW5hdGVzW2luZGV4XSAtIDV9IGZvbnRTaXplPVwiNVwiIHRleHRBbmNob3I9XCJtaWRkbGVcIj57cG9pbnRUZXh0fTwvdGV4dD5cbiAgICAgICAgICA8Y2lyY2xlIGN4PXt4Q29vcmRpbmF0ZXNbaW5kZXhdfSBjeT17eUNvb3JkaW5hdGVzW2luZGV4XX0gc3Ryb2tlPVwiIzQ2ODhGMVwiIGZpbGw9XCIjNDY4OEYxXCIgcj1cIjFcIiBzdHJva2VXaWR0aD1cIjFcIj48L2NpcmNsZT5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZz5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBwb2ludHNFbGVtZW50O1xuICB9XG5cbiAgZ2VuZXJhdGVTVkcoKSB7XG4gICAgY29uc3Qge3Bsb3REYXRhLCB0YWJ9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB4Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICBjb25zdCB5Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICBjb25zdCBsZW5ndGggPSBESVZJU0lPTkxFTkdUSFt0YWJdO1xuICAgIGNvbnN0IG1heExlbmcgPSBNQVhMRU5HVEhQRVJUQUJbdGFiXTtcbiAgICBjb25zdCBtYXhBbXQgPSBwbG90RGF0YS5tYXhBbW91bnQ7XG4gICAgY29uc3QgeENvb3JkaW5hdGVEaXZMZW5ndGggPSAoV0lEVEggLyBsZW5ndGgpO1xuICAgIGxldCBsYXN0RGl2aXNpb24gPSB0YWIgPT09IE1PTlRIID8gMCA6IC0xOyAvLyBCZWNhdXNlIHdlIHNob3cgb25seSBkYXRlcyBpbiBtb250aCBkaXZpc2lvbiBiZWdpbnMgd2l0aCAxIHNvIGxhc3Qgc2h1ZCBiZSAwIFxuXG4gICAgbGV0IHN0ciA9ICcnO1xuXG4gICAgLyogVG8gc3RhcnQgdGhlIGdyYXBoIGF0IHRoZSBMZWFzdCBQb2ludCAqL1xuICAgIHhDb29yZGluYXRlcy5wdXNoKDApO1xuICAgIHlDb29yZGluYXRlcy5wdXNoKEhFSUdIVCk7XG4gICAgcGxvdERhdGEucGVyRGl2aXNpb25EYXRhLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICB3aGlsZSAoZW50cnkuZGl2aXNpb24gPiBsYXN0RGl2aXNpb24pIHtcbiAgICAgICAgY29uc3QgbGFzdFggPSB4Q29vcmRpbmF0ZXNbeENvb3JkaW5hdGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICB4Q29vcmRpbmF0ZXMucHVzaCgobGFzdFggKyB4Q29vcmRpbmF0ZURpdkxlbmd0aCkpO1xuICAgICAgICBpZiAoZW50cnkuZGl2aXNpb24gPT09IGxhc3REaXZpc2lvbiArIDEpIHtcbiAgICAgICAgICBjb25zdCBwZXJjZW50ID0gKChlbnRyeS5hbW91bnQgLyBtYXhBbXQpICogMTAwKTtcbiAgICAgICAgICB5Q29vcmRpbmF0ZXMucHVzaChIRUlHSFQgLSAoKEhFSUdIVCAvIDEwMCkgKiBwZXJjZW50KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0RGl2aXNpb24rKztcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyB0byBwdXNoIHZhbHVlcyBmb3IgcmVtYWluaW5nIGRheXNcbiAgICB3aGlsZShtYXhMZW5nID4gbGFzdERpdmlzaW9uKSB7XG4gICAgICBjb25zdCBsYXN0WCA9IHhDb29yZGluYXRlc1t4Q29vcmRpbmF0ZXMubGVuZ3RoIC0gMV07XG4gICAgICB4Q29vcmRpbmF0ZXMucHVzaCgobGFzdFggKyB4Q29vcmRpbmF0ZURpdkxlbmd0aCkpO1xuICAgICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUKTtcbiAgICAgIGxhc3REaXZpc2lvbisrO1xuICAgIH1cbiAgICBjb25zdCBsYXN0WCA9IHhDb29yZGluYXRlc1t4Q29vcmRpbmF0ZXMubGVuZ3RoIC0gMV07XG4gICAgeENvb3JkaW5hdGVzLnB1c2goKGxhc3RYICsgeENvb3JkaW5hdGVEaXZMZW5ndGgpKTtcbiAgICB5Q29vcmRpbmF0ZXMucHVzaChIRUlHSFQpO1xuIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeENvb3JkaW5hdGVzW2ldICsgJywnICsgeUNvb3JkaW5hdGVzW2ldICsgJyAnO1xuICAgIH1cbiAgICBpZiAoc3RyKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzdmcgdmlld0JveD17Jy01IC0xMCAnICsgKFdJRFRIICsgMzUpICsgJyAnICsgKEhFSUdIVCArIDE1KX0gc3R5bGU9e3ttYXJnaW46ICcxMHB4J319PlxuICAgICAgICAgICAgPHBvbHlsaW5lIHBvaW50cz17c3RyfSBjbGFzc05hbWU9XCJncmFwaFBsb3RMaW5lXCIgLz5cbiAgICAgICAgICAgIHt0aGlzLnJlbmRlclBvaW50cyh4Q29vcmRpbmF0ZXMsIHlDb29yZGluYXRlcyl9XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuZ2VuZXJhdGVTVkcoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCBOZXdFeHBlbnNlIGZyb20gJy4vTmV3RXhwZW5zZSc7XG5pbXBvcnQge2dldF9leHBlbnNlX2RhdGEsIGdldF9leHBlbnNlX3N1bW1hcnksIGdldFVzZXJJbmZvLCBsb2dvdXRVc2VyfSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5pbXBvcnQge01PTlRILCBZRUFSLCBXRUVLLCBNT05USFNOQU1FfSBmcm9tICcuLi9jb25zdGFudHMvY29uc3RhbnRzJztcbmltcG9ydCBHcmFwaCBmcm9tICcuL0dyYXBoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMubGVmdE1lbnVDbGljayA9IHRoaXMubGVmdE1lbnVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmV3RXhwZW5zZSA9IHRoaXMubmV3RXhwZW5zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmF2aWdhdGVUb1NpZ25JbiA9IHRoaXMubmF2aWdhdGVUb1NpZ25Jbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhY3RpdmVUYWI6IE1PTlRILFxuICAgICAgc2hvd05ld0V4cGVuc2U6IGZhbHNlLFxuICAgICAgdmlld01vcmU6IGZhbHNlLFxuICAgICAgd2Vla0RhdGE6IHt9LFxuICAgICAgbW9udGhEYXRhOiB7fSxcbiAgICAgIHllYXJEYXRhOiB7fVxuICAgIH1cbiAgICB0aGlzLnZpZXdlZE1vcmUgPSB7fTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmdldEV4cGVuc2UoKTtcbiAgICB0aGlzLmdldEV4cGVuc2VTdW1tYXJ5KCk7XG4gICAgdGhpcy51c2VySW5mbygpO1xuICB9XG4gIC8vIFRvIGdpdmUgdGhlIHByb3AgaW4gdGhlIHN0YXRlIHRvIGNoZWNrIGF2YWlsYWJpbGl0eSBvZiBkYXRhXG4gIGN1cnJlbnRUYWJEYXRhKCkge1xuICAgIGNvbnN0IHthY3RpdmVUYWJ9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAoYWN0aXZlVGFiID09PSBXRUVLKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGF0ZS53ZWVrRGF0YTtcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZVRhYiA9PT0gTU9OVEgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlLm1vbnRoRGF0YTtcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZVRhYiA9PT0gWUVBUikge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhdGUueWVhckRhdGE7XG4gICAgfVxuICB9XG5cbiAgZmluZEN1cnJlbnREYXRhUHJvcCgpIHtcbiAgICBjb25zdCB7YWN0aXZlVGFifSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKGFjdGl2ZVRhYiA9PT0gV0VFSykge1xuICAgICAgcmV0dXJuICd3ZWVrRGF0YSc7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVUYWIgPT09IE1PTlRIKSB7XG4gICAgICByZXR1cm4gJ21vbnRoRGF0YSc7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVUYWIgPT09IFlFQVIpIHtcbiAgICAgIHJldHVybiAneWVhckRhdGEnO1xuICAgIH1cbiAgfVxuXG4gIGdldFBhcmFtcygpIHtcbiAgICBjb25zdCB0YWIgPSB0aGlzLnN0YXRlLmFjdGl2ZVRhYjtcbiAgICBjb25zdCBjdXJyRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbW0gPSBjdXJyRGF0ZS5nZXRNb250aCgpO1xuICAgIGNvbnN0IGRvdyA9IGN1cnJEYXRlLmdldERheSgpO1xuICAgIGNvbnN0IHl5ID0gY3VyckRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgIGNvbnN0IGZpcnN0RGF5b2ZNb250aCA9IG5ldyBEYXRlKHl5LCBtbSwgMSkuZ2V0RGF5KCk7XG4gICAgY29uc3Qgd3cgPSBNYXRoLmNlaWwoKGZpcnN0RGF5b2ZNb250aCArIGN1cnJEYXRlLmdldERhdGUoKSkgLyA3KTtcbiAgICBcbiAgICBjb25zdCBwYXJhbXMgPSB7dGFiLCBtbSwgZG93LCB3dywgeXl9O1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICB1c2VySW5mbygpIHtcbiAgICBnZXRVc2VySW5mbygpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLnVzZXJJbmZvKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1c2VySW5mbzogcmVzLmRhdGEudXNlckluZm99KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGVUb1NpZ25JbigpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKCgpID0+IHtcbiAgICAgIHRoaXMubmF2aWdhdGVUb1NpZ25JbigpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0RXhwZW5zZVN1bW1hcnkobG9hZE5ld1N1bW1hcnlEYXRhKSB7XG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5nZXRQYXJhbXMoKTtcbiAgICBjb25zdCBhY3RpdmVUYWJEYXRhID0gdGhpcy5maW5kQ3VycmVudERhdGFQcm9wKCk7XG5cbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5zdGF0ZVthY3RpdmVUYWJEYXRhXSkubGVuZ3RoID09PSAwIHx8IGxvYWROZXdTdW1tYXJ5RGF0YSkge1xuICAgICAgZ2V0X2V4cGVuc2Vfc3VtbWFyeShwYXJhbXMpLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7W2FjdGl2ZVRhYkRhdGFdIDogey4uLnRoaXMuc3RhdGVbYWN0aXZlVGFiRGF0YV0sIHBsb3REYXRhOiB7Li4ucmVzcC5kYXRhfX19KTtcbiAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBHZXQgRXhwZW5zZSBTdW1tYXJ5IERldGFpbHMnLCBlcnIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RXhwZW5zZShsb2FkTmV3RXhwZW5zZURhdGEpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcygpO1xuICAgIGNvbnN0IGFjdGl2ZVRhYkRhdGEgPSB0aGlzLmZpbmRDdXJyZW50RGF0YVByb3AoKTtcbiAgICBcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5zdGF0ZVthY3RpdmVUYWJEYXRhXSkubGVuZ3RoID09PSAwIHx8IGxvYWROZXdFeHBlbnNlRGF0YSkge1xuICAgICAgZ2V0X2V4cGVuc2VfZGF0YShwYXJhbXMpLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgICAgY29uc3Qge2V4cGVuc2VMaXN0LCBpbmNvbWVMaXN0LCBzdGFuZGluZywgc3BlbnR9ID0gcmVzcC5kYXRhO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtbYWN0aXZlVGFiRGF0YV0gOiB7Li4udGhpcy5zdGF0ZVthY3RpdmVUYWJEYXRhXSwgZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHN0YW5kaW5nLCBzcGVudH19KTtcbiAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIEdldCBFeHBlbnNlIERldGFpbHMnLCBlcnIpO1xuICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoYWN0aXZlVGFiKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlVGFiOiBhY3RpdmVUYWIsIHZpZXdNb3JlOiBmYWxzZX0sICgpID0+IHtcbiAgICAgIHRoaXMuZ2V0RXhwZW5zZSgpO1xuICAgICAgdGhpcy5nZXRFeHBlbnNlU3VtbWFyeSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbGVmdE1lbnVDbGljaygpIHtcbiAgICB0aGlzLnJlZnMuYmFja0Ryb3AuY2xhc3NMaXN0LnRvZ2dsZSgnYmFja0Ryb3AnKTtcbiAgICB0aGlzLnJlZnMucG9wdXAuY2xhc3NMaXN0LnRvZ2dsZSgncmlnaHQwJyk7XG4gICAgaWYgKHRoaXMucmVmcy5vdGhlckhhbGZMYW5kaW5nVHh0KSB7XG4gICAgICB0aGlzLnJlZnMuZmlyc3RIYWxmTGFuZGluZ1R4dC5jbGFzc0xpc3QudG9nZ2xlKCdzY2FsZTkwJyk7XG4gICAgICB0aGlzLnJlZnMub3RoZXJIYWxmTGFuZGluZ1R4dC5jbGFzc0xpc3QudG9nZ2xlKCdzY2FsZTkwJyk7XG4gICAgfVxuICAgIHRoaXMucmVmcy5hZGRCdG5Db250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnZG4nKTtcbiAgICBcbiAgfVxuXG4gIG5hdmlnYXRlVG9TaWduSW4oKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUudXNlckluZm8pIHtcbiAgICAgIGxvZ291dFVzZXIoKS50aGVuKCgpID0+IHtcbiAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbG9naW4nO1xuICAgICAgfSk7XG4gICAgfSBlbHNlICB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbG9naW4nO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlckxlZnRNZW51QmFyKCkge1xuICAgIGNvbnN0IHt1c2VySW5mb30gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudUJhclwiPlxuICAgICAgICA8ZGl2IHJlZj1cInBvcHVwXCJjbGFzc05hbWU9XCJwb3B1cCB6aTIgXCIgb25DbGljaz17dGhpcy5sZWZ0TWVudUNsaWNrfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGVCYXIgaW4tYmwgZmxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIj5TZXR0aW5nczwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51LW9wdGlvblwiIG9uQ2xpY2s9e3RoaXMubmF2aWdhdGVUb1NpZ25Jbn0+eyghdXNlckluZm8gPyAnU2lnbiBJbicgOiAnTG9nb3V0Jyl9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtb3B0aW9uXCI+QWJvdXQgTWU8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgbmV3RXhwZW5zZSh2YWwsIHNhdmVTdWNjZXNzKSB7XG4gICAgaWYgKHNhdmVTdWNjZXNzKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtzaG93TmV3RXhwZW5zZTogdmFsLCB3ZWVrRGF0YToge30sIG1vbnRoRGF0YToge30sIHllYXJEYXRhOiB7fX0sICgpID0+IHtcbiAgICAgICAgdGhpcy5nZXRFeHBlbnNlKHNhdmVTdWNjZXNzKTtcbiAgICAgICAgdGhpcy5nZXRFeHBlbnNlU3VtbWFyeShzYXZlU3VjY2Vzcyk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd05ld0V4cGVuc2U6IHZhbH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsaWNrVmlld01vcmUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dmlld01vcmU6ICF0aGlzLnN0YXRlLnZpZXdNb3JlfSk7XG4gICAgdGhpcy5yZWZzLnRyYW5zYWN0ZWRDYXJkLnNjcm9sbFRvcCA9IDA7XG4gIH1cblxuICByZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZChoYXNMaXN0RGVmaW5lZCkge1xuICAgIGlmICghaGFzTGlzdERlZmluZWQpIHtcbiAgICAgIGNvbnN0IGxvYWRlciA9IFtdO1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDI7IGkrKyl7XG4gICAgICAgIGxvYWRlci5wdXNoKFxuICAgICAgICAgIDxkaXYga2V5PXsndHJhbnNhY3Rpb25fdHlwZV8nICsgaX0gY2xhc3NOYW1lPVwidHJhbnNhY3RlZENhcmRJbm5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkSW5uZXJoZWFkaW5nXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9wZXJjZW50IHByb2dyZXNzQmFyIGZsIG0wIG10MTBcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZ3Jlc3NCYXIgYmwgdGV4dENlbnRlciBtdDMwXCIgPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbG9hZGVyO1xuICAgIH1cblxuICAgIGNvbnN0IHtleHBlbnNlTGlzdH0gPSB0aGlzLmN1cnJlbnRUYWJEYXRhKCk7XG4gICAgcmV0dXJuIChcbiAgICAgIGV4cGVuc2VMaXN0LnRyYW5zYWN0aW9uTGlzdC5tYXAoKHRyYW5zYWN0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS52aWV3TW9yZSB8fCB0aGlzLnZpZXdlZE1vcmVbdGhpcy5zdGF0ZS5hY3RpdmVUYWJdIHx8ICF0aGlzLnN0YXRlLnZpZXdNb3JlICYmIGluZGV4IDwgMikge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnZpZXdNb3JlKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdlZE1vcmVbdGhpcy5zdGF0ZS5hY3RpdmVUYWJdID0gdHJ1ZTsgLy8gVG8gbm90IHJlbW92ZSBlbGVtZW50IGZyb20gRE9NIG9uIGNsaWNraW5nIHZpZXcgTW9yZSBhZ2FpblxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBrZXk9eyd0cmFuc2FjdGlvbl90eXBlXycgKyBpbmRleH0gY2xhc3NOYW1lPVwidHJhbnNhY3RlZENhcmRJbm5lclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRJbm5lcmhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRfbmFtZVwiPnt0cmFuc2FjdGlvbi5jYXRlZ29yeX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0X3BlcmNlbnQgXCI+e3RyYW5zYWN0aW9uLnBlcmNlbnQgKyAnICUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7LyogPHNwYW4gY2xhc3NOYW1lPVwiY2F0X25hbWUgbG9hZGVyXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9wZXJjZW50IGxvYWRlclwiPjwvc3Bhbj4gKi99XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzQmFyIGJsIHRleHRDZW50ZXIgbWFyZ2luVDI1XCIgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsbGVkXCIgc3R5bGU9IHt7bWF4V2lkdGg6IHRyYW5zYWN0aW9uLnBlcmNlbnQgKyAnJSd9fT5cbiAgICAgICAgICAgICAgICAgIHsvKiA8ZGl2IGNsYXNzTmFtZT1cImZpbGxlZFwiID48L2Rpdj4gKi99XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgKTtcbiAgfVxuXG4gIGdldFRyYW5zYWN0aW9uQ2FyZCgpIHtcbiAgICBjb25zdCBjdXJyZW50VGFiRGF0YSA9IHRoaXMuY3VycmVudFRhYkRhdGEoKTtcbiAgICBjb25zdCB7YWN0aXZlVGFiLCB2aWV3TW9yZSA9IGZhbHNlLCB1c2VySW5mb30gPSB0aGlzLnN0YXRlO1xuICAgIC8vIGNvbnN0IGhhc05vRGF0YSA9IGN1cnJlbnRUYWJEYXRhLmV4cGVuc2VMaXN0ICYmIE9iamVjdC5rZXlzKGN1cnJlbnRUYWJEYXRhLmV4cGVuc2VMaXN0KS5sZW5ndGggPT09IDA7XG4gICAgY29uc3QgaGFzTGlzdERlZmluZWQgPSBjdXJyZW50VGFiRGF0YS5leHBlbnNlTGlzdDsgLy8gVG8gZGV0ZXJtaW5lIGlmIHRoZSBjYWxsIGlzIGNvbXBsZXRlZFxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IHJlZj1cInRyYW5zYWN0ZWRDYXJkXCIgY2xhc3NOYW1lPXsndHJhbnNhY3RlZENhcmQgdHJhbnNpdGlvbjFhICcgKyAodmlld01vcmUgPyAnc2hvd0FsbFRyYW5zYWN0aW9uJyA6ICcnKX0+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYW5zYWN0U2Nyb2xsZXJcIj5cbiAgICAgICAgICAgICAge3R5cGVvZihoYXNMaXN0RGVmaW5lZCkgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5rZXlzKGhhc0xpc3REZWZpbmVkKS5sZW5ndGggPT09IDA/XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIHBhZFQyMCBtaDEwcFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdj5ObyBUcmFuc2FjdGlvbnMgYWRkZWQgPC9kaXY+XG4gICAgICAgICAgICAgICAgICB7IXVzZXJJbmZvICYmIDxkaXYgY2xhc3NOYW1lPVwicGFkVDEwIHBhZEIyMFwiPjxhIGhyZWY9XCIvbG9naW5cIj48c3Bhbj5TaWduIEluPC9zcGFuPjwvYT4gZm9yIFBhc3QgVHJhbnNhY3Rpb25zPC9kaXY+fVxuICAgICAgICAgICAgICAgIDwvZGl2PjpcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IFdFRUsgPyB0aGlzLnJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKGhhc0xpc3REZWZpbmVkKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBNT05USCA/IHRoaXMucmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQoaGFzTGlzdERlZmluZWQpIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IFlFQVIgPyB0aGlzLnJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKGhhc0xpc3REZWZpbmVkKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgPC9kaXY+IFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aWV3TW9yZUFycm93XCIgb25DbGljaz17KCkgPT4gdGhpcy5jbGlja1ZpZXdNb3JlKCl9PlxuICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9e3ZpZXdNb3JlID8gJ3JvdGF0ZVZpZXdNb3JlJyA6ICcnfSByZWY9XCJzdmdWaWV3TW9yZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNy40MSA3Ljg0TDEyIDEyLjQybDQuNTktNC41OEwxOCA5LjI1bC02IDYtNi02elwiLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zUmVsXCI+XG4gICAgICAgICAgICA8ZGl2IHJlZj1cImFkZEJ0bkNvbnRhaW5lclwiIGNsYXNzTmFtZT17J2FkZEJ0bkNvbnRhaW5lciAnfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZGRCdG5cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLm5ld0V4cGVuc2UodHJ1ZSl9PiArIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICB9XG4gIGdldEN1cnJlbnREYXRlKCkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGN1cnJNb250aCA9IE1PTlRIU05BTUVbZGF0ZS5nZXRNb250aCgpXTtcbiAgICBjb25zdCBjdXJyRGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIHJldHVybiBjdXJyRGF0ZSArICcgJyArIGN1cnJNb250aCArICcgJyArIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7YWN0aXZlVGFiLCBzaG93TmV3RXhwZW5zZSwgdmlld01vcmUgPSBmYWxzZX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtzdGFuZGluZyA9IHVuZGVmaW5lZCwgc3BlbnQgPSB1bmRlZmluZWQsIHBsb3REYXRhID0gdW5kZWZpbmVkLCBpbmNvbWVMaXN0ID0gdW5kZWZpbmVkfSA9IHRoaXMuY3VycmVudFRhYkRhdGEoKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IHJlZj1cImJhY2tEcm9wXCIgY2xhc3NOYW1lPXsndHJhbnNpdGlvbjJhIHppMSAnICsgKHNob3dOZXdFeHBlbnNlID8gJ2JhY2tEcm9wJyA6ICcnKX0gb25DbGljaz17KCkgPT4gdGhpcy5uZXdFeHBlbnNlKGZhbHNlKX0+PC9kaXY+XG4gICAgICAgICAge3RoaXMucmVuZGVyTGVmdE1lbnVCYXIoKX1cbiAgICAgICAgICA8ZGl2IHJlZj1cIm1haW5Db250ZW50XCIgY2xhc3NOYW1lPVwibWFpbkNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlyc3QtaGFsZi1sYW5kaW5nXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgcmVmPVwiZmlyc3RIYWxmTGFuZGluZ1R4dFwiIGNsYXNzTmFtZT1cInRyYW5zaXRpb24wXzUgXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGFuZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGVmdC1tZW51LWNvbnRhaW5lclwiIG9uQ2xpY2s9e3RoaXMubGVmdE1lbnVDbGlja30+PGltZyBjbGFzc05hbWU9XCJsZWZ0LW1lbnVcIiBzcmM9XCIvaW1nL21lbnUuc3ZnXCIvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHsvKiA8c3BhbiBjbGFzc05hbWU9XCJyaWdodC1tZW51LWNvbnRhaW5lclwiIG9uQ2xpY2s9eygpID0+IHt0aGlzLnNldFN0YXRlKHt2aXNpYmxlUmlnaHRNZW51OiB0cnVlfSl9fT48aW1nIGNsYXNzTmFtZT1cInJpZ2h0LW1lbnVcIiBzcmM9XCIvaW1nL21lbnUuc3ZnXCIvPjwvc3Bhbj4gKi99XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZiIGYxMVwiPkNVUlJFTlQgQkFMQU5DRTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZjE4XCI+4oK5IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RhbmRpbmdBbXRcIj57KHR5cGVvZihzdGFuZGluZykgIT09ICd1bmRlZmluZWQnID8gc3RhbmRpbmcgOiAnMCcpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PHNwYW4gY2xhc3NOYW1lPVwiZjExXCI+e3RoaXMuZ2V0Q3VycmVudERhdGUoKX08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2VEYXlzQnRuXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBXRUVLID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdChXRUVLKX19PldlZWs8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBNT05USCA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHt0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoTU9OVEgpfX0+TW9udGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoYWN0aXZlVGFiID09PSBZRUFSID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdChZRUFSKX19PlllYXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGVudEluY29tZVNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW4tYmwgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmwgaW4tYmwgc3BlbnRJY29uXCIgPlxuICAgICAgICAgICAgICAgICAgICAgIDxzdmcgIHdpZHRoPVwiMjFcIiBoZWlnaHQ9XCIxN1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTI0IDEyYzAtNi42MjctNS4zNzMtMTItMTItMTJzLTEyIDUuMzczLTEyIDEyIDUuMzczIDEyIDEyIDEyIDEyLTUuMzczIDEyLTEyem0tMTcgMWg0di04aDJ2OGg0bC01IDYtNS02elwiLz48L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3ViSGVhZGluZyBpbi1ibFwiPnsnU3BlbnQgOiDigrknICsgKHR5cGVvZihzcGVudCkgIT09ICd1bmRlZmluZWQnPyBzcGVudDogJzAnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluLWJsICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbCBpbi1ibCBpbmNvbWVJY29uIFwiID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImZsIGluLWJsXCIgd2lkdGg9XCIyMVwiIGhlaWdodD1cIjE3XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMCAxMmMwIDYuNjI3IDUuMzczIDEyIDEyIDEyczEyLTUuMzczIDEyLTEyLTUuMzczLTEyLTEyLTEyLTEyIDUuMzczLTEyIDEyem0xNy0xaC00djhoLTJ2LThoLTRsNS02IDUgNnpcIi8+PC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkhlYWRpbmcgaW4tYmxcIj57J0luY29tZSA6IOKCuScgKyAoaW5jb21lTGlzdCAmJiB0eXBlb2YoaW5jb21lTGlzdC5hbW91bnQpICE9PSAndW5kZWZpbmVkJyA/IGluY29tZUxpc3QuYW1vdW50IDogJzAnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldFRyYW5zYWN0aW9uQ2FyZCgpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3Bsb3REYXRhICYmIHBsb3REYXRhLnBlckRpdmlzaW9uRGF0YSAmJiAgcGxvdERhdGEucGVyRGl2aXNpb25EYXRhLmxlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm90aGVyLWhhbGYtbGFuZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPVwib3RoZXJIYWxmTGFuZGluZ1R4dFwiIGNsYXNzTmFtZT1cInRyYW5zaXRpb24wXzUgXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXIgdHJTdW1hcnlIZWFkaW5nIGZiXCIgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57J0V4cGVuc2UgVHJlbmRzJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IFdFRUsgPyAgPEdyYXBoIHBsb3REYXRhPXtwbG90RGF0YX0gdGFiPXthY3RpdmVUYWJ9Lz4gOiBudWxsfVxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gTU9OVEggPyAgPEdyYXBoIHBsb3REYXRhPXtwbG90RGF0YX0gdGFiPXthY3RpdmVUYWJ9Lz4gOiBudWxsfVxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gWUVBUiA/ICA8R3JhcGggcGxvdERhdGE9e3Bsb3REYXRhfSB0YWI9e2FjdGl2ZVRhYn0vPiA6IG51bGx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7c2hvd05ld0V4cGVuc2UgPyBcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgIDxOZXdFeHBlbnNlIG5ld0V4cGVuc2U9e3RoaXMubmV3RXhwZW5zZX0vPlxuICAgICAgICAgIDwvZGl2PiA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCB7c2lnbnVwLCBzaWduaW59IGZyb20gJy4uL2FwaUNhbGxzL0FwaUNhbGxzJztcblxuY2xhc3MgTG9naW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNpZ25VcCA9IHRoaXMuc2lnblVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaWduSW4gPSB0aGlzLnNpZ25Jbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB1c2VybmFtZTogJycsXG4gICAgICBwYXNzd29yZDogJydcbiAgICB9XG4gIH1cblxuICBoZWFkKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0PlxuICAgICAgICA8dGl0bGU+RXhwZW5zZSBMb2dpbjwvdGl0bGU+XG4gICAgICA8L0hlbG1ldD5cbiAgICApO1xuICB9XG5cbiAgc3VjY2Vzc2Z1bChyZXNwKSB7XG4gICAgaWYgKHJlc3AuZGF0YSAmJiAhcmVzcC5kYXRhLmVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvaG9tZScsIHt9KTtcbiAgICAgIGlmICh0eXBlb2Yod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93LnNpZ25lZEluID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBTaWduSW4nLCByZXNwKTtcbiAgICB9XG4gIH1cblxuICBzaWduVXAoKSB7XG4gICAgc2lnbnVwKHt1c2VybmFtZTogdGhpcy5zdGF0ZS51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMuc3RhdGUucGFzc3dvcmR9KVxuICAgICAgLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgICAgdGhpcy5zdWNjZXNzZnVsKHJlc3ApO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZygnRmFpbGVkIHRvIFNpZ251cCcpKTtcbiAgfVxuXG4gIHNpZ25Jbih3aXRoVGVzdENyZWRzKSB7XG4gICAgbGV0IHt1c2VybmFtZSwgcGFzc3dvcmR9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAod2l0aFRlc3RDcmVkcykge1xuICAgICAgdXNlcm5hbWUgPSAnZGhpbGlwJztcbiAgICAgIHBhc3N3b3JkID0gJ2RoaWxpcGRoaWxpcCc7XG4gICAgfVxuICAgIHNpZ25pbih7dXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmR9KS50aGVuKChyZXNwKSA9PiB7XG4gICAgICB0aGlzLnN1Y2Nlc3NmdWwocmVzcCk7XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBTaWduSW4nLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5oZWFkKCl9XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dpbkNvbnRhaW5lciB3aGl0ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZHNEaXZcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VybmFtZVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ3aGl0ZUJyZHJCdG0gd2hpdGVcIiBwbGFjZWhvbGRlcj0nVXNlcm5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLnVzZXJuYW1lfSBvbkNoYW5nZSA9IHsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7dXNlcm5hbWU6IGUudGFyZ2V0LnZhbHVlfSl9IHR5cGU9XCJ0ZXh0XCIvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXNzd29yZCBwYWRUMTBcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwid2hpdGVCcmRyQnRtIHdoaXRlXCIgcGxhY2Vob2xkZXI9J1Bhc3N3b3JkJyB2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZH0gb25DaGFuZ2UgPSB7KGUpID0+IHRoaXMuc2V0U3RhdGUoe3Bhc3N3b3JkOiBlLnRhcmdldC52YWx1ZX0pfSB0eXBlPVwicGFzc3dvcmRcIi8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXIgcGFkVDIwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3IGRpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmV3QnRuXCJvbkNsaWNrPXsoKSA9PiB0aGlzLnNpZ25JbihmYWxzZSl9PlNpZ24gSW48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ldyBkaVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5ld0J0blwiIG9uQ2xpY2s9e3RoaXMuc2lnblVwfT5TaWduIFVwPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIHBhZFQyMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ld1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5ld0J0blwiIG9uQ2xpY2s9eygpID0+IHRoaXMuc2lnbkluKHRydWUpfT5Db250aW51ZSB3aXRoIFRlc3QgTG9naW48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTG9naW47IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge25ld19leHBlbnNlfSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5pbXBvcnQge01PTlRIU05BTUVTSE9SVCwgVE9EQVksIFlFU1RFUkRBWX0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbnN0YW50cyc7XG4vLyBpbXBvcnQge2NvbW1hRm9ybWF0dGVkfSBmcm9tICcuLi91dGlscy91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0V4cGVuc2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnNlbGVjdFR5cGUgPSB0aGlzLnNlbGVjdFR5cGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN1Ym1pdE5ld0V4cGVuc2UgPSB0aGlzLnN1Ym1pdE5ld0V4cGVuc2UuYmluZCh0aGlzKTtcbiAgICBcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdHlwZTogJ2V4cGVuc2UnLFxuICAgICAgYW1vdW50OiAnJyxcbiAgICAgIGNhdGVnb3J5OiAnJyxcbiAgICAgIGRheTogJycsIFxuICAgICAgbW9udGg6ICcnLFxuICAgICAgeWVhcjogJycsXG4gICAgICBlcnJvcjoge31cbiAgICB9XG4gIH1cblxuICBzZWxlY3RUeXBlKHR5cGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt0eXBlOiB0eXBlfSk7XG4gIH1cblxuICBjaGFuZ2VBbW91bnQodmFsKXtcbiAgICB0aGlzLnNldFN0YXRlKHthbW91bnQ6IHZhbH0pXG4gIH1cblxuICBjaGFuZ2VEYXRlKHZhbCkge1xuICAgIGlmICh2YWwgPT09IFRPREFZKSB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB0b2RheVRhcDp0cnVlLCB5ZXN0ZXJkYXlUYXA6IGZhbHNlLCBkYXk6IGRhdGUuZ2V0RGF0ZSgpLCBtb250aDogZGF0ZS5nZXRNb250aCgpLCB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCl9KTtcbiAgICB9IGVsc2UgaWYgKHZhbCA9PSBZRVNURVJEQVkpIHtcbiAgICAgIGxldCBjdXJyRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGN1cnJEYXRlLnNldERhdGUoY3VyckRhdGUuZ2V0RGF0ZSgpIC0gMSkpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRvZGF5VGFwOiBmYWxzZSwgeWVzdGVyZGF5VGFwOiB0cnVlLCBkYXk6IGRhdGUuZ2V0RGF0ZSgpLCBtb250aDogZGF0ZS5nZXRNb250aCgpLCB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCl9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Li4udmFsfSk7XG4gICAgfVxuICB9XG5cbiAgaXNWYWxpZERhdGUoKSB7XG4gICAgY29uc3Qge2RheSwgbW9udGgsIHllYXJ9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBkYXRlUmVnID0gL15cXGR7MSwyfSQvO1xuICAgIGNvbnN0IGRhdGVSZWdZZWFyID0gL15cXGR7NH0kLztcbiAgICBpZiAoIWRhdGVSZWcudGVzdChkYXkpIHx8ICFkYXRlUmVnLnRlc3QobW9udGgpIHx8ICFkYXRlUmVnWWVhci50ZXN0KHllYXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KHllYXIpLCBwYXJzZUludChtb250aCksIHBhcnNlSW50KGRheSkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHZhbGlkYXRlUGFyYW1zKCkge1xuICAgIHZhciByZWcgPSAvXlxcZCskLztcbiAgICBjb25zdCB7YW1vdW50LCBjYXRlZ29yeX0gPSB0aGlzLnN0YXRlO1xuICAgIGlmICghYW1vdW50IHx8ICFyZWcudGVzdChhbW91bnQpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2Ftb3VudDogJ1BsZWFzZSBwcm92aWRlIGEgVmFsaWQgQW1vdW50J319KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFjYXRlZ29yeSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHtjYXRlZ29yeTogJ1BsZWFzZSBwcm92aWRlIGEgVmFsaWQgQ2F0ZWdvcnknfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNWYWxpZERhdGUoKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHtkYXRlOiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBEYXRlJ319KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgc3VibWl0TmV3RXhwZW5zZSgpIHtcbiAgICBjb25zdCB7YW1vdW50LCBkYXksIG1vbnRoLCB5ZWFyLCB0eXBlLCBjYXRlZ29yeX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGlzVmFsaWRhdGlvblN1Y2Nlc3MgPSB0aGlzLnZhbGlkYXRlUGFyYW1zKCk7XG4gICAgaWYgKGlzVmFsaWRhdGlvblN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgYW1vdW50LCB0eXBlLCBkYXRlOiB0aGlzLmRhdGUsIGNhdGVnb3J5fTtcbiAgICAgIG5ld19leHBlbnNlKHBhcmFtcykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5uZXdFeHBlbnNlKGZhbHNlLCB0cnVlKTtcbiAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBjcmVhdGUgbmV3IEV4cGVuc2UnLGVycik7XG4gICAgICAgIHRoaXMucHJvcHMubmV3RXhwZW5zZShmYWxzZSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyT3B0aW9ucyh0eXBlKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGlmICh0eXBlID09PSAnZGF5Jykge1xuICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24+REQ8L29wdGlvbj4pO1xuICAgICAgZm9yKGxldCBpID0gMTsgaSA8IDMyIDsgaSsrKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uIHZhbHVlPXtpfT57aX08L29wdGlvbj4pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ21vbnRoJykge1xuICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24+TU08L29wdGlvbj4pO1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEyIDsgaSsrKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uIHZhbHVlPXtpfT57TU9OVEhTTkFNRVNIT1JUW2ldfTwvb3B0aW9uPik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAneWVhcicpIHtcbiAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uPllZPC9vcHRpb24+KTtcbiAgICAgIGZvcihsZXQgaSA9IDIwMjA7IGkgPiAyMDAwIDsgaS0tKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uIHZhbHVlPXtpfT57aX08L29wdGlvbj4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7dHlwZSwgYW1vdW50LCBkYXksIG1vbnRoLCB5ZWFyLCBjYXRlZ29yeSwgZXJyb3J9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ld0V4cGVuc2VDb250YWluZXIgemkyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwSW5jQnRucyB0ZXh0Q2VudGVyIG1UMjVcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eyduZXdCdG4gJyArICh0eXBlID09PSAnZXhwZW5zZScgPyAnc2VsZWN0ZWRUeXBlJyA6ICcnKX0gIG9uQ2xpY2s9eygpID0+IHRoaXMuc2VsZWN0VHlwZSgnZXhwZW5zZScpfT5FeHBlbnNlPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J25ld0J0biAnICsgKHR5cGUgPT09ICdpbmNvbWUnID8gJ3NlbGVjdGVkVHlwZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2VsZWN0VHlwZSgnaW5jb21lJyl9PkluY29tZTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW1vdW50SW5wdXQgbVQyNSBcIj5cbiAgICAgICAgPHNwYW4+4oK5PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJwYWRMMTBcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQW1vdW50XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZUFtb3VudChlLnRhcmdldC52YWx1ZSl9IHZhbHVlPXthbW91bnR9Lz5cbiAgICAgICAgICB7ZXJyb3IuYW1vdW50ID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5hbW91bnR9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgIGNsYXNzTmFtZT1cImNhdGVnb3J5SW5wdXQgbVQyNSBcIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwicGFkTDEwXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkNhdGVnb3J5XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHtjYXRlZ29yeTogZS50YXJnZXQudmFsdWV9KX0gdmFsdWU9e2NhdGVnb3J5fS8+XG4gICAgICAgICAge2Vycm9yLmNhdGVnb3J5ID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5jYXRlZ29yeX08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGVudERheSBtVDI1IFwiPlxuICAgICAgICAgIHsvKiA8aW5wdXQgcmVmPVwiZGF5XCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiRERcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7ZGF5OiBlLnRhcmdldC52YWx1ZX0sICdkYXknLCAnbW9udGgnKX0gdmFsdWU9e2RheX0vPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJtb250aFwiIGNsYXNzTmFtZT1cImRheUlwXCIgdHlwZT1cIm51bWJlclwiIG1heExlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIk1NXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe21vbnRoOiBlLnRhcmdldC52YWx1ZX0sICdtb250aCcsICd5ZWFyJyl9IHZhbHVlPXttb250aH0vPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJ5ZWFyXCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiWVlcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7eWVhcjogZS50YXJnZXQudmFsdWV9LCAneWVhcicpfSB2YWx1ZT17eWVhcn0vPiAqL31cbiAgICAgICAgICA8c2VsZWN0IHJlZj1cImRheVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHtkYXk6IGUudGFyZ2V0LnZhbHVlfSl9IHZhbHVlPXt0aGlzLnN0YXRlLmRheX0+e3RoaXMucmVuZGVyT3B0aW9ucygnZGF5Jyl9PC9zZWxlY3Q+XG4gICAgICAgICAgPHNlbGVjdCByZWY9XCJtb250aFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHttb250aDogZS50YXJnZXQudmFsdWV9KX0gdmFsdWU9e3RoaXMuc3RhdGUubW9udGh9Pnt0aGlzLnJlbmRlck9wdGlvbnMoJ21vbnRoJyl9PC9zZWxlY3Q+XG4gICAgICAgICAgPHNlbGVjdCByZWY9XCJ5ZWFyXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe3llYXI6IGUudGFyZ2V0LnZhbHVlfSl9IHZhbHVlPXt0aGlzLnN0YXRlLnllYXJ9Pnt0aGlzLnJlbmRlck9wdGlvbnMoJ3llYXInKX08L3NlbGVjdD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10MjBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J20xMCAnICsgKHRoaXMuc3RhdGUudG9kYXlUYXAgPyAnYWN0aXZlVGFwT3B0aW9uJzogJ3RhcE9wdGlvbicpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLmNoYW5nZURhdGUoVE9EQVkpfT5Ub2RheTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J20xMCAnICsgKHRoaXMuc3RhdGUueWVzdGVyZGF5VGFwID8gJ2FjdGl2ZVRhcE9wdGlvbic6ICd0YXBPcHRpb24nKX0gIG9uQ2xpY2s9eygpID0+IHRoaXMuY2hhbmdlRGF0ZShZRVNURVJEQVkpfT5ZZXN0ZXJkYXk8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2Vycm9yLmRhdGUgPyA8ZGl2IGNsYXNzTmFtZT1cImVycm9yRGl2XCI+e2Vycm9yLmRhdGV9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VibWl0QnRuXCIgb25DbGljaz17dGhpcy5zdWJtaXROZXdFeHBlbnNlfT5Eb25lPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IHtOYXZMaW5rfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY2xhc3MgTm90Rm91bmQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhlYWQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxIZWxtZXQ+XG4gICAgICAgIDx0aXRsZT5QYWdlIE5vdCBGb3VuZDwvdGl0bGU+XG4gICAgICA8L0hlbG1ldD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5oZWFkKCl9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90Zm91bmRDb250YWluZXJcIj5cbiAgICAgICAgICA8aDUgY2xhc3NOYW1lPVwibm90Rm91bmRUZXh0IGZiIHRleHRDZW50ZXJcIj5Tb3JyeSwgdGhpcyBwYWdlIGRvZXMgbm90IGV4aXN0ITwvaDU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJub3Rmb3VuZFVMIHRleHRDZW50ZXJcIj5cbiAgICAgICAgICAgIHsvKiA8bGk+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmx1ZUJ0blwiPlxuICAgICAgICAgICAgICAgIDxOYXZMaW5rIHRvPScvaG9tZScgY2xhc3NOYW1lPVwid2hpdGVcIj4gSG9tZSA8L05hdkxpbms+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT4gKi99XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmx1ZUJ0blwiPlxuICAgICAgICAgICAgICA8TmF2TGluayB0bz0nL2xvZ2luJyBjbGFzc05hbWU9XCJ3aGl0ZVwiPiBMb2dpbiA8L05hdkxpbms+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE5vdEZvdW5kOyIsImV4cG9ydCBjb25zdCBNT05USCA9ICdtb250aCc7XG5leHBvcnQgY29uc3QgWUVBUiA9ICd5ZWFyJztcbmV4cG9ydCBjb25zdCBXRUVLID0gJ3dlZWsnO1xuZXhwb3J0IGNvbnN0IERJVklTSU9OTEVOR1RIID0geyBtb250aDogMzEsIHllYXI6IDEyLCB3ZWVrOiA3fTsgXG5leHBvcnQgY29uc3QgTUFYTEVOR1RIUEVSVEFCID0geyBtb250aDogMzEsIHllYXI6MTEsIHdlZWs6IDZ9O1xuZXhwb3J0IGNvbnN0IE1PTlRIU05BTUUgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXTtcbmV4cG9ydCBjb25zdCAgTU9OVEhTTkFNRVNIT1JUID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xuZXhwb3J0IGNvbnN0IFdFRUtOQU1FU0hPUlQgPSBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddO1xuZXhwb3J0IGNvbnN0IFRPREFZID0gJ3RvZGF5JztcbmV4cG9ydCBjb25zdCBZRVNURVJEQVkgPSAneWVzdGVyZGF5JztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0Jyb3dzZXJSb3V0ZXIsIFN3aXRjaCwgUm91dGV9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuLy8gaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCBMb2dpbiBmcm9tICcuLi9jb21wb25lbnRzL0xvZ2luJztcbmltcG9ydCBOb3RGb3VuZCBmcm9tICcuLi9jb21wb25lbnRzL05vdEZvdW5kJ1xuaW1wb3J0IEhvbWUgZnJvbSAnLi4vY29tcG9uZW50cy9Ib21lJztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxTd2l0Y2g+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD0nLycgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxMb2dpbiB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvbG9naW4nIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8TG9naW4gey4uLnByb3BzfS8+fS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD0nL2hvbWUnIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8SG9tZSB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIHsvKiA8Um91dGUgcGF0aD0nLycgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxIb21lIHsuLi5wcm9wc30vPn0vPiAqL31cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScqJyByZW5kZXI9eyhwcm9wcykgPT4gPE5vdEZvdW5kIHsuLi5wcm9wc30vPn0vPlxuICAgICAgICA8L1N3aXRjaD5cbiAgICApO1xufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbm5lY3QtbW9uZ29cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLXNlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaGVsbWV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=