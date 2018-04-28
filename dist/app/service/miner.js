'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = require('egg').Service;

var MinerService = function (_Service) {
    _inherits(MinerService, _Service);

    function MinerService() {
        _classCallCheck(this, MinerService);

        return _possibleConstructorReturn(this, (MinerService.__proto__ || Object.getPrototypeOf(MinerService)).apply(this, arguments));
    }

    _createClass(MinerService, [{
        key: 'getByUserId',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user_id) {
                var assets;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.app.mysql.select('miner', {
                                    where: { user_id: user_id }
                                });

                            case 2:
                                assets = _context.sent;
                                return _context.abrupt('return', assets);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getByUserId(_x) {
                return _ref.apply(this, arguments);
            }

            return getByUserId;
        }()
    }, {
        key: 'getSharesByMinerId',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
                var miner_id = _ref2.miner_id,
                    _ref2$offset = _ref2.offset,
                    offset = _ref2$offset === undefined ? 0 : _ref2$offset,
                    _ref2$limit = _ref2.limit,
                    limit = _ref2$limit === undefined ? 20 : _ref2$limit;
                var query, assets;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                query = {

                                    orders: [['datetime', 'desc']], // 排序方式
                                    limit: limit, // 返回数据量
                                    offset: offset // 数据偏移量
                                };

                                if (miner_id != 0) {
                                    query.where = { miner_id: miner_id };
                                }
                                _context2.next = 4;
                                return this.app.mysql.select('miner_shares', query);

                            case 4:
                                assets = _context2.sent;
                                return _context2.abrupt('return', assets);

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getSharesByMinerId(_x2) {
                return _ref3.apply(this, arguments);
            }

            return getSharesByMinerId;
        }()
    }]);

    return MinerService;
}(Service);

module.exports = MinerService;
//# sourceMappingURL=miner.js.map