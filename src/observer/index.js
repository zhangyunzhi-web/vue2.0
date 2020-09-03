
class Observer{
    constructor(value){
        //使用defineProperty 重新定义属性
        this.walk(value);
    }
    walk(data){
        let keys=Object.keys(data); //获取对象的key
        keys.forEach(key => {
            defineReactive(data,key,data[key]);  //Vue.util.defineReactive
        });
    }
}
function defineReactive(data,key,value){
    observer(value)   //如果值是对象类型在进行观测
    Object.defineProperty(data,key,{
        get(){
            // console.log('用户获取值了',data,key,value);
            return value
        },
        set(newValue){
            // console.log('用户设定值了',data,key,value)
            if(newValue==value) return;
            observer(newValue)  //如果用户将值改为对象继续监控
            value = newValue
        }
    })
}
export function observer(data) {
    //typeof null 也是对象
    // 不能不是对象 并且不是null才能监控
    if(typeof data !== 'object' || data == null){
        return;
    }
    // console.log(data)
    return new Observer(data)
}