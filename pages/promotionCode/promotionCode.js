
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData: function () {
    const params = {
      appId: app.globalData.appid,
      openId: wx.getStorageSync('oi')
    }
    const that = this;
    app.Ajax(
      'GetAgetnQrcode',
      'POST',
      { ...params },
      function (json) {
        // console.log('~~~',json);
        if (json.type == 1) {
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
  preview: function (e) {
    // console.log('e', e.currentTarget.dataset.src)
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
    })
  },
  savepreview: function (e) {
    // console.log('e',e)
    wx.downloadFile({
      url: e.currentTarget.dataset.src,
      success: function (res) {
        let path = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(res) {
            app.Toast('保存成功', 'success', 2000)
            // console.log(res)
          },
          fail(res) {
            app.Toast('保存失败，请重新保存', 'none', 2000)
            // console.log(res)
          },
          complete(res) {
            // console.log(res)
          }
        })
      }, fail: function (res) {
        app.Toast('保存失败，请重新保存', 'none', 2000)
      }
    })
  }

})