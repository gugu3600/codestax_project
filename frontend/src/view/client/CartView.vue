<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { cart, cartCount } from '@/stores/cartStore';
import OrderAPI from '@/services/api/orderAPI';
import CartItem from '@/components/cart/CartItem.vue';
import CartSummary from '@/components/cart/CartSummary.vue';

const router = useRouter();
const isProcessing = ref(false);
const imageBase = import.meta.env.VITE_IMG_URL;


const increaseQty = (item) => item.quantity++;
const decreaseQty = (item) => {
    if (item.quantity > 1) item.quantity--;
};
const removeItem = (id) => {
    cart.value = cart.value.filter(i => i.id !== id);
};


const subtotal = computed(() => {
    return cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
});


const handleCheckout = async () => {
    try {
        isProcessing.value = true;
        await OrderAPI.checkout();
        
        cart.value = [];
        router.push('/orders');
        alert("Success! Your order has been placed.");
    } catch (error) {
        alert("Checkout Error: " + error);
    } finally {
        isProcessing.value = false;
    }
};
</script>

<template>
    <div class="bg-slate-50 min-h-screen py-16 px-4">
        <div class="max-w-6xl mx-auto">
            
            <div class="flex items-end gap-4 mb-12">
                <h2 class="text-5xl font-black text-slate-900 tracking-tighter">Your Bag</h2>
                <span class="text-xl font-bold text-slate-400 mb-1">({{ cartCount }} items)</span>
            </div>

            <div v-if="cart.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                
                <div class="lg:col-span-2">
                    <CartItem 
                        v-for="item in cart" 
                        :key="item.id" 
                        :item="item" 
                        :image="`${imageBase}/${item.profile}`"
                        @increase="increaseQty"
                        @decrease="decreaseQty"
                        @remove="removeItem"
                    />
                    
                    <RouterLink to="/" class="inline-flex items-center gap-2 mt-6 text-slate-500 hover:text-amber-600 font-bold transition-colors">
                        <i class="fa-solid fa-arrow-left"></i>
                        Continue Shopping
                    </RouterLink>
                </div>

                <CartSummary 
                    :subtotal="subtotal" 
                    :isProcessing="isProcessing"
                    @checkout="handleCheckout"
                />
            </div>

            <div v-else class="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-slate-100 mt-10">
                <div class="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <i class="fa-solid fa-cart-shopping text-5xl text-slate-200"></i>
                </div>
                <h3 class="text-3xl font-black text-slate-900 mb-4">Your bag is empty</h3>
                <p class="text-slate-400 max-w-sm mx-auto mb-10 text-lg">Looks like you haven't added anything yet. Start exploring our collection!</p>
                <RouterLink to="/" class="bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-amber-100 transition-all active:scale-95 inline-block">
                    Explore Products
                </RouterLink>
            </div>
        </div>
    </div>
</template>