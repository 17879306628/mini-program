// pages/goods_list/goods_list.js
Page({
  data: {
    title: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ]
  },
  onLoad: function (options) {
    
  },
  handleItemChange(e) {
    const index = e.detail
    let tabs = this.data.title
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({
      title: tabs
    })
  }
})