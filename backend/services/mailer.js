// index.js
const puppeteer = require("puppeteer");
const nodemailer = require('nodemailer');
const path = require('path');


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/", {
    waitUntil: "networkidle2"
  });
  await page.setViewport({ width: 1680, height: 1050 });
  await page.emulateMedia('screen'); 
  await page.pdf({
    path: "hacker.pdf",
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
    subject: "Hello ✔",
    text: "testing",
    html: "<b>Test email</b>", //body
    attachments: [
                {
                    filename: 'hacker.pdf',
                    path: path.join(__dirname, 'hacker.pdf'),
                    contentType: 'application/pdf'
                }
            ]
  });

  console.log("Mail delivered", info.messageId);
})();