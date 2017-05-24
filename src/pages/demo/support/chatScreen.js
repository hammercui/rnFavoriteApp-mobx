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

export default class ChatScreen extends PureComponent {

  static navigationOptions = ({navigation})=>({
    title: `Chat with ${navigation.state.params.user} `,
    headerRight: <Button title="Info"  onPress={() => navigation.navigate('Info', { user: 'hammer2' })} />
  });

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }

}
