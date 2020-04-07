// index.js
const puppeteer = require("puppeteer");
const nodemailer = require('nodemailer');
const path = require('path');
const notifier = require('node-notifier');


module.exports = {
  async doEmail(toEmail, url) {
    try {
      var emailadd = toEmail;
      console.log("inside mailer.js inside inside");
      const browser = await puppeteer.launch({
        'args' : [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      });
      const page = await browser.newPage();
      await page.goto("https://seoaccess-server.herokuapp.com/secondPage/" + toEmail + '/' + url, {
        waitUntil: "networkidle2"
      });
      console.log("https://seoaccess-server.herokuapp.com/secondPage/" + toEmail + '/' + url);
      await page.setViewport({ width: 1680, height: 1050 });
      await page.emulateMedia('screen');
      await page.pdf({
        path: "./report.pdf",
        displayHeaderFooter: true,
        printBackground: true,
        format: "A4"
      });

      await browser.close();


      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'testscrapper9@gmail.com',
          pass: '123Scrappy'
        }
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"SeoAccess 👻" <testscrapper@gmail.com>', // sender address
        to: emailadd, // list of receivers
        subject: "Report from SeoAccess",
        text: "testing",
        html: "<b>Report</b><br/>", //body
        attachments: [
          {
            filename: 'report.pdf',
            path: path.join(__dirname, 'report.pdf'),
            contentType: 'application/pdf'
          }
        ]
      });
      console.log("http://localhost:3000/secondPage/" + toEmail + url);
      console.log("Mail delivered", info.messageId);
      notifier.notify('Mail Delivered!');
      return "Mail done!";
    } catch (error) {
      console.error(error);
      notifier.notify('Mail not Delivered!\nPlease try agian later or Get in touch with us!');
      return error;
    }

  }
}