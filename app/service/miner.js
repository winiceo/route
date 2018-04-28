
const Service = require('egg').Service;

class MinerService extends Service {



    async getByUserId(user_id) {

        const assets = await this.app.mysql.select('miner', {
            where: { user_id: user_id }
        });
        return assets;
    }


    async getSharesByMinerId({ miner_id, offset = 0, limit = 20 }) {


        let query = {

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
