import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt"
export const UserSeeder = async () => {

     const password = await bcrypt.hash("password333",10);
     const admin = {name : "Admin",password : password,role_id : 1};

     await prisma.user.create({data : admin});
     console.log("User seeding compeleted");
     process.exit(0);
}