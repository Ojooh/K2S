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

/* GET Notification pagee. */
router.get('/notifications', envoyHandler.getNotify);

/* Post Task Complete. */
router.post('/Task/change_status', envoyHandler.updateStatus);

/* Post Message seen. */
router.post('/Message/seen', envoyHandler.updateMessage);

/* Post Delete Task */
router.post('/Task/delete_task', envoyHandler.deleteTask);

/* Post Delete Task */
router.post('/Task/get_task', envoyHandler.getTask);


module.exports = router;
