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

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      //使用defineProperty 重新定义属性
      this.walk(value);
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
    Object.defineProperty(data, key, {
      get: function get() {
        console.log('用户获取值了');
        return value;
      },
      set: function set(newValue) {
        console.log('用户设定值了');
        if (newValue == value) return;
        value = newValue;
      }
    });
  }

  function observer(data) {
    if (_typeof(data) !== 'object' && data !== null) {
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
    var data = vm.$options.data;
    console.log(data);
    vm._data = data = typeof data == 'function' ? data.call(vm) : data;
    console.log(data); //数据的劫持方案 对象Object.defineProperty defineProperty可以重新定义get和set方法
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
