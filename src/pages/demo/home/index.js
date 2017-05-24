/**
 * Created by cly on 2017/5/22.
 */
import React,{PureComponent} from 'react';
import {
  Text,
  View,
  Button,
  Image,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {Badge,} from"../../../widgets";
import Icon from 'react-native-vector-icons/Ionicons';
import theme from "../../../core/theme";
const tabBarWidth = theme.screenWidth * 0.25;
import {defaultStackOption} from "../../../core/routerConfig";

export default class HomeScreen extends PureComponent{

  static navigationOptions = ({navigation})=>
    (
      {
        title: "首页",
        tabBarIcon: ({tintColor,focused})=>(
          <View style={{width:tabBarWidth,height:theme.screenTabIconHeight,margin:0,padding:0,
            alignItems:"center", justifyContent:"center"}}>
            <Icon name={"ios-home"} size={30} color={tintColor}/>
            <Badge style={{position:"absolute",top:2,right:tabBarWidth*0.25}}>
              <Text style={{fontSize:8,color:"white"}}>{navigation.state.params?navigation.state.params.count:0}</Text>
            </Badge>
          </View>
        ),
        //header:null,
        ...defaultStackOption,
        // headerLeft:(<TouchableOpacity style={{marginLeft:10}} onPress={()=>navigation.navigate("DrawerOpen")}>
        //   <Icon name={"ios-menu"} size={25} color={theme.colorPrimary}/>
        // </TouchableOpacity>)
      }
    );

  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.navigation.setParams({count:20});
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.container}>
        <Text>这是首页</Text>
        <Button
          onPress={() => navigate('ChatScreen', { user: 'hammer' })}
          title="Chat with hammer"
        />
        <Button title="登录"   onPress={()=>navigate("LoginScreen")} />
        <Button title="角标+1" onPress={this.addOne} />
    </View>)
  }



  addOne = ()=>{
    let count = (this.props.navigation.state.params.count || 0)  + 1;
    this.props.navigation.setParams({count:count});
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"column",
    paddingTop:20,
  },
})
