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
import { observer, inject } from 'mobx-react'
import {Badge,} from"../../../widgets";
import Icon from 'react-native-vector-icons/Ionicons';
import theme from "../../../core/theme";
const tabBarWidth = theme.screenWidth * 0.25;
import {defaultStackOption} from "../../../core/routerConfig";
import Container from '../../../core/container';
import {LoaderHandler} from '../../../components/indicator';


@inject('userInfo')
@observer
export default class HomeScreen extends Container {

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

  componentDoingMount() {
    return new Promise(
      (resolve, reject)=>{
        this.timer = setTimeout(() => {
          resolve();
        }, 100);
      }
    )
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  componentWillMount(){
    this.props.navigation.setParams({count:20});
  }

  renderContent() {

    const {navigate} = this.props.navigation;
    return(
      <View style={styles.container}>
        <Text>这是首页</Text>

        <Text>{this.props.userInfo.userName}</Text>
        <Text>{this.props.userInfo.shopName}</Text>
        <Text>{this.props.userInfo.phoneNumber}</Text>

        <Button
          onPress={() => navigate('ChatScreen', { user: 'hammer' })}
          title="Chat with hammer"
        />
        <Button title="获取用户信息"   onPress={this._getUserInfo} />
        <Button title="角标+1" onPress={this._addOne} />

        <Button title="提示消息" onPress={this._showMessage} />

        <Button title="菊花" onPress={this._showIndicator}/>

    </View>)
  }

  _getUserInfo = () => {
    return this.props.userInfo.getUserInfo().catch(err=>{console.log(err)});
  };

  _addOne = ()=>{
    let count = (this.props.navigation.state.params.count || 0)  + 1;
    this.props.navigation.setParams({count:count});
  };

  _showMessage = ()=> {
    this.showSuccessMsg("恭喜您，上架成功！");
    // this.showErrorMsg(null,'加载车辆信息失败!');
  };

  _showIndicator = ()=> {
    LoaderHandler.showLoader();

    this.timer = setTimeout(() => {
      LoaderHandler.hideLoader();
    }, 1000);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"column",
    paddingTop:20,
  },
})
