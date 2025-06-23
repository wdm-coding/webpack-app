import './test.scss'
import _ from 'lodash'
const list = _.chunk([1, 2, 3, 4], 2) // 作用 是将数组拆分成二维数组，每组包含2个元素
console.log('main.js已加载')
console.log('main.js-list',list)
import('./log.js').then(res=>{
  console.log(121)
  res(666)
})

export default function sayHello(name) {
  console.log('Hello',name)
}
