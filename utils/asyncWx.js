export const  getSetting = () => {
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{ reject(err)}
    })
  })
}

export const  openSetting = () => {
  return new Promise((resolve,reject) => {
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{ reject(err)}
    })
  })
}

export const  chooseAddress = () => {
  return new Promise((resolve,reject) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{ reject(err)}
    })
  })
}

export const  showModal = (content) => {
  return new Promise((resolve,reject) => {
    wx.showModal({
      title: '',
      content: content,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        resolve(result)
      },
      fail: () => {},
      complete: () => {}
    });
      
  })
}

export const  showToast = (title) => {
  return new Promise((resolve,reject) => {
    wx.showToast({
      title: title,
      icon: 'none'
    });
      
  })
}