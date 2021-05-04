var express = require('express');
var router = express.Router();
var envoyHandler = require('../controllers/envoy_controller');
var adminHandler = require('../controllers/administrators_controller');

/* GET login page. */
router.get('/', envoyHandler.getDash);

/* GET Kids page. */
router.get('/Kids', envoyHandler.getEnvoyKids);

/* POST add Kid Profile. */
router.post('/Kids/add_kid', adminHandler.createKidProfile);

/* POST change kid status page. */
router.post('/Kids/chnage_status', adminHandler.updateKidStatus);


module.exports = router;
