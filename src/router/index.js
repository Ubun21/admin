import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import BaseLayout from '@/views/layout/BaseLayout'

export const publicRoutes = [
  {
    path: '/user',
    hide: true,
    component: () => import('@/views/layout/UserLayout.vue'),
    children: [
      {
        hide: true,
        path: '/user/login',
        component: () => import('@/views/login/index.vue')
      },
      {
        hide: true,
        path: '/user/register',
        component: () => import('@/views/user/Register.vue')
      }
    ]
  },
  {
    path: '/',
    component: BaseLayout,
    redirect: '/profile',
    hideChildren: true,
    meta: { title: 'profile' },
    children: [
      {
        path: '/profile',
        hide: true,
        component: () => import('@/views/profile/index.vue')
      }
    ]
  },
  {
    path: '/404',
    component: BaseLayout,
    redirect: '/404/index',
    hide: true,
    children: [
      {
        path: '/404/index',
        hide: true,
        component: () => import('@/views/not-find/index.vue')
      }
    ]
  }
]

export const privateRoutes = [
  {
    path: '/dashboard',
    component: BaseLayout,
    name: 'userManage',
    meta: { title: 'dashboard' },
    children: [
      {
        path: '/dashboard/analysis',
        component: () => import('@/views/dashboard/Analysis.vue'),
        meta: { title: 'analysis' }
      },
      {
        path: '/dashboard/monitor',
        component: () => import('@/views/dashboard/Analysis.vue'),
        meta: { title: 'monitor' }
      },
      {
        path: '/dashboard/delete',
        component: () => import('@/views/dashboard/Analysis.vue'),
        meta: { title: 'delete' }
      }
    ]
  },
  {
    path: '/form',
    component: BaseLayout,
    meta: { title: 'form' },
    name: 'articleRanking',
    children: [
      {
        path: '/form/oneform',
        component: () => import('@/views/dashboard/Analysis.vue'),
        meta: { title: 'oneform' },
        children: [
          {
            path: '/form/twoform1',
            component: () => import('@/views/dashboard/Analysis.vue'),
            meta: { title: 'twoform1' }
          },
          {
            path: '/form/twoform2',
            component: () => import('@/views/dashboard/Analysis.vue'),
            meta: { title: 'twoform2' }
          },
          {
            path: '/form/twoform3',
            component: () => import('@/views/dashboard/Analysis.vue'),
            meta: { title: 'twoform3' }
          }
        ]
      }
    ]
  },
  {
    path: '/manage',
    component: BaseLayout,
    meta: { title: 'user-manage' },
    name: 'roleList',
    children: [
      {
        meta: { title: 'user-list' },
        path: '/manage/employ-manage',
        component: () => import('@/views/user-manage/EmployManage/index.vue')
      },
      {
        meta: { title: 'role-list' },
        path: '/manage/rolelist',
        component: () => import('@/views/rolelist/index.vue')
      },
      {
        meta: { title: 'permission-list' },
        path: '/manage/permissionlist',
        component: () => import('@/views/permission/index.vue')
      },
      {
        hide: true,
        path: '/manage/user-import',
        component: () => import('@/views/user-manage/UserImport/index.vue')
      },
      {
        hide: true,
        path: '/manage/user-detail/:id',
        name: 'userDetail',
        component: () => import('@/views/user-manage/UserDetail/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRoutes
})
window.router = router
const whiteList = ['/user', '/user/login', '/user/register']
router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  if (token) {
    // 在已经登录的情况下，访问/user/login会被重定向到初始页面
    if (to.path === '/user/login') {
      next('/')
    } else {
      if (!store.getters.userInfo) {
        const userInfo = await store.dispatch('getUserInfo')
        const menus = [...new Set(userInfo.permission.menus)]
        const filterRoutes = await store.dispatch('filterRoutes', menus)
        filterRoutes.forEach(route => {
          router.addRoute(route)
        })
        return next(to.fullPath)
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/user/login')
    }
  }
})

export function resetRoutes () {
  const userInfo = store.getters.userInfo
  if (userInfo && userInfo.permission && userInfo.permission.menus) {
    const menus = userInfo.permission.menus
    menus.forEach(item => {
      router.removeRoute(item)
    })
  }
  router.removeRoute('catchAll')
}

export default router
