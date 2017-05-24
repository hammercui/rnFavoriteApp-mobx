/**
 * Created by Gaohan on 2017/5/18.
 */
import React,{PureComponent} from "react";
import { AppRegistry } from 'react-native';

// import tyrael from './core/homeContainer';

import Router from "./core/router";
//import tyrael from './pages/demo/login/index';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}

const prefix = 'tyrael://';

class App extends PureComponent{

  render(){
    return <Router uriPrefix={prefix} />
  }
}



AppRegistry.registerComponent('tyrael', () => App);