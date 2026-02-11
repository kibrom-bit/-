<template>
  <div id="app" class="min-h-screen bg-gray-50 font-sans selection:bg-blue-100">
    <Header 
      :sidebar-open="showTOC" 
      @toggle-sidebar="toggleTOC" 
      @sidebar-change="handleSidebarChange"
    />
    
    <div class="no-print pb-16">
      <div class="container mx-auto px-4 py-4 md:py-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <aside 
            v-if="showTOC"
            class="lg:col-span-3 transition-all duration-300 hidden lg:block"
          >
            <TableOfContents 
              :pages="pages" 
              :currentPage="currentPage"
              @select-page="goToPage"
              class="sticky top-4 bg-white rounded-lg shadow-sm border border-gray-100 p-4"
            />
          </aside>
          
          <main :class="['transition-all duration-300', (showTOC && !isMobile) ? 'lg:col-span-9' : 'lg:col-span-12']">
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <router-view 
                :pages="pages"
                @page-change="handlePageChange"
              />
            </div>
          </main>
        </div>
      </div>
    </div>

    <!-- Mobile TOC Drawer -->
    <transition name="slide">
      <div 
        v-if="showTOC && isMobile"
        class="lg:hidden fixed inset-y-0 left-0 z-[100] w-[280px] bg-white shadow-2xl flex flex-col"
      >
        <div class="p-4 flex justify-between items-center border-b border-gray-100 bg-slate-50">
          <h2 class="text-lg font-bold text-slate-900">የጉባኤ ዝርዝር</h2>
          <button @click="toggleTOC" class="p-2 text-gray-500 hover:bg-gray-200 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="px-6 py-4 flex flex-col gap-4 border-b border-slate-100 bg-white">
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ዋና ዋና ገጾች</p>
          <div class="flex flex-col gap-3">
            <router-link 
              to="/" 
              @click="toggleTOC"
              class="flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              መነሻ (Home)
            </router-link>
            <router-link 
              to="/about" 
              @click="toggleTOC"
              class="flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              ስለ እኛ (About)
            </router-link>
          </div>
        </div>
        
        <div class="flex-grow overflow-y-auto p-4">
          <p class="px-2 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">የመመሪያው ዝርዝር</p>
          <TableOfContents 
            :pages="pages" 
            :currentPage="currentPage"
            @select-page="goToPage"
          />
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div 
        v-if="showTOC && isMobile"
        @click="toggleTOC"
        class="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm"
      ></div>
    </transition>

<div class="hidden print:block bg-white text-black p-8">
  <div v-for="page in sortedPages" :key="page.id" class="print-page mb-12 pb-12" :class="{ 'page-break': page.id !== sortedPages[sortedPages.length - 1]?.id }">
    <div class="flex justify-between items-end border-b-2 border-slate-900 pb-2 mb-6">
      <div class="font-black text-[10px] uppercase tracking-tighter">የእንዳ ኢየሱስ ግቢ ጉባኤ - የሥራ አስፈጻሚ መመሪያ 2018 ዓ.ም</div>
      <div class="font-serif italic text-xs">ገጽ {{ getPageNumber(page.id) }} / 13</div>
    </div>
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-slate-900 leading-tight">{{ page.title }}</h1>
      <div class="content-box" v-html="renderMarkdown(page.content)"></div>
    </div>
  </div>
</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'
import TableOfContents from './components/TableOfContents.vue'
import { manualPages } from '@/documents/manual/pages'
import { firstSemesterReport2018 } from '@/documents/reports/firstSemester2018'
import { secondSemesterSchedule2018 } from '@/documents/schedules/secondSemester2018'
import { marked } from 'marked'

const router = useRouter()
const showTOC = ref(false)
const currentPage = ref(1)
const isMobile = ref(false)

// Create a single pages array with ALL documents (13 pages total)
const pages = ref([
  // Manual pages (1-11)
  ...manualPages,
  // Report page (101)
  {
    id: 101,
    title: firstSemesterReport2018.title,
    content: firstSemesterReport2018.content,
    department: 'ሪፖርት'
  },
  // Schedule page (201)
  {
    id: 201,
    title: secondSemesterSchedule2018.title,
    content: secondSemesterSchedule2018.content,
    department: 'መርሐ ግብር'
  }
])

// Sort pages by ID for consistent ordering
const sortedPages = computed(() => {
  return [...pages.value].sort((a, b) => {
    // Manual pages first (1-11), then report (101), then schedule (201)
    if (a.id <= 11 && b.id <= 11) return a.id - b.id
    if (a.id <= 11) return -1
    if (b.id <= 11) return 1
    return a.id - b.id
  })
})

// Get sequential page number for PDF (1-13)
const getPageNumber = (id: number) => {
  const index = sortedPages.value.findIndex(p => p.id === id)
  return index + 1
}

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true
})

const renderMarkdown = (text: string) => {
  if (!text) return ''
  return marked.parse(text)
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
  if (!isMobile.value) {
    showTOC.value = true
  }
}

const toggleTOC = () => {
  showTOC.value = !showTOC.value
}

const handleSidebarChange = (isOpen: boolean) => {
  showTOC.value = isOpen
}

const goToPage = (pageId: number) => {
  currentPage.value = pageId
  if (pageId <= 11) {
    router.push(`/page/${pageId}`)
  } else if (pageId === 101) {
    router.push('/report/first-semester-2018')
  } else if (pageId === 201) {
    router.push('/schedule/second-semester-2018')
  }
  if (isMobile.value) {
    showTOC.value = false
  }
}

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  const path = router.currentRoute.value.path
  if (path.includes('/page/')) {
    const routePage = parseInt(router.currentRoute.value.params.id as string) || 1
    currentPage.value = routePage
  } else if (path.includes('/report/')) {
    currentPage.value = 101
  } else if (path.includes('/schedule/')) {
    currentPage.value = 201
  }
  
  showTOC.value = !isMobile.value
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  document.body.style.overflow = ''
})

watch(showTOC, (val) => {
  if (isMobile.value && val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

watch(() => router.currentRoute.value.path, (path) => {
  if (path === '/') {
    currentPage.value = 0
  } else if (path.includes('/page/')) {
    const pageId = parseInt(router.currentRoute.value.params.id as string) || 1
    currentPage.value = pageId
  } else if (path.includes('/report/')) {
    currentPage.value = 101
  } else if (path.includes('/schedule/')) {
    currentPage.value = 201
  }
})
</script>

<style>
@reference "tailwindcss";

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.content-box {
  font-family: 'Noto Sans Ethiopic', 'Abyssinica SIL', sans-serif;
  line-height: 1.8;
  color: #334155;
}

.content-box h2 {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #0f172a;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.content-box h3 {
  display: block;
  font-size: 1.35rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #1e293b;
}

.content-box p {
  margin-bottom: 1.25rem;
  text-align: justify;
}

.content-box ol {
  list-style-type: decimal;
  margin-left: 2rem;
  margin-bottom: 1.25rem;
}

.content-box ul {
  list-style-type: disc;
  margin-left: 2rem;
  margin-bottom: 1.25rem;
}

.content-box li {
  margin-bottom: 0.5rem;
}

@media print {
  body {
    background-color: white !important;
  }

  .print-page {
    page-break-after: always;
    padding: 1rem 0;
  }

  .page-break {
    page-break-after: always;
  }

  .content-box {
    font-size: 12pt !important;
    color: black !important;
    line-height: 1.6 !important;
  }

  .content-box h2 {
    font-size: 20pt !important;
    border-bottom: 1pt solid #000 !important;
    margin-top: 25pt !important;
    color: black !important;
    page-break-after: avoid;
  }

  .content-box h3 {
    font-size: 16pt !important;
    margin-top: 18pt !important;
    color: black !important;
    page-break-after: avoid;
  }
  
  li {
    page-break-inside: avoid;
  }
}

@media (max-width: 768px) {
  .content-box h2 {
    font-size: 1.4rem;
  }
  .content-box h3 {
    font-size: 1.2rem;
  }
}
</style>