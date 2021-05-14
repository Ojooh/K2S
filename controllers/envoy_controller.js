const DB = require('./db_controller');
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
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-th-large";
        var title = "Dashboard";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ENV")) {
            var noty = await DB.getNotys(user[0].user_id);
            var Kids = await DB.getCountEnvoyKids(user[0].user_id);
            var activeKids = await DB.getCountEnvoyActiveKids(user[0].user_id);
            var inactiveKids = await DB.getCountEnvoyInactiveKids(user[0].user_id);
            var kts = await DB.getCountEnvoyKTS(user[0].user_id);
            var ktsp = await DB.getCountEnvoyKTSP(user[0].user_id);
            var kta = await DB.getCountEnvoyKTA(user[0].user_id);
            var ktt = await DB.getCountEnvoyKTT(user[0].user_id);
            var sponsKids = 0;
            var sidebar = { dash: "active", usr: "", adm: "", kds: "", sps: "", env: "", ntf: "" };
            var count = { kids: Kids[0].total, activeKids: activeKids[0].total, inactiveKids: inactiveKids[0].total, sponsKids: sponsKids };
            var graph = { kts: kts[0].total, ktsp: ktsp[0].total, kta: kta[0].total, ktt: ktt[0].total };
            var chart = { kts_m: kts[0].male, kts_f: kts[0].female, ktsp_m: ktsp[0].male, ktsp_f: ktsp[0].female, kta_m: kta[0].male, kta_f: kta[0].female, ktt_m: ktt[0].male, ktt_f: ktt[0].female };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, count: count, graph: graph, chart, chart, noty: noty };
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
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "Kids";


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "ENV")) {
            var kids = await DB.getEnvoyKids(user[0].user_id);
            var noty = await DB.getNotys(user[0].user_id);
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, kds: kids, noty: noty };
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

//Function to get notifications
module.exports.getNotify = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-bell";
        var title = "Notifications";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ENV")) {
            var tasks = await DB.getEnvoyTasks(user[0].user_id);
            var noty = await DB.getNotys(user[0].user_id);
            var contacts = await DB.getContacts(user[0].user_id);

            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "", env: "", ntf: "active" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tks: tasks, noty: noty, contacts, contacts };
            res.render('envoy/notifications', context);
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

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ENV")) {
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

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ENV")) {
            let update = await DB.updateMessageStatus(ID);
            res.json({ success: "message seen successfully" });
        } else {
            var url = "/login"
            res.json({ url: url });
        }
    } else {
        var url = "/login"
        res.json({ url: url });
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
            res.json({ url: url });
        }
    } else {
        var url = "/login";
        res.json({ url: url });
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
            res.json({ url: url });
        }
    } else {
        var url = "/login"
        res.json({ url: url });
    }


};
