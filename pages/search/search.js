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
      belongUser: "王琴",
      belongProjectName: "销售顾问",
      batchCreatedUser: "蔡"
    }],

    value1: [],
    value2: [],
    value3: [],
    value4: [],
    value5: [],
    value6: [],
    value7: [],
    value8: [],
    value9: [],
    displayValue1: '请选择',
    displayValue2: '请选择',
    displayValue3: '请选择',
    displayValue4: '请选择',
    displayValue5: '请选择',
    displayValue6: '请选择',
    displayValue7: '请选择',
    displayValue8: '请选择',
    displayValue9: '请选择',
    lang: 'zh_CN',
  },
  onChange(e) {
    this.setData({
      value: e.detail.value,
    })
    console.log(this.data.value)
  },
  onFocus(e) {
    console.log('onFocus', e)
  },

  onChange(e) {
    console.log(e)
    const {
      key,
      values
    } = e.detail
    const lang = values[key]

    this.setData({
      lang,
    })
  },
  setValue(values, key, mode) {
    this.setData({
      [`value${key}`]: values.value,
      [`displayValue${key}`]: values.label,
      // [`displayValue${key}`]: values.displayValue.join(' '),
    })
  },
  onConfirm(e) {
    const {
      index,
      mode
    } = e.currentTarget.dataset
    this.setValue(e.detail, index, mode)
    console.log(`onConfirm${index}`, e.detail)
  },
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible
    })
  },
  onClick() {
    this.setData({
      visible: true
    })
  },
})