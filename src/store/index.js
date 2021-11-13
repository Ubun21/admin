import { createStore, createLogger } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [debug ? createLogger() : []]
})
