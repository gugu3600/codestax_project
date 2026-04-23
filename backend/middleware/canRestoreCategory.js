import { prisma } from "../lib/prisma";

export const canRestoreCategory = async (req, res, next) => {

     const { id } = req.params;

     try {

          const category = await prisma.category.findUniqueOrThrow({
               where: { id: Number(id) }
          });

          if (!category.isDeleted) {
               console.error("Category only deleted can restore");
               return res.status(400).json({ message: "You cannot restore an active data" });
          }
          return next();
     } catch (error) {
          console.error("Category not found ");
          return res.status(404).json({ message: "Category not found" });
     }
}
