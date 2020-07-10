const router = require('express').Router();
const ItemModel = require('../models/itemmodel');

router.get('/', (req,res)=>{
    const {id} = req.query;
    ItemModel.findOneAndUpdate({_id : id}, { $inc : { views : 1}}, (err,data)=>{
        if (err) throw err;
    });
    ItemModel.findById({ _id: id }, (err, result)=>{
        if (err) throw err;
       
        res.render('secondpage', {result: result});
    });
    
});

module.exports = router;