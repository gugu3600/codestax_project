import { prisma } from "../lib/prisma.js";

export const isOrderDeleted = async (req, res, next) => {
     const { id } = req.params;
     const { user } = res.locals;

     try {
          const order = await prisma.order.findUniqueOrThrow({
               where: { id: Number(id) },
               include: {
                    order_items: {
                         include: {
                              product: true
                         }
                    },
                    discount: true,
                    user: true
               }
          });

          if (order.isDeleted) {
               console.error("Order is soft deleted");
               return res.status(404).json({ message: "Cannot find order" });
          }

          if (order.user_id !== user.id || order.user_id != 1) {
               console.error("Order does not belong to user");
               return res.status(403).json({ message: "Access denied" });
          }

          res.locals.order = order;
          return next();
     }
     catch (error) {
          console.error("Order not found", error.message);
          return res.status(404).json({ message: "Order not found" });
     }
};