import { prisma } from "../lib/prisma.js";

export const categoryIsDelete = async (req,res,next) => {

     const {id} = req.params;

     try { 
          const category = await prisma.category.findUniqueOrThrow({
               where : {id : Number(id)}
          });

          if(category.isDeleted){
               console.error("Category is soft deleted");
               return res.status(404).json({ message: "Cannot find Category" });
          }

          res.locals.category = category;
          return next();
     }

     catch (error) {
          console.error("Category not found ");
          return res.status(404).json({ message: "Category not found" });
     }
}