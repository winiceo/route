
const _ = require('lodash');
const validator = require('validator');
const utility = require('utility');
const uuid = require('uuid');

module.exports = app => {
    class HomeController extends app.Controller {

        async docs() {
            const { ctx, service, config } = this;

            await this.ctx.render('docs.html');

        }



    }

    return HomeController;
};