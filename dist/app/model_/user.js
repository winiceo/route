'use strict';

module.exports = function (app) {
    var _app$Sequelize = app.Sequelize,
        STRING = _app$Sequelize.STRING,
        INTEGER = _app$Sequelize.INTEGER,
        DATE = _app$Sequelize.DATE;


    var User = app.model.define('user', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: STRING(100),
        pass: INTEGER,
        level: INTEGER,
        created_at: DATE,
        updated_at: DATE
    });

    User.prototype.associate = function () {
        app.model.User.hasMany(app.model.Asset, { as: 'assets', foreignKey: 'user_id' });
    };

    return User;
};
//# sourceMappingURL=user.js.map