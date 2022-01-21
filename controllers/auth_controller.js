const User = require('./db_controller');
const bcrypt = require('bcrypt');
const moment = require('moment');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Function To Render Login Page
module.exports.loginPage = (req, res, next) => {

    res.render('auth/login');
};


//Function To Render Register Page
module.exports.registerPage = (req, res, next) => {
    res.render('auth/register');
};

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