//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎使用阅读宝',
    title: '布置作业',
    userInfo: {},
    checkTime: '2019-03-12',
    hasUserInfo: false,
    initStatus: '未选择',
    token: 'yMDKd624rn28xMlDSUlNUExLTFJES0VGSElIR0uMiI+HPHSFhTx7hXtARg==',
    checkClasses: [],
    gradeId: '',
    subquesArrs: [],
    submitObj:{
      EndTime:0,
      SchoolId: 'sw0001',
      TeacherName: 'T004',
      TeacherId: 'T004'
    },
    quesnum: 0,
    typeArray: [{
      text: '班级练习',
      value: 1
    },{
      text: '个人练习',
      value: 0
    }],
    array: [{
      text: '一二年级',
      value: '1'
    },{
      text: '三年级',
      value: '3'
    }],
    difficultArr: [{
      text: 'A',
      value: 'A'
    }, {
        text: 'B',
        value: 'B'
      }, {
        text: 'C',
        value: 'C'
      }],
    index: 0,
    jsonsBigData: [],
    jsonsSmallData: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    const _this = this;
    
  },
  onShow: function(){
    let subquesArr = wx.getStorageSync('subitemId') || [];
    let classList = (wx.getStorageSync('classList') || []);
    this.data.submitObj.SubjectId = subquesArr.join();
    this.data.submitObj.ClassesId = classList.join();
    this.setData({
      quesnum: subquesArr.length,
      subquesArrs: subquesArr
    });
      this.setData({
        checkClasses: classList
      })
  },
  onReady: function(e){
    var data = {
      UserAccountId: 'T004',
      UserAccountPassWord: '123456'
    }
    wx.request({
      url: 'http://loginapi.keys-edu.com///api/UserAccount/GetUserLogin',
      method: 'POST',
      data: data,
      success:function(res){
        let logindata = JSON.parse(res.data);
        
        if (logindata.Result === 1){
          let logindatas = JSON.parse(logindata.Data);
          // this.app.data.token = ogindatas.Token;
          // console.log(this.app.data.token);
          wx.setStorageSync('token', logindatas.Token);
          const Changes = {
            BuyType: logindatas.BuyType,
            ClassId: logindatas.ClassId,
            CourseId: logindatas.CourseId,
            GradeId: logindatas.GradeId,
            Restime: logindatas.Restime,
            TOKEN: logindatas.Token,
            UserAccountEnum: logindatas.UserAccountEnum,
            UserAccountId: logindatas.UserAccountId,
            UserAccountSchoolId: logindatas.UserAccountSchoolId,
            UserToken: logindatas.UserToken,
          };
          let classArr = Changes.ClassId.split('|');
          let firstClass = {
            name: classArr[classArr.length - 1],
            Id: classArr[0],
          }
          let new_classArr = [];
          for (const classString of classArr) {
            const followArr = {};
            const brief = classString.split(',');
            let repeatBool = true;
            for (const newClassString of new_classArr) {
              if (newClassString.Id === brief[0]) {
                repeatBool = false;
              }
            }
            if (repeatBool) {
              followArr.name = brief[1];
              followArr.Id = brief[0];
              new_classArr.push(followArr);
            }
          };
          wx.setStorageSync('set_classes', new_classArr);
          wx.request({
            url: 'http://loginapi.keys-edu.com//api/useraccount/toggleuser',
            method: 'POST',
            data: JSON.stringify(Changes),
            success: function(res){
              let account = res.data;
              if(account.Result === 1){
                let accountData = JSON.parse(account.Data);
                const accountPostData = {
                  UserToken: accountData.UserToken,
                  School: accountData.UserAccountSchoolId,
                  BuyType: accountData.BuyType,
                  Restime: accountData.Restime,
                  Sign: accountData.Sign,
                  Class: accountData.ClassId,
                  Grade: accountData.GradeId,
                }
                const SchoolId = GetAccountData.UserAccountSchoolId;
                const TeacherId = GetAccountData.UserAccountId;  
                wx.setStorageSync('set_schoolId', SchoolId);
                wx.setStorageSync('set_teacherId', TeacherId);
                wx.request({
           url:'http://ksapi.keys-edu.com///api/UserToken/GetUserTokenData',
                  method: 'POST',
                  data: accountPostData,
                  success: function(res){
                    // let ParseTokenData = JSON.parse(res.data);
                    // if (ParseTokenData.Result === 1){
                    //   const userInfo = ParseTokenData.Data;
                    //   wx.setStorageSync('set_useinfo', userInfo);

                    // }
                  }
                })
              }
            }
          })
        }
      }

    })
  },
  onHide: function(){

  },
  onUnload: function(){
 
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  initGetData: function(pid){
    var pids = pid != 10?pid:0;
    const _this = this;
    //除去选择的题目缓存
    this.removesubItem();
    let jsonGetGrade = {
      'PId': pids,
      'Code': 2,
      'Grade': 1,
      'Term': 1,
      // 'TOKEN': 'q4eHQs1/hn9Ge4OEPU5DRlJJSElSQk+NRE9GPkdLSIWPjTyEeQ=='
    }
    wx.request({
      url: 'http://ksapi.keys-edu.com//api/common/GetKnowledgeList',
      data: jsonGetGrade,
      method:'POST',
      success:function(res){
        var Bdatas = JSON.parse(JSON.parse(res.data).Data);
        var newData = [];
        for (let item in Bdatas) {
          var objs = {
            value: Bdatas[item].KnowledgePointId,
            text: Bdatas[item].Name
          }
          newData.push(objs);
        }
        if (pid === 10) {
          _this.setData({
            jsonsBigData: newData
          })
        } else {
          _this.setData({
            jsonsSmallData: newData
          });
        }
      }
    })
  },
  bindTimeChange: function(e){
    this.setData({
      checkTime: e.detail.value
    });
    this.data.submitObj.WriteTime = this.data.checkTime;
    console.log(e);
  },
  selectGrade: function(e){
    this.setData({
      index: e.detail.value
    })
    this.gradeId = e.detail.value;
    this.initGetData(10);
  },
  selectType: function(e){
    this.setData({
      sindex: e.detail.value
    })
    this.data.submitObj.Name = this.data.typeArray[e.detail.value].text;
  },
  toclasses: function(){
    wx.navigateTo({
      url: '../classList/classList',
    })
  },
  selectBigKonw: function(e){
    this.setData({
      bindex: e.detail.value
    })
    var num = parseInt(e.detail.value);
    this.initGetData(this.data.jsonsBigData[num].value);
  },
  selectSmallKonw: function(e){
    this.removesubItem();
    this.setData({
      mindex: e.detail.value
    });
    let i = parseInt(e.detail.value);

    wx.setStorageSync('KnowledgePointId', this.data.jsonsSmallData[i].value);
  },
  selectDifficult: function(e){
    this.removesubItem();
    this.setData({
      dindex: e.detail.value
    });
    let i = parseInt(e.detail.value);
    wx.setStorageSync('difficultN', this.data.difficultArr[i].text);
  },
  selectQuestion: function(e){
    wx.navigateTo({
      url: '../questionList/questionList',
    })
  },
  removesubItem: function(){
    if (this.data.quesnum !== 0) {
      wx.setStorageSync('subitemId', []);
      this.setData({
        quesnum: 0
      });
    }
  },
  submits: function(){
    const _this = this;
    wx.request({
      url: 'http://ksapi.keys-edu.com///api/task/insertteachertask',
      data: _this.data.submitObj,
      method:'POST',
      success: function(res){
        console.log(res);
      }
    })
  }
})
