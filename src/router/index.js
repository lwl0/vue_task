import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../views/table.vue')
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('../views/chart.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
