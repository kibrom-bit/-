<template>
  <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex bg-white rounded-full px-2 py-2 shadow-xl z-40 gap-2 border border-gray-200">
    <button
      v-if="currentPage > 1"
      @click="$emit('prev-page')"
      class="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 hover:-translate-y-0.5 transition-all duration-200"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      <span class="text-sm">ተመለስ</span>
    </button>
    
    <button
      v-if="currentPage < totalPages"
      @click="$emit('next-page')"
      class="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-green-500 hover:bg-green-600 hover:-translate-y-0.5 transition-all duration-200"
    >
      <span class="text-sm">ቀጥል</span>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  (e: 'prev-page'): void
  (e: 'next-page'): void
}>()
</script>