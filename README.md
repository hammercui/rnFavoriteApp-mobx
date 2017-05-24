#react-native-mobx-start-kit

> 描述

1. react-native 应用mobx作为逻辑数据部分的架构；
2. 使用react-navigator作为导航；
3. react-subscibe配合fbemitter实现事件订阅，主要用于mobx不擅长处理的『主动触发』的事件，如：token失效后返回登录页；
4. 较小的组件不配套.style.js文件,但如果文件过长,还是考虑将样式放入配套的.style.js文件；
5. core/theme 仅配置一些全局式样，如：几个主题色，导航栏、tab高度，字体大小等通用式样；

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