import request from '../../request/network'
Page({
  data: {
    detailObj: {},
    isCollected: false
  },
  // 全局详情数据对象
  DetailInfo: {},
  onShow: function () {
    let curPages =  getCurrentPages();
    let currentPages = curPages[curPages.length - 1]
    let options = currentPages.options
    const goods_id = options.goods_id
    this.getGoodsDetail(goods_id)
  },
  // 发送详情页数据请求
  getGoodsDetail(goods_id) {
    request({
      url: '/goods/detail',
      data: {goods_id}
    }).then(res => {
      const detailObj = res.data.message
      this.DetailInfo = detailObj
      // 从缓存中取出收藏数组
      const collect = wx.getStorageSync('collect') || [];
      let isCollected = collect.some(v=>v.goods_id===this.DetailInfo.goods_id)
      this.setData({
        detailObj: {
          pics: detailObj.pics,
          goods_name: detailObj.goods_name,
          goods_price: detailObj.goods_price,
          goods_introduce: detailObj.goods_introduce.replace(/\.webp/g, '.jpg')
        },
        isCollected
      })
    })
  },
  // 点击轮播图放大预览
  handleImageClick(e) {
    const current = e.currentTarget.dataset.url
    const urls = this.DetailInfo.pics.map(v=>v.pics_mid)
    wx.previewImage({
      current,
      urls
    })
  },
  // 点击加入购物车
  handleCartClick() {
    // 从缓存中取出购物车数据
    const cart = wx.getStorageSync('cart') || [];
    // 判断购物车中有没有这个商品数据
    const index = cart.findIndex(v=>v.goods_id === this.DetailInfo.goods_id)
    if(index===-1) {
      // 这个商品不在购物车中
      this.DetailInfo.num = 1
      this.DetailInfo.checked = true
      cart.push(this.DetailInfo)
    } else {
      // 这个商品在购物车中
      cart[index].num++
    }
    // 将购物车数据存入缓存
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true
    })
  },
  // 点击收藏
  handleCollectClick() {
    const userInfo = wx.getStorageSync('userinfo');
    if(userInfo.nickName) {
      // 有登录角色
      let isCollected = !this.data.isCollected
      let collect = wx.getStorageSync('collect') || [];
      if(isCollected) {
        // 是收藏
        const {goods_id,goods_name,goods_price,goods_small_logo} = this.DetailInfo
        collect.push({goods_id,goods_name,goods_price,goods_small_logo,isCollected})
        wx.setStorageSync('collect', collect);
        this.setData({
          isCollected
        })
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 1500,
          mask: true
        })
          
      } else {
        // 取消收藏
        collect = collect.filter(v=>!(v.goods_id===this.DetailInfo.goods_id))
        wx.setStorageSync('collect', collect);
        this.setData({
          isCollected
        })
        wx.showToast({
          title: '取消收藏',
          icon: 'success',
          duration: 1500,
          mask: true
        })
      }
    } else {
      // 没有登录角色
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    
  }
})