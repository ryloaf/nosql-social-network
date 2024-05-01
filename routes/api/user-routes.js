const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addReaction,
  removeReaction,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/students/:studentId/assignments
router.route('/:userId/reaction').post(addThought);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

module.exports = router;