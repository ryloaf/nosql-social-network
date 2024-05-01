const { Schema, model } = require('mongoose');
const reactionSchema = require('./User');

// Schema to create Reaction model
const reactionSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
    },
    last: {
      type: String,
      required: true,
      max_length: 50,
    },
    github: {
      type: String,
      required: true,
      max_length: 50,
    },
    assignments: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;