import apis from './modules/api'
import util from './modules/util'
import fetch from './modules/fetch'

wx.apis = apis
wx.fetch = fetch
wx.util = util
wx.safeNavigateTo = util.safeNavigateTo

//app.js
App({
  onLaunch() {

  },
  globalData: {
    userInfo: null
  }
})