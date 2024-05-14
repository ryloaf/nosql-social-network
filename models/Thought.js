const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//throughText, createdAt, userName, reactions
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 200,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
    userName: {
      type: String,
      required: true
  },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
