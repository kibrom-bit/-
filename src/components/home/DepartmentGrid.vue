<template>
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
    
    <!-- New Cards for Report and Schedule -->
    <router-link 
      to="/report/first-semester-2018"
      class="col-span-12 lg:col-span-6 relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] group bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 flex flex-col justify-between h-full"
    >
      <div class="space-y-3">
        <div class="w-12 h-1 bg-yellow-400"></div>
        <span class="text-xs tracking-[0.3em] uppercase font-bold text-yellow-300">2018 ዓ.ም</span>
        <h2 class="text-2xl font-bold">የመጀመሪያ ሴሚስተር ሪፖርት</h2>
        <p class="text-purple-100 max-w-sm text-sm">የ2018 ዓ.ም የ፩ኛ ሴሚስተር አጠቃላይ የሥራ አፈጻጸም ሪፖርት በዲያቆን መድሃንዬ ነጋሽ</p>
      </div>
      <div class="flex justify-between items-end pt-6">
        <span class="text-sm bg-white/20 px-3 py-1 rounded-full">ዝርዝር ለማየት →</span>
        <span class="text-4xl font-serif opacity-30">ሪፖርት</span>
      </div>
    </router-link>
    
    <router-link 
      to="/schedule/second-semester-2018"
      class="col-span-12 lg:col-span-6 relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] group bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 flex flex-col justify-between h-full"
    >
      <div class="space-y-3">
        <div class="w-12 h-1 bg-amber-400"></div>
        <span class="text-xs tracking-[0.3em] uppercase font-bold text-amber-300">2018 ዓ.ም</span>
        <h2 class="text-2xl font-bold">የሁለተኛ ሴሚስተር መርሐ ግብር</h2>
        <p class="text-emerald-100 max-w-sm text-sm">ከየካቲት እስከ ግንቦት 2018 ዓ.ም የተያዙ 33 መንፈሳዊ፣ ልማታዊ እና አካዳሚክ ተግባራት</p>
      </div>
      <div class="flex justify-between items-end pt-6">
        <span class="text-sm bg-white/20 px-3 py-1 rounded-full">ጊዜ ሰሌዳ ለማየት →</span>
        <span class="text-4xl font-serif opacity-30">መርሐ ግብር</span>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { departments } from '@/constants/departments'
</script>