// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    type: "sell",
    message: "",
    contact: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    try {
      var value = wx.getStorageSync('publishData');
      if (!value) {
        value = [];
      } else {
        value = JSON.parse(value);
      }
      for (var i = 0; i < value.length; i++) {
        var detail = value[i];
        if (detail.id == id) {
          this.setData({
            address: detail.address,
            type: detail.type,
            message: detail.message,
            contact: detail.contact
          });
        }
      }
    } catch (e) {
      // Do something when catch error
    }
  },

  handleClickPhone: function() {
    if (this.data.contact) {
      console.log(this.data.contact);
      wx.makePhoneCall({
        phoneNumber: this.data.contact,
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '交易详情',
      path: '/pages/detail/detail'
    }
  }
})