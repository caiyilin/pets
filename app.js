//app.js
App({
  globalData: {},
  onLaunch: function() {
    this.getSystemInfoSync();
  },
  getSystemInfoSync: function() {
    try {
      const res = wx.getSystemInfoSync()
      this.globalData.windowWidth = res.windowWidth;
      this.globalData.windowHeight = res.windowHeight;
    } catch (e) {
      // Do something when catch error
    }
  }
})