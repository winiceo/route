'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = require('egg').Service;

/*
 * type:
 * reply: xx 回复了你的话题
 * reply2: xx 在话题中回复了你
 * follow: xx 关注了你
 * at: xx ＠了你
 */

var MessageService = function (_Service) {
    _inherits(MessageService, _Service);

    function MessageService() {
        _classCallCheck(this, MessageService);

        return _possibleConstructorReturn(this, (MessageService.__proto__ || Object.getPrototypeOf(MessageService)).apply(this, arguments));
    }

    _createClass(MessageService, [{
        key: 'getMessagesCount',

        /*
        * 根据用户ID，获取未读消息的数量
        * Callback:
        * @param {String} id 用户ID
        * @return {Promise[messagesCount]} 承载消息列表的 Promise 对象
        */
        value: function getMessagesCount(id) {
            return this.ctx.model.Message.count({
                master_id: id,
                has_read: false
            }).exec();
        }
    }, {
        key: 'getMessageRelations',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(message) {
                var _ref2, _ref3, author, topic, reply;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(message.type === 'reply' || message.type === 'reply2' || message.type === 'at')) {
                                    _context.next = 13;
                                    break;
                                }

                                _context.next = 3;
                                return Promise.all([this.service.user.getUserById(message.author_id), this.service.topic.getTopicById(message.topic_id), this.service.reply.getReplyById(message.reply_id)]);

                            case 3:
                                _ref2 = _context.sent;
                                _ref3 = _slicedToArray(_ref2, 3);
                                author = _ref3[0];
                                topic = _ref3[1];
                                reply = _ref3[2];


                                message.author = author;
                                message.topic = topic;
                                message.reply = reply;

                                if (!author || !topic) {
                                    message.is_invalid = true;
                                }

                                return _context.abrupt('return', message);

                            case 13:
                                return _context.abrupt('return', { is_invalid: true });

                            case 14:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getMessageRelations(_x) {
                return _ref.apply(this, arguments);
            }

            return getMessageRelations;
        }()

        /*
        * 根据消息Id获取消息
        * @param {String} id 消息ID
        * @return {Promise[message]} 承载消息的 Promise 对象
        */

    }, {
        key: 'getMessageById',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
                var message;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.ctx.model.Message.findOne({ _id: id }).exec();

                            case 2:
                                message = _context2.sent;
                                return _context2.abrupt('return', this.getMessageRelations(message));

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getMessageById(_x2) {
                return _ref4.apply(this, arguments);
            }

            return getMessageById;
        }()

        /*
        * 根据用户ID，获取已读消息列表
        * @param {String} userId 用户ID
        * @return {Promise[messages]} 承载消息列表的 Promise 对象
        */

    }, {
        key: 'getReadMessagesByUserId',
        value: function getReadMessagesByUserId(userId) {
            var query = { master_id: userId, has_read: true };
            return this.ctx.model.Message.find(query, null, {
                sort: '-create_at',
                limit: 20
            }).exec();
        }

        /*
        * 根据用户ID，获取未读消息列表
        * @param {String} userId 用户ID
        * @return {Promise[messages]} 承载消息列表的 Promise 对象
        */

    }, {
        key: 'getUnreadMessagesByUserId',
        value: function getUnreadMessagesByUserId(userId) {
            var query = { master_id: userId, has_read: false };
            return this.ctx.model.Message.find(query, null, {
                sort: '-create_at'
            }).exec();
        }

        /*
        * 将消息设置成已读
        * @return {Promise[messages]} 承载消息列表的 Promise 对象
        */

    }, {
        key: 'updateMessagesToRead',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userId, messages) {
                var ids, query, update, opts;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!(messages.length === 0)) {
                                    _context3.next = 2;
                                    break;
                                }

                                return _context3.abrupt('return');

                            case 2:
                                ids = messages.map(function (m) {
                                    return m.id;
                                });
                                query = { master_id: userId, _id: { $in: ids } };
                                update = { $set: { has_read: true } };
                                opts = { multi: true };
                                return _context3.abrupt('return', this.ctx.model.Message.update(query, update, opts).exec());

                            case 7:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function updateMessagesToRead(_x3, _x4) {
                return _ref5.apply(this, arguments);
            }

            return updateMessagesToRead;
        }()

        /**
        * 将单个消息设置成已读
        * @param {String} msgId 消息 ID
        * @return {Promise} 更新消息返回的 Promise 对象
        */

    }, {
        key: 'updateOneMessageToRead',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(msgId) {
                var query, update;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (msgId) {
                                    _context4.next = 2;
                                    break;
                                }

                                return _context4.abrupt('return');

                            case 2:
                                query = { _id: msgId };
                                update = { $set: { has_read: true } };
                                return _context4.abrupt('return', this.ctx.model.Message.update(query, update, { multi: true }).exec());

                            case 5:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function updateOneMessageToRead(_x5) {
                return _ref6.apply(this, arguments);
            }

            return updateOneMessageToRead;
        }()
    }, {
        key: 'sendAtMessage',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(userId, authorId, topicId, replyId) {
                var message;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                message = this.ctx.model.Message();


                                message.type = 'at';
                                message.master_id = userId;
                                message.author_id = authorId;
                                message.topic_id = topicId;
                                message.reply_id = replyId;

                                return _context5.abrupt('return', message.save());

                            case 7:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function sendAtMessage(_x6, _x7, _x8, _x9) {
                return _ref7.apply(this, arguments);
            }

            return sendAtMessage;
        }()
    }, {
        key: 'sendReplyMessage',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userId, authorId, topicId, replyId) {
                var message;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                message = this.ctx.model.Message();


                                message.type = 'reply';
                                message.master_id = userId;
                                message.author_id = authorId;
                                message.topic_id = topicId;
                                message.reply_id = replyId;

                                return _context6.abrupt('return', message.save());

                            case 7:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function sendReplyMessage(_x10, _x11, _x12, _x13) {
                return _ref8.apply(this, arguments);
            }

            return sendReplyMessage;
        }()
    }]);

    return MessageService;
}(Service);

module.exports = MessageService;
//# sourceMappingURL=message.js.map