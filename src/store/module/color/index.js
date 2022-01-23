import { MAIN_COLOR, DEFAULT_COLOR } from '../../constant/index'
import { saveItem, getItem } from '../../../utils/storage'

export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR
  }),
  mutations: {
    setMainColor (state, color) {
      saveItem(MAIN_COLOR, color)
      state.mainColor = color
    }
  },
  actions: {
    setMainColor (context, color) {
      context.commit('setMainColor', color)
    }
  },
  getters: {
    color (state) {
      return state.mainColor
    }
  }
}
