//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    latitude: '',
    longitude: '',
    controls: [{
      iconPath: '/resources/pin.png',
      position: {
        left: (app.globalData.windowWidth / 2) - 11,
        top: ((app.globalData.windowHeight - 40) / 2) - 20,
        width: 22,
        height: 22
      }
    }, 
    {
      id: 1,
      iconPath: '/resources/cicle.png',
      position: {
        left: 10,
        top: app.globalData.windowHeight - 90,
        width: 22,
        height: 22
      },
      clickable: true
    }],
  },

  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },

  onShow: function() {
    this.getLocation();
  },

  getLocation: function() {
    wx.getLocation({
      type: 'gcj02',
      success: this.handleGetLocationSucc.bind(this)
    })
  },

  handleGetLocationSucc: function(res) {
    this.setData({
      latitude: res.latitude,
      longitude: res.longitude,
    });
  },

  controltap:function(e){
    this.mapCtx.moveToLocation();
  },

  onShareAppMessage: function(res) {
    return {
      title: '萌宠交易平台',
      path: '/pages/index/index'
    }
  }
})