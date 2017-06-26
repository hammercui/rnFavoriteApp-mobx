/**
 * Created by cly on 2017/6/19.
 */
import React, {PropTypes,PureComponent} from 'react';
import ReactNative, {Platform} from 'react-native';
import enhanceProps from '../utils/enhanceProps';

import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Foundation from 'react-native-vector-icons/Foundation';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import Zocial from 'react-native-vector-icons/Zocial';

//import Right2Car from '../libs/aztecIcon';

export default class IconNew extends PureComponent {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    //switch(this.thisTheme().iconFamily) {
      // case 'Ionicons':
      //   this.Icon = Ionicons;
      //   break;
      // case 'Entypo':
      //   this.Icon = Entypo;
      //   break;
      // case 'FontAwesome':
      //   this.Icon = FontAwesome;
      //   break;
      // case 'Foundation':
      //   this.Icon = Foundation;
      //   break;
      // case 'MaterialIcons':
      //   this.Icon = MaterialIcons;
      //   break;
      // case 'Octicons':
      //   this.Icon = Octicons;
      //   break;
      // case 'Zocial':
      //   this.Icon = Zocial;
      //   break;
      // case 'right2Car':
      //   this.Icon = Right2Car;
      //   break;
      // default:
      //   this.Icon = Ionicons;

     // this.Icon =  Right2Car;
    //}
  }

  prepareRootProps() {
    let defaultProps = {
      style: {
        fontSize: 30,
        color: "#000000",
      }
    };

    return enhanceProps(this.props, defaultProps);

  }

  render() {
    return(
      <this.Icon ref={c => this._root = c} {...this.prepareRootProps()}/>
    );
  }
}

