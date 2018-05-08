
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
            let page = parseInt(ctx.request.body.page) || 1;
            const pageSize = 20;
            if (page < 1) {
                page = 1;
            }

            const ret = {
                status: 422,
                message: '',
                data: {}
            };

            console.log(page);


            const miner_shares = await service.miner.getSharesByMinerId({
                miner_id: miner_id,
                pageNumber: page,
                pageSize: pageSize
            });


            ret.status = 200;

            ret.data = miner_shares;
            ctx.body = ret;
        }


    }

    return MinerController;
};
