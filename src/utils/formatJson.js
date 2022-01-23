// 将对象的key丢弃，把值保存到数组
export const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}

export const formatJSON = (rows) => {
  return rows.map(row => {
    return Object.keys(USER_RELATIONS).map(key => {
      if (USER_RELATIONS[key] === 'role') {
        const roles = row[USER_RELATIONS[key]]
        return JSON.stringify(roles.map(role => role.title))
      }
      return row[USER_RELATIONS[key]]
    })
  })
}
