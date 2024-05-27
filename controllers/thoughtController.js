const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getThoughts(req, res) {
    try {
      const users = await Thought.find()
      // .populate('users');
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const user = await Thought.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(404).json({ message: 'No such user with that ID!' });
      }
       res.json({ user });
    } catch (err) {
      consolelog(err);
      return res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const user = await Thought.create(req.body);
      console.log(user);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const user = await Thought.findOneAndRemove({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ message: 'No thoughts head empty!' });
      }

      res.json({ message: 'User deleted successfully.' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};