import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Connect using MongoDB URI and database name
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    // Show successful connection
    console.log(
      `\nMongoDB connected !!! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // Show connection error
    console.log("MONGODB connection FAILED ", error);

    // Stop the application
    process.exit(1);
  }
};

// Export function
export default connectDB;
