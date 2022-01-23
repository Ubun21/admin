<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      主题<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="selectTheme">{{$t('msg.theme.themeColorChange')}}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
    <div class="">
      <select-color v-model="selectColorVisible"></select-color>
    </div>
  </el-dropdown>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SelectColor from '../SelectColor'
import { ArrowDown } from '@element-plus/icons'

export default defineComponent({
  components: {
    ArrowDown,
    SelectColor
  },
  setup () {
    const selectColorVisible = ref(false)
    window.color = selectColorVisible
    const handleCommand = () => {
      selectColorVisible.value = true
    }
    return {
      handleCommand,
      selectColorVisible
    }
  }
})
</script>
