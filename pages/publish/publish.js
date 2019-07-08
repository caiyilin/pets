const app = getApp()
const util = require('../../utils/utils.js')
Page({

  data: {
    address: "点击选择，要勾选哦~"
  },

  staticData: {
    type: "buy"
  },

  handleAddressClick: function() {
    wx.chooseLocation({
      success: this.handleChooseLocationSucc.bind(this)
    })
  },

  handleChooseLocationSucc: function(res) {
    this.setData({
      address: res.address
    })

    Object.assign(this.staticData, {
      latitude: res.latitude,
      longitude: res.longitude
    })
  },

  handleTypeChange: function(e) {
    this.staticData.type = e.detail.value;
  },

  handleContactChange: function(e) {
    this.staticData.contact = e.detail.value;
  },

  handleMessageChange: function(e) {
    this.staticData.message = e.detail.value;
  },

  handleSubmit: function() {
    if (this.data.address === "点击选择，要勾选哦~" || !this.data.address) {
      util.toast('请选择交易地址', 'error');
      // wx.showToast({
      //   title: '请选择交易地址',
      //   icon: 'loading',
      //   duration: 2000
      // })
      return;
    }
    if (!this.staticData.message) {
      util.toast('请填写您的需求。', 'error');
      return;
    }
    if (!this.staticData.contact) {
      util.toast('请填写您的联系方式。', 'error');
      return;
    }

    try {
      var value = wx.getStorageSync('publishData');
      if (!value) {
        value = [];
      } else {
        value = JSON.parse(value);
      }
      const data = Object.assign({}, this.staticData, {
        address: this.data.address
      });
      value.push(data);
      var objToStr = JSON.stringify(value);
      wx.setStorageSync('publishData', objToStr)
    } catch (e) {
      // Do something when catch error
    }

    // wx.request({
    //   url: '',
    //   method: 'POST',
    //   data: data,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: this.handlePublishSucc.bind(this)
    // })
  },

  handleClickPhone: function() {
    if (this.staticData.contact) {
      console.log(this.staticData.contact);
      wx.makePhoneCall({
        phoneNumber: this.staticData.contact,
      })
    }
  },

  handlePublishSucc: function(res) {
    console.log(res.data);
  },

  onShareAppMessage: function(res) {
    return {
      title: '发布交易',
      path: '/pages/publish/publish'
    }
  }
})