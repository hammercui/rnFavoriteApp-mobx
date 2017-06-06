/**
 * Created by cly on 2017/5/19.
 */

"use strict";
import React,{Component,PureComponent} from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';

import Container from '../../../core/container';


export default class ChatScreen extends Container {

  static navigationOptions = ({navigation})=>({
    title: `Chat with ${navigation.state.params.user} `,
    headerRight: <Button title="Info"  onPress={() => navigation.navigate('Info', { user: 'hammer2' })} />
  });


  componentDoingMount() {
    return new Promise(
      (resolve, reject)=>{
        this.timer = setTimeout(() => {
          resolve();
        }, 1000);
      }
    )
  }

  renderContent() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }

}
