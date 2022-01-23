<template>
  <el-dialog :model-value="modelValue" title="Shipping address" @closed="closeDialog">
    <pick-color></pick-color>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">{{ $t('msg.universal.confirm') }}</el-button>
        <el-button type="primary" @click="closeDialog"
          >{{ $t('msg.universal.cancel') }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import PickColor from './PickColor'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  components: {
    PickColor
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const closeDialog = () => {
      emit('update:modelValue', false)
    }
    return {
      closeDialog
    }
  }
})
</script>
