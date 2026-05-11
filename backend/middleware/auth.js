import jwt from "jsonwebtoken";
import "dotenv/config"

export const auth = (req,res,next) => {
     const {token} = req.cookies;
     // console.log(token);
     if (!token){
          console.error("No authorization headers");
          return res.status(401).json({message : "Token Required"});
     }

     try {
          const user = jwt.verify(token,process.env.JWT_SECRET);
          // console.log(user);
          res.locals.user = user;
          return next();
     }

     catch (error) {
          console.error("JWT Verification Error:", error.message);
          return res.status(403).json({ message: "Invalid or Expired Token" });
     }
}