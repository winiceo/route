
const Service = require('egg').Service;

class WithdrawService extends Service {



    async newAndSave(data) {


        const ret = await this.app.mysql.insert('withdraw',
            data

        );

        return ret;
    }

    async findAll({ pageNumber = 1, pageSize = 20 }) {
        const { ctx } = this;

        const uid = ctx.account.user_id;

        let query = {
            user_id: uid
        };

        let result = await this.app.mysql.select('withdraw', {
            where: query,
            limit: Number(pageSize),    // 返回数据量
            offset: (pageNumber - 1) * pageSize, // 数据偏移量
            orders: [['created_at', 'desc']] // 排序方式
        });

        const totalCount = await this.app.mysql.count('withdraw', query);

        return {
            data: result,
            page: {
                'current_page': Number(pageNumber),
                'total_page': Math.ceil(result.length / pageSize),
                'total': totalCount
            }

        };
    }



}

module.exports = WithdrawService;
