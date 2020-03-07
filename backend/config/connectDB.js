const mongoose = require('mongoose');
const config = require('config');
mongoose.set('useCreateIndex', true);
const dbconn = config.get('mongoDBConnectURI');

const connectDB = async () => {
  try {
    await mongoose.connect(dbconn, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log('Database ok');
  } catch (err) {
    console.log('Unable to connect');
    process.exit();
  }
};

module.exports = connectDB;
