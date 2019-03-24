// pages/taskList/taskDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subitemId: '',
    detailList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token') || '';
    const _this = this;
    this.setData({
      subitemId: options.id
    });
    let obj = {
      SubjectId: options.id,
      TOKEN: token
    }
    wx.request({
      url: 'http://ksapi.keys-edu.com///api/subject/getsubjectlistbysid',
      method: 'POST',
      data: obj,
      success: function(res){
        // console.log(res.data);
        const maindata = JSON.parse(JSON.parse(res.data).Data);
        console.log(maindata);
        let new_arr = [];
        if (maindata == null) {
          return;
        }
        for (var i = 0; i < maindata.length; i++) {
          let goods = {
            SubjectId: '',
            Title: '',
          };
          goods.SubjectId = maindata[i].SubjectId;
          let title = maindata[i].Title;
          title = title.replace('{0}', '(__)')
          if (title.indexOf('{1}')) {
            title = title.replace('{1}', '(__)');
          }
          if (title.indexOf('{2}')) {
            title = title.replace('{2}', '(__)');
          }
          if (title.indexOf('{3}')) {
            title = title.replace('{3}', '(__)');
          }
          if (title.indexOf('{4}')) {
            title = title.replace('{4}', '(__)');
          }
          console.log(title.indexOf('|'));
          if (title.indexOf('|') > 0) {

            title = title.replace('|', '');
          }
          if (title.indexOf('|') > 0) {

            title = title.replace('|', '');
          }
          goods.Title = title;
          new_arr.push(goods);
        }
        console.log(new_arr);
        _this.setData({
          detailList: new_arr
        });
      }
    })
    // console.log(new_arr);
  },
  upper: function(){
    console.log(111);
  },
  lower: function(){
    console.log(22222);
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
  onUnload: function (options) {
    
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

  }
})