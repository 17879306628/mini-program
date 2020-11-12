// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: [
      {
        id: 0,
        value: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        value: '浏览器足迹',
        isActive: false
      }
    ],
    collect: []
  },
  onShow() {
    const collect = wx.getStorageSync('collect');
    this.setData({
      collect
    })
  },
  // 点击标题切换tab栏
  handleItemChange(e) {
    const index = e.detail
    let tabs = this.data.title
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({
      title: tabs
    })
  }
})