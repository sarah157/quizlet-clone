const express = require('express')
const router = express.Router()

const { getUser, updateUser, deleteUser } = require('../controllers/users');
const { authenticate, authorize } = require('../middleware/auth');

// router.route("/")
//     .get(searchUsernames)

router.route("/:userId")
    .get(authenticate, authorize, getUser)
    .patch(authenticate, authorize, updateUser)
    .delete(authenticate, authorize, deleteUser)


module.exports = router;