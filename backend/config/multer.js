import multer from "multer";
import path from "path";

export const storage =  multer.diskStorage({
     destination : (req,file,cb) => {
          cb(null,"assets/images/products/");
     },

     filename : (req,file,cb) => {
          const unique = Date.now();
          cb(null,file.fieldname + unique + path.extname(file.originalname));
     }
});