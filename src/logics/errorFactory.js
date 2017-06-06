/**
 * 创建异常的工厂类,里面定义了一些系统异常的创建功能
 * @type {{}}
 */
var errorFactory = {
  /**
   * 判断异常是否是指定异常类
   * @param {Object} error            需要判断的异常对象
   * @param {Object} errorName        异常的名字
   */
  isError: function (error, errorName) {
    return error && error._errorName == errorName;
  },
};
export default errorFactory;

//系统异常超类
var BaseException = function (name,err) {
  //error是真正的错误，记录着调用的堆栈信息
  this._error = new Error();
  this.error = err;
  //异常的名字
  this._errorName = name;
};
BaseException.prototype = {
  getStack : function(){
    return this._error.stack;
  },
};

//注册的几个系统异常
//用户取消异常  什么也不做
errorFactory.userCancelFactory = function(err){
  return new BaseException("userCancel", err);
}

//网络异常
errorFactory.httpFactory = function(err){
  return new BaseException("http", err);
}

//510服务器提示异常
errorFactory.serverFactory = function(err){
  var error = new BaseException("server",err);
  error.code = err.data.code;
  error.message = err.data.message;
  return error;
}

//提示错误异常
errorFactory.showMsgFactory = function(message, err){
  var error = new BaseException("showMsg",err);
  error.message = message;
  return error;
}

// 401 登录失效异常
errorFactory.loginErrFactory = function (message, err) {
  // console.log("test")
  var error = new BaseException("loginErr",err);
  error.message = message;
  return error;
}
