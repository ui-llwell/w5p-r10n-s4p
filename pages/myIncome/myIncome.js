// pages/myIncome/myIncome.js
const app = getApp();
var sliderWidth = 80; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["收益明细", "结算记录"],
    noRecord:'暂时还没有收益，快去赚钱吧',
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    getData:{}
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

  // console.log('这是我的收益页面')
    this.getData()
  },
  onShow:function(){
     
  },
  getData:function(){
    const params = {
      openId: wx.getStorageSync('oi')
    }
    const that = this;
    app.Ajax(
      'GetProfitByOpenId',
      'POST',
      { ...params },
      function (json) {
        // console.log('~~~',json);
        if (json.success) {
         that.setData({
           getData: json.data
         })
        } else {
          that.Toast(json.errorMessage, 'none', 2500)
          // that.Toast('','none',2000,json.msg.code)
          console.log('here something wrong');
        }
      }
    )
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  
})