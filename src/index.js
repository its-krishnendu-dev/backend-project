import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// Load environment variables
dotenv.config({
  path: "./env",
});

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start server after database connection
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    // Show database connection error
    console.log("MONGODB connection Failed !!!!", err);
  });


  
// import express from 'express';
// const app = express()

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("ERROR", error);
//             throw error;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listning on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error('ERROR', error);
//         throw error;
//     }
// }) ()
