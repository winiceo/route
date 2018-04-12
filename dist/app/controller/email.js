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
    var EmailController = function (_app$Controller) {
        _inherits(EmailController, _app$Controller);

        function EmailController() {
            _classCallCheck(this, EmailController);

            return _possibleConstructorReturn(this, (EmailController.__proto__ || Object.getPrototypeOf(EmailController)).apply(this, arguments));
        }

        _createClass(EmailController, [{
            key: 'sendCaptcha',
            value: function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var ctx, service, config, email, ret, msg, rd;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    ctx = this.ctx, service = this.service, config = this.config;
                                    email = validator.trim(ctx.request.body.email || '').toLowerCase();
                                    ret = {
                                        status: 422,
                                        message: '',
                                        data: {}
                                    };
                                    msg = null;
                                    // 验证信息的正确性

                                    if (validator.isEmail(email)) {
                                        _context.next = 10;
                                        break;
                                    }

                                    msg = '邮箱不合法。';
                                    ctx.status = 422;
                                    ret.message = msg;
                                    ctx.body = ret;
                                    return _context.abrupt('return');

                                case 10:
                                    rd = ctx.helper.getRandomIntInclusive(999999, 100000);

                                    // 发送激活邮件

                                    _context.next = 13;
                                    return service.mail.sendActiveMail(email, rd);

                                case 13:
                                    console.log(rd);
                                    ret.status = 200;
                                    ctx.body = ret;

                                case 16:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function sendCaptcha() {
                    return _ref.apply(this, arguments);
                }

                return sendCaptcha;
            }()
        }]);

        return EmailController;
    }(app.Controller);

    return EmailController;
};
//# sourceMappingURL=email.js.map