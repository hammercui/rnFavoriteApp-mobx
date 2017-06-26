/**
 * Created by Gaohan on 2017/5/22.
 */
import { AsyncStorage } from 'react-native';
import { observable } from "mobx";
import axios from 'axios';
import { EventEmitter } from 'fbemitter';

import tools from './tools';
import config from './config';
import errorFactory from '../logics/errorFactory';
import * as Logger from "../utils/Logger";
// 监听器，监听token是否失效
const RPC = new EventEmitter();
const emit = RPC.emit.bind(RPC);
export default RPC;

/**
 * Token操作
 */
// mobx添加全局token = accessToken
const token = observable(null);
/**
 * 获取当前accessToken
 */
export function getToken() {
  return token.get();
}
/**
 * 保存当前accessToken
 * @param _token
 * @returns {*|Promise}
 */
export function saveToken(_token) {
  token.set(_token);
  return _token;
}

/**
 * 保存refreshToken
 * @param _refreshToken
 * @returns {*|Promise}
 */
export function saveRefreshToken(_refreshToken) {
  return AsyncStorage.setItem(config.storeKeys.SAVED_REFRESH_TOKEN, _refreshToken);
}

/**
 * 从缓存读取refreshToken
 * @returns {Promise.<void>}
 */
export async function loadRefreshToken() {
    let  refreshToken = await AsyncStorage.getItem(config.storeKeys.SAVED_REFRESH_TOKEN, );
    return refreshToken;
}


/**
 * 清空refreshToken和accessToken
 * @returns {Promise.<void>}
 */
export async function clearToken() {
  await AsyncStorage.removeItem(config.storeKeys.SAVED_REFRESH_TOKEN, );
  token.set(null);
}


/**
 * 网络请求设置
 * @type {{Content-Type: string}}
 */
const headers = {
  'Content-Type': 'application/json;charset=utf-8'
};

export let instance = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
  withCredentials: false,
  responseType: 'json',
  headers: headers,
});

// axios 拦截器
instance.interceptors.request.use(function (config) {
  //固定token
  if (config.noAuthorization) {
    config.headers.Authorization = 'Basic Y2xpZW50YXBwOjEyMzQ1Ng==';
  } else {
    // 设置头
    if (token.get()) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      console.log(`拦截器 设置accessToken ${token.get()}`);
      config.headers.Authorization = `bearer ${token.get()}`;
    }
  }
  return config;
}, function (error) {
  console.log("error", error);
  return Promise.reject(error);
});


/**
 *
 * @param type  'GET','POST','DELETE','PUT'
 * @param url
 * @param config
 * @param request
 * @param response
 * @param error bool型true表示是error
 */
function requestGroupLog(type,url,config,request,response,error=false) {
  Logger.groupStart(type, url);
  //if(request && request.toString() !== "[object Object]") //request 不等于{}
    console.log("request", request);
  //if(config && config.toString() !== "[object Object]")
    console.log("config", config);
  if(error){
    console.log("Error", {...response});
  }else{
    console.log("response", response);
  }
  Logger.groupEnd(type, url);
}

/**
 * 网络请求
 */
export let request = () => {
  return {
    get: (url, config = {}) => {
      return instance.get(url, config)
        .then(response => {
          requestGroupLog('GET',url,config,{},response);
          return response.data;
        })
        .catch((error) => {
          requestGroupLog('GET',url,config,{},error,true);
          throw middleware(error);
        });
    },
    post: (url, data = {}, config = {}) => {
      return instance.post(url, data, config)
        .then(response => {
          requestGroupLog('POST',url,config,data,response);
          return response.data
        })
        .catch((error)=>{
          requestGroupLog('POST',url,config,data,error,true);
          throw middleware(error);
        });
    },
    delete: (url, config = {}) => {
      return instance.delete(url, config)
        .then(response =>{
          requestGroupLog('DELETE',url,config,{},response);
          return response.data;
        })
        .catch((error) => {
          requestGroupLog('DELETE',url,config,{},error,true);
          throw middleware(error);
        });
    },
    put:(url,data={},config={})=>{
      return instance.put(url, data, config)
        .then(response=>{
          requestGroupLog('PUT',url,config,data,response);
          return response.data
        })
        .catch((error)=>{
          requestGroupLog('PUT',url,config,data,error,true);
          throw  middleware(error);
        });
    }

  }
};

/**
 * 刷新AccessToken
 * @param params
 * @returns {*}
 */
export const refreshAccessToken = async () => {
  let refreshToken = await loadRefreshToken();
  if (!refreshToken) {
    return new Promise.reject("refreshToken不存在");
  }
  const refresh_token_params = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  };
  const params = tools.queryStringify(refresh_token_params, '?');
  const url = '/oauth/token' + params;
  return request().post(url, null, { noAuthorization: true })
    .then(data => {
      const {access_token} = data;
      saveToken(access_token);
    })
    .catch(error => {
      throw error;
    })
};


//包装系统异常部分
export function middleware(error) {
  if (error && error.config && error.hasOwnProperty("response")) {
    if (error.response) {
      switch (error.response.status) {
        case 0:
        case 502:
          error = errorFactory.httpFactory(error.response);
          break;
        case 401:
          // console.info(error.response)
          error = errorFactory.loginErrFactory('认证授权失败,请登录', error.response);
          emit('invalidToken');
          break;
        case 403:
          error = errorFactory.showMsgFactory('用户名或密码错误', error.response);
        case 405:
          error = errorFactory.showMsgFactory('无权限访问，请求失败', error.response);
          emit('invalidToken');
          break;
        case 429:
          error = errorFactory.showMsgFactory('因为访问频繁，你已经被限制访问，稍后重试', error.response);
          break;
        case 510:
          error = errorFactory.serverFactory(error.response);
          break;
        default:
          error = errorFactory.showMsgFactory(error.response.status + ' 服务异常,稍后重试', error.response);
      }
    } else {
      if (error.config) {
        error = errorFactory.httpFactory({ config: error.config });
      } else {
        error = errorFactory.httpFactory({});
      }

    }
  }

  //console.log("middleware error处理后",error);
  return error;
}

