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
    var BalanceController = function (_app$Controller) {
        _inherits(BalanceController, _app$Controller);

        function BalanceController() {
            _classCallCheck(this, BalanceController);

            return _possibleConstructorReturn(this, (BalanceController.__proto__ || Object.getPrototypeOf(BalanceController)).apply(this, arguments));
        }

        _createClass(BalanceController, [{
            key: 'total',
            value: function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var ctx, service, config, ret;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    ctx = this.ctx, service = this.service, config = this.config;
                                    ret = {
                                        status: 422,
                                        message: '',
                                        data: {}
                                    };


                                    ret.status = 200;

                                    ret.data = {
                                        can_use_balance: 5.5,
                                        total_balance: 15.5

                                    };
                                    ctx.body = ret;

                                case 5:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function total() {
                    return _ref.apply(this, arguments);
                }

                return total;
            }()
        }]);

        return BalanceController;
    }(app.Controller);

    return BalanceController;
};
//# sourceMappingURL=balance.js.map