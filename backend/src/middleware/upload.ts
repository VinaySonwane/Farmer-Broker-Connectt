// src/middleware/upload.ts
import multer from "multer";
import path from "path";

// Set up multer storage configuration for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination folder for file uploads
    cb(null, "public/uploads/"); // Save files in the 'public/uploads' folder
  },
  filename: (req, file, cb) => {
    // Define the file name format to avoid name conflicts
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  },
});

// Set up multer upload instance with the storage configuration
const upload = multer({ storage: storage });

export default upload;
