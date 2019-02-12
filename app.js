var e = require("utils/core.js");

App({
    onShow: function() {
        this.onLaunch();
    },
    onLaunch: function(option) {
      var isDebug = false;//true调试状态使用本地服务器，非调试状态使用远程服务器
      if (!isDebug) {
        //远程域名
        wx.setStorageSync('domainName', "https://eshop.llwell.net/llback/Api/")
      }
      else {
        //本地测试域名
        // wx.setStorageSync('domainName', "http://192.168.0.11:53695/api/analysis/Wx/")
      }

      //  console.log('option.query', option.query)
      if(option.query!=undefined){
        this.needData.agent = option.query.agent
        this.needData.bbcode = option.query.bbcode
        this.needData.disCode = option.query.disCode
        this.needData.onceDisCode = option.query.disCode
      }
     

        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                "0" == t.model.indexOf("iPhone X") ? e.setCache("isIpx", t.model) : e.setCache("isIpx", "");
            }
        });
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                wx.setStorageSync("systemInfo", e);
                var n = e.windowWidth, o = e.windowHeight;
                t.globalData.ww = n, t.globalData.hh = o;
            }
        }), this.getConfig();
        this.getUserInfo(function(e) {
          t.getttRole();
          
          // console.log('option.query', option.query)
          const bb = t.needData.bbcode
          if (bb != undefined) {
            t.bbcode(e.openid)

          }
          // console.log('!!!!sss!!!!!!!!!!!!!!', e.openid)
        }, function(e, t) {
            var t = t ? 1 : 0, e = e || "";
            t && wx.redirectTo({
                url: "/pages/message/auth/index?close=" + t + "&text=" + e
            });
        });
    },
    requirejs: function(e) {
        return require("utils/" + e + ".js");
    },
    getConfig: function() {
        if (null !== this.globalData.api) return {
            api: this.globalData.api,
            approot: this.globalData.approot,
            appid: this.globalData.appid
        };
        var e = wx.getExtConfigSync();
        return console.log(e), this.globalData.api = e.config.api, this.globalData.approot = e.config.approot, 
        this.globalData.appid = e.config.appid, e.config;
    },
    getCache: function(e, t) {
        var n = +new Date() / 1e3, o = "";
        n = parseInt(n);
        try {
            (o = wx.getStorageSync(e + this.globalData.appid)).expire > n || 0 == o.expire ? o = o.value : (o = "", 
            this.removeCache(e));
        } catch (e) {
            o = void 0 === t ? "" : t;
        }
        return o = o || "";
    },
    setCache: function(e, t, n) {
        var o = +new Date() / 1e3, i = !0, a = {
            expire: n ? o + parseInt(n) : 0,
            value: t
        };
        try {
            wx.setStorageSync(e + this.globalData.appid, a);
        } catch (e) {
            i = !1;
        }
        return i;
    },
    removeCache: function(e) {
        var t = !0;
        try {
            wx.removeStorageSync(e + this.globalData.appid);
        } catch (e) {
            t = !1;
        }
        return t;
    },
    // 扫二维码 绑定公众号
    scan:function(a){
      const params = {
        openId:a,
        pagentCode:this.needData.agent,
        appId: this.globalData.appid
      }
      // console.log('params', params)
      let url = 'https://eshop.llwell.net/llback/Api/BindingWXAPP'
      wx.request({
        url: url,
        data: params,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json' // 默认值
        }, // 设置请求的 header
        success: function (res) {
            wx.hideLoading();
        },
        fail: function (res) {
          wx.hideLoading();
        },
        complete: function () {
          // 
        }
      })
    },
    // 扫二维码 与B2B后台绑定
  bbcode: function (a) {

    const params = {
      openId: a,
      pagentCode: this.needData.bbcode,
      appId: this.globalData.appid
    }
    const that = this;
    this.Ajax(
      'BindingWXB2B',
      'POST',
      { ...params},
      function (json) {
        // console.log('~~~',json);
        if (json.type==1) {
          if (json.msg =='已存在绑定数据'){
            // 
          }else{
            that.Toast(json.msg, 'success', 1500)
          }
          that.getttRole();

        } else {
          that.Toast(json.msg, 'none', 2500)
          // that.Toast('','none',2000,json.msg.code)
          // console.log('here something wrong');
        }
      }
    )




    
    // console.log('params', params)
    // let url = 'https://eshop.llwell.net/llback/Api/BindingWXB2B'
    // let url = 'https://eshop.llwell.net/llback/Api/BindingWXAPP'
    // wx.request({
    //   url: url,
    //   data: params,
    //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   }, // 设置请求的 header
    //   success: function (res) {
    //     wx.hideLoading();
    //   },
    //   fail: function (res) {
    //     wx.hideLoading();
    //   },
    //   complete: function () {
    //     // 
    //   }
    // })
  },
  getttRole: function () {
    const params = {
      openId: wx.getStorageSync('oi')
    }
    const that = this;
    this.Ajax(
      'GetTypeByOpenId',
      'POST',
      { ...params },
      function (json) {
        // console.log('~~~', json);
        if (json.type == 1) {
          that.needData.role = json.msg
          // wx.setStorageSync('role', json.msg )
        } else {
          that.Toast(json.msg, 'none', 2500)
          // that.Toast('','none',2000,json.msg.code)
          // console.log('here something wrong');
        }
      }
    )
  },
  Ajax: function (url, type, data, callback) {
    wx.showLoading({
      title: 'loading',
      duration: 1000,
    });

    // var send = {
    //   // token: wx.getStorageSync('token'),
    //   // method: method,
    //   param: data,
    // };
    wx.request({
      url: wx.getStorageSync('domainName') + url,
      data: data,
      method: type, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json' // 默认值
      }, // 设置请求的 header
      success: function (res) {
        wx.hideLoading();
        // 发送请求成功执行的函数
        if (typeof callback === 'function') {
          callback(res.data);
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showModal({
          title: '网络异常提示',
          content: '请检查网络，并重新登录小程序',
          showCancel: false,
        })
        //console.log('fa',res)
      },
      complete: function () {
        // wx.hideLoading();
      }
    })
  },
  Toast: function (title, icon, duration, code) {
    let content = title;
    switch (code) {
      case 10002:
        content = '会员注册异常'
        break;
      case 10003:
        content = '用户已绑定'
        break;
      default:
        console.log(code);
    }
    wx.showToast({
      title: content,
      icon: icon,
      duration: duration
    });
  },
    getUserInfo: function(t, n) {
      const that = this;
        var o = this, i = {};
        !(i = o.getCache("userinfo")) || i.needauth ? wx.login({
            success: function(a) {
                a.code ? e.post("wxapp/login", {
                    code: a.code
                }, function(a) {
                  // console.log('ad', that.needData.agent)
                  const ag = that.needData.agent
                  if (ag!= undefined){
                    that.scan(a.openid)
                  }
                  // if (o.getCache("usermid")){
                  //   console.log('chuan', o.getCache("userinfo"))
                  // }
                  const bb = that.needData.bbcode
                  if (bb != undefined) {
                    that.bbcode(a.openid)

                  }
                  wx.setStorageSync('oi', a.openid)
                  that.getttRole()
                  // console.log('!!!!!!!!!!!!!!!!!!!!!')
                    a.error ? e.alert("获取用户登录态失败:" + a.message) : a.isclose && n && "function" == typeof n ? n(a.closetext, !0) : wx.getUserInfo({
                      
                        success: function(n) {
                            i = n.userInfo, e.get("wxapp/auth", {
                                data: n.encryptedData,
                                iv: n.iv,
                                sessionKey: a.session_key
                            }, function(e) {
                                1 == e.isblack && wx.showModal({
                                    title: "无法访问",
                                    content: "您在商城的黑名单中，无权访问！",
                                    success: function(e) {
                                        e.confirm && o.close(), e.cancel && o.close();
                                    }
                                }), n.userInfo.openid = e.openId, n.userInfo.id = e.id, n.userInfo.uniacid = e.uniacid, 
                                n.needauth = 0, o.setCache("userinfo", n.userInfo, 7200), o.setCache("userinfo_openid", n.userInfo.openid), 
                                o.setCache("userinfo_id", e.id), o.getSet(), t && "function" == typeof t && t(i);
                            });
                        },
                        fail: function() {
                          wx.redirectTo({
                            url: "/pages/message/auth/index"
                          });

                            // console.log(a), e.get("wxapp/check", {
                            //     openid: a.openid
                            // }, function(e) {
                            //     console.log(e), 1 == e.isblack && wx.showModal({
                            //         title: "无法访问",
                            //         content: "您在商城的黑名单中，无权访问！",
                            //         success: function(e) {
                            //             e.confirm && o.close(), e.cancel && o.close();
                            //         }
                            //     }), e.needauth = 1, o.setCache("userinfo", e, 7200), o.setCache("userinfo_openid", a.openid), 
                            //     o.setCache("userinfo_id", a.id), o.getSet(), t && "function" == typeof t && t(i);
                            // });
                        }
                    });
                }) : e.alert("获取用户登录态失败:" + a.errMsg);
            },
            fail: function() {
                e.alert("获取用户信息失败!");
            }
        }) : t && "function" == typeof t && t(i);
    },
    close: function() {
        this.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    getSet: function() {
        var t = this;
        "" == t.getCache("cacheset") && setTimeout(function() {
            var n = t.getCache("cacheset");
            e.get("cacheset", {
                version: n.version
            }, function(e) {
                e.update && t.setCache("cacheset", e.data);
            });
        }, 10);
    },
    url: function(e) {
        e = e || {};
        var t = {}, n = "", o = "", i = this.getCache("usermid");
        n = e.mid || "", o = e.merchid || "", "" != i ? ("" != i.mid && void 0 !== i.mid || (t.mid = n), 
        "" != i.merchid && void 0 !== i.merchid || (t.merchid = o)) : (t.mid = n, t.merchid = o), 
        this.setCache("usermid", t, 7200);
    },
    impower: function(e, t, n) {
        wx.getSetting({
            success: function(o) {
                console.log(o), o.authSetting["scope." + e] || wx.showModal({
                    title: "用户未授权",
                    content: "您点击了拒绝授权，暂时无法" + t + "，点击去设置可重新获取授权喔~",
                    confirmText: "去设置",
                    success: function(e) {
                        e.confirm ? wx.openSetting({
                            success: function(e) {}
                        }) : "route" == n ? wx.switchTab({
                            url: "/pages/index/index"
                        }) : "details" == n || wx.navigateTo({
                            url: "/pages/index/index"
                        });
                    }
                });
            }
        });
    },
    globalDataClose: {
        flag: !1
    },
    needData:{
      agent:'',
      bbcode:'',
      disCode:'',
      onceDisCode:'',
      role:null
    },
    globalData: {
      appid: "wx212d522fca71351b",
      api: "https://eshop.llwell.net/app/ewei_shopv2_api.php?i=2",
      approot: "https://eshop.llwell.net/addons/ewei_shopv2/",
        userInfo: null
    }
});