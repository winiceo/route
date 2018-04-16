
const Service = require('egg').Service;

class AssetService extends Service {



    async getByUserId(id) {

        const assets = await this.app.mysql.select('assets', { user_id: id });
        return assets;
    }

    async getById(id) {

        const assets = await this.app.mysql.get('assets', { user_id: id });
        return assets;
    }


}

module.exports = AssetService;
