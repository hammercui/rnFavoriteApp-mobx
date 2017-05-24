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

import {Badge} from "../../../widgets";
import Icon from 'react-native-vector-icons/Ionicons';



export default class CategoryScreen extends PureComponent{

  static navigationOptions = ({navigation})=>
    (
      { title: "分类",
      }
    );


  constructor(props){
    super(props);

  }


  render() {
    const {navigate} = this.props.navigation;
    return(<View>
      <Text>这是分类</Text>
      <Button
        onPress={() => navigate('ChatScreen', { user: 'hammer' })}
        title="Chat with hammer"
      />
    </View>)
  }

}
