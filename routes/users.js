const express = require('express')
const router = express.Router()
const users = require('../controllers/users');
const { authenticate, authorize } = require('../middleware/auth');
const { validatePatch } = require('../middleware/validators');


// router.route("/")
//     .get(searchUsernames)

router.route("/:userId")
    .get(authenticate, authorize, users.getUser)
    .patch(authenticate, authorize, validatePatch, users.updateUser)
    .delete(authenticate, authorize, users.deleteUser)


module.exports = router;