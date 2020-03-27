const express = require('express');
const router = express.Router();
const mailer = require('./../services/mailer');
//let email="aaarchannn@gmail.com";



router.route('/sendEmail').post((req,res)=>{

    try{

        const email=req.body.email;
        const url=req.body.location;
        mailer.doEmail(email,url)
    }
    catch(err)
    {
        res.send(err);
    }
})


module.exports = router;