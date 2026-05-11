<script setup>

defineProps({
    subtotal: {
        type: Number,
        required: true
    },
    isProcessing: {
        type: Boolean,
        default: false
    }
});

defineEmits(['checkout']);
</script>

<template>
    <div class="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-10">
        <h3 class="text-2xl font-black text-slate-900 mb-8 tracking-tight">Order Summary</h3>
        
        <div class="space-y-5 mb-8">
            <div class="flex justify-between items-center text-slate-500">
                <span class="font-medium">Subtotal</span>
                <span class="font-bold text-slate-900 text-lg">${{ subtotal.toFixed(2) }}</span>
            </div>

            <div class="flex justify-between items-center text-slate-500">
                <span class="font-medium">Estimated Shipping</span>
                <span class="font-bold text-emerald-500 uppercase text-sm tracking-tighter">Free Delivery</span>
            </div>

            <div class="flex justify-between items-center text-slate-500">
                <span class="font-medium">Tax (GST)</span>
                <span class="font-bold text-slate-900 text-sm">$0.00</span>
            </div>

            <div class="pt-5 border-t border-dashed border-slate-200 flex justify-between items-center">
                <span class="text-lg font-bold text-slate-900">Total Amount</span>
                <span class="text-3xl font-black text-amber-500">${{ subtotal.toFixed(2) }}</span>
            </div>
        </div>

        <button 
            @click="$emit('checkout')"
            :disabled="isProcessing || subtotal === 0"
            class="w-full bg-slate-900 hover:bg-amber-600 disabled:bg-slate-300 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-3 group"
        >
            <template v-if="!isProcessing">
                <i class="fa-solid fa-bag-shopping group-hover:animate-bounce"></i>
                <span>Complete Purchase</span>
            </template>
            <template v-else>
                <i class="fa-solid fa-circle-notch animate-spin"></i>
                <span>Processing Order...</span>
            </template>
        </button>
        
        <div class="mt-6 flex flex-col items-center gap-3">
            <p class="text-center text-slate-400 text-xs">
                <i class="fa-solid fa-shield-halved mr-1 text-emerald-500"></i> Secure Checkout Guaranteed
            </p>
            <div class="flex gap-3 text-slate-300 text-xl">
                <i class="fa-brands fa-cc-visa"></i>
                <i class="fa-brands fa-cc-mastercard"></i>
                <i class="fa-brands fa-cc-apple-pay"></i>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>