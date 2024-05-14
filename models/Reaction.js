const { Schema, Types } = require('mongoose');
// Schema to create Reaction model: reactionId, reactionBody, username, createdAt
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 200,
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // get: format,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  }
);

module.exports = reactionSchema;