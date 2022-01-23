import { LANG } from '../../constant/index'
import { saveItem, getItem } from '../../../utils/storage'

export default {
  namespaced: true,
  state: () => ({
    language: getItem(LANG) || 'zh'
  }),
  mutations: {
    setLanguage (state, lang) {
      saveItem(LANG, lang)
      state.language = lang
    }
  },
  actions: {
    setLanguage ({ commit }, lang) {
      commit('setLanguage', lang)
    }
  },
  getters: {
    lang (state) {
      return state.language
    }
  }
}
