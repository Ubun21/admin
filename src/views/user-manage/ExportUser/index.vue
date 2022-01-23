<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button @click="confirm" type="primary">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { formatJSON, USER_RELATIONS } from '@/utils/formatJson'
import { exportJsonToExcel } from '@/utils/Export2Excel'
export default defineComponent({
  name: 'ExportUser',
  props: {
    modelValue: {
      type: Boolean,
      require: true
    }
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const i18n = useI18n()
    const defaultName = ref('')
    const excelName = i18n.t('msg.excel.defaultName')
    defaultName.value = excelName
    const closed = () => {
      context.emit('update:modelValue', false)
    }
    const confirm = async () => {
      const userList = await getUserManageAllList()
      closed()
      const arr = formatJSON(userList.list)
      exportJsonToExcel({
        header: Object.keys(USER_RELATIONS),
        data: arr,
        fileName: excelName.value || defaultName.value,
        autoWidth: true,
        bookType: 'xlsx'
      })
      console.info(arr)
    }
    return {
      excelName,
      closed,
      confirm
    }
  }
})
</script>

<style scoped>

</style>
