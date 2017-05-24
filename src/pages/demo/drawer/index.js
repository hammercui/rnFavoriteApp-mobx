
/**
 * 头题视图
 * Created by cly on 2017/5/19.
 */

"use strict";
import React,{Component,PureComponent} from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class DrawerScene extends PureComponent {

  static navigationOptions = ({navigation})=>({
    drawerLabel: "抽屉",
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-person" size={30} color={tintColor}/>
    ),
  });

  render() {
    return (
      <View>
        <View style={{height:40}}/>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => this.props.navigation.navigate('DrawerClose')}
          title="Go back home"
        />
        <Button
          onPress={() => this.props.navigation.navigate('ChatScreen',{user:"抽屉"})}
          title="点击进入chat"
        />
      </View>
    );
  }



}
