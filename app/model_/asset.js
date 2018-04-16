module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Asset = app.model.define('asset', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: STRING(30),
        balance: INTEGER,
        user_id: INTEGER,
        created_at: DATE,
        updated_at: DATE,
    });

    Asset.associate = function() {
        app.model.Asset.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
    };

    return Asset;
};