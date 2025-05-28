import { v2 as cloudinary } from 'cloudinary'
import { response } from 'express';
import fs from 'fs'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) {
            throw new Error("No file path provided for upload");
        }
        // Fix: Await the upload and use the result
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Automatically detect resource type (image/video)
        });
        //File upload successful
        // console.log("File uploaded successfully", result.url);
        fs.unlinkSync(localFilePath); // Delete the local file after upload
        return result;
    } catch (error) {
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Delete the local file if upload fails
        }
        // Log the error and rethrow it
        console.error("Error uploading file to Cloudinary", error);
        throw error;
    }
}

export { uploadOnCloudinary };