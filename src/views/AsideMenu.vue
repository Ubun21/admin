<template>
  <el-menu
    :collapse="isCollapse"
    :text-color="textColor"
    :active-text-color="textActiveColor"
    :background-color="menuBg"
    class="menu"
  >
    <sub-menu :menuData="routers" :isExpand="isCollapse"></sub-menu>
  </el-menu>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import SubMenu from './SubMenu.vue'
import styles from '@/assets/css/varible.scss'

export default defineComponent({
  components: {
    SubMenu
  },
  setup () {
    const store = useStore()
    const routers = store.state.permission.routes
    const addIndex = (routers, index) => {
      let count = 1
      for (const router of routers) {
        if (!router.hide) {
          router.index = index + (index ? '-' : '') + count
          count++
        }
        if (router.children) {
          addIndex(router.children, router.index)
        }
      }
    }
    addIndex(routers, '')
    const isCollapse = computed(() => store.state.isCollapse)
    const bgColor = computed(() => store.state.color.mainColor)
    const textColor = computed(() => styles.menuText)
    console.info('textColor', textColor.value)
    const textActiveColor = computed(() => styles.menuActiveText)
    const menuBg = computed(() => styles.menuBg)
    return {
      routers,
      isCollapse,
      bgColor,
      textColor,
      textActiveColor,
      menuBg
    }
  }
})
</script>

<style scoped>
.menu {
  height: 100%;
}
</style>
