/**
 * 导航demo
 * Created by cly on 2017/5/18.
 */
"use strict";
import React,{Component,PureComponent} from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';


export default class InfoScreen extends PureComponent{

  static navigationOptions = {
    title: '详情',
  };


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>我是详情页!</Text>
        <Button
          onPress={() => navigate('Chat',{user:"hammer"})}
          title="Chat with hammer"
        />
      </View>
    );
  }
}

