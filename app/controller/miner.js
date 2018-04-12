
const _ = require('lodash');
const validator = require('validator');
const utility = require('utility');
const uuid = require('uuid');

module.exports = app => {
    class MinerController extends app.Controller {

        async index() {
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

        async detail() {
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

        async withdrawHistory() {
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

    return MinerController;
};