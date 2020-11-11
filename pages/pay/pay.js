import {showModal, showToast} from '../../utils/asyncWx'
Page({
  data: {
    // 地址数据
    address: {},
    // 购物车数据
    cartList: [],
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0
  },
  onShow() {
    // 获取缓存中的地址数据
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    let cartList = wx.getStorageSync('cart') || [];
    // const allChecked = cartList.length?cartList.every(v=>v.checked):false
    cartList = cartList.filter(v=>v.checked)
    // 计算总价和总数量
    let totalPrice = 0
    let totalNum = 0
    cartList.forEach(v=>{
        totalPrice += v.goods_price * v.num
        totalNum+= v.num
    })
    this.setData({
      cartList,
      totalPrice,
      totalNum,
      address
    })
  },
  async handleOrderPay() {
    try {
      // 1.从缓存中获取token
      const token = wx.getStorageSync('token');
      if(!token) {
        // 不存在token
        // 跳转授权页面
        wx.navigateTo({
          url: '/pages/auth/auth'
        })
      } else {
        // 做假设 存在token
        const res = await showModal('确定要进行支付吗')
        if(res.confirm) {
          // 支付成功
          showToast('支付成功,跳转到订单页面')
          // 支付完成，删除已经支付的数据,并将新数据重新存入缓存
          let newCart = wx.getStorageSync('cart');
          newCart = newCart.filter(v=>!v.checked)
          wx.setStorageSync('cart', newCart);
          setTimeout(() => {
            // 跳转订单页面
            wx.navigateTo({
              url: '/pages/order/order'
            })
          }, 1500)
        } else {
          // 支付失败
          await showToast('支付失败')
        }
      }
    } catch(err) {
      // 发生错误
      console.log(err);
    }
  }
})