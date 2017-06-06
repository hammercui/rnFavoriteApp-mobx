/**
 * Created by njz on 17/1/10.
 * alert对外暴露的接口
 */
import { DeviceEventEmitter } from 'react-native';

function openAlert(title, message, type, config) {
  DeviceEventEmitter.emit('alertHandler_openAlert', {title, message, type, config });
}

function closeAlert() {
  DeviceEventEmitter.emit('alertHandler_closeAlert', {});
}

function showInfo(message, config = {}) {
  var title = config.title || '提示';
  openAlert(title, message, 'info', config)
}

function showSuccess(message, config = {}) {
  var title = config.title || '成功';
  openAlert(title, message, 'success', config)
}

function showWarn(message, config = {}) {
  var title = config.title || '警告';
  openAlert(title, message, 'warn', config)
}

function showError(message, config = {}) {
  var title = config.title || '错误';
  openAlert(title, message, 'error', config)
}
//新增middle提示
function showMiddle (message,config = {}) {
  var title = config.title || '';
  openAlert(title, message, 'middle', config)
}

export default {
  showInfo,
  showWarn,
  showError,
  showSuccess,
  closeAlert,
  showMiddle,
};
