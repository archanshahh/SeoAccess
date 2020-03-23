const express = require('express');
const router = express.Router();
const mailer = require('./../services/mailer');
let email = 'aaarchannn@gmail.com';

mailer.doEmail(email);

module.exports = router;