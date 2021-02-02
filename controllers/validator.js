const User              = require('./db_controller');
var helper              = require("./helper");


module.exports.validAdministrator = async (req, type) => {
    var exist =  await helper.emailExist(req.body.email);

    if (helper.isEmpty(req.body.fname) || !helper.validateName(req.body.fname)){
        return [null, false, { message: 'First Name Input is not Valid' }]; 
    } else if (helper.isEmpty(req.body.fname) || !helper.validateName(req.body.fname)){
        return [null, false, { message: 'Last Name Input is not Valid' }]; 
    } else if (helper.isEmpty(req.body.gender)){
        return [null, false, { message: 'Gender Input is not Valid' }]; 
    } else if (helper.isEmpty(req.body.country)){
        return [null, false, { message: 'Country Input is not Valid' }]; 
    } else if (helper.isEmpty(req.body.state)){
        return [null, false, { message: 'state Input is not Valid' }]; 
    } else if (helper.isEmpty(req.body.dob) || helper.validateAge(req.body.dob)){
        return [null, false, { message: 'Date of Birth Input is not Valid' }]; 
    } else if (helper.isEmpty(req.body.title)){
        return [null, false, { message: 'Title Input is not Valid' }]; 
    } else if (helper.isEmpty(req.body.email) || !helper.validateEmail(req.body.email)){
        return [null, false, { message: 'Email Input is not Valid' }]; 
    } else if (type == "add" && exist){   
        return [null, false, { message: 'Email Input already Exist In Database' }]; 
    }else if (helper.isEmpty(req.body.telephone) || helper.validateTel(req.body.telephone) == false){
        return [null, false, { message: 'Telephone Input is not Valid' }]; 
    } else if ((type == "add") && (helper.isEmpty(req.body.password) || !helper.validatePass(req.body.password))){
        return [null, false, { message: 'Password Input is not Valid' }]; 
    }else if (req.files && helper.isImage(req.files.pp) == false){
        return [null, false, { message: 'File Sent is not an Image' }]; 
    } else {
        var user_id = await helper.generateUserId(req.body.title, 5)
        return [null, true, {message: 'New Administrator Sucesfully Created', user_id : user_id, user_type : helper.generateUserType(req.body.title)}];
    }
}

