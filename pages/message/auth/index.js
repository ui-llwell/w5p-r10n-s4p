var t = getApp();

Page({
    data: {
        close: 0,
        text: ""
    },
    onLoad: function(t) {
        console.log(t), this.setData({
            close: t.close,
            text: t.text
        });
    },
    onShow: function() {
        var e = t.getCache("sysset").shopname;
        wx.setNavigationBarTitle({
            title: e || "提示"
        });
    },
    bind: function() {
      const that = this;
      wx.getSetting({
        success: function (n) {
          var a = n.authSetting["scope.userInfo"];
          if (a) {
            getApp().getUserInfo(function (e) {
              wx.reLaunch({
                url: "/pages/index/index"
              }), that.setData({
                userInfo: a
              })
            }, function (e, t) {
              // console.log(1312312312312312, e, t);
             
            });
            // a && (wx.reLaunch({
            // url: "/pages/index/index"
            // }), clearInterval(e), t.setData({
            // userInfo: a
            // }));
          }
        }
      });
        // var t = this, e = setInterval(function() {
        //     wx.getSetting({
        //         success: function(n) {
        //             var a = n.authSetting["scope.userInfo"];
        //             a && (wx.reLaunch({
        //                 url: "/pages/index/index"
        //             }), clearInterval(e), t.setData({
        //                 userInfo: a
        //             }));
        //         }
        //     });
        // }, 1e3);
    }
});