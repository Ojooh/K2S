var express         = require('express');
var router          = express.Router();
var authHandler    = require('../controllers/auth_controller');

/* GET login page. */
router.get('/', authHandler.loginPage);

/* POST to login page. */
router.post('/', authHandler.logIn);

module.exports = router;