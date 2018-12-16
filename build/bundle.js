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
    type: String,
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
    type: String,
    required: false,
    trim: true,
    default: Date.now()
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


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _mongoose3 = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose4 = _interopRequireDefault(_mongoose3);

var _userModel = __webpack_require__(/*! ./models/userModel */ "./server/models/userModel.js");

var _userModel2 = _interopRequireDefault(_userModel);

var _expenseModel = __webpack_require__(/*! ./models/expenseModel */ "./server/models/expenseModel.js");

var _expenseModel2 = _interopRequireDefault(_expenseModel);

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

app.post('/signup', function (request, response) {
    // Users.deleteMany({});
    var _request$body = request.body,
        _request$body$usernam = _request$body.username,
        username = _request$body$usernam === undefined ? '' : _request$body$usernam,
        _request$body$passwor = _request$body.password,
        password = _request$body$passwor === undefined ? '' : _request$body$passwor,
        _request$body$emailId = _request$body.emailId,
        emailId = _request$body$emailId === undefined ? '' : _request$body$emailId;

    var user = new _userModel2.default({
        _id: _mongoose4.default.Types.ObjectId(),
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
});

app.post('/signin', function (request, response) {
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
});

app.post('/new_expense', function (request, response) {
    var _request$body3 = request.body,
        amount = _request$body3.amount,
        category = _request$body3.category,
        date = _request$body3.date,
        type = _request$body3.type;

    var newExpense = { amount: amount, category: category, date: date, type: type };
    var newExpenseInstance = new _expenseModel2.default(_extends({
        user_id: request.session._userId || "5c1632fa58e9f72d9f93579d"
    }, newExpense));
    newExpenseInstance.save().then(function (doc) {
        // request.session.user = doc.username;
        console.log(' doc.username', doc);
        response.send(doc);
    }, function (err) {
        console.log('Failed to save new Expense', err);
        response.status(500).send(err);
    });

    // Users.findOneAndUpdate(
    //     { username: 'dhilipk13'},
    //     { $push: {expense: newExpense}},
    //     function (err, document) {
    //         if (err) {
    //             console.log('Failed to save new Expense', err);
    //         } else {
    //             const lastIndex = document._doc.expense.length - 1;
    //             response.send({error: false,...document._doc.expense[lastIndex]._doc});
    //         }
    //     });
});

app.get('/get_expense_data', function (request, response) {
    _expenseModel2.default.find({ user_id: request.session._userId }).then(function (doc) {
        response.send(_extends({}, doc[0]._doc));
    }, function (err) {
        console.log('Failed to get Expense Details', err);
    });
});
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
    console.log('Server has started on port: ', port);
});

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
exports.get_expense_data = exports.new_expense = exports.signin = exports.signup = undefined;

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
  return _axios2.default.get(url);
};

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
    _this.state = {
      showWeek: false,
      showMonth: true,
      showYear: false,
      showNewExpense: false
    };
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'getExpense',
    value: function getExpense() {
      var _this2 = this;

      (0, _ApiCalls.get_expense_data)().then(function (resp) {
        console.log(resp.data);
        // standing, spent, transactions[name, percent]
        _this2.setState(_extends({}, resp.data));
      }, function (err) {
        console.log('Unable to Get Expense Details', err);
      });
    }
  }, {
    key: 'changeExpenseDayFormat',
    value: function changeExpenseDayFormat(format) {
      if (format === 'week') {
        this.setState({ showWeek: true, showMonth: false, showYear: false });
      } else if (format === 'month') {
        this.setState({ showWeek: false, showMonth: true, showYear: false });
      } else if (format === 'year') {
        this.setState({ showWeek: false, showMonth: false, showYear: true });
      }
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
              { className: 'menu-option' },
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
      this.refs.backDrop.classList.toggle('backDrop');
    }
  }, {
    key: 'clickViewMore',
    value: function clickViewMore(e) {
      this.getExpense();
      this.refs.svgViewMore.classList.toggle('rotateViewMore');
      this.refs.transactedCard.classList.toggle('showAllTransaction');
    }
  }, {
    key: 'renderTransactioncard',
    value: function renderTransactioncard() {
      return _react2.default.createElement(
        'div',
        { className: 'transactedCardInner' },
        _react2.default.createElement(
          'div',
          { className: 'cardInnerheading' },
          _react2.default.createElement(
            'span',
            { className: 'cat_name' },
            'Food'
          ),
          _react2.default.createElement(
            'span',
            { className: 'cat_percent' },
            '75%'
          )
        ),
        _react2.default.createElement('div', { className: 'progressBar progressBar1 bl textCenter' })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          showWeek = _state.showWeek,
          showMonth = _state.showMonth,
          showYear = _state.showYear,
          showNewExpense = _state.showNewExpense,
          _state$standing = _state.standing,
          standing = _state$standing === undefined ? 100 : _state$standing,
          _state$spent = _state.spent,
          spent = _state$spent === undefined ? 50 : _state$spent;

      return _react2.default.createElement(
        'div',
        { className: '' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', { ref: 'backDrop', className: 'transition2a zi1 ', onClick: function onClick() {
              return _this3.newExpense(false);
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
                    { className: 'dayTypeBtn ' + (showWeek ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this3.changeExpenseDayFormat('week');
                      } },
                    'Week'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (showMonth ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this3.changeExpenseDayFormat('month');
                      } },
                    'Month'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'dayTypeBtn ' + (showYear ? 'dayTypeBtn-active' : ''), onClick: function onClick() {
                        _this3.changeExpenseDayFormat('year');
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
                    { ref: 'transactedCard', className: 'transactedCard transition2a ' },
                    _react2.default.createElement(
                      'div',
                      { className: 'transactScroller' },
                      this.renderTransactioncard()
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'viewMoreArrow', onClick: function onClick() {
                        return _this3.clickViewMore();
                      } },
                    _react2.default.createElement(
                      'svg',
                      { ref: 'svgViewMore', xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24' },
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
                  { className: 'newContainer' },
                  _react2.default.createElement(
                    'div',
                    { className: 'new' },
                    _react2.default.createElement(
                      'span',
                      { className: 'newBtn', onClick: function onClick() {
                          return _this3.newExpense(true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbmZpZy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2RiL21vbmdvb3NlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvZXhwZW5zZU1vZGVsLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvdXNlck1vZGVsLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvYXBpQ2FsbHMvQXBpQ2FsbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvSG9tZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Mb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9OZXdFeHBlbnNlLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05vdEZvdW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9yb3V0ZXMvcm91dGVzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLXNlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiJdLCJuYW1lcyI6WyJlbnYiLCJwcm9jZXNzIiwiUE9SVCIsIk1PTkdPTEFCX1VSSSIsIm1vbmdvb3NlMSIsInJlcXVpcmUiLCJQcm9taXNlIiwiZ2xvYmFsIiwiY29ubmVjdCIsInVzZU5ld1VybFBhcnNlciIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJFeHBlbnNlcyIsIm1vbmdvb3NlIiwibW9kZWwiLCJ1c2VyX2lkIiwidHlwZSIsIlNjaGVtYSIsIlR5cGVzIiwiT2JqZWN0SWQiLCJyZWYiLCJhbW91bnQiLCJTdHJpbmciLCJyZXF1aXJlZCIsInRyaW0iLCJjYXRlZ29yeSIsImRlZmF1bHQiLCJkYXRlIiwiRGF0ZSIsIm5vdyIsIlVzZXJzIiwiX2lkIiwidXNlcm5hbWUiLCJtaW5sZW5ndGgiLCJlbWFpbElkIiwicGFzc3dvcmQiLCJleHBlbnNlIiwic2Vzc2lvbiIsImFwcCIsInBvcnQiLCJ1c2UiLCJzZWNyZXQiLCJyZXNhdmUiLCJzYXZlVW5pbml0aWFsaXplZCIsImJvZHlQYXJzZXIiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJqc29uIiwiZXhwcmVzcyIsInN0YXRpYyIsInBvc3QiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJib2R5IiwidXNlciIsImZpbmQiLCJyZXMiLCJsZW5ndGgiLCJzZW5kIiwiZXJyb3IiLCJtc2ciLCJzYXZlIiwiZG9jIiwiX3VzZXJJZCIsInN0YXR1cyIsIm5ld0V4cGVuc2UiLCJuZXdFeHBlbnNlSW5zdGFuY2UiLCJlcnIiLCJnZXQiLCJfZG9jIiwibG9hZEh0bWwiLCJjb250ZW50IiwiaGVsbWV0IiwiSGVsbWV0IiwicmVuZGVyU3RhdGljIiwibWV0YSIsInRvU3RyaW5nIiwidGl0bGUiLCJyZXEiLCJjb250ZXh0IiwiUmVhY3RET01TZXJ2ZXIiLCJyZW5kZXJUb1N0cmluZyIsInVybCIsInRlbXBsYXRlIiwibGlzdGVuIiwiQXBwIiwiQ29tcG9uZW50Iiwic2lnbnVwIiwicGFyYW1zIiwiYXhpb3MiLCJzaWduaW4iLCJuZXdfZXhwZW5zZSIsImdldF9leHBlbnNlX2RhdGEiLCJIb21lIiwicHJvcHMiLCJsZWZ0TWVudUNsaWNrIiwiYmluZCIsInN0YXRlIiwic2hvd1dlZWsiLCJzaG93TW9udGgiLCJzaG93WWVhciIsInNob3dOZXdFeHBlbnNlIiwicmVzcCIsImRhdGEiLCJzZXRTdGF0ZSIsImZvcm1hdCIsInJlZnMiLCJiYWNrRHJvcCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInBvcHVwIiwiZmlyc3RIYWxmTGFuZGluZ1R4dCIsIm90aGVySGFsZkxhbmRpbmdUeHQiLCJ2YWwiLCJnZXRFeHBlbnNlIiwic3ZnVmlld01vcmUiLCJ0cmFuc2FjdGVkQ2FyZCIsInN0YW5kaW5nIiwic3BlbnQiLCJyZW5kZXJMZWZ0TWVudUJhciIsImNoYW5nZUV4cGVuc2VEYXlGb3JtYXQiLCJyZW5kZXJUcmFuc2FjdGlvbmNhcmQiLCJjbGlja1ZpZXdNb3JlIiwiTG9naW4iLCJoZWFkIiwic2lnblVwIiwic2lnbkluIiwiaGlzdG9yeSIsInB1c2giLCJjYXRjaCIsInRhcmdldCIsInZhbHVlIiwiTmV3RXhwZW5zZSIsInNlbGVjdFR5cGUiLCJzdWJtaXROZXdFeHBlbnNlIiwiZGF5IiwibW9udGgiLCJ5ZWFyIiwiY3VycmVudCIsIm5leHQiLCJmb2N1cyIsImRhdGVSZWciLCJ0ZXN0IiwicGFyc2VJbnQiLCJyZWciLCJpc1ZhbGlkRGF0ZSIsImlzVmFsaWRhdGlvblN1Y2Nlc3MiLCJ2YWxpZGF0ZVBhcmFtcyIsImNoYW5nZUFtb3VudCIsImNoYW5nZURhdGUiLCJOb3RGb3VuZCIsImdvQmFjayJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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QUFBLHVCQUFXLDhCQUFDLGVBQUQsRUFBV0EsS0FBWCxDQUFYO0FBQUEsYUFBbkMsR0FISjtBQUlJLHNDQUFDLHFCQUFELElBQU8sUUFBUSxnQkFBQ0EsS0FBRDtBQUFBLHVCQUFXLDhCQUFDLGtCQUFELEVBQWNBLEtBQWQsQ0FBWDtBQUFBLGFBQWY7QUFKSixLQURKO0FBUUgsQzs7Ozs7Ozs7Ozs7QUNqQkQsa0M7Ozs7Ozs7Ozs7O0FDQUEsMkM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsNEM7Ozs7Ozs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsNkMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2VydmVyL3NlcnZlci5qc1wiKTtcbiIsInZhciBlbnYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnO1xuXG5pZiAoZW52ID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gIHByb2Nlc3MuZW52LlBPUlQgPSA0MDAwO1xuICBwcm9jZXNzLmVudi5NT05HT0xBQl9VUkkgPSAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9leHBlbnNlJztcbn0gZWxzZSB7XG4gIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSA9ICdtb25nb2RiOi8vZGhpbGlwazEzOmRoaWxpcGsxM0BkczI0NzMxMC5tbGFiLmNvbTo0NzMxMC9leHBlbnNlJztcbn1cbmV4cG9ydCBkZWZhdWx0IGVudjsiLCJ2YXIgbW9uZ29vc2UxID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcbm1vbmdvb3NlMS5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG5tb25nb29zZTEuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0xBQl9VUkksIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlIH0pLnRoZW4oKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gRGInKTtcbn0sKGUpPT4ge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHttb25nb29zZTF9OyIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgVXNlcnMgZnJvbSAnLi91c2VyTW9kZWwnO1xuXG5jb25zdCBFeHBlbnNlcyA9IG1vbmdvb3NlLm1vZGVsKCdFeHBlbnNlcycsIHtcbiAgdXNlcl9pZDoge1xuICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICByZWY6ICdVc2VycydcbiAgfSxcbiAgYW1vdW50OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHRyaW06IHRydWVcbiAgfSxcbiAgY2F0ZWdvcnk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICAgIGRlZmF1bHQ6ICdvdGhlcnMnXG4gIH0sXG4gIHR5cGU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWUsXG4gICAgZGVmYXVsdDogJ2V4cGVuc2UnXG4gIH0sXG4gIGRhdGU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRyaW06IHRydWUsXG4gICAgZGVmYXVsdDogRGF0ZS5ub3coKVxuICB9XG59KTtcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VzOyIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgRXhwZW5zZXMgZnJvbSAnLi9leHBlbnNlTW9kZWwnO1xuXG5jb25zdCBVc2VycyA9IG1vbmdvb3NlLm1vZGVsKCdVc2VycycsIHtcbiAgICBfaWQ6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICB1c2VybmFtZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW5sZW5ndGg6IDUsXG4gICAgICAgIHRyaW06IHRydWVcbiAgICB9LFxuICAgIGVtYWlsSWQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHRyaW06IHRydWVcbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbmxlbmd0aDogOCxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgZXhwZW5zZTogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsIFxuICAgICAgICAgICAgcmVmOiAnRXhwZW5zZXMnXG4gICAgICAgIH1cbiAgICBdXG59KTtcbmV4cG9ydCBkZWZhdWx0IFVzZXJzOyIsImltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0IGVudiBmcm9tICcuL2NvbmZpZy9jb25maWcnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NU2VydmVyIGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbnZhciBzZXNzaW9uID0gcmVxdWlyZSgnZXhwcmVzcy1zZXNzaW9uJyk7XG5cbmltcG9ydCBBcHAgZnJvbSAnLi4vc3JjL2FwcCdcbmltcG9ydCBtb25nb29zZTEgZnJvbSAnLi9kYi9tb25nb29zZSc7XG5pbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IFVzZXJzIGZyb20gJy4vbW9kZWxzL3VzZXJNb2RlbCc7XG5pbXBvcnQgRXhwZW5zZXMgZnJvbSAnLi9tb2RlbHMvZXhwZW5zZU1vZGVsJztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQ7XG5cbmFwcC51c2Uoc2Vzc2lvbih7XG4gICAgc2VjcmV0OiAnZGhpbGlwTG9jYWwnLFxuICAgIHJlc2F2ZTogZmFsc2UsXG4gICAgc2F2ZVVuaW5pdGlhbGl6ZWQ6IHRydWVcbiAgfSkpXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJ2J1aWxkL3B1YmxpYycpKTtcbmFwcC51c2UoJy9zdHlsZXMnLCBleHByZXNzLnN0YXRpYygnc3JjL3BhZ2VzL3N0eWxlcycpKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJ3NyYy9wYWdlcy9zdGF0aWMnKSk7XG5cbmFwcC5wb3N0KCcvc2lnbnVwJywgKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgLy8gVXNlcnMuZGVsZXRlTWFueSh7fSk7XG4gICBjb25zdCB7dXNlcm5hbWUgPSAnJywgcGFzc3dvcmQgPSAnJywgZW1haWxJZCA9ICcnfSA9IHJlcXVlc3QuYm9keTtcbiAgICB2YXIgdXNlciA9IG5ldyBVc2Vycyh7XG4gICAgICAgIF9pZDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoKSxcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgIGVtYWlsSWQ6IGVtYWlsSWRcbiAgICB9KTtcbiAgICBVc2Vycy5maW5kKHt1c2VybmFtZTogdXNlcm5hbWV9KS50aGVuKChyZXMpPT4ge1xuICAgICAgICBpZiAocmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoe2Vycm9yOiB0cnVlLCBtc2c6ICdVc2VybmFtZSBhbHJlYWR5IEV4aXN0cyd9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oKGRvYykgPT4ge1xuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2Vzc2lvbi5fdXNlcklkID0gZG9jLl9pZDtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHtlcnJvcjogZmFsc2UsIG1zZzogJ1NhdmVkIFN1Y2Nlc3NmdWxseSd9KTtcbiAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzKDUwMCkuc2VuZChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwgKGUpID0+IHtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZChlKTtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfSk7XG59KTtcblxuYXBwLnBvc3QoJy9zaWduaW4nLCAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCB7dXNlcm5hbWUgPSAnJywgcGFzc3dvcmQgPSAnJywgZW1haWxJZCA9ICcnfSA9IHJlcXVlc3QuYm9keTtcbiAgICBjb25zb2xlLmxvZyhyZXF1ZXN0LnNlc3Npb24udXNlcik7XG4gICAgIFVzZXJzLmZpbmQoe3VzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkfSkudGhlbigocmVzKT0+IHtcbiAgICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVxdWVzdC5zZXNzaW9uLl91c2VySWQgPSByZXNbMF0uX2lkO1xuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7ZXJyb3I6IGZhbHNlLCBtc2c6ICdzdWNjZXNzJ30pO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoe2Vycm9yOnRydWUsIG1zZzogJ05vIHVzZXIgYWNjb3VudCBmb3VuZCd9KTtcbiAgICAgICAgIH1cbiAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgIHJlc3BvbnNlLnNlbmQoZSk7XG4gICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgfSk7XG4gfSk7XG5cbmFwcC5wb3N0KCcvbmV3X2V4cGVuc2UnLCAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCB7IGFtb3VudCwgY2F0ZWdvcnksIGRhdGUsIHR5cGV9ID0gcmVxdWVzdC5ib2R5O1xuICAgIGNvbnN0IG5ld0V4cGVuc2UgPSB7YW1vdW50LCBjYXRlZ29yeSwgZGF0ZSwgdHlwZX1cbiAgICB2YXIgbmV3RXhwZW5zZUluc3RhbmNlID0gbmV3IEV4cGVuc2VzKHtcbiAgICAgICAgdXNlcl9pZDogcmVxdWVzdC5zZXNzaW9uLl91c2VySWQgfHwgXCI1YzE2MzJmYTU4ZTlmNzJkOWY5MzU3OWRcIixcbiAgICAgICAgLi4ubmV3RXhwZW5zZVxuICAgIH0pO1xuICAgIG5ld0V4cGVuc2VJbnN0YW5jZS5zYXZlKCkudGhlbigoZG9jKSA9PiB7XG4gICAgICAgIC8vIHJlcXVlc3Quc2Vzc2lvbi51c2VyID0gZG9jLnVzZXJuYW1lO1xuICAgICAgICBjb25zb2xlLmxvZygnIGRvYy51c2VybmFtZScsIGRvYyk7XG4gICAgICAgIHJlc3BvbnNlLnNlbmQoZG9jKTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gc2F2ZSBuZXcgRXhwZW5zZScsIGVycik7XG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyg1MDApLnNlbmQoZXJyKTtcbiAgICB9KTtcblxuICAgIC8vIFVzZXJzLmZpbmRPbmVBbmRVcGRhdGUoXG4gICAgLy8gICAgIHsgdXNlcm5hbWU6ICdkaGlsaXBrMTMnfSxcbiAgICAvLyAgICAgeyAkcHVzaDoge2V4cGVuc2U6IG5ld0V4cGVuc2V9fSxcbiAgICAvLyAgICAgZnVuY3Rpb24gKGVyciwgZG9jdW1lbnQpIHtcbiAgICAvLyAgICAgICAgIGlmIChlcnIpIHtcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIHNhdmUgbmV3IEV4cGVuc2UnLCBlcnIpO1xuICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBkb2N1bWVudC5fZG9jLmV4cGVuc2UubGVuZ3RoIC0gMTtcbiAgICAvLyAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHtlcnJvcjogZmFsc2UsLi4uZG9jdW1lbnQuX2RvYy5leHBlbnNlW2xhc3RJbmRleF0uX2RvY30pO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbn0pO1xuXG5hcHAuZ2V0KCcvZ2V0X2V4cGVuc2VfZGF0YScsIChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIEV4cGVuc2VzLmZpbmQoeyB1c2VyX2lkOiByZXF1ZXN0LnNlc3Npb24uX3VzZXJJZCB9KS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZCh7Li4uZG9jWzBdLl9kb2N9KTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gZ2V0IEV4cGVuc2UgRGV0YWlscycsIGVycik7XG4gICAgfSk7XG59KTtcbmNvbnN0IGxvYWRIdG1sID0gKGNvbnRlbnQpID0+IHtcbiAgICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG4gICAgcmV0dXJuIChgXG4gICAgICAgIDxodG1sPlxuICAgICAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICAgICAgJHtoZWxtZXQubWV0YS50b1N0cmluZygpfVxuICAgICAgICAgICAgICAgICR7aGVsbWV0LnRpdGxlLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3R3aXR0ZXItYm9vdHN0cmFwLzQuMS4zL2Nzcy9ib290c3RyYXAubWluLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvdHdpdHRlci1ib290c3RyYXAvNC4xLjMvanMvYm9vdHN0cmFwLmJ1bmRsZS5taW4uanNcIj5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9zdHlsZXMvY29tbW9uLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9ob21lLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9uZXdfZXhwZW5zZS5jc3NcIj5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2Fuc1wiIHJlbD1cInN0eWxlc2hlZXRcIj5cbiAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgIDxib2R5PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyb290XCI+JHtjb250ZW50fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiY2xpZW50X2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICAgICAgPC9ib2R5PlxuICAgICAgICA8L2h0bWw+YCk7XG59O1xuXG5hcHAuZ2V0KCcqJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHt9O1xuICAgIGNvbnN0IGNvbnRlbnQgPSBSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0cmluZyhcbiAgICAgICAgPFN0YXRpY1JvdXRlcj5cbiAgICAgICAgICAgIDxBcHAgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9Lz5cbiAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgKTtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGxvYWRIdG1sKGNvbnRlbnQpO1xuICAgIHJlcy5zZW5kKHRlbXBsYXRlKTtcbn0pO1xuXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygncHJvY2Vzcy5lbnYnLHBvcnQpO1xuICAgIGNvbnNvbGUubG9nKCdTZXJ2ZXIgaGFzIHN0YXJ0ZWQgb24gcG9ydDogJywgcG9ydCk7XG59KTsiLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN3aXRjaCwgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IEhvbWUgZnJvbSAnLi9wYWdlcy9jb21wb25lbnRzL0xvZ2luJztcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi9wYWdlcy9yb3V0ZXMvcm91dGVzJztcbmltcG9ydCB7U2VydmVyUm91dGVyfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Um91dGVzLz5cbiAgICAgICAgKTtcbiAgICB9XG59IiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGNvbnN0IHNpZ251cCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9zaWdudXAvJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBzaWduaW4gPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvc2lnbmluLyc7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgey4uLnBhcmFtc30pO1xufVxuXG5leHBvcnQgY29uc3QgbmV3X2V4cGVuc2UgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvbmV3X2V4cGVuc2UvJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRfZXhwZW5zZV9kYXRhID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL2dldF9leHBlbnNlX2RhdGEvJztcbiAgcmV0dXJuIGF4aW9zLmdldCh1cmwpO1xufSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IE5ld0V4cGVuc2UgZnJvbSAnLi9OZXdFeHBlbnNlJztcbmltcG9ydCB7Z2V0X2V4cGVuc2VfZGF0YX0gZnJvbSAnLi4vYXBpQ2FsbHMvQXBpQ2FsbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5sZWZ0TWVudUNsaWNrID0gdGhpcy5sZWZ0TWVudUNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5uZXdFeHBlbnNlID0gdGhpcy5uZXdFeHBlbnNlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNob3dXZWVrOiBmYWxzZSxcbiAgICAgIHNob3dNb250aDogdHJ1ZSxcbiAgICAgIHNob3dZZWFyOiBmYWxzZSxcbiAgICAgIHNob3dOZXdFeHBlbnNlOiBmYWxzZVxuICAgIH1cbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBcbiAgfVxuXG4gIGdldEV4cGVuc2UoKSB7XG4gICAgZ2V0X2V4cGVuc2VfZGF0YSgpLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3AuZGF0YSk7XG4gICAgICAvLyBzdGFuZGluZywgc3BlbnQsIHRyYW5zYWN0aW9uc1tuYW1lLCBwZXJjZW50XVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7Li4ucmVzcC5kYXRhfSk7XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBHZXQgRXhwZW5zZSBEZXRhaWxzJywgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gJ3dlZWsnKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtzaG93V2VlazogdHJ1ZSwgc2hvd01vbnRoOiBmYWxzZSwgc2hvd1llYXI6IGZhbHNlfSk7XG4gICAgfSBlbHNlIGlmIChmb3JtYXQgPT09ICdtb250aCcpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dXZWVrOiBmYWxzZSwgc2hvd01vbnRoOiB0cnVlLCBzaG93WWVhcjogZmFsc2V9KTtcbiAgICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ3llYXInKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtzaG93V2VlazogZmFsc2UsIHNob3dNb250aDogZmFsc2UsIHNob3dZZWFyOiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgbGVmdE1lbnVDbGljaygpIHtcbiAgICB0aGlzLnJlZnMuYmFja0Ryb3AuY2xhc3NMaXN0LnRvZ2dsZSgnYmFja0Ryb3AnKTtcbiAgICB0aGlzLnJlZnMucG9wdXAuY2xhc3NMaXN0LnRvZ2dsZSgncmlnaHQwJyk7XG4gICAgdGhpcy5yZWZzLmZpcnN0SGFsZkxhbmRpbmdUeHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2NhbGU5MCcpO1xuICAgIHRoaXMucmVmcy5vdGhlckhhbGZMYW5kaW5nVHh0LmNsYXNzTGlzdC50b2dnbGUoJ3NjYWxlOTAnKTtcbiAgfVxuXG4gIHJlbmRlckxlZnRNZW51QmFyKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudUJhclwiPlxuICAgICAgICA8ZGl2IHJlZj1cInBvcHVwXCJjbGFzc05hbWU9XCJwb3B1cCB6aTIgXCIgb25DbGljaz17dGhpcy5sZWZ0TWVudUNsaWNrfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGVCYXIgaW4tYmwgZmxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIj5TZXR0aW5nczwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51LW9wdGlvblwiPlNpZ24gSW48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIj5BYm91dCBNZTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBuZXdFeHBlbnNlKHZhbCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dOZXdFeHBlbnNlOiB2YWx9KTtcbiAgICB0aGlzLnJlZnMuYmFja0Ryb3AuY2xhc3NMaXN0LnRvZ2dsZSgnYmFja0Ryb3AnKTtcbiAgfVxuXG4gIGNsaWNrVmlld01vcmUoZSkge1xuICAgIHRoaXMuZ2V0RXhwZW5zZSgpO1xuICAgIHRoaXMucmVmcy5zdmdWaWV3TW9yZS5jbGFzc0xpc3QudG9nZ2xlKCdyb3RhdGVWaWV3TW9yZScpO1xuICAgIHRoaXMucmVmcy50cmFuc2FjdGVkQ2FyZC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93QWxsVHJhbnNhY3Rpb24nKTtcbiAgfVxuICByZW5kZXJUcmFuc2FjdGlvbmNhcmQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhbnNhY3RlZENhcmRJbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRJbm5lcmhlYWRpbmdcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRfbmFtZVwiPkZvb2Q8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0X3BlcmNlbnRcIj43NSU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzQmFyIHByb2dyZXNzQmFyMSBibCB0ZXh0Q2VudGVyXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3Nob3dXZWVrLCBzaG93TW9udGgsIHNob3dZZWFyLCBzaG93TmV3RXhwZW5zZSwgc3RhbmRpbmcgPSAxMDAsIHNwZW50ID0gNTB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IHJlZj1cImJhY2tEcm9wXCIgY2xhc3NOYW1lPVwidHJhbnNpdGlvbjJhIHppMSBcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLm5ld0V4cGVuc2UoZmFsc2UpfT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJMZWZ0TWVudUJhcigpfVxuICAgICAgICAgIDxkaXYgcmVmPVwibWFpbkNvbnRlbnRcIiBjbGFzc05hbWU9XCJtYWluQ29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXJzdC1oYWxmLWxhbmRpbmdcIj5cbiAgICAgICAgICAgICAgPGRpdiByZWY9XCJmaXJzdEhhbGZMYW5kaW5nVHh0XCIgY2xhc3NOYW1lPVwiZmlyc3RIYWxmVHh0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGFuZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGVmdC1tZW51LWNvbnRhaW5lclwiIG9uQ2xpY2s9e3RoaXMubGVmdE1lbnVDbGlja30+PGltZyBjbGFzc05hbWU9XCJsZWZ0LW1lbnVcIiBzcmM9XCIvaW1nL21lbnUuc3ZnXCIvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHsvKiA8c3BhbiBjbGFzc05hbWU9XCJyaWdodC1tZW51LWNvbnRhaW5lclwiIG9uQ2xpY2s9eygpID0+IHt0aGlzLnNldFN0YXRlKHt2aXNpYmxlUmlnaHRNZW51OiB0cnVlfSl9fT48aW1nIGNsYXNzTmFtZT1cInJpZ2h0LW1lbnVcIiBzcmM9XCIvaW1nL21lbnUuc3ZnXCIvPjwvc3Bhbj4gKi99XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkaW5nXCI+RXhwZW5zZSBIb21lPC9kaXY+XG4gICAgICAgICAgICAgICAge3N0YW5kaW5nID8gPGRpdiBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+eydTdGFuZGluZyA6IOKCuScgKyBzdGFuZGluZ308L2Rpdj4gOiBudWxsfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwZW5zZURheXNCdG5cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J2RheVR5cGVCdG4gJyArIChzaG93V2VlayA/ICdkYXlUeXBlQnRuLWFjdGl2ZScgOiAnJyl9IG9uQ2xpY2s9eygpID0+IHt0aGlzLmNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoJ3dlZWsnKX19PldlZWs8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoc2hvd01vbnRoID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdCgnbW9udGgnKX19Pk1vbnRoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnZGF5VHlwZUJ0biAnICsgKHNob3dZZWFyID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdCgneWVhcicpfX0+WWVhcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAge3NwZW50ID8gPGRpdiBjbGFzc05hbWU9XCJzdWJIZWFkaW5nXCI+eydTcGVudCA6IOKCuScgKyBzcGVudH08L2Rpdj4gOiBudWxsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHJlZj1cInRyYW5zYWN0ZWRDYXJkXCIgY2xhc3NOYW1lPVwidHJhbnNhY3RlZENhcmQgdHJhbnNpdGlvbjJhIFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYW5zYWN0U2Nyb2xsZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUcmFuc2FjdGlvbmNhcmQoKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlld01vcmVBcnJvd1wiIG9uQ2xpY2s9eygpID0+IHRoaXMuY2xpY2tWaWV3TW9yZSgpfT5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyByZWY9XCJzdmdWaWV3TW9yZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk03LjQxIDcuODRMMTIgMTIuNDJsNC41OS00LjU4TDE4IDkuMjVsLTYgNi02LTZ6XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdGhlci1oYWxmLWxhbmRpbmdcIj5cbiAgICAgICAgICAgICAgPGRpdiByZWY9XCJvdGhlckhhbGZMYW5kaW5nVHh0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXdDb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5ld0J0blwiIG9uQ2xpY2s9eygpID0+IHRoaXMubmV3RXhwZW5zZSh0cnVlKX0+QWRkIE5ldzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3Nob3dOZXdFeHBlbnNlID8gXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICA8TmV3RXhwZW5zZSBuZXdFeHBlbnNlPXt0aGlzLm5ld0V4cGVuc2V9Lz5cbiAgICAgICAgICA8L2Rpdj4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQge3NpZ251cCwgc2lnbmlufSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaWduVXAgPSB0aGlzLnNpZ25VcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2lnbkluID0gdGhpcy5zaWduSW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnXG4gICAgfVxuICB9XG5cbiAgaGVhZCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldD5cbiAgICAgICAgPHRpdGxlPkV4cGVuc2UgTG9naW48L3RpdGxlPlxuICAgICAgPC9IZWxtZXQ+XG4gICAgKTtcbiAgfVxuXG4gIHNpZ25VcCgpIHtcbiAgICBzaWdudXAoe3VzZXJuYW1lOiB0aGlzLnN0YXRlLnVzZXJuYW1lLCBwYXNzd29yZDogdGhpcy5zdGF0ZS5wYXNzd29yZH0pO1xuICB9XG5cbiAgc2lnbkluKCkge1xuICAgIHNpZ25pbih7dXNlcm5hbWU6IHRoaXMuc3RhdGUudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSkudGhlbigocmVzcCkgPT4ge1xuICAgICAgaWYgKHJlc3AuZGF0YSAmJiAhcmVzcC5kYXRhLmVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCgnL2hvbWUnLCB7fSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIFNpZ25JbicsIHJlc3ApO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gU2lnbkluJywgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuaGVhZCgpfVxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT5Mb2dpbjwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9J3VzZXJuYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS51c2VybmFtZX0gb25DaGFuZ2UgPSB7KGUpID0+IHRoaXMuc2V0U3RhdGUoe3VzZXJuYW1lOiBlLnRhcmdldC52YWx1ZX0pfSB0eXBlPVwidGV4dFwiLz5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj0ncGFzc3dvcmQnIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfSBvbkNoYW5nZSA9IHsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cGFzc3dvcmQ6IGUudGFyZ2V0LnZhbHVlfSl9IHR5cGU9XCJwYXNzd29yZFwiLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2lnbklufT5TaWduIEluPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNpZ25VcH0+U2lnbiBVcDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IExvZ2luOyIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtuZXdfZXhwZW5zZX0gZnJvbSAnLi4vYXBpQ2FsbHMvQXBpQ2FsbHMnO1xuLy8gaW1wb3J0IHtjb21tYUZvcm1hdHRlZH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdFeHBlbnNlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zZWxlY3RUeXBlID0gdGhpcy5zZWxlY3RUeXBlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdWJtaXROZXdFeHBlbnNlID0gdGhpcy5zdWJtaXROZXdFeHBlbnNlLmJpbmQodGhpcyk7XG4gICAgXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHR5cGU6ICdleHBlbnNlJyxcbiAgICAgIGFtb3VudDogJycsXG4gICAgICBjYXRlZ29yeTogJycsXG4gICAgICBkYXk6ICcnLCBcbiAgICAgIG1vbnRoOiAnJyxcbiAgICAgIHllYXI6ICcnLFxuICAgICAgZXJyb3I6IHt9XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0VHlwZSh0eXBlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dHlwZTogdHlwZX0pO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50KHZhbCl7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YW1vdW50OiB2YWx9KVxuICB9XG5cbiAgY2hhbmdlRGF0ZSh2YWwsIGN1cnJlbnQsIG5leHQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsuLi52YWx9KTtcbiAgICBpZiAoY3VycmVudCAmJiB2YWxbY3VycmVudF0ubGVuZ3RoID09PSAyICYmIG5leHQpIHtcbiAgICAgIHRoaXMucmVmc1tuZXh0XS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGlzVmFsaWREYXRlKCkge1xuICAgIGNvbnN0IHtkYXksIG1vbnRoLCB5ZWFyfSA9IHRoaXMuc3RhdGU7XG4gICAgdmFyIGRhdGVSZWcgPSAvXlswLTldWzAtOV0kLztcbiAgICBpZiAoIWRhdGVSZWcudGVzdChkYXkpIHx8ICFkYXRlUmVnLnRlc3QobW9udGgpIHx8ICFkYXRlUmVnLnRlc3QoeWVhcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoMjAwMCArIHBhcnNlSW50KHllYXIpLCBwYXJzZUludChtb250aCktMSwgcGFyc2VJbnQoZGF5KSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgdmFsaWRhdGVQYXJhbXMoKSB7XG4gICAgdmFyIHJlZyA9IC9eXFxkKyQvO1xuICAgIGNvbnN0IHthbW91bnQsIGNhdGVnb3J5fSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKCFhbW91bnQgfHwgIXJlZy50ZXN0KGFtb3VudCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB7YW1vdW50OiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBBbW91bnQnfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWNhdGVnb3J5KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2NhdGVnb3J5OiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBDYXRlZ29yeSd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc1ZhbGlkRGF0ZSgpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2RhdGU6ICdQbGVhc2UgcHJvdmlkZSBhIFZhbGlkIERhdGUnfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzdWJtaXROZXdFeHBlbnNlKCkge1xuICAgIGNvbnN0IHthbW91bnQsIGRheSwgbW9udGgsIHllYXIsIHR5cGUsIGNhdGVnb3J5fSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgaXNWYWxpZGF0aW9uU3VjY2VzcyA9IHRoaXMudmFsaWRhdGVQYXJhbXMoKTtcbiAgICBpZiAoaXNWYWxpZGF0aW9uU3VjY2Vzcykge1xuICAgICAgY29uc3QgcGFyYW1zID0geyBhbW91bnQsIHR5cGUsIGRhdGU6IHRoaXMuZGF0ZSwgY2F0ZWdvcnl9O1xuICAgICAgbmV3X2V4cGVuc2UocGFyYW1zKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm5ld0V4cGVuc2UoZmFsc2UpO1xuICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGNyZWF0ZSBuZXcgRXhwZW5zZScsZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7dHlwZSwgYW1vdW50LCBkYXksIG1vbnRoLCB5ZWFyLCBjYXRlZ29yeSwgZXJyb3J9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ld0V4cGVuc2VDb250YWluZXIgemkyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwSW5jQnRucyB0ZXh0Q2VudGVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnbmV3QnRuICcgKyAodHlwZSA9PT0gJ2V4cGVuc2UnID8gJ3NlbGVjdGVkVHlwZScgOiAnJyl9ICBvbkNsaWNrPXsoKSA9PiB0aGlzLnNlbGVjdFR5cGUoJ2V4cGVuc2UnKX0+RXhwZW5zZTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eyduZXdCdG4gJyArICh0eXBlID09PSAnaW5jb21lJyA/ICdzZWxlY3RlZFR5cGUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNlbGVjdFR5cGUoJ2luY29tZScpfT5JbmNvbWU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFtb3VudElucHV0XCI+XG4gICAgICAgIDxzcGFuPuKCuTwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkFtb3VudFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VBbW91bnQoZS50YXJnZXQudmFsdWUpfSB2YWx1ZT17YW1vdW50fS8+XG4gICAgICAgICAge2Vycm9yLmFtb3VudCA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuYW1vdW50fTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICBjbGFzc05hbWU9XCJjYXRlZ29yeUlucHV0XCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJDYXRlZ29yeVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7Y2F0ZWdvcnk6IGUudGFyZ2V0LnZhbHVlfSl9IHZhbHVlPXtjYXRlZ29yeX0vPlxuICAgICAgICAgIHtlcnJvci5jYXRlZ29yeSA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuY2F0ZWdvcnl9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BlbnREYXlcIj5cbiAgICAgICAgICA8aW5wdXQgcmVmPVwiZGF5XCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiRERcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7ZGF5OiBlLnRhcmdldC52YWx1ZX0sICdkYXknLCAnbW9udGgnKX0gdmFsdWU9e2RheX0vPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJtb250aFwiIGNsYXNzTmFtZT1cImRheUlwXCIgdHlwZT1cIm51bWJlclwiIG1heExlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIk1NXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe21vbnRoOiBlLnRhcmdldC52YWx1ZX0sICdtb250aCcsICd5ZWFyJyl9IHZhbHVlPXttb250aH0vPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJ5ZWFyXCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiWVlcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7eWVhcjogZS50YXJnZXQudmFsdWV9LCAneWVhcicpfSB2YWx1ZT17eWVhcn0vPlxuICAgICAgICAgIHtlcnJvci5kYXRlID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5kYXRlfTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Ym1pdEJ0blwiIG9uQ2xpY2s9e3RoaXMuc3VibWl0TmV3RXhwZW5zZX0+RG9uZTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCB7TmF2TGlua30gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNsYXNzIE5vdEZvdW5kIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLmJpbmQodGhpcyk7XG4gIH1cblxuICBoZWFkKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0PlxuICAgICAgICA8dGl0bGU+UGFnZSBOb3QgRm91bmQ8L3RpdGxlPlxuICAgICAgPC9IZWxtZXQ+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuaGVhZCgpfVxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT5Tb3JyeSwgdGhlIHBhZ2UgeW91IGFyZSBleHBlY3RpbmcgZG9lcyBub3QgZXhpc3QhPC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpIG9uQ2xpY2s9IHsoKSA9PiB0aGlzLnByb3BzLmhpc3RvcnkuZ29CYWNrKCl9PiBcbiAgICAgICAgICAgICAgQmFja1xuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPE5hdkxpbmsgdG89Jy8nPiBIb21lIDwvTmF2TGluaz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxOYXZMaW5rIHRvPScvbG9naW4nPiBMb2dpbiA8L05hdkxpbms+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTm90Rm91bmQ7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7QnJvd3NlclJvdXRlciwgU3dpdGNoLCBSb3V0ZX0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IExvZ2luIGZyb20gJy4uL2NvbXBvbmVudHMvTG9naW4nO1xuaW1wb3J0IE5vdEZvdW5kIGZyb20gJy4uL2NvbXBvbmVudHMvTm90Rm91bmQnXG5pbXBvcnQgSG9tZSBmcm9tICcuLi9jb21wb25lbnRzL0hvbWUnO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvJyBleGFjdCByZW5kZXI9eyhwcm9wcykgPT4gPEhvbWUgey4uLnByb3BzfS8+fS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD0nL2hvbWUnIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8SG9tZSB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvbG9naW4nIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8TG9naW4gey4uLnByb3BzfS8+fS8+XG4gICAgICAgICAgICA8Um91dGUgcmVuZGVyPXsocHJvcHMpID0+IDxOb3RGb3VuZCB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgPC9Td2l0Y2g+XG4gICAgKTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1oZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==