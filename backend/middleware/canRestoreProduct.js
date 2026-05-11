import { prisma } from "../lib/prisma.js";

export const canRestoreProduct = async (req, res, next) => {
     const { id } = req.params;
     try {
          const product = await prisma.product.findUniqueOrThrow({
               where: { id: Number(id)}
          });

          if (!product.isDeleted) {
               console.error("Product only deleted can restore");
               return res.status(400).json({ message: "You cannot restore an active data" });
          }
          return next();
     } catch (error) {
          console.error("Product not found ");
          return res.status(404).json({ message: "Category not found" });
     }
}
