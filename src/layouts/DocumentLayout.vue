<template>
  <div class="min-h-screen bg-gray-50 relative font-['Noto_Sans_Ethiopic']">
    <!-- Progress Bar -->
    <div 
      class="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transition-all duration-200 shadow-lg shadow-blue-500/30"
      :style="{ width: scrollProgress + '%' }"
    ></div>

    <!-- Header spacer -->
    <div class="h-14"></div>
    
    <!-- Changed: removed max-w-4xl and reduced padding -->
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
      <!-- Page Header -->
      <div class="mb-6 pb-4 border-b border-gray-200 max-w-4xl mx-auto"> <!-- Added max-w-4xl only to header -->
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2 leading-tight">{{ title }}</h1>
            <slot name="header-actions"></slot>
          </div>
          <div class="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/20">
            {{ pageId }}
          </div>
        </div>
      </div>
     
      <!-- Page Content - Full width table container -->
      <div ref="contentElement" class="bg-white rounded-xl shadow-sm w-full">
        <div class="p-4 md:p-6 content-box w-full overflow-x-auto"> <!-- Added overflow-x-auto for tables -->
          <slot></slot>
        </div>
      </div>
    </div>
    
    <!-- Floating Navigation -->
    <NavigationPill 
      :current-page="pageId"
      :total-pages="totalPages"
      @prev-page="goToPrevPage"
      @next-page="goToNextPage"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import NavigationPill from '@/components/shared/NavigationPill.vue'
import { useScrollProgress } from '@/composables/useScrollProgress'

const props = defineProps<{
  title: string
  pageId: number
  totalPages: number
}>()

const router = useRouter()
const contentElement = ref<HTMLElement | null>(null)
const { scrollProgress } = useScrollProgress(contentElement)

const goToPrevPage = () => {
  if (props.pageId > 1) {
    router.push(`/page/${props.pageId - 1}`)
  }
}

const goToNextPage = () => {
  if (props.pageId < props.totalPages) {
    router.push(`/page/${props.pageId + 1}`)
  }
}
</script>

<style scoped>
.content-box :deep(h2) {
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #0f172a;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.content-box :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #1e40af;
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  background: linear-gradient(to right, #eff6ff, transparent);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

.content-box :deep(p) {
  margin-bottom: 1.25rem;
  line-height: 1.8;
  color: #334155;
  text-align: justify;
}

.content-box :deep(ul) {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.content-box :deep(ol) {
  list-style-type: decimal;
  margin-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.content-box :deep(li) {
  margin-bottom: 0.5rem;
  color: #334155;
}

.content-box :deep(blockquote) {
  border-left: 4px solid #93c5fd;
  padding-left: 1rem;
  font-style: italic;
  color: #4b5563;
  margin: 1.5rem 0;
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
}

.content-box :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.content-box :deep(th) {
  background-color: #f9fafb;
  font-weight: 600;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.content-box :deep(td) {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
}

.content-box :deep(a) {
  color: #2563eb;
  text-decoration: none;
}

.content-box :deep(a:hover) {
  text-decoration: underline;
}

.content-box :deep(strong) {
  font-weight: 700;
  color: #0f172a;
}

.content-box :deep(em) {
  font-style: italic;
}

.content-box :deep(code) {
  font-family: monospace;
  background-color: #f1f5f9;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.content-box :deep(pre) {
  background-color: #0f172a;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.content-box :deep(pre code) {
  background-color: transparent;
  color: inherit;
  padding: 0;
  border-radius: 0;
}
</style>