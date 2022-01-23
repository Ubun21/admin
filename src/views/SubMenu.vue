<template>
  <div v-for="(item, idx) in menuData" :key="idx">
    <div v-if="!item.hide">
      <!-- 有redirect的情况下chiren将不渲染 -->
      <div v-if="item.children && !item.hideChildren">
        <el-submenu class="menu__title" :index="item.path">
          <template #title>
            <div :class="[item.redirect? 'redirect' : '']" class="menu__title__head">
              <el-icon class="icon">
                <location></location>
              </el-icon>
              <span :class="{text: true, expand: isExpand}">{{ item.meta ? (item.meta.title ? item.meta.title : '') : '' }}</span>
            </div>
          </template>
          <sub-menu :menuData="item.children"></sub-menu>
        </el-submenu>
      </div>
      <div v-else>
        <el-menu-item id="reset-el-default" class="menu__title" @click="handleClick(item)" :index="item.path">
          <template #title>
            <div class="menu__title__head">
              <el-icon class="icon">
                <location></location>
              </el-icon>
              <span :class="{text: true, expand: isExpand}">{{ item.meta ? (item.meta.title ? item.meta.title : '') : '' }}</span>
            </div>
          </template>
        </el-menu-item>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Location } from '@element-plus/icons'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'SubMenu',
  components: {
    Location
  },
  props: {
    menuData: Array,
    index: String,
    isExpand: Boolean
  },
  setup (props) {
    const router = useRouter()
    const store = useStore()
    const handleClick = (item) => {
      console.info('item', item)
      if (item.path !== '/') {
        const urls = item.path.split('/').filter(url => url !== '')
        const label = urls[urls.length - 1]
        store.dispatch('setUrls', urls)
        store.dispatch('seturlLabels', { path: item.path, label })
      }
      router.push(item.path)
    }
    return {
      handleClick
    }
  }
})
</script>

<style lang="scss">
#reset-el-default {
  min-width: 0px;
}
.menu__title {
  text-align: left;
  .menu__title__head {
    display: flex;
    align-items: center;
    .icon {
      font-size: 18px;
    }
    .text {
      padding-left: 8px;
    }
    .expand {
      visibility: hidden;
    }
  }
  .menu__title__head.redirect + i {
    display: none;
  }
  .el-icon-arrow-right {
    display: none;
  }
}
</style>>
