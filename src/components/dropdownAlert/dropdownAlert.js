/**
 * Created by Gaohan on 17/1/9.
 */

import React, { PureComponent } from 'react';
import ReactNative, {StyleSheet, DeviceEventEmitter} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

class NewDropdownAlert extends PureComponent {

  static defaultProps = {
    imageSrc: null,
    titleNumOfLines:1,
    messageNumOfLines:3,
    infoColor: '#2B73B6',
    warnColor: '#cd853f',
    errorColor: '#cc3232',
    successColor: '#32A54A',
  };

  static propTypes = {
    titleNumOfLines: React.PropTypes.number,
    messageNumOfLines: React.PropTypes.number,
  };


  constructor(props) {
    super(props);

    this.state = {
      showCancel: false,
      closeInterval: 2000,
    };

    //缓存要打开的消息框的队列
    this.cacheList = [];
    //记录是否打开
    this.isShow = false;
    //关闭中
    this.isClosing = false;
  }

  componentDidMount () {
    //注册消息监听者
    this.openEmitter = DeviceEventEmitter.addListener('alertHandler_openAlert', this.openAlert.bind(this), null);
    this.closeEmitter = DeviceEventEmitter.addListener('alertHandler_closeAlert', this.openClose.bind(this), null);
  }

  componentWillUnmount() {
    //移除消息监听者
    this.openEmitter.remove();
    this.closeEmitter.remove();
  }
  //打开alert
  openAlert(state) {
    //将要打开的配置先放入缓存队列
    this.cacheList.push(state);
    if(!this.isShow){
      //如果已经打开了,
      this._openAlert();
    } else if(!this.isClosing){
      this.isClosing = true;
      //如果已经打开了,通知之前的消息关闭,这样缓存的消息自然会被打开
      this.dropdown.onClose()
    }
  }
  //关闭所以
  openClose() {
    //清空所有缓存
    this.cacheList = [];
    //关闭alert
    this.dropdown.onClose();
  }

  //真正的打开函数
  async _openAlert() {
    if(this.cacheList.length > 0){
      this.isShow = true;
      //从缓存中获取要打开的配置
      const state = this.cacheList.shift();
      //通过主题获取背景色
      let backgroundColor = "#A90F26";
      switch (state.type){
        case "info":
          backgroundColor = this.props.infoColor;
          break;
        case "success":
          backgroundColor = this.props.successColor;
          break;
        case "warn":
          backgroundColor = this.props.warnColor;
          break;
        case "error":
          backgroundColor = this.props.errorColor;
          break;
      }
      const closeInterval = this.cacheList.length ? 1000 : (state.config.closeInterval ? state.config.closeInterval : 2000);

      await this.setState({backgroundColor,closeInterval});

      this.dropdown.alert(state.title, state.message);
    }
  }

  //关闭的回调事件
  closeHandle(){
    this.isShow = false;
    this.isClosing = false;
    this._openAlert();
  }

  render() {

    const customStyles = StyleSheet.create({
      container: {
        // margin: 20,
        // borderRadius: 8,
        backgroundColor : this.state.backgroundColor
      }
    });

    return (
        <DropdownAlert onClose={()=>{this.closeHandle()}} {...this.state} ref={(ref) => this.dropdown = ref} containerStyle={customStyles.container}/>
    );
  }

}

export default NewDropdownAlert;
