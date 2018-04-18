'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = require('egg').Service;

var AccountService = function (_Service) {
    _inherits(AccountService, _Service);

    function AccountService() {
        _classCallCheck(this, AccountService);

        return _possibleConstructorReturn(this, (AccountService.__proto__ || Object.getPrototypeOf(AccountService)).apply(this, arguments));
    }

    _createClass(AccountService, [{
        key: 'getUserByMail',


        /*
        * 根据邮箱，查找用户
        * @param {String} email 邮箱地址
        * @return {Promise[user]} 承载用户的 Promise 对象
        */
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email) {
                var ret;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.app.mysql.get('users', { email: email });

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

            function getUserByMail(_x) {
                return _ref.apply(this, arguments);
            }

            return getUserByMail;
        }()
    }, {
        key: 'newAndSave',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email, password) {
                var ret;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.app.mysql.insert('users', { email: email, password: password });

                            case 2:
                                ret = _context2.sent;
                                return _context2.abrupt('return', ret);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function newAndSave(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return newAndSave;
        }()
    }, {
        key: 'updateUser',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
                var ret;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:

                                console.log(data);

                                _context3.next = 3;
                                return this.app.mysql.update('users', data, { where: { id: data.id } });

                            case 3:
                                ret = _context3.sent;
                                return _context3.abrupt('return', ret);

                            case 5:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function updateUser(_x4) {
                return _ref3.apply(this, arguments);
            }

            return updateUser;
        }()
    }]);

    return AccountService;
}(Service);

module.exports = AccountService;
//# sourceMappingURL=account.js.map