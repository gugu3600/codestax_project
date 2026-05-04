import CategorySeeder from "./categorySeeder.js";
import { RoleSeeder } from "./roleSeeder.js";
import { UserSeeder } from "./userSeeder.js";

async function dbSeed(){

     await CategorySeeder();
     await RoleSeeder();
     await UserSeeder();
     process.exit(0);
}

dbSeed();