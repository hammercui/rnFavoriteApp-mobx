/**
 * Created by Gaohan on 2017/5/23.
 */
import { observable, autorun, action, computed, toJS } from 'mobx';
import { request, saveToken, saveRefreshToken, loadRefreshToken } from '../utils/request';
import tools from '../utils/tools';

export class LoginForm {
  constructor() {
  }


  @observable
  username = '13889375872';

  @observable
  password = '111111';

  grant_type = 'password';

  @computed
  get goto() {
    return mobile + pwd;
  }

  /**
   * 登录获取token
   * @returns {*|Promise.<U>|Promise.<TResult>}
   */
  submit() {
    const data = toJS(this);
    const params = tools.queryStringify(data, '?');
    return request().post(
      '/oauth/token' + params,
      data,
      {
        auth: {
          username: 'clientapp',
          password: '123456'
        },
      }
    ).then(data => {
      const { access_token, refresh_token } = data;
        console.log("login_token", data);
        saveToken(access_token);
        saveRefreshToken(refresh_token);
      }
    )
    // .catch(err => {
    //   console.log("err", err);
    //   // console.log("err", err.error.data || "");
    // })
  }


  /**
   * 刷新token
   * @param params
   * @returns {*}
   */

  async refresh_token() {
    const refresh_token_params = {
      refresh_token: await loadRefreshToken(),
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
  }


  /**
   * 测试用 获取用户信息
   */
  getUserInfo() {
    return request().get('/user/user_detail').then(data=>{console.log("用户信息", data)})
  }
}