<template>
  <DocumentLayout :title="pageTitle" :page-id="101" :total-pages="1">
    <template #header-actions>
      <div class="flex items-center gap-3">
        <span class="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-bold">
          የ፩ኛ ሴሚስተር ሪፖርት
        </span>
      </div>
    </template>
    
    <div class="prose prose-lg max-w-none" v-html="formattedContent"></div>
    
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
        <div class="text-3xl font-black text-blue-700 mb-2">85%</div>
        <div class="text-sm font-bold text-gray-700">የጉባኤ ሐዋርያት ማጠናቀቂያ</div>
      </div>
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
        <div class="text-3xl font-black text-green-700 mb-2">600+</div>
        <div class="text-sm font-bold text-gray-700">የቴሌግራም ቻናል አባላት</div>
      </div>
      <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
        <div class="text-3xl font-black text-amber-700 mb-2">19K+</div>
        <div class="text-sm font-bold text-gray-700">ለበጎ አድራጎት የተሰበሰበ</div>
      </div>
    </div>
    
    <!-- Strength & Weakness -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div class="bg-white p-6 rounded-xl border border-green-200 shadow-sm">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <span class="text-green-700 text-xl">✓</span>
          </div>
          <h3 class="text-lg font-bold text-green-800">ጠንካራ ጎኖች</h3>
        </div>
        <ul class="space-y-2">
          <li v-for="strength in strengths" :key="strength" class="flex items-start gap-2 text-sm text-gray-700">
            <span class="text-green-600 mt-1">•</span>
            {{ strength }}
          </li>
        </ul>
      </div>
      
      <div class="bg-white p-6 rounded-xl border border-amber-200 shadow-sm">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <span class="text-amber-700 text-xl">!</span>
          </div>
          <h3 class="text-lg font-bold text-amber-800">ትኩረት የሚሹ ክፍተቶች</h3>
        </div>
        <ul class="space-y-2">
          <li v-for="weakness in weaknesses" :key="weakness" class="flex items-start gap-2 text-sm text-gray-700">
            <span class="text-amber-600 mt-1">•</span>
            {{ weakness }}
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Presenter Info -->
    <div class="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <span class="text-xs uppercase tracking-wider text-gray-500 font-bold">አቅራቢ</span>
        <div class="text-lg font-bold text-gray-900">ዲያቆን መድሃንዬ ነጋሽ</div>
      </div>
      <div class="mt-2 md:mt-0 text-right">
        <span class="text-xs uppercase tracking-wider text-gray-500 font-bold">ቀን እና ቦታ</span>
        <div class="text-gray-800">18/05/2018 ዓ.ም - ቤተ መድሀኒዓለም</div>
      </div>
    </div>
  </DocumentLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import DocumentLayout from '@/layouts/DocumentLayout.vue'
import { firstSemesterReport2018 } from '@/documents/reports/firstSemester2018'

const route = useRoute()
const pageTitle = firstSemesterReport2018.title

const formattedContent = computed(() => {
  return marked(firstSemesterReport2018.content)
})

const strengths = [
  'የኮርስ እና የአብነት ትምህርት አካሄድ',
  'የውጭ ግንኙነት (ከሀገረ ስብከትና ሰበካ ጉባኤ)',
  'የመረጃ ፍሰት (ወጥ የሆነ የቴሌግራም ቻናል አጠቃቀም)',
  'የአንደኛ ዓመት አካዳሚክ እገዛ እንቅስቃሴ',
  'የዓመታዊ እና ልዩ መርሐ ግብራት ዝግጅት'
]

const weaknesses = [
  'የአባላት የቅርብ ክትትል ውስንነት (እናትና አባት)',
  'የንብረት እና የሰነድ አያያዝ ክፍተት',
  'በክፍሎች መካከል ያለው የስራ ሓላፊነት መደራረብ',
  'የአገልግሎት አካሄድ መመርያ አለመኖር',
  'ተተኪ አመራር እና መምህራን ላይ በበቂ ሁኔታ አለመስራት',
  'የመርሐ ግብራት አጀማመርና አጨራረስ ላይ የሚታይ ሰዓት አለማክበር'
]
</script>

<style scoped>
@reference "tailwindcss";
.prose :deep(h2) {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.prose :deep(h3) {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e40af;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  border-left: 4px solid #2563eb;
  padding-left: 1rem;
}
</style>


