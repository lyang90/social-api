const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController.js');


// api/thoughts routes
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:thoughtId routes
router.route(':/thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;

