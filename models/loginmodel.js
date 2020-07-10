const mongoose = require('mongoose');
const adminlogins = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const AdminLogin = mongoose.model('adminlogins', adminlogins);
module.exports = AdminLogin;
