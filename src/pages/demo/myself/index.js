/**
 * Created by cly on 2017/5/22.
 */
import React,{PureComponent} from 'react';
import {
  Text,
  View,
  Button,
  Image
} from 'react-native';
import { observer } from 'mobx-react';

import SingletonStore from '../../../logics/singletonStore';

import Icon from 'react-native-vector-icons/Ionicons';

@observer
export default class MyselfScreen extends PureComponent{

  static navigationOptions = ({navigation})=>
  (
    { title:"我的",
    }
  );

  constructor(props){
    super(props);
  }

  render() {
    const {navigate} = this.props.navigation;
    return(<View>
      <Text>这是我的</Text>
      <Text>{SingletonStore.userInfo.userName}</Text>
      <Text>{SingletonStore.userInfo.shopName}</Text>
      <Text>{SingletonStore.userInfo.phoneNumber}</Text>
      <Button
        onPress={() => navigate('ChatScreen', { user: 'hammer' })}
        title="Chat with hammer"
      />
    </View>)
  }

}