<template>
  <div class="toc-wrapper">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-black text-slate-900 tracking-tight">የጉባኤ ዝርዝር</h2>
      <span class="text-[10px] bg-slate-100 px-2 py-1 rounded-full font-bold text-slate-500 uppercase">
        {{ pages.length }} ክፍሎች
      </span>
    </div>

    <div class="space-y-2 md:space-y-3">
      <!-- Manual Pages (1-11) -->
      <div 
        v-for="page in manualPages" 
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
              {{ page.department || getPreview(page.content) }}
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

      <!-- Divider -->
      <div class="border-t border-gray-200 my-4 pt-4">
        <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">ሪፖርት እና መርሐ ግብር</p>
      </div>

      <!-- Report Page (101) -->
      <div 
        @click="handleReportSelection"
        class="group p-3 md:p-4 rounded-xl cursor-pointer transition-all border border-transparent"
        :class="currentPageId === 101
          ? 'bg-purple-50 border-purple-100 shadow-sm' 
          : 'hover:bg-gray-50 hover:border-gray-200'"
      >
        <div class="flex items-start gap-3 md:gap-4">
          <div 
            class="rounded-lg w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold shrink-0 transition-transform group-hover:scale-110"
            :class="currentPageId === 101 ? 'bg-purple-600 text-white shadow-md' : 'bg-purple-100 text-purple-700'"
          >
            ሪ
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="font-bold text-slate-800 text-sm leading-tight mb-1 transition-colors group-hover:text-purple-600">
              የ2018 ዓ.ም የመጀመሪያ ሴሚስተር ሪፖርት
            </h3>
            <p class="text-slate-500 text-xs line-clamp-1">
              በዲያቆን መድሃንዬ ነጋሽ - 18/05/2018 ዓ.ም
            </p>
          </div>
        </div>
      </div>

      <!-- Schedule Page (201) -->
      <div 
        @click="handleScheduleSelection"
        class="group p-3 md:p-4 rounded-xl cursor-pointer transition-all border border-transparent"
        :class="currentPageId === 201
          ? 'bg-green-50 border-green-100 shadow-sm' 
          : 'hover:bg-gray-50 hover:border-gray-200'"
      >
        <div class="flex items-start gap-3 md:gap-4">
          <div 
            class="rounded-lg w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold shrink-0 transition-transform group-hover:scale-110"
            :class="currentPageId === 201 ? 'bg-green-600 text-white shadow-md' : 'bg-green-100 text-green-700'"
          >
            መ
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="font-bold text-slate-800 text-sm leading-tight mb-1 transition-colors group-hover:text-green-600">
              የሁለተኛ ሴሚስተር አጠቃላይ የግዜ ሰሌዳ
            </h3>
            <p class="text-slate-500 text-xs line-clamp-1">
              33 የተግባራት ዝርዝር - የካቲት እስከ ግንቦት 2018 ዓ.ም
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

const manualPages = computed(() => {
  return props.pages.filter(page => page.id <= 11)
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
}

.toc-wrapper::-webkit-scrollbar {
  width: 4px;
}

.toc-wrapper::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>