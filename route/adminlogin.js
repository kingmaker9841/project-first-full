const router = require('express').Router();
const AdminLogin = require('../models/loginmodel');

router.get('/', (req, res)=>{
    res.render('login');
});

router.post('/', (req,res)=>{
    const {email, password} = req.body;
    AdminLogin.findOne({email: email, password: password}, (err,data)=>{
        if (err) {
            console.error(err);
            res.redirect('/adminloginpage');
        } else{
            console.log(data);
            req.session.data = data;
            res.redirect(`/adminloginpage/welcomeadmin?email=${email}&pw=${password}`);
        }
    });
    
});
const adminAuthenticate = (req,res,next)=>{
    if (!req.session.data){
        res.redirect('/adminloginpage');
    } else {
        const {email, pw} = req.query;
        AdminLogin.findOne({email:email, password: pw }, (err,data)=>{
            if (err){
                console.error(err);
                res.redirect('/adminloginpage');
            } else{
                next();
            }
        });
    }
}

router.get('/welcomeadmin', adminAuthenticate, (req,res)=>{
    res.render('welcomeadmin');
});

router.use('/welcomeadmin/create', require('./create'));
router.use('/welcomeadmin/delete', require('./delete'));
router.use('/welcomeadmin/update', require('./update'));



module.exports = router;