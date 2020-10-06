import {
    arrayMethods
} from "./array";

class Observer {
    constructor(value) {
        //使用defineProperty 重新定义属性
        // console.log(value);
        if (Array.isArray(value)) {
            // 我希望调用 pop shift unshift push reverse sort splice 时，先做自己想做的事，再进行调用
            // 函数劫持、切片编程
            value.__proto__ = arrayMethods
            // 观测数组里面的对象类型，对象发生变化也要做一些事情
            this.observerArray(value)
        } else {
            this.walk(value);
        }

    }
    observerArray(value) {
        value.forEach(item => {
            observer(item); //观测数组类型中的对象类型
        })
    }
    walk(data) {
        let keys = Object.keys(data); //获取对象的key
        keys.forEach(key => {
            defineReactive(data, key, data[key]); //Vue.util.defineReactive
        });
    }
}

function defineReactive(data, key, value) {
    observer(value) //如果值是对象类型在进行观测
    Object.defineProperty(data, key, {
        get() {
            // console.log('用户获取值了',data,key,value);
            console.log('取值')
            return value
        },
        set(newValue) {
            console.log('设置值')
            // console.log('用户设定值了',data,key,value)
            if (newValue == value) return;
            observer(newValue) //如果用户将值改为对象继续监控
            value = newValue
        }
    })
}
export function observer(data) {
    //typeof null 也是对象
    // 不能不是对象 并且不是null才能监控
    if (typeof data !== 'object' || data == null) {
        return;
    }
    // console.log(data)
    return new Observer(data)
}