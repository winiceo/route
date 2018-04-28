
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
            const data = {
                assets: {
                    'yesterday_balance':
                        2.5,
                    'lrc_cny':
                        10.6,
                    'total_balance':
                        2343
                },
                data: assets

            };
            ret.data = data;
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

            const miner_shares = await service.miner.getSharesByMinerId({
                miner_id: miner_id,
                offset: offset,
                limit: limit
            });

            const data = {
                assets: {

                    'total_balance': 2343
                },
                data: miner_shares

            };
            ret.status = 200;

            ret.data = data;
            ctx.body = ret;
        }


    }

    return MinerController;
};