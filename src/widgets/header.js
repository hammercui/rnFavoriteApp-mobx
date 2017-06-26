/**
 * Created by Gaohan on 2017/6/8.
 */
import React, {PropTypes,PureComponent} from 'react';
import { StyleSheet, Platform, View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from "../core/theme";

const HeaderNavBar = function (props) {
  return (
      <View style={styles.headerTitle}>
        <Text style={styles.headerTitleText}>{props.headerTitle}</Text>
      </View>
  );
};

//Header的左侧返回按钮
const HeaderLeftBackBtn = function ({mode,onPress}) {
  return (
    <TouchableOpacity style={styles.headerLeft} onPress = {onPress}>
      <Ionicons name={mode==='model'? 'ios-close':'ios-arrow-back'} size={30} color={theme.colorTextHeader}/>
    </TouchableOpacity>
  );
};


export default class Header extends PureComponent {

  static propTypes = {
    onPressBackBtn:PropTypes.func,
    mode:PropTypes.oneOf(['normal','model']),
  };

  static defaultProps = {
    mode:'normal',
  };

  render() {
    return(
      <View style={styles.header}>
        {this.props.left? this.props.left : <HeaderLeftBackBtn mode={this.props.mode} onPress={this.props.onPressBackBtn}/>}
        <HeaderNavBar headerTitle={this.props.headerTitle} />
        {this.props.right? this.props.right : null}
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    header: {
      backgroundColor: theme.colorPrimary,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      // paddingLeft: (!Array.isArray(this.props.children) && Platform.OS == 'android') ? 30 : undefined,
      paddingHorizontal: 10,
      paddingTop: (Platform.OS === 'ios' ) ? 15 : 0,
      shadowColor: theme.colorShadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.9,
      shadowRadius: 2,
      height: theme.screenTitleHeight,
      elevation: 3,
      position: 'relative',
    },

    headerTitle: {
      // backgroundColor: "pink",
      position: 'absolute',
      left: 55, right: 55, top: theme.screenStatusHeight, bottom: 0,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerLeft:{
      position: 'absolute',
      //left: 10,
      top: theme.screenStatusHeight, bottom: 0,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft:10,
      paddingRight:15,
    },

    headerTitleText: {
      fontWeight: 'bold',
      fontSize: theme.textHeaderTitleSize,
      color: theme.colorTextHeader
    }
  }
);