'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = require('egg').Service;

var WalletService = function (_Service) {
    _inherits(WalletService, _Service);

    function WalletService() {
        _classCallCheck(this, WalletService);

        return _possibleConstructorReturn(this, (WalletService.__proto__ || Object.getPrototypeOf(WalletService)).apply(this, arguments));
    }

    _createClass(WalletService, [{
        key: 'getUsersByQuery',


        /*
        * 根据关键字，获取一组用户
        * Callback:
        * - err, 数据库异常
        * - users, 用户列表
        * @param {String} query 关键字
        * @param {Object} opt 选项
        * @return {Promise[users]} 承载用户列表的 Promise 对象
        */
        value: function getUsersByQuery(query, opt) {
            return this.ctx.model.User.find(query, '', opt).exec();
        }

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
    }, {
        key: 'newAndSave',
        value: function newAndSave(email, password, active) {
            var user = new this.ctx.model.User();

            user.pass = password;
            user.email = email;
            user.level = 0;
            return user.save();
        }
    }]);

    return WalletService;
}(Service);

module.exports = WalletService;
//# sourceMappingURL=wallet.js.map