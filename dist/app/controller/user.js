'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('lodash');
var utility = require('utility');
var validator = require('validator');
var Controller = require('egg').Controller;

var UserController = function (_Controller) {
    _inherits(UserController, _Controller);

    function UserController() {
        _classCallCheck(this, UserController);

        return _possibleConstructorReturn(this, (UserController.__proto__ || Object.getPrototypeOf(UserController)).apply(this, arguments));
    }

    _createClass(UserController, [{
        key: 'index',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var ctx, service, config, user_name, user, query, opt, _ref2, _ref3, recent_topics, replies, topic_ids, recent_replies, token;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                ctx = this.ctx, service = this.service, config = this.config;
                                user_name = ctx.params.name;
                                _context.next = 4;
                                return ctx.service.user.getUserByLoginName(user_name);

                            case 4:
                                user = _context.sent;

                                if (user) {
                                    _context.next = 9;
                                    break;
                                }

                                ctx.status = 404;
                                ctx.message = '这个用户不存在。';
                                return _context.abrupt('return');

                            case 9:
                                query = { author_id: user._id };
                                opt = { limit: 5, sort: '-create_at' };
                                _context.next = 13;
                                return Promise.all([service.topic.getTopicsByQuery(query, opt), service.reply.getRepliesByAuthorId(user._id, { limit: 20, sort: '-create_at' })]);

                            case 13:
                                _ref2 = _context.sent;
                                _ref3 = _slicedToArray(_ref2, 2);
                                recent_topics = _ref3[0];
                                replies = _ref3[1];


                                // 只显示最近5条
                                topic_ids = [].concat(_toConsumableArray(new Set(replies.map(function (reply) {
                                    return reply.topic_id.toString();
                                })))).slice(0, 5);


                                query = { _id: { $in: topic_ids } };
                                _context.next = 21;
                                return service.topic.getTopicsByQuery(query, {});

                            case 21:
                                recent_replies = _context.sent;


                                recent_replies = _.sortBy(recent_replies, function (topic) {
                                    return topic_ids.indexOf(topic._id.toString());
                                });

                                user.url = function () {
                                    if (user.url && user.url.indexOf('http') !== 0) {
                                        return 'http://' + user.url;
                                    }
                                    return user.url;
                                }();

                                // 如果用户没有激活，那么管理员可以帮忙激活
                                token = '';

                                if (!user.active && ctx.user && ctx.user.is_admin) {
                                    token = utility.md5(user.email + user.pass + config.session_secret);
                                }

                                _context.next = 28;
                                return ctx.render('user/index', {
                                    user: user,
                                    recent_topics: recent_topics,
                                    recent_replies: recent_replies,
                                    token: token,
                                    pageTitle: '@' + user.loginname + ' \u7684\u4E2A\u4EBA\u4E3B\u9875'
                                });

                            case 28:
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
        key: 'listStars',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var ctx, service, stars;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                ctx = this.ctx, service = this.service;
                                _context2.next = 3;
                                return service.user.getUsersByQuery({ is_star: true }, {});

                            case 3:
                                stars = _context2.sent;
                                _context2.next = 6;
                                return ctx.render('user/stars', { stars: stars });

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function listStars() {
                return _ref4.apply(this, arguments);
            }

            return listStars;
        }()
    }, {
        key: 'top100',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var ctx, service, opt, tops;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                ctx = this.ctx, service = this.service;
                                opt = { limit: 100, sort: '-score' };
                                _context3.next = 4;
                                return service.user.getUsersByQuery({ is_block: false }, opt);

                            case 4:
                                tops = _context3.sent;
                                _context3.next = 7;
                                return ctx.render('user/top100', {
                                    users: tops,
                                    pageTitle: 'top100'
                                });

                            case 7:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function top100() {
                return _ref5.apply(this, arguments);
            }

            return top100;
        }()
    }, {
        key: 'listCollectedTopics',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var ctx, service, name, page, limit, user, pages, opt, collects, ids, query, topics;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                ctx = this.ctx, service = this.service;
                                name = ctx.params.name;
                                page = Number(ctx.query.page) || 1;
                                limit = this.config.list_topic_count;
                                _context4.next = 6;
                                return service.user.getUserByLoginName(name);

                            case 6:
                                user = _context4.sent;

                                if (user) {
                                    _context4.next = 11;
                                    break;
                                }

                                ctx.status = 404;
                                ctx.message = '这个用户不存在。';
                                return _context4.abrupt('return');

                            case 11:
                                pages = Math.ceil(user.collect_topic_count / limit);
                                opt = { skip: (page - 1) * limit, limit: limit };
                                _context4.next = 15;
                                return service.topicCollect.getTopicCollectsByUserId(user._id, opt);

                            case 15:
                                collects = _context4.sent;
                                ids = collects.map(function (doc) {
                                    return doc.topic_id.toString();
                                });
                                query = { _id: { $in: ids } };
                                _context4.next = 20;
                                return service.topic.getTopicsByQuery(query, {});

                            case 20:
                                topics = _context4.sent;

                                topics = _.sortBy(topics, function (topic) {
                                    return ids.indexOf(topic._id.toString());
                                });

                                _context4.next = 24;
                                return ctx.render('user/collect_topics', {
                                    topics: topics,
                                    current_page: page,
                                    pages: pages,
                                    user: user
                                });

                            case 24:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function listCollectedTopics() {
                return _ref6.apply(this, arguments);
            }

            return listCollectedTopics;
        }()
    }, {
        key: 'listTopics',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var ctx, service, config, user_name, page, limit, user, query, opt, _ref8, _ref9, topics, all_topics_count, pages;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                ctx = this.ctx, service = this.service, config = this.config;
                                user_name = ctx.params.name;
                                page = Number(ctx.query.page) || 1;
                                limit = config.list_topic_count;
                                _context5.next = 6;
                                return service.user.getUserByLoginName(user_name);

                            case 6:
                                user = _context5.sent;

                                if (user) {
                                    _context5.next = 11;
                                    break;
                                }

                                ctx.status = 404;
                                ctx.message = '这个用户不存在。';
                                return _context5.abrupt('return');

                            case 11:
                                query = { author_id: user._id };
                                opt = { skip: (page - 1) * limit, limit: limit, sort: '-create_at' };
                                _context5.next = 15;
                                return Promise.all([service.topic.getTopicsByQuery(query, opt), service.topic.getCountByQuery(query)]);

                            case 15:
                                _ref8 = _context5.sent;
                                _ref9 = _slicedToArray(_ref8, 2);
                                topics = _ref9[0];
                                all_topics_count = _ref9[1];
                                pages = Math.ceil(all_topics_count / limit);
                                _context5.next = 22;
                                return ctx.render('user/topics', {
                                    user: user,
                                    topics: topics,
                                    current_page: page,
                                    pages: pages
                                });

                            case 22:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function listTopics() {
                return _ref7.apply(this, arguments);
            }

            return listTopics;
        }()
    }, {
        key: 'listReplies',
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var ctx, service, user_name, page, limit, user, opt, replies, topic_ids, query, topics, count, pages;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                ctx = this.ctx, service = this.service;
                                user_name = ctx.params.name;
                                page = Number(ctx.query.page) || 1;
                                limit = 50;
                                _context6.next = 6;
                                return service.user.getUserByLoginName(user_name);

                            case 6:
                                user = _context6.sent;

                                if (user) {
                                    _context6.next = 11;
                                    break;
                                }

                                ctx.status = 404;
                                ctx.message = '这个用户不存在。';
                                return _context6.abrupt('return');

                            case 11:
                                opt = { skip: (page - 1) * limit, limit: limit, sort: '-create_at' };
                                _context6.next = 14;
                                return service.reply.getRepliesByAuthorId(user._id, opt);

                            case 14:
                                replies = _context6.sent;
                                topic_ids = [].concat(_toConsumableArray(new Set(replies.map(function (reply) {
                                    return reply.topic_id.toString();
                                }))));
                                // 获取所有有评论的主题

                                query = { _id: { $in: topic_ids } };
                                _context6.next = 19;
                                return service.topic.getTopicsByQuery(query, {});

                            case 19:
                                topics = _context6.sent;

                                topics = _.sortBy(topics, function (topic) {
                                    return topic_ids.indexOf(topic._id.toString());
                                });
                                _context6.next = 23;
                                return service.reply.getCountByAuthorId(user._id);

                            case 23:
                                count = _context6.sent;
                                pages = Math.ceil(count / limit);
                                _context6.next = 27;
                                return ctx.render('user/replies', {
                                    user: user,
                                    topics: topics,
                                    current_page: page,
                                    pages: pages
                                });

                            case 27:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function listReplies() {
                return _ref10.apply(this, arguments);
            }

            return listReplies;
        }()
    }, {
        key: 'showSetting',
        value: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var ctx, service, id, user;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                ctx = this.ctx, service = this.service;
                                id = ctx.user._id;
                                _context7.next = 4;
                                return service.user.getUserById(id);

                            case 4:
                                user = _context7.sent;


                                if (ctx.request.query.save === 'success') {
                                    user.success = '保存成功。';
                                }

                                _context7.next = 8;
                                return ctx.render('user/setting', { user: user, pageTitle: '设置' });

                            case 8:
                                return _context7.abrupt('return', _context7.sent);

                            case 9:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function showSetting() {
                return _ref11.apply(this, arguments);
            }

            return showSetting;
        }()
    }, {
        key: 'setting',
        value: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                // 显示出错或成功信息
                var showMessage = function () {
                    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(msg, data, isSuccess) {
                        var user;
                        return regeneratorRuntime.wrap(function _callee8$(_context8) {
                            while (1) {
                                switch (_context8.prev = _context8.next) {
                                    case 0:
                                        data = data || ctx.request.body;
                                        user = {
                                            loginname: data.loginname,
                                            email: data.email,
                                            url: data.url,
                                            location: data.location,
                                            signature: data.signature,
                                            weibo: data.weibo,
                                            accessToken: data.accessToken
                                        };


                                        if (isSuccess) {
                                            user.success = msg;
                                        } else {
                                            user.error = msg;
                                        }

                                        _context8.next = 5;
                                        return ctx.render('user/setting', { user: user });

                                    case 5:
                                        return _context8.abrupt('return', _context8.sent);

                                    case 6:
                                    case 'end':
                                        return _context8.stop();
                                }
                            }
                        }, _callee8, this);
                    }));

                    return function showMessage(_x, _x2, _x3) {
                        return _ref13.apply(this, arguments);
                    };
                }();

                // post


                var ctx, service, body, action, url, location, weibo, signature, user, oldPass, newPass, _user, equal, newPassHash;

                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                ctx = this.ctx, service = this.service;
                                body = ctx.request.body;
                                action = body.action;

                                if (!(action === 'change_setting')) {
                                    _context9.next = 18;
                                    break;
                                }

                                url = validator.trim(body.url);
                                location = validator.trim(body.location);
                                weibo = validator.trim(body.weibo);
                                signature = validator.trim(body.signature);
                                _context9.next = 10;
                                return service.user.getUserById(ctx.user._id);

                            case 10:
                                user = _context9.sent;

                                user.url = url;
                                user.location = location;
                                user.signature = signature;
                                user.weibo = weibo;
                                _context9.next = 17;
                                return user.save();

                            case 17:
                                return _context9.abrupt('return', ctx.redirect('/setting?save=success'));

                            case 18:
                                if (!(action === 'change_password')) {
                                    _context9.next = 34;
                                    break;
                                }

                                oldPass = validator.trim(body.old_pass);
                                newPass = validator.trim(body.new_pass);

                                if (!(!oldPass || !newPass)) {
                                    _context9.next = 23;
                                    break;
                                }

                                return _context9.abrupt('return', showMessage('旧密码或新密码不得为空'));

                            case 23:
                                _context9.next = 25;
                                return service.user.getUserById(ctx.user._id);

                            case 25:
                                _user = _context9.sent;
                                equal = ctx.helper.bcompare(oldPass, _user.pass);

                                if (equal) {
                                    _context9.next = 29;
                                    break;
                                }

                                return _context9.abrupt('return', showMessage('当前密码不正确。', _user));

                            case 29:
                                newPassHash = ctx.helper.bhash(newPass);

                                _user.pass = newPassHash;
                                _context9.next = 33;
                                return _user.save();

                            case 33:
                                return _context9.abrupt('return', showMessage('密码已被修改。', _user, true));

                            case 34:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function setting() {
                return _ref12.apply(this, arguments);
            }

            return setting;
        }()
    }, {
        key: 'toggleStar',
        value: function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                var ctx, service, user_id, user;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                ctx = this.ctx, service = this.service;
                                user_id = ctx.request.body.user_id;
                                _context10.next = 4;
                                return service.user.getUserById(user_id);

                            case 4:
                                user = _context10.sent;

                                user.is_star = !user.is_star;
                                _context10.next = 8;
                                return user.save();

                            case 8:
                                ctx.body = { status: 'success' };
                                return _context10.abrupt('return');

                            case 10:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function toggleStar() {
                return _ref14.apply(this, arguments);
            }

            return toggleStar;
        }()
    }, {
        key: 'block',
        value: function () {
            var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                var ctx, service, action, loginname, user;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                ctx = this.ctx, service = this.service;
                                action = ctx.request.body.action;
                                loginname = ctx.params.name;
                                _context11.next = 5;
                                return service.user.getUserByLoginName(loginname);

                            case 5:
                                user = _context11.sent;

                                if (!(action === 'set_block')) {
                                    _context11.next = 13;
                                    break;
                                }

                                user.is_block = true;
                                _context11.next = 10;
                                return user.save();

                            case 10:
                                ctx.body = { status: 'success' };
                                _context11.next = 18;
                                break;

                            case 13:
                                if (!(action === 'cancel_block')) {
                                    _context11.next = 18;
                                    break;
                                }

                                user.is_block = false;
                                _context11.next = 17;
                                return user.save();

                            case 17:
                                ctx.body = { status: 'success' };

                            case 18:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function block() {
                return _ref15.apply(this, arguments);
            }

            return block;
        }()
    }, {
        key: 'deleteAll',
        value: function () {
            var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                var ctx, service, loginname, user;
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                ctx = this.ctx, service = this.service;
                                loginname = ctx.params.name;
                                _context12.next = 4;
                                return service.user.getUserByLoginName(loginname);

                            case 4:
                                user = _context12.sent;
                                _context12.next = 7;
                                return ctx.model.Topic.update({ author_id: user._id }, { $set: { deleted: true } }, { multi: true });

                            case 7:
                                _context12.next = 9;
                                return ctx.model.Reply.update({ author_id: user._id }, { $set: { deleted: true } }, { multi: true });

                            case 9:
                                _context12.next = 11;
                                return ctx.model.Reply.update({}, { $pull: { ups: user._id } }, { multi: true });

                            case 11:
                                ctx.body = { status: 'success' };

                            case 12:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function deleteAll() {
                return _ref16.apply(this, arguments);
            }

            return deleteAll;
        }()
    }]);

    return UserController;
}(Controller);

module.exports = UserController;
//# sourceMappingURL=user.js.map