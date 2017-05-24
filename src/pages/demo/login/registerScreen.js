/**
 * 注册页面
 * Created by cly on 2017/5/22.
 */

import React,{PureComponent} from 'react';
import {
  Text,
  View,
  Button,
  Image
} from 'react-native';


import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons';

const resetHomeAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'StackNavRoot'})
  ]
})

export default class RegisterScreen extends PureComponent{

  static navigationOptions = ({navigation})=>(
    {
      title:"注册",
    }
  );


  render(){
    const {state} = this.props.navigation;
    console.log("state",state);
    return(
      <View style={styles.container} >
        <Text >  账号 </Text>
        <Text >  密码 </Text>
        <Text >  重复密码 </Text>

        <View style={{margin:20,flexDirection:"column",alignItems:"center"}}>
          <Button
            onPress={() => this.props.navigation.navigate('ChatScreen', { user: 'hammer' })}
            title="Chat with hammer"
          />
          <Button title="注册成功" onPress={this._registerSuccess.bind(this)}/>
          <Button title="返回登录" onPress={()=>this.props.navigation.goBack()}/>
        </View>

      </View>
    );
  }


  //注册成功
  _registerSuccess(){
    //this.props.navigation.goBack();
    this.props.navigation.dispatch(resetHomeAction)
  }
}
