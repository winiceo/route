
const _ = require('lodash');
const validator = require('validator');
const utility = require('utility');
const uuid = require('uuid');

module.exports = app => {
    class AccountController extends app.Controller {

        async register() {
            const { ctx, service, config } = this;


            const email = validator.trim(ctx.request.body.email || '').toLowerCase();
            const password = validator.trim(ctx.request.body.password || '');
            const captcha = validator.trim(String(ctx.request.body.captcha) || '');

            console.log(ctx.request.body);
            const ret = {
                status: 422,
                message: '',
                data: {}
            };
            let msg = null;
            // 验证信息的正确性
            if ([email, password, captcha].some(item => {
                return item === '';
            })) {
                msg = '信息不完整。';
            } else if (!validator.isEmail(email)) {
                msg = '邮箱不合法。';
            } else if (password.length < 6) {
                msg = '密码不能小于5。';
            }
            // END 验证信息的正确性

            if (msg != null) {
                ctx.status = 422;
                ret.message = msg;
                ctx.body = ret;
                return;
            }
            // todo 验证码校验


            const accounts = await service.account.getUserByMail(email);


            if (accounts) {
                ctx.status = 422;
                ret.message = '用户名或邮箱已被使用。';
                ctx.body = ret;
                return;
            }

            const passhash = ctx.helper.bhash(password);


            let result = await service.account.newAndSave(email, passhash, false);

            console.log(result);
            // 发送激活邮件
           // await service.mail.sendActiveMail(email, utility.md5(email + passhash + config.session_secret));
            ret.status = 200;
            ctx.body = ret;
        }


        async login() {
            const { ctx, service, config } = this;


            const email = validator.trim(ctx.request.body.email || '').toLowerCase();
            const password = validator.trim(ctx.request.body.password || '');
            // const captcha = validator.trim(String(ctx.request.body.captcha) || '');

            console.log(ctx.request.body);
            const ret = {
                status: 422,
                message: '',
                data: {}
            };
            let msg = null;
            // 验证信息的正确性
            if ([email, password].some(item => {
                return item === '';
            })) {
                msg = '信息不完整。';
            } else if (!validator.isEmail(email)) {
                msg = '邮箱不合法。';
            } else if (password.length < 6) {
                msg = '密码不能小于6。';
            }

            const getUser = email => {
                if (email.indexOf('@') > 0) {
                    return ctx.service.account.getUserByMail(email);
                }
                return false;
            };
            const existUser = await getUser(email);

            // 用户不存在
            if (!existUser) {
                ctx.status = 422;
                ret.message = '用户不存在';
                ctx.body = ret;
                return;
            }

            const passhash = existUser.password;
            // TODO: change to async compare
            const equal = ctx.helper.bcompare(password, passhash);
            // 密码不匹配
            if (!equal) {
                ctx.status = 422;
                ret.message = '密码不正确';
                ctx.body = ret;
                return;
            }

            const token = app.jwt.sign({ email: existUser.email, user_id: existUser.id }, app.config.jwt.secret);


            ret.status = 200;
            ret.data.token = token;
            ctx.body = ret;
        }


        async test() {
            const { ctx } = this;

            console.log(ctx.account);

            this.ctx.body = ctx.user;
        }



        async forget() {
            const { ctx, service } = this;
            const ret = {
                status: 422,
                message: '',
                data: {}
            };
            const email = validator.trim(ctx.request.body.email).toLowerCase();
            const password = validator.trim(ctx.request.body.password) || '';

            if (!validator.isEmail(email)) {

                ret.message = '邮箱不合法';
                ctx.body = ret;
                return;
            }

            const user = await service.account.getUserByMail(email);
            if (!user) {
                ret.message = '邮箱不存在';
                ctx.body = ret;
                return;

            }

            const passhash = ctx.helper.bhash(password);
            user.password = passhash;
            const rs = await service.account.updateUser(user);
            console.log(rs)
            ctx.status = 200;
            ret.status = 200;
            ctx.body = ret;

        }
        // 修改密码
        async updatePass() {
            const { ctx, service } = this;
            const ret = {
                status: 422,
                message: '',
                data: {}
            };
            const old_password = validator.trim(ctx.request.body.old_password) || '';
            const password = validator.trim(ctx.request.body.password) || '';

            const user = await service.account.getUserByMail(ctx.account.email);

            if (!user) {
                ret.message = '用户不存在';
                ctx.body = ret;
                return;

            }

            const equal = ctx.helper.bcompare(old_password, user.password);
            // 密码不匹配
            if (!equal) {
                ctx.status = 422;
                ret.message = '旧密码不正确';
                ctx.body = ret;
                return;
            }

            const passhash = ctx.helper.bhash(password);
            user.password = passhash;
            const rs = await service.account.updateUser(user);
            console.log(rs);
            ctx.status = 200;
            ret.status = 200;
            ctx.body = ret;
        }

    }

    return AccountController;
};