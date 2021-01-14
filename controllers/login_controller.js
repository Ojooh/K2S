const User      = require('./db_controller');
const bcrypt    = require('bcrypt');


//Function To Render Login Page
module.exports.loginPage = (req, res, next) => {
    res.render('login/login');
};

//Function to Handle Login Post
module.exports.logIn = async (req, res, next) => {
    let { email, password }     = req.body
    var user    = await User.getUserByEmail(email);
    var url     = "/login";

    if (user.length > 0 && user[0].is_active == '1'){
        bcrypt.compare(password, user[0].password, (err, reslt) => {
            if (err) return done(err);
            if (reslt == true) {
                if (user[0].user_type  == "ADMS" || user[0].user_type  == "ADM"){
                    url = "/admin";
                } else if (user[0].user_type == "SPN" ){
                    url = "/sponsor"
                }
                req.session.loggedin = true;
                req.session.username = email;
                res.json({success: 'Login Details Correct', url : url});
            } else {
                res.json({error: 'Invalid Credentials! Please try again.', url : url});
            }
        });


    } else {
        res.json({error: 'Invalid Credentials! Please try again.', url : url});
    }

}