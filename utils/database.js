import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export const connectToDB = async (dbName) => {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URI , {
        dbName: dbName,
    });

    isConnected = true;
    console.log('MongoDB connected name is'+ dbName);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};
