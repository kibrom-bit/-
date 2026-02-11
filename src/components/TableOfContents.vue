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
        
        <!-- Collapsible Content - Closed by Default -->
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
                      {{ page.title.replace('ገጽ ' + page.id + ' - ', '') }}
                    </h4>
                    <p class="text-slate-500 text-[10px] line-clamp-1">
                      {{ page.department }}
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

      <!-- Reports & Schedule Section -->
      <div class="border border-gray-200 rounded-xl overflow-hidden">
        <div class="p-4 bg-white">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-green-100 flex items-center justify-center">
              <span class="text-xs font-bold text-purple-700">ሪ/መ</span>
            </div>
            <h3 class="font-bold text-slate-900 text-sm">ሪፖርት እና መርሐ ግብር</h3>
          </div>
          
          <div class="space-y-2">
            <!-- Report Page (101) -->
            <div 
              @click="handleReportSelection"
              class="group p-3 rounded-lg cursor-pointer transition-all"
              :class="currentPageId === 101
                ? 'bg-purple-50 border border-purple-200' 
                : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'"
            >
              <div class="flex items-start gap-3">
                <div 
                  class="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0"
                  :class="currentPageId === 101 ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700'"
                >
                  ሪ
                </div>
                <div class="min-w-0 flex-1">
                  <h4 class="font-medium text-slate-800 text-xs leading-tight">
                    የመጀመሪያ ሴሚስተር ሪፖርት
                  </h4>
                  <p class="text-slate-500 text-[10px] line-clamp-1">
                    2018 ዓ.ም - ዲያቆን መድሃንዬ ነጋሽ
                  </p>
                </div>
                <svg 
                  v-if="currentPageId === 101"
                  class="w-3 h-3 text-purple-600 self-center" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>

            <!-- Schedule Page (201) -->
            <div 
              @click="handleScheduleSelection"
              class="group p-3 rounded-lg cursor-pointer transition-all"
              :class="currentPageId === 201
                ? 'bg-green-50 border border-green-200' 
                : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'"
            >
              <div class="flex items-start gap-3">
                <div 
                  class="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0"
                  :class="currentPageId === 201 ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'"
                >
                  መ
                </div>
                <div class="min-w-0 flex-1">
                  <h4 class="font-medium text-slate-800 text-xs leading-tight">
                    የሁለተኛ ሴሚስተር መርሐ ግብር
                  </h4>
                  <p class="text-slate-500 text-[10px] line-clamp-1">
                    33 ተግባራት - የካቲት እስከ ግንቦት 2018 ዓ.ም
                  </p>
                </div>
                <svg 
                  v-if="currentPageId === 201"
                  class="w-3 h-3 text-green-600 self-center" 
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

const sortedManualPages = computed(() => {
  return [...manualPages.value].sort((a, b) => a.id - b.id)
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

const handleReportSelection = () => {
  emit('select-page', 101)
  router.push('/report/first-semester-2018')
  emit('close')
}

const handleScheduleSelection = () => {
  emit('select-page', 201)
  router.push('/schedule/second-semester-2018')
  emit('close')
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