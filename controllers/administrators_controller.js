const User          = require('./db_controller');
const validator     = require('./validator');
const { v4: uuidv4 }= require('uuid');
const bcrypt        = require('bcrypt');
const moment        = require( 'moment' );
const path          = require('path');
const fs            = require('fs');
const saltRounds    = 10;




//Function To Render Dashboard
module.exports.getDash = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var icon        = "fas fa-th-large";
        var title       = "Dashboard";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            var admins      = await User.getCountAdmins();
            var sponsors    = await User.getCountSponsors();
            var envoys      = await User.getCountEnvoys();
            var kids        = await User.getCountKids();
            var sidebar     = {dash : "active", usr : "", adm : "", kds : "", sps : "", env : "", ntf : ""};
            var count       = {admins : admins[0].total, sponsors : sponsors[0].total, envoys : envoys[0].total, kids :kids.total};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar, count : count};
             res.render('admin/Dashboard', context);
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

//Function To Render Administrators
module.exports.getAdministrators = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var icon        = "fas fa-user-shield";
        var title       = "Administrators";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")){
            var admins      = await User.getAdministrators();
            var sidebar     = {dash : "", usr : "", adm : "active", kds : "", sps : "", env : "", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar, admins : admins};
            res.render('admin/administrators', context);
        } else {
            res.redirect("/login");
        }
     } else {
        res.redirect("/login");
    }

    
};


//Function To Render Adminstartor Add Form
module.exports.getAddAdministratorForm = async (req, res, next) => {
     if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var icon        = "fas fa-user-shield";
        var title       = "Administrators";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")){
            var sidebar     = {dash : "", usr : "", adm : "active", kds : "", sps : "", env : "", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar};
            res.render('admin/addAdministrator', context);
        } else {
            res.redirect("/login");
        }
     } else {
        res.redirect("/login");
    }
};


//Function to Handle Admin AddProfile Post
module.exports.createAdminProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")){
            var [raby, state, message] = await validator.validAdministrator(req, "add");
            //var test = validator.validAdministrator(req, "add");

            if (state){
                if(!req.files) {
                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        let insert = User.insertAdminProfile(message.user_id, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + req.body.telephone, req.body.title, message.user_type, "", "1", hash, "1");
                    });
                    
                } else {
                    let avatar      = req.files.pp;
                    let [name, ext] = avatar.name.split(".");
                    let new_name    = uuidv4() + "." + ext
                    let dir         = "public/images/profile/profile_pic/" + new_name;
                    let db_path     = "/images/profile/profile_pic/" + new_name;

                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        let insert = User.insertAdminProfile(message.user_id, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, db_path, "1", hash, "1");
                        avatar.mv(dir);
                    });
                   
                }
                res.json({success : message.message});
                
            } else {
                res.json({error : message.message})
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login"
            res.json({url : url});
        }
     } else {
        var url = "/login"
        res.json({url : url});
    }
}

//Function To Chnage Active Status
module.exports.updateProfileStatus = async (req, res, next) => {
     if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var ID          = req.body.id;
        var status      = req.body.status;
        var change      = "";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            if (status == "False"){
                status = "0";
                change = "Deactivated";
            } else {
                status = "1";
                change = "Activated";
            }
            let update      = await User.updateUserStatus(ID, status);
            var editted     = await User.getUserById(ID);
            var msg         = editted[0].fname + " Profile Is " + change;
            res.json({success : msg});
        } else {
            var url = "/login"
            res.json({url : url});
        }
    } else {
        var url = "/login"
        res.json({url : url});
    }

}

//Function To get Admin Data
module.exports.getProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var ID          = req.body.id;
        var type        = req.body.type;
        var mode        = req.body.mode;
        console.log(type);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].id == ID || user[0].user_type == "ADM" )){
            let edittee = await User.getUserById(ID);
            //console.log(edittee);

            if (type == "edit"){
                if (mode == "form"){
                
                    res.json({success : "", type : mode});
                } else {
                    res.json({success : edittee[0], type : mode});
                }
            }

            if(type == "display"){
                res.json({success : edittee[0], type : mode});
            }

            
            
        
        } else {
            var url = "/login"
            res.json({url : url});
        }
    } else {
        var url = "/login"
        res.json({url : url});
    }


}

//Function To Handle Admin Profile Edit Post
module.exports.updateAdminProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var ID          = req.body.id;
        var edittee     = await User.getUserById(ID);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].id == ID)){
            var [raby, state, message] = await validator.validAdministrator(req, "edit");
            //var test = validator.validAdministrator(req, "add");

            if (state){
                if(!req.files) {
                    if (req.body.password != ""){
                        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                            let datetime = moment().format( 'YYYY-MM-DD  HH:mm:ss.000' );
                            let update   = User.updateAdminProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, edittee[0].profile_photo, hash, user[0].user_id, datetime);   
                        });
                    } else {
                        var hash    = edittee[0].password;
                        let datetime = moment().format( 'YYYY-MM-DD  HH:mm:ss.000' );
                        let update   = User.updateAdminProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, edittee[0].profile_photo, hash, user[0].user_id, datetime);
                    }    
                } else {
                    if (edittee[0].profile_photo != ""){
                        fs.unlinkSync(path.join(__dirname,'..', 'public', edittee[0].profile_photo));
                    }
                    let avatar      = req.files.pp;
                    let [name, ext] = avatar.name.split(".");
                    let new_name    = uuidv4() + "." + ext
                    let dir         = "public/images/profile/profile_pic/" + new_name;
                    let db_path     = "/images/profile/profile_pic/" + new_name;
                    console.log(dir);
                    console.log(db_path);

                    if (req.body.password != ""){
                        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                            let datetime = moment().format( 'YYYY-MM-DD  HH:mm:ss.000' );
                            let update   = User.updateAdminProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, db_path, hash, user[0].user_id, datetime);   
                        });
                    } else {
                        var hash    = edittee[0].password;
                        let datetime = moment().format( 'YYYY-MM-DD  HH:mm:ss.000' );
                        let update   = User.updateAdminProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, db_path, hash, user[0].user_id, datetime);
                    }
                    avatar.mv(dir);
                   
                }
                res.json({success : edittee[0].fname + " Profile Has Been Updated Successfully."});
                
            } else {
                res.json({error : message.message})
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login"
            res.json({url : url});
        }
     } else {
        var url = "/login"
        res.json({url : url});
    }
}

//Function To Render Adminstartor Add Form
module.exports.getEditAdministratorForm = async (req, res, next) => {
     if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var icon        = "fas fa-user-shield";
        var title       = "Administrators";
        var ID          = req.params.id;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")){
            let edittee     = await User.getUserById(ID);
            var sidebar     = {dash : "", usr : "", adm : "active", kds : "", sps : "", env : "", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar, edity : edittee[0]};
            res.render('admin/editAdministrator', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
     } else {
        var url = "/login";
        res.redirect(url);
    }
};

//Function To Delete Admin Profile
module.exports.deleteProfile = async (req, res, next) => {
     if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var ID          = req.body.id;
        var editted     = await User.getUserById(ID);
        var change      = "";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")){
            let update      = await User.deleteUserProfile(ID); 
            var msg         = editted[0].fname + " Profile Deleted Successfully";
            res.json({success : msg});
        } else {
            var url = "/login";
            res.json({url : url});
        }
    } else {
        var url = "/login";
        res.json({url : url});
    }

};

//Function To Render Sponsors
module.exports.getSponsors = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var icon        = "fas fa-users";
        var title       = "Sponsors";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            var sponsors      = await User.getSponsors();
            var sidebar     = {dash : "", usr : "", adm : "", kds : "", sps : "active", env : "", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar, spns : sponsors};
            res.render('admin/sponsors', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
     } else {
        var url = "/login";
        res.redirect(url);
    }

    
};

//Function To Render Sponsor Add Form
module.exports.getAddSponsorForm = async (req, res, next) => {
     if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var icon        = "fas fa-users";
        var title       = "Sponsors";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            var sidebar     = {dash : "", usr : "", adm : "", kds : "", sps : "active", env : "", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar};
            res.render('admin/addSponsor', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
     } else {
        var url = "/login";
        res.redirect(url);
    }
};


//Function to Handle Sponsor AddProfile Post
module.exports.createSponsorProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            var [raby, state, message] = await validator.validSponsor(req, "add");
            //var test = validator.validAdministrator(req, "add");

            if (state){
                if(!req.files) {
                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        let insert = User.insertSponsorProfile(message.user_id, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title,  message.user_type, req.body.prof, "", "1", hash, "1");
                    });
                    
                } else {
                    let avatar      = req.files.pp;
                    let [name, ext] = avatar.name.split(".");
                    let new_name    = uuidv4() + "." + ext
                    let dir         = "public/images/profile/profile_pic/" + new_name;
                    let db_path     = "/images/profile/profile_pic/" + new_name;

                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        let insert = User.insertSponsorProfile(message.user_id, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, db_path, "1", hash, "1");
                        avatar.mv(dir);
                    });
                   
                }
                res.json({success : message.message});
                
            } else {
                res.json({error : message.message})
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login";
            res.json({url : url});
        }
     } else {
        var url = "/login";
        res.json({url : url});
    }
}

//Function To Render Sponsors Add Form
module.exports.getEditSponsorForm = async (req, res, next) => {
     if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
         var icon       = "fas fa-users";
        var title       = "Sponsors";
        var ID          = req.params.id;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            let edittee     = await User.getUserById(ID);
            var sidebar     = {dash : "", usr : "", adm : "active", kds : "", sps : "", env : "", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar, edity : edittee[0]};
            res.render('admin/editSponsor', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
     } else {
        var url = "/login";
        res.redirect(url);
    }
};

//Function To Handle Sponsor Profile Edit Post
module.exports.updateSponsorProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var ID          = req.body.id;
        var edittee     = await User.getUserById(ID);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].id == ID || user[0].user_type == "ADM")){
            var [raby, state, message] = await validator.validSponsor(req, "edit");
            //var test = validator.validAdministrator(req, "add");

            if (state){
                if(!req.files) {
                    if (req.body.password != ""){
                        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                            let datetime = moment().format( 'YYYY-MM-DD  HH:mm:ss.000' );
                            let update   = User.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, edittee[0].profile_photo, hash, user[0].user_id, datetime);   
                        });
                    } else {
                        var hash    = edittee[0].password;
                        let datetime = moment().format( 'YYYY-MM-DD  HH:mm:ss.000' );
                        let update   = User.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, edittee[0].profile_photo, hash, user[0].user_id, datetime);
                    }    
                } else {
                    if (edittee[0].profile_photo != ""){
                        fs.unlinkSync(path.join(__dirname,'..', 'public', edittee[0].profile_photo));
                    }
                    let avatar      = req.files.pp;
                    let [name, ext] = avatar.name.split(".");
                    let new_name    = uuidv4() + "." + ext
                    let dir         = "public/images/profile/profile_pic/" + new_name;
                    let db_path     = "/images/profile/profile_pic/" + new_name;
                    console.log(dir);
                    console.log(db_path);

                    if (req.body.password != ""){
                        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                            let datetime = moment().format( 'YYYY-MM-DD  HH:mm:ss.000' );
                            let update   = User.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, db_path, hash, user[0].user_id, datetime);   
                        });
                    } else {
                        var hash    = edittee[0].password;
                        let datetime = moment().format( 'YYYY-MM-DD  HH:mm:ss.000' );
                        let update   = User.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, db_path, hash, user[0].user_id, datetime);
                    }
                    avatar.mv(dir);
                   
                }
                res.json({success : edittee[0].fname + " Profile Has Been Updated Successfully."});
                
            } else {
                res.json({error : message.message})
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login";
            res.json({url : url});
        }
     } else {
        var url = "/login";
        res.json({url : url});
    }
}

//Function To Render Envoys
module.exports.getEnvoys = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var icon        = "fas fa-hands-helping";
        var title       = "Envoys";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            var envoys      = await User.getEnvoys();
            var sidebar     = {dash : "", usr : "", adm : "", kds : "", sps : "", env : "active", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar, envs : envoys};
            res.render('admin/envoys', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
     } else {
        var url = "/login";
            res.json(url);
    }

    
};

//Function To Render Envoy Add Form
module.exports.getAddEnvoyForm = async (req, res, next) => {
     if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var icon        = "fas fa-hands-helping";
        var title       = "Envoys";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            var sidebar     = {dash : "", usr : "", adm : "", kds : "", sps : "", env : "active", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar};
            res.render('admin/addEnvoy', context);
        } else {
            res.redirect("/login");
        }
     } else {
        res.redirect("/login");
    }
};

//Function to Handle Envoy AddProfile Post
module.exports.createEnvoyProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            var [raby, state, message] = await validator.validEnvoy(req, "add");
            //var test = validator.validAdministrator(req, "add");

            if (state){
                if(!req.files) {
                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        let insert = User.insertEnvoyProfile(message.user_id, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title,  message.user_type, req.body.prof, "", "1", hash, "1");
                    });
                    
                } else {
                    let avatar      = req.files.pp;
                    let [name, ext] = avatar.name.split(".");
                    let new_name    = uuidv4() + "." + ext
                    let dir         = "public/images/profile/profile_pic/" + new_name;
                    let db_path     = "/images/profile/profile_pic/" + new_name;

                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        let insert = User.insertEnvoyProfile(message.user_id, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, db_path, "1", hash, "1");
                        avatar.mv(dir);
                    });
                   
                }
                res.json({success : message.message});
                
            } else {
                res.json({error : message.message})
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login";
            res.json({url : url});
        }
     } else {
        var url = "/login";
        res.json({url : url});
    }
}

//Function To Render Envoy Add Form
module.exports.getEditEnvoyForm = async (req, res, next) => {
     if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
         var icon       = "fas fa-users";
        var title       = "Sponsors";
        var ID          = req.params.id;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            let edittee     = await User.getUserById(ID);
            var sidebar     = {dash : "", usr : "", adm : "active", kds : "", sps : "", env : "", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar, edity : edittee[0]};
            res.render('admin/editSponsor', context);
        } else {
            res.redirect("/login");
        }
     } else {
        res.redirect("/login");
    }
};

//Function To Handle Envoy Profile Edit Post
module.exports.updateEnvoyProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var ID          = req.body.id;
        var edittee     = await User.getUserById(ID);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].id == ID || user[0].user_type == "ADM")){
            var [raby, state, message] = await validator.validSponsor(req, "edit");
            //var test = validator.validAdministrator(req, "add");

            if (state){
                if(!req.files) {
                    if (req.body.password != ""){
                        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                            let datetime = moment().format( 'YYYY-MM-DD  HH:mm:ss.000' );
                            let update   = User.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, edittee[0].profile_photo, hash, user[0].user_id, datetime);   
                        });
                    } else {
                        var hash    = edittee[0].password;
                        let datetime = moment().format( 'YYYY-MM-DD  HH:mm:ss.000' );
                        let update   = User.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, edittee[0].profile_photo, hash, user[0].user_id, datetime);
                    }    
                } else {
                    if (edittee[0].profile_photo != ""){
                        fs.unlinkSync(path.join(__dirname,'..', 'public', edittee[0].profile_photo));
                    }
                    let avatar      = req.files.pp;
                    let [name, ext] = avatar.name.split(".");
                    let new_name    = uuidv4() + "." + ext
                    let dir         = "public/images/profile/profile_pic/" + new_name;
                    let db_path     = "/images/profile/profile_pic/" + new_name;
                    console.log(dir);
                    console.log(db_path);

                    if (req.body.password != ""){
                        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                            let datetime = moment().format( 'YYYY-MM-DD  HH:mm:ss.000' );
                            let update   = User.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, db_path, hash, user[0].user_id, datetime);   
                        });
                    } else {
                        var hash    = edittee[0].password;
                        let datetime = moment().format( 'YYYY-MM-DD  HH:mm:ss.000' );
                        let update   = User.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, db_path, hash, user[0].user_id, datetime);
                    }
                    avatar.mv(dir);
                   
                }
                res.json({success : edittee[0].fname + " Profile Has Been Updated Successfully."});
                
            } else {
                res.json({error : message.message})
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login";
            res.json({url : url});
        }
     } else {
        var url = "/login";
        res.json({url : url});
    }
}

//Function To Render Envoys
module.exports.getKids = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var icon        = "fas fa-child";
        var title       = "Kids";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            var kids      = await User.getKids();
            var sidebar     = {dash : "", usr : "", adm : "", kds : "active", sps : "", env : "", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar, kds : kids};
            res.render('admin/kids', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
     } else {
        var url = "/login";
        res.redirect(url);
    }

    
};

//Function To Render Envoy Add Form
module.exports.getAddKidForm = async (req, res, next) => {
     if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var icon        = "fas fa-hands-helping";
        var title       = "Envoys";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            var sidebar     = {dash : "", usr : "", adm : "", kds : "", sps : "", env : "active", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar};
            res.render('admin/addEnvoy', context);
        } else {
            res.redirect("/login");
        }
     } else {
        res.redirect("/login");
    }
};

