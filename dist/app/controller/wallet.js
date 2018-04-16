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
    var WalletController = function (_app$Controller) {
        _inherits(WalletController, _app$Controller);

        function WalletController() {
            _classCallCheck(this, WalletController);

            return _possibleConstructorReturn(this, (WalletController.__proto__ || Object.getPrototypeOf(WalletController)).apply(this, arguments));
        }

        _createClass(WalletController, [{
            key: 'assets',
            value: function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var ctx, service, config, ret, uid, assets;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    ctx = this.ctx, service = this.service, config = this.config;
                                    ret = {
                                        status: 200,
                                        message: '',
                                        data: {}
                                    };


                                    ret.status = 200;
                                    uid = ctx.account.user_id;
                                    _context.next = 6;
                                    return service.asset.getByUserId(uid);

                                case 6:
                                    assets = _context.sent;


                                    ret.data = assets;
                                    ctx.body = ret;

                                case 9:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function assets() {
                    return _ref.apply(this, arguments);
                }

                return assets;
            }()
        }, {
            key: 'withdraw',
            value: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var ctx, service, config, coin_type, address, amount, captcha, user_id, ret, withdraw;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    ctx = this.ctx, service = this.service, config = this.config;
                                    coin_type = validator.trim(ctx.request.body.coin_type || '').toLowerCase();
                                    address = validator.trim(ctx.request.body.address || '');
                                    amount = validator.trim(String(ctx.request.body.amount) || '');
                                    captcha = validator.trim(String(ctx.request.body.captcha) || '');
                                    user_id = ctx.account.user_id;

                                    console.log(ctx.account);
                                    ret = {
                                        status: 200,
                                        message: '',
                                        data: {}
                                    };
                                    _context2.next = 10;
                                    return service.withdraw.newAndSave({
                                        user_id: user_id,
                                        coin_type: coin_type,
                                        address: address,
                                        amount: amount
                                    });

                                case 10:
                                    withdraw = _context2.sent;


                                    ctx.body = ret;

                                case 12:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                function withdraw() {
                    return _ref2.apply(this, arguments);
                }

                return withdraw;
            }()
        }, {
            key: 'withdrawHistory',
            value: function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                    var ctx, service, config, ret, user_id, withdrawList;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    ctx = this.ctx, service = this.service, config = this.config;
                                    ret = {
                                        status: 200,
                                        message: '',
                                        data: {}
                                    };
                                    user_id = ctx.account.user_id;
                                    _context3.next = 5;
                                    return service.withdraw.findAll({
                                        user_id: user_id

                                    });

                                case 5:
                                    withdrawList = _context3.sent;

                                    ret.data = withdrawList;
                                    ctx.body = ret;

                                case 8:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));

                function withdrawHistory() {
                    return _ref3.apply(this, arguments);
                }

                return withdrawHistory;
            }()
        }]);

        return WalletController;
    }(app.Controller);

    return WalletController;
};
//# sourceMappingURL=wallet.js.map