// pages/cart/cart.js
import {getSetting, openSetting, chooseAddress, showModal, showToast} from '../../utils/asyncWx.js'
Page({
  data: {
    // 地址数据
    address: {},
    // 购物车数据
    cartList: [],
    // 全选按钮
    allChecked: false,
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0
  },
  onShow() {
    // 获取缓存中的地址数据
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    const cartList = wx.getStorageSync('cart') || [];
    // const allChecked = cartList.length?cartList.every(v=>v.checked):false
    this.setData({
      address
    })
    this.setCart(cartList)
  },
  // 点击获取收货地址
  async handleAddressClick() {
    try {
      // 调用getSetting接口
      const res1 = await getSetting()
      // 获取scope.address的值
      const scopeAddress = res1.authSetting["scope.address"]
      if(!scopeAddress) {
        // 调用openSetting函数
        const res2 = await openSetting()
      }
      // 打开选择地址窗口
      let address = await chooseAddress()
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
      // 将获取到的收货地址存入缓存中
      wx.setStorageSync('address', address);
    } catch(error) {
      console.log(error);
    }
  },
  // 计算全选，总价，总数量
  setCart(cartList) {
    // 获取全选，总价格，总数量数据
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cartList.forEach(v=>{
      if(v.checked) {
        totalPrice += v.goods_price * v.num
        totalNum+= v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cartList.length?allChecked:false
    this.setData({
      cartList,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cartList);
  },
  // 点击单选按钮时，改变属性
  handleCheckClick(e) {
    // 获取被选中的goods_id
    const goods_id = e.currentTarget.dataset.id
    // 从缓存中获取购物车数据
    const cartList = wx.getStorageSync('cart');
    // 获取这个id的商品的索引
    const index = cartList.findIndex(v=>v.goods_id===goods_id)
    // 改变这个商品的checked属性
    cartList[index].checked = !cartList[index].checked
    // 重新计算
    this.setCart(cartList)
  },
  // 点击全选按钮，改变属性
  handleAllChecked() {
    // 获取购物车数据和全选按钮数据
    let allChecked = this.data.allChecked
    let cartList = this.data.cartList
    // 修改全选的值
    allChecked = !allChecked
    // 循环遍历购物车数组
    cartList.forEach(v=>v.checked=allChecked)
    // 重新计算属性
    this.setCart(cartList)
  },
  // 点击+按钮
  handleIncrement(e) {
    // 获取被选中的goods_id
    const goods_id = e.currentTarget.dataset.id
    // 从缓存中获取购物车数据
    const cartList = wx.getStorageSync('cart');
    // 获取这个id的商品的索引
    const index = cartList.findIndex(v=>v.goods_id===goods_id)
    cartList[index].num++
    this.setCart(cartList)
  },
  // 点击-按钮
  async handleDecrement(e) {
    // 获取被选中的goods_id
    const goods_id = e.currentTarget.dataset.id
    // 从缓存中获取购物车数据
    const cartList = wx.getStorageSync('cart');
    // 获取这个id的商品的索引
    const index = cartList.findIndex(v=>v.goods_id===goods_id)
    // 判断是否要进行删除
    if(cartList[index].num === 1) {
      const result = await showModal('你要进行删除吗')
      if(result.confirm) {
        cartList.splice(index,1)
        this.setCart(cartList)
      }
    } else {
      cartList[index].num--
      this.setCart(cartList)
    }
  },
  // 点击支付按钮
  async handlePay() {
    const {address,totalNum} = this.data;
    // 判断有没有收货地址
    if(!address.userName) {
      const result = await showToast('你还没有选择收货地址')
      return
    }
    // 判断有没有商品数量
    if(totalNum===0) {
      const result = await showToast('你还没有选购商品')
      return
    }
    // 都有，做跳转功能
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
  }
})