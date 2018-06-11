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
    var MinerController = function (_app$Controller) {
        _inherits(MinerController, _app$Controller);

        function MinerController() {
            _classCallCheck(this, MinerController);

            return _possibleConstructorReturn(this, (MinerController.__proto__ || Object.getPrototypeOf(MinerController)).apply(this, arguments));
        }

        _createClass(MinerController, [{
            key: 'index',
            value: function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var ctx, service, config, ret, uid, assets, data;
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
                                    uid = ctx.account.user_id;
                                    _context.next = 5;
                                    return service.miner.getByUserId(uid);

                                case 5:
                                    assets = _context.sent;
                                    data = {
                                        assets: {
                                            'yesterday_balance': 2.5,
                                            'lrc_cny': 10.6,
                                            'total_balance': 2343
                                        },
                                        data: assets

                                    };

                                    ret.data = data;
                                    ctx.body = ret;

                                case 9:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function index() {
                    return _ref.apply(this, arguments);
                }

                return index;
            }()
        }, {
            key: 'detail',
            value: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var ctx, service, config, miner_id, params, page, pageSize, ret, miner_shares;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    ctx = this.ctx, service = this.service, config = this.config;
                                    miner_id = ctx.params.miner_id;
                                    params = ctx.request.query;
                                    page = parseInt(ctx.request.body.page) || 1;
                                    pageSize = 20;

                                    if (page < 1) {
                                        page = 1;
                                    }

                                    ret = {
                                        status: 422,
                                        message: '',
                                        data: {}
                                    };


                                    console.log(page);

                                    _context2.next = 10;
                                    return service.miner.getSharesByMinerId({
                                        miner_id: miner_id,
                                        pageNumber: page,
                                        pageSize: pageSize
                                    });

                                case 10:
                                    miner_shares = _context2.sent;


                                    ret.status = 200;

                                    ret.data = miner_shares;
                                    ctx.body = ret;

                                case 14:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                function detail() {
                    return _ref2.apply(this, arguments);
                }

                return detail;
            }()
        }, {
            key: 'rename',
            value: function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                    var ctx, service, config, id, miner_alias, ret, miner_shares;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    ctx = this.ctx, service = this.service, config = this.config;
                                    id = ctx.request.body.id;
                                    miner_alias = ctx.request.body.miner_alias;
                                    ret = {
                                        status: 422,
                                        message: '',
                                        data: {}
                                    };
                                    _context3.next = 6;
                                    return service.miner.rename({
                                        id: id,
                                        miner_alias: miner_alias
                                    });

                                case 6:
                                    miner_shares = _context3.sent;


                                    ret.status = 200;
                                    ret.message = "修改成功";
                                    ctx.body = ret;

                                case 10:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));

                function rename() {
                    return _ref3.apply(this, arguments);
                }

                return rename;
            }()
        }]);

        return MinerController;
    }(app.Controller);

    return MinerController;
};
//# sourceMappingURL=miner.js.map