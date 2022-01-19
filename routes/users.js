const express = require('express')
const router = express.Router()
const users = require('../controllers/users');
const { authenticate, authorizeUserAccess } = require('../middleware/auth');
const { validatePatch } = require('../middleware/validators');


// router.route("/")
//     .get(searchUsernames)

router.route("/:userId")
    .get(authenticate, authorizeUserAccess, users.getUser)
    .patch(authenticate, authorizeUserAccess, validatePatch('users'), users.updateUser)
    .delete(authenticate, authorizeUserAccess, users.deleteUser)


module.exports = router;