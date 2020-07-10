const router = require('express').Router();
const ItemModel = require('../models/itemmodel');

const authenticateAdmin = (req,res,next)=>{
    if (!req.session.data){
        res.redirect('/adminloginpage');
    }else{
        next();
    }
}

router.get('/', authenticateAdmin, (req,res)=>{
    res.render('delete');
});

router.post('/', (req,res)=>{
    ItemModel.findByIdAndDelete(req.body.id, (err,result)=>{
        if (err){
            res.send('<h1>Oops! Something went wrong</h1><a href="/adminloginpage/welcomeadmin/delete">Try Again</a>')
        } else {
            res.send('<h1 style="color:red;">Successfully Deleted</h1>')
        }
    })
});

module.exports = router;