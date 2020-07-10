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
    res.render('find');
});

router.post('/', (req,res)=>{
    const {id} = req.body;
    ItemModel.findById(id, (err,result)=>{
        if (err){
            res.send('<h1>Ooops! Not Found</h1><br><a href="/adminloginpage/welcomeadmin/update">Try Again</a>');
        } else{
            req.session.update = result;
            res.redirect('/adminloginpage/welcomeadmin/update/updatepage');
        }
    });
});

router.get('/updatepage', authenticateAdmin, (req,res)=>{
    let result = req.session.update;
    res.render('update', {result: result});
});

router.post('/updatepage', (req,res)=>{
    const {title,price,priceFix,bedRoom,bathRoom,area,address,sittingRoom,kitchenRoom,storeRoom,floors,parking,landArea,pujaRoom,description,latitude,longitude,balcony,dining,modularKitchen,tvCable,wifi,waterSupply,solar,waterTank}= req.body;
    console.log(req.body.dataId);
    ItemModel.updateOne(
        {_id : req.body.dataId },
        { $set : {
        title : title,
        price : price,
        priceFix : priceFix,
        bedRoom : bedRoom,
        bathRoom : bathRoom,
        area : area,
        address : address,
        sittingRoom : sittingRoom,
        kitchenRoom : kitchenRoom,
        storeRoom : storeRoom,
        floors : floors,
        parking : parking,
        landArea : landArea,
        pujaRoom : pujaRoom,
        description : description,
        latitude : latitude,
        longitude : longitude,
        balcony : balcony ? true : false,
        dining : dining ? true : false,
        modularKitchen : modularKitchen ? true : false,
        tvCable : tvCable ? true : false,
        wifi : wifi ? true : false,
        waterSupply : waterSupply ? true : false,
        solar : solar ? true : false,
        waterTank : waterTank ? true : false,
        }}, (err, result)=>{
            if (err){
                res.send('<h1 style="color:red;">OOps !Could Not Update..</h1><a href="/adminloginpage/welcomeadmin/update/updatepage">Try Again</a>')
            } else{
                console.log(result);
                res.send('<h1 style="color:green;">Successfully Updated..</h1><a href="/adminloginpage/welcomeadmin/update">Update More?</a>')
            }
        });
});

module.exports = router;