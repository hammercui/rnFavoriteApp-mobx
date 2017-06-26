/**
 * Created by Gaohan on 2017/5/24.
 */
import {Platform, Dimensions,PixelRatio} from 'react-native';

export default {
  /** ========================== 颜色 color ========================== **/
  colorPrimary: '#F36110',            // 基色 橘色
  colorBackground: '#FFFFFF',         // 背景色 白色
  colorText: '#000000',               // 文字色 黑色
  colorTextDisable: '#444444',        // 文字虚色 灰色
  colorShadow: '#606060',             // 阴影颜色
  colorTextHeader:"#ffffff",          // 标题的文字颜色
  colorInverseText: '#9B9B9B',        // 反色字体颜色 用于字体enable或者placeholder
  colorAssist: '#E2E2E2',             // 基础辅助色（一般为分割线或帮助类颜色）
  colorSpace:"#F4F4F4",               //基础分割块线色
  /** ========================== 文字 text ========================== **/
  textFontSizeBase: 15,                   // 基础文字大小
  textLineHeight: 20,                     // 文字行高
  textHeaderTitleSize:18,                 //header标题文字大小

  /** ========================== 布局 screen ========================== **/
  screenMin: 1.0 / PixelRatio.get(), // 最小像素高度
  screenWidth: Dimensions.get('window').width, // 屏幕宽
  screenHeight: Dimensions.get('window').height, // 屏幕高
  screenTabIconHeight: Platform.OS === "ios" ? 40 : 30, //TabBar的icon区域高度
  screenTabLabelHeight: 16, //TabBar的label区域高度
  screenTabHeight:56,//TabBar的高度
  screenNavigatorHeight: Platform.OS === 'ios' ? 44 : 56,
  screenStatusHeight: Platform.OS === 'ios' ? 20 : 0,
  get screenTitleHeight() {
    return this.screenNavigatorHeight + this.screenStatusHeight;
  },
}

