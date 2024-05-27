const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// Get all users or add new user
router.route('/').get(getUser).post(createUser);

// Get user by ID or update by ID
// router.route('/:id').getSingleUser.put(updateUser);

// Delete a user by ID
router.route('/:id').delete(deleteUser);

// Add or delete friends
// router.route('/:userID/friends/:friendID').post(addFriend).delete(deleteFriend);

module.exports = router;