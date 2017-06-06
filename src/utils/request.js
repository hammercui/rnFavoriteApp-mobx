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

// 监听器，监听token是否失效
const RPC = new EventEmitter();
const emit = RPC.emit.bind(RPC);
export default RPC;

/**
 * Token操作
 */
// mobx添加全局token
const token = observable(null);
/**
 * 获取当前token
 */
export function getToken() {
  return token.get();
}
/**
 * 保存当前token
 * @param _token
 * @returns {*|Promise}
 */
export function saveToken(_token) {
  token.set(_token);
  return _token;
}

/**
 * 保存刷新token
 * @param _refreshToken
 * @returns {*|Promise}
 */
export function saveRefreshToken(_refreshToken) {
  return AsyncStorage.setItem(config.storeKeys.SAVED_ACCESS_TOKEN, _refreshToken);
}

/**
 * 从缓存读取refreshToken
 * @returns {Promise.<void>}
 */
export async function loadRefreshToken() {
  const refreshToken = await AsyncStorage.getItem(config.storeKeys.SAVED_ACCESS_TOKEN,);
  return refreshToken;
}


/**
 * 清空token
 * @returns {Promise.<void>}
 */
export async function clearToken() {
  await AsyncStorage.removeItem(config.storeKeys.SAVED_ACCESS_TOKEN,);
  token.set(null);
}


/**
 * 刷新token
 * @param params
 * @returns {*}
 */
export let refreshToken =  async () => {
  let refreshToken = await loadRefreshToken();

  if (!refreshToken) {
    return new Promise.reject();
  }

  const refresh_token_params = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
    client_id: 'clientapp',
    client_secret: '123456'
  };
  return request().post(
    '/oauth/token' + tools.queryStringify(refresh_token_params, '?'),
    refresh_token_params,
    {
      auth: {
        username: 'clientapp',
        password: '123456'
      },
    }
  ).then(data => {
      const { access_token } = data;
      console.log("login_token", data);
      saveToken(access_token);
    }
  )
};

/**
 * 网络请求设置
 * @type {{Content-Type: string}}
 */
const headers = {
  'Content-Type': 'application/json;charset=utf-8'
};

let instance =  axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
  withCredentials: false,
  responseType: 'json',
  headers: headers,
});

// axios 拦截器
instance.interceptors.request.use(function (config) {
  // 设置头
  if (token.get()) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    console.log(`设置TOKEN ${token.get()}`);
    config.headers.Authorization = `bearer ${token.get()}`;
  }
  return config;
}, function (err) {
  console.log("err", err);
  return Promise.reject(err);
});

/**
 * 网络请求
 */
export let request = () => {
  return {
    get: (url, config={}) => {
      if (__DEV__) {
        console.log(`${url} ${config}`);
        if (config) {
          console.log("config", config);
        }
      }
      return instance.get(url, config)
        .then(data=>data.data)
        .catch(middleware);
    },
    post: (url, data={}, config={}) => {
      if (__DEV__) {
        console.log(`${url} ${data} ${config}`);
        if (data) {
          console.log("data",data);
        }
        if (config) {
          console.log("config", config);
        }
      }
      return instance.post(url, data, config)
        .then(data=>data.data)
        .catch(middleware);
    },
    delete: (url, config={}) => {
      return instance.delete(url, config)
        .then(data=>data.data)
        .catch(middleware);
    }
  }
};



//包装系统异常部分
function middleware(error) {
  console.log(error);
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
        error = errorFactory.httpFactory({config: error.config});
      } else {
        error = errorFactory.httpFactory({});
      }

    }
  }
  throw error;
}

