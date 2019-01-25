Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/xcxEmsahlolp/agreementOfDistribution.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  preview: function (e) {
    // console.log('e', e.currentTarget.dataset.src)
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
    })
  },

})