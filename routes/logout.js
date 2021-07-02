var express         = require('express');
var router          = express.Router();
var loginHandler    = require('../controllers/login_controller');

/* LOGOUT. */
router.get('/', loginHandler.logOut);


module.exports = router;