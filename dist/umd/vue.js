(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  // 拿到数组原型上原有的方法
  var oldArrayProtoMethods = Array.prototype; // 继承一下   array.__proto__ = oldArrayProtoMethods

  var arrayMethods = Object.create(oldArrayProtoMethods);
  var methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'];
  methods.forEach(function (methods) {
    arrayMethods[methods] = function () {
      console.log('数组方法被调用了');
      var result = oldArrayProtoMethods[methods].apply(this, arguments);
      return result;
    };
  }); // arrayMethods.concat = function (){    // 没有重写的你可以沿着原型链找，他还是原来的
  // }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      //使用defineProperty 重新定义属性
      // console.log(value);
      if (Array.isArray(value)) {
        // 我希望调用 pop shift unshift push reverse sort splice 时，先做自己想做的事，再进行调用
        // 函数劫持、切片编程
        value.__proto__ = arrayMethods;
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data); //获取对象的key

        keys.forEach(function (key) {
          defineReactive(data, key, data[key]); //Vue.util.defineReactive
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    observer(value); //如果值是对象类型在进行观测

    Object.defineProperty(data, key, {
      get: function get() {
        // console.log('用户获取值了',data,key,value);
        console.log('取值');
        return value;
      },
      set: function set(newValue) {
        console.log('设置值'); // console.log('用户设定值了',data,key,value)

        if (newValue == value) return;
        observer(newValue); //如果用户将值改为对象继续监控

        value = newValue;
      }
    });
  }

  function observer(data) {
    //typeof null 也是对象
    // 不能不是对象 并且不是null才能监控
    if (_typeof(data) !== 'object' || data == null) {
      return;
    } // console.log(data)


    return new Observer(data);
  }

  //初始化状态的某个属性的扩展
  function initState(vm) {
    //vm.$options
    // console.log(vm)
    var opts = vm.$options;

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    //数据的初始化操作
    var data = vm.$options.data; // console.log(data);

    vm._data = data = typeof data == 'function' ? data.call(vm) : data; // console.log(data)
    //数据的劫持方案 对象Object.defineProperty defineProperty可以重新定义get和set方法
    //数组  单独处理的 

    observer(data);
  }

  //对当前初始化的操作进行初始化
  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      // console.log(options)
      var vm = this;
      vm.$options = options; //初始化状态（将数据做一个初始化的劫持 当我改变数据时应该更新视图）
      // vue组件中有很多状态 data props watch computed

      initState(vm); //
      // vue里面核心特性  响应式数据原理
      // Vue 是一个什么样的框架 MVVM
      // 数据变化视图会更新，视图变化数据会被影响  (MVVM)不能跳过数据去更新视图,$ref
    };
  }

  //构造函数的原型上扩展方法
  //     }
  //     b(){
  //     }
  //     c(){
  //     }
  // }

  function Vue(options) {
    // console.log(options)
    this._init(options); //入口方法，做初始化操作

  } //写成一个个的插件进行对原型的扩展
  //初始化方法
  // Vue.prototype._init = function (options) {
  // }


  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
