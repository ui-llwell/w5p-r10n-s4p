// pages/modifyPassport/modifyPassport.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankOperator:'', //开户人
    bank:'',  //银行
    bankName:'',  //开户支行
    bankCardCode:'',  //卡号
    bankTel:'',    //开户人电话,
    isAgree: false,
    disabled: true, 
  },
  userNameInput: function (e) {
    this.setData({
      bankOperator: e.detail.value
    })
  },
  bankInput: function (e) {
    this.setData({
      bank: e.detail.value
    })
  },
  bankBranchInput: function (e) {
    this.setData({
      bankName: e.detail.value
    })
  },
  numberInput: function (e) {
    this.setData({
      bankCardCode: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      bankTel: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const params = {
      ...e.detail.value,
      openId: wx.getStorageSync('oi')
    }
    const that = this;
    app.Ajax(
      'AddBankCode',
      'POST',
      { ...params },
      function (json) {
        // console.log('~~~',json);
        if (json.type == 1) {
          app.Toast('绑定成功', 'success', 2000)
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else {
          app.Toast(json.msg, 'none', 2500)
          // that.Toast('','none',2000,json.msg.code)
          console.log('here something wrong');
        }
      }
    )
  },
  

  onLoad: function (options) {
    this.getBankCard();
  },

  onShow: function () {
    
  },
  getBankCard:function(){
    const that = this;
    const params = {
      openId: wx.getStorageSync('oi')
    }
    app.Ajax(
      'GetBankCode',
      'POST',
      { ...params },
      function (json) {
        // console.log('~~~', json);
        if (json.type == 1) {
          that.setData({
            bankOperator: json.bankParam.bankOperator,
            bank: json.bankParam.bank,
            bankName: json.bankParam.bankName,
            bankTel: json.bankParam.bankTel,
            bankCardCode: json.bankParam.bankCardCode,
          })
          if (json.bankParam.bankOperator!=''){
            that.setData({
              isAgree: true
            })
          }else{
            that.setData({
              isAgree: false
            })
          }
          
        } else {
          app.Toast('系统错误', 'none', 2500)
          // that.Toast('','none',2000,json.msg.code)
          console.log('here something wrong');
        }
      }
    )
    
  },

})