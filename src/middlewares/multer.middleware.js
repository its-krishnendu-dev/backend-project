import multer from "multer";

// Configure where and how uploaded files will be stored
const storage = multer.diskStorage({
  // Set the destination folder for uploaded files
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },

  // Set the name of the uploaded file
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create Multer middleware using the storage configuration
export const upload = multer({
  storage,
});
