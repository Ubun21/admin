import enMsgItem from './lang/en'
import zhMsgItem from './lang/zh'
import { createI18n } from 'vue-i18n'
import store from '../store/index'

const messages = {
  en: {
    msg: {
      ...enMsgItem
    }
  },
  zh: {
    msg: {
      ...zhMsgItem
    }
  }
}

function getLanguage () {
  return store && store.getters && store.getters['language/lang']
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getLanguage(),
  messages
})

export default i18n
