import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // Check if the local file path exists
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect the file type
    });

    // Display the uploaded file's URL
    console.log("File is uploaded on cloudinary", response.url);

    // Return the complete Cloudinary response
    return response;
  } catch (error) {
    // Delete the local file if uploading fails
    fs.unlinkSync(localFilePath);

    // Return null if an error occurs
    return null;
  }
};

// Export the function so it can be used in other files
export { uploadOnCloudinary };
