Page({
  data:{
    monthPay:'0.00',
    interest:'0.00',
    total:'0.00',
    type:'商业贷款',
    year:'5',
    rate:'4.75',
    inputValue:'请输入金额'
  },
  loanType:function(){
    var self=this;
    wx.showActionSheet({
      itemList: ['商业贷款', '公积金贷款', '组合贷款'],
      success: function(res) {
        if (!res.cancel) {
          if(res.tapIndex===0){
            self.setData({
              type:'商业贷款',
              rate:'4.75'
            })
          }else if(res.tapIndex===1){
            self.setData({
              type:'公积金贷款',
              rate:'2.75'
            })
          }else if(res.tapIndex===2){
            self.setData({
              type:'组合贷款'
            })
          }
        }
        self.cal()
      }
    })
  },
  term:function(){
    var self=this;
    wx.showActionSheet({
      itemList: ['5', '10', '15','20', '25', '30'],
      success: function(res) {
        if (!res.cancel) {
          if(res.tapIndex===0){
            self.setData({
              year:'5'
            })
          }else if(res.tapIndex===1){
            self.setData({
              year:'10'
            })
          }else if(res.tapIndex===2){
            self.setData({
              year:'15'
            })
          }else if(res.tapIndex===3){
            self.setData({
              year:'20'
            })
          }else if(res.tapIndex===4){
            self.setData({
              year:'25'
            })
          }else if(res.tapIndex===5){
            self.setData({
              year:'30'
            })
          }
        }
        self.cal()
      }
    })
  },
  interestRate:function(){
    var self=this;
    if(self.data.type==='商业贷款'){
      wx.showActionSheet({
        itemList: ['基准利率', '7折利率', '8折利率','8.3折利率', '8.5折利率', '9折利率'],
        success: function(res) {
          if (!res.cancel) {
            if(res.tapIndex===0){
              self.setData({
                rate:'4.75'
              })
            }else if(res.tapIndex===1){
              self.setData({
                rate:'3.32'
              })
            }else if(res.tapIndex===2){
              self.setData({
                rate:'3.8'
              })
            }else if(res.tapIndex===3){
              self.setData({
                rate:'3.94'
              })
            }else if(res.tapIndex===4){
              self.setData({
                rate:'4.04'
              })
            }else if(res.tapIndex===5){
              self.setData({
                rate:'4.23'
              })
            }
          }
          self.cal()
        }
      })
    }else if(self.data.type==='公积金贷款'){
      wx.showActionSheet({
        itemList: ['基准利率', '1.1倍利率'],
        success: function(res) {
          if (!res.cancel) {
            if(res.tapIndex===0){
              self.setData({
                rate:'2.75'
              })
            }else if(res.tapIndex===1){
              self.setData({
                rate:'3.03'
              })
            }
          }
          self.cal()
        }
      })
    }
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
    this.cal()
  },
  cal:function(){
    var self=this;
    var a=self.data.inputValue*10000
    var mr=self.data.rate/12/100;
    var mn=self.data.year*12;
    var m=parseFloat([a*mr*Math.pow((1+mr),mn)]/[Math.pow((1+mr),mn)-1]).toFixed(2);
    var t=parseFloat([a*mr*Math.pow((1+mr),mn)]/[Math.pow((1+mr),mn)-1]*mn).toFixed(2);
    var i=parseFloat(t-a).toFixed(2);
    self.setData({
      monthPay:m,
      interest:i,
      total:t
    })
  },
  action:function(){
    wx.redirectTo({
      url:"/pages/show/show"
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
