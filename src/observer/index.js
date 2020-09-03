
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
    Object.defineProperty(data,key,{
        get(){
            console.log('用户获取值了')
            return value
        },
        set(newValue){
            console.log('用户设定值了')
            if(newValue==value) return;
            value = newValue
        }
    })
}
export function observer(data) {
    if(typeof data !== 'object' && data !== null){
        return;
    }
    // console.log(data)
    return new Observer(data)
}