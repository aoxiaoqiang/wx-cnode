//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎来到CNode社区',
    userInfo: {}
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      wx.getUserInfo({
        success: (res) => {
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
  }
})