<template>
  <DocumentLayout :title="pageTitle" :page-id="201" :total-pages="1">
    <template #header-actions>
      <div class="flex items-center gap-3">
        <span class="text-xs px-3 py-1.5 bg-green-50 text-green-700 rounded-full font-bold">
          የሁለተኛ ሴሚስተር መርሐ ግብር
        </span>
      </div>
    </template>
    
    <div class="prose prose-lg max-w-none mb-8" v-html="formattedContent"></div>
    
    <!-- Budget Summary -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white mb-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div>
          <div class="text-sm uppercase tracking-wider opacity-90">ጠቅላላ በጀት</div>
          <div class="text-3xl font-black">{{ totalBudget.toLocaleString() }} ብር</div>
        </div>
        <div class="mt-4 md:mt-0">
          <div class="text-sm uppercase tracking-wider opacity-90">የተግባራት ብዛት</div>
          <div class="text-3xl font-black text-center">{{ scheduleEvents.length }}</div>
        </div>
        <div class="mt-4 md:mt-0">
          <div class="text-sm uppercase tracking-wider opacity-90">ዋና የልማት ግብ</div>
          <div class="text-xl font-bold">1,000,000 ብር</div>
        </div>
      </div>
    </div>
    
    <!-- Schedule Table -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-200">
              <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ተ.ቁ</th>
              <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ሥራ / ተግባር</th>
              <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ዝርዝር ተግባራት</th>
              <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ግዜ</th>
              <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ኃላፊነት ያለበት አካል</th>
              <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">የሚያስፈልጉ ነገሮች</th>
              <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">በጀት</th>
              <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">የታቀደው ግብ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="event in scheduleEvents" :key="event.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-4 py-3 font-mono text-gray-500">{{ event.id }}</td>
              <td class="px-4 py-3 font-medium text-gray-900">{{ event.task }}</td>
              <td class="px-4 py-3 text-gray-700 max-w-xs">{{ event.description }}</td>
              <td class="px-4 py-3 text-gray-700 whitespace-nowrap">{{ event.date || event.dateRange }}</td>
              <td class="px-4 py-3 text-gray-700">{{ event.responsible }}</td>
              <td class="px-4 py-3 text-gray-700">{{ event.requirements }}</td>
              <td class="px-4 py-3 font-mono" :class="getBudgetClass(event.budget)">
                {{ formatBudget(event.budget) }}
              </td>
              <td class="px-4 py-3 text-gray-700 max-w-xs">{{ event.goal }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Key Focus Areas -->
    <div class="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-200">
      <h3 class="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
        <span class="text-xl">🎯</span> የሁለተኛ ሴሚስተር የትኩረት አቅጣጫዎች
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div v-for="(focus, index) in focusAreas" :key="index" class="flex items-start gap-2">
          <span class="text-amber-600 font-bold">{{ index + 1 }}.</span>
          <span class="text-gray-800">{{ focus }}</span>
        </div>
      </div>
    </div>
  </DocumentLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import DocumentLayout from '@/layouts/DocumentLayout.vue'
import { secondSemesterSchedule2018, scheduleEvents } from '@/documents/schedules/secondSemester2018'

const route = useRoute()
const pageTitle = secondSemesterSchedule2018.title

const formattedContent = computed(() => {
  return marked(secondSemesterSchedule2018.content)
})

const formatBudget = (budget: string | number): string => {
  if (typeof budget === 'string') {
    const num = parseFloat(budget)
    return isNaN(num) || num === 0 ? '-' : num.toLocaleString() + ' ብር'
  }
  return budget > 0 ? budget.toLocaleString() + ' ብር' : '-'
}

const getBudgetClass = (budget: string | number): string => {
  const value = typeof budget === 'string' ? parseFloat(budget) || 0 : budget
  return value > 0 ? 'text-green-600 font-bold' : 'text-gray-500'
}

const totalBudget = computed(() => {
  return scheduleEvents.reduce((sum, event) => {
    const budget = typeof event.budget === 'string' 
      ? parseFloat(event.budget) || 0 
      : event.budget || 0
    return sum + budget
  }, 0)
})

const focusAreas = [
  'የአቅም ግንባታ ትኩረት - የኪነ-ጥበብ ስልጠናዎች',
  'ታላቅ የልማት ፕሮጀክት - 1,000,000 ብር ማሰባሰብ',
  'የመሪዎች ሸግግር - የ2019 ዓ.ም አዲስ አመራር ምርጫ',
  'የተተኪ አመራር ስልጠና',
  'የጉባኤ ሐዋርያት ምረቃ'
]
</script>