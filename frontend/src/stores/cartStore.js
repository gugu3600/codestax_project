import { ref, computed } from "vue";
import CartAPI from "@/services/api/cartAPI"
import { userId } from "./authStore";

export const cart = ref([]);

export const cartCount = computed(() => {
    return cart.value.reduce((total, item) => total + (item.quantity || 1), 0);
});

export const addToCart = async (product) => {
  
    const existingItem = cart.value.find(i => i.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.value.push({ ...product, quantity: 1 });
    }

    const cartItems = cart.value.map(item => ({
        user_id : userId.value,
        item_id: item.id,
        quantity: item.quantity,
        unit_price: item.price
    }));

    return await CartAPI.addToCart(cartItems);
};

export const getCartItems = async () => {

}