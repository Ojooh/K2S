const DB = require('./db_controller');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const path = require('path');
const axios = require('axios')
var helper = require("./helper");
const https = require('https');
const { parse } = require('path');
const publik_Key = '';
const secret_key = 'sk_test_c7b91dc0708b793851c1239d211bf04a89d01da6';




//Function To Render Dashboard
module.exports.getDash = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-th-large";
        var title = "Dashboard";
        var limit = 10

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "SPN")) {
            var noty = await DB.getNotys(user[0].user_id);
            var wallet = await DB.getSPNWallet(user[0].user_id);
            var activities = await DB.getSPNActivities(user[0].user_id, limit);
            var cards = await DB.getSPNCards(user[0].user_id);
            var contacts = await DB.getContacts(user[0].user_id);
            var Kids = await DB.getCountSponsorKids(user[0].user_id);
            var Kids_d = await DB.getCountSponsorDonations(user[0].user_id);
            var count = { kids: Kids[0].total, kids_d: Kids_d[0].total }
            var sidebar = { dash: "active", usr: "", adm: "", kds: "", sps: "", env: "", ntf: "" };
            console.log(wallet);
            var context = { title: title, icon: icon, user: user[0], active: sidebar, count, count, noty: noty, cards: cards, wllt: wallet, acts: activities, contacts: contacts };
            res.render('sponsor/dashboard', context);
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

//Function to render Profile Page
module.exports.getMyProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "far fa-user";
        var title = "Profile";

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "SPN")) {
            title = user[0].fname + " " + title;
            var noty = await DB.getNotys(user[0].user_id);
            var sidebar = { dash: "", usr: "active", adm: "", kds: "", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, noty: noty };
            res.render('sponsor/Profile', context);
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

//Function To Render Kids
module.exports.getKids = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "Kids";
        var count = 0;
        var start = 1;
        var section = 12;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "SPN")) {
            var kidsy = await DB.getKidsSPN();
            var [kids, cur_t] = helper.paginateArray(kidsy, count);
            var noty = await DB.getNotys(user[0].user_id);
            var wallet = await DB.getSPNWallet(user[0].user_id);
            var cards = await DB.getSPNCards(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, wllt: wallet, cards: cards, tab: tab, kds: kids, noty: noty, points: cur_t, curry: count, total: kidsy.length, start: start, section: section };
            res.render('sponsor/kids', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
    } else {
        var url = "/login";
        res.redirect(url);
    }


};

//Function To Render Kids
module.exports.getMyKids = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "My Kids";
        var count = 0;
        var start = 1;
        var section = 12;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "SPN")) {
            var kidsy = await DB.getSPNKids(user[0].user_id);
            var [kids, cur_t] = helper.paginateArray(kidsy, count);
            var noty = await DB.getNotys(user[0].user_id);
            var wallet = await DB.getSPNWallet(user[0].user_id);
            var cards = await DB.getSPNCards(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, wllt: wallet, cards: cards, tab: tab, kds: kids, noty: noty, points: cur_t, curry: count, total: kidsy.length, start: start, section: section };
            res.render('sponsor/mykids', context);
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


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "SPN")) {
            var kidsy = await DB.getKidsSPN();
            var [kids, cur_t] = helper.paginateArray(kidsy, count);
            var noty = await DB.getNotys(user[0].user_id);
            var wallet = await DB.getSPNWallet(user[0].user_id);
            var cards = await DB.getSPNCards(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, wllt: wallet, cards: cards, tab: tab, start: start, kds: kids, noty: noty, points: cur_t, curry: count, total: kidsy.length, section: (start + kids.length) - 1 };
            res.render('sponsor/kids', context);
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
module.exports.getMyPage = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "My Kids";
        var count = req.params.id;
        var start = (12 * count) + 1;
        // var section = 12 * (count + 1)


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "SPN")) {
            var kidsy = await DB.getSPNKids(user[0].user_id);
            var [kids, cur_t] = helper.paginateArray(kidsy, count);
            var noty = await DB.getNotys(user[0].user_id);
            var wallet = await DB.getSPNWallet(user[0].user_id);
            var cards = await DB.getSPNCards(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, wllt: wallet, cards: cards, tab: tab, start: start, kds: kids, noty: noty, points: cur_t, curry: count, total: kidsy.length, section: (start + kids.length) - 1 };
            res.render('sponsor/mykids', context);
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

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "SPN")) {
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

//Method to handle filtering of data
module.exports.filterKids = async (req, res, next) => {
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


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "SPN")) {
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
                result = await DB.sponsorFilterKidsBy(k, v, order)

            } else if (stat == 1 && dob == 0) {
                filtys.date_joined = "fas fa-check";
                result = await DB.sponsorFilterKidsByDate(order);
            } else {
                filtys.dob = "fas fa-check";
                result = await DB.sponsorFilterKidsByDOB(parseInt(filter), order)
            }

            var [kids, cur_t] = helper.paginateArray(result, count);
            var noty = await DB.getNotys(user[0].user_id);;
            var wallet = await DB.getSPNWallet(user[0].user_id);
            var cards = await DB.getSPNCards(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var turl = req.originalUrl.split("page")[0];
            console.log(turl)
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, wllt: wallet, cards: cards, tab: tab, dor: roder, filt: filtys, turl: turl, start: start, kds: kids, noty: noty, points: cur_t, curry: count, total: result.length, section: (start + kids.length) - 1 };
            res.render('sponsor/filter', context);
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
        var title = "My Kids";
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


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "SPN")) {
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
                result = await DB.sponsorFilterMyKidsBy(k, v, order, user[0].user_id)

            } else if (stat == 1 && dob == 0) {
                filtys.date_joined = "fas fa-check";
                result = await DB.sponsorFilterMyKidsByDate(order, user[0].user_id);
            } else {
                filtys.dob = "fas fa-check";
                result = await DB.sponsorFilterMyKidsByDOB(parseInt(filter), order, user[0].user_id)
            }

            var [kids, cur_t] = helper.paginateArray(result, count);
            var noty = await DB.getNotys(user[0].user_id);
            var wallet = await DB.getSPNWallet(user[0].user_id);
            var cards = await DB.getSPNCards(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var turl = req.originalUrl.split("page")[0];
            console.log(turl)
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, wllt: wallet, cards: cards, tab: tab, dor: roder, filt: filtys, turl: turl, start: start, kds: kids, noty: noty, points: cur_t, curry: count, total: result.length, section: (start + kids.length) - 1 };
            res.render('sponsor/myfilter', context);
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
module.exports.searchKids = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var icon = "fas fa-child";
        var title = "Kids";
        var count = req.params.id;
        var [mesc, kwy] = req.params.kwy.split("-");
        var start = (12 * count) + 1;
        var result;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "SPN")) {
            if (mesc == "kids") {
                result = await DB.getSPNSearch(kwy);
            }
            var turl = req.originalUrl.split("page")[0];
            console.log(turl)

            var [kids, cur_t] = helper.paginateArray(result, count);
            var noty = await DB.getNotys(user[0].user_id);
            var wallet = await DB.getSPNWallet(user[0].user_id);
            var cards = await DB.getSPNCards(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, wllt: wallet, cards: cards, tab: tab, start: start, turl: turl, kds: kids, noty: noty, points: cur_t, curry: count, total: result.length, section: (start + kids.length) - 1 };
            res.render('sponsor/filter', context);
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
        var title = "My Kids";
        var count = req.params.id;
        var [mesc, kwy] = req.params.kwy.split("-");
        var start = (12 * count) + 1;
        var result;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "SPN")) {
            if (mesc == "kids") {
                result = await DB.getSPNMySearch(kwy, user[0].user_id);
            }
            var turl = req.originalUrl.split("page")[0];
            console.log(turl)

            var [kids, cur_t] = helper.paginateArray(result, count);
            var noty = await DB.getNotys(user[0].user_id);
            var wallet = await DB.getSPNWallet(user[0].user_id);
            var cards = await DB.getSPNCards(user[0].user_id);
            var tab = JSON.parse(user[0].preference);
            var sidebar = { dash: "", usr: "", adm: "", kds: "active", sps: "", env: "", ntf: "" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, wllt: wallet, cards: cards, tab: tab, start: start, kds: kids, noty: noty, turl: turl, points: cur_t, curry: count, total: result.length, section: (start + kids.length) - 1 };
            res.render('sponsor/myfilter', context);
        } else {
            var url = "/login";
            res.redirect(url);
        }
    } else {
        var url = "/login";
        res.redirect(url);
    }


};

//Function To get Kid Data
module.exports.getProfile = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var mode = req.body.mode;

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "SPN")) {
            let edittee = await DB.getKidById(ID);

            res.json({ success: edittee[0], type: mode });

        } else {
            var url = "/login"
            res.json({ url: url });
        }
    } else {
        var url = "/login"
        res.json({ url: url });
    }


};

// Function to get verification
module.exports.getVerification = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ref = req.params.ref;
        var wallety = req.params.wllt;
        var donatey = req.params.val;
        console.log(donatey);
        let output;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "SPN")) {
            var url = "https://api.paystack.co/transaction/verify/" + ref;
            await axios.get(url, {
                headers: {
                    "Authorization": "Bearer " + secret_key,
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                },
            }).then((success) => {
                output = success.data;
            }).catch((error) => {
                output = error;
            });

            console.log(output.data);

            if (output.status) {
                var wallet = await DB.getSPNWallet(user[0].user_id);
                var crds = await DB.getSPNCards(user[0].user_id);
                if (wallet.length > 0 && wallet[0] !== undefined) {
                    var quick = parseFloat(wallet[0].quick);
                    var donate = parseFloat(wallet[0].donate);
                    var amount = parseFloat(wallet[0].amount);
                    var set = "exist";
                } else {
                    var quick = 0;
                    var donate = 0;
                    var amount = 0;
                    var set = "new";
                }
                var msg = output.message;
                var auth = output.data.authorization.authorization_code;

                if (wallety == "wallet") {
                    var amount = (parseFloat(output.data.amount) / 100) + amount;
                    quick = (parseFloat(output.data.amount) / 100) + quick;
                } else {
                    var amount = amount;
                    donate = (parseFloat(output.data.amount) / 100) + donate;
                }

                var bank = output.data.authorization.bank;
                var last4 = output.data.authorization.last4;
                var c_type = output.data.authorization.card_type
                var newCrd = helper.newCard(crds, last4);



                if (newCrd) {
                    await DB.addCard(auth, last4, bank, c_type, user[0].user_id);
                }

                if (donatey !== undefined) {
                    var kid = await DB.getKidById(req.params.kd);
                    var title = req.params.ttl;
                    var expenses = JSON.parse(kid[0].expenses).expenses;


                    if (expenses.length > 0) {
                        for (var h = 0; h < expenses.length; h++) {
                            console.log(title)
                            if (expenses[h].ename == title) {
                                if ((parseFloat(expenses[h].evalue) > (parseFloat(output.data.amount) / 100))) {
                                    expenses[h].evalue = (parseFloat(expenses[h].evalue) - (parseFloat(output.data.amount) / 100)).toString()
                                    console.log(expenses[h].evalue)
                                }
                                else {
                                    expenses[h].evalue = "0";
                                }
                                break;
                            }
                        }
                    }

                    var texpy = JSON.stringify({ "expenses": expenses });

                    if (kid[0].remaining == 0) {
                        var set = parseFloat(kid[0].school_fees);
                        var remaining = parseFloat(kid[0].school_fees) - (parseFloat(output.data.amount) / 100);
                    } else {
                        var remaining = parseFloat(kid[0].remaining) - (parseFloat(output.data.amount) / 100);
                        var set = parseFloat(kid[0].remaining);
                    }
                    var percentage = ((parseFloat(output.data.amount) / 100) * 100) / set;


                    await DB.addDonation(ref, user[0].user_id, kid[0].kid_id, parseInt(output.data.amount) / 100, title, output.data.channel, '1');
                    await DB.addPerecntage(kid[0].kid_id, percentage, remaining, texpy)

                    if (remaining <= 0) {
                        await DB.updateKidStatus(kid[0].id, '0');
                    }
                } else {
                    if (set == "new") {
                        var name = user[0].fname + " " + user[0].lname;
                        await DB.insertEwalletQ(amount, quick, donate, user[0].user_id, name);
                    } else {
                        await DB.updateEwalletQ(amount, quick, donate, user[0].user_id);
                    }

                }
                res.json({ success: msg });

            } else {
                var msg = output.message;
                res.json({ error: msg });
            }

        } else {
            var url = "/login";
            res.redirect(url);
        }
    } else {
        var url = "/login";
        res.redirect(url);
    }
};

// Function to charge user old card
module.exports.chargeCard = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        let output;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "SPN")) {
            var card_no = req.body.card_no;
            var card_det = await DB.getSPNCardByNo(card_no, user[0].user_id)
            var wallety = req.body.wllt;
            var amount = req.body.amount;
            var donatey = req.body.val;
            var url = "https://api.paystack.co/transaction/charge_authorization";
            var data = {
                "authorization_code": card_det[0].auth_code,
                "email": user[0].email,
                "amount": amount
            };
            console.log(data);

            const params = JSON.stringify({
                "authorization_code": card_det[0].auth_code,
                "email": user[0].email,
                "amount": amount
            });

            const options = {
                hostname: 'api.paystack.co',
                port: 443,
                path: '/transaction/charge_authorization',
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + secret_key,
                    'Content-Type': 'application/json'
                }
            };

            const reqy = https.request(options, resy => {
                let data = ''
                resy.on('data', (chunk) => {
                    data += chunk
                });
                resy.on('end', async () => {
                    output = JSON.parse(data);
                    if (output.status) {
                        var wallet = await DB.getSPNWallet(user[0].user_id);
                        var crds = await DB.getSPNCards(user[0].user_id);
                        if (wallet.length > 0 && wallet[0] !== undefined) {
                            var quick = parseFloat(wallet[0].quick);
                            var donate = parseFloat(wallet[0].donate);
                            var amount = parseFloat(wallet[0].amount);
                            var set = "exist";
                        } else {
                            var quick = 0;
                            var donate = 0;
                            var amount = 0;
                            var set = "new";
                        }

                        var msg = output.message + " Sucessfully";
                        var auth = output.data.authorization.authorization_code;

                        if (wallety == "wallet") {
                            var amount = (parseFloat(output.data.amount) / 100) + amount;
                            quick = (parseFloat(output.data.amount) / 100) + quick;
                        } else {
                            var amount = amount;
                            donate = (parseFloat(output.data.amount) / 100) + donate;
                        }

                        var bank = output.data.authorization.bank;
                        var last4 = output.data.authorization.last4;
                        var c_type = output.data.authorization.card_type
                        var newCrd = helper.newCard(crds, last4);



                        if (newCrd) {
                            await DB.addCard(auth, last4, bank, c_type, user[0].user_id);
                        }

                        if (donatey !== undefined) {
                            console.log(req.body.kidID);
                            var kid = await DB.getKidById(req.body.kidID);
                            var title = req.body.title;
                            var ref = req.body.ref;
                            var expensez = JSON.parse(kid[0].expenses).expenses;


                            if (expensez.length > 0) {
                                for (var h = 0; h < expensez.length; h++) {
                                    if (expensez[h].ename == title) {
                                        if ((parseFloat(expensez[h].evalue) > (parseFloat(output.data.amount) / 100))) {
                                            expensez[h].evalue = (parseFloat(expensez[h].evalue) - (parseFloat(output.data.amount) / 100)).toString()
                                            console.log(expensez[h].evalue)
                                        }
                                        else {
                                            expensez[h].evalue = "0";
                                        }
                                        break;
                                    }
                                }
                            }

                            var texpy = JSON.stringify({ "expenses": expensez });

                            if (kid[0].remaining == 0) {
                                var set = parseFloat(kid[0].school_fees);
                                var remaining = parseFloat(kid[0].school_fees) - (parseFloat(output.data.amount) / 100);
                            } else {
                                var remaining = parseFloat(kid[0].remaining) - (parseFloat(output.data.amount) / 100);
                                var set = parseFloat(kid[0].remaining);
                            }
                            var percentage = ((parseFloat(output.data.amount) / 100) * 100) / set;
                            await DB.addDonation(ref, user[0].user_id, kid[0].kid_id, parseInt(output.data.amount) / 100, title, output.data.channel, '1');
                            await DB.addPerecntage(kid[0].kid_id, percentage, remaining, texpy)

                            if (remaining <= 0) {
                                await DB.updateKidStatus(kid[0].id, '0');
                            }

                            msg = "Donation Transaction Successful";
                        } else {
                            if (set == "new") {
                                var name = user[0].fname + " " + user[0].lname;
                                await DB.insertEwalletQ(amount, quick, donate, user[0].user_id, name);
                            } else {
                                await DB.updateEwalletQ(amount, quick, donate, user[0].user_id);
                            }
                        }
                        res.json({ success: msg });

                    } else {
                        var msg = output.message;
                        res.json({ error: msg });
                    }
                })
            }).on('error', error => {
                console.error(error)
            })
            reqy.write(params)
            reqy.end()

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

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "SPN")) {
            var tasks = await DB.getEnvoyTasks(user[0].user_id);
            var noty = await DB.getNotys(user[0].user_id);
            var contacts = await DB.getContacts(user[0].user_id);

            var sidebar = { dash: "", usr: "", adm: "", kds: "", sps: "", env: "", ntf: "active" };
            var context = { title: title, icon: icon, user: user[0], active: sidebar, tks: tasks, noty: noty, contacts: contacts.slice(0, 4) };
            res.render('sponsor/notifications', context);
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

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "SPN")) {
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

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "SPN")) {
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

//Function to get all Users
module.exports.getChatUsers = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM" || user[0].user_type == "SPN")) {
            let result = await DB.getUserByType("ADM");
            res.json({ success: result });
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

//Function to adopt kid
module.exports.adoptKid = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        var ID = req.body.id;
        var edyyy = await DB.getKidById(ID);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "SPN")) {
            await DB.adoptKid(ID, user[0].user_id);
            await DB.updateSponsorKids(user[0].kids + 1, user[0].user_id)

            res.json({ success: 'You Have Succesfully Adopted ' + edyyy[0].fname })


        } else {
            var url = "/login";
            res.json({ url: url });
        }
    } else {
        var url = "/login";
        res.json({ url: url });
    }
};

// Function to charge user wallet
module.exports.chargeWallet = async (req, res, next) => {
    if (req.session.loggedin) {
        var email = req.session.username;
        var user = await DB.getUserByEmail(email);
        let msg;


        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "SPN")) {
            var wallet = await DB.getSPNWallet(user[0].user_id);
            var wallety = req.body.wllt;
            var amount = parseFloat(req.body.amount) / 100;
            var donatey = req.body.val;
            var ref = req.body.ref;
            var kid = await DB.getKidById(req.body.kidID);
            var title = req.body.title;
            var expenses = JSON.parse(kid[0].expenses).expenses;

            if (expenses.length > 0) {

                for (var h = 0; h < expenses.length; h++) {
                    if (expenses[h].ename.trim() == title.trim()) {

                        if ((parseFloat(expenses[h].evalue) > amount)) {
                            expenses[h].evalue = (parseFloat(expenses[h].evalue) - amount).toString()
                            console.log(expenses[h].evalue)
                        }
                        else {
                            expenses[h].evalue = "0";
                        }
                        break;
                    }

                }
            }

            var texpy = JSON.stringify({ "expenses": expenses });


            if ((wallet.length > 0 && wallet[0].is_active == '1') && (user[0].user_id == wallet[0].owner)) {
                var avail = parseFloat(wallet[0].amount);

                if ((avail - 1000) > (amount)) {
                    var quicky = ((parseFloat(wallet[0].quick) > amount) ? parseFloat(wallet[0].quick) : parseFloat(wallet[0].auto));
                    var key = ((parseFloat(wallet[0].quick) > amount) ? "quick" : "auto");
                    var newBlanace = avail - amount;
                    var quick = quicky - amount;

                    if (kid[0].remaining == 0) {
                        var set = parseFloat(kid[0].school_fees);
                        var remaining = parseFloat(kid[0].school_fees) - (amount);
                    } else {
                        var remaining = parseFloat(kid[0].remaining) - (amount);
                        var set = parseFloat(kid[0].remaining);
                    }
                    var percentage = ((amount) * 100) / set;
                    await DB.addDonation(ref, user[0].user_id, kid[0].kid_id, amount, title, wallety, '1');
                    await DB.addPerecntage(kid[0].kid_id, percentage, remaining, texpy);

                    if (remaining <= 0) {
                        await DB.updateKidStatus(kid[0].id, '0');
                    }

                    await DB.updateEwalletG(newBlanace, key, quick, user[0].user_id);
                    msg = "Donation Transaction Successful";
                    res.json({ success: msg });


                } else {
                    msg = "Insufficient Funds, Wallet Balance not enough to Perform Transaction";
                    res.json({ error: msg });
                }

            } else {
                msg = "Your wallet is In-Active, cannot Perform Transaction";
                res.json({ error: msg });
            }

        } else {
            var url = "/login";
            res.redirect(url);
        }
    } else {
        var url = "/login";
        res.redirect(url);
    }
};