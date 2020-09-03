//构造函数的原型上扩展方法


//es6的类的写法  一个整体
// class Vue{

import { initMixin } from "./init";

//     a(){

//     }
//     b(){

//     }
//     c(){

//     }
// }

function Vue(options){
    // console.log(options)
    this._init(options);//入口方法，做初始化操作
}

//写成一个个的插件进行对原型的扩展

//初始化方法
// Vue.prototype._init = function (options) {

// }
initMixin(Vue)

export default Vue;