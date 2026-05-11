<template>
  <section class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
    <div class="border-b border-gray-100 bg-gray-50 px-6 py-5">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Cart Items</h2>
          <p class="text-sm text-gray-500">Manage item quantities and remove items from the cart.</p>
        </div>
        <div class="text-sm font-medium text-gray-700">{{ items.length }} item{{ items.length === 1 ? '' : 's' }}</div>
      </div>
    </div>

    <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
      <thead class="bg-gray-50 text-gray-700">
        <tr>
          <th class="px-4 py-3">Product</th>
          <th class="px-4 py-3">Price</th>
          <th class="px-4 py-3">Quantity</th>
          <th class="px-4 py-3">Total</th>
          <th class="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="item in items" :key="item.id">
          <td class="px-4 py-4">
            <div class="flex items-center gap-3">
              <div class="h-14 w-14 overflow-hidden rounded-xl bg-gray-100">
                <img
                  v-if="item.product?.profile"
                  :src="`${imageBase}/${item.product.profile}`"
                  :alt="item.product?.name || 'Product image'"
                  class="h-full w-full object-cover"
                />
                <div v-else class="flex h-full items-center justify-center text-xs text-gray-500">No image</div>
              </div>
              <div>
                <p class="font-semibold text-gray-900">{{ item.product?.name || 'Unnamed product' }}</p>
                <p class="text-xs text-gray-500">{{ item.product?.category?.name || 'No category' }}</p>
              </div>
            </div>
          </td>

          <td class="px-4 py-4 text-gray-700">${{ Number(item.unit_price ?? 0).toFixed(2) }}</td>

          <td class="px-4 py-4">
            <div class="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-2 py-1">
              <button
                type="button"
                class="h-8 w-8 rounded-full bg-white text-gray-700 shadow-sm transition hover:bg-gray-100"
                @click="$emit('decrement', item)"
              >
                -
              </button>
              <span class="w-10 text-center font-semibold text-gray-900">{{ item.quantity }}</span>
              <button
                type="button"
                class="h-8 w-8 rounded-full bg-white text-gray-700 shadow-sm transition hover:bg-gray-100"
                @click="$emit('increment', item)"
              >
                +
              </button>
            </div>
          </td>

          <td class="px-4 py-4 text-gray-900">${{ (Number(item.unit_price ?? 0) * Number(item.quantity ?? 0)).toFixed(2) }}</td>
          <td class="px-4 py-4">
            <button
              type="button"
              class="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              @click="$emit('remove', item)"
            >
              Remove
            </button>
          </td>
        </tr>

        <tr v-if="!items.length">
          <td colspan="5" class="px-4 py-8 text-center text-sm text-gray-500">No cart items yet.</td>
        </tr>
      </tbody>
    </table>

    <div class="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 px-6 py-5 text-right sm:flex-row sm:justify-between sm:text-left">
      <div>
        <p class="text-sm text-gray-600">Estimated total</p>
        <p class="text-xl font-semibold text-gray-900">${{ cartTotal }}</p>
      </div>
      <button type="button" class="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
        Checkout
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

const imageBase = import.meta.env.VITE_IMG_URL || '';

const cartTotal = computed(() => {
  return items.reduce((sum, item) => {
    const price = Number(item.unit_price ?? 0);
    const qty = Number(item.quantity ?? 0);
    return sum + price * qty;
  }, 0).toFixed(2);
});
</script>
