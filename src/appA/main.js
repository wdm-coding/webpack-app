import './test.scss'
import _ from 'lodash'
import newList from './test.js'
const list = _.chunk([1, 2, 3, 4], 2) // 作用 是将数组拆分成二维数组，每组包含2个元素
console.log('main.js已加载',newList)
console.log('main.js-list',list)
import('./log.js').then(res=>{
  res(666)
})
import Vue from 'myVue';
console.log(Vue)
export default function sayHello(name) {
  console.log('Hello',name)
}
