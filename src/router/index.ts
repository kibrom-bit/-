import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'

// Your files are in views/, not pages/
const Home = () => import('@/views/Home.vue')
const SectionPage = () => import('@/views/SectionPage.vue')
const About = () => import('@/views/About.vue')
const FirstSemesterReport = () => import('@/pages/FirstSemesterReportPage.vue')
const SecondSemesterSchedule = () => import('@/pages/SecondSemesterSchedulePage.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/page/:id',
    name: 'Page',
    component: SectionPage,
    props: (route: RouteLocationNormalized) => ({ 
      id: parseInt(route.params.id as string) || 1 
    })
  },
  {
    path: '/report/first-semester-2018',
    name: 'FirstSemesterReport',
    component: FirstSemesterReport
  },
  {
    path: '/schedule/second-semester-2018',
    name: 'SecondSemesterSchedule',
    component: SecondSemesterSchedule
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router