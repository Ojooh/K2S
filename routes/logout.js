var express         = require('express');
var router          = express.Router();
var loginHandler    = require('../controllers/auth_controller');

/* LOGOUT. */
router.get('/', loginHandler.logOut);


module.exports = router;