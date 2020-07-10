const router = require('express').Router();
const ItemModel = require('../models/itemmodel');

router.get('/', (req, res)=>{
    ItemModel.find({}, (err,user)=>{
        if (err) throw err;
        res.render('homepage', {user : user});
    });
});

module.exports = router;