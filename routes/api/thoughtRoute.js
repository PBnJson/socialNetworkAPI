const router = require('express').Router();

const {
    getAllThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,

} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThought);
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:userId').post(createThought);
router.route('/:id/addReaction').put(addReaction)
router.route('/:id/removeReaction/:reactionId').put(removeReaction);
module.exports = router;