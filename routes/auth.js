const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/auth')
const { validatePost } = require('../middleware/validators')


router.post('/register', validatePost, register)
router.post('/login', validatePost, login)


module.exports = router;