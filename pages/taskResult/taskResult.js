// pages/taskList/taskList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList: [{
      id: '0003',
      name: '003',
    }, {
      id: '0004',
      name: '004',
    }, {
      id: '0005',
      name: '005',
    }],
    tasksubmit: {
      TeacherId: 'T004',
      SchoolId: 'sw0001',
      PageSize: 10,
      PageIndex: 1,
    },
    taskquestion: [],
    allcount: 0,
    len: 0,
    list: [],
    classId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let classList = (wx.getStorageSync('classList') || []);
    // this.setData({
    //   classList: classList
    // });
    // console.log(this.data.classList);
    let token = wx.getStorageSync('token');
    this.data.tasksubmit.Token = token;
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
  selectClass: function (e) {
    // this.setData({
    //   index: e.detail.value
    // }); 
    let i = parseInt(e.detail.val);
    this.data.classId = this.data.classList[i].id;
    this.getstudent(this.data.classId);
    this.data.len = e.detail.val;
    this.initData(e.detail.val);
  },
  initData: function (len) {
    // var list = [];
    const _this = this;
    this.data.tasksubmit.ClassId = this.data.classList[len].id;
    wx.request({
      url: 'http://ksapi.keys-edu.com///api/task/GetTeacherTaskPage',
      method: 'POST',
      data: this.data.tasksubmit,
      success: function (res) {
        let data = JSON.parse(JSON.parse(res.data).Data);
        if (_this.data.allcount === 0) {
          let remain = data[0].COUNTS % 10;
          if (remain > 0) {
            _this.data.allcount = parseInt(data[0].COUNTS / 10) + 1;
          } else {
            _this.data.allcount = parseInt(data[0].COUNTS / 10);
          }

        }
        for (let i = 0; i < data.length; i++) {
          var obj = {};
          // this.returnTime(data[i].CreatorTime);
          obj.time = _this.returnTime(data[i].CreatorTime);
          obj.name = data[i].Name;
          obj.TeacherTaskId = data[i].TeacherTaskId;
          obj.SubjectId = data[i].SubjectId;
          _this.data.list.push(obj);
        }
        _this.setData({
          taskquestion: _this.data.list
        });
      }
    })
  },
  // getstudentList: function(id){
  //   const _this = this;
  //   const timestamp = (new Date()).valueOf();
  //   wx.request({
  //     url: 'http://loginapi.keys-edu.com/api/UserComIface/getClassStuList?classid=' + id + '&_:' + timestamp,
  //     method: 'GET',
  //     success: function(res){
        
  //     }
  //   })
  // },
  returnTime: function (time) {
    var t = time.slice(6, 19)
    var NewDtime = new Date(parseInt(t));
    return this.formatDate(NewDtime);
    // return ar_date
  },
  formatDate: function (dt) {
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    var str = year + '-' + month + '-' + date;
    return str;
  },
  taskDetail: function (e) {
    let id = e.detail.val;
    let teacherId = e.detail.teachertaskid;
    const _this = this;
    console.log(e);
    wx.navigateTo({
      url: 'resultDetail?id=' + id + '&teachertaskid=' + teacherId + '&classId=' + _this.data.classId,
    })
  },
  upper: function () {
    console.log("已经刷新数据啦！")
    this.data.tasksubmit.PageIndex = 1;
    this.data.list = [];
    this.initData(this.data.len);
  },
  lower: function () {
    if (this.data.tasksubmit.PageIndex < this.data.allcount) {
      this.data.tasksubmit.PageIndex++;
      this.initData(this.data.len);
    } else {
      console.log("没有更多数据了！");
    }
  },
  getstudent: function(Id){
    const _this =this;
    const timestamp2 = (new Date()).valueOf();
    wx.request({
      url: 'http://loginapi.keys-edu.com/api/UserComIface/getClassStuList?classid=' + Id + '&_:' + timestamp2,
      method: "GET",
      success: function(res){
        const stuList = JSON.parse(JSON.parse(res.data).Data)[0].stuList;
        wx.setStorageSync("studentList", stuList);
        // console.log(stuList);
      }
    })
  }
})