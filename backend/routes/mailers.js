const express = require('express');
const router = express.Router();
const mailer = require('./../services/mailer');
//let email="aaarchannn@gmail.com";


router.route('/sendEmail').post(async (req, res) => {
    try {
        const email = req.body.email;

        const url = req.body.location;
        console.log("backend mailer.js")

        await mailer.doEmail(email, url)
        res.send("mail done");
    } catch (err) {
        res.send("Error "+err);
    }
})


module.exports = router;