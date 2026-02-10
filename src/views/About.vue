<template>
  <div class="min-h-screen bg-white">
    <section class="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          ስለ እንዳ ኢየሱስ ግቢ ጉባኤ
        </h1>
        <p class="max-w-2xl mx-auto text-slate-600 leading-relaxed text-lg">
          በመቀሌ ዩኒቨርሲቲ እንዳ ኢየሱስ ግቢ ውስጥ የሚገኝ፣ የተማሪዎችን መንፈሳዊ ህይወት ለማነጽ እና 
          ለማገልገል የተቋቋመ ግቢ ጉባኤ።
        </p>
      </div>
    </section>

    <section class="py-16 container mx-auto px-6 max-w-5xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-blue-600 pl-4">
            ራዕይና ተልዕኮ
          </h2>
          <p class="text-slate-600 mb-6 leading-loose">
            የእንዳ ኢየሱስ ግቢ ጉባኤ ተማሪዎች በዩኒቨርሲቲ ቆይታቸው ወቅት በእምነታቸው ጠንክረው እንዲቆዩ፣ 
            የቤተክርስቲያንን ትምህርት እንዲማሩና በሥነ-ምግባር የታነጹ ዜጎች ሆነው እንዲወጡ ማስቻል ነው።
          </p>
          <ul class="space-y-3">
            <li v-for="item in objectives" :key="item" class="flex items-start gap-3 text-slate-700">
              <svg class="w-5 h-5 text-blue-500 mt-1 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ item }}
            </li>
          </ul>
        </div>
        
        <div class="bg-slate-100 rounded-2xl aspect-video md:aspect-square flex items-center justify-center border border-slate-200 shadow-inner">
          <div class="text-center p-8">
            <div class=" bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl"><img src="../assets/enda.jpg" alt="እንዳ ኢየሱስ ግቢ ጉባኤ"></div>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">እንዳ ኢየሱስ</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 bg-slate-900 text-white">
      <div class="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-3xl font-black text-blue-400 mb-1">{{ stat.value }}</p>
          <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <section class="py-20 text-center">
      <div class="container mx-auto px-6">
        <h2 class="text-2xl font-bold text-slate-900 mb-8">ተጨማሪ ጥያቄ አለዎት?</h2>
        <a 
          href="https://t.me/endaeyesusinbox" 
          class="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
        >
          ያግኙን
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const objectives = [
  "መንፈሳዊ ትምህርቶችን ማዳረስ",
  "የተማሪዎችን የእርስ በርስ ግንኙነት ማጠናከር",
  "ኦርቶዶክሳውያን ተማሪዎችን ከመናፍቃን እንቅስቃሴ መጠበቅ",
  "ቤተክርስቲያንን የሚያገለግሉ ምሁራንን ማፍራት"
]

const stats = [
  { label: '', value: '' }

]
</script>