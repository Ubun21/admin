<template>
 <el-dialog
   :title="$t('msg.excel.roleDialogTitle')"
   :model-value="modelValue"
   @close="closed"
 >
   <el-checkbox-group @change="checkBoxChange" v-model="rolesTitle">
     <el-checkbox
      v-for="(item, index) in roles"
      :label="item.title"
      :key="index"
     ></el-checkbox>
   </el-checkbox-group>
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
import { roleList } from '@/api/role.js'
import { userRoles, updateRole } from '@/api/user-manage.js'
import { ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'Role',
  emits: ['update:modelValue', 'updateRolesSuccess'],
  props: {
    modelValue: {
      type: Boolean
    },
    userId: {
      type: String
    }
  },
  setup (props, context) {
    const roles = ref([])
    const rolesTitle = ref([])
    const isCheckBoxChange = ref(false)
    const getRoles = async () => {
      const res = await roleList()
      roles.value = res
    }
    const i18n = useI18n()
    const checkBoxChange = () => {
      isCheckBoxChange.value = true
    }
    const getRolesTitle = async () => {
      const res = await userRoles(props.userId)
      rolesTitle.value = res.role.map(role => role.title)
    }
    const closed = () => {
      context.emit('update:modelValue', false)
    }
    const onConfirm = async () => {
      if (!isCheckBoxChange.value) {
        closed()
        return
      }
      const rol = rolesTitle.value.map(title => {
        return roles.value.find(role => role.title === title)
      })
      await updateRole(props.userId, rol)
      context.emit('updateRolesSuccess')
      ElMessageBox(i18n.t('msg.role.updateRoleSuccess'))
      closed()
    }
    getRoles()
    watch(
      () => props.userId,
      (vale) => {
        debugger
        if (vale) {
          debugger
          getRolesTitle()
        }
      }
    )
    return {
      roles,
      rolesTitle,
      closed,
      onConfirm,
      checkBoxChange
    }
  }
})
</script>

<style lang="scss" scoped></style>
