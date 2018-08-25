//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
// var util = require('../../utils/util.js')
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
Page({
    data: {
        infos: [
            { 'count_txt': 'what', 'count_ber': '内容1' },
            { 'count_txt': '字段2：', 'count_ber': '内容2' },
            { 'count_txt': '字段3：', 'count_ber': '内容3' },
        ],
        mystatus: []
    },

    onLoad() {
        this.setData({
            mystatus: [1, 2, 1, 1, 3, 1, 1, 2, 9, 9, 1, null, 1, 2, 1, 9, 9, null, 0, 1, 0, 3, 9, 9, 1, 1, 0, 0, 1, 9]
        })
    },

    prev(e) {
        console.log(e.detail)
    },

    next(e) {
        console.log(e.detail)
    },
    dateChange(e) {
        console.log(e.detail)
    },
    dayClick(e) {
        console.log(e.detail)
    }
})
