var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
id:'',
    wearer:'',
    wearerMobile:''
    // sex: '男'
  },
  // switchChange: function (e) {
  //   if (e.detail.value) {
  //     this.setData({ sex: '男' });
  //   } else {
  //     this.setData({ sex: '女' });
  //   }
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // bindinputMobile(event) {
    
  //   address.telNumber = event.detail.value;
  //   this.setData({
  //     address: address
  //   });
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // //表单提交
  // formSubmit: function (e) {
  //   wx.request({
  //     url: api.PendantSave, //仅为示例，并非真实的接口地址
  //     method: 'POST',
  //     data: { wearer: e.detail.value.wearer, id: e.detail.value.id, wearerMobile: e.detail.value.wearerMobile },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success: (res) => {
  //       //console.log(res.data)
  //       if (res.error) {
  //         wx.showToast({
  //           title: res.data.msg,
  //           icon: 'none',
  //           duration: 2000
  //         })
  //       } else {
  //         wx.showToast({
  //           title: '添加成功',
  //           icon: 'success',
  //           duration: 2000
  //         })
  //       }
  //     }
  //   })
  //   //console.log(age)
  // }
 
  // ,

  //表单提交
  formSubmit: function (e) {
  
 
    let that = this;
    util.request(api.PendantSave, {
      id:id,
      wearer: wearer,
      wearerMobile: wearerMobile
     
    }, 'POST', 'application/json').then(function (res) {
      // if (res.errno === 0) {
      //   wx.navigateBack({
      //     url: '/pages/ucenter/address/address',
      //   })
      // }
    });
    console.log(wearer)
  }
})
