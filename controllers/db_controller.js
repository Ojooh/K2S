const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kts'
});

con.connect(function (err) {
    if (err) throw err;
});

//GET user by ID field			
module.exports.getUserById = (id) => {
    const query = "SELECT * FROM users WHERE id = '" + id + "';";
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
};

//GET kid by ID field			
module.exports.getKidById = (id) => {
    const query = "SELECT * FROM kids WHERE id = '" + id + "';";
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
};

//GET user by email field
module.exports.getUserByEmail = (email) => {
    const query = "SELECT * FROM users WHERE email = '" + email + "';";
    console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//GET kid by email field
module.exports.getKidByEmail = (email) => {
    const query = "SELECT * FROM kids WHERE email = '" + email + "';";
    console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//GET user by user_id field
module.exports.getUserByUserId = (user_id) => {
    const query = "SELECT * FROM users WHERE user_id = '" + user_id + "';";
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//GET user by kid_id field
module.exports.getUserByUserId = (user_id) => {
    const query = "SELECT * FROM kids WHERE kid_id = '" + user_id + "';";
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//GET NUMBER OF ADMIS
module.exports.getCountAdmins = () => {
    const query = "SELECT COUNT(*) AS total FROM users WHERE is_admin = 1;";
    console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//GET count for sponsors
module.exports.getCountSponsors = () => {
    const query = "SELECT COUNT(*) AS total FROM users WHERE is_sponsor = 1;";
    console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//GET count for envoys
module.exports.getCountEnvoys = () => {
    const query = "SELECT COUNT(*) AS total FROM users WHERE is_envoy = 1;";
    console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//GET count for kids
module.exports.getCountKids = () => {
    const query = "SELECT COUNT(*) AS total FROM kids WHERE is_kid = 1;";
    console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//UPDATE USER LAST LOGIN
module.exports.updateLastLogin = (id, last_login) => {
    const query = "UPDATE users SET last_login = '" + last_login + "'WHERE id = '" + id + "';";

    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//GET Admins
module.exports.getAdministrators = () => {
    const query = "SELECT * FROM users WHERE is_admin = 1;";
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
};

//GET Last Id
module.exports.getLastId = () => {
    const query = "SELECT * FROM users ORDER BY id DESC LIMIT 1;";
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
};

//GET kid last Id 
module.exports.getKidLastId = () => {
    const query = "SELECT * FROM kids ORDER BY id DESC LIMIT 1;";
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
};

//INSERT new Admin Profile
module.exports.insertAdminProfile = (user_id, fname, lname, dob, age, gender, country, state, email, telephone, user_type, title, profile_photo, is_active, password, is_admin) => {
    const query = "INSERT INTO users (`user_id`, `fname`, `lname`, `dob`, `age`, `gender`, `country`, `state`, `email`, `telephone`, `user_type`, `title`, `profile_photo`, `is_active`, `password`, `is_admin`) VALUES ('" + user_id + "', '" + fname + "', '" + lname + "', '" + dob + "', '" + age + "', '" + gender + "', '" + country + "', '" + state + "', '" + email + "', '" + telephone + "', '" + user_type + "', '" + title + "', '" + profile_photo + "', '" + is_active + "', '" + password + "', '" + is_admin + "');";
    //console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//UPDATE User Status
module.exports.updateUserStatus = (id, status) => {
    const query = "UPDATE users SET `is_active` = '" + status + "' WHERE id = '" + id + "';";
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//UPDATE Kid Status
module.exports.updateKidStatus = (id, status) => {
    const query = "UPDATE kids SET `is_active` = '" + status + "' WHERE id = '" + id + "';";
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//UPDATE Admin Profile
module.exports.updateAdminProfile = (id, fname, lname, dob, age, gender, country, state, email, telephone, user_type, title, profile_photo, password, editor, time) => {
    const query = "UPDATE users SET `fname` = '" + fname + "', `lname` = '" + lname + "', `dob` = '" + dob + "', `age` = '" + age + "',`gender` = '" + gender + "', `country` = '" + country + "', `state` = '" + state + "', `email` = '" + email + "', `telephone` = '" + telephone + "', `user_type` = '" + user_type + "', `title`  = '" + title + "', `profile_photo` =  '" + profile_photo + "', `password` = '" + password + "', `editted_by` = '" + editor + "', `last_editted` = '" + time + "' WHERE `id` = '" + id + "';";
    console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//DELETE User Profile
module.exports.deleteUserProfile = (id) => {
    const query = "DELETE FROM users WHERE id = '" + id + "';";
    console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//GET Sponsors
module.exports.getSponsors = () => {
    const query = "SELECT * FROM users WHERE is_sponsor = 1;";
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
};

//INSERT new Sponsor Profile
module.exports.insertSponsorProfile = (user_id, fname, lname, dob, age, gender, country, state, email, telephone, user_type, title, proffession, profile_photo, is_active, password, is_sponsor) => {
    const query = "INSERT INTO users (`user_id`, `fname`, `lname`, `dob`, `age`, `gender`, `country`, `state`, `email`, `telephone`, `user_type`, `title`, `proffession`, `profile_photo`, `is_active`, `password`, `is_sponsor`) VALUES ('" + user_id + "', '" + fname + "', '" + lname + "', '" + dob + "', '" + age + "', '" + gender + "', '" + country + "', '" + state + "', '" + email + "', '" + telephone + "', '" + user_type + "', '" + title + "', '" + proffession + "', '" + profile_photo + "', '" + is_active + "', '" + password + "', '" + is_sponsor + "');";
    //console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//UPDATE User Profile
module.exports.updateUserProfile = (id, fname, lname, dob, age, gender, country, state, email, telephone, user_type, title, proffession, profile_photo, password, editor, time) => {
    const query = "UPDATE users SET `fname` = '" + fname + "', `lname` = '" + lname + "', `dob` = '" + dob + "', `age` = '" + age + "',`gender` = '" + gender + "', `country` = '" + country + "', `state` = '" + state + "', `email` = '" + email + "', `telephone` = '" + telephone + "', `user_type` = '" + user_type + "', `title`  = '" + title + "', `proffession`  = '" + proffession + "', `profile_photo` =  '" + profile_photo + "', `password` = '" + password + "', `editted_by` = '" + editor + "', `last_editted` = '" + time + "' WHERE `id` = '" + id + "';";
    console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//GET Envoys
module.exports.getEnvoys = () => {
    const query = "SELECT * FROM users WHERE is_envoy = 1;";
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
};

//INSERT new Envoy Profile
module.exports.insertEnvoyProfile = (user_id, fname, lname, dob, age, gender, country, state, email, telephone, user_type, title, proffession, profile_photo, is_active, password, is_envoy) => {
    const query = "INSERT INTO users (`user_id`, `fname`, `lname`, `dob`, `age`, `gender`, `country`, `state`, `email`, `telephone`, `user_type`, `title`, `proffession`, `profile_photo`, `is_active`, `password`, `is_envoy`) VALUES ('" + user_id + "', '" + fname + "', '" + lname + "', '" + dob + "', '" + age + "', '" + gender + "', '" + country + "', '" + state + "', '" + email + "', '" + telephone + "', '" + user_type + "', '" + title + "', '" + proffession + "', '" + profile_photo + "', '" + is_active + "', '" + password + "', '" + is_envoy + "');";
    //console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}

//GET Kids
module.exports.getKids = () => {
    const query = "SELECT * FROM kids WHERE is_kid = 1;";
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
};

//INSERT new kid profile
module.exports.insertKidProfile = (uid, category, fname, lname, mname, dob, age, gender, country, s_o, s_r, lga, email, tely, sname, saddress, los, cl, sfees, sother, pname, ptitle, pemail, ptel, story, goal, bc, pp, author) => {
    const query = "INSERT INTO kids (`kid_id`,`category`, `fname`, `lname`, `mname`, `dob`, `age`, `gender`, `country`, `state_o`, `state_r`, `lga`, `email`, `telephone`, `address`, `school_name`, `los`, `class`, `school_address`, `other_school_details`, `school_fees`, `parent_title`, `parent_name`, `parent_email`, `parent_telephone`, `story`, `goal`, `bc`, `profile_photo`, `is_active`, `is_kid`, `created_by`) VALUES('" + uid + "', '" + category + "', '" + fname + "', '" + lname + "', '" + mname + "', '" + dob + "', '" + age + "', '" + gender + "', '" + country + "', '" + s_o + "', '" + s_r + "', '" + lga + "', '" + email + "', '" + tely + "', '', '" + sname + "', '" + los + "', '" + cl + "', '" + saddress + "', '" + sother + "', '" + sfees + "', '" + ptitle + "', '" + pname + "', '" + pemail + "', '" + ptel + "', '" + story + "', '" + goal + "', '" + bc + "', '" + pp + "', '1', '1','" + author + "'); ";
    console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
}


