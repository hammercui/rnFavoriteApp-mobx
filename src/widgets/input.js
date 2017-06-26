/**
 * 自定义input
 * Created by cly on 2017/6/9.
 */

'use strict';

import React, {PropTypes,PureComponent} from 'react';
import {View, TextInput, Platform, Text} from 'react-native';

import theme from "../core/theme";


export default class InputNew extends PureComponent {

  value = "";
  static propTypes = {
    editable:PropTypes.bool,
    placeholderTextColor:PropTypes.string,
    onChangeText:PropTypes.func,
    placeholder:PropTypes.string,
    fontSize:PropTypes.number,
    color:PropTypes.string,
    value:PropTypes.string,
    maxLength:PropTypes.number,
    multiline:PropTypes.bool,
    secureTextEntry:PropTypes.bool,
    underLine:PropTypes.bool,
    onFocus:PropTypes.func,
  };

  static  defaultProps = {
    editable:true,
    placeholderTextColor:theme.colorInverseText, //默认预留字体颜色
    placeholder:"默认占位值",
    fontSize:16,
    color:"#000000",
    multiline:false,
    maxLength:128,
    secureTextEntry:false,
    underLine:true,
  }


  render(){
    let underLineStyle = {};
    if(this.props.underLine)
      underLineStyle = {borderBottomColor:"#9B9B9B",borderBottomWidth:1}
;    return (
      <View style={[this.props.style,{flexDirection:"column", justifyContent:"center"},underLineStyle]}>
        {this._renderTexInput()}
        {/*<Spacer style={{position:"absolute",bottom:10,width:5,}} distance={5} color="#000000"/>*/}
      </View>
    );
  }


  _renderTexInput(){
    //可编辑或者ios
    if(this.props.editable || Platform.OS === "ios"){
      return(
        <TextInput style={{flex:1, color:this.props.color,fontSize:this.props.fontSize}}
                   placeholderTextColor={this.props.placeholderTextColor}
                   onChangeText={(text)=>{
                     if(this.props.onChangeText)
                       this.props.onChangeText(text);
                     this.inputValue = text;
                    }
                   }
                   editable={this.props.editable}
                   value={this.props.value?this.props.value:this.inputValue}
                   placeholder={this.props.placeholder}
                   underlineColorAndroid='transparent'
                   multiline={this.props.multiline}
                   maxLength={this.props.maxLength}
                   keyboardType={this.props.keyboardType}
                   secureTextEntry={this.props.secureTextEntry}
                   onFocus={this.props.onFocus}
        />
      )
    }
    else {//不可编辑 并且android
      var placeholder = !(this.props.value&&this.props.value.length>0);
      return(
        <Text style={{
          flex:1,
          fontSize:this.props.fontSize,
          color:this.props.placeholderTextColor,
          textAlignVertical:"center",textAlign:"left"}}>
          {placeholder?this.props.placeholder:this.props.value}
      </Text>)
    }
  }


}