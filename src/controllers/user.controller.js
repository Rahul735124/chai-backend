import {asyncHandler} from "../utils/asyncHanler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler(async(req,res)=>{
    //  res.status(200).json({
    //     message:"everything is okk"
    // })

    // get user details from frontend
    // validation - not empty
    // check if user already  registered , username,email
    // check for images,check for avatar
    // upload them to cloudinary , avatar
    // create user object - create entry in db
    // remove password and refresh token failed from response
    // check for user creation 
    // return res



    const {fullname,email,username,password}=req.body
    console.log("email: ",email);
    
    // if(fullname === ""){
    //     throw new ApiError(400,"fullname is required")
    // }
 if(
    [fullname,password,email,username].some((field)=>
        field?.trim() ==="")
){
    throw new ApiError(400,"All fields are required ")
}

const existeduser=User.findOne({
    $or:[{username},{email}]
})

if(existeduser){
    throw new ApiError(409,"user name already exists ")
}

const avatarlocalpath=req.files?.avatar[0]?.path;
const coverImagelocalpath=req.files?.coverImage[0]?.path;

if(!avatarlocalpath){
    throw new ApiError(400,"Avatar file is required");
}

const avatar= await uploadOnCloudinary(avatarlocalpath)
const coverImage= await uploadOnCloudinary(coverImagelocalpath)

if(!avatar){
     throw new ApiError(400,"Avatar file is required"); 
}

const user =await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
})

const createduser=await User.findById(user._id).select("-password -refreshToken") // select usd to ignore entry

if(!createduser){
    throw new ApiError(500,"something went wrong while registering the user ")
}

return res.status(201).json(
    new ApiResponse(200,createduser,"user registered successfully")
)
 

})

    

     





export {registerUser}