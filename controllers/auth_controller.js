const User = require('./db_controller');
const bcrypt = require('bcrypt');
const moment = require('moment');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const validator = require('./validator');
const mail = require('./mail');
var saltRounds = 10;

//Function To Render Login Page
module.exports.loginPage = async (req, res, next) => {
    var settings = await User.getSiteSettings();
    var context = { setts: settings[0] };
    res.render('auth/login', context);
};


//Function To Render Register Page
module.exports.registerPage = async (req, res, next) => {
    var settings = await User.getSiteSettings();
    var context = { setts: settings[0] };
    res.render('auth/register', context);

};

//Function To Render Register Page
module.exports.activationPage = async (req, res, next) => {
    var settings = await User.getSiteSettings();
    var context = { setts: settings[0] };
    res.render('auth/activate', context);
};

// Function to Register In Active user account
module.exports.registerUser = async (req, res, next) => {
    let data;
    if (Object.entries(req.body).length !== 0) {
        data = req.body;
    } else {
        data = req.query;
    }

    let { category, fname, lname, gender, email, phone } = req.body;
    var user = await User.getUserByEmail(email);
    let [raby, state, message] = await validator.validUser(req);
    console.log(raby);

    if (user.length > 0) {
        res.json({ error: 'Invalid Credentials! Email exist in database Please try again.', });
    } else if (state == false) {
        res.json({ error: message.message, });
    } else {
        const passy = Math.random().toString(36).substring(2, 10);
        if (category == "Envoy") {
            bcrypt.hash(passy, saltRounds, (err, hash) => {
                User.insertEnvoyProfile(message.user_id, fname, lname, '', '', gender, '', '', email, phone, message.user_type, req.body.category, "", "", "0", hash, "1");
            });
        } else {
            bcrypt.hash(passy, saltRounds, (err, hash) => {
                User.insertSponsorProfile(message.user_id, fname, lname, '', '', gender, '', '', email, phone, message.user_type, req.body.category, "", "", "0", hash, "1");
            });
        }

        let data = message.user_id;
        let buff = Buffer.from(data);
        let base64data = buff.toString('base64');

        let body = `<div><p>You have signed up for ` + category + ` account on Kids2School.<br><br>
                    To <span class="il">activate</span> your account follow this link: 
                    <a href="https://`+ req.headers.host + `/register/activate/` + base64data + `/" target="_blank"> Click Here </a>
                    <br>
                    and set a Password for your account <a href="mailto:` + email + `" target="_blank">` + email + `</a>
                    <br>
                    <br>
                    Thank You and Kind regards!
                    <br>
                    From Kids2School Team</p></div>`;
        var options = {
            from: 'info@kids2school.org',
            to: email,
            subject: "Activate your " + category + " Acount on Kids2School",
            text: 'Please confirm your email',
            html: body
        };
        mail.sendMail(options);

        res.json({ success: 'Account Created Successfully' });
    }

}

module.exports.activateUser = async (req, res, next) => {
    var user_id = Buffer.from(req.params.id, 'base64')
    user_id = user_id.toString('ascii');
    console.log(user_id);
    var url = "https://" + req.headers.host + "/login";
    let { password } = req.body;
    console.log(password);

    var user = await User.getUserByUserId(user_id);

    if (user.length > 0 && user[0].is_active == '0') {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            User.activateUser(user_id, hash);
        });
        let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
        await User.updateLastLogin(user[0].id, datetime);
        if (user[0].user_type == 'ADMS' || user[0].user_type == 'ADM') {
            url = '/admin/profile';
        } else if (user[0].user_type == 'SPN') {
            url = '/sponsor/profile';
        } else if (user[0].user_type == 'ENV') {
            url = '/envoy/profile';
        }
        req.session.loggedin = true;
        req.session.username = user[0].email;
        res.json({ success: 'Account Activation successful', url: url });
    } else {
        res.json({ error: 'Invalid Credentials! Please try again.', url: url });
    }


}

//Function to Handle Login Post
module.exports.logIn = async (req, res, next) => {
    io.on("connection", function (socket) {
        console.log("User connected", socket.id);
    });
    let { email, password } = req.body
    var user = await User.getUserByEmail(email);
    var url = "/login";

    if (user.length > 0 && user[0].is_active == '1') {
        bcrypt.compare(password, user[0].password, async (err, reslt) => {
            if (err) return done(err);
            if (reslt == true) {
                let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                await User.updateLastLogin(user[0].id, datetime);
                if (user[0].user_type == 'ADMS' || user[0].user_type == 'ADM') {
                    url = '/admin';
                } else if (user[0].user_type == 'SPN') {
                    url = '/sponsor';
                } else if (user[0].user_type == 'ENV') {
                    url = '/envoy';
                }
                req.session.loggedin = true;
                req.session.username = email;
                res.json({ success: 'Login Details Correct', url: url });
            } else {
                res.json({ error: 'Invalid Credentials! Please try again.', url: url });
            }
        });


    } else {
        res.json({ error: 'Invalid Credentials! Please try again.', url: url });
    }

}

//Function to Handle Log Out
module.exports.logOut = (req, res, next) => {
    req.session.loggedin = false;
    req.session.username = "";
    res.redirect("/login");
}