<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column :label="$t('msg.role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe">
        </el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
          v-slot="{ row }"
        >
          <el-button v-permission="['distributePermission']" @click="setPermissinVisibleAndRowId(row)" type="primary" size="mini">
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <assign-permission :rowId="rowId" v-model="permissionDialogVisible"></assign-permission>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { roleList } from '@/api/role'
import AssignPermission from '@/views/assign-permission'
export default defineComponent({
  components: {
    AssignPermission
  },
  setup () {
    const allRoles = ref([])
    const rowId = ref(null)
    const permissionDialogVisible = ref(false)
    const getRoleList = async () => {
      const res = await roleList()
      allRoles.value = res
    }
    const setPermissinVisibleAndRowId = (row) => {
      rowId.value = row.id
      permissionDialogVisible.value = true
    }
    getRoleList()
    return {
      rowId,
      allRoles,
      permissionDialogVisible,
      setPermissinVisibleAndRowId
    }
  }
})
</script>

<style scoped>

</style>
