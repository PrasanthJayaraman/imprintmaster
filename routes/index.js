var express = require('express');
var router = express.Router();

const config = require('../controllers/config');
const cookie = require('../services/cookie');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/appconfig/:type?', cookie.Authenticate, config.getAppConfig);
router.post('/appconfig', cookie.Authenticate, config.addAppConfig);

module.exports = router;
