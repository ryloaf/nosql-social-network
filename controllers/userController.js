// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// TODO: Create an aggregate function to get the number of users overall
module.exports = {
  async getUser(req, res) {
    try {
      const users = await User.find().populate('thoughts');
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(404).json({ message: 'No user found' });
      }

      res.json({ user });
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //create new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      console.log(user);
      res.json(user);
    } catch (err) {
      res.staus(500).json(err);
    }
  },

  // delete user and their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' })
      }

      const thought = await Thought.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId }},
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({
          message: 'User successfully deleted, but no posts were found.'
        });
      }

      res.json({ message: 'User successfully deleted!' });
    } catch (err) {
      console.log(err);
      res.staus(500).json(err);
    }
  },
  
  // Update user by ID
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { users: req.params.id },
        { $pull: {
          username: req.body.username,
          email: req.body.email
        }
      },
      { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID!' });
      }
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    const thought = await User.findOneAndUpdate();
  },
  async deleteFriend(req, res) {
  },
};