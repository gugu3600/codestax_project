import multer from "multer";

export const imageValidator = (req,file,cb) => {

     const allowedTypes = ["image/jpeg","image/png","image/webp","image/jpg"];

     if(allowedTypes.includes(file.mimetype)){
          cb(null,true);
     }else {
          cb(new Error("Invalid file type, Only JPEG,PNG, and Webp are allowed"),false);
     }
}