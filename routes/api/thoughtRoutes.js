const router = require('express').Router();
const {
    getAllThought,
    updateThought,
    createThought,
    deleteThought,
    deleteReaction,
    addReaction,
    getSingleThought,
} = require ('../../controllers/thoughtsController');

router.route('/')
.get(getAllThought)
.put(createThought)

router.route('/:id') 
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought)

router.route('/:thoughtId/reactions')
.post(addReaction)

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;