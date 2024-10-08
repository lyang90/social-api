const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController.js');


// api/thoughts routes
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:thoughtId routes
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').delete(deleteReaction).post(createReaction);

module.exports = router;

