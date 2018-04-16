
const Service = require('egg').Service;

class AssetService extends Service {



    async newAndSave(data) {


        const ret = await this.app.mysql.insert('withdraw',
            data

        );

        return ret;
    }
    async findAll(query) {


        const ret = await this.app.mysql.select('withdraw',
            {where:query}

        );

        return ret;
    }



}

module.exports = AssetService;
