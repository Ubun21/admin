import { privateRoutes, publicRoutes } from '@/router/index'

export default {
  namespace: true,
  state: {
    routes: null
  },
  mutations: {
    setRouters (state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    },
    clearRouter (state) {
      state.routes = null
    }
  },
  actions: {
    filterRoutes (context, menus) {
      const routes = []
      menus.forEach(item => {
        routes.push(...privateRoutes.filter(route => route.name === item))
      })
      routes.push({
        hide: true,
        name: 'catchAll',
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRouters', routes)
      return routes
    }
  },
  getters: {
    routers (state) {
      return state.routers
    }
  }
}
