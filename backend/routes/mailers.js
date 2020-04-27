const express = require('express');
const router = express.Router();
const mailer = require('./../services/mailer');
//let email="aaarchannn@gmail.com";


router.route('/sendEmail').post(async (req, res) => {
    try {
        //const email = req.body.email;
        console.log("backend mailer.js")

        await mailer.doEmail()
        res.send("mail done");
    } catch (err) {
        res.send("Error "+err);
    }
})

router.route('/doReport').post(async (req,res)=>{
    try {
        const email = req.body.email;

        await mailer.doReport(email);
        res.send("Report generated!");
    } catch (e) {
        res.send("Error in mailers.js: "+e)
    }
})

module.exports = router;