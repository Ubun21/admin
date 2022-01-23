<template>
  <div class="navbar-wrapper">
    <div class="left">
      <el-icon class="hamburger">
        <component @click="clickHandle" :is="isCollapse ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <bread-crumb></bread-crumb>
    </div>
    <div class="right">
      <lang-selector></lang-selector>
      <theme-select></theme-select>
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          设置<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>课程首页</el-dropdown-item>
            <el-dropdown-item @click="exitHandle" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onBeforeMount } from 'vue'
import { ArrowDown, Expand, Fold } from '@element-plus/icons'
import { useStore } from 'vuex'
import LangSelector from '../../components/LangSelector/index.vue'
import ThemeSelect from '../../components/ThemeSelect/index.vue'
import BreadCrumb from '@/components/BreadCrumb'
export default defineComponent({
  name: 'Nvabar',
  components: {
    ArrowDown,
    Expand,
    Fold,
    LangSelector,
    ThemeSelect,
    BreadCrumb
  },
  setup () {
    const store = useStore()
    const userInfo = computed(() => store.state.userInfo)
    const isCollapse = computed(() => store.state.isCollapse)
    const navPaths = computed(() => store.state.navPath)
    const clickHandle = () => {
      store.dispatch('setCollapse', !store.state.isCollapse)
    }
    const exitHandle = () => {
      store.dispatch('logOut')
    }
    const removeNavPath = (item) => {
      console.info('removePath', item)
      store.dispatch('removePath', item)
    }
    onBeforeMount(() => {
      if (!userInfo.value) {
        // store.dispatch('getUserInfo')
      }
      console.info(userInfo.value)
    })
    return {
      userInfo,
      isCollapse,
      navPaths,
      clickHandle,
      removeNavPath,
      exitHandle
    }
  }
})
</script>

<style scoped>
.navbar-wrapper {
  display: flex;
  align-items: center;
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
.left {
  flex: 1;
  display: flex;
  align-items: center;
}
.hamburger {
  width: 52px;
  font-size: 24px;
}
</style>>
