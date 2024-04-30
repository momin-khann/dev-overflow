import mongoose from "mongoose";

let isConnected = false;
export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      return console.error("Missing MongoDB URL.");
    }

    if (isConnected) {
      console.log("Database Already Connected.");
      return;
    }

    const db = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`,
    );

    isConnected = true;

    console.log(
      `Database connected to ${db.connection.name} on ${db.connection.host}`,
    );
  } catch (error) {
    console.error("MongoDB connection failed.", error);
    process.exit(1);
  }
};
