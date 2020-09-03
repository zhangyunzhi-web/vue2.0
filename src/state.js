//初始化状态的某个属性的扩展

import {
    observer
} from "./observer/index.js";


export function initState(vm) { //vm.$options
    // console.log(vm)
    const opts = vm.$options;
    if (opts.props) {
        initProps(vm);
    }
    if (opts.methods) {
        initMethods(vm);
    }
    if (opts.data) {
        initData(vm);
    }
    if (opts.computed) {
        initComputed(vm);
    }
    if (opts.watch) {
        initWatch(vm);
    }

}

function initProps() {}

function initMethods() {}

function initData(vm) { //数据的初始化操作
    let data = vm.$options.data
    // console.log(data);
    vm._data = data = typeof data == 'function' ? data.call(vm) : data
    // console.log(data)

    //数据的劫持方案 对象Object.defineProperty defineProperty可以重新定义get和set方法
    //数组  单独处理的 
    observer(data)
}

function initComputed() {}

function initWatch() {}