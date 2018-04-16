
const Service = require('egg').Service;

class AccountService extends Service {


    /*
  * 根据邮箱，查找用户
  * @param {String} email 邮箱地址
  * @return {Promise[user]} 承载用户的 Promise 对象
  */
    async getUserByMail(email) {
        const ret = await this.app.mysql.get('users', { email: email });
        return ret;
    }

    async newAndSave(email, password) {


        const ret = await this.app.mysql.insert('users',
            { email: email, password: password }

        );

        return ret;
    }


}

module.exports = AccountService;
