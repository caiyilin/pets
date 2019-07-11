const app = getApp()
const util = require('../../utils/utils.js')
Page({
  data: {
    value: '',
  },
  onChange(e) {
    this.setData({
      value: e.detail.value,
    })
    console.log(this.data.value)
  },
  onFocus(e) {
    console.log('onFocus', e)
  }
})