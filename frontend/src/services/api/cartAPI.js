import { apiClient } from "../axios";

export default class CartAPI {
    static async addToCart(data) {

        try {
            const res = await apiClient.post("/cart", { cartItems: data});
            return res.data;
        }

        catch (error) {
               return error.message || "Error in getAll Category API";
          }

    }
    
}