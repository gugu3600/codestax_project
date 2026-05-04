import { prisma } from "../../lib/prisma.js";
export const RoleSeeder = async () => {

     const roles = [{role : "admin"},{role : "user"}];

     await prisma.role.createMany({data : roles});
     console.log("Role seeding compeleted");
     // process.exit(0);
}