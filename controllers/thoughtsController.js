const { Thought, User } = require('../models');

module.exports = {
    async getAllThought(req, res) {
        try {
            const thought = await Thought.find({});
            res.json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.id)

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findByIdAndUpdate(req.body.userId, {
                $set: { thoughts: thought._id }
            }, { new: true });
            res.json(thought);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!thought) {
                res.status(400).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
                $push: { reactions: req.body.id }
            }, { new: true });

            if (!thought) {
                res.status(400).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
                $pull: { reactions: {reactionId: req.params.reactionId} }
            }, { new: true });

            if (!thought) {
                res.status(400).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id);

            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
