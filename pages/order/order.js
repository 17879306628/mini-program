// pages/order/order.js
Page({
  data: {
    title: [
      {
        id: 0,
        value: '全部订单',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退货/退款',
        isActive: false
      }
    ]
  },
  onShow() {
    // 获取所有页面数组
    let curPages =  getCurrentPages();
    // 拿到当前页面
    const currentPages = curPages[curPages.length - 1]
    // 拿到当前页面传入的参数
    const type = currentPages.options.type
    this.tabsChange(type - 1)
  },
  // 点击标题切换tab栏
  handleItemChange(e) {
    const index = e.detail
    this.tabsChange(index)
  },
  tabsChange(index) {
    let tabs = this.data.title
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({
      title: tabs
    })
  }
})