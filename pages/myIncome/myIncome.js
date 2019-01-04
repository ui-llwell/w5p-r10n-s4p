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
    getData:{
      accountMoney:0.01,
      monthProfit:1.00,
      lastMonthProfit:2.00,
      monthGoodsProfitList:[
        {
          month: 12,
          monthTotal: 0.1,
          goodsProfitList: [
            {
              goodsName: 'woshi mingzi ',
              profit: 0.01,
              tradeTime: '2015',
              accountTime: '2015',
              tradeAmount: '10.00',
            },
            {
              goodsName: 'woshi mingzi ',
              profit: 0,
              tradeTime: '2015',
              accountTime: '2015',
              tradeAmount: '10',
            }
          ]
        },
        {
          month: 11,
          monthTotal: 0,
          goodsProfitList: [
            {
              goodsName: 'woshi mingzi ',
              profit: 0,
              tradeTime: '2015',
              accountTime: '2015',
              tradeAmount: '10',
            },
            {
              goodsName: 'woshi mingzi ',
              profit: 0,
              tradeTime: '2015',
              accountTime: '2015',
              tradeAmount: '10',
            }
          ]
        },
      ],
      accountInfoList:[
        {
          merchantOrderId:'djhhasgdjhagsd001',
          accountTime:'2016',
          profit:'12.00'
        }, {
          merchantOrderId: 'djhhasgdjhagsd001',
          accountTime: '2016',
          profit: '12.00'
        }
      ]
    }
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

  }
})