
const _ = require('lodash');
const validator = require('validator');
const utility = require('utility');
const uuid = require('uuid');

module.exports = app => {
    class EmailController extends app.Controller {

        async sendCaptcha() {
            const { ctx, service, config } = this;
            const email = validator.trim(ctx.request.body.email || '').toLowerCase();


            const ret = {
                status: 422,
                message: '',
                data: {}
            };
            let msg = null;
            // 验证信息的正确性
            if (!validator.isEmail(email)) {
                msg = '邮箱不合法。';
                ctx.status = 422;
                ret.message = msg;
                ctx.body = ret;
                return;
            }

            const rd = ctx.helper.getRandomIntInclusive(999999, 100000);

            // 发送激活邮件
            await service.mail.sendActiveMail(email, rd);
            console.log(rd);
            ret.status = 200;
            ctx.body = ret;
        }



    }

    return EmailController;
};