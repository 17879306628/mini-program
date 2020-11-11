// pages/user/user.js
Page({
  data: {
    userInfo: {},
    collectNum: 0
  },
  onShow: function () {
    // 从缓存中获取用户信息
    const userInfo = wx.getStorageSync('userinfo');
    // 从缓存中获取收藏信息
    const collect = wx.getStorageSync('collect');
    this.setData({
      userInfo,
      collectNum: collect.length
    })
  }
})