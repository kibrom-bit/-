<template>
  <!-- Desktop Sidebar - Always visible on large screens -->
  <div v-show="!isMobileView" class="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-h-[calc(100vh-120px)] overflow-y-auto sticky top-6">
    <!-- Your existing desktop sidebar content -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-xl font-black text-slate-900 tracking-tight">የጉባኤ ዝርዝር</h2>
      <span class="text-[10px] bg-slate-100 px-2 py-1 rounded-full font-bold text-slate-500 uppercase">{{ pages.length }} ክፍሎች</span>
    </div>
    
    <div class="space-y-3">
      <div 
        v-for="page in pages" 
        :key="page.id"
        @click="$emit('select-page', page.id)"
        class="group p-4 rounded-xl cursor-pointer transition-all border border-transparent"
        :class="currentPageId === page.id 
          ? 'bg-blue-50 border-blue-100 shadow-sm' 
          : 'hover:bg-gray-50 hover:border-gray-200'"
      >
        <div class="flex items-start gap-4">
          <div 
            class="rounded-lg w-10 h-10 flex items-center justify-center font-bold shrink-0 transition-transform group-hover:scale-110"
            :class="currentPageId === page.id ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'"
          >
            {{ page.id }}
          </div>
          <div>
            <h3 class="font-bold text-slate-800 text-sm leading-tight mb-1 group-hover:text-blue-600 transition-colors">
              {{ page.title }}
            </h3>
            <p class="text-slate-500 text-xs line-clamp-2 leading-relaxed">
              {{ getPreview(page.content) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Side Drawer (from right side, thin) -->
  <transition name="slide-fade">
    <div 
      v-if="isMobileOpen && isMobileView"
      class="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-white border-l border-gray-200 shadow-xl flex flex-col"
    >
      <!-- Header with close button -->
      <div class="p-4 border-b border-gray-100 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-900 text-white font-serif text-sm">
            መ
          </div>
          <div>
            <h2 class="text-sm font-bold text-slate-900">የጉባኤ ዝርዝር</h2>
            <p class="text-xs text-gray-500">{{ pages.length }} ክፍሎች</p>
          </div>
        </div>
        <button 
          @click="closeDrawer"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-4">
        <div class="space-y-2">
          <div 
            v-for="page in pages" 
            :key="page.id"
            @click="handleMobileSelect(page.id)"
            class="group p-3 rounded-lg cursor-pointer transition-all"
            :class="currentPageId === page.id 
              ? 'bg-blue-50 border border-blue-200' 
              : 'hover:bg-gray-50'"
          >
            <div class="flex items-center gap-3">
              <div 
                class="rounded-lg w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0"
                :class="currentPageId === page.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600'"
              >
                {{ page.id }}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-sm text-slate-800 truncate">
                  {{ page.title }}
                </h3>
                <p class="text-xs text-gray-500 truncate">
                  {{ getPreview(page.content) }}
                </p>
              </div>
              <svg 
                v-if="currentPageId === page.id"
                class="w-4 h-4 text-blue-500" 
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

      <!-- Footer -->
      <div class="p-4 border-t border-gray-100">
        <div class="text-xs text-gray-500 text-center">
          የሥራ አስፈጻሚ መግለጫ
        </div>
      </div>
    </div>
  </transition>

  <!-- Backdrop for mobile drawer -->
  <transition name="fade">
    <div 
      v-if="isMobileOpen && isMobileView"
      @click="closeDrawer"
      class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
    ></div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Page } from '@/types/document'

interface Props {
  pages: Page[]
  isOpen?: boolean // Control from parent
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false
})

const emit = defineEmits(['select-page', 'close'])

const route = useRoute()
const isMobileOpen = ref(props.isOpen)
const isMobileView = ref(false)

// Watch for prop changes from parent
watch(() => props.isOpen, (newVal) => {
  isMobileOpen.value = newVal
})

// Check if we're on mobile view
const checkViewport = () => {
  isMobileView.value = window.innerWidth < 1024 // lg breakpoint
}

const currentPageId = computed(() => {
  return parseInt(route.params.id as string) || 1
})

const openDrawer = () => {
  isMobileOpen.value = true
  // Prevent body scroll when drawer is open on mobile
  if (isMobileView.value) {
    document.body.style.overflow = 'hidden'
  }
}

const closeDrawer = () => {
  isMobileOpen.value = false
  emit('close')
  // Restore body scroll
  document.body.style.overflow = ''
}

const handleMobileSelect = (pageId: number) => {
  emit('select-page', pageId)
  closeDrawer()
}

const getPreview = (content: string): string => {
  return content.replace(/#/g, '').replace(/\n/g, ' ').substring(0, 60) + '...'
}

// Setup resize listener
onMounted(() => {
  checkViewport()
  window.addEventListener('resize', checkViewport)
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('resize', checkViewport)
  // Ensure body scroll is restored
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Slide animation for mobile drawer */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Fade animation for backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hide scrollbar for cleaner look */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>