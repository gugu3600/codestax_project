import { prisma } from "../lib/prisma.js";

export default class OrderController {

     static async index(req, res) {
          try {
               const { user } = res.locals;
               const orders = await prisma.order.findMany({
                    where: {
                         user_id: user.id,
                         isDeleted: false
                    },
                    include: {
                         order_items: {
                              include: {
                                   product: true
                              }
                         },
                         discount: true
                    },
                    orderBy: {
                         created_at: 'desc'
                    }
               });
               console.log("Orders retrieved successfully");
               return res.status(200).json(orders);
          }
          catch (error) {
               console.log("Error retrieving orders", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async show(req, res) {
          try {
               const { order } = res.locals;
               console.log("Order retrieved successfully");
               return res.status(200).json(order);
          }
          catch (error) {
               console.log("Error retrieving order", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async store(req, res) {
          try {
               const { user } = res.locals;
               const { discount_name } = req.body;

               // Get user's cart with items
               const cart = await prisma.cart.findFirst({
                    where: { user_id: user.id },
                    include: {
                         cart_items: {
                              include: {
                                   product: true
                              }
                         },
                         discount: true
                    }
               });

               if (!cart || cart.cart_items.length === 0) {
                    return res.status(400).json({ message: "Cart is empty" });
               }

               // Check discount if provided
               let discount = null;
               if (discount.name) {
                    discount = await prisma.discount.findFirst({
                         where: {
                              name: discount.name,
                              active: true,
                              OR: [
                                   { ends_at: null },
                                   { ends_at: { gte: new Date() } }
                              ]
                         }
                    });
                    if (!discount) {
                         return res.status(400).json({ message: "Invalid or expired discount code" });
                    }
               }

               // Calculate totals
               let totalAmount = 0;
               let discountAmount = 0;

               const orderItems = cart.cart_items.map(item => {
                    const itemTotal = parseFloat(item.unit_price) * item.quantity;
                    totalAmount += itemTotal;
                    return {
                         product_id: item.product_id,
                         quantity: item.quantity,
                         unit_price: item.unit_price,
                         total_price: itemTotal,
                         discount_amount: 0
                    };
               });

               // Apply discount if available
               if (discount) {
                    if (discount.amount) {
                         discountAmount = parseFloat(discount.amount);
                    } else if (discount.percent) {
                         discountAmount = totalAmount * (discount.percent / 100);
                    }
               }

               const payableAmount = totalAmount - discountAmount;

               // Create order with order items in a transaction
               const order = await prisma.$transaction(async (tx) => {
                    const newOrder = await tx.order.create({
                         data: {
                              user_id: user.id,
                              discount_id: discount?.id,
                              total_amount: totalAmount,
                              discount_amount: discountAmount,
                              payable_amount: payableAmount,
                              orderItems: {
                                   create: orderItems
                              }
                         },
                         include: {
                              orderItems: {
                                   include: {
                                        product: true
                                   }
                              },
                              discount: true
                         }
                    });

                    // Clear cart items
                    await tx.cartItem.deleteMany({
                         where: { cart_id: cart.id }
                    });

                    return newOrder;
               });

               console.log("Order created successfully");
               return res.status(201).json(order);
          }
          catch (error) {
               console.log("Error creating order", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }
}