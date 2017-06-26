/**
 * Created by cly on 2017/5/24.
 */
'use strict';
import React, {PropTypes,PureComponent} from 'react';
import {Text, View, Platform} from 'react-native';
import enhanceProps from '../utils/enhanceProps';
import theme from "../core/theme";

//默认badge属性
const badgeDefaultOptions = {
  height:15,
  fontSize:11,
  lineHeight:11,
  textColor:theme.colorText,
}

export default class Badge extends PureComponent {

  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  };

  prepareRootProps() {

    let type = {
      backgroundColor: theme.colorPrimary,
      padding: (Platform.OS === 'ios') ? 1 : 0,
      paddingHorizontal: 3.8,
      alignSelf: 'center',
      borderRadius: badgeDefaultOptions.height*0.5,
      justifyContent: "center",
      alignItems: "center",
      height: badgeDefaultOptions.height,
      borderWidth: 0.5,
      borderColor:"white",

    };

    const defaultProps = {
      style: type
    };

    return enhanceProps(this.props, defaultProps);

  }
  render() {
    return(
      <View ref={c => this._root = c} {...this.prepareRootProps()}>
        <Text style={[ this.props.textStyle, {
          color: (this.props.textStyle && this.props.textStyle.color) ? this.props.textStyle.color :badgeDefaultOptions.textColor ,
          fontSize: (this.props.textStyle && this.props.textStyle.fontSize) ? this.props.textStyle.fontSize : badgeDefaultOptions.fontSize,
          lineHeight: (this.props.textStyle && this.props.textStyle.lineHeight) ? this.props.textStyle.lineHeight : badgeDefaultOptions.lineHeight,
          textAlign: 'center'
        } ]}>{this.props.children}
        </Text>
      </View>
    );
  }

}