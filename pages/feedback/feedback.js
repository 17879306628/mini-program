// pages/feedback/feedback.js
Page({
  data: {
    title: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品商家投诉',
        isActive: false
      }
    ],
    // 选择的图片数据
    chooseImg: [],
    // 获取文本域中的内容
    textVal:''
  },
  ImagePath: [],
  // 点击标题切换tab栏
  handleItemChange(e) {
    const index = e.detail
    let tabs = this.data.title
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({
      title: tabs
    })
  },
  // 点击+号选择图片
  handleChooseImage() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImg: [...this.data.chooseImg,...result.tempFilePaths]
        })
      }
    })
      
  },
  // 点击x删除图片
  handleRemove(e) {
    // 获取被点击的索引
    const index = e.currentTarget.dataset.index
    // 获取图片数组
    const chooseImg = this.data.chooseImg
    // 删除该图片
    chooseImg.splice(index,1)
    this.setData({
      chooseImg
    })
  },
  // 获取文本框输入内容
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 点击提交按钮，提交反馈
  handleFormSubmit() {
    // 获取文本中的内容和图片数组
    const {textVal,chooseImg} = this.data;
    // 验证输入合法性
    if(!textVal.trim()) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 1500,
        mask: true
      });
        
      return;
    }
    // 传输图片
    wx.showLoading({
      title:'上传中' ,
      mask: true
    })
      
    if(chooseImg.length != 0) {
      // 遍历图片，上传外网
      chooseImg.forEach((v,i) => {
        this.ImagePath.push(v)
        if(i === chooseImg.length - 1) {
          console.log('提交成功');
          wx.hideLoading();
          wx.navigateBack({
            delta: 1
          });
        }
      })
    } else {
      console.log('提交成功');
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      });
    }
  }
})