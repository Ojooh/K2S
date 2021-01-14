var express         = require('express');
var router          = express.Router();
var adminHandler    = require('../controllers/administrators_controller');

/* GET login page. */
router.get('/', adminHandler.getDash);

// /* POST to login page. */
// router.post('/', loginHandler.logIn);

module.exports = router;