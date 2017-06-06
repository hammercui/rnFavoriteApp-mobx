/**
 * Created by Gaohan on 17/1/9.
 */
import { DeviceEventEmitter } from 'react-native';

function hideLoader() {
  DeviceEventEmitter.emit('changeLoadingEffect', {onShow: false});
}

function showLoader() {
  DeviceEventEmitter.emit('changeLoadingEffect', {onShow: true});
}

export default {
  hideLoader,
  showLoader
};