'use strict';

var utility = require('utility');

module.exports = function (app) {
    var mongoose = app.mongoose;
    var Schema = mongoose.Schema;

    var UserSchema = new Schema({

        pass: { type: String },
        email: { type: String },
        level: { type: Number, default: 0 },
        create_at: { type: Date, default: Date.now },
        update_at: { type: Date, default: Date.now }

    });

    UserSchema.index({ email: 1 }, { unique: true });

    UserSchema.pre('save', function (next) {
        var now = new Date();
        this.update_at = now;
        next();
    });

    return mongoose.model('User', UserSchema);
};
//# sourceMappingURL=user.js.map