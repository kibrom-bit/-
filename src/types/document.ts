//src/types/document.ts
export interface Page {
  id: number
  title: string
  content: string
  department?: string
}

export interface ReportSection {
  title: string
  content: string
  stats?: { label: string; value: string }[]
}

export interface ScheduleEvent {
  id: number
  task: string
  description: string
  date?: string        // Make date optional with ?
  dateRange?: string   // Already optional
  responsible: string
  requirements: string
  budget: string | number
  goal: string
}

export interface Department {
  id: number
  title: string
  tag: string
  desc: string
  span: string
  theme: 'dark' | 'light' | 'bordered' | 'dark-blue'
}