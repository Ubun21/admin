import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.scss'
import installElementPlus from './plugins/element'
import i18n from './i18n/index'
import installDirective from '@/directive/index'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).use(i18n).mount('#app')
installDirective(app)
window.store = store
