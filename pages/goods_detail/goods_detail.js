import request from '../../request/network'
Page({
  data: {
    detailObj: {}
  },
  // 全局详情数据对象
  DetailInfo: {},
  onLoad: function (options) {
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
      this.setData({
        detailObj: {
          pics: detailObj.pics,
          goods_name: detailObj.goods_name,
          goods_price: detailObj.goods_price,
          goods_introduce: detailObj.goods_introduce.replace(/\.webp/g, '.jpg')
        }
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
  }
})