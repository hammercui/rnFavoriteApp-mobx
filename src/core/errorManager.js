import {DropdownAlertHandler} from '../components/dropdownAlert';


//errorFactory注册的异常
var errorList = {};

//对外暴漏的对象，负责注册异常的处理策略，调用已经注册的系统异常处理
var errorManager = {
  /**
   * 注册异常，将类放入error列表中，并让注册处理函数
   * @param {Object} name            异常的名字
   * @param {Object} handle        异常的处理函数
   */
  registerErrorHandle: function (name, handle) {
    if (typeof handle != "function") {
      return new TypeError("handle is not function");
    }

    //注册
    errorList[name] = {
      handle: handle
    }
  },

  /**
   * 判断异常是否是指定异常类
   * @param {Object} error            需要判断的异常对象
   * @param {Object} errorName        异常的名字
   */
  isError: function (error, errorName) {
    return error && error._errorName == errorName;
  },

  /**
   * 判断异常是否是指定异常类
   * @param {Object} errorName        异常的名字
   */
  findError: function (errorName) {
    return errorList[errorName];
  },

  /**
   * 处理错误，根据不同的异常类型，使用注册的异常方法处理去处理异常。这个就是在边界类上进行统一异常处理的方法
   * @param {Object} error            需要处理的异常
   * @param {Object} defaultHandle    当异常和所有注册的异常都不匹配的时候，做出的默认处理。这个参数可以是一个字符串，也可以是函数。如果是字符串就alert这个字符串，函数就执行这个函数
   */
  handleErr: function (error, otherHandle) {
    if (!error || !error._errorName || !this.findError(error._errorName)) {
      //发现error是未注册异常时候调用的方法
      if (typeof otherHandle == 'function') {
        otherHandle(error);
      } else {
        // console.log(error);
        DropdownAlertHandler.showError(otherHandle);
      }
    } else {
      // console.log( error.getStack());
      //将错误源和系统默认的错误处理方法，都传递给注册的异常处理方法
      this.findError(error._errorName).handle(error, function () {
        if (typeof otherHandle == 'function') {
          otherHandle(error);
        } else {
          DropdownAlertHandler.showError(otherHandle);
        }
      });
    }
  },
}
export default errorManager;

//注册的几个系统异常
//用户取消异常  什么也不做
function userCancelHandle(err) {
  //用户取消异常，什么也不做
}
errorManager.registerErrorHandle("userCancel",userCancelHandle);


//网络异常
function httpHandle(err) {
  //提示链接不到服务器
  DropdownAlertHandler.showError("无法访问到服务器！");
}
errorManager.registerErrorHandle("http",httpHandle);

//510服务器提示异常
function serverHandle(err) {
  if(err.message ){
    DropdownAlertHandler.showError(err.message);
  }
}
errorManager.registerErrorHandle("server",serverHandle);

//提示错误异常
function showMsgHandle(err) {
  if(err.message ){
    DropdownAlertHandler.showError(err.message);
  }
}
errorManager.registerErrorHandle("showMsg",showMsgHandle);

// 登录失效异常处理
function loginErrorHandle(err) {
  if(err.message ){
    DropdownAlertHandler.showError(err.message);
  }

  // 清空accessToken
  // @@@TODO
}
errorManager.registerErrorHandle("loginErr", loginErrorHandle);
