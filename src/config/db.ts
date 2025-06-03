import mongoose from 'mongoose';

const connectDB = async() => {
  try {
    if (!process.env.DB) {
      throw new Error('DB environment variable is not defined');
    }
    await mongoose.connect(process.env.DB);
    console.log('DB connected successfully');
  } catch (error) {
    console.error('DB Connection error:', error);
    process.exit(1);
  }
};

export default connectDB;