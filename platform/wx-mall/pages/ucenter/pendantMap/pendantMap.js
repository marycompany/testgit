
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    terminalList: [],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getTerminalList();
  },
  getTerminalList (){
    let that = this;
    util.request(api.PendantListByUser).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          terminalList: res.data.terminalList//res.data.terminalList必须跟后台一样才能获取数据
        });
      }
    });
  },










  addressAddOrUpdate(event) {
    wx.navigateTo({
      url: '/pages/ucenter/Pendantinfo/Pendantinfo?id=' + event.currentTarget.dataset.addressId
    })
  },
  deleteAddress(event) {
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除地址？',
      success: function (res) {
        if (res.confirm) {
          let addressId = event.target.dataset.addressId;
          util.request(api.AddressDelete, { id: addressId }, 'POST', 'application/json').then(function (res) {
            if (res.errno === 0) {
              that.getTerminalList();
            }
          });
        }
      }
    })
    return false;

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})

