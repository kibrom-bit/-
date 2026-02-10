<template>
  <div class="toc-wrapper">
    <div v-if="!isMobileView" class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-black text-slate-900 tracking-tight">የጉባኤ ዝርዝር</h2>
      <span class="text-[10px] bg-slate-100 px-2 py-1 rounded-full font-bold text-slate-500 uppercase">
        {{ pages.length }} ክፍሎች
      </span>
    </div>

    <div class="space-y-2 md:space-y-3">
      <div 
        v-for="page in pages" 
        :key="page.id"
        @click="handleSelection(page.id)"
        class="group p-3 md:p-4 rounded-xl cursor-pointer transition-all border border-transparent"
        :class="currentPageId === page.id 
          ? 'bg-blue-50 border-blue-100 shadow-sm' 
          : 'hover:bg-gray-50 hover:border-gray-200'"
      >
        <div class="flex items-start gap-3 md:gap-4">
          <div 
            class="rounded-lg w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold shrink-0 transition-transform group-hover:scale-110"
            :class="currentPageId === page.id ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'"
          >
            {{ page.id }}
          </div>

          <div class="min-w-0 flex-1">
            <h3 
              class="font-bold text-slate-800 text-sm leading-tight mb-1 transition-colors group-hover:text-blue-600 truncate"
            >
              {{ page.title }}
            </h3>
            <p class="text-slate-500 text-xs line-clamp-1 md:line-clamp-2 leading-relaxed">
              {{ getPreview(page.content) }}
            </p>
          </div>

          <svg 
            v-if="currentPageId === page.id"
            class="w-4 h-4 text-blue-500 self-center" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

interface Page {
  id: number
  title: string
  content: string
}

interface Props {
  pages: Page[]
}

const props = defineProps<Props>()
const emit = defineEmits(['select-page', 'close'])

const route = useRoute()
const isMobileView = ref(false)

// 1. Sync with URL to highlight the correct page
const currentPageId = computed(() => {
  return parseInt(route.params.id as string) || 1
})

// 2. Handle selection and notify parent to close drawer
const handleSelection = (pageId: number) => {
  emit('select-page', pageId)
  // We emit 'close' so App.vue knows to hide the mobile overlay
  emit('close')
}

// 3. Clean text for preview
const getPreview = (content: string): string => {
  if (!content) return ''
  return content
    .replace(/[#*`]/g, '') // Remove Markdown symbols
    .replace(/\n/g, ' ')   // Remove newlines
    .trim()
    .substring(0, 60) + '...'
}

// 4. Viewport Logic
const updateViewport = () => {
  isMobileView.value = window.innerWidth < 1024
}

onMounted(() => {
  updateViewport()
  window.addEventListener('resize', updateViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateViewport)
})
</script>

<style scoped>
/* Custom Scrollbar for the list */
.toc-wrapper {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
}

.toc-wrapper::-webkit-scrollbar {
  width: 4px;
}

.toc-wrapper::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

/* Ensure smooth text truncation */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>