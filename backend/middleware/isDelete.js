import { prisma } from "../lib/prisma.js";

export const isDelete = async (req,res,next) => {

     const {id} = req.params;
     try {
     const product = await prisma.product.findUniqueOrThrow({
          where : {id : Number(id)},
          include : {category : true}
     });
     if(product.isDeleted){
          console.error("Products is soft deleted");
          return res.status(404).json({message : "Cannot find product"});
     }
     res.locals.product = product;
     return next();
     }
     catch (error) {
          console.error("product not found ");
          return res.status(404).json({ message: "Product not found" });
     }
}