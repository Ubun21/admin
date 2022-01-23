<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      选择语言<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="activeLang === 'zh'">中文</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="activeLang === 'en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ArrowDown } from '@element-plus/icons'

export default defineComponent({
  components: {
    ArrowDown
  },
  setup () {
    const store = useStore()
    const i18n = useI18n()
    const activeLang = computed(() => store.getters['language/lang'])
    const handleCommand = (command) => {
      i18n.locale.value = command
      store.dispatch('language/setLanguage', command)
    }
    return {
      activeLang,
      handleCommand
    }
  }
})
</script>
