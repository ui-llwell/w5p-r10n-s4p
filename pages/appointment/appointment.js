// pages/appointment/appointment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'中山路129-3号柏威年购物广场3层东区L3060层（东区L3060）',
    phone:'400-000-000',
    list:[
      {
        img:'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/Hairdressing/headPhoto1.png',
        teacher:'Suny老师',
        title:'店长'
      }, {
        img: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/Hairdressing/headPhoto2.png',
        teacher: 'David老师',
        title: '艺术总监'
      }, {
        img: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/Hairdressing/headPhoto3.png',
        teacher: 'Bill老师',
        title: '资深总监'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  madeCall:function(){
    wx.makePhoneCall({
      phoneNumber: '400-000-000' // 仅为示例，并非真实的电话号码
    })
  },
  goAddress:function(){
    wx.getLocation({//获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
      success: function (res) {
        console.log('ssss',res)
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 38.91864,//要去的纬度-地址
          longitude: 121.64511,//要去的经度-地址
          name: "中山广场店",
          address: '中山广场A地铁口'
        })
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

 
})