import request from '../../request/network'
Page({
  data: {
    // 左侧大菜单数据
    leftMenuList: [],
    // 右侧大菜单数据
    rightMenuList: [],
    // 被点击左侧菜单的索引
    currentIndex: 0,
    // 右侧商品滚动位置
    scrollTop: 0
  },
  CateData: [],
  onLoad: function (options) {
    // 判断有没有缓存的数据
    const Cates = wx.getStorageSync('cates');
    if(!Cates) {
      // 不存在数据，则请求新数据
      this.getCateList()
    } else {
      // 有数据 判断数据有没有过期
      if(Date.now() - Cates.time > 1000 * 300) {
        // 数据过期，重新请求
        this.getCateList()
      } else {
        // 有数据且没过期
        this.CateData = Cates.data
        // 存入左侧菜单数据
        let leftMenuList = this.CateData.map(v=>v.cat_name)
        // 存入右侧商品数据
        let rightMenuList = this.CateData[0].children
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
  },
  getCateList() {
    request({
      url: '/categories'
    }).then(res => {
      this.CateData = res.data.message
      // 存入数据
      wx.setStorageSync('cates', {time:Date.now(),data:this.CateData});
      // 存入左侧菜单数据
      let leftMenuList = this.CateData.map(v=>v.cat_name)
      // 存入右侧商品数据
      let rightMenuList = this.CateData[0].children
      this.setData({
        leftMenuList,
        rightMenuList
      })
    })
  },
  leftListClick(event) {
    const index = event.currentTarget.dataset.index
    let rightMenuList = this.CateData[index].children
    this.setData({
      rightMenuList,
      currentIndex: index,
      // 设置右侧内容置顶
      scrollTop: 0
    })
  }
})