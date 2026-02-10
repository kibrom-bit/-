<template>
  <nav class="border-t border-gray-200 py-4 px-4 bg-white/95 backdrop-blur-sm">
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Page Info -->
        <div class="text-gray-700 font-medium">
          ገጽ <span class="text-blue-700 font-bold">{{ currentPage }}</span> / {{ totalPages }}
        </div>
        
        <!-- Navigation Buttons -->
        <div class="flex items-center gap-3">
          <button 
            @click="$emit('prev-page')"
            :disabled="currentPage <= 1"
            class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            :class="{ 'text-gray-400': currentPage <= 1 }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            ቀዳሚ
          </button>
          
          <!-- Page Selector -->
          <div class="flex items-center gap-2">
            <span class="text-gray-600">ወደ ገጽ:</span>
            <select 
              v-model="selectedPage"
              @change="onPageSelect"
              class="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option v-for="page in totalPages" :key="page" :value="page">
                {{ page }}
              </option>
            </select>
          </div>
          
          <button 
            @click="$emit('next-page')"
            :disabled="currentPage >= totalPages"
            class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            :class="{ 'text-gray-400': currentPage >= totalPages }"
          >
            ቀጣይ
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        
        <!-- Print Button -->
        <button 
          @click="printDocument"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
          </svg>
          አትም
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
}

interface Emits {
  (e: 'prev-page'): void
  (e: 'next-page'): void
  (e: 'jump-to-page', page: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedPage = ref(props.currentPage)

watch(() => props.currentPage, (newPage) => {
  selectedPage.value = newPage
})

const onPageSelect = () => {
  emit('jump-to-page', selectedPage.value)
}

const printDocument = () => {
  window.print()
}
</script>

<style scoped>
@media print {
  nav {
    display: none !important;
  }
}
</style>