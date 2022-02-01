var nodemailer = require('nodemailer');

// Create a SMTP transport object
var transport = nodemailer.createTransport({
    debug: true,
    pool : true,
    host: "mail.kids2school.org",
    port: 587,
    secure: false,
    auth: {
        // user: "info@kids2school.org", //generated by Mailtrap
        // pass: "FrwgHuQ!Pr%u" //generated by Mailtrap
        user: "hr@kids2school.org",
        pass: "?p4Htnnw3Dlh"
    },
    tls: {
        rejectUnauthorized: false
    }


});



module.exports.testMail = async () => {
    transport.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });
};


module.exports.sendMail = async (msg) => {
    console.log(msg);
    var message = msg;

    console.log('Sending Mail');
    transport.sendMail(message, function (error) {
        if (error) {
            console.log('Error occured');
            console.log(error);
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');

        // if you don't want to use this transport object anymore, uncomment    
        transport.close(); // close the connection pool
    });
}


