<template>
  <div class="w-full bg-white border-b border-slate-100 no-print">
    
    <header class="w-full h-14 flex items-center justify-center">
      <div class="max-w-6xl w-full px-6 flex items-center justify-between">
        
        <div class="flex items-center gap-3">
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
        </div>

        <div class="flex items-center gap-6">
          <nav class="hidden md:flex items-center gap-8">
            <router-link to="/" class="nav-link">መነሻ</router-link>
            <router-link to="/about" class="nav-link">ስለ እኛ</router-link>
          </nav>

          <!-- Toggle Sidebar Button -->
          <button 
            @click="toggleSidebar"
            class="group flex items-center gap-2 h-8 px-4 rounded-full border border-slate-200 text-slate-900 hover:bg-slate-950 hover:text-white transition-all duration-300"
            :class="isSidebarOpen ? 'bg-slate-950 text-white' : ''"
          >
            <div class="flex flex-col items-end">
              <!-- Animated hamburger menu -->
              <span 
                class="w-4  bg-current transition-all duration-300"
                :class="isSidebarOpen ? 'rotate-45 ' : ''"
              ></span>
              <span 
                class="w-4 bg-current transition-all duration-300"
                :class="isSidebarOpen ? 'opacity-0' : ''"
              ></span>
              <span 
                class="w-3 bg-current transition-all duration-300 group-hover:w-4"
                :class="isSidebarOpen ? '-rotate-45  w-4' : ''"
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// Emit events for parent component
const emit = defineEmits(['toggle-sidebar', 'sidebar-change'])

// Local state for sidebar
const isSidebarOpen = ref(false)


const toggleSidebar = () => {
  // Always toggle the drawer regardless of screen size
  isSidebarOpen.value = !isSidebarOpen.value
  emit('toggle-sidebar', isSidebarOpen.value)
  emit('sidebar-change', isSidebarOpen.value)
}

// Optional: Sync with parent if parent controls state
const props = defineProps<{
  sidebarOpen?: boolean
}>()

// Watch for prop changes from parent
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

/* Subtle dot indicator on hover */
.nav-link::after {
  content: '';
  @apply absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 -translate-x-1/2 rounded-full;
}

.nav-link:hover::after {
  @apply w-1;
}

/* Animation for hamburger menu */
.rotate-45 {
  transform: rotate(45deg);
}

.-rotate-45 {
  transform: rotate(-45deg);
}

.translate-y-\[3px\] {
  transform: translateY(3px);
}

.-translate-y-\[3px\] {
  transform: translateY(-3px);
}

@media print {
  .no-print {
    display: none !important;
  }
}
</style>