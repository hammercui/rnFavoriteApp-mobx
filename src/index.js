/**
 * Created by Gaohan on 2017/5/18.
 */
import { AppRegistry } from 'react-native';
import App from './core/homeContainer';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}

AppRegistry.registerComponent('App', () => App);