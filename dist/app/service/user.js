'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var utility = require('utility');
var uuid = require('uuid');
var Service = require('egg').Service;

var UserService = function (_Service) {
    _inherits(UserService, _Service);

    function UserService() {
        _classCallCheck(this, UserService);

        return _possibleConstructorReturn(this, (UserService.__proto__ || Object.getPrototypeOf(UserService)).apply(this, arguments));
    }

    _createClass(UserService, [{
        key: 'getUsersByNames',

        /*
        * 根据用户名列表查找用户列表
        * @param {Array} names 用户名列表
        * @return {Promise[users]} 承载用户列表的 Promise 对象
        */
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(names) {
                var query;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(names.length === 0)) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return', []);

                            case 2:
                                query = { loginname: { $in: names } };
                                return _context.abrupt('return', this.ctx.model.User.find(query).exec());

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUsersByNames(_x) {
                return _ref.apply(this, arguments);
            }

            return getUsersByNames;
        }()

        /*
        * 根据登录名查找用户
        * @param {String} loginName 登录名
        * @return {Promise[user]} 承载用户的 Promise 对象
        */

    }, {
        key: 'getUserByLoginName',
        value: function getUserByLoginName(loginName) {
            var query = { loginname: new RegExp('^' + loginName + '$', 'i') };
            return this.ctx.model.User.findOne(query).exec();
        }

        /*
        * 根据 githubId 查找用户
        * @param {String} githubId 登录名
        * @return {Promise[user]} 承载用户的 Promise 对象
        */

    }, {
        key: 'getUserByGithubId',
        value: function getUserByGithubId(githubId) {
            var query = { githubId: githubId };
            return this.ctx.model.User.findOne(query).exec();
        }

        /*
        * 根据用户ID，查找用户
        * @param {String} id 用户ID
        * @return {Promise[user]} 承载用户的 Promise 对象
        */

    }, {
        key: 'getUserById',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (id) {
                                    _context2.next = 2;
                                    break;
                                }

                                return _context2.abrupt('return', null);

                            case 2:
                                return _context2.abrupt('return', this.ctx.model.User.findOne({ _id: id }).exec());

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getUserById(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getUserById;
        }()

        /*
        * 根据邮箱，查找用户
        * @param {String} email 邮箱地址
        * @return {Promise[user]} 承载用户的 Promise 对象
        */

    }, {
        key: 'getUserByMail',
        value: function getUserByMail(email) {
            return this.ctx.model.User.findOne({ email: email }).exec();
        }

        /*
        * 根据用户ID列表，获取一组用户
        * @param {Array} ids 用户ID列表
        * @return {Promise[users]} 承载用户列表的 Promise 对象
        */

    }, {
        key: 'getUsersByIds',
        value: function getUsersByIds(ids) {
            return this.ctx.model.User.find({ _id: { $in: ids } }).exec();
        }

        /*
        * 根据关键字，获取一组用户
        * Callback:
        * - err, 数据库异常
        * - users, 用户列表
        * @param {String} query 关键字
        * @param {Object} opt 选项
        * @return {Promise[users]} 承载用户列表的 Promise 对象
        */

    }, {
        key: 'getUsersByQuery',
        value: function getUsersByQuery(query, opt) {
            return this.ctx.model.User.find(query, '', opt).exec();
        }

        /*
        * 获取关键词能搜索到的用户数量
        * @param {String} query 搜索关键词
        */

    }, {
        key: 'getCountByQuery',
        value: function getCountByQuery(query) {
            return this.ctx.model.User.count(query).exec();
        }

        /*
        * 根据查询条件，获取一个用户
        * @param {String} name 用户名
        * @param {String} key 激活码
        * @return {Promise[user]} 承载用户的 Promise 对象
        */

    }, {
        key: 'getUserByNameAndKey',
        value: function getUserByNameAndKey(loginname, key) {
            var query = { loginname: loginname, retrieve_key: key };
            return this.ctx.model.User.findOne(query).exec();
        }
    }, {
        key: 'incrementScoreAndReplyCount',
        value: function incrementScoreAndReplyCount(id, score, replyCount) {
            var query = { _id: id };
            var update = { $inc: { score: score, reply_count: replyCount } };
            return this.ctx.model.User.findByIdAndUpdate(query, update).exec();
        }
    }, {
        key: 'incrementCollectTopicCount',
        value: function incrementCollectTopicCount(id) {
            var query = { _id: id };
            var update = { $inc: { collect_topic_count: 1 } };
            return this.ctx.model.User.findByIdAndUpdate(query, update).exec();
        }
    }, {
        key: 'newAndSave',
        value: function newAndSave(name, loginname, pass, email, avatar_url, active) {
            var user = new this.ctx.model.User();
            user.name = loginname;
            user.loginname = loginname;
            user.pass = pass;
            user.email = email;
            user.avatar = avatar_url;
            user.active = active || false;
            user.accessToken = uuid.v4();

            return user.save();
        }
    }, {
        key: 'makeGravatar',
        value: function makeGravatar(email) {
            return 'http://www.gravatar.com/avatar/' + utility.md5(email.toLowerCase()) + '?size=48';
        }
    }, {
        key: 'getGravatar',
        value: function getGravatar(user) {
            return user.avatar || this.makeGravatar(user.email);
        }
    }]);

    return UserService;
}(Service);

module.exports = UserService;
//# sourceMappingURL=user.js.map