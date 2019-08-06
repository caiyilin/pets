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
  },

  /**
   * 每次返回pageSize条
   */
  getAllPublishMessageData(pageSize, pageNum, keyword) {
    var data = new Array();
    try {
      var value = wx.getStorageSync('publishData');
      if (!value) {
        data = [];
      } else {
        value = JSON.parse(value);
        if (pageSize != -1) {
          if (keyword) {
            value = value.map((value, index) => {
              return value.message.indexOf(keyword) > 0 ? {
                id: value.id,
                contact: value.contact,
                type: value.type,
                message: value.message,
                address: value.address
              } : null
            });
          }
          if (value.length < pageSize) {
            pageSize = value.length;
          }
          for (let i = 0; i < pageSize; i++) {
            var array = value[pageNum * 5 + i];
            if (array) {
              data.push(array);
            }
          }
        } else {
          data = value;
        }
      }
    } catch (e) {
      // Do something when catch error
    }
    return data;
  }
})