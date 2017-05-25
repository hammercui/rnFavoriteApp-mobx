/**
 * Created by Gaohan on 2017/5/18.
 */
import React,{PureComponent} from "react";
import { AppRegistry, View, StyleSheet } from 'react-native';
import { Subscribe, SubscribeDOM } from 'react-subscribe';

// import tyreal from './pages/demo/login';
import Router from "./core/router";
import RPC, { refreshToken } from './utils/request';

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
    console.log(this._router._navigation)
    this._router._navigation.navigate("LoginScreen");

  };
  _refreshToken = () => {
    refreshToken()
      .then(data => {
        console.log(data);
        // alert('刷新token成功');
        // 导航跳转
      }).catch (err => {
      console.log(err);
      // alert('刷新token失败');
    });
  };

  componentWillMount() {
    this._refreshToken();
  }

  render(){
    return (
      <View style={styles.root}>
        <Subscribe target={RPC} eventName="invalidToken" listener={this._onInvalidToken} />
        <Router ref={router => this._router = router} uriPrefix={prefix} />
      </View>
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