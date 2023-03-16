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
        component: () => import('@/views/LogTab.vue')
      },
      {
        name: 'LogEditDetail',
        path: 'log/edit',
        component: () => import('@/components/Log/LogItemEdit.vue')
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
        name: 'CustomItems',
        path: 'log/customItems',
        component: () => import('@/components/Log/CustomItems.vue')
      },
      {
        name: 'Scan',
        path: 'scan',
        component: () => import('@/views/ScanTab.vue')
      },
      {
        name: 'Personalize',
        path: 'personalize',
        component: () => import('@/views/PersonalizeMenu.vue')
      },
      {
        name: 'AdjustTargets',
        path: 'adjustTargets',
        component: () => import('@/components/Profile/AdjustTargets.vue')
      },
      {
        name: 'ToS',
        path: 'tos',
        component: () => import('@/views/TermsOfService.vue')
      },
      {
        name: 'NotifPanel',
        path: 'notifs',
        component: () => import('@/views/NotifPanel.vue')
      }
    ]
  },
  {
    name: 'SignIn',
    path: '/signin',
    component: () => import('@/views/SignInTab.vue')
  },
  {
    name: 'ResetPassword',
    path: '/reset-password',
    component: () => import('@/views/ResetPassword.vue')
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/views/RegisterTab.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
