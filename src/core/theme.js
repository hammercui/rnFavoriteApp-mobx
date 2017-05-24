/**
 * Created by Gaohan on 2017/5/24.
 */
import {Platform, Dimensions} from 'react-native';

export default {
  /** ========================== 颜色 ========================== **/
  colorPrimary: '#A90F26',            // 基色 大红色
  colorBackground: '#FFFFFF',         // 背景色 白色
  colorText: '#000000',               // 文字色 黑色
  colorTextDisable: '#444444',        // 文字虚色 灰色



  /** ========================== 文字 ========================== **/
  textFontSizeBase: 15,                   // 基础文字大小
  textLineHeight: 20,                     // 文字行高

  /** ========================== 布局 ========================== **/
  screenWidth: Dimensions.get('window').width, // 屏幕宽
  screenHeight: Dimensions.get('window').height, // 屏幕高


}