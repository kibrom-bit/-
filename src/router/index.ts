import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'

const Home = () => import('@/views/Home.vue')
const SectionPage = () => import('@/views/SectionPage.vue')
// Add the About view here
const About = () => import('@/views/About.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about', // The path you used in your Header router-link
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Recommended: Scroll to top when switching pages
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router