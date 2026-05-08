<script setup>

import { onMounted, ref } from 'vue';
import { getProducts, products } from '@/stores/productStore';
import { productAPI } from '@/services/api/productAPI';
import Card from '@/components/products/Card.vue';

const search_items = ref(null);
const image = import.meta.env.VITE_IMG_URL;

const searchItems = async (q) => {

    if (!q && q.trim === "") {
        await getProducts();
        return true;
    }

    return products.value = await productAPI.search(q);
    
}


onMounted(async () => {
    await getProducts();
    // console.log(products.value);

})
</script>


<template>

    <div class="w-full max-h-fit">

        <div class="search-area">
            <input type="search" class="w-full p-2 mt-3 rounded-2xl" placeholder="Search Products Here ..." v-debounce:500ms ="searchItems" v-model="search_items"/>

        </div>

        <main class="flex items-center gap-10 mt-5">
            <div v-for="product in products" :key="product.id" class="w-60">
                <Card :product="product" :image="`${image}/${product.profile}`" />
            </div>
        </main>


    </div>

</template>