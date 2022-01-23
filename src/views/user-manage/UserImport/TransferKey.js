export const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}

const transferKey = (result) => {
  const arr = []
  result.forEach(item => {
    const row = {}
    Object.keys(item).forEach(key => {
      row[USER_RELATIONS[key]] = item[key]
    })
    arr.push(row)
  })
  return arr
}

export default transferKey
