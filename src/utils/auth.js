import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '../store/constant/index'
import { saveItem, getItem, removeItem } from './storage'

export const getTimeStamp = () => {
  return getItem(TIME_STAMP)
}

export const saveTimeStamp = () => {
  saveItem(TIME_STAMP, Date.now())
}

export const clearTimeStamp = () => {
  removeItem(TIME_STAMP)
}

export const checkTimeStamp = () => {
  const timeStamp = getItem(TIME_STAMP)
  return (Date.now() - timeStamp) < TOKEN_TIMEOUT_VALUE
}
