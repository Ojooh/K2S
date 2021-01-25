const mysql = require('mysql');

const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'kts'
});
				
con.connect(function(err){
	if(err) throw err;
});

//GET user by ID field			
module.exports.getUserById = (id) => {
    const query = "SELECT * FROM users WHERE id = '" + id + "';";
    return new Promise( ( resolve, reject ) => {
        con.query(query, (err, result) => {
            if (err){
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
    return new Promise( ( resolve, reject ) => {
        con.query(query, (err, result) => {
            if (err){
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
    return new Promise( ( resolve, reject ) => {
        con.query(query, (err, result) => {
            if (err){
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
    
    return new Promise( ( resolve, reject ) => {
        con.query(query, (err, result) => {
            if (err){
                return reject(err);
            } else {
                resolve(result);
            } 

        });
    });
}