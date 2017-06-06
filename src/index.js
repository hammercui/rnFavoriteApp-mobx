/**
 * Created by Gaohan on 2017/5/18.
 */
import React,{PureComponent} from "react";
import { AppRegistry, View, StyleSheet, StatusBar } from 'react-native';
import { Subscribe, SubscribeDOM } from 'react-subscribe';

import { Provider } from 'mobx-react';


import stores from './logics'
import Router from "./core/router";
import RPC, { refreshToken, clearToken } from './utils/request';

import errorManager from './core/errorManager';
import {BusyIndicator} from './components/indicator';
import {DropdownAlert} from './components/dropdownAlert';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}

const prefix = 'tyrael://';
class App extends PureComponent{
  _onInvalidToken = () => {
    // 跳转到登录页面
    this._router._navigation.navigate("LoginScreen");
  };

  _refreshToken = () => {
    return refreshToken()
      .then(data => {
        console.log(data);
        // alert('刷新token成功');
      });
  };

  async componentWillMount() {
    // await clearToken();
    // 刷新token
    this._refreshToken().then(()=> {
      // 刷新成功后获取用户信息
      stores.userInfo.getUserInfo();
    }).catch (err => {
      console.log(err);
      errorManager.handleErr(err, '登录错误！');
      // alert('刷新token失败');
    });
  }

  render(){
    return (
      <Provider {...stores}>
        <View style={styles.root}>
          <StatusBar
            translucent={true}
            backgroundColor="#00000041"
            barStyle='default'
          />

          <Subscribe target={RPC} eventName="invalidToken" listener={this._onInvalidToken} />
          <Router ref={router => this._router = router} uriPrefix={prefix} />

          <BusyIndicator />
          <DropdownAlert />
        </View>
      </Provider>
    )
  }
}



AppRegistry.registerComponent('tyrael', () => App);


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
  },
});