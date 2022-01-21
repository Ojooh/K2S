var express = require('express');
var router = express.Router();
var authHandler = require('../controllers/auth_controller');

/* GET login page. */
router.get('/', authHandler.registerPage);


module.exports = router;