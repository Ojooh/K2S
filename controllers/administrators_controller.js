const DB = require('./db_controller');
const validator = require('./validator');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const saltRounds = 10;
var helper = require("./helper");




//Function To Render Dashboard
module.exports.getDash = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-th-large";
        var title = "Dashboard";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var noty = await DB.getNotys(user[0].user_id);
            var admins = await DB.getCountAdmins();
            var sponsors = await DB.getCountSponsors();
            var envoys = await DB.getCountEnvoys();
            var kids = await DB.getCountKids();
            var activeKids = await DB.getCountActiveKids();
            var inactiveKids = await DB.getCountInactiveKids();
            var kts = await DB.getCountKTS();
            var ktsp = await DB.getCountKTSP();
            var kta = await DB.getCountKTA();
            var ktt = await DB.getCountKTT();
            var contacts = await DB.getContacts(user[0].user_id);
            var sidebar = { dash: "active", usr: "", adm: "", kds: "", sps: "", env: "", ntf: "" };
            var count = { admins: admins[0].total, sponsors: sponsors[0].total, envoys: envoys[0].total, kids: kids[0].total, activeKids: activeKids[0].total, inactiveKids: inactiveKids[0].total, };
            var graph = { kts: kts[0].total, ktsp: ktsp[0].total, kta: kta[0].total, ktt: ktt[0].total };
            var chart = { kts_m: kts[0].male, kts_f: kts[0].female, ktsp_m: ktsp[0].male, ktsp_f: ktsp[0].female, kta_m: kta[0].male, kta_f: kta[0].female, ktt_m: ktt[0].male, ktt_f: ktt[0].female };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, count: count, graph: graph, chart, chart, noty: noty, contacts: contacts };
            res.render('admin/dashboard', context);
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
        var count = 0;
        var start = 1;
        var section = 12;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")) {
            var noty = await DB.getNotys(user[0].user_id);
            var adminsy = await DB.getAdministrators();
            var [admins, cur_t] = helper.paginateArray(adminsy, count);
            var tab = JSON.parse(user[0].preference);

            var sidebar = { dash: "", usr: "", adm: "active", kds: "", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, admins: admins, noty: noty, points: cur_t, curry: count, total: adminsy.length, start: start, section: section };
            res.render('admin/administrators', context);
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }


};

//Function To Render Page:id
module.exports.getAdminPage = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-user-shield";
        var title = "Administrators";
        var count = req.params.id;
        var start = (12 * count) + 1;
        // var section = 12 * (count + 1)


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")) {
            var adminsy = await DB.getAdministrators();
            var [admins, cur_t] = helper.paginateArray(adminsy, count);
            var noty = await DB.getNotys(user[0].user_id);
            var tab = JSON.parse(user[0].preference);

            var sidebar = { dash: "", usr: "", adm: "active", kds: "", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, admins: admins, noty: noty, points: cur_t, curry: count, total: adminsy.length, start: start, section: (start + adminsy.length) - 1 };
            res.render('admin/administrators', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
    } else {
        var url = "/login";
        res.redirect(url);
    }
};

// function to handle search
module.exports.searchMyAdmins = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-user-shield";
        var title = "Administrators";
        var count = req.params.id;
        var [mesc, kwy] = req.params.kwy.split("-");
        var start = (12 * count) + 1;
        var result;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")) {
            if (mesc == "admins") {
                result = await DB.getAdminSearch(kwy);
            }
            var turl = req.originalUrl.split("page")[0];
            console.log(turl)
            var [admins, cur_t] = helper.paginateArray(result, count);
            var noty = await DB.getNotys(user[0].user_id);
            var tab = JSON.parse(user[0].preference);

            var sidebar = { dash: "", usr: "", adm: "active", kds: "", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, admins: admins, noty: noty, turl: turl, points: cur_t, curry: count, total: result.length, start: start, section: (start + result.length) - 1 };
            res.render('admin/administrators-s', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
    } else {
        var url = "/login";
        res.redirect(url);
    }


};

// Method to handle change of tab prefrence
module.exports.changePreference = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.pref;

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADM" || user[0].user_type == "ADMS")) {
            let update = await DB.updateUserPrefrence(ID, user[0].id);
            var msg = user[0].fname + " Preference Changed Successfully";
            res.json({ success: msg });
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
                        let insert = DB.insertAdminProfile(message.user_id, req.body.fname, req.body.lname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state, req.body.email, req.body.code + "-" + req.body.telephone, req.body.title, message.user_type, "", "1", hash, "1");
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
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

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
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
}

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
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
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
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
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
            edittee[0].expenses = ((edittee[0].expenses != "") ? JSON.parse(edittee[0].expenses) : "");

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
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }


}


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
            res.redirect(url)
        }
    } else {
        var url = "/login";
        res.redirect(url)
    }

};

//Function To Render Sponsors
module.exports.getSponsors = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-users";
        var title = "Sponsors";
        var count = 0;
        var start = 1;
        var section = 12;
        // let result = await DB.getAllUsers();


        // for (var g = 0; g < result.length; g++) {
        //     // console.log(result[0])
        //     if (result[g].user_type == "ENV") {
        //         let v = await DB.getCountEnvoyKids(result[g].user_id);
        //         console.log(v)
        //         let d = await DB.updateKids(v[0].total, result[g].user_id)
        //     }
        //     if (result[g].user_type == "SPN") {
        //         let v = await DB.getCountSponsorKids(result[g].user_id);
        //         let d = await DB.updateKids(v[0].total, result[g].user_id)
        //         console.log(v)
        //     }
        // }




        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var noty = await DB.getNotys(user[0].user_id);
            var sponsorsy = await DB.getSponsors();
            var [sponsors, cur_t] = helper.paginateArray(sponsorsy, count);
            var Kids = await DB.getCountEnvoyKids(user[0].user_id);
            var tab = JSON.parse(user[0].preference);


            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "active", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, spns: sponsors, noty: noty, points: cur_t, curry: count, total: sponsorsy.length, start: start, section: section };
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

// /Function To Render Page:id
module.exports.getSponsorPage = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-users";
        var title = "Sponsors";
        var count = req.params.id;
        var start = (12 * count) + 1;
        // var section = 12 * (count + 1)


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var sponsorsy = await DB.getSponsors();
            var [sponsors, cur_t] = helper.paginateArray(sponsorsy, count);
            var noty = await DB.getNotys(user[0].user_id);
            var tab = JSON.parse(user[0].preference);

            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "active", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, spns: sponsors, noty: noty, points: cur_t, curry: count, total: sponsorsy.length, start: start, section: (start + sponsorsy.length) - 1 };
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

// function to handle search
module.exports.searchMySponsors = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-user-shield";
        var title = "Administrators";
        var count = req.params.id;
        var [mesc, kwy] = req.params.kwy.split("-");
        var start = (12 * count) + 1;
        var result;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS")) {
            if (mesc == "sponsors") {
                result = await DB.getSponsorSearch(kwy);
            }
            var turl = req.originalUrl.split("page")[0];
            console.log(turl)
            var [sponsors, cur_t] = helper.paginateArray(result, count);
            var noty = await DB.getNotys(user[0].user_id);
            var tab = JSON.parse(user[0].preference);

            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "active", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, spns: sponsors, noty: noty, turl: turl, points: cur_t, curry: count, total: result.length, start: start, section: (start + result.length) - 1 };
            res.render('admin/sponsors-s', context);
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
            res.redirect(url)
        }
    } else {
        var url = "/login";
        res.redirect(url)
    }
}

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
            res.redirect(url)
        }
    } else {
        var url = "/login";
        res.redirect(url)
    }
}

//Function To Render Envoys
module.exports.getEnvoys = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-hands-helping";
        var title = "Envoys";
        var count = 0;
        var start = 1;
        var section = 12;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var noty = await DB.getNotys(user[0].user_id);
            var envoysy = await DB.getEnvoys();
            var [envoys, cur_t] = helper.paginateArray(envoysy, count);
            var tab = JSON.parse(user[0].preference);


            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "", env: "active", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, envs: envoys, noty: noty, points: cur_t, curry: count, total: envoysy.length, start: start, section: section };

            res.render('admin/envoys', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
    } else {
        var url = "/login";
        res.redirect(url);
    }


};

// /Function To Render Page:id
module.exports.getEnvoysPage = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-hands-helping";
        var title = "Envoys";
        var count = req.params.id;
        var start = (12 * count) + 1;
        // var section = 12 * (count + 1)


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var envoysy = await DB.getEnvoys();
            var [envoys, cur_t] = helper.paginateArray(envoysy, count);
            var noty = await DB.getNotys(user[0].user_id);
            var tab = JSON.parse(user[0].preference);

            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "", env: "active", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, envs: envoys, noty: noty, points: cur_t, curry: count, total: envoysy.length, start: start, section: (start + envoysy.length) - 1 };
            res.render('admin/envoys', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
    } else {
        var url = "/login";
        res.redirect(url);
    }
};

// function to handle search
module.exports.searchMyEnvoys = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-hands-helping";
        var title = "Envoys";
        var count = req.params.id;
        var [mesc, kwy] = req.params.kwy.split("-");
        var start = (12 * count) + 1;
        var result;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADMS")) {
            if (mesc == "envoys") {
                result = await DB.getEnvoySearch(kwy);
            }
            var turl = req.originalUrl.split("page")[0];
            console.log(turl)
            var [envoys, cur_t] = helper.paginateArray(result, count);
            var noty = await DB.getNotys(user[0].user_id);
            var tab = JSON.parse(user[0].preference);

            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "", env: "active", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, envs: envoys, noty: noty, turl: turl, points: cur_t, curry: count, total: result.length, start: start, section: (start + result.length) - 1 };
            res.render('admin/envoys-s', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
    } else {
        var url = "/login";
        res.redirect(url);
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
            res.redirect(url)
        }
    } else {
        var url = "/login";
        res.redirect(url)
    }
}

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
            res.redirect(url)
        }
    } else {
        var url = "/login";
        res.redirect(url)
    }
}

//Function To Render Envoys
module.exports.getKids = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "Kids";
        var count = 0;
        var start = 1;
        var section = 12;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var noty = await DB.getNotys(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var kidsy = await DB.getKids();
            var [kids, cur_t] = helper.paginateArray(kidsy, count);

            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, kds: kids, noty: noty, points: cur_t, curry: count, total: kidsy.length, start: start, section: section };
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

// /Function To Render Page:id
module.exports.getKidsPage = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "Kids";
        var count = req.params.id;
        var start = (12 * count) + 1;
        // var section = 12 * (count + 1)


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var noty = await DB.getNotys(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var kidsy = await DB.getKids();
            var [kids, cur_t] = helper.paginateArray(kidsy, count);

            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, kds: kids, noty: noty, points: cur_t, curry: count, total: kidsy.length, start: start, section: (start + kidsy.length) - 1 };
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

// function to handle search
module.exports.searchMyKids = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "Kids";
        var count = req.params.id;
        var [mesc, kwy] = req.params.kwy.split("-");
        var start = (12 * count) + 1;
        var result;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            if (mesc == "kids") {
                result = await DB.getKidsSearch(kwy);
            }
            var turl = req.originalUrl.split("page")[0];
            console.log(turl)
            var [kids, cur_t] = helper.paginateArray(result, count);
            var noty = await DB.getNotys(user[0].user_id);
            var tab = JSON.parse(user[0].preference);

            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "", env: "active", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, kds: kids, noty: noty, turl: turl, points: cur_t, curry: count, total: result.length, start: start, section: (start + result.length) - 1 };
            res.render('admin/kids-s', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
    } else {
        var url = "/login";
        res.redirect(url);
    }


};


//Function to Handle Envoy AddProfile Post
module.exports.createKidProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        // console.log(req.body)
        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "ENV")) {
            var [raby, state, message] = await validator.validKid(req, "add");

            if (state) {
                var is_active = '1';
                if (user[0].user_type == "ENV") {
                    is_active = '0'
                }
                // console.log(req.body.expenses);
                // console.log(JSON.stringify(req.body.expenses));
                if (!req.files) {
                    let insert = await DB.insertKidProfile(message.user_id, req.body.category, req.body.fname, req.body.lname, req.body.mname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state_o, req.body.state_r, req.body.lga, req.body.email, req.body.tely, req.body.sname, req.body.saddress, req.body.los, req.body.class, req.body.totalExpense, req.body.sother, req.body.pname, req.body.ptitle, req.body.pemail, req.body.ptel, req.body.story, req.body.goal, req.body.bc, req.body.pp, user[0].user_id, req.body.expenses, is_active);
                } else {
                    let db_path_2 = ""
                    let avatar_1 = ((req.files.pp) ? req.files.pp : "");
                    let avatar_2 = ((req.files.bc) ? req.files.bc : "")
                    let [name_1, ext_1] = avatar_1.name.split(".");
                    if (avatar_2 != "") {
                        let [name_2, ext_2] = avatar_2.name.split(".");
                        let new_name_2 = uuidv4() + "." + ext_2
                        let dir_2 = "public/doc/bc/" + new_name_2;
                        db_path_2 = "/doc/bc/" + new_name_2;
                    }

                    let new_name_1 = uuidv4() + "." + ext_1
                    let dir_1 = "public/images/profile/kids/" + new_name_1;
                    let db_path_1 = "/images/profile/kids/" + new_name_1;


                    let insert = await DB.insertKidProfile(message.user_id, req.body.category, req.body.fname, req.body.lname, req.body.mname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state_o, req.body.state_r, req.body.lga, req.body.email, req.body.tely, req.body.sname, req.body.saddress, req.body.los, req.body.class, req.body.totalExpense, req.body.sother, req.body.pname, req.body.ptitle, req.body.pemail, req.body.ptel, req.body.story, req.body.goal, db_path_2, db_path_1, user[0].user_id, req.body.expenses, is_active);
                    avatar_1.mv(dir_1);

                    if (avatar_2 != "") {
                        avatar_2.mv(dir_2);
                    }

                }
                res.json({ success: message.message });

            } else {
                res.json({ error: message.message })
            }

            // res.render('admin/addAdministrator', context);
        } else {
            var url = "/login";
            res.redirect(url)
        }
    } else {
        var url = "/login";
        res.redirect(url)
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

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
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
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }

}

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
                console.log(req.body.expenses);
                // console.log(JSON.parse(req.body.expenses));
                // req.body.expenses = JSON.parse(req.body.expenses)
                if (!req.files) {
                    let pp = edittee[0].profile_photo;
                    let bc = edittee[0].bc;
                    let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                    let update = DB.updateKidProfile(ID, req.body.category, req.body.fname, req.body.lname, req.body.mname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state_o, req.body.state_r, req.body.lga, req.body.email, req.body.tely, req.body.sname, req.body.saddress, req.body.los, req.body.class, req.body.totalExpense, req.body.sother, req.body.pname, req.body.ptitle, req.body.pemail, req.body.ptel, req.body.story, req.body.goal, bc, pp, user[0].user_id, datetime, req.body.expenses);
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
                    let update = DB.updateKidProfile(ID, req.body.category, req.body.fname, req.body.lname, req.body.mname, req.body.dob, req.body.age, req.body.gender, req.body.country, req.body.state_o, req.body.state_r, req.body.lga, req.body.email, req.body.tely, req.body.sname, req.body.saddress, req.body.los, req.body.class, req.body.totalExpense, req.body.sother, req.body.pname, req.body.ptitle, req.body.pemail, req.body.ptel, req.body.story, req.body.goal, db_path_2, db_path_1, user[0].user_id, datetime, req.body.expenses);
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
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
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
            res.redirect(url)
        }
    } else {
        var url = "/login";
        res.redirect(url)
    }

};

module.exports.getNotify = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-bell";
        var title = "Notifications";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            var tasks = await DB.getEnvoyTasks(user[0].user_id);
            var noty = await DB.getNotys(user[0].user_id);
            var contacts = await DB.getContacts(user[0].user_id);

            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "", env: "", ntf: "active" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tks: tasks, noty: noty, contacts: contacts.slice(0, 4) };
            res.render('admin/notifications', context);
            // res.send('respond with a resource.');
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

//Function to update task status
module.exports.updateStatus = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var status = req.body.status;
        var change, d_done = "";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            if (status == "False") {
                status = "0";
                change = " Marked In-complete";
                d_done = ""
            } else {
                status = "1";
                change = " Marked Complete";
                d_done = moment().format('YYYY-MM-DD  HH:mm:ss.000');
            }

            let update = await DB.updateTaskStatus(ID, status, d_done);
            var editted = await DB.getTaskById(ID);
            cat = "task_f";
            let exist = await DB.notyExist(user[0].user_id, cat);
            if (exist.length > 0) {
                msg = "You have " + (exist[0].count + 1).toString() + " Finished Task(s)";
                let update = await DB.updateNoty(user[0].user_id, msg, exist[0].count + 1, cat);
            } else {
                msg = "You have 1 Finished Task(s)";
                let insert_2 = await DB.addNoty(user[0].user_id, msg, cat, "1");
            }
            var msg = editted[0].message_topic + "" + change;
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


//Function to update task status
module.exports.updateMessage = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var status = req.body.status;
        var change = "";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            await DB.updateMessageStatus(ID);
            res.json({ success: "message seen successfully" });
        } else {
            var url = "/login"
            res.redirect(url);
        }
    } else {
        var url = "/login"
        res.redirect(url);
    }
};

//Function To Delete User Task
module.exports.deleteTask = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var editted = await DB.getTaskById(ID);
        var change = "";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_id == editted[0].sender)) {
            let update = await DB.deleteUserTask(ID);
            cat = "task_d";
            let exist = await DB.notyExist(user[0].user_id, cat);
            if (exist.length > 0) {
                msg = "You have " + (exist[0].count + 1).toString() + " Deleted Task(s)";
                let update = await DB.updateNoty(user[0].user_id, msg, exist[0].count + 1, cat);
            } else {
                msg = "You have 1 Deleted Task(s)";
                let insert_2 = await DB.addNoty(user[0].user_id, msg, cat, "1");
            }
            var msg = editted[0].message_topic + " Deleted Successfully";
            res.json({ success: msg });
        } else {
            var url = "/login";
            res.redirect(url)
        }
    } else {
        var url = "/login";
        res.redirect(url)
    }

};


//Function To get Task
module.exports.getTask = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var type = req.body.type;
        var mode = req.body.mode;
        var task = await DB.getTaskById(ID);
        console.log(type);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_id == task[0].sender)) {
            if (type == "edit") {
                if (mode == "form") {

                    res.json({ success: "successful", type: mode });
                } else {
                    res.json({ success: task[0], type: mode });
                }
            }

            if (type == "display") {
                res.json({ success: task[0], type: mode });
            }




        } else {
            var url = "/login"
            res.redirect(url)
        }
    } else {
        var url = "/login"
        res.redirect(url);
    }


};

//Function to get all Users
module.exports.getChatUsers = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "SPN")) {
            let result = await DB.getAllUsers();
            res.json({ success: result });
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};
