var express = require('express');
var router = express.Router();
var adminHandler = require('../controllers/administrators_controller');

/* GET login page. */
router.get('/', adminHandler.getDash);

/*GET login page. */
router.get('/Users/get_all', adminHandler.getAllUsers);

/*POST page */
router.post('/Preference', adminHandler.changePreference);

/* GET administrator Details. */
router.post('/User/get_profile', adminHandler.getProfile);

/* DELETE  Profile. */
router.post('/User/delete_profile', adminHandler.deleteProfile);

/* POST change administrator status page. */
router.post('/User/chnage_status', adminHandler.updateProfileStatus);

/* GET administrators page. */
router.get('/Administrators', adminHandler.getAdministrators);

/* GET page */
router.get('/Administrators/page=:id', adminHandler.getAdminPage);

/*GET page */
router.get('/Administrators/search/keyword=:kwy/page=:id', adminHandler.searchMyAdmins);

/* POST add administrators page. */
router.post('/Administrators/add_admin', adminHandler.createAdminProfile);

/* POST administrator updated Details. */
router.post('/Administrators/edit_profile', adminHandler.updateAdminProfile);

/* GET Sponsors page. */
router.get('/Sponsors', adminHandler.getSponsors);

/* GET page */
router.get('/Sponsors/page=:id', adminHandler.getSponsorPage);

/*GET page */
router.get('/Sponsors/search/keyword=:kwy/page=:id', adminHandler.searchMySponsors);

/* POST add Sponsor Profile. */
router.post('/Sponsors/add_sponsor', adminHandler.createSponsorProfile);

/* POST sponsor updated Details. */
router.post('/Sponsors/edit_profile', adminHandler.updateSponsorProfile);


/* GET Envoys page. */
router.get('/Envoys', adminHandler.getEnvoys);

/* GET page */
router.get('/Envoys/page=:id', adminHandler.getEnvoysPage);

/*GET page */
router.get('/Envoys/search/keyword=:kwy/page=:id', adminHandler.searchMyEnvoys);


/* POST add Enyoys Profile. */
router.post('/Envoys/add_envoy', adminHandler.createEnvoyProfile);

/* POST Enyoys updated Details. */
router.post('/Envoys/edit_profile', adminHandler.updateEnvoyProfile);



/* GET administrator Details. */
router.post('/Kid/get_profile', adminHandler.getKidProfile);








/* GET Kids page. */
router.get('/Kids', adminHandler.getKids);

/* GET Kid Form. */
router.get('/Kids/add_kid', adminHandler.getAddKidForm);

/* POST add Kid Profile. */
router.post('/Kids/add_kid', adminHandler.createKidProfile);

/* POST change kid status page. */
router.post('/Kids/chnage_status', adminHandler.updateKidStatus);

/* GET edit kid page. */
router.get('/Kids/edit_kid/:id', adminHandler.getEditKidForm);

/* POST kids updated Details. */
router.post('/Kids/edit_profile', adminHandler.updateKidProfile);

/* DELETE  Profile. */
router.post('/Kids/delete_profile', adminHandler.deleteKidProfile);

module.exports = router;