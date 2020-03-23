// index.js
const puppeteer = require("puppeteer");
const nodemailer = require('nodemailer');
const path = require('path');

module.exports = {
  async doEmail(toEmail){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://github.com/TeamAlphaCAPSTONE/TeamAlphaCapstone/tree/Archan", {
      waitUntil: "networkidle2"
    });
    await page.setViewport({ width: 1680, height: 1050 });
    await page.emulateMedia('screen'); 
    await page.pdf({
      path: "./../services/report.pdf",
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
      from: '"Scrapper 👻" <testscrapper9@gmail.com>', // sender address
      to: "aaarchannn@gmail.com", // list of receivers
      subject: "Report from Scrapper ✔",
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
  
    console.log("Mail delivered", info.messageId);
  }
}