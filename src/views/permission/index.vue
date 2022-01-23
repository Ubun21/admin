<template>
 <div class="">
   <el-card>
     <el-table
       :data="allPermission"
       style="width: 100%; margin-bottom: 20px"
       row-key="id"
       border
       default-expand-all
       :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
     >
       <el-table-column
         prop="permissionName"
         :label="$t('msg.permission.name')"
         width="180"
       >
       </el-table-column>
       <el-table-column
         prop="permissionMark"
         :label="$t('msg.permission.mark')"
         width="180"
       >
       </el-table-column>
       <el-table-column
         prop="permissionDesc"
         :label="$t('msg.permission.desc')"
       >
       </el-table-column>
     </el-table>
   </el-card>
 </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { permissionList } from '@/api/permission'
export default defineComponent({
  setup () {
    const allPermission = ref([])
    const getAllPermission = async () => {
      const res = await permissionList()
      allPermission.value = res
      console.info(res)
    }
    getAllPermission()
    return {
      allPermission
    }
  }
})
</script>

<style scoped>

</style>
