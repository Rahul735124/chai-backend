import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary=async (localfilepath)=>{
    try {
        if(!localfilepath) return null
        // upload the file on clodinary
      const response=   await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })

        // file has been upaload successfully
        //console.log("file is uploaded cloudinary",response.url);
        fs.unlinkSync(localfilepath)

        return response;
        
    } catch (error) {
        fs.unlinkSync(localfilepath) // remove the locally saved temp file upload operation gotfailed
        return null
    }
}


export {uploadOnCloudinary}