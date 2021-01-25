const User      = require('./db_controller');


//Function To Render Dashboard
module.exports.getDash = async (req, res, next) => {
    if (req.session.loggedin) {
        var email       = req.session.username;
        var user        = await User.getUserByEmail(email);

        if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")){
            var sidebar     = {dash : "active", kds : "", sps : "", ntf : ""};
            var context     = {title : "Dashboard", user : user[0], active : sidebar};
             res.render('admin/Dashboard', context);
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};