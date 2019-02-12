// pages/invitationCard/invitationCard.js
const app = getApp();
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
    const that = this;
    // console.log('扫码进来',options)
    if (app.needData.onceDisCode==''){
      // console.log('可以调接口')
      // console.log(getApp().needData)
      this.disCode()
    }else{
      // console.log('111111')
      wx.getSetting({
        success(res) {
          // console.log('res',res)
          if (res.authSetting['scope.userInfo']) {
            // console.log('44444')
            that.disCode();
          }
        }
      })
    }
  },
  disCode: function () {
    const params = {
      openId: wx.getStorageSync('oi'),
      pagentCode: app.needData.disCode,
      appId: app.globalData.appid
    }
    const that = this;
    app.Ajax(
      'BindingInvite',
      'POST',
      { ...params },
      function (json) {
        // console.log('~~~',json);
        if (json.type == 1) {
          if (json.msg == '已存在绑定数据') {
            // 
          } else {
            that.Toast(json.msg, 'success', 1500)
          }
         

        } else {
          that.Toast(json.msg, 'none', 2500)
          // that.Toast('','none',2000,json.msg.code)
          // console.log('here something wrong');
        }
      }
    )
  }
})
