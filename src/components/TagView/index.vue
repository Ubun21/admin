<template>
  <div class="tagview-wrapper">
    <span
      class="tagview"
      v-for="(item, index) in urlLabels" :key="index"
      :class="[index === activeIndex ? 'tagview--active' : '']"
      >
      <span class="text" @click="goTo(item.path, index)">
        {{ item.label }}
      </span>
      <el-icon class="icon" v-if="item.path !== '/'">
        <close @click="removeRouterLink(item, index)" />
      </el-icon>
    </span>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Close } from '@element-plus/icons'
export default defineComponent({
  name: 'TagView',
  components: {
    Close
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const urlLabels = computed(() => store.getters.urlLabels)
    const activeIndex = computed(() => store.getters.activeUrl)
    const removeRouterLink = (item, index) => {
      // 如果关闭的标签页是激活的标签页，重置为初始状态
      if (activeIndex.value === index) {
        store.dispatch('setUrls', ['profile'])
        store.dispatch('setActiveUrl', 0)
        router.push('/')
      }
      store.dispatch('removeurlLabels', item.label)
    }
    const goTo = (path, index) => {
      const urls = path.split('/').filter(url => url !== '')
      store.dispatch('setUrls', urls)
      store.dispatch('setActiveUrl', index)
      router.push(path)
    }
    return {
      activeIndex,
      urlLabels,
      removeRouterLink,
      goTo
    }
  }
})
</script>

<style lang='scss'>
.tagview-wrapper {
  display: flex;
  align-items: center;
  padding-left: 15px;
  height: 34px;
  box-shadow: 0 5px 4px -4px rgba($color: #000000, $alpha: 0.3);
  .tagview {
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba($color: #000000, $alpha: 0.1);
    padding: 4px 8px;
    margin: 4px 15px 0px 0px;
    font-size: 10px;
    cursor: pointer;
    .icon {
      display: inline-block;
      border-radius: 50%;
      padding: 4px;
      font-size: 10px;
    }
    .icon:hover {
      background-color: rgba($color: #000000, $alpha: 0.1);
    }
  }
  .tagview--active {
    color: whitesmoke;
    background-color: rgb(48, 65, 86);
    border-color: rgb(48, 65, 86);
  }
}
</style>
