'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var validator = require('validator');
var utility = require('utility');
var uuid = require('uuid');
var Controller = require('egg').Controller;

var SignController = function (_Controller) {
    _inherits(SignController, _Controller);

    function SignController() {
        _classCallCheck(this, SignController);

        return _possibleConstructorReturn(this, (SignController.__proto__ || Object.getPrototypeOf(SignController)).apply(this, arguments));
    }

    _createClass(SignController, [{
        key: 'showLogin',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var ctx;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                ctx = this.ctx;
                                _context.next = 3;
                                return ctx.render('/sign/signin', { 'pageTitle': '登录' });

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function showLogin() {
                return _ref.apply(this, arguments);
            }

            return showLogin;
        }()

        // sign up

    }, {
        key: 'showSignup',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var ctx;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                ctx = this.ctx;
                                _context2.next = 3;
                                return ctx.render('/sign/signup', { 'pageTitle': '注册' });

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function showSignup() {
                return _ref2.apply(this, arguments);
            }

            return showSignup;
        }()
    }, {
        key: 'signup',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var ctx, service, config, loginname, email, pass, rePass, msg, users, passhash, avatarUrl;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                ctx = this.ctx, service = this.service, config = this.config;
                                loginname = validator.trim(ctx.request.body.loginname || '').toLowerCase();
                                email = validator.trim(ctx.request.body.email || '').toLowerCase();
                                pass = validator.trim(ctx.request.body.pass || '');
                                rePass = validator.trim(ctx.request.body.re_pass || '');
                                msg = '';
                                // 验证信息的正确性

                                if ([loginname, pass, rePass, email].some(function (item) {
                                    return item === '';
                                })) {
                                    msg = '信息不完整。';
                                } else if (loginname.length < 5) {
                                    msg = '用户名至少需要5个字符。';
                                } else if (!ctx.helper.validateId(loginname)) {
                                    msg = '用户名不合法。';
                                } else if (!validator.isEmail(email)) {
                                    msg = '邮箱不合法。';
                                } else if (pass !== rePass) {
                                    msg = '两次密码输入不一致。';
                                }
                                // END 验证信息的正确性

                                if (!msg) {
                                    _context3.next = 12;
                                    break;
                                }

                                ctx.status = 422;
                                _context3.next = 11;
                                return ctx.render('sign/signup', {
                                    'error': msg,
                                    loginname: loginname,
                                    email: email
                                });

                            case 11:
                                return _context3.abrupt('return');

                            case 12:
                                _context3.next = 14;
                                return service.user.getUsersByQuery({
                                    '$or': [{ loginname: loginname }, { email: email }]
                                }, {});

                            case 14:
                                users = _context3.sent;

                                if (!(users.length > 0)) {
                                    _context3.next = 20;
                                    break;
                                }

                                ctx.status = 422;
                                _context3.next = 19;
                                return ctx.render('sign/signup', {
                                    'error': '用户名或邮箱已被使用。',
                                    loginname: loginname,
                                    email: email
                                });

                            case 19:
                                return _context3.abrupt('return');

                            case 20:
                                passhash = ctx.helper.bhash(pass);

                                // create gravatar

                                avatarUrl = service.user.makeGravatar(email);
                                _context3.next = 24;
                                return service.user.newAndSave(loginname, loginname, passhash, email, avatarUrl, false);

                            case 24:
                                _context3.next = 26;
                                return ctx.render('sign/signup', {
                                    'success': '欢迎加入 ' + config.name + '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。'
                                });

                            case 26:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function signup() {
                return _ref3.apply(this, arguments);
            }

            return signup;
        }()
    }, {
        key: 'signout',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var ctx;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                ctx = this.ctx;

                                ctx.session = null;
                                ctx.logout();
                                ctx.redirect('/');

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function signout() {
                return _ref4.apply(this, arguments);
            }

            return signout;
        }()
    }, {
        key: 'activeAccount',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var ctx, service, config, key, name, user, passhash;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                ctx = this.ctx, service = this.service, config = this.config;
                                key = validator.trim(ctx.query.key || '');
                                name = validator.trim(ctx.query.name || '');
                                _context5.next = 5;
                                return service.user.getUserByLoginName(name);

                            case 5:
                                user = _context5.sent;

                                if (user) {
                                    _context5.next = 10;
                                    break;
                                }

                                _context5.next = 9;
                                return ctx.render('notify/notify', { 'error': '用户不存在' });

                            case 9:
                                return _context5.abrupt('return');

                            case 10:
                                passhash = user.pass;

                                if (!(!user || utility.md5(user.email + passhash + config.session_secret) !== key)) {
                                    _context5.next = 15;
                                    break;
                                }

                                _context5.next = 14;
                                return ctx.render('notify/notify', { 'error': '信息有误，帐号无法被激活。' });

                            case 14:
                                return _context5.abrupt('return');

                            case 15:
                                if (!user.active) {
                                    _context5.next = 19;
                                    break;
                                }

                                _context5.next = 18;
                                return ctx.render('notify/notify', { 'error': '帐号已经是激活状态。' });

                            case 18:
                                return _context5.abrupt('return');

                            case 19:

                                user.active = true;
                                _context5.next = 22;
                                return user.save();

                            case 22:
                                _context5.next = 24;
                                return ctx.render('notify/notify', { 'success': '帐号已被激活，请登录' });

                            case 24:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function activeAccount() {
                return _ref5.apply(this, arguments);
            }

            return activeAccount;
        }()
    }, {
        key: 'showSearchPass',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.ctx.render('sign/search_pass');

                            case 2:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function showSearchPass() {
                return _ref6.apply(this, arguments);
            }

            return showSearchPass;
        }()
    }, {
        key: 'updateSearchPass',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var ctx, service, email, retrieveKey, retrieveTime, user;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                ctx = this.ctx, service = this.service;
                                email = validator.trim(ctx.request.body.email).toLowerCase();

                                if (validator.isEmail(email)) {
                                    _context7.next = 6;
                                    break;
                                }

                                _context7.next = 5;
                                return this.ctx.render('sign/search_pass', {
                                    'error': '邮箱不合法',
                                    email: email
                                });

                            case 5:
                                return _context7.abrupt('return');

                            case 6:

                                // 动态生成retrive_key和timestamp到users collection,之后重置密码进行验证
                                retrieveKey = uuid.v4();
                                retrieveTime = Date.now();
                                _context7.next = 10;
                                return service.user.getUserByMail(email);

                            case 10:
                                user = _context7.sent;

                                if (user) {
                                    _context7.next = 15;
                                    break;
                                }

                                _context7.next = 14;
                                return this.ctx.render('sign/search_pass', {
                                    'error': '没有这个电子邮箱。',
                                    email: email
                                });

                            case 14:
                                return _context7.abrupt('return');

                            case 15:

                                user.retrieve_key = retrieveKey;
                                user.retrieve_time = retrieveTime;
                                _context7.next = 19;
                                return user.save();

                            case 19:
                                _context7.next = 21;
                                return this.ctx.render('notify/notify', {
                                    'success': '我们已给您填写的电子邮箱发送了一封邮件，请在24小时内点击里面的链接来重置密码。'
                                });

                            case 21:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function updateSearchPass() {
                return _ref7.apply(this, arguments);
            }

            return updateSearchPass;
        }()
    }, {
        key: 'resetPass',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var ctx, service, key, name, user, now, oneDay;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                ctx = this.ctx, service = this.service;
                                key = validator.trim(ctx.query.key || '');
                                name = validator.trim(ctx.query.name || '');
                                _context8.next = 5;
                                return service.user.getUserByNameAndKey(name, key);

                            case 5:
                                user = _context8.sent;

                                if (user) {
                                    _context8.next = 11;
                                    break;
                                }

                                ctx.status = 403;
                                _context8.next = 10;
                                return this.ctx.render('notify/notify', {
                                    'error': '信息有误，密码无法重置。'
                                });

                            case 10:
                                return _context8.abrupt('return');

                            case 11:
                                now = Date.now();
                                oneDay = 1000 * 60 * 60 * 24;

                                if (!(!user.retrieve_time || now - user.retrieve_time > oneDay)) {
                                    _context8.next = 18;
                                    break;
                                }

                                ctx.status = 403;
                                _context8.next = 17;
                                return this.ctx.render('notify/notify', {
                                    'error': '该链接已过期，请重新申请。'
                                });

                            case 17:
                                return _context8.abrupt('return');

                            case 18:
                                _context8.next = 20;
                                return this.ctx.render('sign/reset', { name: name, key: key });

                            case 20:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function resetPass() {
                return _ref8.apply(this, arguments);
            }

            return resetPass;
        }()
    }, {
        key: 'updatePass',
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                var ctx, service, psw, repsw, key, name, user, passhash;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                ctx = this.ctx, service = this.service;
                                psw = validator.trim(ctx.request.body.psw) || '';
                                repsw = validator.trim(ctx.request.body.repsw) || '';
                                key = validator.trim(ctx.request.body.key) || '';
                                name = validator.trim(ctx.request.body.name) || '';

                                if (!(psw !== repsw)) {
                                    _context9.next = 9;
                                    break;
                                }

                                _context9.next = 8;
                                return this.ctx.render('sign/reset', {
                                    name: name,
                                    key: key,
                                    'error': '两次密码输入不一致。'
                                });

                            case 8:
                                return _context9.abrupt('return');

                            case 9:
                                _context9.next = 11;
                                return service.user.getUserByNameAndKey(name, key);

                            case 11:
                                user = _context9.sent;

                                if (user) {
                                    _context9.next = 16;
                                    break;
                                }

                                _context9.next = 15;
                                return this.ctx.render('notify/notify', {
                                    'error': '错误的激活链接'
                                });

                            case 15:
                                return _context9.abrupt('return');

                            case 16:
                                passhash = ctx.helper.bhash(psw);

                                user.pass = passhash;
                                user.retrieve_key = null;
                                user.retrieve_time = null;
                                user.active = true; // 用户激活

                                _context9.next = 23;
                                return user.save();

                            case 23:
                                _context9.next = 25;
                                return this.ctx.render('notify/notify', { 'success': '你的密码已重置。' });

                            case 25:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function updatePass() {
                return _ref9.apply(this, arguments);
            }

            return updatePass;
        }()
    }]);

    return SignController;
}(Controller);

module.exports = SignController;
//# sourceMappingURL=sign.js.map