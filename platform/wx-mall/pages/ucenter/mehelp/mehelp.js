var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

'use strict';

// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
 

Page({
  data: {
    city: "",
    province: "",
    street: "",
    road: "",
    terminalList: [],

    latitude: null,
    longitude: null,
    address: null,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'LVWBZ-W7V3R-DQZWF-WXKYM-ZFVNK-TTB2X'
    });
    this.getLocation();//一进来就得到地址
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getTerminalList();
    // 调用接口
    qqmapsdk.search({
      keyword: '酒店',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  getTerminalList() {
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
,











  getLocation() {
    var that = this
    wx.getLocation({//调用API得到经纬度
      type: 'wgs84',
      success: function (res) {
        var speed = res.speed
        var accuracy = res.accuracy
        var latitude = res.latitude
        var longitude = res.longitude

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        //地址解析
        var demo = new QQMapWX({
          key: 'LVWBZ-W7V3R-DQZWF-WXKYM-ZFVNK-TTB2X'// 这个KEY的获取方式在上面链接 腾讯位置服务的开发文档中有详细的申请密钥步骤
        });

        demo.reverseGeocoder({//地址解析
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res);
            //获得地址
            that.setData({
              address: res.result.address
            })
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });
      }

    })
  }
,




















  loadInfo: function () {
    var page = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(latitude, longitude);
        page.loadCity(latitude, longitude);
      },
    })
  },
  loadCity: function (latitude, longitude) {
    var page = this;
    wx.request({
      url: 'http://api.map.baidu.com/geocoder/v2/?ak=D6WOzHaymzVVKvgiy8UbhQEznkgeK6BD&location=' + latitude + ',' + longitude + '&output=json',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);

        // province_id: 0,
        //   city_id: 0,
        //     district_id: 0,


        var city = res.data.result.addressComponent.city;
        var province = res.data.result.addressComponent.province;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;
        var road = res.data.result.addressComponent.road;
        var company = res.data.result.addressComponent.company;
        var park = res.data.result.addressComponent.park;
        var seat = res.data.result.addressComponent.seat;

        city = city.replace("市", "");
        page.setData({ city: city });
        page.loadWeather(city);

        province = province.replace("省", "");
        page.setData({ province: province });
        page.loadWeather(province);
        //明天改
        district = district.replace("省", "");
        page.setData({ district: district });
        page.loadWeather(district);

        street = street.replace("省", "");
        page.setData({ street: street });
        page.loadWeather(street);

        road = road.replace("省", "");
        page.setData({ road: road });
        page.loadWeather(road);

        company = company.replace("省", "");
        page.setData({ company: company });
        page.loadWeather(company);

        park = park.replace("省", "");
        page.setData({ park: park });
        page.loadWeather(park);

        seat = seat.replace("省", "");
        page.setData({ seat: seat });
        page.loadWeather(seat);
      }
    });
  },
  loadWeather: function (city) {
    var page = this;
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

        console.log(res)
        var future = res.data.data.forecast;
        var todayInfo = future.shift();
        var today = res.data.data;
        today.todayInfo = todayInfo;
        page.setData({ today: today, future: future })


      }
    });
  },









})







// Page({
//   /**
//    * 页面的初始数据
//    */
//   data: {
//     btnText: "立即处理", 
//     title: 'mappage',
//     address: '',
//     latitude: '',
//     longitude: '',
//     showButton: false
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function onLoad() {
//     // TODO: onLoad
//   },


//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function onReady() {
//     // TODO: onReady
//   },


//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function onShow() {
//     this.checkLocationSet();
//   },

//   checkLocationSet: function checkLocationSet() {
//     var _this = this;
//     wx.getSetting({
//       success: function success(res) {
//         console.log(res);
//         if (res.authSetting['scope.userLocation'] == null) {
//           // 未授权过，不做任何处理
//           _this.setData({ showButton: false });
//         } else {
//           if (!res.authSetting['scope.userLocation']) {
//             // 关闭了 应该打开
//             _this.setData({ showButton: true });
//           } else {
//             // 直接处理
//             _this.setData({ showButton: false });
//           }
//         }
//       }
//     });
//   },
//   getLocation: function getLocation() {
//     var _this = this;

//     wx.getSetting({
//       success: function success(res) {
//         if (res.authSetting['scope.userLocation'] == null) {
//           _this.saveLocation();
//         } else {
//           if (!res.authSetting['scope.userLocation']) {
//             wx.authorize({
//               scope: 'scope.userLocation',
//               success: function success() {
//                 // 成功
//                 _this.saveLocation();
//               }
//             });
//           } else {
//             // 直接处理
//             _this.saveLocation();
//           }
//         }
//       }
//     });
//   },
//   saveLocation: function saveLocation() {
//     var _this = this;
//     wx.getLocation({
//       type: 'gcj02', //返回可以用于wx.openLocation的经纬度
//       success: function success(res) {
//         var latitude = res.latitude;
//         var longitude = res.longitude;
//         wx.chooseLocation({
//           latitude: latitude,
//           longitude: longitude,
//           scale: 28,
//           success: function success(res) {
//             console.log(res);
//             _this.setData({
//               address: res.address,
//               latitude: res.latitude,
//               longitude: res.longitude

//             });
//           }
//         });
//       }
//     });
//   },
//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function onHide() {
//     // TODO: onHide
//   },


//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function onUnload() {
//     // TODO: onUnload
//   },


//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function onPullDownRefresh() {
//     // TODO: onPullDownRefresh
//   },
//   // deal: function () {
//   //   this.setData({ btnText: '已处理' })
//   // }, 
//   /**
//     * 处理
//     */
//   detal: function () {
//     var that = this;
//     if (this.data.openAttr == false) {
//       //添加到购物车
//       util.request(api.CartAdd, { goodsId: this.data.goods.id, number: this.data.number, productId: checkedProduct[0].id }, 'POST', 'application/json')
//         .then(function (res) {
//           let _res = res;
//           if (_res.errno == 0) {
//             this.setData({ btnText: '已处理' });
//             wx.showToast({
//               title: '处理成功'
//             });
//           } else {
//             wx.showToast({
//               image: '/static/images/icon_error.png',
//               title: '处理失败'
//             });
//           }
//         });
//     }
//   },

// })