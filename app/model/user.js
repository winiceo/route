
const utility = require('utility');

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({

        pass: { type: String },
        email: { type: String },
        level: { type: Number, default: 0 },
        create_at: { type: Date, default: Date.now },
        update_at: { type: Date, default: Date.now }

    });


    UserSchema.index({ email: 1 }, { unique: true });


    UserSchema.pre('save', function(next) {
        const now = new Date();
        this.update_at = now;
        next();
    });

    return mongoose.model('User', UserSchema);
};
