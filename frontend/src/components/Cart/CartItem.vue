<template>
  <li class="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
    <div class="flex items-center gap-4">
      <div class="h-20 w-20 overflow-hidden rounded-xl bg-gray-100">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          :alt="product.name || 'Product image'"
          class="h-full w-full object-cover"
        />
        <div v-else class="flex h-full items-center justify-center text-sm text-gray-500">
          No image
        </div>
      </div>

      <div class="min-w-0">
        <h3 class="text-base font-semibold text-gray-900 truncate">{{ product.name || 'Untitled product' }}</h3>
        <p class="text-sm text-gray-600 truncate">{{ product.category?.name || 'No category' }}</p>
        <p class="mt-2 text-sm text-gray-700">Unit price: <span class="font-medium text-gray-900">${{ formattedPrice }}</span></p>
      </div>
    </div>

    <div class="flex flex-col gap-3 sm:items-end">
      <div class="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-2 py-1">
        <button
          type="button"
          class="h-8 w-8 rounded-full bg-white text-gray-700 shadow-sm transition hover:bg-gray-100"
          @click="decrement"
        >
          -
        </button>
        <span class="w-12 text-center text-sm font-semibold text-gray-900">{{ item.quantity }}</span>
        <button
          type="button"
          class="h-8 w-8 rounded-full bg-white text-gray-700 shadow-sm transition hover:bg-gray-100"
          @click="increment"
        >
          +
        </button>
      </div>

      <div class="text-sm text-gray-700">
        <span>Total:</span>
        <span class="font-semibold text-gray-900">${{ itemTotal }}</span>
      </div>

      <button
        type="button"
        class="self-start rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 sm:self-end"
        @click="removeItem"
      >
        Remove
      </button>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
    validator(value) {
      return (
        value !== null &&
        typeof value === 'object' &&
        'quantity' in value &&
        'unit_price' in value &&
        'product' in value
      );
    }
  }
});

const emits = defineEmits(['increment', 'decrement', 'remove']);

const product = computed(() => props.item.product || {});
const imageUrl = computed(() => {
  if (props.item.product?.profile) {
    return `${import.meta.env.VITE_IMG_URL}/${props.item.product.profile}`;
  }
  return '';
});

const itemTotal = computed(() => {
  const price = Number(props.item.unit_price ?? 0);
  const quantity = Number(props.item.quantity ?? 0);
  return (price * quantity).toFixed(2);
});

const formattedPrice = computed(() => Number(props.item.unit_price ?? 0).toFixed(2));

function increment() {
  emits('increment', props.item);
}

function decrement() {
  emits('decrement', props.item);
}

function removeItem() {
  emits('remove', props.item);
}
</script>
