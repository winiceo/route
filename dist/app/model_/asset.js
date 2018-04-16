'use strict';

module.exports = function (app) {
    var _app$Sequelize = app.Sequelize,
        STRING = _app$Sequelize.STRING,
        INTEGER = _app$Sequelize.INTEGER,
        DATE = _app$Sequelize.DATE;


    var Asset = app.model.define('asset', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: STRING(30),
        balance: INTEGER,
        user_id: INTEGER,
        created_at: DATE,
        updated_at: DATE
    });

    Asset.associate = function () {
        app.model.Asset.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
    };

    return Asset;
};
//# sourceMappingURL=asset.js.map