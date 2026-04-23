import {faker} from "@faker-js/faker"
import { prisma } from "../../lib/prisma.js";

export default async function CategorySeeder(){

     const categories = faker.helpers.uniqueArray(faker.commerce.department,8);

     const data = categories.map(category => ({name : category}));

     await prisma.category.createMany({data : data,skipDuplicates : true});
     console.log("Category seeding compeleted");
     process.exit(0);
}