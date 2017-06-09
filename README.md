#tyreal

##  描述

1. react-native 应用mobx作为逻辑数据部分的架构；
2. 使用react-navigator作为导航；
3. react-subscibe配合fbemitter实现事件订阅，主要用于mobx不擅长处理的『主动触发』的事件，如：token失效后返回登录页；
4. 较小的组件不配套.style.js文件,但如果文件过长,还是考虑将样式放入配套的.style.js文件；
5. core/theme 仅配置一些全局式样，如：几个主题色，导航栏、tab高度，字体大小等通用式样；
6. react-native 版本0.44.0

> 目录结构

+ components //通用组件
+ core // 核心组件
+ logics // 业务逻辑
+ pages // 视图呈现
+ utils // 工具类

> 全局式样

core/theme中暂时分类为：文字、颜色、布局；
命名未驼峰式命名；
文字以text开头命名；
颜色以color开头命名；
布局以screen开头命名；


## 黑科技

react-native-rename组件——便利的rn项目改名库

Installation

```
yarn global add react-native-rename
or
npm install react-native-rename -g
```

Usage

```
react-native-rename <newName>
```

## 路由：React Navigation
>路由使用的[React Navigation](https://reactnavigation.org/docs/intro/)，这个是目前社区推荐的导航库

### 安装

```
//目前是v1.0.0beta.11版本
npm install --save react-navigation
```

#### 如何使用

* `navigate`: 跳转到指定页

```
this.navigation.navigate('ChatScreen', params:Object)}
```

* `goBack`: 默认返回

```
this.navigation.goBack(null};
或
this.navigation.goBack(};
```

* `goBack(key)`:返回指定页

**但是现在问题`key`在文档里指`routerName`,但是不起作用，实际应该填每次生成的随机`key`,位于**

`this.props.navigations.state`

```
{
index:0
key:"Init-id-1496806382591-1"
routeName:"StackNavRoot"
}
```

并且每个screen的`state`里的`key`其实是上一页的`key`,比如`page1->page2->page3`，现在我们位于page3，要回到page2页，只需`goBack(null)`或`goBack()`；如果要返回第page1,需要把page2的state里的key传递到page3，在page3调用`this。props.navigations.goBack('id-1496806382591-2')`

* `reset({})`:清除所有状态，回退到到指定页

用于关闭所有打开页，恢复到初始页

```
const resetHomeAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'StackNavRoot'})
  ]
});

this.props.navigation.dispatch(resetHomeAction);

```




### 核心文件
>/src
>>/core
>>>/router.js
>>>
>>>/routerConfig.js




#### router.js
配置路由路径的文件，包含三种路由模式`StackNavigator`,`DrawerNavigator`,`DrawerNavigator`,使用详情参考官方文档，下面以``StackNavigator`举例

使用方法：

```
const navigator = StackNavigator{
	{
		key1:{
			screen:组件页
			navigationOptions：({navigation}) => ({p配置属性}),
		key1:{
			screen:组件页
			navigationOptions：({navigation}) => ({p配置属性}),

		}	
	},//路由配置项
	{}//StackNavigatorConfig 路由属性配置项
}

```
其中`key1`,`kye2`就是我们在页面跳转时的目标key

```
this.props.navigation.navigate({'key1',{传递参数}})

```

具体实现：

```
// 堆栈导航
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
  //StackNavigatorConfig 路由配置项
  {mode:"modal"}
);
```

#### routerConfig.js

因为screen的`navigationOptions`,以及`StackNavigatorConfig`等配置属性比较繁琐，对此作了封装

* `defaultStackOption`:  默认堆栈导航的页面`navigationOptions`属性
* `tabNavigatorConfig(config)`：生成`TabNavigatorConfig`
* `modalStackNavigationOptions({navigation},options)`：获得导航的页面`navigationOptions`属性
* `stackNavigationOptions({navigation},options)`：获得导航的页面`navigationOptions`属性
* `tabNavigationOptions({navigation},options)`：获得导航的页面`navigationOptions`属性




