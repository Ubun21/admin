<template>
  <div class="employer-wrapper">
    <el-button type="primary" v-permission="['importUser']" @click="naviToUserImport">excel</el-button>
    <el-button type="primary" @click="openDialog">export</el-button>
    <export-user v-model="dialogVisible"></export-user>
    <el-table :data="tableData">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column :label="$t('msg.excel.name')" prop="username"></el-table-column>
      <el-table-column :label="$t('msg.excel.mobile')" prop="moblie"></el-table-column>
      <el-table-column :label="$t('msg.excel.avatar')">
        <template #default="{ row }">
          <el-image
            :src="row.avatar"
            :preview-src-list="[row.avatar]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="{ row }">
          <div v-if="row.role && row.role.length > 0">
            <el-tag v-for="(item, index) in row.role" :key="index" size="mini">
              {{ item.title }}
            </el-tag>
          </div>
          <div v-else>
            <el-tag size="mini">
              {{ $t('msg.excel.defaultRole')}}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('msg.excel.openTime')" prop="openTime">
      </el-table-column>
      <el-table-column
        :label="$t('msg.excel.action')"
        fixed="right"
        width="260"
      >
        <template v-slot="{ row }">
          <el-button @click="showUserDetail(row)" type="primary" size="mini">
            {{ $t('msg.excel.show')}}
          </el-button>
          <el-button type="info" v-permission='["distributeRole"]'  @click="showRole(row)" size="mini">
            {{ $t('msg.excel.showRole')}}
          </el-button>
          <el-button v-permission="['removeUser']" type="danger" @click="deleteUserById(row)" size="mini">
            {{ $t('msg.excel.remove')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <role v-model="roleDialogVisible" :userId="id" @updateRolesSuccess="getList"></role>
    <el-pagination
      :page-sizes="[1, 2, 5, 10]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { defineComponent, ref, onActivated } from 'vue'
import { getMangeList, deleteUser } from '@/api/user-manage'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ExportUser from '../ExportUser/index.vue'
import Role from '../../role/index.vue'

export default defineComponent({
  components: {
    ExportUser,
    Role
  },
  setup () {
    const tableData = ref([])
    const total = ref(0)
    const page = ref(0)
    const size = ref(2)
    const dialogVisible = ref(false)
    const roleDialogVisible = ref(false)
    const id = ref(null)

    const router = useRouter()
    const i18n = useI18n()
    const naviToUserImport = () => {
      router.push('/manage/user-import')
    }
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
    onActivated(() => {
      getList()
    })
    const handleSizeChange = (pageSize) => {
      debugger
      size.value = pageSize
      getList()
    }
    const handleCurrentChange = (currSize) => {
      page.value = currSize
      getList()
    }
    const openDialog = () => {
      dialogVisible.value = true
    }
    const deleteUserById = (row) => {
      ElMessageBox.confirm(
        i18n.t('msg.excel.dialogTitle1') +
        row.username +
        i18n.t('msg.excel.dialogTitle2'),
        {
          type: 'warning'
        }
      ).then(() => {
        return deleteUser(row._id)
      }).then(() => {
        ElMessage.success(i18n.t('msg.excel.removeSuccess'))
        getList()
      }).catch(e => ElMessage.error('remove failure'))
    }
    const showUserDetail = (row) => {
      const id = row._id
      router.push(`/manage/user-detail/${id}`)
    }
    const showRole = (row) => {
      id.value = row._id
      roleDialogVisible.value = true
    }
    return {
      dialogVisible,
      roleDialogVisible,
      tableData,
      total,
      id,
      getList,
      handleSizeChange,
      handleCurrentChange,
      openDialog,
      showRole,
      deleteUserById,
      showUserDetail,
      naviToUserImport
    }
  }
})
</script>

<style scoped>

</style>
