// pages/myQrCode/myQrcode.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  getData:function(){
    const params = {
      appId: app.globalData.appid,
      openId: wx.getStorageSync('oi')
    }
    const that = this;
    app.Ajax(
      'GetQrcode',
      'POST',
      { ...params },
      function (json) {
        // console.log('~~~',json);
        if (json.type==1) {
          that.setData({
            url: json.msg
          })
        } else {
          app.Toast(json.msg, 'none', 2500)
          // that.Toast('','none',2000,json.msg.code)
          console.log('here something wrong');
        }
      }
    )
  },
  preview:function(e){
    // console.log('e', e.currentTarget.dataset.src)
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
    })
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