(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _alt = require('../../config/alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarAction = function NavbarAction() {
	_classCallCheck(this, NavbarAction);

	this.generateActions('logout');
};

exports.default = _alt2.default.createActions(NavbarAction);

},{"../../config/alt":19}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../../config/alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SigninAction = (function () {
  function SigninAction() {
    _classCallCheck(this, SigninAction);

    this.generateActions('loginSuccess', 'loginFail', 'updateEmail', 'updatePassword', 'inValidEmail', 'inValidPassword');
  }

  _createClass(SigninAction, [{
    key: 'logIn',
    value: function logIn(payload) {
      var _this = this;

      $.ajax({

        url: '/signin',
        type: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }

      }).done(function (data) {

        if (data.valid === false) {
          $('.signin_button').button('reset');
          toastr.error(data.msg);
          return false;
        } else if (data.token) {
          _this.actions.loginSuccess({
            data: data,
            history: payload.history
          });
        } else {
          toastr.error("Invalid email or password");
          $('.signin_button').button('reset');
          return false;
        }
      }).fail(function (xhr) {

        _this.actions.loginFail(xhr);
      });
    }
  }]);

  return SigninAction;
})();

exports.default = _alt2.default.createActions(SigninAction);

},{"../../config/alt":19}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../../config/alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SignupAction = (function () {
  function SignupAction() {
    _classCallCheck(this, SignupAction);

    this.generateActions('signupSuccess', 'signupFail', 'updateEmail', 'updateFirstName', 'updateLastName', 'updatePassword', 'updatePassword2', 'invalidFirstname', 'invalidLastName', 'invalidEmail', 'invalidPassword', 'noMatchPassword');
  }

  _createClass(SignupAction, [{
    key: 'signUp',
    value: function signUp(f_name, l_name, email, pw, history) {
      var _this = this;

      $.ajax({

        type: 'POST',
        url: '/signup',
        data: {
          f_name: f_name,
          l_name: l_name,
          email: email,
          password: pw
        }
      }).done(function (data) {
        _this.actions.signupSuccess({
          data: data,
          history: history
        });
      }).fail(function (xhr) {
        _this.actions.signupFail(xhr.responseJSON.message);
      });
    }
  }]);

  return SignupAction;
})();

exports.default = _alt2.default.createActions(SignupAction);

},{"../../config/alt":19}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _lib = require('../lib/lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _react2.default.createClass({
		displayName: 'App',
		getInitialState: function getInitialState() {

				return {
						loggedIn: _lib2.default.loggedIn()
				};
		},

		render: function render() {
				return _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_Navbar2.default, { history: this.props.history }),
						this.props.children
				);
		}
});

exports.default = App;

},{"../lib/lib":13,"./Navbar":6,"react":"react"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../lib/lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = _react2.default.createClass({
  displayName: 'Home',
  getInitialState: function getInitialState() {
    return {
      loggedIn: _lib2.default.loggedIn()
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps() {
    this.state.loggedIn = _lib2.default.loggedIn();
  },
  render: function render() {

    var sideMenu = $(".sideMenu").width();
    var padding = 55;

    if (this.state.loggedIn && sideMenu == null || sideMenu == 230) {
      padding = 230;
    }

    return _react2.default.createElement(
      'div',
      { id: 'wrapper' },
      this.state.loggedIn ? _react2.default.createElement(
        'div',
        { style: { paddingLeft: padding }, className: 'home_wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'container-fluid' },
          _react2.default.createElement(
            'div',
            { className: 'row home_wrapper2' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-6' },
              'de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-md-6' },
              'de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
            )
          )
        )
      ) : _react2.default.createElement(
        'div',
        { className: 'container-fluid home_wrapper_not_logged_in' },
        _react2.default.createElement(
          'div',
          { className: 'row hidden-xs wrapper_not_logged_in' },
          _react2.default.createElement(
            'div',
            { className: 'col-md-6 slider_contents' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h3',
                null,
                'Form your own playgound with Rmiters!'
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'p',
                null,
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown ronic typesetting, remaining essentially unchanged. It was'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-md-6' },
            _react2.default.createElement(
              'div',
              { className: 'img_wrapper img-responsive' },
              _react2.default.createElement('img', { className: 'hill img-responsive', src: '/img/hill.png' }),
              _react2.default.createElement('img', { className: 'house img-responsive', src: '/img/house.png' }),
              _react2.default.createElement('img', { className: 'birds1 img-responsive', src: '/img/birds1.png' }),
              _react2.default.createElement('img', { className: 'sun img-responsive', src: '/img/sun.png' }),
              _react2.default.createElement('img', { className: 'birds2 img-responsive', src: '/img/birds2.png' })
            )
          )
        )
      )
    );
  }
});

exports.default = Home;

},{"../lib/lib":13,"react":"react"}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../lib/lib.js');

var _lib2 = _interopRequireDefault(_lib);

var _reactRouter = require('react-router');

var _NavbarAction = require('../actions/NavbarAction');

var _NavbarAction2 = _interopRequireDefault(_NavbarAction);

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _SideNav = require('./SideNav');

var _SideNav2 = _interopRequireDefault(_SideNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = (function (_React$Component) {
    _inherits(Navbar, _React$Component);

    function Navbar(props) {
        _classCallCheck(this, Navbar);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Navbar).call(this, props));

        _this.onChange = _this.onChange.bind(_this);
        _this.state = _NavbarStore2.default.getState();
        return _this;
    }

    _createClass(Navbar, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.state.loggedIn = _lib2.default.loggedIn();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this.state.loggedIn = _lib2.default.loggedIn();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            _NavbarStore2.default.listen(this.onChange);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _NavbarStore2.default.unlisten(this.onChange);
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.setState(state);
        }
    }, {
        key: 'toggleSideBar',
        value: function toggleSideBar() {

            var sidebar = $(".sideMenu");
            var Homewrapper = $(".home_wrapper");
            var profile_photo_wrapper = $(".profile_photo_wrapper");
            var left_value = sidebar.width();
            var toggled = left_value == 230 ? true : false;
            var links = $(".control_board a");
            var spans = $(".control_board a span");
            var main_menu_toggle = $('.main_menu_toggle');

            if (toggled == true) {
                profile_photo_wrapper.hide();
                spans.hide();
                links.width(35);

                Homewrapper.animate({

                    paddingLeft: "-=175"

                }, 300);

                sidebar.animate({

                    width: "-=175"

                }, 300);
            } else {

                Homewrapper.animate({

                    paddingLeft: "+=175"

                }, 300);

                sidebar.animate({

                    width: "+=175"

                }, 300, function () {

                    profile_photo_wrapper.show();
                    links.width(210);
                    spans.show();
                });
            }

            return;
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            _NavbarAction2.default.logout(this.props.history);
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'nav',
                { className: 'navbar navbar-inverse navbar-fixed-top' },
                _react2.default.createElement(
                    'div',
                    { className: 'container-fluid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'navbar-header' },
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'main_menu_toggle navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar', 'aria-expanded': 'false', 'aria-controls': 'navbar' },
                            _react2.default.createElement(
                                'span',
                                { className: 'sr-only' },
                                'Toggle navigation'
                            ),
                            _react2.default.createElement('span', { className: 'icon-bar' }),
                            _react2.default.createElement('span', { className: 'icon-bar' }),
                            _react2.default.createElement('span', { className: 'icon-bar' })
                        ),
                        _react2.default.createElement(
                            'a',
                            { className: 'navbar-brand', href: '#' },
                            _react2.default.createElement('img', { src: '/img/logo.png' }),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Rmiters'
                            )
                        ),
                        this.state.loggedIn ? _react2.default.createElement(
                            'button',
                            { onClick: this.toggleSideBar.bind(this), type: 'button', style: { display: 'block', padding: 0, marginTop: 17 }, className: 'sidebar_toggle_button navbar-toggle collapsed' },
                            _react2.default.createElement(
                                'span',
                                { className: 'sr-only' },
                                'Toggle navigation'
                            ),
                            _react2.default.createElement('span', { className: 'icon-bar' }),
                            _react2.default.createElement('span', { className: 'icon-bar' }),
                            _react2.default.createElement('span', { className: 'icon-bar' })
                        ) : _react2.default.createElement('div', null)
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'navbar', className: 'navbar-collapse collapse' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'nav navbar-nav' },
                            _react2.default.createElement(
                                'li',
                                { className: 'active' },
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/' },
                                    'Home'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '#about' },
                                    'Forums'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '#contact' },
                                    'Buy & Sell'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '#contact' },
                                    'Accomodation'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'hidden-md hidden-lg' },
                                _react2.default.createElement(
                                    'a',
                                    { href: '#contact' },
                                    'Login'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'ul',
                            { className: 'nav navbar-nav navbar-right top_menu' },
                            this.state.loggedIn ? _react2.default.createElement(
                                'button',
                                { type: 'button', onClick: this.handleSubmit.bind(this), className: 'btn btn-primary sign_out' },
                                'Sign out'
                            ) : _react2.default.createElement(
                                'div',
                                { className: 'right_menu_wrapper' },
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/signin', className: 'btn btn-primary sign_up' },
                                    'Sign In'
                                ),
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/signup', className: 'btn btn-primary sign_up' },
                                    'Sign Up'
                                )
                            )
                        )
                    )
                ),
                this.state.loggedIn ? _react2.default.createElement(_SideNav2.default, null) : undefined
            );
        }
    }]);

    return Navbar;
})(_react2.default.Component);

exports.default = Navbar;

},{"../actions/NavbarAction":1,"../lib/lib.js":13,"../stores/NavbarStore":16,"./SideNav":8,"react":"react","react-router":"react-router"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var Profile = _react2.default.createClass({
  displayName: 'Profile',
  getInitialState: function getInitialState() {

    return {

      f_name: localStorage.getItem("f_name"),
      l_name: localStorage.getItem("l_name"),
      email: localStorage.getItem("email"),
      profileImageFileSize: 0,
      full_name: localStorage.getItem("full_name"),
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      subjectKeyword: "",
      profileImage: localStorage.getItem("profile_image") == "undefined" || null ? "default_image.jpg" : localStorage.getItem("profile_image"),
      major: localStorage.getItem("major") != 'undefined' ? localStorage.getItem("major") : "",
      total_subjects: {},
      my_subjects: localStorage.getObj("my_subjects") || [],
      subjects_loaded: false,
      myPosts: [],
      myFavourite_articles: []

    };
  },
  changeProfilePhoto2: function changeProfilePhoto2(e) {

    e.preventDefault();
    e.stopPropagation();

    $("#imageForm #filesize")[0].value = $("#imagefileprofile")[0].files[0].size;

    var fileValue = $("#imageForm")[0].value;
    var formData = new FormData($("#imageForm")[0]);

    if (this.refs.imagefileprofile.value != "") {
      $("#profileImageButton").attr("disabled", "disabled");
    } else {
      return false;
    }

    $.ajax({
      url: "/profile/uploadProfileImage",
      type: 'POST',
      data: formData,
      cache: false,
      contentType: false,
      processData: false
    }).done(function (data) {

      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === "object") {
        var err = data.err;
        $("#success_message").html('<div class="alert alert-danger"><strong>File upload fail! </strong>' + err + '</div>');
        $("#profileImageButton").attr("disabled", false);
        $("#imageForm")[0].value = "";
        $("#imageForm").trigger("reset");
        return false;
      }
      localStorage.setItem("profile_image", data);

      $(".profile_photo").attr("src", '/uploads/profile/' + data);
      $(".profile_small_photo").attr("src", '/uploads/profile/' + data);
      $(".profile_photo_edit").attr("src", '/uploads/profile/' + data);
      $("#profileImageButton").attr("disabled", false);
      $("#imageForm")[0].value = "";
      $("#imageForm").trigger("reset");
      $("#success_message").html('<div class="alert alert-success"><strong>Success!</strong> Yor profile image has been updated!</div>');
    }).fail(function (xhr) {

      console.log(xhr);
    });
  },
  majorUpdateLink: function majorUpdateLink(e) {
    e.preventDefault();

    var major_select = $("#major_select");

    major_select.attr("disabled", false);
  },
  componentDidMount: function componentDidMount() {

    var major_select = $("#major_select");
    var majorUpdateButton = $("#majorUpdateButton");

    if (this.state.major != '') {
      major_select.attr("disabled", "disabled");
    } else {
      majorUpdateButton.css({ "display": "none" });
    }

    $.ajax({

      url: "/data/major.json",
      dataType: "json"

    }).done(function (data) {

      var len = data.major.length;

      for (var i = 0; i < len; i++) {
        major_select.append($('<option>', { value: data.major[i], text: data.major[i] }));
      }
    }).fail(function () {

      major_select.append($('<option>', { value: "Error", text: "can not load data" }));
    });
  },
  updateMajor: function updateMajor(e) {

    var self = this;
    var major_select = $("#major_select");
    var majorUpdateButton = $("#majorUpdateButton");

    $.ajax({

      url: "/profile/updateMajor",
      type: "POST",
      data: {
        major: e.target.value,
        _id: localStorage.getItem("id")
      }

    }).done(function (data) {

      self.setState({
        major: e.target.value
      });

      localStorage.setItem("major", e.target.value);
      self.state.total_subjects = {};
      self.state.subjects_loaded = false;
      major_select.attr("disabled", "disabled");
      majorUpdateButton.css({ "display": "block" });
    });
  },
  changeProfilePhoto: function changeProfilePhoto(e) {
    $(":file").filestyle({ buttonname: "btn-primary" });
    $("#imageForm").children()[1].value = "";
    $("#success_message").empty();
    e.preventDefault();
    e.stopPropagation();
  },
  shouldComponentUpdate: function shouldComponentUpdate() {
    return false;
  },
  updateDescription: function updateDescription(e) {
    this.state.description = this.refs.myDescription.value;
  },
  updateSubject: function updateSubject(e) {

    var self = this;
    if (this.state.subjects_loaded == false && this.state.major != 'undefined' && this.state.major != "") {

      $.getJSON('/data/subjects.json', function (data) {

        $.each(data, function (key, val) {

          var regexp = new RegExp(key, 'i');

          if (regexp.test(self.state.major)) {
            self.state.total_subjects[key] = val;
          }
        });

        if (Object.keys(self.state.total_subjects).length !== 0) {
          self.state.subjects_loaded = true;
        }
      });
    } else {
      return;
    }
  },
  updateKeyword: function updateKeyword(e) {

    var self = this;
    this.state.subjectKeyword = e.target.value;
    var search_result_wrapper = $(".subjectResults");
    var matched = [];
    var keyword = new RegExp(this.state.subjectKeyword, "i");

    if (this.state.subjectKeyword.length == 0) {
      search_result_wrapper.html(" ");
      matched.length = 0;
      return;
    }

    for (var subject in this.state.total_subjects) {
      for (var i = 0; i < this.state.total_subjects[subject].length; i++) {
        if (keyword.test(this.state.total_subjects[subject][i])) {
          if (matched.indexOf(this.state.total_subjects[subject][i]) == -1) {
            matched.push(this.state.total_subjects[subject][i]);
          }
        } else {
          search_result_wrapper.html(" ");
        }
      }
    }

    var ul_element = $("<ul>");
    for (var i = 0; i < matched.length; i++) {
      var link = $("<span class='subjects_links'>" + matched[i] + "</span><button class='add_subject_button btn btn-add'>+</button><div class='clearfix'></div>");
      var li = $("<li>").append(link);
      ul_element.append(li);
    }

    search_result_wrapper.append(ul_element);

    $(".add_subject_button").click(function (e) {

      e.preventDefault();
      var subject = $(this).prev().html();

      if (self.state.my_subjects.indexOf(subject) == -1) {
        self.state.my_subjects.push(subject);
      }

      $(this).prev().fadeOut("500");
      $(this).fadeOut("500");

      var ul = $(".my_subjects_ul");

      ul.empty();

      for (var i = 0; i < self.state.my_subjects.length; i++) {
        var link = $("<span class='subjects_links'>" + self.state.my_subjects[i] + "</span><button class='delete_subect add_subject_button btn btn-add'>-</button><div class='clearfix'></div>");
        var li = $("<li>");
        li.append(link);
        ul.append(li);
      }

      $(".delete_subect").click(function (e) {

        e.preventDefault();

        var subject = $(this).prev().html();

        if (self.state.my_subjects.indexOf(subject) != -1) {
          var location = self.state.my_subjects.indexOf(subject);
          self.state.my_subjects.splice(location, 1);
        }

        $(this).prev().fadeOut("500");
        $(this).fadeOut("500");

        $.ajax({

          url: "/profile/updateSubject",
          type: "POST",
          data: {

            id: localStorage.getItem("id"),
            subjects: self.state.my_subjects
          }

        }).done(function (data) {}).fail(function (xhr) {

          localStorage.setObj("my_subjects", self.state.my_subjects);
        });
      });

      $.ajax({

        url: "/profile/updateSubject",
        type: "POST",
        data: {

          id: localStorage.getItem("id"),
          subjects: self.state.my_subjects
        }

      }).done(function () {}).fail(function (xhr) {

        localStorage.setObj("my_subjects", self.state.my_subjects);
      });
    });
  },
  delete_subject: function delete_subject(e) {
    var self = this;
    e.preventDefault();
    var subject = $(e.target).prev().html();

    if (this.state.my_subjects.indexOf(subject) != -1) {
      var location = this.state.my_subjects.indexOf(subject);
      this.state.my_subjects.splice(location, 1);
    }

    $(e.target).prev().fadeOut("500");
    $(e.target).fadeOut("500");

    $.ajax({

      url: "/profile/updateSubject",
      type: "POST",
      data: {

        id: localStorage.getItem("id"),
        subjects: self.state.my_subjects
      }

    }).done(function (data) {}).fail(function (xhr) {

      localStorage.setObj("my_subjects", self.state.my_subjects);
    });
  },
  render: function render() {
    var self = this;
    var num = 1;
    if (this.state.my_subjects != null) {
      var my_subjects = this.state.my_subjects.map(function (subject) {

        return _react2.default.createElement(
          'li',
          { key: num++ },
          _react2.default.createElement(
            'span',
            { className: 'subjects_links' },
            subject,
            _react2.default.createElement(
              'button',
              { onClick: self.delete_subject, className: 'add_subject_button btn btn-add' },
              '-'
            ),
            _react2.default.createElement('div', { className: 'clearfix' })
          )
        );
      });
    }

    var sideMenu = $(".sideMenu").width();
    var padding = 55;

    if (sideMenu == null || sideMenu == 230) {
      padding = 230;
    }

    return _react2.default.createElement(
      'div',
      { id: 'wrapper' },
      _react2.default.createElement(
        'div',
        { style: { paddingLeft: padding }, className: 'home_wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'container-fluid' },
          _react2.default.createElement(
            'div',
            { className: 'row home_wrapper2 profile_container' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-3 left_profile_wrapper' },
              _react2.default.createElement(
                'div',
                { className: 'big_profile_photo_wrapper' },
                _react2.default.createElement('img', { className: 'profile_photo', src: '/uploads/profile/' + this.state.profileImage }),
                _react2.default.createElement(
                  'h3',
                  { className: 'profile_full_name' },
                  this.state.full_name
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'description' },
                  this.state.description
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'profile_menu' },
                _react2.default.createElement(
                  'ul',
                  null,
                  _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      _reactRouter.Link,
                      { to: '#' },
                      _react2.default.createElement('i', { className: 'fa fa-book' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'My Posts'
                      ),
                      _react2.default.createElement(
                        'span',
                        { className: 'post_title' },
                        _react2.default.createElement(
                          'strong',
                          null,
                          '10'
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      _reactRouter.Link,
                      { to: '#' },
                      _react2.default.createElement('i', { className: 'fa fa-heart' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'Favourite Articles'
                      ),
                      _react2.default.createElement(
                        'span',
                        { className: 'article_title' },
                        _react2.default.createElement(
                          'strong',
                          null,
                          '134'
                        )
                      )
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-md-9 right_profile_wrapper' },
              _react2.default.createElement(
                'h3',
                null,
                'Profile'
              ),
              _react2.default.createElement(
                'div',
                { className: 'right_profile_wrapper2' },
                _react2.default.createElement(
                  'div',
                  { className: 'profile_photo_edit_wrapper' },
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '#', 'data-target': '#myModal', 'data-toggle': 'modal' },
                    _react2.default.createElement('i', { className: 'fa fa-camera' }),
                    _react2.default.createElement('img', { className: 'profile_photo_edit', onClick: this.changeProfilePhoto, src: '/uploads/profile/' + this.state.profileImage })
                  ),
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { 'data-target': '#myModal', 'data-toggle': 'modal', className: 'chang_profile_image', to: '#', onClick: this.changeProfilePhoto },
                    'Change Profile Image'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'edit_profile_wrapper' },
                  _react2.default.createElement(
                    'form',
                    { className: 'form-horizontal' },
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(
                        'label',
                        { htmlFor: 'inputEmail', className: 'control-label col-xs-2' },
                        'First Name'
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-xs-10 f_name' },
                        this.state.f_name
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(
                        'label',
                        { htmlFor: 'inputEmail', className: 'control-label col-xs-2' },
                        'Last Name'
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-xs-10 l_name' },
                        this.state.l_name
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(
                        'label',
                        { htmlFor: 'inputEmail', className: 'control-label col-xs-2' },
                        'Email'
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-xs-10 userEmaildInput' },
                        this.state.email
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(
                        'label',
                        { htmlFor: 'inputPassword', className: 'control-label col-xs-2' },
                        'About Me'
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-xs-10' },
                        _react2.default.createElement('textarea', { ref: 'myDescription', rows: '6', defaultValue: this.state.description, onChange: this.updateDescription, className: 'form-control' })
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(
                        'label',
                        { htmlFor: 'inputPassword', className: 'control-label col-xs-2' },
                        'Major'
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-xs-10' },
                        _react2.default.createElement(
                          'select',
                          { onChange: this.updateMajor, id: 'major_select', className: 'form-control' },
                          _react2.default.createElement(
                            'option',
                            { defaultValue: this.state.major },
                            this.state.major
                          )
                        ),
                        _react2.default.createElement(
                          'span',
                          { id: 'majorUpdateButton' },
                          _react2.default.createElement(
                            _reactRouter.Link,
                            { onClick: this.majorUpdateLink, to: '#' },
                            'Update'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(
                        'label',
                        { htmlFor: 'inputPassword', className: 'control-label col-xs-2' },
                        'Campus'
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-xs-10' },
                        _react2.default.createElement(
                          'select',
                          { className: 'form-control' },
                          _react2.default.createElement(
                            'option',
                            { value: '' },
                            'Melbourne City'
                          ),
                          _react2.default.createElement(
                            'option',
                            { value: '' },
                            'Melbourne Bundoora'
                          ),
                          _react2.default.createElement(
                            'option',
                            { value: '' },
                            'Vietnam'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(
                        'label',
                        { htmlFor: 'inputEmail', className: 'control-label col-xs-2' },
                        'Subject Search'
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-xs-10 l_name' },
                        _react2.default.createElement('input', { type: 'text', autoComplete: 'off', onChange: this.updateKeyword, onFocus: this.updateSubject, className: 'form-control', id: 'inputEmail', placeholder: 'Subject' }),
                        _react2.default.createElement('div', { className: 'subjectResults form-control' })
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(
                        'label',
                        { htmlFor: 'inputEmail', className: 'control-label col-xs-2' },
                        'My Subjects'
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-xs-10 l_name' },
                        _react2.default.createElement(
                          'div',
                          { className: 'my_subjects_results form-control' },
                          _react2.default.createElement(
                            'ul',
                            { className: 'my_subjects_ul' },
                            my_subjects
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(
                        'div',
                        { className: 'col-xs-offset-2 col-xs-10' },
                        _react2.default.createElement(
                          'div',
                          { className: 'checkbox' },
                          _react2.default.createElement(
                            'label',
                            null,
                            _react2.default.createElement('input', { type: 'checkbox' }),
                            ' Remember me'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(
                        'div',
                        { className: 'col-xs-offset-2 col-xs-10' },
                        _react2.default.createElement(
                          'button',
                          { type: 'submit', className: 'btn btn-primary' },
                          'Login'
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'modal fade', id: 'myModal', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel' },
                    _react2.default.createElement(
                      'div',
                      { className: 'modal-dialog', role: 'document' },
                      _react2.default.createElement(
                        'div',
                        { className: 'modal-content' },
                        _react2.default.createElement(
                          'div',
                          { className: 'modal-header' },
                          _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                            _react2.default.createElement(
                              'span',
                              { 'aria-hidden': 'true' },
                              '×'
                            )
                          ),
                          _react2.default.createElement(
                            'h4',
                            { className: 'modal-title', id: 'myModalLabel' },
                            'Upload your profile image'
                          )
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'modal-body' },
                          _react2.default.createElement(
                            'form',
                            { onSubmit: this.changeProfilePhoto2, className: 'form-group', id: 'imageForm', method: 'POST', encType: 'multipart/form-data' },
                            _react2.default.createElement('input', { ref: 'imageId', type: 'hidden', value: localStorage.getItem('id'), name: 'name' }),
                            _react2.default.createElement('input', { type: 'hidden', id: 'filesize', name: 'filesize' }),
                            _react2.default.createElement('input', { ref: 'imagefileprofile', id: 'imagefileprofile', className: 'filestyle', type: 'file', 'data-buttonname': 'btn-primary', name: 'filename' }),
                            _react2.default.createElement('input', { id: 'profileImageButton', className: 'btn btn-primary', type: 'submit', value: 'Upload' })
                          )
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'modal-footer' },
                          _react2.default.createElement('div', { id: 'success_message' }),
                          _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
                            'Close'
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  }
});

exports.default = Profile;

},{"react":"react","react-router":"react-router"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sideNav = _react2.default.createClass({
	displayName: 'sideNav',
	getInitialState: function getInitialState() {
		return {

			profileImage: localStorage.getItem("profile_image") == "undefined" || null ? "default_image.jpg" : localStorage.getItem("profile_image")

		};
	},
	componentDidMount: function componentDidMount() {
		var menu = $(".control_board ul li a");

		var url = window.location.href;

		for (var i = 0; i < menu.length; i++) {
			if (url.indexOf(menu[i].text.toLowerCase()) != -1) {
				$(menu[i]).children().css({ "color": "#ffffff" });
				$(menu[i]).css({

					"color": "#ffffff",
					"paddingLeft": "17px",
					"background-color": "#1c2529",
					"textDecoration": "none",
					"borderLeft": "3px solid #4f80c3"

				});
			}

			menu[i].addEventListener('click', function (e) {

				var clicked = $(this)[0].text;

				for (var j = 0; j < menu.length; j++) {
					if (menu[j].href.indexOf(clicked.toLowerCase()) == -1) {
						$(menu[j]).children().css({ "color": "" });
						$(menu[j]).css({

							"color": "",
							"paddingLeft": "",
							"background-color": "",
							"textDecoration": "",
							"borderLeft": ""

						});
					}
				}

				$(this).children().css({ "color": "#ffffff" });

				$(this).css({

					"color": "#ffffff",
					"paddingLeft": "17px",
					"background-color": "#1c2529",
					"textDecoration": "none",
					"borderLeft": "3px solid #4f80c3"

				});
			});
		}
	},
	render: function render() {
		var full_name = localStorage.getItem('full_name');

		return _react2.default.createElement(
			'div',
			{ className: 'sideMenu' },
			_react2.default.createElement(
				'div',
				{ className: 'profile_photo_wrapper' },
				_react2.default.createElement('img', { className: 'profile_small_photo circular', src: '/uploads/profile/' + this.state.profileImage }),
				_react2.default.createElement(
					'h5',
					null,
					full_name
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'control_board' },
				_react2.default.createElement(
					'ul',
					null,
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/profile' },
							_react2.default.createElement('i', { className: 'fa fa-user' }),
							_react2.default.createElement(
								'span',
								null,
								'Profile'
							)
						)
					),
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/inbox' },
							_react2.default.createElement('i', { className: 'fa fa-envelope' }),
							'Inbox'
						)
					),
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/friends' },
							_react2.default.createElement('i', { className: 'fa fa-users' }),
							'Friends'
						)
					),
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/articles' },
							_react2.default.createElement('i', { className: 'fa fa-book' }),
							'Articles'
						)
					),
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/settings' },
							_react2.default.createElement('i', { className: 'fa fa-cogs' }),
							'Settings'
						)
					)
				)
			)
		);
	}
});

exports.default = sideNav;

},{"react":"react","react-router":"react-router"}],9:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SigninAction = require('../actions/SigninAction');

var _SigninAction2 = _interopRequireDefault(_SigninAction);

var _SigninStore = require('../stores/SigninStore');

var _SigninStore2 = _interopRequireDefault(_SigninStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signin = (function (_React$Component) {
  _inherits(Signin, _React$Component);

  function Signin(props) {
    _classCallCheck(this, Signin);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Signin).call(this, props));

    _this.state = _SigninStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Signin, [{
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var url = window.location.href;

      if (url.indexOf("verified=true") != -1) // verification
        {
          toastr.success('You successfully verified your email. Sign in now.');
        }

      this.setState(function (preState, props) {
        return {
          emailValidateState: '',
          passwordValidateState: ''
        };
      });

      _SigninStore2.default.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _SigninStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      var email = this.refs.login_email.value;
      var password = this.refs.login_pw.value;

      if (!email) {
        _SigninAction2.default.inValidEmail();
      }

      if (!password) {
        _SigninAction2.default.inValidPassword();
      }

      if (email && password) {
        $('.signin_button').button('loading');

        _SigninAction2.default.logIn({
          email: email,
          password: password,
          history: this.props.history
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { key: this.state.timestamp, id: 'signin', className: 'container-full signup' },
        _react2.default.createElement('div', { className: 'overlay' }),
        _react2.default.createElement(
          'div',
          { ref: 'form_wrapper', className: 'center-block registration_form_container fadeInUp animated' },
          _react2.default.createElement(
            'form',
            { role: 'form', id: 'registerForm', onSubmit: this.handleSubmit.bind(this), className: 'form-horizontal registration_form', noValidate: true },
            _react2.default.createElement(
              'h2',
              { className: 'create_account_header' },
              'Sign In'
            ),
            _react2.default.createElement(
              'div',
              { className: "form-group " + this.state.emailValidateState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-envelope-o fa-fw' })
                ),
                _react2.default.createElement('input', { ref: 'login_email', value: this.state.email, type: 'email', onChange: _SigninAction2.default.updateEmail, className: 'form-control', id: 'inputEmail', placeholder: 'Email' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: "form-group " + this.state.passwordValidateState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-key fa-fw' })
                ),
                _react2.default.createElement('input', { ref: 'login_pw', id: 'inputPassword', onChange: _SigninAction2.default.updatePassword, className: 'form-control', type: 'password', placeholder: 'Password' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'button',
                { id: 'load', 'data-loading-text': '<i class=\'fa fa-circle-o-notch fa-spin\'></i> Signing In', type: 'submit', className: 'signin_button btn btn-primary' },
                'Submit'
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h3',
                { className: 'social_login_header' },
                'Or'
              ),
              _react2.default.createElement(
                'a',
                { className: 'btn btn-block btn-social btn-facebook' },
                _react2.default.createElement('span', { className: 'fa fa-facebook' }),
                ' Sign in with Facebook'
              ),
              _react2.default.createElement(
                'a',
                { className: 'btn btn-block btn-social btn-google' },
                _react2.default.createElement('span', { className: 'fa fa-google' }),
                ' Sign in with Google'
              ),
              _react2.default.createElement(
                'a',
                { className: 'btn btn-block btn-social btn-twitter' },
                _react2.default.createElement('span', { className: 'fa fa-twitter' }),
                ' Sign in with Twitter'
              )
            )
          )
        ),
        _react2.default.createElement('img', { src: '/img/cloud-background.jpg' })
      );
    }
  }]);

  return Signin;
})(_react2.default.Component);

exports.default = Signin;

},{"../actions/SigninAction":2,"../stores/SigninStore":17,"react":"react"}],10:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _SignupAction = require('../actions/SignupAction');

var _SignupAction2 = _interopRequireDefault(_SignupAction);

var _SignupStore = require('../stores/SignupStore');

var _SignupStore2 = _interopRequireDefault(_SignupStore);

var _lib = require('../lib/lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = (function (_React$Component) {
  _inherits(Signup, _React$Component);

  function Signup(props) {
    _classCallCheck(this, Signup);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Signup).call(this, props));

    _this.state = _SignupStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Signup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var url = window.location.href;

      if (url.indexOf("verified=false") != -1) // verification
        {
          toastr.error('You haven\'t created your account.Please create your account first!');
        }

      this.setState(function (prevState, CurrentProps) {

        return {

          f_nameValidationState: '',
          l_nameValidationState: '',
          emailValidationState: '',
          passwordValidationState: ''

        };
      });

      _SignupStore2.default.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _SignupStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      var f_name = this.refs.signup_f_name.value;
      var l_name = this.refs.signup_l_name.value;
      var email = this.refs.email.value;
      var pw = this.refs.pw.value;
      var pw2 = this.refs.pw2.value;

      if (!f_name) {
        _SignupAction2.default.invalidFirstname();
      }

      if (!l_name) {
        _SignupAction2.default.invalidLastName();
      }

      if (!pw) {
        _SignupAction2.default.invalidPassword();
      }

      if (!email || !_lib2.default.validateEmail(email)) {
        _SignupAction2.default.invalidEmail();
        return;
      }

      if (pw2 != pw) {
        _SignupAction2.default.noMatchPassword();
        return;
      }

      if (f_name != "" && l_name != "" && email != "" && pw != "" && pw2 != "") {
        $('.register_button').button('loading');
        _SignupAction2.default.signUp(f_name, l_name, email, pw, this.props.history);
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { className: 'container-full signup' },
        _react2.default.createElement('div', { className: 'overlay' }),
        _react2.default.createElement(
          'div',
          { className: 'center-block registration_form_container fadeInUp animated' },
          _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit.bind(this), id: 'registerForm', className: 'account_form form-horizontal registration_form', action: true, method: 'POST', noValidate: true },
            _react2.default.createElement(
              'h2',
              { className: 'create_account_header' },
              'Create your account'
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group ' + this.state.f_nameValidationState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-info' })
                ),
                _react2.default.createElement('input', { value: this.state.f_name, ref: 'signup_f_name', type: 'text', onChange: _SignupAction2.default.updateFirstName, className: 'form-control', id: 'firstName', placeholder: 'First Name' })
              ),
              _react2.default.createElement(
                'span',
                { className: 'help-block' },
                this.state.helpBlock
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group ' + this.state.l_nameValidationState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-info' })
                ),
                _react2.default.createElement('input', { value: this.state.l_name, ref: 'signup_l_name', type: 'text', onChange: _SignupAction2.default.updateLastName, className: 'form-control', id: 'lastName', placeholder: 'Last Name' })
              ),
              _react2.default.createElement(
                'span',
                { className: 'help-block' },
                this.state.helpBlock
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group ' + this.state.emailValidationState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-envelope-o fa-fw' })
                ),
                _react2.default.createElement('input', { value: this.state.email, ref: 'email', type: 'email', onChange: _SignupAction2.default.updateEmail, className: 'form-control', id: 'inputEmail', placeholder: 'Email' })
              ),
              _react2.default.createElement(
                'span',
                { className: 'help-block' },
                this.state.helpBlock
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group ' + this.state.passwordValidationState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-key fa-fw' })
                ),
                _react2.default.createElement('input', { ref: 'pw', id: 'inputPassword', onChange: _SignupAction2.default.updatePassword, className: 'form-control', type: 'password', placeholder: 'Password' })
              ),
              _react2.default.createElement(
                'span',
                { className: 'help-block' },
                this.state.helpBlock
              ),
              _react2.default.createElement('div', { className: 'clearfix' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group ' + this.state.Password2ValidationState },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'span',
                  { className: 'input-group-addon' },
                  _react2.default.createElement('i', { className: 'fa fa-key fa-fw' })
                ),
                _react2.default.createElement('input', { ref: 'pw2', type: 'password', onChange: _SignupAction2.default.updatePassword2, className: 'form-control', id: 'inputPasswordConfirm', placeholder: 'Password Confirm' })
              ),
              _react2.default.createElement(
                'span',
                { className: 'help-block' },
                this.state.helpBlock
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'button',
                { id: 'load', 'data-loading-text': '<i class=\'fa fa-circle-o-notch fa-spin\'></i> Creating your account', type: 'submit', className: 'register_button btn btn-primary' },
                'Submit'
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h3',
                { className: 'social_login_header' },
                'Or'
              ),
              _react2.default.createElement(
                'a',
                { className: 'btn btn-block btn-social btn-facebook' },
                _react2.default.createElement('span', { className: 'fa fa-facebook' }),
                ' Sign in with Facebook'
              ),
              _react2.default.createElement(
                'a',
                { className: 'btn btn-block btn-social btn-google' },
                _react2.default.createElement('span', { className: 'fa fa-google' }),
                ' Sign in with Google'
              ),
              _react2.default.createElement(
                'a',
                { className: 'btn btn-block btn-social btn-twitter' },
                _react2.default.createElement('span', { className: 'fa fa-twitter' }),
                ' Sign in with Twitter'
              )
            )
          )
        ),
        _react2.default.createElement('img', { src: '/img/cloud-background.jpg' })
      );
    }
  }]);

  return Signup;
})(_react2.default.Component);

exports.default = Signup;

},{"../actions/SignupAction":3,"../lib/lib":13,"../stores/SignupStore":18,"react":"react","react-router":"react-router"}],11:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Verify = (function (_React$Component) {
	_inherits(Verify, _React$Component);

	function Verify(props) {
		_classCallCheck(this, Verify);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Verify).call(this, props));
	}

	_createClass(Verify, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			$("#email").html(sessionStorage.getItem("email"));
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "container" },
				_react2.default.createElement(
					"div",
					{ className: "row mail_sent_wrapper center-block flipInX animated" },
					_react2.default.createElement(
						"div",
						{ className: "col-md-6 center-block" },
						_react2.default.createElement(
							"h4",
							null,
							"Please verify your email address"
						),
						_react2.default.createElement("img", { className: "mail_sent", src: "/img/mail_sent.png" }),
						_react2.default.createElement(
							"div",
							null,
							_react2.default.createElement(
								"h4",
								{ className: "email_sent_wrapper" },
								"You are almost done! A verification message has been sent to",
								_react2.default.createElement("br", null),
								_react2.default.createElement(
									"strong",
									null,
									_react2.default.createElement(
										"em",
										null,
										_react2.default.createElement("span", { id: "email" })
									)
								)
							),
							_react2.default.createElement(
								"p",
								null,
								"Check your email and follow the link to veryfy your email address. Once you verify it, you will be able to sign in and create your profile."
							)
						)
					)
				)
			);
		}
	}]);

	return Verify;
})(_react2.default.Component);

exports.default = Verify;

},{"react":"react"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lib = require('../lib/lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requireAuth(nextState, replaceState) {
	if (!_lib2.default.loggedIn()) {
		replaceState({ nextPathname: nextState.location.pathname }, '/signin');
	}
}

exports.default = requireAuth;

},{"../lib/lib":13}],13:[function(require,module,exports){
'use strict';

module.exports = {

  validateEmail: function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  getUpperCase: function getUpperCase(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
  },

  loggedIn: function loggedIn() {
    return localStorage.getItem('token');
  }

};

},{}],14:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createBrowserHistory = require('history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createBrowserHistory2.default)();

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter2.default,
  { history: history },
  _routes2.default
), document.getElementById('app'));

},{"./routes":15,"history/lib/createBrowserHistory":26,"react":"react","react-dom":"react-dom","react-router":"react-router"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Signup = require('./components/Signup');

var _Signup2 = _interopRequireDefault(_Signup);

var _Signin = require('./components/Signin');

var _Signin2 = _interopRequireDefault(_Signin);

var _Verify = require('./components/Verify');

var _Verify2 = _interopRequireDefault(_Verify);

var _Profile = require('./components/Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _requireAuth = require('./components/requireAuth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { component: _App2.default },
  _react2.default.createElement(_reactRouter.Route, { path: '/signin', component: _Signin2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/profile', onEnter: _requireAuth2.default, component: _Profile2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/signup', component: _Signup2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/verify_your_email', component: _Verify2.default })
);

},{"./components/App":4,"./components/Home":5,"./components/Profile":7,"./components/Signin":9,"./components/Signup":10,"./components/Verify":11,"./components/requireAuth":12,"react":"react","react-router":"react-router"}],16:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _alt = require('../../config/alt');

var _alt2 = _interopRequireDefault(_alt);

var _NavbarAction = require('../actions/NavbarAction');

var _NavbarAction2 = _interopRequireDefault(_NavbarAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarStore = (function () {
	function NavbarStore() {
		_classCallCheck(this, NavbarStore);

		this.bindActions(_NavbarAction2.default);
		this.loggedIn = '';
	}

	_createClass(NavbarStore, [{
		key: 'onLogout',
		value: function onLogout(history) {
			localStorage.removeItem('token');
			localStorage.removeItem('userData');
			history.pushState(null, '/');
		}
	}]);

	return NavbarStore;
})();

exports.default = _alt2.default.createStore(NavbarStore);

},{"../../config/alt":19,"../actions/NavbarAction":1}],17:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _alt = require('../../config/alt');

var _alt2 = _interopRequireDefault(_alt);

var _SigninAction = require('../actions/SigninAction');

var _SigninAction2 = _interopRequireDefault(_SigninAction);

var _lib = require('../lib/lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SigninStore = (function () {
	function SigninStore() {
		_classCallCheck(this, SigninStore);

		this.bindActions(_SigninAction2.default);
		this.email = '';
		this.password = '';
		this.emailValidateState = '';
		this.passwordValidateState = '';
		this.jwt = '';
		this.user = '';
		this.timestamp = Math.floor(Date.now() / 1000);
	}

	_createClass(SigninStore, [{
		key: 'onInValidEmail',
		value: function onInValidEmail() {
			this.emailValidateState = 'has-error';
		}
	}, {
		key: 'onInValidPassword',
		value: function onInValidPassword() {
			this.passwordValidateState = 'has-error';
		}
	}, {
		key: 'onLoginSuccess',
		value: function onLoginSuccess(obj) {
			var jwt = obj.data.token;
			var userData = obj.data.userData;
			var full_name = _lib2.default.getUpperCase(obj.data.user.f_name) + " " + _lib2.default.getUpperCase(obj.data.user.l_name);
			/* store user details in localstorage */

			localStorage.setItem('token', jwt);
			localStorage.setItem('id', obj.data.user.id);
			localStorage.setItem('f_name', obj.data.user.f_name);
			localStorage.setItem('l_name', obj.data.user.l_name);
			localStorage.setItem('email', obj.data.user.email);
			localStorage.setItem('full_name', full_name);
			localStorage.setObj('my_subjects', obj.data.user.subjects);
			localStorage.setItem('profile_image', obj.data.user.profile_image);
			localStorage.setItem('major', obj.data.user.major);

			this.token = jwt;
			obj.history.pushState(null, '/profile');
		}
	}, {
		key: 'onLoginFail',
		value: function onLoginFail(xhr) {}
	}, {
		key: 'onUpdateEmail',
		value: function onUpdateEmail(event) {
			this.email = event.target.value;
			this.emailValidateState = '';
		}
	}, {
		key: 'onUpdatePassword',
		value: function onUpdatePassword(event) {
			this.password = event.target.value;
			this.passwordValidateState = '';
		}
	}]);

	return SigninStore;
})();

exports.default = _alt2.default.createStore(SigninStore);

},{"../../config/alt":19,"../actions/SigninAction":2,"../lib/lib":13}],18:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../../config/alt');

var _alt2 = _interopRequireDefault(_alt);

var _SignupAction = require('../actions/SignupAction');

var _SignupAction2 = _interopRequireDefault(_SignupAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SignupStore = (function () {
  function SignupStore() {
    _classCallCheck(this, SignupStore);

    this.bindActions(_SignupAction2.default);
    this.f_name = '', this.l_name = '', this.email = '', this.password = '', this.password2 = '', this.f_nameValidationState = '', this.l_nameValidationState = '', this.emailValidationState = '', this.passwordValidationState = '', this.Password2ValidationState = '';
  }

  _createClass(SignupStore, [{
    key: 'onSignupSuccess',
    value: function onSignupSuccess(payload) {

      if (payload.data.created) {
        sessionStorage.setItem("email", payload.data.created);
        payload.history.pushState(null, '/verify_your_email');
      } else {

        for (var i in msg) {
          if (msg[i].msg == "email") {
            this.emailValidationState = 'has-error';
          }

          if (msg[i].msg == "f_name") {
            this.f_nameValidationState = 'has-error';
          }

          if (msg[i].msg == "l_name") {
            this.l_nameValidationState = 'has-error';
          }

          if (msg[i].msg == "password") {
            this.passwordValidationState = 'has-error';
          }
        }

        $('.register_button').button('reset');
      }
    }
  }, {
    key: 'onSignupFail',
    value: function onSignupFail(errorMsg) {}
  }, {
    key: 'onUpdateEmail',
    value: function onUpdateEmail(e) {
      this.email = e.target.value;
      this.emailValidationState = '';
    }
  }, {
    key: 'onUpdateFirstName',
    value: function onUpdateFirstName(e) {
      this.f_name = e.target.value;
      this.f_nameValidationState = '';
    }
  }, {
    key: 'onUpdateLastName',
    value: function onUpdateLastName(e) {
      this.l_name = e.target.value;
      this.l_nameValidationState = '';
    }
  }, {
    key: 'onUpdatePassword',
    value: function onUpdatePassword(e) {
      this.password = e.target.value;
      this.passwordValidationState = '';
      this.Password2ValidationState = '';
    }
  }, {
    key: 'onUpdatePassword2',
    value: function onUpdatePassword2(e) {
      this.password2 = e.target.value;
      this.Password2ValidationState = '';
      this.passwordValidationState = '';
    }
  }, {
    key: 'onInvalidFirstname',
    value: function onInvalidFirstname() {
      this.f_nameValidationState = 'has-error';
    }
  }, {
    key: 'onInvalidLastName',
    value: function onInvalidLastName() {
      this.l_nameValidationState = 'has-error';
    }
  }, {
    key: 'onInvalidEmail',
    value: function onInvalidEmail() {
      this.emailValidationState = 'has-error';
    }
  }, {
    key: 'onInvalidPassword',
    value: function onInvalidPassword() {
      this.passwordValidationState = 'has-error';
    }
  }, {
    key: 'onNoMatchPassword',
    value: function onNoMatchPassword() {
      this.PasswordValidationState = 'has-error';
      this.Password2ValidationState = 'has-error';
    }
  }]);

  return SignupStore;
})();

exports.default = _alt2.default.createStore(SignupStore);

},{"../../config/alt":19,"../actions/SignupAction":3}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _alt2.default();

},{"alt":"alt"}],20:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],21:[function(require,module,exports){
/**
 * Indicates that navigation was caused by a call to history.push.
 */
'use strict';

exports.__esModule = true;
var PUSH = 'PUSH';

exports.PUSH = PUSH;
/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = 'REPLACE';

exports.REPLACE = REPLACE;
/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = 'POP';

exports.POP = POP;
exports['default'] = {
  PUSH: PUSH,
  REPLACE: REPLACE,
  POP: POP
};
},{}],22:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.loopAsync = loopAsync;

function loopAsync(turns, work, callback) {
  var currentTurn = 0;
  var isDone = false;

  function done() {
    isDone = true;
    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) return;

    if (currentTurn < turns) {
      work.call(this, currentTurn++, next, done);
    } else {
      done.apply(this, arguments);
    }
  }

  next();
}
},{}],23:[function(require,module,exports){
(function (process){
/*eslint-disable no-empty */
'use strict';

exports.__esModule = true;
exports.saveState = saveState;
exports.readState = readState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var KeyPrefix = '@@History/';
var QuotaExceededError = 'QuotaExceededError';
var SecurityError = 'SecurityError';

function createKey(key) {
  return KeyPrefix + key;
}

function saveState(key, state) {
  try {
    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

      return;
    }

    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

      return;
    }

    throw error;
  }
}

function readState(key) {
  var json = undefined;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

      return null;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return null;
}
}).call(this,require('_process'))
},{"_process":20,"warning":38}],24:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.getHashPath = getHashPath;
exports.replaceHashPath = replaceHashPath;
exports.getWindowPath = getWindowPath;
exports.go = go;
exports.getUserConfirmation = getUserConfirmation;
exports.supportsHistory = supportsHistory;
exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent('on' + event, listener);
  }
}

function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || '';
}

function replaceHashPath(path) {
  window.location.replace(window.location.pathname + window.location.search + '#' + path);
}

function getWindowPath() {
  return window.location.pathname + window.location.search + window.location.hash;
}

function go(n) {
  if (n) window.history.go(n);
}

function getUserConfirmation(message, callback) {
  callback(window.confirm(message));
}

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */

function supportsHistory() {
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  // FIXME: Work around our browser history not working correctly on Chrome
  // iOS: https://github.com/rackt/react-router/issues/2565
  if (ua.indexOf('CriOS') !== -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  var ua = navigator.userAgent;
  return ua.indexOf('Firefox') === -1;
}
},{}],25:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],26:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = require('./Actions');

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _DOMStateStorage = require('./DOMStateStorage');

var _createDOMHistory = require('./createDOMHistory');

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve URLs.
 */
function createBrowserHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

  var forceRefresh = options.forceRefresh;

  var isSupported = _DOMUtils.supportsHistory();
  var useRefresh = !isSupported || forceRefresh;

  function getCurrentLocation(historyState) {
    historyState = historyState || window.history.state || {};

    var path = _DOMUtils.getWindowPath();
    var _historyState = historyState;
    var key = _historyState.key;

    var state = undefined;
    if (key) {
      state = _DOMStateStorage.readState(key);
    } else {
      state = null;
      key = history.createKey();

      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
    }

    var location = _parsePath2['default'](path);

    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
  }

  function startPopStateListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function popStateListener(event) {
      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

      transitionTo(getCurrentLocation(event.state));
    }

    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    _DOMStateStorage.saveState(key, state);

    var path = (basename || '') + pathname + search + hash;
    var historyState = {
      key: key
    };

    if (action === _Actions.PUSH) {
      if (useRefresh) {
        window.location.href = path;
        return false; // Prevent location update.
      } else {
          window.history.pushState(historyState, null, path);
        }
    } else {
      // REPLACE
      if (useRefresh) {
        window.location.replace(path);
        return false; // Prevent location update.
      } else {
          window.history.replaceState(historyState, null, path);
        }
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopPopStateListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopPopStateListener();
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    registerTransitionHook: registerTransitionHook,
    unregisterTransitionHook: unregisterTransitionHook
  });
}

exports['default'] = createBrowserHistory;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./Actions":21,"./DOMStateStorage":23,"./DOMUtils":24,"./ExecutionEnvironment":25,"./createDOMHistory":27,"./parsePath":32,"_process":20,"invariant":37}],27:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _createHistory = require('./createHistory');

var _createHistory2 = _interopRequireDefault(_createHistory);

function createDOMHistory(options) {
  var history = _createHistory2['default'](_extends({
    getUserConfirmation: _DOMUtils.getUserConfirmation
  }, options, {
    go: _DOMUtils.go
  }));

  function listen(listener) {
    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

    return history.listen(listener);
  }

  return _extends({}, history, {
    listen: listen
  });
}

exports['default'] = createDOMHistory;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./DOMUtils":24,"./ExecutionEnvironment":25,"./createHistory":28,"_process":20,"invariant":37}],28:[function(require,module,exports){
//import warning from 'warning'
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _AsyncUtils = require('./AsyncUtils');

var _Actions = require('./Actions');

var _createLocation2 = require('./createLocation');

var _createLocation3 = _interopRequireDefault(_createLocation2);

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

function createRandomKey(length) {
  return Math.random().toString(36).substr(2, length);
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search &&
  //a.action === b.action && // Different action !== location change.
  a.key === b.key && _deepEqual2['default'](a.state, b.state);
}

var DefaultKeyLength = 6;

function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var finishTransition = options.finishTransition;
  var saveState = options.saveState;
  var go = options.go;
  var keyLength = options.keyLength;
  var getUserConfirmation = options.getUserConfirmation;

  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

  var transitionHooks = [];

  function listenBefore(hook) {
    transitionHooks.push(hook);

    return function () {
      transitionHooks = transitionHooks.filter(function (item) {
        return item !== hook;
      });
    };
  }

  var allKeys = [];
  var changeListeners = [];
  var location = undefined;

  function getCurrent() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) {
      return allKeys.indexOf(pendingLocation.key);
    } else if (location) {
      return allKeys.indexOf(location.key);
    } else {
      return -1;
    }
  }

  function updateLocation(newLocation) {
    var current = getCurrent();

    location = newLocation;

    if (location.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
    } else if (location.action === _Actions.REPLACE) {
      allKeys[current] = location.key;
    }

    changeListeners.forEach(function (listener) {
      listener(location);
    });
  }

  function listen(listener) {
    changeListeners.push(listener);

    if (location) {
      listener(location);
    } else {
      var _location = getCurrentLocation();
      allKeys = [_location.key];
      updateLocation(_location);
    }

    return function () {
      changeListeners = changeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function confirmTransitionTo(location, callback) {
    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
        if (result != null) {
          done(result);
        } else {
          next();
        }
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  }

  var pendingLocation = undefined;

  function transitionTo(nextLocation) {
    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

      if (ok) {
        // treat PUSH to current path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var prevPath = createPath(location);
          var nextPath = createPath(nextLocation);

          if (nextPath === prevPath) nextLocation.action = _Actions.REPLACE;
        }

        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
      } else if (location && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(location.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
      }
    });
  }

  function push(location) {
    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
  }

  function replace(location) {
    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function createKey() {
    return createRandomKey(keyLength);
  }

  function createPath(location) {
    if (location == null || typeof location === 'string') return location;

    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;

    var result = pathname;

    if (search) result += search;

    if (hash) result += hash;

    return result;
  }

  function createHref(location) {
    return createPath(location);
  }

  function createLocation(location, action) {
    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

    if (typeof action === 'object') {
      //warning(
      //  false,
      //  'The state (2nd) argument to history.createLocation is deprecated; use a ' +
      //  'location descriptor instead'
      //)

      if (typeof location === 'string') location = _parsePath2['default'](location);

      location = _extends({}, location, { state: action });

      action = key;
      key = arguments[3] || createKey();
    }

    return _createLocation3['default'](location, action, key);
  }

  // deprecated
  function setState(state) {
    if (location) {
      updateLocationState(location, state);
      updateLocation(location);
    } else {
      updateLocationState(getCurrentLocation(), state);
    }
  }

  function updateLocationState(location, state) {
    location.state = _extends({}, location.state, state);
    saveState(location.key, location.state);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    transitionHooks = transitionHooks.filter(function (item) {
      return item !== hook;
    });
  }

  // deprecated
  function pushState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    push(_extends({ state: state }, path));
  }

  // deprecated
  function replaceState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    replace(_extends({ state: state }, path));
  }

  return {
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: createPath,
    createHref: createHref,
    createLocation: createLocation,

    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
  };
}

exports['default'] = createHistory;
module.exports = exports['default'];
},{"./Actions":21,"./AsyncUtils":22,"./createLocation":29,"./deprecate":30,"./parsePath":32,"./runTransitionHook":33,"deep-equal":34}],29:[function(require,module,exports){
//import warning from 'warning'
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Actions = require('./Actions');

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

function createLocation() {
  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  if (typeof location === 'string') location = _parsePath2['default'](location);

  if (typeof action === 'object') {
    //warning(
    //  false,
    //  'The state (2nd) argument to createLocation is deprecated; use a ' +
    //  'location descriptor instead'
    //)

    location = _extends({}, location, { state: action });

    action = key || _Actions.POP;
    key = _fourthArg;
  }

  var pathname = location.pathname || '/';
  var search = location.search || '';
  var hash = location.hash || '';
  var state = location.state || null;

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
}

exports['default'] = createLocation;
module.exports = exports['default'];
},{"./Actions":21,"./parsePath":32}],30:[function(require,module,exports){
//import warning from 'warning'

"use strict";

exports.__esModule = true;
function deprecate(fn) {
  return fn;
  //return function () {
  //  warning(false, '[history] ' + message)
  //  return fn.apply(this, arguments)
  //}
}

exports["default"] = deprecate;
module.exports = exports["default"];
},{}],31:[function(require,module,exports){
"use strict";

exports.__esModule = true;
function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  return string.substring(match[0].length);
}

exports["default"] = extractPath;
module.exports = exports["default"];
},{}],32:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _extractPath = require('./extractPath');

var _extractPath2 = _interopRequireDefault(_extractPath);

function parsePath(path) {
  var pathname = _extractPath2['default'](path);
  var search = '';
  var hash = '';

  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
}

exports['default'] = parsePath;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./extractPath":31,"_process":20,"warning":38}],33:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
  }
}

exports['default'] = runTransitionHook;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"_process":20,"warning":38}],34:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":35,"./lib/keys.js":36}],35:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],36:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],37:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":20}],38:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))
},{"_process":20}]},{},[14]);
