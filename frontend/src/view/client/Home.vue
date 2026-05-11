<script setup>
import { onMounted, ref } from 'vue';
import { getProducts, products } from '@/stores/productStore';
import { productAPI } from '@/services/api/productAPI';
import Card from '@/components/products/Card.vue';
import { addToCart } from '@/stores/cartStore'; 
import { isLoggedIn } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const search_items = ref(null);
const image = import.meta.env.VITE_IMG_URL;
const router = useRouter();

const searchItems = async (q) => {
    if (!q || q.trim() === "") {
        await getProducts();
        return;
    }
    products.value = await productAPI.search(q);
}

const handleAddToCart = async (product) => {
    if (!isLoggedIn.value) {
        router.push('/login');
        return;
    }
    await addToCart(product);
};

onMounted(async () => {
    await getProducts();
});
</script>

<template>
    <div class="bg-slate-50 min-h-screen pb-20">
        
        <div class="bg-white border-b mb-10">
            <div class="max-w-7xl mx-auto px-6 py-12 text-center">
                <h2 class="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    Discovery Our <span class="text-amber-500">Products</span>
                </h2>
                <p class="text-slate-500 max-w-lg mx-auto">Explore our high-quality collection of products curated just for you.</p>
                
                <div class="relative max-w-xl mx-auto mt-8 group">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-amber-500 transition-colors">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input 
                        type="search" 
                        class="w-full pl-12 pr-4 py-4 rounded-full border-none ring-1 ring-slate-200 shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-300 bg-white" 
                        placeholder="What are you looking for today? ..." 
                        v-debounce:500ms="searchItems" 
                        v-model="search_items"
                    />
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6">
            <main class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-8">
                <div v-for="product in products" :key="product.id" class="flex justify-center">
                    <Card 
                        :product="product" 
                        :image="`${image}/${product.profile}`" 
                        @add-to-cart="handleAddToCart"
                    />
                </div>
            </main>

            <div v-if="products?.length === 0" class="flex flex-col items-center justify-center mt-20 p-12 bg-white rounded-3xl shadow-sm border border-slate-100">
                <div class="bg-slate-50 p-6 rounded-full mb-4">
                    <i class="fa-solid fa-box-open text-6xl text-slate-300"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-800">No products found</h3>
                <p class="text-slate-500">Try adjusting your search to find what you're looking for.</p>
                <button @click="searchItems('')" class="mt-4 text-amber-600 font-semibold hover:underline">Clear search</button>
            </div>
        </div>
    </div>
</template>