<template>
  <section class="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Shopping Cart</h2>
        <p class="text-sm text-gray-500">Review your cart items before checkout.</p>
      </div>

      <div class="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
        {{ items.length }} item{{ items.length === 1 ? '' : 's' }}
      </div>
    </div>

    <ul class="space-y-4" v-if="items.length">
      <CartItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @increment="$emit('increment', item)"
        @decrement="$emit('decrement', item)"
        @remove="$emit('remove', item)"
      />
    </ul>

    <div v-else class="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
      Your cart is empty.
    </div>

    <div v-if="items.length" class="flex flex-col gap-4 border-t border-gray-200 pt-4 text-right sm:flex-row sm:justify-between sm:text-left">
      <div>
        <p class="text-sm text-gray-500">Subtotal</p>
        <p class="text-2xl font-semibold text-gray-900">${{ cartTotal }}</p>
      </div>
      <button type="button" class="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
        Proceed to Checkout
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import CartItem from '@/components/Cart/CartItem.vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

const cartTotal = computed(() => {
  return items.reduce((sum, item) => {
    const price = Number(item.unit_price ?? 0);
    const qty = Number(item.quantity ?? 0);
    return sum + price * qty;
  }, 0).toFixed(2);
});
</script>
