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
            var admins      = await User.getAdministrators();
            var sponsors    = await User.getSponsors()
            var sidebar     = {dash : "active", usr : "", adm : "", kds : "", sps : "", ntf : ""};
            var count       = {admins : admins.length, sponsors : sponsors.length}
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
            var sidebar     = {dash : "", usr : "", adm : "active", kds : "", sps : "", ntf : ""};
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
            var sidebar     = {dash : "", usr : "", adm : "active", kds : "", sps : "", ntf : ""};
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
            res.redirect("/login");
        }
     } else {
        res.redirect("/login");
    }
}

//Function To Chnage Admin Active Status
module.exports.updateAdminStatusProfile = async (req, res, next) => {
     if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var ID          = req.body.id;
        var status      = req.body.status;
        var change      = "";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")){
            if (status == "False"){
                status = "0";
                change = "Deactivated"
            } else {
                status = "1";
                change = "Activated";
            }
            let update      = await User.updateAdminStatus(ID, status);
            var editted     = await User.getUserById(ID);
            var msg         = editted[0].fname + " Profile Is " + change;
            res.json({success : msg});
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }

}

//Function To get Admin Data
module.exports.getEditAdmin = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var ID          = req.body.id;
        var type        = req.body.type;

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].id == ID)){
            let edittee = await User.getUserById(ID);

            if (type == "form"){
                var url = "/admin/Administrators/edit_admin/" + ID;
                res.json({success : url, type : type});
            } else {
                res.json({success : edittee[0], type : type});
            }
            
        
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
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
            res.redirect("/login");
        }
     } else {
        res.redirect("/login");
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
            var sidebar     = {dash : "", usr : "", adm : "active", kds : "", sps : "", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar, edity : edittee[0]};
            res.render('admin/editAdministrator', context);
        } else {
            res.redirect("/login");
        }
     } else {
        res.redirect("/login");
    }
};

//Function To Delete Admin Profile
module.exports.deleteAdminProfile = async (req, res, next) => {
     if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var ID          = req.body.id;
        var editted     = await User.getUserById(ID);
        var change      = "";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")){
            let update      = await User.deleteAdminProfile(ID); 
            var msg         = editted[0].fname + " Profile Deleted Successfully";
            res.json({success : msg});
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
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
            var sidebar     = {dash : "", usr : "", adm : "", kds : "", sps : "active", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar, spns : sponsors};
            res.render('admin/sponsors', context);
        } else {
            res.redirect("/login");
        }
     } else {
        res.redirect("/login");
    }

    
};
