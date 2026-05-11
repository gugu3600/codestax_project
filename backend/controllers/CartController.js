import { prisma } from "../lib/prisma.js";

export default class CartController {
    static async show(req, res) {
        const { id } = res.locals.user;
        try {
            const cart = await prisma.cart.findUniqueOrThrow({
                where: { user_id: Number(id) },
                include: { cart_items: true }
            });

            console.log("Carts Retrived successfully");
            return res.status(200).json(cart);

        }

        catch (error) {
            console.log("Error show cart", error.message);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async store(req, res) {
        const { cartItems } = req.body;
        const { user } = res.locals;

        try {
            const cart = await prisma.cart.create({
                data: {
                    user_id: Number(user.id),
                    cart_items: {
                        create: cartItems.map(cartItem => ({
                            product_id: cartItem.item_id,
                            quantity: cartItem.quantity,
                            unit_price: cartItem.unit_price
                        }))
                    }
                }
            });

            console.log("Cart Create successfully");
            return res.status(200).json(cart);
        }

        catch (error) {
            console.log("Error store cart", error.message);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}