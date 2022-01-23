import { createStore, createLogger } from 'vuex'
import user from './module/user/user'
import language from './module/app/index'
import color from './module/color/index'
import permission from './module/permission/index'
import urls from './module/url/index'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    isCollapse: false,
    navPath: []
  },
  mutations: {
    setCollapse (state, isCollapse) {
      state.isCollapse = isCollapse
    },
    addNavPath (state, path) {
      state.navPath.push(path)
    },
    removePath (state, path) {
      const index = state.navPath.indexOf(path)
      if (index > -1) {
        state.navPath.splice(index, index + 1)
      }
    }
  },
  actions: {
    setCollapse ({ commit }, isCollapse) {
      commit('setCollapse', isCollapse)
    },
    addNavPath ({ commit }, path) {
      commit('addNavPath', path)
    },
    removePath ({ commit }, path) {
      commit('removePath', path)
    }
  },
  modules: {
    user,
    language,
    color,
    urls,
    permission
  },
  plugins: [debug ? createLogger() : []]
})
