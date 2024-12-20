const mongoose = require('mongoose');

async function connectMongoDb(url){
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected');
      } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
      }
}

module.exports = {connectMongoDb};