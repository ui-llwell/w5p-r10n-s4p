// pages/myQrCode/myQrcode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/qrcode@3x.png',
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
            url: json.data
          })
        } else {
          that.Toast(json.errorMessage, 'none', 2500)
          // that.Toast('','none',2000,json.msg.code)
          console.log('here something wrong');
        }
      }
    )
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