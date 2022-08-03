const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addfriend,
    removeFriend,

} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)
router.route('/:id/add/:friendId').put(addfriend)
router.route('/:id/remove/:friendId').put(removeFriend)
module.exports = router;