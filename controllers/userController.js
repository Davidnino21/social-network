const { User } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.id)
                .populate('thoughts')
                .populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!user) {
                res.status(400).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id, req.body);

            if (!user) {
                res.status(404).json({ message: 'No course  with this id!' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
