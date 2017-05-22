/**
 * Created by Gaohan on 2017/5/22.
 */
import { observable } from 'mobx';
import axios from 'axios';
import { EventEmitter } from 'fbemitter';

import config from './config';
import errorFactory from '../core/errorFactory';

// 监听器，监听token是否失效
const RPC = new EventEmitter();
const emit = RPC.emit.bind(RPC);
export default RPC;

// mobx添加全局token
const token = observable(null);
export function getToken() {
  return token.get();
}

export function saveToken(_token) {
  token.set(_token);
  return AsyncStorage.setItem(KEY_TOKEN, token);
}

export async function loadToken() {
  token.set(await AsyncStorage.getItem(KEY_TOKEN));
  return token.get();
}

export async function clearToken() {
  await AsyncStorage.removeItem(KEY_TOKEN);
  token.set(null);
}


let baseUri = config.baseUrl;

//包装系统异常部分
function middleware(error) {
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
          break;
        case 403:
        case 405:
          error = errorFactory.showMsgFactory('无权限访问，请求失败', error.response);
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
