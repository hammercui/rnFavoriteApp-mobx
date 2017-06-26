/**
 * Created by Gaohan on 2017/6/8.
 */
import React, { PureComponent, PropTypes } from 'react'
import {
  Animated,
  Dimensions,
} from "react-native"

let dimensions = Dimensions.get('window');
let windowWidth = - dimensions.width;
let windowHeight = dimensions.height;

export default class Drawer extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
  };
  static defaultProps =  {
    isOpen: false
  };
  constructor(props) {
    super(props);
    this.state = {
      animationValue: new Animated.Value(props.isOpen ? 0 : windowWidth),
      duration: 500,
    }
  }
  componentWillMount() {
  }
  close() {
    this.animate(windowWidth);
  }
  open() {
    this.animate(0);
  }
  animate(toValue) {
    Animated.spring (
      this.state.animationValue, {
        toValue: toValue,
        duration: this.state.duration,
        friction: 9
      }
    ).start()
  }
  render() {
    return (
      <Animated.View
        ref={(ref) => this.mainView = ref}
        style={{
          transform: [{
            translateX: this.state.animationValue,
          }],
          position: 'absolute',
          top: 0,
          left: 0,
          height:windowHeight,
          width:windowWidth,
        }}>
        {this.props.children}
      </Animated.View>
    )
  }
}