const app = getApp()
const util = require('../../utils/utils.js')

import {
  $wuxDialog
} from '../../components/index'

Page({
  data: {
    keyword: '',
    list: [],
    contentHeight: 0,
    count: 0,
    noData: false,
    noMoreData: false,
    images: {
      noDataIcon: "../../resources/no-data.png"
    },
  },

  staticData: {
    pageNum: 0,
  },

  onLoad() {
    //声明节点查询的方法
    wx.createSelectorQuery().selectAll('.page,.search-container').fields({
      size: true
    }, ([p, m]) => {
      this.setData({
        contentHeight: p.height - m.height
      })
      // console.log(this.data.contentHeight)
    }).exec();
  },

  onShow() {
    this.loadListData();
  },

  onClear(e) {
    this.setData({
      keyword: '',
    })
    this.staticData.keyword = '';
  },

  onChange(e) {
    this.setData({
      keyword: e.detail.value,
    })
    this.staticData.keyword = e.detail.value;
  },

  onConfirm(e) {
    this.setData({
      keyword: e.detail.value,
    })
    this.staticData.keyword = e.detail.value;
    this.loadListData();
  },

  handleClickPhone(e) {
    let index = e.currentTarget.dataset.index;
    const contact = this.data.list[index].contact;
    if (contact) {
      console.log(contact);
      wx.makePhoneCall({
        phoneNumber: contact,
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.loadListData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.onLoadmore();
  },

  loadListData() {
    this.onRefresh();
  },

  onRefresh() {
    // console.log('onRefresh');
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    this.staticData.pageNum = 0;
    this.getList(5, 0, 1);
    setTimeout(function() {
      wx.hideLoading();
      wx.stopPullDownRefresh()
    }, 1000);
  },

  onLoadmore() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    this.staticData.pageNum = this.staticData.pageNum + 1;
    this.getList(5, this.staticData.pageNum, 2);
  },

  getList(pageSize, pageNum, fromLoadding) {
    setTimeout(function() {
      wx.hideLoading();
    }, 1000);
    var value = app.getAllPublishMessageData(pageSize, pageNum, this.staticData.keyword);
    console.log(value);
    var that = this;
    const dataList = value.map((value, index) => {
      return {
        id: value.id,
        contact: value.contact,
        type: value.type,
        message: value.message,
        address: value.address
      }
    });
    if (dataList.length > 0) {
      this.staticData.dataList = dataList;
    } else {
      this.staticData.dataList = new Array();
    }
    that.staticData.count = this.staticData.dataList.length;

    if (fromLoadding == 1) {
      that.setData({
        list: [...that.staticData.dataList],
        noData: that.staticData.count == 0,
        noMoreData: false
      });
    } else {
      that.setData({
        list: [...that.data.list, ...that.staticData.dataList]
      });
      if (that.staticData.count == 0) {
        // console.log('没有更多数据')
        that.setData({
          noMoreData: true
        })
      }
    }
  },

  //无数据是轻触刷新
  handleLoadDataBtn() {
    this.loadListData();
  }
})