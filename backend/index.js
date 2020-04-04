const cors = require('cors');
const express = require('express');
const connectDB = require('./config/connectDB');
const app = express();
const tally_reportsRouter = require('./routes/tally_reports');
const seo_reportsRouter = require('./routes/seo_reports');
const email = require('./routes/mailers');
const notifier = require('node-notifier');

const port = process.env.PORT || 5000;
//connect to db
connectDB();

//set a middleware to parse data
app.use(cors());
app.use(express.json());

//pass url
app.use('/tally_reports', tally_reportsRouter);
app.use('/seo_reports', seo_reportsRouter);
app.use('/email', email);

try {
    //get results
    app.listen(port);
    console.log(`Server running on ` + port);
} catch (e) {
    notifier.notify('Error occured while connecting to database!\nPlease try again later or Get in touch with us!');
}
