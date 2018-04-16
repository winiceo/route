
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('user', {
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

    User.prototype.associate = function() {
        app.model.User.hasMany(app.model.Asset, { as: 'assets', foreignKey: 'user_id' });
    };

    return User;
};
