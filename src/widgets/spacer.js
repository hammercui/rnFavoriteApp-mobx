/**
 *
 * Created by cly on 2017/6/8.
 */

'use strict';

import React, {PropTypes,PureComponent} from 'react';
import {View, Text, PixelRatio} from 'react-native';
import enhanceProps from "../utils/enhanceProps";
import theme from "../core/theme";

export default class Spacer extends PureComponent {

  static propTypes = {
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    distance: PropTypes.number,
    color: PropTypes.string,
    showBorder:PropTypes.bool, //是否显示border
  };

  static defaultProps = {
    vertical: true,
    horizontal: false,
    distance:  1 / PixelRatio.get(),
    showBorder:false
  };

  render() {
    return(
      <View {...this.prepareRootProps()}/>
    );
  }

  //获得主题属性
  prepareRootProps() {
    //主题布局属性
    let defaultProps = {
      style: this.getStyle(),
    };
    return enhanceProps(this.props, defaultProps);
  }

  getStyle() {
    let {distance, color, horizontal } = this.props;
    //显示边界线，说明是分割块，不是分割线
    if(this.props.showBorder){
      //水平方向
      if(horizontal) {
        return {
          backgroundColor: color || theme.colorSpace,
          width: distance

        };
      } else { //垂直方向
        return {
          backgroundColor: color || theme.colorSpace,
          height: distance,
          borderBottomWidth: 1 / PixelRatio.get(),
          borderTopWidth:1 / PixelRatio.get(),
          borderBottomColor:theme.colorAssist,
          borderTopColor:theme.colorAssist,
        };
      }
    }
    else{
      //水平方向
      if(horizontal) {
        return {
          backgroundColor: color || theme.colorAssist,
          width: distance
        };
      } else { //垂直方向
        return {
          backgroundColor: color || theme.colorAssist,
          height: distance
        };
      }
    }
  }

}