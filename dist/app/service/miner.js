'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = require('egg').Service;
var _ = require('lodash');

var MinerService = function (_Service) {
    _inherits(MinerService, _Service);

    function MinerService() {
        _classCallCheck(this, MinerService);

        return _possibleConstructorReturn(this, (MinerService.__proto__ || Object.getPrototypeOf(MinerService)).apply(this, arguments));
    }

    _createClass(MinerService, [{
        key: 'getByUserId',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(user_id) {
                var _this2 = this;

                var assets, data, start, result;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.app.mysql.select('miner', {
                                    where: { user_id: user_id }
                                });

                            case 2:
                                assets = _context3.sent;
                                data = [];

                                start = function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return Promise.all(assets.map(function () {
                                                            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj) {
                                                                var res, minerInfo;
                                                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                                                    while (1) {
                                                                        switch (_context.prev = _context.next) {
                                                                            case 0:
                                                                                _context.next = 2;
                                                                                return _this2.app.mysql.select('miner_shares', {
                                                                                    where: { miner_id: obj.miner_id },
                                                                                    orders: [['id', 'desc']],
                                                                                    limit: 1
                                                                                });

                                                                            case 2:
                                                                                res = _context.sent;
                                                                                minerInfo = {
                                                                                    id: obj.id,
                                                                                    miner_id: obj.miner_id,
                                                                                    miner_alias: obj.miner_alias,
                                                                                    status: res.status,
                                                                                    shares_1d: res.shares_1d,
                                                                                    shares_1d_unit: res.shares_1d_unit,
                                                                                    earn_coin_1d: res.earn_coin_1d
                                                                                };

                                                                                if (res !== undefined && res.length == 1) {
                                                                                    res = res[0];
                                                                                    minerInfo = Object.assign(minerInfo, {
                                                                                        status: 1,
                                                                                        shares_1d: res.shares_1d,
                                                                                        shares_1d_unit: res.shares_1d_unit,
                                                                                        earn_coin_1d: res.earn_coin_1d
                                                                                    });
                                                                                } else {
                                                                                    minerInfo = Object.assign(minerInfo, {
                                                                                        status: 0,
                                                                                        shares_1d: 0,
                                                                                        shares_1d_unit: 'T',
                                                                                        earn_coin_1d: 0
                                                                                    });
                                                                                }
                                                                                data.push(minerInfo);

                                                                            case 6:
                                                                            case 'end':
                                                                                return _context.stop();
                                                                        }
                                                                    }
                                                                }, _callee, _this2);
                                                            }));

                                                            return function (_x2) {
                                                                return _ref3.apply(this, arguments);
                                                            };
                                                        }()));

                                                    case 2:
                                                        return _context2.abrupt('return', data);

                                                    case 3:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this2);
                                    }));

                                    return function start() {
                                        return _ref2.apply(this, arguments);
                                    };
                                }();

                                result = start();
                                return _context3.abrupt('return', result);

                            case 7:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getByUserId(_x) {
                return _ref.apply(this, arguments);
            }

            return getByUserId;
        }()
    }, {
        key: 'getSharesByMinerId',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref4) {
                var miner_id = _ref4.miner_id,
                    _ref4$offset = _ref4.offset,
                    offset = _ref4$offset === undefined ? 0 : _ref4$offset,
                    _ref4$limit = _ref4.limit,
                    limit = _ref4$limit === undefined ? 20 : _ref4$limit;
                var ctx, uid, query, assets;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                ctx = this.ctx;
                                uid = ctx.account.user_id;
                                query = {
                                    where: { user_id: uid },
                                    orders: [['datetime', 'desc']], // 排序方式
                                    limit: limit, // 返回数据量
                                    offset: offset // 数据偏移量
                                };

                                if (miner_id != 0) {
                                    query.where = { miner_id: miner_id };
                                }
                                _context4.next = 6;
                                return this.app.mysql.select('miner_shares', query);

                            case 6:
                                assets = _context4.sent;
                                return _context4.abrupt('return', assets);

                            case 8:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getSharesByMinerId(_x3) {
                return _ref5.apply(this, arguments);
            }

            return getSharesByMinerId;
        }()
    }]);

    return MinerService;
}(Service);

module.exports = MinerService;
//# sourceMappingURL=miner.js.map