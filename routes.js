var express = require('express');
var router = express.Router();

const config = require('./controllers/config');
const cookie = require('./services/cookie');
const user = require('./controllers/user');
const employee = require('./controllers/employee');
const meta = require('./controllers/meta');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/meta', cookie.Authenticate, meta.addMeta);
router.get('/meta/:name', cookie.Authenticate, meta.getMeta);
router.put('/meta', cookie.Authenticate, meta.updateMeta);

router.get('/config/appconfig/:type?', cookie.Authenticate, config.getAppConfig);
router.post('/config/appconfig', cookie.Authenticate, config.addAppConfig);

router.post('/user/register', user.create);
router.post('/user/login', user.login);

router.post('/employee/register', cookie.Authenticate, employee.create);
router.post('/employee/login', employee.login);

module.exports = router;
