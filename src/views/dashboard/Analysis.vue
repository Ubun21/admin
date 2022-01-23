<template>
  <div>{{ $t('msg.login.title') }}</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { getMangeList } from '../../api/user-manage'

export default defineComponent({
  setup () {
    const tableData = ref([])
    const total = ref(0)
    const page = ref(1)
    const size = ref(2)
    const getList = async () => {
      const res = await getMangeList(
        {
          page: page.value,
          size: size.value
        }
      )
      tableData.value = res.list
      total.value = res.total
    }
    getList()
    window.tableData = tableData
  }
})
</script>

<style scoped>

</style>
