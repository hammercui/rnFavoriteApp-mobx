/**
 * Created by Gaohan on 17/1/9.
 */

import React, {PureComponent, PropTypes} from 'react';
import ReactNative, {StyleSheet, View, ActivityIndicator, DeviceEventEmitter} from 'react-native';

class Indicator extends PureComponent {

  static defaultProps = {
    startVisible: false,
    overlayColor: '#333333',
    overlayWidth: 120,
    overlayHeight: 100,
    color: '#FFFFFF90',
    size: 'large',
  };


  static propTypes = {
    startVisible: PropTypes.bool,
    overlayColor: PropTypes.string,
    overlayHeight: React.PropTypes.number,
    overlayWidth: React.PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.oneOf([ 'small', 'large' ]),
  };


  constructor(props) {
    super(props);

    this.state = {
      onShow: this.props.startVisible
    };
  }

  componentDidMount () {
    this.emitter = DeviceEventEmitter.addListener('changeLoadingEffect', this.changeLoadingEffect.bind(this), null);
  }

  componentWillUnmount() {
    this.emitter.remove();
  }

  changeLoadingEffect(state) {
    this.setState({
      onShow: state.onShow,
    });
  }

  render() {
    // const customStyles = StyleSheet.create({
    //
    // });

    if (!this.state.onShow) {
      return (<View />);
    } else {
      return (
        <View style={styles.container}>
          <View style={[styles.overlay,
            {backgroundColor: this.props.overlayColor,
            width: this.props.overlayWidth,
            height: this.props.overlayHeight}]}>
            <ActivityIndicator
              color={this.props.color}
              size={this.props.size}
              style={styles.progressBar}/>
          </View>
        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1
  },
  progressBar: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor:"#333333" ,
    width: 120,
    height: 100
  }
});

export default Indicator;
