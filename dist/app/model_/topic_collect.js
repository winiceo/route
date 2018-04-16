'use strict';

module.exports = function (app) {
  var mongoose = app.mongoose;
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var TopicCollectSchema = new Schema({
    user_id: { type: ObjectId },
    topic_id: { type: ObjectId },
    create_at: { type: Date, default: Date.now }
  });

  TopicCollectSchema.index({ user_id: 1, topic_id: 1 }, { unique: true });

  return mongoose.model('TopicCollect', TopicCollectSchema);
};
//# sourceMappingURL=topic_collect.js.map