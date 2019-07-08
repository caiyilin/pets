var server = "https://test.xiangcaozhaopin.com/wxpg";
/** ajax请求数据接口
 * [ajax请求数据接口]
 * @param  {[String]} url    [请求地址]
 * @param  {[Object||String]} data   [参数]
 * @param  {[String]} method [请求类型：默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT]
 * @param [[String]] contentType 默认为application/json
 * @return {[Promise]}        [返回结果]
 */
function ajaxJson(url, data, method = 'GET', contentType = 'application/json') {
  // 非get请求加上_xsrf参数
  if (method !== 'GET') {
    data = typeof (data) === 'object' ? data : {}
  }
  let header = {
    'content-type': contentType,
    'XC-Agent': 'Xiangcao/1.1.1 (1.0.0;9.2.1;iPhone;wifi;wxapp)',
    Cookie: wx.getStorageSync('cookie')
  }
  // 处理header的XC-Agent
  if (wx.getStorageSync('systemInfo') || wx.getStorageSync('networkType')) {
    let sys = wx.getStorageSync('systemInfo');
    let version = wx.getStorageSync('version');
    let networkType = wx.getStorageSync('networkType');
    header['XC-Agent'] = `Xiangcao/${version} (${sys.version};${sys.system};${sys.model};${networkType};wxapp)`
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${server}${url}`,
      data: data,
      method: method,
      header: header,
      success: function (res) {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

function ajax3rd(url, data, method = 'GET', header) {
  if (method !== 'GET') {
    data = typeof (data) === 'object' ? data : {}
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: function (res) {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  ajaxJson: ajaxJson,
  ajax3rd: ajax3rd,
  server: server
}
