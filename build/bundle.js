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


var mongoose = __webpack_require__(/*! mongoose */ "mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true }).then(function () {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expenseSchema = new _mongoose2.default.Schema({
  amount: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    minlength: 8,
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
exports.default = expenseSchema;

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
exports.usersModel = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expenseModel = __webpack_require__(/*! ./expenseModel */ "./server/models/expenseModel.js");

var _expenseModel2 = _interopRequireDefault(_expenseModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersModel = exports.usersModel = _mongoose2.default.model('Users', {
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
    expense: [_expenseModel2.default]
});

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

var _userModel = __webpack_require__(/*! ./models/userModel */ "./server/models/userModel.js");

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
    var _request$body = request.body,
        _request$body$usernam = _request$body.username,
        username = _request$body$usernam === undefined ? '' : _request$body$usernam,
        _request$body$passwor = _request$body.password,
        password = _request$body$passwor === undefined ? '' : _request$body$passwor,
        _request$body$emailId = _request$body.emailId,
        emailId = _request$body$emailId === undefined ? '' : _request$body$emailId;

    var user = new _userModel.usersModel({
        username: username,
        password: password,
        emailId: emailId
    });
    _userModel.usersModel.find({ username: username }).then(function (res) {
        if (res.length > 0) {
            response.send({ error: true, msg: 'Username already Exists' });
        } else {
            user.save().then(function (doc) {
                request.session.user = doc.username;
                console.log(' doc.username', doc.username);
                response.send(doc);
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
    _userModel.usersModel.find({ username: username, password: password }).then(function (res) {
        if (res.length > 0) {
            request.session.user = username;
            response.send({ error: false, msg: 'success' });
        } else {
            response.send({ error: true, msg: 'No user account found' });
        }
    }, function (e) {
        response.send(e);
        console.log(e);
    });
});

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

app.post('/new_expense', function (request, response) {
    var _request$body3 = request.body,
        amount = _request$body3.amount,
        category = _request$body3.category,
        date = _request$body3.date,
        type = _request$body3.type;

    var newExpense = { amount: amount, category: category, date: date, type: type };
    _userModel.usersModel.findOneAndUpdate({ username: 'dhilipk13' }, { $push: { expense: newExpense } }, function (err, document) {
        if (err) {
            console.log('Failed to save new Expense', err);
        } else {
            var lastIndex = document._doc.expense.length - 1;
            response.send(_extends({ error: false }, document._doc.expense[lastIndex]._doc));
        }
    });
});

app.get('/get_expense_data', function (request, response) {
    _userModel.usersModel.findOne({ username: 'dhilipk13' }).then(function (doc) {
        response.send(_extends({}, doc._doc.expense));
    }, function (err) {
        console.log('Failed to get Expense Details', err);
    });
});
var loadHtml = function loadHtml(content) {
    var helmet = _reactHelmet2.default.renderStatic();
    return '\n        <html>\n            <head>\n                ' + helmet.meta.toString() + '\n                ' + helmet.title.toString() + '\n                <meta name="viewport" content="width=device-width, initial-scale=1.0">\n                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">\n                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js">\n                <link rel="stylesheet" type="text/css" href="/styles/common.css">\n                <link rel="stylesheet" type="text/css" href="/styles/home.css">\n                <link rel="stylesheet" type="text/css" href="/styles/new_expense.css">\n                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">\n            </head>\n            <body>\n                <div id="root">' + content + '</div>\n                <script src="client_bundle.js"></script>\n            </body>\n        </html>';
};

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
      showWeek: true,
      showMonth: false,
      showYear: false,
      showNewExpense: false
    };
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      (0, _ApiCalls.get_expense_data)().then(function (resp) {
        console.log(resp.data);
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
      this.refs.svgViewMore.classList.toggle('rotateViewMore');
      this.refs.transactedCard.classList.toggle('showAllTransaction');
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
                      _react2.default.createElement(
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
                        _react2.default.createElement(
                          'div',
                          { className: 'progressBar progressBar1 bl textCenter' },
                          '75%'
                        )
                      ),
                      _react2.default.createElement('div', { className: 'transactedCardInner' }),
                      _react2.default.createElement('div', { className: 'transactedCardInner' }),
                      _react2.default.createElement('div', { className: 'transactedCardInner' }),
                      _react2.default.createElement('div', { className: 'transactedCardInner' }),
                      _react2.default.createElement('div', { className: 'transactedCardInner' })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbmZpZy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2RiL21vbmdvb3NlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvZXhwZW5zZU1vZGVsLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvdXNlck1vZGVsLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvYXBpQ2FsbHMvQXBpQ2FsbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2NvbXBvbmVudHMvSG9tZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9Mb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvY29tcG9uZW50cy9OZXdFeHBlbnNlLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05vdEZvdW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9yb3V0ZXMvcm91dGVzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLXNlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiJdLCJuYW1lcyI6WyJlbnYiLCJwcm9jZXNzIiwiUE9SVCIsIk1PTkdPTEFCX1VSSSIsIm1vbmdvb3NlIiwicmVxdWlyZSIsIlByb21pc2UiLCJnbG9iYWwiLCJjb25uZWN0IiwidXNlTmV3VXJsUGFyc2VyIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlIiwibW9kdWxlIiwiZXhwb3J0cyIsImV4cGVuc2VTY2hlbWEiLCJTY2hlbWEiLCJhbW91bnQiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ0cmltIiwiY2F0ZWdvcnkiLCJtaW5sZW5ndGgiLCJkZWZhdWx0IiwiZGF0ZSIsIkRhdGUiLCJub3ciLCJ1c2Vyc01vZGVsIiwibW9kZWwiLCJ1c2VybmFtZSIsImVtYWlsSWQiLCJwYXNzd29yZCIsImV4cGVuc2UiLCJzZXNzaW9uIiwiYXBwIiwicG9ydCIsInVzZSIsInNlY3JldCIsInJlc2F2ZSIsInNhdmVVbmluaXRpYWxpemVkIiwiYm9keVBhcnNlciIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJleHByZXNzIiwic3RhdGljIiwicG9zdCIsInJlcXVlc3QiLCJyZXNwb25zZSIsImJvZHkiLCJ1c2VyIiwiZmluZCIsInJlcyIsImxlbmd0aCIsInNlbmQiLCJlcnJvciIsIm1zZyIsInNhdmUiLCJkb2MiLCJzdGF0dXMiLCJnZXQiLCJyZXEiLCJjb250ZXh0IiwiY29udGVudCIsIlJlYWN0RE9NU2VydmVyIiwicmVuZGVyVG9TdHJpbmciLCJ1cmwiLCJ0ZW1wbGF0ZSIsImxvYWRIdG1sIiwibmV3RXhwZW5zZSIsImZpbmRPbmVBbmRVcGRhdGUiLCIkcHVzaCIsImVyciIsImRvY3VtZW50IiwibGFzdEluZGV4IiwiX2RvYyIsImZpbmRPbmUiLCJoZWxtZXQiLCJIZWxtZXQiLCJyZW5kZXJTdGF0aWMiLCJtZXRhIiwidG9TdHJpbmciLCJ0aXRsZSIsImxpc3RlbiIsIkFwcCIsIkNvbXBvbmVudCIsInNpZ251cCIsInBhcmFtcyIsImF4aW9zIiwic2lnbmluIiwibmV3X2V4cGVuc2UiLCJnZXRfZXhwZW5zZV9kYXRhIiwiSG9tZSIsInByb3BzIiwibGVmdE1lbnVDbGljayIsImJpbmQiLCJzdGF0ZSIsInNob3dXZWVrIiwic2hvd01vbnRoIiwic2hvd1llYXIiLCJzaG93TmV3RXhwZW5zZSIsInJlc3AiLCJkYXRhIiwic2V0U3RhdGUiLCJmb3JtYXQiLCJyZWZzIiwiYmFja0Ryb3AiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJwb3B1cCIsImZpcnN0SGFsZkxhbmRpbmdUeHQiLCJvdGhlckhhbGZMYW5kaW5nVHh0IiwidmFsIiwic3ZnVmlld01vcmUiLCJ0cmFuc2FjdGVkQ2FyZCIsInN0YW5kaW5nIiwic3BlbnQiLCJyZW5kZXJMZWZ0TWVudUJhciIsImNoYW5nZUV4cGVuc2VEYXlGb3JtYXQiLCJjbGlja1ZpZXdNb3JlIiwiTG9naW4iLCJoZWFkIiwic2lnblVwIiwic2lnbkluIiwiaGlzdG9yeSIsInB1c2giLCJjYXRjaCIsInRhcmdldCIsInZhbHVlIiwiTmV3RXhwZW5zZSIsInNlbGVjdFR5cGUiLCJzdWJtaXROZXdFeHBlbnNlIiwiZGF5IiwibW9udGgiLCJ5ZWFyIiwiY3VycmVudCIsIm5leHQiLCJmb2N1cyIsImRhdGVSZWciLCJ0ZXN0IiwicGFyc2VJbnQiLCJyZWciLCJpc1ZhbGlkRGF0ZSIsImlzVmFsaWRhdGlvblN1Y2Nlc3MiLCJ2YWxpZGF0ZVBhcmFtcyIsImNoYW5nZUFtb3VudCIsImNoYW5nZURhdGUiLCJOb3RGb3VuZCIsImdvQmFjayJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztB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Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsNkMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2VydmVyL3NlcnZlci5qc1wiKTtcbiIsInZhciBlbnYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnO1xuXG5pZiAoZW52ID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gIHByb2Nlc3MuZW52LlBPUlQgPSA0MDAwO1xuICBwcm9jZXNzLmVudi5NT05HT0xBQl9VUkkgPSAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9leHBlbnNlJztcbn0gZWxzZSB7XG4gIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSA9ICdtb25nb2RiOi8vZGhpbGlwazEzOmRoaWxpcGsxM0BkczI0NzMxMC5tbGFiLmNvbTo0NzMxMC9leHBlbnNlJztcbn1cbmV4cG9ydCBkZWZhdWx0IGVudjsiLCJ2YXIgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xubW9uZ29vc2UuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xubW9uZ29vc2UuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0xBQl9VUkksIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlIH0pLnRoZW4oKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gRGInKTtcbn0sKGUpPT4ge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHttb25nb29zZX07IiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcblxuY29uc3QgZXhwZW5zZVNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xuICBhbW91bnQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZVxuICB9LFxuICBjYXRlZ29yeToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBtaW5sZW5ndGg6IDgsXG4gICAgICB0cmltOiB0cnVlLFxuICAgICAgZGVmYXVsdDogJ290aGVycydcbiAgfSxcbiAgdHlwZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZSxcbiAgICBkZWZhdWx0OiAnZXhwZW5zZSdcbiAgfSxcbiAgZGF0ZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZSxcbiAgICBkZWZhdWx0OiBEYXRlLm5vdygpXG4gIH1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgZXhwZW5zZVNjaGVtYTsiLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IGV4cGVuc2VTY2hlbWEgZnJvbSAnLi9leHBlbnNlTW9kZWwnO1xuXG5leHBvcnQgY29uc3QgdXNlcnNNb2RlbCA9IG1vbmdvb3NlLm1vZGVsKCdVc2VycycsIHtcbiAgICB1c2VybmFtZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW5sZW5ndGg6IDUsXG4gICAgICAgIHRyaW06IHRydWVcbiAgICB9LFxuICAgIGVtYWlsSWQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHRyaW06IHRydWVcbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbmxlbmd0aDogOCxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgZXhwZW5zZTogW2V4cGVuc2VTY2hlbWFdXG59KTtcbiIsImltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0IGVudiBmcm9tICcuL2NvbmZpZy9jb25maWcnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NU2VydmVyIGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbnZhciBzZXNzaW9uID0gcmVxdWlyZSgnZXhwcmVzcy1zZXNzaW9uJyk7XG5cbmltcG9ydCBBcHAgZnJvbSAnLi4vc3JjL2FwcCdcbmltcG9ydCBtb25nb29zZSBmcm9tICcuL2RiL21vbmdvb3NlJztcbmltcG9ydCB7dXNlcnNNb2RlbH0gZnJvbSAnLi9tb2RlbHMvdXNlck1vZGVsJztcblxuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVDtcblxuYXBwLnVzZShzZXNzaW9uKHtcbiAgICBzZWNyZXQ6ICdkaGlsaXBMb2NhbCcsXG4gICAgcmVzYXZlOiBmYWxzZSxcbiAgICBzYXZlVW5pbml0aWFsaXplZDogdHJ1ZVxuICB9KSlcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYygnYnVpbGQvcHVibGljJykpO1xuYXBwLnVzZSgnL3N0eWxlcycsIGV4cHJlc3Muc3RhdGljKCdzcmMvcGFnZXMvc3R5bGVzJykpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYygnc3JjL3BhZ2VzL3N0YXRpYycpKTtcblxuYXBwLnBvc3QoJy9zaWdudXAnLCAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgIGNvbnN0IHt1c2VybmFtZSA9ICcnLCBwYXNzd29yZCA9ICcnLCBlbWFpbElkID0gJyd9ID0gcmVxdWVzdC5ib2R5O1xuICAgIHZhciB1c2VyID0gbmV3IHVzZXJzTW9kZWwoe1xuICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgZW1haWxJZDogZW1haWxJZFxuICAgIH0pO1xuICAgIHVzZXJzTW9kZWwuZmluZCh7dXNlcm5hbWU6IHVzZXJuYW1lfSkudGhlbigocmVzKT0+IHtcbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHtlcnJvcjogdHJ1ZSwgbXNnOiAnVXNlcm5hbWUgYWxyZWFkeSBFeGlzdHMnfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNlc3Npb24udXNlciA9IGRvYy51c2VybmFtZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnIGRvYy51c2VybmFtZScsIGRvYy51c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZChkb2MpO1xuICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zdGF0dXMoNTAwKS5zZW5kKGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sIChlKSA9PiB7XG4gICAgICAgIHJlc3BvbnNlLnNlbmQoZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH0pO1xufSk7XG5cbmFwcC5wb3N0KCcvc2lnbmluJywgKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3Qge3VzZXJuYW1lID0gJycsIHBhc3N3b3JkID0gJycsIGVtYWlsSWQgPSAnJ30gPSByZXF1ZXN0LmJvZHk7XG4gICAgY29uc29sZS5sb2cocmVxdWVzdC5zZXNzaW9uLnVzZXIpO1xuICAgICB1c2Vyc01vZGVsLmZpbmQoe3VzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkfSkudGhlbigocmVzKT0+IHtcbiAgICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVxdWVzdC5zZXNzaW9uLnVzZXIgPSB1c2VybmFtZTtcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQoe2Vycm9yOiBmYWxzZSwgbXNnOiAnc3VjY2Vzcyd9KTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHtlcnJvcjp0cnVlLCBtc2c6ICdObyB1c2VyIGFjY291bnQgZm91bmQnfSk7XG4gICAgICAgICB9XG4gICAgIH0sIChlKSA9PiB7XG4gICAgICAgICByZXNwb25zZS5zZW5kKGUpO1xuICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgIH0pO1xuIH0pO1xuXG5hcHAuZ2V0KCcqJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHt9O1xuICAgIGNvbnN0IGNvbnRlbnQgPSBSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0cmluZyhcbiAgICAgICAgPFN0YXRpY1JvdXRlcj5cbiAgICAgICAgICAgIDxBcHAgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9Lz5cbiAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgKTtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGxvYWRIdG1sKGNvbnRlbnQpO1xuICAgIHJlcy5zZW5kKHRlbXBsYXRlKTtcbn0pO1xuXG5hcHAucG9zdCgnL25ld19leHBlbnNlJywgKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3QgeyBhbW91bnQsIGNhdGVnb3J5LCBkYXRlLCB0eXBlfSA9IHJlcXVlc3QuYm9keTtcbiAgICBjb25zdCBuZXdFeHBlbnNlID0ge2Ftb3VudCwgY2F0ZWdvcnksIGRhdGUsIHR5cGV9XG4gICAgdXNlcnNNb2RlbC5maW5kT25lQW5kVXBkYXRlKFxuICAgICAgICB7IHVzZXJuYW1lOiAnZGhpbGlwazEzJ30sXG4gICAgICAgIHsgJHB1c2g6IHtleHBlbnNlOiBuZXdFeHBlbnNlfX0sXG4gICAgICAgIGZ1bmN0aW9uIChlcnIsIGRvY3VtZW50KSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBzYXZlIG5ldyBFeHBlbnNlJywgZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gZG9jdW1lbnQuX2RvYy5leHBlbnNlLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZCh7ZXJyb3I6IGZhbHNlLC4uLmRvY3VtZW50Ll9kb2MuZXhwZW5zZVtsYXN0SW5kZXhdLl9kb2N9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59KTtcblxuYXBwLmdldCgnL2dldF9leHBlbnNlX2RhdGEnLCAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICB1c2Vyc01vZGVsLmZpbmRPbmUoeyB1c2VybmFtZTogJ2RoaWxpcGsxMyd9KS50aGVuKChkb2MpID0+IHtcbiAgICAgICAgcmVzcG9uc2Uuc2VuZCh7Li4uZG9jLl9kb2MuZXhwZW5zZX0pO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBnZXQgRXhwZW5zZSBEZXRhaWxzJywgZXJyKTtcbiAgICB9KTtcbn0pO1xuY29uc3QgbG9hZEh0bWwgPSAoY29udGVudCkgPT4ge1xuICAgIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcbiAgICByZXR1cm4gKGBcbiAgICAgICAgPGh0bWw+XG4gICAgICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgICAgICAke2hlbG1ldC5tZXRhLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgJHtoZWxtZXQudGl0bGUudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvdHdpdHRlci1ib290c3RyYXAvNC4xLjMvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy90d2l0dGVyLWJvb3RzdHJhcC80LjEuMy9qcy9ib290c3RyYXAuYnVuZGxlLm1pbi5qc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3N0eWxlcy9jb21tb24uY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL2hvbWUuY3NzXCI+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvc3R5bGVzL25ld19leHBlbnNlLmNzc1wiPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9T3BlbitTYW5zXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICAgICAgICAgICAgPC9oZWFkPlxuICAgICAgICAgICAgPGJvZHk+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJvb3RcIj4ke2NvbnRlbnR9PC9kaXY+XG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJjbGllbnRfYnVuZGxlLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICA8L2JvZHk+XG4gICAgICAgIDwvaHRtbD5gKTtcbn07XG5cbmFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdwcm9jZXNzLmVudicscG9ydCk7XG4gICAgY29uc29sZS5sb2coJ1NlcnZlciBoYXMgc3RhcnRlZCBvbiBwb3J0OiAnLCBwb3J0KTtcbn0pOyIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3dpdGNoLCBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgSG9tZSBmcm9tICcuL3BhZ2VzL2NvbXBvbmVudHMvTG9naW4nO1xuaW1wb3J0IFJvdXRlcyBmcm9tICcuL3BhZ2VzL3JvdXRlcy9yb3V0ZXMnO1xuaW1wb3J0IHtTZXJ2ZXJSb3V0ZXJ9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSb3V0ZXMvPlxuICAgICAgICApO1xuICAgIH1cbn0iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgY29uc3Qgc2lnbnVwID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB1cmwgPSAnL3NpZ251cC8nO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHsuLi5wYXJhbXN9KTtcbn1cblxuZXhwb3J0IGNvbnN0IHNpZ25pbiA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9zaWduaW4vJztcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCB7Li4ucGFyYW1zfSk7XG59XG5cbmV4cG9ydCBjb25zdCBuZXdfZXhwZW5zZSA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdXJsID0gJy9uZXdfZXhwZW5zZS8nO1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwsIHsuLi5wYXJhbXN9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldF9leHBlbnNlX2RhdGEgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHVybCA9ICcvZ2V0X2V4cGVuc2VfZGF0YS8nO1xuICByZXR1cm4gYXhpb3MuZ2V0KHVybCk7XG59IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgTmV3RXhwZW5zZSBmcm9tICcuL05ld0V4cGVuc2UnO1xuaW1wb3J0IHtnZXRfZXhwZW5zZV9kYXRhfSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmxlZnRNZW51Q2xpY2sgPSB0aGlzLmxlZnRNZW51Q2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm5ld0V4cGVuc2UgPSB0aGlzLm5ld0V4cGVuc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2hvd1dlZWs6IHRydWUsXG4gICAgICBzaG93TW9udGg6IGZhbHNlLFxuICAgICAgc2hvd1llYXI6IGZhbHNlLFxuICAgICAgc2hvd05ld0V4cGVuc2U6IGZhbHNlXG4gICAgfVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGdldF9leHBlbnNlX2RhdGEoKS50aGVuKChyZXNwKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwLmRhdGEpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Li4ucmVzcC5kYXRhfSk7XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBHZXQgRXhwZW5zZSBEZXRhaWxzJywgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUV4cGVuc2VEYXlGb3JtYXQoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gJ3dlZWsnKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtzaG93V2VlazogdHJ1ZSwgc2hvd01vbnRoOiBmYWxzZSwgc2hvd1llYXI6IGZhbHNlfSk7XG4gICAgfSBlbHNlIGlmIChmb3JtYXQgPT09ICdtb250aCcpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dXZWVrOiBmYWxzZSwgc2hvd01vbnRoOiB0cnVlLCBzaG93WWVhcjogZmFsc2V9KTtcbiAgICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ3llYXInKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtzaG93V2VlazogZmFsc2UsIHNob3dNb250aDogZmFsc2UsIHNob3dZZWFyOiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgbGVmdE1lbnVDbGljaygpIHtcbiAgICB0aGlzLnJlZnMuYmFja0Ryb3AuY2xhc3NMaXN0LnRvZ2dsZSgnYmFja0Ryb3AnKTtcbiAgICB0aGlzLnJlZnMucG9wdXAuY2xhc3NMaXN0LnRvZ2dsZSgncmlnaHQwJyk7XG4gICAgdGhpcy5yZWZzLmZpcnN0SGFsZkxhbmRpbmdUeHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2NhbGU5MCcpO1xuICAgIHRoaXMucmVmcy5vdGhlckhhbGZMYW5kaW5nVHh0LmNsYXNzTGlzdC50b2dnbGUoJ3NjYWxlOTAnKTtcbiAgfVxuXG4gIHJlbmRlckxlZnRNZW51QmFyKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudUJhclwiPlxuICAgICAgICA8ZGl2IHJlZj1cInBvcHVwXCJjbGFzc05hbWU9XCJwb3B1cCB6aTIgXCIgb25DbGljaz17dGhpcy5sZWZ0TWVudUNsaWNrfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGVCYXIgaW4tYmwgZmxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIj5TZXR0aW5nczwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51LW9wdGlvblwiPlNpZ24gSW48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1vcHRpb25cIj5BYm91dCBNZTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBuZXdFeHBlbnNlKHZhbCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dOZXdFeHBlbnNlOiB2YWx9KTtcbiAgICB0aGlzLnJlZnMuYmFja0Ryb3AuY2xhc3NMaXN0LnRvZ2dsZSgnYmFja0Ryb3AnKTtcbiAgfVxuXG4gIGNsaWNrVmlld01vcmUoZSkge1xuICAgIHRoaXMucmVmcy5zdmdWaWV3TW9yZS5jbGFzc0xpc3QudG9nZ2xlKCdyb3RhdGVWaWV3TW9yZScpO1xuICAgIHRoaXMucmVmcy50cmFuc2FjdGVkQ2FyZC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93QWxsVHJhbnNhY3Rpb24nKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7c2hvd1dlZWssIHNob3dNb250aCwgc2hvd1llYXIsIHNob3dOZXdFeHBlbnNlLCBzdGFuZGluZyA9IDEwMCwgc3BlbnQgPSA1MH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgcmVmPVwiYmFja0Ryb3BcIiBjbGFzc05hbWU9XCJ0cmFuc2l0aW9uMmEgemkxIFwiIG9uQ2xpY2s9eygpID0+IHRoaXMubmV3RXhwZW5zZShmYWxzZSl9PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHt0aGlzLnJlbmRlckxlZnRNZW51QmFyKCl9XG4gICAgICAgICAgPGRpdiByZWY9XCJtYWluQ29udGVudFwiIGNsYXNzTmFtZT1cIm1haW5Db250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpcnN0LWhhbGYtbGFuZGluZ1wiPlxuICAgICAgICAgICAgICA8ZGl2IHJlZj1cImZpcnN0SGFsZkxhbmRpbmdUeHRcIiBjbGFzc05hbWU9XCJmaXJzdEhhbGZUeHRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YW5kaW5nXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsZWZ0LW1lbnUtY29udGFpbmVyXCIgb25DbGljaz17dGhpcy5sZWZ0TWVudUNsaWNrfT48aW1nIGNsYXNzTmFtZT1cImxlZnQtbWVudVwiIHNyYz1cIi9pbWcvbWVudS5zdmdcIi8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgey8qIDxzcGFuIGNsYXNzTmFtZT1cInJpZ2h0LW1lbnUtY29udGFpbmVyXCIgb25DbGljaz17KCkgPT4ge3RoaXMuc2V0U3RhdGUoe3Zpc2libGVSaWdodE1lbnU6IHRydWV9KX19PjxpbWcgY2xhc3NOYW1lPVwicmlnaHQtbWVudVwiIHNyYz1cIi9pbWcvbWVudS5zdmdcIi8+PC9zcGFuPiAqL31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRpbmdcIj5FeHBlbnNlIEhvbWU8L2Rpdj5cbiAgICAgICAgICAgICAgICB7c3RhbmRpbmcgPyA8ZGl2IGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj57J1N0YW5kaW5nIDog4oK5JyArIHN0YW5kaW5nfTwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBlbnNlRGF5c0J0blwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnZGF5VHlwZUJ0biAnICsgKHNob3dXZWVrID8gJ2RheVR5cGVCdG4tYWN0aXZlJyA6ICcnKX0gb25DbGljaz17KCkgPT4ge3RoaXMuY2hhbmdlRXhwZW5zZURheUZvcm1hdCgnd2VlaycpfX0+V2Vlazwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17J2RheVR5cGVCdG4gJyArIChzaG93TW9udGggPyAnZGF5VHlwZUJ0bi1hY3RpdmUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB7dGhpcy5jaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KCdtb250aCcpfX0+TW9udGg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydkYXlUeXBlQnRuICcgKyAoc2hvd1llYXIgPyAnZGF5VHlwZUJ0bi1hY3RpdmUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB7dGhpcy5jaGFuZ2VFeHBlbnNlRGF5Rm9ybWF0KCd5ZWFyJyl9fT5ZZWFyPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICB7c3BlbnQgPyA8ZGl2IGNsYXNzTmFtZT1cInN1YkhlYWRpbmdcIj57J1NwZW50IDog4oK5JyArIHNwZW50fTwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPVwidHJhbnNhY3RlZENhcmRcIiBjbGFzc05hbWU9XCJ0cmFuc2FjdGVkQ2FyZCB0cmFuc2l0aW9uMmEgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhbnNhY3RTY3JvbGxlclwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhbnNhY3RlZENhcmRJbm5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkSW5uZXJoZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdF9uYW1lXCI+Rm9vZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0X3BlcmNlbnRcIj43NSU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZ3Jlc3NCYXIgcHJvZ3Jlc3NCYXIxIGJsIHRleHRDZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgNzUlXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYW5zYWN0ZWRDYXJkSW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYW5zYWN0ZWRDYXJkSW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYW5zYWN0ZWRDYXJkSW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYW5zYWN0ZWRDYXJkSW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYW5zYWN0ZWRDYXJkSW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlld01vcmVBcnJvd1wiIG9uQ2xpY2s9eygpID0+IHRoaXMuY2xpY2tWaWV3TW9yZSgpfT5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyByZWY9XCJzdmdWaWV3TW9yZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk03LjQxIDcuODRMMTIgMTIuNDJsNC41OS00LjU4TDE4IDkuMjVsLTYgNi02LTZ6XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdGhlci1oYWxmLWxhbmRpbmdcIj5cbiAgICAgICAgICAgICAgPGRpdiByZWY9XCJvdGhlckhhbGZMYW5kaW5nVHh0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXdDb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV3XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5ld0J0blwiIG9uQ2xpY2s9eygpID0+IHRoaXMubmV3RXhwZW5zZSh0cnVlKX0+QWRkIE5ldzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3Nob3dOZXdFeHBlbnNlID8gXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICA8TmV3RXhwZW5zZSBuZXdFeHBlbnNlPXt0aGlzLm5ld0V4cGVuc2V9Lz5cbiAgICAgICAgICA8L2Rpdj4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQge3NpZ251cCwgc2lnbmlufSBmcm9tICcuLi9hcGlDYWxscy9BcGlDYWxscyc7XG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaWduVXAgPSB0aGlzLnNpZ25VcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2lnbkluID0gdGhpcy5zaWduSW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnXG4gICAgfVxuICB9XG5cbiAgaGVhZCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldD5cbiAgICAgICAgPHRpdGxlPkV4cGVuc2UgTG9naW48L3RpdGxlPlxuICAgICAgPC9IZWxtZXQ+XG4gICAgKTtcbiAgfVxuXG4gIHNpZ25VcCgpIHtcbiAgICBzaWdudXAoe3VzZXJuYW1lOiB0aGlzLnN0YXRlLnVzZXJuYW1lLCBwYXNzd29yZDogdGhpcy5zdGF0ZS5wYXNzd29yZH0pO1xuICB9XG5cbiAgc2lnbkluKCkge1xuICAgIHNpZ25pbih7dXNlcm5hbWU6IHRoaXMuc3RhdGUudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSkudGhlbigocmVzcCkgPT4ge1xuICAgICAgaWYgKHJlc3AuZGF0YSAmJiAhcmVzcC5kYXRhLmVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCgnL2hvbWUnLCB7fSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIFNpZ25JbicsIHJlc3ApO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gU2lnbkluJywgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuaGVhZCgpfVxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT5Mb2dpbjwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9J3VzZXJuYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS51c2VybmFtZX0gb25DaGFuZ2UgPSB7KGUpID0+IHRoaXMuc2V0U3RhdGUoe3VzZXJuYW1lOiBlLnRhcmdldC52YWx1ZX0pfSB0eXBlPVwidGV4dFwiLz5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj0ncGFzc3dvcmQnIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfSBvbkNoYW5nZSA9IHsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cGFzc3dvcmQ6IGUudGFyZ2V0LnZhbHVlfSl9IHR5cGU9XCJwYXNzd29yZFwiLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2lnbklufT5TaWduIEluPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNpZ25VcH0+U2lnbiBVcDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IExvZ2luOyIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtuZXdfZXhwZW5zZX0gZnJvbSAnLi4vYXBpQ2FsbHMvQXBpQ2FsbHMnO1xuLy8gaW1wb3J0IHtjb21tYUZvcm1hdHRlZH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdFeHBlbnNlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zZWxlY3RUeXBlID0gdGhpcy5zZWxlY3RUeXBlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdWJtaXROZXdFeHBlbnNlID0gdGhpcy5zdWJtaXROZXdFeHBlbnNlLmJpbmQodGhpcyk7XG4gICAgXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHR5cGU6ICdleHBlbnNlJyxcbiAgICAgIGFtb3VudDogJycsXG4gICAgICBjYXRlZ29yeTogJycsXG4gICAgICBkYXk6ICcnLCBcbiAgICAgIG1vbnRoOiAnJyxcbiAgICAgIHllYXI6ICcnLFxuICAgICAgZXJyb3I6IHt9XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0VHlwZSh0eXBlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dHlwZTogdHlwZX0pO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50KHZhbCl7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YW1vdW50OiB2YWx9KVxuICB9XG5cbiAgY2hhbmdlRGF0ZSh2YWwsIGN1cnJlbnQsIG5leHQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsuLi52YWx9KTtcbiAgICBpZiAoY3VycmVudCAmJiB2YWxbY3VycmVudF0ubGVuZ3RoID09PSAyICYmIG5leHQpIHtcbiAgICAgIHRoaXMucmVmc1tuZXh0XS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGlzVmFsaWREYXRlKCkge1xuICAgIGNvbnN0IHtkYXksIG1vbnRoLCB5ZWFyfSA9IHRoaXMuc3RhdGU7XG4gICAgdmFyIGRhdGVSZWcgPSAvXlswLTldWzAtOV0kLztcbiAgICBpZiAoIWRhdGVSZWcudGVzdChkYXkpIHx8ICFkYXRlUmVnLnRlc3QobW9udGgpIHx8ICFkYXRlUmVnLnRlc3QoeWVhcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoMjAwMCArIHBhcnNlSW50KHllYXIpLCBwYXJzZUludChtb250aCktMSwgcGFyc2VJbnQoZGF5KSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgdmFsaWRhdGVQYXJhbXMoKSB7XG4gICAgdmFyIHJlZyA9IC9eXFxkKyQvO1xuICAgIGNvbnN0IHthbW91bnQsIGNhdGVnb3J5fSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKCFhbW91bnQgfHwgIXJlZy50ZXN0KGFtb3VudCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB7YW1vdW50OiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBBbW91bnQnfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWNhdGVnb3J5KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2NhdGVnb3J5OiAnUGxlYXNlIHByb3ZpZGUgYSBWYWxpZCBDYXRlZ29yeSd9fSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc1ZhbGlkRGF0ZSgpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjoge2RhdGU6ICdQbGVhc2UgcHJvdmlkZSBhIFZhbGlkIERhdGUnfX0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzdWJtaXROZXdFeHBlbnNlKCkge1xuICAgIGNvbnN0IHthbW91bnQsIGRheSwgbW9udGgsIHllYXIsIHR5cGUsIGNhdGVnb3J5fSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgaXNWYWxpZGF0aW9uU3VjY2VzcyA9IHRoaXMudmFsaWRhdGVQYXJhbXMoKTtcbiAgICBpZiAoaXNWYWxpZGF0aW9uU3VjY2Vzcykge1xuICAgICAgY29uc3QgcGFyYW1zID0geyBhbW91bnQsIHR5cGUsIGRhdGU6IHRoaXMuZGF0ZSwgY2F0ZWdvcnl9O1xuICAgICAgbmV3X2V4cGVuc2UocGFyYW1zKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm5ld0V4cGVuc2UoZmFsc2UpO1xuICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGNyZWF0ZSBuZXcgRXhwZW5zZScsZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7dHlwZSwgYW1vdW50LCBkYXksIG1vbnRoLCB5ZWFyLCBjYXRlZ29yeSwgZXJyb3J9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5ld0V4cGVuc2VDb250YWluZXIgemkyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwSW5jQnRucyB0ZXh0Q2VudGVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsnbmV3QnRuICcgKyAodHlwZSA9PT0gJ2V4cGVuc2UnID8gJ3NlbGVjdGVkVHlwZScgOiAnJyl9ICBvbkNsaWNrPXsoKSA9PiB0aGlzLnNlbGVjdFR5cGUoJ2V4cGVuc2UnKX0+RXhwZW5zZTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eyduZXdCdG4gJyArICh0eXBlID09PSAnaW5jb21lJyA/ICdzZWxlY3RlZFR5cGUnIDogJycpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNlbGVjdFR5cGUoJ2luY29tZScpfT5JbmNvbWU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFtb3VudElucHV0XCI+XG4gICAgICAgIDxzcGFuPuKCuTwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkFtb3VudFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5jaGFuZ2VBbW91bnQoZS50YXJnZXQudmFsdWUpfSB2YWx1ZT17YW1vdW50fS8+XG4gICAgICAgICAge2Vycm9yLmFtb3VudCA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuYW1vdW50fTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICBjbGFzc05hbWU9XCJjYXRlZ29yeUlucHV0XCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJDYXRlZ29yeVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7Y2F0ZWdvcnk6IGUudGFyZ2V0LnZhbHVlfSl9IHZhbHVlPXtjYXRlZ29yeX0vPlxuICAgICAgICAgIHtlcnJvci5jYXRlZ29yeSA/IDxkaXYgY2xhc3NOYW1lPVwiZXJyb3JEaXZcIj57ZXJyb3IuY2F0ZWdvcnl9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BlbnREYXlcIj5cbiAgICAgICAgICA8aW5wdXQgcmVmPVwiZGF5XCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiRERcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7ZGF5OiBlLnRhcmdldC52YWx1ZX0sICdkYXknLCAnbW9udGgnKX0gdmFsdWU9e2RheX0vPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJtb250aFwiIGNsYXNzTmFtZT1cImRheUlwXCIgdHlwZT1cIm51bWJlclwiIG1heExlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIk1NXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLmNoYW5nZURhdGUoe21vbnRoOiBlLnRhcmdldC52YWx1ZX0sICdtb250aCcsICd5ZWFyJyl9IHZhbHVlPXttb250aH0vPlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJ5ZWFyXCIgY2xhc3NOYW1lPVwiZGF5SXBcIiB0eXBlPVwibnVtYmVyXCIgbWF4TGVuZ3RoPVwiMlwiIHBsYWNlaG9sZGVyPVwiWVlcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuY2hhbmdlRGF0ZSh7eWVhcjogZS50YXJnZXQudmFsdWV9LCAneWVhcicpfSB2YWx1ZT17eWVhcn0vPlxuICAgICAgICAgIHtlcnJvci5kYXRlID8gPGRpdiBjbGFzc05hbWU9XCJlcnJvckRpdlwiPntlcnJvci5kYXRlfTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRDZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Ym1pdEJ0blwiIG9uQ2xpY2s9e3RoaXMuc3VibWl0TmV3RXhwZW5zZX0+RG9uZTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCB7TmF2TGlua30gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNsYXNzIE5vdEZvdW5kIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLmJpbmQodGhpcyk7XG4gIH1cblxuICBoZWFkKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0PlxuICAgICAgICA8dGl0bGU+UGFnZSBOb3QgRm91bmQ8L3RpdGxlPlxuICAgICAgPC9IZWxtZXQ+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuaGVhZCgpfVxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT5Tb3JyeSwgdGhlIHBhZ2UgeW91IGFyZSBleHBlY3RpbmcgZG9lcyBub3QgZXhpc3QhPC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpIG9uQ2xpY2s9IHsoKSA9PiB0aGlzLnByb3BzLmhpc3RvcnkuZ29CYWNrKCl9PiBcbiAgICAgICAgICAgICAgQmFja1xuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPE5hdkxpbmsgdG89Jy8nPiBIb21lIDwvTmF2TGluaz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxOYXZMaW5rIHRvPScvbG9naW4nPiBMb2dpbiA8L05hdkxpbms+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTm90Rm91bmQ7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7QnJvd3NlclJvdXRlciwgU3dpdGNoLCBSb3V0ZX0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IExvZ2luIGZyb20gJy4uL2NvbXBvbmVudHMvTG9naW4nO1xuaW1wb3J0IE5vdEZvdW5kIGZyb20gJy4uL2NvbXBvbmVudHMvTm90Rm91bmQnXG5pbXBvcnQgSG9tZSBmcm9tICcuLi9jb21wb25lbnRzL0hvbWUnO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvJyBleGFjdCByZW5kZXI9eyhwcm9wcykgPT4gPEhvbWUgey4uLnByb3BzfS8+fS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD0nL2hvbWUnIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8SG9tZSB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvbG9naW4nIGV4YWN0IHJlbmRlcj17KHByb3BzKSA9PiA8TG9naW4gey4uLnByb3BzfS8+fS8+XG4gICAgICAgICAgICA8Um91dGUgcmVuZGVyPXsocHJvcHMpID0+IDxOb3RGb3VuZCB7Li4ucHJvcHN9Lz59Lz5cbiAgICAgICAgPC9Td2l0Y2g+XG4gICAgKTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1oZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==