<template>
  <div 
    :class="[
      'w-full bg-white/80 backdrop-blur-md border-b border-slate-100 no-print fixed top-0 z-50 transition-transform duration-300 ease-in-out',
      isVisible ? 'translate-y-0' : '-translate-y-full'
    ]"
  >
    <header class="w-full h-14 flex items-center justify-center">
      <div class="max-w-6xl w-full px-6 flex items-center justify-between">
        
        <div class="flex items-center gap-3">
          <router-link to="/" class="flex items-center gap-3">
            <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-900 text-white font-serif text-sm">
              መ
            </div>
            <div class="flex flex-col">
              <h1 class="text-xs font-bold text-slate-900 tracking-tight leading-none">
                እንዳ ኢየሱስ ግቢ ጉባኤ
              </h1>
              <span class="text-[8px] uppercase tracking-widest text-slate-400 font-medium mt-0.5">
                Manual 2018 ዓ.ም
              </span>
            </div>
          </router-link>
        </div>

        <div class="flex items-center gap-6">
          <nav class="hidden md:flex items-center gap-8">
            <router-link to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">መነሻ</router-link>
            <router-link to="/about" class="nav-link" :class="{ 'active': $route.path === '/about' }">ስለ እኛ</router-link>
            <router-link to="/report/first-semester-2018" class="nav-link" :class="{ 'active': $route.path.includes('/report') }">ሪፖርት</router-link>
            <router-link to="/schedule/second-semester-2018" class="nav-link" :class="{ 'active': $route.path.includes('/schedule') }">መርሐ ግብር</router-link>
          </nav>

<button 
  @click="toggleSidebar"
  class="group flex items-center gap-2 h-8 px-4 rounded-full border border-slate-200 text-slate-900 hover:bg-slate-950 hover:text-white transition-all duration-300"
  :class="isSidebarOpen ? 'bg-slate-950 text-white' : ''"
>
  <div class="flex flex-col items-end">
    <span 
      class="w-4 h-0.5 bg-current transition-all duration-300"
      :class="isSidebarOpen ? 'rotate-45 translate-y-[1.5px]' : ''"
    ></span>
    <span 
      class="w-4 h-0.5 bg-current my-0.5 transition-all duration-300"
      :class="isSidebarOpen ? 'opacity-0' : ''"
    ></span>
    <span 
      class="w-3 h-0.5 bg-current transition-all duration-300 group-hover:w-4"
      :class="isSidebarOpen ? '-rotate-45 -translate-y-[1.5px] w-4' : ''"
    ></span>
  </div>
  <span class="text-[10px] font-bold uppercase tracking-widest">
    {{ isSidebarOpen ? 'መዝጋት' : 'ማውጫ' }}
  </span>
</button>
        </div>
      </div>
    </header>
  </div>

  <div class="h-14 no-print"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const emit = defineEmits(['toggle-sidebar'])
const props = defineProps<{ sidebarOpen?: boolean }>()

const isSidebarOpen = ref(false)
const isVisible = ref(true)
const lastScrollPosition = ref(0)

const handleScroll = () => {
  const currentScrollPosition = window.scrollY || document.documentElement.scrollTop
  
  if (currentScrollPosition < 0) return
  if (currentScrollPosition < 60) {
    isVisible.value = true
    lastScrollPosition.value = currentScrollPosition
    return
  }

  if (currentScrollPosition > lastScrollPosition.value) {
    isVisible.value = false
  } else {
    isVisible.value = true
  }

  lastScrollPosition.value = currentScrollPosition
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  emit('toggle-sidebar', isSidebarOpen.value)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(() => props.sidebarOpen, (newVal) => {
  if (newVal !== undefined) {
    isSidebarOpen.value = newVal
  }
})
</script>

<style scoped>
@reference "tailwindcss";
.nav-link {
  @apply text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors relative;
}

.nav-link::after {
  content: '';
  @apply absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 -translate-x-1/2 rounded-full;
}

.nav-link:hover::after,
.nav-link.active::after {
  @apply w-1;
}

.nav-link.active {
  @apply text-slate-900;
}

@media print {
  .no-print {
    display: none !important;
  }
}
</style>