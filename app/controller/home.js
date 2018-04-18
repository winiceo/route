
const _ = require('lodash');
const validator = require('validator');
const utility = require('utility');
const uuid = require('uuid');

module.exports = app => {
    class HomeController extends app.Controller {


        async index(){
            const { ctx, service, config } = this;

            app.router.redirect('/', '/home/index', 302);

        }
        async docs() {
            const { ctx, service, config } = this;

            await this.ctx.render('/route/apidoc/index.html');

        }



    }

    return HomeController;
};