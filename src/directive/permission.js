import store from '@/store/index'

function checkPermission (el, binding) {
  const points = store.getters.userInfo.permission.points
  const { value } = binding
  if (value && value instanceof Array) {
    const hasPermission = points.some(point => {
      return value.includes(point)
    })
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('binding value ["admin", "test"]')
  }
}

export default {
  mounted (el, binding) {
    checkPermission(el, binding)
  },
  update (el, binding) {
    checkPermission(el, binding)
  }
}
