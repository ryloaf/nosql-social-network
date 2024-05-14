const { Thought, Reaction } = require('../models');

module.exports = {
  // Get all users
  async getThoughts(req, res) {
    try {
      const users = await Thought.find()
      // .populate('users');
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};