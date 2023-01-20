import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        component: () => import('@/views/HomeTab.vue')
      },
      {
        path: 'log',
        component: () => import('@/views/LogTab.vue'),
      },
      {
        path: 'log/edit/:id',
        component: () => import('@/components/Log/LogItemEdit.vue'),
        props: true
      },
      {
        path: 'scan',
        component: () => import('@/views/ScanTab.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
