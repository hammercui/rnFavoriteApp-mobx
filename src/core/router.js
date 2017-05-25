/**
 * Created by cly on 2017/5/18.
 */
import React from 'react';
import { StackNavigator,TabNavigator,DrawerNavigator } from 'react-navigation';
import {tabNavigationOptions,tabNavigatorConfig,modalStackNavigationOptions,stackNavigationOptions} from "./routerConfig"

//引入Screen
import ChatScreen from "../pages/demo/support/chatScreen";
//import InfoScreen from "../pages/demo/support/infoScreen";
import DrawerScreen from "../pages/demo/drawer";
import HomeScreen from "../pages/demo/home";
import MyselfScreen from "../pages/demo/myself";
import CategoryScreen from "../pages/demo/category";
import MessageScreen from "../pages/demo/message";
import LoginScreen from "../pages/demo/login";
import RegisterScreen from "../pages/demo/login/registerScreen";


//tabBar导航
const  MainTabScreenNavigator = TabNavigator(
  //路由
  {
    HomeScreen: {
      name:"tabBar导航-首页",
      screen: HomeScreen ,
    },
    CategoryScreen:{
      name:"tabBar导航-分类",
      screen: CategoryScreen ,
      navigationOptions:props=>tabNavigationOptions(props,{title: "分类", tabBarIcon:{name: "ios-trophy", size: 30}})
    },
    MessageScreen:{
      name:"tabBar导航-消息",
      screen: MessageScreen ,
      navigationOptions:props=>tabNavigationOptions(props,{title: "消息", tabBarIcon:{name: "ios-albums", size: 30}})
    },
    MyselfScreen: {
      name:"tabbar导航-我的",
      screen: MyselfScreen ,
      navigationOptions:props=>tabNavigationOptions(props,{title: "我的", tabBarIcon:{name: "ios-person", size: 30}})
    },
  },

  tabNavigatorConfig({initialRouteName:"HomeScreen"})
);


//堆栈导航
const StackNavRoot = StackNavigator(
  //路由
  {
    MainScreen: {
      name:"堆栈导航-首页",
      screen: MainTabScreenNavigator,
    },
    ChatScreen: {
      screen: ChatScreen,
      path:"chat/:user",
      navigationOptions:props=>stackNavigationOptions(props),
    },
    // InfoScreen: {
    //   screen: InfoScreen,
    //   path:"info",
    //   navigationOptions:props=>stackNavigationOptions(props),
    // },
  },
  //StackNavigatorConfig
  {mode:"card",}
);

// 模态页堆栈导航
const ModalNavigator = StackNavigator(
  //路由
  {
    StackNavRoot:{
      screen:StackNavRoot,
      navigationOptions: ({navigation}) => ({header:null}),
    },
    LoginScreen:{
      screen:LoginScreen,
      navigationOptions:props=>modalStackNavigationOptions(props,{title:"登录"}),
    },
    RegisterScreen:{
      name:"注册页",
      screen:RegisterScreen,
      navigationOptions:props=>stackNavigationOptions(props),
    },
  },
  //StackNavigatorConfig
  {mode:"modal"}
);

//抽屉导航
const DrawerRoot = DrawerNavigator(
  //路由
  {
    RootNavigator: {screen: ModalNavigator},
  },
  //DrawerNavigatorConfig
  {
    drawerWidth: 200,
    drawerPosition: 'left',
    contentComponent:props=><DrawerScreen {...props}/> //配置抽屉
  }
);


export default ModalNavigator;