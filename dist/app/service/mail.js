'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = require('egg').Service;
//const mailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');
// const sgTransport = require('nodemailer-sendgrid-transport');
var sgMail = require('@sendgrid/mail');

var MailService = function (_Service) {
    _inherits(MailService, _Service);

    function MailService() {
        _classCallCheck(this, MailService);

        return _possibleConstructorReturn(this, (MailService.__proto__ || Object.getPrototypeOf(MailService)).apply(this, arguments));
    }

    _createClass(MailService, [{
        key: 'saveCaptcha',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, rd) {
                var results;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.app.mysql.query('replace into captcha set email =? ,rd = ?', [email, rd]);

                            case 2:
                                results = _context.sent;
                                return _context.abrupt('return', results);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function saveCaptcha(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return saveCaptcha;
        }()
    }, {
        key: 'getCaptcha',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email) {
                var results;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.app.mysql.get('captcha', { email: email });

                            case 2:
                                results = _context2.sent;
                                return _context2.abrupt('return', results);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getCaptcha(_x3) {
                return _ref2.apply(this, arguments);
            }

            return getCaptcha;
        }()
    }, {
        key: 'sendMail',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
                var config, logger, i;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                config = this.config, logger = this.logger;

                                if (!config.debug) {
                                    _context3.next = 3;
                                    break;
                                }

                                return _context3.abrupt('return');

                            case 3:

                                sgMail.setApiKey(config.mail_grid_opts.auth.api_key);

                                i = 1;

                            case 5:
                                if (!(i < 6)) {
                                    _context3.next = 22;
                                    break;
                                }

                                _context3.prev = 6;
                                _context3.next = 9;
                                return sgMail.send(data);

                            case 9:
                                logger.info('send mail success', data);
                                return _context3.abrupt('break', 22);

                            case 13:
                                _context3.prev = 13;
                                _context3.t0 = _context3['catch'](6);

                                if (!(i === 5)) {
                                    _context3.next = 18;
                                    break;
                                }

                                logger.error('send mail finally error', _context3.t0, data);
                                throw new Error(_context3.t0);

                            case 18:
                                logger.error('send mail error', _context3.t0, data);

                            case 19:
                                i++;
                                _context3.next = 5;
                                break;

                            case 22:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[6, 13]]);
            }));

            function sendMail(_x4) {
                return _ref3.apply(this, arguments);
            }

            return sendMail;
        }()
    }, {
        key: 'sendActiveMail',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(who, token) {
                var config, name, from, to, subject, html;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                config = this.config;
                                name = 'miner';
                                from = config.name + ' <' + config.mail_opts.auth.user + '>';
                                to = who;
                                subject = config.name + '邮箱验证';
                                html = String('<p>您好：</p>' + '<p>您的邮箱验证码为：</p>' + '验证码:' + token) + '<p>若您没有在' + config.name + '填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' + '<p>' + config.name + '社区 谨上。</p>';
                                _context4.next = 8;
                                return this.saveCaptcha(who, token);

                            case 8:
                                _context4.next = 10;
                                return this.sendMail({
                                    from: from,
                                    to: to,
                                    subject: subject,
                                    html: html
                                });

                            case 10:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function sendActiveMail(_x5, _x6) {
                return _ref4.apply(this, arguments);
            }

            return sendActiveMail;
        }()
    }, {
        key: 'sendResetPassMail',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(who, token, name) {
                var config, from, to, subject, html;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                config = this.config;
                                from = config.name + ' <' + config.mail_opts.auth.user + '>';
                                to = who;
                                subject = config.name + '社区密码重置';
                                html = '<p>您好：' + name + '</p>' + '<p>我们收到您在' + config.name + '社区重置密码的请求，请在24小时内单击下面的链接来重置密码：</p>' + '<a href="' + config.host + '/reset_pass?key=' + token + '&name=' + name + '">重置密码链接</a>' + '<p>若您没有在' + config.name + '社区填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' + '<p>' + config.name + '社区 谨上。</p>';

                                this.saveCaptcha(to, token);
                                _context5.next = 8;
                                return this.sendMail({
                                    from: from,
                                    to: to,
                                    subject: subject,
                                    html: html
                                });

                            case 8:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function sendResetPassMail(_x7, _x8, _x9) {
                return _ref5.apply(this, arguments);
            }

            return sendResetPassMail;
        }()
    }]);

    return MailService;
}(Service);

module.exports = MailService;
//# sourceMappingURL=mail.js.map