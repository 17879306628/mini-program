import request from '../../request/network'
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
    ],
    goodsList: []
  },
  // 发送参数设置
  QueryParmas: {
    query:'',
    cid:'',
    pagenum: 1,
    pagesize: 10
  },
  // 总页数设置
  totalPages: 0,
  onLoad: function (options) {
    this.QueryParmas.cid = options.cid || ''
    this.QueryParmas.query = options.query || ''
    this.getGoodsList()
  },
  // 发送请求获取数据
  getGoodsList() {
    request({
      url: '/goods/search',
      data: this.QueryParmas
    }).then(res => {
      const data = res.data.message.goods
      const total = res.data.message.total
      this.totalPages = Math.ceil(total / this.QueryParmas.pagesize)
      this.setData({
        goodsList: [...this.data.goodsList,...data]
      })
      wx.stopPullDownRefresh()
    })
  },
  // 触发上拉加载更多事件
  onReachBottom() {
    // 判断还有没有下一页数据
    if(this.QueryParmas.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页数据了'
      })
    } else {
      this.QueryParmas.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.QueryParmas.pagenum = 1
    this.getGoodsList()
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