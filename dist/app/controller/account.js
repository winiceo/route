'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('lodash');
var validator = require('validator');
var utility = require('utility');
var uuid = require('uuid');

module.exports = function (app) {
    var AccountController = function (_app$Controller) {
        _inherits(AccountController, _app$Controller);

        function AccountController() {
            _classCallCheck(this, AccountController);

            return _possibleConstructorReturn(this, (AccountController.__proto__ || Object.getPrototypeOf(AccountController)).apply(this, arguments));
        }

        _createClass(AccountController, [{
            key: 'register',
            value: function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var ctx, service, config, email, password, captcha, ret, msg, accounts, passhash, result;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    ctx = this.ctx, service = this.service, config = this.config;
                                    email = validator.trim(ctx.request.body.email || '').toLowerCase();
                                    password = validator.trim(ctx.request.body.password || '');
                                    captcha = validator.trim(String(ctx.request.body.captcha) || '');


                                    console.log(ctx.request.body);
                                    ret = {
                                        status: 422,
                                        message: '',
                                        data: {}
                                    };
                                    msg = null;
                                    // 验证信息的正确性

                                    if ([email, password, captcha].some(function (item) {
                                        return item === '';
                                    })) {
                                        msg = '信息不完整。';
                                    } else if (!validator.isEmail(email)) {
                                        msg = '邮箱不合法。';
                                    } else if (password.length < 6) {
                                        msg = '密码不能小于5。';
                                    }
                                    // END 验证信息的正确性

                                    if (!(msg != null)) {
                                        _context.next = 13;
                                        break;
                                    }

                                    ctx.status = 422;
                                    ret.message = msg;
                                    ctx.body = ret;
                                    return _context.abrupt('return');

                                case 13:
                                    _context.next = 15;
                                    return service.account.getUserByMail(email);

                                case 15:
                                    accounts = _context.sent;

                                    if (!accounts) {
                                        _context.next = 21;
                                        break;
                                    }

                                    ctx.status = 422;
                                    ret.message = '用户名或邮箱已被使用。';
                                    ctx.body = ret;
                                    return _context.abrupt('return');

                                case 21:
                                    passhash = ctx.helper.bhash(password);
                                    _context.next = 24;
                                    return service.account.newAndSave(email, passhash, false);

                                case 24:
                                    result = _context.sent;


                                    console.log(result);
                                    // 发送激活邮件
                                    _context.next = 28;
                                    return service.mail.sendActiveMail(email, utility.md5(email + passhash + config.session_secret));

                                case 28:
                                    ret.status = 200;
                                    ctx.body = ret;

                                case 30:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function register() {
                    return _ref.apply(this, arguments);
                }

                return register;
            }()
        }, {
            key: 'login',
            value: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var ctx, service, config, email, password, ret, msg, getUser, existUser, passhash, equal, token;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    ctx = this.ctx, service = this.service, config = this.config;
                                    email = validator.trim(ctx.request.body.email || '').toLowerCase();
                                    password = validator.trim(ctx.request.body.password || '');
                                    // const captcha = validator.trim(String(ctx.request.body.captcha) || '');

                                    console.log(ctx.request.body);
                                    ret = {
                                        status: 422,
                                        message: '',
                                        data: {}
                                    };
                                    msg = null;
                                    // 验证信息的正确性

                                    if ([email, password].some(function (item) {
                                        return item === '';
                                    })) {
                                        msg = '信息不完整。';
                                    } else if (!validator.isEmail(email)) {
                                        msg = '邮箱不合法。';
                                    } else if (password.length < 6) {
                                        msg = '密码不能小于6。';
                                    }

                                    getUser = function getUser(email) {
                                        if (email.indexOf('@') > 0) {
                                            return ctx.service.account.getUserByMail(email);
                                        }
                                        return false;
                                    };

                                    _context2.next = 10;
                                    return getUser(email);

                                case 10:
                                    existUser = _context2.sent;

                                    if (existUser) {
                                        _context2.next = 16;
                                        break;
                                    }

                                    ctx.status = 422;
                                    ret.message = '用户不存在';
                                    ctx.body = ret;
                                    return _context2.abrupt('return');

                                case 16:
                                    passhash = existUser.password;
                                    // TODO: change to async compare

                                    equal = ctx.helper.bcompare(password, passhash);
                                    // 密码不匹配

                                    if (equal) {
                                        _context2.next = 23;
                                        break;
                                    }

                                    ctx.status = 422;
                                    ret.message = '密码不正确';
                                    ctx.body = ret;
                                    return _context2.abrupt('return');

                                case 23:
                                    token = app.jwt.sign({ email: existUser.email, user_id: existUser.id }, app.config.jwt.secret);


                                    ret.status = 200;
                                    ret.data.token = token;
                                    ctx.body = ret;

                                case 27:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                function login() {
                    return _ref2.apply(this, arguments);
                }

                return login;
            }()
        }, {
            key: 'test',
            value: function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                    var ctx;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    ctx = this.ctx;


                                    console.log(ctx.account);

                                    this.ctx.body = ctx.user;

                                case 3:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));

                function test() {
                    return _ref3.apply(this, arguments);
                }

                return test;
            }()
        }, {
            key: 'forget',
            value: function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                    var ctx, service, ret, email, password, user, passhash;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    ctx = this.ctx, service = this.service;
                                    ret = {
                                        status: 422,
                                        message: '',
                                        data: {}
                                    };
                                    email = validator.trim(ctx.request.body.email).toLowerCase();
                                    password = validator.trim(ctx.request.body.password) || '';

                                    if (validator.isEmail(email)) {
                                        _context4.next = 8;
                                        break;
                                    }

                                    ret.message = '邮箱不合法';
                                    ctx.body = ret;
                                    return _context4.abrupt('return');

                                case 8:
                                    _context4.next = 10;
                                    return service.user.getUserByMail(email);

                                case 10:
                                    user = _context4.sent;

                                    if (user) {
                                        _context4.next = 15;
                                        break;
                                    }

                                    ret.message = '邮箱不存在';
                                    ctx.body = ret;
                                    return _context4.abrupt('return');

                                case 15:
                                    passhash = ctx.helper.bhash(password);

                                    user.pass = passhash;
                                    _context4.next = 19;
                                    return user.save();

                                case 19:
                                    ctx.status = 200;
                                    ret.status = 200;
                                    ctx.body = ret;

                                case 22:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this);
                }));

                function forget() {
                    return _ref4.apply(this, arguments);
                }

                return forget;
            }()
            // 修改密码

        }, {
            key: 'updatePass',
            value: function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                    var ctx, service, ret, old_password, password, user, equal, passhash;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    ctx = this.ctx, service = this.service;
                                    ret = {
                                        status: 422,
                                        message: '',
                                        data: {}
                                    };
                                    old_password = validator.trim(ctx.request.body.old_password) || '';
                                    password = validator.trim(ctx.request.body.password) || '';
                                    _context5.next = 6;
                                    return service.account.getUserByMail(ctx.account.email);

                                case 6:
                                    user = _context5.sent;

                                    if (user) {
                                        _context5.next = 11;
                                        break;
                                    }

                                    ret.message = '用户不存在';
                                    ctx.body = ret;
                                    return _context5.abrupt('return');

                                case 11:
                                    equal = ctx.helper.bcompare(old_password, user.pass);
                                    // 密码不匹配

                                    if (equal) {
                                        _context5.next = 17;
                                        break;
                                    }

                                    ctx.status = 422;
                                    ret.message = '旧密码不正确';
                                    ctx.body = ret;
                                    return _context5.abrupt('return');

                                case 17:
                                    passhash = ctx.helper.bhash(password);

                                    user.pass = passhash;

                                    _context5.next = 21;
                                    return user.save();

                                case 21:
                                    ctx.status = 200;
                                    ret.status = 200;
                                    ctx.body = ret;

                                case 24:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this);
                }));

                function updatePass() {
                    return _ref5.apply(this, arguments);
                }

                return updatePass;
            }()
        }]);

        return AccountController;
    }(app.Controller);

    return AccountController;
};
//# sourceMappingURL=account.js.map