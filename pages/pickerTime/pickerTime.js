// pages/pickerTime/pickerTime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkTime:"未选择",
    multiIndex: 0,
    multiArray: [[2019, 2020, 2021, 2022, 2023], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let arr = [];
    // let yearArr = [2019,2020,2021,2022,2023];
    // let monthArr = [1,2,3,4,5,6,7,8,9,10,11,12];
    // var dayArr = [];
    // arr.push(yearArr);
    // arr.push(monthArr);
    // for(let i = 0;i < yearArr.length; i++){
    //   for(let j=0;j<monthArr.length;j++){
    //     let days = new date(yearArr[i],monthArr[j],0);
    //     console.log(days.getDate());
    //   }
    // }
    // console.log(arr);
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindTimeChange: function(e){
    let arr = [];
    let yearArr = [2019, 2020, 2021, 2022, 2023];
    let monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var dayArr = [];
    arr.push(yearArr);
    arr.push(monthArr);
    this.setData({
      multiIndex: e.detail.value
    });
  }
})