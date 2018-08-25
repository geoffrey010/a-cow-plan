// components/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: {
      type: String,
      value: null
    },
    enabledSchedules: {
      type: Array,
      value: [
        {
          id: 1,
          text: "早班"
        },
        {
          id: 2,
          text: "中班"
        },
        { id: 3, text: "晚班" }
      ]
    },
    isShow: {
      type: Boolean,
      value: false,
      observer: '_shutdown'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentDay: '',
    checked: 'true'
  },

  attached() {
    console.log('生成组件咯')
  },
  ready() {
    console.log('ready完成')
  },
  detached() {
    console.log('detached完成')
  },
  /**
   * 组件的方法列表
   */
  methods: {

    _shutdown(n, o) {
      this.setData({
        isShow: n,
        currentDay: this.data.date
      })
    },

    shutDownModal(e) {
      this.setData({
        isShow: false
      })
    },

    showRes(e) {
      console.log(e)
    },

    hideView(e) {

    }
  }
})
