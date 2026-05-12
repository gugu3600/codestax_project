import { apiClient } from "../axios";

export default class OrderAPI {
    static async checkout(discountName = null) {
        try {
            const res = await apiClient.post("/orders", { 
                discount_name: discountName 
            });
            return res.data;
        } catch (error) {
            throw error.response?.data?.message || "Checkout failed";
        }
    }

    static async getOrders() {
        try {
            const res = await apiClient.get("/orders");
            return res.data;
        } catch (error) {
            throw error.response?.data?.message || "Error fetching orders";
        }
    }

    static async showOrder(id)
    {
        try {
            const res = await apiClient.get(`/orders/${id}`);
            return res.data;
        }
        catch (error) {
            throw error.response?.data?.message || "Error fetching orders";
        }
    }
}