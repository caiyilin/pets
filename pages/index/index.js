//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    latitude: '',
    longitude: '',
    markers: [],
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
      }
    ],
  },

  onReady: function(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map');
  },

  onShow: function() {
    this.getLocation();
    this.getAllPublishMessage();
  },

  getAllPublishMessage() {
    try {
      var value = wx.getStorageSync('publishData');
      if (!value) {
        value = [];
      } else {
        value = JSON.parse(value);
      }
      const markers = value.map((value, index) => {
        return {
          iconPath: "/resources/" + value.type + ".png",
          id: value.id,
          latitude: value.latitude,
          longitude: value.longitude,
          width: 50,
          height: 50
        }
      });
      this.setData({
        markers: markers
      });
    } catch (e) {
      // Do something when catch error
    }
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

  controltap: function(e) {
    this.mapCtx.moveToLocation();
  },

  markerTap: function(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.markerId,
    })
  },

  onShareAppMessage: function(res) {
    return {
      title: '萌宠交易平台',
      path: '/pages/index/index'
    }
  }
})