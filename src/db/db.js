import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
  } catch (error) {
    return null
  }
};

export default connectDB;
