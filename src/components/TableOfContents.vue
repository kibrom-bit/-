<template>
  <div class="toc-wrapper">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-black text-slate-900 tracking-tight">የጉባኤ ዝርዝር</h2>
      <span class="text-[10px] bg-slate-100 px-2 py-1 rounded-full font-bold text-slate-500 uppercase">
        {{ pages.length }} ክፍሎች
      </span>
    </div>

    <div class="space-y-4">
      <!-- Manual Pages Group (Collapsible - Default Closed) -->
      <div class="border border-gray-200 rounded-xl overflow-hidden">
        <button 
          @click="toggleManualGroup"
          class="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
              {{ manualPages.length }}
            </div>
            <div class="text-left">
              <h3 class="font-bold text-slate-900 text-sm">የሥራ መመሪያ</h3>
              <p class="text-xs text-slate-500">ክፍል ፩ - ፲፩</p>
            </div>
          </div>
          <svg 
            class="w-5 h-5 text-slate-500 transition-transform duration-300" 
            :class="{ 'rotate-180': isManualGroupOpen }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        
        <!-- Collapsible Content -->
        <transition
          enter-active-class="transition-all duration-300 ease-in-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-[1000px]"
          leave-active-class="transition-all duration-300 ease-in-out"
          leave-from-class="opacity-100 max-h-[1000px]"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-show="isManualGroupOpen" class="border-t border-gray-100 bg-gray-50/50">
            <div class="p-2 space-y-1">
              <div 
                v-for="page in sortedManualPages" 
                :key="page.id"
                @click="handleSelection(page.id)"
                class="group p-2 rounded-lg cursor-pointer transition-all"
                :class="currentPageId === page.id 
                  ? 'bg-blue-100 border-blue-200' 
                  : 'hover:bg-white hover:shadow-sm'"
              >
                <div class="flex items-start gap-3">
                  <div 
                    class="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0"
                    :class="currentPageId === page.id ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'"
                  >
                    {{ page.id }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <h4 class="font-medium text-slate-800 text-xs leading-tight">
                      {{ getManualPageTitle(page) }}
                    </h4>
                    <p class="text-slate-500 text-[10px] line-clamp-1">
                      {{ page.department || getPreview(page.content) }}
                    </p>
                  </div>
                  <svg 
                    v-if="currentPageId === page.id"
                    class="w-3 h-3 text-blue-600 self-center" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Reports & Schedule Section - Dynamic -->
      <div class="border border-gray-200 rounded-xl overflow-hidden">
        <div class="p-4 bg-white">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-green-100 flex items-center justify-center">
              <span class="text-xs font-bold text-purple-700">{{ reportAndSchedulePages.length }}</span>
            </div>
            <h3 class="font-bold text-slate-900 text-sm">ሪፖርት እና መርሐ ግብር</h3>
          </div>
          
          <div class="space-y-2">
            <!-- Dynamic List of All Report and Schedule Pages -->
            <div 
              v-for="page in sortedReportAndSchedulePages" 
              :key="page.id"
              @click="handleReportOrScheduleSelection(page)"
              class="group p-3 rounded-lg cursor-pointer transition-all"
              :class="getReportItemClass(page.id)"
            >
              <div class="flex items-start gap-3">
                <!-- Dynamic icon based on page type or id -->
                <div 
                  class="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0"
                  :class="getReportItemIconClass(page.id)"
                >
                  {{ getPageIcon(page) }}
                </div>
                <div class="min-w-0 flex-1">
                  <h4 class="font-medium text-slate-800 text-xs leading-tight">
                    {{ getPageDisplayTitle(page) }}
                  </h4>
                  <p class="text-slate-500 text-[10px] line-clamp-1">
                    {{ getPageDisplayDescription(page) }}
                  </p>
                </div>
                <svg 
                  v-if="currentPageId === page.id"
                  class="w-3 h-3 text-current self-center" 
                  :class="getCheckmarkColor(page.id)"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Page } from '@/types/document'

interface Props {
  pages: Page[]
  currentPage: number
}

const props = defineProps<Props>()
const emit = defineEmits(['select-page', 'close'])

const route = useRoute()
const router = useRouter()

// Default to closed (false)
const isManualGroupOpen = ref(false)

const toggleManualGroup = () => {
  isManualGroupOpen.value = !isManualGroupOpen.value
}

const manualPages = computed(() => {
  return props.pages.filter(page => page.id <= 11)
})

// Get all report and schedule pages (id > 100)
const reportAndSchedulePages = computed(() => {
  return props.pages.filter(page => page.id > 100)
})

const sortedManualPages = computed(() => {
  return [...manualPages.value].sort((a, b) => a.id - b.id)
})

const sortedReportAndSchedulePages = computed(() => {
  return [...reportAndSchedulePages.value].sort((a, b) => a.id - b.id)
})

const currentPageId = computed(() => {
  if (route.path.includes('/report/')) return 101
  if (route.path.includes('/schedule/')) return 201
  return parseInt(route.params.id as string) || 1
})

const handleSelection = (pageId: number) => {
  emit('select-page', pageId)
  if (pageId <= 11) {
    router.push(`/page/${pageId}`)
  }
  emit('close')
}

// Dynamic handler for report/schedule pages
const handleReportOrScheduleSelection = (page: Page) => {
  emit('select-page', page.id)
  
  // Route based on page id
  if (page.id === 101) {
    router.push('/report/first-semester-2018')
  } else if (page.id === 201) {
    router.push('/schedule/second-semester-2018')
  } else {
    // For future pages, create a generic route
    router.push(`/document/${page.id}`)
  }
  
  emit('close')
}

// Get clean title for manual pages (remove "ገጽ X - " prefix)
const getManualPageTitle = (page: Page): string => {
  return page.title.replace(`ገጽ ${page.id} - `, '')
}

// Get icon for report/schedule page
const getPageIcon = (page: Page): string => {
  if (page.id === 101) return 'ሪ'
  if (page.id === 201) return 'መ'
  
  // For future pages, use first character of title or department
  const firstChar = page.title?.charAt(0) || page.department?.charAt(0) || '📄'
  return firstChar
}

// Get display title from actual page data
const getPageDisplayTitle = (page: Page): string => {
  // Use the actual page title, but you can customize if needed
  return page.title || 'ሰነድ'
}

// Get display description from actual page data
const getPageDisplayDescription = (page: Page): string => {
  // Use department if available, otherwise generate preview from content
  if (page.department) return page.department
  return getPreview(page.content)
}

// Dynamic class for report item based on id
const getReportItemClass = (pageId: number): string => {
  const baseClass = 'hover:bg-gray-50 border border-transparent hover:border-gray-200'
  
  if (pageId === 101) {
    return currentPageId.value === 101
      ? 'bg-purple-50 border border-purple-200'
      : baseClass
  }
  
  if (pageId === 201) {
    return currentPageId.value === 201
      ? 'bg-green-50 border border-green-200'
      : baseClass
  }
  
  // Default style for future pages
  return currentPageId.value === pageId
    ? 'bg-blue-50 border border-blue-200'
    : baseClass
}

// Dynamic icon class
const getReportItemIconClass = (pageId: number): string => {
  if (pageId === 101) {
    return currentPageId.value === 101
      ? 'bg-purple-600 text-white'
      : 'bg-purple-100 text-purple-700'
  }
  
  if (pageId === 201) {
    return currentPageId.value === 201
      ? 'bg-green-600 text-white'
      : 'bg-green-100 text-green-700'
  }
  
  // Default style for future pages
  return currentPageId.value === pageId
    ? 'bg-blue-600 text-white'
    : 'bg-blue-100 text-blue-700'
}

// Checkmark color
const getCheckmarkColor = (pageId: number): string => {
  if (pageId === 101) return 'text-purple-600'
  if (pageId === 201) return 'text-green-600'
  return 'text-blue-600'
}

const getPreview = (content: string): string => {
  if (!content) return ''
  return content
    .replace(/[#*`]/g, '')
    .replace(/\n/g, ' ')
    .trim()
    .substring(0, 60) + '...'
}
</script>

<style scoped>
@reference "tailwindcss";

.toc-wrapper {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.toc-wrapper::-webkit-scrollbar {
  width: 4px;
}

.toc-wrapper::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.max-h-0 {
  max-height: 0;
  overflow: hidden;
}

.max-h-\[1000px\] {
  max-height: 1000px;
}
</style>