const router = require('express').Router();

const authenticateAdmin = (req,res,next)=>{
    if (!req.session.data){
        res.redirect('/adminloginpage');
    }else{
        next();
    }
}

router.get('/', authenticateAdmin, (req,res)=>{
    res.send("<h1>Update Page </h1>");
});

module.exports = router;