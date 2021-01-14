var express         = require('express');
var router          = express.Router();
var loginHandler    = require('../controllers/login_controller');

/* GET login page. */
router.get('/', loginHandler.loginPage);

/* POST to login page. */
router.post('/', loginHandler.logIn);

module.exports = router;