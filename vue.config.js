const proxyPath = ['permission', 'role', 'user-manage', 'sys', 'user', 'profile']
const isNoNeedProxy = (url) => {
  let exits = true
  proxyPath.forEach(item => {
    if (url.indexOf(item) > -1) {
      exits = false
    }
  })
  return exits
}
module.exports = {
  devServer: {
    // 配置反向代理
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      '/api': {
        // 要代理的服务器地址  这里不用写 api
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true, // 是否跨域,
        bypass: function (req, res, proxyOptions) {
          if (isNoNeedProxy(req.originalUrl)) {
            console.info(req.originalUrl, 'no proxy')
            return res.send({ test: 'ok' })
          }
        }
      }
    }
  }
}

