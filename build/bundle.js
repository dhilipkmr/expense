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
exports.getFrequentCategories = exports.editExpense = exports.deleteExpenseDate = exports.getExpenseSummary = exports.getExpenseData = exports.newExpense = exports.getUserInfo = exports.logout = exports.signIn = exports.signUp = undefined;

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

var _bcryptjs = __webpack_require__(/*! bcryptjs */ "bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var signUp = exports.signUp = function signUp(request, response) {
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
        password: password
    });
    _userModel2.default.find({ username: username }).then(function (res) {
        if (res.length > 0) {
            response.send({ error: true, msg: 'Username already Exists' });
        } else {
            user.save().then(function (doc) {
                request.session.token = doc.token;
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
    _userModel2.default.findOne({ username: username }).then(function (doc) {
        if (doc) {
            _bcryptjs2.default.compare(password, doc.password, function (err) {
                if (!err) {
                    request.session.token = doc.token;
                    response.send({ error: false, msg: 'success' });
                } else {
                    response.send({ error: true, msg: 'Invalid password' });
                }
            });
        } else {
            response.send({ error: true, msg: 'No user account found' });
        }
    }, function (e) {
        response.send(e);
        console.log(e);
    });
};

var logout = exports.logout = function logout(request, response) {
    request.session.token = null;
    response.send({ error: false, msg: 'success' });
};

var getUserInfo = exports.getUserInfo = function getUserInfo(request, response) {
    if (request.session.token) {
        var token = request.session.token;
        _userModel2.default.findOne({ token: token }).then(function (res) {
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
        date = _request$body3.date;
    var _request$body4 = request.body,
        ww = _request$body4.ww,
        dow = _request$body4.dow,
        mm = _request$body4.mm,
        yy = _request$body4.yy,
        dd = _request$body4.dd,
        type = _request$body4.type,
        category = _request$body4.category,
        description = _request$body4.description;

    amount = parseInt(amount);
    date = new Date(date);
    var newExpense = { amount: amount, category: category, date: date, type: type, ww: ww, dow: dow, mm: mm, yy: yy, dd: dd, description: description };
    var newExpenseInstance = new _expenseModel2.default(_extends({
        token: request.session.token
    }, newExpense));
    newExpenseInstance.save().then(function (doc) {
        response.send(doc);
    }, function (err) {
        console.log('Failed to save new Expense', err);
        response.status(500).send(err);
    });
};

var getExpenseData = exports.getExpenseData = function getExpenseData(request, response) {
    var token = request.session.token ? request.session.token : '';
    var activeFilter = request.body.activeFilter;

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
            var _request$body5 = request.body,
                _yy = _request$body5.yy,
                _mm = _request$body5.mm,
                _ww = _request$body5.ww,
                dd = _request$body5.dd;

            response.send({ dd: dd, mm: _mm, yy: _yy, ww: _ww, expenseList: expenseList, incomeList: incomeList, spent: spent, standing: standing });
        }
    }

    // Queries start
    var group1 = {
        $group: {
            _id: { category: '$category', type: '$type' },
            type: { '$first': '$type' },
            category: { '$first': '$category' },
            date: { '$first': '$date' },
            amount: { $sum: '$amount' }
        }
    };
    var group2 = {
        $group: {
            _id: { type: '$type' },
            amount: { $sum: '$amount' },
            type: { '$first': '$type' },
            transactionList: { $push: { category: '$category', amount: '$amount', date: '$date', id: '$_id', description: '$description' } }
        }
    };
    var unwind = { $unwind: '$transactionList' };
    var sort = {};
    if (activeFilter === 'spentRate') {
        sort = { $sort: { 'transactionList.amount': -1 } };
    } else {
        sort = { $sort: { 'transactionList.date': -1 } };
    }
    var reGroup = {
        $group: {
            _id: { type: '$type' },
            amount: { '$first': '$amount' },
            type: { '$first': '$type' },
            transactionList: { $push: '$transactionList' }
        }
    };
    // Queries end

    var _request$body6 = request.body,
        tab = _request$body6.tab,
        ww = _request$body6.ww,
        mm = _request$body6.mm,
        yy = _request$body6.yy,
        dow = _request$body6.dow;

    if (tab === _constants.YEAR) {
        _expenseModel2.default.aggregate([{ $match: { token: token } }, { $match: { yy: parseInt(yy) } }, _extends({}, group2), _extends({}, unwind), _extends({}, sort), _extends({}, reGroup), { $project: { _id: 0, amount: 1, type: 1, transactionList: 1 } }]).allowDiskUse(true).exec(expenseDateResponder);
    } else if (tab === _constants.MONTH) {
        _expenseModel2.default.aggregate([{ $match: { token: token } }, { $match: { yy: parseInt(yy) } }, { $match: { mm: parseInt(mm) } }, _extends({}, group2), _extends({}, unwind), _extends({}, sort), _extends({}, reGroup), { $project: { _id: 0, amount: 1, type: 1, transactionList: 1 } }]).allowDiskUse(true).exec(expenseDateResponder);
    } else if (tab === _constants.WEEK) {
        _expenseModel2.default.aggregate([{ $match: { token: token } }, { $match: { yy: parseInt(yy) } }, { $match: { mm: parseInt(mm) } }, { $match: { ww: parseInt(ww) } }, _extends({}, group2), _extends({}, unwind), _extends({}, sort), _extends({}, reGroup), { $project: { _id: 0, amount: 1, type: 1, transactionList: 1 } }]).allowDiskUse(true).exec(expenseDateResponder);
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
    var token = request.session.token ? request.session.token : '';
    var _request$body7 = request.body,
        tab = _request$body7.tab,
        yy = _request$body7.yy,
        mm = _request$body7.mm,
        ww = _request$body7.ww;

    if (tab === _constants.YEAR) {
        _expenseModel2.default.aggregate([{ $match: { token: token } }, { $match: { yy: yy } }, { $match: { type: 'expense' } }, { $group: { _id: { mm: '$mm' }, amount: { $sum: '$amount' }, month: { '$first': '$mm' } } }, { $sort: { month: 1 } }, { $group: { _id: null, totalAmount: { '$sum': '$amount' }, perDivisionData: { $push: { amount: '$amount', division: '$month' } } } }, { $project: { _id: 0 } }]).allowDiskUse(true).exec(execSummaryQuery);
    } else if (tab === _constants.MONTH) {
        _expenseModel2.default.aggregate([{ $match: { token: token } }, { $match: { yy: yy } }, { $match: { mm: mm } }, { $match: { type: 'expense' } }, { $group: { _id: { dd: '$dd' }, amount: { '$sum': '$amount' }, dd: { '$first': '$dd' } } }, { $sort: { dd: 1 } }, { $group: { _id: null, totalAmount: { '$sum': '$amount' }, perDivisionData: { $push: { amount: '$amount', division: '$dd' } } } }, { $project: { _id: 0 } }]).allowDiskUse(true).exec(execSummaryQuery);
    } else if (tab === _constants.WEEK) {
        _expenseModel2.default.aggregate([{ $match: { token: token } }, { $match: { yy: yy } }, { $match: { mm: mm } }, { $match: { ww: ww } }, { $match: { type: 'expense' } }, { $group: { _id: { dow: '$dow' }, amount: { $sum: '$amount' }, dow: { '$first': '$dow' } } }, { $sort: { dow: 1 } }, { $group: { _id: null, totalAmount: { $sum: '$amount' }, perDivisionData: { $push: { amount: '$amount', division: '$dow' } } } }, { $project: { _id: 0 } }]).allowDiskUse(true).exec(execSummaryQuery);
    }
};

var deleteExpenseDate = exports.deleteExpenseDate = function deleteExpenseDate(request, response) {
    var id = request.body.id;

    _expenseModel2.default.findOneAndRemove({ _id: id }).then(function (doc) {
        response.send(doc);
    });
};

var editExpense = exports.editExpense = function editExpense(request, response) {
    var _request$body8 = request.body,
        amount = _request$body8.amount,
        date = _request$body8.date;
    var _request$body9 = request.body,
        id = _request$body9.id,
        ww = _request$body9.ww,
        dow = _request$body9.dow,
        mm = _request$body9.mm,
        yy = _request$body9.yy,
        dd = _request$body9.dd,
        type = _request$body9.type,
        category = _request$body9.category,
        description = _request$body9.description;

    amount = parseInt(amount);
    date = new Date(date);
    var newExpense = { amount: amount, category: category, date: date, type: type, ww: ww, dow: dow, mm: mm, yy: yy, dd: dd, description: description };
    _expenseModel2.default.findOneAndUpdate({ _id: id }, { $set: { 'amount': amount, 'category': category, 'date': date, 'type': type, 'ww': ww, 'dd': dd, 'mm': mm, 'yy': yy, 'dow': dow, 'description': description } }, { upsert: true, returnNewDocument: true }).then(function (doc) {
        response.send({ err: false });
    });
};

var getFrequentCategories = exports.getFrequentCategories = function getFrequentCategories(request, response) {
    var token = request.session.token;

    _expenseModel2.default.aggregate([{ $match: { token: token } }, { $match: { type: "expense" } }, { $group: { _id: '$category', category: { '$first': '$category' }, count: { $sum: 1 } } }, { $sort: { 'count': -1 } }, { $project: { '_id': 0, category: 1, count: 1 } }]).allowDiskUse(true).exec(function (err, data) {
        if (err) {
            response.status(200).send({ error: true, msg: err });
        } else {
            response.status(200).send({ error: false, data: [].concat(_toConsumableArray(data)) });
        }
    });
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
  token: {
    type: String,
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
  description: {
    type: String,
    required: false,
    trim: true
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

var _bcryptjs = __webpack_require__(/*! bcryptjs */ "bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
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
    token: {
        type: String,
        required: false
    },
    expense: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Expenses'
    }]
});

function generateToken(userDoc, next) {
    _bcryptjs2.default.genSalt(10, function (err, salt) {
        if (err) {
            console.log('Unable to generate Salt for Token', err);
        } else {
            _bcryptjs2.default.hash(userDoc._id.toHexString() + userDoc.password.toString(), salt, function (err, hash) {
                if (err) {
                    console.log('Unable to generate Hash for Token', err);
                } else {
                    userDoc.token = hash;
                    next();
                }
            });
        }
    });
}

// Specific to all entries in document, 'this' refers to a document
UserSchema.pre('save', function (next) {
    var userDoc = this;
    if (userDoc.isModified('password')) {
        _bcryptjs2.default.genSalt(10, function (err, salt) {
            if (err) {
                console.log('Unable to generate Salt', err);
            } else {
                _bcryptjs2.default.hash(userDoc.password, salt, function (err, hash) {
                    if (err) {
                        console.log('Unable to generate Hash', err);
                    } else {
                        userDoc.password = hash;
                        generateToken(userDoc, next);
                    }
                });
            }
        });
    } else {
        generateToken(userDoc, next);
    }
});

var Users = _mongoose2.default.model('Users', UserSchema);
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
app.post('/delete_expense_date', _apiCalls.deleteExpenseDate);
app.post('/edit_expense', _apiCalls.editExpense);
app.get('/getFrequentCategories', _apiCalls.getFrequentCategories);

var loadHtml = function loadHtml(content) {
    return '\n        <html>\n            <head>\n                <meta name="viewport" content="width=device-width, initial-scale=1.0">\n                <link rel="manifest" href="/manifest.json">\n                <link rel="icon" href="/img/budget64.png">\n                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">\n                <style>\n                    @keyframes rippleLoader {\n                        100% {\n                            transform: scale(700);\n                            opacity: 0;\n                          }\n                    }\n                </style>\n            </head>\n            <body>\n                <div id="root"></div>\n                <script>\n                    window.loader = true;\n                    document.getElementById(\'root\').innerHTML =\n                        \'<div>                            </div>                                <div style="position: relative">                                    <div style="color: #fff; background-color: #0757d0; border-radius: 100%; width: 35px; height: 35px; text-align: center; margin: 50vh auto;z-index: 7;position: relative;">                                        <div style="padding: 11px"/>                                            <svg x="0px" y="0px" width="13px" height="13px" viewBox="0 0 401.998 401.998" style={{"enable-background" :"new 0 0 401.998 401.998", "xml:space": "preserve"}}>                                                <g>                                                    <g>                                                        <path d="M326.62,91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52   c2.669,0,4.853-0.856,6.57-2.565c1.704-1.712,2.56-3.903,2.56-6.567V9.136c0-2.666-0.855-4.853-2.56-6.567   C324.334,0.859,322.15,0,319.481,0H81.941c-2.666,0-4.853,0.859-6.567,2.568c-1.709,1.714-2.568,3.901-2.568,6.567v37.972   c0,2.474,0.904,4.615,2.712,6.423s3.949,2.712,6.423,2.712h41.399c40.159,0,65.665,10.751,76.513,32.261H81.941   c-2.666,0-4.856,0.855-6.567,2.568c-1.709,1.715-2.568,3.901-2.568,6.567v29.124c0,2.664,0.855,4.854,2.568,6.563   c1.714,1.715,3.905,2.568,6.567,2.568h121.915c-4.188,15.612-13.944,27.506-29.268,35.691   c-15.325,8.186-35.544,12.279-60.67,12.279H81.941c-2.474,0-4.615,0.905-6.423,2.712c-1.809,1.809-2.712,3.951-2.712,6.423v36.263   c0,2.478,0.855,4.571,2.568,6.282c36.543,38.828,83.939,93.165,142.182,163.025c1.715,2.286,4.093,3.426,7.139,3.426h55.672   c4.001,0,6.763-1.708,8.281-5.141c1.903-3.426,1.53-6.662-1.143-9.708c-55.572-68.143-99.258-119.153-131.045-153.032   c32.358-3.806,58.625-14.277,78.802-31.404c20.174-17.129,32.449-39.403,36.83-66.811h47.965c2.662,0,4.853-0.854,6.563-2.568   c1.715-1.709,2.573-3.899,2.573-6.563V97.646C329.193,94.977,328.335,92.79,326.62,91.076z" data-original="#000000"  data-old_color="#F7F4F4" fill="#fff"/>                                                    </g>                                                </g>                                            </svg>                                        </div>                                    </div>                                <span style="position: absolute; top: 50%; left: 50%; width: 1px; height: 1px; background-color: #0757d0; border-radius: 50%; animation: rippleLoader 3s ease infinite;"></span>                            </div>                        </div>\';\n                </script>\n                <link rel="stylesheet" type="text/css" href="/styles/common.css">\n                <link rel="stylesheet" type="text/css" href="/styles/home.css">\n                <link rel="stylesheet" type="text/css" href="/styles/login.css">\n                <link rel="stylesheet" type="text/css" href="/styles/new_expense.css">\n                <link rel="stylesheet" type="text/css" href="/styles/notfound.css">\n                <link rel="stylesheet" type="text/css" href="/styles/popup.css">\n                <script src = "/swRegisterer.js"></script>\n                <script src="client_bundle.js"></script>\n            </body>\n        </html>';
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
exports.getFrequentCategories = exports.edit_expense = exports.deleteExpenseDate = exports.get_expense_summary = exports.get_expense_data = exports.new_expense = exports.logoutUser = exports.getUserInfo = exports.signin = exports.signup = undefined;

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

var deleteExpenseDate = exports.deleteExpenseDate = function deleteExpenseDate(params) {
  var url = '/delete_expense_date/';
  return _axios2.default.post(url, params);
};

var edit_expense = exports.edit_expense = function edit_expense(params) {
  var url = '/edit_expense/';
  return _axios2.default.post(url, params);
};

var getFrequentCategories = exports.getFrequentCategories = function getFrequentCategories() {
  var url = '/getFrequentCategories/';
  return _axios2.default.get(url);
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

var _utils = __webpack_require__(/*! ../utils/utils */ "./src/pages/utils/utils.js");

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
    value: function renderPoints(xCoordinates, yCoordinates, amountOnCoordinates) {
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
              (0, _utils.amountOnGraph)(amountOnCoordinates[index])
            ),
            _react2.default.createElement('circle', { cx: xCoordinates[index], cy: yCoordinates[index], stroke: '#0757d0', fill: '#0757d0', r: '0.5', strokeWidth: '1' }),
            _react2.default.createElement(
              'text',
              { className: 'fb', x: xCoordinates[index], fill: '#757575', y: HEIGHT + 7, fontSize: '5', textAnchor: 'middle' },
              pointText
            )
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
      var amountOnCoordinates = [];
      var length = _constants.DIVISIONLENGTH[tab];
      var maxLeng = _constants.MAXLENGTHPERTAB[tab];
      var maxAmt = plotData.maxAmount;
      var xCoordinateDivLength = WIDTH / length;
      var lastDivision = tab === _constants.MONTH ? 0 : -1; // Because we show only dates in month division begins with 1 so last shud be 0 

      var str = '';

      /* To start the graph at the Least Point */
      xCoordinates.push(0);
      yCoordinates.push(HEIGHT);
      amountOnCoordinates.push('');
      plotData.perDivisionData.forEach(function (entry) {
        while (entry.division > lastDivision) {
          var _lastX = xCoordinates[xCoordinates.length - 1];
          xCoordinates.push(_lastX + xCoordinateDivLength);
          if (entry.division === lastDivision + 1) {
            var percent = entry.amount / maxAmt * 100;
            yCoordinates.push(HEIGHT - HEIGHT / 100 * percent);
            amountOnCoordinates.push(entry.amount);
          } else {
            yCoordinates.push(HEIGHT);
            amountOnCoordinates.push('');
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
        amountOnCoordinates.push('');
      }
      var lastX = xCoordinates[xCoordinates.length - 1];
      xCoordinates.push(lastX + xCoordinateDivLength);
      yCoordinates.push(HEIGHT);
      amountOnCoordinates.push('');

      for (var i = 0; i < xCoordinates.length; i++) {
        str += ' ' + xCoordinates[i] + ',' + yCoordinates[i] + ' ';
      }
      if (str) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'svg',
            { viewBox: window && window.screen.width > 600 ? '-50 -10 285 210' : '-15 -15 220 150', style: { margin: '10px' } },
            _react2.default.createElement('polyline', { points: str, className: 'graphPlotLine' }),
            this.renderPoints(xCoordinates, yCoordinates, amountOnCoordinates)
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

var _utils = __webpack_require__(/*! ../utils/utils */ "./src/pages/utils/utils.js");

var _Popup = __webpack_require__(/*! ./Popup */ "./src/pages/components/Popup.js");

var _Popup2 = _interopRequireDefault(_Popup);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _PageLoader = __webpack_require__(/*! ./PageLoader */ "./src/pages/components/PageLoader.js");

var _PageLoader2 = _interopRequireDefault(_PageLoader);

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
    _this.cancelPopup = _this.cancelPopup.bind(_this);
    _this.confirmPopup = _this.confirmPopup.bind(_this);
    _this.deleteExpense = _this.deleteExpense.bind(_this);
    _this.editExpense = _this.editExpense.bind(_this);
    _this.state = {
      activeTab: _constants.MONTH,
      showNewExpense: false,
      viewMore: false,
      weekData: {},
      monthData: {},
      yearData: {},
      selectorWW: '',
      selectorMM: '',
      selectorYY: '',
      activeFilter: 'spentRate'
    };
    _this.viewedMore = {};
    _this.userInfo();
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getExpense();
      this.getExpenseSummary();
      this.updateTogglerContent();
    }
  }, {
    key: 'updateTogglerContent',
    value: function updateTogglerContent() {
      var activeTab = this.state.activeTab;

      if (activeTab === _constants.WEEK) {
        return this.state.weekData;
      } else if (activeTab === _constants.MONTH) {
        return this.state.monthData;
      } else if (activeTab === _constants.YEAR) {
        return this.state.yearData;
      }
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
    value: function getParams(toggleVal) {
      var _state = this.state,
          tab = _state.activeTab,
          activeFilter = _state.activeFilter;

      var _currentTabData = this.currentTabData(),
          dd = _currentTabData.dd,
          mm = _currentTabData.mm,
          yy = _currentTabData.yy,
          ww = _currentTabData.ww;

      var currDate = yy && typeof mm !== 'undefined' && dd ? new Date(yy, mm, dd) : new Date();
      var month = currDate.getMonth();
      var dow = currDate.getDay();
      var date = currDate.getDate();
      var year = currDate.getFullYear();

      if (!ww) {
        var firstDayofMonth = new Date(year, month, 1).getDay();
        ww = Math.ceil((firstDayofMonth + currDate.getDate()) / 7);
      }

      if (this.state.selectorWW && typeof this.state.selectorMM !== 'undefined' && this.state.selectorYY) {
        year = parseInt(this.state.selectorYY);
        month = parseInt(this.state.selectorMM);
        ww = parseInt(this.state.selectorWW);
      }
      var params = { tab: tab, mm: month, dow: dow, ww: ww, yy: year, dd: date, activeFilter: activeFilter };
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
    value: function getExpenseSummary(loadNewSummaryData, toggleVal) {
      var _this3 = this;

      var params = this.getParams(toggleVal);
      var activeTabData = this.findCurrentDataProp();

      // if (Object.keys(this.state[activeTabData]).length === 0 || loadNewSummaryData) {
      (0, _ApiCalls.get_expense_summary)(params).then(function (resp) {
        var _this3$setState;

        _this3.setState((_this3$setState = {}, _defineProperty(_this3$setState, activeTabData, _extends({}, _this3.state[activeTabData], { plotData: _extends({}, resp.data) })), _defineProperty(_this3$setState, 'getExpenseSummarySuccess', true), _this3$setState));
      }, function (err) {
        console.log('Unable to Get Expense Summary Details', err);
      });
      // }
    }
  }, {
    key: 'getExpense',
    value: function getExpense(loadNewExpenseData, toggleVal) {
      var _this4 = this;

      var params = this.getParams(toggleVal);
      var activeTabData = this.findCurrentDataProp();

      // if (Object.keys(this.state[activeTabData]).length === 0 || loadNewExpenseData) {
      (0, _ApiCalls.get_expense_data)(params).then(function (resp) {
        var _this4$setState;

        var _resp$data = resp.data,
            expenseList = _resp$data.expenseList,
            incomeList = _resp$data.incomeList,
            standing = _resp$data.standing,
            spent = _resp$data.spent,
            ww = _resp$data.ww,
            yy = _resp$data.yy,
            mm = _resp$data.mm,
            dd = _resp$data.dd;

        _this4.setState((_this4$setState = {}, _defineProperty(_this4$setState, activeTabData, _extends({}, _this4.state[activeTabData], { expenseList: expenseList, incomeList: incomeList, standing: standing, spent: spent, ww: ww, yy: yy, mm: mm, dd: dd })), _defineProperty(_this4$setState, 'selectorMM', mm), _defineProperty(_this4$setState, 'selectorWW', ww), _defineProperty(_this4$setState, 'selectorYY', yy), _defineProperty(_this4$setState, 'getExpenseDataSuccess', true), _this4$setState));
      }, function (err) {
        console.log('Unable to Get Expense Details', err);
      });
      // }
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
          { ref: 'popup', className: 'popup zi9 ', onClick: this.leftMenuClick },
          _react2.default.createElement(
            'div',
            { className: 'sideBar in-bl fl' },
            _react2.default.createElement(
              _utils.Ripple,
              { key: 'logout', classes: 'menu-option', onClickHandler: this.navigateToSignIn },
              !userInfo ? 'Sign In' : 'Logout'
            ),
            _react2.default.createElement(
              _utils.Ripple,
              { key: 'aboutMe', classes: 'menu-option', onClickHandler: function onClickHandler() {
                  return window.open("https://dhilipkmr.github.io/materializedResume/");
                } },
              'About Me'
            )
          )
        )
      );
    }
  }, {
    key: 'newExpense',
    value: function newExpense(val, saveSuccess, editExpenseVal) {
      var _this6 = this;

      if (saveSuccess) {
        this.setState({ showNewExpense: val, editExpense: typeof editExpenseVal !== 'undefined' ? editExpenseVal : this.state.editExpense, weekData: {}, monthData: {}, yearData: {} }, function () {
          _this6.getExpense(saveSuccess);
          _this6.getExpenseSummary(saveSuccess);
        });
      } else {
        this.setState({ showNewExpense: val, editExpense: editExpenseVal });
      }
    }
  }, {
    key: 'cancelPopup',
    value: function cancelPopup() {
      this.setState({ showPopup: false });
    }
  }, {
    key: 'confirmPopup',
    value: function confirmPopup() {
      var _this7 = this;

      this.setState({ showPopup: false });
      (0, _ApiCalls.deleteExpenseDate)({ id: this.state.deleteTransactionObj.id }).then(function (res) {
        if (res) {
          _this7.getExpense(true, true);
          _this7.getExpenseSummary(true, true);
        }
      });
    }
  }, {
    key: 'editExpense',
    value: function editExpense(obj) {
      this.setState({ editExpense: true, editTransactionObj: obj });
    }
  }, {
    key: 'deleteExpense',
    value: function deleteExpense(obj) {
      this.setState({ showPopup: true, deleteTransactionObj: obj });
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
      var _this8 = this;

      if (!hasListDefined) {
        var loader = [];
        for (var i = 0; i < 2; i++) {
          loader.push(_react2.default.createElement(
            'div',
            { key: 'transaction_type_' + i },
            _react2.default.createElement(
              'div',
              { className: 'transactedCardInner' },
              _react2.default.createElement(
                'div',
                { className: 'cardInnerheading' },
                _react2.default.createElement('span', { className: 'cat_percent progressBar fl m0 mt10' })
              ),
              _react2.default.createElement('div', { className: 'progressBar bl textCenter mt30' })
            ),
            _react2.default.createElement('div', { className: 'cardBrdrBtm' })
          ));
        }
        return loader;
      }

      var _currentTabData2 = this.currentTabData(),
          expenseList = _currentTabData2.expenseList;

      return expenseList.transactionList.map(function (transaction, index) {
        if (_this8.state.viewMore || _this8.viewedMore[_this8.state.activeTab] || !_this8.state.viewMore && index < 2) {
          if (_this8.state.viewMore) {
            _this8.viewedMore[_this8.state.activeTab] = true; // To not remove element from DOM on clicking view More again
          }
          return _react2.default.createElement(
            'div',
            { key: 'transaction_type_' + index },
            _react2.default.createElement(
              'div',
              { className: 'transactedCardInner' },
              _react2.default.createElement(
                'div',
                { className: 'cardInnerheading' },
                _react2.default.createElement(
                  'div',
                  { className: 'cat w33 in-bl tl' },
                  transaction.category
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'cat w33 in-bl tc' },
                  (0, _utils.formatDate)(transaction.date)
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'cat w33 in-bl tr' },
                  _react2.default.createElement(
                    'svg',
                    { onClick: function onClick() {
                        return _this8.editExpense(_extends({}, transaction));
                      }, height: '15px', viewBox: '0 -1 450 400', width: '15px' },
                    _react2.default.createElement('path', { d: 'm370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0' }),
                    _react2.default.createElement('path', { d: 'm376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0' })
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'progressBar bl textCenter marginT25' },
                _react2.default.createElement('div', { className: 'filled', style: { maxWidth: transaction.percent + '%' } })
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'div',
                  { className: 'padR15 padL10 cat w33 in-bl tl' },
                  '₹' + transaction.amount
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'cat w33 in-bl tc' },
                  transaction.percent + ' %'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'padR7 cat w33 in-bl tr' },
                  _react2.default.createElement(
                    'svg',
                    { onClick: function onClick() {
                        return _this8.deleteExpense({ id: transaction.id });
                      }, fill: '#a20404', height: '15px', viewBox: '-40 0 450 400', width: '15px' },
                    _react2.default.createElement('path', { d: 'm232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0' }),
                    _react2.default.createElement('path', { d: 'm114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0' }),
                    _react2.default.createElement('path', { d: 'm28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0' }),
                    _react2.default.createElement('path', { d: 'm173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0' })
                  )
                )
              )
            ),
            _react2.default.createElement('div', { className: 'cardBrdrBtm' })
          );
        } else {
          return null;
        }
      });
    }
  }, {
    key: 'changeFilter',
    value: function changeFilter(type) {
      var _this9 = this;

      if (type === 'date') {
        this.setState({ activeFilter: 'date' }, function () {
          _this9.getExpense(true, true);
          _this9.getExpenseSummary(true, true);
        });
      } else if (type === 'spentRate') {
        this.setState({ activeFilter: 'spentRate' }, function () {
          _this9.getExpense(true, true);
          _this9.getExpenseSummary(true, true);
        });
      }
    }
  }, {
    key: 'getTransactionCard',
    value: function getTransactionCard() {
      var _this10 = this;

      var currentTabData = this.currentTabData();
      var _state2 = this.state,
          activeTab = _state2.activeTab,
          _state2$viewMore = _state2.viewMore,
          viewMore = _state2$viewMore === undefined ? false : _state2$viewMore,
          userInfo = _state2.userInfo,
          activeFilter = _state2.activeFilter;
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
            { className: 'textCenter mt5' },
            _react2.default.createElement(
              _utils.Ripple,
              { classes: 'in-bl sortType sortTypeLeft fs14 ' + (activeFilter === 'spentRate' ? ' leftActiveRight ' : ''), onClickHandler: function onClickHandler() {
                  return _this10.changeFilter('spentRate');
                } },
              'Spent Rate '
            ),
            _react2.default.createElement(
              _utils.Ripple,
              { classes: 'in-bl sortType sortTypeRight fs14 ' + (activeFilter === 'spentRate' ? ' leftActiveLeft ' : 'rightActiveRight'), onClickHandler: function onClickHandler() {
                  return _this10.changeFilter('date');
                } },
              ' Date '
            )
          ),
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
                  { className: 'tu ', onClick: function onClick() {
                      return _this10.newExpense(true);
                    } },
                  'Add Transaction '
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
          _utils.Ripple,
          { classes: 'viewMoreArrow', onClickHandler: function onClickHandler() {
              return _this10.clickViewMore();
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
                _utils.Ripple,
                { classes: 'in-bl addBtn themeBg', onClickHandler: function onClickHandler() {
                    return _this10.newExpense(true);
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
    key: 'getTogglerHeader',
    value: function getTogglerHeader() {
      var activeTab = this.state.activeTab;

      var _currentTabData3 = this.currentTabData(),
          mm = _currentTabData3.mm,
          yy = _currentTabData3.yy,
          ww = _currentTabData3.ww;

      var togglerHeader = '';
      var isPrevDisabled = false;
      var isNextDisabled = false;

      if (activeTab === _constants.MONTH) {
        togglerHeader = typeof mm !== 'undefined' ? _constants.MONTHSNAME[mm] : '----';
        isPrevDisabled = mm === 0 ? true : false;
        isNextDisabled = mm === 11 ? true : false;
      } else if (activeTab === _constants.WEEK) {
        togglerHeader = ww ? 'Week ' + ww : '----';
        isPrevDisabled = ww === 1 ? true : false;
        isNextDisabled = ww === 5 ? true : false;
      } else {
        togglerHeader = yy ? yy : '----';
        isNextDisabled = yy === 2018 ? true : false;
      }

      return { togglerHeader: togglerHeader, isPrevDisabled: isPrevDisabled, isNextDisabled: isNextDisabled };
    }
  }, {
    key: 'toggleType',
    value: function toggleType(type, val) {
      var _this11 = this;

      var objToChange = {};
      if (type === _constants.WEEK) {
        objToChange = { selectorWW: val };
      } else if (type === _constants.MONTH) {
        objToChange = { selectorMM: val };
      } else if (type === _constants.YEAR) {
        objToChange = { selectorYY: val };
      }
      this.setState(_extends({}, objToChange), function () {
        _this11.getExpense(true, true);
        _this11.getExpenseSummary(true, true);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this12 = this;

      var _state3 = this.state,
          activeTab = _state3.activeTab,
          showNewExpense = _state3.showNewExpense,
          _state3$viewMore = _state3.viewMore,
          viewMore = _state3$viewMore === undefined ? false : _state3$viewMore,
          editExpense = _state3.editExpense,
          editTransactionObj = _state3.editTransactionObj,
          getExpenseSummarySuccess = _state3.getExpenseSummarySuccess,
          getExpenseDataSuccess = _state3.getExpenseDataSuccess;

      var _currentTabData4 = this.currentTabData(),
          _currentTabData4$stan = _currentTabData4.standing,
          standing = _currentTabData4$stan === undefined ? undefined : _currentTabData4$stan,
          _currentTabData4$spen = _currentTabData4.spent,
          spent = _currentTabData4$spen === undefined ? undefined : _currentTabData4$spen,
          _currentTabData4$plot = _currentTabData4.plotData,
          plotData = _currentTabData4$plot === undefined ? undefined : _currentTabData4$plot,
          _currentTabData4$inco = _currentTabData4.incomeList,
          incomeList = _currentTabData4$inco === undefined ? undefined : _currentTabData4$inco;

      var _getTogglerHeader = this.getTogglerHeader(),
          togglerHeader = _getTogglerHeader.togglerHeader,
          isPrevDisabled = _getTogglerHeader.isPrevDisabled,
          isNextDisabled = _getTogglerHeader.isNextDisabled;

      if (!getExpenseSummarySuccess || !getExpenseDataSuccess) {
        (0, _utils.setLoader)(true);
        return _react2.default.createElement(_PageLoader2.default, null);
      }
      (0, _utils.setLoader)(false);
      return _react2.default.createElement(
        'div',
        { className: '' },
        _react2.default.createElement(_reactRouterDom.Prompt, { when: !showNewExpense, message: function message() {
            return "Going back will Log you out.";
          } }),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', { ref: 'backDrop', className: 'transition1a zi9 ' + (showNewExpense || editExpense ? 'backDrop' : ''), onClick: function onClick() {
              return _this12.newExpense(false);
            } }),
          this.renderLeftMenuBar(),
          _react2.default.createElement(
            'div',
            { ref: 'mainContent', className: 'mainContent' },
            _react2.default.createElement(
              'div',
              { className: '' },
              _react2.default.createElement(
                'div',
                { ref: 'firstHalfLandingTxt', className: 'transition0_5 first-half-landing' },
                _react2.default.createElement(
                  'div',
                  { className: 'standing' },
                  _react2.default.createElement(
                    _utils.Ripple,
                    { classes: 'left-menu-container', onClickHandler: this.leftMenuClick },
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
                  { className: 'expenseDaysBtn w85 m10a' },
                  _react2.default.createElement(
                    'div',
                    { className: 'in-bl w33' },
                    _react2.default.createElement(
                      'div',
                      null,
                      _react2.default.createElement(
                        'select',
                        { key: 'weekSelect', onChange: function onChange(e) {
                            return _this12.toggleType(_constants.WEEK, e.target.value);
                          }, id: 'weekSelector db white', value: this.state.selectorWW },
                        (0, _utils.renderOptions)('week')
                      ),
                      _react2.default.createElement(
                        _utils.Ripple,
                        { onClickHandler: function onClickHandler() {
                            return _this12.changeExpenseDayFormat(_constants.WEEK);
                          }, classes: 'padB5 br10 db white padT10 mt5 ' + (activeTab === _constants.WEEK ? 'dayTypeBtn-active' : '') },
                        'Week'
                      ),
                      _react2.default.createElement('div', { className: 'typeBrdrBtm ' + (activeTab === _constants.WEEK ? 'w60' : '') })
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'in-bl w33' },
                    _react2.default.createElement(
                      'select',
                      { key: 'monthSelect', onChange: function onChange(e) {
                          return _this12.toggleType(_constants.MONTH, e.target.value);
                        }, id: 'monthSelector db white', value: this.state.selectorMM },
                      (0, _utils.renderOptions)('month')
                    ),
                    _react2.default.createElement(
                      _utils.Ripple,
                      { onClickHandler: function onClickHandler() {
                          return _this12.changeExpenseDayFormat(_constants.MONTH);
                        }, classes: 'padB5 br10 db white padT10 mt5 ' + (activeTab === _constants.MONTH ? 'dayTypeBtn-active' : '') },
                      'Month'
                    ),
                    _react2.default.createElement('div', { className: 'typeBrdrBtm ' + (activeTab === _constants.MONTH ? 'w60' : '') })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'in-bl w33' },
                    _react2.default.createElement(
                      'select',
                      { key: 'yearSelect', onChange: function onChange(e) {
                          return _this12.toggleType(_constants.YEAR, e.target.value);
                        }, id: 'yearSelector db white', value: this.state.selectorYY },
                      (0, _utils.renderOptions)('year')
                    ),
                    _react2.default.createElement(
                      _utils.Ripple,
                      { onClickHandler: function onClickHandler() {
                          return _this12.changeExpenseDayFormat(_constants.YEAR);
                        }, classes: 'padB5 br10 db white padT10 mt5 ' + (activeTab === _constants.YEAR ? 'dayTypeBtn-active' : '') },
                      'Year'
                    ),
                    _react2.default.createElement('div', { className: 'typeBrdrBtm ' + (activeTab === _constants.YEAR ? 'w60' : '') })
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
              { className: 'other-half-landing mt10' },
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
        ) : null,
        editExpense ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_NewExpense2.default, { newExpense: this.newExpense, editTransactionObj: editTransactionObj })
        ) : null,
        this.state.showPopup && _react2.default.createElement(_Popup2.default, { cancelCallback: this.cancelPopup, confirmCallback: this.confirmPopup })
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _ApiCalls = __webpack_require__(/*! ../apiCalls/ApiCalls */ "./src/pages/apiCalls/ApiCalls.js");

var _utils = __webpack_require__(/*! ../utils/utils */ "./src/pages/utils/utils.js");

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
    _this.signoutUser = _this.signoutUser.bind(_this);
    _this.state = {
      username: '',
      password: '',
      signinText: 'Sign In',
      signupText: 'Sign Up',
      continueText: 'Continue with Test Login',
      load: !window.signedIn
    };
    if (window.signedIn) {
      _this.signoutUser();
    }
    return _this;
  }

  _createClass(Login, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _utils.setLoader)(false);
    }
  }, {
    key: 'signoutUser',
    value: function signoutUser() {
      (0, _ApiCalls.logoutUser)().then(function (resp) {
        if (!resp.data.error) {
          window.signedIn = false;
          console.log('Signing out success');
          window.location.reload();
          return;
        }
        console.log('unable to signout user');
        window.location.reload();
      }).catch(function () {
        console.log('unable to signout user');
        window.location.reload();
      });
    }
  }, {
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
        this.props.history.push('/home', {});
        if (typeof window !== 'undefined') {
          window.signedIn = true;
        }
      } else {
        this.setState(_extends({}, resp.data));
      }
      if (resp.data && resp.data.error) {
        this.resetButtonText();
      }
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      if (this.state.username.length < 5) {
        this.setState({ error: true, msg: 'Username must be greater than 4 Characters' });
        return false;
      }
      if (this.state.password.length < 8) {
        this.setState({ error: true, msg: 'Password must be greater than 7 Characters' });
        return false;
      }
      return true;
    }
  }, {
    key: 'resetButtonText',
    value: function resetButtonText() {
      this.setState({
        signinText: 'Sign In',
        signupText: 'Sign Up',
        continueText: 'Continue with Test Login'
      });
    }
  }, {
    key: 'signUp',
    value: function signUp() {
      var _this2 = this;

      if (this.isValid()) {
        this.setState({ signupText: 'Signing up...' });
        (0, _ApiCalls.signup)({ username: this.state.username, password: this.state.password }).then(function (resp) {
          _this2.successful(resp);
        }).catch(function (err) {
          _this2.resetButtonText();
          console.log('Failed to Signup');
        });
      }
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
      if (withTestCreds || this.isValid()) {
        // if (withTestCreds) {
        //   this.setState({continueText: 'Continuing with Test Login...'});
        // } else {
        //   this.setState({signinText: 'Signing in...'});
        // }
        (0, _ApiCalls.signin)({ username: username, password: password }).then(function (resp) {
          _this3.successful(resp);
        }).catch(function (err) {
          _this3.resetButtonText();
          console.log('Failed to SignIn', err);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state2 = this.state,
          signinText = _state2.signinText,
          signupText = _state2.signupText,
          continueText = _state2.continueText;

      return _react2.default.createElement(
        'div',
        null,
        this.head(),
        this.state.load && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: '' },
            _react2.default.createElement(
              'div',
              { className: 'fieldsDiv padB10' },
              _react2.default.createElement(
                'div',
                { className: 'username' },
                _react2.default.createElement('input', { className: 'loginInput ', id: 'loginUsername', placeholder: 'Username', value: this.state.username, onChange: function onChange(e) {
                    return _this4.setState({ username: e.target.value });
                  }, type: 'text' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'password padT10' },
                _react2.default.createElement('input', { className: 'loginInput ', id: 'loginPwd', placeholder: 'Password', value: this.state.password, onChange: function onChange(e) {
                    return _this4.setState({ password: e.target.value });
                  }, type: 'password' })
              )
            ),
            this.state.error && _react2.default.createElement(
              'div',
              { id: 'errorDiv', className: 'textCenter red ' },
              this.state.msg
            ),
            _react2.default.createElement(
              'div',
              { className: 'textCenter ' },
              _react2.default.createElement(
                'div',
                { className: 'new di' },
                _react2.default.createElement(
                  _utils.Ripple,
                  { classes: 'in-bl newBtn loginBtns themeBg', onClickHandler: function onClickHandler() {
                      return _this4.signIn(false);
                    } },
                  _react2.default.createElement(
                    'span',
                    { className: 'padLR5' },
                    signinText
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'new di' },
                _react2.default.createElement(
                  _utils.Ripple,
                  { classes: 'in-bl newBtn loginBtns themeBg', onClickHandler: this.signUp },
                  _react2.default.createElement(
                    'span',
                    { className: 'padLR5' },
                    signupText
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'textCenter ' },
              _react2.default.createElement(
                'div',
                { className: 'new' },
                _react2.default.createElement(
                  _utils.Ripple,
                  { classes: 'in-bl newBtn loginBtns testLogin themeBg', onClickHandler: function onClickHandler() {
                      return _this4.signIn(true);
                    } },
                  _react2.default.createElement(
                    'span',
                    { className: 'padLR5' },
                    continueText
                  )
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

var _utils = __webpack_require__(/*! ../utils/utils */ "./src/pages/utils/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewExpense = function (_Component) {
  _inherits(NewExpense, _Component);

  function NewExpense(props) {
    _classCallCheck(this, NewExpense);

    var _this = _possibleConstructorReturn(this, (NewExpense.__proto__ || Object.getPrototypeOf(NewExpense)).call(this, props));

    _this.selectType = _this.selectType.bind(_this);
    _this.submitNewExpense = _this.submitNewExpense.bind(_this);
    _this.renderInnerTransactioncard = _this.renderInnerTransactioncard.bind(_this);
    _this.handleFrequentCategoriesTap = _this.handleFrequentCategoriesTap.bind(_this);
    _this.onBackPress = _this.onBackPress.bind(_this);
    var amount = '';
    var category = '';
    var day = '';
    var month = '';
    var year = '';
    var description = '';
    if (props.editTransactionObj) {
      amount = props.editTransactionObj.amount;
      category = props.editTransactionObj.category;
      description = props.editTransactionObj.description;
      var date = new Date(props.editTransactionObj.date);
      day = date.getDate();
      month = date.getMonth();
      year = date.getFullYear();
    }
    _this.state = {
      type: 'expense',
      amount: amount,
      category: category,
      description: description,
      day: day,
      month: month,
      year: year,
      error: {},
      frequentCategories: []
    };
    return _this;
  }

  _createClass(NewExpense, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      (0, _ApiCalls.getFrequentCategories)().then(function (res) {
        if (res.data && !res.data.err) {
          _this2.setState({ frequentCategories: res.data.data.slice(0, 5) });
        } else {
          console.log('Unable to get Frequent Categories');
        }
      });
      history.pushState('MODAL', '/new_expense');
      window.onpopstate = this.onBackPress;
    }
  }, {
    key: 'onBackPress',
    value: function onBackPress(backObj) {
      window.onpopstate = null;
      this.props.newExpense(false);
    }
  }, {
    key: 'renderInnerTransactioncard',
    value: function renderInnerTransactioncard() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { key: 'categoryLoader', className: 'transactedCardInner mh62' },
          _react2.default.createElement(
            'div',
            { className: 'cardInnerheading dflex dfcenter' },
            _react2.default.createElement('span', { className: 'cat_percent progressBar fl m0 mt10' })
          ),
          _react2.default.createElement('div', { className: 'progressBar bl textCenter ' })
        )
      );
    }
  }, {
    key: 'selectType',
    value: function selectType(type) {
      this.setState({ type: type });
    }
  }, {
    key: 'changeAmount',
    value: function changeAmount(val) {
      if (val && this.state.error.amount) {
        this.setState({ amount: val, error: {} });
      } else {
        this.setState({ amount: val });
      }
    }
  }, {
    key: 'changeCategory',
    value: function changeCategory(val) {
      if (val && this.state.error.category) {
        this.setState({ category: val, error: {} });
      } else {
        this.setState({ category: val });
      }
    }
  }, {
    key: 'removeDateError',
    value: function removeDateError() {
      var _state = this.state,
          day = _state.day,
          month = _state.month,
          year = _state.year;

      if (!(new Date(parseInt(year), parseInt(month), parseInt(day)) > new Date())) {
        this.setState({ error: {} });
      }
    }
  }, {
    key: 'getDateData',
    value: function getDateData(val) {
      var currDate = new Date();
      if (val === _constants.YESTERDAY) {
        var date = new Date(currDate.setDate(currDate.getDate() - 1));
        currDate = date;
      }
      return { day: currDate.getDate(), month: currDate.getMonth(), year: currDate.getFullYear() };
    }
  }, {
    key: 'changeDate',
    value: function changeDate(val) {
      var _this3 = this;

      if (val === _constants.TODAY) {
        var dateData = this.getDateData(_constants.TODAY);
        this.setState(_extends({ todayTap: true, yesterdayTap: false }, dateData), function () {
          _this3.removeDateError();
        });
      } else if (val == _constants.YESTERDAY) {
        var _dateData = this.getDateData(_constants.YESTERDAY);
        this.setState(_extends({ todayTap: false, yesterdayTap: true }, _dateData), function () {
          _this3.removeDateError();
        });
      } else {
        this.setState(_extends({}, val), function () {
          _this3.removeDateError();
          var dateDataToday = _this3.getDateData(_constants.TODAY);
          var dateDataYesterday = _this3.getDateData(_constants.YESTERDAY);
          var _state2 = _this3.state,
              day = _state2.day,
              month = _state2.month,
              year = _state2.year;

          if (day.toString() === dateDataToday.day.toString() && month.toString() === dateDataToday.month.toString() && year.toString() === dateDataToday.year.toString()) {
            _this3.setState({ todayTap: true, yesterdayTap: false });
          } else if (day.toString() === dateDataYesterday.day.toString() && month.toString() === dateDataYesterday.month.toString() && year.toString() === dateDataYesterday.year.toString()) {
            _this3.setState({ todayTap: false, yesterdayTap: true });
          } else {
            _this3.setState({ todayTap: false, yesterdayTap: false });
          }
        });
      }
    }
  }, {
    key: 'isValidDate',
    value: function isValidDate() {
      var _state3 = this.state,
          day = _state3.day,
          month = _state3.month,
          year = _state3.year;

      var dateReg = /^\d{1,2}$/;
      var dateRegYear = /^\d{4}$/;
      if (!dateReg.test(day) || !dateReg.test(month) || !dateRegYear.test(year)) {
        this.setState({ error: { date: 'Please provide a Valid Date!' } });
        return false;
      } else if (new Date(parseInt(year), parseInt(month), parseInt(day)) > new Date()) {
        this.setState({ error: { date: 'Please do not Provide Future Date!' } });
        return false;
      } else {
        this.date = new Date(parseInt(year), parseInt(month), parseInt(day));
        return true;
      }
    }
  }, {
    key: 'validateParams',
    value: function validateParams() {
      var reg = /^[1-9][0-9]*$/;
      var _state4 = this.state,
          amount = _state4.amount,
          category = _state4.category;

      if (!amount || !reg.test(amount)) {
        this.setState({ error: { amount: 'Please provide a Valid Amount' } });
        return false;
      }
      if (!category) {
        this.setState({ error: { category: 'Please provide a Valid Category' } });
        return false;
      }
      if (!this.isValidDate()) {
        return false;
      }
      return true;
    }
  }, {
    key: 'submitNewExpense',
    value: function submitNewExpense() {
      var _this4 = this;

      var _state5 = this.state,
          amount = _state5.amount,
          day = _state5.day,
          month = _state5.month,
          year = _state5.year,
          type = _state5.type,
          category = _state5.category,
          description = _state5.description;

      var isValidationSuccess = this.validateParams();
      this.setState({ disableSubmit: true });
      if (isValidationSuccess) {
        var date = this.date;
        var mm = date.getMonth();
        var yy = date.getFullYear();
        var firstDayofMonth = new Date(yy, mm, 1).getDay();
        var ww = Math.ceil((firstDayofMonth + date.getDate()) / 7);
        var dow = date.getDay();
        var dd = date.getDate();
        var params = { amount: amount, type: type, date: date, mm: mm, yy: yy, ww: ww, dow: dow, dd: dd, category: category, description: description };
        params.category = params.category.trim().substring(0, 1).toUpperCase() + params.category.trim().substring(1);
        if (this.props.editTransactionObj) {
          params.id = this.props.editTransactionObj.id;
          (0, _ApiCalls.edit_expense)(params).then(function (resp) {
            _this4.props.newExpense(false, true, false);
          }, function (err) {
            console.log('Unable to Edit Expense', err);
            _this4.setState({ disableSubmit: false });
          });
        } else {
          (0, _ApiCalls.new_expense)(params).then(function (response) {
            _this4.props.newExpense(false, true);
          }, function (err) {
            console.log('Unable to create new Expense', err);
            _this4.setState({ disableSubmit: false });
          });
        }
      } else {
        this.setState({ disableSubmit: false });
      }
    }
  }, {
    key: 'handleFrequentCategoriesTap',
    value: function handleFrequentCategoriesTap(e) {
      if (e.target.classList.contains('ripple--container')) {
        this.setState({ category: e.target.parentElement.innerText });
      }
    }
  }, {
    key: 'renderFrequentCategories',
    value: function renderFrequentCategories() {
      var _this5 = this;

      return _react2.default.createElement(
        'div',
        { className: 'tapWrapper', onClick: this.handleFrequentCategoriesTap },
        this.state.frequentCategories.map(function (entry) {
          return _react2.default.createElement(
            _utils.Ripple,
            { classes: 'tapOptionMargin ' + (_this5.state.category.toLowerCase() === entry.category.toLowerCase() ? 'activeTapOption themeBg' : 'tapOption themeBrdr') },
            entry.category
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _state6 = this.state,
          type = _state6.type,
          amount = _state6.amount,
          day = _state6.day,
          month = _state6.month,
          year = _state6.year,
          category = _state6.category,
          error = _state6.error,
          disableSubmit = _state6.disableSubmit;

      return _react2.default.createElement(
        'div',
        { className: 'newExpenseContainer zi10', id: 'expenseContainer' },
        _react2.default.createElement(
          'div',
          { className: 'expIncBtns textCenter mT25' },
          _react2.default.createElement(
            _utils.Ripple,
            { classes: 'in-bl newBtn ' + (type === 'expense' ? 'selectedType' : ''), onClickHandler: function onClickHandler() {
                return _this6.selectType('expense');
              } },
            'Expense'
          ),
          _react2.default.createElement(
            _utils.Ripple,
            { classes: 'in-bl newBtn ' + (type === 'income' ? 'selectedType' : ''), onClickHandler: function onClickHandler() {
                return _this6.selectType('income');
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
          _react2.default.createElement('input', { className: 'padL10 w75 ' + (error.amount ? 'redBrdrBtm' : ''), 'auto-complete': 'off', type: 'text', id: 'newExpAmt', placeholder: 'Amount', onChange: function onChange(e) {
              return _this6.changeAmount(e.target.value);
            }, value: amount }),
          _react2.default.createElement(
            'span',
            { className: 'requiredAshterix' },
            ' * '
          ),
          error.amount ? _react2.default.createElement(
            'div',
            { className: 'errorDiv' },
            error.amount
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'categoryInput mT25 ' },
          _react2.default.createElement('input', { className: 'padL10 w75 ' + (error.category ? 'redBrdrBtm' : ''), 'auto-complete': 'off', type: 'text', id: 'newCategAmt', placeholder: 'Category', onChange: function onChange(e) {
              return _this6.changeCategory(e.target.value);
            }, value: category }),
          _react2.default.createElement(
            'span',
            { className: 'requiredAshterix' },
            ' * '
          ),
          error.category ? _react2.default.createElement(
            'div',
            { className: 'errorDiv' },
            error.category
          ) : null,
          this.state.frequentCategories.length === 0 ? this.renderInnerTransactioncard() : this.renderFrequentCategories()
        ),
        _react2.default.createElement(
          'div',
          { className: 'descriptionInputWrap tc m-5 mT25 ' },
          _react2.default.createElement('input', { id: 'newDescription', className: 'padL10 w75', placeholder: 'Description', onChange: function onChange(e) {
              return _this6.setState({ description: e.target.value });
            }, value: this.state.description })
        ),
        _react2.default.createElement(
          'div',
          { className: 'spentDay mT25 ' },
          _react2.default.createElement(
            'select',
            { ref: 'day', className: 'w20 ', onChange: function onChange(e) {
                return _this6.changeDate({ day: e.target.value });
              }, value: this.state.day },
            (0, _utils.renderOptions)('day')
          ),
          _react2.default.createElement(
            'select',
            { ref: 'month', className: 'w25 ', onChange: function onChange(e) {
                return _this6.changeDate({ month: e.target.value });
              }, value: this.state.month },
            (0, _utils.renderOptions)('month')
          ),
          _react2.default.createElement(
            'select',
            { ref: 'year', className: 'w20 ', onChange: function onChange(e) {
                return _this6.changeDate({ year: e.target.value });
              }, value: this.state.year },
            (0, _utils.renderOptions)('year')
          ),
          _react2.default.createElement(
            'div',
            { className: 'tapWrapper' },
            _react2.default.createElement(
              _utils.Ripple,
              { classes: 'tapOptionMargin ' + (this.state.todayTap ? 'activeTapOption themeBg' : 'tapOption themeBrdr'), onClickHandler: function onClickHandler() {
                  return _this6.changeDate(_constants.TODAY);
                } },
              'Today'
            ),
            _react2.default.createElement(
              _utils.Ripple,
              { classes: 'tapOptionMargin ' + (this.state.yesterdayTap ? 'activeTapOption themeBg' : 'tapOption themeBrdr'), onClickHandler: function onClickHandler() {
                  return _this6.changeDate(_constants.YESTERDAY);
                } },
              'Yesterday'
            )
          ),
          error.date ? _react2.default.createElement(
            'div',
            { className: 'mt10 errorDiv' },
            error.date
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'textCenter' },
          _react2.default.createElement(
            _utils.Ripple,
            { classes: 'submitBtn themeBg ' + (disableSubmit ? 'disableBtn' : ''), onClickHandler: this.submitNewExpense },
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

/***/ "./src/pages/components/PageLoader.js":
/*!********************************************!*\
  !*** ./src/pages/components/PageLoader.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapper = {
  'position': 'relative'
};
var icon = {
  'color': '#fff',
  'backgroundColor': '#0757d0',
  'borderRadius': '100%',
  'width': '35px',
  'height': '35px',
  'textAlign': 'center',
  'margin': '50vh auto',
  'zIndex': '7',
  'position': 'relative'
};
var val = {
  'padding': '11px'
};

var rippler = {
  'position': 'absolute',
  'border': '0.01px solid #0757d0',
  'top': '50%',
  'left': '50%',
  'width': '1px',
  'height': '1px',
  'backgroundColor': '#0757d0',
  'borderRadius': '50%',
  'animation': 'rippleLoader 3s ease infinite'
};

function PageLoader() {
  var styleElement = document.createElement('style');
  styleElement.innerHTML = '@keyframes rippleLoader{\n    100% {\n      transform: scale(700);\n      opacity: 0;\n    }\n  }';
  document.head.appendChild(styleElement);
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { style: _extends({}, wrapper) },
      _react2.default.createElement(
        'div',
        { style: _extends({}, icon) },
        _react2.default.createElement(
          'div',
          { style: _extends({}, val) },
          _react2.default.createElement(
            'svg',
            { x: '0px', y: '0px', width: '13px', height: '13px', viewBox: '0 0 401.998 401.998', style: { "enableBackground": "new 0 0 401.998 401.998", "xml:space": "preserve" } },
            _react2.default.createElement(
              'g',
              null,
              _react2.default.createElement(
                'g',
                null,
                _react2.default.createElement('path', { d: 'M326.62,91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52   c2.669,0,4.853-0.856,6.57-2.565c1.704-1.712,2.56-3.903,2.56-6.567V9.136c0-2.666-0.855-4.853-2.56-6.567   C324.334,0.859,322.15,0,319.481,0H81.941c-2.666,0-4.853,0.859-6.567,2.568c-1.709,1.714-2.568,3.901-2.568,6.567v37.972   c0,2.474,0.904,4.615,2.712,6.423s3.949,2.712,6.423,2.712h41.399c40.159,0,65.665,10.751,76.513,32.261H81.941   c-2.666,0-4.856,0.855-6.567,2.568c-1.709,1.715-2.568,3.901-2.568,6.567v29.124c0,2.664,0.855,4.854,2.568,6.563   c1.714,1.715,3.905,2.568,6.567,2.568h121.915c-4.188,15.612-13.944,27.506-29.268,35.691   c-15.325,8.186-35.544,12.279-60.67,12.279H81.941c-2.474,0-4.615,0.905-6.423,2.712c-1.809,1.809-2.712,3.951-2.712,6.423v36.263   c0,2.478,0.855,4.571,2.568,6.282c36.543,38.828,83.939,93.165,142.182,163.025c1.715,2.286,4.093,3.426,7.139,3.426h55.672   c4.001,0,6.763-1.708,8.281-5.141c1.903-3.426,1.53-6.662-1.143-9.708c-55.572-68.143-99.258-119.153-131.045-153.032   c32.358-3.806,58.625-14.277,78.802-31.404c20.174-17.129,32.449-39.403,36.83-66.811h47.965c2.662,0,4.853-0.854,6.563-2.568   c1.715-1.709,2.573-3.899,2.573-6.563V97.646C329.193,94.977,328.335,92.79,326.62,91.076z', 'data-original': '#000000', 'data-old_color': '#F7F4F4', fill: '#fff' })
              )
            )
          )
        )
      ),
      _react2.default.createElement('span', { style: _extends({}, rippler) })
    )
  );
}

exports.default = PageLoader;

/***/ }),

/***/ "./src/pages/components/Popup.js":
/*!***************************************!*\
  !*** ./src/pages/components/Popup.js ***!
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

var _utils = __webpack_require__(/*! ../utils/utils */ "./src/pages/utils/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popup = function (_Component) {
  _inherits(Popup, _Component);

  function Popup(props) {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this, props));
  }

  _createClass(Popup, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          cancelCallback = _props.cancelCallback,
          confirmCallback = _props.confirmCallback;

      return _react2.default.createElement(
        'div',
        { className: 'popupBackDrop' },
        _react2.default.createElement(
          'div',
          { className: 'popupContainer whiteBg' },
          _react2.default.createElement(
            'div',
            { className: 'popupHeader' },
            _react2.default.createElement(
              'div',
              { className: 'fb fs14 padB10 textCenter' },
              'Do you want to Delete this transaction?'
            ),
            _react2.default.createElement(
              'div',
              { className: 'tr' },
              _react2.default.createElement(
                _utils.Ripple,
                { classes: 'in-bl newBtn white themeBg in-bl tr mf5 fs12', onClickHandler: confirmCallback },
                'Confirm'
              ),
              _react2.default.createElement(
                _utils.Ripple,
                { classes: 'in-bl newBtn white themeBg in-bl tr mf5 fs12', onClickHandler: cancelCallback },
                'Cancel'
              )
            )
          )
        )
      );
    }
  }]);

  return Popup;
}(_react.Component);

exports.default = Popup;

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
        _react2.default.createElement(_reactRouterDom.Route, { path: '/login', exact: true, render: function render(props) {
                return _react2.default.createElement(_Login2.default, props);
            } }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/', exact: true, render: function render(props) {
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

/***/ }),

/***/ "./src/pages/utils/utils.js":
/*!**********************************!*\
  !*** ./src/pages/utils/utils.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ripple = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.renderOptions = renderOptions;
exports.formatDate = formatDate;
exports.amountOnGraph = amountOnGraph;
exports.setLoader = setLoader;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _constants = __webpack_require__(/*! ../constants/constants */ "./src/pages/constants/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function renderOptions(type) {
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
        { key: 'day_' + i, value: i },
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
        { key: 'month_' + _i, value: _i },
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
        { key: 'year_' + _i2, value: _i2 },
        _i2
      ));
    }
  } else if (type === 'week') {
    options.push(_react2.default.createElement(
      'option',
      null,
      'Week'
    ));
    for (var _i3 = 1; _i3 < 6; _i3++) {
      options.push(_react2.default.createElement(
        'option',
        { key: 'week_' + _i3, value: _i3 },
        _i3
      ));
    }
  }
  return options;
}

function formatDate(d) {
  var date = void 0;
  if ((typeof d === 'undefined' ? 'undefined' : _typeof(d)) !== 'object') {
    date = new Date(d);
  } else {
    date = d;
  }
  var result = '';
  result += date.getDate() + ' ' + _constants.MONTHSNAMESHORT[date.getMonth()] + ' ' + date.getFullYear();
  return result;
}

function amountOnGraph(val) {
  if (val === '') {
    return '';
  } else {
    var value = parseFloat(val, 10);
    if (val > 1000) {
      return Math.round(parseFloat(val / 1000, 10) * 10) / 10 + 'K';
    } else {
      return val;
    }
  }
}

function setLoader(val) {
  if (typeof window !== 'undefined') {
    window.loader = val;
  }
}

var Ripple = exports.Ripple = function (_Component) {
  _inherits(Ripple, _Component);

  function Ripple(props) {
    _classCallCheck(this, Ripple);

    return _possibleConstructorReturn(this, (Ripple.__proto__ || Object.getPrototypeOf(Ripple)).call(this, props));
  }

  _createClass(Ripple, [{
    key: 'callCleanUp',
    value: function callCleanUp(cleanup, delay) {
      var bounce;
      return function () {
        var target = arguments[0].currentTarget;
        clearTimeout(bounce);
        bounce = setTimeout(function () {
          cleanup(target);
        }, delay);
      };
    }
  }, {
    key: 'showRipple',
    value: function showRipple(e) {
      var rippleContainer = e.currentTarget;
      var size = rippleContainer.offsetWidth;
      var pos = rippleContainer.getBoundingClientRect();
      var x = e.pageX - pos.x - size / 2;
      var y = e.pageY - pos.y - size / 2;
      var style = 'top:' + y + 'px; left: ' + x + 'px; height: ' + size + 'px; width: ' + size + 'px;';
      var rippler = document.createElement('span');
      rippleContainer.appendChild(rippler);
      return rippler.setAttribute('style', style);
    }
  }, {
    key: 'cleanUp',
    value: function cleanUp(elt) {
      while (elt.firstChild) {
        elt.removeChild(elt.firstChild);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$children = _props.children,
          children = _props$children === undefined ? null : _props$children,
          _props$classes = _props.classes,
          classes = _props$classes === undefined ? "" : _props$classes,
          _props$onClickHandler = _props.onClickHandler,
          onClickHandler = _props$onClickHandler === undefined ? null : _props$onClickHandler;

      return _react2.default.createElement(
        'div',
        { ref: 'targetElement', className: classes, onClick: onClickHandler, ripple: 'ripple' },
        children,
        _react2.default.createElement('div', { className: 'ripple--container', onMouseDown: this.showRipple, onMouseUp: this.callCleanUp(this.cleanUp, 2000) })
      );
    }
  }]);

  return Ripple;
}(_react.Component);

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

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2FwaS9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvZGIvbW9uZ29vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9leHBlbnNlTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hcGlDYWxscy9BcGlDYWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9HcmFwaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Ib21lLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL0xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05ld0V4cGVuc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvTm90Rm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvUGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29uc3RhbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvcm91dGVzL3JvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvdXRpbHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdGpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb25uZWN0LW1vbmdvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbmdvb3NlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiXSwibmFtZXMiOlsic2lnblVwIiwicmVxdWVzdCIsInJlc3BvbnNlIiwiYm9keSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJlbWFpbElkIiwidXNlciIsIlVzZXJzIiwiX2lkIiwibW9uZ29vc2UiLCJUeXBlcyIsIk9iamVjdElkIiwiZmluZCIsInRoZW4iLCJyZXMiLCJsZW5ndGgiLCJzZW5kIiwiZXJyb3IiLCJtc2ciLCJzYXZlIiwiZG9jIiwic2Vzc2lvbiIsInRva2VuIiwiZSIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJzaWduSW4iLCJmaW5kT25lIiwiYmNyeXB0IiwiY29tcGFyZSIsImVyciIsImxvZ291dCIsImdldFVzZXJJbmZvIiwidXNlckluZm8iLCJuZXdFeHBlbnNlIiwiYW1vdW50IiwiZGF0ZSIsInd3IiwiZG93IiwibW0iLCJ5eSIsImRkIiwidHlwZSIsImNhdGVnb3J5IiwiZGVzY3JpcHRpb24iLCJwYXJzZUludCIsIkRhdGUiLCJuZXdFeHBlbnNlSW5zdGFuY2UiLCJFeHBlbnNlcyIsImdldEV4cGVuc2VEYXRhIiwiYWN0aXZlRmlsdGVyIiwiZXhwZW5zZURhdGVSZXNwb25kZXIiLCJkYXRhIiwicmVzcG9uZCIsImV4cGVuc2VMaXN0IiwiaW5jb21lTGlzdCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJzcGVudCIsInN0YW5kaW5nIiwidHJhbnNhY3Rpb25MaXN0IiwidHJhbnNhY3Rpb24iLCJwZXJjZW50IiwiTWF0aCIsInJvdW5kIiwiZ3JvdXAxIiwiJGdyb3VwIiwiJHN1bSIsImdyb3VwMiIsIiRwdXNoIiwiaWQiLCJ1bndpbmQiLCIkdW53aW5kIiwic29ydCIsIiRzb3J0IiwicmVHcm91cCIsInRhYiIsIllFQVIiLCJhZ2dyZWdhdGUiLCIkbWF0Y2giLCIkcHJvamVjdCIsImFsbG93RGlza1VzZSIsImV4ZWMiLCJNT05USCIsIldFRUsiLCJnZXRFeHBlbnNlU3VtbWFyeSIsImV4ZWNTdW1tYXJ5UXVlcnkiLCJwZXJEaXZpc2lvbkRhdGEiLCJtYXhBbW91bnQiLCJOdW1iZXIiLCJNSU5fU0FGRV9JTlRFR0VSIiwiZm9yRWFjaCIsImVudHJ5IiwibW9udGgiLCJ0b3RhbEFtb3VudCIsImRpdmlzaW9uIiwiZGVsZXRlRXhwZW5zZURhdGUiLCJmaW5kT25lQW5kUmVtb3ZlIiwiZWRpdEV4cGVuc2UiLCJmaW5kT25lQW5kVXBkYXRlIiwiJHNldCIsInVwc2VydCIsInJldHVybk5ld0RvY3VtZW50IiwiZ2V0RnJlcXVlbnRDYXRlZ29yaWVzIiwiY291bnQiLCJlbnYiLCJwcm9jZXNzIiwiUE9SVCIsInJlcXVpcmUiLCJQcm9taXNlIiwiZ2xvYmFsIiwiY29ubmVjdCIsIk1PTkdPTEFCX1VSSSIsInVzZU1vbmdvQ2xpZW50IiwibW9kdWxlIiwiZXhwb3J0cyIsIm1vZGVsIiwiU3RyaW5nIiwicmVmIiwicmVxdWlyZWQiLCJ0cmltIiwiZGVmYXVsdCIsIm5vdyIsIlVzZXJTY2hlbWEiLCJTY2hlbWEiLCJtaW5sZW5ndGgiLCJleHBlbnNlIiwiZ2VuZXJhdGVUb2tlbiIsInVzZXJEb2MiLCJuZXh0IiwiZ2VuU2FsdCIsInNhbHQiLCJoYXNoIiwidG9IZXhTdHJpbmciLCJ0b1N0cmluZyIsInByZSIsImlzTW9kaWZpZWQiLCJNb25nb1N0b3JlIiwiYXBwIiwicG9ydCIsInVzZSIsInNlY3JldCIsInJlc2F2ZSIsInN0b3JlIiwidXJsIiwiYm9keVBhcnNlciIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJleHByZXNzIiwic3RhdGljIiwicG9zdCIsImdldCIsImxvYWRIdG1sIiwiY29udGVudCIsInJlcSIsInRlbXBsYXRlIiwibGlzdGVuIiwiQXBwIiwiQ29tcG9uZW50Iiwic2lnbnVwIiwicGFyYW1zIiwiYXhpb3MiLCJzaWduaW4iLCJsb2dvdXRVc2VyIiwibmV3X2V4cGVuc2UiLCJnZXRfZXhwZW5zZV9kYXRhIiwiZ2V0X2V4cGVuc2Vfc3VtbWFyeSIsImVkaXRfZXhwZW5zZSIsIldJRFRIIiwiSEVJR0hUIiwiR3JhcGgiLCJwcm9wcyIsImdlbmVyYXRlU1ZHIiwiYmluZCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhbGVydCIsInhDb29yZGluYXRlcyIsInlDb29yZGluYXRlcyIsImFtb3VudE9uQ29vcmRpbmF0ZXMiLCJwb2ludHNFbGVtZW50IiwidGV4dEluZGV4IiwiaW5kZXgiLCJwb2ludFRleHQiLCJXRUVLTkFNRVNIT1JUIiwidG9VcHBlckNhc2UiLCJNT05USFNOQU1FU0hPUlQiLCJwdXNoIiwicGxvdERhdGEiLCJESVZJU0lPTkxFTkdUSCIsIm1heExlbmciLCJNQVhMRU5HVEhQRVJUQUIiLCJtYXhBbXQiLCJ4Q29vcmRpbmF0ZURpdkxlbmd0aCIsImxhc3REaXZpc2lvbiIsInN0ciIsImxhc3RYIiwiaSIsInNjcmVlbiIsIndpZHRoIiwibWFyZ2luIiwicmVuZGVyUG9pbnRzIiwiSG9tZSIsImxlZnRNZW51Q2xpY2siLCJuYXZpZ2F0ZVRvU2lnbkluIiwiY2FuY2VsUG9wdXAiLCJjb25maXJtUG9wdXAiLCJkZWxldGVFeHBlbnNlIiwic3RhdGUiLCJhY3RpdmVUYWIiLCJzaG93TmV3RXhwZW5zZSIsInZpZXdNb3JlIiwid2Vla0RhdGEiLCJtb250aERhdGEiLCJ5ZWFyRGF0YSIsInNlbGVjdG9yV1ciLCJzZWxlY3Rvck1NIiwic2VsZWN0b3JZWSIsInZpZXdlZE1vcmUiLCJnZXRFeHBlbnNlIiwidXBkYXRlVG9nZ2xlckNvbnRlbnQiLCJ0b2dnbGVWYWwiLCJjdXJyZW50VGFiRGF0YSIsImN1cnJEYXRlIiwiZ2V0TW9udGgiLCJnZXREYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwiZmlyc3REYXlvZk1vbnRoIiwiY2VpbCIsInNldFN0YXRlIiwiY2F0Y2giLCJsb2FkTmV3U3VtbWFyeURhdGEiLCJnZXRQYXJhbXMiLCJhY3RpdmVUYWJEYXRhIiwiZmluZEN1cnJlbnREYXRhUHJvcCIsInJlc3AiLCJsb2FkTmV3RXhwZW5zZURhdGEiLCJyZWZzIiwiYmFja0Ryb3AiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJwb3B1cCIsIm90aGVySGFsZkxhbmRpbmdUeHQiLCJmaXJzdEhhbGZMYW5kaW5nVHh0IiwiYWRkQnRuQ29udGFpbmVyIiwibG9jYXRpb24iLCJocmVmIiwib3BlbiIsInZhbCIsInNhdmVTdWNjZXNzIiwiZWRpdEV4cGVuc2VWYWwiLCJzaG93UG9wdXAiLCJkZWxldGVUcmFuc2FjdGlvbk9iaiIsIm9iaiIsImVkaXRUcmFuc2FjdGlvbk9iaiIsInRyYW5zYWN0ZWRDYXJkIiwic2Nyb2xsVG9wIiwiaGFzTGlzdERlZmluZWQiLCJsb2FkZXIiLCJtYXhXaWR0aCIsImNoYW5nZUZpbHRlciIsInJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkIiwiY2xpY2tWaWV3TW9yZSIsImN1cnJNb250aCIsIk1PTlRIU05BTUUiLCJ0b2dnbGVySGVhZGVyIiwiaXNQcmV2RGlzYWJsZWQiLCJpc05leHREaXNhYmxlZCIsIm9ialRvQ2hhbmdlIiwiZ2V0RXhwZW5zZVN1bW1hcnlTdWNjZXNzIiwiZ2V0RXhwZW5zZURhdGFTdWNjZXNzIiwidW5kZWZpbmVkIiwiZ2V0VG9nZ2xlckhlYWRlciIsInJlbmRlckxlZnRNZW51QmFyIiwiZ2V0Q3VycmVudERhdGUiLCJ0b2dnbGVUeXBlIiwidGFyZ2V0IiwidmFsdWUiLCJjaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0IiwiZ2V0VHJhbnNhY3Rpb25DYXJkIiwiTG9naW4iLCJoZWFkIiwic2lnbm91dFVzZXIiLCJzaWduaW5UZXh0Iiwic2lnbnVwVGV4dCIsImNvbnRpbnVlVGV4dCIsImxvYWQiLCJzaWduZWRJbiIsInJlbG9hZCIsImhpc3RvcnkiLCJyZXNldEJ1dHRvblRleHQiLCJpc1ZhbGlkIiwic3VjY2Vzc2Z1bCIsIndpdGhUZXN0Q3JlZHMiLCJOZXdFeHBlbnNlIiwic2VsZWN0VHlwZSIsInN1Ym1pdE5ld0V4cGVuc2UiLCJoYW5kbGVGcmVxdWVudENhdGVnb3JpZXNUYXAiLCJvbkJhY2tQcmVzcyIsImRheSIsImZyZXF1ZW50Q2F0ZWdvcmllcyIsInNsaWNlIiwicHVzaFN0YXRlIiwib25wb3BzdGF0ZSIsImJhY2tPYmoiLCJZRVNURVJEQVkiLCJzZXREYXRlIiwiVE9EQVkiLCJkYXRlRGF0YSIsImdldERhdGVEYXRhIiwidG9kYXlUYXAiLCJ5ZXN0ZXJkYXlUYXAiLCJyZW1vdmVEYXRlRXJyb3IiLCJkYXRlRGF0YVRvZGF5IiwiZGF0ZURhdGFZZXN0ZXJkYXkiLCJkYXRlUmVnIiwiZGF0ZVJlZ1llYXIiLCJ0ZXN0IiwicmVnIiwiaXNWYWxpZERhdGUiLCJpc1ZhbGlkYXRpb25TdWNjZXNzIiwidmFsaWRhdGVQYXJhbXMiLCJkaXNhYmxlU3VibWl0Iiwic3Vic3RyaW5nIiwiY29udGFpbnMiLCJwYXJlbnRFbGVtZW50IiwiaW5uZXJUZXh0IiwidG9Mb3dlckNhc2UiLCJjaGFuZ2VBbW91bnQiLCJjaGFuZ2VDYXRlZ29yeSIsInJlbmRlckZyZXF1ZW50Q2F0ZWdvcmllcyIsImNoYW5nZURhdGUiLCJOb3RGb3VuZCIsIndyYXBwZXIiLCJpY29uIiwicmlwcGxlciIsIlBhZ2VMb2FkZXIiLCJzdHlsZUVsZW1lbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsIlBvcHVwIiwiY2FuY2VsQ2FsbGJhY2siLCJjb25maXJtQ2FsbGJhY2siLCJ3ZWVrIiwicmVuZGVyT3B0aW9ucyIsImZvcm1hdERhdGUiLCJhbW91bnRPbkdyYXBoIiwic2V0TG9hZGVyIiwib3B0aW9ucyIsImQiLCJyZXN1bHQiLCJwYXJzZUZsb2F0IiwiUmlwcGxlIiwiY2xlYW51cCIsImRlbGF5IiwiYm91bmNlIiwiYXJndW1lbnRzIiwiY3VycmVudFRhcmdldCIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJyaXBwbGVDb250YWluZXIiLCJzaXplIiwib2Zmc2V0V2lkdGgiLCJwb3MiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ4IiwicGFnZVgiLCJ5IiwicGFnZVkiLCJzdHlsZSIsInNldEF0dHJpYnV0ZSIsImVsdCIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImNoaWxkcmVuIiwiY2xhc3NlcyIsIm9uQ2xpY2tIYW5kbGVyIiwic2hvd1JpcHBsZSIsImNhbGxDbGVhblVwIiwiY2xlYW5VcCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERB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Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLDZDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NlcnZlci9zZXJ2ZXIuanNcIik7XG4iLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IGFwcCBmcm9tICcuLi9zZXJ2ZXInXG5pbXBvcnQgRXhwZW5zZXMgZnJvbSAnLi4vbW9kZWxzL2V4cGVuc2VNb2RlbCc7XG5pbXBvcnQgVXNlcnMgZnJvbSAnLi4vbW9kZWxzL3VzZXJNb2RlbCc7XG5pbXBvcnQgeyBNT05USCwgWUVBUiwgV0VFSyB9IGZyb20gJy4uLy4uL3NyYy9wYWdlcy9jb25zdGFudHMvY29uc3RhbnRzJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuXG5leHBvcnQgY29uc3Qgc2lnblVwID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3QgeyB1c2VybmFtZSA9ICcnLCBwYXNzd29yZCA9ICcnLCBlbWFpbElkID0gJycgfSA9IHJlcXVlc3QuYm9keTtcbiAgICB2YXIgdXNlciA9IG5ldyBVc2Vycyh7XG4gICAgICAgIF9pZDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoKSxcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICB9KTtcbiAgICBVc2Vycy5maW5kKHsgdXNlcm5hbWU6IHVzZXJuYW1lIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoeyBlcnJvcjogdHJ1ZSwgbXNnOiAnVXNlcm5hbWUgYWxyZWFkeSBFeGlzdHMnIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbigoZG9jKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXNzaW9uLnRva2VuID0gZG9jLnRva2VuO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoeyBlcnJvcjogZmFsc2UsIG1zZzogJ1NhdmVkIFN1Y2Nlc3NmdWxseScgfSk7XG4gICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cyg1MDApLnNlbmQoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIChlKSA9PiB7XG4gICAgICAgIHJlc3BvbnNlLnNlbmQoZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNpZ25JbiA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHsgdXNlcm5hbWUgPSAnJywgcGFzc3dvcmQgPSAnJywgZW1haWxJZCA9ICcnIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgY29uc29sZS5sb2cocmVxdWVzdC5zZXNzaW9uLnVzZXIpO1xuICAgIFVzZXJzLmZpbmRPbmUoeyB1c2VybmFtZTogdXNlcm5hbWUgfSkudGhlbigoZG9jKSA9PiB7XG4gICAgICAgIGlmIChkb2MpIHtcbiAgICAgICAgICAgIGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCBkb2MucGFzc3dvcmQsIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Quc2Vzc2lvbi50b2tlbiA9IGRvYy50b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiBmYWxzZSwgbXNnOiAnc3VjY2VzcycgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiB0cnVlLCBtc2c6ICdJbnZhbGlkIHBhc3N3b3JkJyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoeyBlcnJvcjogdHJ1ZSwgbXNnOiAnTm8gdXNlciBhY2NvdW50IGZvdW5kJyB9KTtcbiAgICAgICAgfVxuICAgIH0sIChlKSA9PiB7XG4gICAgICAgIHJlc3BvbnNlLnNlbmQoZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvZ291dCA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIHJlcXVlc3Quc2Vzc2lvbi50b2tlbiA9IG51bGw7XG4gICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiBmYWxzZSwgbXNnOiAnc3VjY2VzcycgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VXNlckluZm8gPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBpZiAocmVxdWVzdC5zZXNzaW9uLnRva2VuKSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gcmVxdWVzdC5zZXNzaW9uLnRva2VuO1xuICAgICAgICBVc2Vycy5maW5kT25lKHsgdG9rZW46IHRva2VufSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXNlcm5hbWUgPSByZXMudXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IHVzZXJJbmZvOiB7dXNlcm5hbWU6IHVzZXJuYW1lfSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7IGVycm9yOiB0cnVlLCBtc2c6ICdObyB1c2VyIGFjY291bnQgZm91bmQnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZChlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgIHtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZCgyMDApLnNlbmQoe2Vycm9yOiB0cnVlfSk7XG4gICAgfVxuICAgXG59O1xuXG5cbmV4cG9ydCBjb25zdCBuZXdFeHBlbnNlID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgbGV0IHsgYW1vdW50LCBkYXRlIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgY29uc3QgeyAgd3csIGRvdywgbW0sIHl5LCBkZCwgdHlwZSwgY2F0ZWdvcnksIGRlc2NyaXB0aW9uIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgYW1vdW50ID0gcGFyc2VJbnQoYW1vdW50KTtcbiAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgY29uc3QgbmV3RXhwZW5zZSA9IHsgYW1vdW50LCBjYXRlZ29yeSwgZGF0ZSwgdHlwZSwgd3csIGRvdywgbW0sIHl5LCBkZCwgZGVzY3JpcHRpb259O1xuICAgIHZhciBuZXdFeHBlbnNlSW5zdGFuY2UgPSBuZXcgRXhwZW5zZXMoe1xuICAgICAgICB0b2tlbjogcmVxdWVzdC5zZXNzaW9uLnRva2VuLFxuICAgICAgICAuLi5uZXdFeHBlbnNlXG4gICAgfSk7XG4gICAgbmV3RXhwZW5zZUluc3RhbmNlLnNhdmUoKS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZChkb2MpO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBzYXZlIG5ldyBFeHBlbnNlJywgZXJyKTtcbiAgICAgICAgcmVzcG9uc2Uuc3RhdHVzKDUwMCkuc2VuZChlcnIpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VEYXRhID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3QgdG9rZW4gPSByZXF1ZXN0LnNlc3Npb24udG9rZW4gPyByZXF1ZXN0LnNlc3Npb24udG9rZW4gOiAnJztcbiAgICBjb25zdCB7YWN0aXZlRmlsdGVyfSA9IHJlcXVlc3QuYm9keTtcbiAgICBmdW5jdGlvbiBleHBlbnNlRGF0ZVJlc3BvbmRlcihlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVzcG9uZC5zZW5kKDUwMCkuc2VuZChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGV4cGVuc2VMaXN0ID0ge30sIGluY29tZUxpc3Q9e307XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhW2tleV0udHlwZSA9PT0gJ2V4cGVuc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVuc2VMaXN0ID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YVtrZXldLnR5cGUgPT09ICdpbmNvbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGluY29tZUxpc3QgPSBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgc3BlbnQsIHN0YW5kaW5nO1xuICAgICAgICAgICAgaWYgKGV4cGVuc2VMaXN0ICYmIGV4cGVuc2VMaXN0LnRyYW5zYWN0aW9uTGlzdCkge1xuICAgICAgICAgICAgICAgIGV4cGVuc2VMaXN0LnRyYW5zYWN0aW9uTGlzdC5tYXAoKHRyYW5zYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZXJjZW50ID0gdHJhbnNhY3Rpb24uYW1vdW50IC8gKGV4cGVuc2VMaXN0LmFtb3VudCAvIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLnBlcmNlbnQgPSBNYXRoLnJvdW5kKHBlcmNlbnQgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNwZW50ID0gZXhwZW5zZUxpc3QuYW1vdW50O1xuICAgICAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICAgICAgc3BlbnQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluY29tZUxpc3QgJiYgaW5jb21lTGlzdC50cmFuc2FjdGlvbkxpc3QpIHtcbiAgICAgICAgICAgICAgICBpbmNvbWVMaXN0LnRyYW5zYWN0aW9uTGlzdC5tYXAoKHRyYW5zYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZXJjZW50ID0gdHJhbnNhY3Rpb24uYW1vdW50IC8gKGluY29tZUxpc3QuYW1vdW50IC8gMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ucGVyY2VudCA9IE1hdGgucm91bmQocGVyY2VudCAqIDEwMCkgLyAxMDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3RhbmRpbmcgPSBpbmNvbWVMaXN0LmFtb3VudCAtIHNwZW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFuZGluZyA9IDAgLSBzcGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgeXksIG1tLCB3dywgZGR9ID0gcmVxdWVzdC5ib2R5XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHsgZGQ6ZGQsIG1tOiBtbSwgeXk6IHl5LCB3dzogd3csIGV4cGVuc2VMaXN0OiBleHBlbnNlTGlzdCwgaW5jb21lTGlzdDogaW5jb21lTGlzdCwgc3BlbnQ6IHNwZW50LCBzdGFuZGluZzogc3RhbmRpbmcgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBRdWVyaWVzIHN0YXJ0XG4gICAgY29uc3QgZ3JvdXAxID0ge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICAgIF9pZDogeyBjYXRlZ29yeTogJyRjYXRlZ29yeScsIHR5cGU6ICckdHlwZScgfSxcbiAgICAgICAgICAgIHR5cGU6IHsgJyRmaXJzdCc6ICckdHlwZScgfSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiB7ICckZmlyc3QnOiAnJGNhdGVnb3J5JyB9LFxuICAgICAgICAgICAgZGF0ZTogeyAnJGZpcnN0JzogJyRkYXRlJyB9LFxuICAgICAgICAgICAgYW1vdW50OiB7ICRzdW06ICckYW1vdW50JyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdyb3VwMiA9IHtcbiAgICAgICAgJGdyb3VwOiB7XG4gICAgICAgICAgICBfaWQ6IHsgdHlwZTogJyR0eXBlJyB9LFxuICAgICAgICAgICAgYW1vdW50OiB7ICRzdW06ICckYW1vdW50JyB9LFxuICAgICAgICAgICAgdHlwZTogeyAnJGZpcnN0JzogJyR0eXBlJyB9LFxuICAgICAgICAgICAgdHJhbnNhY3Rpb25MaXN0OiB7ICRwdXNoOiB7IGNhdGVnb3J5OiAnJGNhdGVnb3J5JywgYW1vdW50OiAnJGFtb3VudCcsIGRhdGU6ICckZGF0ZScsIGlkOiAnJF9pZCcsIGRlc2NyaXB0aW9uOiAnJGRlc2NyaXB0aW9uJyB9IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgdW53aW5kID0geyAkdW53aW5kOiAnJHRyYW5zYWN0aW9uTGlzdCcgfTtcbiAgICBsZXQgc29ydCA9IHt9O1xuICAgIGlmIChhY3RpdmVGaWx0ZXIgPT09ICdzcGVudFJhdGUnKSB7XG4gICAgICAgIHNvcnQgPSB7ICRzb3J0OiB7ICd0cmFuc2FjdGlvbkxpc3QuYW1vdW50JzogLTEgfSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNvcnQgPSB7ICRzb3J0OiB7ICd0cmFuc2FjdGlvbkxpc3QuZGF0ZSc6IC0xIH0gfTtcbiAgICB9XG4gICAgY29uc3QgcmVHcm91cCA9IHtcbiAgICAgICAgJGdyb3VwOiB7XG4gICAgICAgICAgICBfaWQ6IHsgdHlwZTogJyR0eXBlJyB9LFxuICAgICAgICAgICAgYW1vdW50OiB7ICckZmlyc3QnOiAnJGFtb3VudCcgfSxcbiAgICAgICAgICAgIHR5cGU6IHsgJyRmaXJzdCc6ICckdHlwZScgfSxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uTGlzdDogeyAkcHVzaDogJyR0cmFuc2FjdGlvbkxpc3QnIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8gUXVlcmllcyBlbmRcblxuICAgIGNvbnN0IHsgdGFiLCB3dywgbW0sIHl5LCBkb3cgfSA9IHJlcXVlc3QuYm9keTtcbiAgICBpZiAodGFiID09PSBZRUFSKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB0b2tlbjogdG9rZW59IH0sXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB5eTogcGFyc2VJbnQoeXkpIH0gfSxcbiAgICAgICAgICAgIHsgLi4uZ3JvdXAyIH0sXG4gICAgICAgICAgICB7IC4uLnVud2luZCB9LHsgLi4uc29ydCB9LHsgLi4ucmVHcm91cCB9LFxuICAgICAgICAgICAgeyAkcHJvamVjdDogeyBfaWQ6IDAsIGFtb3VudDogMSwgdHlwZTogMSwgdHJhbnNhY3Rpb25MaXN0OiAxIH0gfVxuICAgICAgICBdKS5hbGxvd0Rpc2tVc2UodHJ1ZSkuZXhlYyhleHBlbnNlRGF0ZVJlc3BvbmRlcik7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IE1PTlRIKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB0b2tlbjogdG9rZW4gfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0seyAkbWF0Y2g6IHsgbW06IHBhcnNlSW50KG1tKSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMiB9LFxuICAgICAgICAgICAgeyAuLi51bndpbmQgfSx7IC4uLnNvcnQgfSx7IC4uLnJlR3JvdXAgfSxcbiAgICAgICAgICAgIHsgJHByb2plY3Q6IHsgX2lkOiAwLCBhbW91bnQ6IDEsIHR5cGU6IDEsIHRyYW5zYWN0aW9uTGlzdDogMSB9IH1cbiAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhwZW5zZURhdGVSZXNwb25kZXIpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBXRUVLKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7ICRtYXRjaDogeyB0b2tlbjogdG9rZW4gfSB9LFxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgeXk6IHBhcnNlSW50KHl5KSB9IH0seyAkbWF0Y2g6IHsgbW06IHBhcnNlSW50KG1tKSB9IH0seyAkbWF0Y2g6IHsgd3c6IHBhcnNlSW50KHd3KSB9IH0sXG4gICAgICAgICAgICB7IC4uLmdyb3VwMiB9LFxuICAgICAgICAgICAgeyAuLi51bndpbmQgfSx7IC4uLnNvcnQgfSx7IC4uLnJlR3JvdXAgfSxcbiAgICAgICAgICAgIHsgJHByb2plY3Q6IHsgX2lkOiAwLCBhbW91bnQ6IDEsIHR5cGU6IDEsIHRyYW5zYWN0aW9uTGlzdDogMSB9IH1cbiAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhwZW5zZURhdGVSZXNwb25kZXIpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU3VtbWFyeSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIGZ1bmN0aW9uIGV4ZWNTdW1tYXJ5UXVlcnkoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJlc3BvbmQuc2VuZCg1MDApLnNlbmQoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGFbMF0gJiYgZGF0YVswXS5wZXJEaXZpc2lvbkRhdGEpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWF4QW1vdW50ID0gTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVI7XG4gICAgICAgICAgICAgICAgZGF0YVswXS5wZXJEaXZpc2lvbkRhdGEuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXhBbW91bnQgPCBlbnRyeS5hbW91bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEFtb3VudCA9IGVudHJ5LmFtb3VudFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGF0YVswXS5tYXhBbW91bnQgPSBtYXhBbW91bnQ7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7Li4uZGF0YVswXX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgdG9rZW4gPSByZXF1ZXN0LnNlc3Npb24udG9rZW4gPyByZXF1ZXN0LnNlc3Npb24udG9rZW4gOiAnJztcbiAgICBjb25zdCB7dGFiLCB5eSwgbW0sIHd3fSA9IHJlcXVlc3QuYm9keTtcbiAgICBpZiAodGFiID09PSBZRUFSKSB7XG4gICAgICAgIEV4cGVuc2VzLmFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHRva2VuOiB0b2tlbiB9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgeXk6IHl5fX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHR5cGU6ICdleHBlbnNlJ319LFxuICAgICAgICAgICAgeyRncm91cDogeyBfaWQ6IHsgbW06ICckbW0nfSwgYW1vdW50OiB7JHN1bTogJyRhbW91bnQnfSwgbW9udGg6IHsnJGZpcnN0JzogJyRtbSd9fX0sXG4gICAgICAgICAgICB7JHNvcnQ6IHsgbW9udGg6IDEgfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7X2lkOiBudWxsLCB0b3RhbEFtb3VudDogeyckc3VtJzogJyRhbW91bnQnfSwgcGVyRGl2aXNpb25EYXRhOiB7JHB1c2ggOiB7IGFtb3VudDogJyRhbW91bnQnLCBkaXZpc2lvbjogJyRtb250aCd9fX19LFxuICAgICAgICAgICAgeyRwcm9qZWN0OiB7X2lkOiAwfX1cbiAgICAgICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4ZWNTdW1tYXJ5UXVlcnkpO1xuICAgIH0gZWxzZSBpZiAodGFiID09PSBNT05USCkge1xuICAgICAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICAgICAgeyRtYXRjaDogeyB0b2tlbjogdG9rZW4gfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHl5OiB5eX19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyBtbTogbW19fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdHlwZTogJ2V4cGVuc2UnfX0sXG4gICAgICAgICAgICB7JGdyb3VwOiB7IF9pZDoge2RkOiAnJGRkJ30sIGFtb3VudDogeyckc3VtJzogJyRhbW91bnQnfSwgZGQ6IHsnJGZpcnN0JzogJyRkZCd9IH19LFxuICAgICAgICAgICAgeyRzb3J0OiB7ZGQ6IDF9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHtfaWQ6IG51bGwsIHRvdGFsQW1vdW50OiB7JyRzdW0nOiAnJGFtb3VudCd9LCBwZXJEaXZpc2lvbkRhdGE6IHskcHVzaDoge2Ftb3VudDogJyRhbW91bnQnLCBkaXZpc2lvbjogJyRkZCd9fX19LFxuICAgICAgICAgICAgeyRwcm9qZWN0OiB7X2lkOjB9fVxuICAgICAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZXhlY1N1bW1hcnlRdWVyeSk7XG4gICAgfSBlbHNlIGlmICh0YWIgPT09IFdFRUspIHtcbiAgICAgICAgRXhwZW5zZXMuYWdncmVnYXRlKFtcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgdG9rZW46IHRva2VuIH19LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB5eTogeXl9fSxcbiAgICAgICAgICAgIHskbWF0Y2g6IHsgbW06IG1tfX0sXG4gICAgICAgICAgICB7JG1hdGNoOiB7IHd3OiB3d319LFxuICAgICAgICAgICAgeyRtYXRjaDogeyB0eXBlOiAnZXhwZW5zZSd9fSxcbiAgICAgICAgICAgIHskZ3JvdXA6IHsgX2lkOiB7ZG93OiAnJGRvdyd9LCBhbW91bnQ6IHskc3VtOiAnJGFtb3VudCd9LCBkb3c6IHsnJGZpcnN0JzogJyRkb3cnfX19LFxuICAgICAgICAgICAgeyRzb3J0OiB7IGRvdzogMX19LFxuICAgICAgICAgICAgeyRncm91cDogeyBfaWQ6IG51bGwsIHRvdGFsQW1vdW50OiB7JHN1bTogJyRhbW91bnQnfSwgIHBlckRpdmlzaW9uRGF0YTogeyRwdXNoOiB7YW1vdW50OiAnJGFtb3VudCcsIGRpdmlzaW9uOiAnJGRvdyd9fX19LFxuICAgICAgICAgICAgeyRwcm9qZWN0OiB7X2lkOiAwfX1cbiAgICAgICAgICAgIF0pLmFsbG93RGlza1VzZSh0cnVlKS5leGVjKGV4ZWNTdW1tYXJ5UXVlcnkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VEYXRlID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3Qge2lkfSA9IHJlcXVlc3QuYm9keTtcbiAgICBFeHBlbnNlcy5maW5kT25lQW5kUmVtb3ZlKHtfaWQ6IGlkfSkudGhlbigoZG9jKSA9PiB7XG4gICAgICAgIHJlc3BvbnNlLnNlbmQoZG9jKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGVkaXRFeHBlbnNlID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgbGV0IHthbW91bnQsIGRhdGV9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGNvbnN0IHsgIGlkLCB3dywgZG93LCBtbSwgeXksIGRkLCB0eXBlLCBjYXRlZ29yeSwgZGVzY3JpcHRpb24gfSA9IHJlcXVlc3QuYm9keTtcbiAgICBhbW91bnQgPSBwYXJzZUludChhbW91bnQpO1xuICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICBjb25zdCBuZXdFeHBlbnNlID0geyBhbW91bnQsIGNhdGVnb3J5LCBkYXRlLCB0eXBlLCB3dywgZG93LCBtbSwgeXksIGRkLCBkZXNjcmlwdGlvbn07XG4gICAgRXhwZW5zZXMuZmluZE9uZUFuZFVwZGF0ZShcbiAgICAgICAge19pZDogaWR9LFxuICAgICAgICB7JHNldDogeydhbW91bnQnOiBhbW91bnQsICdjYXRlZ29yeSc6IGNhdGVnb3J5LCAnZGF0ZSc6IGRhdGUsICd0eXBlJzogdHlwZSwgJ3d3Jzogd3csICdkZCc6IGRkLCAnbW0nOiBtbSwgJ3l5JzogeXksICdkb3cnOiBkb3csICdkZXNjcmlwdGlvbic6IGRlc2NyaXB0aW9uIH0gfSxcbiAgICAgICAge3Vwc2VydDp0cnVlLCByZXR1cm5OZXdEb2N1bWVudCA6IHRydWV9XG4gICAgKS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZCh7ZXJyOiBmYWxzZX0pO1xuICAgIH0pO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0RnJlcXVlbnRDYXRlZ29yaWVzID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3Qge3Rva2VufSA9IHJlcXVlc3Quc2Vzc2lvbjtcbiAgICBFeHBlbnNlcy5hZ2dyZWdhdGUoW1xuICAgICAgICB7JG1hdGNoOiB7dG9rZW46IHRva2VuIH19LFxuICAgICAgICB7JG1hdGNoOiB7dHlwZTogXCJleHBlbnNlXCJ9fSxcbiAgICAgICAgeyRncm91cDoge19pZDogJyRjYXRlZ29yeScsIGNhdGVnb3J5OiB7JyRmaXJzdCc6ICckY2F0ZWdvcnknfSwgY291bnQ6IHskc3VtOiAxfX19LFxuICAgICAgICB7JHNvcnQ6IHsnY291bnQnOiAtMX19LFxuICAgICAgICB7JHByb2plY3Q6IHsnX2lkJzogMCwgY2F0ZWdvcnk6IDEsIGNvdW50OiAxfX1cbiAgICAgICAgXSkuYWxsb3dEaXNrVXNlKHRydWUpLmV4ZWMoZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzKDIwMCkuc2VuZCh7ZXJyb3I6IHRydWUsIG1zZzogZXJyfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cygyMDApLnNlbmQoe2Vycm9yOiBmYWxzZSwgZGF0YTogWy4uLmRhdGFdfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xufVxuIiwidmFyIGVudiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCc7XG5cbmlmIChlbnYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgcHJvY2Vzcy5lbnYuUE9SVCA9IDQwMDA7XG59IiwidmFyIG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcbm1vbmdvb3NlLlByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbm1vbmdvb3NlLmNvbm5lY3QocHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJLCB7IHVzZU1vbmdvQ2xpZW50OiB0cnVlIH0pLnRoZW4oKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gRGInKTtcbn0sKGUpPT4ge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHttb25nb29zZX07XG4iLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IFVzZXJzIGZyb20gJy4vdXNlck1vZGVsJztcblxuY29uc3QgRXhwZW5zZXMgPSBtb25nb29zZS5tb2RlbCgnRXhwZW5zZXMnLCB7XG4gIHRva2VuOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHJlZjogJ1VzZXJzJ1xuICB9LFxuICBhbW91bnQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZVxuICB9LFxuICBjYXRlZ29yeToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0cmltOiB0cnVlLFxuICAgICAgZGVmYXVsdDogJ290aGVycydcbiAgfSxcbiAgdHlwZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZSxcbiAgICBkZWZhdWx0OiAnZXhwZW5zZSdcbiAgfSxcbiAgZGVzY3JpcHRpb246IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgZGF0ZToge1xuICAgIHR5cGU6IERhdGUsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWUsXG4gICAgZGVmYXVsdDogRGF0ZS5ub3coKVxuICB9LFxuICBkZDoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICB3dzoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICBkb3c6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgbW06IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgeXk6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWVcbiAgfVxufSk7XG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlczsiLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IEV4cGVuc2VzIGZyb20gJy4vZXhwZW5zZU1vZGVsJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuXG5jb25zdCBVc2VyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gICAgX2lkOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG4gICAgdXNlcm5hbWU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWlubGVuZ3RoOiA1LFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBlbWFpbElkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW5sZW5ndGg6IDgsXG4gICAgICAgIHRyaW06IHRydWVcbiAgICB9LFxuICAgIHRva2VuOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBleHBlbnNlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCwgXG4gICAgICAgICAgICByZWY6ICdFeHBlbnNlcydcbiAgICAgICAgfVxuICAgIF1cbn0pO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVRva2VuKHVzZXJEb2MsIG5leHQpIHtcbiAgICBiY3J5cHQuZ2VuU2FsdCgxMCwgZnVuY3Rpb24oZXJyLCBzYWx0KXtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBnZW5lcmF0ZSBTYWx0IGZvciBUb2tlbicsIGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiY3J5cHQuaGFzaCh1c2VyRG9jLl9pZC50b0hleFN0cmluZygpICsgdXNlckRvYy5wYXNzd29yZC50b1N0cmluZygpLCBzYWx0LCBmdW5jdGlvbihlcnIsIGhhc2gpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gZ2VuZXJhdGUgSGFzaCBmb3IgVG9rZW4nLCBlcnIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEb2MudG9rZW4gPSBoYXNoO1xuICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gU3BlY2lmaWMgdG8gYWxsIGVudHJpZXMgaW4gZG9jdW1lbnQsICd0aGlzJyByZWZlcnMgdG8gYSBkb2N1bWVudFxuVXNlclNjaGVtYS5wcmUoJ3NhdmUnLCBmdW5jdGlvbihuZXh0KSB7XG4gICAgdmFyIHVzZXJEb2MgPSB0aGlzO1xuICAgIGlmICh1c2VyRG9jLmlzTW9kaWZpZWQoJ3Bhc3N3b3JkJykpIHtcbiAgICAgICAgYmNyeXB0LmdlblNhbHQoMTAsIGZ1bmN0aW9uKGVyciwgc2FsdCl7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBnZW5lcmF0ZSBTYWx0JywgZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmNyeXB0Lmhhc2godXNlckRvYy5wYXNzd29yZCwgc2FsdCwgZnVuY3Rpb24oZXJyLCBoYXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gZ2VuZXJhdGUgSGFzaCcsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyRG9jLnBhc3N3b3JkID0gaGFzaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlVG9rZW4odXNlckRvYywgbmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZ2VuZXJhdGVUb2tlbih1c2VyRG9jLCBuZXh0KTtcbiAgICB9XG59KTtcblxuY29uc3QgVXNlcnMgPSBtb25nb29zZS5tb2RlbCgnVXNlcnMnLCBVc2VyU2NoZW1hKTtcbmV4cG9ydCBkZWZhdWx0IFVzZXJzOyIsInJlcXVpcmUoJy4vY29uZmlnL2NvbmZpZycpO1xuaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCc7XG5pbXBvcnQgZW52IGZyb20gJy4vY29uZmlnL2NvbmZpZyc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbnZhciBzZXNzaW9uID0gcmVxdWlyZSgnZXhwcmVzcy1zZXNzaW9uJyk7XG5cbmltcG9ydCBBcHAgZnJvbSAnLi4vc3JjL2FwcCdcbmltcG9ydCAnLi9kYi9tb25nb29zZSc7XG5pbXBvcnQge3NpZ25VcCwgc2lnbkluLCBuZXdFeHBlbnNlLCBnZXRFeHBlbnNlRGF0YSwgZ2V0RXhwZW5zZVN1bW1hcnksIGRlbGV0ZUV4cGVuc2VEYXRlLCBsb2dvdXQsIGdldFVzZXJJbmZvLCBlZGl0RXhwZW5zZSwgZ2V0RnJlcXVlbnRDYXRlZ29yaWVzfSBmcm9tICcuL2FwaS9hcGlDYWxscyc7XG5cbmNvbnN0IE1vbmdvU3RvcmUgPSByZXF1aXJlKCdjb25uZWN0LW1vbmdvJykoc2Vzc2lvbik7XG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVDtcblxuYXBwLnVzZShzZXNzaW9uKHtcbiAgICBzZWNyZXQ6ICdmb28nLFxuICAgIHJlc2F2ZTogdHJ1ZSxcbiAgICBzdG9yZTogbmV3IE1vbmdvU3RvcmUoe1xuICAgICAgICB1cmw6IHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSVxuICAgIH0pXG59KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJ2J1aWxkL3B1YmxpYycpKTtcbmFwcC51c2UoJy9zdHlsZXMnLCBleHByZXNzLnN0YXRpYygnc3JjL3BhZ2VzL3N0eWxlcycpKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJ3NyYy9wYWdlcy9zdGF0aWMnKSk7XG5cbi8vIEFQSSBDYWxsc1xuYXBwLnBvc3QoJy9zaWdudXAnLCBzaWduVXApO1xuYXBwLnBvc3QoJy9zaWduaW4nLCBzaWduSW4pO1xuYXBwLnBvc3QoJy9sb2dvdXQnLCBsb2dvdXQpO1xuYXBwLnBvc3QoJy91c2VyaW5mbycsIGdldFVzZXJJbmZvKTtcbmFwcC5wb3N0KCcvbmV3X2V4cGVuc2UnLCBuZXdFeHBlbnNlKTtcbmFwcC5wb3N0KCcvZ2V0X2V4cGVuc2VfZGF0YScsIGdldEV4cGVuc2VEYXRhKTtcbmFwcC5wb3N0KCcvZ2V0X2V4cGVuc2Vfc3VtbWFyeScsIGdldEV4cGVuc2VTdW1tYXJ5KTtcbmFwcC5wb3N0KCcvZGVsZXRlX2V4cGVuc2VfZGF0ZScsIGRlbGV0ZUV4cGVuc2VEYXRlKTtcbmFwcC5wb3N0KCcvZWRpdF9leHBlbnNlJywgZWRpdEV4cGVuc2UpO1xuYXBwLmdldCgnL2dldEZyZXF1ZW50Q2F0ZWdvcmllcycsIGdldEZyZXF1ZW50Q2F0ZWdvcmllcyk7XG5cblxuY29uc3QgbG9hZEh0bWwgPSAoY29udGVudCkgPT4ge1xuICAgIHJldHVybiAoYFxuICAgICAgICA8aHRtbD5cbiAgICAgICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwibWFuaWZlc3RcIiBocmVmPVwiL21hbmlmZXN0Lmpzb25cIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9pbWcvYnVkZ2V0NjQucG5nXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnNcIiByZWw9XCJzdHlsZXNoZWV0XCI+XG4gICAgICAgICAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgICAgICAgICBAa2V5ZnJhbWVzIHJpcHBsZUxvYWRlciB7XG4gICAgICAgICAgICAgICAgICAgICAgICAxMDAlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDcwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9zdHlsZT5cbiAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgIDxib2R5PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyb290XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPHNjcmlwdD5cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvYWRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2PlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZVwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwNzU3ZDA7IGJvcmRlci1yYWRpdXM6IDEwMCU7IHdpZHRoOiAzNXB4OyBoZWlnaHQ6IDM1cHg7IHRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luOiA1MHZoIGF1dG87ei1pbmRleDogNztwb3NpdGlvbjogcmVsYXRpdmU7XCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwicGFkZGluZzogMTFweFwiLz5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIHg9XCIwcHhcIiB5PVwiMHB4XCIgd2lkdGg9XCIxM3B4XCIgaGVpZ2h0PVwiMTNweFwiIHZpZXdCb3g9XCIwIDAgNDAxLjk5OCA0MDEuOTk4XCIgc3R5bGU9e3tcImVuYWJsZS1iYWNrZ3JvdW5kXCIgOlwibmV3IDAgMCA0MDEuOTk4IDQwMS45OThcIiwgXCJ4bWw6c3BhY2VcIjogXCJwcmVzZXJ2ZVwifX0+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGc+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0zMjYuNjIsOTEuMDc2Yy0xLjcxMS0xLjcxMy0zLjkwMS0yLjU2OC02LjU2My0yLjU2OGgtNDguODJjLTMuMjM4LTE1Ljc5My05LjMyOS0yOS41MDItMTguMjc0LTQxLjExMmg2Ni41MiAgIGMyLjY2OSwwLDQuODUzLTAuODU2LDYuNTctMi41NjVjMS43MDQtMS43MTIsMi41Ni0zLjkwMywyLjU2LTYuNTY3VjkuMTM2YzAtMi42NjYtMC44NTUtNC44NTMtMi41Ni02LjU2NyAgIEMzMjQuMzM0LDAuODU5LDMyMi4xNSwwLDMxOS40ODEsMEg4MS45NDFjLTIuNjY2LDAtNC44NTMsMC44NTktNi41NjcsMi41NjhjLTEuNzA5LDEuNzE0LTIuNTY4LDMuOTAxLTIuNTY4LDYuNTY3djM3Ljk3MiAgIGMwLDIuNDc0LDAuOTA0LDQuNjE1LDIuNzEyLDYuNDIzczMuOTQ5LDIuNzEyLDYuNDIzLDIuNzEyaDQxLjM5OWM0MC4xNTksMCw2NS42NjUsMTAuNzUxLDc2LjUxMywzMi4yNjFIODEuOTQxICAgYy0yLjY2NiwwLTQuODU2LDAuODU1LTYuNTY3LDIuNTY4Yy0xLjcwOSwxLjcxNS0yLjU2OCwzLjkwMS0yLjU2OCw2LjU2N3YyOS4xMjRjMCwyLjY2NCwwLjg1NSw0Ljg1NCwyLjU2OCw2LjU2MyAgIGMxLjcxNCwxLjcxNSwzLjkwNSwyLjU2OCw2LjU2NywyLjU2OGgxMjEuOTE1Yy00LjE4OCwxNS42MTItMTMuOTQ0LDI3LjUwNi0yOS4yNjgsMzUuNjkxICAgYy0xNS4zMjUsOC4xODYtMzUuNTQ0LDEyLjI3OS02MC42NywxMi4yNzlIODEuOTQxYy0yLjQ3NCwwLTQuNjE1LDAuOTA1LTYuNDIzLDIuNzEyYy0xLjgwOSwxLjgwOS0yLjcxMiwzLjk1MS0yLjcxMiw2LjQyM3YzNi4yNjMgICBjMCwyLjQ3OCwwLjg1NSw0LjU3MSwyLjU2OCw2LjI4MmMzNi41NDMsMzguODI4LDgzLjkzOSw5My4xNjUsMTQyLjE4MiwxNjMuMDI1YzEuNzE1LDIuMjg2LDQuMDkzLDMuNDI2LDcuMTM5LDMuNDI2aDU1LjY3MiAgIGM0LjAwMSwwLDYuNzYzLTEuNzA4LDguMjgxLTUuMTQxYzEuOTAzLTMuNDI2LDEuNTMtNi42NjItMS4xNDMtOS43MDhjLTU1LjU3Mi02OC4xNDMtOTkuMjU4LTExOS4xNTMtMTMxLjA0NS0xNTMuMDMyICAgYzMyLjM1OC0zLjgwNiw1OC42MjUtMTQuMjc3LDc4LjgwMi0zMS40MDRjMjAuMTc0LTE3LjEyOSwzMi40NDktMzkuNDAzLDM2LjgzLTY2LjgxMWg0Ny45NjVjMi42NjIsMCw0Ljg1My0wLjg1NCw2LjU2My0yLjU2OCAgIGMxLjcxNS0xLjcwOSwyLjU3My0zLjg5OSwyLjU3My02LjU2M1Y5Ny42NDZDMzI5LjE5Myw5NC45NzcsMzI4LjMzNSw5Mi43OSwzMjYuNjIsOTEuMDc2elwiIGRhdGEtb3JpZ2luYWw9XCIjMDAwMDAwXCIgIGRhdGEtb2xkX2NvbG9yPVwiI0Y3RjRGNFwiIGZpbGw9XCIjZmZmXCIvPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogNTAlOyBsZWZ0OiA1MCU7IHdpZHRoOiAxcHg7IGhlaWdodDogMXB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjMDc1N2QwOyBib3JkZXItcmFkaXVzOiA1MCU7IGFuaW1hdGlvbjogcmlwcGxlTG9hZGVyIDNzIGVhc2UgaW5maW5pdGU7XCI+PC9zcGFuPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pic7XG4gICAgICAgICAgICAgICAgPC9zY3JpcHQ+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL2NvbW1vbi5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvaG9tZS5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvbG9naW4uY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL25ld19leHBlbnNlLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9ub3Rmb3VuZC5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvcG9wdXAuY3NzXCI+XG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmMgPSBcIi9zd1JlZ2lzdGVyZXIuanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgICAgICA8c2NyaXB0IHNyYz1cImNsaWVudF9idW5kbGUuanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgIDwvYm9keT5cbiAgICAgICAgPC9odG1sPmApO1xufTtcblxuYXBwLmdldCgnKicsIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gbG9hZEh0bWwoKTtcbiAgICByZXMuc2VuZCh0ZW1wbGF0ZSk7XG59KTtcblxuYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1NlcnZlciBTdGFydGVkIG9uIFBvcnQ6ICcsIHBvcnQpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwcDtcbiIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3dpdGNoLCBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgSG9tZSBmcm9tICcuL3BhZ2VzL2NvbXBvbmVudHMvTG9naW4nO1xuaW1wb3J0IFJvdXRlcyBmcm9tICcuL3BhZ2VzL3JvdXRlcy9yb3V0ZXMnO1xuaW1wb3J0IHtTZXJ2ZXJSb3V0ZXJ9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSb3V0ZXMvPlxuICAgICAgICApO1xuICAgIH1cbn0iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgY29uc3Qgc2lnbnVwID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL3NpZ251cC8nO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHsuLi5wYXJhbXN9KTtcbn1cblxuZXhwb3J0IGNvbnN0IHNpZ25pbiA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9zaWduaW4vJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VySW5mbyA9ICgpID0+IHtcbiAgY29uc3QgdXJsID0gJy91c2VyaW5mby8nO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHt9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGxvZ291dFVzZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvbG9nb3V0Lyc7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwge30pO1xufVxuXG5leHBvcnQgY29uc3QgbmV3X2V4cGVuc2UgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvbmV3X2V4cGVuc2UvJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRfZXhwZW5zZV9kYXRhID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL2dldF9leHBlbnNlX2RhdGEvJyA7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgcGFyYW1zKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldF9leHBlbnNlX3N1bW1hcnkgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvZ2V0X2V4cGVuc2Vfc3VtbWFyeS8nIDtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCBwYXJhbXMpO1xufVxuXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZURhdGUgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvZGVsZXRlX2V4cGVuc2VfZGF0ZS8nIDtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCBwYXJhbXMpO1xufVxuXG5leHBvcnQgY29uc3QgZWRpdF9leHBlbnNlID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL2VkaXRfZXhwZW5zZS8nIDtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCBwYXJhbXMpO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0RnJlcXVlbnRDYXRlZ29yaWVzID0gKCkgPT4ge1xuICBjb25zdCB1cmwgPSAnL2dldEZyZXF1ZW50Q2F0ZWdvcmllcy8nO1xuICByZXR1cm4gYXhpb3MuZ2V0KHVybCk7XG59IiwiXG5jb25zdCBXSURUSCA9IDE4MDtcbmNvbnN0IEhFSUdIVCA9IDExNTtcblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0RJVklTSU9OTEVOR1RILCBNQVhMRU5HVEhQRVJUQUIsIE1PTlRIU05BTUVTSE9SVCwgTU9OVEgsIFdFRUssIFlFQVIsIFdFRUtOQU1FU0hPUlR9IGZyb20gJy4uL2NvbnN0YW50cy9jb25zdGFudHMnO1xuaW1wb3J0IHthbW91bnRPbkdyYXBofSBmcm9tICcuLi91dGlscy91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5nZW5lcmF0ZVNWRyA9IHRoaXMuZ2VuZXJhdGVTVkcuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICh3aW5kb3cgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvbnJlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhbGVydCgnYXR0YWNoRXZlbnQgLSByZXNpemUnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlclBvaW50cyh4Q29vcmRpbmF0ZXMsIHlDb29yZGluYXRlcywgYW1vdW50T25Db29yZGluYXRlcykge1xuICAgIGNvbnN0IHBvaW50c0VsZW1lbnQgPSBbXTtcbiAgICBjb25zdCB0YWIgPSB0aGlzLnByb3BzLnRhYjtcbiAgICBsZXQgdGV4dEluZGV4ID0gMDtcbiAgICBmb3IobGV0IGluZGV4ID0gMTsgaW5kZXggPCB4Q29vcmRpbmF0ZXMubGVuZ3RoIC0gMTsgaW5kZXgrKykge1xuICAgICAgbGV0IHBvaW50VGV4dCA9ICcnO1xuICAgICAgaWYgKHRhYiA9PT0gV0VFSykge1xuICAgICAgICBwb2ludFRleHQgPSBXRUVLTkFNRVNIT1JUW3RleHRJbmRleCsrXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgfSBlbHNlIGlmICh0YWIgPT09IFlFQVIpIHtcbiAgICAgICAgcG9pbnRUZXh0ID0gTU9OVEhTTkFNRVNIT1JUW3RleHRJbmRleCsrXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgfSBlbHNlIGlmICh0YWIgPT09IE1PTlRIICkge1xuICAgICAgICBpZiAoaW5kZXggJSAyICE9PSAwKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcG9pbnRUZXh0ID0gaW5kZXg7XG4gICAgICB9XG4gICAgICBwb2ludHNFbGVtZW50LnB1c2goXG4gICAgICAgIDxnIGtleT17J2dyb3VwXycgKyBpbmRleH0+XG4gICAgICAgICAgPGE+XG4gICAgICAgICAgPHRleHQgY2xhc3NOYW1lPVwiZmJcIiB4PXt4Q29vcmRpbmF0ZXNbaW5kZXhdfSBmaWxsPVwiIzc1NzU3NVwiIHk9e3lDb29yZGluYXRlc1tpbmRleF0gLSA1fSBmb250U2l6ZT1cIjVcIiB0ZXh0QW5jaG9yPVwibWlkZGxlXCI+e2Ftb3VudE9uR3JhcGgoYW1vdW50T25Db29yZGluYXRlc1tpbmRleF0pfTwvdGV4dD5cbiAgICAgICAgICA8Y2lyY2xlIGN4PXt4Q29vcmRpbmF0ZXNbaW5kZXhdfSBjeT17eUNvb3JkaW5hdGVzW2luZGV4XX0gc3Ryb2tlPVwiIzA3NTdkMFwiIGZpbGw9XCIjMDc1N2QwXCIgcj1cIjAuNVwiIHN0cm9rZVdpZHRoPVwiMVwiPjwvY2lyY2xlPlxuICAgICAgICAgIDx0ZXh0IGNsYXNzTmFtZT1cImZiXCIgeD17eENvb3JkaW5hdGVzW2luZGV4XX0gZmlsbD1cIiM3NTc1NzVcIiB5PXtIRUlHSFQgKyA3fSBmb250U2l6ZT1cIjVcIiB0ZXh0QW5jaG9yPVwibWlkZGxlXCI+e3BvaW50VGV4dH08L3RleHQ+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2c+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcG9pbnRzRWxlbWVudDtcbiAgfVxuXG4gIGdlbmVyYXRlU1ZHKCkge1xuICAgIGNvbnN0IHtwbG90RGF0YSwgdGFifSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeENvb3JkaW5hdGVzID0gW107XG4gICAgY29uc3QgeUNvb3JkaW5hdGVzID0gW107XG4gICAgY29uc3QgYW1vdW50T25Db29yZGluYXRlcyA9IFtdO1xuICAgIGNvbnN0IGxlbmd0aCA9IERJVklTSU9OTEVOR1RIW3RhYl07XG4gICAgY29uc3QgbWF4TGVuZyA9IE1BWExFTkdUSFBFUlRBQlt0YWJdO1xuICAgIGNvbnN0IG1heEFtdCA9IHBsb3REYXRhLm1heEFtb3VudDtcbiAgICBjb25zdCB4Q29vcmRpbmF0ZURpdkxlbmd0aCA9IChXSURUSCAvIGxlbmd0aCk7XG4gICAgbGV0IGxhc3REaXZpc2lvbiA9IHRhYiA9PT0gTU9OVEggPyAwIDogLTE7IC8vIEJlY2F1c2Ugd2Ugc2hvdyBvbmx5IGRhdGVzIGluIG1vbnRoIGRpdmlzaW9uIGJlZ2lucyB3aXRoIDEgc28gbGFzdCBzaHVkIGJlIDAgXG5cbiAgICBsZXQgc3RyID0gJyc7XG5cbiAgICAvKiBUbyBzdGFydCB0aGUgZ3JhcGggYXQgdGhlIExlYXN0IFBvaW50ICovXG4gICAgeENvb3JkaW5hdGVzLnB1c2goMCk7XG4gICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUKTtcbiAgICBhbW91bnRPbkNvb3JkaW5hdGVzLnB1c2goJycpO1xuICAgIHBsb3REYXRhLnBlckRpdmlzaW9uRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgd2hpbGUgKGVudHJ5LmRpdmlzaW9uID4gbGFzdERpdmlzaW9uKSB7XG4gICAgICAgIGNvbnN0IGxhc3RYID0geENvb3JkaW5hdGVzW3hDb29yZGluYXRlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgeENvb3JkaW5hdGVzLnB1c2goKGxhc3RYICsgeENvb3JkaW5hdGVEaXZMZW5ndGgpKTtcbiAgICAgICAgaWYgKGVudHJ5LmRpdmlzaW9uID09PSBsYXN0RGl2aXNpb24gKyAxKSB7XG4gICAgICAgICAgY29uc3QgcGVyY2VudCA9ICgoZW50cnkuYW1vdW50IC8gbWF4QW10KSAqIDEwMCk7XG4gICAgICAgICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUIC0gKChIRUlHSFQgLyAxMDApICogcGVyY2VudCkpO1xuICAgICAgICAgIGFtb3VudE9uQ29vcmRpbmF0ZXMucHVzaChlbnRyeS5hbW91bnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHlDb29yZGluYXRlcy5wdXNoKEhFSUdIVCk7XG4gICAgICAgICAgYW1vdW50T25Db29yZGluYXRlcy5wdXNoKCcnKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0RGl2aXNpb24rKztcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyB0byBwdXNoIHZhbHVlcyBmb3IgcmVtYWluaW5nIGRheXNcbiAgICB3aGlsZShtYXhMZW5nID4gbGFzdERpdmlzaW9uKSB7XG4gICAgICBjb25zdCBsYXN0WCA9IHhDb29yZGluYXRlc1t4Q29vcmRpbmF0ZXMubGVuZ3RoIC0gMV07XG4gICAgICB4Q29vcmRpbmF0ZXMucHVzaCgobGFzdFggKyB4Q29vcmRpbmF0ZURpdkxlbmd0aCkpO1xuICAgICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUKTtcbiAgICAgIGxhc3REaXZpc2lvbisrO1xuICAgICAgYW1vdW50T25Db29yZGluYXRlcy5wdXNoKCcnKTtcbiAgICB9XG4gICAgY29uc3QgbGFzdFggPSB4Q29vcmRpbmF0ZXNbeENvb3JkaW5hdGVzLmxlbmd0aCAtIDFdO1xuICAgIHhDb29yZGluYXRlcy5wdXNoKChsYXN0WCArIHhDb29yZGluYXRlRGl2TGVuZ3RoKSk7XG4gICAgeUNvb3JkaW5hdGVzLnB1c2goSEVJR0hUKTtcbiAgICBhbW91bnRPbkNvb3JkaW5hdGVzLnB1c2goJycpO1xuIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeENvb3JkaW5hdGVzW2ldICsgJywnICsgeUNvb3JkaW5hdGVzW2ldICsgJyAnO1xuICAgIH1cbiAgICBpZiAoc3RyKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHsvKiA8c3ZnIHZpZXdCb3g9eyctNSAtMTAgJyArIChXSURUSCArIDM1KSArICcgJyArIChIRUlHSFQgKyAxNSl9IHN0eWxlPXt7bWFyZ2luOiAnMTBweCd9fT4gKi99XG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PXsod2luZG93ICYmIHdpbmRvdy5zY3JlZW4ud2lkdGggPiA2MDAgPyAnLTUwIC0xMCAyODUgMjEwJyA6ICgnLTE1IC0xNSAyMjAgMTUwJykpfSBzdHlsZT17e21hcmdpbjogJzEwcHgnfX0+XG4gICAgICAgICAgICA8cG9seWxpbmUgcG9pbnRzPXtzdHJ9IGNsYXNzTmFtZT1cImdyYXBoUGxvdExpbmVcIiAvPlxuICAgICAgICAgICAge3RoaXMucmVuZGVyUG9pbnRzKHhDb29yZGluYXRlcywgeUNvb3JkaW5hdGVzLCBhbW91bnRPbkNvb3JkaW5hdGVzKX1cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5nZW5lcmF0ZVNWRygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IE5ld0V4cGVuc2UgZnJvbSAnLi9OZXdFeHBlbnNlJztcbmltcG9ydCB7Z2V0X2V4cGVuc2VfZGF0YSwgZ2V0X2V4cGVuc2Vfc3VtbWFyeSwgZ2V0VXNlckluZm8sIGxvZ291dFVzZXIsIGRlbGV0ZUV4cGVuc2VEYXRlfSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5pbXBvcnQge01PTlRILCBZRUFSLCBXRUVLLCBNT05USFNOQU1FLCBNT05USFNOQU1FU0hPUlR9IGZyb20gJy4uL2NvbnN0YW50cy9jb25zdGFudHMnO1xuaW1wb3J0IEdyYXBoIGZyb20gJy4vR3JhcGgnO1xuaW1wb3J0IHtyZW5kZXJPcHRpb25zLCBmb3JtYXREYXRlLCBSaXBwbGUsIHNldExvYWRlcn0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuaW1wb3J0IFBvcHVwIGZyb20gJy4vUG9wdXAnO1xuaW1wb3J0IHtQcm9tcHR9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IFBhZ2VMb2FkZXIgZnJvbSAnLi9QYWdlTG9hZGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMubGVmdE1lbnVDbGljayA9IHRoaXMubGVmdE1lbnVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmV3RXhwZW5zZSA9IHRoaXMubmV3RXhwZW5zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmF2aWdhdGVUb1NpZ25JbiA9IHRoaXMubmF2aWdhdGVUb1NpZ25Jbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2FuY2VsUG9wdXAgPSB0aGlzLmNhbmNlbFBvcHVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jb25maXJtUG9wdXAgPSB0aGlzLmNvbmZpcm1Qb3B1cC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZGVsZXRlRXhwZW5zZSA9IHRoaXMuZGVsZXRlRXhwZW5zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZWRpdEV4cGVuc2UgPSB0aGlzLmVkaXRFeHBlbnNlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFjdGl2ZVRhYjogTU9OVEgsXG4gICAgICBzaG93TmV3RXhwZW5zZTogZmFsc2UsXG4gICAgICB2aWV3TW9yZTogZmFsc2UsXG4gICAgICB3ZWVrRGF0YToge30sXG4gICAgICBtb250aERhdGE6IHt9LFxuICAgICAgeWVhckRhdGE6IHt9LFxuICAgICAgc2VsZWN0b3JXVzogJycsXG4gICAgICBzZWxlY3Rvck1NOiAnJyxcbiAgICAgIHNlbGVjdG9yWVk6ICcnLFxuICAgICAgYWN0aXZlRmlsdGVyOiAnc3BlbnRSYXRlJ1xuICAgIH1cbiAgICB0aGlzLnZpZXdlZE1vcmUgPSB7fTtcbiAgICB0aGlzLnVzZXJJbmZvKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmdldEV4cGVuc2UoKTtcbiAgICB0aGlzLmdldEV4cGVuc2VTdW1tYXJ5KCk7XG4gICAgdGhpcy51cGRhdGVUb2dnbGVyQ29udGVudCgpO1xuICB9XG5cbiAgdXBkYXRlVG9nZ2xlckNvbnRlbnQoKSB7XG4gICAgY29uc3Qge2FjdGl2ZVRhYn0gPSB0aGlzLnN0YXRlO1xuICAgIGlmIChhY3RpdmVUYWIgPT09IFdFRUspIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlLndlZWtEYXRhO1xuICAgIH0gZWxzZSBpZiAoYWN0aXZlVGFiID09PSBNT05USCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhdGUubW9udGhEYXRhO1xuICAgIH0gZWxzZSBpZiAoYWN0aXZlVGFiID09PSBZRUFSKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGF0ZS55ZWFyRGF0YTtcbiAgICB9XG4gIH1cblxuICAvLyBUbyBnaXZlIHRoZSBwcm9wIGluIHRoZSBzdGF0ZSB0byBjaGVjayBhdmFpbGFiaWxpdHkgb2YgZGF0YVxuICBjdXJyZW50VGFiRGF0YSgpIHtcbiAgICBjb25zdCB7YWN0aXZlVGFifSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKGFjdGl2ZVRhYiA9PT0gV0VFSykge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhdGUud2Vla0RhdGE7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVUYWIgPT09IE1PTlRIKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGF0ZS5tb250aERhdGE7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVUYWIgPT09IFlFQVIpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlLnllYXJEYXRhO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRDdXJyZW50RGF0YVByb3AoKSB7XG4gICAgY29uc3Qge2FjdGl2ZVRhYn0gPSB0aGlzLnN0YXRlO1xuICAgIGlmIChhY3RpdmVUYWIgPT09IFdFRUspIHtcbiAgICAgIHJldHVybiAnd2Vla0RhdGEnO1xuICAgIH0gZWxzZSBpZiAoYWN0aXZlVGFiID09PSBNT05USCkge1xuICAgICAgcmV0dXJuICdtb250aERhdGEnO1xuICAgIH0gZWxzZSBpZiAoYWN0aXZlVGFiID09PSBZRUFSKSB7XG4gICAgICByZXR1cm4gJ3llYXJEYXRhJztcbiAgICB9XG4gIH1cblxuICBnZXRQYXJhbXModG9nZ2xlVmFsKSB7XG4gICAgY29uc3Qge2FjdGl2ZVRhYjogdGFiLCBhY3RpdmVGaWx0ZXJ9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQge2RkLCBtbSwgeXksIHd3fSA9IHRoaXMuY3VycmVudFRhYkRhdGEoKTtcblxuICAgIGNvbnN0IGN1cnJEYXRlID0gKHl5ICYmIHR5cGVvZihtbSkgIT09ICd1bmRlZmluZWQnICYmIGRkKSA/IG5ldyBEYXRlKHl5LCBtbSwgZGQpIDogbmV3IERhdGUoKTtcbiAgICBsZXQgbW9udGggPSBjdXJyRGF0ZS5nZXRNb250aCgpO1xuICAgIGxldCBkb3cgPSBjdXJyRGF0ZS5nZXREYXkoKTtcbiAgICBsZXQgZGF0ZSA9IGN1cnJEYXRlLmdldERhdGUoKTtcbiAgICBsZXQgeWVhciA9IGN1cnJEYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICBpZiAoIXd3KSB7XG4gICAgICBjb25zdCBmaXJzdERheW9mTW9udGggPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSkuZ2V0RGF5KCk7XG4gICAgICB3dyA9IE1hdGguY2VpbCgoZmlyc3REYXlvZk1vbnRoICsgY3VyckRhdGUuZ2V0RGF0ZSgpKSAvIDcpO1xuICAgIH1cbiAgICBcbiAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RvcldXICYmIHR5cGVvZih0aGlzLnN0YXRlLnNlbGVjdG9yTU0pICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLnN0YXRlLnNlbGVjdG9yWVkpIHtcbiAgICAgIHllYXIgPSBwYXJzZUludCh0aGlzLnN0YXRlLnNlbGVjdG9yWVkpO1xuICAgICAgbW9udGggPSBwYXJzZUludCh0aGlzLnN0YXRlLnNlbGVjdG9yTU0pO1xuICAgICAgd3cgPSBwYXJzZUludCh0aGlzLnN0YXRlLnNlbGVjdG9yV1cpO1xuICAgIH1cbiAgICBjb25zdCBwYXJhbXMgPSB7dGFiLCBtbTogbW9udGgsIGRvdywgd3csIHl5OnllYXIsIGRkOmRhdGUsIGFjdGl2ZUZpbHRlcn07XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIHVzZXJJbmZvKCkge1xuICAgIGdldFVzZXJJbmZvKCkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEudXNlckluZm8pIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVzZXJJbmZvOiByZXMuZGF0YS51c2VySW5mb30pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvU2lnbkluKCk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgdGhpcy5uYXZpZ2F0ZVRvU2lnbkluKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRFeHBlbnNlU3VtbWFyeShsb2FkTmV3U3VtbWFyeURhdGEsIHRvZ2dsZVZhbCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKHRvZ2dsZVZhbCk7XG4gICAgY29uc3QgYWN0aXZlVGFiRGF0YSA9IHRoaXMuZmluZEN1cnJlbnREYXRhUHJvcCgpO1xuXG4gICAgLy8gaWYgKE9iamVjdC5rZXlzKHRoaXMuc3RhdGVbYWN0aXZlVGFiRGF0YV0pLmxlbmd0aCA9PT0gMCB8fCBsb2FkTmV3U3VtbWFyeURhdGEpIHtcbiAgICAgIGdldF9leHBlbnNlX3N1bW1hcnkocGFyYW1zKS50aGVuKChyZXNwKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1thY3RpdmVUYWJEYXRhXSA6IHsuLi50aGlzLnN0YXRlW2FjdGl2ZVRhYkRhdGFdLCBwbG90RGF0YTogey4uLnJlc3AuZGF0YX19LCBnZXRFeHBlbnNlU3VtbWFyeVN1Y2Nlc3M6IHRydWV9KTtcbiAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBHZXQgRXhwZW5zZSBTdW1tYXJ5IERldGFpbHMnLCBlcnIpO1xuICAgICAgfSk7XG4gICAgLy8gfVxuICB9XG5cbiAgZ2V0RXhwZW5zZShsb2FkTmV3RXhwZW5zZURhdGEsIHRvZ2dsZVZhbCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKHRvZ2dsZVZhbCk7XG4gICAgY29uc3QgYWN0aXZlVGFiRGF0YSA9IHRoaXMuZmluZEN1cnJlbnREYXRhUHJvcCgpO1xuICAgIFxuICAgIC8vIGlmIChPYmplY3Qua2V5cyh0aGlzLnN0YXRlW2FjdGl2ZVRhYkRhdGFdKS5sZW5ndGggPT09IDAgfHwgbG9hZE5ld0V4cGVuc2VEYXRhKSB7XG4gICAgICBnZXRfZXhwZW5zZV9kYXRhKHBhcmFtcykudGhlbigocmVzcCkgPT4ge1xuICAgICAgICBjb25zdCB7ZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHN0YW5kaW5nLCBzcGVudCwgd3csIHl5LCBtbSwgZGR9ID0gcmVzcC5kYXRhO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtbYWN0aXZlVGFiRGF0YV0gOiB7Li4udGhpcy5zdGF0ZVthY3RpdmVUYWJEYXRhXSwgZXhwZW5zZUxpc3QsIGluY29tZUxpc3QsIHN0YW5kaW5nLCBzcGVudCwgd3csIHl5LCBtbSxkZH0sIHNlbGVjdG9yTU06bW0sIHNlbGVjdG9yV1c6IHd3LCBzZWxlY3RvcllZOiB5eSwgZ2V0RXhwZW5zZURhdGFTdWNjZXNzOiB0cnVlfSk7XG4gICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBHZXQgRXhwZW5zZSBEZXRhaWxzJywgZXJyKTtcbiAgICAgICB9KTtcbiAgICAvLyB9XG4gIH1cblxuICBjaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KGFjdGl2ZVRhYikge1xuICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZVRhYjogYWN0aXZlVGFiLCB2aWV3TW9yZTogZmFsc2V9LCAoKSA9PiB7XG4gICAgICB0aGlzLmdldEV4cGVuc2UoKTtcbiAgICAgIHRoaXMuZ2V0RXhwZW5zZVN1bW1hcnkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxlZnRNZW51Q2xpY2soKSB7XG4gICAgdGhpcy5yZWZzLmJhY2tEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2JhY2tEcm9wJyk7XG4gICAgdGhpcy5yZWZzLnBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ3JpZ2h0MCcpO1xuICAgIGlmICh0aGlzLnJlZnMub3RoZXJIYWxmTGFuZGluZ1R4dCkge1xuICAgICAgdGhpcy5yZWZzLmZpcnN0SGFsZkxhbmRpbmdUeHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2NhbGU5MCcpO1xuICAgICAgdGhpcy5yZWZzLm90aGVySGFsZkxhbmRpbmdUeHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2NhbGU5MCcpO1xuICAgIH1cbiAgICB0aGlzLnJlZnMuYWRkQnRuQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2RuJyk7XG4gICAgXG4gIH1cblxuICBuYXZpZ2F0ZVRvU2lnbkluKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnVzZXJJbmZvKSB7XG4gICAgICBsb2dvdXRVc2VyKCkudGhlbigoKSA9PiB7XG4gICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2xvZ2luJztcbiAgICAgIH0pO1xuICAgIH0gZWxzZSAge1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2xvZ2luJztcbiAgICB9XG4gIH1cblxuICByZW5kZXJMZWZ0TWVudUJhcigpIHtcbiAgICBjb25zdCB7dXNlckluZm99ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnVCYXJcIj5cbiAgICAgICAgPGRpdiByZWY9XCJwb3B1cFwiY2xhc3NOYW1lPVwicG9wdXAgemk5IFwiIG9uQ2xpY2s9e3RoaXMubGVmdE1lbnVDbGlja30+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlQmFyIGluLWJsIGZsXCI+XG4gICAgICAgICAgICA8UmlwcGxlIGtleT1cImxvZ291dFwiIGNsYXNzZXM9XCJtZW51LW9wdGlvblwiIG9uQ2xpY2tIYW5kbGVyPXt0aGlzLm5hdmlnYXRlVG9TaWduSW59PnsoIXVzZXJJbmZvID8gJ1NpZ24gSW4nIDogJ0xvZ291dCcpfTwvUmlwcGxlPlxuICAgICAgICAgICAgPFJpcHBsZSBrZXk9XCJhYm91dE1lXCIgY2xhc3Nlcz1cIm1lbnUtb3B0aW9uXCIgb25DbGlja0hhbmRsZXI9eygpID0+IHdpbmRvdy5vcGVuKFwiaHR0cHM6Ly9kaGlsaXBrbXIuZ2l0aHViLmlvL21hdGVyaWFsaXplZFJlc3VtZS9cIil9PkFib3V0IE1lPC9SaXBwbGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIG5ld0V4cGVuc2UodmFsLCBzYXZlU3VjY2VzcywgZWRpdEV4cGVuc2VWYWwpIHtcbiAgICBpZiAoc2F2ZVN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dOZXdFeHBlbnNlOiB2YWwsIGVkaXRFeHBlbnNlOiB0eXBlb2YoZWRpdEV4cGVuc2VWYWwpICE9PSAndW5kZWZpbmVkJyA/IGVkaXRFeHBlbnNlVmFsIDogdGhpcy5zdGF0ZS5lZGl0RXhwZW5zZSwgd2Vla0RhdGE6IHt9LCBtb250aERhdGE6IHt9LCB5ZWFyRGF0YToge319LCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0RXhwZW5zZShzYXZlU3VjY2Vzcyk7XG4gICAgICAgIHRoaXMuZ2V0RXhwZW5zZVN1bW1hcnkoc2F2ZVN1Y2Nlc3MpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dOZXdFeHBlbnNlOiB2YWwsIGVkaXRFeHBlbnNlOiBlZGl0RXhwZW5zZVZhbH0pO1xuICAgIH1cbiAgfVxuXG4gIGNhbmNlbFBvcHVwKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dQb3B1cDogZmFsc2UgfSk7XG4gIH1cblxuICBjb25maXJtUG9wdXAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2hvd1BvcHVwOiBmYWxzZX0pO1xuICAgIGRlbGV0ZUV4cGVuc2VEYXRlKHtpZDogdGhpcy5zdGF0ZS5kZWxldGVUcmFuc2FjdGlvbk9iai5pZH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcykge1xuICAgICAgICB0aGlzLmdldEV4cGVuc2UodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZ2V0RXhwZW5zZVN1bW1hcnkodHJ1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBlZGl0RXhwZW5zZShvYmopIHtcbiAgICB0aGlzLnNldFN0YXRlKHtlZGl0RXhwZW5zZTogdHJ1ZSwgZWRpdFRyYW5zYWN0aW9uT2JqOm9ian0pO1xuICB9XG5cbiAgZGVsZXRlRXhwZW5zZShvYmopIHtcbiAgICB0aGlzLnNldFN0YXRlKHtzaG93UG9wdXA6IHRydWUsIGRlbGV0ZVRyYW5zYWN0aW9uT2JqOm9ian0pO1xuICB9XG5cbiAgY2xpY2tWaWV3TW9yZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt2aWV3TW9yZTogIXRoaXMuc3RhdGUudmlld01vcmV9KTtcbiAgICB0aGlzLnJlZnMudHJhbnNhY3RlZENhcmQuc2Nyb2xsVG9wID0gMDtcbiAgfVxuXG4gIHJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKGhhc0xpc3REZWZpbmVkKSB7XG4gICAgaWYgKCFoYXNMaXN0RGVmaW5lZCkge1xuICAgICAgY29uc3QgbG9hZGVyID0gW107XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMjsgaSsrKXtcbiAgICAgICAgbG9hZGVyLnB1c2goXG4gICAgICAgICAgPGRpdiBrZXk9eyd0cmFuc2FjdGlvbl90eXBlXycgKyBpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhbnNhY3RlZENhcmRJbm5lclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRJbm5lcmhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRfcGVyY2VudCBwcm9ncmVzc0JhciBmbCBtMCBtdDEwXCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9ncmVzc0JhciBibCB0ZXh0Q2VudGVyIG10MzBcIiA+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRCcmRyQnRtXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbG9hZGVyO1xuICAgIH1cblxuICAgIGNvbnN0IHtleHBlbnNlTGlzdH0gPSB0aGlzLmN1cnJlbnRUYWJEYXRhKCk7XG4gICAgcmV0dXJuIChcbiAgICAgIGV4cGVuc2VMaXN0LnRyYW5zYWN0aW9uTGlzdC5tYXAoKHRyYW5zYWN0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS52aWV3TW9yZSB8fCB0aGlzLnZpZXdlZE1vcmVbdGhpcy5zdGF0ZS5hY3RpdmVUYWJdIHx8ICF0aGlzLnN0YXRlLnZpZXdNb3JlICYmIGluZGV4IDwgMikge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnZpZXdNb3JlKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdlZE1vcmVbdGhpcy5zdGF0ZS5hY3RpdmVUYWJdID0gdHJ1ZTsgLy8gVG8gbm90IHJlbW92ZSBlbGVtZW50IGZyb20gRE9NIG9uIGNsaWNraW5nIHZpZXcgTW9yZSBhZ2FpblxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBrZXk9eyd0cmFuc2FjdGlvbl90eXBlXycgKyBpbmRleH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhbnNhY3RlZENhcmRJbm5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZElubmVyaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXQgdzMzIGluLWJsIHRsXCI+e3RyYW5zYWN0aW9uLmNhdGVnb3J5fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXQgdzMzIGluLWJsIHRjXCI+e2Zvcm1hdERhdGUodHJhbnNhY3Rpb24uZGF0ZSl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhdCB3MzMgaW4tYmwgdHJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBvbkNsaWNrPXsoKSA9PiB0aGlzLmVkaXRFeHBlbnNlKHsuLi50cmFuc2FjdGlvbn0pfSBoZWlnaHQ9XCIxNXB4XCIgdmlld0JveD1cIjAgLTEgNDUwIDQwMFwiIHdpZHRoPVwiMTVweFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJtMzcwLjU4OTg0NCAyNTAuOTcyNjU2Yy01LjUyMzQzOCAwLTEwIDQuNDc2NTYzLTEwIDEwdjg4Ljc4OTA2M2MtLjAxOTUzMiAxNi41NjI1LTEzLjQzNzUgMjkuOTg0Mzc1LTMwIDMwaC0yODAuNTg5ODQ0Yy0xNi41NjI1LS4wMTU2MjUtMjkuOTgwNDY5LTEzLjQzNzUtMzAtMzB2LTI2MC41ODk4NDRjLjAxOTUzMS0xNi41NTg1OTQgMTMuNDM3NS0yOS45ODA0NjkgMzAtMzBoODguNzg5MDYyYzUuNTIzNDM4IDAgMTAtNC40NzY1NjMgMTAtMTAgMC01LjUxOTUzMS00LjQ3NjU2Mi0xMC0xMC0xMGgtODguNzg5MDYyYy0yNy42MDE1NjIuMDMxMjUtNDkuOTY4NzUgMjIuMzk4NDM3LTUwIDUwdjI2MC41OTM3NWMuMDMxMjUgMjcuNjAxNTYzIDIyLjM5ODQzOCA0OS45Njg3NSA1MCA1MGgyODAuNTg5ODQ0YzI3LjYwMTU2Mi0uMDMxMjUgNDkuOTY4NzUtMjIuMzk4NDM3IDUwLTUwdi04OC43OTI5NjljMC01LjUyMzQzNy00LjQ3NjU2My0xMC0xMC0xMHptMCAwXCIvPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJtMzc2LjYyODkwNiAxMy40NDE0MDZjLTE3LjU3NDIxOC0xNy41NzQyMTgtNDYuMDY2NDA2LTE3LjU3NDIxOC02My42NDA2MjUgMGwtMTc4LjQwNjI1IDE3OC40MDYyNWMtMS4yMjI2NTYgMS4yMjI2NTYtMi4xMDU0NjkgMi43MzgyODItMi41NjY0MDYgNC40MDIzNDRsLTIzLjQ2MDkzNyA4NC42OTkyMTljLS45NjQ4NDQgMy40NzI2NTYuMDE1NjI0IDcuMTkxNDA2IDIuNTYyNSA5Ljc0MjE4NyAyLjU1MDc4MSAyLjU0Njg3NSA2LjI2OTUzMSAzLjUyNzM0NCA5Ljc0MjE4NyAyLjU2NjQwNmw4NC42OTkyMTktMjMuNDY0ODQzYzEuNjY0MDYyLS40NjA5MzggMy4xNzk2ODctMS4zNDM3NSA0LjQwMjM0NC0yLjU2NjQwN2wxNzguNDAyMzQzLTE3OC40MTAxNTZjMTcuNTQ2ODc1LTE3LjU4NTkzNyAxNy41NDY4NzUtNDYuMDU0Njg3IDAtNjMuNjQwNjI1em0tMjIwLjI1NzgxMiAxODQuOTA2MjUgMTQ2LjAxMTcxOC0xNDYuMDE1NjI1IDQ3LjA4OTg0NCA0Ny4wODk4NDQtMTQ2LjAxNTYyNSAxNDYuMDE1NjI1em0tOS40MDYyNSAxOC44NzUgMzcuNjIxMDk0IDM3LjYyNS01Mi4wMzkwNjMgMTQuNDE3OTY5em0yMjcuMjU3ODEyLTE0Mi41NDY4NzUtMTAuNjA1NDY4IDEwLjYwNTQ2OS00Ny4wOTM3NS00Ny4wOTM3NSAxMC42MDkzNzQtMTAuNjA1NDY5YzkuNzYxNzE5LTkuNzYxNzE5IDI1LjU4OTg0NC05Ljc2MTcxOSAzNS4zNTE1NjMgMGwxMS43MzgyODEgMTEuNzM0Mzc1YzkuNzQ2MDk0IDkuNzczNDM4IDkuNzQ2MDk0IDI1LjU4OTg0NCAwIDM1LjM1OTM3NXptMCAwXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZ3Jlc3NCYXIgYmwgdGV4dENlbnRlciBtYXJnaW5UMjVcIiA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbGxlZFwiIHN0eWxlPSB7e21heFdpZHRoOiB0cmFuc2FjdGlvbi5wZXJjZW50ICsgJyUnfX0+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWRSMTUgcGFkTDEwIGNhdCB3MzMgaW4tYmwgdGxcIj57J+KCuScrdHJhbnNhY3Rpb24uYW1vdW50fVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhdCB3MzMgaW4tYmwgdGNcIj5cbiAgICAgICAgICAgICAgICAgICAge3RyYW5zYWN0aW9uLnBlcmNlbnQgKyAnICUnfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZFI3IGNhdCB3MzMgaW4tYmwgdHJcIj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8c3ZnIG9uQ2xpY2s9eygpID0+IHRoaXMuZGVsZXRlRXhwZW5zZSh7aWQ6IHRyYW5zYWN0aW9uLmlkfSl9IGZpbGw9XCIjYTIwNDA0XCIgaGVpZ2h0PVwiMTVweFwiIHZpZXdCb3g9XCItNDAgMCA0NTAgNDAwXCIgd2lkdGg9XCIxNXB4XCIgPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJtMjMyLjM5ODQzOCAxNTQuNzAzMTI1Yy01LjUyMzQzOCAwLTEwIDQuNDc2NTYzLTEwIDEwdjE4OWMwIDUuNTE5NTMxIDQuNDc2NTYyIDEwIDEwIDEwIDUuNTIzNDM3IDAgMTAtNC40ODA0NjkgMTAtMTB2LTE4OWMwLTUuNTIzNDM3LTQuNDc2NTYzLTEwLTEwLTEwem0wIDBcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIm0xMTQuMzk4NDM4IDE1NC43MDMxMjVjLTUuNTIzNDM4IDAtMTAgNC40NzY1NjMtMTAgMTB2MTg5YzAgNS41MTk1MzEgNC40NzY1NjIgMTAgMTAgMTAgNS41MjM0MzcgMCAxMC00LjQ4MDQ2OSAxMC0xMHYtMTg5YzAtNS41MjM0MzctNC40NzY1NjMtMTAtMTAtMTB6bTAgMFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwibTI4LjM5ODQzOCAxMjcuMTIxMDk0djI0Ni4zNzg5MDZjMCAxNC41NjI1IDUuMzM5ODQzIDI4LjIzODI4MSAxNC42Njc5NjggMzguMDUwNzgxIDkuMjg1MTU2IDkuODM5ODQ0IDIyLjIwNzAzMiAxNS40MjU3ODEgMzUuNzMwNDY5IDE1LjQ0OTIxOWgxODkuMjAzMTI1YzEzLjUyNzM0NC0uMDIzNDM4IDI2LjQ0OTIxOS01LjYwOTM3NSAzNS43MzA0NjktMTUuNDQ5MjE5IDkuMzI4MTI1LTkuODEyNSAxNC42Njc5NjktMjMuNDg4MjgxIDE0LjY2Nzk2OS0zOC4wNTA3ODF2LTI0Ni4zNzg5MDZjMTguNTQyOTY4LTQuOTIxODc1IDMwLjU1ODU5My0yMi44MzU5MzggMjguMDc4MTI0LTQxLjg2MzI4Mi0yLjQ4NDM3NC0xOS4wMjM0MzctMTguNjkxNDA2LTMzLjI1MzkwNi0zNy44Nzg5MDYtMzMuMjU3ODEyaC01MS4xOTkyMTh2LTEyLjVjLjA1ODU5My0xMC41MTE3MTktNC4wOTc2NTctMjAuNjA1NDY5LTExLjUzOTA2My0yOC4wMzEyNS03LjQ0MTQwNi03LjQyMTg3NS0xNy41NTA3ODEtMTEuNTU0Njg3NS0yOC4wNjI1LTExLjQ2ODc1aC04OC43OTY4NzVjLTEwLjUxMTcxOS0uMDg1OTM3NS0yMC42MjEwOTQgNC4wNDY4NzUtMjguMDYyNSAxMS40Njg3NS03LjQ0MTQwNiA3LjQyNTc4MS0xMS41OTc2NTYgMTcuNTE5NTMxLTExLjUzOTA2MiAyOC4wMzEyNXYxMi41aC01MS4xOTkyMTljLTE5LjE4NzUuMDAzOTA2LTM1LjM5NDUzMSAxNC4yMzQzNzUtMzcuODc4OTA3IDMzLjI1NzgxMi0yLjQ4MDQ2OCAxOS4wMjczNDQgOS41MzUxNTcgMzYuOTQxNDA3IDI4LjA3ODEyNiA0MS44NjMyODJ6bTIzOS42MDE1NjIgMjc5Ljg3ODkwNmgtMTg5LjIwMzEyNWMtMTcuMDk3NjU2IDAtMzAuMzk4NDM3LTE0LjY4NzUtMzAuMzk4NDM3LTMzLjV2LTI0NS41aDI1MHYyNDUuNWMwIDE4LjgxMjUtMTMuMzAwNzgyIDMzLjUtMzAuMzk4NDM4IDMzLjV6bS0xNTguNjAxNTYyLTM2Ny41Yy0uMDY2NDA3LTUuMjA3MDMxIDEuOTgwNDY4LTEwLjIxODc1IDUuNjc1NzgxLTEzLjg5NDUzMSAzLjY5MTQwNi0zLjY3NTc4MSA4LjcxNDg0My01LjY5NTMxMyAxMy45MjU3ODEtNS42MDU0NjloODguNzk2ODc1YzUuMjEwOTM3LS4wODk4NDQgMTAuMjM0Mzc1IDEuOTI5Njg4IDEzLjkyNTc4MSA1LjYwNTQ2OSAzLjY5NTMxMyAzLjY3MTg3NSA1Ljc0MjE4OCA4LjY4NzUgNS42NzU3ODIgMTMuODk0NTMxdjEyLjVoLTEyOHptLTcxLjE5OTIxOSAzMi41aDI3MC4zOTg0MzdjOS45NDE0MDYgMCAxOCA4LjA1ODU5NCAxOCAxOHMtOC4wNTg1OTQgMTgtMTggMThoLTI3MC4zOTg0MzdjLTkuOTQxNDA3IDAtMTgtOC4wNTg1OTQtMTgtMThzOC4wNTg1OTMtMTggMTgtMTh6bTAgMFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwibTE3My4zOTg0MzggMTU0LjcwMzEyNWMtNS41MjM0MzggMC0xMCA0LjQ3NjU2My0xMCAxMHYxODljMCA1LjUxOTUzMSA0LjQ3NjU2MiAxMCAxMCAxMCA1LjUyMzQzNyAwIDEwLTQuNDgwNDY5IDEwLTEwdi0xODljMC01LjUyMzQzNy00LjQ3NjU2My0xMC0xMC0xMHptMCAwXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkQnJkckJ0bVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgKTtcbiAgfVxuXG4gIGNoYW5nZUZpbHRlcih0eXBlKSB7XG4gICAgaWYgKHR5cGUgPT09ICdkYXRlJykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlRmlsdGVyOiAnZGF0ZSd9LCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0RXhwZW5zZSh0cnVlLCB0cnVlKTtcbiAgICAgICAgdGhpcy5nZXRFeHBlbnNlU3VtbWFyeSh0cnVlLCB0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3NwZW50UmF0ZScpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUZpbHRlcjogJ3NwZW50UmF0ZSd9LCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0RXhwZW5zZSh0cnVlLCB0cnVlKTtcbiAgICAgICAgdGhpcy5nZXRFeHBlbnNlU3VtbWFyeSh0cnVlLCB0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldFRyYW5zYWN0aW9uQ2FyZCgpIHtcbiAgICBjb25zdCBjdXJyZW50VGFiRGF0YSA9IHRoaXMuY3VycmVudFRhYkRhdGEoKTtcbiAgICBjb25zdCB7YWN0aXZlVGFiLCB2aWV3TW9yZSA9IGZhbHNlLCB1c2VySW5mbywgYWN0aXZlRmlsdGVyfSA9IHRoaXMuc3RhdGU7XG4gICAgLy8gY29uc3QgaGFzTm9EYXRhID0gY3VycmVudFRhYkRhdGEuZXhwZW5zZUxpc3QgJiYgT2JqZWN0LmtleXMoY3VycmVudFRhYkRhdGEuZXhwZW5zZUxpc3QpLmxlbmd0aCA9PT0gMDtcbiAgICBjb25zdCBoYXNMaXN0RGVmaW5lZCA9IGN1cnJlbnRUYWJEYXRhLmV4cGVuc2VMaXN0OyAvLyBUbyBkZXRlcm1pbmUgaWYgdGhlIGNhbGwgaXMgY29tcGxldGVkXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHsvKiA8ZGl2PlxuICAgICAgICAgICAgPHNwYW4+RGF0ZTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPlBlcmNlbnRhZ2U8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+ICovfVxuICAgICAgICAgIDxkaXYgcmVmPVwidHJhbnNhY3RlZENhcmRcIiBjbGFzc05hbWU9eyd0cmFuc2FjdGVkQ2FyZCB0cmFuc2l0aW9uMWEgJyArICh2aWV3TW9yZSA/ICdzaG93QWxsVHJhbnNhY3Rpb24nIDogJycpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dENlbnRlciBtdDVcIj5cbiAgICAgICAgICAgICAgPFJpcHBsZSBjbGFzc2VzPXsnaW4tYmwgc29ydFR5cGUgc29ydFR5cGVMZWZ0IGZzMTQgJyArIChhY3RpdmVGaWx0ZXIgPT09ICdzcGVudFJhdGUnID8gJyBsZWZ0QWN0aXZlUmlnaHQgJyA6ICcnKX0gb25DbGlja0hhbmRsZXI9eygpID0+IHRoaXMuY2hhbmdlRmlsdGVyKCdzcGVudFJhdGUnKX0gPlNwZW50IFJhdGUgPC9SaXBwbGU+XG4gICAgICAgICAgICAgIDxSaXBwbGUgY2xhc3Nlcz17J2luLWJsIHNvcnRUeXBlIHNvcnRUeXBlUmlnaHQgZnMxNCAnICsgKGFjdGl2ZUZpbHRlciA9PT0gJ3NwZW50UmF0ZScgPyAnIGxlZnRBY3RpdmVMZWZ0ICcgOiAncmlnaHRBY3RpdmVSaWdodCcpfSBvbkNsaWNrSGFuZGxlcj17KCkgPT4gdGhpcy5jaGFuZ2VGaWx0ZXIoJ2RhdGUnKX0gPiBEYXRlIDwvUmlwcGxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYW5zYWN0U2Nyb2xsZXJcIj5cbiAgICAgICAgICAgICAge3R5cGVvZihoYXNMaXN0RGVmaW5lZCkgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5rZXlzKGhhc0xpc3REZWZpbmVkKS5sZW5ndGggPT09IDA/XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIHBhZFQyMCBtaDEwcFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0dSBcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLm5ld0V4cGVuc2UodHJ1ZSl9PkFkZCBUcmFuc2FjdGlvbiA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHshdXNlckluZm8gJiYgPGRpdiBjbGFzc05hbWU9XCJwYWRUMTAgcGFkQjIwXCI+PGEgaHJlZj1cIi9sb2dpblwiPjxzcGFuPlNpZ24gSW48L3NwYW4+PC9hPiBmb3IgUGFzdCBUcmFuc2FjdGlvbnM8L2Rpdj59XG4gICAgICAgICAgICAgICAgPC9kaXY+OlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gV0VFSyA/IHRoaXMucmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQoaGFzTGlzdERlZmluZWQpIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IE1PTlRIID8gdGhpcy5yZW5kZXJJbm5lclRyYW5zYWN0aW9uY2FyZChoYXNMaXN0RGVmaW5lZCkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gWUVBUiA/IHRoaXMucmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQoaGFzTGlzdERlZmluZWQpIDogbnVsbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj4gXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8UmlwcGxlIGNsYXNzZXM9XCJ2aWV3TW9yZUFycm93XCIgb25DbGlja0hhbmRsZXI9eygpID0+IHRoaXMuY2xpY2tWaWV3TW9yZSgpfT5cbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPXt2aWV3TW9yZSA/ICdyb3RhdGVWaWV3TW9yZScgOiAnJ30gcmVmPVwic3ZnVmlld01vcmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTcuNDEgNy44NEwxMiAxMi40Mmw0LjU5LTQuNThMMTggOS4yNWwtNiA2LTYtNnpcIi8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8L1JpcHBsZT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc1JlbFwiPlxuICAgICAgICAgICAgPGRpdiByZWY9XCJhZGRCdG5Db250YWluZXJcIiBjbGFzc05hbWU9eydhZGRCdG5Db250YWluZXIgJ30+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiXCI+XG4gICAgICAgICAgICAgIDxSaXBwbGUgY2xhc3Nlcz1cImluLWJsIGFkZEJ0biB0aGVtZUJnXCIgb25DbGlja0hhbmRsZXI9eygpID0+IHRoaXMubmV3RXhwZW5zZSh0cnVlKX0gPiArIDwvUmlwcGxlPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gIH1cbiAgZ2V0Q3VycmVudERhdGUoKSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgY3Vyck1vbnRoID0gTU9OVEhTTkFNRVtkYXRlLmdldE1vbnRoKCldO1xuICAgIGNvbnN0IGN1cnJEYXRlID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgcmV0dXJuIGN1cnJEYXRlICsgJyAnICsgY3Vyck1vbnRoICsgJyAnICsgZGF0ZS5nZXRGdWxsWWVhcigpO1xuICB9XG4gIGdldFRvZ2dsZXJIZWFkZXIoKSB7XG4gICAgY29uc3Qge2FjdGl2ZVRhYn0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHttbSwgeXkgLCB3d30gPSB0aGlzLmN1cnJlbnRUYWJEYXRhKCk7XG4gICAgbGV0IHRvZ2dsZXJIZWFkZXIgPSAnJztcbiAgICBsZXQgaXNQcmV2RGlzYWJsZWQgPSBmYWxzZTtcbiAgICBsZXQgaXNOZXh0RGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIGlmIChhY3RpdmVUYWIgPT09IE1PTlRIKSB7XG4gICAgICB0b2dnbGVySGVhZGVyID0gIHR5cGVvZihtbSkgIT09ICd1bmRlZmluZWQnID8gTU9OVEhTTkFNRVttbV0gOiAnLS0tLSc7XG4gICAgICBpc1ByZXZEaXNhYmxlZCA9IG1tID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgaXNOZXh0RGlzYWJsZWQgPSBtbSA9PT0gMTEgPyB0cnVlIDogZmFsc2U7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVUYWIgPT09IFdFRUspIHtcbiAgICAgIHRvZ2dsZXJIZWFkZXIgPSAgd3cgPyAoJ1dlZWsgJyArICB3dykgOiAnLS0tLSc7XG4gICAgICBpc1ByZXZEaXNhYmxlZCA9IHd3ID09PSAxID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgaXNOZXh0RGlzYWJsZWQgPSB3dyA9PT0gNSA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9nZ2xlckhlYWRlciA9IHl5ID8geXkgOiAnLS0tLSc7XG4gICAgICBpc05leHREaXNhYmxlZCA9IHl5ID09PSAyMDE4ID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB7dG9nZ2xlckhlYWRlciwgaXNQcmV2RGlzYWJsZWQsIGlzTmV4dERpc2FibGVkfVxuICB9XG5cbiAgdG9nZ2xlVHlwZSh0eXBlLCB2YWwpIHtcbiAgICBsZXQgb2JqVG9DaGFuZ2UgPSB7fTtcbiAgICBpZiAodHlwZSA9PT0gV0VFSykge1xuICAgICAgb2JqVG9DaGFuZ2UgPSB7c2VsZWN0b3JXVzogdmFsfTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IE1PTlRIKSB7XG4gICAgICBvYmpUb0NoYW5nZSA9IHtzZWxlY3Rvck1NOiB2YWx9O1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gWUVBUikge1xuICAgICAgb2JqVG9DaGFuZ2UgPSB7c2VsZWN0b3JZWTogdmFsfTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7Li4ub2JqVG9DaGFuZ2V9LCAoKSA9PiB7XG4gICAgICB0aGlzLmdldEV4cGVuc2UodHJ1ZSwgdHJ1ZSk7XG4gICAgICB0aGlzLmdldEV4cGVuc2VTdW1tYXJ5KHRydWUsIHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHthY3RpdmVUYWIsIHNob3dOZXdFeHBlbnNlLCB2aWV3TW9yZSA9IGZhbHNlLCBlZGl0RXhwZW5zZSwgZWRpdFRyYW5zYWN0aW9uT2JqLCBnZXRFeHBlbnNlU3VtbWFyeVN1Y2Nlc3MsIGdldEV4cGVuc2VEYXRhU3VjY2Vzc30gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtzdGFuZGluZyA9IHVuZGVmaW5lZCwgc3BlbnQgPSB1bmRlZmluZWQsIHBsb3REYXRhID0gdW5kZWZpbmVkLCBpbmNvbWVMaXN0ID0gdW5kZWZpbmVkfSA9IHRoaXMuY3VycmVudFRhYkRhdGEoKTtcbiAgICBjb25zdCB7dG9nZ2xlckhlYWRlciwgaXNQcmV2RGlzYWJsZWQsIGlzTmV4dERpc2FibGVkfSA9IHRoaXMuZ2V0VG9nZ2xlckhlYWRlcigpO1xuICAgIGlmICghZ2V0RXhwZW5zZVN1bW1hcnlTdWNjZXNzIHx8ICFnZXRFeHBlbnNlRGF0YVN1Y2Nlc3MpIHtcbiAgICAgIHNldExvYWRlcih0cnVlKTtcbiAgICAgIHJldHVybiAoXG4gICAgICA8UGFnZUxvYWRlci8+XG4gICAgICApO1xuICAgIH1cbiAgICBzZXRMb2FkZXIoZmFsc2UpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuICAgICAgICA8UHJvbXB0IHdoZW49eyFzaG93TmV3RXhwZW5zZX0gbWVzc2FnZT17KCkgPT4gXCJHb2luZyBiYWNrIHdpbGwgTG9nIHlvdSBvdXQuXCJ9PjwvUHJvbXB0PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgcmVmPVwiYmFja0Ryb3BcIiBjbGFzc05hbWU9eyd0cmFuc2l0aW9uMWEgemk5ICcgKyAoKHNob3dOZXdFeHBlbnNlIHx8IGVkaXRFeHBlbnNlKSA/ICdiYWNrRHJvcCcgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHRoaXMubmV3RXhwZW5zZShmYWxzZSl9PjwvZGl2PlxuICAgICAgICAgIHt0aGlzLnJlbmRlckxlZnRNZW51QmFyKCl9XG4gICAgICAgICAgPGRpdiByZWY9XCJtYWluQ29udGVudFwiIGNsYXNzTmFtZT1cIm1haW5Db250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuICAgICAgICAgICAgICA8ZGl2IHJlZj1cImZpcnN0SGFsZkxhbmRpbmdUeHRcIiBjbGFzc05hbWU9XCJ0cmFuc2l0aW9uMF81IGZpcnN0LWhhbGYtbGFuZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhbmRpbmdcIj5cbiAgICAgICAgICAgICAgICAgIDxSaXBwbGUgY2xhc3Nlcz1cImxlZnQtbWVudS1jb250YWluZXJcIiBvbkNsaWNrSGFuZGxlcj17dGhpcy5sZWZ0TWVudUNsaWNrfT5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJsZWZ0LW1lbnVcIiBzcmM9XCIvaW1nL21lbnUuc3ZnXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgey8qIDxzcGFuIGNsYXNzTmFtZT1cImxlZnQtbWVudS1jb250YWluZXJcIiBvbkNsaWNrPXt0aGlzLmxlZnRNZW51Q2xpY2t9Pjwvc3Bhbj4gKi99XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZiIGYxMVwiPkNVUlJFTlQgQkFMQU5DRTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZjE4XCI+4oK5IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RhbmRpbmdBbXRcIj57KHR5cGVvZihzdGFuZGluZykgIT09ICd1bmRlZmluZWQnID8gc3RhbmRpbmcgOiAnMCcpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PHNwYW4gY2xhc3NOYW1lPVwiZjExXCI+e3RoaXMuZ2V0Q3VycmVudERhdGUoKX08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2VEYXlzQnRuIHc4NSBtMTBhXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluLWJsIHczM1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3Qga2V5PVwid2Vla1NlbGVjdFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy50b2dnbGVUeXBlKFdFRUssIGUudGFyZ2V0LnZhbHVlKX0gaWQ9XCJ3ZWVrU2VsZWN0b3IgZGIgd2hpdGVcIiB2YWx1ZT17dGhpcy5zdGF0ZS5zZWxlY3RvcldXfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZW5kZXJPcHRpb25zKCd3ZWVrJyl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgPFJpcHBsZSBvbkNsaWNrSGFuZGxlcj17KCkgPT4gdGhpcy5jaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KFdFRUspfSAgY2xhc3Nlcz17J3BhZEI1IGJyMTAgZGIgd2hpdGUgcGFkVDEwIG10NSAnICsgKGFjdGl2ZVRhYiA9PT0gV0VFSyA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9PldlZWs8L1JpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogPGxhYmVsIG9uQ2xpY2s9eygpID0+IHRoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdChXRUVLKX0gIGNsYXNzTmFtZT17J2RiIHdoaXRlIHBhZFQxMCAnICsgKGFjdGl2ZVRhYiA9PT0gV0VFSyA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IGh0bWxGb3I9XCJ3ZWVrU2VsZWN0b3JcIj5XZWVrPC9sYWJlbD4gKi99XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyd0eXBlQnJkckJ0bSAnICsgKGFjdGl2ZVRhYiA9PT0gV0VFSyA/ICd3NjAnOiAnJyl9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbi1ibCB3MzNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBrZXk9XCJtb250aFNlbGVjdFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy50b2dnbGVUeXBlKE1PTlRILCBlLnRhcmdldC52YWx1ZSl9IGlkPVwibW9udGhTZWxlY3RvciBkYiB3aGl0ZVwiIHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdG9yTU19PlxuICAgICAgICAgICAgICAgICAgICAgIHtyZW5kZXJPcHRpb25zKCdtb250aCcpfVxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPFJpcHBsZSBvbkNsaWNrSGFuZGxlcj17KCkgPT4gdGhpcy5jaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KE1PTlRIKX0gIGNsYXNzZXM9eydwYWRCNSBicjEwIGRiIHdoaXRlIHBhZFQxMCBtdDUgJyArIChhY3RpdmVUYWIgPT09IE1PTlRIID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0+TW9udGg8L1JpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgey8qIDxsYWJlbCBvbkNsaWNrPXsoKSA9PiB0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoTU9OVEgpfSAgY2xhc3NOYW1lPXsnZGIgd2hpdGUgcGFkVDEwICcgKyAoYWN0aXZlVGFiID09PSBNT05USCA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IGh0bWxGb3I9XCJtb250aFNlbGVjdG9yXCI+TW9udGg8L2xhYmVsPiAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyd0eXBlQnJkckJ0bSAnICsgKGFjdGl2ZVRhYiA9PT0gTU9OVEggPyAndzYwJzogJycpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbi1ibCB3MzNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBrZXk9XCJ5ZWFyU2VsZWN0XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnRvZ2dsZVR5cGUoWUVBUiwgZS50YXJnZXQudmFsdWUpfSBpZD1cInllYXJTZWxlY3RvciBkYiB3aGl0ZVwiIHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdG9yWVl9PlxuICAgICAgICAgICAgICAgICAgICB7cmVuZGVyT3B0aW9ucygneWVhcicpfVxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPFJpcHBsZSBvbkNsaWNrSGFuZGxlcj17KCkgPT4gdGhpcy5jaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KFlFQVIpfSAgY2xhc3Nlcz17J3BhZEI1IGJyMTAgZGIgd2hpdGUgcGFkVDEwIG10NSAnICsgKGFjdGl2ZVRhYiA9PT0gWUVBUiA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9PlllYXI8L1JpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgey8qIDxsYWJlbCBvbkNsaWNrPXsoKSA9PiB0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoWUVBUil9IGNsYXNzTmFtZT17J2RiIHdoaXRlIHBhZFQxMCAnICsgKGFjdGl2ZVRhYiA9PT0gWUVBUiA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IGh0bWxGb3I9XCJ5ZWFyU2VsZWN0b3JcIj5ZZWFyPC9sYWJlbD4gKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsndHlwZUJyZHJCdG0gJyArIChhY3RpdmVUYWIgPT09IFlFQVIgPyAndzYwJzogJycpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BlbnRJbmNvbWVTZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluLWJsIFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsIGluLWJsIHNwZW50SWNvblwiID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnICB3aWR0aD1cIjIxXCIgaGVpZ2h0PVwiMTdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0yNCAxMmMwLTYuNjI3LTUuMzczLTEyLTEyLTEycy0xMiA1LjM3My0xMiAxMiA1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMnptLTE3IDFoNHYtOGgydjhoNGwtNSA2LTUtNnpcIi8+PC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YkhlYWRpbmcgaW4tYmxcIj57J1NwZW50IDog4oK5JyArICh0eXBlb2Yoc3BlbnQpICE9PSAndW5kZWZpbmVkJz8gc3BlbnQ6ICcwJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbi1ibCAgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmwgaW4tYmwgaW5jb21lSWNvbiBcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJmbCBpbi1ibFwiIHdpZHRoPVwiMjFcIiBoZWlnaHQ9XCIxN1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTAgMTJjMCA2LjYyNyA1LjM3MyAxMiAxMiAxMnMxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMi0xMiA1LjM3My0xMiAxMnptMTctMWgtNHY4aC0ydi04aC00bDUtNiA1IDZ6XCIvPjwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJIZWFkaW5nIGluLWJsXCI+eydJbmNvbWUgOiDigrknICsgKGluY29tZUxpc3QgJiYgdHlwZW9mKGluY29tZUxpc3QuYW1vdW50KSAhPT0gJ3VuZGVmaW5lZCcgPyBpbmNvbWVMaXN0LmFtb3VudCA6ICcwJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRUcmFuc2FjdGlvbkNhcmQoKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtwbG90RGF0YSAmJiBwbG90RGF0YS5wZXJEaXZpc2lvbkRhdGEgJiYgIHBsb3REYXRhLnBlckRpdmlzaW9uRGF0YS5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdGhlci1oYWxmLWxhbmRpbmcgbXQxMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPVwib3RoZXJIYWxmTGFuZGluZ1R4dFwiIGNsYXNzTmFtZT1cInRyYW5zaXRpb24wXzUgXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXIgdHJTdW1hcnlIZWFkaW5nIGZiXCIgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57J0V4cGVuc2UgVHJlbmRzJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09IFdFRUsgPyAgPEdyYXBoIHBsb3REYXRhPXtwbG90RGF0YX0gdGFiPXthY3RpdmVUYWJ9Lz4gOiBudWxsfVxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gTU9OVEggPyAgPEdyYXBoIHBsb3REYXRhPXtwbG90RGF0YX0gdGFiPXthY3RpdmVUYWJ9Lz4gOiBudWxsfVxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gWUVBUiA/ICA8R3JhcGggcGxvdERhdGE9e3Bsb3REYXRhfSB0YWI9e2FjdGl2ZVRhYn0vPiA6IG51bGx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7c2hvd05ld0V4cGVuc2UgPyBcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgIDxOZXdFeHBlbnNlIG5ld0V4cGVuc2U9e3RoaXMubmV3RXhwZW5zZX0vPlxuICAgICAgICAgIDwvZGl2PiA6IG51bGx9XG4gICAgICAgIHtlZGl0RXhwZW5zZSA/XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxOZXdFeHBlbnNlIG5ld0V4cGVuc2U9e3RoaXMubmV3RXhwZW5zZX0gZWRpdFRyYW5zYWN0aW9uT2JqPXtlZGl0VHJhbnNhY3Rpb25PYmp9Lz5cbiAgICAgICAgICA8L2Rpdj4gOiBudWxsfVxuICAgICAgICB7dGhpcy5zdGF0ZS5zaG93UG9wdXAgJiYgPFBvcHVwIGNhbmNlbENhbGxiYWNrPXt0aGlzLmNhbmNlbFBvcHVwfSBjb25maXJtQ2FsbGJhY2s9e3RoaXMuY29uZmlybVBvcHVwfS8+fVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQge3NpZ251cCwgc2lnbmluLCBsb2dvdXRVc2VyfSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5pbXBvcnQgeyBSaXBwbGUsIHNldExvYWRlcn0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuXG5jbGFzcyBMb2dpbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGVhZCA9IHRoaXMuaGVhZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2lnblVwID0gdGhpcy5zaWduVXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNpZ25JbiA9IHRoaXMuc2lnbkluLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaWdub3V0VXNlciA9IHRoaXMuc2lnbm91dFVzZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgc2lnbmluVGV4dDogJ1NpZ24gSW4nLFxuICAgICAgc2lnbnVwVGV4dDogJ1NpZ24gVXAnLFxuICAgICAgY29udGludWVUZXh0OiAnQ29udGludWUgd2l0aCBUZXN0IExvZ2luJyxcbiAgICAgIGxvYWQ6ICF3aW5kb3cuc2lnbmVkSW5cbiAgICB9XG4gICAgaWYgKHdpbmRvdy5zaWduZWRJbikge1xuICAgICAgdGhpcy5zaWdub3V0VXNlcigpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHNldExvYWRlcihmYWxzZSk7XG4gIH1cblxuICBzaWdub3V0VXNlcigpIHtcbiAgICBsb2dvdXRVc2VyKCkudGhlbigocmVzcCkgPT4ge1xuICAgICAgaWYgKCEocmVzcC5kYXRhLmVycm9yKSkge1xuICAgICAgICB3aW5kb3cuc2lnbmVkSW4gPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2coJ1NpZ25pbmcgb3V0IHN1Y2Nlc3MnKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygndW5hYmxlIHRvIHNpZ25vdXQgdXNlcicpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCd1bmFibGUgdG8gc2lnbm91dCB1c2VyJyk7XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSlcbiAgfVxuXG4gIGhlYWQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxIZWxtZXQ+XG4gICAgICAgIDx0aXRsZT5FeHBlbnNlIExvZ2luPC90aXRsZT5cbiAgICAgIDwvSGVsbWV0PlxuICAgICk7XG4gIH1cblxuICBzdWNjZXNzZnVsKHJlc3ApIHtcbiAgICBpZiAocmVzcC5kYXRhICYmICFyZXNwLmRhdGEuZXJyb3IpIHtcbiAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKCcvaG9tZScsIHt9KTtcbiAgICAgIGlmICh0eXBlb2Yod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93LnNpZ25lZEluID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Li4ucmVzcC5kYXRhfSk7XG4gICAgfVxuICAgIGlmIChyZXNwLmRhdGEgJiYgcmVzcC5kYXRhLmVycm9yKSB7XG4gICAgICB0aGlzLnJlc2V0QnV0dG9uVGV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIGlzVmFsaWQoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUudXNlcm5hbWUubGVuZ3RoIDwgNSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHRydWUsIG1zZzogJ1VzZXJuYW1lIG11c3QgYmUgZ3JlYXRlciB0aGFuIDQgQ2hhcmFjdGVycyd9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3RhdGUucGFzc3dvcmQubGVuZ3RoIDwgOCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHRydWUsIG1zZzogJ1Bhc3N3b3JkIG11c3QgYmUgZ3JlYXRlciB0aGFuIDcgQ2hhcmFjdGVycyd9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXNldEJ1dHRvblRleHQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaWduaW5UZXh0OiAnU2lnbiBJbicsXG4gICAgICBzaWdudXBUZXh0OiAnU2lnbiBVcCcsXG4gICAgICBjb250aW51ZVRleHQ6ICdDb250aW51ZSB3aXRoIFRlc3QgTG9naW4nXG4gICAgfSk7XG4gIH1cblxuICBzaWduVXAoKSB7XG4gICAgaWYgKHRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtzaWdudXBUZXh0OiAnU2lnbmluZyB1cC4uLid9KTtcbiAgICAgIHNpZ251cCh7dXNlcm5hbWU6IHRoaXMuc3RhdGUudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSlcbiAgICAgIC50aGVuKChyZXNwKSA9PiB7XG4gICAgICAgIHRoaXMuc3VjY2Vzc2Z1bChyZXNwKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICB0aGlzLnJlc2V0QnV0dG9uVGV4dCgpO1xuICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIFNpZ251cCcpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2lnbkluKHdpdGhUZXN0Q3JlZHMpIHtcbiAgICBsZXQge3VzZXJuYW1lLCBwYXNzd29yZH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmICh3aXRoVGVzdENyZWRzKSB7XG4gICAgICB1c2VybmFtZSA9ICdkaGlsaXAnO1xuICAgICAgcGFzc3dvcmQgPSAnZGhpbGlwZGhpbGlwJztcbiAgICB9XG4gICAgaWYgKHdpdGhUZXN0Q3JlZHMgfHwgdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgIC8vIGlmICh3aXRoVGVzdENyZWRzKSB7XG4gICAgICAvLyAgIHRoaXMuc2V0U3RhdGUoe2NvbnRpbnVlVGV4dDogJ0NvbnRpbnVpbmcgd2l0aCBUZXN0IExvZ2luLi4uJ30pO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgdGhpcy5zZXRTdGF0ZSh7c2lnbmluVGV4dDogJ1NpZ25pbmcgaW4uLi4nfSk7XG4gICAgICAvLyB9XG4gICAgICBzaWduaW4oe3VzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkfSkudGhlbigocmVzcCkgPT4ge1xuICAgICAgICB0aGlzLnN1Y2Nlc3NmdWwocmVzcCk7XG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIHRoaXMucmVzZXRCdXR0b25UZXh0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gU2lnbkluJywgZXJyKTtcbiAgICAgIH0pOyBcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3NpZ25pblRleHQsIHNpZ251cFRleHQsIGNvbnRpbnVlVGV4dH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5oZWFkKCl9XG4gICAgICAgIHt0aGlzLnN0YXRlLmxvYWQgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZHNEaXYgcGFkQjEwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlcm5hbWVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwibG9naW5JbnB1dCBcIiBpZD1cImxvZ2luVXNlcm5hbWVcIiBwbGFjZWhvbGRlcj0nVXNlcm5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLnVzZXJuYW1lfSBvbkNoYW5nZSA9IHsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7dXNlcm5hbWU6IGUudGFyZ2V0LnZhbHVlfSl9IHR5cGU9XCJ0ZXh0XCIvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXNzd29yZCBwYWRUMTBcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwibG9naW5JbnB1dCBcIiBpZD1cImxvZ2luUHdkXCIgcGxhY2Vob2xkZXI9J1Bhc3N3b3JkJyB2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZH0gb25DaGFuZ2UgPSB7KGUpID0+IHRoaXMuc2V0U3RhdGUoe3Bhc3N3b3JkOiBlLnRhcmdldC52YWx1ZX0pfSB0eXBlPVwicGFzc3dvcmRcIi8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvciAmJiA8ZGl2IGlkPVwiZXJyb3JEaXZcIiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIHJlZCBcIj57dGhpcy5zdGF0ZS5tc2d9PC9kaXY+fVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyIFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ldyBkaVwiPlxuICAgICAgICAgICAgICAgIDxSaXBwbGUgY2xhc3Nlcz1cImluLWJsIG5ld0J0biBsb2dpbkJ0bnMgdGhlbWVCZ1wiIG9uQ2xpY2tIYW5kbGVyPXsoKSA9PiB0aGlzLnNpZ25JbihmYWxzZSl9PjxzcGFuIGNsYXNzTmFtZT1cInBhZExSNVwiPntzaWduaW5UZXh0fTwvc3Bhbj48L1JpcHBsZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3IGRpXCI+XG4gICAgICAgICAgICAgICAgPFJpcHBsZSBjbGFzc2VzPVwiaW4tYmwgbmV3QnRuIGxvZ2luQnRucyB0aGVtZUJnXCIgb25DbGlja0hhbmRsZXI9e3RoaXMuc2lnblVwfT48c3BhbiBjbGFzc05hbWU9XCJwYWRMUjVcIj57c2lnbnVwVGV4dH08L3NwYW4+PC9SaXBwbGU+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXIgXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3XCI+XG4gICAgICAgICAgICAgICAgPFJpcHBsZSBjbGFzc2VzPVwiaW4tYmwgbmV3QnRuIGxvZ2luQnRucyB0ZXN0TG9naW4gdGhlbWVCZ1wiIG9uQ2xpY2tIYW5kbGVyPXsoKSA9PiB0aGlzLnNpZ25Jbih0cnVlKX0+PHNwYW4gY2xhc3NOYW1lPVwicGFkTFI1XCI+e2NvbnRpbnVlVGV4dH08L3NwYW4+PC9SaXBwbGU+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+fVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTG9naW47IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge25ld19leHBlbnNlLCBlZGl0X2V4cGVuc2UsIGdldEZyZXF1ZW50Q2F0ZWdvcmllc30gZnJvbSAnLi4vYXBpQ2FsbHMvQXBpQ2FsbHMnO1xuaW1wb3J0IHtNT05USFNOQU1FU0hPUlQsIFRPREFZLCBZRVNURVJEQVl9IGZyb20gJy4uL2NvbnN0YW50cy9jb25zdGFudHMnO1xuaW1wb3J0IHtyZW5kZXJPcHRpb25zLCBSaXBwbGV9IGZyb20gJy4uL3V0aWxzL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3RXhwZW5zZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc2VsZWN0VHlwZSA9IHRoaXMuc2VsZWN0VHlwZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3VibWl0TmV3RXhwZW5zZSA9IHRoaXMuc3VibWl0TmV3RXhwZW5zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMucmVuZGVySW5uZXJUcmFuc2FjdGlvbmNhcmQgPSB0aGlzLnJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVGcmVxdWVudENhdGVnb3JpZXNUYXAgPSB0aGlzLmhhbmRsZUZyZXF1ZW50Q2F0ZWdvcmllc1RhcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CYWNrUHJlc3MgPSB0aGlzLm9uQmFja1ByZXNzLmJpbmQodGhpcyk7XG4gICAgbGV0ICBhbW91bnQgPSAnJztcbiAgICBsZXQgIGNhdGVnb3J5ID0gJyc7XG4gICAgbGV0ICBkYXkgPSAnJztcbiAgICBsZXQgIG1vbnRoID0gJyc7XG4gICAgbGV0ICB5ZWFyID0gJyc7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gJyc7XG4gICAgaWYgKHByb3BzLmVkaXRUcmFuc2FjdGlvbk9iaikge1xuICAgICAgYW1vdW50ID0gcHJvcHMuZWRpdFRyYW5zYWN0aW9uT2JqLmFtb3VudDtcbiAgICAgIGNhdGVnb3J5ID0gcHJvcHMuZWRpdFRyYW5zYWN0aW9uT2JqLmNhdGVnb3J5O1xuICAgICAgZGVzY3JpcHRpb24gPSBwcm9wcy5lZGl0VHJhbnNhY3Rpb25PYmouZGVzY3JpcHRpb247XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHByb3BzLmVkaXRUcmFuc2FjdGlvbk9iai5kYXRlKVxuICAgICAgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHR5cGU6ICdleHBlbnNlJyxcbiAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgZGF5OiBkYXksIFxuICAgICAgbW9udGg6IG1vbnRoLFxuICAgICAgeWVhcjogeWVhcixcbiAgICAgIGVycm9yOiB7fSxcbiAgICAgIGZyZXF1ZW50Q2F0ZWdvcmllczogW11cbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBnZXRGcmVxdWVudENhdGVnb3JpZXMoKS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YSAmJiAhcmVzLmRhdGEuZXJyKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZyZXF1ZW50Q2F0ZWdvcmllczogcmVzLmRhdGEuZGF0YS5zbGljZSgwLDUpfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGdldCBGcmVxdWVudCBDYXRlZ29yaWVzJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaGlzdG9yeS5wdXNoU3RhdGUoJ01PREFMJywgJy9uZXdfZXhwZW5zZScpO1xuICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gdGhpcy5vbkJhY2tQcmVzcztcbiAgfVxuXG4gIG9uQmFja1ByZXNzKGJhY2tPYmopIHtcbiAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG51bGw7XG4gICAgdGhpcy5wcm9wcy5uZXdFeHBlbnNlKGZhbHNlKTtcbiAgfVxuXG4gIHJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGtleT1cImNhdGVnb3J5TG9hZGVyXCIgY2xhc3NOYW1lPVwidHJhbnNhY3RlZENhcmRJbm5lciBtaDYyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkSW5uZXJoZWFkaW5nIGRmbGV4IGRmY2VudGVyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRfcGVyY2VudCBwcm9ncmVzc0JhciBmbCBtMCBtdDEwXCI+PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZ3Jlc3NCYXIgYmwgdGV4dENlbnRlciBcIiA+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHNlbGVjdFR5cGUodHlwZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3R5cGU6IHR5cGV9KTtcbiAgfVxuXG4gIGNoYW5nZUFtb3VudCh2YWwpe1xuICAgIGlmICh2YWwgJiYgdGhpcy5zdGF0ZS5lcnJvci5hbW91bnQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Ftb3VudDogdmFsLCBlcnJvcjp7fX0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHthbW91bnQ6IHZhbH0pO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZUNhdGVnb3J5KHZhbCkge1xuICAgIGlmICh2YWwgJiYgdGhpcy5zdGF0ZS5lcnJvci5jYXRlZ29yeSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2F0ZWdvcnk6IHZhbCwgZXJyb3I6e319KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2F0ZWdvcnk6IHZhbH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURhdGVFcnJvcigpIHtcbiAgICBjb25zdCB7ZGF5LCBtb250aCwgeWVhcn0gPSB0aGlzLnN0YXRlO1xuICAgIGlmICghKG5ldyBEYXRlKHBhcnNlSW50KHllYXIpLCBwYXJzZUludChtb250aCksIHBhcnNlSW50KGRheSkpID4gbmV3IERhdGUoKSkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOnt9fSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGF0ZURhdGEodmFsKSB7XG4gICAgbGV0IGN1cnJEYXRlID0gbmV3IERhdGUoKTtcbiAgICBpZiAodmFsID09PSBZRVNURVJEQVkpIHtcbiAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoY3VyckRhdGUuc2V0RGF0ZShjdXJyRGF0ZS5nZXREYXRlKCkgLSAxKSk7XG4gICAgICBjdXJyRGF0ZSA9IGRhdGU7XG4gICAgfVxuICAgIHJldHVybiB7IGRheTogY3VyckRhdGUuZ2V0RGF0ZSgpLCBtb250aDogY3VyckRhdGUuZ2V0TW9udGgoKSwgeWVhcjogY3VyckRhdGUuZ2V0RnVsbFllYXIoKSB9O1xuICB9XG5cbiAgY2hhbmdlRGF0ZSh2YWwpIHtcbiAgICBpZiAodmFsID09PSBUT0RBWSkge1xuICAgICAgY29uc3QgZGF0ZURhdGEgPSB0aGlzLmdldERhdGVEYXRhKFRPREFZKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB0b2RheVRhcDp0cnVlLCB5ZXN0ZXJkYXlUYXA6IGZhbHNlLCAuLi5kYXRlRGF0YX0sICgpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmVEYXRlRXJyb3IoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodmFsID09IFlFU1RFUkRBWSkge1xuICAgICAgY29uc3QgZGF0ZURhdGEgPSB0aGlzLmdldERhdGVEYXRhKFlFU1RFUkRBWSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdG9kYXlUYXA6IGZhbHNlLCB5ZXN0ZXJkYXlUYXA6IHRydWUsIC4uLmRhdGVEYXRhfSwgKCkgPT4ge1xuICAgICAgICB0aGlzLnJlbW92ZURhdGVFcnJvcigpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoey4uLnZhbH0sICgpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmVEYXRlRXJyb3IoKTtcbiAgICAgICAgY29uc3QgZGF0ZURhdGFUb2RheSA9IHRoaXMuZ2V0RGF0ZURhdGEoVE9EQVkpO1xuICAgICAgICBjb25zdCBkYXRlRGF0YVllc3RlcmRheSA9IHRoaXMuZ2V0RGF0ZURhdGEoWUVTVEVSREFZKTtcbiAgICAgICAgY29uc3Qge2RheSwgbW9udGgsIHllYXJ9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKGRheS50b1N0cmluZygpID09PSBkYXRlRGF0YVRvZGF5LmRheS50b1N0cmluZygpICYmIG1vbnRoLnRvU3RyaW5nKCkgPT09IGRhdGVEYXRhVG9kYXkubW9udGgudG9TdHJpbmcoKSAmJiB5ZWFyLnRvU3RyaW5nKCkgPT09IGRhdGVEYXRhVG9kYXkueWVhci50b1N0cmluZygpKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dG9kYXlUYXA6IHRydWUsIHllc3RlcmRheVRhcDogZmFsc2V9KTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXkudG9TdHJpbmcoKSA9PT0gZGF0ZURhdGFZZXN0ZXJkYXkuZGF5LnRvU3RyaW5nKCkgJiYgbW9udGgudG9TdHJpbmcoKSA9PT0gZGF0ZURhdGFZZXN0ZXJkYXkubW9udGgudG9TdHJpbmcoKSAmJiB5ZWFyLnRvU3RyaW5nKCkgPT09IGRhdGVEYXRhWWVzdGVyZGF5LnllYXIudG9TdHJpbmcoKSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RvZGF5VGFwOiBmYWxzZSwgeWVzdGVyZGF5VGFwOiB0cnVlfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dG9kYXlUYXA6IGZhbHNlLCB5ZXN0ZXJkYXlUYXA6IGZhbHNlfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGlzVmFsaWREYXRlKCkge1xuICAgIGNvbnN0IHtkYXksIG1vbnRoLCB5ZWFyfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgZGF0ZVJlZyA9IC9eXFxkezEsMn0kLztcbiAgICBjb25zdCBkYXRlUmVnWWVhciA9IC9eXFxkezR9JC87XG4gICAgaWYgKCFkYXRlUmVnLnRlc3QoZGF5KSB8fCAhZGF0ZVJlZy50ZXN0KG1vbnRoKSB8fCAhZGF0ZVJlZ1llYXIudGVzdCh5ZWFyKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHtkYXRlOiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBEYXRlISd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5ldyBEYXRlKHBhcnNlSW50KHllYXIpLCBwYXJzZUludChtb250aCksIHBhcnNlSW50KGRheSkpID4gbmV3IERhdGUoKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHtkYXRlOiAnUGxlYXNlIGRvIG5vdCBQcm92aWRlIEZ1dHVyZSBEYXRlISd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUocGFyc2VJbnQoeWVhciksIHBhcnNlSW50KG1vbnRoKSwgcGFyc2VJbnQoZGF5KSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgdmFsaWRhdGVQYXJhbXMoKSB7XG4gICAgdmFyIHJlZyA9IC9eWzEtOV1bMC05XSokLztcbiAgICBjb25zdCB7YW1vdW50LCBjYXRlZ29yeX0gPSB0aGlzLnN0YXRlO1xuICAgIGlmICghYW1vdW50IHx8ICFyZWcudGVzdChhbW91bnQpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2Ftb3VudDogJ1BsZWFzZSBwcm92aWRlIGEgVmFsaWQgQW1vdW50J319KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFjYXRlZ29yeSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHtjYXRlZ29yeTogJ1BsZWFzZSBwcm92aWRlIGEgVmFsaWQgQ2F0ZWdvcnknfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNWYWxpZERhdGUoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzdWJtaXROZXdFeHBlbnNlKCkge1xuICAgIGNvbnN0IHthbW91bnQsIGRheSwgbW9udGgsIHllYXIsIHR5cGUsIGNhdGVnb3J5LCBkZXNjcmlwdGlvbn0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGlzVmFsaWRhdGlvblN1Y2Nlc3MgPSB0aGlzLnZhbGlkYXRlUGFyYW1zKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZGlzYWJsZVN1Ym1pdDogdHJ1ZX0pO1xuICAgIGlmIChpc1ZhbGlkYXRpb25TdWNjZXNzKSB7XG4gICAgICBjb25zdCBkYXRlID0gdGhpcy5kYXRlO1xuICAgICAgY29uc3QgbW0gPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICBjb25zdCB5eSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGNvbnN0IGZpcnN0RGF5b2ZNb250aCA9IG5ldyBEYXRlKHl5LCBtbSwgMSkuZ2V0RGF5KCk7XG4gICAgICBjb25zdCB3dyA9IE1hdGguY2VpbCgoZmlyc3REYXlvZk1vbnRoICsgZGF0ZS5nZXREYXRlKCkpIC8gNyk7XG4gICAgICBjb25zdCBkb3cgPSBkYXRlLmdldERheSgpO1xuICAgICAgY29uc3QgZGQgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgYW1vdW50LCB0eXBlLCBkYXRlLCBtbSwgeXksIHd3LCBkb3csIGRkLCBjYXRlZ29yeSwgZGVzY3JpcHRpb259O1xuICAgICAgcGFyYW1zLmNhdGVnb3J5PSBwYXJhbXMuY2F0ZWdvcnkudHJpbSgpLnN1YnN0cmluZygwLDEpLnRvVXBwZXJDYXNlKCkgKyBwYXJhbXMuY2F0ZWdvcnkudHJpbSgpLnN1YnN0cmluZygxKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmVkaXRUcmFuc2FjdGlvbk9iaikge1xuICAgICAgICBwYXJhbXMuaWQgPSB0aGlzLnByb3BzLmVkaXRUcmFuc2FjdGlvbk9iai5pZDtcbiAgICAgICAgZWRpdF9leHBlbnNlKHBhcmFtcykudGhlbigocmVzcCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvcHMubmV3RXhwZW5zZShmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBFZGl0IEV4cGVuc2UnLGVycik7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGlzYWJsZVN1Ym1pdDogZmFsc2V9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdfZXhwZW5zZShwYXJhbXMpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5uZXdFeHBlbnNlKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gY3JlYXRlIG5ldyBFeHBlbnNlJyxlcnIpO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Rpc2FibGVTdWJtaXQ6IGZhbHNlfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtkaXNhYmxlU3VibWl0OiBmYWxzZX0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZyZXF1ZW50Q2F0ZWdvcmllc1RhcChlKSB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmlwcGxlLS1jb250YWluZXInKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNhdGVnb3J5OiBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlubmVyVGV4dH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlckZyZXF1ZW50Q2F0ZWdvcmllcygpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YXBXcmFwcGVyXCIgb25DbGljaz17dGhpcy5oYW5kbGVGcmVxdWVudENhdGVnb3JpZXNUYXB9PlxuICAgICAgICB7dGhpcy5zdGF0ZS5mcmVxdWVudENhdGVnb3JpZXMubWFwKChlbnRyeSkgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmlwcGxlIGNsYXNzZXM9eyd0YXBPcHRpb25NYXJnaW4gJyArICh0aGlzLnN0YXRlLmNhdGVnb3J5LnRvTG93ZXJDYXNlKCkgPT09IGVudHJ5LmNhdGVnb3J5LnRvTG93ZXJDYXNlKCkgPyAnYWN0aXZlVGFwT3B0aW9uIHRoZW1lQmcnOiAndGFwT3B0aW9uIHRoZW1lQnJkcicpfT5cbiAgICAgICAgICAgICAge2VudHJ5LmNhdGVnb3J5fVxuICAgICAgICAgICAgPC9SaXBwbGU+XG4gICAgICAgICAgKVxuICAgICAgICB9KX0gICAgICBcbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3R5cGUsIGFtb3VudCwgZGF5LCBtb250aCwgeWVhciwgY2F0ZWdvcnksIGVycm9yLCBkaXNhYmxlU3VibWl0fSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3RXhwZW5zZUNvbnRhaW5lciB6aTEwXCIgaWQ9XCJleHBlbnNlQ29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwSW5jQnRucyB0ZXh0Q2VudGVyIG1UMjVcIj5cbiAgICAgICAgICA8UmlwcGxlIGNsYXNzZXM9eydpbi1ibCBuZXdCdG4gJyArICh0eXBlID09PSAnZXhwZW5zZScgPyAnc2VsZWN0ZWRUeXBlJyA6ICcnKX0gb25DbGlja0hhbmRsZXI9eygpID0+IHRoaXMuc2VsZWN0VHlwZSgnZXhwZW5zZScpfSA+RXhwZW5zZTwvUmlwcGxlPlxuICAgICAgICAgIDxSaXBwbGUgY2xhc3Nlcz17J2luLWJsIG5ld0J0biAnICsgKHR5cGUgPT09ICdpbmNvbWUnID8gJ3NlbGVjdGVkVHlwZScgOiAnJyl9IG9uQ2xpY2tIYW5kbGVyPXsoKSA9PiB0aGlzLnNlbGVjdFR5cGUoJ2luY29tZScpfSA+SW5jb21lPC9SaXBwbGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFtb3VudElucHV0IG1UMjUgXCI+XG4gICAgICAgICAgPHNwYW4+4oK5PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9eydwYWRMMTAgdzc1ICcgKyAoZXJyb3IuYW1vdW50ID8gJ3JlZEJyZHJCdG0nIDogJycpfSBhdXRvLWNvbXBsZXRlPVwib2ZmXCIgdHlwZT1cInRleHRcIiBpZD1cIm5ld0V4cEFtdFwiIHBsYWNlaG9sZGVyPVwiQW1vdW50XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZUFtb3VudChlLnRhcmdldC52YWx1ZSl9IHZhbHVlPXthbW91bnR9Lz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZXF1aXJlZEFzaHRlcml4XCI+ICogPC9zcGFuPlxuICAgICAgICAgIHtlcnJvci5hbW91bnQgPyA8ZGl2IGNsYXNzTmFtZT1cImVycm9yRGl2XCI+e2Vycm9yLmFtb3VudH08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAgY2xhc3NOYW1lPVwiY2F0ZWdvcnlJbnB1dCBtVDI1IFwiPlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9eydwYWRMMTAgdzc1ICcgKyAoZXJyb3IuY2F0ZWdvcnkgPyAncmVkQnJkckJ0bScgOiAnJyl9IGF1dG8tY29tcGxldGU9XCJvZmZcIiAgdHlwZT1cInRleHRcIiBpZD1cIm5ld0NhdGVnQW10XCIgcGxhY2Vob2xkZXI9XCJDYXRlZ29yeVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VDYXRlZ29yeShlLnRhcmdldC52YWx1ZSl9IHZhbHVlPXtjYXRlZ29yeX0vPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlcXVpcmVkQXNodGVyaXhcIj4gKiA8L3NwYW4+XG4gICAgICAgICAge2Vycm9yLmNhdGVnb3J5ID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5jYXRlZ29yeX08L2Rpdj4gOiBudWxsfVxuICAgICAgICAgIHt0aGlzLnN0YXRlLmZyZXF1ZW50Q2F0ZWdvcmllcy5sZW5ndGggPT09IDAgPyB0aGlzLnJlbmRlcklubmVyVHJhbnNhY3Rpb25jYXJkKCkgOiB0aGlzLnJlbmRlckZyZXF1ZW50Q2F0ZWdvcmllcygpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25JbnB1dFdyYXAgdGMgbS01IG1UMjUgXCI+XG4gICAgICAgICAgPGlucHV0IGlkPVwibmV3RGVzY3JpcHRpb25cIiBjbGFzc05hbWU9XCJwYWRMMTAgdzc1XCIgcGxhY2Vob2xkZXI9XCJEZXNjcmlwdGlvblwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7IGRlc2NyaXB0aW9uOiBlLnRhcmdldC52YWx1ZX0pfSB2YWx1ZT17dGhpcy5zdGF0ZS5kZXNjcmlwdGlvbn0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGVudERheSBtVDI1IFwiPlxuICAgICAgICAgIDxzZWxlY3QgcmVmPVwiZGF5XCIgY2xhc3NOYW1lPVwidzIwIFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHtkYXk6IGUudGFyZ2V0LnZhbHVlfSl9IHZhbHVlPXt0aGlzLnN0YXRlLmRheX0+e3JlbmRlck9wdGlvbnMoJ2RheScpfTwvc2VsZWN0PlxuICAgICAgICAgIDxzZWxlY3QgcmVmPVwibW9udGhcIiBjbGFzc05hbWU9XCJ3MjUgXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe21vbnRoOiBlLnRhcmdldC52YWx1ZX0pfSB2YWx1ZT17dGhpcy5zdGF0ZS5tb250aH0+e3JlbmRlck9wdGlvbnMoJ21vbnRoJyl9PC9zZWxlY3Q+XG4gICAgICAgICAgPHNlbGVjdCByZWY9XCJ5ZWFyXCIgY2xhc3NOYW1lPVwidzIwIFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VEYXRlKHt5ZWFyOiBlLnRhcmdldC52YWx1ZX0pfSB2YWx1ZT17dGhpcy5zdGF0ZS55ZWFyfT57cmVuZGVyT3B0aW9ucygneWVhcicpfTwvc2VsZWN0PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFwV3JhcHBlclwiPlxuICAgICAgICAgICAgPFJpcHBsZSBjbGFzc2VzPXsndGFwT3B0aW9uTWFyZ2luICcgKyAodGhpcy5zdGF0ZS50b2RheVRhcCA/ICdhY3RpdmVUYXBPcHRpb24gdGhlbWVCZyc6ICd0YXBPcHRpb24gdGhlbWVCcmRyJyl9IG9uQ2xpY2tIYW5kbGVyPXsoKSA9PiB0aGlzLmNoYW5nZURhdGUoVE9EQVkpfSA+VG9kYXk8L1JpcHBsZT5cbiAgICAgICAgICAgIDxSaXBwbGUgY2xhc3Nlcz17J3RhcE9wdGlvbk1hcmdpbiAnICsgKHRoaXMuc3RhdGUueWVzdGVyZGF5VGFwID8gJ2FjdGl2ZVRhcE9wdGlvbiB0aGVtZUJnJzogJ3RhcE9wdGlvbiB0aGVtZUJyZHInKX0gb25DbGlja0hhbmRsZXI9eygpID0+IHRoaXMuY2hhbmdlRGF0ZShZRVNURVJEQVkpfSA+WWVzdGVyZGF5PC9SaXBwbGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2Vycm9yLmRhdGUgPyA8ZGl2IGNsYXNzTmFtZT1cIm10MTAgZXJyb3JEaXZcIj57ZXJyb3IuZGF0ZX08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0Q2VudGVyXCI+XG4gICAgICAgICAgPFJpcHBsZSBjbGFzc2VzPXsnc3VibWl0QnRuIHRoZW1lQmcgJyArIChkaXNhYmxlU3VibWl0ID8gJ2Rpc2FibGVCdG4nIDogJycpfSBvbkNsaWNrSGFuZGxlcj17dGhpcy5zdWJtaXROZXdFeHBlbnNlfSA+RG9uZTwvUmlwcGxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCB7TmF2TGlua30gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNsYXNzIE5vdEZvdW5kIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLmJpbmQodGhpcyk7XG4gIH1cblxuICBoZWFkKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0PlxuICAgICAgICA8dGl0bGU+UGFnZSBOb3QgRm91bmQ8L3RpdGxlPlxuICAgICAgPC9IZWxtZXQ+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuaGVhZCgpfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdGZvdW5kQ29udGFpbmVyXCI+XG4gICAgICAgICAgPGg1IGNsYXNzTmFtZT1cIm5vdEZvdW5kVGV4dCBmYiB0ZXh0Q2VudGVyXCI+U29ycnksIHRoaXMgcGFnZSBkb2VzIG5vdCBleGlzdCE8L2g1PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibm90Zm91bmRVTCB0ZXh0Q2VudGVyXCI+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmx1ZUJ0blwiPlxuICAgICAgICAgICAgICA8TmF2TGluayB0bz0nL2xvZ2luJyBjbGFzc05hbWU9XCJ3aGl0ZVwiPiBMb2dpbiA8L05hdkxpbms+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE5vdEZvdW5kOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IHdyYXBwZXIgPSB7XG4gICdwb3NpdGlvbic6ICdyZWxhdGl2ZSdcbn07XG5jb25zdCBpY29uID0gIHtcbiAgJ2NvbG9yJzogJyNmZmYnLFxuICAnYmFja2dyb3VuZENvbG9yJzogJyMwNzU3ZDAnLFxuICAnYm9yZGVyUmFkaXVzJzogJzEwMCUnLFxuICAnd2lkdGgnOiAnMzVweCcsXG4gICdoZWlnaHQnOiAnMzVweCcsXG4gICd0ZXh0QWxpZ24nOiAnY2VudGVyJyxcbiAgJ21hcmdpbic6ICc1MHZoIGF1dG8nLFxuICAnekluZGV4JzogJzcnLFxuICAncG9zaXRpb24nOiAncmVsYXRpdmUnLFxufTtcbmNvbnN0IHZhbCA9IHtcbiAgJ3BhZGRpbmcnOiAnMTFweCdcbn07XG5cbmNvbnN0IHJpcHBsZXIgPSAge1xuICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuICAnYm9yZGVyJzogJzAuMDFweCBzb2xpZCAjMDc1N2QwJyxcbiAgJ3RvcCc6ICc1MCUnLFxuICAnbGVmdCc6ICc1MCUnLFxuICAnd2lkdGgnOiAnMXB4JyxcbiAgJ2hlaWdodCc6ICcxcHgnLFxuICAnYmFja2dyb3VuZENvbG9yJzogJyMwNzU3ZDAnLFxuICAnYm9yZGVyUmFkaXVzJzogJzUwJScsXG4gICdhbmltYXRpb24nOiAncmlwcGxlTG9hZGVyIDNzIGVhc2UgaW5maW5pdGUnXG59XG5cbmZ1bmN0aW9uIFBhZ2VMb2FkZXIoKSB7XG4gIGNvbnN0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgPSBgQGtleWZyYW1lcyByaXBwbGVMb2FkZXJ7XG4gICAgMTAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDcwMCk7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfWA7XG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGRpdiBzdHlsZT17ey4uLndyYXBwZXJ9fT5cbiAgICAgICAgPGRpdiBzdHlsZT17ey4uLmljb259fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7Li4udmFsfX0+XG4gICAgICAgICAgICAgIDxzdmcgeD1cIjBweFwiIHk9XCIwcHhcIiB3aWR0aD1cIjEzcHhcIiBoZWlnaHQ9XCIxM3B4XCIgdmlld0JveD1cIjAgMCA0MDEuOTk4IDQwMS45OThcIiBzdHlsZT17e1wiZW5hYmxlQmFja2dyb3VuZFwiIDpcIm5ldyAwIDAgNDAxLjk5OCA0MDEuOTk4XCIsIFwieG1sOnNwYWNlXCI6IFwicHJlc2VydmVcIn19PlxuICAgICAgICAgICAgICAgIDxnPlxuICAgICAgICAgICAgICAgICAgPGc+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTMyNi42Miw5MS4wNzZjLTEuNzExLTEuNzEzLTMuOTAxLTIuNTY4LTYuNTYzLTIuNTY4aC00OC44MmMtMy4yMzgtMTUuNzkzLTkuMzI5LTI5LjUwMi0xOC4yNzQtNDEuMTEyaDY2LjUyICAgYzIuNjY5LDAsNC44NTMtMC44NTYsNi41Ny0yLjU2NWMxLjcwNC0xLjcxMiwyLjU2LTMuOTAzLDIuNTYtNi41NjdWOS4xMzZjMC0yLjY2Ni0wLjg1NS00Ljg1My0yLjU2LTYuNTY3ICAgQzMyNC4zMzQsMC44NTksMzIyLjE1LDAsMzE5LjQ4MSwwSDgxLjk0MWMtMi42NjYsMC00Ljg1MywwLjg1OS02LjU2NywyLjU2OGMtMS43MDksMS43MTQtMi41NjgsMy45MDEtMi41NjgsNi41Njd2MzcuOTcyICAgYzAsMi40NzQsMC45MDQsNC42MTUsMi43MTIsNi40MjNzMy45NDksMi43MTIsNi40MjMsMi43MTJoNDEuMzk5YzQwLjE1OSwwLDY1LjY2NSwxMC43NTEsNzYuNTEzLDMyLjI2MUg4MS45NDEgICBjLTIuNjY2LDAtNC44NTYsMC44NTUtNi41NjcsMi41NjhjLTEuNzA5LDEuNzE1LTIuNTY4LDMuOTAxLTIuNTY4LDYuNTY3djI5LjEyNGMwLDIuNjY0LDAuODU1LDQuODU0LDIuNTY4LDYuNTYzICAgYzEuNzE0LDEuNzE1LDMuOTA1LDIuNTY4LDYuNTY3LDIuNTY4aDEyMS45MTVjLTQuMTg4LDE1LjYxMi0xMy45NDQsMjcuNTA2LTI5LjI2OCwzNS42OTEgICBjLTE1LjMyNSw4LjE4Ni0zNS41NDQsMTIuMjc5LTYwLjY3LDEyLjI3OUg4MS45NDFjLTIuNDc0LDAtNC42MTUsMC45MDUtNi40MjMsMi43MTJjLTEuODA5LDEuODA5LTIuNzEyLDMuOTUxLTIuNzEyLDYuNDIzdjM2LjI2MyAgIGMwLDIuNDc4LDAuODU1LDQuNTcxLDIuNTY4LDYuMjgyYzM2LjU0MywzOC44MjgsODMuOTM5LDkzLjE2NSwxNDIuMTgyLDE2My4wMjVjMS43MTUsMi4yODYsNC4wOTMsMy40MjYsNy4xMzksMy40MjZoNTUuNjcyICAgYzQuMDAxLDAsNi43NjMtMS43MDgsOC4yODEtNS4xNDFjMS45MDMtMy40MjYsMS41My02LjY2Mi0xLjE0My05LjcwOGMtNTUuNTcyLTY4LjE0My05OS4yNTgtMTE5LjE1My0xMzEuMDQ1LTE1My4wMzIgICBjMzIuMzU4LTMuODA2LDU4LjYyNS0xNC4yNzcsNzguODAyLTMxLjQwNGMyMC4xNzQtMTcuMTI5LDMyLjQ0OS0zOS40MDMsMzYuODMtNjYuODExaDQ3Ljk2NWMyLjY2MiwwLDQuODUzLTAuODU0LDYuNTYzLTIuNTY4ICAgYzEuNzE1LTEuNzA5LDIuNTczLTMuODk5LDIuNTczLTYuNTYzVjk3LjY0NkMzMjkuMTkzLDk0Ljk3NywzMjguMzM1LDkyLjc5LDMyNi42Miw5MS4wNzZ6XCIgZGF0YS1vcmlnaW5hbD1cIiMwMDAwMDBcIiBkYXRhLW9sZF9jb2xvcj1cIiNGN0Y0RjRcIiBmaWxsPVwiI2ZmZlwiLz5cbiAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNwYW4gc3R5bGU9e3suLi5yaXBwbGVyfX0+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VMb2FkZXI7XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJpcHBsZX0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7Y2FuY2VsQ2FsbGJhY2ssIGNvbmZpcm1DYWxsYmFja30gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcHVwQmFja0Ryb3BcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3B1cENvbnRhaW5lciB3aGl0ZUJnXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3B1cEhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmYiBmczE0IHBhZEIxMCB0ZXh0Q2VudGVyXCI+XG4gICAgICAgICAgICAgIERvIHlvdSB3YW50IHRvIERlbGV0ZSB0aGlzIHRyYW5zYWN0aW9uP1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyXCI+XG4gICAgICAgICAgICAgIDxSaXBwbGUgY2xhc3Nlcz1cImluLWJsIG5ld0J0biB3aGl0ZSB0aGVtZUJnIGluLWJsIHRyIG1mNSBmczEyXCIgb25DbGlja0hhbmRsZXI9e2NvbmZpcm1DYWxsYmFja30+Q29uZmlybTwvUmlwcGxlPlxuICAgICAgICAgICAgICA8UmlwcGxlIGNsYXNzZXM9XCJpbi1ibCBuZXdCdG4gd2hpdGUgdGhlbWVCZyBpbi1ibCB0ciBtZjUgZnMxMlwiIG9uQ2xpY2tIYW5kbGVyPXtjYW5jZWxDYWxsYmFja30+Q2FuY2VsPC9SaXBwbGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBNT05USCA9ICdtb250aCc7XG5leHBvcnQgY29uc3QgWUVBUiA9ICd5ZWFyJztcbmV4cG9ydCBjb25zdCBXRUVLID0gJ3dlZWsnO1xuZXhwb3J0IGNvbnN0IERJVklTSU9OTEVOR1RIID0geyBtb250aDogMzEsIHllYXI6IDEyLCB3ZWVrOiA3fTsgXG5leHBvcnQgY29uc3QgTUFYTEVOR1RIUEVSVEFCID0geyBtb250aDogMzEsIHllYXI6MTEsIHdlZWs6IDZ9O1xuZXhwb3J0IGNvbnN0IE1PTlRIU05BTUUgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXTtcbmV4cG9ydCBjb25zdCAgTU9OVEhTTkFNRVNIT1JUID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xuZXhwb3J0IGNvbnN0IFdFRUtOQU1FU0hPUlQgPSBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddO1xuZXhwb3J0IGNvbnN0IFRPREFZID0gJ3RvZGF5JztcbmV4cG9ydCBjb25zdCBZRVNURVJEQVkgPSAneWVzdGVyZGF5JztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0Jyb3dzZXJSb3V0ZXIsIFN3aXRjaCwgUm91dGV9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IExvZ2luIGZyb20gJy4uL2NvbXBvbmVudHMvTG9naW4nO1xuaW1wb3J0IE5vdEZvdW5kIGZyb20gJy4uL2NvbXBvbmVudHMvTm90Rm91bmQnXG5pbXBvcnQgSG9tZSBmcm9tICcuLi9jb21wb25lbnRzL0hvbWUnO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvbG9naW4nIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8TG9naW4gey4uLnByb3BzfS8+fS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD0nLycgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxMb2dpbiB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvaG9tZScgZXhhY3QgcmVuZGVyPXsocHJvcHMpID0+IDxIb21lIHsuLi5wcm9wc30vPn0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9JyonIHJlbmRlcj17KHByb3BzKSA9PiA8Tm90Rm91bmQgey4uLnByb3BzfS8+fS8+XG4gICAgICAgIDwvU3dpdGNoPlxuICAgICk7XG59IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge01PTlRIU05BTUVTSE9SVH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJPcHRpb25zKHR5cGUpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICBpZiAodHlwZSA9PT0gJ2RheScpIHtcbiAgICBvcHRpb25zLnB1c2goPG9wdGlvbj5EYXk8L29wdGlvbj4pO1xuICAgIGZvcihsZXQgaSA9IDE7IGkgPCAzMiA7IGkrKykge1xuICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24ga2V5PXsnZGF5XycgKyBpfSB2YWx1ZT17aX0+e2l9PC9vcHRpb24+KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ21vbnRoJykge1xuICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uPk1vbnRoPC9vcHRpb24+KTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTIgOyBpKyspIHtcbiAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uIGtleT17J21vbnRoXycgKyBpfSB2YWx1ZT17aX0+e01PTlRIU05BTUVTSE9SVFtpXX08L29wdGlvbj4pO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlID09PSAneWVhcicpIHtcbiAgICBvcHRpb25zLnB1c2goPG9wdGlvbj5ZZWFyPC9vcHRpb24+KTtcbiAgICBmb3IobGV0IGkgPSAyMDIwOyBpID4gMjAwMCA7IGktLSkge1xuICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24ga2V5PXsneWVhcl8nICsgaX0gIHZhbHVlPXtpfT57aX08L29wdGlvbj4pO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlID09PSAnd2VlaycpIHtcbiAgICBvcHRpb25zLnB1c2goPG9wdGlvbj5XZWVrPC9vcHRpb24+KTtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgNiA7IGkrKykge1xuICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24ga2V5PXsnd2Vla18nICsgaX0gdmFsdWU9e2l9PntpfTwvb3B0aW9uPik7XG4gICAgfVxuICB9XG4gIHJldHVybiBvcHRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkKSB7XG4gIGxldCBkYXRlO1xuICBpZiAodHlwZW9mKGQpICE9PSAnb2JqZWN0Jykge1xuICAgIGRhdGUgPSBuZXcgRGF0ZShkKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRlID0gZDtcbiAgfVxuICBsZXQgcmVzdWx0ID0gJyc7XG4gIHJlc3VsdCArPSBkYXRlLmdldERhdGUoKSArICcgJyArICBNT05USFNOQU1FU0hPUlRbZGF0ZS5nZXRNb250aCgpXSArICcgJyArIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFtb3VudE9uR3JhcGgodmFsKSB7XG4gIGlmICh2YWwgPT09ICcnKSB7XG4gICAgcmV0dXJuICcnO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdCh2YWwsIDEwKTtcbiAgICBpZiAodmFsID4gMTAwMCkge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQocGFyc2VGbG9hdCh2YWwvMTAwMCwgMTApICogMTApIC8gMTAgKyAnSyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRMb2FkZXIodmFsKSB7XG4gIGlmICh0eXBlb2Yod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cubG9hZGVyID0gdmFsO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSaXBwbGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIGNhbGxDbGVhblVwKGNsZWFudXAsIGRlbGF5KSB7XG4gICAgICB2YXIgYm91bmNlO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBhcmd1bWVudHNbMF0uY3VycmVudFRhcmdldDtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGJvdW5jZSk7XG4gICAgICAgIGJvdW5jZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2xlYW51cCh0YXJnZXQpO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgICB9XG4gIH1cblxuICBzaG93UmlwcGxlKGUpIHtcbiAgICBjb25zdCByaXBwbGVDb250YWluZXIgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3Qgc2l6ZSA9IHJpcHBsZUNvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBwb3MgPSByaXBwbGVDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeCA9IGUucGFnZVggLSBwb3MueCAtIChzaXplIC8gMik7XG4gICAgY29uc3QgeSA9IGUucGFnZVkgLSBwb3MueSAtIChzaXplIC8gMik7XG4gICAgY29uc3Qgc3R5bGUgPSAndG9wOicgKyB5ICsgJ3B4OyBsZWZ0OiAnICsgeCArICdweDsgaGVpZ2h0OiAnICsgc2l6ZSArICdweDsgd2lkdGg6ICcgKyBzaXplICsgJ3B4Oyc7XG4gICAgY29uc3QgcmlwcGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICByaXBwbGVDb250YWluZXIuYXBwZW5kQ2hpbGQocmlwcGxlcik7XG4gICAgcmV0dXJuIHJpcHBsZXIuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgfVxuXG4gIGNsZWFuVXAoZWx0KSB7XG4gICAgd2hpbGUgKGVsdC5maXJzdENoaWxkKSB7XG4gICAgICBlbHQucmVtb3ZlQ2hpbGQoZWx0LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7Y2hpbGRyZW49IG51bGwsIGNsYXNzZXMgPSBcIlwiLCBvbkNsaWNrSGFuZGxlciA9IG51bGx9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiByZWY9XCJ0YXJnZXRFbGVtZW50XCIgY2xhc3NOYW1lPXtjbGFzc2VzfSBvbkNsaWNrPXtvbkNsaWNrSGFuZGxlcn0gcmlwcGxlPVwicmlwcGxlXCI+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaXBwbGUtLWNvbnRhaW5lclwiIG9uTW91c2VEb3duPXt0aGlzLnNob3dSaXBwbGV9IG9uTW91c2VVcD17dGhpcy5jYWxsQ2xlYW5VcCh0aGlzLmNsZWFuVXAsIDIwMDApfT48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdGpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbm5lY3QtbW9uZ29cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLXNlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaGVsbWV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=