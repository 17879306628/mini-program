
import { login } from '../../utils/asyncWx.js'
Page({
  async handleGetUserInfo(e) {
    try {
      // 获取用户信息
      const { encryptedData, rawData, iv, signature} = e.detail
      // 获取登录code
      const {code} = await login();
      const loginParams = { encryptedData, rawData, iv, signature, code}
      // 发送获取token请求
      //const res = await request({url:'/users/wxlogin',data:loginParams,method: "post"})
      //console.log(res);
      // 强制给token
      const token = 'token123456789'
      //把token存入缓存中，返回上一个页面
      wx.setStorageSync('token', 'token');
      wx.navigateBack({
        delta: 1
      });
    } catch(err) {
      console.log(err);
    }
  }
})