<template>
  <div class="min-h-screen bg-gray-50 relative font-['Noto_Sans_Ethiopic']">
    <!-- Progress Bar -->
    <div 
      class="fixed top-0 left-0 h-1 from-blue-500 to-purple-500 z-50 transition-all duration-200 shadow-lg shadow-blue-500/30"
      :style="{ width: scrollProgress + '%' }"
    ></div>

    <!-- Floating Navigation Pill -->
    <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex bg-white rounded-full px-2 py-2 shadow-xl z-40 gap-2 border border-gray-200">
      <button
        v-if="pageId > 1"
        @click="goToPage(pageId - 1)"
        class="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 hover:-translate-y-0.5 transition-all duration-200 "
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span class="text-sm">ተመለስ</span>
      </button>
      
  
      
      <button
        v-if="pageId < totalPages"
        @click="goToPage(pageId + 1)"
        class="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-green-500 hover:bg-green-600 hover:-translate-y-0.5 transition-all duration-200 "
      >
        <span class="text-sm">ቀጥል</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-8 pb-16">
      <!-- Page Header -->
      <div class="mb-8 pb-6 border-b border-gray-200 pt-4">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2 leading-tight">{{ pageTitle }}</h1>
            <div class="flex items-center gap-6 text-gray-600 flex-wrap">
              <span class="flex items-center gap-2 text-sm md:text-base">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ readTime }} ደቂቃ ንባብ
              </span>
              <span class="flex items-center gap-2 text-sm md:text-base">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ Math.round(scrollProgress) }}% ተነብቷል
              </span>
            </div>
          </div>
          <div class=" from-blue-500 to-purple-500 text-white rounded-full w-14 h-14 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
            {{ pageId }}
          </div>
        </div>
      </div>
     
      <!-- Page Content -->
      <div 
        ref="contentElement" 
        class="bg-white rounded-xl p-8 shadow-sm mb-8 prose prose-lg max-w-none prose-h1:text-3xl prose-h1:font-bold prose-h1:text-gray-900 prose-h1:mb-6 prose-h1:mt-8 prose-h1:pb-2 prose-h1:border-b prose-h1:border-gray-200 prose-h2:text-2xl prose-h2:font-semibold prose-h2:text-blue-800 prose-h2:mb-4 prose-h2:mt-6 prose-h2:pl-4 prose-h2:border-l-4 prose-h2:border-blue-500 prose-h2:bg-gradient-to-r prose-h2:from-blue-50 prose-h2:to-transparent prose-h2:py-3 prose-h2:rounded-r-lg prose-h3:text-xl prose-h3:font-medium prose-h3:text-gray-700 prose-h3:mb-3 prose-h3:mt-5 prose-p:text-gray-700 prose-p:mb-4 prose-p:text-lg prose-p:leading-relaxed prose-p:text-justify prose-ul:list-none prose-ul:pl-0 prose-ul:mb-6 prose-li:text-gray-700 prose-li:mb-3 prose-li:pl-8 prose-li:relative prose-li:leading-relaxed prose-strong:font-bold prose-strong:text-gray-900 prose-strong:bg-gradient-to-t prose-strong:from-blue-100 prose-strong:via-transparent prose-strong:to-transparent prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-blue-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:rounded-r"
        v-html="formattedContent"
      ></div>
     
      <!-- Desktop Navigation -->
      <div class="hidden md:flex justify-between items-center pt-8 border-t border-gray-200">
        <button
          v-if="pageId > 1"
          @click="goToPage(pageId - 1)"
          class="flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <span>ወደ ገጽ {{ pageId - 1 }}</span>
        </button>
        <div v-else></div>
       
        <button
          v-if="pageId < totalPages"
          @click="goToPage(pageId + 1)"
          class="flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
        >
          <span>ወደ ገጽ {{ pageId + 1 }}</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

interface Emits {
  (e: 'open-drawer'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const route = useRoute()
const router = useRouter()
const contentElement = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)

// Get pageId from route params
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
  return props.pages.length
})

const formattedContent = computed(() => {
  if (!currentPageData.value?.content) return '<p>ይህ ገጽ አሁን ባዶ ነው</p>'
  return marked(currentPageData.value.content)
})

const readTime = computed(() => {
  const content = currentPageData.value?.content || ''
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
})

const goToPage = (pageNumber: number) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    router.push(`/page/${pageNumber}`)
  }
}

// Scroll progress calculation
const calculateScrollProgress = () => {
  if (!contentElement.value) return
  
  const contentRect = contentElement.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const contentHeight = contentRect.height
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const elementTop = contentRect.top + scrollTop
  const elementBottom = elementTop + contentHeight
  
  const scrollDistance = scrollTop - elementTop
  const maxScroll = contentHeight - windowHeight
  
  if (maxScroll <= 0) {
    scrollProgress.value = 100
  } else {
    const progress = Math.min(100, Math.max(0, (scrollDistance / maxScroll) * 100))
    scrollProgress.value = progress
  }
}

// Set up scroll listener
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

<style>
/* Custom bullet points for Ethiopic text */
.prose li::before {
  content: "•";
  color: #3b82f6;
  font-weight: bold;
  position: absolute;
  left: 0;
  font-size: 1.5rem;
  top: -0.1em;
}

/* Responsive improvements */
@media (max-width: 768px) {
  .floating-nav-pill {
    bottom: 1rem;
    padding: 0.25rem;
  }
  
  .pill-button {
    padding: 0.5rem 1rem;
    min-width: 80px;
  }
  
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