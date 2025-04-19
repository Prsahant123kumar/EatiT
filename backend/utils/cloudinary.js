const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require("dotenv");

dotenv.config({ path: './.env' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localfilepath) => {   
    try {
        if (!localfilepath) return null;
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        });
        fs.unlinkSync(localfilepath);
        return response;
    } catch (error) {
        fs.unlinkSync(localfilepath);
        console.log(error);
        return null;
    }
};

const deleteFromCloudinary = async (url, resourceType = "image") => {
    try {
        const publicId = url.split('/').pop().split('.')[0].split('?')[0];
        console.log(`Public Id of the file is : ${publicId}`); 
        await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    } catch (error) {
        console.log(`The following error occured during deleting the file from cloudinary : ${error}`);
    }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary };