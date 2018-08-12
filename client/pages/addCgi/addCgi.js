//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
Page({
    data: {
        year: new Date().getFullYear(),      // 年份
        month: new Date().getMonth() + 1,    // 月份
        day: new Date().getDate(),
        str: MONTHS[new Date().getMonth()],  // 月份字符串

        demo1_days_style: []
    },

    onLoad() {
        const days_count = new Date(this.data.year, this.data.month + 1, 0).getDate();
        let demo1_days_style = new Array;
        for (let i = 1; i <= days_count; i++) {
            if (i == 3) {
                demo1_days_style.push({
                    month: 'current', day: i, color: 'white', background: '#46c4f3'
                });
            } else if (i == 7) {
                demo1_days_style.push({
                    month: 'current', day: i, color: 'white', background: '#ffb72b'
                });
            } else if (i == 12 || i == 23 || i == 24) {
                demo1_days_style.push({
                    month: 'current', day: i, color: 'white', background: '#865fc1'
                });
            } else if (i == 21 || i == 22) {
                demo1_days_style.push({
                    month: 'current', day: i, color: 'white', background: '#eb4986'
                });
            } else {
                demo1_days_style.push({
                    month: 'current', day: i, color: 'white'
                });
            }
        }
        this.setData({
            demo1_days_style
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
