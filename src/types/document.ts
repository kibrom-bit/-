export interface Page {
  id: number
  title: string
  content: string
}

export interface Section {
  id: string
  title: string
  pages: number[]
}

export interface NavigationState {
  currentPage: number
  totalPages: number
  sections: Section[]
}