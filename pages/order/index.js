var t = getApp(), a = t.requirejs("core"), e = t.requirejs("biz/order");

Page({
    data: {
        icons: t.requirejs("icons"),
        status: "",
        list: [],
        page: 1,
        code: !1,
        cancel: e.cancelArray,
        cancelindex: 0,
        tttimestamp:''
    },
    onLoad: function(a) {
        this.setData({
            options: a,
            status: a.status || "",
        }), t.url(a), this.get_list();
    },
    get_list: function() {
        var t = this;
        t.setData({
            loading: !0
        }), a.get("order/get_list", {
            page: t.data.page,
            status: t.data.status,
            merchid: 0
        }, function(e) {
          wx.request({
            url: 'http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp',
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
              // console.log('res',res)
              wx.setStorageSync('Tmm', res.data.data.t)
            },
            fail: function(res) {},
            complete: function(res) {},
          })
          e.list.map((i)=>{
            let tttime = i.ordersn.substr(2, 14)
            // console.log('~~~', tttime)
            // console.log('~~~年', tttime.substr(0, 4))
            // console.log('~~~月', tttime.substr(4, 2))
            // console.log('~~~日', tttime.substr(6, 2))
            // console.log('~~~时', tttime.substr(8, 2))
            // console.log('~~~分', tttime.substr(10, 2))
            // console.log('~~~秒', tttime.substr(12, 2))
            let iTime = new Date(
              tttime.substr(0, 4),
              tttime.substr(4, 2) - 1,
              tttime.substr(6, 2),
              tttime.substr(8, 2),
              tttime.substr(10, 2),
              tttime.substr(12, 2))
            // console.log('qwqwqwqwqwqw', tttime.substr(4, 2) - 1)
            // console.log('今天', wx.getStorageSync('Tmm') * 1)
            // console.log('付款时间', iTime.getTime())
            i.timeDifference = ( wx.getStorageSync('Tmm') * 1 - iTime.getTime() )/(1000 *60*60*24)
            // console.log(i.timeDifference)
            if (i.cancancelrefund == false && i.timeDifference < 7 && i.status == 3 || i.status == 1){
              i.trefound = true
              return
            }
            return
          })
          console.log('esssslist',e.list)
            0 == e.error ? (t.setData({
                loading: !1,
                show: !0,
                total: e.total,
                empty: !0
            }), e.list.length > 0 && t.setData({
                page: t.data.page + 1,
                list: t.data.list.concat(e.list)
            }), e.list.length < e.pagesize && t.setData({
                loaded: !0
            })) : a.toast(e.message, "loading");
        }, this.data.show);
    },
    selected: function(t) {
        var e = a.data(t).type;
        this.setData({
            list: [],
            page: 1,
            status: e,
            empty: !1
        }), this.get_list();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.get_list();
    },
    code: function(t) {
        var e = this, s = a.data(t).orderid;
        a.post("verify/qrcode", {
            id: s
        }, function(t) {
            0 == t.error ? e.setData({
                code: !0,
                qrcode: t.url
            }) : a.alert(t.message);
        }, !0);
    },
    close: function() {
        this.setData({
            code: !1
        });
    },
    cancel: function(t) {
        var s = a.data(t).orderid;
        e.cancel(s, t.detail.value, "/pages/order/index?status=" + this.data.status);
    },
    delete: function(t) {
        var s = a.data(t).type, i = a.data(t).orderid;
        e.delete(i, s, "/pages/order/index", this);
    },
    finish: function(t) {
        a.data(t).type;
        var s = a.data(t).orderid;
        e.finish(s, "/pages/order/index");
    },
    onShareAppMessage: function() {
        return a.onShareAppMessage();
    }
});