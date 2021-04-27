var express = require('express');
var router = express.Router();
var adminHandler = require('../controllers/administrators_controller');

/* GET login page. */
router.get('/', adminHandler.getDash);

/* GET administrators page. */
router.get('/Administrators', adminHandler.getAdministrators);

/* GET add administrators page. */
router.get('/Administrators/add_admin', adminHandler.getAddAdministratorForm);

/* GET edit administrators page. */
router.get('/Administrators/edit_admin/:id', adminHandler.getEditAdministratorForm);

/* POST add administrators page. */
router.post('/Administrators/add_admin', adminHandler.createAdminProfile);

/* POST change administrator status page. */
router.post('/User/chnage_status', adminHandler.updateProfileStatus);

/* GET administrator Details. */
router.post('/User/get_profile', adminHandler.getProfile);

/* POST administrator updated Details. */
router.post('/Administrators/edit_profile', adminHandler.updateAdminProfile);

/* DELETE  Profile. */
router.post('/User/delete_profile', adminHandler.deleteProfile);

/* GET Sponsors page. */
router.get('/Sponsors', adminHandler.getSponsors);

/* GET Sponsor Form. */
router.get('/Sponsors/add_sponsor', adminHandler.getAddSponsorForm);

/* GET Sponsor Edit Form. */
router.get('/Sponsors/edit_sponsor/:id', adminHandler.getEditSponsorForm);

/* POST add Sponsor Profile. */
router.post('/Sponsors/add_sponsor', adminHandler.createSponsorProfile);

/* POST sponsor updated Details. */
router.post('/Sponsors/edit_profile', adminHandler.updateSponsorProfile);

/* GET Envoys page. */
router.get('/Envoys', adminHandler.getEnvoys);

/* GET Enyoys Form. */
router.get('/Envoys/add_envoy', adminHandler.getAddEnvoyForm);

/* GET Enyoys Edit Form. */
router.get('/Envoys/edit_envoy/:id', adminHandler.getEditEnvoyForm);

/* POST add Enyoys Profile. */
router.post('/Envoys/add_envoy', adminHandler.createEnvoyProfile);

/* POST Enyoys updated Details. */
router.post('/Envoys/edit_profile', adminHandler.updateEnvoyProfile);

/* GET Kids page. */
router.get('/Kids', adminHandler.getKids);

/* GET Kid Form. */
router.get('/Kids/add_kid', adminHandler.getAddKidForm);

/* POST add Kid Profile. */
router.post('/Kids/add_kid', adminHandler.createKidProfile);

module.exports = router;