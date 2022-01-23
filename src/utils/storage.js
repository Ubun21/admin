export const saveItem = (key, object) => {
  let value = object
  if (typeof value === 'object') {
    value = JSON.stringify(object)
  }
  window.localStorage.setItem(key, value)
}
export const getItem = (key) => {
  return window.localStorage.getItem(key) || null
}
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
export const removeItemAll = () => {
  window.localStorage.clear()
}
