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
    console.log(this.data);
    console.log(this.staticData)
  },

  handleContactChange: function(e) {
    this.staticData.contact = e.detail.value;
  },

  handleMessageChange: function(e) {
    this.staticData.message = e.detail.value;
  },

  handleSubmit:function(){

  },
  
  onShareAppMessage: function(res) {
    return {
      title: '发布交易',
      path: '/pages/publish/publish'
    }
  }
})