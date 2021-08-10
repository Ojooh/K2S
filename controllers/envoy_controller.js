const DB = require('./db_controller');
const moment = require('moment');
var helper = require("./helper");


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
            var contacts = await DB.getContacts(user[0].user_id);
            var sponsKids = 0;
            var sidebar = { dash: "active", usr: "", adm: "", kds: "", sps: "", env: "", ntf: "" };
            var count = { kids: Kids[0].total, activeKids: activeKids[0].total, inactiveKids: inactiveKids[0].total, sponsKids: sponsKids };
            var graph = { kts: kts[0].total, ktsp: ktsp[0].total, kta: kta[0].total, ktt: ktt[0].total };
            var chart = { kts_m: kts[0].male, kts_f: kts[0].female, ktsp_m: ktsp[0].male, ktsp_f: ktsp[0].female, kta_m: kta[0].male, kta_f: kta[0].female, ktt_m: ktt[0].male, ktt_f: ktt[0].female };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, count: count, graph: graph, chart, chart, noty: noty, contacts: contacts };
            res.render('envoy/Dashboard', context);
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

//Function to render Profile Page
module.exports.getProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "far fa-user";
        var title = "Profile";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ENV")) {
            title = user[0].fname + " " + title;
            var noty = await DB.getNotys(user[0].user_id);
            var sidebar = { dash: "", usr: "active", adm: "", kds: "", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, noty: noty };
            res.render('envoy/Profile', context);
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

//Function To Render Envoys Kids
module.exports.getEnvoyKids = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "Kids";
        var count = 0;
        var start = 1;
        var section = 12;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "ENV")) {
            var kidsy = await DB.getEnvoyKids(user[0].user_id);
            var [kids, cur_t] = helper.paginateArray(kidsy, count);
            var noty = await DB.getNotys(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, kds: kids, noty: noty, points: cur_t, curry: count, total: kidsy.length, start: start, section: section };
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

//Function To Render Page:id
module.exports.getPage = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "Kids";
        var count = req.params.id;
        var start = (12 * count) + 1;
        // var section = 12 * (count + 1)


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "ENV")) {
            var kidsy = await DB.getEnvoyKids(user[0].user_id);
            var [kids, cur_t] = helper.paginateArray(kidsy, count);
            var noty = await DB.getNotys(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, start: start, kds: kids, noty: noty, points: cur_t, curry: count, total: kidsy.length, section: (start + kids.length) - 1 };
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

//Method to handle filtering of data
module.exports.filterMyKids = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "Kids";
        var count = req.params.id;
        var start = (12 * count) + 1;
        var stat = parseInt(req.params.date);
        var filter = req.params.filter;
        var order = req.params.order;
        var dob = parseInt(req.params.dob);
        if (order == "ASC") {
            var roder = { order: "DESC", class: "fa-long-arrow-alt-up" };
        } else {
            var roder = { order: "ASC", class: "fa-long-arrow-alt-down" };
        }
        var filtys = { gender: "", male: "", female: "", date_joined: "", dob: "", category: "", kts: "", ktss: "", ktt: "", kta: "" };
        let result;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ENV")) {
            if (stat == 0 && dob == 0) {
                var [k, v] = filter.split("-");
                // console.log(v);
                filtys[k] = "fas fa-check";
                if (v == "Male") {
                    filtys.male = "fas fa-check";
                } else if (v == "Female") {
                    filtys.female = "fas fa-check";
                } else if (v == "Kids To School") {
                    filtys.kts = "fas fa-check";
                } else if (v == "Kids To Sports") {
                    filtys.ktss = "fas fa-check";
                } else if (v == "Kids To Art") {
                    filtys.kta = "fas fa-check";
                } else if (v == "Kids To Tech") {
                    filtys.ktt = "fas fa-check";
                }
                result = await DB.envoyFilterMyKidsBy(k, v, order, user[0].user_id)

            } else if (stat == 1 && dob == 0) {
                filtys.date_joined = "fas fa-check";
                result = await DB.envoyFilterMyKidsByDate(order, user[0].user_id);
            } else {
                filtys.dob = "fas fa-check";
                result = await DB.envoyFilterMyKidsByDOB(parseInt(filter), order, user[0].user_id)
            }

            var [kids, cur_t] = helper.paginateArray(result, count);
            var noty = await DB.getNotys(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var turl = req.originalUrl.split("page")[0];
            console.log(turl)
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, dor: roder, filt: filtys, turl: turl, start: start, kds: kids, noty: noty, points: cur_t, curry: count, total: result.length, section: (start + kids.length) - 1 };
            res.render('envoy/filter', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
    } else {
        var url = "/login";
        res.redirect(url);
    }

};

//Method to handle search for sponsors
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


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ENV")) {
            if (mesc == "kids") {
                result = await DB.getENVMySearch(kwy, user[0].user_id);
            }
            var turl = req.originalUrl.split("page")[0];
            console.log(turl)
            var [kids, cur_t] = helper.paginateArray(result, count);
            var noty = await DB.getNotys(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tab: tab, start: start, kds: kids, noty: noty, turl: turl, points: cur_t, curry: count, total: result.length, section: (start + kids.length) - 1 };
            res.render('envoy/filter', context);
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
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tks: tasks, noty: noty, contacts: contacts.slice(0, 4) };
            res.render('envoy/notifications', context);
            // res.send('respond with a resource.');
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

// Method to handle change of tab prefrence
module.exports.changePreference = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.pref;

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ENV")) {
            let update = await DB.updateUserPrefrence(ID, user[0].id);
            var msg = user[0].fname + " Preference Changed Successfully";
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
