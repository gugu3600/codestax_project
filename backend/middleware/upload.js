import multer from "multer";
import { storage } from "../config/multer.js";
import { imageValidator } from "../validation/imageValidate.js";


export const uploadRaw = multer({
     storage: storage,
     fileFilter: imageValidator,
     // limits : {
     //      fileSize : 1024 * 1024 * 5
     // }
});

export const uploadImage = (req, res, next) => {
     const upload = uploadRaw.fields([
          { name: "profile", maxCount: 1 },
          { name: "images", maxCount: 5 }
     ]);

     upload(req, res, (err) => {
          if (err) return res.status(400).json({ message: err.message });
          next();
     });
}