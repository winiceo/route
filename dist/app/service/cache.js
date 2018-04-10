'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = require('egg').Service;

var CacheService = function (_Service) {
    _inherits(CacheService, _Service);

    function CacheService() {
        _classCallCheck(this, CacheService);

        return _possibleConstructorReturn(this, (CacheService.__proto__ || Object.getPrototypeOf(CacheService)).apply(this, arguments));
    }

    _createClass(CacheService, [{
        key: 'get',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key) {
                var _app, redis, logger, t, data, duration;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _app = this.app, redis = _app.redis, logger = _app.logger;
                                t = Date.now();
                                _context.next = 4;
                                return redis.get(key);

                            case 4:
                                data = _context.sent;

                                if (data) {
                                    _context.next = 7;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 7:
                                data = JSON.parse(data);
                                duration = Date.now() - t;

                                logger.debug('Cache', 'get', key, (duration + 'ms').green);
                                return _context.abrupt('return', data);

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function get(_x) {
                return _ref.apply(this, arguments);
            }

            return get;
        }()
    }, {
        key: 'setex',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key, value, seconds) {
                var _app2, redis, logger, t, duration;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _app2 = this.app, redis = _app2.redis, logger = _app2.logger;
                                t = Date.now();

                                value = JSON.stringify(value);
                                _context2.next = 5;
                                return redis.set(key, value, 'EX', seconds);

                            case 5:
                                duration = Date.now() - t;

                                logger.debug('Cache', 'set', key, (duration + 'ms').green);

                            case 7:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function setex(_x2, _x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return setex;
        }()
    }, {
        key: 'incr',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(key, seconds) {
                var _app3, redis, logger, t, result, duration;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _app3 = this.app, redis = _app3.redis, logger = _app3.logger;
                                t = Date.now();
                                _context3.next = 4;
                                return redis.multi().incr(key).expire(key, seconds).exec();

                            case 4:
                                result = _context3.sent;
                                duration = Date.now() - t;

                                logger.debug('Cache', 'set', key, (duration + 'ms').green);
                                return _context3.abrupt('return', result[0][1]);

                            case 8:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function incr(_x5, _x6) {
                return _ref3.apply(this, arguments);
            }

            return incr;
        }()
    }]);

    return CacheService;
}(Service);

module.exports = CacheService;
//# sourceMappingURL=cache.js.map