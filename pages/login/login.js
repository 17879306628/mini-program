// pages/login/login.js
Page({
  handleGetUserInfo(e) {
    const userInfo = e.detail.userInfo
    wx.setStorageSync('userinfo', userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})