const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/repotugasmk3', {
    
    });
    console.log('Connected to MongoDB');
    return true;  
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return false;  
  }
}

module.exports = connectToMongoDB;
