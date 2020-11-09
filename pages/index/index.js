import request from '../../request/network'
//Page Object
Page({
  data: {
    // 轮播图数据
    SwiperList: [],
    // 分类导航数据
    CateList: [],
    // 楼层数据
    FloorList: []
  },
  //options(Object)
  onLoad: function(options){
    // 获取轮播图数据
    this.getSwiperData()
    // 获取分类导航数据
    this.getCateList()
    // 获取分类导航数据
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperData() {
    request({
      url: '/home/swiperdata'
    }).then(res => {
      this.setData({
        SwiperList: res.data.message
      })
    })
  },
  // 获取分类导航数据
  getCateList() {
    request({
      url: '/home/catitems'
    }).then(res => {
      this.setData({
        CateList: res.data.message
      })
    })
  },
  // 获取楼层数据
  getFloorList() {
    request({
      url: '/home/floordata'
    }).then(res => {
      this.setData({
        FloorList: res.data.message
      })
    })
  }
})