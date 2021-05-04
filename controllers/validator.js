const User = require('./db_controller');
var helper = require("./helper");


module.exports.validAdministrator = async (req, type) => {
    var exist = await helper.emailExist(req.body.email);

    if (helper.isEmpty(req.body.fname) || !helper.validateName(req.body.fname)) {
        return [null, false, { message: 'First Name Input is not Valid' }];
    } else if (helper.isEmpty(req.body.fname) || !helper.validateName(req.body.fname)) {
        return [null, false, { message: 'Last Name Input is not Valid' }];
    } else if (helper.isEmpty(req.body.gender)) {
        return [null, false, { message: 'Gender Input is not Valid' }];
    } else if (helper.isEmpty(req.body.country)) {
        return [null, false, { message: 'Country Input is not Valid' }];
    } else if (helper.isEmpty(req.body.state)) {
        return [null, false, { message: 'state Input is not Valid' }];
    } else if (helper.isEmpty(req.body.dob) || helper.validateAge(req.body.dob)) {
        return [null, false, { message: 'Date of Birth Input is not Valid' }];
    } else if (helper.isEmpty(req.body.title)) {
        return [null, false, { message: 'Title Input is not Valid' }];
    } else if (helper.isEmpty(req.body.email) || !helper.validateEmail(req.body.email)) {
        return [null, false, { message: 'Email Input is not Valid' }];
    } else if (type == "add" && exist) {
        return [null, false, { message: 'Email Input already Exist In Database' }];
    } else if (helper.isEmpty(req.body.telephone) || helper.validateTel(req.body.telephone) == false) {
        return [null, false, { message: 'Telephone Input is not Valid' }];
    } else if ((type == "add") && (helper.isEmpty(req.body.password) || !helper.validatePass(req.body.password))) {
        return [null, false, { message: 'Password Input is not Valid' }];
    } else if (req.files && helper.isImage(req.files.pp) == false) {
        return [null, false, { message: 'File Sent is not an Image' }];
    } else {
        var user_id = await helper.generateUserId(req.body.title, 5)
        return [null, true, { message: 'New Administrator Sucesfully Created', user_id: user_id, user_type: helper.generateUserType(req.body.title) }];
    }
}

//Function To Validate Sponsor Profile Entry
module.exports.validSponsor = async (req, type) => {
    var exist = await helper.emailExist(req.body.email);

    if (helper.isEmpty(req.body.fname) || !helper.validateName(req.body.fname)) {
        return [null, false, { message: 'First Name Input is not Valid' }];
    } else if (helper.isEmpty(req.body.fname) || !helper.validateName(req.body.fname)) {
        return [null, false, { message: 'Last Name Input is not Valid' }];
    } else if (helper.isEmpty(req.body.gender)) {
        return [null, false, { message: 'Gender Input is not Valid' }];
    } else if (helper.isEmpty(req.body.country)) {
        return [null, false, { message: 'Country Input is not Valid' }];
    } else if (helper.isEmpty(req.body.state)) {
        return [null, false, { message: 'state Input is not Valid' }];
    } else if (helper.isEmpty(req.body.dob) || helper.validateAge(req.body.dob)) {
        return [null, false, { message: 'Date of Birth Input is not Valid' }];
    } else if (helper.isEmpty(req.body.title)) {
        return [null, false, { message: 'Title Input is not Valid' }];
    } else if (helper.isEmpty(req.body.prof) == false && helper.validateName(req.body.prof) == false) {
        return [null, false, { message: 'Proffession Input is not Valid' }];
    } else if (helper.isEmpty(req.body.email) || !helper.validateEmail(req.body.email)) {
        return [null, false, { message: 'Email Input is not Valid' }];
    } else if (type == "add" && exist) {
        return [null, false, { message: 'Email Input already Exist In Database' }];
    } else if (helper.isEmpty(req.body.telephone) || helper.validateTel(req.body.telephone) == false) {
        return [null, false, { message: 'Telephone Input is not Valid' }];
    } else if ((type == "add") && (helper.isEmpty(req.body.password) || !helper.validatePass(req.body.password))) {
        return [null, false, { message: 'Password Input is not Valid' }];
    } else if (req.files && helper.isImage(req.files.pp) == false) {
        return [null, false, { message: 'File Sent is not an Image' }];
    } else {
        var user_id = await helper.generateUserId(req.body.title, 5)
        return [null, true, { message: 'New Sponsor Sucesfully Created', user_id: user_id, user_type: helper.generateUserType(req.body.title) }];
    }
}

//Function To Validate Envoy Profile Entry
module.exports.validEnvoy = async (req, type) => {
    var exist = await helper.emailExist(req.body.email);

    if (helper.isEmpty(req.body.fname) || !helper.validateName(req.body.fname)) {
        return [null, false, { message: 'First Name Input is not Valid' }];
    } else if (helper.isEmpty(req.body.lname) || !helper.validateName(req.body.lname)) {
        return [null, false, { message: 'Last Name Input is not Valid' }];
    } else if (helper.isEmpty(req.body.gender)) {
        return [null, false, { message: 'Gender Input is not Valid' }];
    } else if (helper.isEmpty(req.body.country)) {
        return [null, false, { message: 'Country Input is not Valid' }];
    } else if (helper.isEmpty(req.body.state)) {
        return [null, false, { message: 'state Input is not Valid' }];
    } else if (helper.isEmpty(req.body.dob) || helper.validateAge(req.body.dob)) {
        return [null, false, { message: 'Date of Birth Input is not Valid' }];
    } else if (helper.isEmpty(req.body.title)) {
        return [null, false, { message: 'Title Input is not Valid' }];
    } else if (helper.isEmpty(req.body.prof) == false && helper.validateName(req.body.prof) == false) {
        return [null, false, { message: 'Proffession Input is not Valid' }];
    } else if (helper.isEmpty(req.body.email) || !helper.validateEmail(req.body.email)) {
        return [null, false, { message: 'Email Input is not Valid' }];
    } else if (type == "add" && exist) {
        return [null, false, { message: 'Email Input already Exist In Database' }];
    } else if (helper.isEmpty(req.body.telephone) || helper.validateTel(req.body.telephone) == false) {
        return [null, false, { message: 'Telephone Input is not Valid' }];
    } else if ((type == "add") && (helper.isEmpty(req.body.password) || !helper.validatePass(req.body.password))) {
        return [null, false, { message: 'Password Input is not Valid' }];
    } else if (req.files && helper.isImage(req.files.pp) == false) {
        return [null, false, { message: 'File Sent is not an Image' }];
    } else {
        var user_id = await helper.generateUserId(req.body.title, 5)
        return [null, true, { message: 'New Envoy Sucesfully Created', user_id: user_id, user_type: helper.generateUserType(req.body.title) }];
    }
}


//Function To Validate Kid Profile Entry
module.exports.validKid = async (req, type) => {
    var exist = await helper.kidIsEmailExist(req.body.email);

    if (helper.isEmpty(req.body.category)) {
        return [null, false, { message: 'Category Input is not Valid' }];
    } else if (helper.isEmpty(req.body.fname) || !helper.validateName(req.body.fname)) {
        return [null, false, { message: 'First Name Input is not Valid' }];
    } else if (helper.isEmpty(req.body.lname) || !helper.validateName(req.body.lname)) {
        return [null, false, { message: 'Last Name Input is not Valid' }];
    } else if (!helper.isEmpty(req.body.mname) && !helper.validateName(req.body.mname)) {
        return [null, false, { message: 'Middle Name Input is not Valid' }];
    } else if (helper.isEmpty(req.body.dob)) {
        return [null, false, { message: 'Date of Birth Input is not Valid' }];
    } else if (helper.isEmpty(req.body.gender)) {
        return [null, false, { message: 'Gender Input is not Valid' }];
    } else if (helper.isEmpty(req.body.country)) {
        return [null, false, { message: 'Country Input is not Valid' }];
    } else if (helper.isEmpty(req.body.state_o)) {
        return [null, false, { message: 'State of Origin Input is not Valid' }];
    } else if (helper.isEmpty(req.body.state_r)) {
        return [null, false, { message: 'State of Resident Input is not Valid' }];
    } else if (!helper.isEmpty(req.body.lga) && !helper.validateName(req.body.lga)) {
        return [null, false, { message: 'Middle Name Input is not Valid' }];
    } else if (!helper.isEmpty(req.body.email) && !helper.validateEmail(req.body.email)) {
        return [null, false, { message: 'Email Input is not Valid' }];
    } else if (type == "add" && !helper.isEmpty(req.body.email) && exist) {
        return [null, false, { message: 'Email Input already Exist In Database' }];
    } else if (!helper.isEmpty(req.body.tely.split("-")[1]) && helper.validateTel(req.body.tely) == false) {
        return [null, false, { message: 'Telephone Input is not Valid' }];
    } else if (!helper.isEmpty(req.body.sname) && helper.validateName(req.body.sname) == false) {
        return [null, false, { message: 'Invalid or No Value for School Name Field.' }];
    } else if (!helper.isEmpty(req.body.sname) && helper.isEmpty(req.body.los)) {
        return [null, false, { message: 'Invalid or No Value for Level Of Study Field.' }];
    } else if (!helper.isEmpty(req.body.sname) && helper.isEmpty(req.body.class)) {
        return [null, false, { message: 'Invalid or No Value for Class Field.' }];
    } else if (!helper.isEmpty(req.body.sname) && helper.isEmpty(req.body.saddress)) {
        return [null, false, { message: 'Invalid or No Value for School Address Field.' }];
    } else if (!helper.isEmpty(req.body.sname) && helper.isEmpty(req.body.sfees)) {
        return [null, false, { message: 'Invalid or No Value for School Fees.' }];
    } else if (!helper.isEmpty(req.body.sfees) && isNaN(req.body.sfees)) {
        return [null, false, { message: 'Invalid or No Value for School Fees' }];
    } else if (!helper.isEmpty(req.body.sother) && req.body.sother.split(" ").length > 501) {
        return [null, false, { message: 'Only 500 words Allowed for school detials.' }];
    } else if (helper.isEmpty(req.body.ptitle) || helper.validateName(req.body.ptitle) == false) {
        return [null, false, { message: 'Invalid or No Value for Parent Title Field.' }];
    } else if (helper.isEmpty(req.body.pname) || helper.validateName(req.body.pname) == false) {
        return [null, false, { message: 'Invalid or No Value for Parent Name Field.' }];
    } else if (helper.isEmpty(req.body.pemail) || helper.validateEmail(req.body.pemail) == false) {
        return [null, false, { message: 'Invalid or No Value for Parent Email Field.' }];
    } else if (helper.isEmpty(req.body.ptel) || helper.validateTel(req.body.ptel) == false) {
        return [null, false, { message: 'Invalid or No Value for Telephone Field.' }];
    } else if (!helper.isEmpty(req.body.story) && req.body.story.split(" ").length > 501) {
        return [null, false, { message: 'Only 500 words Allowed.' }];
    } else if (!helper.isEmpty(req.body.goal) && req.body.goal.split(" ").length > 501) {
        return [null, false, { message: 'Only 500 words Allowed.' }];
    } else if (req.files && req.files.bc && helper.isDoc(req.files.bc) == false) {
        return [null, false, { message: 'Only Image, pdf or docx files Allowed.' }];
    } else if (req.files && req.files.pp && helper.isImage(req.files.pp) == false) {
        return [null, false, { message: 'File Sent is not an Image' }];
    } else {
        var user_id = await helper.generateUserId(req.body.title, 5)
        return [null, true, { message: 'New Kid Sucesfully Created', user_id: user_id, user_type: helper.generateUserType(req.body.title) }];
    }
}

