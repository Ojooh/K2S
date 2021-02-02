const User          = require('./db_controller');
const validator     = require('./validator');
const { v4: uuidv4 }= require('uuid');
const bcrypt        = require('bcrypt');
const saltRounds    = 10;




//Function To Render Dashboard
module.exports.getDash = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);
        var icon        = "fas fa-th-large";
        var title       = "Dashboard";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            var sidebar     = {dash : "active", usr : "", adm : "", kds : "", sps : "", ntf : ""};
            var context     = {title : title, icon : icon, user : user[0], active : sidebar};
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


//Function to Handle Admin Profile Post
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
                    let dir         = "public/images/profile/profile_pic/" + uuidv4() + "." + ext;
                    let db_path     = "/images/profile_pic/" + uuidv4() + "." + ext;

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
        console.log(ID);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].id == ID)){
            let edittee = await User.getUserById(ID);
            console.log(edittee);
            res.json({success : edittee[0]});
        
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }


}