export default {
  namespace: true,
  state: {
    urls: [],
    activeUrl: 0,
    urlLabels: [{ path: '/', label: 'profile' }]
  },
  mutations: {
    setUrls (state, urls) {
      state.urls = urls
    },
    setActiveUrl (state, index) {
      state.activeUrl = index
    },
    seturlLabels (state, item) {
      const index = state.urlLabels.findIndex(p => p.label === item.label)
      if (index > 0) {
        return
      }
      state.urlLabels.push(item)
      state.activeUrl = state.urlLabels.length - 1
    },
    removeurlLabels (state, label) {
      const index = state.urlLabels.findIndex(item => item.label === label)
      if (index < state.activeUrl) {
        state.activeUrl = state.activeUrl - 1
      }
      if (index > -1) {
        state.urlLabels.splice(index, 1)
      }
      if (state.urlLabels.length === 1) {
        state.activeUrl = 0
      }
    }
  },
  actions: {
    setUrls (context, urls) {
      context.commit('setUrls', urls)
    },
    seturlLabels (context, label) {
      context.commit('seturlLabels', label)
    },
    removeurlLabels (context, label) {
      context.commit('removeurlLabels', label)
    },
    setActiveUrl (context, index) {
      context.commit('setActiveUrl', index)
    }
  },
  getters: {
    urls (state) {
      return state.urls
    },
    urlLabels (state) {
      return state.urlLabels
    },
    activeUrl (state) {
      return state.activeUrl
    }
  }
}
