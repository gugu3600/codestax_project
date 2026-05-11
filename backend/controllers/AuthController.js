import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { cookieConfig } from "../config/cookie.js";
import "dotenv/config";

export default class AuthController {
     static async register(req, res) {
          const { data } = res.locals;
          const password = await bcrypt.hash(data.password, 10);
          console.log(password);
          try {
               const user = await prisma.user.create({
                    data: {
                         name: data.name,
                         email : data.email,
                         password: password,
                         role_id: 2
                    }
               });
               console.log("User register successfully");
               return res.status(200).json(user);
          }
          catch (error) {
               console.log("Error register User", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async login(req, res) {
          const { data } = res.locals;

          try {
               const user = await prisma.user.findUnique({
                    where: {email : data.email},
                    include: { role: true }
               });

               const success = await bcrypt.compare(data.password, user.password);

               if (!success) {
                    console.error("Login Username or password is wrong");
                    return res.status(401).json({ message: "Name or Password is wrong", status: 401 });
               }
               const userPayload = {
                    id: user.id,
                    name: user.name,
                    email : user.email,
                    role_id: user.role_id,
                    role: user.role.role,
               }

               const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: "1h" });
               // console.log(token);

               res.cookie("token",token,cookieConfig);
               // console.log(token);
               // console.log(cookie)
               return res.status(200).json(userPayload);
          }

          catch (error) {
               console.log("Error Login user", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async logout(req, res) {
               res.clearCookie("token",cookieConfig);
               return res.status(200).json({ message: "Logged out successfully" });
     }

     static async verify(req, res) {
          const { token } = req.cookies;
          try {
               if (token) {
                    console.log("has token")
                    const user = jwt.verify(token, process.env.JWT_SECRET);
                    return res.status(200).json(user);
               }
               res.clearCookie("token",cookieConfig);
               return res.status(401).json({ message: "Required Token" })
          }

          catch (error) {
               console.log("Error in Verify Auth", error.message);
               return res.status(500).json({ message: error.message });
          }
     }
}



