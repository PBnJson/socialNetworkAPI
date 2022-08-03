const { Thought, User } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find()
            // .populate({ path: 'friends' })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
    },
    // getSingleThought
    createThought(req, res) {
        Thought.create(req.body)
            .then((data) => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    {
                        $push: {
                            thoughts: data._id
                        }
                    },
                    {
                        new: true
                    },
                )
            })
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.json(error);
            });
    },
    getSingleThought(req, res) {
        Thought.findOne({
            _id: req.params.id
        })
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.json(error);
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
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
    deleteThought(req, res) {
        Thought.findOneAndDelete({
            _id: req.params.id
        })
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.json(error);
            });
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.id
        }, {
            $addToSet: {
                reactions: req.body
            }
        }, {
            new: true
        }).then(reaction => {
            res.json('Reaction has been added.')
        }).catch(error => {
            res.json(error);
        });

    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.id
        }, {
            $pull: {
                reactions: req.params.reactionId
            }
        }).then(reaction => {
            res.json('Reaction has been deleted.');
        })
    }
};

module.exports = thoughtController;
