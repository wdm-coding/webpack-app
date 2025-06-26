const Koa = require('koa')
const app = new Koa()
const koaStatic = require('koa-static') // 静态资源服务中间件
const React = require('react')
const ReactDOM = require('react-dom/server')
const path = require('path')
app.use(koaStatic(__dirname + '../../build/build'),{index:false}) // 静态文件目录为根目录下的 build 目录

app.use(async ctx => { // 中间件，处理所有请求
  const {default: App} = await import('../shared/App.js') // 动态导入组件
  const html = ReactDOM.renderToString(React.createElement(App)) // 服务端渲染组件为 HTML 字符串
  const htmlTpl = fs.readFileSync(path.resolve(__dirname, '../../build/index.html'), 'utf8') // 读取模板文件
  const htmlStr = htmlTpl.replace('<!--html-->', html) // 将渲染的 HTML 字符串替换到模板中
  ctx.type = 'html'
  ctx.body = htmlStr
})

app.listen(3000)