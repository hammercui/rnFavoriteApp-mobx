/**
 * Created by Gaohan on 2017/5/22.
 */
var has = Object.prototype.hasOwnProperty;

/**
 * 请求参数字符串解析器
 * @param query
 * @returns {{}}
 */
function queryString(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  for (;
    part = parser.exec(query);
    result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])
  );

  return result;
}

/**
 * 对象转请求参数
 * @param obj
 * @param prefix
 * @returns {string}
 */
function queryStringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}


/**
 * 获取字符串json 对象里的某一个值
 * @param data
 * @param propsName
 * @returns {*}
 */
function getPropsFromJson(data, propsName) {
  //console.log("测试data",data);
  let obj = transformToObj(data);

  if (has.call(obj, propsName)) {
    return obj[propsName]
  }
  return undefined;
}

/**
 * 安全的string 转 json
 * @param data
 * @returns {{}}
 */
function transformToObj(data) {
  let obj = {};
  if (typeof data === 'string') {
    try {
      obj = JSON.parse(data);
    } catch (e) {
      return {};
    }
  }
  return obj
}

export default {
  getPropsFromJson,
  transformToObj,
  queryStringify,
  queryString,
}