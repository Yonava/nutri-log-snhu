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
        name: 'LogEditDetail',
        path: 'log/edit',
        component: () => import('@/components/Log/LogItemEdit.vue')
      },
      {
        name: 'AddCustom',
        path: 'log/addCustom',
        component: () => import('@/components/Log/AddCustom.vue')
      },
      {
        name: 'AddCatalog',
        path: 'log/addCatalog',
        component: () => import('@/components/Log/AddCatalog.vue')
      },
      {
        name: 'AddCatalogDetail',
        path: 'log/addCatalog/detail',
        component: () => import('@/components/Log/AddCatalogDetail.vue')
      },
      {
        path: 'scan',
        component: () => import('@/views/ScanTab.vue')
      }
    ]
  },
  {
    path: '/signin',
    component: () => import('@/views/SignInTab.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
