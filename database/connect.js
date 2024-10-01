require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.DATABASE_URL;

async function connectDB() {
  try {
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error; // Re-throw the error to handle it properly
  }
}

module.exports = connectDB;
