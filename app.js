//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.onAppRoute(function (res) {
      console.log({ res })
    })
    // this.getDate();
  },
  globalData: {
    userInfo: null,
    classList: [],//获取的班级列表
    token:''
  },
  // getDate:function(){
  //   let arr = [];
  //   let yearArr = [2019, 2020, 2021, 2022, 2023];
  //   let monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  //   var dayArr = [];
  //   arr.push(yearArr);
  //   arr.push(monthArr);
  //   for (let i = 0; i < yearArr.length; i++) {
  //     for (let j = 0; j < monthArr.length; j++) {
  //       let days = new Date(yearArr[i], monthArr[j], 0);
  //       len 
  //       // console.log(days.getDate());
  //       dayArr.push(days.getDate());
  //     }
  //   }
  //   arr.push(dayArr);
  //   console.log(arr);
  // }
})