var express         = require('express');
var router          = express.Router();
var adminHandler    = require('../controllers/administrators_controller');

/* GET login page. */
router.get('/', adminHandler.getDash);

/* GET administrators page. */
router.get('/Administrators', adminHandler.getAdministrators);

/* GET add administrators page. */
router.get('/Administrators/add_admin', adminHandler.getAddAdministratorForm);

/* POST add administrators page. */
router.post('/Administrators/add_admin', adminHandler.createAdminProfile);

/* POST change administrator status page. */
router.post('/Administrators/chnage_status', adminHandler.updateAdminStatusProfile);

/* GET add administrators page. */
router.post('/Administrators/get_profile', adminHandler.getEditAdmin);
// /* POST to login page. */
// router.post('/', loginHandler.logIn);

module.exports = router;