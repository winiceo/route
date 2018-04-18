
const Service = require('egg').Service;

class AssetService extends Service {



    async getByUserId(id) {

        console.log(id);
        const assets = await this.app.mysql.select('assets', { where: { user_id: id }});
        return assets;
    }

}

module.exports = AssetService;
