const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought
} = require('../../controllers/thoughtController');

// Get all thoughts or add new user
router.route('/').get(getThoughts).post(createThought);
// Route to get a user
router.route('/:id').get(getSingleThought);
// Delete a user
router.route('/:id').delete(deleteThought);

module.exports = router;