var express = require('express');
var router = express.Router();
var authHandler = require('../controllers/auth_controller');

/* GET login page. */
router.get('/', authHandler.registerPage);

router.post('/user/', authHandler.registerUser);

router.get('/activate/:id/', authHandler.activationPage);

router.post('/activate/:id/', authHandler.activateUser);


module.exports = router;