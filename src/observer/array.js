// 拿到数组原型上原有的方法
let oldArrayProtoMethods = Array.prototype;

// 继承一下   array.__proto__ = oldArrayProtoMethods
export let arrayMethods = Object.create(oldArrayProtoMethods);

let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'reverse',
    'sort'
]
methods.forEach(methods => {
    arrayMethods[methods] = function () {
        console.log('数组方法被调用了')
        const result = oldArrayProtoMethods[methods].apply(this, arguments)
        switch (method) {
            case 'psuh':
            case 'unshift': //这两个方法都是追加，追加的内容可能是对象类型，应该被再次劫持
                break;

            default:
                break;
        }
        return result;
    }

});


// arrayMethods.concat = function (){    // 没有重写的你可以沿着原型链找，他还是原来的

// }