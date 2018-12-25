var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();

// Page({
//   data: {
//     cartGoods: [],
//     cartTotal: {
//       "goodsCount": 0,
//       "goodsAmount": 0.00,
//       "checkedGoodsCount": 0,
//       "checkedGoodsAmount": 0.00
//     },
//     isEditCart: false,
//     checkedAllStatus: true,
//     editCartList: [],


//     // newadd
//                   // 购物车列表
//     hasList: false,          // 列表是否有数据
//     totalPrice: 0,           // 总价，初始为0
//     selectAllStatus: true    // 全选状态，默认全选
//   },
//   onLoad: function (options) {
//     // 页面初始化 options为页面跳转所带来的参数


//   },
//   onReady: function () {
//     // 页面渲染完成

//   },
//   onShow: function () {
//     // 页面显示
//     this.getCartList();
//   },
//   onHide: function () {
//     // 页面隐藏

//   },
//   onUnload: function () {
//     // 页面关闭

//   },

//   bindCheckbox: function (e) {
//     /*绑定点击事件，将checkbox样式改变为选中与非选中*/
//     //拿到下标值，以在carts作遍历指示用
//     console.log(e);
//     var index = parseInt(e.currentTarget.dataset.index);
//     //原始的icon状态
//     var selected = this.data.carts[index].selected;
//     var carts = this.data.carts;
//     // 对勾选状态取反
//     carts[index].selected = !selected;
//     // 写回经点击修改后的数组
//     this.setData({
//       carts: carts
//     });
//     this.sum()
//   },



//   getCartList: function () {
//     let that = this;
//     util.request(api.CartList).then(function (res) {
//       if (res.errno === 0) {
//         that.setData({
//           cartGoods: res.data.cartList,
//           totalPrice: res.data.cartTotal
//         });
//       }

//       that.setData({
//         checkedAllStatus: that.isCheckedAll()
//       });
//     });
//   },
//   isCheckedAll: function () {
//     //判断购物车商品已全选
//     return this.data.cartGoods.every(function (element, index, array) {
//       if (element.checked == true) {
//         return true;
//       } else {
//         return false;
//       }
//     });
//   },
//   checkedItem: function (event) {
//     let itemIndex = event.target.dataset.itemIndex;
//     let that = this;

//     if (!this.data.isEditCart) {
//       util.request(api.CartChecked, { productIds: that.data.cartGoods[itemIndex].product_id, isChecked: that.data.cartGoods[itemIndex].checked ? 1 : 0}).then(function (res) {
//         if (res.errno === 1) {
//           that.setData({
//             cartGoods: res.data.cartList,
//             totalPrice: res.data.cartTotal
//           });
//         }

//         that.setData({
//           checkedAllStatus: that.isCheckedAll()
//         });
//       });
//     } else {
//       //编辑状态
//       let tmpCartData = this.data.cartGoods.map(function (element, index, array) {
//         if (index == itemIndex){
//           element.checked = !element.checked;
//         }
        
//         return element;
//       });

//       that.setData({
//         cartGoods: tmpCartData,
//         checkedAllStatus: that.isCheckedAll(),
//         'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
//       });
//     }
//   },
//   getCheckedGoodsCount: function(){
//     let checkedGoodsCount = 0;
//     this.data.cartGoods.forEach(function (v) {
//       if (v.checked === true) {
//         checkedGoodsCount += v.number;
//       }
//     });
//     return checkedGoodsCount;
//   },
//   checkedAll: function () {
//     let that = this;

//     if (!this.data.isEditCart) {
//       var productIds = this.data.cartGoods.map(function (v) {
//         return v.product_id;
//       });
//       util.request(api.CartChecked, { productIds: productIds.join(','), isChecked: that.isCheckedAll() ? 0 : 1 }).then(function (res) {
//         if (res.errno === 0) {
//           that.setData({
//             cartGoods: res.data.cartList,
//             totalPrice: res.data.cartTotal
//           });
//         }

//         that.setData({
//           checkedAllStatus: that.isCheckedAll()
//         });
//       });
//     } else {
//       //编辑状态
//       let checkedAllStatus = that.isCheckedAll();
//       let tmpCartData = this.data.cartGoods.map(function (v) {
//         v.checked = !checkedAllStatus;
//         return v;
//       });

//       that.setData({
//         cartGoods: tmpCartData,
//         checkedAllStatus: that.isCheckedAll(),
//         'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
//       });
//     }

//   },
//   editCart: function () {
//     var that = this;
//     if (this.data.isEditCart) {
//       this.getCartList();
//       this.setData({
//         isEditCart: !this.data.isEditCart
//       });
//     } else {
//       //编辑状态
//       let tmpCartList = this.data.cartGoods.map(function (v) {
//         v.checked = false;
//         return v;
//       });
//       this.setData({
//         editCartList: this.data.cartGoods,
//         cartGoods: tmpCartList,
//         isEditCart: !this.data.isEditCart,
//         checkedAllStatus: that.isCheckedAll(),
//         'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
//       });
//     }

//   },
//   toIndexPage: function () {
//     wx.switchTab({
//       url: "/pages/index/index"
//     });
//   },
//   updateCart: function (productId, goodsId, number, id) {
//     let that = this;

//     util.request(api.CartUpdate, {
//       productId: productId,
//       goodsId: goodsId,
//       number: number,
//       id: id
//     }).then(function (res) {
//       if (res.errno === 0) {
//         that.setData({
//           //cartGoods: res.data.cartList,
//           //cartTotal: res.data.cartTotal
//         });
//       }

//       that.setData({
//         checkedAllStatus: that.isCheckedAll()
//       });
//     });

//   },
//   cutNumber: function (event) {

//     let itemIndex = event.target.dataset.itemIndex;
//     let cartItem = this.data.cartGoods[itemIndex];
//     let number = (cartItem.number - 1 > 1) ? cartItem.number - 1 : 1;
//     cartItem.number = number;
//     this.setData({
//       cartGoods: this.data.cartGoods
//     });
//     this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id);
//   },
//   addNumber: function (event) {
//     let itemIndex = event.target.dataset.itemIndex;
//     let cartItem = this.data.cartGoods[itemIndex];
//     let number = cartItem.number + 1;
//     cartItem.number = number;
//     this.setData({
//       cartGoods: this.data.cartGoods
//     });
//     this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id);

//   },
//   checkoutOrder: function () {
//     //获取已选择的商品
//     let that = this;

//     var checkedGoods = this.data.cartGoods.filter(function (element, index, array) {
//       if (element.checked == true) {
//         return true;
//       } else {
//         return false;
//       }
//     });

//     if (checkedGoods.length <= 0) {
//       return false;
//     }


//     wx.navigateTo({
//       url: '../shopping/checkout/checkout'
//     })
//   },
//   deleteCart: function () {
//     //获取已选择的商品
//     let that = this;

//     let productIds = this.data.cartGoods.filter(function (element, index, array) {
//       if (element.checked == true) {
//         return true;
//       } else {
//         return false;
//       }
//     });

//     if (productIds.length <= 0) {
//       return false;
//     }

//     productIds = productIds.map(function (element, index, array) {
//       if (element.checked == true) {
//         return element.product_id;
//       }
//     });


//     util.request(api.CartDelete, {
//       productIds: productIds.join(',')
//     }, 'POST', 'application/json').then(function (res) {
//       if (res.errno === 0) {
//         let cartList = res.data.cartList.map(v => {
//           v.checked = false;
//           return v;
//         });

//         that.setData({
//           cartGoods: cartList,
//           cartTotal: res.data.cartTotal
//         });
//       }

//       that.setData({
//         checkedAllStatus: that.isCheckedAll()
//       });
//     });
//   },
  





















//   /**
//    * 当前商品选中事件
//    */
//   selectList(e) {
//     const index = e.currentTarget.dataset.index;
//     let cartGoods = this.data.cartGoods;
//     const selected = cartGoods[index].selected;
//     cartGoods[index].selected = !selected;
//     this.setData({
//       cartGoods: cartGoods
//     });
//     this.getTotalPrice();
//   },

//   /**
//    * 删除购物车当前商品
//    */
//   deleteList(e) {
//     const index = e.currentTarget.dataset.index;
//     let cartGoods = this.data.cartGoods;
//     cartGoods.splice(index, 1);
//     this.setData({
//       cartGoods: cartGoods
//     });
//     if (!cartGoods.length) {
//       this.setData({
//         hasList: false
//       });
//     } else {
//       this.getTotalPrice();
//     }
//   },

//   /**
//    * 购物车全选事件
//    */
//   selectAll(e) {
//     let selectAllStatus = this.data.selectAllStatus;
//     selectAllStatus = !selectAllStatus;
//     let carts = this.data.cartGoods;

//     for (let i = 0; i < cartGoods.length; i++) {
//       cartGoods[i].selected = selectAllStatus;
//     }
//     this.setData({
//       selectAllStatus: selectAllStatus,
//       cartGoods: cartGoods
//     });
//     this.getTotalPrice();
//   },

//   /**
//    * 绑定加数量事件
//    */
//   addCount(e) {
//     const index = e.currentTarget.dataset.index;
//     let carts = this.data.cartGoods;
//     let num = cartGoods[index].num;
//     num = num + 1;
//     cartGoods[index].num = num;
//     this.setData({
//       cartGoods: cartGoods
//     });
//     this.getTotalPrice();
//   },

//   /**
//    * 绑定减数量事件
//    */
//   minusCount(e) {
//     const index = e.currentTarget.dataset.index;
//     let cartGoods = this.data.cartGoods;
//     let num = cartGoods[index].num;
//     if (num <= 1) {
//       return false;
//     }
//     num = num - 1;
//     cartGoods[index].num = num;
//     this.setData({
//       cartGoods: cartGoods
//     });
//     this.getTotalPrice();
//   },

//   /**
//    * 计算总价
//    */
//   getTotalPrice() {
//     let cartGoods = this.data.cartGoods;                  // 获取购物车列表
//     let total = 0;
//     for (let i = 0; i < cartGoods.length; i++) {         // 循环列表得到每个数据
//       if (cartGoods[i].selected) {                     // 判断选中才会计算价格
//         total += cartGoods[i].num * cartGoods[i].price;   // 所有价格加起来
//       }
//     }
//     this.setData({                                // 最后赋值到data中渲染到页面
//       cartGoods: res.data.cartList,
//       cartTotal: res.data.cartTotal
//     });
//   }
// ,
// }) 

Page({
  data: {
    cartGoods: [],
    cartTotal: {
      "goodsCount": 0,
      "goodsAmount": 0.00,
      "checkedGoodsCount": 0,
      "checkedGoodsAmount": 0.00
    },
    isEditCart: false,
    checkedAllStatus: false,
    editCartList: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数


  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
    this.getCartList();
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  getCartList: function () {
    let that = this;
    util.request(api.CartList).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          cartGoods: res.data.cartList,
          cartTotal: res.data.cartTotal
        });
      }

      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    });
  },
  isCheckedAll: function () {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
  },
  checkedItem: function (event) {
    let itemIndex = event.target.dataset.itemIndex;
    let that = this;

    if (!this.data.isEditCart) {
      util.request(api.CartChecked, { productIds: that.data.cartGoods[itemIndex].product_id, isChecked: that.data.cartGoods[itemIndex].checked ? 0 : 1 }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            cartGoods: res.data.cartList,
            cartTotal: res.data.cartTotal
          });
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    } else {
      //编辑状态
      let tmpCartData = this.data.cartGoods.map(function (element, index, array) {
        if (index == itemIndex) {
          element.checked = !element.checked;
        }

        return element;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }
  },
  getCheckedGoodsCount: function () {
    let checkedGoodsCount = 0;
    this.data.cartGoods.forEach(function (v) {
      if (v.checked === true) {
        checkedGoodsCount += v.number;
      }
    });
    return checkedGoodsCount;
  },
  checkedAll: function () {
    let that = this;

    if (!this.data.isEditCart) {
      var productIds = this.data.cartGoods.map(function (v) {
        return v.product_id;
      });
      util.request(api.CartChecked, { productIds: productIds.join(','), isChecked: that.isCheckedAll() ? 0 : 1 }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            cartGoods: res.data.cartList,
            cartTotal: res.data.cartTotal
          });
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    } else {
      //编辑状态
      let checkedAllStatus = that.isCheckedAll();
      let tmpCartData = this.data.cartGoods.map(function (v) {
        v.checked = !checkedAllStatus;
        return v;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }

  },
  editCart: function () {
    var that = this;
    if (this.data.isEditCart) {
      this.getCartList();
      this.setData({
        isEditCart: !this.data.isEditCart
      });
    } else {
      //编辑状态
      let tmpCartList = this.data.cartGoods.map(function (v) {
        v.checked = false;
        return v;
      });
      this.setData({
        editCartList: this.data.cartGoods,
        cartGoods: tmpCartList,
        isEditCart: !this.data.isEditCart,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }

  },
  toIndexPage: function () {
    wx.switchTab({
      url: "/pages/index/index"
    });
  },
  updateCart: function (productId, goodsId, number, id) {
    let that = this;

    util.request(api.CartUpdate, {
      productId: productId,
      goodsId: goodsId,
      number: number,
      id: id
    }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          //cartGoods: res.data.cartList,
          //cartTotal: res.data.cartTotal
        });
      }

      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    });

  },
  cutNumber: function (event) {

    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = (cartItem.number - 1 > 1) ? cartItem.number - 1 : 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id);
  },
  addNumber: function (event) {
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = cartItem.number + 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id);

  },
  checkoutOrder: function () {
    //获取已选择的商品
    let that = this;

    var checkedGoods = this.data.cartGoods.filter(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });

    if (checkedGoods.length <= 0) {
      return false;
    }


    wx.navigateTo({
      url: '../shopping/checkout/checkout'
    })
  },
  deleteCart: function () {
    //获取已选择的商品
    let that = this;

    let productIds = this.data.cartGoods.filter(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });

    if (productIds.length <= 0) {
      return false;
    }

    productIds = productIds.map(function (element, index, array) {
      if (element.checked == true) {
        return element.product_id;
      }
    });


    util.request(api.CartDelete, {
      productIds: productIds.join(',')
    }, 'POST', 'application/json').then(function (res) {
      if (res.errno === 0) {
        let cartList = res.data.cartList.map(v => {
          v.checked = false;
          return v;
        });

        that.setData({
          cartGoods: cartList,
          cartTotal: res.data.cartTotal
        });
      }

      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    });
  }
})

