const User = require('./db_controller');
const validator = require('./validator');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const moment = require('moment');
const path = require('path');
const fs = require('fs');


//Function To Render Dashboard
module.exports.getDash = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await User.getUserByEmail(email);
        var icon = "fas fa-th-large";
        var title = "Dashboard";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ENV")) {
            var admins = await User.getCountAdmins();
            var sponsors = await User.getCountSponsors();
            var envoys = await User.getCountEnvoys();
            var kids = await User.getCountKids();
            var sidebar = { dash: "active", usr: "", adm: "", kds: "", sps: "", env: "", ntf: "" };
            var count = { admins: admins[0].total, sponsors: sponsors[0].total, envoys: envoys[0].total, kids: kids.total };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, count: count };
            res.render('envoy/Dashboard', context);
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

//Function To Render Envoys
module.exports.getEnvoyKids = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await User.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "Kids";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "ENV")) {
            var kids = await User.getEnvoyKids(user[0].id);
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, kds: kids };
            res.render('envoy/kids', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
    } else {
        var url = "/login";
        res.redirect(url);
    }


};
