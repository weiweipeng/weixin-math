// pages/classList/classList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classArray: [{
      id: '0003',
      name: '003',
      value: 0,
      checked: false
    },{
      id: '0004',
      name: '004',
      value: 1,
      checked: false
    },{
      id: '0005',
      name: '005',
      value: 2,
      checked: false
    }],
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
    const list = (wx.getStorageSync('classList') || []);
    let classArrays = this.data.classArray;
    
    if(list.length > 0){
      for (let i = 0; i < classArrays.length; i++){
        for(let j = 0; j < list.length; j++){
          if (classArrays[i].name === list[j]){
            classArrays[i].checked = true;
          }
        }
      }
      console.log(classArrays);
      this.setData({
        classArray: classArrays
      });
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  checkboxChange: function(e){
    console.log(e.detail.value);
    let classArray = e.detail.value;
    if (classArray.length > 0){
      wx.setStorageSync('classCheckBool', true);
    }
    var app = getApp();
    // app.globalData.classList = e.detail.value;
    // console.log(app.globalData.classList);
    wx.setStorageSync('classList', e.detail.value)
    // var classLists = (wx.getStorageSync('classList' || []));
    // console.log(classLists);
  }
})