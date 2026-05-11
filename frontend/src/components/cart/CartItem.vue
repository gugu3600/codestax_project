<script setup>
defineProps({
    item: Object,
    image: String
});

const emit = defineEmits(['increase', 'decrease', 'remove']);
</script>

<template>
    <div class="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm mb-4 border border-slate-100">
        <div class="flex items-center gap-4">
            <img :src="image" class="w-20 h-20 object-cover rounded-lg" alt="product" />
            <div>
                <h4 class="font-bold text-slate-800">{{ item.name }}</h4>
                <p class="text-amber-600 font-semibold">${{ item.price }}</p>
            </div>
        </div>

        <div class="flex items-center gap-6">
            <div class="flex items-center bg-slate-100 rounded-lg px-2 py-1">
                <button @click="emit('decrease', item)" class="p-1 hover:text-amber-600 transition">
                    <i class="fa-solid fa-minus text-xs"></i>
                </button>
                <span class="mx-3 font-bold text-slate-700">{{ item.quantity }}</span>
                <button @click="emit('increase', item)" class="p-1 hover:text-amber-600 transition">
                    <i class="fa-solid fa-plus text-xs"></i>
                </button>
            </div>

            <button @click="emit('remove', item.id)" class="text-slate-300 hover:text-red-500 transition">
                <i class="fa-solid fa-trash-can text-lg"></i>
            </button>
        </div>
    </div>
</template>