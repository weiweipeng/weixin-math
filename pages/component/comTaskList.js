// pages/component/comTaskList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    taskquestion: {
      type: Array,
      value: [],
      
    }
  },
  observers: {
    "taskquestion": function (taskquestion) {
      // this.setData({
      //   taskquestions: taskquestion
      // });
      // taskquestion = this.data.taskquestions;
      console.log(taskquestion);
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    taskquestions: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    lower: function(){
      const myEventDetail = {} // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent("listLower", myEventDetail, myEventOption);
    },
    upper: function(){
      const myEventDetail = {} // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent("listUpper", myEventDetail, myEventOption);
    },
    taskDetail: function(e){
      console.log(e);
      let teacherId = e.target.dataset.teachertaskid;
      const myEventDetail = {};
      if (teacherId !== undefined){
        myEventDetail.val = e.target.id;
        myEventDetail.teachertaskid = teacherId;
      }else{
        myEventDetail.val = e.target.id;
      }
     // detail对象，提供给事件监听函数
      console.log(myEventDetail.val);
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent("listDetail", myEventDetail, myEventOption);
    }
  }
})
