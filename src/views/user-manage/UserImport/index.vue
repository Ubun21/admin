<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button  type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import XLSX from 'xlsx'
import { getHeaderRow } from '@/utils/getHeaderRow.js'
import { userBatchImport } from '@/api/user-manage.js'
import transferKey from './TransferKey'
export default defineComponent({
  name: 'UserImport',
  setup () {
    const excelUploadInput = ref(null)
    const router = useRouter()
    const i18n = useI18n()
    const handleUpload = () => {
      excelUploadInput.value.click()
    }
    const handleChange = () => {
      const file = excelUploadInput.value.files[0]
      readData(file).then(({ result }) => {
        const data = transferKey(result)
        return userBatchImport(data)
      }).then(respons => {
        if (respons.success) {
          ElMessage.success({
            type: 'success',
            message: i18n.t('msg.excel.importSuccess')
          })
          router.push('/manage/employ-manage')
        }

        console.info(respons, 'response')
      })
    }
    const readData = rawFile => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
          const data = e.target.result
          const workBook = XLSX.read(data, { type: 'array' })
          const firsSheetName = workBook.SheetNames[0]
          const firstTable = workBook.Sheets[firsSheetName]
          const header = getHeaderRow(firstTable)
          const result = XLSX.utils.sheet_to_json(firstTable)
          resolve({ header, result })
        }
        fileReader.readAsArrayBuffer(rawFile)
      })
    }
    return {
      excelUploadInput,
      handleChange,
      handleUpload
    }
  }
})
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
