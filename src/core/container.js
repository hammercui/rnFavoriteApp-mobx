/**
 * Created by Gaohan on 2017/5/18.
 */
import React from 'react';
import {View,Text,InteractionManager} from 'react-native';
import Spinner from 'react-native-spinkit';

import errorManager from './errorManager';
import enhanceProps from '../utils/enhanceProps';
import {DropdownAlertHandler} from "../components/dropdownAlert";
import theme from './theme';

export default class Container extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSpinnerShow: true,

    };
  }

  showErrorMsg(error, message) {
    errorManager.handleErr(error, message);
  }
  //展示成功通知
  showSuccessMsg(message) {
    DropdownAlertHandler.showSuccess(message);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.componentDoingMount().then(resolve=>{
        this.setState({canRenderContent: true, isSpinnerShow: false});
      });


    });
  }

  //过渡动画中，执行耗时操作
  componentDoingMount(){
    return Promise.resolve();
  }


  componentWillUnmount() {
    this.setState({canRenderContent: true, isSpinnerShow: false});
  }

  renderPlaceholder() {
    return (
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner isSpinnerShow={this.state.isSpinnerShow} size={100} type='Wave' color={theme.colorPrimary}/>
      </View>
    );
  }

  renderContent() {
    return (<View style={{flex: 1, paddingTop:5}}><Text>{this.props.title}</Text></View>);
  }

  prepareRootProps() {
    const type = {
      flex: 1,
      backgroundColor: theme.colorBackground,
    };
    const defaultProps = {
      style: type
    };
    return enhanceProps(this.props, defaultProps);
  }

  render() {
    let content = this.state.canRenderContent ? this.renderContent() : this.renderPlaceholder();
    return content
  }

}