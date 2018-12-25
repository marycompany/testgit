const app = getApp()
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  data: {

  },

  formSubmit: function (e) {

    //console.log(e.detail.value);
    if (e.detail.value.wearer.length == 0 || e.detail.value.wearer.length >= 8) {

      wx.showToast({

        title: '姓名不能为空或过长!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.id.length == 0) {

      wx.showToast({

        title: '性别不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.wearerMobile.length == 0) {

      wx.showToast({

        title: '爱好不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)

    } else {


      wx.request({

        url: api.PendantSave,

        header: {

          "Content-Type": "application/x-www-form-urlencoded"

        },

        method: "POST",

        data: { wearer: e.detail.value.wearer, id: e.detail.value.id, wearerMobile: e.detail.value.wearerMobile },

        success: function (res) {
          console.log(res.data);
          if (res.data.status == 0) {

            wx.showToast({

              title: '提交失败！！！',

              icon: 'loading',

              duration: 1500

            })

          } else {

            wx.showToast({

              title: '提交成功！！！',//这里打印出登录成功

              icon: 'success',

              duration: 1000

            })

          }

        }

      })

    }

  },

})
 