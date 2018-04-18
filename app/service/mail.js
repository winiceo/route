
const Service = require('egg').Service;
//const mailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');
// const sgTransport = require('nodemailer-sendgrid-transport');
const sgMail = require('@sendgrid/mail');

class MailService extends Service {

    async saveCaptcha(email, rd) {
        const results = await this.app.mysql.query('replace into captcha set email =? ,rd = ?', [email, rd]);

        return results;

    }

    async getCaptcha(email) {
        const results = await this.app.mysql.get('captcha', { email: email });
        return results;

    }


    async sendMail(data) {
        const { config, logger } = this;

        if (config.debug) {
            return;
        }

        sgMail.setApiKey(config.mail_grid_opts.auth.api_key);

        for (let i = 1; i < 6; i++) {
            try {
                await sgMail.send(data);
                logger.info('send mail success', data);
                break;
            } catch (err) {
                if (i === 5) {
                    logger.error('send mail finally error', err, data);
                    throw new Error(err);
                }
                logger.error('send mail error', err, data);
            }
        }
    }

    async sendActiveMail(who, token) {
        const { config } = this;
        const name = 'miner';
        const from = `${config.name} <${config.mail_opts.auth.user}>`;
        const to = who;
        const subject = config.name + '邮箱验证';
        const html = String('<p>您好：</p>' +
    '<p>您的邮箱验证码为：</p>' +
    '验证码:' + token) +
    '<p>若您没有在' + config.name + '填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
    '<p>' + config.name + '社区 谨上。</p>';

        await this.saveCaptcha(who, token);
        await this.sendMail({
            from,
            to,
            subject,
            html
        });
    }


    async sendResetPassMail(who, token, name) {
        const { config } = this;
        const from = `${config.name} <${config.mail_opts.auth.user}>`;
        const to = who;
        const subject = config.name + '社区密码重置';
        const html = '<p>您好：' + name + '</p>' +
    '<p>我们收到您在' + config.name + '社区重置密码的请求，请在24小时内单击下面的链接来重置密码：</p>' +
    '<a href="' + config.host + '/reset_pass?key=' + token + '&name=' + name + '">重置密码链接</a>' +
    '<p>若您没有在' + config.name + '社区填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
    '<p>' + config.name + '社区 谨上。</p>';
        this.saveCaptcha(to, token);
        await this.sendMail({
            from,
            to,
            subject,
            html
        });
    }
}

module.exports = MailService;

