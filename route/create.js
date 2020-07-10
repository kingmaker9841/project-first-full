const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const ItemModel = require('../models/itemmodel');


//Configuring Multer for Image Storage
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        const {title,price,area,address} = req.body;
        let folderName = title+'-'+price+'-'+area+'-'+address;
        let uploadPath = `uploads/${folderName}`;
        fs.exists(uploadPath, (exists)=>{
            if (!exists){
                 return fs.mkdir(uploadPath, (err)=>{
                     if (err) throw err;
                     cb(null, uploadPath);
                 })  
            } else{
                return cb(null, uploadPath);
            }
        });
    },
    filename : (req,file,cb)=>{
        cb(null,file.originalname);
    },
    fileFilter: (req,file,cb)=>{
        if (file.mimeType === 'image/jpeg' || file.mimeType === 'image/png'){
            cb(null, true);
        } else{
            cb(null, false);
        }
    }
});

const upload = multer({ storage : storage, limits : {
    fileSize : 1024*1024*15
}});


//Authenticating Admin with Session Data
const authenticateAdmin = (req,res,next)=>{
    if (!req.session.data){
        res.redirect('/adminloginpage');
    }else{
        next();
    }
}

router.get('/', authenticateAdmin, (req,res)=>{
    res.render('create');
});

router.post('/', upload.fields([{ name : 'imageMain', maxCount : 1 }, {name : 'gallery', maxCount : 6}]), (req,res)=>{
    const {title,price,priceFix,bedRoom,bathRoom,area,address,sittingRoom,kitchenRoom,storeRoom,floors,parking,landArea,pujaRoom,description,latitude,longitude,balcony,dining,modularKitchen,tvCable,wifi,waterSupply,solar,waterTank}= req.body;
    new ItemModel({
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
        views : 1,
        imageMain : req.files['imageMain'][0].path,
        images : req.files['gallery'].map( file => file.path)
    }).save().then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.error(err);
    });
    res.redirect('/');
});

module.exports = router;