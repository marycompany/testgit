var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    city: "",
    province: "",
    street: "",
    road: "",
    company: "", park: "", seat: "",
    address:[],
    
    address: {
      id:'',
      wearer:'',
      wearerMobile:'',
      relation:'',
      terminalId:'',


      //id: 0,
      province_id: 0,
      city_id: 0,
      district_id: 0,
      address: '',
      full_region: '',
      userName: '',
      telNumber: '',
      is_default: 0
    },

 
    addressId: 0,
    openSelectRegion: false,
    selectRegionList: [
      { id: 0, name: '省份', parent_id: 1, type: 1 },
      { id: 0, name: '城市', parent_id: 1, type: 2 },
      { id: 0, name: '区县', parent_id: 1, type: 3 }
    ],
    regionType: 1,
    regionList: [],
    selectRegionDone: false
  },
  bindinputId(event) {
    let address = this.data.address;
    address.id = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputMobile(event) {
    let address = this.data.address;
    address.wearerMobile = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputName(event) {
    let address = this.data.address;
    address.wearer = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputterminalId(event) {
    let address = this.data.address;
    address.terminalId = event.detail.value;
    this.setData({
      address: address
    });
  },
  // bindinputterminalId(event) {
  //   // let self = this
  //   let address = this.detail.address
  //   // if (address) {
  //   //   wx.setStorageSync('terminalId', address)
  //   // }
  //   // let address = this.data.address;
  //   address.terminalId = event.detail.value;
  //   this.setData({
  //     address: address
  //   });
   
  // },
   bindinputrelation(event) {
    let address = this.data.address;
     address.relation = event.detail.value;
    this.setData({
      address: address
    });
  },






  bindinputAddress(event) {
    let address = this.data.address;
    address.detailInfo = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindIsDefault() {
    let address = this.data.address;
    address.is_default = !address.is_default;
    this.setData({
      address: address
    });
  },
  getAddressDetail() {
    let that = this;
    util.request(api.PendantDetail, { id: that.data.addressId }).then(function (res) {
      if (res.errno === 0) {
        if (res.data) {
          that.setData({
            address: res.data.terminalList
          });
        }
      }
    });
  },
  setRegionDoneStatus() {
    let that = this;
    let doneStatus = that.data.selectRegionList.every(item => {
      return item.id != 0;
    });

    that.setData({
      selectRegionDone: doneStatus
    })

  },
  chooseRegion() {
    let that = this;
    this.setData({
      openSelectRegion: !this.data.openSelectRegion
    });

    //设置区域选择数据
    let address = this.data.address;
    if (address.province_id > 0 && address.city_id > 0 && address.district_id > 0) {
      let selectRegionList = this.data.selectRegionList;
      selectRegionList[0].id = address.province_id;
      selectRegionList[0].name = address.province_name;
      selectRegionList[0].parent_id = 1;

      selectRegionList[1].id = address.city_id;
      selectRegionList[1].name = address.city_name;
      selectRegionList[1].parent_id = address.province_id;

      selectRegionList[2].id = address.district_id;
      selectRegionList[2].name = address.district_name;
      selectRegionList[2].parent_id = address.city_id;

      this.setData({
        selectRegionList: selectRegionList,
        regionType: 3
      });

      this.getRegionList(address.city_id);
    } else {
      this.setData({
        selectRegionList: [
          { id: 0, name: '省份', parent_id: 1, type: 1 },
          { id: 0, name: '城市', parent_id: 1, type: 2 },
          { id: 0, name: '区县', parent_id: 1, type: 3 }
        ],
        regionType: 1
      })
      this.getRegionList(1);
    }

    this.setRegionDoneStatus();

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
    if (options.id) {
      this.setData({
        addressId: options.id
      });
      this.getAddressDetail();
    }

    this.getRegionList(1);

    this.loadInfo();
    // wx.request({
    //   url: this.data.getAreabyIdUrl + options.areaId,
    //   success: function (res) {
    //     var result = res.data;
    //     if (result.code == 0) {
    //       var areaName = result.data.areaName;
    //       var priority = result.data.priority;
    //       _this.setData({
    //         areaId: options.areaId,
    //         areaName: areaName,
    //         priority: priority
    //       })
    //     } else {
    //       _this.showCusForm(result.message, '', 2000);
    //     }

    //   }
    // }),


    
       
      util.request(api.PendantListByUser).then(function (res) {
      var result = res.data;
      if (result.code == 0) {
        var id = result.data.address.id;
        var wearer = result.data.address.wearer;
        var wearerMobile = result.data.address.wearerMobile;
        var relation = result.data.address.relation;
        var terminalId = result.data.address.inputterminalId;
        _this.setData({
          id: address.id,
          wearer: address.wearer,
          wearerMobile: address.wearerMobile,
          relation: address.relation,
          terminalId: address.inputterminalId
        })
      } else {
        _this.showCusForm(result.message, '', 2000);
      }




        // if (res.errno === 0) {
        //   this.setData({
        //     terminalList: res.data.terminalList//res.data.terminalList必须跟后台一样才能获取数据
        //   });
        // }
      });
    

  },
  onReady: function () {

  },
  selectRegionType(event) {
    let that = this;
    let regionTypeIndex = event.target.dataset.regionTypeIndex;
    let selectRegionList = that.data.selectRegionList;

    //判断是否可点击
    if (regionTypeIndex + 1 == this.data.regionType || (regionTypeIndex - 1 >= 0 && selectRegionList[regionTypeIndex - 1].id <= 0)) {
      return false;
    }

    this.setData({
      regionType: regionTypeIndex + 1
    })

    let selectRegionItem = selectRegionList[regionTypeIndex];

    this.getRegionList(selectRegionItem.parent_id);

    this.setRegionDoneStatus();

  },
  selectRegion(event) {
    let that = this;
    let regionIndex = event.target.dataset.regionIndex;
    let regionItem = this.data.regionList[regionIndex];
    let regionType = regionItem.type;
    let selectRegionList = this.data.selectRegionList;
    selectRegionList[regionType - 1] = regionItem;


    if (regionType != 3) {
      this.setData({
        selectRegionList: selectRegionList,
        regionType: regionType + 1
      })
      this.getRegionList(regionItem.id);
    } else {
      this.setData({
        selectRegionList: selectRegionList
      })
    }

    //重置下级区域为空
    selectRegionList.map((item, index) => {
      if (index > regionType - 1) {
        item.id = 0;
        item.name = index == 1 ? '城市' : '区县';
        item.parent_id = 0;
      }
      return item;
    });

    this.setData({
      selectRegionList: selectRegionList
    })


    that.setData({
      regionList: that.data.regionList.map(item => {

        //标记已选择的
        if (that.data.regionType == item.type && that.data.selectRegionList[that.data.regionType - 1].id == item.id) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      })
    });

    this.setRegionDoneStatus();

  },
  doneSelectRegion() {
    if (this.data.selectRegionDone === false) {
      return false;
    }

    let address = this.data.address;
    let selectRegionList = this.data.selectRegionList;
    address.province_id = selectRegionList[0].id;
    address.city_id = selectRegionList[1].id;
    address.district_id = selectRegionList[2].id;
    address.province_name = selectRegionList[0].name;
    address.city_name = selectRegionList[1].name;
    address.district_name = selectRegionList[2].name;
    address.full_region = selectRegionList.map(item => {
      return item.name;
    }).join('');

    this.setData({
      address: address,
      openSelectRegion: false
    });

  },
  cancelSelectRegion() {
    this.setData({
      openSelectRegion: false,
      regionType: this.data.regionDoneStatus ? 3 : 1
    });

  },
  getRegionList(regionId) {
    let that = this;
    let regionType = that.data.regionType;
    util.request(api.RegionList, { parentId: regionId }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          regionList: res.data.map(item => {

            //标记已选择的
            if (regionType == item.type && that.data.selectRegionList[regionType - 1].id == item.id) {
              item.selected = true;
            } else {
              item.selected = false;
            }

            return item;
          })
        });
      }
    });
  },
  cancelAddress() {
    wx.navigateBack({
      url: '/pages/ucenter/pendantMap/pendantMap',
    })
  },
  saveAddress(event) {
    var that = this;

    let address = this.data.address;
    //var terminalId = event.detail.value.terminalId;

   // var formData = e.detail.value;
    if (address.wearer == '') {
      util.showErrorToast('请输入姓名');

      return false;
    }

    if (address.wearerMobile == '') {
      util.showErrorToast('请输入手机号码');
      return false;
    }

    // 判断terminalId是否为空和判断该账号名是否被注册
    if ("" == util.trim(address.terminalId)) {

      util.isError("terminalId不能为空", that);
       return false;
    } else {
      util.clearError(that);
      app.ajax.req('/register/checkLoginName', {
        "loginName": account
      }, function (res) {
        if (!res) {
          util.isError("账号已经被注册过", that);
          return;
        }
      });
    }

    // if (address.id == '') {
    //   util.showErrorToast('请输入详细地址');
    //   return false;
    // }

    //let that = this;
    util.request(api.PendantSave, {
      id: address.id,
      wearer: address.wearer,
      wearerMobile: address.wearerMobile,
      relation: address.relation,
      terminalId: address.terminalId
      
    }, 'POST', 'application/json').then(function (res) {

     // var result = res.data;
      if (res.errno === 0) {
        wx.navigateTo({
          url: '/pages/ucenter/pendantMap/pendantMap',
        })
      }
      // if (result.code == 0) {
      //   _this.showCusForm("操作成功", '', 2000);
        
      //     wx.navigateTo({
      //       url: '/pages/ucenter/pendantMap/pendantMap'
      //     })
        
      // } else {
      //   _this.showCusForm("操作失败", '', 2000);
      // }




      
   
    });

    // let terminalId = wx.getStorageSync('terminalId')
    // if (terminalId) {
    //   that.data.inputterminalId = terminalId
    //   that.setData(that.data)
    // }
    // else {
    //   wx.showToast({

    //     title: '性别不能为空!',

    //     icon: 'loading',

    //     duration: 1500

    //   })
    // }
    console.log(address.wearer),
      console.log(address.wearerMobile),
      console.log(address.relation),
      console.log(address.terminalId),
      console.log(address.id)
  },
  /**
  * 弹出信息提示
  */
  showCusForm: function (msg, icon, time) {
    wx.showToast({
      title: msg,
      icon: icon,
      duration: time
    })
  },
  onShow: function () {
    // 页面显示
    // let self = this
    // let terminalId = wx.getStorageSync('terminalId')
    // if (terminalId) {
    //   self.data.inputterminalId = terminalId
    //   self.setData(self.data)
    // }
    // else{
    //   wx.showToast({

    //     title: '性别不能为空!',

    //     icon: 'loading',

    //     duration: 1500

    //   })
    // }
     // page载入的时候先读取一次，wx.getStorageSync('userText')里面有没有内容，有内容就填充，没有则什么也不做
    //console.log(address.terminalId)
    //,
   // this.getTerminalList();
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

  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
  ,


})