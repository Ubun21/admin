import { login, getUserInfo } from '../../../api/user'
import { getItem, saveItem, removeItem } from '../../../utils/storage'
import { TOKEN } from '../../constant/index'
import router, { resetRoutes } from '../../../router/index'
import { saveTimeStamp, clearTimeStamp } from '../../../utils/auth'
import md5 from 'md5'

export default {
  namespace: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: null
  }),
  mutations: {
    setToken (state, token) {
      state.token = token
      saveItem(TOKEN, token)
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login (context, userInfo) {
      return new Promise((resolve, reject) => {
        const { userName, passWord } = userInfo
        login({
          username: userName,
          password: md5(passWord)
        }).then((data) => {
          context.commit('setToken', data.token)
          saveTimeStamp()
          return data
        }).then((data) => {
          resolve(data)
        }).catch(e => {
          reject(e)
        })
      })
    },
    async getUserInfo (context) {
      const res = await getUserInfo()
      context.commit('setUserInfo', res)
      return res
    },
    logOut (context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', null)
      context.commit('clearRouter')
      removeItem(TOKEN)
      clearTimeStamp()
      resetRoutes()
      router.push('/user/login')
    }
  },
  getters: {
    token (state) {
      return state.token
    },
    userInfo (state) {
      return state.userInfo
    }
  }
}
