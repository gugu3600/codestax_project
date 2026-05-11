import { prisma } from "../lib/prisma.js";

export const categoryFilterMiddleware = async (req,res,next) => {

    const {category} = req.query;

    try { 

        const _category = await prisma.category.findUniqueOrThrow({
            where : {id : Number(category)},
        });
        // console.log(_category)
        if(_category.isDeleted){
            console.error("Category is soft deleted in middleware cannot move to controller");
            return res.status(404).json({message : "404 not found Category"});
        }

        return next();
    }

    catch (error){
         console.error("Product not found ");
          return res.status(500).json({ message: "Internal Server Error" });
    }

}