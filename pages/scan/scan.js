// pages/scan/scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  scan:function(e){
    console.log(e)
      wx.scanCode({
        success: (res) => {
          var send = {
            code: 2,
            barcode: res.result
          };
          let url = 'https://eshop.llwell.net/llback/Scan/SCANGOODSURL'
          wx.request({
            url: url,
            data: send,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/json' // 默认值
            }, // 设置请求的 header
            success: function (res) {
              if (res.data.indexOf("id") != -1){
                wx.hideLoading();
                const resArr = res.data.split('&')
                wx.navigateTo({
                  url: '/pages/goods/detail/index?' + resArr[resArr.length - 1],
                })
              }else{
                wx.showToast({
                  title: '商品条码有误，请确认并重新扫描条形码',
                  icon: 'none',
                  duration: 2500,
                })
              }
            },
            fail: function (res) {
              wx.hideLoading();
            },
            complete: function () {
              // 
            }
          })
        },
        fail: (res) => {
          wx.showToast({
            title: '失败',
            icon: 'loading',
            duration: 2000
          })
        },
        complete: (res) => {
        }
      })
    
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