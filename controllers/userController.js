const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find()
            // .populate({ path: 'friends' })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
    },
    // getSingleThought
    getSingleUser(req, res) {
        User.findOne({
            _id: req.params.id
        })
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.json(error);
            });
    },
    createUser(req, res) {
        User.create(req.body)
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.json(error);
            });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true },
        )
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.json(error);
            });
    },
    deleteUser(req, res) {
        User.findOneAndDelete({
            _id: req.params.id
        })
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.json(error);
            });
    },
    addfriend(req, res) {
        User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $addToSet: {
                friends: req.params.friendId
            }
        }, {
            new: true
        })
            .then(updatedUser => {
                res.json('New friend has been added.')
            })
            .catch(error => {
                res.json(error);
            });
    },
    removeFriend(req, res) {
        User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $pull: {
                friends: req.params.friendId
            }
        }, {
            new: true
        })
            .then(updatedUser => {
                res.json('New friend has been deleted.')
            })
            .catch(error => {
                res.json(error);
            });
    }
};

module.exports = userController;