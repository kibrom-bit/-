<template>
  <div class="min-h-screen bg-gray-50 relative font-['Noto_Sans_Ethiopic']">
    <!-- Progress Bar -->
    <div 
      class="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transition-all duration-200 shadow-lg shadow-blue-500/30"
      :style="{ width: scrollProgress + '%' }"
    ></div>

    <!-- Header spacer -->
    <div class="h-14"></div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6"> <!-- Reduced padding -->
      <!-- Page Header -->
      <div class="mb-6 pb-4 border-b border-gray-200"> <!-- Reduced margins -->
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2 leading-tight">{{ pageTitle }}</h1> <!-- Reduced text size -->
          </div>
          <div class="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/20"> <!-- Reduced size -->
            {{ pageId }}
          </div>
        </div>
      </div>
     
      <!-- Page Content - Reduced padding -->
      <div 
        ref="contentElement" 
        class="bg-white rounded-xl p-6 shadow-sm mb-8 content-box" <!-- Changed: p-8 to p-6 -->
        v-html="formattedContent"
      ></div>
     
      <!-- Desktop Navigation -->
      <div class="hidden md:flex justify-between items-center pt-6 border-t border-gray-200"> <!-- Reduced padding -->
        <button
          v-if="pageId > 1"
          @click="goToPage(pageId - 1)"
          class="flex items-center gap-3 px-5 py-2.5 rounded-lg font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <span>ወደ ገጽ {{ pageId - 1 }}</span>
        </button>
        <div v-else></div>
       
        <button
          v-if="pageId < totalPages"
          @click="goToPage(pageId + 1)"
          class="flex items-center gap-3 px-5 py-2.5 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
        >
          <span>ወደ ገጽ {{ pageId + 1 }}</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import type { Page } from '@/types/document'

interface Props {
  pages: Page[]
}

const props = defineProps<Props>()
const route = useRoute()
const router = useRouter()
const contentElement = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)

const pageId = computed(() => {
  return parseInt(route.params.id as string) || 1
})

const currentPageData = computed(() => {
  return props.pages.find(page => page.id === pageId.value)
})

const pageTitle = computed(() => {
  return currentPageData.value?.title || 'ገጽ አልተገኘም'
})

const totalPages = computed(() => {
  return props.pages.filter(p => p.id <= 11).length
})

const goToPage = (pageNumber: number) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    router.push(`/page/${pageNumber}`)
  }
}

const formattedContent = computed(() => {
  if (!currentPageData.value?.content) return '<p>ይህ ገጽ አሁን ባዶ ነው</p>'
  return marked(currentPageData.value.content)
})

const calculateScrollProgress = () => {
  if (!contentElement.value) return
  
  const contentRect = contentElement.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const elementTop = contentRect.top + scrollTop
  const contentHeight = contentRect.height
  const maxScroll = contentHeight - windowHeight
  
  if (maxScroll <= 0) {
    scrollProgress.value = 100
  } else {
    const scrolled = Math.max(0, scrollTop - elementTop)
    const progress = Math.min(100, (scrolled / maxScroll) * 100)
    scrollProgress.value = progress
  }
}

onMounted(() => {
  window.addEventListener('scroll', calculateScrollProgress)
  window.addEventListener('resize', calculateScrollProgress)
  setTimeout(calculateScrollProgress, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculateScrollProgress)
  window.removeEventListener('resize', calculateScrollProgress)
})
</script>

<style scoped>
/* Remove all prose styles, use content-box from App.vue */
@media (max-width: 768px) {
  .max-w-4xl {
    padding: 1rem 0.5rem 6rem;
  }
  
  .bg-white {
    padding: 1rem !important;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
}
</style>