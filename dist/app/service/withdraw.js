'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = require('egg').Service;

var WithdrawService = function (_Service) {
    _inherits(WithdrawService, _Service);

    function WithdrawService() {
        _classCallCheck(this, WithdrawService);

        return _possibleConstructorReturn(this, (WithdrawService.__proto__ || Object.getPrototypeOf(WithdrawService)).apply(this, arguments));
    }

    _createClass(WithdrawService, [{
        key: 'newAndSave',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
                var ret;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.app.mysql.insert('withdraw', data);

                            case 2:
                                ret = _context.sent;
                                return _context.abrupt('return', ret);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function newAndSave(_x) {
                return _ref.apply(this, arguments);
            }

            return newAndSave;
        }()
    }, {
        key: 'findAll',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
                var _ref2$pageNumber = _ref2.pageNumber,
                    pageNumber = _ref2$pageNumber === undefined ? 1 : _ref2$pageNumber,
                    _ref2$pageSize = _ref2.pageSize,
                    pageSize = _ref2$pageSize === undefined ? 20 : _ref2$pageSize;
                var ctx, uid, query, result, totalCount;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                ctx = this.ctx;
                                uid = ctx.account.user_id;
                                query = {
                                    user_id: uid
                                };
                                _context2.next = 5;
                                return this.app.mysql.select('withdraw', {
                                    where: query,
                                    limit: Number(pageSize), // 返回数据量
                                    offset: (pageNumber - 1) * pageSize, // 数据偏移量
                                    orders: [['created_at', 'desc']] // 排序方式
                                });

                            case 5:
                                result = _context2.sent;
                                _context2.next = 8;
                                return this.app.mysql.count('withdraw', query);

                            case 8:
                                totalCount = _context2.sent;
                                return _context2.abrupt('return', {
                                    data: result,
                                    page: {
                                        'current_page': Number(pageNumber),
                                        'total_page': Math.ceil(result.length / pageSize),
                                        'total': totalCount
                                    }

                                });

                            case 10:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function findAll(_x2) {
                return _ref3.apply(this, arguments);
            }

            return findAll;
        }()
    }]);

    return WithdrawService;
}(Service);

module.exports = WithdrawService;
//# sourceMappingURL=withdraw.js.map