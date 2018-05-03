
const Service = require('egg').Service;
const _ = require('lodash');
class MinerService extends Service {



    async getByUserId(user_id) {

        const assets = await this.app.mysql.select('miner', {
            where: { user_id: user_id }
        });

        let data = [];



        const start = async () => {
            await Promise.all(
                assets.map(async obj => {
                    let res = await this.app.mysql.select('miner_shares', {
                        where: { miner_id: obj.miner_id },
                        orders: [['id', 'desc']],
                        limit: 1
                    });
                    let minerInfo = {
                        id: obj.id,
                        miner_id: obj.miner_id,
                        miner_alias: obj.miner_alias,
                        status: res.status,
                        shares_1d: res.shares_1d,
                        shares_1d_unit: res.shares_1d_unit,
                        earn_coin_1d: res.earn_coin_1d
                    };
                    if (res !== undefined && res.length == 1) {
                        res = res[0];
                        minerInfo = Object.assign(minerInfo, {
                            status: 1,
                            shares_1d: res.shares_1d,
                            shares_1d_unit: res.shares_1d_unit,
                            earn_coin_1d: res.earn_coin_1d
                        });
                    } else {
                        minerInfo = Object.assign(minerInfo, {
                            status: 0,
                            shares_1d: 0,
                            shares_1d_unit: 'T',
                            earn_coin_1d: 0
                        });
                    }
                    data.push(minerInfo);

                })
            );

            return data;
        };
        const result = start();
        return result;


    }


    async getSharesByMinerId({ miner_id, offset = 0, limit = 20 }) {
        const { ctx } = this;

        const uid = ctx.account.user_id;

        let query = {
            where: { user_id: uid },
            orders: [['datetime', 'desc']], // 排序方式
            limit: limit, // 返回数据量
            offset: offset // 数据偏移量
        };
        if (miner_id != 0) {
            query.where = { miner_id: miner_id };
        }
        const assets = await this.app.mysql.select('miner_shares', query);
        return assets;
    }



}

module.exports = MinerService;
