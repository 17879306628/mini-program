// 定义发送请求的次数
let ajaxTimes = 0
export default function request(options) {
  ajaxTimes++
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      method: options.method || 'get',
      data: options.data || {},
      success: resolve,
      fail: reject,
      complete: () => {
        ajaxTimes--
        if(ajaxTimes === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}