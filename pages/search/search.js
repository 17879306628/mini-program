import request from '../../request/network'
Page({
  data: {
    goods: [],
    // 控制按钮显示和隐藏
    isShow: false,
    inputValue: ''
  },
  TimeId: -1,
  handleInput(e) {
    // 获取输入框输入的值
    const value = e.detail.value
    clearTimeout(this.TimeId)
    // 判断输入框是否为空
    if(!value.trim()) {
      this.setData({
        isShow: false,
        goods: []
      })
      return;
    } else {
      // 发送请求
      // 使用定时器产生节流效果
      this.setData({
        isShow: true
      })
      this.TimeId = setTimeout(() => {
        this.getSearch(value)
      },1000)
    }
    
    
  },
  async getSearch(query) {
    const res = await request({url:'/goods/qsearch',data:{query}})
    this.setData({
      goods: res.data.message
    })
  },
  // 点击按钮，取消输入框的值
  handelCancle() {
    this.setData({
      goods: [],
      isShow: false,
      inputValue: ''
    })
  }
})