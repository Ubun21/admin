<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermissions"
      show-checkbox
      node-key="id"
      check-strictly
      default-expand-all
      :props="defaultProps"
      @check-change="checkChange = true"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'
import { rolePermission, distributePermission } from '@/api/role'
import { permissionList } from '@/api/permission'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'AssignPermission',
  props: {
    modelValue: {
      type: Boolean
    },
    rowId: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const allPermissions = ref([])
    const treeRef = ref(null)
    const checkChange = ref(false)
    const i18n = useI18n()
    const defaultProps = ref({
      children: 'children',
      label: 'permissionName'
    })
    const closed = () => {
      context.emit('update:modelValue', false)
    }
    const getRolePermission = async () => {
      const allPermissionRes = await permissionList()
      const hasPermissionRes = await rolePermission(props.rowId)
      allPermissions.value = allPermissionRes
      treeRef.value.setCheckedKeys(hasPermissionRes)
    }
    watch(
      () => props.rowId,
      (val) => {
        if (val) {
          getRolePermission()
        }
      }
    )
    const onConfirm = async () => {
      if (!checkChange.value) {
        closed()
        return
      }
      const data = treeRef.value.getCheckedKeys()
      const roleId = props.rowId
      debugger
      await distributePermission({
        roleId: roleId,
        permissions: data
      })
      ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
      closed()
    }
    return {
      treeRef,
      allPermissions,
      defaultProps,
      closed,
      onConfirm,
      checkChange
    }
  }
})
</script>
