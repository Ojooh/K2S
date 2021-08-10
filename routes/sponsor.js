var express = require('express');
var router = express.Router();
var adminHandler = require('../controllers/administrators_controller');
var sponsorHandler = require('../controllers/sponsor_controller');

/* GET login page. */
router.get('/', sponsorHandler.getDash);

/* GET login page. */
router.get('/profile', sponsorHandler.getMyProfile);

/* GET Kids page. */
router.get('/Kids', sponsorHandler.getKids);

/* GET MyKids page. */
router.get('/MyKids', sponsorHandler.getMyKids);

/* GET page */
router.get('/Kids/page=:id', sponsorHandler.getPage);

/* GET page */
router.get('/MyKids/page=:id', sponsorHandler.getMyPage);

/*POST page */
router.post('/Preference', sponsorHandler.changePreference);

/*GET page */
router.get('/Kids/Filter/filter=:filter/date=:date/dob=:dob/order=:order/page=:id', sponsorHandler.filterKids);

/*GET page */
router.get('/myKids/Filter/filter=:filter/date=:date/dob=:dob/order=:order/page=:id', sponsorHandler.filterMyKids);

/*GET page */
router.get('/Kids/search/keyword=:kwy/page=:id', sponsorHandler.searchKids);

/*GET page */
router.get('/myKids/search/keyword=:kwy/page=:id', sponsorHandler.searchMyKids);

/* GET Kids Details. */
router.post('/Kid/get_profile', sponsorHandler.getProfile);

/*get verification*/
router.get('/payment/verify=:ref/wallet=:wllt', sponsorHandler.getVerification);

/*get verification*/
router.get('/payment/verify=:ref/wallet=:wllt/donate=:val/kid=:kd/title=:ttl', sponsorHandler.getVerification);

/*charge old card */
router.post('/charge/', sponsorHandler.chargeCard);

/* GET Notification pagee. */
router.get('/notifications', sponsorHandler.getNotify);

/* Post Task Complete. */
router.post('/Task/change_status', sponsorHandler.updateStatus);

/* Post Message seen. */
router.post('/Message/seen', sponsorHandler.updateMessage);

/* Post Delete Task */
router.post('/Task/delete_task', sponsorHandler.deleteTask);

/* Post Delete Task */
router.post('/Task/get_task', sponsorHandler.getTask);

/*GET login page. */
router.get('/get_chat', sponsorHandler.getChatUsers);

/* POST ADOPTION REQUEST*/
router.post('/Kid/adopt', sponsorHandler.adoptKid);

/* Payment with wallet. */
router.post('/charge/wallet', sponsorHandler.chargeWallet);


module.exports = router;
