/**
 * Created by Gaohan on 2017/5/24.
 */

import { observable, autorun, action, computed, toJS, } from 'mobx';
import { request, saveToken, saveRefreshToken, loadRefreshToken } from '../utils/request';
import tools from '../utils/tools';

export default class UserInfoForm {

  @observable
  avatarUrl = '';
  @observable
  phoneNumber = '';
  @observable
  shopName = '';
  @observable
  userName = '';

  constructor () {
  }

  /**
   * 测试用 获取用户信息
   */
  getUserInfo() {
    return request()
      .get('/user/user_detail')
      .then(
        data=>{
          if (data) {
            this.avatarUrl = data.avatarUrl;
            this.phoneNumber = data.phoneNumber;
            this.shopName = data.shopName;
            this.userName = data.userName;
          }
        }
      )
  }
}
