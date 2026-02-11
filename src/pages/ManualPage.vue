<template>
  <DocumentLayout :title="pageTitle" :page-id="pageId" :total-pages="11">
    <template #header-actions>
      <div class="flex items-center gap-3 mt-2">
        <span class="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-bold">
          {{ currentPageData?.department || 'የሥራ መመሪያ' }}
        </span>
        <span class="text-xs text-gray-500">
          የሚፈጅ ጊዜ: {{ readTime }} ደቂቃ
        </span>
      </div>
    </template>
    
    <div 
      ref="contentElement" 
      class="prose prose-lg max-w-none"
      v-html="formattedContent"
    ></div>
  </DocumentLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import DocumentLayout from '@/layouts/DocumentLayout.vue'
import { manualPages } from '@/documents/manual/pages'
import { renderMarkdown } from '@/utils/markdown'

const route = useRoute()
const contentElement = ref<HTMLElement | null>(null)

const pageId = computed(() => {
  return parseInt(route.params.id as string) || 1
})

const currentPageData = computed(() => {
  return manualPages.find(page => page.id === pageId.value)
})

const pageTitle = computed(() => {
  return currentPageData.value?.title || 'ገጽ አልተገኘም'
})

const readTime = computed(() => {
  const content = currentPageData.value?.content || ''
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
})

const formattedContent = computed(() => {
  if (!currentPageData.value?.content) {
    return '<p class="text-gray-500 italic">ይህ ገጽ አሁን ባዶ ነው</p>'
  }
  
  return renderMarkdown(currentPageData.value.content)
})
</script>