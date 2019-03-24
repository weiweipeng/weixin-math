// pages/questionList/questionList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionList: [],
    toView: "red",
    scrollTop: 100,
    tops:0,
    lowers: 0,
    indexPage:1,
    indexSize: 10,
    allCount: 0
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
    this.getinitData();
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
  // onPullDownRefresh: function () {
  //   console.log(11111);
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(88888);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取数据
  getinitData: function(){
    var ids = wx.getStorageSync("KnowledgePointId");
    var diffi = wx.getStorageSync("difficultN");
    var options = {
      Grade: 1,
      Term: 1,
      PageIndex: this.data.indexPage,
      PageSize: this.data.indexSize,
      Difficulty: diffi,
      Author: '',
      KnowledgePointId: ids,
    }
    let subitems = wx.getStorageSync("subitemId") || '';
    subitems = subitems.join();
    const _this = this;
    var new_arr = [];
    wx.request({
      url: 'http://ksapi.keys-edu.com///api/subject/getsubjectlistbykid',
      method: "POST",
      data: options,
      success: function (res) {

        const maindata = JSON.parse(JSON.parse(res.data).Data);
        console.log(maindata);
        if (maindata == null) {
          console.log("没有这类型的题目啦！")
          // self.endPullDownToRefresh();//关闭下拉刷新
          // self.endPullUpToRefresh(false);
          return;
        }
        if (_this.data.allCount === 0){
          _this.data.allCount = maindata[0].COUNTS;
        }

        for (var i = 0; i < maindata.length; i++) {
          var goods = {
            SubjectId: '',
            Title: '',
            checked: false
          };
          goods.SubjectId = maindata[i].SubjectId;
          if (subitems.indexOf(goods.SubjectId) !== -1){
            goods.checked = true;
          }
          var title = maindata[i].Title;
          title = title.replace('{0}', '(__)');
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
          //					if(title.replace(/\|/g)){}
          goods.Title = title;
          new_arr.push(goods);
        }
        var newarrs = _this.data.questionList.concat(new_arr)
        _this.setData({
          questionList: newarrs
        });
        console.log(newarrs);
      }
    })
  },
  upper: function(){
    // console.log(11111);
    this.setData({
      indexPage: 1,
      questionList: []
    });
    this.getinitData();
  },
  lower: function(){
    // console.log(22222);
    let pagePoint = parseInt(this.data.allCount%10);
    let page = 0;
    if(pagePoint>0){
      page = parseInt(this.data.allCount / 10)+1;
    }else{
      page = parseInt(this.data.allCount / 10);
    }
    if (this.data.indexPage < page){
      this.data.indexPage++;
      this.getinitData();
    }else{
      console.log("没有更多数据");
    }
    
    
  },
  checkboxChange: function(e){
    console.log(e.detail.value);
    let arr = e.detail.value;
    if (arr.length>40){
      console.log("超过40题啦");
      arr.splice(40,1);
      e.detail.value = arr;
    }
    wx.setStorageSync("subitemId", arr)
  },
  bindscroll: function(){
    console.log(3333);
  },
  onPullDownRefresh(){
    wx.startPullDownRefresh({
      success:function(suc){
        console.log(suc);
        wx.stopPullDownRefresh();
      },
      fail:function(err){
        console.log(err);
        wx.stopPullDownRefresh();
      },
      complete:function(over){
        console.log(over);
      }
    });
    
  }
})