const express = require('express');
const router = express.Router();

const user = require('../controllers/user');

/* GET users listing. */
router.post('/register', user.create);
router.post('/login', user.login);

module.exports = router;
