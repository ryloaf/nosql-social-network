// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// TODO: Create an aggregate function to get the number of users overall
const userCount = async () => {
  // Your code here
  const numberOfUsers = await User.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: 1 }
      }
    }
  ]);
  return numberOfUsers[0] ? numberOfUsers[0].count : 0;
}

// Execute the aggregate method on the User model and calculate the overall grade by using the $avg operator
const post = async (UserId) =>
  User.aggregate([
    // TODO: Ensure we include only the user who can match the given ObjectId using the $match operator
    {
        $match: { _id: ObjectId(UserId) }
      },
      {
        $unwind: '$reactions',
      },
    // TODO: Group information for the user with the given ObjectId alongside a post
    {
        $group: {
          _id: '$_id',
          user: { $first: '$$ROOT' },
          post: { $push: '$reactions' }
        }
      },
    ]);

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      const userObj = {
        users,
        headCount: await userCount(),
      };
      return res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.usertId })
        .select('-__v')
        .lean();

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({
        user,
        post: await post(req.params.userId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove them from the post
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' })
      }

      const thought = await Thought.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no posts found',
        });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
