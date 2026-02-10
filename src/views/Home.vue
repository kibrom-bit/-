<script setup lang="ts">
import { ref } from 'vue'

const isDownloading = ref(false)

const downloadPDF = async () => {
  isDownloading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  window.print()
  isDownloading.value = false
}

// Full department mapping based on your 11-page document
const departments = [
  { id: 1, title: 'ጠቅላላ ጉባኤ', tag: 'Governance', desc: 'የሥራ አስፈጻሚ አባላትን መምረጥና አጠቃላይ የሥራ ሂደቱን መገምገም፡', span: 'col-span-12 lg:col-span-8', theme: 'dark' },
  { id: 2, title: 'የሥራ አስፈጻሚ ጽ/ቤት', tag: 'Leadership', desc: 'የግቢ ጉባኤውን ሥራ በበላይነት መምራትና ዕቅዶችን ማዘጋጀት፡', span: 'col-span-12 lg:col-span-4', theme: 'light' },
  { id: 3, title: 'የትምህርት ክፍል', tag: 'Education', desc: 'መደበኛ የትምህርት መርሐግብራትንና ሥርዓተ ትምህርትን ማስተባበር፡', span: 'col-span-12 lg:col-span-6', theme: 'light' },
  { id: 4, title: 'መዝሙርና ሥነ-ጥበባት', tag: 'Arts', desc: 'የመዝሙር፣ የሥነ-ጽሑፍና የሥነ-ስዕል አገልግሎቶችን መከታተል፡', span: 'col-span-12 lg:col-span-6', theme: 'light' },
  { id: 5, title: 'የልማት ክፍል', tag: 'Development', desc: 'የገቢ ማስገኛ መርሐግብራትንና ቋሚ የልማት ተቋማትን ማስተዳደር፡', span: 'col-span-12 lg:col-span-4', theme: 'bordered' },
  { id: 6, title: 'ሒሳብና ንብረት', tag: 'Finance', desc: 'የገቢና ወጪ ሰነዶችን መያዝ፣ በጀትንና ንብረትን መቆጣጠር፡', span: 'col-span-12 lg:col-span-4', theme: 'bordered' },
  { id: 7, title: 'የአባላት ጉዳይ', tag: 'Members', desc: 'የአባላት መረጃ፣ የንስሐና ምክር አገልግሎትን ማመቻቸት፡', span: 'col-span-12 lg:col-span-4', theme: 'bordered' },
  { id: 8, title: 'ባች ማስተባበሪያ', tag: 'Coordination', desc: 'ተማሪዎችን በባች ማደራጀትና የቅስቀሳ ሥራዎችን ማከናወን፡', span: 'col-span-12 lg:col-span-5', theme: 'light' },
  { id: 9, title: 'የሞያ አገልግሎት', tag: 'Professional', desc: 'አባላት በሞያቸው ቤተ ክርስቲያንን እንዲያገለግሉ ሁኔታዎችን ማመቻቸት፡', span: 'col-span-12 lg:col-span-7', theme: 'light' },
  { id: 10, title: 'ሳንሱርና መርሐ ግብር', tag: 'Quality', desc: 'ትምህርቶችን መመርመርና ለመርሐ ግብሮች አዳራሾችን ማዘጋጀት፡', span: 'col-span-12 lg:col-span-6', theme: 'light' },
  { id: 11, title: 'ኦዲትና ኢንስፔክሽን', tag: 'Oversight', desc: 'የሒሳብ አሠራርና የክፍሎችን የሥራ እንቅስቃሴ መቆጣጠር፡', span: 'col-span-12 lg:col-span-6', theme: 'dark-blue' },
]
</script>

<template>
  <div class="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-blue-100 font-sans">
    <div class=" mx-auto px-6 lg:px-20 py-12">
      
      <section class="relative flex flex-col lg:flex-row gap-16 items-end mb-24">
        <div class="lg:w-2/3 border-l-4 border-slate-900 pl-8 md:pl-16 py-4">
          <div class="flex items-center gap-4 mb-8">
            <span class="text-[10px] tracking-[0.4em] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded">
               2018 ዓ.ም
            </span>
          </div>
          
          <h1 class="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8">
            የሥራ <br/>
            <span class="text-slate-300 italic font-light font-serif">አስፈጻሚ</span> <br/>
            መመሪያ
          </h1>
          
          <p class="text-xl md:text-2xl text-slate-500 max-w-lg font-light leading-relaxed">
            ይህ የስራ መመርያ ፤ በእንዳ ኢየሱስ ግቢ ጉባኤ ሥር
የሚገኙ የአገልግሎት ክፍሎች፣ ንዑሳን ክፍሎችና አመራሮች የተጣለባቸውን አደራ በታማኝነትና በዕውቀት
ይወጡ ዘንድ የተዘጋጀ ነው። 
          </p>
        </div>

        <div class="lg:w-1/2 w-full no-print">
          <div class="flex flex-col gap-4">
            <router-link to="/page/1" class="editorial-btn-primary">
              <span>ንባብ ይጀምሩ</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </router-link>
            
            <button @click="downloadPDF" :disabled="isDownloading" class="editorial-btn-secondary">
              <span v-if="isDownloading" class="animate-pulse">Processing Document...</span>
              <span v-else>Download Full PDF Archive</span>
            </button>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-12 gap-6 lg:gap-8">
        
        <template v-for="dept in departments" :key="dept.id">
          <router-link 
            :to="`/page/${dept.id}`" 
            :class="[dept.span, 'editorial-card group transition-all duration-500']"
          >
            <div v-if="dept.theme === 'dark'" class="bg-slate-900 text-white p-10 flex flex-col justify-between h-full ">
              <div class="space-y-4">
                <div class="w-12 h-1 bg-blue-500"></div>
                <h2 class="text-4xl font-bold">{{ dept.title }}</h2>
                <p class="text-slate-400 max-w-sm">{{ dept.desc }}</p>
              </div>
              <div class="flex justify-between items-end pt-8">
                <span class="text-xs tracking-[0.3em] uppercase font-bold text-blue-400 group-hover:pl-4 transition-all">{{ dept.tag }}</span>
                <span class="text-4xl font-serif text-slate-800">{{ dept.id < 10 ? '0' + dept.id : dept.id }}</span>
              </div>
            </div>

            <div v-else-if="dept.theme === 'light'" class="bg-white border border-slate-100 p-10 flex flex-col justify-between h-full ">
              <div>
                <span class="text-blue-600 font-mono text-sm mb-4 block">{{ dept.tag }}</span>
                <h2 class="text-3xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{{ dept.title }}</h2>
                <p class="text-slate-500 max-w-sm">{{ dept.desc }}</p>
              </div>
              <div class="flex items-end justify-between">
                <div class="text-5xl font-serif text-slate-50 group-hover:text-blue-50 transition-colors">{{ dept.title.split(' ')[0] }}</div>
                <div class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  →
                </div>
              </div>
            </div>

            <div v-else-if="dept.theme === 'bordered'" class="border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-white p-10 flex flex-col justify-between h-full ">
              <div>
                <h2 class="text-2xl font-bold mb-2">{{ dept.title }}</h2>
                <p class="text-slate-500 text-sm leading-relaxed">{{ dept.desc }}</p>
              </div>
              <div class="flex gap-2 pt-6">
                <div class="px-4 py-1 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider">{{ dept.tag }}</div>
              </div>
            </div>

            <div v-else class="bg-blue-600 text-white p-10 flex flex-col justify-between h-full ">
              <div class="space-y-4">
                <h2 class="text-3xl font-bold">{{ dept.title }}</h2>
                <p class="text-blue-100 opacity-80">{{ dept.desc }}</p>
              </div>
              <div class="text-right">
                <span class="text-8xl font-black opacity-10 leading-none">!!</span>
              </div>
            </div>

          </router-link>
        </template>

      </div>

      <footer class="mt-32 pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 no-print">
        <div class="font-serif text-2xl italic text-slate-400">እንዳ ኢየሱስ ግቢ ጉባኤ</div>
        <div class="text-[10px] tracking-widest text-slate-400 uppercase">© 2018 ዓ.ም - የሥራ መመሪያ</div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@100..900&display=swap');

.font-serif { font-family: 'DM Serif Display', serif; }
.font-sans { font-family: 'Inter', sans-serif; }

.editorial-btn-primary {
  @apply flex items-center justify-between px-8 py-5 bg-slate-900 text-white font-bold 
         rounded-none transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-95;
}

.editorial-btn-secondary {
  @apply px-8 py-5 border-2 border-slate-200 text-slate-900 font-bold 
         rounded-none transition-all hover:border-slate-900 active:bg-slate-50;
}

.editorial-card {
  @apply relative overflow-hidden transition-all duration-500 
         hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)];
}

/* Sharp architectural corners */
.rounded-xl, .rounded-2xl {
  border-radius: 2px;
}

@media print {
  .no-print { display: none !important; }
  .max-w-\[1400px\] { max-width: 100% !important; padding: 0 !important; }
  .editorial-card { border: 1px solid #eee !important; break-inside: avoid; }
}
</style>