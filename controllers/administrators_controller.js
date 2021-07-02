const DB = require('./db_controller');
const validator = require('./validator');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const saltRounds = 10;




//Function To Render Dashboard
module.exports.getDash = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-th-large";
        var title = "Dashboard";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var admins = await DB.getCountAdmins();
            var sponsors = await DB.getCountSponsors();
            var envoys = await DB.getCountEnvoys();
            var kids = await DB.getCountKids();
            var sidebar = { dash: "active", usr: "", adm: "", kds: "", sps: "", env: "", ntf: "" };
            var count = { admins: admins[0].total, sponsors: sponsors[0].total, envoys: envoys[0].total, kids: kids.total };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, count: count };
            res.render('admin/Dashboard', context);
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

//Function to get all Users
module.exports.getAllUsers = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "ENV")) {
            let result = await DB.getAllUsers();
            res.json({ success: result });
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
}

//Function To Render Administrators
module.exports.getAdministrators = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-user-shield";
        var title = "Administrators";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")) {
            var admins = await DB.getAdministrators();
            var sidebar = { dash: "", usr: "", adm: "active", kds: "", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, admins: admins };
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
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-user-shield";
        var title = "Administrators";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")) {
            var sidebar = { dash: "", usr: "", adm: "active", kds: "", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar };
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
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")) {
            var [raby, state, message] = await validator.validAdministrator(req, "add");
            //var test = validator.validAdministrator(req, "add");

            if (state) {
                if (!req.files) {
                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        let insert = DB.insertAdminProfile(message.user_id, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + req.body.telephone, req.body.title, message.user_type, "", "1", hash, "1");
                    });

                } else {
                    let avatar = req.files.pp;
                    let [name, ext] = avatar.name.split(".");
                    let new_name = uuidv4() + "." + ext
                    let dir = "public/images/profile/admin/" + new_name;
                    let db_path = "/images/profile/admin/" + new_name;

                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        let insert = DB.insertAdminProfile(message.user_id, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, db_path, "1", hash, "1");
                        avatar.mv(dir);
                    });

                }
                res.json({ success: message.message });

            } else {
                res.json({ error: message.message })
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login"
            res.json({ url: url });
        }
    } else {
        var url = "/login"
        res.json({ url: url });
    }
};

//Function To Chnage Active Status
module.exports.updateProfileStatus = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var status = req.body.status;
        var change = "";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            if (status == "False") {
                status = "0";
                change = "Deactivated";
            } else {
                status = "1";
                change = "Activated";
            }
            let update = await DB.updateUserStatus(ID, status);
            var editted = await DB.getUserById(ID);
            var msg = editted[0].fname + " Profile Is " + change;
            res.json({ success: msg });
        } else {
            var url = "/login"
            res.json({ url: url });
        }
    } else {
        var url = "/login"
        res.json({ url: url });
    }

};

//Function To get Admin Data
module.exports.getProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var type = req.body.type;
        var mode = req.body.mode;
        console.log(type);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].id == ID || user[0].user_type == "ADM")) {
            let edittee = await DB.getUserById(ID);
            //console.log(edittee);

            if (type == "edit") {
                if (mode == "form") {

                    res.json({ success: "successful", type: mode });
                } else {
                    res.json({ success: edittee[0], type: mode });
                }
            }

            if (type == "display") {
                res.json({ success: edittee[0], type: mode });
            }




        } else {
            var url = "/login"
            res.json({ url: url });
        }
    } else {
        var url = "/login"
        res.json({ url: url });
    }


};

//Function To get Kid Data
module.exports.getKidProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var type = req.body.type;
        var mode = req.body.mode;
        console.log(type);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].id == ID || user[0].user_type == "ADM" || user[0].user_type == "ENV")) {
            let edittee = await DB.getKidById(ID);
            //console.log(edittee);

            if (type == "edit") {
                if (mode == "form") {

                    res.json({ success: "successful", type: mode });
                } else {
                    res.json({ success: edittee[0], type: mode });
                }
            }

            if (type == "display") {
                res.json({ success: edittee[0], type: mode });
            }




        } else {
            var url = "/login"
            res.json({ url: url });
        }
    } else {
        var url = "/login"
        res.json({ url: url });
    }


}

//Function To Handle Admin Profile Edit Post
module.exports.updateAdminProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var edittee = await DB.getUserById(ID);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].id == ID)) {
            var [raby, state, message] = await validator.validAdministrator(req, "edit");
            //var test = validator.validAdministrator(req, "add");

            if (state) {
                if (!req.files) {
                    if (req.body.password != "") {
                        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                            let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                            let update = DB.updateAdminProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, edittee[0].profile_photo, hash, user[0].user_id, datetime);
                        });
                    } else {
                        var hash = edittee[0].password;
                        let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                        let update = DB.updateAdminProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, edittee[0].profile_photo, hash, user[0].user_id, datetime);
                    }
                } else {
                    if (edittee[0].profile_photo != "") {
                        fs.unlinkSync(path.join(__dirname, '..', 'public', edittee[0].profile_photo));
                    }
                    let avatar = req.files.pp;
                    let [name, ext] = avatar.name.split(".");
                    let new_name = uuidv4() + "." + ext
                    let dir = "public/images/profile/admin/" + new_name;
                    let db_path = "/images/profile/admin/" + new_name;
                    console.log(dir);
                    console.log(db_path);

                    if (req.body.password != "") {
                        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                            let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                            let update = DB.updateAdminProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, db_path, hash, user[0].user_id, datetime);
                        });
                    } else {
                        var hash = edittee[0].password;
                        let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                        let update = DB.updateAdminProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, db_path, hash, user[0].user_id, datetime);
                    }
                    avatar.mv(dir);

                }
                res.json({ success: edittee[0].fname + " Profile Has Been Updated Successfully." });

            } else {
                res.json({ error: message.message })
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login"
            res.json({ url: url });
        }
    } else {
        var url = "/login"
        res.json({ url: url });
    }
}

//Function To Render Adminstartor Add Form
module.exports.getEditAdministratorForm = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-user-shield";
        var title = "Administrators";
        var ID = req.params.id;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")) {
            let edittee = await DB.getUserById(ID);
            var sidebar = { dash: "", usr: "", adm: "active", kds: "", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, edity: edittee[0] };
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

//Function To Delete User Profile
module.exports.deleteProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var editted = await DB.getUserById(ID);
        var change = "";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")) {
            let update = await DB.deleteUserProfile(ID);
            var msg = editted[0].fname + " Profile Deleted Successfully";
            res.json({ success: msg });
        } else {
            var url = "/login";
            res.json({ url: url });
        }
    } else {
        var url = "/login";
        res.json({ url: url });
    }

};

//Function To Render Sponsors
module.exports.getSponsors = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-users";
        var title = "Sponsors";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var sponsors = await DB.getSponsors();
            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "active", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, spns: sponsors };
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
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-users";
        var title = "Sponsors";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "active", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar };
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
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var [raby, state, message] = await validator.validSponsor(req, "add");
            //var test = validator.validAdministrator(req, "add");

            if (state) {
                if (!req.files) {
                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        let insert = DB.insertSponsorProfile(message.user_id, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, "", "1", hash, "1");
                    });

                } else {
                    let avatar = req.files.pp;
                    let [name, ext] = avatar.name.split(".");
                    let new_name = uuidv4() + "." + ext
                    let dir = "public/images/profile/sponsor/" + new_name;
                    let db_path = "/images/profile/sponsor/" + new_name;

                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        let insert = DB.insertSponsorProfile(message.user_id, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, db_path, "1", hash, "1");
                        avatar.mv(dir);
                    });

                }
                res.json({ success: message.message });

            } else {
                res.json({ error: message.message })
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login";
            res.json({ url: url });
        }
    } else {
        var url = "/login";
        res.json({ url: url });
    }
}

//Function To Render Sponsors Add Form
module.exports.getEditSponsorForm = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-users";
        var title = "Sponsors";
        var ID = req.params.id;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            let edittee = await DB.getUserById(ID);
            var sidebar = { dash: "", usr: "", adm: "active", kds: "", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, edity: edittee[0] };
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
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var edittee = await DB.getUserById(ID);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].id == ID || user[0].user_type == "ADM")) {
            var [raby, state, message] = await validator.validSponsor(req, "edit");
            //var test = validator.validAdministrator(req, "add");

            if (state) {
                if (!req.files) {
                    if (req.body.password != "") {
                        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                            let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                            let update = DB.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, edittee[0].profile_photo, hash, user[0].user_id, datetime);
                        });
                    } else {
                        var hash = edittee[0].password;
                        let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                        let update = DB.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, edittee[0].profile_photo, hash, user[0].user_id, datetime);
                    }
                } else {
                    if (edittee[0].profile_photo != "") {
                        fs.unlinkSync(path.join(__dirname, '..', 'public', edittee[0].profile_photo));
                    }
                    let avatar = req.files.pp;
                    let [name, ext] = avatar.name.split(".");
                    let new_name = uuidv4() + "." + ext
                    let dir = "public/images/profile/sponsor/" + new_name;
                    let db_path = "/images/profile/sponsor/" + new_name;
                    console.log(dir);
                    console.log(db_path);

                    if (req.body.password != "") {
                        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                            let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                            let update = DB.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, db_path, hash, user[0].user_id, datetime);
                        });
                    } else {
                        var hash = edittee[0].password;
                        let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                        let update = DB.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, db_path, hash, user[0].user_id, datetime);
                    }
                    avatar.mv(dir);

                }
                res.json({ success: edittee[0].fname + " Profile Has Been Updated Successfully." });

            } else {
                res.json({ error: message.message })
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login";
            res.json({ url: url });
        }
    } else {
        var url = "/login";
        res.json({ url: url });
    }
}

//Function To Render Envoys
module.exports.getEnvoys = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-hands-helping";
        var title = "Envoys";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var envoys = await DB.getEnvoys();
            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "", env: "active", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, envs: envoys };
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
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-hands-helping";
        var title = "Envoys";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "", env: "active", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar };
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
    console.log(req);
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        console.log("got here");

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var [raby, state, message] = await validator.validEnvoy(req, "add");
            //var test = validator.validAdministrator(req, "add");

            if (state) {
                if (!req.files) {
                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        let insert = DB.insertEnvoyProfile(message.user_id, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, "", "1", hash, "1");
                    });

                } else {
                    let avatar = req.files.pp;
                    let [name, ext] = avatar.name.split(".");
                    let new_name = uuidv4() + "." + ext
                    let dir = "public/images/profile/envoy/" + new_name;
                    let db_path = "/images/profile/envoy/" + new_name;

                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        let insert = DB.insertEnvoyProfile(message.user_id, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, db_path, "1", hash, "1");
                        avatar.mv(dir);
                    });

                }
                res.json({ success: message.message });

            } else {
                res.json({ error: message.message })
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login";
            res.json({ url: url });
        }
    } else {
        var url = "/login";
        res.json({ url: url });
    }
}

//Function To Render Envoy Add Form
module.exports.getEditEnvoyForm = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-users";
        var title = "Sponsors";
        var ID = req.params.id;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            let edittee = await DB.getUserById(ID);
            var sidebar = { dash: "", usr: "", adm: "active", kds: "", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, edity: edittee[0] };
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
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var edittee = await DB.getUserById(ID);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].id == ID || user[0].user_type == "ADM")) {
            var [raby, state, message] = await validator.validSponsor(req, "edit");
            //var test = validator.validAdministrator(req, "add");

            if (state) {
                if (!req.files) {
                    if (req.body.password != "") {
                        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                            let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                            let update = DB.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, edittee[0].profile_photo, hash, user[0].user_id, datetime);
                        });
                    } else {
                        var hash = edittee[0].password;
                        let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                        let update = DB.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, edittee[0].profile_photo, hash, user[0].user_id, datetime);
                    }
                } else {
                    if (edittee[0].profile_photo != "") {
                        fs.unlinkSync(path.join(__dirname, '..', 'public', edittee[0].profile_photo));
                    }
                    let avatar = req.files.pp;
                    let [name, ext] = avatar.name.split(".");
                    let new_name = uuidv4() + "." + ext
                    let dir = "public/images/profile/envoy/" + new_name;
                    let db_path = "/images/profile/envoy/" + new_name;
                    console.log(dir);
                    console.log(db_path);

                    if (req.body.password != "") {
                        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                            let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                            let update = DB.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, db_path, hash, user[0].user_id, datetime);
                        });
                    } else {
                        var hash = edittee[0].password;
                        let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                        let update = DB.updateUserProfile(ID, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, req.body.prof, db_path, hash, user[0].user_id, datetime);
                    }
                    avatar.mv(dir);

                }
                res.json({ success: edittee[0].fname + " Profile Has Been Updated Successfully." });

            } else {
                res.json({ error: message.message })
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login";
            res.json({ url: url });
        }
    } else {
        var url = "/login";
        res.json({ url: url });
    }
}

//Function To Render Envoys
module.exports.getKids = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "Kids";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "ENV")) {
            var kids = await DB.getKids();
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, kds: kids };
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
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-hands-helping";
        var title = "Envoys";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "", env: "active", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar };
            res.render('admin/addEnvoy', context);
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

//Function to Handle Envoy AddProfile Post
module.exports.createKidProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "ENV")) {
            console.log(req);
            var [raby, state, message] = await validator.validKid(req, "add");

            if (state) {
                if (!req.files) {
                    let insert = await DB.insertKidProfile(message.user_id, req.body.category, req.body.fname, req.body.lname, req.body.mname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state_o, req.body.state_r, req.body.lga, req.body.email, req.body.tely, req.body.sname, req.body.saddress, req.body.los, req.body.class, req.body.sfees, req.body.sother, req.body.pname, req.body.ptitle, req.body.pemail, req.body.ptel, req.body.story, req.body.goal, req.body.bc, req.body.pp, user[0].user_id);
                } else {
                    let avatar_1 = req.files.pp;
                    let avatar_2 = req.files.bc
                    let [name_1, ext_1] = avatar_1.name.split(".");
                    let [name_2, ext_2] = avatar_2.name.split(".");
                    let new_name_1 = uuidv4() + "." + ext_1
                    let new_name_2 = uuidv4() + "." + ext_2
                    let dir_1 = "public/images/profile/kids/" + new_name_1;
                    let dir_2 = "public/doc/bc/" + new_name_2;
                    let db_path_1 = "/images/profile/kids/" + new_name_1;
                    let db_path_2 = "/doc/bc/" + new_name_2;

                    let insert = await DB.insertKidProfile(message.user_id, req.body.category, req.body.fname, req.body.lname, req.body.mname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state_o, req.body.state_r, req.body.lga, req.body.email, req.body.tely, req.body.sname, req.body.saddress, req.body.los, req.body.class, req.body.sfees, req.body.sother, req.body.pname, req.body.ptitle, req.body.pemail, req.body.ptel, req.body.story, req.body.goal, db_path_2, db_path_1, user[0].user_id);
                    avatar_1.mv(dir_1);
                    avatar_2.mv(dir_2);

                }
                res.json({ success: message.message });

            } else {
                res.json({ error: message.message })
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login";
            res.json({ url: url });
        }
    } else {
        var url = "/login";
        res.json({ url: url });
    }
}

//Function To Chnage Kid Active Status
module.exports.updateKidStatus = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var status = req.body.status;
        var change = "";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "ENV")) {
            if (status == "False") {
                status = "0";
                change = "Deactivated";
            } else {
                status = "1";
                change = "Activated";
            }
            let update = await DB.updateKidStatus(ID, status);
            var editted = await DB.getKidById(ID);
            var msg = editted[0].fname + " Profile Is " + change;
            res.json({ success: msg });
        } else {
            var url = "/login"
            res.json({ url: url });
        }
    } else {
        var url = "/login"
        res.json({ url: url });
    }

}

//Function To Render Kid Edit Form
module.exports.getEditKidForm = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "Kids";
        var ID = req.params.id;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            let edittee = await DB.getKidById(ID);
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, edity: edittee[0] };
            res.render('admin/editKids', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
    } else {
        var url = "/login";
        res.redirect(url);
    }
};

//Function To Handle Kid Profile Edit Post
module.exports.updateKidProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var edittee = await DB.getKidById(ID);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "ENV")) {
            var [raby, state, message] = await validator.validKid(req, "edit");

            if (state) {
                if (!req.files) {
                    let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                    let update = DB.updateKidProfile(ID, req.body.category, req.body.fname, req.body.lname, req.body.mname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state_o, req.body.state_r, req.body.lga, req.body.email, req.body.tely, req.body.sname, req.body.saddress, req.body.los, req.body.class, req.body.sfees, req.body.sother, req.body.pname, req.body.ptitle, req.body.pemail, req.body.ptel, req.body.story, req.body.goal, req.body.bc, req.body.pp, user[0].user_id, datetime);
                } else {
                    if (edittee[0].profile_photo != "" && req.body.pp) {
                        fs.unlinkSync(path.join(__dirname, '..', 'public', edittee[0].profile_photo));
                    }

                    // if (edittee[0].bc != "" && req.body.bc) {
                    //     fs.unlinkSync(path.join(__dirname, '..', 'public', edittee[0].bc));
                    // }

                    let db_path_1, db_path_2, avatar_1, avatar_2, dir_1, _dir_2 = "";

                    if (req.files.pp) {
                        avatar_1 = req.files.pp;
                        let [name_1, ext_1] = avatar_1.name.split(".");
                        let new_name_1 = uuidv4() + "." + ext_1;
                        dir_1 = "public/images/profile/kids/" + new_name_1;
                        db_path_1 = "/images/profile/kids/" + new_name_1;
                    } else {
                        db_path_1 = "";
                    }

                    if (req.files.bc) {
                        avatar_2 = req.files.bc
                        let [name_2, ext_2] = avatar_2.name.split(".");
                        let new_name_2 = uuidv4() + "." + ext_2;
                        dir_2 = "public/doc/bc/" + new_name_2;
                        db_path_2 = "/doc/bc/" + new_name_2;
                    } else {
                        db_path_2 = "";
                    }

                    let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                    let update = DB.updateKidProfile(ID, req.body.category, req.body.fname, req.body.lname, req.body.mname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state_o, req.body.state_r, req.body.lga, req.body.email, req.body.tely, req.body.sname, req.body.saddress, req.body.los, req.body.class, req.body.sfees, req.body.sother, req.body.pname, req.body.ptitle, req.body.pemail, req.body.ptel, req.body.story, req.body.goal, db_path_2, db_path_1, user[0].user_id, datetime);
                    if (req.files.pp) {
                        req.files.pp.mv(dir_1);
                    }
                    if (req.files.bc) {
                        req.files.bc.mv(dir_2);
                    }


                }
                res.json({ success: edittee[0].fname + " Profile Has Been Updated Successfully." });

            } else {
                res.json({ error: message.message })
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login"
            res.json({ url: url });
        }
    } else {
        var url = "/login"
        res.json({ url: url });
    }
};

//Function To Delete Kid Profile
module.exports.deleteKidProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var editted = await DB.getKidById(ID);
        var change = "";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")) {
            let update = await DB.deleteKidProfile(ID);
            var msg = editted[0].fname + " Profile Deleted Successfully";
            res.json({ success: msg });
        } else {
            var url = "/login";
            res.json({ url: url });
        }
    } else {
        var url = "/login";
        res.json({ url: url });
    }

};

