Page({
  data:{
    array:['男','女'],
    index:0,
    date:'2016-09-01'
  },
  bindDateChange:function(e){
    var date = e.detail.value;
    this.setData({ date: date});
  },
  bindPickerChange:function(e){
    var index = e.detail.value;
    this.setData({ index: index});
  },

  onLoad: function () {


    if (!wx.cloud) {
      wx.redirectTo({
        url: '../miniprogram/pages/chooseLib/chooseLib',
      })
      return
    }

  // 获取用户信息
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            this.setData({
              avatarUrl: res.userInfo.avatarUrl,
              userInfo: res.userInfo
            })
          }
        })
      }
    }
  })
},

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  }




 













})