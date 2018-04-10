'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = require('egg').Service;

var AtService = function (_Service) {
    _inherits(AtService, _Service);

    function AtService() {
        _classCallCheck(this, AtService);

        return _possibleConstructorReturn(this, (AtService.__proto__ || Object.getPrototypeOf(AtService)).apply(this, arguments));
    }

    _createClass(AtService, [{
        key: 'fetchUsers',

        /**
         * 从文本中提取出@username 标记的用户名数组
         * @param {String} text 文本内容
         * @return {Array} 用户名数组
         */
        value: function fetchUsers(text) {
            if (!text) {
                return [];
            }

            var ignoreRegexs = [/```.+?```/g, // 去除单行的 ```
            /^```[\s\S]+?^```/gm, // ``` 里面的是 pre 标签内容
            /`[\s\S]+?`/g, // 同一行中，`some code` 中内容也不该被解析
            /^ {4}.*/gm, // 4个空格也是 pre 标签，在这里 . 不会匹配换行
            /\b\S*?@[^\s]*?\..+?\b/g, // somebody@gmail.com 会被去除
            /\[@.+?\]\(\/.+?\)/g];

            ignoreRegexs.forEach(function (ignore_regex) {
                text = text.replace(ignore_regex, '');
            });

            var results = text.match(/@[a-z0-9\-_]+\b/gim);
            var names = [];
            if (results) {
                for (var i = 0, l = results.length; i < l; i++) {
                    var s = results[i];
                    // remove leading char @
                    s = s.slice(1);
                    names.push(s);
                }
            }
            return [].concat(_toConsumableArray(new Set(names)));
        }

        /*
         * 根据文本内容中读取用户，并发送消息给提到的用户
         * @param {String} text 文本内容
         * @param {String} topicId 主题ID
         * @param {String} authorId 作者ID
         * @param {String} type 回复类型
         * @param {String} reply_id 回复ID
         */

    }, {
        key: 'sendMessageToMentionUsers',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(text, topicId, authorId) {
                var _this2 = this;

                var reply_id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
                var users;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.service.user.getUsersByNames(this.fetchUsers(text));

                            case 2:
                                users = _context.sent;


                                users = users.filter(function (user) {
                                    return !user._id.equals(authorId);
                                });

                                return _context.abrupt('return', Promise.all(users.map(function (user) {
                                    return _this2.service.message.sendAtMessage(user._id, authorId, topicId, reply_id);
                                })));

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function sendMessageToMentionUsers(_x2, _x3, _x4) {
                return _ref.apply(this, arguments);
            }

            return sendMessageToMentionUsers;
        }()

        /**
         * 根据文本内容，替换为数据库中的数据
         * @param {String} text 文本内容
         * @return {String} 替换后的文本内容
         */

    }, {
        key: 'linkUsers',
        value: function linkUsers(text) {
            var users = this.fetchUsers(text);
            for (var i = 0; i < users.length; i++) {
                var name = users[i];
                text = text.replace(new RegExp('@' + name + '\\b(?!\\])', 'g'), '[@' + name + '](/user/' + name + ')');
            }
            return text;
        }
    }]);

    return AtService;
}(Service);

module.exports = AtService;
//# sourceMappingURL=at.js.map