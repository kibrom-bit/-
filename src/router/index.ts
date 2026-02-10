import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'

const Home = () => import('@/views/Home.vue')
const SectionPage = () => import('@/views/SectionPage.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  routes
})

export default router