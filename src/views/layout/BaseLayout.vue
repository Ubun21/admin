<template>
  <el-container class="app-wrapper">
    <!-- <el-aside :class="{collapse: isCollapse}" width="200px">
    <aside-menu></aside-menu>
    </el-aside> -->
    <el-aside class="aside" :class="[isCollapse ? 'aside--collapse' : '']" width="200px">
      <aside-menu></aside-menu>
    </el-aside>
    <el-main class="main">
      <div class="main-head">
        <nvabar></nvabar>
      </div>
      <div class="main-body">
        <tag-view></tag-view>
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { defineComponent, computed, effect, reactive } from 'vue'
import AsideMenu from '../AsideMenu.vue'
import Nvabar from '../../components/Nvabar/index.vue'
import TagView from '@/components/TagView/index.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'BaseLayout',
  components: {
    AsideMenu,
    Nvabar,
    TagView
  },
  setup () {
    let dummy
    const obj = reactive({ prop: 'value', run: true })
    window.obj = obj
    const conditionalSpy = () => {
      dummy = obj.run ? obj.prop : 'other'
    }
    debugger
    effect(conditionalSpy)
    debugger
    obj.run = false
    const store = useStore()
    const isCollapse = computed(() => store.state.isCollapse)
    return {
      isCollapse,
      dummy
    }
  }
})
</script>

<style lang="scss">
.app-wrapper {
  height: 100vh;
  .aside {
    height: 100%;
  }
  .aside--collapse {
    width: auto;
  }
  .main {
    padding: 0px; // 重置element自带的边距
  }
}
</style>
