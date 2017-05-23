/**
 * Created by Gaohan on 2017/5/18.
 */
import { AppRegistry } from 'react-native';

// import tyrael from './core/homeContainer';

import tyrael from './pages/demo/loginDemo';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}
AppRegistry.registerComponent('tyrael', () => tyrael);