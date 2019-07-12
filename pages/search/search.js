const app = getApp()
const util = require('../../utils/utils.js')
Page({
  data: {
    value: '',
    list: [{
      title: "平安客服邀约",
      type: "邀约",
      totalNum: 99,
      calledNum: 22,
      uncallNum: 77,
      belongUser:"王琴",
      belongProjectName:"销售顾问",
      batchCreatedUser:"蔡"
    }]
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