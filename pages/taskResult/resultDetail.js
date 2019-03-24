// pages/taskResult/resultDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentList: [],
    textList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.initstudent(options);
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
  initstudent: function(options){
    let list = wx.getStorageSync('studentList');
    const _this = this;
    // this.data.studentList = list;
    list = JSON.stringify(list);
    let token = wx.getStorageSync('token');
    let param = {
      ClassesId: options.classId,
      PageSize: 17,
      PageIndex: 1,
      SchoolId: 'sw0001',
      TeacherTaskId: options.teachertaskid,
      StudentList: list,
      TeacherId: 'T004',
      TOKEN: token
    }



    wx.request({

      url: 'http://ksapi.keys-edu.com///api/common/getstatistics',
      method: 'POST',
      data: param,
      success: function(res){
        console.log(JSON.parse(JSON.parse(res.data).Data));
        let maindata = JSON.parse(JSON.parse(res.data).Data);
        for (var i = 0; i < maindata.length; i++) {

          maindata[i].StudentTime = _this.s_to_hs(maindata[i].StudentTime);
          maindata[i].scoreRate = parseInt((maindata[i].StudentScore / maindata[i].TotalScore) * 100) + '%';
        }

        var new_arr = [];
        if (maindata == null) {
          return;
        }
        // _this.data.textList = maindata;
        _this.setData({
          textList: maindata
        });
        console.log(_this.data.textList);
      }
    })
  },
  s_to_hs: function(s){
    let h;
    h = Math.floor(s / 60);
    //计算秒
    //算法：取得秒%60的余数，既得到秒数
    s = s % 60;
    //将变量转换为字符串
    h += '';
    s += '';
    //如果只有一位数，前面增加一个0
    h = (h.length == 1) ? '0' + h : h;
    s = (s.length == 1) ? '0' + s : s;
    return h + ':' + s;
  }
})