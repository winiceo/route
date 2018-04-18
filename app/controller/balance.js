
const _ = require('lodash');
const validator = require('validator');
const utility = require('utility');
const uuid = require('uuid');

module.exports = app => {
    class BalanceController extends app.Controller {

        async total() {
            const { ctx, service, config } = this;

            const ret = {
                status: 422,
                message: '',
                data: {}
            };

            ret.status = 200;

            ret.data = {
                can_use_balance: 5.5,
                total_balance: 15.5

            };
            ctx.body = ret;
        }
    }

    return BalanceController;
};