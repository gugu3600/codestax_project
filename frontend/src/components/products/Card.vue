<template>
    <div
        class="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <!-- Product Image -->
        <div class="w-full h-72 sm:h-80 md:h-64 overflow-hidden bg-gray-100">
            <img
                :src="image"
                :alt="product.name"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
        </div>

        <!-- Product Info -->
        <div class="p-4">
            <!-- Product Name -->
            <h3 class="text-base font-semibold mb-2 text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">
                {{ product.name }}
            </h3>

            <!-- Category -->
            <div class="mb-3">
                <span class="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                    {{ product.category?.name || 'Uncategorized' }}
                </span>
            </div>

            <!-- Price and Stock -->
            <div class="flex justify-between items-center mb-3">
                <span class="text-lg font-bold text-gray-900">${{ product.price }}</span>

                <div class="flex items-center gap-1.5">
                    <span class="text-xs font-medium text-gray-600">Stock:</span>
                    <span :class="[
                        'text-sm font-semibold px-1.5 py-0.5 rounded',
                        product.stock === 0
                            ? 'bg-red-100 text-red-700'
                            : product.stock <= 5
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-700'
                    ]">
                        {{ product.stock > 0 ? product.stock : 'Out of Stock' }}
                    </span>
                </div>
            </div>

            <!-- Add to Cart Button -->
            <button :disabled="product.stock === 0" :class="[
                'w-full py-2.5 px-4 rounded-md font-semibold transition-colors duration-300',
                product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
            ]">
                {{ product.stock > 0 ? 'Add to Cart' : 'Unavailable' }}
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    product: {
        type: Object,
        required: true,
        validator(value) {
            return value.hasOwnProperty('name') &&
                value.hasOwnProperty('stock') &&
                value.hasOwnProperty('price') &&
                value.hasOwnProperty('category') &&
                typeof value.category === 'object' &&
                value.category.hasOwnProperty('name');
        }
    },

    image : {
        type : String,
        required : false
    }
});
</script>
