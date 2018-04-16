
const _ = require('lodash');
const validator = require('validator');
const utility = require('utility');
const uuid = require('uuid');

module.exports = app => {
    class WalletController extends app.Controller {

        async assets() {
            const { ctx, service, config } = this;

            const ret = {
                status: 200,
                message: '',
                data: {}
            };


            ret.status = 200;
            const uid = ctx.account.user_id;

            const assets = await service.asset.getByUserId(uid);

            ret.data = assets;
            ctx.body = ret;
        }

        async withdraw() {
            const { ctx, service, config } = this;
            const coin_type = validator.trim(ctx.request.body.coin_type || '').toLowerCase();
            const address = validator.trim(ctx.request.body.address || '');
            const amount = validator.trim(String(ctx.request.body.amount) || '');
            const captcha = validator.trim(String(ctx.request.body.captcha) || '');
            const user_id = ctx.account.user_id;
            console.log(ctx.account);
            const ret = {
                status: 200,
                message: '',
                data: {}
            };

            const withdraw = await service.withdraw.newAndSave({
                user_id: user_id,
                coin_type: coin_type,
                address: address,
                amount: amount
            });

            ctx.body = ret;
        }

        async withdrawHistory() {
            const { ctx, service, config } = this;

            const ret = {
                status: 200,
                message: '',
                data: {}
            };


            const user_id = ctx.account.user_id;


            const withdrawList = await service.withdraw.findAll({
                user_id: user_id

            });
            ret.data = withdrawList;
            ctx.body = ret;
        }
    }

    return WalletController;
};