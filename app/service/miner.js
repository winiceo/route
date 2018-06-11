
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


    async getSharesByMinerId({ miner_id, pageNumber = 1, pageSize = 20 }) {
        const { ctx } = this;

        const uid = ctx.account.user_id;

        let query = {
            user_id: uid
        };
        if (miner_id !== '0') {
            query.miner_id = miner_id;
        }

        let result = await this.app.mysql.select('miner_shares', {
            where: query,
            limit: Number(pageSize),    // 返回数据量
            offset: (pageNumber - 1) * pageSize, // 数据偏移量
            orders: [['datetime', 'desc']] // 排序方式
        });

        const totalCount = await this.app.mysql.count('miner_shares', query);

        return {
            assets: {
                'total_balance': 2343
            },
            data: result,
            page: {
                'current_page': Number(pageNumber),
                'total_page': Math.ceil(totalCount / pageSize),
                'total': totalCount
            }

        };
    }

    async rename(data) {

        const ret = await this.app.mysql.update('miner', data, { where: { id: data.id }});

        return ret;
    }



}

module.exports = MinerService;
