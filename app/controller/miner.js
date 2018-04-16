
const _ = require('lodash');
const validator = require('validator');
const utility = require('utility');
const uuid = require('uuid');

module.exports = app => {
    class MinerController extends app.Controller {

        async index() {
            const { ctx, service, config } = this;

            const ret = {
                status: 200,
                message: '',
                data: {}
            };

            const uid = ctx.account.user_id;

            const assets = await service.miner.getByUserId(uid);

            ret.data = assets;
            ctx.body = ret;



        }

        async detail() {
            const { ctx, service, config } = this;
            const miner_id = ctx.params.miner_id;
            const params = ctx.request.query;
            const page = parseInt(params.page) || 1;
            const limit = 20;
            const offset = (page - 1) * limit;

            const ret = {
                status: 422,
                message: '',
                data: {}
            };

            const miner_shares = await service.miner.getSharesByMinerId({ miner_id: miner_id, offset: offset, limit: limit });


            ret.status = 200;

            ret.data = miner_shares;
            ctx.body = ret;
        }


    }

    return MinerController;
};