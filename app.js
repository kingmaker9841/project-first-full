const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const mongoose= require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended:false}));

//Session for Admin Login
app.use(cookieParser());
app.use(session({
    secret : process.env.secret,
    resave: false,
    saveUninitialized : true,
    cookie : {
         maxAge : 1000*60*10
        }
}))

//MONGODB ATLAS connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} ,(err)=>{
    if (err){
        console.error(err);
    } else{
        console.log("MongoDB connected")
    }
});

//View Engine EJS
app.set('view engine', 'ejs');

//Static Pages
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

//Routing Middleware
app.use('/', require('./route/homepage'));
app.use('/adminloginpage', require('./route/adminlogin'));
app.use('/secondpage', require('./route/secondpage'));

app.listen(process.env.PORT || 3500, ()=>{
    console.log("Server Started...");
})