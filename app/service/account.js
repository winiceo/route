
const Service = require('egg').Service;

class AccountService extends Service {


    /*
   * 根据关键字，获取一组用户
   * Callback:
   * - err, 数据库异常
   * - users, 用户列表
   * @param {String} query 关键字
   * @param {Object} opt 选项
   * @return {Promise[users]} 承载用户列表的 Promise 对象
   */
    getUsersByQuery(query, opt) {
        return this.ctx.model.User.find(query, '', opt).exec();
    }

    /*
  * 根据邮箱，查找用户
  * @param {String} email 邮箱地址
  * @return {Promise[user]} 承载用户的 Promise 对象
  */
    getUserByMail(email) {
        return this.ctx.model.User.findOne({ email }).exec();
    }

    newAndSave(email, password, active) {
        const user = new this.ctx.model.User();

        user.pass = password;
        user.email = email;
        user.level = 0;
        return user.save();
    }


}

module.exports = AccountService;
