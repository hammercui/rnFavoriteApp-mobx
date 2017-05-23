/**
 * Created by Gaohan on 2017/5/23.
 */
import React from 'react';

import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { observable, computed, action, autorun } from 'mobx';
import { observer } from 'mobx-react';
import { LoginForm } from '../../logics/auth';


const testTitle = observable(null);

// stateless components
const LoginButton = observer(function (props, context) {
  return (
    <View style={styles.test}>
      <Text>{testTitle.get() || props.name}</Text>
    </View>
  )
});

function changeTestTitle(newTitle) {
  testTitle.set(newTitle);
}

@observer
export default class demoLogin extends React.PureComponent {
  form = new LoginForm();

  onChangeMobile = (text) => {
    this.form.username = text;
    // changeTestTitle(text);
    console.log("username", this.form.username);
  };

  onChangePwd = (text) => {
    this.form.password = text;
    console.log("pwd",this.form.password);
  };

  onSubmit = () => {
    this.form.submit()
      .then(data => {
        console.log(data)
        alert('登录成功');
        // 导航跳转
      }).catch (err => {
      switch (err.code) {
        case 403:
          alert('用户名或密码错误');
          break;
        default:
          alert('登录失败');
          break;
      }
    });
  };

  refreshToken = () => {
    this.form.refresh_token()
      .then(data => {
        console.log(data)
        alert('刷新token成功');
        // 导航跳转
      }).catch (err => {
      console.log(err)
      alert('刷新token失败');
    });
  };

  getUserInfo = () => {
    this.form.getUserInfo()
      .then(data => {
        console.log(data)
        alert('获取用户信息成功');
        // 导航跳转
      }).catch (err => {
      console.log(err)
      alert('获取用户信息失败');
    });
  };

  render() {
    return (
      <View style={styles.main}>

        <LoginButton name="LoginButtonTest" />

        <TextInput
          style={styles.input}
          value={this.form.username}
          onChangeText={this.onChangeMobile}
        />
        <TextInput
          style={styles.input}
          value={this.form.password}
          onChangeText={this.onChangePwd}
        />
        <View style={styles.buttonBlock}>
          <Button onPress={this.onSubmit}
                  title="登录测试"
                  color="#841584"
          />
          <Button onPress={this.refreshToken}
                  title="刷新token"
                  color="#841584"
          />
          <Button onPress={this.getUserInfo}
                  title="用户信息"
                  color="#841584"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex:1,
    backgroundColor: 'red',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonBlock: {
    flex:1,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: 80,
    borderWidth: 1,
    borderColor: 'black',
  },
  test:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    height: 200,
    width: 320,
    alignSelf: 'center',
  }
});