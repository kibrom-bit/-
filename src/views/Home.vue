//home.vue
<template>
  <div class="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-blue-100 font-sans">
    <div class="mx-auto px-4 lg:px-12 py-8">
      
      <section class="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-end mb-16">
        <div class="lg:w-2/3 border-l-4 border-slate-900 pl-6 md:pl-12 py-3">
          <div class="flex items-center gap-3 mb-6">
            <span class="text-[10px] tracking-[0.4em] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded">
               2018 ዓ.ም
            </span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6">
            የሥራ <br/>
            <span class="text-slate-300 italic font-light font-serif">አስፈጻሚ</span> <br/>
            መመሪያ
          </h1>
          
          <p class="text-lg md:text-xl text-slate-500 max-w-lg font-light leading-relaxed">
            ይህ የስራ መመርያ ፤ በእንዳ ኢየሱስ ግቢ ጉባኤ ሥር
የሚገኙ የአገልግሎት ክፍሎች፣ ንዑሳን ክፍሎችና አመራሮች የተጣለባቸውን አደራ በታማኝነትና በዕውቀት
ይወጡ ዘንድ የተዘጋጀ ነው። 
          </p>
        </div>

        <div class="lg:w-1/2 w-full no-print">
          <div class="flex flex-col gap-3">
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

      <div class="grid grid-cols-12 gap-4 lg:gap-6">
        
        <template v-for="dept in departments" :key="dept.id">
          <router-link 
            :to="`/page/${dept.id}`" 
            :class="[dept.span, 'relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] group']"
          >
            <div v-if="dept.theme === 'dark'" class="bg-slate-900 text-white p-6 flex flex-col justify-between h-full">
              <div class="space-y-3">
                <div class="w-12 h-1 bg-blue-500"></div>
                <h2 class="text-3xl font-bold">{{ dept.title }}</h2>
                <p class="text-slate-400 max-w-sm text-sm">{{ dept.desc }}</p>
              </div>
              <div class="flex justify-between items-end pt-6">
                <span class="text-xs tracking-[0.3em] uppercase font-bold text-blue-400 group-hover:pl-4 transition-all">{{ dept.tag }}</span>
                <span class="text-3xl font-serif text-slate-800">{{ dept.id < 10 ? '0' + dept.id : dept.id }}</span>
              </div>
            </div>

            <div v-else-if="dept.theme === 'light'" class="bg-white border border-slate-100 p-6 flex flex-col justify-between h-full">
              <div>
                <span class="text-blue-600 font-mono text-xs mb-3 block">{{ dept.tag }}</span>
                <h2 class="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{{ dept.title }}</h2>
                <p class="text-slate-500 max-w-sm text-sm">{{ dept.desc }}</p>
              </div>
              <div class="flex items-end justify-between mt-4">
                <div class="text-4xl font-serif text-slate-50 group-hover:text-blue-50 transition-colors">{{ dept.title.split(' ')[0] }}</div>
                <div class="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  →
                </div>
              </div>
            </div>

            <div v-else-if="dept.theme === 'bordered'" class="border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-white p-6 flex flex-col justify-between h-full">
              <div>
                <h2 class="text-xl font-bold mb-2">{{ dept.title }}</h2>
                <p class="text-slate-500 text-xs leading-relaxed">{{ dept.desc }}</p>
              </div>
              <div class="flex gap-2 pt-4">
                <div class="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider">{{ dept.tag }}</div>
              </div>
            </div>

            <div v-else class="bg-blue-600 text-white p-6 flex flex-col justify-between h-full">
              <div class="space-y-3">
                <h2 class="text-2xl font-bold">{{ dept.title }}</h2>
                <p class="text-blue-100 opacity-80 text-sm">{{ dept.desc }}</p>
              </div>
              <div class="text-right">
                <span class="text-6xl font-black opacity-10 leading-none">!!</span>
              </div>
            </div>

          </router-link>
        </template>

      </div>

      <footer class="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 no-print">
        <div class="font-serif text-xl italic text-slate-400">እንዳ ኢየሱስ ግቢ ጉባኤ</div>
        <div class="text-[10px] tracking-widest text-slate-400 uppercase">© 2018 ዓ.ም - የሥራ መመሪያ</div>
      </footer>
    </div>
  </div>
</template>

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

<style scoped>
.editorial-btn-primary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #0f172a;
  color: white;
  font-weight: bold;
  border-radius: 0;
  transition: all 0.3s;
}

.editorial-btn-primary:hover {
  background-color: #1d4ed8;
  transform: scale(1.02);
}

.editorial-btn-primary:active {
  transform: scale(0.95);
}

.editorial-btn-secondary {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border: 2px solid #e2e8f0;
  color: #0f172a;
  font-weight: bold;
  border-radius: 0;
  transition: all 0.3s;
}

.editorial-btn-secondary:hover {
  border-color: #0f172a;
}

.editorial-btn-secondary:active {
  background-color: #f8fafc;
}

/* Print styles */
@media print {
  .no-print { 
    display: none !important; 
  }
  .editorial-card { 
    border: 1px solid #eee !important; 
    break-inside: avoid; 
  }
}
</style>