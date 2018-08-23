/**
 * [fetch 请求]
 * @param  {Object} opts 请求参数
 * @param {String} opts.url 请求url
 * @param {Object} opts.data 请求数据
 * @param {String} opts.method 请求方式 默认：GET
 * @param {Function} opts.complete 回调方法无论失败或者成功
 * @param {Object} opts.header 请求头
 * @param {Boolean} opts.noStatus 是否显示loading
 * @return {Promise}
 * @example
 * ```js
 * wx.fetch({
 *   url,
 *   data,
 *   method,
 *   complete,
 *   header,
 *   noStatus,
 *   tryTime
 * })
 * ```
 * @todo showApi and errorApi
 */
function fetch(opts) {
  if (!opts.noStatus) {
    showLoading();
  }

  return new Promise((resolve, reject) => {
    wx.request(Object.assign(opts, {
      success(res) {
        if (typeof res.data === 'string') {
          try {
            res.data = JSON.parse(res.data);
          } catch (e) {}
        }
        resolve(res);
      },
      fail(res) {
        reject();
        showError();
      }
    }))
  })
}

/**
 * 网络异常
 */
function showError() {
  wx.showToast({
    title: '网络异常',
    icon: 'loading',
    duration: 2000,
  })
}

/**
 * 显示loading
 */
function showLoading() {
  wx.showToast({
    title: '加载中…',
    icon: 'loading',
    duration: 1000
  })
}

export default fetch