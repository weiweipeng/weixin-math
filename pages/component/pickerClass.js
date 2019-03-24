// pages/component/pickerClass.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
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
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectClass: function(e){
      console.log(e);
      this.setData({
        index: e.detail.value
      });
       const myEventDetail = {
          val: e.detail.value
       }
      this.triggerEvent('pickerClassName', myEventDetail);
    }
  }
})
