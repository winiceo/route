
const Controller = require('egg').Controller;

const convert = require('data2xml')();
const validator = require('validator');

function utf8ForXml(inputStr) {
    // FIXME: no-control-regex
    /* eslint-disable no-control-regex */
    return inputStr.replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, '');
}

class TestController extends Controller {
    async test() {
        const { ctx } = this;
        console.log(this.ctx.header);
        let header = ctx.request.header;
        let token = header['authorization'];

        console.log(token);
        const { email } = this.app.jwt.verify(token, this.app.config.jwt.secret);
        console.log(email);

        this.ctx.body = this.ctx.state.user;
    }
}

module.exports = TestController;
